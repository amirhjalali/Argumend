import "@/test/setup-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import type { ArgumentView } from "@/types/logic";

const setView = vi.fn();
let pathname = "/";
let currentView: ArgumentView = "logic-map";

vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
}));

vi.mock("@/hooks/useLogicGraph", () => ({
  useLogicGraph: (selector: (state: { currentView: ArgumentView; setView: typeof setView }) => unknown) =>
    selector({ currentView, setView }),
}));

vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

import { ViewToggle } from "./ViewToggle";

describe("ViewToggle", () => {
  beforeEach(() => {
    pathname = "/";
    currentView = "logic-map";
    setView.mockReset();
    window.history.replaceState({}, "", "/");
  });

  afterEach(cleanup);

  it("keeps a selected topic deep link in sync with the active view", () => {
    window.history.replaceState({}, "", "/?topic=ai-risk&view=logic-map");
    const view = render(<ViewToggle />);

    fireEvent.click(view.getByRole("button", { name: "Scales" }));

    expect(setView).toHaveBeenCalledWith("scales");
    expect(window.location.search).toBe("?topic=ai-risk&view=scales");
  });

  it("does not create a share query before a topic has been selected", () => {
    const view = render(<ViewToggle />);

    fireEvent.click(view.getByRole("button", { name: "Debate" }));

    expect(setView).toHaveBeenCalledWith("debate");
    expect(window.location.search).toBe("");
  });

  it("renders only on the interactive home route", () => {
    pathname = "/topics";
    const { container } = render(<ViewToggle />);

    expect(container.innerHTML).toBe("");
  });
});
