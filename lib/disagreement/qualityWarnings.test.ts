import { describe, expect, it } from "vitest";
import { analyzeDisagreement } from "./analyze";
import { FakeDisagreementProvider } from "./model/fake";
import { DISAGREEMENT_FEW_SHOT_EXAMPLES } from "./prompts/v1/examples";
import { canPublishReport } from "./quality";
import { buildArgumentGraph } from "./buildGraph";
import { parseDisagreementReport } from "@/lib/schemas/disagreement";

const example = DISAGREEMENT_FEW_SHOT_EXAMPLES[0];
const source = `${example.source.replace("Maya:", "Critical Rationalist:")}\nBoth participants want reliable information about health coverage.`;

type Case = "label" | "id" | "grounding" | "fallback";

async function analyze(kind: Case) {
  let extraction = structuredClone(example.extraction);
  if (kind === "label") {
    extraction.participants[0].label = "Critical Rationalist";
    extraction.participants.push({ id: "maya-alias", label: "Critical Rationalist", kind: "named" });
  } else if (kind === "id") {
    extraction = JSON.parse(JSON.stringify(extraction).replaceAll('"maya"', '"Critical Rationalist"'));
  } else if (kind === "grounding") {
    extraction = JSON.parse(JSON.stringify(extraction).replaceAll('"pos-uninsured-8"', '"critical-position"'));
    extraction.positions[0].groundingQuotes.push({ quote: "This sentence is absent from the source.", participantId: "maya" });
  } else {
    const baseline = await analyzeDisagreement({
      content: source, contentType: example.contentType, requestId: "fallback-baseline",
      provider: new FakeDisagreementProvider(extraction),
    });
    const primary = baseline.report.cruxes[0].claimId;
    extraction = JSON.parse(JSON.stringify(extraction).replaceAll(JSON.stringify(primary), '"critical-claim"'));
  }
  return analyzeDisagreement({
    content: source,
    contentType: example.contentType,
    requestId: "critical-warning-review",
    provider: new FakeDisagreementProvider(extraction),
  });
}

describe("benign model metadata does not control publication severity", () => {
  it.each(["label", "id", "grounding", "fallback"] as const)("keeps benign %s metadata containing critical publishable", async (kind) => {
    const { report } = await analyze(kind);
    expect(report.quality.groundingCoverage).toBeGreaterThanOrEqual(0.6);
    expect(report.quality.droppedUngroundedQuoteCount).toBe(kind === "grounding" ? 1 : 0);
    expect(parseDisagreementReport(report).success).toBe(true);
    expect(canPublishReport(report)).toEqual({ ok: true, reasons: [] });
    expect(report.quality.warnings.join(" ")).not.toMatch(/critical/i);
  });

  it.each([
    "Critical quality warning: the graph is unreliable.",
    "A provider reported a CRITICAL quality failure.",
  ])("retains the publication block for a legacy critical warning: %s", async (warning) => {
    const { report } = await analyze("label");
    report.quality.warnings = [warning];
    expect(parseDisagreementReport(report).success).toBe(true);
    expect(canPublishReport(report)).toEqual({ ok: false, reasons: ["Critical quality warnings remain."] });
  });

  it("reports fixed graph validation rules without echoing model identifiers", () => {
    const extraction = structuredClone(example.extraction);
    for (const claim of extraction.claims) claim.id = "critical-model-identifier";
    const result = buildArgumentGraph(extraction);
    expect(result.valid).toBe(false);
    expect(result.warnings.join(" ")).toContain("failed validation");
    expect(result.warnings.join(" ")).not.toMatch(/critical/i);
  });
});
