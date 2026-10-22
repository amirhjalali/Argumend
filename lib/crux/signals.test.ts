import { describe, expect, it } from "vitest";
import type { ArgumentGraph, Evidence } from "@/types/argument";
import { claim, evidence, workedExampleGraph } from "@/lib/argument/fixtures";
import { computeCruxSignals } from "./signals";

const WEIGHT: Evidence["weight"] = {
  sourceReliability: 10,
  independence: 10,
  replicability: 10,
  directness: 10,
  weightBasis: "The fixture gives both cards the same weight.",
};

function withCurrentEvidence(): ArgumentGraph {
  const graph = workedExampleGraph();
  return {
    ...graph,
    nodes: [
      ...graph.nodes,
      { ...evidence("current", "Current finding", "Current source"), weight: WEIGHT },
      { ...evidence("current-2", "Second current finding", "Second current source"), weight: WEIGHT },
    ],
    edges: [
      ...graph.edges,
      { id: "current-c2", from: "current", to: "c2", type: "evidences", polarity: "supporting" },
      { id: "current-2-c2", from: "current-2", to: "c2", type: "evidences", polarity: "supporting" },
    ],
  };
}

describe("crux signals exclude superseded material", () => {
  it.each(["supporting", "challenging"] as const)(
    "ignores superseded %s evidence in contestedness and evidence coverage",
    (polarity) => {
      const current = withCurrentEvidence();
      const withRetired: ArgumentGraph = {
        ...current,
        nodes: [
          ...current.nodes,
          { ...evidence("retired", "Retired finding", "Retired source"), status: "superseded", weight: WEIGHT },
        ],
        edges: [
          ...current.edges,
          { id: "retired-c2", from: "retired", to: "c2", type: "evidences", polarity },
        ],
      };

      expect(computeCruxSignals(withRetired).signals).toEqual(computeCruxSignals(current).signals);
    },
  );

  it.each(["supports", "opposes", "contradicts", "undercuts"] as const)(
    "ignores a superseded claim's %s relation when scoring current claims",
    (type) => {
      const current = withCurrentEvidence();
      const target = type === "undercuts" ? "i1" : "c2";
      const [from, to] = type === "contradicts" ? ["c2", "retired"] : ["retired", target];
      const withRetired: ArgumentGraph = {
        ...current,
        nodes: [...current.nodes, { ...claim("retired", "Retired claim"), status: "superseded" }],
        edges: [...current.edges, { id: "retired-edge", from, to, type }],
      };

      expect(computeCruxSignals(withRetired).signals).toEqual(computeCruxSignals(current).signals);
    },
  );
});
