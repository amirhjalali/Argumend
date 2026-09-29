import "@/test/setup-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, within } from "@testing-library/react";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));
vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NOT_FOUND");
  }),
}));
vi.mock("@/components/AppShell", () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
vi.mock("@/components/JsonLd", () => ({ JsonLd: () => null }));

import QuestionsIndexPage, { generateMetadata } from "./page";
import { COLLECTION_PAGE_SIZE } from "@/components/learn/CollectionIndex";

afterEach(cleanup);

describe("/questions index", () => {
  it("keeps category chips and every question row at least 44px tall", async () => {
    const view = render(await QuestionsIndexPage({ searchParams: Promise.resolve({}) }));
    const chips = within(view.getByRole("navigation", { name: "Question categories" }));
    const chipLinks = chips.getAllByRole("link");
    expect(chipLinks.length).toBeLessThanOrEqual(6);
    for (const link of chipLinks) expect(link.className).toContain("min-h-11");

    const rows = view.container.querySelectorAll('a[href^="/questions/"]');
    expect(rows.length).toBe(COLLECTION_PAGE_SIZE);
    for (const row of rows) expect(row.className).toContain("min-h-11");
  });

  it("lists one primary question per map, paginated", async () => {
    const view = render(await QuestionsIndexPage({ searchParams: Promise.resolve({}) }));
    expect(view.getByRole("status").textContent).toMatch(/Showing 1–24 of \d+ questions/);
    expect(view.getByRole("link", { name: "Next" }).getAttribute("href")).toBe("/questions?page=2");
    // A secondary phrasing is not a row of its own.
    expect(view.container.querySelector('a[href="/questions/should-we-build-more-nuclear-power-plants"]')).toBeNull();
  });

  it("filters by category with a canonical URL of its own", async () => {
    const view = render(
      await QuestionsIndexPage({ searchParams: Promise.resolve({ category: "science" }) }),
    );
    const current = view
      .getByRole("navigation", { name: "Question categories" })
      .querySelector('[aria-current="page"]');
    expect(current?.textContent).toBe("Science");
    const metadata = await generateMetadata({
      searchParams: Promise.resolve({ category: "science", page: "2" }),
    });
    expect(metadata.alternates?.canonical).toBe("https://argumend.org/questions?category=science&page=2");
  });

  it("explains fact versus value", async () => {
    const view = render(await QuestionsIndexPage({ searchParams: Promise.resolve({}) }));
    expect(view.getByRole("heading", { level: 2, name: "Fact or value?" })).toBeTruthy();
  });
});
