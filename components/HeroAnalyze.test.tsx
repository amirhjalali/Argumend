import "@/test/setup-dom";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const navigation = vi.hoisted(() => ({ push: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => navigation,
}));

import { HeroAnalyze } from "./HeroAnalyze";

describe("HeroAnalyze", () => {
  beforeEach(() => {
    navigation.push.mockReset();
    sessionStorage.clear();
  });

  afterEach(cleanup);

  it("gives both homepage entry actions a 44px minimum target", () => {
    const view = render(<HeroAnalyze onTopicSelect={vi.fn()} />);

    expect(
      view.getByRole("button", { name: "Try an Example" }).className,
    ).toContain("min-h-11");
    expect(view.getByRole("button", { name: "Analyze" }).className).toContain(
      "min-h-11",
    );
  });

  it("preserves the draft when continuing into the full analysis flow", () => {
    const view = render(<HeroAnalyze onTopicSelect={vi.fn()} />);
    const input = view.getByRole("textbox", { name: "Text to analyze" });

    fireEvent.change(input, {
      target: { value: "Supporters favor the proposal; critics oppose it." },
    });
    fireEvent.click(view.getByRole("button", { name: "Analyze" }));

    expect(navigation.push).toHaveBeenCalledWith("/analyze");
    expect(JSON.parse(sessionStorage.getItem("argumend-analyze-prefill") ?? "null"))
      .toEqual({
        content: "Supporters favor the proposal; critics oppose it.",
        contentType: "freeform",
      });
  });
});
