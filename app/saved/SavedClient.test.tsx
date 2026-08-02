import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";

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
    savedState.remove.mockClear();
  });

  it("shows the normal empty state when storage is readable", () => {
    const view = render(<SavedClient />);

    expect(view.getByRole("heading", { name: "Nothing saved yet" })).toBeTruthy();
    expect(view.queryByRole("alert")).toBeNull();
    const explore = view.getByRole("link", { name: "Explore Topics" });
    expect(explore.className).toContain("min-h-11");
    expect(explore.className).toContain("focus-visible:ring-2");
  });

  it("does not misreport blocked storage as an empty saved list", () => {
    savedState.error = "Saved topics could not be read in this browser.";
    const view = render(<SavedClient />);

    const alert = view.getByRole("alert");
    expect(alert.textContent).toMatch(/saved topics are unavailable/i);
    expect(alert.textContent).toMatch(/privacy settings/i);
    expect(view.queryByRole("heading", { name: "Nothing saved yet" })).toBeNull();
  });

  it("keeps the saved-card remove action at least 44px with a visible focus ring", () => {
    savedState.ids = ["climate-change"];
    const view = render(<SavedClient />);

    const remove = view.getByRole("button", {
      name: 'Remove "Climate Change" from saved',
    });
    expect(remove.className).toContain("h-11");
    expect(remove.className).toContain("w-11");
    expect(remove.className).toContain("focus-visible:ring-2");
  });
});
