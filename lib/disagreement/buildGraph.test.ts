import { describe, expect, it } from "vitest";
import { identifyCruxes } from "@/lib/crux";
import { validateArgumentGraph } from "@/lib/argument/validate";
import { analyzeDisagreement } from "./analyze";
import { FakeDisagreementProvider } from "./model/fake";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "./prompts/v1/examples";
import type { RawDisagreementExtractionV1 } from "@/types/disagreement";

const EXAMPLE = DISAGREEMENT_FEW_SHOT_EXAMPLES[1];

function analyze(extraction: RawDisagreementExtractionV1) {
  return analyzeDisagreement({
    content: EXAMPLE.source,
    contentType: EXAMPLE.contentType,
    requestId: "graph-relation-fixture",
    provider: new FakeDisagreementProvider(extraction),
  });
}

describe("model relation normalization at the graph boundary", () => {
  it.each(["supports", "opposes", "qualifies", "depends_on"] as const)(
    "does not make a repeated %s assertion stronger in crux scoring",
    async (type) => {
      const extraction = structuredClone(EXAMPLE.extraction);
      const relation = { fromClaimId: "c-wage", toClaimId: "c-growth", type };
      extraction.claimRelations = [relation];
      const baseline = await analyze(extraction);
      const repeatedExtraction = structuredClone(extraction);
      repeatedExtraction.claimRelations.push({ ...relation });
      const repeated = await analyze(repeatedExtraction);

      expect(repeated.graph.nodes.length).toBeGreaterThan(1);
      expect(validateArgumentGraph(repeated.graph).filter((issue) => issue.severity === "error")).toEqual([]);
      expect(identifyCruxes(repeated.graph)).toEqual(identifyCruxes(baseline.graph));
      expect(repeated.graph).toEqual(baseline.graph);
      expect(repeated.report.cruxes).toEqual(baseline.report.cruxes);
    },
  );

  it("does not strengthen a position when the model repeats a claim's stance", async () => {
    const extraction = structuredClone(EXAMPLE.extraction);
    const baseline = await analyze(extraction);
    extraction.claims[0].stanceByPosition.push({ ...extraction.claims[0].stanceByPosition[0] });
    const repeated = await analyze(extraction);

    expect(identifyCruxes(repeated.graph)).toEqual(identifyCruxes(baseline.graph));
    expect(repeated.graph).toEqual(baseline.graph);
  });

  it("keeps different relation types and distinct claims separate", async () => {
    const extraction = structuredClone(EXAMPLE.extraction);
    extraction.claimRelations = [
      { fromClaimId: "c-wage", toClaimId: "c-growth", type: "opposes" },
      { fromClaimId: "c-wage", toClaimId: "c-growth", type: "qualifies" },
    ];
    extraction.claims.push({
      ...structuredClone(extraction.claims[0]),
      id: "c-distribution",
      statement: "Any wage effect is concentrated among workers who compete most directly with new arrivals.",
    });

    const result = await analyze(extraction);

    expect(result.graph.edges).toEqual(expect.arrayContaining([
      expect.objectContaining({ from: "c-wage", to: "c-growth", type: "opposes" }),
      expect.objectContaining({ from: "c-wage", to: "c-growth", type: "qualifies" }),
      expect.objectContaining({ from: "c-wage", to: "pos-supply", type: "supports" }),
      expect.objectContaining({ from: "c-distribution", to: "pos-supply", type: "supports" }),
    ]));
    expect(result.graph.nodes.some((node) => node.id === "c-distribution")).toBe(true);
  });
});
