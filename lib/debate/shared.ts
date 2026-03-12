/**
 * Shared debate utilities used by both the standard and streaming API routes.
 */

// Lazy SDK singletons
let anthropic: any = null;
let openai: any = null;
let gemini: any = null;

export async function getAnthropic() {
  if (!anthropic) {
    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    anthropic = new Anthropic();
  }
  return anthropic;
}

export async function getOpenAI() {
  if (!openai) {
    const OpenAI = (await import("openai")).default;
    openai = new OpenAI();
  }
  return openai;
}

export async function getGemini() {
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

export function isLiveDebateEnabled(): boolean {
  return (
    process.env.ENABLE_LIVE_DEBATE_API === "true" ||
    process.env.NEXT_PUBLIC_ENABLE_LIVE_DEBATE_API === "true"
  );
}

export interface DebatePillar {
  title: string;
  skepticPremise: string;
  proponentRebuttal: string;
}

export type { DebateMessageInput as DebateMessage } from "@/types/debate";
import type { DebateMessageInput as DebateMessage } from "@/types/debate";

export function buildSystemPrompt(
  side: "for" | "against",
  topic: string,
  pillars?: DebatePillar[]
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

export function buildUserPrompt(
  round: number,
  previousMessages: DebateMessage[],
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
