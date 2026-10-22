import { describe, expect, it } from "vitest";
import type { RawClaimStakeCandidate } from "@/types/disagreement";
import { RawDisagreementExtractionSchema } from "@/lib/schemas/disagreement";
import { analyzeDisagreement } from "./analyze";
import { FakeDisagreementProvider } from "./model/fake";
import { normalizeExtraction } from "./normalize";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "./prompts/v1/examples";
import { canPublishReport } from "./quality";
import { projectClaimStakes } from "./stakes";

const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[0];
const source = `${example.source}\nBoth participants want reliable information about health coverage.`;
const validQuote = example.extraction.positions[1].groundingQuotes[0];

function stake(id: string, groundingQuotes = [validQuote]): RawClaimStakeCandidate {
  return {
    id, claimId: "c-under", participantId: "noah", positionId: "pos-underinsured",
    targetConclusion: "The relevant gap includes underinsurance.", role: "hinge",
    ifFalseEffect: "reconsider", consequence: "The estimate would need revision.",
    basis: "explicit", groundingQuotes,
  };
}

function project(stakes: RawClaimStakeCandidate[]) {
  const extraction = structuredClone(example.extraction);
  extraction.claimStakeCandidates = stakes;
  return projectClaimStakes({
    extraction: normalizeExtraction(extraction).extraction,
    source,
    cruxClaimIds: ["c-under"],
  });
}

describe("stake grounding coverage", () => {
  it("counts a repeated candidate-local quote once while preserving its displayed references", () => {
    const repeated = Array.from({ length: 4 }, () => ({ ...validQuote }));

    const result = project([stake("one", repeated)]);

    expect(result.expectedQuoteCount).toBe(1);
    expect(result.groundedQuoteCount).toBe(1);
    expect(result.accountability.stakes[0].grounding).toHaveLength(4);
  });

  it("counts a quote reused by another stake only once", () => {
    const result = project([stake("one"), stake("two")]);

    expect(result.expectedQuoteCount).toBe(1);
    expect(result.groundedQuoteCount).toBe(1);
    expect(result.accountability.stakes.map((item) => item.grounding.length)).toEqual([1, 1]);
  });

  it("counts genuinely distinct quotes separately", () => {
    const otherQuote = example.extraction.positions[0].groundingQuotes[0];
    const result = project([stake("one", [validQuote, otherQuote])]);

    expect(result.expectedQuoteCount).toBe(2);
    expect(result.groundedQuoteCount).toBe(2);
    expect(result.accountability.stakes[0].grounding).toHaveLength(2);
  });

  it("does not let duplicate stake quotes make a report publishable", async () => {
    const extraction = structuredClone(example.extraction);
    extraction.positions[1].groundingQuotes = [
      { quote: "This first invented quote does not exist in the source.", participantId: "noah" },
      { quote: "This second invented quote also does not exist in the source.", participantId: "noah" },
    ];
    extraction.claimStakeCandidates = [stake("one")];
    const run = async () => {
      expect(RawDisagreementExtractionSchema.safeParse(extraction).success).toBe(true);
      return analyzeDisagreement({
        content: source, contentType: example.contentType, requestId: "duplicate-stake-quotes",
        provider: new FakeDisagreementProvider(extraction),
      });
    };
    const original = await run();
    expect(original.report.quality.groundingCoverage).toBe(0.5);
    expect(canPublishReport(original.report).ok).toBe(false);

    extraction.claimStakeCandidates[0].groundingQuotes = Array.from({ length: 4 }, () => ({ ...validQuote }));
    const duplicated = await run();

    expect(duplicated.report.quality.groundingCoverage).toBe(original.report.quality.groundingCoverage);
    expect(canPublishReport(duplicated.report).ok).toBe(false);
  });
});
