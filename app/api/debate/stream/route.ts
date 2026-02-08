import { NextRequest } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

// Lazy initialization to avoid build-time errors
let anthropic: any = null;
let openai: any = null;
let gemini: any = null;

async function getAnthropic() {
  if (!anthropic) {
    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    anthropic = new Anthropic();
  }
  return anthropic;
}

async function getOpenAI() {
  if (!openai) {
    const OpenAI = (await import("openai")).default;
    openai = new OpenAI();
  }
  return openai;
}

async function getGemini() {
  if (!gemini) {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GOOGLE_AI_API_KEY is required");
    gemini = new GoogleGenerativeAI(apiKey);
  }
  return gemini;
}

interface StreamRequest {
  topic: string;
  side: "for" | "against";
  model: "claude" | "gpt-4" | "gemini" | "grok";
  round: number;
  previousMessages: Array<{
    side: "for" | "against";
    content: string;
    round: number;
  }>;
  pillars?: Array<{
    title: string;
    skepticPremise: string;
    proponentRebuttal: string;
  }>;
}

function buildSystemPrompt(
  side: "for" | "against",
  topic: string,
  pillars?: StreamRequest["pillars"]
): string {
  const sideDescription =
    side === "for"
      ? "You are arguing IN FAVOR of the claim. Present evidence, logical arguments, and rebuttals that support this position."
      : "You are arguing AGAINST the claim. Present evidence, logical arguments, and rebuttals that challenge this position.";

  let pillarContext = "";
  if (pillars && pillars.length > 0) {
    pillarContext = `\n\nKey points to consider:\n${pillars
      .map(
        (p, i) =>
          `${i + 1}. ${p.title}\n   - Skeptic view: ${p.skepticPremise}\n   - Proponent view: ${p.proponentRebuttal}`
      )
      .join("\n")}`;
  }

  return `You are participating in a structured debate about the following claim:

"${topic}"

${sideDescription}

Guidelines:
- Be concise but substantive (2-3 paragraphs max)
- Reference specific evidence and reasoning
- If responding to previous arguments, address them directly
- Maintain a respectful, academic tone
- Focus on the strongest arguments for your position
- Avoid personal attacks or emotional appeals
${pillarContext}

Respond with your argument only, no meta-commentary about the debate format.`;
}

function buildUserPrompt(
  round: number,
  previousMessages: StreamRequest["previousMessages"],
  side: "for" | "against"
): string {
  if (round === 1) {
    return side === "for"
      ? "Present your opening argument in favor of the claim."
      : "Present your opening argument against the claim.";
  }

  const lastOpponentMessage = previousMessages
    .filter((m) => m.side !== side)
    .pop();

  if (lastOpponentMessage) {
    return `Your opponent argued:\n\n"${lastOpponentMessage.content}"\n\nProvide your rebuttal and strengthen your position.`;
  }

  return `Continue making your case ${side === "for" ? "in favor of" : "against"} the claim.`;
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
        const message =
          error instanceof Error ? error.message : "Unknown error";
        controller.enqueue(
          sseEvent({ error: message, model })
        );
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
}
