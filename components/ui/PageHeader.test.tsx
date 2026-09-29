import "@/test/setup-dom";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { PAGE_TITLE_SIZES, PageHeader } from "./PageHeader";

describe("PageHeader", () => {
  afterEach(cleanup);

  it("renders crumbs, a label-caps eyebrow, a serif h1 and a serif lede, in that order", () => {
    const view = render(
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Maps" }]}
        eyebrow="Map, reviewed"
        title="Will AI cause mass unemployment?"
        lede="The whole fight in five questions."
        meta="Updated 29 September 2026"
      />,
    );

    const header = view.container.querySelector("header")!;
    const crumbs = view.getByRole("navigation", { name: "Breadcrumb" });
    const eyebrow = view.getByText("Map, reviewed");
    const h1 = view.getByRole("heading", { level: 1, name: "Will AI cause mass unemployment?" });
    const lede = view.getByText("The whole fight in five questions.");

    expect(eyebrow.className).toContain("label-caps");
    expect(h1.className).toMatch(/font-serif/);
    expect(h1.className).toMatch(/font-normal/);
    expect(h1.className).toMatch(/text-primary/);
    expect(lede.className).toMatch(/font-serif text-xl/);
    expect(view.getByText("Updated 29 September 2026").className).toMatch(/text-muted/);

    const order = [crumbs, eyebrow, h1, lede].map((el) =>
      Array.from(header.querySelectorAll("*")).indexOf(el),
    );
    expect(order).toEqual([...order].sort((a, b) => a - b));
  });

  it("is always left-aligned: no centring, bands, pills or bold", () => {
    const view = render(<PageHeader eyebrow="Learn" title="Guides" />);
    const html = view.container.innerHTML;
    expect(html).not.toMatch(/text-center|mx-auto|rounded-full|bg-gradient|font-bold|font-semibold/);
  });

  it("uses one scale per size, and the page size by default", () => {
    const page = render(<PageHeader title="Guides" />);
    expect(page.getByRole("heading", { level: 1 }).className).toContain(PAGE_TITLE_SIZES.page);
    cleanup();

    const display = render(<PageHeader size="display" title="The AI argument" />);
    expect(display.getByRole("heading", { level: 1 }).className).toContain(
      PAGE_TITLE_SIZES.display,
    );
    expect(PAGE_TITLE_SIZES.display).not.toBe(PAGE_TITLE_SIZES.page);
  });

  it("omits the optional parts when they are not given", () => {
    const view = render(<PageHeader title="Saved" />);
    expect(view.queryByRole("navigation")).toBeNull();
    expect(view.container.querySelectorAll("p")).toHaveLength(0);
  });

  it("renders children (actions) under the lede", () => {
    const view = render(
      <PageHeader title="Paste an argument">
        <button type="button">Find what it turns on</button>
      </PageHeader>,
    );
    expect(view.getByRole("button", { name: "Find what it turns on" })).toBeTruthy();
  });
});
