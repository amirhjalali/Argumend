import { describe, it, expect } from "vitest";
import { renderInlineMarkdown, renderMarkdown } from "./markdown";

// Complements markdown.test.ts: block-level edge cases (mixed lists, ordered
// list classes, paragraph line breaks) and trickier inline cases (bold+italic,
// links nested in bold, mailto, href escaping).

describe("renderInlineMarkdown — extra inline cases", () => {
  it("renders ***text*** as nested strong+em", () => {
    expect(renderInlineMarkdown("a ***both*** word")).toContain(
      "<strong><em>both</em></strong>",
    );
  });

  it("renders a link nested inside bold", () => {
    const html = renderInlineMarkdown("**[Read the guide](/guides)**");
    expect(html).toContain("<strong>");
    expect(html).toContain('href="/guides"');
  });

  it("treats mailto: links as internal (no target=_blank)", () => {
    const html = renderInlineMarkdown("[email us](mailto:hi@example.com)");
    expect(html).toContain('href="mailto:hi@example.com"');
    expect(html).not.toContain("target=");
  });

  it("escapes ampersands in the href attribute", () => {
    const html = renderInlineMarkdown("[search](/find?a=1&b=2)");
    expect(html).toContain('href="/find?a=1&amp;b=2"');
  });
});

describe("renderMarkdown — extra block cases", () => {
  it("renders a '*' bullet block as a <ul> with stripped markers", () => {
    const html = renderMarkdown("* alpha\n* beta");
    expect(html).toContain("<ul");
    expect(html).toContain("<li>alpha</li>");
    expect(html).toContain("<li>beta</li>");
  });

  it("gives ordered lists the list-decimal class", () => {
    const html = renderMarkdown("1. first\n2. second");
    expect(html).toContain('<ol class="list-decimal');
  });

  it("falls back to a paragraph when list markers are mixed", () => {
    const html = renderMarkdown("- a bullet\nplain trailing line");
    expect(html).toContain("<p");
    expect(html).not.toContain("<ul");
    expect(html).not.toContain("<ol");
  });

  it("converts single newlines inside a paragraph to <br/>", () => {
    const html = renderMarkdown("line one\nline two");
    expect(html).toContain("line one<br/>line two");
  });

  it("promotes ### to <h3> and does not wrap a heading in a <p>", () => {
    const html = renderMarkdown("### Subheading");
    expect(html).toContain("<h3");
    expect(html).not.toContain("<p");
  });
});
