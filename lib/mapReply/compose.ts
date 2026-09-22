/**
 * Turn probe numbers plus map data into the reply object.
 *
 * This step is pure: same answers in, same reply out. It is also the step that
 * enforces the product rule — every line it produces is either a number from
 * Jev or a sentence that already exists in the topic data. Nothing here writes
 * prose about the argument, and nothing here names a winner.
 *
 * Two kinds of honesty are enforced here rather than left to the renderer.
 * A placement below the confidence floor is *unplaced*, not quietly counted
 * toward a section the reply then asserts as fact. And a speaker is only said
 * to have made no argument when every turn they took was actually probed —
 * short turns and turns past the cap never reach the model, and a reply that
 * forgets that is telling the reader something it does not know.
 */
import { calculateEvidenceScore } from "@/lib/evidenceMetrics";
import { SITE_URL } from "@/lib/site";
import type { Evidence, Pillar, Topic } from "@/lib/schemas/topic";
import type { JevAnswer } from "@/lib/jev/types";
import { MAP_REPLY_THRESHOLDS, patternLabel } from "./constants";
import type { ParsedThread, ThreadTurn } from "./parse";
import type { PrefilterCandidate } from "./prefilter";
import { NONE_OPTION } from "./questions";
import type {
  MapReplyCruxTouch,
  MapReplyEvidenceItem,
  MapReplyExecution,
  MapReplyMatch,
  MapReplyNoMatch,
  MapReplyNoMatchReason,
  MapReplySectionCount,
  MapReplyThreadStats,
  MapReplyThresholds,
  MapReplyTopicChoice,
  MapReplyTurn,
} from "./types";

type Answers = Record<string, JevAnswer>;

/** The id used for a turn that was probed but not placed with confidence. */
export const UNPLACED_OPTION = "unplaced";

/** A missing answer is treated as "no signal", never as a confident one. */
function choiceOf(answers: Answers, id: string, fallback: string) {
  const answer = answers[id];
  return {
    choice: typeof answer?.choice === "string" ? answer.choice : fallback,
    confidence: typeof answer?.confidence === "number" ? answer.confidence : 0,
    probabilities: answer?.probabilities ?? {},
  };
}

function noulOf(answers: Answers, id: string): number {
  const value = answers[id]?.noul;
  return typeof value === "number" ? value : 0;
}

export function mapReplyThresholds(): MapReplyThresholds {
  return {
    topicConfidence: MAP_REPLY_THRESHOLDS.topicConfidence,
    sectionConfidence: MAP_REPLY_THRESHOLDS.sectionConfidence,
    fallacy: MAP_REPLY_THRESHOLDS.fallacy,
    factual: MAP_REPLY_THRESHOLDS.factual,
    threadSignal: MAP_REPLY_THRESHOLDS.threadSignal,
    cruxTouched: MAP_REPLY_THRESHOLDS.cruxTouched,
  };
}

export function threadStats(parsed: ParsedThread, characterCount: number): MapReplyThreadStats {
  return {
    turnCount: parsed.turns.length,
    substantiveCount: parsed.substantive.length,
    /** Turns that got no per-turn questions: too short, or past the cap. */
    unprobedCount: parsed.turns.length - parsed.substantive.length,
    wordCount: parsed.wordCount,
    characterCount,
    hasSpeakerLabels: parsed.hasSpeakerLabels,
    speakers: parsed.speakers,
    truncated: parsed.truncated,
  };
}

/**
 * "Not an argument" is composed, not asked: an explicit "none", or a high
 * fallacy score with almost no checkable content. The section Choice alone put
 * the insult comment in a different place across runs at 16–40% confidence.
 */
export function isNotAnArgument(section: string, fallacy: number, factual: number): boolean {
  return (
    section === NONE_OPTION ||
    (fallacy >= MAP_REPLY_THRESHOLDS.fallacy && factual <= MAP_REPLY_THRESHOLDS.factual)
  );
}

/**
 * Where a turn lands. `tentative` is a placement the model made but not
 * confidently enough to assert; it counts as unplaced and is hedged in the
 * reply rather than being dropped, because the probability is still worth
 * showing.
 */
export type MapReplyPlacement = "confident" | "tentative" | "none";

export function placementFor(
  section: string,
  confidence: number,
  notAnArgument: boolean,
): MapReplyPlacement {
  if (notAnArgument || section === NONE_OPTION) return "none";
  return confidence >= MAP_REPLY_THRESHOLDS.sectionConfidence ? "confident" : "tentative";
}

function toTurn(turn: ThreadTurn, pillars: readonly Pillar[], answers: Answers): MapReplyTurn {
  const section = choiceOf(answers, `section_${turn.index}`, NONE_OPTION);
  const stance = choiceOf(answers, `stance_${turn.index}`, "neither");
  const fallacy = noulOf(answers, `fallacy_${turn.index}`);
  const factual = noulOf(answers, `factual_${turn.index}`);
  const pillar = pillars.find((candidate) => candidate.id === section.choice);
  const notAnArgument = isNotAnArgument(section.choice, fallacy, factual);

  return {
    index: turn.index,
    speaker: turn.speaker,
    text: turn.text,
    wordCount: turn.wordCount,
    section: section.choice,
    sectionTitle: pillar?.title ?? null,
    sectionConfidence: section.confidence,
    sectionProbabilities: section.probabilities,
    placement: placementFor(section.choice, section.confidence, notAnArgument),
    stance: stance.choice,
    stanceConfidence: stance.confidence,
    stanceProbabilities: stance.probabilities,
    fallacy,
    factual,
    notAnArgument,
  };
}

/**
 * At most one item per side, strongest first, never the same item twice.
 * Sections whose evidence is all on one side still get two items; each is
 * labelled with its own side rather than being presented as a pair.
 */
export function selectEvidence(pillar: Pillar | undefined): MapReplyEvidenceItem[] {
  const ranked = [...(pillar?.evidence ?? [])].sort(
    (a, b) => calculateEvidenceScore(b.weight) - calculateEvidenceScore(a.weight) || a.id.localeCompare(b.id),
  );
  if (ranked.length === 0) return [];

  const picked: Evidence[] = [];
  const strongestFor = ranked.find((item) => item.side === "for");
  const strongestAgainst = ranked.find((item) => item.side === "against");
  if (strongestFor) picked.push(strongestFor);
  if (strongestAgainst) picked.push(strongestAgainst);
  if (picked.length < 2) {
    const filler = ranked.find((item) => !picked.includes(item));
    if (filler) picked.push(filler);
  }

  return picked
    .sort((a, b) => calculateEvidenceScore(b.weight) - calculateEvidenceScore(a.weight))
    .map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      side: item.side,
      score: calculateEvidenceScore(item.weight),
      ...(item.source ? { source: item.source } : {}),
      ...(item.sourceUrl ? { sourceUrl: item.sourceUrl } : {}),
    }));
}

/**
 * Who never made an argument, split by how much we actually know.
 * `complete` is a speaker whose every turn was probed and flagged. `partial`
 * is one whose probed turns were all flagged but who also said things we never
 * looked at, so the claim has to be qualified.
 */
export function silentSpeakers(
  turns: readonly MapReplyTurn[],
  allTurns: readonly ThreadTurn[],
): { complete: string[]; partial: string[] } {
  const probed = new Map<string, { total: number; noise: number }>();
  for (const turn of turns) {
    const entry = probed.get(turn.speaker) ?? { total: 0, noise: 0 };
    entry.total += 1;
    if (turn.notAnArgument) entry.noise += 1;
    probed.set(turn.speaker, entry);
  }

  const spoken = new Map<string, number>();
  for (const turn of allTurns) {
    spoken.set(turn.speaker, (spoken.get(turn.speaker) ?? 0) + 1);
  }

  const complete: string[] = [];
  const partial: string[] = [];
  for (const [speaker, entry] of probed) {
    if (entry.total === 0 || entry.total !== entry.noise) continue;
    if ((spoken.get(speaker) ?? 0) === entry.total) complete.push(speaker);
    else partial.push(speaker);
  }
  return { complete, partial };
}

export interface ComposeMapReplyInput {
  topic: Topic;
  parsed: ParsedThread;
  characterCount: number;
  candidates: PrefilterCandidate[];
  topicChoice: MapReplyTopicChoice;
  turnAnswers: Answers;
  threadAnswers: Answers;
  cruxAnswers: Answers;
  execution: MapReplyExecution;
  renderMarkdown: (match: Omit<MapReplyMatch, "markdown">) => string;
}

export function composeMapReply(input: ComposeMapReplyInput): MapReplyMatch {
  const { topic, parsed, turnAnswers, threadAnswers, cruxAnswers } = input;
  const pillars = topic.pillars;

  const turns = parsed.substantive.map((turn) => toTurn(turn, pillars, turnAnswers));

  // Confident placements decide the section; tentative ones are counted
  // separately so nothing below the floor can carry the reply's main claim.
  const confident = new Map<string, number>();
  const tentative = new Map<string, number>();
  let noneCount = 0;
  for (const turn of turns) {
    if (turn.placement === "none") noneCount += 1;
    else if (turn.placement === "confident") {
      confident.set(turn.section, (confident.get(turn.section) ?? 0) + 1);
    } else {
      tentative.set(turn.section, (tentative.get(turn.section) ?? 0) + 1);
    }
  }
  const unplacedCount = [...tentative.values()].reduce((sum, count) => sum + count, 0);

  const sectionCounts: MapReplySectionCount[] = [
    ...pillars.map((pillar) => ({
      id: pillar.id,
      title: pillar.title,
      count: confident.get(pillar.id) ?? 0,
      tentative: tentative.get(pillar.id) ?? 0,
    })),
    {
      id: UNPLACED_OPTION,
      title: "Too ambiguous to place",
      count: unplacedCount,
      tentative: 0,
    },
    { id: NONE_OPTION, title: "Not an argument about the topic", count: noneCount, tentative: 0 },
  ];

  // Ties go to map order, so the same thread always lands on the same section.
  const leaderIn = (counts: Map<string, number>) =>
    pillars
      .map((pillar) => ({ pillar, count: counts.get(pillar.id) ?? 0 }))
      .filter((entry) => entry.count > 0)
      .reduce<{ pillar: Pillar; count: number } | null>(
        (best, entry) => (best === null || entry.count > best.count ? entry : best),
        null,
      );

  const confidentLeader = leaderIn(confident);
  // Only when nothing was placed confidently does a tentative leader stand in,
  // and the reply then says so rather than asserting it.
  const leader = confidentLeader ?? leaderIn(tentative);
  const dominantPillar = leader?.pillar;

  const { complete, partial } = silentSpeakers(turns, parsed.turns);

  const pattern = choiceOf(threadAnswers, "pattern", "mixed-disagreement");
  const cruxes: MapReplyCruxTouch[] = pillars.map((pillar) => ({
    pillarId: pillar.id,
    pillarTitle: pillar.title,
    cruxId: pillar.crux.id,
    cruxTitle: pillar.crux.title,
    cruxDescription: pillar.crux.description,
    touched: noulOf(cruxAnswers, `crux_${pillar.id}`),
    touchedThreshold: MAP_REPLY_THRESHOLDS.cruxTouched,
    isDominantSection: pillar.id === dominantPillar?.id,
  }));

  const withoutMarkdown: Omit<MapReplyMatch, "markdown"> = {
    ok: true,
    topic: {
      id: topic.id,
      title: topic.title,
      metaClaim: topic.meta_claim,
      path: `/topics/${topic.id}`,
      url: `${SITE_URL}/topics/${topic.id}`,
    },
    thread: threadStats(parsed, input.characterCount),
    thresholds: mapReplyThresholds(),
    candidates: input.candidates,
    topicChoice: input.topicChoice,
    sectionCounts,
    dominantSection:
      leader && dominantPillar
        ? {
            id: dominantPillar.id,
            title: dominantPillar.title,
            summary: dominantPillar.short_summary,
            count: leader.count,
            tentative: confidentLeader === null,
            cruxId: dominantPillar.crux.id,
            cruxTitle: dominantPillar.crux.title,
            cruxDescription: dominantPillar.crux.description,
          }
        : null,
    turns,
    unplacedCount,
    notArguing: complete,
    notArguingInProbedTurns: partial,
    pattern: {
      pattern: pattern.choice,
      label: patternLabel(pattern.choice),
      confidence: pattern.confidence,
      probabilities: pattern.probabilities,
    },
    signals: {
      empiricalLever: noulOf(threadAnswers, "empirical_lever"),
      valueResidual: noulOf(threadAnswers, "value_residual"),
      talkingPast: noulOf(threadAnswers, "talking_past"),
      definitional: noulOf(threadAnswers, "definitional"),
      threshold: MAP_REPLY_THRESHOLDS.threadSignal,
    },
    cruxes,
    evidence: selectEvidence(dominantPillar),
    execution: input.execution,
  };

  return { ...withoutMarkdown, markdown: input.renderMarkdown(withoutMarkdown) };
}

export interface ComposeNoMatchInput {
  reason: MapReplyNoMatchReason;
  message: string;
  parsed: ParsedThread;
  characterCount: number;
  candidates: PrefilterCandidate[];
  topicChoice: MapReplyTopicChoice | null;
  execution: MapReplyExecution;
  renderMarkdown: (result: Omit<MapReplyNoMatch, "markdown">) => string;
}

export function composeNoMatch(input: ComposeNoMatchInput): MapReplyNoMatch {
  const withoutMarkdown: Omit<MapReplyNoMatch, "markdown"> = {
    ok: false,
    reason: input.reason,
    message: input.message,
    thread: threadStats(input.parsed, input.characterCount),
    thresholds: mapReplyThresholds(),
    candidates: input.candidates,
    topicChoice: input.topicChoice,
    execution: input.execution,
  };
  return { ...withoutMarkdown, markdown: input.renderMarkdown(withoutMarkdown) };
}
