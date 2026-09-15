import "@/test/setup-dom";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ReportMasthead } from "./ReportMasthead";
import { reportFromFixture } from "./reportFixture.test-helper";

describe("ReportMasthead", () => {
  afterEach(() => cleanup());

  it("names the pattern instead of a blank type and an unknown band when there are no positions", async () => {
    const report = await reportFromFixture("non-argument-recipe");
    expect(report.positions).toHaveLength(0);
    const view = render(<ReportMasthead report={report} />);
    const text = view.container.textContent ?? "";
    expect(text).toContain("NOT A DISAGREEMENT");
    expect(text).not.toContain("DISAGREEMENT · UNKNOWN");
    expect(text).not.toMatch(/UNKNOWN/);
  });

  it("keeps the typed label and resolvability band for a diagnosed disagreement", async () => {
    const report = await reportFromFixture("trust-split-traffic-study");
    const view = render(<ReportMasthead report={report} />);
    expect(view.container.textContent).toContain("SOURCE TRUST · ");
  });
});
