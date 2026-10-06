/**
 * The /questions search box: which question pages answer a query, best first.
 *
 * Same ranking as the header search and the maps library (lib/siteSearch.ts):
 * question words dropped, words stemmed, typos forgiven, and a page whose
 * question (or its map's question, or a sibling phrasing) answers the query
 * comes before one that only shares a word. Scored by the site-search eval
 * (data/evals/site-search).
 *
 * Pure and client-safe (app/questions/QuestionsSearch.tsx).
 */
import { createSiteSearch, type SearchableItem } from "@/lib/siteSearch";

export interface QuestionSearchItem {
  slug: string;
  question: string;
  /** The name of the map the question belongs to (its question). */
  topicTitle: string;
  topicId: string;
}

type Ranker<T> = (query: string) => (SearchableItem & { item: T })[];

/** One index per list: the page hands the same array to every keystroke. */
const rankers = new WeakMap<readonly QuestionSearchItem[], Ranker<QuestionSearchItem>>();

function rankerFor<T extends QuestionSearchItem>(items: readonly T[]): Ranker<T> {
  const cached = rankers.get(items);
  if (cached) return cached as Ranker<T>;
  const phrasings = new Map<string, string[]>();
  for (const item of items) {
    phrasings.set(item.topicId, [...(phrasings.get(item.topicId) ?? []), item.question]);
  }
  const ranker = createSiteSearch(
    items.map((item) => ({
      id: item.slug,
      title: item.question,
      // The map's name and the other ways its question is asked.
      altNames: [
        item.topicTitle,
        ...(phrasings.get(item.topicId) ?? []).filter((q) => q !== item.question),
      ].join(" | "),
      aliases: item.topicId.replace(/-/g, " "),
      item,
    })),
  );
  rankers.set(items, ranker as Ranker<QuestionSearchItem>);
  return ranker;
}

/**
 * One result per map, best first. Every phrasing of a map's question is
 * searched, but the result is the map's first item in `items` (the primary
 * question page, when the list comes primary-first as
 * getAllQuestionVariations gives it): the other phrasings render the same
 * page and point their canonical URL at it, so three of them in a row would
 * be one answer listed three times.
 */
export function searchQuestions<T extends QuestionSearchItem>(
  items: readonly T[],
  query: string,
): T[] {
  if (!query.trim()) return [];
  const primary = new Map<string, T>();
  for (const item of items) if (!primary.has(item.topicId)) primary.set(item.topicId, item);
  const seen = new Set<string>();
  const results: T[] = [];
  for (const { item } of rankerFor(items)(query)) {
    if (seen.has(item.topicId)) continue;
    seen.add(item.topicId);
    results.push(primary.get(item.topicId) ?? (item as T));
  }
  return results;
}
