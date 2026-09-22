"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { topicSummaries, featuredTopicId } from "@/data/topicIndex";
import type { Topic } from "@/lib/schemas/topic";
import { loadTopicById } from "@/data/topicLoader";

interface FeaturedTopicHeroProps {
  onTopicSelect: (id: string) => void;
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

/**
 * The home page's worked example: one crux from the featured topic, laid out
 * as the two conditions that would move each side. It used to open with a
 * balance-and-weight readout, which put a score before the question; the north
 * star (docs/plans/2026-09-22-north-star.md) makes the crux and its resolution
 * condition the spine, so the readout lives on the topic page instead.
 */
export function FeaturedTopicHero({ onTopicSelect }: FeaturedTopicHeroProps) {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [settled, setSettled] = useState(false);

  // Get lightweight summary (available immediately)
  const summary = topicSummaries.find((t) => t.id === featuredTopicId);

  // Load only the featured topic module, not the aggregate corpus.
  useEffect(() => {
    let cancelled = false;
    loadTopicById(featuredTopicId).then((found) => {
      if (cancelled) return;
      if (found) setTopic(found);
      setSettled(true);
    }).catch(() => {
      if (!cancelled) setSettled(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!summary) return null;

  const crux = topic?.pillars?.[0]?.crux;
  const flip = crux?.falsification;
  const forEvidence = topic ? getBestEvidence(topic, "for") : null;
  const againstEvidence = topic ? getBestEvidence(topic, "against") : null;

  return (
    <section aria-labelledby="home-crux-heading" className="px-4 md:px-8">
      <div className="mx-auto max-w-5xl border-t border-stone-300/70 py-14 dark:border-divider md:py-20">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12">
          <h2
            id="home-crux-heading"
            className="text-balance font-serif text-[2rem] leading-[1.08] tracking-[-0.01em] text-primary dark:text-stone-200 md:text-[2.5rem]"
          >
            What would change your mind?
          </h2>
          <p className="max-w-md text-base leading-relaxed text-secondary dark:text-stone-400 md:pt-2">
            Every map narrows a fight down to its cruxes: the questions that,
            once answered, would move one side or the other. Here is one of
            them, from {summary.title}.
          </p>
        </div>

        {/* The claim under discussion, then the crux it turns on. */}
        <div className="mt-10 md:mt-14">
          <p className="label-caps">The claim</p>
          <p className="mt-1 max-w-3xl font-serif text-xl italic leading-snug text-secondary dark:text-stone-400 md:text-[1.375rem]">
            {summary.meta_claim}
          </p>
        </div>

        {/* The crux arrives with the lazily loaded topic module. Hold roughly
            its height until then so the sections below don't jump. */}
        <div className={settled ? undefined : "min-h-[52rem] md:min-h-[36rem]"}>
        {crux ? (
          <div className="mt-8 border-l-2 border-crux pl-5 md:pl-6">
            <p className="label-caps text-crux dark:text-crux-light">The crux</p>
            <h3 className="mt-1 max-w-3xl font-serif text-2xl leading-snug text-primary dark:text-stone-200 md:text-[1.875rem]">
              {crux.title}
            </h3>
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-secondary dark:text-stone-400">
              {crux.description}
            </p>
          </div>
        ) : null}

        {flip ? (
          // The memorable part of the page: the two conditions face each
          // other across one rule. Neither side comes first by colour or size.
          <div className="mt-10 grid border-y border-stone-300/70 dark:border-divider md:grid-cols-2">
            <div className="py-6 md:py-8 md:pr-10">
              <p className="label-caps text-rust-700 dark:text-rust-300">
                What would change a supporter&rsquo;s mind
              </p>
              <p className="mt-2 font-serif text-lg leading-relaxed text-primary dark:text-stone-200 md:text-[1.25rem]">
                {flip.supporter_flip}
              </p>
            </div>
            <div className="border-t border-stone-300/70 py-6 dark:border-divider md:border-l md:border-t-0 md:py-8 md:pl-10">
              <p className="label-caps text-skeptic dark:text-skeptic-light">
                What would change a skeptic&rsquo;s mind
              </p>
              <p className="mt-2 font-serif text-lg leading-relaxed text-primary dark:text-stone-200 md:text-[1.25rem]">
                {flip.skeptic_flip}
              </p>
            </div>
          </div>
        ) : null}

        {flip?.common_ground || flip?.live_disagreement ? (
          <dl className="mt-8 grid gap-6 md:grid-cols-2 md:gap-10">
            {flip.common_ground ? (
              <div>
                <dt className="text-sm font-medium text-primary dark:text-stone-200">Common ground</dt>
                <dd className="mt-1 text-[0.9375rem] leading-relaxed text-secondary dark:text-stone-400">
                  {flip.common_ground}
                </dd>
              </div>
            ) : null}
            {flip.live_disagreement ? (
              <div>
                <dt className="text-sm font-medium text-primary dark:text-stone-200">The live disagreement</dt>
                <dd className="mt-1 text-[0.9375rem] leading-relaxed text-secondary dark:text-stone-400">
                  {flip.live_disagreement}
                </dd>
              </div>
            ) : null}
          </dl>
        ) : null}

        {forEvidence || againstEvidence ? (
          <div className="mt-12">
            <h3 className="font-serif text-xl text-primary dark:text-stone-200">
              The strongest evidence on each side
            </h3>
            <ul className="mt-4 grid gap-x-10 md:grid-cols-2">
              {forEvidence ? (
                <li className="border-t border-stone-300/70 py-4 dark:border-divider">
                  <p className="text-xs font-medium text-rust-700 dark:text-rust-300">
                    For the claim
                  </p>
                  <p className="mt-1 text-[0.9375rem] font-medium leading-snug text-primary dark:text-stone-200">
                    {forEvidence.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted dark:text-stone-400">
                    {forEvidence.source}
                  </p>
                </li>
              ) : null}
              {againstEvidence ? (
                <li className="border-t border-stone-300/70 py-4 dark:border-divider">
                  <p className="text-xs font-medium text-skeptic dark:text-skeptic-light">
                    Against the claim
                  </p>
                  <p className="mt-1 text-[0.9375rem] font-medium leading-snug text-primary dark:text-stone-200">
                    {againstEvidence.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted dark:text-stone-400">
                    {againstEvidence.source}
                  </p>
                </li>
              ) : null}
            </ul>
          </div>
        ) : null}

        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <button
            onClick={() => onTopicSelect(featuredTopicId)}
            className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-rust-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-rust-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust-500 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            Open the interactive map
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <Link
            href={`/topics/${featuredTopicId}`}
            className="inline-flex min-h-11 items-center text-sm font-medium text-deep underline decoration-deep/30 underline-offset-4 transition-colors hover:decoration-deep dark:text-[#8bb5b1] dark:decoration-[#8bb5b1]/40"
          >
            Read every crux in {summary.title}
          </Link>
        </div>
      </div>
    </section>
  );
}
