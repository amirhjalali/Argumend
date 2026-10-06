import "@/test/setup-dom";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { cleanup, render, within } from "@testing-library/react";
import { loadTopicById } from "@/data/topicLoader";
import { topicSummaries } from "@/data/topicIndex";
import { buildDiagram } from "@/lib/diagram/model";
import { mapLinkFor } from "@/lib/learn/nextStep";
import { pillarMapDocument } from "@/lib/paste/mapDocuments";
import { findMaps, getMapIndex } from "@/lib/paste/maps";
import { getRelatedMaps } from "@/lib/relatedMaps";
import type { Topic } from "@/lib/schemas/topic";
import { ANSWER_SIDES, CLAIM_SIDES, mapDisplayTitle, sideWords } from "./mapNaming";

vi.mock("@/hooks/useMediaQuery", () => ({
  useIsHydrated: () => true,
  useIsMobile: () => true,
  useMediaQuery: () => false,
}));
vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));
vi.mock("@/components/DesktopCanvas", () => ({ default: () => <div data-testid="canvas" /> }));

import { ReadModeView } from "@/components/ReadModeView";
import { MapMatch } from "@/components/paste/MapResult";
import { TopicDiagram } from "@/app/topics/[id]/map/TopicDiagram";

/**
 * One map, one name. A legacy map's old Title-Case `title` must not show up
 * where the map is named to a reader: the page's H1 asks its question, so
 * every link, crumb, heading and result names it by that question too.
 */

// Every legacy map whose old label differs from its question.
const RENAMED = topicSummaries.filter((t) => t.question && t.question !== t.title);

function expectNoOldTitles(text: string) {
  for (const t of RENAMED) expect(text, `old title "${t.title}"`).not.toContain(t.title);
}

describe("mapDisplayTitle / sideWords", () => {
  it("names a map by its question, else its title", () => {
    expect(mapDisplayTitle({ title: "Climate Change", question: "Is climate change caused by humans?" })).toBe(
      "Is climate change caused by humans?",
    );
    expect(mapDisplayTitle({ title: "Climate Change", question: "  " })).toBe("Climate Change");
    expect(mapDisplayTitle({ title: "Climate Change" })).toBe("Climate Change");
  });

  it("labels sides by the answer when the map asks a question", () => {
    expect(sideWords({ question: "Does it work?" })).toBe(ANSWER_SIDES);
    expect(sideWords({})).toBe(CLAIM_SIDES);
  });

  it("every legacy map has a question, so every map is named by one", () => {
    expect(RENAMED.length).toBeGreaterThan(100);
    for (const t of topicSummaries) expect(mapDisplayTitle(t)).toBe(t.question);
  });
});

describe("surfaces that name a legacy map", () => {
  let rent: Topic;
  let nuclear: Topic;

  beforeAll(async () => {
    rent = (await loadTopicById("rent-control-effectiveness"))!;
    nuclear = (await loadTopicById("nuclear-energy-safety"))!;
    await getMapIndex();
  }, 60_000);

  afterEach(cleanup);

  it("topic page: breadcrumb, H1 and related maps all use questions", async () => {
    // The related maps the route passes in (app/topics/[id]/page.tsx).
    const view = render(<ReadModeView topic={rent} related={await getRelatedMaps(rent.id)} />);
    const h1 = view.getByRole("heading", { level: 1 });
    expect(h1.textContent).toBe(rent.question);
    const crumbs = view.getByRole("navigation", { name: "Breadcrumb" });
    expect(crumbs.textContent).toContain(rent.question!);

    const related = view.getByRole("navigation", { name: "Related maps" });
    const links = within(related).getAllByRole("link");
    expect(links.length).toBeGreaterThan(1);
    expectNoOldTitles(related.textContent ?? "");
    // The two sides answer the question the reader sees.
    expect(view.container.textContent).toContain(ANSWER_SIDES.yes);
    expect(view.container.textContent).toContain(ANSWER_SIDES.no);
    expect(view.container.textContent).not.toMatch(/\bSupporters\b|\bSkeptics\b/);
  });

  it("diagram: the route heading is the question", () => {
    const view = render(<TopicDiagram diagram={buildDiagram(nuclear)} />);
    expect(view.getByRole("heading", { level: 1 }).textContent).toBe(nuclear.question);
  });

  it("paste: the matched map and its candidates are named by their questions", async () => {
    expect(pillarMapDocument(rent).title).toBe(rent.question);
    const maps = await findMaps(
      "Rent control keeps tenants in their homes, but landlords stop building and the housing supply shrinks, so rents rise for everyone else.",
    );
    const match = maps.match;
    expect(match?.id).toBe("rent-control-effectiveness");
    expect(match?.title).toBe(rent.question);
    const view = render(<MapMatch match={match!} related={maps.related ?? []} />);
    expect(view.getByRole("link", { name: rent.question! })).toBeTruthy();
    expectNoOldTitles(view.container.textContent ?? "");
    for (const candidate of [...(maps.related ?? []), ...maps.closest]) {
      const summary = topicSummaries.find((t) => t.id === candidate.id);
      if (summary) expect(candidate.title).toBe(mapDisplayTitle(summary));
    }
  });

  it("Learn: “Where it shows up” and next-map links use the question", () => {
    expect(mapLinkFor("rent-control-effectiveness")?.title).toBe(rent.question);
    expect(mapLinkFor("nuclear-energy-safety")?.title).toBe(nuclear.question);
  });
});
