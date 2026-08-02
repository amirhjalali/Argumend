"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { BalanceWeightChip } from "@/components/BalanceWeightChip";
import type { Verdict } from "@/lib/schemas/topic";

// ---------------------------------------------------------------------------
// Types — kept minimal; the server component does the topic→category mapping
// and passes already-grouped data so this stays a thin interactivity layer.
// ---------------------------------------------------------------------------

export interface IsEntry {
  slug: string;
  question: string;
  balance: number;
  weight: number;
  verdict: Verdict;
}

export interface IsCategoryGroup {
  /** Existing category id from data/topics (e.g. "policy") — also the anchor id. */
  id: string;
  /** Human label from CATEGORY_LABELS (e.g. "Policy"). */
  label: string;
  entries: IsEntry[];
}

type SortMode = "category" | "most_evidence" | "least_evidence";

const inputClass =
  "min-h-11 rounded-lg border border-stone-300 bg-panel py-2.5 font-sans text-sm text-primary dark:text-stone-200 focus:border-deep focus:outline-none focus:ring-1 focus:ring-deep dark:border-[#3d3a36] dark:focus:border-teal-400 dark:focus:ring-teal-400";

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
  const hasMounted = useRef(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const restoreControlsFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const nextCategory = params.get("category") ?? "all";
      const nextSort = params.get("sort") ?? "category";
      setQuery(params.get("q") ?? "");
      setCategory(
        nextCategory === "all" || groups.some((group) => group.id === nextCategory)
          ? nextCategory
          : "all",
      );
      setSort(
        nextSort === "most_evidence" || nextSort === "least_evidence"
          ? nextSort
          : "category",
      );
    };
    restoreControlsFromUrl();
    window.addEventListener("popstate", restoreControlsFromUrl);
    return () => window.removeEventListener("popstate", restoreControlsFromUrl);
  }, [groups]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    const params = new URLSearchParams(window.location.search);
    if (query.trim()) params.set("q", query.trim());
    else params.delete("q");
    if (category !== "all") params.set("category", category);
    else params.delete("category");
    if (sort !== "category") params.set("sort", sort);
    else params.delete("sort");
    const search = params.toString();
    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${search ? `?${search}` : ""}${window.location.hash}`,
    );
  }, [category, query, sort]);

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
            sort === "most_evidence"
              ? b.weight - a.weight
              : a.weight - b.weight,
          );
        }
        return { ...g, entries };
      })
      .filter((g) => g.entries.length > 0);
  }, [groups, category, normalizedQuery, sort]);

  const shownCount = visibleGroups.reduce((n, g) => n + g.entries.length, 0);
  const isFiltering = normalizedQuery !== "" || category !== "all";
  const hasControlChanges = isFiltering || sort !== "category";
  const showJumpNav = category === "all" && visibleGroups.length > 1;

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setSort("category");
    requestAnimationFrame(() => searchInputRef.current?.focus());
  };

  const clearSearch = () => {
    setQuery("");
    requestAnimationFrame(() => searchInputRef.current?.focus());
  };

  return (
    <>
      {/* Sticky toolbar: search + category filter + sort, with a jump-nav row */}
      <div className="sticky top-0 z-30 -mx-4 mb-6 border-b border-stone-200/80 bg-canvas px-4 py-3 dark:border-[#3d3a36] sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search */}
          <div className="relative min-w-[12rem] flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted dark:text-stone-400"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <label htmlFor="is-search" className="sr-only">
              Search questions
            </label>
            <input
              ref={searchInputRef}
              id="is-search"
              type="search"
              value={query}
              onInput={(e) => setQuery(e.currentTarget.value)}
              placeholder="Search questions…"
              className={`${inputClass} w-full pl-9 pr-12 placeholder:text-muted dark:placeholder:text-stone-500`}
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition-colors hover:bg-stone-100 hover:text-primary dark:text-stone-400 dark:hover:bg-[#302e2a] dark:hover:text-stone-200"
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

          {/* Sort by evidential weight */}
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
            <option value="most_evidence">Sort: most evidence first</option>
            <option value="least_evidence">Sort: least evidence first</option>
          </select>

          {hasControlChanges && visibleGroups.length > 0 && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-stone-300 px-3 py-2 text-sm font-medium text-deep transition-colors hover:bg-deep/5 dark:border-[#3d3a36] dark:text-teal-300 dark:hover:bg-teal-400/10"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              Clear filters
            </button>
          )}
        </div>

        {/* Sticky category jump-nav — anchor links to existing section ids */}
        {showJumpNav && (
          <nav
            aria-label="Jump to category"
            className="mt-2.5 flex items-center gap-2 overflow-x-auto pb-0.5 text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <span className="flex-shrink-0 font-sans text-xs text-muted dark:text-stone-400">Jump to</span>
            {visibleGroups.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="inline-flex min-h-11 flex-shrink-0 items-center rounded-full border border-stone-200 bg-panel px-3 py-2 font-sans text-[13px] text-secondary dark:text-stone-400 transition-colors hover:border-deep/40 hover:text-deep dark:border-[#3d3a36] dark:hover:border-teal-400/60 dark:hover:text-teal-300"
              >
                {g.label}
              </a>
            ))}
          </nav>
        )}
      </div>

      {/* Result count */}
      <p className="mb-6 font-sans text-sm text-muted dark:text-stone-400" aria-live="polite" aria-atomic="true">
        {isFiltering
          ? `Showing ${shownCount} of ${totalCount} questions`
          : `${totalCount} questions`}
      </p>

      {/* Sections (or friendly empty state) */}
      {visibleGroups.length === 0 ? (
        <div className="surface-card px-6 py-14 text-center">
          <p className="font-serif text-lg text-primary dark:text-stone-200">
            No questions match &ldquo;{query.trim()}&rdquo;.
          </p>
          <p className="mt-2 font-sans text-sm text-secondary dark:text-stone-400">
            Try a different term or clear the filters to see all {totalCount} questions.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg border border-deep/30 px-4 py-2 font-sans text-sm font-medium text-deep transition-colors hover:bg-deep/5"
          >
            Clear filters
          </button>
        </div>
      ) : (
        visibleGroups.map((g) => (
          <section key={g.id} id={g.id} className="mt-12 scroll-mt-32 first:mt-0">
            <div className="mb-5 flex items-baseline justify-between border-b border-stone-200 pb-3 dark:border-[#3d3a36]">
              <h2 className="font-serif text-2xl font-bold text-primary dark:text-stone-200">{g.label}</h2>
              <span className="font-sans text-sm text-muted dark:text-stone-400">
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
                    <span className="font-serif text-[17px] leading-snug text-primary dark:text-stone-200">
                      {e.question}
                    </span>
                    <BalanceWeightChip
                      balance={e.balance}
                      weight={e.weight}
                      verdict={e.verdict}
                      showLabel
                      className="flex-shrink-0"
                    />
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
