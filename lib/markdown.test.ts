import { describe, it, expect } from "vitest";
import { escapeAttr, renderInlineMarkdown, renderMarkdown } from "./markdown";

describe("escapeAttr", () => {
  it("escapes the four HTML-attribute-sensitive characters", () => {
    expect(escapeAttr(`a & b "c" <d> e`)).toBe(
      "a &amp; b &quot;c&quot; &lt;d&gt; e",
    );
  });
});

describe("renderInlineMarkdown", () => {
  it("converts **bold** to <strong>", () => {
    expect(renderInlineMarkdown("a **bold** word")).toContain(
      "<strong>bold</strong>",
    );
  });

  it("converts *italic* to <em>", () => {
    expect(renderInlineMarkdown("an *italic* word")).toContain("<em>italic</em>");
  });

  it("keeps internal links same-tab (no target=_blank)", () => {
    const html = renderInlineMarkdown("see [topics](/topics)");
    expect(html).toContain('href="/topics"');
    expect(html).not.toContain("target=");
    expect(html).not.toContain("rel=");
  });

  it("opens external links in a new tab with rel=noopener", () => {
    const html = renderInlineMarkdown("see [site](https://example.com)");
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain("noopener");
  });

  it("neutralizes disallowed link schemes to '#'", () => {
    const html = renderInlineMarkdown("[x](javascript:alert(1))");
    expect(html).toContain('href="#"');
    expect(html).not.toContain("javascript:");
  });
});

describe("renderMarkdown", () => {
  it("renders consecutive '- ' lines as a single <ul>", () => {
    const html = renderMarkdown("- one\n- two");
    expect(html).toContain("<ul");
    expect(html).toContain("<li>one</li>");
    expect(html).toContain("<li>two</li>");
    expect(html).not.toContain("<ol");
  });

  it("renders consecutive '1.' lines as an <ol>", () => {
    const html = renderMarkdown("1. first\n2. second");
    expect(html).toContain("<ol");
    expect(html).toContain("<li>first</li>");
    expect(html).not.toContain("<ul");
  });

  it("wraps prose in a <p> and promotes ## to <h2>", () => {
    const html = renderMarkdown("## Heading\n\nA paragraph.");
    expect(html).toContain("<h2");
    expect(html).toContain("<p");
    expect(html).toContain("A paragraph.");
  });
});
