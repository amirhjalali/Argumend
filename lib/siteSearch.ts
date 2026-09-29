/**
 * Ranking for the site search (⌘K, components/SearchModal.tsx).
 *
 * People type questions ("is nuclear power safe"), so the index drops the
 * question words that every map title now shares ("is", "should", "the") and
 * ranks by how much of the query a result's NAME covers, not by how often a
 * word turns up in its body. A map's name is its question, its old short
 * title, its "Also asked as" phrasings (lib/questions.ts) and any aliases.
 *
 * Two passes:
 *   1. MiniSearch (BM25, prefix + light fuzzy) finds candidates, with name
 *      fields boosted over the claim, tags and category.
 *   2. A rerank multiplies each score by how many of the query's words the
 *      result's name holds, with a bonus when the words appear as a phrase.
 *      A map whose name answers every word beats one whose body mentions them.
 *
 * Pure and client-safe: no data imports; the caller supplies the items.
 */
import MiniSearch from "minisearch";

export interface SearchableItem {
  id: string;
  /** The name shown to the reader (for a map: its question). */
  title: string;
  /** Other names for the same thing: old title, "Also asked as" phrasings. */
  altNames?: string;
  aliases?: string;
  meta_claim?: string;
  categoryText?: string;
  tags?: string;
  /**
   * Flagship maps (the deepest ones: named camps, a dated crux ledger) get a
   * small lift, so when a flagship and an older map both answer every word of
   * a query ("AI jobs"), the flagship comes first. Never enough to lift a
   * flagship over a map whose name answers the query and its own does not.
   */
  flagship?: boolean;
}

const FLAGSHIP_LIFT = 1.5;

/**
 * Words that carry no subject. Map names are questions now, so without this
 * "is" and "should" match half the library.
 */
const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "been", "by", "can", "could", "did", "do",
  "does", "for", "from", "has", "have", "how", "if", "in", "into", "is", "it", "its",
  "more", "of", "on", "or", "should", "so", "than", "that", "the", "their", "there",
  "this", "to", "was", "we", "were", "what", "when", "which", "who", "why", "will",
  "with", "would", "you",
]);

const TOKEN = /[\p{L}\p{N}$]+/gu;

/** Lowercase, split and drop stop words: the terms both index and query use. */
export function searchTerms(text: string): string[] {
  return (text.toLowerCase().match(TOKEN) ?? []).filter((term) => !STOP_WORDS.has(term));
}

function processTerm(term: string): string | null {
  const lower = term.toLowerCase();
  return STOP_WORDS.has(lower) ? null : lower;
}

/** A query term found in a name term: same word, a prefix of it, or its plural. */
function termMatches(query: string, name: string): boolean {
  if (name.startsWith(query)) return true;
  // "vaccines" ~ "vaccine", "mandates" ~ "mandate", "jobs" ~ "job".
  return name.length >= 3 && query.length - name.length <= 2 && query.startsWith(name);
}

function nameStrings(item: SearchableItem): string[] {
  return [item.title, item.altNames ?? "", item.aliases ?? ""].filter(Boolean);
}

/** Share of the query's words the item's names hold (0–1), and whether they form a phrase. */
function nameCoverage(queryTerms: string[], item: SearchableItem): { coverage: number; phrase: boolean } {
  if (queryTerms.length === 0) return { coverage: 0, phrase: false };
  const names = nameStrings(item).flatMap((name) => name.split(/[\n|]/)).map(searchTerms);
  const all = names.flat();
  const hit = queryTerms.filter((q) => all.some((term) => termMatches(q, term))).length;
  const phrase =
    queryTerms.length > 1 &&
    names.some((terms) =>
      terms.some((_, start) =>
        queryTerms.every((q, offset) => {
          const term = terms[start + offset];
          return term !== undefined && termMatches(q, term);
        }),
      ),
    );
  return { coverage: hit / queryTerms.length, phrase };
}

export function createSiteSearch<T extends SearchableItem>(items: readonly T[]): (query: string) => T[] {
  const ms = new MiniSearch<T>({
    idField: "id",
    fields: ["title", "altNames", "aliases", "meta_claim", "categoryText", "tags"],
    storeFields: ["id"],
    processTerm,
    searchOptions: {
      boost: { title: 4, altNames: 3, aliases: 2, meta_claim: 1, tags: 1, categoryText: 0.5 },
      fuzzy: 0.2,
      prefix: true,
    },
  });
  ms.addAll(items as T[]);
  const byId = new Map(items.map((item) => [item.id, item]));

  return (query: string) => {
    const queryTerms = searchTerms(query);
    if (queryTerms.length === 0) return [];
    return ms
      .search(queryTerms.join(" "))
      .flatMap((result) => {
        const item = byId.get(result.id as string);
        if (!item) return [];
        const { coverage, phrase } = nameCoverage(queryTerms, item);
        // A name that answers every word outranks body matches; a phrase more so.
        const score =
          result.score *
          (0.25 + coverage) ** 2 *
          (phrase ? 2 : 1) *
          (item.flagship && coverage === 1 ? FLAGSHIP_LIFT : 1);
        return [{ item, score }];
      })
      .sort((a, b) => b.score - a.score)
      .map(({ item }) => item);
  };
}
