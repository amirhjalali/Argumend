"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CheckCircle, AlertCircle, HelpCircle, Filter, SortAsc, SortDesc, ChevronRight, X } from "lucide-react";
import { topics } from "@/data/topics";
import { AppShell } from "@/components/AppShell";
import type { TopicStatus } from "@/types/logic";

const statusIcons = {
  settled: CheckCircle,
  contested: AlertCircle,
  highly_speculative: HelpCircle,
};

const statusColors = {
  settled: "text-[#D4A012] bg-[#D4A012]/10 border-[#D4A012]/30",
  contested: "text-[#CF7B3E] bg-[#CF7B3E]/10 border-[#CF7B3E]/30",
  highly_speculative: "text-[#8B5A3C] bg-[#8B5A3C]/10 border-[#8B5A3C]/30",
};

const confidenceColors = {
  high: "#D4A012",
  medium: "#CF7B3E",
  low: "#8B5A3C",
};

type SortOption = "confidence-desc" | "confidence-asc" | "title-asc" | "pillars-desc";
type ConfidenceFilter = "all" | "high" | "medium" | "low";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "confidence-desc", label: "Highest confidence" },
  { value: "confidence-asc", label: "Lowest confidence" },
  { value: "title-asc", label: "Alphabetical" },
  { value: "pillars-desc", label: "Most pillars" },
];

const STATUS_OPTIONS: { value: TopicStatus | "all"; label: string }[] = [
  { value: "all", label: "All statuses" },
  { value: "settled", label: "Settled" },
  { value: "contested", label: "Contested" },
  { value: "highly_speculative", label: "Speculative" },
];

const CONFIDENCE_OPTIONS: { value: ConfidenceFilter; label: string; range?: string }[] = [
  { value: "all", label: "All levels" },
  { value: "high", label: "Strong (80%+)", range: "80-100%" },
  { value: "medium", label: "Moderate (50-79%)", range: "50-79%" },
  { value: "low", label: "Contested (0-49%)", range: "0-49%" },
];

export default function TopicsPage() {
  const [statusFilter, setStatusFilter] = useState<TopicStatus | "all">("all");
  const [confidenceFilter, setConfidenceFilter] = useState<ConfidenceFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("confidence-desc");
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort topics
  const filteredTopics = useMemo(() => {
    let filtered = [...topics];

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }

    // Apply confidence filter
    if (confidenceFilter !== "all") {
      filtered = filtered.filter((t) => {
        if (confidenceFilter === "high") return t.confidence_score >= 80;
        if (confidenceFilter === "medium") return t.confidence_score >= 50 && t.confidence_score < 80;
        return t.confidence_score < 50;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "confidence-desc":
          return b.confidence_score - a.confidence_score;
        case "confidence-asc":
          return a.confidence_score - b.confidence_score;
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "pillars-desc":
          return b.pillars.length - a.pillars.length;
        default:
          return 0;
      }
    });

    return filtered;
  }, [statusFilter, confidenceFilter, sortBy]);

  const hasActiveFilters = statusFilter !== "all" || confidenceFilter !== "all";

  const clearFilters = () => {
    setStatusFilter("all");
    setConfidenceFilter("all");
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return confidenceColors.high;
    if (score >= 50) return confidenceColors.medium;
    return confidenceColors.low;
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-6 sm:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-primary mb-3">
            All Topics
          </h1>
          <p className="text-base text-secondary leading-relaxed">
            Explore our collection of structured debates on contested and settled questions.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mb-6 p-4 bg-white/80 rounded-xl border border-[#e8e0d4] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Toggle Filters Button (mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center justify-between w-full px-3 py-2 rounded-lg bg-[#faf7f2] text-sm font-medium text-stone-700"
            >
              <span className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters & Sort
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-[#D4A012]" />
                )}
              </span>
              <ChevronRight className={`h-4 w-4 transition-transform ${showFilters ? "rotate-90" : ""}`} />
            </button>

            {/* Filter Controls */}
            <div className={`${showFilters ? "flex" : "hidden"} sm:flex flex-col sm:flex-row gap-3 sm:items-center flex-1`}>
              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-stone-500 whitespace-nowrap">Status:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as TopicStatus | "all")}
                  className="flex-1 sm:flex-none text-sm px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#D4A012]/30 focus:border-[#D4A012]"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Confidence Filter */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-stone-500 whitespace-nowrap">Confidence:</label>
                <select
                  value={confidenceFilter}
                  onChange={(e) => setConfidenceFilter(e.target.value as ConfidenceFilter)}
                  className="flex-1 sm:flex-none text-sm px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#D4A012]/30 focus:border-[#D4A012]"
                >
                  {CONFIDENCE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2 sm:ml-auto">
                <label className="text-xs font-medium text-stone-500 whitespace-nowrap">Sort:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="flex-1 sm:flex-none text-sm px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#D4A012]/30 focus:border-[#D4A012]"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-500 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
              >
                <X className="h-3.5 w-3.5" />
                Clear
              </button>
            )}
          </div>

          {/* Active Filter Tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-stone-100">
              <span className="text-xs text-stone-500">Active filters:</span>
              {statusFilter !== "all" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-[#D4A012]/10 text-[#8B6914] rounded-full">
                  {STATUS_OPTIONS.find((o) => o.value === statusFilter)?.label}
                  <button onClick={() => setStatusFilter("all")} className="hover:text-[#D4A012]">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {confidenceFilter !== "all" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-[#CF7B3E]/10 text-[#A65F2A] rounded-full">
                  {CONFIDENCE_OPTIONS.find((o) => o.value === confidenceFilter)?.label}
                  <button onClick={() => setConfidenceFilter("all")} className="hover:text-[#CF7B3E]">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-stone-500">
            Showing <span className="font-semibold text-stone-700">{filteredTopics.length}</span> of {topics.length} topics
          </p>
          <div className="flex items-center gap-1 text-xs text-stone-400">
            {sortBy.includes("desc") ? (
              <SortDesc className="h-3.5 w-3.5" />
            ) : (
              <SortAsc className="h-3.5 w-3.5" />
            )}
            <span>{SORT_OPTIONS.find((o) => o.value === sortBy)?.label}</span>
          </div>
        </div>

        {/* Topic List */}
        <div className="space-y-4">
          {filteredTopics.length === 0 ? (
            <div className="text-center py-12 bg-white/80 rounded-xl border border-[#e8e0d4]">
              <p className="text-stone-500 mb-3">No topics match your filters.</p>
              <button
                onClick={clearFilters}
                className="text-sm font-medium text-[#D4A012] hover:text-[#8B6914] transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            filteredTopics.map((topic) => {
              const StatusIcon = statusIcons[topic.status];
              const statusColor = statusColors[topic.status];
              const confidenceColor = getConfidenceColor(topic.confidence_score);

              return (
                <Link
                  key={topic.id}
                  href={`/?topic=${topic.id}`}
                  className="group block bg-white/80 rounded-xl p-5 sm:p-6 border border-[#e8e0d4] hover:border-[#D4A012]/30 hover:shadow-[0_8px_24px_-4px_rgba(212,160,18,0.12)] transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="font-serif text-xl sm:text-2xl text-primary mb-2 group-hover:text-[#D4A012] transition-colors truncate">
                        {topic.title}
                      </h2>
                      <p className="text-sm sm:text-base text-secondary mb-4 leading-relaxed line-clamp-2">
                        {topic.meta_claim}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${statusColor}`}>
                          <StatusIcon className="h-3.5 w-3.5" />
                          <span className="capitalize text-xs font-medium">{topic.status.replace("_", " ")}</span>
                        </span>
                        <span className="text-stone-500 text-xs">
                          {topic.pillars.length} pillar{topic.pillars.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div
                        className="text-2xl sm:text-3xl font-serif tabular-nums"
                        style={{ color: confidenceColor }}
                      >
                        {topic.confidence_score}%
                      </div>
                      <div className="text-[11px] text-stone-500 uppercase tracking-[0.12em] mt-0.5">
                        confidence
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-stone-200">
          <p className="text-sm text-secondary">
            {topics.length} topics available. Click any topic to explore its logical structure with steel-man arguments and crux questions.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
