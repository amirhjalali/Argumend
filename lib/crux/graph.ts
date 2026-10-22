import type { ArgumentGraph } from "@/types/argument";

/** Keep scoring on current cards and count each asserted relationship once. */
export function currentScoringGraph(graph: ArgumentGraph): ArgumentGraph {
  const nodes = graph.nodes.filter((node) =>
    !((node.type === "claim" || node.type === "evidence") && node.status === "superseded"),
  );
  const activeIds = new Set(nodes.map((node) => node.id));
  const assertions = new Set<string>();
  const edges = graph.edges.filter((edge) => {
    if (!activeIds.has(edge.from) || !activeIds.has(edge.to)) return false;
    const [from, to] = edge.type === "contradicts"
      ? [edge.from, edge.to].sort()
      : [edge.from, edge.to];
    // Edge ids identify records, not additional assertions. Inference and
    // evidence node ids remain distinct, as do relation types and polarities.
    const key = JSON.stringify([from, to, edge.type, edge.polarity]);
    if (assertions.has(key)) return false;
    assertions.add(key);
    return true;
  });
  return { ...graph, nodes, edges };
}
