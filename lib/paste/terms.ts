/**
 * Words for the paste lane's map index: the same function turns a paste and a
 * map's text into terms, so a paste's "vaping" meets a map's "vapes" and a
 * paste's "SMRs" meets a map's "small modular reactors".
 *
 * Three steps, all deterministic and offline:
 *
 * 1. Common abbreviations are spelled out (a short, generic table: "EVs",
 *    "UBI", "AGI"), because a reader types the short form and a map's title
 *    uses the long one.
 * 2. The map-reply stopword list drops filler ("should", "people", "think"),
 *    plus a few chat fillers pastes are full of ("lol", "honestly").
 * 3. The Porter stemmer (M.F. Porter, 1980) folds inflections. The map-reply
 *    shortlist keeps its own lighter stemmer; this lane needed "mining" to
 *    meet "mines" and "vaping" to meet "vapes", which that one leaves apart.
 */
import { STOPWORDS } from "@/lib/mapReply/prefilter";
import { expandAbbreviations, porterStem } from "./stem";

export { porterStem } from "./stem";

/**
 * Chat filler that the map-reply list does not carry, and the vocabulary of
 * arguing itself ("agree", "debate", "nonsense"), which every argument uses
 * whatever it is about. Words whose stems a map needs are left out:
 * "wrong" would take "wrongful" with it.
 */
const PASTE_STOPWORDS = new Set([
  "lol", "lmao", "honestly", "literally", "basically", "yeah", "yep", "nope", "okay", "ok",
  "gonna", "wanna", "gotta", "kinda", "sorta", "thats", "theres", "isnt", "arent", "doesnt",
  "didnt", "wont", "cant", "ive", "youve", "weve", "theyre", "hes", "shes", "id", "ill",
  "oh", "hey", "hi", "hello", "thanks", "thank", "please", "guys", "man", "dude", "etc",
  "whatever", "anyway", "anyways", "tbh", "imo", "imho", "idk", "btw",
  "agree", "agreed", "agrees", "disagree", "disagreed", "disagrees", "debate", "debating",
  "opinion", "opinions", "nonsense", "obviously", "clearly", "exactly", "totally",
  "completely", "seriously", "absolutely", "true", "false",
]);

function isStopword(token: string): boolean {
  return STOPWORDS.has(token) || PASTE_STOPWORDS.has(token);
}

/** Stems are memoised: the map corpus repeats the same few thousand words. */
const stemCache = new Map<string, string>();

function stemOf(token: string): string {
  let stemmed = stemCache.get(token);
  if (stemmed === undefined) {
    stemmed = porterStem(token);
    if (stemCache.size < 50_000) stemCache.set(token, stemmed);
  }
  return stemmed;
}

/**
 * Terms for the paste index. Stopwords are dropped before stemming (they are
 * listed unstemmed), and terms shorter than two characters after stemming are
 * dropped. "AI" survives as "ai".
 */
export function pasteTerms(text: string): string[] {
  const lowered = expandAbbreviations(text.toLowerCase().replace(/[‘’]/g, "'"));
  const terms: string[] = [];
  for (const raw of lowered.split(/[^a-z0-9']+/)) {
    // Possessives and quote marks go; contractions collapse ("don't" to "dont").
    const token = raw.replace(/'s$/, "").replace(/'/g, "");
    if (token.length < 2 || isStopword(token)) continue;
    const stemmed = stemOf(token);
    if (stemmed.length < 2 || isStopword(stemmed)) continue;
    terms.push(stemmed);
  }
  return terms;
}

/**
 * Adjacent pairs of terms ("data center", "rent control", "minimum wage"),
 * written "data_center". A pair is far rarer across the maps than either
 * word, so it carries the phrase's meaning when the words alone are common.
 */
export function termPairs(terms: readonly string[]): string[] {
  const pairs: string[] = [];
  for (let index = 1; index < terms.length; index += 1) {
    if (terms[index] !== terms[index - 1]) pairs.push(`${terms[index - 1]}_${terms[index]}`);
  }
  return pairs;
}
