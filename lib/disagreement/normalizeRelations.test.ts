import { describe, expect, it } from "vitest";
import { RawDisagreementExtractionSchema } from "@/lib/schemas/disagreement";
import type { RawDisagreementExtractionV1 } from "@/types/disagreement";
import { analyzeDisagreement } from "./analyze";
import { buildArgumentGraph } from "./buildGraph";
import { FakeDisagreementProvider } from "./model/fake";
import { normalizeExtraction } from "./normalize";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "./prompts/v1/examples";

const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[0];

function extractionWithAlias(): RawDisagreementExtractionV1 {
  const extraction = structuredClone(example.extraction);
  extraction.claims.push({ ...structuredClone(extraction.claims[0]), id: "same-claim-again" });
  return extraction;
}

async function analyze(extraction: RawDisagreementExtractionV1) {
  expect(RawDisagreementExtractionSchema.safeParse(extraction).success).toBe(true);
  return analyzeDisagreement({
    content: `${example.source}\nBoth participants want reliable information about health coverage.`,
    contentType: example.contentType,
    requestId: "alias-relation-test",
    provider: new FakeDisagreementProvider(extraction),
  });
}

describe("relations whose claim identities merge", () => {
  it.each(["supports", "opposes", "depends_on", "qualifies", "contradicts", "undercuts"] as const)(
    "drops an alias-collapsed %s relation without changing the graph or cruxes",
    async (type) => {
      const baseline = await analyze(structuredClone(example.extraction));
      const extraction = extractionWithAlias();
      extraction.claimRelations = [{ fromClaimId: "same-claim-again", toClaimId: "c-rate", type }];

      const result = await analyze(extraction);

      expect(baseline.report.cruxes.length).toBeGreaterThan(0);
      expect(result.graph).toEqual(baseline.graph);
      expect(result.report.cruxes).toEqual(baseline.report.cruxes);
      expect(result.report.quality.warnings).toContain("Dropped relation between aliases of the same claim.");
    },
  );

  it("preserves relations to other claims and leaves the raw extraction unchanged", () => {
    const extraction = extractionWithAlias();
    extraction.claimRelations = [
      { fromClaimId: "same-claim-again", toClaimId: "c-rate", type: "depends_on" },
      { fromClaimId: "same-claim-again", toClaimId: "c-under", type: "opposes" },
    ];
    const original = structuredClone(extraction);

    const normalized = normalizeExtraction(extraction);
    const graph = buildArgumentGraph(normalized.extraction);

    expect(extraction).toEqual(original);
    expect(normalized.extraction.claimRelations).toEqual([
      { fromClaimId: "c-rate", toClaimId: "c-under", type: "opposes" },
    ]);
    expect(graph.valid).toBe(true);
    expect(graph.graph.edges).toContainEqual(expect.objectContaining({
      from: "c-rate", to: "c-under", type: "opposes",
    }));
  });

  it("keeps an original self-dependency for graph validation", async () => {
    const extraction = structuredClone(example.extraction);
    extraction.claimRelations = [{ fromClaimId: "c-rate", toClaimId: "c-rate", type: "depends_on" }];

    const normalized = normalizeExtraction(extraction);
    expect(normalized.extraction.claimRelations).toEqual(extraction.claimRelations);
    expect(normalized.warnings).not.toContain("Dropped relation between aliases of the same claim.");
    const result = await analyze(extraction);

    expect(result.graph.nodes).toHaveLength(1);
    expect(result.report.cruxes).toEqual([]);
    expect(result.report.quality.warnings).toContain(
      "ArgumentGraph failed validation; falling back to a question-only graph (acyclic-reasoning).",
    );
  });

  it("keeps a genuine cycle between different claims for graph validation", () => {
    const extraction = structuredClone(example.extraction);
    extraction.claimRelations = [
      { fromClaimId: "c-rate", toClaimId: "c-under", type: "depends_on" },
      { fromClaimId: "c-under", toClaimId: "c-rate", type: "depends_on" },
    ];

    const normalized = normalizeExtraction(extraction);
    const graph = buildArgumentGraph(normalized.extraction);

    expect(normalized.extraction.claimRelations).toEqual(extraction.claimRelations);
    expect(graph.valid).toBe(false);
    expect(graph.warnings.join(" ")).toContain("acyclic-reasoning");
  });
});
