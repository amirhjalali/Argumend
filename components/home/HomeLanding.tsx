"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { HeroAnalyze } from "@/components/HeroAnalyze";
import { FeaturedTopicHero } from "@/components/FeaturedTopicHero";
import { Footer } from "@/components/Footer";
import { BalanceWeightChip } from "@/components/BalanceWeightChip";
import { topicSummaries, CATEGORY_ORDER } from "@/data/topicIndex";
import { argumentTopicIndex } from "@/lib/argument/topicIds";

/**
 * The home page's landing content (everything inside <main> before a topic
 * is chosen). Lives apart from HomeClient so the canvas shell and the landing
 * design can change independently.
 */

const GRID_TOPICS_COUNT = 6;

function FlagshipDebateMaps() {
  return (
    <section
      aria-labelledby="flagship-debate-maps-heading"
      className="px-4 pb-10 pt-8 md:px-8 md:pb-14 md:pt-14"
    >
      {/* The page's one hero. It used to be a rust-tinted card with a small
          h1, followed by a second, larger "hero" headline further down, so
          the page opened twice (2026-09-22 design audit, finding 10). Now the
          h1 sets the promise at display size on bare parchment and the three
          maps sit under it as quiet columns. */}
      <div className="mx-auto max-w-5xl">
        <p className="label-caps">Start here</p>
        <div className="mt-3 grid gap-5 md:grid-cols-[minmax(0,1.25fr)_minmax(16rem,0.75fr)] md:items-end md:gap-12">
          <h1
            id="flagship-debate-maps-heading"
            className="text-balance font-serif text-[2.5rem] font-normal leading-[1.04] tracking-[-0.02em] text-primary dark:text-stone-200 sm:text-[3.25rem] lg:text-[3.75rem]"
          >
            The whole fight, not a verdict.
          </h1>
          <p className="max-w-md text-base leading-relaxed text-secondary dark:text-stone-400 md:pb-2">
            Choose a live question to compare four serious positions, the
            load-bearing cruxes between them, and the evidence each camp
            reads differently — all in about five minutes.
          </p>
        </div>

        <div className="mt-9 grid gap-x-8 md:grid-cols-3">
          {argumentTopicIndex.map((topic) => (
            <Link
              key={topic.id}
              href={`/topics/${topic.id}`}
              className="group flex flex-col border-t border-stone-300/80 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-deep/50 dark:border-divider md:pb-2"
            >
              <h2 className="font-serif text-[1.375rem] leading-snug text-primary dark:text-stone-200 transition-colors group-hover:text-deep dark:group-hover:text-[#8bb5b1]">
                {topic.title}
              </h2>
              <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-secondary dark:text-stone-400">
                {topic.tagline}
              </p>
              <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-deep dark:text-[#8bb5b1]">
                Open the debate map
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

interface HomeLandingProps {
  onTopicSelect: (id: string) => void;
  /** Optional live mini-map, built by the caller (it owns the React Flow import). */
  preview?: ReactNode;
}

export function HomeLanding({ onTopicSelect, preview }: HomeLandingProps) {
  const gridTopics = CATEGORY_ORDER
    .map((cat) => topicSummaries.find((t) => t.category === cat))
    .filter(Boolean)
    .slice(0, GRID_TOPICS_COUNT) as typeof topicSummaries;

  return (
    <>
      {/* Section 1: primary discovery path for the flagship maps. */}
      <FlagshipDebateMaps />

      {/* Section 2: legacy featured-topic experience. */}
      <FeaturedTopicHero
        onTopicSelect={onTopicSelect}
        headingLevel="h2"
        preview={preview}
      />

      {/* Section 3: Topic Grid */}
      <div className="px-4 md:px-8 py-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-xl font-semibold text-primary dark:text-stone-200 mb-5">
            {topicSummaries.length} topics analyzed
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {gridTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => onTopicSelect(topic.id)}
                className="group text-left p-4 bg-white dark:bg-[var(--bg-card)] border border-stone-200/60 dark:border-[var(--border-divider)] rounded-xl hover:border-deep/30 hover:shadow-md hover:scale-[1.01] hover:-translate-y-0.5 transition-all"
              >
                <h3 className="font-serif text-sm font-medium text-primary dark:text-stone-200 group-hover:text-deep transition-colors leading-snug line-clamp-2">
                  {topic.title}
                </h3>
                {/* Glyph only: the quadrant word overflowed these
                    narrow cards at desktop widths. */}
                <BalanceWeightChip
                  balance={topic.balance}
                  weight={topic.weight}
                  verdict={topic.verdict}
                  className="mt-2"
                />
              </button>
            ))}
          </div>
          <div className="mt-5 text-center">
            <Link
              href="/topics"
              className="inline-flex items-center gap-1 text-sm font-serif font-medium text-deep hover:text-deep-dark transition-colors group"
            >
              Browse all topics
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Section 4: Demoted Analyze CTA */}
      <HeroAnalyze onTopicSelect={onTopicSelect} />

      <Footer />
    </>
  );
}
