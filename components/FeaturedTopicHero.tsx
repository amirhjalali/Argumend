"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { topicSummaries, featuredTopicId } from "@/data/topicIndex";
import type { Topic } from "@/lib/schemas/topic";
import { loadTopicById } from "@/data/topicLoader";
import {
  CRUX_SHEET,
  ENTRY_COLUMN,
  ENTRY_GRID,
  MARGIN_RULE,
} from "@/components/argument/DebateView";

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
            its height until then so the sections below don't jump. Measured
            on the featured topic at 390/768/1024/1440 px (1501/1406/1086/956
            px, crux-sheet layout), about 90% of it, so a shorter crux shrinks the gap a little
            rather than a longer one pushing the page a lot. */}
        <div className={settled ? undefined : "min-h-[84rem] md:min-h-[79rem] lg:min-h-[61rem] xl:min-h-[54rem]"}>
        {crux ? (
          // The flagship crux sheet (components/argument/DebateView.tsx), one
          // crux long: ruled paper, one crimson margin rule, small-caps labels
          // over serif answers. The home block keeps its own job, the two
          // conditions that would move each side, in the site's one crux
          // style. No numeral in the margin: there is only one crux here.
          <div className={`mt-8 ${CRUX_SHEET}`}>
            <div className={MARGIN_RULE}>
              <div className={`${ENTRY_GRID} py-5 pr-4 sm:py-6 sm:pr-6`}>
                <div className={ENTRY_COLUMN}>
                  <p className="label-caps !text-crux-text">The crux</p>
                  <h3 className="mt-1 max-w-3xl text-pretty font-serif text-[1.3125rem] font-medium leading-[1.3] text-stone-900 dark:text-stone-100 sm:text-[1.625rem]">
                    {crux.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-secondary dark:text-stone-400">
                    {crux.description}
                  </p>
                </div>
              </div>
            </div>

            {flip ? (
              // Each side's condition is its own ruled entry: same size, same
              // ink; the side is named only by its label's colour.
              <>
                <div className={MARGIN_RULE}>
                  <div className={`${ENTRY_GRID} py-5 pr-4 sm:py-6 sm:pr-6`}>
                    <p className={ENTRY_COLUMN}>
                      <span className="label-caps block !text-rust-700 dark:!text-rust-300">
                        What would change a supporter&rsquo;s mind
                      </span>
                      <span className="mt-1 block max-w-3xl font-serif text-[1.0625rem] leading-[1.5] text-stone-800 dark:text-stone-200 sm:text-[1.1875rem]">
                        {flip.supporter_flip}
                      </span>
                    </p>
                  </div>
                </div>
                <div className={MARGIN_RULE}>
                  <div className={`${ENTRY_GRID} py-5 pr-4 sm:py-6 sm:pr-6`}>
                    <p className={ENTRY_COLUMN}>
                      <span className="label-caps block !text-skeptic dark:!text-[#cfa88a]">
                        What would change a skeptic&rsquo;s mind
                      </span>
                      <span className="mt-1 block max-w-3xl font-serif text-[1.0625rem] leading-[1.5] text-stone-800 dark:text-stone-200 sm:text-[1.1875rem]">
                        {flip.skeptic_flip}
                      </span>
                    </p>
                  </div>
                </div>
              </>
            ) : null}

            {flip?.common_ground || flip?.live_disagreement ? (
              <div className={MARGIN_RULE}>
                <dl className={`${ENTRY_GRID} py-5 pr-4 sm:py-6 sm:pr-6 gap-y-4`}>
                  {flip.common_ground ? (
                    <div className={ENTRY_COLUMN}>
                      <dt className="label-caps">Common ground</dt>
                      <dd className="mt-1 max-w-3xl text-[0.9375rem] leading-relaxed text-secondary dark:text-stone-400">
                        {flip.common_ground}
                      </dd>
                    </div>
                  ) : null}
                  {flip.live_disagreement ? (
                    <div className={ENTRY_COLUMN}>
                      <dt className="label-caps">The live disagreement</dt>
                      <dd className="mt-1 max-w-3xl text-[0.9375rem] leading-relaxed text-secondary dark:text-stone-400">
                        {flip.live_disagreement}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            ) : null}
          </div>
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
                  <p className="text-xs font-medium text-skeptic dark:text-[#cfa88a]">
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
