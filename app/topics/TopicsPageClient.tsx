"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import {
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Search,
  SearchX,
  ChevronRight,
  X,
} from "lucide-react";
import { topicSummaries, CATEGORY_LABELS, CATEGORY_ORDER } from "@/data/topicIndex";
import type { TopicCategory, TopicStatus } from "@/data/topicIndex";
import { categoryColors, statusColors, categoryTopBorder } from "@/lib/categoryColors";
import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { BalanceWeightChip } from "@/components/BalanceWeightChip";
import { getCollectionItemPresentation } from "@/lib/collectionStyles";
import { CollectionPagination } from "@/components/CollectionPagination";
import { paginate, TOPICS_PAGE_SIZE } from "@/lib/collectionPagination";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const statusIcons: Record<TopicStatus, typeof CheckCircle> = {
  settled: CheckCircle,
  contested: AlertCircle,
  highly_speculative: HelpCircle,
};

type SortOption = "category" | "weight-desc" | "contested" | "balance-desc" | "balance-asc" | "title-asc";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
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

export default function TopicsPageClient({ initialState }: { initialState: TopicsQueryState }) {
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
    if (sortBy !== "category") params.set("sort", sortBy);
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
    if (sortBy !== "category") params.set("sort", sortBy);
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

  return (
    <AppShell>
      <JsonLd data={topicsJsonLd} />
      <div className="min-h-[100svh] bg-transparent">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header */}
          <div className="mb-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Topics" },
              ]}
            />
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary dark:text-stone-200 mb-6 leading-[1.08]">
              Explore Topics
            </h1>
            <p className="text-lg text-secondary dark:text-stone-400 leading-relaxed max-w-2xl">
              <span className="font-mono text-stone-700 dark:text-stone-300">{topicSummaries.length}</span> topics
              mapped across {CATEGORY_ORDER.length} categories. Each one structured with
              steel-man arguments, weighted evidence, and crux questions.
            </p>
          </div>

          {/* Mobile: keep discovery controls available without pushing every
              topic card below a full screen of chips and sliders. */}
          <details className="group sm:hidden mb-4 rounded-xl border border-stone-200/60 dark:border-[var(--border-default)] bg-white/80 dark:bg-[var(--bg-card)]">
            <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-stone-700 dark:text-stone-200 marker:content-none">
              <span>Filters</span>
              <span className="flex items-center gap-2">
                {advancedFilterCount > 0 && (
                  <span
                    className="rounded-full bg-deep/10 px-2 py-0.5 text-xs font-mono text-deep"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {advancedFilterCount} active
                  </span>
                )}
                <ChevronRight className="h-4 w-4 text-stone-400 transition-transform group-open:rotate-90" />
              </span>
            </summary>
            <div className="space-y-5 border-t border-stone-200/50 dark:border-[var(--border-subtle)] px-4 py-4">
              <fieldset>
                <legend className="mb-2 text-xs font-medium text-stone-500">Category</legend>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/topics"
                    onClick={(event) => { event.preventDefault(); chooseCategory("all"); }}
                    aria-current={activeCategory === "all" ? "page" : undefined}
                    className={`min-h-11 rounded-full px-3 py-2 text-xs font-medium transition-all ${
                      activeCategory === "all"
                        ? "bg-deep text-white shadow-sm"
                        : "border border-stone-200/60 dark:border-[var(--border-default)] text-stone-500 dark:text-stone-400"
                    }`}
                  >
                    All ({categoryCounts.all})
                  </Link>
                  {CATEGORY_ORDER.map((cat) => (
                    <Link
                      key={cat}
                      href={`/topics?category=${cat}`}
                      onClick={(event) => { event.preventDefault(); chooseCategory(cat); }}
                      aria-current={activeCategory === cat ? "page" : undefined}
                      className={`min-h-11 rounded-full px-3 py-2 text-xs font-medium transition-all ${
                        activeCategory === cat
                          ? "bg-deep text-white shadow-sm"
                          : "border border-stone-200/60 dark:border-[var(--border-default)] text-stone-500 dark:text-stone-400"
                      }`}
                    >
                      {CATEGORY_LABELS[cat]} ({categoryCounts[cat]})
                    </Link>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="mb-2 text-xs font-medium text-stone-500">Status</legend>
                <div className="flex flex-wrap gap-2">
                  {ALL_STATUSES.map((status) => {
                    const StatusIcon = statusIcons[status];
                    const active = activeStatuses.has(status);
                    return (
                      <button
                        key={status}
                        onClick={() => toggleStatus(status)}
                        aria-pressed={active}
                        className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium ${
                          active
                            ? statusColors[status]
                            : "border-stone-200/60 dark:border-[var(--border-default)] text-stone-500 dark:text-stone-400"
                        }`}
                      >
                        <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
                        {STATUS_LABELS[status]}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="space-y-2">
                <legend className="text-xs font-medium text-stone-500">Evidence balance</legend>
                <div className="flex items-center justify-between font-mono text-xs text-stone-700 dark:text-stone-300">
                  <span>Counterclaim</span>
                  <span>{minBalance}&ndash;{maxBalance}%</span>
                  <span>Claim</span>
                </div>
                <label className="flex items-center gap-3 text-xs text-stone-500">
                  <span className="w-7">Min</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={minBalance}
                    onChange={(e) => { setPage(1); setMinBalance(Math.min(Number(e.target.value), maxBalance)); }}
                    aria-label="Minimum balance"
                    className="h-11 flex-1 cursor-pointer bg-transparent accent-deep"
                  />
                  <span className="w-9 text-right font-mono text-[11px] text-stone-700 dark:text-stone-300">{minBalance}%</span>
                </label>
                <label className="flex items-center gap-3 text-xs text-stone-500">
                  <span className="w-7">Max</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={maxBalance}
                    onChange={(e) => { setPage(1); setMaxBalance(Math.max(Number(e.target.value), minBalance)); }}
                    aria-label="Maximum balance"
                    className="h-11 flex-1 cursor-pointer bg-transparent accent-deep"
                  />
                  <span className="w-9 text-right font-mono text-[11px] text-stone-700 dark:text-stone-300">{maxBalance}%</span>
                </label>
              </fieldset>
            </div>
          </details>

          {/* Category Tabs */}
          <div className="hidden sm:flex flex-wrap gap-2 mb-6">
            <Link
              href="/topics"
              onClick={(event) => { event.preventDefault(); chooseCategory("all"); }}
              aria-current={activeCategory === "all" ? "page" : undefined}
              className={`px-4 py-2.5 min-h-[44px] rounded-full text-sm font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-deep text-white shadow-sm"
                  : "bg-white dark:bg-[var(--bg-card)] text-stone-500 dark:text-stone-400 border border-stone-200/60 dark:border-[var(--border-default)] hover:border-deep/30 dark:hover:border-deep/50 hover:text-stone-700 dark:hover:text-stone-300"
              }`}
            >
              All ({categoryCounts.all})
            </Link>
            {CATEGORY_ORDER.map((cat) => (
              <Link
                key={cat}
                href={`/topics?category=${cat}`}
                onClick={(event) => { event.preventDefault(); chooseCategory(cat); }}
                aria-current={activeCategory === cat ? "page" : undefined}
                className={`px-4 py-2.5 min-h-[44px] rounded-full text-sm font-medium transition-all capitalize ${
                  activeCategory === cat
                    ? "bg-deep text-white shadow-sm"
                    : "bg-white dark:bg-[var(--bg-card)] text-stone-500 dark:text-stone-400 border border-stone-200/60 dark:border-[var(--border-default)] hover:border-deep/30 dark:hover:border-deep/50 hover:text-stone-700 dark:hover:text-stone-300"
                }`}
              >
                {CATEGORY_LABELS[cat]} ({categoryCounts[cat]})
              </Link>
            ))}
          </div>

          {/* Search + Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted dark:text-stone-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => updateSearch(e.target.value)}
                placeholder="Search topics..."
                aria-label="Search topics"
                className="w-full pl-9 pr-12 py-2.5 min-h-[44px] text-base sm:text-sm bg-white dark:bg-[var(--bg-input)] border border-stone-200/60 dark:border-[var(--border-default)] rounded-lg text-stone-700 dark:text-[var(--text-primary)] placeholder-stone-400 dark:placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-deep/20 focus:border-deep/40"
              />
              {search && (
                <button
                  onClick={clearSearch}
                  className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center h-11 w-11 rounded-lg text-muted dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-[var(--bg-muted)] hover:text-stone-600"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="topics-sort-select" className="text-xs font-medium text-stone-500 whitespace-nowrap">Sort:</label>
              <select
                id="topics-sort-select"
                value={sortBy}
                onChange={(e) => { setPage(1); setSortBy(e.target.value as SortOption); }}
                className="text-sm px-3 py-2.5 min-h-[44px] rounded-lg border border-stone-200/60 dark:border-[var(--border-default)] bg-white dark:bg-[var(--bg-input)] text-stone-700 dark:text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-deep/20 focus:border-deep/40"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status + Balance filter row */}
          <div className="hidden sm:flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 mb-6">
            {/* Status chips (multi-select; none selected = any status) */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-stone-500 whitespace-nowrap">
                Status:
              </span>
              {ALL_STATUSES.map((status) => {
                const StatusIcon = statusIcons[status];
                const active = activeStatuses.has(status);
                return (
                  <button
                    key={status}
                    onClick={() => toggleStatus(status)}
                    aria-pressed={active}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-full text-xs font-medium border transition-all ${
                      active
                        ? statusColors[status]
                        : "bg-white dark:bg-[var(--bg-card)] text-stone-500 dark:text-stone-400 border-stone-200/60 dark:border-[var(--border-default)] hover:border-deep/30 dark:hover:border-deep/50 hover:text-stone-700 dark:hover:text-stone-300"
                    }`}
                  >
                    <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    {STATUS_LABELS[status]}
                  </button>
                );
              })}
            </div>

            {/* Balance range (dual slider) */}
            <div className="flex flex-col gap-1.5 w-full max-w-[260px] lg:ml-auto">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-500">Balance</span>
                <span className="font-mono text-xs tabular-nums text-stone-700 dark:text-stone-300">
                  {minBalance}&ndash;{maxBalance}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-stone-500 w-7 flex-shrink-0">Min</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={minBalance}
                  onChange={(e) =>
                    { setPage(1); setMinBalance(Math.min(Number(e.target.value), maxBalance)); }
                  }
                  aria-label="Minimum balance"
                  className="h-11 flex-1 cursor-pointer bg-transparent accent-deep"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-stone-500 w-7 flex-shrink-0">Max</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={maxBalance}
                  onChange={(e) =>
                    { setPage(1); setMaxBalance(Math.max(Number(e.target.value), minBalance)); }
                  }
                  aria-label="Maximum balance"
                  className="h-11 flex-1 cursor-pointer bg-transparent accent-deep"
                />
              </div>
            </div>
          </div>

          {/* Results info */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-stone-500" role="status" aria-live="polite" aria-atomic="true">
              Showing{" "}
              <span className="font-semibold text-stone-700 dark:text-stone-300">
                {visiblePagination.items.length > 0
                  ? `${visiblePagination.startIndex + 1}–${visiblePagination.endIndex}`
                  : "0"}
              </span>{" "}
              of {filteredTopics.length} matching topics ({topicSummaries.length} total)
            </p>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-stone-500 hover:bg-stone-100 hover:text-stone-600 transition-colors dark:hover:bg-[var(--bg-muted)]"
              >
                <X className="h-3.5 w-3.5" />
                Clear filters
              </button>
            )}
          </div>

          {/* Topic Grid */}
          {filteredTopics.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-[var(--bg-card)] rounded-xl border border-stone-200/60 dark:border-[var(--border-default)]">
              <SearchX className="h-10 w-10 text-stone-300 mx-auto mb-4" />
              <p className="text-stone-600 font-medium mb-1">No topics found</p>
              <p className="text-sm text-stone-500 mb-5 max-w-xs mx-auto">
                No topics match your current filters. Try widening the balance
                range, picking a different status, or clearing all filters to browse
                all {topicSummaries.length} topics.
              </p>
              <button
                onClick={clearFilters}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-deep hover:bg-deep/5 hover:text-deep-dark transition-colors"
              >
                <X className="h-3.5 w-3.5" />
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {visiblePagination.items.map((topic, index) => {
                const StatusIcon = statusIcons[topic.status];
                const presentation = getCollectionItemPresentation(index, {
                  intrinsicSize: "0 250px",
                });

                return (
                  <Link
                    key={topic.id}
                    href={`/topics/${topic.id}`}
                    className={`group flex flex-col bg-white dark:bg-[var(--bg-card)] border border-stone-200/60 dark:border-[var(--border-default)] border-t-[3px] rounded-xl p-5 pb-4 shadow-card hover:border-x-deep/30 hover:border-b-deep/30 dark:hover:border-x-deep/50 dark:hover:border-b-deep/50 hover:shadow-lw-hover hover:-translate-y-0.5 transition-all duration-200 card-hover ${presentation.animate ? "animate-card-fade-in" : ""} ${categoryTopBorder[topic.category]}`}
                    style={presentation.style}
                  >
                    {/* Title */}
                    <h2 className="font-serif text-lg text-stone-900 dark:text-[var(--text-heading)] group-hover:text-deep transition-colors leading-snug mb-3">
                      {topic.title}
                    </h2>

                    {/* Meta claim */}
                    <p className="text-sm text-stone-500 leading-relaxed line-clamp-2 mb-4 flex-1">
                      {topic.meta_claim}
                    </p>

                    {/* Balance + weight (verdict word omitted — the status pill
                        below already carries the label; glyphs stay for signal) */}
                    <div className="flex items-center justify-between gap-2.5 mb-3">
                      <BalanceWeightChip balance={topic.balance} weight={topic.weight} verdict={topic.verdict} />
                    </div>

                    {/* Footer: pills + pillar count */}
                    <div className="flex items-center justify-between gap-2 pt-3 mt-auto border-t border-stone-100 dark:border-stone-700/50">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {/* Category pill */}
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border capitalize ${categoryColors[topic.category]}`}
                        >
                          {topic.category}
                        </span>

                        {/* Status pill */}
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${statusColors[topic.status]}`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {topic.status.replace("_", " ")}
                        </span>
                      </div>

                      {/* Pillar count */}
                      <span className="text-[11px] text-stone-500">
                        {topic.pillarCount} pillars
                      </span>
                    </div>
                  </Link>
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

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-stone-200/60 dark:border-[var(--border-default)]">
            <p className="text-sm text-stone-500">
              {topicSummaries.length} topics mapped. Click any topic to read its full analysis
              with steel-man arguments, weighted evidence, and crux questions.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
