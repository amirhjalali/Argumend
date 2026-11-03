import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORY_LABELS, MAP_COUNT } from "@/data/topicIndex";
import { fitMetaDescription } from "@/lib/seoText";
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
  const matching = countMatchingTopics(state);
  const pageCount = Math.max(1, Math.ceil(matching / TOPICS_PAGE_SIZE));
  const filters = queryForTopicsMetadata(state);

  // Each category view, and each page of one, is its own canonical URL, so
  // each gets its own title and description rather than the library's.
  const category = state.category === "all" ? null : CATEGORY_LABELS[state.category];
  const shelf = category ? `${category} maps` : "Maps";
  const count = category ? matching : MAP_COUNT;
  const pageNote = state.page > 1 ? ` Page ${state.page} of ${pageCount}.` : "";
  const description = category
    ? `${count} argument maps of contested ${category.toLowerCase()} questions: each side's strongest case, the evidence, and the questions it turns on.${pageNote}`
    : state.page > 1
      ? `${MAP_COUNT} argument maps of contested questions: each side's strongest case, the evidence, and the questions it turns on.${pageNote}`
      : undefined;

  return {
    title: state.page > 1
      ? `${shelf} — page ${state.page}`
      : `${shelf} — ${count} contested questions`,
    // The bare library keeps the layout's description.
    ...(description ? { description: fitMetaDescription(description) } : {}),
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
