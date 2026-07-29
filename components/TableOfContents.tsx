import { ChevronDown, List } from "lucide-react";

// ---------------------------------------------------------------------------
// Table of contents — long-form wayfinding for blog posts & guides.
//
// Server component (no client JS): both the mobile disclosure (<details>) and
// the wide-desktop sticky rail are pure HTML/CSS, so the links stay in the
// server-rendered markup for SEO and work without hydration.
//
// Anchors target heading `id`s slugified with `slugifyHeading` (shared so the
// rendered heading ids and the TOC hrefs can't drift). Headings carry
// `scroll-mt-24` so they clear the sticky topbar when jumped to.
// ---------------------------------------------------------------------------

export interface TocHeading {
  readonly id: string;
  readonly text: string;
  readonly level: 2 | 3;
}

/**
 * Slugify heading text into a stable, URL-safe anchor id. Used both to stamp
 * `id`s onto rendered headings and to build the matching TOC hrefs.
 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, " ") // strip any inline html (links/bold inside headings)
    .replace(/&[a-z]+;|&#\d+;/gi, " ") // strip html entities (&mdash;, &amp;, …)
    .replace(/[^\w\s-]/g, "") // drop punctuation
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function TocLinks({
  headings,
  keyPrefix,
}: {
  headings: readonly TocHeading[];
  keyPrefix: string;
}) {
  return (
    <ul className="space-y-1.5 text-sm">
      {headings.map((h) => (
        <li key={`${keyPrefix}-${h.id}`} className={h.level === 3 ? "pl-3.5" : ""}>
          <a
            href={`#${h.id}`}
            className={`block leading-snug transition-colors hover:text-deep ${
              h.level === 3 ? "text-muted dark:text-stone-400" : "text-secondary"
            }`}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * Renders BOTH wayfinding affordances and lets responsive utilities decide
 * which is visible:
 *  - `<details>` "in this article" disclosure, in normal flow, up to 2xl.
 *  - A sticky rail in the right margin at 2xl+ (absolutely positioned so it
 *    never shrinks the reading column). The parent must be `relative`.
 *
 * Gated at 2xl because both blog and guides render inside AppShell, whose
 * sidebar (260px) eats the margin space a rail would otherwise use at xl.
 */
export function TableOfContents({
  headings,
  label = "In this article",
}: {
  headings: readonly TocHeading[];
  label?: string;
}) {
  // Not worth a TOC for short pages.
  if (headings.length < 3) return null;

  return (
    <>
      {/* Mobile → large-desktop: collapsible disclosure, in flow. */}
      <details className="group mb-10 rounded-xl border border-stone-200/60 bg-[#faf8f5] dark:border-[var(--border-default)] dark:bg-[#252420] 2xl:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 font-sans text-sm font-medium text-primary [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-2">
            <List className="h-4 w-4 text-deep" strokeWidth={1.75} />
            {label}
          </span>
          <ChevronDown className="h-4 w-4 text-muted dark:text-stone-400 transition-transform duration-200 group-open:rotate-180" />
        </summary>
        <nav aria-label="Table of contents" className="px-4 pb-4 pt-1">
          <TocLinks headings={headings} keyPrefix="m" />
        </nav>
      </details>

      {/* Wide desktop (2xl+): sticky rail in the right margin. */}
      <div className="pointer-events-none absolute left-full top-0 hidden h-full 2xl:block">
        <nav
          aria-label="Table of contents"
          className="pointer-events-auto sticky top-24 ml-6 max-h-[calc(100vh-8rem)] w-52 overflow-y-auto"
        >
          <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-wide text-muted dark:text-stone-400">
            On this page
          </p>
          <TocLinks headings={headings} keyPrefix="d" />
        </nav>
      </div>
    </>
  );
}
