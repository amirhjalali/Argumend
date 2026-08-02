// Lightweight markdown -> HTML for TRUSTED, repo-authored content (blog posts,
// guides) rendered via dangerouslySetInnerHTML. Hardened: link hrefs are
// scheme-allowlisted (only /, #, http(s)://, mailto:) and escaped for HTML
// attribute context, and raw HTML tags are escaped before the small Markdown
// allowlist is expanded. Do NOT use this intentionally small renderer for
// arbitrary user-authored Markdown.

/** Escape a string for safe use inside a double-quoted HTML attribute. */
export function escapeAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const LINK_CLASS =
  "text-deep underline underline-offset-2 hover:text-deep-dark dark:text-[#8bb5b1] dark:hover:text-[#b1d0cd] transition-colors";

/** Prevent raw HTML from becoming executable while preserving ordinary prose. */
function escapeRawHtmlTags(text: string): string {
  return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderInlineSyntax(md: string): string {
  return md
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, text, rawHref) => {
      const href = String(rawHref).trim();
      const allowed = /^(https?:\/\/|\/(?!\/)|#|mailto:)/i.test(href);
      const safeHref = allowed ? href : "#";
      const external = /^https?:\/\//i.test(safeHref);
      const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${escapeAttr(safeHref)}" class="${LINK_CLASS}"${attrs}>${text}</a>`;
    });
}

/**
 * Inline formatting only — bold, italic, links. Safe to use inside a
 * `whitespace-pre-line` block (preserves the source's own line breaks), e.g.
 * guide section content.
 */
export function renderInlineMarkdown(md: string): string {
  return renderInlineSyntax(escapeRawHtmlTags(md));
}

/**
 * Full block-level render — headings, unordered/ordered lists, paragraphs, plus
 * inline formatting. For long-form posts (blog).
 */
export function renderMarkdown(md: string): string {
  // Headings first (line-anchored), then inline (bold/italic/links).
  const html = renderInlineSyntax(
    escapeRawHtmlTags(md)
      .replace(
        /^### (.+)$/gm,
        '<h3 class="font-serif text-lg text-primary mt-10 mb-2">$1</h3>',
      )
      .replace(
        /^## (.+)$/gm,
        '<h2 class="font-serif text-2xl sm:text-3xl text-primary mt-12 mb-4">$1</h2>',
      ),
  );

  return html
    .split(/\n\n+/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h2") ||
        trimmed.startsWith("<h3") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<ol")
      ) {
        return trimmed;
      }
      // List blocks: every non-empty line is a bullet (- / *) or numbered (1.).
      const lines = trimmed
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      const isUl = lines.length > 0 && lines.every((l) => /^[-*]\s+/.test(l));
      const isOl = lines.length > 0 && lines.every((l) => /^\d+\.\s+/.test(l));
      if (isUl) {
        const items = lines
          .map((l) => `<li>${l.replace(/^[-*]\s+/, "")}</li>`)
          .join("");
        return `<ul class="list-disc pl-6 mb-6 space-y-1 leading-[1.8] text-primary">${items}</ul>`;
      }
      if (isOl) {
        const items = lines
          .map((l) => `<li>${l.replace(/^\d+\.\s+/, "")}</li>`)
          .join("");
        return `<ol class="list-decimal pl-6 mb-6 space-y-1 leading-[1.8] text-primary">${items}</ol>`;
      }
      return `<p class="mb-6 leading-[1.8] text-primary">${trimmed.replace(
        /\n/g,
        "<br/>",
      )}</p>`;
    })
    .join("\n");
}
