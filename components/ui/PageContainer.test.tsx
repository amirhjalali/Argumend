import "@/test/setup-dom";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { PAGE_GUTTER, PAGE_RHYTHM, PAGE_WIDTHS, PageContainer } from "./PageContainer";

describe("PageContainer", () => {
  afterEach(cleanup);

  it("defaults to the 5xl width with the shared gutter and rhythm", () => {
    const view = render(<PageContainer>content</PageContainer>);
    const el = view.container.firstElementChild!;
    expect(el.tagName).toBe("DIV");
    expect(el.className).toContain("max-w-5xl");
    expect(el.className).toContain(PAGE_GUTTER);
    expect(el.className).toContain(PAGE_RHYTHM);
    expect(el.className).toContain("mx-auto");
  });

  it("offers exactly two widths", () => {
    expect(Object.keys(PAGE_WIDTHS).sort()).toEqual(["default", "reading"]);
    expect(PAGE_WIDTHS.reading).toBe("max-w-[44rem]");
  });

  it("renders the reading width as an article when asked", () => {
    const view = render(
      <PageContainer width="reading" as="article" id="post">
        content
      </PageContainer>,
    );
    const el = view.container.firstElementChild!;
    expect(el.tagName).toBe("ARTICLE");
    expect(el.id).toBe("post");
    expect(el.className).toContain("max-w-[44rem]");
  });

  it("never paints a background (the shell owns it)", () => {
    const view = render(<PageContainer>content</PageContainer>);
    expect(view.container.firstElementChild!.className).not.toMatch(/\bbg-/);
  });
});
