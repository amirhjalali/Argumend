import { NextRequest } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { chunkForSse, generateProgrammaticDebateTurn } from "@/lib/debate/programmatic";
import { isAuthConfigured } from "@/lib/auth-config";
import {
  DEBATE_GENERATION_ERROR_MESSAGE,
  DebateStreamEventSchema,
  DebateTurnRequestSchema,
  type DebateModel,
  type DebateStreamEvent,
  type DebateTurnExecution,
  type DebateTurnRequest,
} from "@/lib/debate/contracts";
import {
  getAnthropic,
  getOpenAI,
  getGemini,
  isLiveDebateEnabled,
  buildSystemPrompt,
  buildUserPrompt,
} from "@/lib/debate/shared";

async function hasAuthenticatedUser(): Promise<boolean> {
  if (!isAuthConfigured()) return false;
  try {
    const { auth } = await import("@/lib/auth");
    const session = await auth();
    return Boolean(session?.user);
  } catch {
    console.warn("Auth unavailable; using programmatic debate stream fallback");
    return false;
  }
}

/**
 * SSE helper: encode a data event
 */
function sseEvent(data: DebateStreamEvent): Uint8Array {
  const event = DebateStreamEventSchema.parse(data);
  return new TextEncoder().encode(`data: ${JSON.stringify(event)}\n\n`);
}

/**
 * Stream Claude response
 */
async function* streamClaude(
  systemPrompt: string,
  userPrompt: string
): AsyncGenerator<string> {
  const client = await getAnthropic();
  const stream = client.messages.stream({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  for await (const event of stream) {
    if (
      event.type === "content_block_delta" &&
      event.delta?.type === "text_delta"
    ) {
      yield event.delta.text;
    }
  }
}

/**
 * Stream OpenAI/GPT-4 response
 */
async function* streamOpenAI(
  systemPrompt: string,
  userPrompt: string,
  requestedModel: "gpt-4" | "gpt-5",
): AsyncGenerator<string> {
  const client = await getOpenAI();
  const stream = await client.chat.completions.create({
    model: requestedModel === "gpt-5" ? "gpt-5" : "gpt-4o",
    max_tokens: 1024,
    stream: true,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  for await (const chunk of stream) {
    const delta = chunk.choices?.[0]?.delta?.content;
    if (delta) yield delta;
  }
}

/**
 * Stream Gemini response
 */
async function* streamGemini(
  systemPrompt: string,
  userPrompt: string
): AsyncGenerator<string> {
  const client = await getGemini();
  const model = client.getGenerativeModel({ model: "gemini-1.5-pro" });
  const fullPrompt = `${systemPrompt}\n\n---\n\n${userPrompt}`;

  const result = await model.generateContentStream(fullPrompt);

  for await (const chunk of result.stream) {
    const text = chunk.text();
    if (text) yield text;
  }
}

/**
 * Stream Grok response (OpenAI-compatible SSE)
 */
async function* streamGrok(
  systemPrompt: string,
  userPrompt: string
): AsyncGenerator<string> {
  const apiKey = process.env.XAI_API_KEY || process.env.GROK_API_KEY;
  if (!apiKey) throw new Error("XAI_API_KEY is required");

  const response = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "grok-2-latest",
      stream: true,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 1024,
    }),
  });

  if (!response.ok || !response.body) {
    throw new Error(`Grok API failed: HTTP ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data: ")) continue;
      const payload = trimmed.slice(6);
      if (payload === "[DONE]") return;
      try {
        const parsed = JSON.parse(payload);
        const delta = parsed.choices?.[0]?.delta?.content;
        if (delta) yield delta;
      } catch {
        // skip malformed lines
      }
    }
  }
}

type StreamGenerator = (
  systemPrompt: string,
  userPrompt: string,
) => AsyncGenerator<string>;

function getStreamGenerator(model: DebateModel): StreamGenerator {
  switch (model) {
    case "claude":
      return streamClaude;
    case "gpt-4":
      return (systemPrompt, userPrompt) =>
        streamOpenAI(systemPrompt, userPrompt, "gpt-4");
    case "gpt-5":
      return (systemPrompt, userPrompt) =>
        streamOpenAI(systemPrompt, userPrompt, "gpt-5");
    case "gemini":
      return streamGemini;
    case "grok":
      return streamGrok;
    default:
      return streamClaude;
  }
}

function buildProgrammaticTokens(body: DebateTurnRequest): string[] {
  const argument = generateProgrammaticDebateTurn({
    topic: body.topic,
    side: body.side,
    round: body.round,
    previousMessages: body.previousMessages,
    pillars: body.pillars,
  });
  return chunkForSse(argument);
}

/**
 * POST /api/debate/stream
 *
 * Streams a debate argument token-by-token via SSE.
 */
export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const limit = rateLimit(`debate:${ip}`, {
    maxRequests: 20,
    windowMs: 60 * 60 * 1000,
  });
  if (!limit.success) {
    return new Response(
      JSON.stringify({ error: "Rate limited" }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  let body: DebateTurnRequest;
  try {
    const raw = await request.json();
    const parseResult = DebateTurnRequestSchema.safeParse(raw);
    if (!parseResult.success) {
      return new Response(
        JSON.stringify({ error: "Invalid request", details: parseResult.error.flatten() }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    body = parseResult.data;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON", code: "INVALID_JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { topic, side, model, round, previousMessages, pillars } = body;

  try {
    const liveDebateEnabled = isLiveDebateEnabled();
    const authenticated = liveDebateEnabled ? await hasAuthenticatedUser() : false;
    if (request.signal.aborted) {
      return new Response(
        JSON.stringify({ error: "Request cancelled", code: "REQUEST_ABORTED" }),
        {
          status: 499,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
        },
      );
    }
    if (!liveDebateEnabled || !authenticated) {
      const programmaticTokens = buildProgrammaticTokens(body);
      const execution: DebateTurnExecution = {
        requested: liveDebateEnabled ? "live" : "programmatic",
        actual: "programmatic",
        requestedModel: model,
        actualModel: null,
        ...(liveDebateEnabled ? { fallbackCode: "AUTH_REQUIRED" as const } : {}),
      };
      const stream = new ReadableStream({
        start(controller) {
          for (const token of programmaticTokens) {
            controller.enqueue(sseEvent({ type: "token", token }));
          }
          controller.enqueue(sseEvent({
            type: "complete",
            execution,
          }));
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    const systemPrompt = buildSystemPrompt(side, topic, pillars);
    const userPrompt = buildUserPrompt(round, previousMessages, side);
    const streamFn = getStreamGenerator(model);

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const generator = streamFn(systemPrompt, userPrompt);
          let streamedContent = "";
          for await (const token of generator) {
            if (request.signal.aborted) return;
            streamedContent += token;
            controller.enqueue(sseEvent({ type: "token", token }));
          }
          if (!streamedContent.trim()) {
            throw new Error("Provider returned no debate content");
          }
          controller.enqueue(sseEvent({
            type: "complete",
            execution: {
              requested: "live",
              actual: "live",
              requestedModel: model,
              actualModel: model,
            },
          }));
        } catch {
          if (request.signal.aborted) return;
          console.warn("Live debate stream failed; falling back to programmatic mode");
          try {
            const programmaticTokens = buildProgrammaticTokens(body);
            controller.enqueue(sseEvent({ type: "replace" }));
            for (const token of programmaticTokens) {
              controller.enqueue(sseEvent({ type: "token", token }));
            }
            controller.enqueue(sseEvent({
              type: "complete",
              execution: {
                requested: "live",
                actual: "programmatic",
                requestedModel: model,
                actualModel: null,
                fallbackCode: "PROVIDER_ERROR",
              },
            }));
          } catch {
            console.error("Programmatic debate fallback failed");
            controller.enqueue(
              sseEvent({
                type: "error",
                code: "DEBATE_GENERATION_FAILED",
                message: DEBATE_GENERATION_ERROR_MESSAGE,
              })
            );
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch {
    console.error("Debate stream setup failed");
    return new Response(
      JSON.stringify({ error: "Failed to set up debate stream", code: "DEBATE_STREAM_FAILED" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
