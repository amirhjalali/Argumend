import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, within } from "@testing-library/react";

// The shell needs the app router; these tests are about the page body.
vi.mock("@/components/AppShell", () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <main>{children}</main>,
}));
import { findVerdictLanguage } from "@/lib/argument/ledger";
import { AI_MAP_TOPIC_IDS } from "@/lib/argument/ledgerPool";
import { AI_MAP_LABELS } from "@/components/ai/format";
import AiPage, { metadata } from "./page";

afterEach(cleanup);

async function renderPage(params: Record<string, string> = {}) {
  const ui = await AiPage({ searchParams: Promise.resolve(params) });
  return render(ui);
}

describe("/ai metadata", () => {
  it("has a title the root template brands once, a description, and a canonical", () => {
    expect(String(metadata.title)).not.toMatch(/argumend/i);
    expect(metadata.description).toEqual(expect.any(String));
    expect(metadata.alternates?.canonical).toBe("https://argumend.org/ai");
  });
});

describe("/ai with the real AI maps", () => {
  it("says what it is and is dated as of the latest recorded entry", async () => {
    const view = await renderPage();
    expect(view.getByRole("heading", { level: 1 }).textContent).toBe("The AI argument, on one page");
    expect(view.container.textContent).toMatch(/A living map, as of September 22, 2026/);
  });

  it("shows 5–6 crux cards, each naming its map and a settle line", async () => {
    const view = await renderPage();
    const cards = view.getAllByTestId("ai-crux-card");
    expect(cards.length).toBeGreaterThanOrEqual(5);
    expect(cards.length).toBeLessThanOrEqual(6);
    for (const card of cards) {
      const topicId = card.getAttribute("data-topic")!;
      expect(AI_MAP_TOPIC_IDS).toContain(topicId);
      expect(within(card).getByRole("link", { name: AI_MAP_LABELS[topicId] })).toBeTruthy();
      expect(card.textContent).toMatch(/What (would settle it|settled it)/);
    }
  });

  it("interleaves the maps by their own rank rather than by score", async () => {
    const view = await renderPage();
    const topics = view.getAllByTestId("ai-crux-card").map((card) => card.getAttribute("data-topic"));
    expect(topics.slice(0, 4)).toEqual([
      AI_MAP_TOPIC_IDS[0],
      AI_MAP_TOPIC_IDS[1],
      AI_MAP_TOPIC_IDS[0],
      AI_MAP_TOPIC_IDS[1],
    ]);
  });

  it("gives an unresolvable crux the standing line instead of a condition", async () => {
    const view = await renderPage();
    const standing = view
      .getAllByTestId("ai-crux-card")
      .filter((card) => card.querySelector("[data-settle=\"standing\"]"));
    expect(standing.length).toBeGreaterThan(0);
    for (const card of standing) {
      expect(card.textContent).toMatch(/What would settle itNothing does — .*; the map holds both \w+\./);
    }
  });

  it("names a definitional fork as one, not as a value disagreement", async () => {
    const view = await renderPage();
    const card = view
      .getAllByTestId("ai-crux-card")
      .find((c) => c.textContent?.includes("What do we even mean by capitalism"));
    expect(card?.textContent).toContain(
      "Nothing does — this turns on a choice of definition; the map holds both readings.",
    );
    expect(card?.textContent).not.toContain("value disagreement");
  });

  const verdictCases: Array<[string, Record<string, string>]> = [
    ["the default window", {}],
    // The widest window renders every entry's evidence findings and source
    // records, which the default window leaves out.
    ["every entry", { since: "0001-01-01" }],
    ...AI_MAP_TOPIC_IDS.map((map): [string, Record<string, string>] => [
      `only ${map}`,
      { map, since: "0001-01-01" },
    ]),
  ];
  it.each(verdictCases)("uses no verdict language, agreement percentages, or settled badge: %s", async (_, params) => {
    const view = await renderPage(params);
    // Folded disclosures are in textContent; labels and titles are not, so add them.
    const attributes = [...view.container.querySelectorAll("[aria-label], [title]")].flatMap((el) => [
      el.getAttribute("aria-label") ?? "",
      el.getAttribute("title") ?? "",
    ]);
    const text = [
      view.container.textContent ?? "",
      ...attributes,
      String(metadata.title),
      String(metadata.description),
    ].join("\n");
    expect(findVerdictLanguage(text)).toEqual([]);
    expect(text).not.toMatch(/\bagree(ment)? (score|percentage)\b/i);
    expect(text).not.toMatch(/\d\s*%\s*(agree|consensus)/i);
    expect(text).not.toMatch(/\bSettled\b/);
    expect(text).not.toMatch(/\bwinner\b/i);
  });

  it("starts the changelog folded, with the count and latest recorded day in its summary", async () => {
    const view = await renderPage();
    const log = view.getByTestId("ai-changelog");
    expect(log.tagName).toBe("DETAILS");
    expect(log.hasAttribute("open")).toBe(false);
    const rows = view.getAllByTestId("ai-changelog-entry");
    expect(log.querySelector("summary")?.textContent).toContain(
      `${rows.length} entries, the latest recorded September 22, 2026`,
    );
  });

  it("lists the changelog newest-recorded first, then by source date", async () => {
    const view = await renderPage();
    const rows = view.getAllByTestId("ai-changelog-entry");
    expect(rows.length).toBeGreaterThan(0);
    const keys = rows.map((row) => `${row.getAttribute("data-noticed")} ${row.getAttribute("data-date")}`);
    expect(keys).toEqual([...keys].sort().reverse());
  });

  it("shows what moved in the default 90-day window, with evidence sources", async () => {
    const view = await renderPage();
    const section = view.getByRole("heading", { name: /What has moved since June 24, 2026/ })
      .closest("section")!;
    expect(section.querySelectorAll('ul[aria-label="Evidence behind this entry"]').length).toBeGreaterThan(0);
    expect(section.textContent).toMatch(/Link checked live/);
  });

  it("keeps each entry's findings behind a closed disclosure", async () => {
    const view = await renderPage();
    const section = view.getByRole("heading", { name: /What has moved since/ }).closest("section")!;
    const lists = [...section.querySelectorAll('ul[aria-label="Evidence behind this entry"]')];
    expect(lists.length).toBeGreaterThan(0);
    for (const list of lists) {
      const details = list.closest("details");
      expect(details).not.toBeNull();
      expect(details!.hasAttribute("open")).toBe(false);
      expect(details!.querySelector("summary")?.textContent).toMatch(/sources? and what (it|they) found/);
    }
  });

  it("never shows the unregistered Covid ledger", async () => {
    const view = await renderPage();
    expect(view.container.innerHTML).not.toMatch(/covid/i);
  });
});

describe("/ai link parameters", () => {
  it("filters every section to one map with ?map=", async () => {
    const view = await renderPage({ map: "capitalism-after-ai" });
    const cards = view.getAllByTestId("ai-crux-card");
    expect(cards.length).toBeGreaterThanOrEqual(5);
    expect(new Set(cards.map((card) => card.getAttribute("data-topic")))).toEqual(
      new Set(["capitalism-after-ai"]),
    );
    const log = view.getByTestId("ai-changelog");
    expect(log.textContent).not.toContain(AI_MAP_LABELS["ai-mass-unemployment"]);
    expect(
      view.getByRole("link", { name: AI_MAP_LABELS["capitalism-after-ai"], current: "page" }),
    ).toBeTruthy();
  });

  it("ignores an unknown map and a malformed since", async () => {
    const view = await renderPage({ map: "not-a-map", since: "2026-02-30" });
    expect(view.getAllByTestId("ai-crux-card").length).toBe(6);
    expect(view.getByRole("heading", { name: /since June 24, 2026/ })).toBeTruthy();
  });

  it("reads a since before the first entry as since the first entry", async () => {
    const view = await renderPage({ since: "0001-01-01" });
    expect(view.getByRole("heading", { name: /What has moved since October 27, 2023/ })).toBeTruthy();
    expect(view.getByRole("link", { name: "Everything", current: "page" })).toBeTruthy();
  });

  it("widens the window with ?since=", async () => {
    const narrow = await renderPage({ since: "2026-09-01" });
    const narrowGroups = narrow.getByRole("heading", { name: /since September 1, 2026/ })
      .closest("section")!
      .querySelectorAll("h3").length;
    cleanup();
    const wide = await renderPage({ since: "2025-01-01" });
    const wideGroups = wide.getByRole("heading", { name: /since January 1, 2025/ })
      .closest("section")!
      .querySelectorAll("h3").length;
    expect(wideGroups).toBeGreaterThan(narrowGroups);
  });

  it("says when a crux has not moved in the window", async () => {
    const view = await renderPage({ since: "2026-09-10" });
    expect(view.getAllByText(/No movement recorded since/).length).toBeGreaterThan(0);
  });
});
