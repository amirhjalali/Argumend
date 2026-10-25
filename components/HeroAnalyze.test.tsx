import "@/test/setup-dom";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const navigation = vi.hoisted(() => ({ push: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => navigation,
}));

import { HeroAnalyze } from "./HeroAnalyze";
import { PASTE_LIMITS } from "@/lib/paste/limits";
import { clearPastePrefill, readPastePrefill } from "@/lib/paste/handoff";

describe("HeroAnalyze", () => {
  beforeEach(() => {
    navigation.push.mockReset();
    sessionStorage.clear();
    clearPastePrefill();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("gives both homepage entry actions a 44px minimum target", () => {
    const view = render(<HeroAnalyze />);

    expect(
      view.getByRole("button", { name: "Try an example" }).className,
    ).toContain("min-h-11");
    expect(view.getByRole("button", { name: "Find what it turns on" }).className).toContain(
      "min-h-11",
    );
  });

  it("preserves the draft when continuing into the full analysis flow", () => {
    const view = render(<HeroAnalyze />);
    const input = view.getByRole("textbox", { name: "Text to analyze" });

    fireEvent.change(input, {
      target: { value: "Supporters favor the proposal; critics oppose it." },
    });
    fireEvent.click(view.getByRole("button", { name: "Find what it turns on" }));

    expect(navigation.push).toHaveBeenCalledWith("/analyze");
    expect(JSON.parse(sessionStorage.getItem("argumend-analyze-prefill") ?? "null"))
      .toEqual({
        content: "Supporters favor the proposal; critics oppose it.",
        contentType: "freeform",
      });
  });

  it("carries the complete draft in memory when browser storage is blocked", () => {
    vi.spyOn(sessionStorage, "setItem").mockImplementationOnce(() => {
      throw new DOMException("Storage is blocked", "SecurityError");
    });
    const view = render(<HeroAnalyze />);
    const input = view.getByRole("textbox", { name: "Text to analyze" });
    const draft = "Should we build more nuclear power stations?";
    fireEvent.change(input, { target: { value: draft } });
    fireEvent.click(view.getByRole("button", { name: "Find what it turns on" }));

    expect(navigation.push).toHaveBeenCalledWith("/analyze");
    expect((input as HTMLTextAreaElement).value).toBe(draft);
    expect(JSON.parse(readPastePrefill() ?? "null")).toEqual({ content: draft, contentType: "freeform" });
    expect(view.queryByRole("alert")).toBeNull();
  });

  it("prevents a long draft from being silently shortened during the handoff", () => {
    const view = render(<HeroAnalyze />);
    const input = view.getByRole("textbox", { name: "Text to analyze" });
    const draft = "a".repeat(PASTE_LIMITS.maxCharacters + 1);
    fireEvent.change(input, { target: { value: draft } });
    fireEvent.keyDown(input, { key: "Enter", ctrlKey: true });

    expect(navigation.push).not.toHaveBeenCalled();
    expect((input as HTMLTextAreaElement).value).toBe(draft);
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect((view.getByRole("button", { name: "Find what it turns on" }) as HTMLButtonElement).disabled).toBe(true);
    expect(view.getByRole("alert").textContent).toContain("Shorten your text");

    fireEvent.change(input, { target: { value: "a".repeat(PASTE_LIMITS.maxCharacters) } });
    expect(view.queryByRole("alert")).toBeNull();
    fireEvent.click(view.getByRole("button", { name: "Find what it turns on" }));
    expect(navigation.push).toHaveBeenCalledWith("/analyze");
    expect(JSON.parse(sessionStorage.getItem("argumend-analyze-prefill") ?? "null").content)
      .toHaveLength(PASTE_LIMITS.maxCharacters);
  });
});
