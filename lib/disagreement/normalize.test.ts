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

  it("removes references to a position dropped because its participant is unknown", async () => {
    const extraction = structuredClone(example.extraction);
    extraction.positions.push({ ...extraction.positions[0], id: "position-to-drop", participantIds: ["missing-person"] });
    extraction.disagreementCandidates[0].participantStances[0].positionId = "position-to-drop";
    extraction.claims[0].stanceByPosition.push({ positionId: "position-to-drop", relation: "supports" });
    extraction.claimStakeCandidates = [{
      id: "stake-one", claimId: "c-rate", participantId: "maya", positionId: "position-to-drop",
      targetConclusion: "The uninsured rate is near 8 percent.", role: "hinge", ifFalseEffect: "reconsider",
      consequence: "The estimate would need revision.", basis: "explicit", groundingQuotes: [],
    }];

    const result = await analyzeDisagreement({
      content: source, contentType: example.contentType, requestId: "dropped-position-test",
      provider: new FakeDisagreementProvider(extraction),
    });

    expect(parseDisagreementReport(result.report).success).toBe(true);
    expect(result.report.disagreements[0].participantStances[0].positionId).toBeUndefined();
    expect(result.report.accountability!.stakes.find((stake) => stake.id === "stake-one")!.positionId).toBeUndefined();
    expect(result.report.quality.warnings).toContain("Preserved stake at index 0 without its dropped position reference.");
    expect(result.report.quality.warnings).toContain("Preserved stance for disagreement at index 0 without its dropped position reference.");
    expect(result.graph.edges.some((edge) => edge.to === "position-to-drop")).toBe(false);
  });

  it.each(["c-rate", "pos-uninsured-8"])("reserves the generated question ID when the model assigns it to %s", async (id) => {
    const extraction: RawDisagreementExtractionV1 = JSON.parse(JSON.stringify(example.extraction)
      .replaceAll(JSON.stringify(id), '"q-main"'));
    const result = await analyzeDisagreement({
      content: source, contentType: example.contentType, requestId: "reserved-question-test",
      provider: new FakeDisagreementProvider(extraction),
    });

    expect(result.graph.nodes.length).toBeGreaterThan(1);
    expect(result.graph.question.id).toBe("q-main");
    expect(result.graph.nodes.some((node) => node.id === "q-main-2")).toBe(true);
    expect(new Set(result.graph.nodes.map((node) => node.id)).size).toBe(result.graph.nodes.length);
    expect(parseDisagreementReport(result.report).success).toBe(true);
  });

  it("keeps valid cross-kind IDs distinct while resolving each reference by kind", async () => {
    const extraction: RawDisagreementExtractionV1 = JSON.parse(JSON.stringify(example.extraction)
      .replaceAll('"maya"', '"shared-id"')
      .replaceAll('"pos-uninsured-8"', '"shared-id"')
      .replaceAll('"c-rate"', '"shared-id"'));
    expect(parseRawDisagreementExtraction(extraction).success).toBe(true);
    const result = await analyzeDisagreement({
      content: source, contentType: example.contentType, requestId: "cross-kind-identity-test",
      provider: new FakeDisagreementProvider(extraction),
    });

    expect(result.report.participants[0].id).toBe("shared-id");
    expect(result.report.positions[0].id).toBe("shared-id-2");
    expect(result.report.positions[0].participantIds).toEqual(["shared-id"]);
    expect(result.report.positions[0].grounding[0].participantId).toBe("shared-id");
    expect(result.graph.nodes.some((node) => node.type === "claim" && node.id === "shared-id-3")).toBe(true);
    expect(parseDisagreementReport(result.report).success).toBe(true);
  });

  it("keeps references to an exact duplicate claim after giving it a canonical identity", async () => {
    const extraction = structuredClone(example.extraction);
    extraction.claims.push({ ...structuredClone(extraction.claims[0]), id: "same-claim-again" });
    extraction.claimRelations = [{ fromClaimId: "same-claim-again", toClaimId: "c-under", type: "opposes" }];
    extraction.disagreementCandidates[0].claimIds = ["same-claim-again"];
    extraction.claimStakeCandidates = [{
      id: "explicit-stake", claimId: "same-claim-again", participantId: "maya",
      targetConclusion: "The estimate is useful.", role: "hinge", ifFalseEffect: "reconsider",
      consequence: "The estimate would need revision.", basis: "explicit", groundingQuotes: [],
    }];

    const result = await analyzeDisagreement({
      content: source, contentType: example.contentType, requestId: "claim-alias-test",
      provider: new FakeDisagreementProvider(extraction),
    });

    expect(result.graph.nodes.some((node) => node.id === "same-claim-again")).toBe(false);
    expect(result.graph.edges).toContainEqual(expect.objectContaining({ from: "c-rate", to: "c-under", type: "opposes" }));
    expect(result.report.disagreements[0].relatedClaimIds).toEqual(["c-rate"]);
    expect(result.report.accountability!.stakes).toContainEqual(expect.objectContaining({
      id: "explicit-stake", claimId: "c-rate", participantId: "maya", basis: "explicit",
    }));
    expect(parseDisagreementReport(result.report).success).toBe(true);
  });

  it("preserves a repeated statement with distinct attribution or stance instead of inventing a merge", () => {
    const extraction = structuredClone(example.extraction);
    extraction.claims.push({
      ...structuredClone(extraction.claims[0]),
      id: "same-proposition-different-speaker",
      participantIds: ["noah"],
      acceptedByParticipantIds: ["noah"],
      disputedByParticipantIds: ["maya"],
      stanceByPosition: [{ positionId: "pos-underinsured", relation: "supports" }],
    });

    const result = normalizeExtraction(extraction).extraction;

    expect(result.claims).toHaveLength(3);
    expect(result.claims[0].participantIds).toEqual(["maya"]);
    expect(result.claims[2]).toMatchObject({
      id: "same-proposition-different-speaker", participantIds: ["noah"],
      stanceByPosition: [{ positionId: "pos-underinsured", relation: "supports" }],
    });
  });

  it("keeps authored stake IDs without minting an unattributed primary-crux fallback", async () => {
    const extraction = structuredClone(example.extraction);
    const baseline = await analyzeDisagreement({
      content: source, contentType: example.contentType, requestId: "stake-identity-baseline",
      provider: new FakeDisagreementProvider(extraction),
    });
    const otherClaim = extraction.claims.find((claim) => claim.id !== baseline.report.cruxes[0].claimId)!;
    extraction.claimStakeCandidates = ["stake-primary-crux-fallback", "stake-primary-crux-fallback-2"].map((id) => ({
      id, claimId: otherClaim.id, participantId: "maya", targetConclusion: "The estimate is useful.",
      role: "hinge", ifFalseEffect: "reconsider", consequence: "The estimate would need revision.",
      basis: "explicit", groundingQuotes: [],
    }));

    const result = await analyzeDisagreement({
      content: source, contentType: example.contentType, requestId: "fallback-stake-identity-test",
      provider: new FakeDisagreementProvider(extraction),
    });

    expect(parseDisagreementReport(result.report).success).toBe(true);
    const stakes = result.report.accountability!.stakes;
    expect(new Set(stakes.map((stake) => stake.id)).size).toBe(stakes.length);
    expect(stakes).toHaveLength(2);
    expect(stakes.map((stake) => stake.id)).toEqual(["stake-primary-crux-fallback", "stake-primary-crux-fallback-2"]);
    expect(stakes.every((stake) => stake.basis === "explicit" && stake.participantId === "maya")).toBe(true);
  });
});
