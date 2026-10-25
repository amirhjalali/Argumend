import { NextRequest } from "next/server";
import { z } from "zod";
import { clientIp } from "@/lib/clientIp";
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
  userPrompt: string,
  signal: AbortSignal,
): AsyncGenerator<string> {
  const client = await getAnthropic();
  signal.throwIfAborted();
  const stream = client.messages.stream({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  }, { signal });

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
  signal: AbortSignal,
): AsyncGenerator<string> {
  const client = await getOpenAI();
  signal.throwIfAborted();
  const stream = await client.chat.completions.create({
    model: requestedModel === "gpt-5" ? "gpt-5" : "gpt-4o",
    max_tokens: 1024,
    stream: true,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  }, { signal });
  signal.throwIfAborted();

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
  userPrompt: string,
  signal: AbortSignal,
): AsyncGenerator<string> {
  const client = await getGemini();
  signal.throwIfAborted();
  const model = client.getGenerativeModel({ model: "gemini-1.5-pro" });
  const fullPrompt = `${systemPrompt}\n\n---\n\n${userPrompt}`;

  const result = await model.generateContentStream(fullPrompt, { signal });
  // The SDK aggregates a parallel copy of the stream even when callers only
  // iterate its chunks. Observe its rejection when the fetch is cancelled.
  void result.response.catch(() => undefined);
  signal.throwIfAborted();

  for await (const chunk of result.stream) {
    const text = chunk.text();
    if (text) yield text;
  }
}

const GrokChunkSchema = z.object({
  choices: z.array(z.object({
    delta: z.object({ content: z.string().nullish() }),
  })),
  error: z.never().optional(),
});

/**
 * Stream Grok response (OpenAI-compatible SSE)
 */
async function* streamGrok(
  systemPrompt: string,
  userPrompt: string,
  signal: AbortSignal,
): AsyncGenerator<string> {
  signal.throwIfAborted();
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
    signal,
  });

  if (!response.ok || !response.body) {
    await response.body?.cancel().catch(() => undefined);
    throw new Error(`Grok API failed: HTTP ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let data: string[] = [];
  let eventName = "";
  const cancel = () => { void reader.cancel().catch(() => undefined); };
  signal.addEventListener("abort", cancel, { once: true });

  try {
    signal.throwIfAborted();
    while (true) {
      const { done, value } = await reader.read();
      signal.throwIfAborted();
      buffer += decoder.decode(value, { stream: !done });
      // A CR at a byte boundary may be the first half of CRLF. Keep it
      // together so multiline data is not dispatched as separate events.
      const pendingCr = !done && buffer.endsWith("\r");
      const lines = (pendingCr ? buffer.slice(0, -1) : buffer).split(/\r\n|\r|\n/);
      buffer = done ? "" : (lines.pop() ?? "") + (pendingCr ? "\r" : "");
      const payloads: Array<{ data: string; eventName: string }> = [];
      for (const line of lines) {
        if (line === "") {
          if (data.length) payloads.push({ data: data.join("\n"), eventName });
          data = [];
          eventName = "";
        } else if (line === "data" || line.startsWith("data:")) {
          const value = line.slice(5);
          data.push(value.startsWith(" ") ? value.slice(1) : value);
        } else if (line.startsWith("event:")) {
          eventName = line.slice(6).trim();
        }
      }
      // Some compatible providers close immediately after their final data
      // line. Flush that record instead of silently losing the final token.
      if (done && data.length) payloads.push({ data: data.join("\n"), eventName });
      for (const { data: payload, eventName } of payloads) {
        if (eventName === "error") throw new Error("Grok stream error");
        if (!payload.trim()) continue;
        if (payload.trim() === "[DONE]") return;
        const parsed = GrokChunkSchema.parse(JSON.parse(payload));
        const delta = parsed.choices?.[0]?.delta?.content;
        if (delta) yield delta;
      }
      if (done) return;
    }
  } finally {
    signal.removeEventListener("abort", cancel);
    await reader.cancel().catch(() => undefined);
    reader.releaseLock();
  }
}

type StreamGenerator = (
  systemPrompt: string,
  userPrompt: string,
  signal: AbortSignal,
) => AsyncGenerator<string>;

function getStreamGenerator(model: DebateModel): StreamGenerator {
  switch (model) {
    case "claude":
      return streamClaude;
    case "gpt-4":
      return (systemPrompt, userPrompt, signal) =>
        streamOpenAI(systemPrompt, userPrompt, "gpt-4", signal);
    case "gpt-5":
      return (systemPrompt, userPrompt, signal) =>
        streamOpenAI(systemPrompt, userPrompt, "gpt-5", signal);
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
  const ip = clientIp(request);
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
    const cancellation = new AbortController();
    const signal = AbortSignal.any([request.signal, cancellation.signal]);
    let closed = false;

    const stream = new ReadableStream({
      async start(controller) {
        const close = () => {
          if (closed) return;
          closed = true;
          controller.close();
        };
        const emit = (event: DebateStreamEvent) => {
          if (closed || signal.aborted) return;
          controller.enqueue(sseEvent(event));
        };
        signal.addEventListener("abort", close, { once: true });
        try {
          signal.throwIfAborted();
          const generator = streamFn(systemPrompt, userPrompt, signal);
          let streamedContent = "";
          for await (const token of generator) {
            if (signal.aborted) return;
            streamedContent += token;
            emit({ type: "token", token });
          }
          if (signal.aborted) return;
          if (!streamedContent.trim()) {
            throw new Error("Provider returned no debate content");
          }
          emit({
            type: "complete",
            execution: {
              requested: "live",
              actual: "live",
              requestedModel: model,
              actualModel: model,
            },
          });
        } catch {
          if (signal.aborted) return;
          console.warn("Live debate stream failed; falling back to programmatic mode");
          try {
            const programmaticTokens = buildProgrammaticTokens(body);
            emit({ type: "replace" });
            for (const token of programmaticTokens) {
              emit({ type: "token", token });
            }
            emit({
              type: "complete",
              execution: {
                requested: "live",
                actual: "programmatic",
                requestedModel: model,
                actualModel: null,
                fallbackCode: "PROVIDER_ERROR",
              },
            });
          } catch {
            if (signal.aborted) return;
            console.error("Programmatic debate fallback failed");
            emit({
              type: "error",
              code: "DEBATE_GENERATION_FAILED",
              message: DEBATE_GENERATION_ERROR_MESSAGE,
            });
          }
        } finally {
          signal.removeEventListener("abort", close);
          close();
        }
      },
      cancel(reason) {
        closed = true;
        cancellation.abort(reason);
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
