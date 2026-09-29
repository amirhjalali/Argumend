import "@/test/setup-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { CATEGORY_ORDER, topicSummaries } from "@/data/topicIndex";
import { argumentTopicIds, argumentTopicIndex } from "@/lib/argument/topicIds";
import { SAVED_TOPICS_KEY } from "@/hooks/useSavedTopics";

vi.mock("next/link", () => ({
  default: ({ children, href, prefetch: _prefetch, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; prefetch?: boolean }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));
vi.mock("@/components/AppShell", () => ({ AppShell: ({ children }: { children: React.ReactNode }) => <>{children}</> }));
vi.mock("@/components/Breadcrumbs", () => ({ Breadcrumbs: () => null }));
vi.mock("@/components/JsonLd", () => ({ JsonLd: () => null }));

import TopicsPageClient, { type TopicsQueryState } from "./TopicsPageClient";
import { TOPICS_PAGE_SIZE } from "@/lib/collectionPagination";
import { generateMetadata } from "./page";
import {
  DEBATE_MAP_CATEGORY,
  LIBRARY_ENTRIES,
  countMatchingTopics,
  filterLibrary,
  mixCategories,
  parseTopicsQuery,
} from "./_query";

const defaultState: TopicsQueryState = {
  category: "all",
  search: "",
  sort: "mixed",
  page: 1,
};

const legacyTopicLinks = (container: HTMLElement) =>
  [...container.querySelectorAll('ul a[href^="/topics/"]')].filter((link) =>
    topicSummaries.some((topic) => link.getAttribute("href") === `/topics/${topic.id}`),
  );

describe("/topics: no scoreboard", () => {
  beforeEach(() => window.history.replaceState({}, "", "/topics"));
  afterEach(cleanup);

  it("offers only neutral orders, and no balance or status filter", () => {
    const view = render(<TopicsPageClient initialState={defaultState} />);
    const select = view.getByRole("combobox", { name: "Order:" }) as HTMLSelectElement;
    expect([...select.options].map((option) => option.textContent)).toEqual([
      "Mixed categories",
      "By category",
      "A–Z",
    ]);
    const text = view.container.textContent ?? "";
    for (const banned of ["Most settled", "Most contested", "Strongest for", "Strongest against", "Evidence balance", "/100"]) {
      expect(text).not.toContain(banned);
    }
    expect(view.queryByRole("slider")).toBeNull();
    expect(view.queryByText("Filters")).toBeNull();
  });

  it("drops the old scoreboard parameters from shared URLs", () => {
    expect(parseTopicsQuery({
      category: "unknown",
      status: "contested",
      min: "90",
      max: "20",
      sort: "balance-desc",
      page: "0",
    })).toEqual({ category: "all", search: "", sort: "mixed", page: 1 });
    expect(parseTopicsQuery({ sort: "weight-desc" }).sort).toBe("mixed");
    expect(parseTopicsQuery({ sort: "title-asc", q: "nuclear" })).toMatchObject({
      sort: "title-asc",
      search: "nuclear",
    });
  });
});

describe("/topics: Start here", () => {
  beforeEach(() => window.history.replaceState({}, "", "/topics"));
  afterEach(cleanup);

  it("pins every new-model map at the top, titled as its question", () => {
    const view = render(<TopicsPageClient initialState={defaultState} />);
    const group = view.getByRole("heading", { name: "Start here" }).closest("section")!;
    const links = [...group.querySelectorAll('a[href^="/topics/"]')].map((a) => a.getAttribute("href"));
    expect(links).toEqual(argumentTopicIds.map((id) => `/topics/${id}`));
    for (const map of argumentTopicIndex) {
      expect(map.title.endsWith("?")).toBe(true);
      expect(group.textContent).toContain(map.title);
    }
    expect(group.querySelector('a[href="/ai"]')).not.toBeNull();
    // The pinned maps sit above the list, so the list itself does not repeat them.
    expect(legacyTopicLinks(view.container)).toHaveLength(TOPICS_PAGE_SIZE);
  });

  it("gives way to the list itself under a category or a search", async () => {
    const view = render(
      <TopicsPageClient initialState={{ ...defaultState, category: "technology" }} />,
    );
    expect(view.queryByRole("heading", { name: "Start here" })).toBeNull();
    // The technology shelf holds its new-model map first. Every row is a map,
    // so no row carries a "Debate map" (or "Map") chip.
    const firstRow = view.container.querySelector("ul li a")!;
    expect(firstRow.getAttribute("href")).toBe("/topics/ai-mass-unemployment");
    expect(firstRow.textContent).not.toMatch(/Debate map/i);
    expect([...firstRow.querySelectorAll("p")].filter((p) => !p.textContent?.trim())).toHaveLength(0);
  });

  it("files every registered map on a shelf", () => {
    for (const id of argumentTopicIds) {
      expect(CATEGORY_ORDER).toContain(DEBATE_MAP_CATEGORY[id as keyof typeof DEBATE_MAP_CATEGORY]);
    }
  });
});

describe("/topics: search", () => {
  beforeEach(() => window.history.replaceState({}, "", "/topics"));
  afterEach(cleanup);

  it("finds the new-model maps by title, tagline and alias", () => {
    expect(filterLibrary({ ...defaultState, search: "mass unemployment" })[0].id).toBe(
      "ai-mass-unemployment",
    );
    expect(filterLibrary({ ...defaultState, search: "labor share" }).map((e) => e.id)).toContain(
      "capitalism-after-ai",
    );
    expect(filterLibrary({ ...defaultState, search: "arms sales" }).map((e) => e.id)).toContain(
      "us-israel-support",
    );
  });

  it("honours ?q=, including old tag slugs", async () => {
    window.history.replaceState({}, "", "/topics?q=public-health");
    const state = parseTopicsQuery({ q: "public-health" });
    const view = render(<TopicsPageClient initialState={state} />);
    const tagged = topicSummaries.filter((topic) => topic.tags.includes("public-health"));
    expect(tagged.length).toBeGreaterThan(0);
    for (const topic of tagged) {
      expect(view.container.querySelector(`a[href="/topics/${topic.id}"]`)).not.toBeNull();
    }
    expect((view.getByRole("searchbox", { name: "Search maps" }) as HTMLInputElement).value).toBe(
      "public-health",
    );
    await waitFor(() => expect(window.location.search).toBe("?q=public-health"));
  });

  it("filters as you type, counts matches and clears", async () => {
    const view = render(<TopicsPageClient initialState={defaultState} />);
    fireEvent.change(view.getByRole("searchbox", { name: "Search maps" }), {
      target: { value: "nuclear" },
    });
    const expected = countMatchingTopics({ ...defaultState, search: "nuclear" });
    expect(expected).toBeGreaterThan(0);
    await waitFor(() =>
      expect(view.getByRole("status").textContent).toContain(`of ${expected} matching maps`),
    );
    expect(window.location.search).toBe("?q=nuclear");

    fireEvent.click(view.getByRole("button", { name: "Clear filters" }));
    await waitFor(() => expect(window.location.search).toBe(""));
    expect(view.getByRole("heading", { name: "Start here" })).toBeTruthy();
  });
});

describe("/topics: saved on this device", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/topics");
    window.localStorage.clear();
  });
  afterEach(() => {
    cleanup();
    window.localStorage.clear();
  });

  it("stays hidden when nothing is saved", () => {
    const view = render(<TopicsPageClient initialState={defaultState} />);
    expect(view.queryByRole("button", { name: /Saved on this device/ })).toBeNull();
  });

  it("appears with a count and narrows the list to this device's saves", async () => {
    const saved = [topicSummaries[3].id, "ai-mass-unemployment", "no-longer-a-map"];
    window.localStorage.setItem(SAVED_TOPICS_KEY, JSON.stringify(saved));
    const view = render(<TopicsPageClient initialState={defaultState} />);

    const toggle = await view.findByRole("button", { name: "Saved on this device (2)" });
    expect(toggle.getAttribute("aria-pressed")).toBe("false");
    await act(async () => { fireEvent.click(toggle); });

    expect(toggle.getAttribute("aria-pressed")).toBe("true");
    const rows = [...view.container.querySelectorAll("ul li a")].map((a) => a.getAttribute("href"));
    expect(rows).toEqual(["/topics/ai-mass-unemployment", `/topics/${topicSummaries[3].id}`]);
    // Device-local: never written to the shareable URL.
    expect(window.location.search).toBe("");
  });
});

describe("/topics: order and pagination", () => {
  afterEach(cleanup);

  const firstPageCategories = (container: HTMLElement) =>
    legacyTopicLinks(container).map((link) => {
      const id = link.getAttribute("href")!.replace("/topics/", "");
      return topicSummaries.find((topic) => topic.id === id)!.category;
    });

  it("opens on a first page that spans every category, not one", () => {
    window.history.replaceState({}, "", "/topics");
    const view = render(<TopicsPageClient initialState={defaultState} />);
    const categories = firstPageCategories(view.container);

    expect(new Set(categories)).toEqual(new Set(CATEGORY_ORDER));
    expect(categories.slice(0, CATEGORY_ORDER.length)).toEqual(CATEGORY_ORDER);
    expect(window.location.search).toBe("");
    expect(view.queryByRole("heading", { level: 2, name: "Policy" })).toBeNull();
  });

  it("renders one crawlable page with stable next links", () => {
    window.history.replaceState({}, "", "/topics");
    const view = render(<TopicsPageClient initialState={defaultState} />);
    expect(view.getByRole("link", { name: "Next" }).getAttribute("href")).toBe("/topics?page=2");
    expect(view.getByRole("link", { name: "Page 1" }).getAttribute("aria-current")).toBe("page");
  });

  it("still groups by category when that order is chosen, and writes it to the URL", async () => {
    window.history.replaceState({}, "", "/topics");
    const view = render(<TopicsPageClient initialState={defaultState} />);

    fireEvent.change(view.getByRole("combobox", { name: "Order:" }), {
      target: { value: "category" },
    });

    await waitFor(() => expect(window.location.search).toBe("?sort=category"));
    expect(view.getByRole("heading", { level: 2, name: "Policy" })).toBeTruthy();
    expect(new Set(firstPageCategories(view.container))).toEqual(new Set(["policy"]));
  });

  it("orders A–Z by title", () => {
    const titles = filterLibrary({ ...defaultState, sort: "title-asc" }).map((e) => e.title);
    expect(titles).toEqual([...titles].sort((a, b) => a.localeCompare(b)));
  });

  it("deals categories round-robin, fullest maps first, deterministically", () => {
    const topics = [
      { id: "p1", category: "policy" as const, weight: 50 },
      { id: "p2", category: "policy" as const, weight: 90 },
      { id: "p3", category: "policy" as const, weight: 70 },
      { id: "s1", category: "science" as const, weight: 40 },
      { id: "e1", category: "economics" as const, weight: 60 },
    ];

    const mixed = mixCategories(topics).map((topic) => topic.id);
    expect(mixed).toEqual(["p2", "s1", "e1", "p3", "p1"]);
    expect(mixCategories(topics).map((topic) => topic.id)).toEqual(mixed);
    expect(filterLibrary(defaultState)).toHaveLength(topicSummaries.length);
    expect(LIBRARY_ENTRIES).toHaveLength(topicSummaries.length + argumentTopicIds.length);
  });
});

describe("/topics metadata", () => {
  it("emits canonical previous and next URLs that preserve filters", async () => {
    const metadata = await generateMetadata({
      searchParams: Promise.resolve({ category: "science", sort: "title-asc", page: "2" }),
    });

    expect(metadata.alternates?.canonical).toBe(
      "https://argumend.org/topics?category=science&sort=title-asc&page=2",
    );
    expect(metadata.title).toBe("Maps — page 2");
    expect(metadata.pagination).toEqual({
      previous: "https://argumend.org/topics?category=science&sort=title-asc",
      next: null,
    });
    expect(metadata.robots).toBeUndefined();
  });

  it("keeps search results out of the index", async () => {
    const metadata = await generateMetadata({
      searchParams: Promise.resolve({ q: "policy" }),
    });
    expect(metadata.robots).toEqual({ index: false, follow: true });
  });
});
