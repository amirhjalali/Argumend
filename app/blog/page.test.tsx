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
import { BLOG_CATEGORY_CHIPS, BLOG_PAGE_SIZE } from "./_config";

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
    expect(metadata.title).toBe(
      `Blog — Page 2 of ${Math.ceil(articleSummaries.length / BLOG_PAGE_SIZE)}`,
    );
    expect(metadata.pagination).toEqual({
      previous: "https://argumend.org/blog",
      next: "https://argumend.org/blog?page=3",
    });
  });

  it("shows at most six category chips and no tag chips before the list", async () => {
    const view = render(await BlogPage({ searchParams: Promise.resolve({}) }));
    const facets = getArticleSummaryCategoryFacets();
    const chips = within(view.getByRole("navigation", { name: "Top blog categories" })).getAllByRole("link");

    expect(chips).toHaveLength(Math.min(BLOG_CATEGORY_CHIPS, facets.length));
    expect(BLOG_CATEGORY_CHIPS).toBeLessThanOrEqual(6);
    expect(chips[0].getAttribute("href")).toBe(`/blog/category/${facets[0].slug}`);
    for (const chip of chips) expect(chip.className).toContain("min-h-11");
    expect(view.container.querySelector('a[href^="/blog/tag/"]')).toBeNull();
  });

  it("lists posts as compact 44px rows without per-post dates", async () => {
    const view = render(await BlogPage({ searchParams: Promise.resolve({}) }));
    const rows = view.container.querySelectorAll('a[href^="/blog/"]:not([href^="/blog/category/"]):not([href^="/blog?"])');
    expect(rows.length).toBe(BLOG_PAGE_SIZE);
    for (const row of rows) expect(row.className).toContain("min-h-11");
    expect(view.container.textContent).not.toMatch(/June 29, 2026|March 26, 2026/);
  });
});
