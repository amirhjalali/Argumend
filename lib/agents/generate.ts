/**
 * Agent Response Generation
 *
 * Generates responses using agent definitions.
 * Uses Claude as the underlying model for voice consistency.
 */

import { buildCruxtaceanPrompt, type CruxtaceanContext } from "./cruxtacean";

// Lazy initialization to avoid build-time errors
let anthropic: any = null;

async function getAnthropic() {
  if (!anthropic) {
    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    anthropic = new Anthropic();
  }
  return anthropic;
}

/**
 * Generate a response in Cruxtacean's voice
 */
export async function generateCruxtaceanResponse(
  context: CruxtaceanContext
): Promise<string> {
  const { system, user } = buildCruxtaceanPrompt(context);
  const client = await getAnthropic();

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system,
    messages: [{ role: "user", content: user }],
  });

  const textBlock = response.content.find(
    (block: any) => block.type === "text"
  );
  return textBlock?.text || "Unable to generate response.";
}

/**
 * Generate a Cruxtacean reply to a Moltbook comment
 */
export async function generateCruxtaceanReply(
  author: string,
  content: string,
  threadContext?: string
): Promise<string> {
  return generateCruxtaceanResponse({
    author,
    content,
    threadContext,
    responseType: "reply",
  });
}

/**
 * Generate a new Moltbook post as Cruxtacean
 */
export async function generateCruxtaceanPost(
  topic: string,
  context?: string
): Promise<string> {
  return generateCruxtaceanResponse({
    author: "Cruxtacean",
    content: topic,
    threadContext: context,
    responseType: "post",
  });
}

/**
 * Generate a debate argument as Cruxtacean
 */
export async function generateCruxtaceanDebateArgument(
  opponentName: string,
  opponentArgument: string,
  debateContext?: string
): Promise<string> {
  return generateCruxtaceanResponse({
    author: opponentName,
    content: opponentArgument,
    threadContext: debateContext,
    responseType: "debate-argument",
  });
}
