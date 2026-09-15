import "@/test/setup-dom";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { DisagreementReportV1, RawDisagreementExtractionV1 } from "@/types/disagreement";
import { analyzeDisagreement } from "@/lib/disagreement/analyze";
import { FakeDisagreementProvider } from "@/lib/disagreement/model/fake";
import { ArgumentHinge } from "./ArgumentHinge";
import { EvidenceStateSection } from "./EvidenceStateSection";

const REQUEST_ID = "11111111-1111-1111-1111-111111111111";

async function reportFromFixture(name: string): Promise<DisagreementReportV1> {
  const data = JSON.parse(
    readFileSync(join(process.cwd(), "data/evals/disagreement", `${name}.json`), "utf8"),
  ) as {
    source: string;
    contentType: "conversation" | "article" | "freeform";
    extraction: RawDisagreementExtractionV1;
  };
  const bundle = await analyzeDisagreement({
    content: data.source,
    contentType: data.contentType,
    requestId: REQUEST_ID,
    provider: new FakeDisagreementProvider(structuredClone(data.extraction)),
  });
  return bundle.report;
}

describe("EvidenceStateSection", () => {
  afterEach(() => cleanup());

  it("renders the crux's evidence state in the spec's wording", async () => {
    const report = await reportFromFixture("trust-split-traffic-study");
    expect(report.cruxes[0]?.evidenceState).toBe("not-independently-checked");

    const view = render(<EvidenceStateSection report={report} />);
    const section = view.getByRole("region", { name: "EVIDENCE STATE" });
    expect(section).toBeTruthy();
    expect(view.getByText("No independent verification performed")).toBeTruthy();
    expect(view.getByText(/has not checked whether any of those claims are true/)).toBeTruthy();
    expect(section.textContent).not.toMatch(/\d+\s?%/);
    expect(section.textContent).not.toMatch(/winner|verified/i);
  });

  it("uses the matching wording for the other two states", async () => {
    const report = await reportFromFixture("trust-split-traffic-study");
    const [primary, ...rest] = report.cruxes;

    const asserted = render(
      <EvidenceStateSection
        report={{ ...report, cruxes: [{ ...primary, evidenceState: "asserted-in-source" }, ...rest] }}
      />,
    );
    expect(asserted.getByText("Evidence was asserted in the source")).toBeTruthy();
    cleanup();

    const none = render(
      <EvidenceStateSection
        report={{ ...report, cruxes: [{ ...primary, evidenceState: "no-evidence-provided" }, ...rest] }}
      />,
    );
    expect(none.getByText("No evidence was supplied in the source")).toBeTruthy();
  });

  it("renders nothing when the report has no crux", async () => {
    const report = await reportFromFixture("trust-split-traffic-study");
    const view = render(<EvidenceStateSection report={{ ...report, cruxes: [] }} />);
    expect(view.container.innerHTML).toBe("");
  });

  it("is mounted inside the crux panel", async () => {
    const report = await reportFromFixture("trust-split-traffic-study");
    const view = render(<ArgumentHinge report={report} />);
    const hinge = view.getByRole("region", { name: "WHAT THE ARGUMENT TURNS ON" });
    expect(hinge.textContent).toContain("What could settle it");
    expect(hinge.textContent).toContain("No independent verification performed");
  });
});
