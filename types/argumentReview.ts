/**
 * Per-map review manifest for ArgumentGraph flagships.
 *
 * Source of the requirements: docs/plans/2026-08-12-argumentgraph-north-star.md,
 * "P0 — make the cohort safe to test" item 4 (owner, last full review, next due
 * date, fast-moving node IDs, trigger events, correction log) and the
 * "Ongoing-war and fast-moving-topic gate" cadences. The manifest is checked-in
 * JSON next to the draft graph (data/topics/drafts/<topicId>.manifest.json),
 * deliberately not a CMS or database record.
 *
 * The page-level ARGUMENT_TOPICS_LAST_UPDATED constant keeps its existing
 * cohort-wide meaning; this manifest adds topic- and node-level due dates
 * without replacing it.
 */

/** Review cadence classes named in the north-star freshness gate. */
export type ReviewCadence = "ongoing-war" | "fast-moving-statistics";

/** ISO calendar date, YYYY-MM-DD. */
export type IsoDate = string;

export interface FastMovingNode {
  /** Evidence node id in the topic's ArgumentGraph. */
  id: string;
  /** Why this finding goes stale on the headline-check cadence. */
  why: string;
}

/** Where a correction came from. Mirrors the review packet's finding sources. */
export type CorrectionOrigin =
  | "adversarial-review"
  | "freshness-check"
  | "source-audit"
  | "reader-report"
  | "editorial";

/**
 * One changelog entry per update. The north-star requires every update to
 * name factual changes, topology changes, and whether the top crux ordering
 * moved.
 */
export interface CorrectionLogEntry {
  date: IsoDate;
  origin: CorrectionOrigin;
  summary: string;
  factualChanges: string[];
  topologyChanges: string[];
  cruxOrderMoved: boolean;
  /** Graph node ids touched by the correction, when specific. */
  nodeIds?: string[];
}

export interface ArgumentReviewManifest {
  topicId: string;
  manifestVersion: 1;
  /** Accountable reviewer. "founder" until a second reviewer exists. */
  owner: string;
  cadence: ReviewCadence;
  /** Date of the last full-map review (all nodes, edges, metadata, crux order). */
  lastFullReview: IsoDate;
  /** Date headline facts and governing authorities were last re-checked. */
  lastHeadlineCheck: IsoDate;
  /** Must be no later than lastHeadlineCheck plus the cadence's headline interval. */
  nextHeadlineCheckDue: IsoDate;
  /** Must be no later than lastFullReview plus the cadence's full-review interval. */
  nextFullReviewDue: IsoDate;
  fastMovingNodes: FastMovingNode[];
  /** Events that trigger an immediate review regardless of the calendar. */
  triggerEvents: string[];
  correctionLog: CorrectionLogEntry[];
  /** Free-form reasoning the founder can override. */
  notes?: string[];
}
