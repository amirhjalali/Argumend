import type { PrefilterCandidate } from "./prefilter";
import type { ScrubCounts } from "./scrub";

export interface MapReplyThreadStats {
  turnCount: number;
  /** Turns that got per-turn questions. */
  substantiveCount: number;
  /** Turns that did not: under the word floor, or past the cap. */
  unprobedCount: number;
  wordCount: number;
  characterCount: number;
  hasSpeakerLabels: boolean;
  speakers: string[];
  /** True when the paste had more substantive turns than the cap allows. */
  truncated: boolean;
}

export interface MapReplyTimings {
  parseMs: number;
  prefilterMs: number;
  topicMs: number;
  turnsMs: number;
  threadMs: number;
  cruxMs: number;
  totalMs: number;
}

export interface MapReplyUsage {
  inputTokens: number;
  outputTokens: number;
}

export interface MapReplyExecution {
  version: string;
  lane: "http" | "fake";
  /** Direct identifiers replaced before anything was sent. */
  redactions: ScrubCounts;
  /** The model id the API reported, not the one we asked for. */
  model: string;
  /** Jev requests made, including the topic Choice. */
  requests: number;
  /** Attempts that failed and were retried, across all requests. */
  retries: number;
  usage: MapReplyUsage;
  timings: MapReplyTimings;
}

/** Every gate the reply applied, so a UI can show a probe that just missed. */
export interface MapReplyThresholds {
  topicConfidence: number;
  sectionConfidence: number;
  fallacy: number;
  factual: number;
  threadSignal: number;
  cruxTouched: number;
}

export interface MapReplyTopicChoice {
  choice: string;
  confidence: number;
  probabilities: Record<string, number>;
  threshold: number;
}

/** Every probe value for one turn, so a UI can show the numbers behind a label. */
export interface MapReplyTurn {
  index: number;
  speaker: string;
  /** The turn text as sent to Jev (already merged and truncated). */
  text: string;
  wordCount: number;
  section: string;
  sectionTitle: string | null;
  sectionConfidence: number;
  sectionProbabilities: Record<string, number>;
  /**
   * "confident" cleared the section floor and counts toward a section;
   * "tentative" is a placement too weak to assert, counted as unplaced;
   * "none" is not an argument about the topic at all.
   */
  placement: "confident" | "tentative" | "none";
  stance: string;
  stanceConfidence: number;
  stanceProbabilities: Record<string, number>;
  fallacy: number;
  factual: number;
  /** Composed, not asked: explicit "none", or high fallacy with no checkable content. */
  notAnArgument: boolean;
}

export interface MapReplySectionCount {
  id: string;
  title: string;
  /** Confident placements only. */
  count: number;
  /** Placements below the section floor, shown but never asserted. */
  tentative: number;
}

export interface MapReplyEvidenceItem {
  id: string;
  title: string;
  description: string;
  side: "for" | "against";
  /** 0–40, from `calculateEvidenceScore`. */
  score: number;
  source?: string;
  sourceUrl?: string;
}

export interface MapReplyCruxTouch {
  pillarId: string;
  pillarTitle: string;
  cruxId: string;
  cruxTitle: string;
  cruxDescription: string;
  /** Probability that the participants actually argue about this question. */
  touched: number;
  touchedThreshold: number;
  isDominantSection: boolean;
}

export interface MapReplyPattern {
  pattern: string;
  label: string;
  confidence: number;
  probabilities: Record<string, number>;
}

export interface MapReplySignals {
  empiricalLever: number;
  valueResidual: number;
  talkingPast: number;
  definitional: number;
  threshold: number;
}

export interface MapReplyDominantSection {
  id: string;
  title: string;
  summary: string;
  count: number;
  /** True when no turn cleared the floor and this is the best weak guess. */
  tentative: boolean;
  cruxId: string;
  cruxTitle: string;
  cruxDescription: string;
}

export interface MapReplyMatch {
  ok: true;
  topic: {
    id: string;
    title: string;
    metaClaim: string;
    path: string;
    url: string;
  };
  thread: MapReplyThreadStats;
  thresholds: MapReplyThresholds;
  candidates: PrefilterCandidate[];
  topicChoice: MapReplyTopicChoice;
  sectionCounts: MapReplySectionCount[];
  dominantSection: MapReplyDominantSection | null;
  turns: MapReplyTurn[];
  /** Probed turns whose placement did not clear the section floor. */
  unplacedCount: number;
  /** Speakers whose every turn was probed and composed as "not an argument". */
  notArguing: string[];
  /**
   * Speakers whose *probed* turns were all "not an argument" but who also
   * said things the pipeline never looked at. Any claim about them has to be
   * qualified, and the reply qualifies it.
   */
  notArguingInProbedTurns: string[];
  pattern: MapReplyPattern;
  signals: MapReplySignals;
  cruxes: MapReplyCruxTouch[];
  /** At most one item per side of the dominant section, never duplicated. */
  evidence: MapReplyEvidenceItem[];
  markdown: string;
  execution: MapReplyExecution;
}

export type MapReplyNoMatchReason = "no_turns" | "no_candidates" | "low_confidence" | "map_unavailable";

export interface MapReplyNoMatch {
  ok: false;
  reason: MapReplyNoMatchReason;
  message: string;
  thread: MapReplyThreadStats;
  thresholds: MapReplyThresholds;
  candidates: PrefilterCandidate[];
  topicChoice: MapReplyTopicChoice | null;
  markdown: string;
  execution: MapReplyExecution;
}

export type MapReplyResult = MapReplyMatch | MapReplyNoMatch;
