import { describe, expect, it } from "vitest";
import type { InfluenceGraph } from "./influence";
import { propagate } from "./propagate";

function ig(overrides: Partial<InfluenceGraph> = {}): InfluenceGraph {
  const nodes = [
    { id: "a", type: "claim" as const, statement: "A", baseActivation: 0.4 },
    { id: "b", type: "claim" as const, statement: "B", baseActivation: 0 },
    { id: "p", type: "position" as const, statement: "P", baseActivation: 0 },
  ];
  return {
    nodes,
    edges: [
      { id: "a-b", from: "a", to: "b", weight: 0.7, relation: "supports" },
      { id: "b-p", from: "b", to: "p", weight: 1, relation: "supports" },
    ],
    nodeById: new Map(nodes.map((node) => [node.id, node])),
    originalNodeById: new Map(),
    excludedNodeIds: new Set(),
    ...overrides,
  };
}

describe("propagate", () => {
  it("converges on a small acyclic graph", () => {
    const result = propagate(ig());

    expect(result.converged).toBe(true);
    expect(result.activations.get("p")).toBeGreaterThan(0);
  });

  it("holds clamps fixed", () => {
    const result = propagate(ig(), new Map([["b", -1]]));

    expect(result.activations.get("b")).toBe(-1);
    expect(result.activations.get("p")).toBeLessThan(0);
  });

  it("damps a non-converging 2-cycle once and emits a warning", () => {
    const nodes = [
      { id: "a", type: "claim" as const, statement: "A", baseActivation: 0.5 },
      { id: "b", type: "claim" as const, statement: "B", baseActivation: -0.5 },
    ];
    const result = propagate(
      ig({
        nodes,
        nodeById: new Map(nodes.map((node) => [node.id, node])),
        edges: [
          { id: "a-b", from: "a", to: "b", weight: 4, relation: "supports" },
          { id: "b-a", from: "b", to: "a", weight: 4, relation: "supports" },
        ],
      })
    );

    expect(result.cycleWarnings).toEqual([expect.stringContaining("a, b")]);
  });
});
