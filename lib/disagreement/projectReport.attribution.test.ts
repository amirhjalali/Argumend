import { describe, expect, it } from "vitest";
import type { RawDisagreementExtractionV1 } from "@/types/disagreement";
import { analyzeDisagreement } from "./analyze";
import { FakeDisagreementProvider } from "./model/fake";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "./prompts/v1/examples";

const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[0];
const mayaQuote = "Maya: An independent inspection would help us decide.";
const noahQuote = "Noah: I also want the inspection before we decide.";
const ruiQuote = "Rui: I oppose any inspection.";
const source = `${example.source}\n${mayaQuote}\n${noahQuote}\n${ruiQuote}`;

async function report(participantIds: string[], groundingQuotes: RawDisagreementExtractionV1["commonGroundCandidates"][number]["groundingQuotes"]) {
  const extraction = structuredClone(example.extraction);
  extraction.participants.push({ id: "rui", label: "Rui", kind: "named" });
  extraction.commonGroundCandidates = [{
    statement: "An independent inspection should happen before deciding.",
    participantIds,
    groundingQuotes,
    basis: "explicit",
    confidence: "high",
  }];
  return (await analyzeDisagreement({
    content: source,
    contentType: "conversation",
    requestId: "common-ground-attribution-audit",
    provider: new FakeDisagreementProvider(extraction),
  })).report;
}

describe("common-ground attribution covers the named group", () => {
  const twoQuotes = [
    { quote: mayaQuote, participantId: "maya" },
    { quote: noahQuote, participantId: "noah" },
  ];

  it("does not extend two people's agreement to an unquoted third person", async () => {
    const result = await report(["maya", "noah", "rui"], twoQuotes);
    expect(result.commonGround).toEqual([]);
    expect(result.share.metrics.commonGroundCount).toBe(0);
  });

  it("does not present one person's statement as shared agreement", async () => {
    const result = await report(["maya"], [twoQuotes[0]]);
    expect(result.commonGround).toEqual([]);
  });

  it("does not treat an outside participant's own view as narrator attestation", async () => {
    const result = await report(["maya", "noah"], [{ quote: ruiQuote, participantId: "rui" }]);
    expect(result.commonGround).toEqual([]);
  });

  it("keeps agreement attributed only to the people quoted on it", async () => {
    const result = await report(["maya", "noah"], twoQuotes);
    expect(result.commonGround).toHaveLength(1);
    expect(result.commonGround[0].participantIds).toEqual(["maya", "noah"]);
  });
});
