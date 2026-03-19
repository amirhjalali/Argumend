"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeftRight,
  ArrowRight,
  Search,
  X,
  CheckCircle,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import type { TopicStatus } from "@/lib/schemas/topic";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FeaturedPair {
  id1: string;
  id2: string;
  title1: string;
  title2: string;
  score1: number;
  score2: number;
  status1: string;
  status2: string;
  category1: string;
  category2: string;
  categoryLabel1: string;
  categoryLabel2: string;
}

interface TopicItem {
  id: string;
  title: string;
  confidence_score: number;
  category: string;
  categoryLabel: string;
}

interface CompareIndexViewProps {
  featuredPairs: FeaturedPair[];
  allTopics: TopicItem[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const statusIcons: Record<string, typeof CheckCircle> = {
  settled: CheckCircle,
  contested: AlertCircle,
  highly_speculative: HelpCircle,
};

const categoryBgColors: Record<string, string> = {
  policy: "bg-deep/10 text-deep",
  technology: "bg-stone-100 text-stone-600",
  science: "bg-emerald-50 text-emerald-600",
  economics: "bg-rust-50 text-rust-700",
  philosophy: "bg-stone-100 text-stone-600",
};

// ---------------------------------------------------------------------------
// Comparison pair card
// ---------------------------------------------------------------------------

function PairCard({ pair }: { pair: FeaturedPair }) {
  return (
    <Link
      href={`/topics/compare/${pair.id1}/vs/${pair.id2}`}
      className="group flex flex-col rounded-xl border border-stone-200/60 bg-transparent hover:border-deep/30 hover:shadow-md transition-all card-hover overflow-hidden"
    >
      <div className="flex flex-1">
        {/* Left topic */}
        <div className="flex-1 p-4 sm:p-5 border-r border-stone-200/40">
          <div className="flex items-center gap-1.5 mb-2">
            <span
              className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                categoryBgColors[pair.category1] ?? "bg-stone-100 text-stone-600"
              }`}
            >
              {pair.categoryLabel1}
            </span>
          </div>
          <h3 className="font-serif text-sm sm:text-base text-primary leading-snug mb-2 group-hover:text-rust-700 transition-colors">
            {pair.title1}
          </h3>
          <span className="font-mono text-lg font-bold tabular-nums text-rust-700">
            {pair.score1}%
          </span>
        </div>

        {/* Divider with "vs" */}
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center">
            <span className="bg-stone-100 text-stone-400 text-xs font-medium px-2 py-1 rounded-full border border-stone-200/50">
              vs
            </span>
          </div>
        </div>

        {/* Right topic */}
        <div className="flex-1 p-4 sm:p-5">
          <div className="flex items-center gap-1.5 mb-2">
            <span
              className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                categoryBgColors[pair.category2] ?? "bg-stone-100 text-stone-600"
              }`}
            >
              {pair.categoryLabel2}
            </span>
          </div>
          <h3 className="font-serif text-sm sm:text-base text-primary leading-snug mb-2 group-hover:text-deep transition-colors">
            {pair.title2}
          </h3>
          <span className="font-mono text-lg font-bold tabular-nums text-deep">
            {pair.score2}%
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-50/50 border-t border-stone-200/40">
        <span className="text-xs font-medium text-stone-500 group-hover:text-deep transition-colors">
          Compare side by side
        </span>
        <ArrowRight className="h-3 w-3 text-stone-400 group-hover:text-deep group-hover:translate-x-0.5 transition-all" />
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Topic picker
// ---------------------------------------------------------------------------

function TopicPicker({
  allTopics,
}: {
  allTopics: TopicItem[];
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedA, setSelectedA] = useState<TopicItem | null>(null);
  const [selectedB, setSelectedB] = useState<TopicItem | null>(null);
  const [activeSlot, setActiveSlot] = useState<"a" | "b">("a");

  const filtered = useMemo(() => {
    if (!search.trim()) return allTopics;
    const q = search.toLowerCase();
    return allTopics.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.categoryLabel.toLowerCase().includes(q)
    );
  }, [search, allTopics]);

  const handleSelect = (topic: TopicItem) => {
    if (activeSlot === "a") {
      setSelectedA(topic);
      if (!selectedB) setActiveSlot("b");
    } else {
      setSelectedB(topic);
    }
    setSearch("");
  };

  const canCompare = selectedA && selectedB && selectedA.id !== selectedB.id;

  const handleCompare = () => {
    if (canCompare) {
      router.push(`/topics/compare/${selectedA.id}/vs/${selectedB.id}`);
    }
  };

  return (
    <div className="bg-transparent rounded-xl border border-stone-200/60 p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-2">
        <ArrowLeftRight className="h-5 w-5 text-deep" />
        <h2 className="font-serif text-2xl text-primary">
          Pick Two Topics
        </h2>
      </div>
      <p className="text-sm text-stone-500 mb-6">
        Select any two topics to compare their evidence and arguments side by
        side.
      </p>

      {/* Selected topics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Slot A */}
        <button
          type="button"
          onClick={() => setActiveSlot("a")}
          className={`flex items-center gap-3 rounded-lg border-2 p-4 min-h-[72px] transition-all text-left ${
            activeSlot === "a"
              ? "border-rust-400 bg-rust-50/30"
              : selectedA
                ? "border-stone-200 bg-[#faf8f5]"
                : "border-dashed border-stone-300 bg-stone-50/50"
          }`}
        >
          <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-rust-100 flex items-center justify-center text-xs font-bold text-rust-700">
            A
          </span>
          {selectedA ? (
            <div className="flex-1 min-w-0">
              <p className="font-serif text-sm font-semibold text-primary truncate">
                {selectedA.title}
              </p>
              <p className="text-xs text-stone-500">
                {selectedA.confidence_score}% confidence
              </p>
            </div>
          ) : (
            <p className="text-sm text-stone-400">Select first topic...</p>
          )}
          {selectedA && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedA(null);
                setActiveSlot("a");
              }}
              className="flex-shrink-0 p-1 rounded hover:bg-stone-200/50 transition-colors"
              aria-label="Clear selection"
            >
              <X className="h-3.5 w-3.5 text-stone-400" />
            </button>
          )}
        </button>

        {/* Slot B */}
        <button
          type="button"
          onClick={() => setActiveSlot("b")}
          className={`flex items-center gap-3 rounded-lg border-2 p-4 min-h-[72px] transition-all text-left ${
            activeSlot === "b"
              ? "border-deep bg-deep/5"
              : selectedB
                ? "border-stone-200 bg-[#faf8f5]"
                : "border-dashed border-stone-300 bg-stone-50/50"
          }`}
        >
          <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-deep/10 flex items-center justify-center text-xs font-bold text-deep">
            B
          </span>
          {selectedB ? (
            <div className="flex-1 min-w-0">
              <p className="font-serif text-sm font-semibold text-primary truncate">
                {selectedB.title}
              </p>
              <p className="text-xs text-stone-500">
                {selectedB.confidence_score}% confidence
              </p>
            </div>
          ) : (
            <p className="text-sm text-stone-400">Select second topic...</p>
          )}
          {selectedB && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedB(null);
                setActiveSlot("b");
              }}
              className="flex-shrink-0 p-1 rounded hover:bg-stone-200/50 transition-colors"
              aria-label="Clear selection"
            >
              <X className="h-3.5 w-3.5 text-stone-400" />
            </button>
          )}
        </button>
      </div>

      {/* Search bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search topics to fill slot ${activeSlot.toUpperCase()}...`}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-stone-200/60 bg-white text-sm text-primary placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep/40 transition-all"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-stone-100 transition-colors"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5 text-stone-400" />
          </button>
        )}
      </div>

      {/* Topic list */}
      <div className="max-h-64 overflow-y-auto rounded-lg border border-stone-200/40 divide-y divide-stone-200/40">
        {filtered.map((topic) => {
          const isSelectedA = selectedA?.id === topic.id;
          const isSelectedB = selectedB?.id === topic.id;
          const isDisabled = isSelectedA || isSelectedB;

          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => !isDisabled && handleSelect(topic)}
              disabled={isDisabled}
              className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-colors ${
                isDisabled
                  ? "bg-stone-50 opacity-50 cursor-not-allowed"
                  : "hover:bg-stone-50/80 cursor-pointer"
              }`}
            >
              <span
                className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0 ${
                  categoryBgColors[topic.category] ??
                  "bg-stone-100 text-stone-600"
                }`}
              >
                {topic.categoryLabel}
              </span>
              <span className="font-serif text-sm text-primary flex-1 truncate">
                {topic.title}
              </span>
              <span className="font-mono text-xs tabular-nums text-stone-400 shrink-0">
                {topic.confidence_score}%
              </span>
              {isSelectedA && (
                <span className="text-[10px] font-bold text-rust-600 bg-rust-100 px-1.5 py-0.5 rounded shrink-0">
                  A
                </span>
              )}
              {isSelectedB && (
                <span className="text-[10px] font-bold text-deep bg-deep/10 px-1.5 py-0.5 rounded shrink-0">
                  B
                </span>
              )}
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className="px-4 py-6 text-center text-sm text-stone-400">
            No topics match your search.
          </div>
        )}
      </div>

      {/* Compare button */}
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={handleCompare}
          disabled={!canCompare}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
            canCompare
              ? "bg-gradient-to-r from-rust-500 to-rust-600 text-white hover:from-rust-600 hover:to-rust-700 shadow-sm btn-lift"
              : "bg-stone-200 text-stone-400 cursor-not-allowed"
          }`}
        >
          <ArrowLeftRight className="h-4 w-4" />
          {canCompare
            ? "Compare these topics"
            : selectedA && selectedB && selectedA.id === selectedB.id
              ? "Pick two different topics"
              : "Select two topics to compare"}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function CompareIndexView({
  featuredPairs,
  allTopics,
}: CompareIndexViewProps) {
  const [searchPairs, setSearchPairs] = useState("");

  const filteredPairs = useMemo(() => {
    if (!searchPairs.trim()) return featuredPairs;
    const q = searchPairs.toLowerCase();
    return featuredPairs.filter(
      (p) =>
        p.title1.toLowerCase().includes(q) ||
        p.title2.toLowerCase().includes(q) ||
        p.categoryLabel1.toLowerCase().includes(q) ||
        p.categoryLabel2.toLowerCase().includes(q)
    );
  }, [searchPairs, featuredPairs]);

  return (
    <AppShell>
      <div className="min-h-screen bg-[#f4f1eb] overflow-x-hidden">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          {/* Header */}
          <header className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-stone-100/80 rounded-full text-xs font-medium text-stone-600 uppercase tracking-wider border border-stone-200/50 mb-4">
              <ArrowLeftRight className="h-3.5 w-3.5" />
              Topic Comparisons
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary mb-4 leading-[1.08]">
              Compare Debates Side by Side
            </h1>
            <p className="text-sm sm:text-base text-stone-500 max-w-2xl mx-auto leading-relaxed">
              See how different controversial topics stack up against each other.
              Compare confidence scores, evidence balance, argument pillars, and
              key crux questions.
            </p>
          </header>

          {/* Topic picker */}
          <section className="mb-12">
            <TopicPicker allTopics={allTopics} />
          </section>

          {/* Featured comparisons */}
          <section>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
              <h2 className="font-serif text-2xl text-primary">
                Featured Comparisons
              </h2>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  value={searchPairs}
                  onChange={(e) => setSearchPairs(e.target.value)}
                  placeholder="Filter comparisons..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-stone-200/60 bg-white text-sm text-primary placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep/40 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 stagger-children">
              {filteredPairs.map((pair) => (
                <PairCard key={`${pair.id1}-${pair.id2}`} pair={pair} />
              ))}
            </div>

            {filteredPairs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm text-stone-400">
                  No comparisons match your search. Try a different term or use
                  the topic picker above.
                </p>
              </div>
            )}
          </section>

          {/* Footer nav */}
          <div className="pt-8 mt-8 border-t border-stone-200/60">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <Link
                href="/topics"
                className="text-sm text-deep hover:underline py-2 min-h-[44px] inline-flex items-center"
              >
                &larr; Back to all topics
              </Link>
              <p className="text-xs text-stone-500 italic">
                Data-driven analysis. Question everything.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
