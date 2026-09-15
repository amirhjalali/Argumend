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

  it("does not treat protocol-relative external URLs as internal links", () => {
    const html = renderInlineMarkdown("[x](//example.com/path)");

    expect(html).toContain('href="#"');
    expect(html).not.toContain("example.com");
  });

  it("renders raw HTML as text instead of executable markup", () => {
    const html = renderInlineMarkdown(
      '<img src=x onerror="alert(1)"> <script>alert(2)</script>',
    );

    expect(html).toContain("&lt;img");
    expect(html).toContain("&lt;script&gt;");
    expect(html).not.toContain("<img");
    expect(html).not.toContain("<script>");
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

  it("escapes raw HTML before adding block markup", () => {
    const html = renderMarkdown("## Safe heading\n\n<script>alert(1)</script>");

    expect(html).toContain("<h2");
    expect(html).toContain("&lt;script&gt;");
    expect(html).not.toContain("<script>");
  });
});

describe("dark mode", () => {
  it("emits a dark text variant on every prose block so article bodies are readable on the dark canvas", () => {
    const html = renderMarkdown("## Heading\n\n### Sub\n\nA paragraph.\n\n- one\n- two\n\n1. first\n2. second\n");
    for (const tag of ["<h2", "<h3", "<p", "<ul", "<ol"]) {
      const open = html.indexOf(tag);
      expect(open, `${tag} present`).toBeGreaterThanOrEqual(0);
      const classAttr = html.slice(open, html.indexOf(">", open));
      expect(classAttr, `${tag} carries the dark text token`).toContain("dark:text-[var(--text-primary)]");
    }
  });
});

describe("renderMarkdown dark-mode text tokens", () => {
  // `text-primary` is a FIXED light-mode hex (#3d3a36) in tailwind.config.ts, so any
  // block emitted with it alone renders dark-on-dark inside `.prose-custom` on the
  // dark canvas (measured 1.55:1 on /blog/[slug] in the 2026-09-15 dark-mode sweep).
  // Every element that carries a brand text alias must also carry a dark variant.
  const DARK_VARIANT = "dark:text-[var(--text-primary)]";

  const classStrings = (html: string, tag: string): string[] =>
    [...html.matchAll(new RegExp(`<${tag} class="([^"]*)"`, "g"))].map((m) => m[1]);

  it("pairs text-primary with the dark variant on p, ul, ol, h2 and h3", () => {
    const html = renderMarkdown(
      "## Heading\n\n### Sub\n\nA paragraph.\n\n- one\n- two\n\n1. first\n2. second",
    );
    for (const tag of ["p", "ul", "ol", "h2", "h3"]) {
      const classes = classStrings(html, tag);
      expect(classes.length, `no <${tag}> emitted`).toBeGreaterThan(0);
      for (const cls of classes) {
        expect(cls).toContain("text-primary");
        expect(cls).toContain(DARK_VARIANT);
      }
    }
  });

  it("never emits a bare brand text alias without an adjacent dark: override", () => {
    const html = renderMarkdown(
      "## H\n\n### S\n\nBody with [a link](/x) and **bold**.\n\n- a\n\n1. b",
    );
    // Same detector as lib/darkModeTextTokenRatchet.test.ts: a bare text-primary /
    // text-secondary not followed by a dark:text-* utility in the same class string.
    const bare =
      /(?<![-\w:])text-(?:primary|secondary)(?:\/\d{1,3})?(?![\/\d])\b(?![^"]*dark:text-)/g;
    expect(html.match(bare)).toBeNull();
    // Links carry their own dark tint already; keep that contract too.
    for (const cls of classStrings(html, "a")) {
      expect(cls).toMatch(/dark:text-/);
    }
  });
});
