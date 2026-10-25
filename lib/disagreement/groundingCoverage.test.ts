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

  it("counts a case-changed ungrounded stake quote as missing", async () => {
    const extraction = structuredClone(example.extraction);
    const quote = extraction.positions[0].groundingQuotes[0];
    extraction.claimStakeCandidates = [{
      ...stake("one", [{ ...quote, quote: quote.quote.toLowerCase() }]),
      claimId: "c-rate", participantId: "maya", positionId: "pos-uninsured-8",
    }];

    const { report } = await analyzeDisagreement({
      content: source, contentType: example.contentType, requestId: "case-changed-stake-quotes",
      provider: new FakeDisagreementProvider(extraction),
    });

    expect(report.accountability!.stakes.find((item) => item.id === "one")!.grounding).toHaveLength(0);
    expect(report.quality.droppedUngroundedQuoteCount).toBe(1);
    expect(report.quality.groundingCoverage).toBe(0.667);
  });

  it("does not let an earlier rejected case variant suppress a later exact quote", async () => {
    const extraction = structuredClone(example.extraction);
    const quote = extraction.positions[0].groundingQuotes[0];
    extraction.positions[0].groundingQuotes = [{ ...quote, quote: quote.quote.toLowerCase() }];
    extraction.claimStakeCandidates = [{
      ...stake("one", [quote]), claimId: "c-rate", participantId: "maya", positionId: "pos-uninsured-8",
    }];

    const { report } = await analyzeDisagreement({
      content: source, contentType: example.contentType, requestId: "case-corrected-stake-quotes",
      provider: new FakeDisagreementProvider(extraction),
    });

    expect(report.accountability!.stakes.find((item) => item.id === "one")!.grounding).toHaveLength(1);
    expect(report.quality.droppedUngroundedQuoteCount).toBe(1);
    expect(report.quality.groundingCoverage).toBe(0.667);
  });
});

describe("grounding coverage within a report object", () => {
  it.each(["position", "common-ground", "disagreement"])("does not let a repeated %s quote make a report publishable", async (surface) => {
    const extraction = structuredClone(example.extraction);
    const quote = extraction.positions[0].groundingQuotes[0];
    extraction.positions[0].groundingQuotes = [];
    extraction.positions[1].groundingQuotes = [
      { quote: "This first invented quote does not exist in the source.", participantId: "noah" },
      { quote: "This second invented quote also does not exist in the source.", participantId: "noah" },
    ];
    const target = surface === "position" ? extraction.positions[0]
      : surface === "common-ground" ? extraction.commonGroundCandidates[0] : extraction.disagreementCandidates[0];
    const run = async () => analyzeDisagreement({
      content: source, contentType: example.contentType, requestId: "duplicate-report-quotes",
      provider: new FakeDisagreementProvider(extraction),
    });
    target.groundingQuotes = [quote];
    const original = await run();
    expect(original.report.quality.groundingCoverage).toBe(0.333);
    expect(canPublishReport(original.report).ok).toBe(false);

    target.groundingQuotes = Array.from({ length: 4 }, () => ({ ...quote }));
    const duplicated = await run();

    expect(duplicated.report.quality.groundingCoverage).toBe(original.report.quality.groundingCoverage);
    expect(canPublishReport(duplicated.report).ok).toBe(false);
    const displayed = surface === "position" ? duplicated.report.positions[0]
      : surface === "common-ground" ? duplicated.report.commonGround[0] : duplicated.report.disagreements[0];
    if (surface === "common-ground") {
      // Repeated words from one participant cannot attest shared ground.
      expect(displayed).toBeUndefined();
    } else {
      expect(displayed.grounding).toHaveLength(4);
    }
  });

  it("keeps the existing coverage policy when different report objects reuse a quote", async () => {
    const extraction = structuredClone(example.extraction);
    const quote = extraction.positions[0].groundingQuotes[0];
    extraction.commonGroundCandidates[0].groundingQuotes = [quote];
    extraction.disagreementCandidates[0].groundingQuotes = [quote];
    extraction.positions[1].groundingQuotes = [{ quote: "This invented quote does not exist in the source." }];

    const { report } = await analyzeDisagreement({
      content: source, contentType: example.contentType, requestId: "cross-object-report-quotes",
      provider: new FakeDisagreementProvider(extraction),
    });

    expect(report.quality.groundingCoverage).toBe(0.75);
    expect(report.quality.droppedUngroundedQuoteCount).toBe(1);
  });
});
