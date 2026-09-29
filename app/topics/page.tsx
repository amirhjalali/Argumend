import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MAP_COUNT_LABEL } from "@/data/topicIndex";
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
      ? `Maps — page ${state.page}`
      : `Maps — ${MAP_COUNT_LABEL} contested questions`,
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
    // Search results (including old /topics/tag/* URLs, which now redirect to
    // ?q=) are for readers, not the index: follow the links, skip the page.
    robots:
      state.page > pageCount || state.search.trim()
        ? { index: false, follow: true }
        : undefined,
  };
}

export default async function TopicsPage({ searchParams }: TopicsPageProps) {
  const state = parseTopicsQuery(await searchParams);
  const pageCount = Math.max(1, Math.ceil(countMatchingTopics(state) / TOPICS_PAGE_SIZE));
  if (state.page > pageCount) {
    notFound();
  }
  return <TopicsPageClient initialState={state} />;
}
