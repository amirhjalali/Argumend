/**
 * Ranking for every search box that finds maps: the header search (⌘K,
 * components/SearchModal.tsx), the maps library (/topics?q=) and the
 * questions index (/questions?q=). Measured by data/evals/site-search.
 *
 * People type questions ("is nuclear power safe"), so the index drops the
 * question words that every map title now shares ("is", "should", "the") and
 * ranks by how much of the query a result's NAME covers, not by how often a
 * word turns up in its body. A map's name is its question, its old short
 * title, its "Also asked as" phrasings (lib/questions.ts), its id and any
 * aliases.
 *
 * Words are folded the way the paste lane folds them (lib/paste/stem.ts):
 * abbreviations spelled out ("UBI", "SMRs", "EVs"), then the Porter stemmer,
 * so "vaccines" meets "vaccine" and "policing" meets "police". A few number
 * words too, so "4 day week" meets "four-day week".
 *
 * Two passes:
 *   1. MiniSearch (BM25, prefix + typo-tolerant fuzzy) finds candidates, with
 *      name fields boosted over the claim, tags and category. A candidate has
 *      to hold at least half of the query's words somewhere, so "is nuclear
 *      power safe" does not list every map that mentions "power".
 *   2. A rerank multiplies each score by how many of the query's words the
 *      result's name holds, with a bonus when the words appear as a phrase.
 *      A map whose name answers every word beats one whose body mentions them.
 *
 * Pure and client-safe: no data imports; the caller supplies the items.
 */
import MiniSearch from "minisearch";
import { expandAbbreviations, porterStem } from "@/lib/paste/stem";

export interface SearchableItem {
  id: string;
  /** The name shown to the reader (for a map: its question). */
  title: string;
  /** Other names for the same thing, "|"-separated: old title, "Also asked as" phrasings. */
  altNames?: string;
  /** Short handles, "|"-separated: the map's id in words, flagship aliases. */
  aliases?: string;
  meta_claim?: string;
  categoryText?: string;
  tags?: string;
  /** Longer text that may hold the words (a map's first crux). Weighted least. */
  body?: string;
  /**
   * Flagship maps (the deepest ones: named camps, a dated crux ledger) get a
   * small lift, so when a flagship and an older map both answer every word of
   * a query ("AI jobs"), the flagship comes first. Never enough to lift a
   * flagship over a map whose name answers the query and its own does not.
   */
  flagship?: boolean;
}

const FLAGSHIP_LIFT = 2;

/**
 * Words that carry no subject. Map names are questions now, so without this
 * "is" and "should" match half the library.
 */
const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "been", "by", "can", "could", "did", "do",
  "does", "for", "from", "has", "have", "how", "if", "in", "into", "is", "it", "its",
  "more", "of", "on", "or", "should", "so", "than", "that", "the", "their", "there",
  "this", "to", "was", "we", "were", "what", "when", "which", "who", "why", "will",
  "with", "would", "you", "my", "me", "i", "our", "your",
]);

/** Digits a reader types where a map spells the number ("4 day week"). */
const NUMBER_WORDS: Readonly<Record<string, string>> = {
  "2": "two", "3": "three", "4": "four", "5": "five", "6": "six", "7": "seven",
  "8": "eight", "9": "nine", "10": "ten",
};

const TOKEN = /[\p{L}\p{N}$]+/gu;

function foldToken(token: string): string | null {
  if (STOP_WORDS.has(token)) return null;
  const word = NUMBER_WORDS[token] ?? token;
  return /^[a-z]+$/.test(word) ? porterStem(word) : word;
}

/** Lowercase, spell out abbreviations, drop stop words, stem: the terms both index and query use. */
export function searchTerms(text: string): string[] {
  const lowered = expandAbbreviations(text.toLowerCase().replace(/[‘’']/g, ""));
  return (lowered.match(TOKEN) ?? []).flatMap((token) => {
    const term = foldToken(token);
    return term ? [term] : [];
  });
}

/** Typos allowed for a query term: none for short words, one, then two for long ones. */
function typoBudget(term: string): number {
  if (term.length >= 7) return 2;
  if (term.length >= 4) return 1;
  return 0;
}

/** Levenshtein distance, giving up early past `max`. */
function editDistanceWithin(a: string, b: string, max: number): boolean {
  if (Math.abs(a.length - b.length) > max) return false;
  let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + cost);
      rowMin = Math.min(rowMin, current[j]);
    }
    if (rowMin > max) return false;
    previous = current;
  }
  return previous[b.length] <= max;
}

/**
 * A query term found in a name term: the same stem, the start of a longer
 * word being typed ("immig" in "immigration"), or the same word misspelt.
 */
function termMatches(query: string, name: string): boolean {
  if (query === name) return true;
  if (query.length >= 3 && name.startsWith(query)) return true;
  return editDistanceWithin(query, name, typoBudget(query));
}

/** Each of the item's names as its own run of terms, so a phrase never spans two names. */
function nameRuns(item: SearchableItem): string[][] {
  return [item.title, item.altNames ?? "", item.aliases ?? ""]
    .flatMap((names) => names.split(/[\n|]/))
    .map(searchTerms)
    .filter((terms) => terms.length > 0);
}

/** Share of the query's words the item's names hold (0–1), and whether they form a phrase. */
function nameCoverage(queryTerms: string[], runs: string[][]): { coverage: number; phrase: boolean } {
  if (queryTerms.length === 0) return { coverage: 0, phrase: false };
  const all = runs.flat();
  const hit = queryTerms.filter((q) => all.some((term) => termMatches(q, term))).length;
  const phrase =
    queryTerms.length > 1 &&
    runs.some((terms) =>
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
  const ms = new MiniSearch<SearchableItem>({
    idField: "id",
    fields: ["title", "altNames", "aliases", "meta_claim", "categoryText", "tags", "body"],
    storeFields: ["id"],
    // Terms arrive already folded (see below), so MiniSearch only splits them.
    tokenize: (text) => text.split(" "),
    processTerm: (term) => term || null,
    extractField: (document, field) => {
      const value = (document as unknown as Record<string, unknown>)[field];
      // The id is looked up, never searched: hand it over untouched.
      if (field === "id") return value;
      return typeof value === "string" ? searchTerms(value).join(" ") : "";
    },
    searchOptions: {
      boost: { title: 4, altNames: 3, aliases: 2, meta_claim: 1, tags: 1, categoryText: 0.5, body: 0.5 },
      fuzzy: (term) => typoBudget(term),
      prefix: (term) => term.length >= 3,
      weights: { fuzzy: 0.4, prefix: 0.6 },
    },
  });
  ms.addAll(items as readonly SearchableItem[] as SearchableItem[]);
  const byId = new Map(items.map((item) => [item.id, item]));
  const runsById = new Map(items.map((item) => [item.id, nameRuns(item)]));

  return (query: string) => {
    const queryTerms = searchTerms(query);
    if (queryTerms.length === 0) return [];
    // A result has to hold at least half of what was typed.
    const needed = Math.ceil(queryTerms.length / 2);
    return ms
      .search(queryTerms.join(" "))
      .flatMap((result) => {
        const item = byId.get(result.id as string);
        if (!item) return [];
        if (new Set(result.queryTerms).size < needed) return [];
        const { coverage, phrase } = nameCoverage(queryTerms, runsById.get(item.id) ?? []);
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
