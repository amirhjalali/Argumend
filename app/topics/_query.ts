import { CATEGORY_ORDER, topicSummaries } from "@/data/topicIndex";
import type { TopicCategory } from "@/data/topicIndex";
import argumentSummaries from "@/data/argumentTopicSummaries.json";
import { argumentTopicIndex, type ArgumentTopicId } from "@/lib/argument/topicIds";
import { parsePageParam } from "@/lib/collectionPagination";
import { mapDisplayTitle } from "@/lib/mapNaming";
import { MAP_SEARCH_ITEMS } from "@/lib/mapSearchItems";
import { createSiteSearch } from "@/lib/siteSearch";

/**
 * The maps library's query model, shared by the server page (metadata,
 * page count) and the client list, so both count the same rows.
 *
 * The library offers search, a category, and a neutral order. Search ranks
 * with the header search's ranking (lib/siteSearch.ts): a map whose question
 * answers the query comes first. It does not
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
  /**
   * The question the map's first crux asks, as the map page heads it
   * (generated into the summaries by scripts/regen-summaries.ts). The card
   * shows what a map turns on, never how far its evidence has got: that
   * reading lives inside the map.
   */
  firstCrux?: string;
  /** How many questions the map turns on (its cruxes). */
  cruxCount?: number;
}

const ARGUMENT_CRUX = new Map(
  (argumentSummaries as { id: string; firstCrux: string; cruxCount: number }[]).map(
    (summary) => [summary.id, summary],
  ),
);

/** The new-model maps, pinned above everything else in the library. */
export const DEBATE_MAP_ENTRIES: LibraryEntry[] = argumentTopicIndex.map((topic) => {
  const crux = ARGUMENT_CRUX.get(topic.id);
  return {
    id: topic.id,
    href: `/topics/${topic.id}`,
    title: topic.title,
    summary: topic.tagline,
    category: DEBATE_MAP_CATEGORY[topic.id],
    kind: "debate-map",
    firstCrux: crux?.firstCrux,
    cruxCount: crux?.cruxCount,
  };
});

const TOPIC_ENTRIES: LibraryEntry[] = topicSummaries.map((topic) => ({
  id: topic.id,
  href: `/topics/${topic.id}`,
  title: mapDisplayTitle(topic),
  summary: topic.meta_claim,
  category: topic.category,
  kind: "topic",
  firstCrux: topic.firstCrux,
  // One crux per pillar on the older maps.
  cruxCount: topic.pillarCount,
}));

/** Every map the library can list, new-model maps first. */
export const LIBRARY_ENTRIES: LibraryEntry[] = [...DEBATE_MAP_ENTRIES, ...TOPIC_ENTRIES];

const ENTRY_BY_ID = new Map(LIBRARY_ENTRIES.map((entry) => [entry.id, entry]));

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
 * The maps that answer a search, best first, by map id. Built on first use
 * and kept: the server page and the client list both call it. Hyphens read
 * as spaces, so an old tag URL (/topics/tag/public-health, redirected to
 * ?q=public-health) finds the maps tagged "public-health" first.
 */
let librarySearch: ((query: string) => { mapId: string }[]) | undefined;

export function rankLibrarySearch(search: string): string[] {
  librarySearch ??= createSiteSearch(MAP_SEARCH_ITEMS);
  const ranked = librarySearch(search.replace(/-+/g, " ")).map((item) => item.mapId);
  // A search that is exactly a tag lists every map carrying it first.
  const tag = search.trim().toLowerCase();
  const tagged = new Set(topicSummaries.filter((topic) => topic.tags.includes(tag)).map((t) => t.id));
  if (tagged.size === 0) return ranked;
  const rest = ranked.filter((id) => !tagged.has(id));
  return [...ranked.filter((id) => tagged.has(id)), ...[...tagged].filter((id) => !ranked.includes(id)), ...rest];
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
 * The rows the list shows, in order. A search in the default order lists
 * the maps that answer it best first, whichever model they are. Otherwise
 * new-model maps come first whenever they are in the list, and the older maps
 * follow in the chosen neutral order.
 */
export function filterLibrary(
  state: Pick<TopicsQueryState, "category" | "search" | "sort">,
  { savedIds }: LibraryFilterOptions = {},
): LibraryEntry[] {
  const keep = (entry: LibraryEntry) =>
    (state.category === "all" || entry.category === state.category) &&
    (!savedIds || savedIds.has(entry.id));

  if (state.search.trim()) {
    const ranked = rankLibrarySearch(state.search)
      .map((id) => ENTRY_BY_ID.get(id))
      .filter((entry): entry is LibraryEntry => entry !== undefined && keep(entry));
    if (state.sort === "mixed") return ranked;
    const found = new Set(ranked.map((entry) => entry.id));
    const maps = DEBATE_MAP_ENTRIES.filter((entry) => found.has(entry.id));
    return [...maps, ...orderTopics(TOPIC_ENTRIES.filter((entry) => found.has(entry.id)), state.sort)];
  }

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
