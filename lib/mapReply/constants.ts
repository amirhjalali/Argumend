/** Version stamped onto every reply so stored output can be traced to its rules. */
export const MAP_REPLY_VERSION = "map-reply-v1.0.0";

export const MAP_REPLY_LIMITS = {
  /** Below this a paste cannot carry an argument worth mapping. */
  minCharacters: 120,
  /**
   * Well under the vendor's 32k-token state limit: 12,000 characters is about
   * 3,000 tokens, and the transcript is sent in three of the four stages.
   */
  maxCharacters: 12_000,
  /** Shorter turns get no per-turn questions: "ok" and "lol" route to noise. */
  minTurnWords: 12,
  /** Hard cap on probed turns, i.e. at most 6 chunked requests. */
  maxSubstantiveTurns: 48,
  /**
   * Eight turns per request, with only those turns in the state. The 114-turn
   * clip that went into one state collapsed every fallacy score to the
   * transcript mean (see the 2026-09-17 addendum in the probe review).
   */
  turnsPerRequest: 8,
  /** Per-turn text sent to Jev; long monologues are truncated, not dropped. */
  maxTurnCharacters: 1_200,
  /** Transcript sent with the topic, thread-level and crux probes. */
  maxTranscriptCharacters: 12_000,
  /**
   * Refuse a body larger than this without reading it. Generous against
   * `maxCharacters`, because JSON escaping and multi-byte UTF-8 both inflate
   * the wire size of a legitimate paste; it only catches obvious floods.
   */
  maxRequestBytes: 64 * 1024,
  /** Lexical shortlist size. One Choice over 156 maps is not a real question. */
  prefilterCandidates: 8,
} as const;

export const MAP_REPLY_THRESHOLDS = {
  /** Below this the thread gets a "no map" result instead of a wrong map. */
  topicConfidence: 0.5,
  /**
   * Below this a turn is not placed on the map at all. The routing experiment
   * scored 93.3% overall but 95.2% on placements above 0.7, and the demo
   * thread's genuinely ambiguous comment landed at 41%. Counting a coin-flip
   * placement toward a section, and then asserting the section as fact, is the
   * one way this reply can be confidently wrong.
   */
  sectionConfidence: 0.7,
  /** Composed "not an argument": high fallacy AND almost no checkable content. */
  fallacy: 0.8,
  factual: 0.2,
  /** Thread-level nouls (talking past, definitional) shown at or above this. */
  threadSignal: 0.5,
  /** A map crux counts as touched at or above this. */
  cruxTouched: 0.5,
} as const;

/** The HTTP lane posts user text to a third party, so the budget is tight. */
export const MAP_REPLY_RATE_LIMITS = {
  perHour: 10,
  perDay: 40,
  hourWindowMs: 60 * 60 * 1000,
  dayWindowMs: 24 * 60 * 60 * 1000,
} as const;

/** Whole-pipeline budget, covering every Jev request it makes. */
export const MAP_REPLY_TIMEOUT_MS = 45_000;

/** The eight patterns used in the probe harness, with reader-facing labels. */
export const MAP_REPLY_PATTERNS = {
  "single-empirical-crux": {
    label: "Single empirical crux",
    description: "One factual question, if settled, would resolve it",
  },
  "causal-model-split": {
    label: "Causal model split",
    description: "They agree on facts but disagree on what causes what",
  },
  "forecast-split": {
    label: "Forecast split",
    description: "They disagree mainly about what will happen",
  },
  "definition-mismatch": {
    label: "Definition mismatch",
    description: "They mean different things by a key term",
  },
  "value-conflict": {
    label: "Value conflict",
    description: "They disagree about what matters, and evidence would not change that",
  },
  "priority-tradeoff": {
    label: "Priority tradeoff",
    description: "They share values but rank competing goods differently under a constraint",
  },
  "mixed-disagreement": {
    label: "Mixed disagreement",
    description: "Two or more distinct disagreements of different kinds are stacked together",
  },
  "mostly-common-ground": {
    label: "Mostly common ground",
    description: "They mostly agree",
  },
} as const;

export type MapReplyPatternId = keyof typeof MAP_REPLY_PATTERNS;

export function patternLabel(pattern: string): string {
  return pattern in MAP_REPLY_PATTERNS
    ? MAP_REPLY_PATTERNS[pattern as MapReplyPatternId].label
    : pattern;
}

/**
 * Environment override for the topic-selection gate, so the threshold can be
 * tuned in a deployment without a code change. Out-of-range values are ignored.
 */
export function resolveTopicConfidenceThreshold(override?: number): number {
  if (typeof override === "number" && override >= 0 && override <= 1) return override;
  // A blank variable must not read as zero, which would show a map for any
  // thread at all.
  const configured = process.env.MAP_REPLY_TOPIC_CONFIDENCE?.trim();
  if (!configured) return MAP_REPLY_THRESHOLDS.topicConfidence;
  const fromEnv = Number(configured);
  if (Number.isFinite(fromEnv) && fromEnv >= 0 && fromEnv <= 1) return fromEnv;
  return MAP_REPLY_THRESHOLDS.topicConfidence;
}
