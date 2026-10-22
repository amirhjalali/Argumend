import "@/test/setup-dom";
import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SAVED_TOPICS_KEY } from "@/hooks/useSavedTopics";
import { SavedClient } from "./SavedClient";

const SAVED_MAPS = ["ai-mass-unemployment", "climate-change", "moon-landing"];

describe("SavedClient keyboard removal", () => {
  beforeEach(() => {
    const values = new Map<string, string>();
    const storage: Storage = {
      get length() { return values.size; },
      clear: () => values.clear(),
      getItem: (key) => values.get(key) ?? null,
      key: (index) => [...values.keys()][index] ?? null,
      removeItem: (key) => { values.delete(key); },
      setItem: (key, value) => { values.set(key, value); },
    };
    Object.defineProperty(window, "localStorage", { configurable: true, value: storage });
    window.localStorage.setItem(SAVED_TOPICS_KEY, JSON.stringify(SAVED_MAPS));
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it.each([
    { removed: 0, next: 1 },
    { removed: 1, next: 2 },
    { removed: 2, next: 1 },
  ])("moves focus after removing saved map $removed", async ({ removed, next }) => {
    const view = render(<SavedClient />);
    const buttons = view.getAllByRole("button", { name: /from saved$/ });
    buttons[removed].focus();

    fireEvent.click(buttons[removed]);

    await waitFor(() => expect(document.activeElement).toBe(buttons[next]));
    expect(view.getAllByRole("button", { name: /from saved$/ })).toHaveLength(2);
    expect(JSON.parse(window.localStorage.getItem(SAVED_TOPICS_KEY) ?? "[]"))
      .toEqual(SAVED_MAPS.filter((_, index) => index !== removed));
  });

  it("moves focus to the empty state after removing the only saved map", async () => {
    window.localStorage.setItem(SAVED_TOPICS_KEY, JSON.stringify([SAVED_MAPS[0]]));
    const view = render(<SavedClient />);
    const remove = view.getByRole("button", { name: /from saved$/ });
    remove.focus();

    fireEvent.click(remove);

    const empty = view.getByRole("heading", { name: "Nothing saved yet" });
    await waitFor(() => expect(document.activeElement).toBe(empty));
    expect(window.localStorage.getItem(SAVED_TOPICS_KEY)).toBe("[]");
  });

  it("keeps the original focus and bookmarks when storage rejects removal", async () => {
    const view = render(<SavedClient />);
    const buttons = view.getAllByRole("button", { name: /from saved$/ });
    buttons[1].focus();
    vi.spyOn(window.localStorage, "setItem").mockImplementation(() => {
      throw new Error("Storage is full");
    });

    fireEvent.click(buttons[1]);

    expect(await view.findByRole("alert")).toBeTruthy();
    expect(document.activeElement).toBe(buttons[1]);
    expect(view.getAllByRole("button", { name: /from saved$/ })).toHaveLength(3);
    expect(JSON.parse(window.localStorage.getItem(SAVED_TOPICS_KEY) ?? "[]")).toEqual(SAVED_MAPS);
  });

  it("does not move focus for a cross-tab list refresh", () => {
    const view = render(<><input aria-label="Another task" /><SavedClient /></>);
    const input = view.getByRole("textbox", { name: "Another task" });
    input.focus();

    act(() => {
      window.localStorage.setItem(SAVED_TOPICS_KEY, "[]");
      window.dispatchEvent(new StorageEvent("storage", { key: SAVED_TOPICS_KEY }));
    });

    expect(view.getByRole("heading", { name: "Nothing saved yet" })).toBeTruthy();
    expect(document.activeElement).toBe(input);
  });

  it("does not take focus from another control when a remove action was not focused", () => {
    const view = render(<><input aria-label="Another task" /><SavedClient /></>);
    const input = view.getByRole("textbox", { name: "Another task" });
    input.focus();

    fireEvent.click(view.getAllByRole("button", { name: /from saved$/ })[1]);

    expect(view.getAllByRole("button", { name: /from saved$/ })).toHaveLength(2);
    expect(document.activeElement).toBe(input);
  });
});
