import { NextRequest, NextResponse } from "next/server";

// Lazy initialization to avoid build-time errors
let anthropic: any = null;
let openai: any = null;

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

interface DebateRequest {
  topic: string;
  topicId: string;
  side: "for" | "against";
  model: "claude" | "gpt-4" | "gemini" | "llama";
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

function buildSystemPrompt(side: "for" | "against", topic: string, pillars?: DebateRequest["pillars"]): string {
  const sideDescription = side === "for"
    ? "You are arguing IN FAVOR of the claim. Present evidence, logical arguments, and rebuttals that support this position."
    : "You are arguing AGAINST the claim. Present evidence, logical arguments, and rebuttals that challenge this position.";

  let pillarContext = "";
  if (pillars && pillars.length > 0) {
    pillarContext = `\n\nKey points to consider:\n${pillars.map((p, i) =>
      `${i + 1}. ${p.title}\n   - Skeptic view: ${p.skepticPremise}\n   - Proponent view: ${p.proponentRebuttal}`
    ).join("\n")}`;
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
): Promise<string> {
  const client = await getAnthropic();
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  const textBlock = response.content.find((block: any) => block.type === "text");
  return textBlock ? textBlock.text : "Unable to generate argument.";
}

async function generateWithGPT4(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const client = await getOpenAI();
  const response = await client.chat.completions.create({
    model: "gpt-4o",
    max_tokens: 1024,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  return response.choices[0]?.message?.content || "Unable to generate argument.";
}

async function generateWithGemini(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  // Use OpenAI-compatible endpoint for Gemini via Google's API
  // For now, fallback to Claude as Gemini requires different setup
  return generateWithClaude(systemPrompt, userPrompt);
}

async function generateWithLlama(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  // Llama would require different setup (e.g., via Together AI, Replicate, or local)
  // For now, fallback to Claude
  return generateWithClaude(systemPrompt, userPrompt);
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

    let argument: string;

    switch (model) {
      case "claude":
        argument = await generateWithClaude(systemPrompt, userPrompt);
        break;
      case "gpt-4":
        argument = await generateWithGPT4(systemPrompt, userPrompt);
        break;
      case "gemini":
        argument = await generateWithGemini(systemPrompt, userPrompt);
        break;
      case "llama":
        argument = await generateWithLlama(systemPrompt, userPrompt);
        break;
      default:
        argument = await generateWithClaude(systemPrompt, userPrompt);
    }

    return NextResponse.json({ argument });
  } catch (error) {
    console.error("Debate API error:", error);
    return NextResponse.json(
      { error: "Failed to generate debate argument" },
      { status: 500 }
    );
  }
}
