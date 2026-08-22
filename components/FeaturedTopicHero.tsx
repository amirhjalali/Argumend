"use client";

import { useState, useEffect, type ReactNode } from "react";
import { ArrowRight, Crosshair } from "lucide-react";
import {
  topicSummaries,
  featuredTopicId,
  featuredReason,
  TOPIC_COUNT_LABEL,
} from "@/data/topicIndex";
import type { Topic } from "@/lib/schemas/topic";
import { BalanceWeightReadout } from "@/components/BalanceWeightReadout";
import { loadTopicById } from "@/data/topicLoader";

interface FeaturedTopicHeroProps {
  onTopicSelect: (id: string) => void;
  preview?: ReactNode;
  headingLevel?: "h1" | "h2";
}

// Extract the best evidence item for a given side across all pillars
function getBestEvidence(
  topic: Topic,
  side: "for" | "against"
): { title: string; source: string; score: number } | null {
  let best: { title: string; source: string; score: number } | null = null;
  for (const pillar of topic.pillars) {
    for (const ev of pillar.evidence ?? []) {
      if (ev.side !== side) continue;
      const score =
        (ev.weight?.sourceReliability ?? 0) +
        (ev.weight?.independence ?? 0) +
        (ev.weight?.replicability ?? 0) +
        (ev.weight?.directness ?? 0);
      if (!best || score > best.score) {
        best = { title: ev.title, source: ev.source ?? "Unknown", score };
      }
    }
  }
  return best;
}

export function FeaturedTopicHero({
  onTopicSelect,
  preview,
  headingLevel = "h1",
}: FeaturedTopicHeroProps) {
  const [topic, setTopic] = useState<Topic | null>(null);
  const Heading = headingLevel;

  // Get lightweight summary (available immediately)
  const summary = topicSummaries.find((t) => t.id === featuredTopicId);

  // Load only the featured topic module, not the aggregate corpus.
  useEffect(() => {
    let cancelled = false;
    loadTopicById(featuredTopicId).then((found) => {
      if (cancelled) return;
      if (found) setTopic(found);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!summary) return null;

  const crux = topic?.pillars?.[0]?.crux;
  const forEvidence = topic ? getBestEvidence(topic, "for") : null;
  const againstEvidence = topic ? getBestEvidence(topic, "against") : null;

  return (
    <section
      aria-labelledby="homepage-product-promise"
      className="bg-gradient-to-b from-[#f4f1eb] to-stone-50 px-4 py-7 dark:from-[#1a1917] dark:to-[#201f1c] sm:py-9 md:px-8 lg:px-10 lg:py-10"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-start lg:gap-10 xl:gap-14">
        <div className="space-y-6 lg:pt-2">
          {/* Product value proposition — the first-screen "what is this?" */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-deep/80 dark:text-deep-light">
              Argument maps for difficult questions
            </p>
            <Heading
              id="homepage-product-promise"
              className="max-w-xl font-serif text-4xl leading-[1.05] tracking-tight text-primary dark:text-stone-200 sm:text-5xl lg:text-[3.35rem]"
            >
              See both sides of any controversial topic, mapped
            </Heading>
            <p className="max-w-xl text-base leading-relaxed text-secondary dark:text-stone-400 md:text-lg">
              Steel-manned arguments, weighted evidence, and the crux that would
              change your mind — across {TOPIC_COUNT_LABEL} topics.
            </p>
          </div>

          {/* Keep the primary conversion action before the featured detail so
              it remains visible in a typical desktop first viewport. */}
          <div>
            <button
              onClick={() => onTopicSelect(featuredTopicId)}
              className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-rust-500 to-rust-600 px-6 py-3 font-serif text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-px hover:scale-[1.02] hover:from-rust-600 hover:to-rust-700 hover:shadow-lg active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f1eb]"
            >
              Open the interactive map
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Featured topic context */}
          <div className="space-y-3 border-t border-stone-300/60 pt-5 dark:border-[var(--border-divider)]">
            <p className="text-xs font-medium uppercase tracking-widest text-deep/70 dark:text-deep-light">
              Featured analysis
            </p>
            <h2 className="font-serif text-2xl leading-[1.12] tracking-tight text-primary dark:text-stone-200 sm:text-3xl">
              {summary.title}
            </h2>
            {featuredReason && (
              <p className="max-w-xl font-serif text-base leading-relaxed text-stone-500 dark:text-stone-400">
                {featuredReason}
              </p>
            )}
            <div className="space-y-2 pt-1">
              <BalanceWeightReadout
                balance={summary.balance}
                weight={summary.weight}
                verdict={summary.verdict}
                className="w-full max-w-md"
              />
              <p className="max-w-md text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                {summary.meta_claim}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {preview}

          {crux && (
            <div className="rounded-r-xl border-l-4 border-[#a23b3b] bg-[#faf5f0] p-4 dark:bg-[#1e1d1a] sm:p-5">
              <div className="mb-2 flex items-center gap-2">
                <Crosshair className="h-4 w-4 text-[#a23b3b]" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-wide text-[#a23b3b]">
                  The Crux
                </span>
              </div>
              <h3 className="mb-1.5 font-serif text-lg font-semibold text-primary dark:text-stone-200">
                {crux.title}
              </h3>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                {crux.description}
              </p>
            </div>
          )}

          {(forEvidence || againstEvidence) && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {forEvidence && (
                <div className="rounded-xl border border-stone-200/60 bg-white p-4 dark:border-[var(--border-divider)] dark:bg-[var(--bg-card)]">
                  <span className="text-xs font-semibold uppercase tracking-wide text-deep dark:text-deep-light">
                    Strongest For
                  </span>
                  <p className="mt-2 text-sm font-medium leading-snug text-primary dark:text-stone-200">
                    {forEvidence.title}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone-100 dark:bg-[var(--bg-muted)]">
                      <div
                        className="h-full rounded-full bg-deep"
                        style={{ width: `${(forEvidence.score / 40) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs tabular-nums text-muted dark:text-stone-400">
                      {forEvidence.score}/40
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-muted dark:text-stone-400">
                    {forEvidence.source}
                  </p>
                </div>
              )}
              {againstEvidence && (
                <div className="rounded-xl border border-stone-200/60 bg-white p-4 dark:border-[var(--border-divider)] dark:bg-[var(--bg-card)]">
                  <span className="text-xs font-semibold uppercase tracking-wide text-rust-600 dark:text-rust-400">
                    Strongest Against
                  </span>
                  <p className="mt-2 text-sm font-medium leading-snug text-primary dark:text-stone-200">
                    {againstEvidence.title}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone-100 dark:bg-[var(--bg-muted)]">
                      <div
                        className="h-full rounded-full bg-rust-500"
                        style={{ width: `${(againstEvidence.score / 40) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs tabular-nums text-muted dark:text-stone-400">
                      {againstEvidence.score}/40
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-muted dark:text-stone-400">
                    {againstEvidence.source}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
