import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FragileVerdictNote, FRAGILE_VERDICT_NOTE } from "./FragileVerdictNote";

describe("FragileVerdictNote", () => {
  it("says what a fragile reading means, in one plain line", () => {
    render(<FragileVerdictNote fragile />);
    expect(screen.getByText(FRAGILE_VERDICT_NOTE)).toBeTruthy();
    expect(FRAGILE_VERDICT_NOTE).toBe("One evidence card could change this reading");
  });

  it("renders nothing when the verdict is not fragile", () => {
    const { container } = render(<FragileVerdictNote fragile={false} />);
    expect(container.textContent).toBe("");
  });

  it("renders nothing when fragile is absent, so callers can pass verdict.fragile straight through", () => {
    const { container } = render(<FragileVerdictNote />);
    expect(container.textContent).toBe("");
  });

  it("stays in the muted UI voice — no alarm colour", () => {
    const { container } = render(<FragileVerdictNote fragile />);
    const note = container.firstElementChild;
    expect(note?.className).toContain("text-muted");
    expect(note?.className).toContain("font-sans");
    expect(note?.className).not.toMatch(/amber|red-|yellow/);
  });
});
