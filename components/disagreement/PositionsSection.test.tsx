import "@/test/setup-dom";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PositionsSection } from "./PositionsSection";
import { reportFromFixture } from "./reportFixture.test-helper";

describe("PositionsSection", () => {
  afterEach(() => cleanup());

  it("says there are no positions rather than promising the strongest version of each", async () => {
    const report = await reportFromFixture("non-argument-recipe");
    const view = render(<PositionsSection report={report} />);
    const text = view.container.textContent ?? "";
    expect(text).not.toContain("The strongest version of each position");
    expect(text).toMatch(/no position/i);
  });
});
