import { CATEGORY_ORDER, topicSummaries } from "@/data/topicIndex";
import type { TopicCategory, TopicStatus } from "@/data/topicIndex";
import { parsePageParam } from "@/lib/collectionPagination";
// Type-only: a value imported from a "use client" module into this
// server-side module would arrive as a client reference, not the value.
import type { SortOption, TopicsQueryState } from "./TopicsPageClient";

export type TopicsSearchParams = Record<
  string,
  string | string[] | undefined
>;

/** The order a bare /topics URL shows; any other sort is written to ?sort=. */
export const DEFAULT_SORT: SortOption = "mixed";

const STATUSES: TopicStatus[] = ["settled", "contested", "highly_speculative"];
const SORTS: TopicsQueryState["sort"][] = [
  "mixed",
  "category",
  "weight-desc",
  "contested",
  "balance-desc",
  "balance-asc",
  "title-asc",
];

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function boundedNumber(value: string | undefined, fallback: number): number {
  if (value === undefined || value.trim() === "") return fallback;
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(100, Math.max(0, number)) : fallback;
}

export function parseTopicsQuery(query: TopicsSearchParams): TopicsQueryState {
  const categoryValue = first(query.category);
  const category = categoryValue && CATEGORY_ORDER.includes(categoryValue as TopicCategory)
    ? categoryValue as TopicCategory
    : "all";
  const statuses = (first(query.status) ?? "")
    .split(",")
    .filter((status): status is TopicStatus => STATUSES.includes(status as TopicStatus));
  let minBalance = boundedNumber(first(query.min), 0);
  const maxBalance = boundedNumber(first(query.max), 100);
  if (minBalance > maxBalance) minBalance = maxBalance;
  const sortValue = first(query.sort);

  return {
    category,
    statuses: [...new Set(statuses)],
    minBalance,
    maxBalance,
    search: (first(query.q) ?? "").slice(0, 200),
    sort: sortValue && SORTS.includes(sortValue as TopicsQueryState["sort"])
      ? sortValue as TopicsQueryState["sort"]
      : DEFAULT_SORT,
    page: parsePageParam(query.page),
  };
}

export function queryForTopicsMetadata(
  state: TopicsQueryState,
): URLSearchParams {
  const query = new URLSearchParams();
  if (state.category !== "all") query.set("category", state.category);
  if (state.statuses.length > 0) query.set("status", state.statuses.join(","));
  if (state.minBalance > 0) query.set("min", String(state.minBalance));
  if (state.maxBalance < 100) query.set("max", String(state.maxBalance));
  if (state.sort !== DEFAULT_SORT) query.set("sort", state.sort);
  if (state.search) query.set("q", state.search);
  return query;
}

export function countMatchingTopics(state: TopicsQueryState): number {
  const query = state.search.trim().toLowerCase();
  return topicSummaries.filter((topic) => {
    if (state.category !== "all" && topic.category !== state.category) return false;
    if (state.statuses.length > 0 && !state.statuses.includes(topic.status)) return false;
    if (topic.balance < state.minBalance || topic.balance > state.maxBalance) return false;
    if (
      query &&
      !topic.title.toLowerCase().includes(query) &&
      !topic.meta_claim.toLowerCase().includes(query)
    ) {
      return false;
    }
    return true;
  }).length;
}

/**
 * Deal the topics out one category at a time, in CATEGORY_ORDER, each
 * category's own list strongest-evidenced first. The first page then shows
 * the range of the library instead of 24 policy questions in a row.
 * Deterministic: the same input always gives the same order.
 */
export function mixCategories<T extends { category: TopicCategory; weight: number }>(
  topics: readonly T[],
): T[] {
  const queues = CATEGORY_ORDER.map((category) =>
    topics.filter((t) => t.category === category).sort((a, b) => b.weight - a.weight),
  );
  const rounds = Math.max(0, ...queues.map((queue) => queue.length));
  const mixed: T[] = [];
  for (let round = 0; round < rounds; round++) {
    for (const queue of queues) {
      if (round < queue.length) mixed.push(queue[round]);
    }
  }
  return mixed;
}
