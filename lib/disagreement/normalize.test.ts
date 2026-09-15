import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import type { RawDisagreementExtractionV1 } from "@/types/disagreement";
import { analyzeDisagreement } from "./analyze";
import { FakeDisagreementProvider } from "./model/fake";
import { normalizeExtraction } from "./normalize";

const REQUEST_ID = "11111111-1111-1111-1111-111111111111";

function extractionWithCaseVariantSpeakers(): RawDisagreementExtractionV1 {
  return {
    mainQuestion: "Should the sprint be extended?",
    participants: [
      { id: "priya", label: "Priya", kind: "named" },
      { id: "priya-caps", label: "PRIYA", kind: "speaker-label" },
      { id: "tom", label: "Tom", kind: "named" },
    ],
    positions: [
      {
        id: "pos-extend",
        label: "Extend",
        participantIds: ["priya", "priya-caps"],
        thesis: "Extend the sprint.",
        steelman: "The large tickets cannot close on time.",
        explicitness: "explicit",
        confidence: "high",
        groundingQuotes: [],
      },
      {
        id: "pos-close",
        label: "Close",
        participantIds: ["tom"],
        thesis: "Close the sprint.",
        steelman: "The estimates are stale.",
        explicitness: "explicit",
        confidence: "high",
        groundingQuotes: [],
      },
    ],
    claims: [
      {
        id: "claim-repointed",
        statement: "The tickets were re-pointed on Monday.",
        participantIds: ["priya", "priya-caps"],
        epistemicType: "empirical",
        explicitness: "explicit",
        stanceByPosition: [
          { positionId: "pos-extend", relation: "supports" },
          { positionId: "pos-close", relation: "opposes" },
        ],
        acceptedByParticipantIds: ["priya-caps", "priya"],
        disputedByParticipantIds: ["tom"],
        confidence: "medium",
        groundingQuotes: [],
      },
    ],
    claimRelations: [],
    commonGroundCandidates: [
      {
        statement: "The board must be fixed first.",
        participantIds: ["tom", "priya", "priya-caps"],
        basis: "explicit",
        confidence: "high",
        groundingQuotes: [],
      },
    ],
    disagreementCandidates: [
      {
        id: "d-sizes",
        question: "Were the tickets re-pointed?",
        type: "empirical",
        summary: "Priya says yes; Tom says the board disagrees.",
        claimIds: ["claim-repointed"],
        participantStances: [
          { participantId: "priya", positionId: "pos-extend", stance: "Yes." },
          { participantId: "priya-caps", positionId: "pos-extend", stance: "Yes, on Monday." },
          { participantId: "tom", positionId: "pos-close", stance: "The board says no." },
        ],
        resolutionCondition: "Check the board history.",
        confidence: "high",
        groundingQuotes: [],
      },
    ],
    claimStakeCandidates: [],
    caveats: [],
  };
}

describe("normalizeExtraction participant dedupe (§10.3)", () => {
  it("leaves no duplicate participant ids after label dedupe remaps them", () => {
    const { extraction, warnings } = normalizeExtraction(extractionWithCaseVariantSpeakers());

    expect(extraction.participants.map((participant) => participant.id)).toEqual(["priya", "tom"]);
    expect(warnings.some((warning) => /Deduplicated participant label "PRIYA"/.test(warning))).toBe(true);

    expect(extraction.positions[0].participantIds).toEqual(["priya"]);
    expect(extraction.claims[0].participantIds).toEqual(["priya"]);
    expect(extraction.claims[0].acceptedByParticipantIds).toEqual(["priya"]);
    expect(extraction.claims[0].disputedByParticipantIds).toEqual(["tom"]);
    expect(extraction.commonGroundCandidates[0].participantIds).toEqual(["tom", "priya"]);
    expect(
      extraction.disagreementCandidates[0].participantStances.map((stance) => stance.participantId),
    ).toEqual(["priya", "tom"]);
  });

  it("does not disturb arrays that were already unique", () => {
    const raw = extractionWithCaseVariantSpeakers();
    raw.participants = raw.participants.filter((participant) => participant.id !== "priya-caps");
    const { extraction } = normalizeExtraction(raw);
    expect(extraction.positions[0].participantIds).toEqual(["priya"]);
    expect(extraction.commonGroundCandidates[0].participantIds).toEqual(["tom", "priya"]);
  });

  it("projects deduped ids into the report for the case-variant speakers fixture", async () => {
    const data = JSON.parse(
      readFileSync(join(process.cwd(), "data/evals/disagreement/duplicate-speakers-case-variants.json"), "utf8"),
    ) as { source: string; contentType: "conversation"; extraction: RawDisagreementExtractionV1 };
    const result = await analyzeDisagreement({
      content: data.source,
      contentType: data.contentType,
      requestId: REQUEST_ID,
      provider: new FakeDisagreementProvider(data.extraction),
    });
    for (const position of result.report.positions) {
      expect(new Set(position.participantIds).size).toBe(position.participantIds.length);
    }
    expect(result.report.positions.map((position) => position.participantIds)).toEqual([["priya"], ["tom"]]);
  });
});
