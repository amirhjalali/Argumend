import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, within } from "@testing-library/react";
import {
  articleSummaries,
  getArticleSummaryCategoryFacets,
} from "@/data/blogIndex";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));
vi.mock("next/image", () => ({
  default: ({ alt }: { alt: string }) => <span role="img" aria-label={alt} />,
}));
vi.mock("next/navigation", () => ({ notFound: vi.fn(() => { throw new Error("NOT_FOUND"); }) }));
vi.mock("@/components/AppShell", () => ({ AppShell: ({ children }: { children: React.ReactNode }) => <>{children}</> }));
vi.mock("@/components/Breadcrumbs", () => ({ Breadcrumbs: () => null }));
vi.mock("@/components/JsonLd", () => ({ JsonLd: () => null }));

import BlogPage, { generateMetadata } from "./page";
import { BLOG_MOBILE_CATEGORY_LIMIT, BLOG_PAGE_SIZE } from "./_config";

afterEach(cleanup);

describe("BlogPage pagination", () => {
  it("renders a bounded first page and exposes crawlable pagination", async () => {
    const view = render(await BlogPage({ searchParams: Promise.resolve({}) }));

    expect(view.getByRole("status").textContent).toContain(
      `Showing 1–${BLOG_PAGE_SIZE} of ${articleSummaries.length} articles`,
    );
    expect(view.getByRole("link", { name: "Next" }).getAttribute("href")).toBe("/blog?page=2");
    expect(view.getByRole("link", { name: "Page 1" }).getAttribute("aria-current")).toBe("page");
  });

  it("emits canonical previous and next metadata", async () => {
    const metadata = await generateMetadata({
      searchParams: Promise.resolve({ page: "2" }),
    });

    expect(metadata.alternates?.canonical).toBe("https://argumend.org/blog?page=2");
    expect(metadata.title).toBe("Blog — Page 2 of 8");
    expect(metadata.pagination).toEqual({
      previous: "https://argumend.org/blog",
      next: "https://argumend.org/blog?page=3",
    });
  });

  it("keeps top mobile categories concise and every category crawlable", async () => {
    const view = render(await BlogPage({ searchParams: Promise.resolve({}) }));
    const facets = getArticleSummaryCategoryFacets();
    const topList = view.getByRole("list", { name: "Top blog categories" });
    const moreList = view.getByRole("list", { name: "More blog categories" });

    expect(within(topList).getAllByRole("link")).toHaveLength(
      BLOG_MOBILE_CATEGORY_LIMIT,
    );
    expect(
      within(topList).getAllByRole("link")[0].getAttribute("href"),
    ).toBe(`/blog/category/${facets[0].slug}`);
    expect(within(topList).getByRole("link", { name: "Analysis, 8 articles" })).toBeTruthy();
    expect(within(moreList).getAllByRole("link")).toHaveLength(
      facets.length - BLOG_MOBILE_CATEGORY_LIMIT,
    );
    expect(
      within(topList).getAllByRole("link").length +
        within(moreList).getAllByRole("link").length,
    ).toBe(facets.length);
    expect(view.getByText(`${facets.length - BLOG_MOBILE_CATEGORY_LIMIT} more`)).toBeTruthy();
  });
});
