import { CATEGORY_ORDER, topicSummaries } from "@/data/topicIndex";
import type { TopicCategory, TopicStatus } from "@/data/topicIndex";
import { argumentTopicIndex, type ArgumentTopicId } from "@/lib/argument/topicIds";
import { parsePageParam } from "@/lib/collectionPagination";
import { mapDisplayTitle } from "@/lib/mapNaming";

/**
 * The maps library's query model, shared by the server page (metadata,
 * page count) and the client list, so both count the same rows.
 *
 * The library offers search, a category, and a neutral order. It does not
 * sort or filter by any score: no "most settled", no "strongest for", no
 * balance range. A reader looking for a map should not be shown a league
 * table on the way to it.
 */

export type SortOption = "mixed" | "category" | "title-asc";

export type TopicsQueryState = {
  category: TopicCategory | "all";
  search: string;
  sort: SortOption;
  page: number;
};

export type TopicsSearchParams = Record<
  string,
  string | string[] | undefined
>;

/** The order a bare /topics URL shows; any other sort is written to ?sort=. */
export const DEFAULT_SORT: SortOption = "mixed";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "mixed", label: "Mixed categories" },
  { value: "category", label: "By category" },
  { value: "title-asc", label: "A–Z" },
];

const SORTS = SORT_OPTIONS.map((option) => option.value);

/**
 * How far the evidence on a legacy map has got, in words. Muted stone text
 * on the row, never a colour: it describes the map, it does not score a side.
 */
export const STATUS_LABELS: Record<TopicStatus, string> = {
  settled: "Evidence largely converges",
  contested: "Evidence still divided",
  highly_speculative: "Evidence still thin",
};

/**
 * The library shelf for each new-model (ArgumentGraph) map, so a category
 * filter finds it next to the older maps on the same subject. Typed by the
 * registry's ids: registering a map without a shelf fails the type check.
 */
export const DEBATE_MAP_CATEGORY: Record<ArgumentTopicId, TopicCategory> = {
  "ai-mass-unemployment": "technology",
  "capitalism-after-ai": "economics",
  "us-israel-support": "policy",
};

/** One row in the library: a new-model debate map or an older topic map. */
export interface LibraryEntry {
  id: string;
  href: string;
  /** New-model maps are titled as questions; older maps may be labels. */
  title: string;
  summary: string;
  category: TopicCategory;
  kind: "debate-map" | "topic";
  status?: TopicStatus;
  pillarCount?: number;
  evidenceCount?: number;
  /** Lower-cased text the search box matches against. */
  haystack: string;
}

/** The new-model maps, pinned above everything else in the library. */
export const DEBATE_MAP_ENTRIES: LibraryEntry[] = argumentTopicIndex.map((topic) => ({
  id: topic.id,
  href: `/topics/${topic.id}`,
  title: topic.title,
  summary: topic.tagline,
  category: DEBATE_MAP_CATEGORY[topic.id],
  kind: "debate-map",
  haystack: [topic.title, topic.tagline, ...topic.aliases, "debate map"]
    .join(" \n ")
    .toLowerCase(),
}));

const TOPIC_ENTRIES: LibraryEntry[] = topicSummaries.map((topic) => ({
  id: topic.id,
  href: `/topics/${topic.id}`,
  title: mapDisplayTitle(topic),
  summary: topic.meta_claim,
  category: topic.category,
  kind: "topic",
  status: topic.status,
  pillarCount: topic.pillarCount,
  evidenceCount: topic.evidenceCount,
  haystack: [topic.title, topic.meta_claim, ...(topic.tags ?? [])]
    .join(" \n ")
    .toLowerCase(),
}));

/** Every map the library can list, new-model maps first. */
export const LIBRARY_ENTRIES: LibraryEntry[] = [...DEBATE_MAP_ENTRIES, ...TOPIC_ENTRIES];

const TOPIC_WEIGHT = new Map(topicSummaries.map((topic) => [topic.id, topic.weight]));

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function parseTopicsQuery(query: TopicsSearchParams): TopicsQueryState {
  const categoryValue = first(query.category);
  const category = categoryValue && CATEGORY_ORDER.includes(categoryValue as TopicCategory)
    ? categoryValue as TopicCategory
    : "all";
  const sortValue = first(query.sort);

  return {
    category,
    search: (first(query.q) ?? "").slice(0, 200),
    sort: sortValue && SORTS.includes(sortValue as SortOption)
      ? sortValue as SortOption
      : DEFAULT_SORT,
    page: parsePageParam(query.page),
  };
}

/** The URL query for a state, without the page. Unknown or default values are left out. */
export function queryForTopicsState(
  state: Pick<TopicsQueryState, "category" | "search" | "sort">,
): URLSearchParams {
  const query = new URLSearchParams();
  if (state.category !== "all") query.set("category", state.category);
  if (state.sort !== DEFAULT_SORT) query.set("sort", state.sort);
  const search = state.search.trim();
  if (search) query.set("q", search);
  return query;
}

export const queryForTopicsMetadata = queryForTopicsState;

/**
 * Whether an entry matches the search box. Also matches with hyphens read as
 * spaces, so an old tag URL (/topics/tag/public-health, redirected to
 * ?q=public-health) finds maps tagged "public-health" and maps that say
 * "public health".
 */
export function matchesSearch(entry: LibraryEntry, search: string): boolean {
  const query = search.trim().toLowerCase();
  if (!query) return true;
  if (entry.haystack.includes(query)) return true;
  const spaced = query.replace(/-+/g, " ").trim();
  return spaced !== query && spaced.length > 0 && entry.haystack.includes(spaced);
}

/**
 * The "Start here" group leads the unfiltered library: every category, no
 * search, nothing narrowed to this device's saves. Under any filter the
 * new-model maps join the list itself instead, still first.
 */
export function showsStartHere(
  state: Pick<TopicsQueryState, "category" | "search">,
  savedOnly = false,
): boolean {
  return state.category === "all" && state.search.trim() === "" && !savedOnly;
}

export interface LibraryFilterOptions {
  /** Narrow to these ids (the maps saved on this device). */
  savedIds?: ReadonlySet<string>;
}

/**
 * The rows the list shows, in order. New-model maps come first whenever they
 * are in the list; the older maps follow in the chosen neutral order.
 */
export function filterLibrary(
  state: Pick<TopicsQueryState, "category" | "search" | "sort">,
  { savedIds }: LibraryFilterOptions = {},
): LibraryEntry[] {
  const keep = (entry: LibraryEntry) =>
    (state.category === "all" || entry.category === state.category) &&
    (!savedIds || savedIds.has(entry.id)) &&
    matchesSearch(entry, state.search);

  const maps = showsStartHere(state, savedIds !== undefined)
    ? []
    : DEBATE_MAP_ENTRIES.filter(keep);
  const topics = TOPIC_ENTRIES.filter(keep);
  return [...maps, ...orderTopics(topics, state.sort)];
}

export function countMatchingTopics(
  state: Pick<TopicsQueryState, "category" | "search" | "sort">,
): number {
  return filterLibrary(state).length;
}

function orderTopics(topics: LibraryEntry[], sort: SortOption): LibraryEntry[] {
  if (sort === "mixed") return mixCategories(topics.map(withWeight));
  const sorted = [...topics];
  if (sort === "title-asc") {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
    return sorted;
  }
  // By category: the category order, then the fullest maps first within each.
  return sorted
    .map(withWeight)
    .sort(
      (a, b) =>
        CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category) ||
        b.weight - a.weight,
    );
}

function withWeight(entry: LibraryEntry): LibraryEntry & { weight: number } {
  return { ...entry, weight: TOPIC_WEIGHT.get(entry.id) ?? 0 };
}

/**
 * Deal the topics out one category at a time, in CATEGORY_ORDER, each
 * category's own list fullest-evidenced first (weight is how much a map has
 * gathered, not which side it favours). The first page then shows the range
 * of the library instead of 24 policy questions in a row. Deterministic: the
 * same input always gives the same order.
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
