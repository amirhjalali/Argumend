"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { confidenceTier } from "@/lib/schemas/topic";

// ---------------------------------------------------------------------------
// Types — kept minimal; the server component does the topic→category mapping
// and passes already-grouped data so this stays a thin interactivity layer.
// ---------------------------------------------------------------------------

export interface IsEntry {
  slug: string;
  question: string;
  confidence: number;
}

export interface IsCategoryGroup {
  /** Existing category id from data/topics (e.g. "policy") — also the anchor id. */
  id: string;
  /** Human label from CATEGORY_LABELS (e.g. "Policy"). */
  label: string;
  entries: IsEntry[];
}

type SortMode = "category" | "settled" | "unsettled";

/** Tier → tone classes (teal = settled, stone = thin). No amber per design system. */
function tierTone(pct: number): string {
  const tier = confidenceTier(pct);
  if (tier === "Established") return "bg-deep/10 text-deep border-deep/20";
  if (tier === "Strong") return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
  if (tier === "Contested") return "bg-rust-50 text-rust-700 border-rust-200/60";
  return "bg-stone-100 text-stone-600 border-stone-200/60";
}

const inputClass =
  "rounded-lg border border-stone-300 bg-panel py-2.5 font-sans text-sm text-primary focus:border-deep focus:outline-none focus:ring-1 focus:ring-deep dark:border-[#3d3a36]";

interface IsHubClientProps {
  groups: IsCategoryGroup[];
  totalCount: number;
}

/**
 * Client interactivity layer for the /is hub.
 *
 * SSR note: the initial state (empty query, "all" category, "category" sort)
 * renders every group with every entry in natural order — so the server-rendered
 * HTML still contains all questions for crawlers. Filtering/sorting only kicks in
 * after hydration via local state; nothing is hidden at first paint.
 */
export function IsHubClient({ groups, totalCount }: IsHubClientProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortMode>("category");

  const normalizedQuery = query.trim().toLowerCase();

  const visibleGroups = useMemo(() => {
    return groups
      .filter((g) => category === "all" || g.id === category)
      .map((g) => {
        let entries = g.entries;
        if (normalizedQuery) {
          entries = entries.filter((e) =>
            e.question.toLowerCase().includes(normalizedQuery),
          );
        }
        if (sort !== "category") {
          entries = [...entries].sort((a, b) =>
            sort === "settled"
              ? b.confidence - a.confidence
              : a.confidence - b.confidence,
          );
        }
        return { ...g, entries };
      })
      .filter((g) => g.entries.length > 0);
  }, [groups, category, normalizedQuery, sort]);

  const shownCount = visibleGroups.reduce((n, g) => n + g.entries.length, 0);
  const isFiltering = normalizedQuery !== "" || category !== "all";
  const showJumpNav = category === "all" && visibleGroups.length > 1;

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setSort("category");
  };

  return (
    <>
      {/* Sticky toolbar: search + category filter + sort, with a jump-nav row */}
      <div className="sticky top-0 z-30 -mx-4 mb-6 border-b border-stone-200/80 bg-canvas px-4 py-3 dark:border-[#3d3a36] sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search */}
          <div className="relative min-w-[12rem] flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <label htmlFor="is-search" className="sr-only">
              Search questions
            </label>
            <input
              id="is-search"
              type="search"
              value={query}
              onInput={(e) => setQuery(e.currentTarget.value)}
              placeholder="Search questions…"
              className={`${inputClass} w-full pl-9 pr-9 placeholder:text-muted`}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-stone-100 hover:text-primary dark:hover:bg-[#302e2a]"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Category filter — reuses existing category ids from the data */}
          <label htmlFor="is-category" className="sr-only">
            Filter by category
          </label>
          <select
            id="is-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`${inputClass} pl-3 pr-8`}
          >
            <option value="all">All categories</option>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.label}
              </option>
            ))}
          </select>

          {/* Sort by confidence */}
          <label htmlFor="is-sort" className="sr-only">
            Sort questions
          </label>
          <select
            id="is-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortMode)}
            className={`${inputClass} pl-3 pr-8`}
          >
            <option value="category">Sort: by category</option>
            <option value="settled">Sort: most settled first</option>
            <option value="unsettled">Sort: least settled first</option>
          </select>
        </div>

        {/* Sticky category jump-nav — anchor links to existing section ids */}
        {showJumpNav && (
          <nav
            aria-label="Jump to category"
            className="mt-2.5 flex items-center gap-2 overflow-x-auto pb-0.5 text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <span className="flex-shrink-0 font-sans text-xs text-muted">Jump to</span>
            {visibleGroups.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="flex-shrink-0 rounded-full border border-stone-200 bg-panel px-3 py-1 font-sans text-[13px] text-secondary transition-colors hover:border-deep/40 hover:text-deep dark:border-[#3d3a36]"
              >
                {g.label}
              </a>
            ))}
          </nav>
        )}
      </div>

      {/* Result count */}
      <p className="mb-6 font-sans text-sm text-muted" aria-live="polite">
        {isFiltering
          ? `Showing ${shownCount} of ${totalCount} questions`
          : `${totalCount} questions`}
      </p>

      {/* Sections (or friendly empty state) */}
      {visibleGroups.length === 0 ? (
        <div className="surface-card px-6 py-14 text-center">
          <p className="font-serif text-lg text-primary">
            No questions match &ldquo;{query.trim()}&rdquo;.
          </p>
          <p className="mt-2 font-sans text-sm text-secondary">
            Try a different term or clear the filters to see all {totalCount} questions.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 inline-flex items-center gap-2 rounded-lg border border-deep/30 px-4 py-2 font-sans text-sm font-medium text-deep transition-colors hover:bg-deep/5"
          >
            Clear filters
          </button>
        </div>
      ) : (
        visibleGroups.map((g) => (
          <section key={g.id} id={g.id} className="mt-12 scroll-mt-32 first:mt-0">
            <div className="mb-5 flex items-baseline justify-between border-b border-stone-200 pb-3 dark:border-[#3d3a36]">
              <h2 className="font-serif text-2xl font-bold text-primary">{g.label}</h2>
              <span className="font-sans text-sm text-muted">
                {g.entries.length} {g.entries.length === 1 ? "question" : "questions"}
              </span>
            </div>

            <ul className="list-none space-y-2 p-0">
              {g.entries.map((e) => (
                <li key={e.slug}>
                  <Link
                    href={`/is/${e.slug}`}
                    className="surface-card card-hover flex items-center justify-between gap-4 rounded-lg border border-stone-200/70 px-4 py-3 transition-colors dark:border-[#3d3a36]"
                  >
                    <span className="font-serif text-[17px] leading-snug text-primary">
                      {e.question}
                    </span>
                    <span
                      className={`flex-shrink-0 rounded-full border px-2 py-0.5 font-mono text-[11px] ${tierTone(e.confidence)}`}
                      title={`Confidence ${e.confidence}/100 — ${confidenceTier(e.confidence)}`}
                    >
                      {e.confidence}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </>
  );
}
