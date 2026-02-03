import { NextRequest, NextResponse } from "next/server";

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
    if (!apiKey) {
      throw new Error("GOOGLE_AI_API_KEY or GEMINI_API_KEY environment variable is required");
    }
    gemini = new GoogleGenerativeAI(apiKey);
  }
  return gemini;
}

interface DebateRequest {
  topic: string;
  topicId: string;
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

interface GenerationResult {
  argument: string;
  actualModel: string;
  fallback?: boolean;
  error?: string;
}

function buildSystemPrompt(
  side: "for" | "against",
  topic: string,
  pillars?: DebateRequest["pillars"]
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
  previousMessages: DebateRequest["previousMessages"],
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

    const textBlock = response.content.find((block: any) => block.type === "text");
    return {
      argument: textBlock ? textBlock.text : "Unable to generate argument.",
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
  try {
    const body: DebateRequest = await request.json();
    const { topic, side, model, round, previousMessages, pillars } = body;

    if (!topic || !side || !model || !round) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const systemPrompt = buildSystemPrompt(side, topic, pillars);
    const userPrompt = buildUserPrompt(round, previousMessages, side);

    let result: GenerationResult;

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
      // Return the specific error to the client so they know which model failed
      const message = error instanceof Error ? error.message : "Unknown error";
      return NextResponse.json(
        {
          error: `${model} failed`,
          details: message,
          model: model,
          canRetry: true,
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      argument: result.argument,
      model: result.actualModel,
      fallback: result.fallback,
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
