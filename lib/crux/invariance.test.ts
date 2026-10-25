import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import type { ArgumentGraph } from "@/types/argument";
import { workedExampleGraph } from "@/lib/argument/fixtures";
import { buildInfluenceGraph } from "./influence";
import { identifyCruxes } from "./rank";
import { oscillatingGraph } from "./__fixtures__/oscillatingGraph";

function withRelations(): ArgumentGraph {
  const graph = workedExampleGraph();
  return {
    ...graph,
    edges: [
      ...graph.edges,
      { id: "support", from: "c1", to: "c2", type: "supports" },
      { id: "opposition", from: "c5", to: "c2", type: "opposes" },
      { id: "contradiction", from: "c1", to: "c5", type: "contradicts" },
    ],
  };
}

describe("scoring is invariant to repeated assertions", () => {
  it.each(withRelations().edges)("counts $type ($id) only once", (edge) => {
    const graph = withRelations();
    const repeated = { ...graph, edges: [...graph.edges, { ...edge, id: `${edge.id}-repeated` }] };

    expect(buildInfluenceGraph(repeated).edges).toEqual(buildInfluenceGraph(graph).edges);
    expect(identifyCruxes(repeated)).toEqual(identifyCruxes(graph));
  });

  it("counts a symmetric contradiction once if repeated in reverse", () => {
    const graph = withRelations();
    const repeated: ArgumentGraph = { ...graph, edges: [...graph.edges,
      { id: "reverse-contradiction", from: "c5", to: "c1", type: "contradicts" },
    ] };

    expect(buildInfluenceGraph(repeated).edges).toEqual(buildInfluenceGraph(graph).edges);
    expect(identifyCruxes(repeated)).toEqual(identifyCruxes(graph));
  });

  it("preserves distinct warrants, source findings, relations, and evidence polarities", () => {
    const graph = workedExampleGraph();
    const inference = graph.nodes.find((node) => node.id === "i1")!;
    const source = graph.nodes.find((node) => node.id === "e1")!;
    graph.nodes.push({ ...inference, id: "i2" }, { ...source, id: "independent-finding" });
    graph.edges.push(
      { id: "second-premise", from: "c1", to: "i2", type: "premise_of" },
      { id: "second-conclusion", from: "i2", to: "c2", type: "concludes" },
      { id: "independent-source", from: "independent-finding", to: "c1", type: "evidences", polarity: "supporting" },
      { id: "different-polarity", from: "e1", to: "c1", type: "evidences", polarity: "challenging" },
      { id: "support", from: "c1", to: "c2", type: "supports" },
      { id: "opposition", from: "c1", to: "c2", type: "opposes" },
    );

    const ig = buildInfluenceGraph(graph);
    expect(ig.edges.filter((edge) => edge.from === "c1" && edge.to === "c2")).toHaveLength(4);
    expect(ig.edges.filter((edge) => edge.relation === "evidences" && edge.to === "c1")).toHaveLength(3);
  });
});

describe("scoring input invariants", () => {
  it("keeps diagnostics ordered when separate cycles are reordered", () => {
    const first = oscillatingGraph();
    const second = oscillatingGraph();
    const graph: ArgumentGraph = {
      ...first,
      nodes: [...first.nodes, ...second.nodes.filter((node) => node.type !== "question")
        .map((node) => ({ ...node, id: `${node.id}-2` }))],
      edges: [...first.edges, ...second.edges.map((edge) => ({ ...edge,
        id: `${edge.id}-2`, from: `${edge.from}-2`, to: `${edge.to}-2`,
      }))],
    };

    expect(identifyCruxes({ ...graph, nodes: [...graph.nodes].reverse(), edges: [...graph.edges].reverse() }))
      .toEqual(identifyCruxes(graph));
  });

  it.each(["c1", "c2", "c3", "c4", "c5", "c6", "e1", "e2", "e3"])(
    "excludes superseded %s exactly as removing that card and its connections",
    (id) => {
      const graph = withRelations();
      const retired = { ...graph, nodes: graph.nodes.map((node) => node.id === id
        ? { ...node, status: "superseded" } : node) } as ArgumentGraph;
      const removed = { ...graph, nodes: graph.nodes.filter((node) => node.id !== id),
        edges: graph.edges.filter((edge) => edge.from !== id && edge.to !== id) };

      expect(identifyCruxes(retired)).toEqual(identifyCruxes(removed));
    },
  );

  it.each(["ai-mass-unemployment", "capitalism-after-ai", "covid-what-ended", "us-israel-support"])(
    "%s is unchanged by node/edge reordering and contradiction orientation",
    (topicId) => {
      const graph = JSON.parse(readFileSync(path.join(__dirname, "../../data/topics/drafts", `${topicId}.draft.json`), "utf8")) as ArgumentGraph;
      const expected = identifyCruxes(graph);
      const reversed = { ...graph, nodes: [...graph.nodes].reverse(), edges: [...graph.edges].reverse() };
      const reoriented = { ...reversed, edges: reversed.edges.map((edge) => edge.type === "contradicts"
        ? { ...edge, from: edge.to, to: edge.from } : edge) };

      expect(identifyCruxes(reversed)).toEqual(expected);
      expect(identifyCruxes(reoriented)).toEqual(expected);
    },
  );
});
