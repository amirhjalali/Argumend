import "@/test/setup-dom";
import { useCallback, useState } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { argumentTopicIndex } from "@/lib/argument/topicIds";
import { ANALYZE_HREF } from "@/lib/nav";
import { articleSummaries } from "@/data/blogIndex";
import { topicSummaries } from "@/data/topicIndex";

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

    const close = view.getByRole("button", { name: "Close search (Esc)" });
    fireEvent.keyDown(close, { key: "Enter" });
    expect(push).not.toHaveBeenCalled();
  });

  it("says there is no map yet for a subject none covers, and offers paste and a suggestion", async () => {
    const view = render(<SearchHarness />);
    fireEvent.click(view.getByRole("button", { name: "Open search" }));
    const input = view.getByRole("combobox", { name: "Search Argumend" });
    await waitFor(() => expect(document.activeElement).toBe(input));

    // r6 review #4: "abortion" listed the nuclear-deterrence map (abolition)
    // and, later, every map whose question says "about".
    fireEvent.change(input, { target: { value: "abortion" } });
    expect(view.queryAllByRole("option")).toHaveLength(0);
    expect(view.getByText("No map on “abortion” yet.")).toBeTruthy();

    fireEvent.click(view.getByRole("button", { name: "Paste the argument you’re in" }));
    expect(push).toHaveBeenLastCalledWith(ANALYZE_HREF);

    fireEvent.click(view.getByRole("button", { name: "Open search" }));
    const again = view.getByRole("combobox", { name: "Search Argumend" });
    fireEvent.change(again, { target: { value: "my sister and I argue about mom" } });
    expect(view.getByText("No map on “my sister and I argue about mom” yet.")).toBeTruthy();
    fireEvent.click(view.getByRole("button", { name: "suggest a map" }));
    expect(push).toHaveBeenLastCalledWith("/about#contribute");
  });

  it("still finds the nuclear-deterrence map by its own words", async () => {
    const view = render(<SearchHarness />);
    fireEvent.click(view.getByRole("button", { name: "Open search" }));
    const input = view.getByRole("combobox", { name: "Search Argumend" });
    fireEvent.change(input, { target: { value: "abolition of nuclear weapons" } });
    expect(view.getAllByRole("option")[0].textContent).toMatch(/nuclear deterrence/i);
    expect(view.queryByText(/^No map on/)).toBeNull();
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
      // No "Map" pill: the "Maps" group header already says it.
      expect(options[index].querySelector("span.whitespace-nowrap")).toBeNull();
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

  it("spells every type badge out in full (\"Essay\", not \"Ess\")", async () => {
    const view = render(<SearchHarness />);
    fireEvent.click(view.getByRole("button", { name: "Open search" }));
    const input = view.getByRole("combobox", { name: "Search Argumend" });
    await waitFor(() => expect(document.activeElement).toBe(input));

    const article = articleSummaries[0];
    fireEvent.change(input, { target: { value: article.title } });
    const option = view.getByRole("option", { name: new RegExp(escapeRegExp(article.title)) });
    const badge = option.querySelector("span.whitespace-nowrap");
    expect(badge?.textContent).toBe("Essay");
    expect(option.textContent).toMatch(/Essay$/);
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
      expect(result.textContent).not.toMatch(/Map$/);

      fireEvent.click(result);
      expect(push).toHaveBeenLastCalledWith(`/topics/${topic.id}`);
    },
  );

  it("lists both map models under one Maps group, and no retired pages", async () => {
    const view = render(<SearchHarness />);
    fireEvent.click(view.getByRole("button", { name: "Open search" }));
    const input = view.getByRole("combobox", { name: "Search Argumend" });
    await waitFor(() => expect(document.activeElement).toBe(input));

    fireEvent.change(input, { target: { value: "nuclear" } });
    const text = view.container.textContent ?? "";
    expect(text).toMatch(/Maps/);
    expect(text).not.toMatch(/Topics|Topic\b/);

    // Folded pages are found by their old names but link to the section
    // itself: a redirect drops the #anchor on client navigation.
    for (const [query, name, href] of [
      ["how it works", /^How to read a map/, "/about#read-a-map"],
      ["contribute", /^Contribute/, "/about#contribute"],
      ["library", /^Reading list/, "/research#reading"],
      ["core ideas", /^Core ideas/, "/learn#ideas"],
      ["learn", /^Learn/, "/learn"],
    ] as const) {
      fireEvent.change(input, { target: { value: query } });
      fireEvent.click(view.getByRole("option", { name }));
      expect(push).toHaveBeenLastCalledWith(href);
      fireEvent.click(view.getByRole("button", { name: "Open search" }));
    }
  });

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

describe("SearchModal finds the obvious map first", () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: vi.fn(),
    });
  });
  afterEach(() => cleanup());

  // What a reader types, and the map that has to come first. Before the
  // 2026-09-29 round-3 fix "is nuclear power safe" led with nuclear weapons.
  const OBVIOUS: ReadonlyArray<readonly [string, string]> = [
    ["is nuclear power safe", "/topics/nuclear-energy-safety"],
    ["nuclear energy safe", "/topics/nuclear-energy-safety"],
    ["rent control", "/topics/rent-control-effectiveness"],
    ["minimum wage", "/topics/minimum-wage-effects"],
    ["vaccines mandate", "/topics/vaccine-mandates"],
    ["AI jobs", "/topics/ai-mass-unemployment"],
    ["climate change human caused", "/topics/climate-change"],
    ["UBI", "/topics/universal-basic-income"],
    ["universal basic income", "/topics/universal-basic-income"],
  ];

  it.each(OBVIOUS)("“%s” opens %s first", async (query, href) => {
    const view = render(<SearchHarness />);
    fireEvent.click(view.getByRole("button", { name: "Open search" }));
    const input = view.getByRole("combobox", { name: "Search Argumend" });
    await waitFor(() => expect(document.activeElement).toBe(input));

    fireEvent.change(input, { target: { value: query } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(push).toHaveBeenLastCalledWith(href);
  });

  it("names a legacy map by its question, never its old Title-Case label", async () => {
    const view = render(<SearchHarness />);
    fireEvent.click(view.getByRole("button", { name: "Open search" }));
    const input = view.getByRole("combobox", { name: "Search Argumend" });
    await waitFor(() => expect(document.activeElement).toBe(input));

    const rent = topicSummaries.find((t) => t.id === "rent-control-effectiveness")!;
    // The old label still finds it…
    fireEvent.change(input, { target: { value: rent.title } });
    const first = view.getAllByRole("option")[0];
    // …but the result is named by the question the page asks.
    expect(first.textContent).toContain(rent.question!);
    const list = view.getByRole("listbox");
    expect(list.textContent).not.toContain(rent.title);
    // No Title-Case map names anywhere in the list for a broad query either.
    fireEvent.change(input, { target: { value: "nuclear" } });
    const oldTitles = topicSummaries.filter((t) => t.question && t.question !== t.title);
    for (const option of view.getAllByRole("option")) {
      for (const t of oldTitles) expect(option.textContent).not.toContain(t.title);
    }
  });
});
