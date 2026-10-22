import { describe, expect, it } from "vitest";
import type { RawDisagreementExtractionV1 } from "@/types/disagreement";
import { parseDisagreementReport, parseRawDisagreementExtraction } from "@/lib/schemas/disagreement";
import { analyzeDisagreement } from "./analyze";
import { FakeDisagreementProvider } from "./model/fake";
import { normalizeExtraction } from "./normalize";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "./prompts/v1/examples";
import { validatePublishPayload } from "./publication";

const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[0];
const source = `${example.source}\nBoth participants want reliable information about health coverage.`;

function renamedExtraction(): RawDisagreementExtractionV1 {
  return JSON.parse(JSON.stringify(example.extraction)
    .replaceAll('"maya"', '"Speaker A"')
    .replaceAll('"noah"', '"Speaker B"'));
}

describe("participant identity normalization", () => {
  it("keeps an analysis publishable when model participant identifiers need normalization", async () => {
    const extraction = renamedExtraction();
    expect(parseRawDisagreementExtraction(extraction).success).toBe(true);

    const result = await analyzeDisagreement({
      content: source,
      contentType: example.contentType,
      requestId: "normalized-identity-test",
      provider: new FakeDisagreementProvider(extraction),
    });

    expect(parseDisagreementReport(result.report).success).toBe(true);
    expect(validatePublishPayload(result)).not.toHaveProperty("error");
    expect(result.report.positions.map((position) => position.grounding[0].participantId))
      .toEqual(["speaker-a", "speaker-b"]);
  });

  it("remaps quote attribution on positions, claims, shared ground, disagreements, and stakes", () => {
    const extraction = renamedExtraction();
    const quote = { ...extraction.positions[0].groundingQuotes[0] };
    extraction.commonGroundCandidates[0].groundingQuotes = [quote];
    extraction.disagreementCandidates[0].groundingQuotes = [quote];
    extraction.claimStakeCandidates = [{
      id: "stake-one", claimId: "c-rate", participantId: "Speaker A", positionId: "pos-uninsured-8",
      targetConclusion: "The uninsured rate is near 8 percent.", role: "hinge", ifFalseEffect: "reconsider",
      consequence: "The estimate would need revision.", basis: "explicit", groundingQuotes: [quote],
    }];
    const original = structuredClone(extraction);

    const result = normalizeExtraction(extraction).extraction;

    for (const quotes of [
      result.positions[0].groundingQuotes,
      result.claims[0].groundingQuotes,
      result.commonGroundCandidates[0].groundingQuotes,
      result.disagreementCandidates[0].groundingQuotes,
      result.claimStakeCandidates![0].groundingQuotes,
    ]) {
      expect(quotes[0].participantId).toBe("speaker-a");
    }
    expect(extraction).toEqual(original);
  });

  it("resolves a renamed duplicate label to the retained participant in positions and quotes", async () => {
    const extraction = structuredClone(example.extraction);
    extraction.participants.push({ id: "Maya Alias", label: "MAYA", kind: "named" });
    extraction.positions[0].participantIds = ["Maya Alias"];
    extraction.positions[0].groundingQuotes[0].participantId = "Maya Alias";

    const result = await analyzeDisagreement({
      content: source,
      contentType: example.contentType,
      requestId: "duplicate-identity-test",
      provider: new FakeDisagreementProvider(extraction),
    });

    expect(result.report.participants.map((participant) => participant.id)).toEqual(["maya", "noah"]);
    expect(result.report.positions[0].participantIds).toEqual(["maya"]);
    expect(result.report.positions[0].grounding[0].participantId).toBe("maya");
    expect(parseDisagreementReport(result.report).success).toBe(true);
  });

  it("keeps quote text without inventing an attribution when its participant is unknown", () => {
    const extraction = structuredClone(example.extraction);
    extraction.positions[0].groundingQuotes[0].participantId = "missing-person";

    const result = normalizeExtraction(extraction);

    expect(result.extraction.positions[0].groundingQuotes[0]).toEqual({
      quote: extraction.positions[0].groundingQuotes[0].quote,
      participantId: undefined,
    });
    expect(result.warnings).toContain("Removed 1 unresolved quote participant attribution(s); quoted text was retained.");
  });
});
