"use client";

import { useState, useMemo } from "react";
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
import { topics, CATEGORY_LABELS, CATEGORY_ORDER } from "@/data/topics";
import { AppShell } from "@/components/AppShell";
import type { TopicCategory, TopicStatus } from "@/lib/schemas/topic";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

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
  policy: "bg-blue-50 text-blue-600 border-blue-200/60",
  technology: "bg-violet-50 text-violet-600 border-violet-200/60",
  science: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
  economics: "bg-rust-50 text-rust-700 border-rust-200/60",
  philosophy: "bg-stone-100 text-stone-600 border-stone-200/60",
};

const categoryTopBorder: Record<TopicCategory, string> = {
  policy: "border-t-blue-400",
  technology: "border-t-violet-400",
  science: "border-t-emerald-400",
  economics: "border-t-rust-400",
  philosophy: "border-t-stone-400",
};

type SortOption = "category" | "confidence-desc" | "confidence-asc" | "title-asc";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "category", label: "By category" },
  { value: "confidence-desc", label: "Highest confidence" },
  { value: "confidence-asc", label: "Lowest confidence" },
  { value: "title-asc", label: "Alphabetical" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TopicsPage() {
  const [activeCategory, setActiveCategory] = useState<TopicCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("category");

  const filteredTopics = useMemo(() => {
    let filtered = [...topics];

    // Category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter((t) => t.category === activeCategory);
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
  }, [activeCategory, search, sortBy]);

  // Count per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: topics.length };
    for (const cat of CATEGORY_ORDER) {
      counts[cat] = topics.filter((t) => t.category === cat).length;
    }
    return counts;
  }, []);

  const clearFilters = () => {
    setActiveCategory("all");
    setSearch("");
  };

  const hasFilters = activeCategory !== "all" || search.trim().length > 0;

  return (
    <AppShell>
      <div className="min-h-screen bg-[#faf8f5]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-stone-900 mb-2">
              Explore Topics
            </h1>
            <p className="text-base text-stone-500 leading-relaxed">
              <span className="font-mono text-stone-700">{topics.length}</span> topics
              mapped across {CATEGORY_ORDER.length} categories. Each one structured with
              steel-man arguments, weighted evidence, and crux questions.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-deep text-white shadow-sm"
                  : "bg-white text-stone-500 border border-stone-200/60 hover:border-deep/30 hover:text-stone-700"
              }`}
            >
              All ({categoryCounts.all})
            </button>
            {CATEGORY_ORDER.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all capitalize ${
                  activeCategory === cat
                    ? "bg-deep text-white shadow-sm"
                    : "bg-white text-stone-500 border border-stone-200/60 hover:border-deep/30 hover:text-stone-700"
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
                className="w-full pl-9 pr-9 py-2 text-sm bg-white border border-stone-200/60 rounded-lg text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-deep/20 focus:border-deep/40"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-stone-400 whitespace-nowrap">Sort:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-sm px-3 py-2 rounded-lg border border-stone-200/60 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-deep/20 focus:border-deep/40"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results info */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-stone-500">
              Showing{" "}
              <span className="font-semibold text-stone-700">
                {filteredTopics.length}
              </span>{" "}
              of {topics.length} topics
            </p>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-xs font-medium text-stone-400 hover:text-stone-600 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
                Clear filters
              </button>
            )}
          </div>

          {/* Topic Grid */}
          {filteredTopics.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-stone-200/60">
              <SearchX className="h-10 w-10 text-stone-300 mx-auto mb-4" />
              <p className="text-stone-600 font-medium mb-1">No topics found</p>
              <p className="text-sm text-stone-400 mb-5 max-w-xs mx-auto">
                Try adjusting your search terms or clearing the filters to browse all {topics.length} topics.
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
                    className={`group flex flex-col bg-white border border-stone-200/60 border-t-[3px] rounded-xl p-5 pb-4 hover:border-x-deep/30 hover:border-b-deep/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 animate-card-fade-in ${categoryTopBorder[topic.category]}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Title */}
                    <h2 className="font-serif text-lg text-stone-900 group-hover:text-deep transition-colors leading-snug mb-3">
                      {topic.title}
                    </h2>

                    {/* Meta claim */}
                    <p className="text-sm text-stone-500 leading-relaxed line-clamp-2 mb-4 flex-1">
                      {topic.meta_claim}
                    </p>

                    {/* Confidence score bar */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="h-1.5 flex-1 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-deep rounded-full transition-all duration-500"
                          style={{ width: `${topic.confidence_score}%` }}
                        />
                      </div>
                      <span className="flex-shrink-0 font-mono text-sm tabular-nums text-stone-600">
                        {topic.confidence_score}%
                      </span>
                    </div>

                    {/* Footer: pills + pillar count */}
                    <div className="flex items-center justify-between gap-2 pt-3 mt-auto border-t border-stone-100">
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
                      <span className="text-[11px] text-stone-400">
                        {topic.pillars.length} pillars
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-stone-200/60">
            <p className="text-sm text-stone-400">
              {topics.length} topics mapped. Click any topic to read its full analysis
              with steel-man arguments, weighted evidence, and crux questions.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
