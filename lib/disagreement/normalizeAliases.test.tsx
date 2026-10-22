import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PositionBriefs } from "@/components/disagreement/PositionBriefs";
import { DisagreementBriefs } from "@/components/disagreement/DisagreementBriefs";
import { parseDisagreementReport } from "@/lib/schemas/disagreement";
import { analyzeDisagreement } from "./analyze";
import { FakeDisagreementProvider } from "./model/fake";
import { normalizeExtraction } from "./normalize";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "./prompts/v1/examples";
import { validatePublishPayload } from "./publication";

const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[0];
const source = `${example.source}\nBoth participants want reliable information about health coverage.`;
const distinctStance = "That figure describes the narrower uninsured definition.";

function extractionWithAlias() {
  const extraction = structuredClone(example.extraction);
  extraction.participants.push({ id: "maya-alias", label: "MAYA", kind: "named" });
  const aliases = ["maya", "maya-alias"];
  extraction.positions[0].participantIds = [...aliases];
  extraction.claims[0].participantIds = [...aliases];
  extraction.claims[0].acceptedByParticipantIds = [...aliases];
  extraction.claims[1].disputedByParticipantIds = [...aliases];
  extraction.commonGroundCandidates[0].participantIds = [...aliases, "noah"];
  const [maya, noah] = extraction.disagreementCandidates[0].participantStances;
  extraction.disagreementCandidates[0].participantStances = [
    maya,
    { ...maya, participantId: "maya-alias" },
    { ...maya, participantId: "maya-alias", stance: distinctStance },
    noah,
  ];
  return extraction;
}

describe("canonical participant references", () => {
  it("deduplicates participant references after alias repair without reporting them as dangling", () => {
    const extraction = extractionWithAlias();
    const original = structuredClone(extraction);
    const normalized = normalizeExtraction(extraction);
    expect(normalized.extraction.positions[0].participantIds).toEqual(["maya"]);
    expect(normalized.extraction.claims[0].participantIds).toEqual(["maya"]);
    expect(normalized.extraction.claims[0].acceptedByParticipantIds).toEqual(["maya"]);
    expect(normalized.extraction.claims[1].disputedByParticipantIds).toEqual(["maya"]);
    expect(normalized.extraction.commonGroundCandidates[0].participantIds).toEqual(["maya", "noah"]);
    expect(normalized.warnings.join(" ")).not.toContain("Dropped dangling participant");
    expect(extraction).toEqual(original);
  });

  it("renders one canonical speaker and one identical stance while preserving distinct stance content", async () => {
    const result = await analyzeDisagreement({
      content: source, contentType: example.contentType, requestId: "canonical-alias-report",
      provider: new FakeDisagreementProvider(extractionWithAlias()),
    });
    expect(result.report.disagreements[0].participantStances).toEqual([
      { participantId: "maya", positionId: "pos-uninsured-8", stance: "About 8 percent." },
      { participantId: "maya", positionId: "pos-uninsured-8", stance: distinctStance },
      { participantId: "noah", positionId: "pos-underinsured", stance: "Closer to 15 percent." },
    ]);
    const positions = renderToStaticMarkup(createElement(PositionBriefs, { report: result.report }));
    const disagreements = renderToStaticMarkup(createElement(DisagreementBriefs, { report: result.report }));
    expect(positions).not.toContain("Maya, Maya");
    expect(disagreements.match(/About 8 percent\./g)).toHaveLength(1);
    expect(disagreements).toContain(distinctStance);
    expect(parseDisagreementReport(result.report).success).toBe(true);
    expect(validatePublishPayload(result)).not.toHaveProperty("error");
  });

  it("retains a stance on a different position even when its participant and wording match", () => {
    const extraction = extractionWithAlias();
    extraction.disagreementCandidates[0].participantStances.push({
      participantId: "maya-alias", positionId: "pos-underinsured", stance: "About 8 percent.",
    });
    const normalized = normalizeExtraction(extraction).extraction;
    expect(normalized.disagreementCandidates[0].participantStances).toHaveLength(4);
    expect(normalized.disagreementCandidates[0].participantStances.at(-1)).toEqual({
      participantId: "maya", positionId: "pos-underinsured", stance: "About 8 percent.",
    });
  });
});
