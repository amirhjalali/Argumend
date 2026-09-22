import type { ArgumentGraph, Claim } from "@/types/argument";
import { computeCruxSignals, type CruxSignal, type DeltaTarget } from "./signals";

export interface CruxResult {
  claimId: string;
  score: number;
  contestedness: number;
  /**
   * The calibrated probe value behind `contestedness`, when the caller
   * supplied one. Absent on every default (no-override) computation, so the
   * serialized shape is unchanged for topics that are not probed.
   */
  contestednessOverride?: number;
  reach: number;
  directReach: number;
  discrimination: number;
  directDiscrimination: number;
  tractability: number;
  implicitBoost: number;
  scopingBonus: number;
  evidenceCoverage: number;
  affectedPositions: DeltaTarget[];
  affectedClaims: DeltaTarget[];
  gatesClaimIds: string[];
  /**
   * Claims this one gates that the probe floor removed from candidacy.
   * Omitted when empty, so an unprobed topic's serialized shape is unchanged.
   */
  gatesRemovedByProbeIds?: string[];
  evidenceStarved: boolean;
  cycleWarnings: string[];
  explanationFacts: string[];
}

const FLOOR = 0.15;
const MAX_RESULTS = 5;
const REDUNDANCY_RHO = 0.35;

export interface IdentifyCruxesOptions {
  /**
   * Maximum number of ranked cruxes returned. Defaults to 5. The validation
   * harness raises this to score Recall@10 against the pre-registered
   * acceptance thresholds without changing serving behavior.
   */
  limit?: number;
  /**
   * Crux engine v1.2: claim id -> 0..1 contestedness from a calibrated probe
   * of the same source the claims came from. Where supplied it replaces the
   * balance modulator inside C, clamped so it can only lower the value; the
   * editorial status prefactor is kept.
   *
   * A claim with no entry keeps its own signals exactly — same contestedness,
   * reach, discrimination — but its final rank can still move, because
   * removing or demoting another claim changes which claims are selected
   * first and therefore who pays the redundancy penalty, and because dropping
   * a claim from candidacy renormalizes the scoping bonus. Only a call with
   * no overrides at all is guaranteed identical to today.
   *
   * See `./contestedness.ts` and `docs/CRUX_ENGINE.md` §v1.2.
   */
  contestednessOverrides?: Readonly<Record<string, number>>;
  /**
   * Claims whose override falls below this drop out of candidacy entirely
   * (default 0.25). Pinned claims are exempt.
   */
  candidacyFloor?: number;
}

export interface CruxRanking {
  cruxes: CruxResult[];
  /**
   * Claim ids that passed editorial candidacy but were removed by the
   * contestedness floor, sorted. Empty unless overrides were supplied.
   * Judgment-as-data: when a model-supplied number narrows the candidate set,
   * the caller can see exactly which claims it took out.
   */
  droppedByFloorIds: string[];
}

export function identifyCruxes(
  graph: ArgumentGraph,
  options: IdentifyCruxesOptions = {},
): CruxResult[] {
  return identifyCruxesWithDiagnostics(graph, options).cruxes;
}

/**
 * `identifyCruxes` plus what the probe removed. Same computation; callers
 * that need to audit or display the gate's effect use this one.
 */
export function identifyCruxesWithDiagnostics(
  graph: ArgumentGraph,
  options: IdentifyCruxesOptions = {},
): CruxRanking {
  const limit = Math.max(1, options.limit ?? MAX_RESULTS);
  const { signals, droppedByFloorIds } = computeCruxSignals(graph, {
    contestednessOverrides: options.contestednessOverrides,
    candidacyFloor: options.candidacyFloor,
  });
  const unsuppressed = signals.filter((signal) => signal.claim.cruxOverride !== "suppress");
  const pinned = unsuppressed
    .filter((signal) => signal.claim.cruxOverride === "pin")
    .sort(scoreSort);
  const unpinned = unsuppressed
    .filter((signal) => signal.claim.cruxOverride !== "pin")
    .sort(scoreSort);
  const selected: Array<{ signal: CruxSignal; score: number }> = pinned.map((signal) => ({
    signal,
    score: Math.max(FLOOR, signal.baseScore),
  }));

  for (const signal of unpinned) {
    if (selected.length >= limit) break;
    const overlap = maxOverlap(signal, selected.map((item) => item.signal));
    const score = signal.baseScore * (1 - REDUNDANCY_RHO * overlap);
    if (isSelectable(signal, score)) {
      selected.push({ signal, score });
    }
  }

  const pinnedResults = selected
    .filter((item) => item.signal.claim.cruxOverride === "pin")
    .sort((a, b) => b.score - a.score || a.signal.claim.id.localeCompare(b.signal.claim.id));
  const regularResults = selected
    .filter((item) => item.signal.claim.cruxOverride !== "pin")
    .filter((item) => isSelectable(item.signal, item.score))
    .sort((a, b) => b.score - a.score || a.signal.claim.id.localeCompare(b.signal.claim.id));

  return {
    cruxes: [...pinnedResults, ...regularResults]
      .slice(0, limit)
      .map((item) => toResult(item.signal, item.score)),
    droppedByFloorIds,
  };
}

function isSelectable(signal: CruxSignal, score: number): boolean {
  return score >= FLOOR && (signal.reach > 0 || signal.discrimination > 0 || signal.scopingBonus > 0);
}

function scoreSort(a: CruxSignal, b: CruxSignal): number {
  return b.baseScore - a.baseScore || a.claim.id.localeCompare(b.claim.id);
}

function maxOverlap(signal: CruxSignal, selected: CruxSignal[]): number {
  return selected.reduce((max, selectedSignal) => {
    const union = new Set([...signal.affectedSet, ...selectedSignal.affectedSet]);
    if (union.size === 0) return max;
    const intersectionSize = [...signal.affectedSet].filter((id) =>
      selectedSignal.affectedSet.has(id)
    ).length;
    return Math.max(max, intersectionSize / union.size);
  }, 0);
}

function toResult(signal: CruxSignal, score: number): CruxResult {
  return {
    claimId: signal.claim.id,
    score: round(score),
    contestedness: round(signal.contestedness),
    ...(signal.contestednessOverride === undefined
      ? {}
      : { contestednessOverride: round(signal.contestednessOverride) }),
    reach: round(signal.reach),
    directReach: round(signal.directReach),
    discrimination: round(signal.discrimination),
    directDiscrimination: round(signal.directDiscrimination),
    tractability: round(signal.tractability),
    implicitBoost: round(signal.implicitBoost),
    scopingBonus: round(signal.scopingBonus),
    evidenceCoverage: round(signal.evidenceCoverage),
    affectedPositions: signal.affectedPositions.map(roundTarget),
    affectedClaims: signal.affectedClaims.map(roundTarget),
    gatesClaimIds: signal.gatesClaimIds,
    ...(signal.gatesRemovedByProbeIds.length === 0
      ? {}
      : { gatesRemovedByProbeIds: signal.gatesRemovedByProbeIds }),
    evidenceStarved: signal.evidenceStarved,
    cycleWarnings: signal.cycleWarnings,
    explanationFacts: explanationFacts(signal, round(score)),
  };
}

function explanationFacts(signal: CruxSignal, score: number): string[] {
  const claim = signal.claim;
  const facts = [
    `Claim ${claim.id}: ${claim.statement}`,
    `Status is ${claim.status} because ${claim.statusBasis}.`,
    `Component scores: score ${format(score)}, contestedness ${format(signal.contestedness)}, reach ${format(signal.reach)}, discrimination ${format(signal.discrimination)}, tractability ${format(signal.tractability)}, implicit boost ${format(signal.implicitBoost)}, scoping bonus ${format(signal.scopingBonus)}.`,
  ];
  if (signal.contestednessOverride !== undefined) {
    // Named so a crux card can show where the number came from: the probe
    // measured the source, the status weight is still the editorial call.
    facts.push(
      `Contestedness from probe: ${format(signal.contestednessOverride)} (status ${claim.status} weights it to ${format(signal.contestedness)}).`,
    );
  }
  const positionText = signal.affectedPositions
    .map((target) => `${target.id} ${target.delta >= 0 ? "+" : ""}${format(target.delta)}`)
    .join(", ");
  facts.push(`Position deltas: ${positionText.length > 0 ? positionText : "none"}.`);
  facts.push(`Resolution: ${resolutionText(claim)}.`);
  // A bare "Gates: none" after the probe removed a gated claim would assert
  // something false about the graph: the edge is still there, the claim it
  // points at was taken out of candidacy by a model-supplied number. Say so.
  const gatesText = signal.gatesClaimIds.length > 0 ? signal.gatesClaimIds.join(", ") : "none";
  facts.push(
    signal.gatesRemovedByProbeIds.length > 0
      ? `Gates: ${gatesText}; removed from candidacy by the contestedness probe: ${signal.gatesRemovedByProbeIds.join(", ")}.`
      : `Gates: ${gatesText}.`,
  );
  return facts;
}

function resolutionText(claim: Claim): string {
  if (claim.resolution?.kind === "value-difference") {
    return "Nothing resolves this - standing value disagreement";
  }
  if (claim.resolution !== undefined) {
    return `${claim.resolution.kind}: ${claim.resolution.condition}`;
  }
  return "missing: no resolution condition recorded";
}

function roundTarget(target: DeltaTarget): DeltaTarget {
  return { id: target.id, delta: round(target.delta) };
}

function round(value: number): number {
  return Number(value.toFixed(3));
}

function format(value: number): string {
  return round(value).toFixed(3);
}
