import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, within } from "@testing-library/react";
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

  it("shows 5–8 crux cards, each naming its map and a settle line", async () => {
    const view = await renderPage();
    const cards = view.getAllByTestId("ai-crux-card");
    expect(cards.length).toBeGreaterThanOrEqual(5);
    expect(cards.length).toBeLessThanOrEqual(8);
    for (const card of cards) {
      const topicId = card.getAttribute("data-topic")!;
      expect(AI_MAP_TOPIC_IDS).toContain(topicId);
      expect(within(card).getByRole("link", { name: AI_MAP_LABELS[topicId] })).toBeTruthy();
      expect(card.textContent).toContain("What would settle it:");
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
      .filter((card) => card.textContent?.includes("Unresolvable by evidence"));
    expect(standing.length).toBeGreaterThan(0);
    for (const card of standing) {
      expect(card.textContent).toContain("Nothing does — this is a standing value disagreement");
    }
  });

  it("uses no verdict language, no percentages of agreement, and no settled badge", async () => {
    const view = await renderPage();
    const text = view.container.textContent ?? "";
    expect(findVerdictLanguage(text)).toEqual([]);
    expect(text).not.toMatch(/\bagree(ment)? (score|percentage)\b/i);
    expect(text).not.toMatch(/\bSettled\b/);
    expect(text).not.toMatch(/\bwinner\b/i);
  });

  it("lists the changelog newest-recorded first, then by source date", async () => {
    const view = await renderPage();
    const rows = view.getAllByTestId("ai-changelog-entry");
    expect(rows.length).toBeGreaterThan(0);
    const keys = rows.map((row) => `${row.getAttribute("data-noticed")} ${row.getAttribute("data-date")}`);
    expect(keys).toEqual([...keys].sort().reverse());
  });

  it("shows what arrived in the default 90-day window, with evidence sources", async () => {
    const view = await renderPage();
    const section = view.getByRole("heading", { name: /What has arrived since June 24, 2026/ })
      .closest("section")!;
    expect(within(section).getAllByRole("list", { name: "Evidence behind this entry" }).length).toBeGreaterThan(0);
    expect(section.textContent).toMatch(/Link checked live/);
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
    expect(view.getAllByTestId("ai-crux-card").length).toBe(8);
    expect(view.getByRole("heading", { name: /since June 24, 2026/ })).toBeTruthy();
  });

  it("widens the window with ?since=", async () => {
    const narrow = await renderPage({ since: "2026-09-01" });
    const narrowGroups = narrow.getByRole("heading", { name: /since September 1, 2026/ })
      .closest("section")!
      .querySelectorAll("h3").length;
    cleanup();
    const wide = await renderPage({ since: "2023-01-01" });
    const wideGroups = wide.getByRole("heading", { name: /since January 1, 2023/ })
      .closest("section")!
      .querySelectorAll("h3").length;
    expect(wideGroups).toBeGreaterThan(narrowGroups);
  });

  it("says when a crux has not moved in the window", async () => {
    const view = await renderPage({ since: "2026-09-10" });
    expect(view.getAllByText(/No movement recorded since/).length).toBeGreaterThan(0);
  });
});
