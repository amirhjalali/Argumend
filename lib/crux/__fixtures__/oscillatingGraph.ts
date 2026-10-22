import { claim, evidence, workedExampleGraph } from "@/lib/argument/fixtures";
import type { ArgumentGraph } from "@/types/argument";

export function oscillatingGraph(): ArgumentGraph {
  const graph = workedExampleGraph();
  const position = graph.nodes.find((node) => node.type === "position")!;
  return {
    ...graph,
    nodes: [
      graph.question,
      { ...position, id: "pos-1" },
      claim("x", "The candidate supports each alternative"),
      ...["a", "b", "c"].map((id) => claim(id, `Alternative ${id} is correct`)),
      ...["e", "f"].map((id) => ({
        ...evidence(id, `Finding ${id}`, `Independent source ${id}`),
        weight: { sourceReliability: 10, independence: 10, replicability: 10, directness: 10, weightBasis: "Fixture weights" },
      })),
    ],
    edges: [
      ...["a", "b", "c"].flatMap((to) => [
        { id: `x-${to}`, from: "x", to, type: "supports" as const },
        ...["e", "f"].map((from) => ({ id: `${from}-${to}`, from, to, type: "evidences" as const, polarity: "supporting" as const })),
      ]),
      { id: "a-b", from: "a", to: "b", type: "contradicts" },
      { id: "a-c", from: "a", to: "c", type: "contradicts" },
      { id: "b-c", from: "b", to: "c", type: "contradicts" },
      { id: "a-position", from: "a", to: "pos-1", type: "supports" },
    ],
  };
}
