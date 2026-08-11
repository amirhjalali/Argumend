import type { ArgumentEdge, ArgumentGraph, ArgumentNode } from "@/types/argument";

export type InfluenceRelation =
  | "supports"
  | "opposes"
  | "contradicts"
  | "qualifies"
  | "depends_on"
  | "inference-premise"
  | "inference-undercut"
  | "evidences";

export interface InfluenceNode {
  id: string;
  type: ArgumentNode["type"];
  statement: string;
  baseActivation: number;
}

export interface InfluenceEdge {
  id: string;
  from: string;
  to: string;
  weight: number;
  relation: InfluenceRelation;
  sourceEdgeId?: string;
  polarity?: "supporting" | "challenging" | "qualifying";
}

export interface InfluenceGraph {
  nodes: InfluenceNode[];
  edges: InfluenceEdge[];
  nodeById: Map<string, InfluenceNode>;
  originalNodeById: Map<string, ArgumentNode>;
  excludedNodeIds: Set<string>;
}

export function buildInfluenceGraph(graph: ArgumentGraph): InfluenceGraph {
  const excludedNodeIds = new Set(
    graph.nodes
      .filter((node) => isSupersededNode(node))
      .map((node) => node.id)
  );
  const activeNodes = graph.nodes.filter((node) => !excludedNodeIds.has(node.id));
  const originalNodeById = new Map(activeNodes.map((node) => [node.id, node]));
  const activeEdges = graph.edges.filter(
    (edge) => !excludedNodeIds.has(edge.from) && !excludedNodeIds.has(edge.to)
  );
  const evidenceAttenuation = evidenceScopeAttenuation(activeEdges, originalNodeById);
  const nodes = activeNodes.map((node) => ({
    id: node.id,
    type: node.type,
    statement: node.statement,
    baseActivation: node.type === "evidence" ? 0.5 * evidenceWeight(node) : 0,
  }));
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const edges: InfluenceEdge[] = [];

  for (const edge of activeEdges) {
    if (!nodeById.has(edge.from) || !nodeById.has(edge.to)) continue;

    switch (edge.type) {
      case "supports":
        edges.push(weightedEdge(edge, edge.from, edge.to, 1, "supports", evidenceAttenuation));
        break;
      case "opposes":
        edges.push(weightedEdge(edge, edge.from, edge.to, -1, "opposes", evidenceAttenuation));
        break;
      case "contradicts":
        edges.push(weightedEdge(edge, edge.from, edge.to, -1, "contradicts", evidenceAttenuation));
        edges.push({
          ...weightedEdge(edge, edge.to, edge.from, -1, "contradicts", evidenceAttenuation),
          id: `${edge.id}:reverse`,
        });
        break;
      case "qualifies":
        edges.push(weightedEdge(edge, edge.from, edge.to, 0.5, "qualifies", evidenceAttenuation));
        break;
      case "depends_on":
        edges.push(weightedEdge(edge, edge.to, edge.from, 0.8, "depends_on", evidenceAttenuation));
        break;
      case "evidences":
        edges.push(evidencesEdge(edge, originalNodeById, evidenceAttenuation));
        break;
      case "premise_of":
      case "concludes":
      case "undercuts":
      case "limits_scope":
      case "supersedes":
        break;
    }
  }

  edges.push(...collapsedInferenceEdges(activeEdges, nodeById, evidenceAttenuation));

  return { nodes, edges, nodeById, originalNodeById, excludedNodeIds };
}

export function evidenceWeight(node: ArgumentNode | undefined): number {
  if (node?.type !== "evidence" || node.weight === undefined) return 0.6;

  const { sourceReliability, independence, replicability, directness } = node.weight;
  return (sourceReliability + independence + replicability + directness) / 40;
}

function isSupersededNode(node: ArgumentNode): boolean {
  return (
    (node.type === "claim" && node.status === "superseded") ||
    (node.type === "evidence" && node.status === "superseded")
  );
}

function weightedEdge(
  edge: ArgumentEdge,
  from: string,
  to: string,
  weight: number,
  relation: InfluenceRelation,
  evidenceAttenuation: Map<string, number>
): InfluenceEdge {
  return {
    id: edge.id,
    from,
    to,
    weight: weight * (evidenceAttenuation.get(from) ?? 1),
    relation,
    sourceEdgeId: edge.id,
  };
}

function evidencesEdge(
  edge: ArgumentEdge,
  nodeById: Map<string, ArgumentNode>,
  evidenceAttenuation: Map<string, number>
): InfluenceEdge {
  const polarity = edge.polarity ?? "supporting";
  const sign = polarity === "challenging" ? -1 : polarity === "qualifying" ? 0.5 : 1;
  const weight = sign * evidenceWeight(nodeById.get(edge.from));

  return {
    id: edge.id,
    from: edge.from,
    to: edge.to,
    weight: weight * (evidenceAttenuation.get(edge.from) ?? 1),
    relation: "evidences",
    sourceEdgeId: edge.id,
    polarity,
  };
}

function collapsedInferenceEdges(
  edges: ArgumentEdge[],
  nodeById: Map<string, InfluenceNode>,
  evidenceAttenuation: Map<string, number>
): InfluenceEdge[] {
  const conclusionsByInference = new Map<string, string[]>();
  const premisesByInference = new Map<string, string[]>();
  const undercuttersByInference = new Map<string, string[]>();

  for (const edge of edges) {
    if (edge.type === "concludes") {
      pushMap(conclusionsByInference, edge.from, edge.to);
    } else if (edge.type === "premise_of") {
      pushMap(premisesByInference, edge.to, edge.from);
    } else if (edge.type === "undercuts") {
      pushMap(undercuttersByInference, edge.to, edge.from);
    }
  }

  const collapsed: InfluenceEdge[] = [];
  for (const [inferenceId, conclusionIds] of conclusionsByInference) {
    for (const conclusionId of conclusionIds) {
      if (!nodeById.has(conclusionId)) continue;

      for (const premiseId of premisesByInference.get(inferenceId) ?? []) {
        if (!nodeById.has(premiseId)) continue;
        collapsed.push({
          id: `collapse:${premiseId}:${inferenceId}:${conclusionId}`,
          from: premiseId,
          to: conclusionId,
          weight: 0.7 * (evidenceAttenuation.get(premiseId) ?? 1),
          relation: "inference-premise",
        });
      }

      for (const undercutterId of undercuttersByInference.get(inferenceId) ?? []) {
        if (!nodeById.has(undercutterId)) continue;
        collapsed.push({
          id: `collapse:${undercutterId}:undercuts:${inferenceId}:${conclusionId}`,
          from: undercutterId,
          to: conclusionId,
          weight: -0.9 * (evidenceAttenuation.get(undercutterId) ?? 1),
          relation: "inference-undercut",
        });
      }
    }
  }

  return collapsed;
}

function evidenceScopeAttenuation(
  edges: ArgumentEdge[],
  nodeById: Map<string, ArgumentNode>
): Map<string, number> {
  const attenuation = new Map<string, number>();

  for (const edge of edges) {
    if (edge.type !== "limits_scope") continue;
    const limiter = nodeById.get(edge.from);
    const limited = nodeById.get(edge.to);
    if (limiter?.type !== "claim" || limited?.type !== "evidence") continue;
    if (!isLimiterRebutted(limiter.id, edges)) {
      attenuation.set(limited.id, (attenuation.get(limited.id) ?? 1) * 0.5);
    }
  }

  return attenuation;
}

function isLimiterRebutted(limiterId: string, edges: ArgumentEdge[]): boolean {
  if (
    edges.some(
      (edge) =>
        edge.to === limiterId &&
        (edge.type === "opposes" ||
          edge.type === "contradicts" ||
          (edge.type === "evidences" && edge.polarity === "challenging"))
    )
  ) {
    return true;
  }

  const concludingInferenceIds = new Set(
    edges.filter((edge) => edge.type === "concludes" && edge.to === limiterId).map((edge) => edge.from)
  );

  return edges.some((edge) => edge.type === "undercuts" && concludingInferenceIds.has(edge.to));
}

function pushMap(map: Map<string, string[]>, key: string, value: string): void {
  map.set(key, [...(map.get(key) ?? []), value]);
}
