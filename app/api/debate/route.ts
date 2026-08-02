import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { sanitizeServerLog } from "@/lib/sanitizeServerLog";
import { generateProgrammaticDebateTurn } from "@/lib/debate/programmatic";
import { isAuthConfigured } from "@/lib/auth-config";
import {
  DebateTurnRequestSchema,
  DebateTurnSuccessSchema,
  type DebateModel,
  type DebateTurnExecution,
} from "@/lib/debate/contracts";
import {
  getAnthropic,
  getOpenAI,
  getGemini,
  isLiveDebateEnabled,
  buildSystemPrompt,
  buildUserPrompt,
} from "@/lib/debate/shared";

interface GenerationResult {
  argument: string;
  actualModel: DebateModel;
}

const GrokCompletionSchema = z.object({
  choices: z.array(
    z.object({
      message: z.object({ content: z.string().min(1) }),
    }),
  ).min(1),
});

function requireArgument(value: unknown, provider: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${provider} returned no debate content`);
  }
  return value;
}

async function hasAuthenticatedUser(): Promise<boolean> {
  if (!isAuthConfigured()) return false;
  try {
    const { auth } = await import("@/lib/auth");
    const session = await auth();
    return Boolean(session?.user);
  } catch (error) {
    console.warn(
      "Auth unavailable; using programmatic debate fallback:",
      sanitizeServerLog(error),
    );
    return false;
  }
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
      argument: requireArgument(
        textBlock && "text" in textBlock ? textBlock.text : null,
        "Claude",
      ),
      actualModel: "claude",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Claude API failed: ${message}`);
  }
}

async function generateWithOpenAI(
  systemPrompt: string,
  userPrompt: string,
  requestedModel: "gpt-4" | "gpt-5",
): Promise<GenerationResult> {
  try {
    const client = await getOpenAI();
    const response = await client.chat.completions.create({
      model: requestedModel === "gpt-5" ? "gpt-5" : "gpt-4o",
      max_tokens: 1024,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    return {
      argument: requireArgument(
        response.choices[0]?.message?.content,
        "OpenAI",
      ),
      actualModel: requestedModel,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`OpenAI API failed: ${message}`);
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
      argument: requireArgument(text, "Gemini"),
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
      // Upstream error bodies can echo request/prompt content. The status is
      // sufficient for diagnostics and avoids copying private debate text into
      // application logs.
      throw new Error(`HTTP ${response.status}`);
    }

    const data = GrokCompletionSchema.parse(await response.json());
    return {
      argument: requireArgument(data.choices[0].message.content, "Grok"),
      actualModel: "grok",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Grok API failed: ${message}`);
  }
}

export async function POST(request: NextRequest) {
  // Rate limit: 20 requests per hour per IP (higher limit since each debate round is a separate call)
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const limit = rateLimit(`debate:${ip}`, { maxRequests: 20, windowMs: 60 * 60 * 1000 });
  if (!limit.success) {
    return NextResponse.json(
      { error: "Rate limited. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } }
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON", code: "INVALID_JSON" },
      { status: 400 }
    );
  }

  try {
    const parseResult = DebateTurnRequestSchema.safeParse(raw);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }
    const body = parseResult.data;
    const { topic, side, model, round, previousMessages, pillars } = body;

    let result: GenerationResult;
    let execution: DebateTurnExecution;
    const liveDebateEnabled = isLiveDebateEnabled();
    const authenticated = liveDebateEnabled ? await hasAuthenticatedUser() : false;
    if (!liveDebateEnabled || !authenticated) {
      result = {
        argument: generateProgrammaticDebateTurn({
          topic,
          side,
          round,
          previousMessages,
          pillars,
        }),
        actualModel: model,
      };
      execution = {
        requested: liveDebateEnabled ? "live" : "programmatic",
        actual: "programmatic",
        requestedModel: model,
        actualModel: null,
        ...(liveDebateEnabled ? { fallbackCode: "AUTH_REQUIRED" as const } : {}),
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
          case "gpt-5":
            result = await generateWithOpenAI(systemPrompt, userPrompt, model);
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
        execution = {
          requested: "live",
          actual: "live",
          requestedModel: model,
          actualModel: result.actualModel,
        };
      } catch (error) {
        console.warn(
          "Live debate generation failed, falling back to programmatic mode:",
          sanitizeServerLog(error),
        );
        result = {
          argument: generateProgrammaticDebateTurn({
            topic,
            side,
            round,
            previousMessages,
            pillars,
          }),
          actualModel: model,
        };
        execution = {
          requested: "live",
          actual: "programmatic",
          requestedModel: model,
          actualModel: null,
          fallbackCode: "PROVIDER_ERROR",
        };
      }
    }

    return NextResponse.json(DebateTurnSuccessSchema.parse({
      argument: result.argument,
      execution,
    }));
  } catch (error) {
    console.error("Debate API error:", sanitizeServerLog(error));
    return NextResponse.json(
      { error: "Failed to generate debate argument", code: "DEBATE_FAILED" },
      { status: 500 }
    );
  }
}
