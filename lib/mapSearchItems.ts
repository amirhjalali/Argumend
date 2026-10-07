/**
 * Every map as a search item, for the ranking in lib/siteSearch.ts.
 *
 * One builder for every search box that finds maps (the header search in
 * components/SearchModal.tsx, the library at /topics?q=) and for the eval in
 * data/evals/site-search, so all three see the same names. A map's name is
 * the question its page asks (lib/mapNaming.ts); its other names are its old
 * short title and the "Also asked as" phrasings of its /questions pages.
 *
 * Client-safe: only the lightweight indexes (no full topic data).
 */
import { CATEGORY_LABELS, topicSummaries, type TopicCategory } from "@/data/topicIndex";
import { argumentTopicIndex } from "@/lib/argument/topicIds";
import { mapDisplayTitle } from "@/lib/mapNaming";
import { getTopicQuestionPhrasings } from "@/lib/questions";
import type { SearchableItem } from "@/lib/siteSearch";

export interface MapSearchItem extends SearchableItem {
  /** The map's id (its /topics/[id] slug). */
  mapId: string;
  href: string;
  /** One line under the name: the flagship tagline or the legacy claim. */
  subtitle: string;
  kind: "debate-map" | "topic";
  category?: TopicCategory;
}

/**
 * A map's id read as words ("assisted-dying-euthanasia", "nuclear-renaissance-smr"):
 * short handles an editor chose, often the word a reader types when the
 * question itself words it differently.
 */
function idWords(id: string): string {
  return id.replace(/-/g, " ");
}

/** Flagship (ArgumentGraph) maps: named by their question, with aliases. */
export const DEBATE_MAP_SEARCH_ITEMS: MapSearchItem[] = argumentTopicIndex.map((topic) => ({
  id: `map-${topic.id}`,
  mapId: topic.id,
  href: `/topics/${topic.id}`,
  title: topic.title,
  subtitle: topic.tagline,
  kind: "debate-map",
  meta_claim: topic.tagline,
  tags: "argument map debate map flagship cruxes positions",
  aliases: [idWords(topic.id), ...topic.aliases].join(" | "),
  flagship: true,
}));

/** The older pillar maps: named by their question, findable by every other name. */
export const TOPIC_SEARCH_ITEMS: MapSearchItem[] = topicSummaries.map((topic) => ({
  id: `topic-${topic.id}`,
  mapId: topic.id,
  href: `/topics/${topic.id}`,
  title: mapDisplayTitle(topic),
  altNames: [topic.title, ...getTopicQuestionPhrasings(topic.id), ...(topic.aliases ?? [])].join(" | "),
  subtitle: topic.meta_claim,
  kind: "topic",
  category: topic.category,
  meta_claim: topic.meta_claim,
  categoryText: `${topic.category} ${CATEGORY_LABELS[topic.category]}`,
  aliases: idWords(topic.id),
  tags: (topic.tags ?? []).join(" "),
  keywords: topic.keywords,
  body: topic.firstCrux,
}));

export const MAP_SEARCH_ITEMS: MapSearchItem[] = [...DEBATE_MAP_SEARCH_ITEMS, ...TOPIC_SEARCH_ITEMS];
