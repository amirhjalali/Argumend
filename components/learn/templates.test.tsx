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
vi.mock("next/image", () => ({
  default: ({ alt }: { alt: string }) => <span role="img" aria-label={alt} />,
}));
vi.mock("@/components/AppShell", () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
vi.mock("@/components/JsonLd", () => ({ JsonLd: () => null }));

import { ArticleLayout, MAX_RELATED, TOC_MIN_H2 } from "./ArticleLayout";
import { CollectionIndex, MAX_CHIPS } from "./CollectionIndex";
import { ANALYZE_HREF } from "@/lib/nav";

afterEach(cleanup);

const map = { href: "/topics/ai-mass-unemployment", title: "Will AI cause mass unemployment?" };

describe("ArticleLayout", () => {
  it("renders crumbs, the kind as eyebrow, a serif h1, a lede and a meta line", () => {
    const view = render(
      <ArticleLayout kind="guide" title="The crux test" lede="What would change your mind." meta="11 min read" nextMap={map}>
        <p>Body</p>
      </ArticleLayout>,
    );
    const crumbs = within(view.getByRole("navigation", { name: "Breadcrumb" }));
    expect(crumbs.getAllByRole("link").map((a) => a.getAttribute("href"))).toEqual([
      "/",
      "/learn",
      "/learn#guides",
    ]);
    expect(view.getByText("Guide").className).toContain("label-caps");
    const h1 = view.getByRole("heading", { level: 1, name: "The crux test" });
    expect(h1.className).toMatch(/font-serif/);
    expect(h1.className).toMatch(/font-normal/);
    expect(view.getByText("11 min read")).toBeTruthy();
  });

  it("ends with exactly the next step (one map, the paste tool) and at most three related items", () => {
    const related = Array.from({ length: 5 }, (_, i) => ({
      href: `/guides/g${i}`,
      title: `Guide ${i}`,
      kind: "Guide",
    }));
    const view = render(
      <ArticleLayout kind="essay" title="Post" nextMap={map} related={related}>
        <p>Body</p>
      </ArticleLayout>,
    );
    const next = within(view.getByRole("region", { name: "Next step" }));
    expect(next.getAllByRole("link").map((a) => a.getAttribute("href"))).toEqual([
      map.href,
      ANALYZE_HREF,
    ]);
    const relatedLinks = within(view.getByRole("region", { name: "Related reading" })).getAllByRole("link");
    expect(relatedLinks).toHaveLength(MAX_RELATED);
    const headings = Array.from(view.container.querySelectorAll("h2")).map((h) => h.textContent);
    expect(headings.slice(-2)).toEqual(["Next step", "Related reading"]);
    // No newsletter, no catalogue numbers.
    expect(view.container.textContent).not.toMatch(/subscribe|No\. \d/i);
  });

  it("shows a contents list only with more than four H2s", () => {
    const headings = (n: number) =>
      Array.from({ length: n }, (_, i) => ({ id: `h${i}`, text: `Heading ${i}`, level: 2 as const }));
    const few = render(
      <ArticleLayout kind="guide" title="Short" nextMap={map} headings={headings(TOC_MIN_H2 - 1)}>
        <p>Body</p>
      </ArticleLayout>,
    );
    expect(few.queryByRole("navigation", { name: "Table of contents" })).toBeNull();
    cleanup();
    const many = render(
      <ArticleLayout kind="guide" title="Long" nextMap={map} headings={headings(TOC_MIN_H2)}>
        <p>Body</p>
      </ArticleLayout>,
    );
    expect(many.getAllByRole("navigation", { name: "Table of contents" }).length).toBeGreaterThan(0);
  });

  it("renders key takeaways when given", () => {
    const view = render(
      <ArticleLayout kind="idea" title="Cruxes" nextMap={map} takeaways={["Find the crux first."]}>
        <p>Body</p>
      </ArticleLayout>,
    );
    expect(view.getByRole("heading", { name: "Key takeaways" })).toBeTruthy();
    expect(view.getByText("Find the crux first.")).toBeTruthy();
  });
});

describe("CollectionIndex", () => {
  it("renders at most six chips and compact 44px rows", () => {
    const chips = Array.from({ length: 8 }, (_, i) => ({ href: `#s${i}`, label: `Section ${i}` }));
    const view = render(
      <CollectionIndex
        crumbs={[{ label: "Home", href: "/" }, { label: "Learn" }]}
        eyebrow="Learn"
        title="How to disagree better"
        chips={chips}
        chipsLabel="Learn sections"
        groups={[
          {
            id: "ideas",
            title: "Core ideas",
            items: [{ href: "/concepts/cruxes", title: "Cruxes", description: "One line.", meta: "Idea" }],
            more: { href: "/learn#ideas", label: "All ideas" },
          },
        ]}
      />,
    );
    const nav = within(view.getByRole("navigation", { name: "Learn sections" }));
    expect(nav.getAllByRole("link")).toHaveLength(MAX_CHIPS);
    for (const link of nav.getAllByRole("link")) expect(link.className).toContain("min-h-11");

    const section = view.getByRole("region", { name: "Core ideas" });
    expect(section.id).toBe("ideas");
    const row = within(section).getByRole("link", { name: /Cruxes/ });
    expect(row.className).toContain("min-h-11");
    expect(within(section).getByRole("link", { name: /All ideas/ })).toBeTruthy();
    expect(view.container.innerHTML).not.toMatch(/rounded-xl|shadow-card|No\. \d/);
  });

  it("marks the current chip teal and the rest neutral", () => {
    const view = render(
      <CollectionIndex
        crumbs={[]}
        title="Questions"
        chips={[
          { href: "/questions", label: "All", current: true },
          { href: "/questions?category=science", label: "Science" },
        ]}
        groups={[]}
      />,
    );
    const [all, science] = view.getAllByRole("link");
    expect(all.className).toMatch(/text-deep|teal|deep/);
    // On the link itself, where a screen reader announces it.
    expect(all.getAttribute("aria-current")).toBe("page");
    expect(science.getAttribute("aria-current")).toBeNull();
    expect(science.className).toContain("stone");
  });
});
