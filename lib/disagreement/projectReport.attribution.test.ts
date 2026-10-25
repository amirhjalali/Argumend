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

async function report(
  participantIds: string[],
  groundingQuotes: RawDisagreementExtractionV1["commonGroundCandidates"][number]["groundingQuotes"],
  options: { source?: string; narrator?: boolean } = {},
) {
  const extraction = structuredClone(example.extraction);
  extraction.participants.push({ id: "rui", label: "Rui", kind: options.narrator ? "author" : "named" });
  extraction.commonGroundCandidates = [{
    statement: "An independent inspection should happen before deciding.",
    participantIds,
    groundingQuotes,
    basis: "explicit",
    confidence: "high",
  }];
  return (await analyzeDisagreement({
    content: options.source ?? source,
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

  it("does not count one source quote twice under different participant IDs", async () => {
    const result = await report(["maya", "noah"], [
      { quote: mayaQuote, participantId: "maya" },
      { quote: mayaQuote, participantId: "noah" },
    ]);
    expect(result.commonGround).toEqual([]);
    expect(result.share.metrics.commonGroundCount).toBe(0);
  });

  it("does not treat a nested excerpt of one person's quote as another person's agreement", async () => {
    const result = await report(["maya", "noah"], [
      { quote: mayaQuote, participantId: "maya" },
      { quote: "An independent inspection would help us decide.", participantId: "noah" },
    ]);
    expect(result.commonGround).toEqual([]);
  });

  it("keeps direct agreement when separate source spans cover the participants", async () => {
    const result = await report(["maya", "noah"], [
      { quote: mayaQuote, participantId: "maya" },
      { quote: mayaQuote, participantId: "noah" },
      { quote: noahQuote, participantId: "noah" },
    ]);
    expect(result.commonGround).toHaveLength(1);
  });

  it("finds separately grounded quotes when an earlier broad excerpt overlaps both speakers", async () => {
    const result = await report(["maya", "noah"], [
      { quote: `${mayaQuote}\n${noahQuote}`, participantId: "maya" },
      { quote: mayaQuote, participantId: "maya" },
      { quote: noahQuote, participantId: "noah" },
    ]);
    expect(result.commonGround).toHaveLength(1);
  });

  it("keeps identical words spoken at distinct labelled locations", async () => {
    const repeatedNoahQuote = mayaQuote.replace("Maya:", "Noah:");
    const result = await report(["maya", "noah"], [
      { quote: mayaQuote, participantId: "maya" },
      { quote: repeatedNoahQuote, participantId: "noah" },
    ], { source: `${example.source}\n${mayaQuote}\n${repeatedNoahQuote}` });
    expect(result.commonGround).toHaveLength(1);
    const [first, second] = result.commonGround[0].grounding;
    expect(first.end).toBeLessThan(second.start);
  });

  it("preserves explicit agreement attested by an identified narrator", async () => {
    const narration = "Rui: Maya and Noah agree that an independent inspection should happen before deciding.";
    const result = await report(["maya", "noah"], [
      { quote: narration, participantId: "rui" },
    ], { source: `${source}\n${narration}`, narrator: true });
    expect(result.commonGround).toHaveLength(1);
  });
});
