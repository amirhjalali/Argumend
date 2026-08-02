import "@/test/setup-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { topicSummaries } from "@/data/topicIndex";

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
import { parseTopicsQuery } from "./_query";

const defaultState: TopicsQueryState = {
  category: "all",
  statuses: [],
  minBalance: 0,
  maxBalance: 100,
  search: "",
  sort: "category",
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
      sort: "category",
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
