import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { chunkForSse, generateProgrammaticDebateTurn } from "@/lib/debate/programmatic";
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

interface StreamRequest {
  topic: string;
  side: "for" | "against";
  model: "claude" | "gpt-4" | "gemini" | "grok";
  round: number;
  previousMessages: DebateMessage[];
  pillars?: DebatePillar[];
}

/**
 * SSE helper: encode a data event
 */
function sseEvent(data: Record<string, unknown>): Uint8Array {
  return new TextEncoder().encode(`data: ${JSON.stringify(data)}\n\n`);
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
async function* streamGPT4(
  systemPrompt: string,
  userPrompt: string
): AsyncGenerator<string> {
  const client = await getOpenAI();
  const stream = await client.chat.completions.create({
    model: "gpt-4o",
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

function getStreamGenerator(model: string) {
  switch (model) {
    case "claude":
      return streamClaude;
    case "gpt-4":
      return streamGPT4;
    case "gemini":
      return streamGemini;
    case "grok":
      return streamGrok;
    default:
      return streamClaude;
  }
}

function buildProgrammaticTokens(body: StreamRequest): string[] {
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
  // Require authentication for debate streaming (calls LLM APIs)
  const session = await auth();
  if (!session?.user) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401 }
    );
  }

  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const limit = rateLimit(`debate:${ip}`, {
    maxRequests: 20,
    windowMs: 60 * 60 * 1000,
  });
  if (!limit.success) {
    return new Response(
      JSON.stringify({ error: "Rate limited" }),
      { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } }
    );
  }

  let body: StreamRequest;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
    });
  }

  const { topic, side, model, round, previousMessages, pillars } = body;
  if (!topic || !side || !model || !round) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
    });
  }

  try {
    if (!isLiveDebateEnabled()) {
      const programmaticTokens = buildProgrammaticTokens(body);
      const stream = new ReadableStream({
        start(controller) {
          for (const token of programmaticTokens) {
            controller.enqueue(sseEvent({ token }));
          }
          controller.enqueue(sseEvent({ done: true, model, fallback: true }));
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
          for await (const token of generator) {
            controller.enqueue(sseEvent({ token }));
          }
          controller.enqueue(sseEvent({ done: true, model }));
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unknown error";
          console.warn("Live debate stream failed, falling back to programmatic mode:", message);
          try {
            const programmaticTokens = buildProgrammaticTokens(body);
            for (const token of programmaticTokens) {
              controller.enqueue(sseEvent({ token }));
            }
            controller.enqueue(sseEvent({ done: true, model, fallback: true }));
          } catch (fallbackError) {
            const fallbackMessage =
              fallbackError instanceof Error ? fallbackError.message : "Unknown fallback error";
            controller.enqueue(
              sseEvent({ error: `${message}; fallback failed: ${fallbackMessage}`, model })
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
  } catch (error) {
    console.error("Debate stream setup error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: "Failed to set up debate stream", details: message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
