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
import type { TopicCategory, TopicStatus } from "@/data/topicIndex";

// ---------------------------------------------------------------------------
// Presentation maps (mirrors /dashboard so the two saved views feel identical)
// ---------------------------------------------------------------------------

const statusIcons: Record<TopicStatus, typeof CheckCircle> = {
  settled: CheckCircle,
  contested: AlertCircle,
  highly_speculative: HelpCircle,
};

const statusColors: Record<TopicStatus, string> = {
  settled:
    "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/40",
  contested:
    "bg-rust-50 dark:bg-rust-950/40 text-rust-700 dark:text-rust-400 border-rust-200/60 dark:border-rust-800/40",
  highly_speculative:
    "bg-stone-100 dark:bg-stone-800/40 text-stone-600 dark:text-stone-400 border-stone-200/60 dark:border-stone-700/40",
};

const statusLabels: Record<TopicStatus, string> = {
  settled: "Settled",
  contested: "Contested",
  highly_speculative: "Speculative",
};

const categoryColors: Record<TopicCategory, string> = {
  policy: "bg-deep/10 text-deep dark:text-deep-light border-deep/20",
  technology:
    "bg-stone-100 dark:bg-stone-800/40 text-stone-600 dark:text-stone-400 border-stone-200/60 dark:border-stone-700/40",
  science:
    "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/40",
  economics:
    "bg-rust-50 dark:bg-rust-950/40 text-rust-700 dark:text-rust-400 border-rust-200/60 dark:border-rust-800/40",
  philosophy:
    "bg-stone-100 dark:bg-stone-800/40 text-stone-600 dark:text-stone-400 border-stone-200/60 dark:border-stone-700/40",
};

const categoryTopBorder: Record<TopicCategory, string> = {
  policy: "border-t-deep",
  technology: "border-t-stone-400",
  science: "border-t-emerald-400",
  economics: "border-t-rust-400",
  philosophy: "border-t-stone-400",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SavedClient() {
  const { ids, hydrated, remove } = useSavedTopicIds();

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
            <div className="p-2.5 rounded-xl bg-rust-50 dark:bg-rust-950/40 text-rust-500">
              <Bookmark className="h-6 w-6" strokeWidth={1.8} />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-primary leading-[1.08]">
              Saved Topics
            </h1>
          </div>
          <p className="text-base sm:text-lg text-secondary leading-relaxed max-w-2xl">
            Topics you&apos;ve bookmarked on this device. They live in your
            browser &mdash; no account needed.
          </p>
        </div>

        {/* Body: loading -> empty -> grid */}
        {!hydrated ? (
          // Hydration placeholder — matches server render (no localStorage on the
          // server), so there is no hydration mismatch.
          <div
            className="rounded-xl border border-stone-200/60 dark:border-[var(--border-default)] bg-white/60 dark:bg-[#252420]/60 p-8 text-center"
            aria-hidden="true"
          >
            <p className="text-muted">Loading your saved topics&hellip;</p>
          </div>
        ) : savedTopics.length === 0 ? (
          <div className="rounded-xl border border-stone-200/60 dark:border-[var(--border-default)] bg-white/60 dark:bg-[#252420]/60 p-10 text-center">
            <Bookmark className="h-9 w-9 text-stone-300 dark:text-[var(--text-muted)] mx-auto mb-4" />
            <h2 className="font-serif text-xl text-primary mb-2">
              Nothing saved yet
            </h2>
            <p className="text-secondary mb-6 max-w-sm mx-auto leading-relaxed">
              Browse the topics and tap the bookmark on any argument map to keep
              it here for later.
            </p>
            <Link
              href="/topics"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-rust-500 to-rust-600 text-white text-sm font-medium hover:from-rust-600 hover:to-rust-700 transition-all shadow-sm"
            >
              Explore Topics
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-muted">
                <span className="font-semibold text-stone-700 dark:text-stone-300 font-mono tabular-nums">
                  {savedTopics.length}
                </span>{" "}
                {savedTopics.length === 1 ? "topic" : "topics"} saved
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {savedTopics.map((topic) => {
                const StatusIcon = statusIcons[topic.status];
                const confPct = Math.min(topic.confidence_score, 100);

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
                      className="absolute top-2.5 right-2.5 z-20 flex items-center justify-center h-8 w-8 rounded-lg text-stone-400 hover:text-rust-600 hover:bg-rust-50 dark:hover:bg-rust-950/40 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    <Link
                      href={`/topics/${topic.id}`}
                      className="flex flex-col flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-deep/40 rounded-md"
                    >
                      <h2 className="font-serif text-base text-primary group-hover:text-deep transition-colors leading-snug mb-1.5 pr-8">
                        {topic.title}
                      </h2>
                      <p className="text-xs text-stone-500 dark:text-[var(--text-muted)] leading-relaxed line-clamp-2 mb-4 flex-1">
                        {topic.meta_claim}
                      </p>

                      {/* Confidence bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-medium text-stone-500 dark:text-[var(--text-muted)] uppercase tracking-widest">
                            Confidence
                          </span>
                          <span className="font-mono text-xs tabular-nums text-stone-600 dark:text-stone-400 font-semibold">
                            {topic.confidence_score}%
                          </span>
                        </div>
                        <div
                          className="h-1.5 rounded-full bg-stone-200/80 dark:bg-[var(--bg-overlay)] overflow-hidden"
                          role="meter"
                          aria-valuenow={topic.confidence_score}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`Confidence: ${topic.confidence_score}%`}
                        >
                          <div
                            className="h-full rounded-full bg-deep-light transition-all duration-300"
                            style={{ width: `${confPct}%` }}
                            aria-hidden="true"
                          />
                        </div>
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
      </div>
    </div>
  );
}
