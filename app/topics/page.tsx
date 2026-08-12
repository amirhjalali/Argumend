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
    <>
      <FeaturedDebateMaps />
      <TopicsPageClient initialState={state} />
    </>
  );
}

/**
 * Server-rendered banner linking the Explore index to the new-model
 * (ArgumentGraph) debate maps — currently their only in-product inbound link.
 */
function FeaturedDebateMaps() {
  const featured = argumentTopicIds
    .map((id) => loadArgumentTopic(id))
    .filter((topic): topic is NonNullable<typeof topic> => topic !== null);
  if (featured.length === 0) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8">
      {featured.map((topic) => (
        <Link
          key={topic.meta.id}
          href={`/topics/${topic.meta.id}`}
          className="surface-card card-hover block rounded-lg border-l-4 border-[#a23b3b] p-4 sm:p-5"
        >
          <p className="text-[11px] font-medium uppercase tracking-wider text-[#a23b3b]">
            Featured debate map
          </p>
          <h2 className="mt-1.5 font-serif text-xl sm:text-2xl text-stone-900 dark:text-stone-100">
            {topic.meta.title}
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-secondary dark:text-stone-300">
            {topic.meta.tagline}
          </p>
          <p className="mt-2 text-xs text-muted dark:text-stone-400">
            Both sides at full strength · five minutes to see what the fight
            actually turns on
          </p>
        </Link>
      ))}
    </div>
  );
}
