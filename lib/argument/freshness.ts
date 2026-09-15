/**
 * Per-topic freshness diagnostics for ArgumentGraph flagships.
 *
 * Implements north-star P2 item 2: generated diagnostics for missing
 * publishedAt/verifiedAt, overdue fast-moving evidence, unmatched metadata
 * keys, and top-crux evidence disclosures. Everything here is a pure function
 * of the graph, its review manifest, its authored metadata, and the crux
 * ranking; the CLI in scripts/argument-freshness.ts renders the result.
 *
 * Severity stance, per the north-star ("signals, not verdicts"): only broken
 * references are errors. Everything about dates and disclosures is a warning
 * for a human to triage.
 */
import type { ArgumentGraph, ArgumentNode, Claim, Evidence } from "@/types/argument";
import type { ArgumentReviewManifest, IsoDate } from "@/types/argumentReview";
import type { CruxResult } from "@/lib/crux/rank";
import { REVIEW_CADENCES, addDays, daysBetween } from "./reviewManifest";

/** The slice of authored topic metadata the diagnostic reads. */
export interface FreshnessMetadata {
  advocates?: Record<string, unknown>;
  cruxNotes?: Record<string, { question?: string; fight: string; soWhat: string }>;
}

export interface FreshnessInput {
  graph: ArgumentGraph;
  manifest: ArgumentReviewManifest;
  meta: FreshnessMetadata;
  cruxes: CruxResult[];
  /** ISO date the diagnostic is evaluated against. */
  today: IsoDate;
}

export interface FreshnessError {
  code:
    | "fast-moving-node-unknown"
    | "fast-moving-node-not-evidence"
    | "correction-node-unknown"
    | "metadata-key-unmatched";
  message: string;
  nodeId?: string;
}

export interface ReviewStatus {
  cadence: ArgumentReviewManifest["cadence"];
  lastFullReview: IsoDate;
  nextFullReviewDue: IsoDate;
  /** Positive when overdue, zero otherwise. */
  fullReviewOverdueDays: number;
  lastHeadlineCheck: IsoDate;
  nextHeadlineCheckDue: IsoDate;
  headlineCheckOverdueDays: number;
}

export interface EvidenceDateCoverage {
  /** Non-superseded evidence nodes considered. */
  evidenceCount: number;
  missingPublishedAt: string[];
  missingVerifiedAt: string[];
}

export interface FastMovingStatus {
  nodeId: string;
  /** Date the node was last known good: latest of source.verifiedAt and the manifest's headline check. */
  referenceDate: IsoDate;
  dueDate: IsoDate;
  /** Positive when overdue, zero otherwise. */
  daysOverdue: number;
}

export interface MetadataKeyStatus {
  /** Keys that reference a node of the wrong type or no node at all (also reported as errors). */
  unmatched: { field: "advocates" | "cruxNotes"; key: string; reason: string }[];
  /** Crux notes authored for claims the engine does not currently rank. */
  notesForNonCruxClaims: string[];
}

export type EvidenceQuota = "exempt" | "met" | "gap";
export type GapDisclosure = "not-needed" | "disclosed" | "missing";

export interface TopCruxDisclosure {
  rank: number;
  claimId: string;
  epistemicType: Claim["epistemicType"];
  status: Claim["status"];
  hasQuestion: boolean;
  hasFight: boolean;
  hasSoWhat: boolean;
  hasResolution: boolean;
  /** Direct `evidences` edges from non-superseded evidence, by polarity. */
  directEvidence: { supporting: number; challenging: number; qualifying: number };
  /**
   * Empirical and predictive cruxes need direct evidence on both sides;
   * definitional, normative, and procedural cruxes are exempt from the quota.
   */
  evidenceQuota: EvidenceQuota;
  /** When the quota is not met, whether the authored note discloses the gap. */
  gapDisclosure: GapDisclosure;
  issues: string[];
}

export interface FreshnessReport {
  topicId: string;
  today: IsoDate;
  errors: FreshnessError[];
  review: ReviewStatus;
  evidenceDates: EvidenceDateCoverage;
  fastMoving: FastMovingStatus[];
  metadataKeys: MetadataKeyStatus;
  topCruxes: TopCruxDisclosure[];
  /** Human-readable, one line per signal. */
  warnings: string[];
}

const EVIDENCE_QUOTA_TYPES = new Set<Claim["epistemicType"]>(["empirical", "predictive"]);

/**
 * Heuristic, by design: recognises the ways the authored notes currently say
 * "the map has no decisive evidence here". False negatives are tolerated;
 * a reviewer confirms the wording, the diagnostic only points at it.
 */
const GAP_DISCLOSURE_PATTERN =
  /\b(?:has not (?:yet )?found|does not (?:yet )?have|not (?:yet )?(?:have|found) decisive|no (?:clean|decisive|direct) (?:evidence|counterfactual|data)|no evidence resolves|evidence (?:alone )?cannot|cannot (?:settle|decide|resolve)|no dataset settles|absence of (?:direct|decisive) evidence|no amount of evidence)\b/i;

export function diagnoseArgumentFreshness(input: FreshnessInput): FreshnessReport {
  const { graph, manifest, meta, cruxes, today } = input;
  const nodesById = new Map<string, ArgumentNode>(graph.nodes.map((node) => [node.id, node]));
  const errors: FreshnessError[] = [];
  const warnings: string[] = [];

  const review = reviewStatus(manifest, today);
  if (review.fullReviewOverdueDays > 0) {
    warnings.push(
      `full review overdue by ${review.fullReviewOverdueDays} day(s) (due ${review.nextFullReviewDue}, cadence ${review.cadence})`
    );
  }
  if (review.headlineCheckOverdueDays > 0) {
    warnings.push(
      `headline check overdue by ${review.headlineCheckOverdueDays} day(s) (due ${review.nextHeadlineCheckDue}, cadence ${review.cadence})`
    );
  }

  const evidenceDates = evidenceDateCoverage(graph);
  if (evidenceDates.missingPublishedAt.length > 0) {
    warnings.push(
      `${evidenceDates.missingPublishedAt.length}/${evidenceDates.evidenceCount} evidence nodes lack source.publishedAt`
    );
  }
  if (evidenceDates.missingVerifiedAt.length > 0) {
    warnings.push(
      `${evidenceDates.missingVerifiedAt.length}/${evidenceDates.evidenceCount} evidence nodes lack source.verifiedAt`
    );
  }

  const fastMoving = fastMovingStatuses(manifest, nodesById, today, errors);
  const overdueFastMoving = fastMoving.filter((status) => status.daysOverdue > 0);
  if (overdueFastMoving.length > 0) {
    warnings.push(
      `${overdueFastMoving.length}/${fastMoving.length} fast-moving evidence nodes past their headline-check due date`
    );
  }

  for (const entry of manifest.correctionLog) {
    for (const nodeId of entry.nodeIds ?? []) {
      if (!nodesById.has(nodeId)) {
        errors.push({
          code: "correction-node-unknown",
          nodeId,
          message: `correction log entry dated ${entry.date} references unknown node "${nodeId}"`,
        });
      }
    }
  }

  const metadataKeys = metadataKeyStatus(meta, nodesById, cruxes, errors);
  if (metadataKeys.notesForNonCruxClaims.length > 0) {
    warnings.push(
      `crux notes authored for claims not currently ranked: ${metadataKeys.notesForNonCruxClaims.join(", ")}`
    );
  }

  const topCruxes = cruxes.flatMap((crux, index) =>
    topCruxDisclosure(crux, index + 1, graph, nodesById, meta)
  );
  for (const crux of topCruxes) {
    for (const issue of crux.issues) {
      warnings.push(`crux #${crux.rank} ${crux.claimId} (${crux.epistemicType}): ${issue}`);
    }
  }

  return {
    topicId: graph.topicId,
    today,
    errors,
    review,
    evidenceDates,
    fastMoving,
    metadataKeys,
    topCruxes,
    warnings,
  };
}

function reviewStatus(manifest: ArgumentReviewManifest, today: IsoDate): ReviewStatus {
  return {
    cadence: manifest.cadence,
    lastFullReview: manifest.lastFullReview,
    nextFullReviewDue: manifest.nextFullReviewDue,
    fullReviewOverdueDays: Math.max(0, daysBetween(manifest.nextFullReviewDue, today)),
    lastHeadlineCheck: manifest.lastHeadlineCheck,
    nextHeadlineCheckDue: manifest.nextHeadlineCheckDue,
    headlineCheckOverdueDays: Math.max(0, daysBetween(manifest.nextHeadlineCheckDue, today)),
  };
}

function isCurrentEvidence(node: ArgumentNode | undefined): node is Evidence {
  return node?.type === "evidence" && node.status !== "superseded";
}

function evidenceDateCoverage(graph: ArgumentGraph): EvidenceDateCoverage {
  const coverage: EvidenceDateCoverage = {
    evidenceCount: 0,
    missingPublishedAt: [],
    missingVerifiedAt: [],
  };
  for (const node of graph.nodes) {
    if (!isCurrentEvidence(node)) continue;
    coverage.evidenceCount += 1;
    if (!hasText(node.source.publishedAt)) coverage.missingPublishedAt.push(node.id);
    if (!hasText(node.source.verifiedAt)) coverage.missingVerifiedAt.push(node.id);
  }
  return coverage;
}

function fastMovingStatuses(
  manifest: ArgumentReviewManifest,
  nodesById: Map<string, ArgumentNode>,
  today: IsoDate,
  errors: FreshnessError[]
): FastMovingStatus[] {
  const cadence = REVIEW_CADENCES[manifest.cadence];
  const statuses: FastMovingStatus[] = [];

  for (const { id } of manifest.fastMovingNodes) {
    const node = nodesById.get(id);
    if (node === undefined) {
      errors.push({
        code: "fast-moving-node-unknown",
        nodeId: id,
        message: `fast-moving node "${id}" does not exist in the graph`,
      });
      continue;
    }
    if (node.type !== "evidence") {
      errors.push({
        code: "fast-moving-node-not-evidence",
        nodeId: id,
        message: `fast-moving node "${id}" is a ${node.type}, not evidence`,
      });
      continue;
    }

    const verifiedAt = isoDatePrefix(node.source.verifiedAt);
    const referenceDate =
      verifiedAt !== undefined && verifiedAt > manifest.lastHeadlineCheck
        ? verifiedAt
        : manifest.lastHeadlineCheck;
    const dueDate = addDays(referenceDate, cadence.headlineCheckDays);
    statuses.push({
      nodeId: id,
      referenceDate,
      dueDate,
      daysOverdue: Math.max(0, daysBetween(dueDate, today)),
    });
  }

  return statuses;
}

function metadataKeyStatus(
  meta: FreshnessMetadata,
  nodesById: Map<string, ArgumentNode>,
  cruxes: CruxResult[],
  errors: FreshnessError[]
): MetadataKeyStatus {
  const status: MetadataKeyStatus = { unmatched: [], notesForNonCruxClaims: [] };
  const rankedClaimIds = new Set(cruxes.map((crux) => crux.claimId));

  const report = (field: "advocates" | "cruxNotes", key: string, reason: string) => {
    status.unmatched.push({ field, key, reason });
    errors.push({
      code: "metadata-key-unmatched",
      nodeId: key,
      message: `meta.${field}["${key}"] ${reason}`,
    });
  };

  for (const key of Object.keys(meta.advocates ?? {})) {
    const node = nodesById.get(key);
    if (node === undefined) report("advocates", key, "does not match any graph node");
    else if (node.type !== "position") report("advocates", key, `targets a ${node.type}, not a position`);
  }

  for (const key of Object.keys(meta.cruxNotes ?? {})) {
    const node = nodesById.get(key);
    if (node === undefined) {
      report("cruxNotes", key, "does not match any graph node");
      continue;
    }
    if (node.type !== "claim") {
      report("cruxNotes", key, `targets a ${node.type}, not a claim`);
      continue;
    }
    if (!rankedClaimIds.has(key)) status.notesForNonCruxClaims.push(key);
  }

  return status;
}

function topCruxDisclosure(
  crux: CruxResult,
  rank: number,
  graph: ArgumentGraph,
  nodesById: Map<string, ArgumentNode>,
  meta: FreshnessMetadata
): TopCruxDisclosure[] {
  const claim = nodesById.get(crux.claimId);
  // The engine only ranks claims; a non-claim here is already an engine bug
  // covered by lib/argument tests, so it is skipped rather than double-reported.
  if (claim?.type !== "claim") return [];

  const note = meta.cruxNotes?.[crux.claimId];
  const summaryQuestion = claim.summary?.trim().endsWith("?") ? claim.summary.trim() : undefined;
  const hasQuestion = hasText(note?.question) || summaryQuestion !== undefined;
  const hasFight = hasText(note?.fight);
  const hasSoWhat = hasText(note?.soWhat);
  const hasResolution = claim.resolution !== undefined && hasText(claim.resolution.condition);

  const directEvidence = { supporting: 0, challenging: 0, qualifying: 0 };
  for (const edge of graph.edges) {
    if (edge.type !== "evidences" || edge.to !== crux.claimId) continue;
    if (!isCurrentEvidence(nodesById.get(edge.from))) continue;
    if (edge.polarity !== undefined) directEvidence[edge.polarity] += 1;
  }

  let evidenceQuota: EvidenceQuota;
  if (!EVIDENCE_QUOTA_TYPES.has(claim.epistemicType)) evidenceQuota = "exempt";
  else if (directEvidence.supporting > 0 && directEvidence.challenging > 0) evidenceQuota = "met";
  else evidenceQuota = "gap";

  let gapDisclosure: GapDisclosure = "not-needed";
  if (evidenceQuota === "gap") {
    const publicText = [note?.question, note?.fight, note?.soWhat].filter(hasText).join(" ");
    gapDisclosure = GAP_DISCLOSURE_PATTERN.test(publicText) ? "disclosed" : "missing";
  }

  const issues: string[] = [];
  if (!hasQuestion) issues.push("no authored question or question-form summary");
  if (!hasFight) issues.push("no authored fight copy");
  if (!hasSoWhat) issues.push("no authored soWhat copy");
  if (!hasResolution) issues.push("no resolution condition");
  if (gapDisclosure === "missing") {
    issues.push(
      `one-sided direct evidence (supporting ${directEvidence.supporting} / challenging ${directEvidence.challenging} / qualifying ${directEvidence.qualifying}) and the authored note does not disclose the gap`
    );
  }

  return [
    {
      rank,
      claimId: crux.claimId,
      epistemicType: claim.epistemicType,
      status: claim.status,
      hasQuestion,
      hasFight,
      hasSoWhat,
      hasResolution,
      directEvidence,
      evidenceQuota,
      gapDisclosure,
      issues,
    },
  ];
}

function hasText(value: string | undefined): value is string {
  return value !== undefined && value.trim().length > 0;
}

/** Accepts "2026-08-12" or a full ISO timestamp; returns the calendar-date prefix. */
function isoDatePrefix(value: string | undefined): IsoDate | undefined {
  if (!hasText(value)) return undefined;
  const prefix = value.trim().slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(prefix) ? prefix : undefined;
}
