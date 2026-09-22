import type { PrefilterCandidate } from "./prefilter";
import type { ScrubCounts } from "./scrub";

export interface MapReplyThreadStats {
  turnCount: number;
  substantiveCount: number;
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
  count: number;
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
  candidates: PrefilterCandidate[];
  topicChoice: MapReplyTopicChoice;
  sectionCounts: MapReplySectionCount[];
  dominantSection: MapReplyDominantSection | null;
  turns: MapReplyTurn[];
  /** Speakers whose every probed turn was composed as "not an argument". */
  notArguing: string[];
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
  candidates: PrefilterCandidate[];
  topicChoice: MapReplyTopicChoice | null;
  markdown: string;
  execution: MapReplyExecution;
}

export type MapReplyResult = MapReplyMatch | MapReplyNoMatch;
