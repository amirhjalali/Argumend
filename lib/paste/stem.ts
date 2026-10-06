/**
 * The paste lane's word folding, with no imports, so client code can share it
 * (the site search, lib/siteSearch.ts) without pulling in the map-reply
 * index that lib/paste/terms.ts loads for its stopword list.
 *
 * - The Porter stemmer (M.F. Porter, 1980) folds inflections: "mining" meets
 *   "mines", "vaping" meets "vapes".
 * - A short, generic table spells out abbreviations readers type ("EVs",
 *   "UBI", "SMRs") where map titles use the long form.
 */

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
const ABBREVIATIONS: Readonly<Record<string, string>> = {
  ev: "electric vehicles",
  ubi: "universal basic income",
  smr: "small modular reactors",
  agi: "artificial general intelligence",
  asi: "artificial superintelligence",
  llm: "large language models",
  gmo: "genetically modified organisms",
  rto: "return to office",
  wfh: "work from home remote",
  dst: "daylight saving time",
  cbdc: "central bank digital currencies",
  mmt: "modern monetary theory",
  ssri: "ssri antidepressants",
  "glp-1": "glp1",
  nuke: "nuclear weapons",
  "2a": "second amendment",
  co2: "carbon dioxide",
  "u.s.": "united states",
};

/** One pass over the text for every short form, plural "s" included where one is used. */
const ABBREVIATION_PATTERN =
  /\b(?:evs?|ubi|smrs?|agi|asi|llms?|gmos?|rto|wfh|dst|cbdcs?|mmt|ssris?|glp-1|nukes?|2a|co2)\b|\bu\.s\.(?=\s|$|[,;:)])/g;

export function expandAbbreviations(lowered: string): string {
  return lowered.replace(
    ABBREVIATION_PATTERN,
    (form) => ABBREVIATIONS[form] ?? ABBREVIATIONS[form.slice(0, -1)] ?? form,
  );
}
