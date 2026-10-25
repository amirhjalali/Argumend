import { describe, expect, it } from "vitest";
import { validateArgumentGraph } from "@/lib/argument/validate";
import { buildArgumentGraph } from "./buildGraph";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "./prompts/v1/examples";

function extractionWithIndirectClaims() {
  const extraction = structuredClone(DISAGREEMENT_FEW_SHOT_EXAMPLES[1].extraction);
  for (const [id, statement] of [
    ["c-upstream", "The wage survey uses a representative sample of local workers."],
    ["c-method", "The sample includes workers across the affected sectors."],
    ["c-orphan", "An unrelated survey counts trees in another country."],
  ]) {
    extraction.claims.push({
      ...structuredClone(extraction.claims[0]),
      id,
      statement,
      stanceByPosition: [],
    });
  }
  return extraction;
}

describe("indirect claim connectivity", () => {
  it("keeps an entire supporting chain without requiring a direct stance on each premise", () => {
    const extraction = extractionWithIndirectClaims();
    // The distant link comes first so retention cannot depend on relation order.
    extraction.claimRelations = [
      { fromClaimId: "c-method", toClaimId: "c-upstream", type: "supports" },
      { fromClaimId: "c-upstream", toClaimId: "c-wage", type: "supports" },
    ];

    const result = buildArgumentGraph(extraction);

    expect(result.valid).toBe(true);
    expect(result.graph.nodes.map((node) => node.id)).toEqual(expect.arrayContaining([
      "c-upstream", "c-method", "c-wage",
    ]));
    expect(result.graph.edges).toEqual(expect.arrayContaining([
      expect.objectContaining({ from: "c-method", to: "c-upstream", type: "supports" }),
      expect.objectContaining({ from: "c-upstream", to: "c-wage", type: "supports" }),
    ]));
    expect(result.graph.nodes.some((node) => node.id === "c-orphan")).toBe(false);
    expect(validateArgumentGraph(result.graph).filter((issue) => issue.severity === "error")).toEqual([]);
  });

  it("retains a dependency reached against the stored edge direction", () => {
    const extraction = extractionWithIndirectClaims();
    extraction.claimRelations = [
      { fromClaimId: "c-wage", toClaimId: "c-upstream", type: "depends_on" },
    ];

    const result = buildArgumentGraph(extraction);

    expect(result.valid).toBe(true);
    expect(result.graph.nodes.some((node) => node.id === "c-upstream")).toBe(true);
    expect(result.graph.edges).toContainEqual(expect.objectContaining({
      from: "c-wage", to: "c-upstream", type: "depends_on",
    }));
  });

  it("does not retain claims connected only through an unsupported undercuts relation", () => {
    const extraction = extractionWithIndirectClaims();
    extraction.claimRelations = [
      { fromClaimId: "c-upstream", toClaimId: "c-wage", type: "undercuts" },
    ];

    const result = buildArgumentGraph(extraction);

    expect(result.valid).toBe(true);
    expect(result.graph.nodes.some((node) => node.id === "c-upstream")).toBe(false);
  });

  it("does not hide a structural cycle inside an indirectly connected chain", () => {
    const extraction = extractionWithIndirectClaims();
    extraction.claimRelations = [
      { fromClaimId: "c-wage", toClaimId: "c-upstream", type: "depends_on" },
      { fromClaimId: "c-upstream", toClaimId: "c-method", type: "depends_on" },
      { fromClaimId: "c-method", toClaimId: "c-upstream", type: "depends_on" },
    ];

    const result = buildArgumentGraph(extraction);

    expect(result.valid).toBe(false);
    expect(result.warnings.join(" ")).toContain("acyclic-reasoning");
  });
});
