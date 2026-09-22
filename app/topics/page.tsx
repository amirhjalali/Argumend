import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { argumentTopicIds } from "@/lib/argument/topicIds";
import { loadArgumentTopic } from "@/lib/argument/draftTopics";
import { TOPIC_COUNT_LABEL } from "@/data/topicIndex";
import { buildPageHref, TOPICS_PAGE_SIZE } from "@/lib/collectionPagination";
import TopicsPageClient from "./TopicsPageClient";
import {
  countMatchingTopics,
  parseTopicsQuery,
  queryForTopicsMetadata,
  type TopicsSearchParams,
} from "./_query";

type TopicsPageProps = { searchParams: Promise<TopicsSearchParams> };

export async function generateMetadata({ searchParams }: TopicsPageProps): Promise<Metadata> {
  const state = parseTopicsQuery(await searchParams);
  const pageCount = Math.max(1, Math.ceil(countMatchingTopics(state) / TOPICS_PAGE_SIZE));
  const filters = queryForTopicsMetadata(state);

  return {
    title: state.page > 1
      ? `Explore Topics — Page ${state.page}`
      : `Explore Topics — ${TOPIC_COUNT_LABEL} Controversial Issues Analyzed`,
    alternates: {
      canonical: buildPageHref("https://argumend.org/topics", state.page, filters),
    },
    pagination: {
      previous: state.page > 1
        ? buildPageHref("https://argumend.org/topics", state.page - 1, filters)
        : null,
      next: state.page < pageCount
        ? buildPageHref("https://argumend.org/topics", state.page + 1, filters)
        : null,
    },
    robots: state.page > pageCount ? { index: false, follow: true } : undefined,
  };
}

export default async function TopicsPage({ searchParams }: TopicsPageProps) {
  const state = parseTopicsQuery(await searchParams);
  const pageCount = Math.max(1, Math.ceil(countMatchingTopics(state) / TOPICS_PAGE_SIZE));
  if (state.page > pageCount) {
    notFound();
  }
  return (
    <TopicsPageClient initialState={state} featured={<FeaturedDebateMaps />} />
  );
}

/**
 * Server-rendered Explore entry point for the new-model (ArgumentGraph)
 * debate maps; the same lightweight registry also powers home and search.
 */
function FeaturedDebateMaps() {
  const featured = argumentTopicIds
    .map((id) => loadArgumentTopic(id))
    .filter((topic): topic is NonNullable<typeof topic> => topic !== null);
  if (featured.length === 0) return null;

  return (
    <section aria-labelledby="featured-maps-heading" className="mb-12 md:mb-16">
      <h2 id="featured-maps-heading" className="label-caps">
        Start here: the full debate maps
      </h2>
      {/* Ruled columns, the same treatment as the home page's flagship maps,
          so the two entry points read as one set. */}
      <div className="mt-3 grid gap-x-8 md:grid-cols-3">
        {featured.map((topic) => (
          <Link
            key={topic.meta.id}
            href={`/topics/${topic.meta.id}`}
            className="group flex flex-col border-t border-stone-300/80 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-deep/50 dark:border-divider md:pb-0"
          >
            <h3 className="font-serif text-[1.375rem] leading-snug text-primary transition-colors group-hover:text-deep dark:text-stone-200 dark:group-hover:text-[#8bb5b1]">
              {topic.meta.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-secondary dark:text-stone-400 md:line-clamp-4">
              {topic.meta.tagline}
            </p>
            <p className="mt-auto inline-flex min-h-11 items-center pt-3 text-sm font-medium text-deep dark:text-[#8bb5b1]">
              Open the debate map
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
