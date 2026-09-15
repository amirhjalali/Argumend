import "@/test/setup-dom";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { DiagnosisHero } from "./DiagnosisHero";
import { reportFromFixture } from "./reportFixture.test-helper";

describe("DiagnosisHero", () => {
  afterEach(() => cleanup());

  it("shows the pattern's label, not an unknown resolvability, when nothing was diagnosed", async () => {
    const report = await reportFromFixture("non-argument-recipe");
    const view = render(<DiagnosisHero report={report} />);
    const text = view.container.textContent ?? "";
    expect(text).toContain("Not a disagreement");
    expect(text).not.toMatch(/Resolvability: Unknown/);
  });
});
