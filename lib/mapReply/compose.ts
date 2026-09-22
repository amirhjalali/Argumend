/**
 * Turn probe numbers plus map data into the reply object.
 *
 * This step is pure: same answers in, same reply out. It is also the step that
 * enforces the product rule — every line it produces is either a number from
 * Jev or a sentence that already exists in the topic data. Nothing here writes
 * prose about the argument, and nothing here names a winner.
 */
import { calculateEvidenceScore } from "@/lib/evidenceMetrics";
import { SITE_URL } from "@/lib/site";
import type { Evidence, Pillar, Topic } from "@/lib/schemas/topic";
import type { JevAnswer } from "@/lib/jev/types";
import { MAP_REPLY_THRESHOLDS, patternLabel } from "./constants";
import type { ParsedThread } from "./parse";
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
  MapReplyTopicChoice,
  MapReplyTurn,
} from "./types";

type Answers = Record<string, JevAnswer>;

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

export function threadStats(parsed: ParsedThread, characterCount: number): MapReplyThreadStats {
  return {
    turnCount: parsed.turns.length,
    substantiveCount: parsed.substantive.length,
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

function toTurn(
  turn: ParsedThread["substantive"][number],
  pillars: readonly Pillar[],
  answers: Answers,
): MapReplyTurn {
  const section = choiceOf(answers, `section_${turn.index}`, NONE_OPTION);
  const stance = choiceOf(answers, `stance_${turn.index}`, "neither");
  const fallacy = noulOf(answers, `fallacy_${turn.index}`);
  const factual = noulOf(answers, `factual_${turn.index}`);
  const pillar = pillars.find((candidate) => candidate.id === section.choice);

  return {
    index: turn.index,
    speaker: turn.speaker,
    text: turn.text,
    wordCount: turn.wordCount,
    section: section.choice,
    sectionTitle: pillar?.title ?? null,
    sectionConfidence: section.confidence,
    sectionProbabilities: section.probabilities,
    stance: stance.choice,
    stanceConfidence: stance.confidence,
    stanceProbabilities: stance.probabilities,
    fallacy,
    factual,
    notAnArgument: isNotAnArgument(section.choice, fallacy, factual),
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

  const counts = new Map<string, number>();
  for (const turn of turns) {
    const key = turn.notAnArgument ? NONE_OPTION : turn.section;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const sectionCounts: MapReplySectionCount[] = [
    ...pillars.map((pillar) => ({
      id: pillar.id,
      title: pillar.title,
      count: counts.get(pillar.id) ?? 0,
    })),
    { id: NONE_OPTION, title: "Not an argument about the topic", count: counts.get(NONE_OPTION) ?? 0 },
  ];

  // Ties go to map order, so the same thread always lands on the same section.
  const dominant = sectionCounts
    .filter((section) => section.id !== NONE_OPTION && section.count > 0)
    .reduce<MapReplySectionCount | null>(
      (best, section) => (best === null || section.count > best.count ? section : best),
      null,
    );
  const dominantPillar = dominant ? pillars.find((pillar) => pillar.id === dominant.id) : undefined;

  const speakersWithTurns = new Map<string, { total: number; noise: number }>();
  for (const turn of turns) {
    const entry = speakersWithTurns.get(turn.speaker) ?? { total: 0, noise: 0 };
    entry.total += 1;
    if (turn.notAnArgument) entry.noise += 1;
    speakersWithTurns.set(turn.speaker, entry);
  }
  const notArguing = [...speakersWithTurns.entries()]
    .filter(([, entry]) => entry.total > 0 && entry.total === entry.noise)
    .map(([speaker]) => speaker);

  const pattern = choiceOf(threadAnswers, "pattern", "mixed-disagreement");
  const cruxes: MapReplyCruxTouch[] = pillars.map((pillar) => ({
    pillarId: pillar.id,
    pillarTitle: pillar.title,
    cruxId: pillar.crux.id,
    cruxTitle: pillar.crux.title,
    cruxDescription: pillar.crux.description,
    touched: noulOf(cruxAnswers, `crux_${pillar.id}`),
    touchedThreshold: MAP_REPLY_THRESHOLDS.cruxTouched,
    isDominantSection: pillar.id === dominant?.id,
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
    candidates: input.candidates,
    topicChoice: input.topicChoice,
    sectionCounts,
    dominantSection:
      dominant && dominantPillar
        ? {
            id: dominantPillar.id,
            title: dominantPillar.title,
            summary: dominantPillar.short_summary,
            count: dominant.count,
            cruxId: dominantPillar.crux.id,
            cruxTitle: dominantPillar.crux.title,
            cruxDescription: dominantPillar.crux.description,
          }
        : null,
    turns,
    notArguing,
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
    candidates: input.candidates,
    topicChoice: input.topicChoice,
    execution: input.execution,
  };
  return { ...withoutMarkdown, markdown: input.renderMarkdown(withoutMarkdown) };
}
