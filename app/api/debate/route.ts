import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { clientIp } from "@/lib/clientIp";
import { rateLimit } from "@/lib/rate-limit";
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

async function hasAuthenticatedUser(signal: AbortSignal): Promise<boolean> {
  if (!isAuthConfigured()) return false;
  try {
    const { auth } = await import("@/lib/auth");
    const session = await auth();
    return Boolean(session?.user);
  } catch {
    signal.throwIfAborted();
    console.warn("Auth unavailable; using programmatic debate fallback");
    return false;
  }
}

async function generateWithClaude(
  systemPrompt: string,
  userPrompt: string,
  signal: AbortSignal,
): Promise<GenerationResult> {
  try {
    const client = await getAnthropic();
    signal.throwIfAborted();
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    }, { signal });
    signal.throwIfAborted();

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
  signal: AbortSignal,
): Promise<GenerationResult> {
  try {
    const client = await getOpenAI();
    signal.throwIfAborted();
    const response = await client.chat.completions.create({
      model: requestedModel === "gpt-5" ? "gpt-5" : "gpt-4o",
      max_tokens: 1024,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }, { signal });
    signal.throwIfAborted();

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
  userPrompt: string,
  signal: AbortSignal,
): Promise<GenerationResult> {
  try {
    const client = await getGemini();
    signal.throwIfAborted();
    const model = client.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Gemini uses a different format - combine system and user prompts
    const fullPrompt = `${systemPrompt}\n\n---\n\n${userPrompt}`;

    const result = await model.generateContent(fullPrompt, { signal });
    const response = await result.response;
    signal.throwIfAborted();
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
  userPrompt: string,
  signal: AbortSignal,
): Promise<GenerationResult> {
  // Grok uses OpenAI-compatible API format with x.ai endpoint
  const apiKey = process.env.XAI_API_KEY || process.env.GROK_API_KEY;
  if (!apiKey) {
    throw new Error("XAI_API_KEY or GROK_API_KEY environment variable is required");
  }

  try {
    signal.throwIfAborted();
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
      signal,
    });
    signal.throwIfAborted();

    if (!response.ok) {
      // Upstream error bodies can echo request/prompt content. The status is
      // sufficient for diagnostics and avoids copying private debate text into
      // application logs.
      await response.body?.cancel().catch(() => undefined);
      throw new Error(`HTTP ${response.status}`);
    }

    const data = GrokCompletionSchema.parse(await response.json());
    signal.throwIfAborted();
    return {
      argument: requireArgument(data.choices[0].message.content, "Grok"),
      actualModel: "grok",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Grok API failed: ${message}`);
  }
}

function requestAborted() {
  return NextResponse.json({ error: "Request cancelled", code: "REQUEST_ABORTED" }, {
    status: 499, headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: NextRequest) {
  if (request.signal.aborted) return requestAborted();
  // Rate limit: 20 requests per hour per IP (higher limit since each debate round is a separate call)
  const ip = clientIp(request);
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
    if (request.signal.aborted) return requestAborted();
    return NextResponse.json(
      { error: "Invalid JSON", code: "INVALID_JSON" },
      { status: 400 }
    );
  }

  if (request.signal.aborted) return requestAborted();
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
    const authenticated = liveDebateEnabled ? await hasAuthenticatedUser(request.signal) : false;
    request.signal.throwIfAborted();
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
            result = await generateWithClaude(systemPrompt, userPrompt, request.signal);
            break;
          case "gpt-4":
          case "gpt-5":
            result = await generateWithOpenAI(systemPrompt, userPrompt, model, request.signal);
            break;
          case "gemini":
            result = await generateWithGemini(systemPrompt, userPrompt, request.signal);
            break;
          case "grok":
            result = await generateWithGrok(systemPrompt, userPrompt, request.signal);
            break;
          default:
            result = await generateWithClaude(systemPrompt, userPrompt, request.signal);
        }
        execution = {
          requested: "live",
          actual: "live",
          requestedModel: model,
          actualModel: result.actualModel,
        };
      } catch {
        request.signal.throwIfAborted();
        console.warn("Live debate generation failed; falling back to programmatic mode");
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

    request.signal.throwIfAborted();
    return NextResponse.json(DebateTurnSuccessSchema.parse({
      argument: result.argument,
      execution,
    }));
  } catch {
    if (request.signal.aborted) return requestAborted();
    console.error("Debate API request failed");
    return NextResponse.json(
      { error: "Failed to generate debate argument", code: "DEBATE_FAILED" },
      { status: 500 }
    );
  }
}
