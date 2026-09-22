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
    <section aria-labelledby="featured-maps-heading" className="mb-10">
      <h2 id="featured-maps-heading" className="label-caps mb-3">
        Start here: the full debate maps
      </h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {featured.map((topic) => (
          <Link
            key={topic.meta.id}
            href={`/topics/${topic.meta.id}`}
            className="surface-card group flex flex-col rounded-lg p-4 sm:p-5 transition-colors hover:border-deep/40 dark:hover:border-deep-light/50"
          >
            <h3 className="font-serif text-xl sm:text-[1.375rem] leading-snug text-primary">
              {topic.meta.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-secondary">
              {topic.meta.tagline}
            </p>
            <p className="mt-auto pt-3 text-sm font-medium text-deep dark:text-[#8bb5b1]">
              Open the debate map
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
