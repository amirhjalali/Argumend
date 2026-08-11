import { describe, expect, it } from "vitest";
import type { ArgumentGraph } from "@/types/argument";
import { baseNode, claim, evidence } from "@/lib/argument/fixtures";
import { buildInfluenceGraph } from "./influence";

function graph(edges: ArgumentGraph["edges"], extraNodes: ArgumentGraph["nodes"] = []): ArgumentGraph {
  const q1 = { ...baseNode("q1", "question", "Should the city adopt pricing?"), type: "question" as const };
  return {
    topicId: "test",
    modelVersion: 2,
    question: q1,
    nodes: [
      q1,
      claim("c1", "Premise"),
      claim("c2", "Conclusion"),
      claim("c3", "Undercutter"),
      {
        ...baseNode("i1", "inference", "Premise therefore conclusion"),
        type: "inference" as const,
        warrant: "The premise supports the conclusion.",
        warrantImplicit: false,
        warrantKind: "causal-identification" as const,
      },
      evidence("e1", "Finding one", "Source one"),
      ...extraNodes,
    ],
    edges,
  };
}

describe("buildInfluenceGraph", () => {
  it("collapses inference premise and undercutter edges to the conclusion", () => {
    const ig = buildInfluenceGraph(
      graph([
        { id: "c1-i1", from: "c1", to: "i1", type: "premise_of" },
        { id: "i1-c2", from: "i1", to: "c2", type: "concludes" },
        { id: "c3-i1", from: "c3", to: "i1", type: "undercuts" },
      ])
    );

    expect(ig.edges).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ from: "c1", to: "c2", weight: 0.7 }),
        expect.objectContaining({ from: "c3", to: "c2", weight: -0.9 }),
      ])
    );
  });

  it("reverses depends_on influence", () => {
    const ig = buildInfluenceGraph(graph([{ id: "c1-c2", from: "c1", to: "c2", type: "depends_on" }]));

    expect(ig.edges).toContainEqual(
      expect.objectContaining({ from: "c2", to: "c1", weight: 0.8 })
    );
  });

  it("halves evidence outflow for each unrebutted limits_scope limiter", () => {
    const ig = buildInfluenceGraph(
      graph([
        { id: "c3-e1", from: "c3", to: "e1", type: "limits_scope" },
        { id: "e1-c2", from: "e1", to: "c2", type: "evidences", polarity: "supporting" },
      ])
    );

    expect(ig.edges).toContainEqual(
      expect.objectContaining({ from: "e1", to: "c2", weight: 0.3 })
    );
  });

  it("excludes superseded claims and evidence entirely", () => {
    const supersededClaim = {
      ...claim("c4", "Old claim"),
      status: "superseded" as const,
    };
    const supersededEvidence = {
      ...evidence("e2", "Old finding", "Old source"),
      status: "superseded" as const,
    };
    const ig = buildInfluenceGraph(
      graph(
        [
          { id: "c4-c2", from: "c4", to: "c2", type: "supports" },
          { id: "e2-c2", from: "e2", to: "c2", type: "evidences", polarity: "supporting" },
        ],
        [supersededClaim, supersededEvidence]
      )
    );

    expect(ig.nodeById.has("c4")).toBe(false);
    expect(ig.nodeById.has("e2")).toBe(false);
    expect(ig.edges.some((edge) => edge.from === "c4" || edge.from === "e2")).toBe(false);
  });
});
