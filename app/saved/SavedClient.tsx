"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  Bookmark,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  X,
} from "lucide-react";
import { useSavedTopicIds } from "@/hooks/useSavedTopics";
import { topicSummaries, CATEGORY_LABELS } from "@/data/topicIndex";
import type { TopicStatus } from "@/data/topicIndex";
import {
  categoryColors,
  statusColors,
  categoryTopBorder,
} from "@/lib/categoryColors";
import { BalanceWeightChip } from "@/components/BalanceWeightChip";

// ---------------------------------------------------------------------------
// Presentation maps (mirrors /dashboard so the two saved views feel identical)
// ---------------------------------------------------------------------------

const statusIcons: Record<TopicStatus, typeof CheckCircle> = {
  settled: CheckCircle,
  contested: AlertCircle,
  highly_speculative: HelpCircle,
};

const statusLabels: Record<TopicStatus, string> = {
  settled: "Settled",
  contested: "Contested",
  highly_speculative: "Speculative",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SavedClient() {
  const { ids, hydrated, error, remove } = useSavedTopicIds();

  // Resolve saved IDs to summaries, preserving save order. IDs that no longer
  // map to a topic (e.g. removed from the dataset) are silently dropped.
  const savedTopics = useMemo(() => {
    if (ids.length === 0) return [];
    const byId = new Map(topicSummaries.map((t) => [t.id, t]));
    return ids
      .map((id) => byId.get(id))
      .filter((t): t is (typeof topicSummaries)[number] => t !== undefined);
  }, [ids]);

  return (
    <div className="min-h-[100svh] bg-transparent">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-rust-50 dark:bg-rust-900/40 text-rust-500">
              <Bookmark className="h-6 w-6" strokeWidth={1.8} />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-primary dark:text-stone-200 leading-[1.08]">
              Saved Topics
            </h1>
          </div>
          <p className="text-base sm:text-lg text-secondary dark:text-stone-400 leading-relaxed max-w-2xl">
            Topics you&apos;ve bookmarked on this device. They live in your
            browser &mdash; no account needed.
          </p>
        </div>

        {/* Body: loading -> unavailable -> empty -> grid */}
        {!hydrated ? (
          // Hydration placeholder — matches server render (no localStorage on the
          // server), so there is no hydration mismatch.
          <div
            className="rounded-xl border border-stone-200/60 dark:border-[var(--border-default)] bg-white/60 dark:bg-[var(--bg-card)]/60 p-8 text-center"
            role="status"
            aria-live="polite"
          >
            <p className="text-muted dark:text-stone-400">Loading your saved topics&hellip;</p>
          </div>
        ) : error && ids.length === 0 ? (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50/80 p-8 text-center dark:border-red-900/60 dark:bg-red-950/30 sm:p-10"
          >
            <AlertCircle
              className="mx-auto mb-4 h-9 w-9 text-red-500 dark:text-red-300"
              aria-hidden="true"
            />
            <h2 className="font-serif text-xl text-red-900 dark:text-red-100">
              Saved topics are unavailable
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-red-700 dark:text-red-300">
              {error} Check this browser&rsquo;s storage or privacy settings, then
              reload the page. No bookmarks were changed.
            </p>
          </div>
        ) : savedTopics.length === 0 ? (
          <div className="rounded-xl border border-stone-200/60 dark:border-[var(--border-default)] bg-white/60 dark:bg-[var(--bg-card)]/60 p-10 text-center">
            <Bookmark className="h-9 w-9 text-stone-300 dark:text-[var(--text-muted)] mx-auto mb-4" />
            <h2 className="font-serif text-xl text-primary dark:text-stone-200 mb-2">
              Nothing saved yet
            </h2>
            <p className="text-secondary dark:text-stone-400 mb-6 max-w-sm mx-auto leading-relaxed">
              Browse the topics and tap the bookmark on any argument map to keep
              it here for later.
            </p>
            <Link
              href="/topics"
              className="inline-flex min-h-11 items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-rust-500 to-rust-600 text-white text-sm font-medium hover:from-rust-600 hover:to-rust-700 transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[var(--bg-card)]"
            >
              Explore Topics
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-muted dark:text-stone-400">
                <span className="font-semibold text-stone-700 dark:text-stone-300 font-mono tabular-nums">
                  {savedTopics.length}
                </span>{" "}
                {savedTopics.length === 1 ? "topic" : "topics"} saved
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {savedTopics.map((topic) => {
                const StatusIcon = statusIcons[topic.status];

                return (
                  <div
                    key={topic.id}
                    className={`group relative flex flex-col bg-white dark:bg-[var(--bg-card)] border border-stone-200/60 dark:border-[var(--border-default)] border-t-2 ${categoryTopBorder[topic.category]} rounded-xl p-5 hover:border-deep/30 dark:hover:border-deep/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
                  >
                    {/* Remove button — sits above the card link via z-index */}
                    <button
                      type="button"
                      onClick={() => remove(topic.id)}
                      aria-label={`Remove "${topic.title}" from saved`}
                      className="absolute right-1.5 top-1.5 z-20 flex h-11 w-11 items-center justify-center rounded-lg text-muted dark:text-stone-400 hover:text-rust-600 hover:bg-rust-50 dark:hover:bg-rust-900/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[var(--bg-card)]"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    <Link
                      href={`/topics/${topic.id}`}
                      className="flex flex-col flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-deep/40 rounded-md"
                    >
                      <h2 className="font-serif text-base text-primary dark:text-stone-200 group-hover:text-deep transition-colors leading-snug mb-1.5 pr-8">
                        {topic.title}
                      </h2>
                      <p className="text-xs text-stone-500 dark:text-[var(--text-muted)] leading-relaxed line-clamp-2 mb-4 flex-1">
                        {topic.meta_claim}
                      </p>

                      <div className="mb-3">
                        <BalanceWeightChip
                          balance={topic.balance}
                          weight={topic.weight}
                          verdict={topic.verdict}
                          showLabel
                        />
                      </div>

                      <div className="flex items-center justify-between gap-2 mt-auto">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border capitalize ${categoryColors[topic.category]}`}
                          >
                            {CATEGORY_LABELS[topic.category]}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${statusColors[topic.status]}`}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {statusLabels[topic.status]}
                          </span>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-stone-300 dark:text-[var(--text-muted)] group-hover:text-deep group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Footer CTA to keep browsing */}
            <div className="mt-10 pt-6 border-t border-stone-200/60 dark:border-[var(--border-default)]">
              <Link
                href="/topics"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-deep hover:text-deep-dark transition-colors"
              >
                Browse all topics
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </>
        )}

        {error && ids.length > 0 && (
          <p
            role="alert"
            className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300"
          >
            {error} Your existing bookmarks have not changed.
          </p>
        )}
      </div>
    </div>
  );
}
