import { describe, expect, it } from "vitest";
import { deriveEvidenceState } from "./evidenceState";

const source =
  "Ana: The audit found 40 percent of invoices were late.\nBen: Invoices are fine.\nAna: Costs will rise next year.\nBen: We should keep the vendor.";

function claim(overrides: Partial<Parameters<typeof deriveEvidenceState>[0]["claim"]> = {}) {
  return {
    id: "c1",
    statement: "Invoices are fine.",
    epistemicType: "empirical" as const,
    groundingQuotes: [{ quote: "Invoices are fine." }],
    ...overrides,
  };
}

describe("deriveEvidenceState", () => {
  it("is the general boundary for a normative or definitional claim", () => {
    expect(
      deriveEvidenceState({ claim: claim({ epistemicType: "normative", statement: "We should keep the vendor." }), relations: [], source }),
    ).toBe("not-independently-checked");
    expect(
      deriveEvidenceState({ claim: claim({ epistemicType: "definitional" }), relations: [], source }),
    ).toBe("not-independently-checked");
  });

  it("is asserted-in-source when the claim's grounded wording cites a figure or a report", () => {
    expect(
      deriveEvidenceState({
        claim: claim({
          statement: "Forty percent of invoices were late.",
          groundingQuotes: [{ quote: "The audit found 40 percent of invoices were late." }],
        }),
        relations: [],
        source,
      }),
    ).toBe("asserted-in-source");
  });

  it("is asserted-in-source when another claim in the source bears on it", () => {
    expect(
      deriveEvidenceState({
        claim: claim(),
        relations: [{ fromClaimId: "c2", toClaimId: "c1", type: "undercuts" }],
        source,
      }),
    ).toBe("asserted-in-source");
  });

  it("is no-evidence-provided for a bare, grounded assertion nothing bears on", () => {
    expect(deriveEvidenceState({ claim: claim(), relations: [], source })).toBe("no-evidence-provided");
    expect(
      deriveEvidenceState({
        claim: claim({ epistemicType: "predictive", statement: "Costs will rise next year.", groundingQuotes: [{ quote: "Costs will rise next year." }] }),
        relations: [],
        source,
      }),
    ).toBe("no-evidence-provided");
  });

  it("does not say no evidence was supplied when it never saw the claim's wording in the source", () => {
    // No grounded quote: the model's statement is all there is, and a
    // paraphrase cannot show what the source did or did not supply.
    expect(
      deriveEvidenceState({ claim: claim({ groundingQuotes: [{ quote: "not in the source at all" }] }), relations: [], source }),
    ).toBe("not-independently-checked");
    expect(deriveEvidenceState({ claim: claim({ groundingQuotes: [] }), relations: [], source })).toBe(
      "not-independently-checked",
    );
  });

  it("ignores a relation the claim itself is the source of", () => {
    expect(
      deriveEvidenceState({
        claim: claim(),
        relations: [{ fromClaimId: "c1", toClaimId: "c2", type: "supports" }],
        source,
      }),
    ).toBe("no-evidence-provided");
  });
});
