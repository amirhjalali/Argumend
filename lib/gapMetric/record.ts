/**
 * Per-reply gap record for the north-star metric (spec
 * docs/plans/2026-09-22-crux-ledger-and-living-ai-map-spec.md §3).
 *
 * COUNTS AND IDS ONLY. The record has no free-text field: every string is an
 * enum, a slug-shaped id checked against a strict pattern, or a day stamp.
 * `GapObservationSchema` is `.strict()` so an unknown key (a paste, an
 * excerpt, an IP) is rejected rather than carried along. See docs/GAP_METRIC.md.
 */
import { z } from "zod";
import type { MapReplyMatch, MapReplyResult } from "@/lib/mapReply/types";
import type { ConfidenceBand, DisagreementReportV1 } from "@/types/disagreement";

export const GAP_LANES = ["map-reply", "analyze-v2"] as const;
export type GapLane = (typeof GAP_LANES)[number];

/**
 * How sure the reply was about where the fight sits. "none": no dominant
 * section; "tentative": the dominant section is a best weak guess; the bands
 * follow the median placement confidence of the dominant section's turns
 * (map-reply) or the diagnosis confidence band (analyze-v2).
 */
export const GAP_CONFIDENCE_BUCKETS = ["none", "tentative", "low", "medium", "high"] as const;
export type GapConfidenceBucket = (typeof GAP_CONFIDENCE_BUCKETS)[number];

/** Lowercase slug: what topic and crux ids look like in `data/`. Never prose. */
export const GAP_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const GAP_SLUG_MAX = 80;
/** Model ids and prompt versions: `claude-opus-4`, `map-reply-v1.0.0`, `jev-1.2`. No spaces. */
export const GAP_VERSION_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:@/-]*$/;
export const GAP_VERSION_MAX = 64;
export const GAP_MAX_CRUX_IDS = 32;
const DAY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/** Stored when a model id or prompt version is not id-shaped: it is dropped, not stored. */
export const GAP_UNKNOWN_ID = "unknown";

const count = z.number().int().min(0).max(10_000);
const slug = z.string().min(1).max(GAP_SLUG_MAX).regex(GAP_SLUG_PATTERN);
const versionId = z.string().min(1).max(GAP_VERSION_MAX).regex(GAP_VERSION_PATTERN);

export const GapObservationSchema = z
  .object({
    lane: z.enum(GAP_LANES),
    /** Which map; null on analyze-v2, which has no map. */
    topicId: slug.nullable(),
    /** Denominator: classified propositions, unmatched excluded. */
    propositionCount: count,
    talkingPastCount: count,
    definitionalCount: count,
    undisputedCount: count,
    contestedCount: count,
    /** Propositions matching nothing in the map; excluded from the denominator. */
    unmatchedCount: count,
    speakerCount: count,
    cruxTouchedCount: count,
    /** Map crux ids the reply touched. Empty on analyze-v2 (its ids are model-minted). */
    cruxClaimIds: z.array(slug).max(GAP_MAX_CRUX_IDS),
    confidenceBucket: z.enum(GAP_CONFIDENCE_BUCKETS),
    modelId: versionId,
    promptVersion: versionId,
    /** Day precision, UTC. */
    observedOn: z.string().regex(DAY_PATTERN),
  })
  .strict()
  .superRefine((value, ctx) => {
    const labelled =
      value.talkingPastCount + value.definitionalCount + value.undisputedCount + value.contestedCount;
    if (labelled !== value.propositionCount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "labels must partition the propositions (one label per proposition)",
      });
    }
  });

export type GapObservation = z.infer<typeof GapObservationSchema>;

export function dayStamp(now: Date): string {
  return now.toISOString().slice(0, 10);
}

function idOrUnknown(value: string | undefined | null): string {
  if (!value) return GAP_UNKNOWN_ID;
  return value.length <= GAP_VERSION_MAX && GAP_VERSION_PATTERN.test(value) ? value : GAP_UNKNOWN_ID;
}

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function bucketFromProbability(p: number): Exclude<GapConfidenceBucket, "none" | "tentative"> {
  if (p >= 0.85) return "high";
  if (p >= 0.7) return "medium";
  return "low";
}

/**
 * Map-reply → gap record. Interpretation (the pipeline has no per-proposition
 * label, so a proposition is one probed turn):
 *
 * - unmatched: a probed turn whose placement is not "confident", or which was
 *   composed as "not an argument". It matches nothing in the map we would assert.
 * - talking past: a confident turn placed in a section other than the dominant
 *   one; it is arguing a different part of the map than the thread's main fight.
 * - definitional: a confident turn in the dominant section when the thread-level
 *   `definitional` signal cleared its threshold.
 * - contested: every other confident turn in the dominant section.
 * - undisputed: always 0. The map-reply lane has no agreement probe; it is not
 *   estimated.
 *
 * Returns null for a no-match result: there is no map to measure against.
 */
export function gapFromMapReply(result: MapReplyResult, now: Date = new Date()): GapObservation | null {
  if (!result.ok) return null;
  return buildMapReplyRecord(result, now);
}

function buildMapReplyRecord(result: MapReplyMatch, now: Date): GapObservation {
  const dominantId = result.dominantSection?.id ?? null;
  const definitionalFight = result.signals.definitional >= result.signals.threshold;
  let talkingPast = 0;
  let definitional = 0;
  let contested = 0;
  let unmatched = 0;
  const dominantConfidences: number[] = [];

  for (const turn of result.turns) {
    if (turn.placement !== "confident" || turn.notAnArgument) {
      unmatched += 1;
      continue;
    }
    if (dominantId === null || turn.section !== dominantId) {
      talkingPast += 1;
      continue;
    }
    dominantConfidences.push(turn.sectionConfidence);
    if (definitionalFight) definitional += 1;
    else contested += 1;
  }

  let confidenceBucket: GapConfidenceBucket;
  if (!result.dominantSection) confidenceBucket = "none";
  else if (result.dominantSection.tentative || dominantConfidences.length === 0) confidenceBucket = "tentative";
  else confidenceBucket = bucketFromProbability(median(dominantConfidences));

  const touched = result.cruxes.filter((crux) => crux.touched >= crux.touchedThreshold);
  const cruxClaimIds = [...new Set(touched.map((crux) => crux.cruxId))]
    .filter((id) => id.length <= GAP_SLUG_MAX && GAP_SLUG_PATTERN.test(id))
    .slice(0, GAP_MAX_CRUX_IDS);

  const topicId =
    result.topic.id.length <= GAP_SLUG_MAX && GAP_SLUG_PATTERN.test(result.topic.id) ? result.topic.id : null;

  return {
    lane: "map-reply",
    topicId,
    propositionCount: talkingPast + definitional + contested,
    talkingPastCount: talkingPast,
    definitionalCount: definitional,
    undisputedCount: 0,
    contestedCount: contested,
    unmatchedCount: unmatched,
    speakerCount: result.thread.speakers.length,
    cruxTouchedCount: touched.length,
    cruxClaimIds,
    confidenceBucket,
    modelId: idOrUnknown(result.execution.model),
    promptVersion: idOrUnknown(result.execution.version),
    observedOn: dayStamp(now),
  };
}

const BAND_TO_BUCKET: Record<ConfidenceBand, GapConfidenceBucket> = {
  low: "low",
  medium: "medium",
  high: "high",
};

/**
 * Disagreement-v2 report → gap record. Interpretation (a proposition is one
 * common-ground item or one disagreement item):
 *
 * - undisputed: each common-ground item.
 * - definitional: each disagreement typed "definitional".
 * - contested: every other disagreement.
 * - talking past: always 0. The v2 schema has no talking-past label.
 * - unmatched: always 0. There is no map to miss.
 *
 * Crux ids are not logged: v2 claim ids are minted by the model per report and
 * mean nothing across reports. Only the count is kept.
 */
export function gapFromDisagreementReport(report: DisagreementReportV1, now: Date = new Date()): GapObservation {
  const definitional = report.disagreements.filter((item) => item.type === "definitional").length;
  const contested = report.disagreements.length - definitional;
  const undisputed = report.commonGround.length;
  const hasFight = report.disagreements.length > 0 || report.cruxes.length > 0;

  return {
    lane: "analyze-v2",
    topicId: null,
    propositionCount: definitional + contested + undisputed,
    talkingPastCount: 0,
    definitionalCount: definitional,
    undisputedCount: undisputed,
    contestedCount: contested,
    unmatchedCount: 0,
    speakerCount: report.participants.length,
    cruxTouchedCount: report.cruxes.length,
    cruxClaimIds: [],
    confidenceBucket: hasFight ? BAND_TO_BUCKET[report.diagnosis.confidence] ?? "low" : "none",
    modelId: idOrUnknown(report.provenance.model),
    promptVersion: idOrUnknown(report.provenance.promptVersion),
    observedOn: dayStamp(now),
  };
}

/** gap(r) per §3.1, or null when there is nothing to divide by. */
export function gapOf(record: Pick<GapObservation, "propositionCount" | "talkingPastCount" | "definitionalCount" | "undisputedCount">): number | null {
  if (record.propositionCount === 0) return null;
  return (record.talkingPastCount + record.definitionalCount + record.undisputedCount) / record.propositionCount;
}

/** The §3.4 Goodhart guardrail: contested share, reported beside the gap. */
export function contestedShareOf(record: Pick<GapObservation, "propositionCount" | "contestedCount">): number | null {
  if (record.propositionCount === 0) return null;
  return record.contestedCount / record.propositionCount;
}
