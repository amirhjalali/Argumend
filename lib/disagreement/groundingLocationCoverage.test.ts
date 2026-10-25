import { describe, expect, it } from "vitest";
import type { RawGroundingQuote } from "@/types/disagreement";
import { analyzeDisagreement } from "./analyze";
import { FakeDisagreementProvider } from "./model/fake";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "./prompts/v1/examples";
import { canPublishReport } from "./quality";

const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[0];
const curly = "“The data are reliable.”";
const straight = '"The data are reliable."';

async function run(surface: "position" | "stake", quotes: RawGroundingQuote[], extraSource = `Maya: ${curly}`) {
  const extraction = structuredClone(example.extraction);
  extraction.positions[1].groundingQuotes = [{ quote: "Missing quote one." }, { quote: "Missing quote two." }];
  extraction.claimStakeCandidates = [{
    id: "stake", claimId: "c-rate", participantId: "maya", positionId: "pos-uninsured-8",
    targetConclusion: "The estimate is reliable.", role: "hinge", ifFalseEffect: "reconsider",
    consequence: "The estimate would need revision.", basis: "explicit", groundingQuotes: [],
  }];
  const target = surface === "position" ? extraction.positions[0] : extraction.claimStakeCandidates[0];
  target.groundingQuotes = quotes;
  const result = await analyzeDisagreement({
    content: `${example.source}\n${extraSource} Both participants want reliable information about health coverage.`,
    contentType: example.contentType, requestId: "location-variant-test",
    provider: new FakeDisagreementProvider(extraction),
  });
  const displayed = surface === "position" ? result.report.positions[0].grounding
    : result.report.accountability!.stakes.find((stake) => stake.id === "stake")!.grounding;
  return { ...result, displayed };
}

describe.each(["position", "stake"] as const)("source span coverage for a %s", (surface) => {
  it.each([
    ["The data are reliable.", "The  data are reliable.", "The\tdata are reliable.", "The\ndata are reliable."],
    [curly, straight, "“The data are reliable.\"", '"The data are reliable.”'],
  ])("does not let normalized copies of one span enable publication", async (...copies) => {
    const baseline = await run(surface, [{ quote: copies[0], participantId: "maya" }]);
    expect(canPublishReport(baseline.report).ok).toBe(false);

    const repeated = await run(surface, copies.map((quote) => ({ quote, participantId: "maya" })));

    expect(repeated.displayed).toHaveLength(4);
    expect(new Set(repeated.displayed.map((ref) => `${ref.start}:${ref.end}`)).size).toBe(1);
    expect(repeated.report.quality.groundingCoverage).toBe(baseline.report.quality.groundingCoverage);
    expect(canPublishReport(repeated.report).ok).toBe(false);
  });

  it("counts distinct exact source occurrences separately", async () => {
    const result = await run(surface, [curly, straight].map((quote) => ({ quote, participantId: "maya" })), `Maya: ${curly}\nMaya: ${straight}`);

    expect(result.displayed).toHaveLength(2);
    expect(new Set(result.displayed.map((ref) => `${ref.start}:${ref.end}`)).size).toBe(2);
    expect(result.report.quality.groundingCoverage).toBe(surface === "position" ? 0.5 : 0.6);
  });

  it("keeps different participant attribution assessments separate", async () => {
    const result = await run(surface, ["maya", "noah"].map((participantId) => ({ quote: curly, participantId })));

    expect(result.displayed.map((ref) => ref.participantId)).toEqual(["maya", "noah"]);
    expect(result.report.quality.groundingCoverage).toBe(surface === "position" ? 0.5 : 0.6);
  });

  it("counts duplicate unmatched inputs once alongside normalized matches", async () => {
    const result = await run(surface, [curly, straight, "A missing quotation.", "A missing quotation."].map((quote) => ({ quote, participantId: "maya" })));

    expect(result.displayed).toHaveLength(2);
    expect(result.report.quality.droppedUngroundedQuoteCount).toBe(3);
    expect(result.report.quality.groundingCoverage).toBe(surface === "position" ? 0.25 : 0.4);
  });
});
