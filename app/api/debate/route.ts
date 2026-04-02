import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { generateProgrammaticDebateTurn } from "@/lib/debate/programmatic";
import {
  getAnthropic,
  getOpenAI,
  getGemini,
  isLiveDebateEnabled,
  buildSystemPrompt,
  buildUserPrompt,
  type DebatePillar,
  type DebateMessage,
} from "@/lib/debate/shared";

const DebateRequestSchema = z.object({
  topic: z.string().min(1),
  topicId: z.string().min(1),
  side: z.enum(["for", "against"]),
  model: z.enum(["claude", "gpt-4", "gemini", "grok"]),
  round: z.number().int().min(1).max(20),
  previousMessages: z.array(z.object({
    id: z.string().optional(),
    side: z.enum(["for", "against"]),
    content: z.string(),
    round: z.number().int().min(1),
    model: z.string().optional(),
    role: z.string().optional(),
  })),
  pillars: z.array(z.object({
    title: z.string(),
    skepticPremise: z.string(),
    proponentRebuttal: z.string(),
  })).optional(),
});

interface GenerationResult {
  argument: string;
  actualModel: string;
  fallback?: boolean;
  error?: string;
}

async function generateWithClaude(
  systemPrompt: string,
  userPrompt: string
): Promise<GenerationResult> {
  try {
    const client = await getAnthropic();
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    const textBlock = response.content.find((block) => block.type === "text");
    return {
      argument: textBlock && "text" in textBlock ? textBlock.text : "Unable to generate argument.",
      actualModel: "claude",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Claude API failed: ${message}`);
  }
}

async function generateWithGPT4(
  systemPrompt: string,
  userPrompt: string
): Promise<GenerationResult> {
  try {
    const client = await getOpenAI();
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 1024,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    return {
      argument: response.choices[0]?.message?.content || "Unable to generate argument.",
      actualModel: "gpt-4",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`GPT-4 API failed: ${message}`);
  }
}

async function generateWithGemini(
  systemPrompt: string,
  userPrompt: string
): Promise<GenerationResult> {
  try {
    const client = await getGemini();
    const model = client.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Gemini uses a different format - combine system and user prompts
    const fullPrompt = `${systemPrompt}\n\n---\n\n${userPrompt}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return {
      argument: text || "Unable to generate argument.",
      actualModel: "gemini",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Gemini API failed: ${message}`);
  }
}

async function generateWithGrok(
  systemPrompt: string,
  userPrompt: string
): Promise<GenerationResult> {
  // Grok uses OpenAI-compatible API format with x.ai endpoint
  const apiKey = process.env.XAI_API_KEY || process.env.GROK_API_KEY;
  if (!apiKey) {
    throw new Error("XAI_API_KEY or GROK_API_KEY environment variable is required");
  }

  try {
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-2-latest",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return {
      argument: data.choices[0]?.message?.content || "Unable to generate argument.",
      actualModel: "grok",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Grok API failed: ${message}`);
  }
}

export async function POST(request: NextRequest) {
  // Require authentication for debate generation (calls LLM APIs)
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Rate limit: 20 requests per hour per IP (higher limit since each debate round is a separate call)
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const limit = rateLimit(`debate:${ip}`, { maxRequests: 20, windowMs: 60 * 60 * 1000 });
  if (!limit.success) {
    return NextResponse.json(
      { error: "Rate limited. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } }
    );
  }

  try {
    const raw = await request.json();
    const parseResult = DebateRequestSchema.safeParse(raw);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }
    const body = parseResult.data;
    const { topic, side, model, round, previousMessages, pillars } = body;

    let result: GenerationResult;
    if (!isLiveDebateEnabled()) {
      result = {
        argument: generateProgrammaticDebateTurn({
          topic,
          side,
          round,
          previousMessages,
          pillars,
        }),
        actualModel: model,
        fallback: true,
      };
    } else {
      const systemPrompt = buildSystemPrompt(side, topic, pillars);
      const userPrompt = buildUserPrompt(round, previousMessages, side);

      try {
        switch (model) {
          case "claude":
            result = await generateWithClaude(systemPrompt, userPrompt);
            break;
          case "gpt-4":
            result = await generateWithGPT4(systemPrompt, userPrompt);
            break;
          case "gemini":
            result = await generateWithGemini(systemPrompt, userPrompt);
            break;
          case "grok":
            result = await generateWithGrok(systemPrompt, userPrompt);
            break;
          default:
            result = await generateWithClaude(systemPrompt, userPrompt);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.warn("Live debate generation failed, falling back to programmatic mode:", message);
        result = {
          argument: generateProgrammaticDebateTurn({
            topic,
            side,
            round,
            previousMessages,
            pillars,
          }),
          actualModel: model,
          fallback: true,
          error: message,
        };
      }
    }

    return NextResponse.json({
      argument: result.argument,
      model: result.actualModel,
      fallback: result.fallback,
      error: result.error,
    });
  } catch (error) {
    console.error("Debate API error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to generate debate argument", details: message },
      { status: 500 }
    );
  }
}
