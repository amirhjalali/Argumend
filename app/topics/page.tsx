"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import {
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Search,
  SearchX,
  SortAsc,
  SortDesc,
  X,
  ArrowRight,
} from "lucide-react";
import { topicSummaries, CATEGORY_LABELS, CATEGORY_ORDER } from "@/data/topicIndex";
import type { TopicCategory, TopicStatus } from "@/data/topicIndex";
import { categoryColors, statusColors, categoryTopBorder } from "@/lib/categoryColors";
import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const statusIcons: Record<TopicStatus, typeof CheckCircle> = {
  settled: CheckCircle,
  contested: AlertCircle,
  highly_speculative: HelpCircle,
};

type SortOption = "category" | "confidence-desc" | "confidence-asc" | "title-asc";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "category", label: "By category" },
  { value: "confidence-desc", label: "Highest confidence" },
  { value: "confidence-asc", label: "Lowest confidence" },
  { value: "title-asc", label: "Alphabetical" },
];

const ALL_STATUSES: TopicStatus[] = ["settled", "contested", "highly_speculative"];

const STATUS_LABELS: Record<TopicStatus, string> = {
  settled: "Settled",
  contested: "Contested",
  highly_speculative: "Speculative",
};

// Default confidence bounds — values outside [DEFAULT_MIN, DEFAULT_MAX] count as
// an active filter and get reflected in the URL.
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TopicsPage() {
  const [activeCategory, setActiveCategory] = useState<TopicCategory | "all">("all");
  const [activeStatuses, setActiveStatuses] = useState<Set<TopicStatus>>(new Set());
  const [minConfidence, setMinConfidence] = useState(DEFAULT_MIN);
  const [maxConfidence, setMaxConfidence] = useState(DEFAULT_MAX);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("category");

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

    // Confidence-range filter
    if (minConfidence > DEFAULT_MIN || maxConfidence < DEFAULT_MAX) {
      filtered = filtered.filter(
        (t) =>
          t.confidence_score >= minConfidence &&
          t.confidence_score <= maxConfidence
      );
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
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
          return b.confidence_score - a.confidence_score;
        }
        case "confidence-desc":
          return b.confidence_score - a.confidence_score;
        case "confidence-asc":
          return a.confidence_score - b.confidence_score;
        case "title-asc":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [activeCategory, activeStatuses, minConfidence, maxConfidence, search, sortBy]);

  // Count per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: topicSummaries.length };
    for (const cat of CATEGORY_ORDER) {
      counts[cat] = topicSummaries.filter((t) => t.category === cat).length;
    }
    return counts;
  }, []);

  const toggleStatus = (status: TopicStatus) => {
    setActiveStatuses((prev) => {
      const next = new Set(prev);
      if (next.has(status)) next.delete(status);
      else next.add(status);
      return next;
    });
  };

  const clearFilters = () => {
    setActiveCategory("all");
    setActiveStatuses(new Set());
    setMinConfidence(DEFAULT_MIN);
    setMaxConfidence(DEFAULT_MAX);
    setSearch("");
  };

  const hasFilters =
    activeCategory !== "all" ||
    activeStatuses.size > 0 ||
    minConfidence > DEFAULT_MIN ||
    maxConfidence < DEFAULT_MAX ||
    search.trim().length > 0;

  // ---------------------------------------------------------------------------
  // URL-addressable discovery state.
  //
  // We deliberately read params via window.location (in an effect) rather than
  // next/navigation's useSearchParams: the latter forces a client-side bailout
  // during static generation, which would strip the full topic list from the
  // initial HTML and hurt SEO. Reading on mount keeps the server-rendered list
  // (default state = all topics) crawlable, then layers the shared filter view
  // on top after hydration. Writes use history.replaceState so filter changes
  // update the address bar shallowly — no navigation, no extra history entries.
  // ---------------------------------------------------------------------------
  const didInit = useRef(false);

  useEffect(() => {
    if (!didInit.current) {
      // First pass: hydrate filter state from the URL, don't write back.
      const params = new URLSearchParams(window.location.search);

      const cat = params.get("category");
      if (cat && CATEGORY_ORDER.includes(cat as TopicCategory)) {
        setActiveCategory(cat as TopicCategory);
      }

      const statusParam = params.get("status");
      if (statusParam) {
        const parsed = statusParam
          .split(",")
          .filter((s): s is TopicStatus => ALL_STATUSES.includes(s as TopicStatus));
        if (parsed.length > 0) setActiveStatuses(new Set(parsed));
      }

      const rawMin = Number(params.get("min"));
      const rawMax = Number(params.get("max"));
      let nextMin = Number.isFinite(rawMin) ? Math.min(Math.max(rawMin, 0), 100) : DEFAULT_MIN;
      let nextMax = Number.isFinite(rawMax) ? Math.min(Math.max(rawMax, 0), 100) : DEFAULT_MAX;
      if (params.get("min") === null) nextMin = DEFAULT_MIN;
      if (params.get("max") === null) nextMax = DEFAULT_MAX;
      if (nextMin > nextMax) nextMin = nextMax; // keep the range coherent
      if (nextMin !== DEFAULT_MIN) setMinConfidence(nextMin);
      if (nextMax !== DEFAULT_MAX) setMaxConfidence(nextMax);

      const sortParam = params.get("sort");
      if (sortParam && SORT_OPTIONS.some((o) => o.value === sortParam)) {
        setSortBy(sortParam as SortOption);
      }

      const qParam = params.get("q");
      if (qParam) setSearch(qParam);

      didInit.current = true;
      return;
    }

    // Subsequent passes: reflect the current filter state in the URL.
    const params = new URLSearchParams();
    if (activeCategory !== "all") params.set("category", activeCategory);
    if (activeStatuses.size > 0) {
      params.set("status", ALL_STATUSES.filter((s) => activeStatuses.has(s)).join(","));
    }
    if (minConfidence > DEFAULT_MIN) params.set("min", String(minConfidence));
    if (maxConfidence < DEFAULT_MAX) params.set("max", String(maxConfidence));
    if (sortBy !== "category") params.set("sort", sortBy);
    if (search.trim()) params.set("q", search.trim());

    const qs = params.toString();
    window.history.replaceState(
      null,
      "",
      qs ? `${window.location.pathname}?${qs}` : window.location.pathname
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, activeStatuses, minConfidence, maxConfidence, sortBy, search]);

  const topicsJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Explore Topics",
      description: `${topicSummaries.length} topics mapped across ${CATEGORY_ORDER.length} categories. Each one structured with steel-man arguments, weighted evidence, and crux questions.`,
      url: "https://argumend.org/topics",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: topicSummaries.length,
        itemListElement: topicSummaries.map((topic, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: topic.title,
          url: `https://argumend.org/topics/${topic.id}`,
          description: topic.meta_claim,
        })),
      },
    }),
    []
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
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary mb-6 leading-[1.08]">
              Explore Topics
            </h1>
            <p className="text-lg text-secondary leading-relaxed max-w-2xl">
              <span className="font-mono text-stone-700 dark:text-stone-300">{topicSummaries.length}</span> topics
              mapped across {CATEGORY_ORDER.length} categories. Each one structured with
              steel-man arguments, weighted evidence, and crux questions.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2.5 min-h-[44px] rounded-full text-sm font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-deep text-white shadow-sm"
                  : "bg-white dark:bg-[var(--bg-card)] text-stone-500 dark:text-stone-400 border border-stone-200/60 dark:border-[var(--border-default)] hover:border-deep/30 dark:hover:border-deep/50 hover:text-stone-700 dark:hover:text-stone-300"
              }`}
            >
              All ({categoryCounts.all})
            </button>
            {CATEGORY_ORDER.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 min-h-[44px] rounded-full text-sm font-medium transition-all capitalize ${
                  activeCategory === cat
                    ? "bg-deep text-white shadow-sm"
                    : "bg-white dark:bg-[var(--bg-card)] text-stone-500 dark:text-stone-400 border border-stone-200/60 dark:border-[var(--border-default)] hover:border-deep/30 dark:hover:border-deep/50 hover:text-stone-700 dark:hover:text-stone-300"
                }`}
              >
                {CATEGORY_LABELS[cat]} ({categoryCounts[cat]})
              </button>
            ))}
          </div>

          {/* Search + Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search topics..."
                aria-label="Search topics"
                className="w-full pl-9 pr-9 py-2.5 min-h-[44px] text-base sm:text-sm bg-white dark:bg-[var(--bg-input)] border border-stone-200/60 dark:border-[var(--border-default)] rounded-lg text-stone-700 dark:text-[var(--text-primary)] placeholder-stone-400 dark:placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-deep/20 focus:border-deep/40"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center h-9 w-9 text-stone-400 hover:text-stone-600"
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
                onChange={(e) => setSortBy(e.target.value as SortOption)}
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

          {/* Status + Confidence filter row */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 mb-6">
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

            {/* Confidence range (dual slider) */}
            <div className="flex flex-col gap-1.5 w-full max-w-[260px] lg:ml-auto">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-500">Confidence</span>
                <span className="font-mono text-xs tabular-nums text-stone-700 dark:text-stone-300">
                  {minConfidence}&ndash;{maxConfidence}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-stone-500 w-7 flex-shrink-0">Min</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={minConfidence}
                  onChange={(e) =>
                    setMinConfidence(Math.min(Number(e.target.value), maxConfidence))
                  }
                  aria-label="Minimum confidence"
                  className="flex-1 h-1 appearance-none bg-stone-200 dark:bg-stone-700 rounded-full accent-deep cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-stone-500 w-7 flex-shrink-0">Max</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={maxConfidence}
                  onChange={(e) =>
                    setMaxConfidence(Math.max(Number(e.target.value), minConfidence))
                  }
                  aria-label="Maximum confidence"
                  className="flex-1 h-1 appearance-none bg-stone-200 dark:bg-stone-700 rounded-full accent-deep cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Results info */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-stone-500">
              Showing{" "}
              <span className="font-semibold text-stone-700 dark:text-stone-300">
                {filteredTopics.length}
              </span>{" "}
              of {topicSummaries.length} topics
            </p>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-stone-600 transition-colors"
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
                No topics match your current filters. Try widening the confidence
                range, picking a different status, or clearing all filters to browse
                all {topicSummaries.length} topics.
              </p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-deep hover:text-deep-dark transition-colors"
              >
                <X className="h-3.5 w-3.5" />
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTopics.map((topic, index) => {
                const StatusIcon = statusIcons[topic.status];

                return (
                  <Link
                    key={topic.id}
                    href={`/topics/${topic.id}`}
                    className={`group flex flex-col bg-white dark:bg-[var(--bg-card)] border border-stone-200/60 dark:border-[var(--border-default)] border-t-[3px] rounded-xl p-5 pb-4 shadow-card hover:border-x-deep/30 hover:border-b-deep/30 dark:hover:border-x-deep/50 dark:hover:border-b-deep/50 hover:shadow-lw-hover hover:-translate-y-0.5 transition-all duration-200 animate-card-fade-in card-hover ${categoryTopBorder[topic.category]}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Title */}
                    <h2 className="font-serif text-lg text-stone-900 dark:text-[var(--text-heading)] group-hover:text-deep transition-colors leading-snug mb-3">
                      {topic.title}
                    </h2>

                    {/* Meta claim */}
                    <p className="text-sm text-stone-500 leading-relaxed line-clamp-2 mb-4 flex-1">
                      {topic.meta_claim}
                    </p>

                    {/* Confidence score bar */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <div
                        className="h-1.5 flex-1 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden"
                        role="meter"
                        aria-valuenow={topic.confidence_score}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`Confidence: ${topic.confidence_score}%`}
                      >
                        <div
                          className="h-full bg-deep rounded-full transition-all duration-500 animate-bar-fill"
                          style={{ width: `${topic.confidence_score}%` }}
                          aria-hidden="true"
                        />
                      </div>
                      <span className="flex-shrink-0 font-mono text-sm tabular-nums text-stone-600 dark:text-stone-400">
                        {topic.confidence_score}%
                      </span>
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
