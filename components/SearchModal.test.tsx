import "@/test/setup-dom";
import { useCallback, useState } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { argumentTopicIndex } from "@/lib/argument/topicIds";
import { ANALYZE_HREF } from "@/lib/nav";
import { articleSummaries } from "@/data/blogIndex";

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const push = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

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

  it("opens on the two flagship maps, then paste-an-argument and all maps", async () => {
    const view = render(<SearchHarness />);
    fireEvent.click(view.getByRole("button", { name: "Open search" }));
    const input = view.getByRole("combobox", { name: "Search Argumend" });
    await waitFor(() => expect(document.activeElement).toBe(input));

    const options = view.getAllByRole("option");
    const flagships = argumentTopicIndex.filter((topic) =>
      ["ai-mass-unemployment", "capitalism-after-ai"].includes(topic.id),
    );
    expect(options).toHaveLength(4);
    flagships.forEach((topic, index) => {
      expect(options[index].textContent).toContain(topic.title);
      expect(options[index].textContent).toContain("Map");
    });
    expect(options[2].textContent).toContain("Paste an argument");
    expect(options[3].textContent).toContain("All maps");
    // No hand-picked "popular" list, and no group called that.
    expect(view.queryByText(/popular/i)).toBeNull();
    expect(view.getByText("Maps")).toBeTruthy();
    expect(input.getAttribute("aria-activedescendant")).toBe(
      "search-result-map-ai-mass-unemployment",
    );
    expect(view.getByRole("status").textContent).toBe("2 maps and 2 shortcuts");

    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(push).toHaveBeenLastCalledWith(ANALYZE_HREF);
  });

  it("never labels a result with a lean or a score (For / Against / Draw)", async () => {
    const view = render(<SearchHarness />);
    fireEvent.click(view.getByRole("button", { name: "Open search" }));
    const input = view.getByRole("combobox", { name: "Search Argumend" });
    await waitFor(() => expect(document.activeElement).toBe(input));

    for (const query of ["free will", "climate", "nuclear"]) {
      fireEvent.change(input, { target: { value: query } });
      for (const option of view.getAllByRole("option")) {
        expect(option.textContent).not.toMatch(/\b(For|Against|Draw)$/);
      }
    }
    expect(view.container.textContent).not.toMatch(/Debate Map/);
  });

  it("spells every type badge out in full (\"Blog\", not \"Blo\")", async () => {
    const view = render(<SearchHarness />);
    fireEvent.click(view.getByRole("button", { name: "Open search" }));
    const input = view.getByRole("combobox", { name: "Search Argumend" });
    await waitFor(() => expect(document.activeElement).toBe(input));

    const article = articleSummaries[0];
    fireEvent.change(input, { target: { value: article.title } });
    const option = view.getByRole("option", { name: new RegExp(escapeRegExp(article.title)) });
    const badge = option.querySelector("span.whitespace-nowrap");
    expect(badge?.textContent).toBe("Blog");
    expect(option.textContent).toMatch(/Blog$/);
  });

  it.each(argumentTopicIndex)(
    "finds the lightweight map entry for $id without loading its graph",
    async (topic) => {
      const view = render(<SearchHarness />);
      fireEvent.click(view.getByRole("button", { name: "Open search" }));
      const input = view.getByRole("combobox", { name: "Search Argumend" });
      await waitFor(() => expect(document.activeElement).toBe(input));

      fireEvent.change(input, { target: { value: topic.title } });
      const result = view.getByRole("option", { name: new RegExp(topic.title) });
      expect(result.textContent).toMatch(/Map$/);

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
