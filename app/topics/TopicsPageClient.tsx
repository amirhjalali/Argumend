"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ChevronRight, X } from "lucide-react";
import { topicSummaries, CATEGORY_LABELS, CATEGORY_ORDER } from "@/data/topicIndex";
import type { TopicCategory, TopicStatus } from "@/data/topicIndex";
import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { CollectionPagination } from "@/components/CollectionPagination";
import { paginate, TOPICS_PAGE_SIZE } from "@/lib/collectionPagination";
import { DEFAULT_SORT, mixCategories } from "./_query";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export type SortOption = "mixed" | "category" | "weight-desc" | "contested" | "balance-desc" | "balance-asc" | "title-asc";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "mixed", label: "Mixed categories" },
  { value: "category", label: "By category" },
  { value: "weight-desc", label: "Most settled" },
  { value: "contested", label: "Most contested" },
  { value: "balance-desc", label: "Strongest for" },
  { value: "balance-asc", label: "Strongest against" },
  { value: "title-asc", label: "Alphabetical" },
];

const ALL_STATUSES: TopicStatus[] = ["settled", "contested", "highly_speculative"];

const STATUS_LABELS: Record<TopicStatus, string> = {
  settled: "Settled",
  contested: "Contested",
  highly_speculative: "Speculative",
};

// Default balance bounds — values outside [DEFAULT_MIN, DEFAULT_MAX] count as
// an active filter and get reflected in the URL.
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
export type TopicsQueryState = {
  category: TopicCategory | "all";
  statuses: TopicStatus[];
  minBalance: number;
  maxBalance: number;
  search: string;
  sort: SortOption;
  page: number;
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TopicsPageClient({
  initialState,
  featured,
}: {
  initialState: TopicsQueryState;
  /** Server-rendered "start here" maps, shown inside the shell under the intro. */
  featured?: React.ReactNode;
}) {
  const [activeCategory, setActiveCategory] = useState<TopicCategory | "all">(initialState.category);
  const [activeStatuses, setActiveStatuses] = useState<Set<TopicStatus>>(() => new Set(initialState.statuses));
  const [minBalance, setMinBalance] = useState(initialState.minBalance);
  const [maxBalance, setMaxBalance] = useState(initialState.maxBalance);
  const [search, setSearch] = useState(initialState.search);
  const [sortBy, setSortBy] = useState<SortOption>(initialState.sort);
  const [page, setPage] = useState(initialState.page);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredTopics = useMemo(() => {
    let filtered = [...topicSummaries];

    // Category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter((t) => t.category === activeCategory);
    }

    // Status filter (multi-select; empty set means "any status")
    if (activeStatuses.size > 0) {
      filtered = filtered.filter((t) => activeStatuses.has(t.status));
    }

    // Balance-range filter
    if (minBalance > DEFAULT_MIN || maxBalance < DEFAULT_MAX) {
      filtered = filtered.filter(
        (t) =>
          t.balance >= minBalance &&
          t.balance <= maxBalance
      );
    }

    // Search filter
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.meta_claim.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === "mixed") return mixCategories(filtered);
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "category": {
          const catDiff =
            CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category);
          if (catDiff !== 0) return catDiff;
          return b.weight - a.weight;
        }
        case "weight-desc":
          return b.weight - a.weight;
        case "contested":
          // most contested = well-evidenced AND balanced: small lean first, weight breaks ties
          return (
            Math.abs(a.balance - 50) - Math.abs(b.balance - 50) || b.weight - a.weight
          );
        case "balance-desc":
          return b.balance - a.balance;
        case "balance-asc":
          return a.balance - b.balance;
        case "title-asc":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [activeCategory, activeStatuses, minBalance, maxBalance, search, sortBy]);

  const pagination = useMemo(
    () => paginate(filteredTopics, page, TOPICS_PAGE_SIZE),
    [filteredTopics, page],
  );
  const visiblePage = pagination.isOutOfRange ? 1 : pagination.page;
  const visiblePagination = pagination.isOutOfRange
    ? paginate(filteredTopics, 1, TOPICS_PAGE_SIZE)
    : pagination;
  const paginationParams = useMemo(() => {
    const params = new URLSearchParams();
    if (activeCategory !== "all") params.set("category", activeCategory);
    if (activeStatuses.size > 0) {
      params.set("status", ALL_STATUSES.filter((status) => activeStatuses.has(status)).join(","));
    }
    if (minBalance > DEFAULT_MIN) params.set("min", String(minBalance));
    if (maxBalance < DEFAULT_MAX) params.set("max", String(maxBalance));
    if (sortBy !== DEFAULT_SORT) params.set("sort", sortBy);
    if (search.trim()) params.set("q", search.trim());
    return params;
  }, [activeCategory, activeStatuses, minBalance, maxBalance, sortBy, search]);

  // Count per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: topicSummaries.length };
    for (const cat of CATEGORY_ORDER) {
      counts[cat] = topicSummaries.filter((t) => t.category === cat).length;
    }
    return counts;
  }, []);

  const toggleStatus = (status: TopicStatus) => {
    setPage(1);
    setActiveStatuses((prev) => {
      const next = new Set(prev);
      if (next.has(status)) next.delete(status);
      else next.add(status);
      return next;
    });
  };

  const chooseCategory = (category: TopicCategory | "all") => {
    setPage(1);
    setActiveCategory(category);
  };

  const updateSearch = (value: string) => {
    setPage(1);
    setSearch(value);
  };

  const clearFilters = () => {
    setPage(1);
    setActiveCategory("all");
    setActiveStatuses(new Set());
    setMinBalance(DEFAULT_MIN);
    setMaxBalance(DEFAULT_MAX);
    setSearch("");
    requestAnimationFrame(() => searchInputRef.current?.focus());
  };

  const clearSearch = () => {
    updateSearch("");
    requestAnimationFrame(() => searchInputRef.current?.focus());
  };

  const hasFilters =
    activeCategory !== "all" ||
    activeStatuses.size > 0 ||
    minBalance > DEFAULT_MIN ||
    maxBalance < DEFAULT_MAX ||
    search.trim().length > 0;
  const advancedFilterCount =
    (activeCategory !== "all" ? 1 : 0) +
    activeStatuses.size +
    (minBalance > DEFAULT_MIN || maxBalance < DEFAULT_MAX ? 1 : 0);

  // The server seeds state from the query string, so page/filter URLs render
  // useful no-JS HTML. Interactive changes remain shallow and shareable.
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeCategory !== "all") params.set("category", activeCategory);
    if (activeStatuses.size > 0) {
      params.set("status", ALL_STATUSES.filter((s) => activeStatuses.has(s)).join(","));
    }
    if (minBalance > DEFAULT_MIN) params.set("min", String(minBalance));
    if (maxBalance < DEFAULT_MAX) params.set("max", String(maxBalance));
    if (sortBy !== DEFAULT_SORT) params.set("sort", sortBy);
    if (search.trim()) params.set("q", search.trim());
    if (visiblePage > 1) params.set("page", String(visiblePage));

    const qs = params.toString();
    window.history.replaceState(
      null,
      "",
      qs ? `${window.location.pathname}?${qs}` : window.location.pathname
    );
  }, [activeCategory, activeStatuses, minBalance, maxBalance, sortBy, search, visiblePage]);

  const topicsJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Explore Topics",
      description: `${topicSummaries.length} topics mapped across ${CATEGORY_ORDER.length} categories. Each one structured with steel-man arguments, weighted evidence, and crux questions.`,
      url: "https://argumend.org/topics",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: filteredTopics.length,
        itemListElement: visiblePagination.items.map((topic, index) => ({
          "@type": "ListItem",
          position: visiblePagination.startIndex + index + 1,
          name: topic.title,
          url: `https://argumend.org/topics/${topic.id}`,
          description: topic.meta_claim,
        })),
      },
    }),
    [filteredTopics.length, visiblePagination]
  );

  // Group the visible page by category when the list is sorted that way, so a
  // reader scanning 24 rows sees where Policy ends and Technology begins
  // instead of a category pill repeated on every card.
  const grouped = sortBy === "category" && activeCategory === "all";
  const groups = useMemo(() => {
    if (!grouped) return [{ category: null as TopicCategory | null, topics: visiblePagination.items }];
    const out: { category: TopicCategory | null; topics: typeof visiblePagination.items }[] = [];
    for (const topic of visiblePagination.items) {
      const last = out[out.length - 1];
      if (last && last.category === topic.category) last.topics.push(topic);
      else out.push({ category: topic.category, topics: [topic] });
    }
    return out;
  }, [grouped, visiblePagination]);

  const tabClass = (active: boolean) =>
    `relative inline-flex min-h-11 shrink-0 items-center gap-1 whitespace-nowrap px-1 text-sm transition-colors after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-full ${
      active
        ? "font-medium text-primary dark:text-stone-200 after:bg-deep dark:after:bg-[#8bb5b1]"
        : "text-secondary dark:text-stone-400 after:bg-transparent hover:text-primary dark:hover:text-stone-200"
    }`;

  return (
    <AppShell>
      <JsonLd data={topicsJsonLd} />
      <div className="min-h-[100svh] bg-transparent px-4 md:px-8">
        <div className="mx-auto max-w-5xl py-8 sm:py-12">
          {/* Header */}
          <div className="mb-10 md:mb-14">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Topics" },
              ]}
            />
            <h1 className="mb-4 font-serif text-[2.5rem] leading-[1.05] tracking-[-0.015em] text-primary dark:text-stone-200 sm:text-[3.25rem]">
              Explore topics
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-secondary dark:text-stone-400 sm:text-lg">
              {topicSummaries.length} questions across {CATEGORY_ORDER.length} categories.
              Each map sets out the strongest case on every side, the evidence
              and how much it weighs, and the cruxes that would settle it.
            </p>
          </div>

          {/* The "start here" maps span categories, so they sit above the
              unfiltered list only. Under a category filter they would lead a
              page they do not belong to. */}
          {activeCategory === "all" && featured}

          {/* Category tabs: one quiet row at every width. On phones it scrolls
              sideways inside its own strip instead of wrapping into a wall of
              pills. */}
          <nav aria-label="Topic categories" className="-mx-4 border-b border-stone-300/70 px-4 dark:border-divider sm:mx-0 sm:px-0">
            <div className="flex gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <Link
                href="/topics"
                onClick={(event) => { event.preventDefault(); chooseCategory("all"); }}
                aria-current={activeCategory === "all" ? "page" : undefined}
                className={tabClass(activeCategory === "all")}
              >
                All <span className="tabular-nums text-muted">({categoryCounts.all})</span>
              </Link>
              {CATEGORY_ORDER.map((cat) => (
                <Link
                  key={cat}
                  href={`/topics?category=${cat}`}
                  onClick={(event) => { event.preventDefault(); chooseCategory(cat); }}
                  aria-current={activeCategory === cat ? "page" : undefined}
                  className={tabClass(activeCategory === cat)}
                >
                  {CATEGORY_LABELS[cat]} <span className="tabular-nums text-muted">({categoryCounts[cat]})</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Search + sort */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted dark:text-stone-400" aria-hidden="true" />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => updateSearch(e.target.value)}
                placeholder="Search by title or claim"
                aria-label="Search topics"
                className="min-h-11 w-full rounded-lg border border-stone-300/80 bg-card py-2.5 pl-9 pr-12 text-base text-primary dark:text-stone-200 placeholder:text-muted/80 focus:border-deep/50 focus:outline-none focus:ring-2 focus:ring-deep/20 dark:border-divider dark:placeholder:text-stone-500 sm:text-sm"
              />
              {search && (
                <button
                  onClick={clearSearch}
                  className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg text-muted hover:text-primary dark:text-stone-400 dark:hover:text-stone-200"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="topics-sort-select" className="whitespace-nowrap text-sm text-secondary dark:text-stone-400">Sort:</label>
              <select
                id="topics-sort-select"
                value={sortBy}
                onChange={(e) => { setPage(1); setSortBy(e.target.value as SortOption); }}
                className="min-h-11 flex-1 rounded-lg border border-stone-300/80 bg-card px-3 py-2.5 text-sm text-primary dark:text-stone-200 focus:border-deep/50 focus:outline-none focus:ring-2 focus:ring-deep/20 dark:border-divider sm:flex-none"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status and balance are occasional tools, so they wait behind one
              disclosure at every width instead of taking three rows above the
              list. */}
          <details className="group mt-3">
            <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-lg text-sm text-secondary dark:text-stone-400 hover:text-primary dark:hover:text-stone-200 marker:content-none [&::-webkit-details-marker]:hidden">
              <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" aria-hidden="true" />
              <span>Filters</span>
              <span className="hidden text-muted sm:inline">status, evidence balance</span>
              {advancedFilterCount > 0 && (
                <span
                  className="rounded-full bg-deep/10 px-2 py-0.5 text-xs font-medium text-deep dark:bg-[#8bb5b1]/15 dark:text-[#8bb5b1]"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {advancedFilterCount} active
                </span>
              )}
            </summary>
            <div className="mt-2 grid gap-6 rounded-lg border border-stone-300/70 p-4 dark:border-divider sm:grid-cols-2 sm:p-5">
              <fieldset>
                <legend className="mb-2 text-sm font-medium text-primary dark:text-stone-200">Status</legend>
                <div className="flex flex-wrap gap-2">
                  {ALL_STATUSES.map((status) => {
                    const active = activeStatuses.has(status);
                    return (
                      <button
                        key={status}
                        onClick={() => toggleStatus(status)}
                        aria-pressed={active}
                        className={`inline-flex min-h-11 items-center rounded-lg border px-3.5 text-sm transition-colors ${
                          active
                            ? "border-deep bg-deep/10 font-medium text-deep dark:border-[#8bb5b1] dark:bg-[#8bb5b1]/15 dark:text-[#8bb5b1]"
                            : "border-stone-300/80 text-secondary dark:text-stone-400 hover:border-deep/40 hover:text-primary dark:border-divider dark:hover:text-stone-200"
                        }`}
                      >
                        {STATUS_LABELS[status]}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset>
                <legend className="mb-1 flex w-full items-baseline justify-between text-sm font-medium text-primary dark:text-stone-200">
                  <span>Evidence balance</span>
                  <span className="text-xs font-normal tabular-nums text-secondary dark:text-stone-400">
                    {minBalance}&ndash;{maxBalance}
                  </span>
                </legend>
                <p className="mb-1 text-xs text-muted">
                  0 leans against the claim, 100 leans toward it.
                </p>
                <label className="flex items-center gap-3 text-xs text-secondary dark:text-stone-400">
                  <span className="w-8">Min</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={minBalance}
                    onChange={(e) => { setPage(1); setMinBalance(Math.min(Number(e.target.value), maxBalance)); }}
                    aria-label="Minimum balance"
                    className="h-11 flex-1 cursor-pointer bg-transparent accent-deep"
                  />
                </label>
                <label className="flex items-center gap-3 text-xs text-secondary dark:text-stone-400">
                  <span className="w-8">Max</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={maxBalance}
                    onChange={(e) => { setPage(1); setMaxBalance(Math.max(Number(e.target.value), minBalance)); }}
                    aria-label="Maximum balance"
                    className="h-11 flex-1 cursor-pointer bg-transparent accent-deep"
                  />
                </label>
              </fieldset>
            </div>
          </details>

          {/* Results info */}
          <div className="mt-2 flex min-h-11 items-center justify-between gap-4">
            <p className="text-sm text-secondary dark:text-stone-400" role="status" aria-live="polite" aria-atomic="true">
              Showing{" "}
              <span className="font-medium text-primary dark:text-stone-200">
                {visiblePagination.items.length > 0
                  ? `${visiblePagination.startIndex + 1}–${visiblePagination.endIndex}`
                  : "0"}
              </span>{" "}
              of {filteredTopics.length} matching topics{hasFilters ? ` (${topicSummaries.length} total)` : ""}
            </p>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-2 text-sm text-secondary dark:text-stone-400 transition-colors hover:text-primary dark:hover:text-stone-200"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                Clear filters
              </button>
            )}
          </div>

          {/* Topic list */}
          {filteredTopics.length === 0 ? (
            <div className="mt-6 border-t border-stone-300/70 py-16 text-center dark:border-divider">
              <p className="font-serif text-2xl text-primary dark:text-stone-200">No topics match these filters</p>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-secondary dark:text-stone-400">
                Try a wider balance range or another status, or clear the
                filters to see all {topicSummaries.length} topics.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-deep hover:text-deep-dark dark:text-[#8bb5b1]"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="mt-4">
              {groups.map((group) => {
                const TitleTag = group.category ? "h3" : "h2";
                return (
                  <section
                    key={group.category ?? "all"}
                    aria-labelledby={group.category ? `topics-group-${group.category}` : undefined}
                    className={group.category ? "mt-8 first:mt-4" : undefined}
                  >
                    {group.category && (
                      <div className="flex items-baseline justify-between gap-4 pb-1">
                        <h2
                          id={`topics-group-${group.category}`}
                          className="font-serif text-2xl text-primary dark:text-stone-200"
                        >
                          {CATEGORY_LABELS[group.category]}
                        </h2>
                        <span className="text-xs tabular-nums text-muted">
                          {categoryCounts[group.category]} topics
                        </span>
                      </div>
                    )}
                    <ul className="grid gap-x-12 lg:grid-cols-2">
                      {group.topics.map((topic) => (
                        <li key={topic.id} className="border-t border-stone-300/70 dark:border-divider">
                          <Link
                            href={`/topics/${topic.id}`}
                            className="group block py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-deep/50"
                          >
                            <TitleTag className="font-serif text-[1.3125rem] leading-snug text-primary dark:text-stone-200 transition-colors group-hover:text-deep dark:group-hover:text-[#8bb5b1]">
                              {topic.title}
                            </TitleTag>
                            <p className="mt-1.5 line-clamp-2 text-[0.9375rem] leading-relaxed text-secondary dark:text-stone-400">
                              {topic.meta_claim}
                            </p>
                            <p className="mt-2 flex flex-wrap gap-x-4 text-[0.8125rem] text-muted">
                              {!group.category && <span>{CATEGORY_LABELS[topic.category]}</span>}
                              <span>{STATUS_LABELS[topic.status]}</span>
                              <span>
                                {topic.pillarCount} {topic.pillarCount === 1 ? "pillar" : "pillars"},{" "}
                                {topic.evidenceCount} evidence {topic.evidenceCount === 1 ? "card" : "cards"}
                              </span>
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          )}

          <CollectionPagination
            basePath="/topics"
            currentPage={visiblePage}
            pageCount={visiblePagination.pageCount}
            params={paginationParams}
            label="Topics"
          />
        </div>
      </div>
    </AppShell>
  );
}
