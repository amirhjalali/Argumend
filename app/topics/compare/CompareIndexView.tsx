"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeftRight,
  ArrowRight,
  Search,
  X,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import type { TopicCategory, Verdict } from "@/lib/schemas/topic";
import { categoryColors } from "@/lib/categoryColors";
import { BalanceWeightChip } from "@/components/BalanceWeightChip";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FeaturedPair {
  id1: string;
  id2: string;
  title1: string;
  title2: string;
  balance1: number;
  weight1: number;
  verdict1: Verdict;
  balance2: number;
  weight2: number;
  verdict2: Verdict;
  category1: string;
  category2: string;
  categoryLabel1: string;
  categoryLabel2: string;
}

interface TopicItem {
  id: string;
  title: string;
  balance: number;
  weight: number;
  verdict: Verdict;
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

const INITIAL_TOPIC_RESULTS = 16;

// ---------------------------------------------------------------------------
// Comparison pair card
// ---------------------------------------------------------------------------

function PairCard({ pair }: { pair: FeaturedPair }) {
  return (
    <Link
      href={`/topics/compare/${pair.id1}/vs/${pair.id2}`}
      className="group flex flex-col rounded-xl border border-stone-200/60 dark:border-[var(--border-divider)] bg-transparent hover:border-deep/30 hover:shadow-md transition-all card-hover overflow-hidden"
    >
      <div className="flex flex-1">
        {/* Left topic */}
        <div className="flex-1 p-4 sm:p-5 border-r border-stone-200/40 dark:border-[var(--border-divider)]/60">
          <div className="flex items-center gap-1.5 mb-2">
            <span
              className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${
                categoryColors[pair.category1 as TopicCategory] ??
                categoryColors.technology
              }`}
            >
              {pair.categoryLabel1}
            </span>
          </div>
          <h3 className="font-serif text-sm sm:text-base text-primary dark:text-stone-200 leading-snug mb-2 group-hover:text-rust-700 dark:group-hover:text-rust-400 transition-colors">
            {pair.title1}
          </h3>
          <BalanceWeightChip balance={pair.balance1} weight={pair.weight1} verdict={pair.verdict1} />
        </div>

        {/* Divider with "vs" */}
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center">
            <span className="bg-stone-100 dark:bg-[var(--bg-muted)] text-muted dark:text-stone-400 text-xs font-medium px-2 py-1 rounded-full border border-stone-200/50 dark:border-[var(--border-divider)]">
              vs
            </span>
          </div>
        </div>

        {/* Right topic */}
        <div className="flex-1 p-4 sm:p-5">
          <div className="flex items-center gap-1.5 mb-2">
            <span
              className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${
                categoryColors[pair.category2 as TopicCategory] ??
                categoryColors.technology
              }`}
            >
              {pair.categoryLabel2}
            </span>
          </div>
          <h3 className="font-serif text-sm sm:text-base text-primary dark:text-stone-200 leading-snug mb-2 group-hover:text-deep dark:group-hover:text-[#7fb5b0] transition-colors">
            {pair.title2}
          </h3>
          <BalanceWeightChip balance={pair.balance2} weight={pair.weight2} verdict={pair.verdict2} />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-50/50 dark:bg-[#1a1916]/50 border-t border-stone-200/40 dark:border-[var(--border-divider)]/60">
        <span className="text-xs font-medium text-stone-500 dark:text-stone-400 group-hover:text-deep dark:group-hover:text-[#7fb5b0] transition-colors">
          Compare side by side
        </span>
        <ArrowRight className="h-3 w-3 text-muted dark:text-stone-400 group-hover:text-deep dark:group-hover:text-[#7fb5b0] group-hover:translate-x-0.5 transition-all" />
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
  const hasMounted = useRef(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const slotARef = useRef<HTMLButtonElement>(null);
  const slotBRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const restorePickerFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const nextA = allTopics.find((topic) => topic.id === params.get("a")) ?? null;
      const nextB = allTopics.find((topic) => topic.id === params.get("b")) ?? null;
      setSelectedA(nextA);
      setSelectedB(nextB);
      setActiveSlot(params.get("slot") === "b" || (nextA && !nextB) ? "b" : "a");
      setSearch("");
    };
    restorePickerFromUrl();
    window.addEventListener("popstate", restorePickerFromUrl);
    return () => window.removeEventListener("popstate", restorePickerFromUrl);
  }, [allTopics]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    const params = new URLSearchParams(window.location.search);
    if (selectedA) params.set("a", selectedA.id);
    else params.delete("a");
    if (selectedB) params.set("b", selectedB.id);
    else params.delete("b");
    if (selectedA || selectedB) params.set("slot", activeSlot);
    else params.delete("slot");
    const searchParams = params.toString();
    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${searchParams ? `?${searchParams}` : ""}${window.location.hash}`,
    );
  }, [activeSlot, selectedA, selectedB]);

  const filtered = useMemo(() => {
    if (!search.trim()) return allTopics;
    const q = search.trim().toLowerCase();
    return allTopics.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.categoryLabel.toLowerCase().includes(q)
    );
  }, [search, allTopics]);

  const hasSearch = search.trim().length > 0;
  const visibleTopics = hasSearch
    ? filtered
    : filtered.slice(0, INITIAL_TOPIC_RESULTS);

  const handleSelect = (topic: TopicItem) => {
    if (activeSlot === "a") {
      setSelectedA(topic);
      if (!selectedB) setActiveSlot("b");
    } else {
      setSelectedB(topic);
    }
    setSearch("");
    requestAnimationFrame(() => searchInputRef.current?.focus());
  };

  const clearSearch = () => {
    setSearch("");
    requestAnimationFrame(() => searchInputRef.current?.focus());
  };

  const canCompare = selectedA && selectedB && selectedA.id !== selectedB.id;

  const handleCompare = () => {
    if (canCompare) {
      router.push(`/topics/compare/${selectedA.id}/vs/${selectedB.id}`);
    }
  };

  return (
    <div className="bg-transparent rounded-xl border border-stone-200/60 dark:border-[var(--border-divider)] p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-2">
        <ArrowLeftRight className="h-5 w-5 text-deep dark:text-[#7fb5b0]" aria-hidden="true" />
        <h2 className="font-serif text-2xl text-primary dark:text-stone-200">
          Pick Two Topics
        </h2>
      </div>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
        Select any two topics to compare their evidence and arguments side by
        side.
      </p>

      {/* Selected topics */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
        role="group"
        aria-label="Topics to compare"
      >
        {/* Slot A */}
        <div
          className={`flex items-center gap-3 rounded-lg border-2 p-4 min-h-[72px] transition-all text-left ${
            activeSlot === "a"
              ? "border-rust-400 bg-rust-50/30 dark:bg-rust-900/20"
              : selectedA
                ? "border-stone-200 dark:border-[var(--border-divider)] bg-[#faf8f5] dark:bg-[#1a1916]"
                : "border-dashed border-stone-300 dark:border-[var(--border-divider)] bg-stone-50/50 dark:bg-[#1a1916]/50"
          }`}
        >
          <button
            ref={slotARef}
            type="button"
            onClick={() => setActiveSlot("a")}
            className="flex min-h-11 min-w-0 flex-1 items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust-500/50 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-[var(--bg-canvas)]"
            aria-pressed={activeSlot === "a"}
            aria-label={
              selectedA
                ? `Choose a different topic for slot A. Current topic: ${selectedA.title}`
                : "Choose a topic for slot A"
            }
          >
            <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-rust-100 dark:bg-rust-500/20 flex items-center justify-center text-xs font-bold text-rust-700 dark:text-rust-300">
              A
            </span>
            {selectedA ? (
              <span className="flex-1 min-w-0">
                <span className="block font-serif text-sm font-semibold text-primary dark:text-stone-200 truncate">
                  {selectedA.title}
                </span>
                <span className="block text-xs text-stone-500 dark:text-stone-400">
                  {selectedA.verdict.label}
                </span>
              </span>
            ) : (
              <span className="text-sm text-muted dark:text-stone-400">Select first topic...</span>
            )}
          </button>
          {selectedA && (
            <button
              type="button"
              onClick={() => {
                setSelectedA(null);
                setActiveSlot("a");
                requestAnimationFrame(() => slotARef.current?.focus());
              }}
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg hover:bg-stone-200/50 dark:hover:bg-[var(--bg-muted)] transition-colors"
              aria-label={`Clear topic A: ${selectedA.title}`}
            >
              <X className="h-4 w-4 text-muted dark:text-stone-400" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Slot B */}
        <div
          className={`flex items-center gap-3 rounded-lg border-2 p-4 min-h-[72px] transition-all text-left ${
            activeSlot === "b"
              ? "border-deep bg-deep/5 dark:border-[#7fb5b0] dark:bg-deep/10"
              : selectedB
                ? "border-stone-200 dark:border-[var(--border-divider)] bg-[#faf8f5] dark:bg-[#1a1916]"
                : "border-dashed border-stone-300 dark:border-[var(--border-divider)] bg-stone-50/50 dark:bg-[#1a1916]/50"
          }`}
        >
          <button
            ref={slotBRef}
            type="button"
            onClick={() => setActiveSlot("b")}
            className="flex min-h-11 min-w-0 flex-1 items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep/50 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-[var(--bg-canvas)]"
            aria-pressed={activeSlot === "b"}
            aria-label={
              selectedB
                ? `Choose a different topic for slot B. Current topic: ${selectedB.title}`
                : "Choose a topic for slot B"
            }
          >
            <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-deep/10 dark:bg-deep/25 flex items-center justify-center text-xs font-bold text-deep dark:text-[#7fb5b0]">
              B
            </span>
            {selectedB ? (
              <span className="flex-1 min-w-0">
                <span className="block font-serif text-sm font-semibold text-primary dark:text-stone-200 truncate">
                  {selectedB.title}
                </span>
                <span className="block text-xs text-stone-500 dark:text-stone-400">
                  {selectedB.verdict.label}
                </span>
              </span>
            ) : (
              <span className="text-sm text-muted dark:text-stone-400">Select second topic...</span>
            )}
          </button>
          {selectedB && (
            <button
              type="button"
              onClick={() => {
                setSelectedB(null);
                setActiveSlot("b");
                requestAnimationFrame(() => slotBRef.current?.focus());
              }}
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg hover:bg-stone-200/50 dark:hover:bg-[var(--bg-muted)] transition-colors"
              aria-label={`Clear topic B: ${selectedB.title}`}
            >
              <X className="h-4 w-4 text-muted dark:text-stone-400" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Search bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted dark:text-stone-400" aria-hidden="true" />
        <input
          ref={searchInputRef}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search topics to fill slot ${activeSlot.toUpperCase()}...`}
          aria-label={`Search topics to fill slot ${activeSlot.toUpperCase()}`}
          aria-controls="compare-topic-results"
          aria-describedby="compare-topic-results-status"
          className="w-full pl-10 pr-12 py-3 rounded-lg border border-stone-200/60 dark:border-[var(--border-divider)] bg-white dark:bg-[var(--bg-card)] text-sm text-primary dark:text-stone-200 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-deep/30 focus:border-deep/40 transition-all"
        />
        {search && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg hover:bg-stone-100 dark:hover:bg-[var(--bg-muted)] transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-muted dark:text-stone-400" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Topic list */}
      <div className="mb-2 flex items-center justify-between gap-3 text-xs text-stone-500 dark:text-stone-400">
        <p id="compare-topic-results-status" aria-live="polite" aria-atomic="true">
          {hasSearch
            ? `${filtered.length} ${filtered.length === 1 ? "match" : "matches"}`
            : `Showing ${visibleTopics.length} of ${allTopics.length} topics`}
        </p>
        {!hasSearch && allTopics.length > visibleTopics.length && (
          <p className="hidden text-right sm:block">Search to find any topic</p>
        )}
      </div>
      <div
        id="compare-topic-results"
        className="max-h-64 overflow-y-auto rounded-lg border border-stone-200/40 dark:border-[var(--border-divider)]/60 divide-y divide-stone-200/40 dark:divide-[var(--border-divider)]/60"
        aria-label="Topic search results"
      >
        {visibleTopics.map((topic) => {
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
                  ? "bg-stone-50 dark:bg-[#1a1916] opacity-50 cursor-not-allowed"
                  : "hover:bg-stone-50/80 dark:hover:bg-[var(--bg-muted)]/80 cursor-pointer"
              }`}
            >
              <span
                className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border shrink-0 ${
                  categoryColors[topic.category as TopicCategory] ??
                  categoryColors.technology
                }`}
              >
                {topic.categoryLabel}
              </span>
              <span className="font-serif text-sm text-primary dark:text-stone-200 flex-1 truncate">
                {topic.title}
              </span>
              <BalanceWeightChip
                balance={topic.balance}
                weight={topic.weight}
                verdict={topic.verdict}
                className="shrink-0"
              />
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
        {visibleTopics.length === 0 && (
          <div className="px-4 py-6 text-center text-sm text-muted dark:text-stone-400">
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
              : "bg-stone-200 dark:bg-[var(--bg-muted)] text-muted dark:text-stone-400 cursor-not-allowed"
          }`}
        >
          <ArrowLeftRight className="h-4 w-4" aria-hidden="true" />
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
  const hasMounted = useRef(false);
  const pairFilterRef = useRef<HTMLInputElement>(null);

  const clearPairFilter = () => {
    setSearchPairs("");
    requestAnimationFrame(() => pairFilterRef.current?.focus());
  };

  useEffect(() => {
    const restoreFilterFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      setSearchPairs(params.get("pairs") ?? "");
    };
    restoreFilterFromUrl();
    window.addEventListener("popstate", restoreFilterFromUrl);
    return () => window.removeEventListener("popstate", restoreFilterFromUrl);
  }, []);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    const params = new URLSearchParams(window.location.search);
    if (searchPairs.trim()) params.set("pairs", searchPairs.trim());
    else params.delete("pairs");
    const searchParams = params.toString();
    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${searchParams ? `?${searchParams}` : ""}${window.location.hash}`,
    );
  }, [searchPairs]);

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
      <div className="min-h-[100svh] bg-[#f4f1eb] dark:bg-[#121210] overflow-x-hidden">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          {/* Header */}
          <header className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-stone-100/80 dark:bg-[var(--bg-muted)] rounded-full text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider border border-stone-200/50 dark:border-[var(--border-divider)] mb-4">
              <ArrowLeftRight className="h-3.5 w-3.5" />
              Topic Comparisons
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary dark:text-stone-200 mb-4 leading-[1.08]">
              Compare Debates Side by Side
            </h1>
            <p className="text-sm sm:text-base text-stone-500 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
              See how different controversial topics stack up against each other.
              Compare the balance and weight of evidence, argument pillars, and
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
              <h2 className="font-serif text-2xl text-primary dark:text-stone-200">
                Featured Comparisons
              </h2>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted dark:text-stone-400" aria-hidden="true" />
                <input
                  ref={pairFilterRef}
                  type="text"
                  value={searchPairs}
                  onChange={(e) => setSearchPairs(e.target.value)}
                  placeholder="Filter comparisons..."
                  aria-label="Filter comparisons"
                  aria-describedby="featured-comparison-status"
                  className="min-h-11 w-full rounded-lg border border-stone-200/60 bg-white py-2.5 pl-10 pr-12 text-sm text-stone-900 placeholder:text-stone-400 transition-all focus:border-deep/40 focus:outline-none focus:ring-2 focus:ring-deep/30 dark:border-[var(--border-divider)] dark:bg-[var(--bg-card)] dark:text-stone-200 dark:placeholder:text-stone-500"
                />
                {searchPairs && (
                  <button
                    type="button"
                    onClick={clearPairFilter}
                    className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg hover:bg-stone-100 dark:hover:bg-[var(--bg-muted)]"
                    aria-label="Clear comparison filter"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>

            <p
              id="featured-comparison-status"
              className="sr-only"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {filteredPairs.length} featured comparison{filteredPairs.length === 1 ? "" : "s"}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 stagger-children">
              {filteredPairs.map((pair) => (
                <PairCard key={`${pair.id1}-${pair.id2}`} pair={pair} />
              ))}
            </div>

            {filteredPairs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm text-muted dark:text-stone-400">
                  No comparisons match your search. Try a different term or use
                  the topic picker above.
                </p>
              </div>
            )}
          </section>

          {/* Footer nav */}
          <div className="pt-8 mt-8 border-t border-stone-200/60 dark:border-[var(--border-divider)]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <Link
                href="/topics"
                className="text-sm text-deep hover:underline py-2 min-h-[44px] inline-flex items-center"
              >
                &larr; Back to all topics
              </Link>
              <p className="text-xs text-stone-500 dark:text-stone-400 italic">
                Data-driven analysis. Question everything.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
