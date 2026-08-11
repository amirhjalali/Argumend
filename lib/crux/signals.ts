import type { ArgumentEdge, ArgumentGraph, Claim, ResolutionKind } from "@/types/argument";
import { buildInfluenceGraph, evidenceWeight, type InfluenceGraph } from "./influence";
import { propagate } from "./propagate";

export interface DeltaTarget {
  id: string;
  delta: number;
}

export interface CruxSignal {
  claim: Claim;
  contestedness: number;
  directReach: number;
  reach: number;
  directDiscrimination: number;
  discrimination: number;
  tractability: number;
  implicitBoost: number;
  scopingBonus: number;
  evidenceCoverage: number;
  evidenceStarved: boolean;
  directScoreMass: number;
  baseScore: number;
  deltas: Map<string, number>;
  affectedPositions: DeltaTarget[];
  affectedClaims: DeltaTarget[];
  affectedSet: Set<string>;
  gatesClaimIds: string[];
  cycleWarnings: string[];
}

export interface CruxSignalResult {
  influenceGraph: InfluenceGraph;
  signals: CruxSignal[];
}

const TRACTABILITY: Record<ResolutionKind | "missing", number> = {
  "existing-evidence": 1,
  "future-observable": 0.9,
  "definitional-choice": 0.8,
  "authority-allocation": 0.75,
  missing: 0.7,
  "value-difference": 0.65,
};

export function computeCruxSignals(graph: ArgumentGraph): CruxSignalResult {
  const influenceGraph = buildInfluenceGraph(graph);
  const activeClaims = graph.nodes.filter(
    (node): node is Claim =>
      node.type === "claim" && !influenceGraph.excludedNodeIds.has(node.id)
  );
  const candidates = activeClaims.filter((claim) => isCandidate(claim));
  const candidateIds = new Set(candidates.map((claim) => claim.id));
  const claimCount = activeClaims.length;
  const positionIds = graph.nodes
    .filter((node) => node.type === "position" && !influenceGraph.excludedNodeIds.has(node.id))
    .map((node) => node.id);
  const rawSignals = candidates.map((claim) =>
    directSignal(graph, influenceGraph, claim, claimCount, positionIds)
  );
  const rawById = new Map(rawSignals.map((signal) => [signal.claim.id, signal]));
  const directMassById = new Map(
    rawSignals.map((signal) => [signal.claim.id, signal.directScoreMass])
  );
  const gateMassById = new Map<string, number>();

  for (const signal of rawSignals) {
    for (const gatedId of gatedCandidateIds(graph.edges, signal.claim.id, candidateIds)) {
      gateMassById.set(signal.claim.id, (gateMassById.get(signal.claim.id) ?? 0) + (directMassById.get(gatedId) ?? 0));
    }
  }

  const maxGateMass = Math.max(0, ...gateMassById.values());
  const signals = rawSignals.map((signal) => {
    const gatedIds = gatedCandidateIds(graph.edges, signal.claim.id, candidateIds);
    const scopedSignals = gatedIds
      .map((claimId) => rawById.get(claimId))
      .filter((scoped): scoped is CruxSignal => scoped !== undefined);
    const reach = Math.max(signal.directReach, ...scopedSignals.map((scoped) => scoped.directReach));
    const discrimination = Math.max(
      signal.directDiscrimination,
      ...scopedSignals.map((scoped) => scoped.directDiscrimination)
    );
    const scopingBonus = maxGateMass > 0 ? (gateMassById.get(signal.claim.id) ?? 0) / maxGateMass : 0;
    const directScoreMass =
      signal.implicitBoost *
      (0.3 * signal.contestedness +
        0.2 * reach +
        0.35 * discrimination +
        0.05 * signal.tractability);

    return {
      ...signal,
      reach,
      discrimination,
      scopingBonus,
      directScoreMass,
      baseScore: directScoreMass + 0.15 * scopingBonus,
      gatesClaimIds: gatedIds,
    };
  });

  return { influenceGraph, signals };
}

function isCandidate(claim: Claim): boolean {
  return (
    claim.cruxOverride === "pin" ||
    claim.implicit === true ||
    claim.status === "contested" ||
    claim.status === "unresolved"
  );
}

function directSignal(
  graph: ArgumentGraph,
  ig: InfluenceGraph,
  claim: Claim,
  claimCount: number,
  positionIds: string[]
): CruxSignal {
  const directIg = {
    ...ig,
    edges: ig.edges.filter(
      (edge) => !(edge.from === claim.id && edge.relation === "qualifies")
    ),
  };
  const plus = propagate(directIg, new Map([[claim.id, 1]]));
  const minus = propagate(directIg, new Map([[claim.id, -1]]));
  const deltas = new Map<string, number>();

  for (const node of ig.nodes) {
    deltas.set(node.id, ((plus.activations.get(node.id) ?? 0) - (minus.activations.get(node.id) ?? 0)) / 2);
  }

  const downstream = downstreamIds(directIg, claim.id);
  const affectedPositions = positionIds
    .map((id) => ({ id, delta: deltas.get(id) ?? 0 }))
    .filter((target) => Math.abs(target.delta) > 0.05)
    .sort(deltaSort);
  const affectedClaims = graph.nodes
    .filter(
      (node): node is Claim =>
        node.type === "claim" &&
        node.id !== claim.id &&
        downstream.has(node.id) &&
        !ig.excludedNodeIds.has(node.id)
    )
    .map((node) => ({ id: node.id, delta: deltas.get(node.id) ?? 0 }))
    .filter((target) => Math.abs(target.delta) > 0.001)
    .sort(deltaSort)
    .slice(0, 8);
  const affectedSet = new Set(
    [...affectedClaims, ...affectedPositions]
      .filter((target) => Math.abs(target.delta) > 0.1)
      .map((target) => target.id)
  );
  const downstreamImpactSum = [...downstream]
    .filter((id) => {
      const node = ig.nodeById.get(id);
      return node?.type === "claim" || node?.type === "position";
    })
    .reduce((sum, id) => sum + Math.abs(deltas.get(id) ?? 0), 0);
  const directReach = Math.min(1, downstreamImpactSum / Math.max(0.15 * claimCount, 0.15));
  const directDiscrimination = discrimination(affectedPositions);
  const evidenceCoverage = evidenceCoverageFor(graph, claim.id);
  const contestedness = contestednessFor(graph, claim.id, claim.status);
  const tractability = TRACTABILITY[claim.resolution?.kind ?? "missing"];
  const implicitBoost = claim.implicit === true ? 1.15 : 1;
  const directScoreMass =
    implicitBoost *
    (0.3 * contestedness + 0.2 * directReach + 0.35 * directDiscrimination + 0.05 * tractability);

  return {
    claim,
    contestedness,
    directReach,
    reach: directReach,
    directDiscrimination,
    discrimination: directDiscrimination,
    tractability,
    implicitBoost,
    scopingBonus: 0,
    evidenceCoverage,
    evidenceStarved: evidenceCoverage < 1,
    directScoreMass,
    baseScore: directScoreMass,
    deltas,
    affectedPositions,
    affectedClaims,
    affectedSet,
    gatesClaimIds: [],
    cycleWarnings: [...new Set([...plus.cycleWarnings, ...minus.cycleWarnings])],
  };
}

function contestednessFor(
  graph: ArgumentGraph,
  claimId: string,
  status: Claim["status"]
): number {
  const statusWeight =
    status === "contested" || status === "unresolved"
      ? 1
      : status === "broadly_accepted"
        ? 0.3
        : 0;
  const { support, opposition } = supportOppositionInflow(graph, claimId);
  const max = Math.max(support, opposition);
  const balance = max > 0 ? Math.min(support, opposition) / max : 0;

  return statusWeight * (0.5 + 0.5 * balance);
}

function supportOppositionInflow(graph: ArgumentGraph, claimId: string) {
  const nodeById = new Map(graph.nodes.map((node) => [node.id, node]));
  let support = 0;
  let opposition = 0;

  for (const edge of graph.edges) {
    if (edge.to === claimId) {
      if (edge.type === "supports") support += 1;
      if (edge.type === "opposes" || edge.type === "contradicts") opposition += 1;
      if (edge.type === "evidences") {
        const weight = evidenceWeight(nodeById.get(edge.from));
        if (edge.polarity === "challenging") opposition += weight;
        if (edge.polarity === "supporting") support += weight;
      }
    }
    if (edge.from === claimId && edge.type === "contradicts") opposition += 1;
  }

  const concludingInferenceIds = new Set(
    graph.edges.filter((edge) => edge.type === "concludes" && edge.to === claimId).map((edge) => edge.from)
  );
  for (const edge of graph.edges) {
    if (edge.type === "undercuts" && concludingInferenceIds.has(edge.to)) {
      opposition += 0.9;
    }
  }

  return { support, opposition };
}

function evidenceCoverageFor(graph: ArgumentGraph, claimId: string): number {
  const weightedEvidenceCount = graph.edges.filter((edge) => {
    const fromNode = graph.nodes.find((node) => node.id === edge.from);
    return edge.type === "evidences" && edge.to === claimId && fromNode?.type === "evidence" && fromNode.weight !== undefined;
  }).length;

  return Math.min(1, weightedEvidenceCount / 3);
}

function downstreamIds(ig: InfluenceGraph, nodeId: string): Set<string> {
  const adjacency = new Map<string, string[]>();
  for (const edge of ig.edges) {
    adjacency.set(edge.from, [...(adjacency.get(edge.from) ?? []), edge.to]);
  }

  const seen = new Set<string>();
  const queue = [...(adjacency.get(nodeId) ?? [])];
  while (queue.length > 0) {
    const next = queue.shift();
    if (next === undefined || seen.has(next)) continue;
    seen.add(next);
    queue.push(...(adjacency.get(next) ?? []));
  }
  seen.delete(nodeId);
  return seen;
}

function discrimination(affectedPositions: DeltaTarget[]): number {
  const reached = affectedPositions.filter((target) => Math.abs(target.delta) > 0.05);
  const hasPositive = reached.some((target) => target.delta > 0);
  const hasNegative = reached.some((target) => target.delta < 0);

  if (reached.length >= 2 && hasPositive && hasNegative) return 1;
  if (reached.length >= 2) return 0.4;
  if (reached.length === 1) return 0.2;
  return 0;
}

function gatedCandidateIds(
  edges: ArgumentEdge[],
  claimId: string,
  candidateIds: Set<string>
): string[] {
  return [
    ...new Set(
      edges
        .filter(
          (edge) =>
            (edge.type === "qualifies" && edge.from === claimId && candidateIds.has(edge.to)) ||
            (edge.type === "depends_on" && edge.to === claimId && candidateIds.has(edge.from))
        )
        .map((edge) => (edge.type === "qualifies" ? edge.to : edge.from))
    ),
  ].sort();
}

function deltaSort(a: DeltaTarget, b: DeltaTarget): number {
  return Math.abs(b.delta) - Math.abs(a.delta) || a.id.localeCompare(b.id);
}
