import "@/test/setup-dom";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PositionBriefs } from "./PositionBriefs";
import { reportFromFixture } from "./reportFixture.test-helper";

describe("PositionBriefs", () => {
  afterEach(() => cleanup());

  it("does not run the steelman preamble above an empty list", async () => {
    const report = await reportFromFixture("non-argument-recipe");
    expect(report.positions).toHaveLength(0);
    const view = render(<PositionBriefs report={report} />);
    const text = view.container.textContent ?? "";
    expect(text).not.toContain("Each position is stated at its strongest");
    expect(text).toMatch(/no position/i);
  });

  it("keeps the preamble when positions exist", async () => {
    const report = await reportFromFixture("trust-split-traffic-study");
    const view = render(<PositionBriefs report={report} />);
    expect(view.container.textContent).toContain("Each position is stated at its strongest");
  });
});
