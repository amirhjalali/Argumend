import type { ArgumentGraph, Claim } from "@/types/argument";
import { resolveCruxLeverFlags, type CruxLeverFlags } from "./flags";
import { computeCruxSignals, type CruxSignal, type DeltaTarget } from "./signals";

export interface CruxResult {
  claimId: string;
  score: number;
  contestedness: number;
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
   * Off-by-default engine levers (see lib/crux/flags.ts). An explicit value
   * here overrides the environment; omitted keys fall back to it. Serving
   * code passes nothing, so it follows the environment, which defaults off.
   */
  levers?: Partial<CruxLeverFlags>;
}

export function identifyCruxes(
  graph: ArgumentGraph,
  options: IdentifyCruxesOptions = {},
): CruxResult[] {
  const limit = Math.max(1, options.limit ?? MAX_RESULTS);
  const levers = resolveCruxLeverFlags(options.levers);
  const { signals } = computeCruxSignals(graph, {
    positionAwareReach: levers.positionAwareReach,
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
    const overlap = maxOverlap(signal, selected.map((item) => item.signal), levers);
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

  return [...pinnedResults, ...regularResults]
    .slice(0, limit)
    .map((item) => toResult(item.signal, item.score));
}

function isSelectable(signal: CruxSignal, score: number): boolean {
  return score >= FLOOR && (signal.reach > 0 || signal.discrimination > 0 || signal.scopingBonus > 0);
}

function scoreSort(a: CruxSignal, b: CruxSignal): number {
  return b.baseScore - a.baseScore || a.claim.id.localeCompare(b.claim.id);
}

/**
 * Jaccard overlap of affected-downstream sets. Lever A
 * (CRUX_LEVER_REDUNDANCY_CLAIMS_ONLY, default off) drops positions from both
 * sets, so two leaf claims that reach the same positions and no shared claim
 * overlap 0 instead of up to 1.
 */
function maxOverlap(
  signal: CruxSignal,
  selected: CruxSignal[],
  levers: CruxLeverFlags,
): number {
  const setOf = (candidate: CruxSignal) =>
    levers.redundancyClaimsOnly ? candidate.affectedClaimSet : candidate.affectedSet;
  const own = setOf(signal);
  return selected.reduce((max, selectedSignal) => {
    const other = setOf(selectedSignal);
    const union = new Set([...own, ...other]);
    if (union.size === 0) return max;
    const intersectionSize = [...own].filter((id) => other.has(id)).length;
    return Math.max(max, intersectionSize / union.size);
  }, 0);
}

function toResult(signal: CruxSignal, score: number): CruxResult {
  return {
    claimId: signal.claim.id,
    score: round(score),
    contestedness: round(signal.contestedness),
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
  const positionText = signal.affectedPositions
    .map((target) => `${target.id} ${target.delta >= 0 ? "+" : ""}${format(target.delta)}`)
    .join(", ");
  facts.push(`Position deltas: ${positionText.length > 0 ? positionText : "none"}.`);
  facts.push(`Resolution: ${resolutionText(claim)}.`);
  facts.push(`Gates: ${signal.gatesClaimIds.length > 0 ? signal.gatesClaimIds.join(", ") : "none"}.`);
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
