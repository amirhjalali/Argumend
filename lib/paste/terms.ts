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

// ---------------------------------------------------------------------------
// Porter stemmer
// ---------------------------------------------------------------------------

function isConsonant(word: string, index: number): boolean {
  const letter = word[index];
  if ("aeiou".includes(letter)) return false;
  if (letter === "y") return index === 0 ? true : !isConsonant(word, index - 1);
  return true;
}

/** Porter's m: the number of vowel-consonant sequences in the stem. */
function measure(stem: string): number {
  let count = 0;
  let index = 0;
  const length = stem.length;
  while (index < length && isConsonant(stem, index)) index += 1;
  while (index < length) {
    while (index < length && !isConsonant(stem, index)) index += 1;
    if (index >= length) break;
    while (index < length && isConsonant(stem, index)) index += 1;
    count += 1;
  }
  return count;
}

function hasVowel(stem: string): boolean {
  for (let index = 0; index < stem.length; index += 1) {
    if (!isConsonant(stem, index)) return true;
  }
  return false;
}

function endsWithDoubleConsonant(word: string): boolean {
  const length = word.length;
  return length >= 2 && word[length - 1] === word[length - 2] && isConsonant(word, length - 1);
}

/** Consonant-vowel-consonant ending, the last consonant not w, x or y. */
function endsCvc(word: string): boolean {
  const length = word.length;
  if (length < 3) return false;
  if (!isConsonant(word, length - 1) || isConsonant(word, length - 2) || !isConsonant(word, length - 3)) {
    return false;
  }
  return !"wxy".includes(word[length - 1]);
}

function replaceSuffix(
  word: string,
  rules: ReadonlyArray<readonly [string, string]>,
  minMeasure: number,
): string {
  for (const [suffix, replacement] of rules) {
    if (word.endsWith(suffix)) {
      const stem = word.slice(0, -suffix.length);
      return measure(stem) > minMeasure ? stem + replacement : word;
    }
  }
  return word;
}

const STEP2: ReadonlyArray<readonly [string, string]> = [
  ["ational", "ate"], ["tional", "tion"], ["enci", "ence"], ["anci", "ance"], ["izer", "ize"],
  ["bli", "ble"], ["alli", "al"], ["entli", "ent"], ["eli", "e"], ["ousli", "ous"],
  ["ization", "ize"], ["ation", "ate"], ["ator", "ate"], ["alism", "al"], ["iveness", "ive"],
  ["fulness", "ful"], ["ousness", "ous"], ["aliti", "al"], ["iviti", "ive"], ["biliti", "ble"],
  ["logi", "log"],
];

const STEP3: ReadonlyArray<readonly [string, string]> = [
  ["icate", "ic"], ["ative", ""], ["alize", "al"], ["iciti", "ic"], ["ical", "ic"], ["ful", ""],
  ["ness", ""],
];

const STEP4 = [
  "al", "ance", "ence", "er", "ic", "able", "ible", "ant", "ement", "ment", "ent", "ion", "ou",
  "ism", "ate", "iti", "ous", "ive", "ize",
];

/** Porter (1980), the original algorithm. Words of two letters or fewer pass through. */
export function porterStem(input: string): string {
  let word = input;
  if (word.length <= 2) return word;

  // Step 1a: plurals.
  if (word.endsWith("sses")) word = word.slice(0, -2);
  else if (word.endsWith("ies")) word = word.slice(0, -2);
  else if (!word.endsWith("ss") && word.endsWith("s")) word = word.slice(0, -1);

  // Step 1b: -ed, -ing.
  let extra = false;
  if (word.endsWith("eed")) {
    if (measure(word.slice(0, -3)) > 0) word = word.slice(0, -1);
  } else if (word.endsWith("ed") && hasVowel(word.slice(0, -2))) {
    word = word.slice(0, -2);
    extra = true;
  } else if (word.endsWith("ing") && hasVowel(word.slice(0, -3))) {
    word = word.slice(0, -3);
    extra = true;
  }
  if (extra) {
    if (word.endsWith("at") || word.endsWith("bl") || word.endsWith("iz")) word += "e";
    else if (endsWithDoubleConsonant(word) && !/[lsz]$/.test(word)) word = word.slice(0, -1);
    else if (measure(word) === 1 && endsCvc(word)) word += "e";
  }

  // Step 1c: y to i after a vowel-bearing stem.
  if (word.endsWith("y") && hasVowel(word.slice(0, -1))) word = `${word.slice(0, -1)}i`;

  word = replaceSuffix(word, STEP2, 0);
  word = replaceSuffix(word, STEP3, 0);

  // Step 4: strip a suffix when the stem is long enough.
  for (const suffix of STEP4) {
    if (!word.endsWith(suffix)) continue;
    const stem = word.slice(0, -suffix.length);
    if (measure(stem) > 1 && (suffix !== "ion" || /[st]$/.test(stem))) word = stem;
    break;
  }

  // Step 5: a final e, and a final double l.
  if (word.endsWith("e")) {
    const stem = word.slice(0, -1);
    const m = measure(stem);
    if (m > 1 || (m === 1 && !endsCvc(stem))) word = stem;
  }
  if (measure(word) > 1 && word.endsWith("ll")) word = word.slice(0, -1);

  return word;
}

// ---------------------------------------------------------------------------
// Abbreviations
// ---------------------------------------------------------------------------

/**
 * Whole-word, case-insensitive. Only standard expansions of short forms that
 * readers type and map titles spell out; never a topic's own vocabulary
 * guessed from a paste.
 */
const ABBREVIATIONS: ReadonlyArray<readonly [RegExp, string]> = [
  [/\bevs?\b/g, "electric vehicles"],
  [/\bubi\b/g, "universal basic income"],
  [/\bsmrs?\b/g, "small modular reactors"],
  [/\bagi\b/g, "artificial general intelligence"],
  [/\basi\b/g, "artificial superintelligence"],
  [/\bllms?\b/g, "large language models"],
  [/\bgmos?\b/g, "genetically modified organisms"],
  [/\brto\b/g, "return to office"],
  [/\bwfh\b/g, "work from home remote"],
  [/\bdst\b/g, "daylight saving time"],
  [/\bcbdcs?\b/g, "central bank digital currencies"],
  [/\bmmt\b/g, "modern monetary theory"],
  [/\bssris?\b/g, "ssri antidepressants"],
  [/\bglp-1\b/g, "glp1"],
  [/\bnukes?\b/g, "nuclear weapons"],
  [/\b2a\b/g, "second amendment"],
  [/\bco2\b/g, "carbon dioxide"],
  [/\bu\.s\.(?=\s|$|[,;:)])/g, "united states"],
];

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
  let lowered = text.toLowerCase().replace(/[‘’]/g, "'");
  for (const [pattern, expansion] of ABBREVIATIONS) {
    lowered = lowered.replace(pattern, expansion);
  }
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
