type DebateSide = "for" | "against";

interface DebateTurnMessage {
  side: DebateSide;
  content: string;
  round: number;
}

interface DebateTurnPillar {
  title: string;
  skepticPremise: string;
  proponentRebuttal: string;
}

export interface ProgrammaticDebateTurnInput {
  topic: string;
  side: DebateSide;
  round: number;
  previousMessages: DebateTurnMessage[];
  pillars?: DebateTurnPillar[];
}

function summarizeOpponent(previousMessages: DebateTurnMessage[], side: DebateSide): string {
  const opponent = previousMessages
    .filter((message) => message.side !== side)
    .slice(-1)[0];

  if (!opponent) return "";
  return opponent.content
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 220);
}

function selectPillar(pillars: DebateTurnPillar[] | undefined, round: number): DebateTurnPillar | null {
  if (!pillars || pillars.length === 0) return null;
  return pillars[(Math.max(1, round) - 1) % pillars.length];
}

function openingFor(topic: string, pillar: DebateTurnPillar | null): string {
  if (!pillar) {
    return [
      `Opening FOR case: ${topic}`,
      "The claim is supported when we prioritize evidence quality, explanatory power, and practical outcomes over isolated objections.",
      "The proponent standard is that confidence should rise when the best objections are answerable with coherent reasoning and observed data.",
    ].join("\n\n");
  }

  return [
    `Opening FOR case: ${topic}`,
    `Core support (${pillar.title}): ${pillar.proponentRebuttal}`,
    "The proponent side argues this establishes a stronger default in favor of the claim, unless opposing evidence can directly overturn it.",
  ].join("\n\n");
}

function openingAgainst(topic: string, pillar: DebateTurnPillar | null): string {
  if (!pillar) {
    return [
      `Opening AGAINST case: ${topic}`,
      "The claim should not be accepted yet because key assumptions remain under-justified and uncertainty is still materially high.",
      "The skeptic standard is that confidence should remain limited until stronger falsifiable evidence resolves the central objections.",
    ].join("\n\n");
  }

  return [
    `Opening AGAINST case: ${topic}`,
    `Core challenge (${pillar.title}): ${pillar.skepticPremise}`,
    "The opposing side argues this unresolved issue blocks a confident conclusion and requires tighter evidence before assent.",
  ].join("\n\n");
}

function rebuttalFor(
  topic: string,
  round: number,
  opponentSummary: string,
  pillar: DebateTurnPillar | null
): string {
  const focus = pillar
    ? `Round ${round} focus (${pillar.title}): ${pillar.proponentRebuttal}`
    : `Round ${round} focus: the supporting side maintains the claim remains better explained by the available evidence.`;

  return [
    `FOR rebuttal on ${topic}.`,
    opponentSummary
      ? `Response to opponent: "${opponentSummary}"`
      : "Response to opponent: the most recent objection does not defeat the core support for the claim.",
    focus,
    "The proponent side argues the remaining disagreement is mostly about proof thresholds, not the underlying directional evidence.",
  ].join("\n\n");
}

function rebuttalAgainst(
  topic: string,
  round: number,
  opponentSummary: string,
  pillar: DebateTurnPillar | null
): string {
  const focus = pillar
    ? `Round ${round} focus (${pillar.title}): ${pillar.skepticPremise}`
    : `Round ${round} focus: the opposing side maintains that key objections are still unresolved.`;

  return [
    `AGAINST rebuttal on ${topic}.`,
    opponentSummary
      ? `Response to opponent: "${opponentSummary}"`
      : "Response to opponent: proponent claims still rely on assumptions that need stronger verification.",
    focus,
    "The skeptic side argues that unresolved uncertainty should keep confidence bounded until independent evidence closes the crux.",
  ].join("\n\n");
}

export function generateProgrammaticDebateTurn(
  input: ProgrammaticDebateTurnInput
): string {
  const { topic, side, round, previousMessages, pillars } = input;
  const safeRound = Math.max(1, Math.floor(round));
  const pillar = selectPillar(pillars, safeRound);
  const opponentSummary = summarizeOpponent(previousMessages, side);

  if (safeRound === 1) {
    return side === "for"
      ? openingFor(topic, pillar)
      : openingAgainst(topic, pillar);
  }

  return side === "for"
    ? rebuttalFor(topic, safeRound, opponentSummary, pillar)
    : rebuttalAgainst(topic, safeRound, opponentSummary, pillar);
}

export function chunkForSse(text: string, wordsPerChunk = 3): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [""];

  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += wordsPerChunk) {
    const part = words.slice(i, i + wordsPerChunk).join(" ");
    chunks.push(i + wordsPerChunk < words.length ? `${part} ` : part);
  }
  return chunks;
}
