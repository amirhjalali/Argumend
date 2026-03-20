"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import {
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Search,
  SearchX,
  X,
  ArrowRight,
  BarChart3,
  Layers,
  FileText,
} from "lucide-react";
import { topicSummaries, CATEGORY_LABELS, CATEGORY_ORDER } from "@/data/topicIndex";
import type { TopicCategory, TopicStatus } from "@/data/topicIndex";
import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";

// ---------------------------------------------------------------------------
// Constants & Lookup Tables
// ---------------------------------------------------------------------------

const STATUS_LABELS: Record<TopicStatus, string> = {
  settled: "Settled",
  contested: "Contested",
  highly_speculative: "Highly Speculative",
};

const statusIcons: Record<TopicStatus, typeof CheckCircle> = {
  settled: CheckCircle,
  contested: AlertCircle,
  highly_speculative: HelpCircle,
};

const statusColors: Record<TopicStatus, string> = {
  settled: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  contested: "bg-rust-50 text-rust-700 border-rust-200/60",
  highly_speculative: "bg-stone-100 text-stone-600 border-stone-200/60",
};

const categoryColors: Record<TopicCategory, string> = {
  policy: "bg-deep/10 text-deep border-deep/20",
  technology: "bg-stone-100 text-stone-600 border-stone-200/60",
  science: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
  economics: "bg-rust-50 text-rust-700 border-rust-200/60",
  philosophy: "bg-stone-100 text-stone-600 border-stone-200/60",
};

const categoryTopBorder: Record<TopicCategory, string> = {
  policy: "border-t-deep",
  technology: "border-t-stone-400",
  science: "border-t-emerald-400",
  economics: "border-t-rust-400",
  philosophy: "border-t-stone-400",
};

type SortOption = "evidence-desc" | "confidence-desc" | "confidence-asc" | "title-asc";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "evidence-desc", label: "Most Evidence" },
  { value: "confidence-desc", label: "Highest Confidence" },
  { value: "confidence-asc", label: "Lowest Confidence" },
  { value: "title-asc", label: "A-Z" },
];

const ALL_STATUSES: TopicStatus[] = ["settled", "contested", "highly_speculative"];

// ---------------------------------------------------------------------------
// Stats (pre-computed from the summaries, no re-render needed)
// ---------------------------------------------------------------------------

const totalTopics = topicSummaries.length;
const totalCategories = CATEGORY_ORDER.length;
const totalEvidence = topicSummaries.reduce((sum, t) => sum + t.evidenceCount, 0);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ExplorePage() {
  // Filter state
  const [activeCategory, setActiveCategory] = useState<TopicCategory | "all">("all");
  const [activeStatus, setActiveStatus] = useState<TopicStatus | "all">("all");
  const [sortBy, setSortBy] = useState<SortOption>("evidence-desc");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced search (300ms)
  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(value);
    }, 300);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: totalTopics };
    for (const cat of CATEGORY_ORDER) {
      counts[cat] = topicSummaries.filter((t) => t.category === cat).length;
    }
    return counts;
  }, []);

  // Filtered + sorted topics
  const filteredTopics = useMemo(() => {
    let filtered = [...topicSummaries];

    // Category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter((t) => t.category === activeCategory);
    }

    // Status filter
    if (activeStatus !== "all") {
      filtered = filtered.filter((t) => t.status === activeStatus);
    }

    // Search filter
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.meta_claim.toLowerCase().includes(q)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "evidence-desc":
          return b.evidenceCount - a.evidenceCount;
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
  }, [activeCategory, activeStatus, debouncedSearch, sortBy]);

  const clearFilters = () => {
    setActiveCategory("all");
    setActiveStatus("all");
    setSearchInput("");
    setDebouncedSearch("");
  };

  const hasFilters =
    activeCategory !== "all" ||
    activeStatus !== "all" ||
    searchInput.trim().length > 0;

  // JSON-LD structured data
  const topicsJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Explore Topics",
      description: `${totalTopics} topics across ${totalCategories} categories with ${totalEvidence} evidence items analyzed.`,
      url: "https://argumend.org/explore",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: totalTopics,
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
      <div className="min-h-screen bg-transparent">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header */}
          <div className="mb-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Explore" },
              ]}
            />
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary mb-4 leading-[1.08]">
              Explore Topics
            </h1>
            <p className="text-lg text-secondary leading-relaxed max-w-2xl">
              Discover evidence-based analyses across debates in policy,
              technology, science, economics, and philosophy.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 py-4 px-5 bg-white dark:bg-[#252420] rounded-xl border border-stone-200/60 dark:border-[#3d3a36] shadow-card">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-deep" />
              <span className="text-sm text-stone-600 dark:text-stone-400">
                <span className="font-mono font-semibold text-stone-800 dark:text-stone-200">
                  {totalTopics}
                </span>{" "}
                topics across{" "}
                <span className="font-mono font-semibold text-stone-800 dark:text-stone-200">
                  {totalCategories}
                </span>{" "}
                categories
              </span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-stone-200 dark:bg-[#3d3a36]" />
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-deep" />
              <span className="text-sm text-stone-600 dark:text-stone-400">
                <span className="font-mono font-semibold text-stone-800 dark:text-stone-200">
                  {totalEvidence.toLocaleString()}
                </span>{" "}
                evidence items analyzed
              </span>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2.5 min-h-[44px] rounded-full text-sm font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-deep text-white shadow-sm"
                  : "bg-white dark:bg-[#252420] text-stone-500 border border-stone-200/60 dark:border-[#3d3a36] hover:border-deep/30 hover:text-stone-700 dark:hover:text-stone-300"
              }`}
            >
              All ({categoryCounts.all})
            </button>
            {CATEGORY_ORDER.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 min-h-[44px] rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-deep text-white shadow-sm"
                    : "bg-white dark:bg-[#252420] text-stone-500 border border-stone-200/60 dark:border-[#3d3a36] hover:border-deep/30 hover:text-stone-700 dark:hover:text-stone-300"
                }`}
              >
                {CATEGORY_LABELS[cat]} ({categoryCounts[cat]})
              </button>
            ))}
          </div>

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveStatus("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeStatus === "all"
                  ? "bg-stone-700 text-white shadow-sm"
                  : "bg-white dark:bg-[#252420] text-stone-500 border border-stone-200/60 dark:border-[#3d3a36] hover:border-stone-300 dark:hover:border-[#4a4640] hover:text-stone-700 dark:hover:text-stone-300"
              }`}
            >
              All Statuses
            </button>
            {ALL_STATUSES.map((status) => {
              const Icon = statusIcons[status];
              return (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeStatus === status
                      ? "bg-stone-700 text-white shadow-sm"
                      : "bg-white dark:bg-[#252420] text-stone-500 border border-stone-200/60 dark:border-[#3d3a36] hover:border-stone-300 dark:hover:border-[#4a4640] hover:text-stone-700 dark:hover:text-stone-300"
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  {STATUS_LABELS[status]}
                </button>
              );
            })}
          </div>

          {/* Search + Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search by title, claim, or keyword..."
                aria-label="Search topics"
                className="w-full pl-9 pr-9 py-2.5 min-h-[44px] text-sm bg-white dark:bg-[#252420] border border-stone-200/60 dark:border-[#3d3a36] rounded-lg text-stone-700 dark:text-stone-300 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-deep/20 focus:border-deep/40"
              />
              {searchInput && (
                <button
                  onClick={() => {
                    setSearchInput("");
                    setDebouncedSearch("");
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center h-9 w-9 text-stone-400 hover:text-stone-600"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-stone-500 whitespace-nowrap">
                Sort:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-sm px-3 py-2.5 min-h-[44px] rounded-lg border border-stone-200/60 dark:border-[#3d3a36] bg-white dark:bg-[#252420] text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-deep/20 focus:border-deep/40"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-stone-500">
              Showing{" "}
              <span className="font-semibold text-stone-700 dark:text-stone-300">
                {filteredTopics.length}
              </span>{" "}
              of {totalTopics} topics
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
            <div className="text-center py-20 bg-white dark:bg-[#252420] rounded-xl border border-stone-200/60 dark:border-[#3d3a36]">
              <SearchX className="h-10 w-10 text-stone-300 mx-auto mb-4" />
              <p className="text-stone-600 dark:text-stone-400 font-medium mb-1">No topics found</p>
              <p className="text-sm text-stone-500 mb-5 max-w-xs mx-auto">
                Try adjusting your search terms or clearing the filters to
                browse all {totalTopics} topics.
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
                    className={`group flex flex-col bg-white dark:bg-[#252420] border border-stone-200/60 dark:border-[#3d3a36] border-t-[3px] rounded-xl p-5 pb-4 shadow-card hover:border-x-deep/30 hover:border-b-deep/30 hover:shadow-lw-hover hover:-translate-y-0.5 transition-all duration-200 animate-card-fade-in card-hover ${categoryTopBorder[topic.category]}`}
                    style={{ animationDelay: `${Math.min(index, 11) * 50}ms` }}
                  >
                    {/* Category badge */}
                    <span
                      className={`self-start inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border capitalize mb-3 ${categoryColors[topic.category]}`}
                    >
                      {topic.category}
                    </span>

                    {/* Title */}
                    <h2 className="font-serif text-lg text-stone-900 dark:text-stone-100 group-hover:text-deep transition-colors leading-snug mb-2">
                      {topic.title}
                    </h2>

                    {/* Meta claim */}
                    <p className="text-sm text-stone-500 leading-relaxed line-clamp-2 mb-4 flex-1">
                      {topic.meta_claim}
                    </p>

                    {/* Confidence score bar */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <div
                        className="h-1.5 flex-1 bg-stone-100 dark:bg-[#3d3a36] rounded-full overflow-hidden"
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

                    {/* Footer: status + counts + CTA */}
                    <div className="flex items-center justify-between gap-2 pt-3 mt-auto border-t border-stone-100 dark:border-[#3d3a36]">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {/* Status pill */}
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${statusColors[topic.status]}`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {topic.status.replace("_", " ")}
                        </span>

                        {/* Pillar + evidence counts */}
                        <span className="text-[11px] text-stone-400">
                          {topic.pillarCount} pillars
                        </span>
                        <span className="text-[11px] text-stone-300">
                          &middot;
                        </span>
                        <span className="text-[11px] text-stone-400">
                          {topic.evidenceCount} evidence
                        </span>
                      </div>

                      {/* CTA */}
                      <span className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-medium text-deep opacity-0 group-hover:opacity-100 transition-opacity">
                        View
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-stone-200/60 dark:border-[#3d3a36]">
            <p className="text-sm text-stone-500">
              {totalTopics} topics mapped with {totalEvidence.toLocaleString()}{" "}
              evidence items. Click any topic to read its full analysis with
              steel-man arguments, weighted evidence, and crux questions.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
