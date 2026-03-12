import type { DebateMessage } from "@/types/debate";
import type { LLMModel, Topic } from "@/types/logic";

function clampRounds(rounds: number): number {
  if (!Number.isFinite(rounds)) return 3;
  return Math.min(5, Math.max(2, Math.floor(rounds)));
}

function summarizeEvidence(topic: Topic, side: "for" | "against"): string {
  const relevant = topic.pillars
    .flatMap((pillar) => pillar.evidence ?? [])
    .filter((evidence) => evidence.side === side)
    .slice(0, 2)
    .map((evidence) => evidence.title);

  if (!relevant.length) {
    return side === "for"
      ? "The supporting side relies on consistency with the strongest proponent arguments in the map."
      : "The opposing side relies on unresolved objections highlighted in the skeptic arguments.";
  }

  return `Key evidence emphasized: ${relevant.join("; ")}.`;
}

function buildForArgument(topic: Topic, round: number): string {
  const pillar = topic.pillars[(round - 1) % topic.pillars.length];
  const evidence = summarizeEvidence(topic, "for");

  if (round === 1) {
    return [
      `Opening FOR position: ${topic.meta_claim}`,
      `Primary support (${pillar.title}): ${pillar.proponent_rebuttal}`,
      evidence,
      "This side argues the burden is met when the strongest objections are addressed by verifiable evidence.",
    ].join("\n\n");
  }

  return [
    `FOR rebuttal (Round ${round}): The objection in "${pillar.title}" is acknowledged but does not overturn the claim.`,
    `Response focus: ${pillar.proponent_rebuttal}`,
    evidence,
    "This side asks whether the remaining disagreement is about facts or about standards of proof.",
  ].join("\n\n");
}

function buildAgainstArgument(topic: Topic, round: number): string {
  const pillar = topic.pillars[(round - 1) % topic.pillars.length];
  const evidence = summarizeEvidence(topic, "against");

  if (round === 1) {
    return [
      `Opening AGAINST position: The claim is not yet sufficiently established.`,
      `Primary challenge (${pillar.title}): ${pillar.skeptic_premise}`,
      evidence,
      "This side argues confidence should remain constrained until the crux is resolved with stronger independent evidence.",
    ].join("\n\n");
  }

  return [
    `AGAINST rebuttal (Round ${round}): The proponent response does not fully resolve the crux in "${pillar.title}".`,
    `Challenge focus: ${pillar.skeptic_premise}`,
    evidence,
    "This side asks for tighter causal evidence or clearer falsification criteria before increasing confidence.",
  ].join("\n\n");
}

export function generateOfflineDebate(
  topic: Topic,
  forModel: LLMModel,
  againstModel: LLMModel,
  rounds: number
): DebateMessage[] {
  const safeRounds = clampRounds(rounds);
  const messages: DebateMessage[] = [];

  for (let round = 1; round <= safeRounds; round++) {
    messages.push({
      id: `offline-for-${round}`,
      side: "for",
      model: forModel,
      content: buildForArgument(topic, round),
      round,
    });

    messages.push({
      id: `offline-against-${round}`,
      side: "against",
      model: againstModel,
      content: buildAgainstArgument(topic, round),
      round,
    });
  }

  return messages;
}
