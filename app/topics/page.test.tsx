import "@/test/setup-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { CATEGORY_ORDER, topicSummaries } from "@/data/topicIndex";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));
vi.mock("@/components/AppShell", () => ({ AppShell: ({ children }: { children: React.ReactNode }) => <>{children}</> }));
vi.mock("@/components/Breadcrumbs", () => ({ Breadcrumbs: () => null }));
vi.mock("@/components/JsonLd", () => ({ JsonLd: () => null }));
vi.mock("@/components/BalanceWeightChip", () => ({ BalanceWeightChip: () => null }));

import TopicsPageClient, { type TopicsQueryState } from "./TopicsPageClient";
import { TOPICS_PAGE_SIZE } from "@/lib/collectionPagination";
import { generateMetadata } from "./page";
import { mixCategories, parseTopicsQuery } from "./_query";

const defaultState: TopicsQueryState = {
  category: "all",
  statuses: [],
  minBalance: 0,
  maxBalance: 100,
  search: "",
  sort: "mixed",
  page: 1,
};

describe("TopicsPage discovery filters", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/topics");
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("keeps mobile filters collapsed, filters results, counts active groups, and clears them", async () => {
    const view = render(<TopicsPageClient initialState={defaultState} />);
    const mobileDisclosure = view.getByText("Filters").closest("details");
    const technologyCount = topicSummaries.filter((topic) => topic.category === "technology").length;
    const filteredCount = topicSummaries.filter(
      (topic) => topic.category === "technology" && topic.status === "contested" && topic.balance >= 20
    ).length;

    expect(mobileDisclosure?.hasAttribute("open")).toBe(false);

    fireEvent.click(view.getAllByRole("link", { name: `Technology (${technologyCount})` })[0]);
    await waitFor(() => expect(view.getByRole("status").textContent).toContain(`of ${technologyCount} matching topics`));
    expect(view.getByText("1 active")).toBeTruthy();

    fireEvent.click(view.getAllByRole("button", { name: "Contested" })[0]);
    expect(view.getByText("2 active")).toBeTruthy();

    fireEvent.change(view.getAllByRole("slider", { name: "Minimum balance" })[0], {
      target: { value: "20" },
    });
    await waitFor(() => expect(view.getByRole("status").textContent).toContain(`of ${filteredCount} matching topics`));
    expect(view.getByText("3 active")).toBeTruthy();

    fireEvent.click(view.getByRole("button", { name: "Clear filters" }));

    await waitFor(() =>
      expect(view.getByRole("status").textContent).toContain(`of ${topicSummaries.length} matching topics`)
    );
    expect(view.queryByText(/active$/)).toBeNull();
    expect(view.getAllByRole("link", { name: `Technology (${technologyCount})` })[0].hasAttribute("aria-current")).toBe(false);
    expect((view.getByRole("textbox", { name: "Search topics" }) as HTMLInputElement).value).toBe("");
  });

  it("hydrates discovery state from the URL and keeps normalized state in sync", async () => {
    window.history.replaceState(
      {},
      "",
      "/topics?category=technology&status=contested&min=10&max=90&sort=title-asc&q=artificial"
    );
    const initialState = parseTopicsQuery({
      category: "technology",
      status: "contested",
      min: "10",
      max: "90",
      sort: "title-asc",
      q: "artificial",
    });
    const view = render(<TopicsPageClient initialState={initialState} />);

    await waitFor(() =>
      expect((view.getByRole("textbox", { name: "Search topics" }) as HTMLInputElement).value).toBe("artificial")
    );
    expect(view.getByText("3 active")).toBeTruthy();
    expect((view.getByRole("combobox", { name: "Sort:" }) as HTMLSelectElement).value).toBe("title-asc");
    expect(window.location.search).toContain("category=technology");
    expect(window.location.search).toContain("status=contested");
    expect(window.location.search).toContain("q=artificial");

    fireEvent.click(view.getByRole("button", { name: "Clear filters" }));

    await waitFor(() => expect(window.location.search).toBe("?sort=title-asc"));
    expect((view.getByRole("textbox", { name: "Search topics" }) as HTMLInputElement).value).toBe("");
    expect(view.queryByText(/active$/)).toBeNull();
  });

  it("renders only one crawlable page of topic cards with stable next links", () => {
    const view = render(<TopicsPageClient initialState={defaultState} />);
    const topicLinks = view.container.querySelectorAll('a[href^="/topics/"]');
    expect(topicLinks).toHaveLength(TOPICS_PAGE_SIZE);
    expect(view.getByRole("link", { name: "Next" }).getAttribute("href")).toBe("/topics?page=2");
    expect(view.getByRole("link", { name: "Page 1" }).getAttribute("aria-current")).toBe("page");
  });
});

describe("TopicsPage default order", () => {
  afterEach(cleanup);

  const firstPageCategories = (container: HTMLElement) =>
    [...container.querySelectorAll('a[href^="/topics/"]')].map((link) => {
      const id = link.getAttribute("href")!.replace("/topics/", "");
      return topicSummaries.find((topic) => topic.id === id)!.category;
    });

  it("opens on a first page that spans every category, not one", () => {
    window.history.replaceState({}, "", "/topics");
    const view = render(<TopicsPageClient initialState={defaultState} />);
    const categories = firstPageCategories(view.container);

    expect(new Set(categories)).toEqual(new Set(CATEGORY_ORDER));
    // Dealt in CATEGORY_ORDER, so the first five rows are one of each.
    expect(categories.slice(0, CATEGORY_ORDER.length)).toEqual(CATEGORY_ORDER);
    // The default order keeps a bare URL and shows no category group headings.
    expect(window.location.search).toBe("");
    expect(view.queryByRole("heading", { level: 2, name: "Policy" })).toBeNull();
  });

  it("shows the featured maps on the unfiltered list only", () => {
    const featured = <section data-testid="featured-maps" />;
    const all = render(<TopicsPageClient initialState={defaultState} featured={featured} />);
    expect(all.queryByTestId("featured-maps")).not.toBeNull();
    cleanup();

    window.history.replaceState({}, "", "/topics?category=science");
    const science = render(
      <TopicsPageClient initialState={{ ...defaultState, category: "science" }} featured={featured} />,
    );
    expect(science.queryByTestId("featured-maps")).toBeNull();
  });

  it("still groups by category when that sort is chosen, and writes it to the URL", async () => {
    window.history.replaceState({}, "", "/topics");
    const view = render(<TopicsPageClient initialState={defaultState} />);

    fireEvent.change(view.getByRole("combobox", { name: "Sort:" }), {
      target: { value: "category" },
    });

    await waitFor(() => expect(window.location.search).toBe("?sort=category"));
    expect(view.getByRole("heading", { level: 2, name: "Policy" })).toBeTruthy();
    expect(new Set(firstPageCategories(view.container))).toEqual(new Set(["policy"]));
    expect(parseTopicsQuery({ sort: "category" }).sort).toBe("category");
  });

  it("deals categories round-robin, heaviest evidence first, deterministically", () => {
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
    expect(mixCategories(topicSummaries)).toHaveLength(topicSummaries.length);
  });
});

describe("TopicsPage pagination metadata", () => {
  it("normalizes discovery query state", () => {
    expect(parseTopicsQuery({
      category: "unknown",
      status: "contested,unknown,contested",
      min: "90",
      max: "20",
      sort: "nope",
      page: "0",
    })).toEqual({
      category: "all",
      statuses: ["contested"],
      minBalance: 20,
      maxBalance: 20,
      search: "",
      sort: "mixed",
      page: 1,
    });
  });

  it("emits canonical previous and next URLs that preserve filters", async () => {
    const metadata = await generateMetadata({
      searchParams: Promise.resolve({ category: "science", sort: "title-asc", page: "2" }),
    });

    expect(metadata.alternates?.canonical).toBe(
      "https://argumend.org/topics?category=science&sort=title-asc&page=2",
    );
    expect(metadata.title).toBe("Explore Topics — Page 2");
    expect(metadata.pagination).toEqual({
      previous: "https://argumend.org/topics?category=science&sort=title-asc",
      next: null,
    });
  });
});
