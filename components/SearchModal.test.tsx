import "@/test/setup-dom";
import { useCallback, useState } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { argumentTopicIndex } from "@/lib/argument/topicIds";

const push = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));
vi.mock("@/components/BalanceWeightChip", () => ({ BalanceWeightChip: () => null }));

import { SearchModal } from "./SearchModal";

function SearchHarness() {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open search</button>
      <SearchModal isOpen={isOpen} onClose={close} />
    </>
  );
}

describe("SearchModal keyboard lifecycle", () => {
  beforeEach(() => {
    push.mockReset();
    document.body.style.overflow = "clip";
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: vi.fn(),
    });
  });

  afterEach(() => {
    cleanup();
    document.body.style.overflow = "";
    vi.restoreAllMocks();
  });

  it("focuses search, contains Tab focus, closes on global Escape, and restores the trigger", async () => {
    const view = render(<SearchHarness />);
    const trigger = view.getByRole("button", { name: "Open search" });

    trigger.focus();
    fireEvent.click(trigger);
    const input = view.getByRole("combobox", { name: "Search Argumend" });
    await waitFor(() => expect(document.activeElement).toBe(input));
    expect(document.body.style.overflow).toBe("hidden");

    const options = view.getAllByRole("option");
    const lastOption = options[options.length - 1];
    lastOption.focus();
    fireEvent.keyDown(lastOption, { key: "Tab" });
    expect(document.activeElement).toBe(input);

    input.focus();
    fireEvent.keyDown(input, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(lastOption);

    trigger.focus();
    fireEvent.keyDown(trigger, { key: "Tab" });
    expect(document.activeElement).toBe(input);

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(view.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(document.activeElement).toBe(trigger));
    expect(document.body.style.overflow).toBe("clip");
  });

  it("announces query-specific counts and keeps dialog button Enter separate from result navigation", async () => {
    const view = render(<SearchHarness />);
    fireEvent.click(view.getByRole("button", { name: "Open search" }));
    const input = view.getByRole("combobox", { name: "Search Argumend" });
    await waitFor(() => expect(document.activeElement).toBe(input));

    fireEvent.change(input, { target: { value: "qzxwvplm" } });
    expect(view.getByRole("status").textContent).toBe("No results for “qzxwvplm”");
    expect(input.getAttribute("aria-expanded")).toBe("false");

    fireEvent.change(input, { target: { value: "climate" } });
    expect(view.getByRole("status").textContent).toMatch(/^\d+ results? for “climate”$/);

    const close = view.getByRole("button", { name: "Close search" });
    fireEvent.keyDown(close, { key: "Enter" });
    expect(push).not.toHaveBeenCalled();
  });

  it("shows every debate map before popular topics in the empty-state keyboard order", async () => {
    const view = render(<SearchHarness />);
    fireEvent.click(view.getByRole("button", { name: "Open search" }));
    const input = view.getByRole("combobox", { name: "Search Argumend" });
    await waitFor(() => expect(document.activeElement).toBe(input));

    const options = view.getAllByRole("option");
    expect(options).toHaveLength(argumentTopicIndex.length + 5);
    argumentTopicIndex.forEach((topic, index) => {
      expect(options[index].textContent).toContain(topic.title);
      expect(options[index].textContent).toContain("Debate Map");
    });
    expect(options[argumentTopicIndex.length].textContent).not.toContain("Debate Map");
    expect(input.getAttribute("aria-activedescendant")).toBe(
      `search-result-map-${argumentTopicIndex[0].id}`,
    );
    expect(view.getByRole("status").textContent).toBe(
      `${argumentTopicIndex.length} debate maps and 5 popular topics`,
    );

    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(push).toHaveBeenLastCalledWith(`/topics/${argumentTopicIndex[1].id}`);
  });

  it.each(argumentTopicIndex)(
    "finds the lightweight debate-map entry for $id without loading its graph",
    async (topic) => {
      const view = render(<SearchHarness />);
      fireEvent.click(view.getByRole("button", { name: "Open search" }));
      const input = view.getByRole("combobox", { name: "Search Argumend" });
      await waitFor(() => expect(document.activeElement).toBe(input));

      fireEvent.change(input, { target: { value: topic.title } });
      const result = view.getByRole("option", { name: new RegExp(topic.title) });
      expect(result.textContent).toContain("Debate Map");

      fireEvent.click(result);
      expect(push).toHaveBeenLastCalledWith(`/topics/${topic.id}`);
    },
  );

  it("indexes useful aliases for the flagship maps", async () => {
    const view = render(<SearchHarness />);
    fireEvent.click(view.getByRole("button", { name: "Open search" }));
    const input = view.getByRole("combobox", { name: "Search Argumend" });
    await waitFor(() => expect(document.activeElement).toBe(input));

    fireEvent.change(input, { target: { value: "conditional aid Gaza" } });

    expect(
      view.getByRole("option", {
        name: /Should the U\.S\. reduce its support for Israel\?/,
      }),
    ).toBeTruthy();
  });
});
