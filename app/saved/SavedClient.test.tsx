import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";

const savedState = vi.hoisted(() => ({
  ids: [] as string[],
  hydrated: true,
  error: null as string | null,
  remove: vi.fn(),
}));

vi.mock("@/hooks/useSavedTopics", () => ({
  useSavedTopicIds: () => savedState,
}));

import { SavedClient } from "./SavedClient";

describe("SavedClient empty and unavailable states", () => {
  afterEach(() => {
    cleanup();
    savedState.ids = [];
    savedState.hydrated = true;
    savedState.error = null;
    savedState.remove.mockReset();
  });

  it("shows the normal empty state when storage is readable", () => {
    const view = render(<SavedClient />);

    expect(view.getByRole("heading", { name: "Nothing saved yet" })).toBeTruthy();
    expect(view.queryByRole("alert")).toBeNull();
    const explore = view.getByRole("link", { name: "Browse maps" });
    expect(explore.className).toContain("min-h-11");
    expect(explore.className).toContain("focus-visible:ring-2");
  });

  it("does not misreport blocked storage as an empty saved list", () => {
    savedState.error = "Saved topics could not be read in this browser.";
    const view = render(<SavedClient />);

    const alert = view.getByRole("alert");
    expect(alert.textContent).toMatch(/saved maps are unavailable/i);
    expect(alert.textContent).toMatch(/privacy settings/i);
    expect(view.queryByRole("heading", { name: "Nothing saved yet" })).toBeNull();
  });

  it("keeps the saved-card remove action at least 44px with a visible focus ring", () => {
    savedState.ids = ["climate-change"];
    const view = render(<SavedClient />);

    const remove = view.getByRole("button", {
      name: 'Remove "Is climate change primarily caused by human activity?" from saved',
    });
    expect(remove.className).toContain("h-11");
    expect(remove.className).toContain("w-11");
    expect(remove.className).toContain("focus-visible:ring-2");
  });

  it("resolves saved debate maps (ArgumentGraph topics) alongside legacy maps", () => {
    savedState.ids = ["ai-mass-unemployment", "climate-change"];
    const view = render(<SavedClient />);

    const debate = view.getByRole("link", { name: /Will AI cause mass unemployment\?/ });
    expect(debate.getAttribute("href")).toBe("/topics/ai-mass-unemployment");
    expect(view.getByRole("link", { name: /Is climate change primarily caused by human activity\?/ })).toBeTruthy();
    expect(view.getByText("2 saved, in the order you saved them")).toBeTruthy();
    expect(
      view.getByRole("button", { name: 'Remove "Will AI cause mass unemployment?" from saved' }),
    ).toBeTruthy();
  });

  it("lists saved maps as /topics rows: the question, its first crux, how many questions it turns on", () => {
    savedState.ids = ["climate-change"];
    const view = render(<SavedClient />);

    expect(view.getByRole("heading", { level: 1, name: "Saved maps" })).toBeTruthy();
    const row = view.getByRole("link", { name: /Is climate change primarily caused by human activity\?/ });
    expect(row.textContent).toMatch(/Turns on \w+ questions/);
    // No evidence status, balance chip, verdict label or status/category pills.
    expect(view.container.textContent).not.toMatch(/Evidence (largely converges|still divided|still thin)/);
    expect(view.container.textContent).not.toMatch(/verdict|leans|toward|balance|pillar/i);
    expect(view.container.querySelector(".rounded-full")).toBeNull();
  });

  it("announces removal and continues at the next map, previous map, or browse action", () => {
    savedState.ids = ["ai-mass-unemployment", "nuclear-energy-safety", "climate-change"];
    savedState.remove.mockImplementation((id: string) => {
      savedState.ids = savedState.ids.filter((saved) => saved !== id);
      return true;
    });
    const view = render(<SavedClient />);
    const status = view.getByRole("status", { name: "Saved map updates" });
    expect(status.textContent).toBe("");
    const removeNuclear = view.getByRole("button", { name: /^Remove "Should nuclear power/ });
    removeNuclear.focus();
    fireEvent.click(removeNuclear);
    expect(document.activeElement).toBe(view.getByRole("link", { name: /^Is climate change/ }));
    expect(status.textContent).toContain("2 saved maps remaining.");
    const removeClimate = view.getByRole("button", { name: /^Remove "Is climate change/ });
    removeClimate.focus();
    fireEvent.click(removeClimate);
    expect(document.activeElement).toBe(view.getByRole("link", { name: /^Will AI cause mass unemployment/ }));
    expect(status.textContent).toContain("1 saved map remaining.");
    const removeAi = view.getByRole("button", { name: /^Remove "Will AI cause/ });
    removeAi.focus();
    fireEvent.click(removeAi);
    expect(document.activeElement).toBe(view.getByRole("link", { name: "Browse maps" }));
    expect(status.textContent).toContain("0 saved maps remaining.");
  });

  it("keeps the map and focus when storage rejects removal, without announcing success", () => {
    savedState.ids = ["climate-change"];
    savedState.remove.mockImplementation(() => {
      savedState.error = "Could not update saved topics on this device.";
      return false;
    });
    const view = render(<SavedClient />);
    const remove = view.getByRole("button", { name: /^Remove "Is climate change/ });
    remove.focus();
    fireEvent.click(remove);
    view.rerender(<SavedClient />);
    expect(document.activeElement).toBe(remove);
    expect(view.getByRole("link", { name: /^Is climate change/ })).toBeTruthy();
    expect(view.getByRole("status", { name: "Saved map updates" }).textContent).toBe("");
    expect(view.getByRole("alert").textContent).toContain("existing bookmarks have not changed");
  });
});
