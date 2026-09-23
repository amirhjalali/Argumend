"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { HeroAnalyze } from "@/components/HeroAnalyze";
import { FeaturedTopicHero } from "@/components/FeaturedTopicHero";
import { Footer } from "@/components/Footer";
import {
  topicSummaries,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
} from "@/data/topicIndex";
import { argumentTopicIndex } from "@/lib/argument/topicIds";

/**
 * The home page's landing content (everything inside <main> before a topic
 * is chosen). Lives apart from HomeClient so the canvas shell and the landing
 * design can change independently.
 *
 * One scroll, four beats, all on the same left edge and separated by the same
 * hairline: the three flagship maps (the promise), one crux worked through
 * (the method), the library (the breadth), and the paste box (your own
 * argument). No section sits on its own tinted band, so the rhythm comes
 * from type and space rather than from alternating backgrounds.
 */

const LIBRARY_TOPICS_PER_CATEGORY = 3;

function FlagshipDebateMaps() {
  return (
    <section
      aria-labelledby="flagship-debate-maps-heading"
      className="px-4 pb-14 pt-10 md:px-8 md:pb-20 md:pt-16"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-5 md:grid-cols-[minmax(0,1.25fr)_minmax(16rem,0.75fr)] md:items-end md:gap-12">
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

        <div className="mt-10 grid gap-x-8 md:grid-cols-3">
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
              <span className="mt-auto inline-flex min-h-11 items-center gap-1 pt-3 text-sm font-medium text-deep dark:text-[#8bb5b1]">
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

/**
 * A typographic index of the library: each category's first few topics as
 * plain serif links. It replaces a row of five narrow tiles whose titles
 * truncated at two lines and whose only other content was a crimson
 * balance-and-weight glyph, which made the library read as a scoreboard.
 */
function LibraryIndex() {
  const shelves = CATEGORY_ORDER.map((category) => {
    const inCategory = topicSummaries.filter((t) => t.category === category);
    return {
      category,
      count: inCategory.length,
      topics: inCategory.slice(0, LIBRARY_TOPICS_PER_CATEGORY),
    };
  }).filter((shelf) => shelf.count > 0);

  return (
    <section aria-labelledby="home-library-heading" className="px-4 md:px-8">
      <div className="mx-auto max-w-5xl border-t border-stone-300/70 py-14 dark:border-divider md:py-20">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12">
          <h2
            id="home-library-heading"
            className="text-balance font-serif text-[2rem] leading-[1.08] tracking-[-0.01em] text-primary dark:text-stone-200 md:text-[2.5rem]"
          >
            {topicSummaries.length} questions, mapped the same way
          </h2>
          <p className="max-w-md text-base leading-relaxed text-secondary dark:text-stone-400 md:pt-2">
            Each one sets out the strongest case on every side, the evidence
            and how much it weighs, and the cruxes that would settle it.
          </p>
        </div>

        <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          {shelves.map((shelf) => (
            <div key={shelf.category}>
              <h3 className="border-b border-stone-300/70 pb-2 dark:border-divider">
                <Link
                  href={`/topics?category=${shelf.category}`}
                  className="flex min-h-11 items-end justify-between gap-2 text-primary dark:text-stone-200 transition-colors hover:text-deep dark:hover:text-[#8bb5b1]"
                >
                  <span className="label-caps text-current">
                    {CATEGORY_LABELS[shelf.category]}
                  </span>
                  <span className="pb-px text-xs tabular-nums text-muted">
                    {shelf.count}
                  </span>
                </Link>
              </h3>
              <ul className="mt-1">
                {shelf.topics.map((topic, index) => (
                  // Two per shelf on phones keeps the section to one screen.
                  <li key={topic.id} className={index >= 2 ? "hidden sm:block" : undefined}>
                    <Link
                      href={`/topics/${topic.id}`}
                      className="block min-h-11 py-2 font-serif text-[1.0625rem] leading-snug text-secondary dark:text-stone-400 transition-colors hover:text-deep dark:hover:text-[#8bb5b1]"
                    >
                      {topic.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Link
          href="/topics"
          className="mt-8 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-deep transition-colors hover:text-deep-dark dark:text-[#8bb5b1] dark:hover:text-[#a9cbc8] group"
        >
          Browse all {topicSummaries.length} topics
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </section>
  );
}

interface HomeLandingProps {
  onTopicSelect: (id: string) => void;
}

export function HomeLanding({ onTopicSelect }: HomeLandingProps) {
  return (
    <>
      <FlagshipDebateMaps />
      <FeaturedTopicHero onTopicSelect={onTopicSelect} />
      <LibraryIndex />
      <HeroAnalyze onTopicSelect={onTopicSelect} />
      <Footer />
    </>
  );
}
