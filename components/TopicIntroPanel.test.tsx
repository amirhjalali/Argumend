import "@/test/setup-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";

const graph = vi.hoisted(() => ({
  state: {
    currentTopicId: "consciousness-ai-systems",
    nodes: [{ id: "crux-1", data: { variant: "crux" } }],
    expandedNodes: {},
    setFocusTargets: vi.fn(),
  },
}));

vi.mock("@/hooks/useLogicGraph", () => {
  const useLogicGraph = (selector: (state: typeof graph.state) => unknown) =>
    selector(graph.state);
  useLogicGraph.getState = () => graph.state;
  return { useLogicGraph };
});

import { TopicIntroPanel } from "./TopicIntroPanel";

describe("TopicIntroPanel", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("starts compact on desktop and exposes an obvious details control", () => {
    vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
      matches: query === "(min-width: 768px)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const view = render(<TopicIntroPanel />);
    const toggle = view.getByRole("button", { name: "Show topic details" });

    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(view.getByText("Consciousness in AI Systems")).toBeTruthy();

    fireEvent.click(toggle);

    expect(view.getByRole("button", { name: "Hide topic details" }).getAttribute("aria-expanded")).toBe("true");
    expect(view.getByRole("button", { name: "Explore the Map" })).toBeTruthy();
  });

  it("keeps the full introduction visible by default on mobile", () => {
    vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const view = render(<TopicIntroPanel />);

    expect(view.getByRole("button", { name: "Hide topic details" }).getAttribute("aria-expanded")).toBe("true");
    expect(view.getByRole("button", { name: "Explore the Map" })).toBeTruthy();
  });
});
