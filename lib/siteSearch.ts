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
 * Three passes:
 *   1. Each query word is read against the index's own words (`readQuery`):
 *      as itself and its slightly longer forms, the last word also as the
 *      start of a longer one, and only a word the index has no form of as a
 *      possible typo. Typos are never forgiven between two real words: the
 *      fuzzy matching this replaced read "abortion" as "abolition" and
 *      "about", and "gay" (stem "gai") as the start of "gain" (r6 review #4).
 *   2. MiniSearch (BM25) finds candidates, with name fields boosted over the
 *      claim, tags and category. A candidate has to hold at least half of
 *      the query's words somewhere, so "is nuclear power safe" does not list
 *      every map that mentions "power".
 *   3. A rerank multiplies each score by how many of the query's words the
 *      result's name holds, with a bonus when the words appear as a phrase.
 *      A map whose name answers every word beats one whose body mentions
 *      them. Weak results (a name holding under half the query, or a query
 *      word no map uses at all) are capped at `MAX_WEAK_RESULTS`.
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
  /**
   * Words to find it by that its names do not use, space-separated: a map's
   * most distinctive evidence words ("Medicare", "Deere", "marijuana"). Weighted as tags.
   */
  keywords?: string;
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
  // The glue of a sentence typed as a search ("my sister and I argue about
  // mom"). "about" also sat one typo from "abort", so "abortion" found every
  // map whose question says "about".
  "about", "all", "also", "am", "any", "but", "even", "get", "got", "had", "he", "her",
  "him", "his", "just", "much", "not", "she", "some", "them", "then", "they", "too",
  "us", "very",
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

/** Each word as typed (lowercased) beside its term, stop words dropped. */
function searchWords(text: string): { typed: string; term: string }[] {
  const lowered = expandAbbreviations(text.toLowerCase().replace(/[‘’']/g, ""));
  return (lowered.match(TOKEN) ?? []).flatMap((token) => {
    const term = foldToken(token);
    return term ? [{ typed: token, term }] : [];
  });
}

/**
 * The empty state's first line when a search finds no map, naming what was
 * searched for ("No map on “abortion” yet."), so a reader sees the subject is
 * missing rather than misspelt. Long queries are cut to a few words.
 */
export function noMapLine(query: string): string {
  const words = query.trim().replace(/\s+/g, " ").split(" ");
  const subject = words.length > 8 ? `${words.slice(0, 8).join(" ")}…` : words.join(" ");
  return `No map on “${subject}” yet.`;
}

/** Lowercase, spell out abbreviations, drop stop words, stem: the terms both index and query use. */
export function searchTerms(text: string): string[] {
  return searchWords(text).map((word) => word.term);
}

/**
 * Typos forgiven in a query word the index has never seen: none for short
 * words, one, then two for long ones. A one-word query gets less: alone, a
 * word is more likely a real word the maps do not use ("abortion") than a
 * typo, and its nearest index word is then a different subject.
 */
function typoBudget(term: string, alone: boolean): number {
  const [one, two] = alone ? [7, 10] : [5, 8];
  if (term.length >= two) return 2;
  if (term.length >= one) return 1;
  return 0;
}

/** Edit distance with a swap of two neighbouring letters as one edit ("nuclaer"), giving up past `max`. */
function editDistanceWithin(a: string, b: string, max: number): boolean {
  if (Math.abs(a.length - b.length) > max) return false;
  let before: number[] = [];
  let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let value = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        value = Math.min(value, before[j - 2] + 1);
      }
      current[j] = value;
      rowMin = Math.min(rowMin, value);
    }
    if (rowMin > max) return false;
    before = previous;
    previous = current;
  }
  return previous[b.length] <= max;
}

/** Each of the item's names as its own run of terms, so a phrase never spans two names. */
function nameRuns(item: SearchableItem): string[][] {
  return [item.title, item.altNames ?? "", item.aliases ?? ""]
    .flatMap((names) => names.split(/[\n|]/))
    .map(searchTerms)
    .filter((terms) => terms.length > 0);
}

/**
 * One word of the query and the index words it stands for (see `readQuery`).
 */
interface QueryWord {
  term: string;
  /** Read as the start of any longer word: the last word, as typed, still being typed. */
  prefix: boolean;
  /**
   * Other index words it stands for: a little longer forms of it as typed
   * ("safe": "safety"), or, for a word the index has no form of, the words
   * one or two typos away ("nuclaer": "nuclear").
   */
  also: string[];
  /** What `also` holds: longer forms count for less than the word itself; typo fixes stand in for it. */
  alsoKind: "form" | "typo";
  /** No index word is, starts with, or is a typo away from this one. */
  unknown: boolean;
}

/** How much longer an index word may be and still count as a form of a typed word ("safe", "safety"). */
const FORM_SLACK = 3;
/**
 * What a longer form counts for against the word itself, in the ranking and
 * in how much of the query a name holds: "free" finds "free will" before a
 * map whose name says "freeze".
 */
const FORM_CREDIT = 0.5;
/** What a typo fix counts for in the ranking (the old fuzzy weight). */
const TYPO_WEIGHT = 0.6;

const SEARCH_FIELDS = ["title", "altNames", "aliases", "meta_claim", "categoryText", "tags", "keywords", "body"] as const;

/** The fields that hold a result's names: the only ones a word still being typed may match the start of. */
const NAME_FIELDS: ReadonlySet<string> = new Set(["title", "altNames", "aliases"]);

/** How much a name term answers a query word: 1 for the word (or a typo fix of it), less for a longer form, 0 for none. */
function wordCredit(word: QueryWord, name: string): number {
  if (word.term === name || (word.prefix && name.startsWith(word.term))) return 1;
  if (!word.also.includes(name)) return 0;
  return word.alsoKind === "form" ? FORM_CREDIT : 1;
}

function wordMatches(word: QueryWord, name: string): boolean {
  return wordCredit(word, name) > 0;
}

/** Share of the query's words the item's names hold (0–1), and whether they form a phrase. */
function nameCoverage(words: QueryWord[], runs: string[][]): { coverage: number; phrase: boolean } {
  if (words.length === 0) return { coverage: 0, phrase: false };
  const all = runs.flat();
  const hit = words.reduce(
    (sum, word) => sum + all.reduce((best, term) => Math.max(best, wordCredit(word, term)), 0),
    0,
  );
  const phrase =
    words.length > 1 &&
    runs.some((terms) =>
      terms.some((_, start) =>
        words.every((word, offset) => {
          const term = terms[start + offset];
          return term !== undefined && wordMatches(word, term);
        }),
      ),
    );
  return { coverage: hit / words.length, phrase };
}

/**
 * Weak results: the name holds under half of the query (a match only in a
 * map's claim, tags or first crux), or the query has a word no map uses at
 * all ("abortion rights": the maps found are about rights, not abortion). A
 * few are worth showing under the strong ones; a pile is noise.
 */
export const MAX_WEAK_RESULTS = 3;

export function createSiteSearch<T extends SearchableItem>(items: readonly T[]): (query: string) => T[] {
  const ms = new MiniSearch<SearchableItem>({
    idField: "id",
    fields: [...SEARCH_FIELDS],
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
      boost: { title: 4, altNames: 3, aliases: 2, meta_claim: 1, tags: 1, keywords: 1, categoryText: 0.5, body: 0.5 },
      // Typos are corrected against the index's own words before the search
      // (`readQuery`), so MiniSearch matches exactly, or by prefix where the
      // query says so.
      fuzzy: false,
      weights: { fuzzy: 0.4, prefix: 0.6 },
    },
  });
  ms.addAll(items as readonly SearchableItem[] as SearchableItem[]);
  const byId = new Map(items.map((item) => [item.id, item]));
  const runsById = new Map(items.map((item) => [item.id, nameRuns(item)]));

  const vocabulary = new Set<string>();
  for (const item of items) {
    for (const field of SEARCH_FIELDS) {
      const value = item[field];
      if (typeof value === "string") for (const term of searchTerms(value)) vocabulary.add(term);
    }
  }
  const words = [...vocabulary];

  /**
   * How each query word is read. Index words are stems, so a word is matched
   * as typed and as its stem, never by what its stem happens to start
   * ("gay" stems to "gai", which starts "gain"):
   * - as itself, and as the index's slightly longer forms of it as typed
   *   ("safe": "safety", "covid": "covid19");
   * - the last word, as typed, also as the start of any longer word: it may
   *   still be being typed ("immig");
   * - a word the index has no form of may be a typo: it stands for the index
   *   words nearest to it that start with the same letter, at most one typo
   *   away (two for long words), and less for a one-word query, where an
   *   unseen word is more likely a real word the maps do not use
   *   ("abortion") than a typo of one they do ("abolition").
   */
  const readQuery = (typed: { typed: string; term: string }[]): QueryWord[] =>
    typed.map(({ typed: asTyped, term }, position) => {
      const asIs = asTyped === term;
      const last = position === typed.length - 1;
      const prefix = asIs && last && term.length >= 3 && words.some((word) => word.startsWith(term));
      const forms =
        asIs && term.length >= 4
          ? words.filter(
              (word) => word !== term && word.startsWith(term) && word.length <= term.length + FORM_SLACK,
            )
          : [];
      if (vocabulary.has(term) || prefix || forms.length > 0) {
        return { term, prefix, also: forms, alsoKind: "form", unknown: false };
      }
      const budget = typoBudget(term, typed.length === 1);
      for (let distance = 1; distance <= budget; distance += 1) {
        const near = words.filter((word) => word[0] === term[0] && editDistanceWithin(term, word, distance));
        if (near.length > 0) return { term, prefix: false, also: near, alsoKind: "typo", unknown: false };
      }
      return { term, prefix: false, also: [], alsoKind: "typo", unknown: true };
    });

  return (query: string) => {
    const queryWords = readQuery(searchWords(query));
    if (queryWords.length === 0) return [];
    const original = new Map<string, string>();
    const prefixed = new Set<string>();
    const termWeight = new Map<string, number>();
    for (const word of queryWords) {
      original.set(word.term, word.term);
      termWeight.set(word.term, 1);
      if (word.prefix) prefixed.add(word.term);
      for (const other of word.also) {
        if (original.has(other)) continue;
        original.set(other, word.term);
        termWeight.set(other, word.alsoKind === "form" ? FORM_CREDIT : TYPO_WEIGHT);
      }
    }
    const unknownWord = queryWords.some((word) => word.unknown);
    // A result has to hold at least half of what was typed.
    const needed = Math.ceil(queryWords.length / 2);
    const scored = ms
      .search([...original.keys()].join(" "), {
        prefix: (term) => prefixed.has(term),
        boostTerm: (term) => termWeight.get(term) ?? 1,
      })
      .flatMap((result) => {
        const item = byId.get(result.id as string);
        if (!item) return [];
        // A word still being typed counts as held where a name starts with
        // it, not where a claim does: "abortion pill" is not the map whose
        // claim says "pillar" (r9 review #11).
        const held = new Set<string>();
        for (const [term, fields] of Object.entries(result.match)) {
          const word =
            original.get(term) ??
            [...prefixed].find((start) => term.startsWith(start) && fields.some((field) => NAME_FIELDS.has(field)));
          if (word) held.add(word);
        }
        if (held.size < needed) return [];
        const { coverage, phrase } = nameCoverage(queryWords, runsById.get(item.id) ?? []);
        // A query word no map uses, and a name that holds none of the rest:
        // nothing ties this result to what was asked.
        if (unknownWord && coverage === 0) return [];
        // A name that answers every word outranks body matches; a phrase more so.
        const score =
          result.score *
          (0.25 + coverage) ** 2 *
          (phrase ? 2 : 1) *
          (item.flagship && coverage === 1 ? FLAGSHIP_LIFT : 1);
        return [{ item, score, weak: unknownWord || coverage < 0.5 }];
      });
    scored.sort((a, b) => b.score - a.score);
    let weak = 0;
    return scored
      .filter((result) => !result.weak || (weak += 1) <= MAX_WEAK_RESULTS)
      .map(({ item }) => item);
  };
}
