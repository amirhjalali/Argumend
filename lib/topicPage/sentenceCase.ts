/**
 * Sentence case for the older maps' evidence-card titles, at render time.
 *
 * The older maps were authored with Title Case card titles ("Nuclear Among
 * Safest Energy Per TWh"); the flagship maps and the rest of the page use
 * sentence case. This lowers only what is safe to lower and leaves the rest:
 *
 *  - a title that is not Title Case already (most longer words lowercase) is
 *    returned untouched, so a sentence-case title's names are never touched;
 *  - only a plain Title-Cased word ("Safest", "Don't") is lowered. All-caps
 *    words and acronyms (TWh, CO2, US-UK), words with digits, and mixed-case
 *    names (TikTok, McDonald's) are kept;
 *  - kept as written: the first word, the first word after a colon or a full
 *    stop, a short label before a colon ("Cengiz et al.:", "Oxford Study:"),
 *    anything inside quotation marks, a name followed by "et al.", a run of
 *    words the map's prose writes as a capitalised name ("Congressional
 *    Research Service", "Current Biology"), a single word the prose
 *    capitalises mid-sentence at least as often as it writes it in lowercase
 *    ("France", "Krueger"), and a short list of names that are always
 *    capitalised.
 *
 * When in doubt it keeps the capital: a stray capital reads as house style,
 * a lowercased name reads as an error.
 *
 * Pure: no React, no data imports.
 */

/** A plain Title-Cased word: one capital, then lowercase ("Safest", "Don't", "China's"). */
const TITLE_WORD = /^[A-Z][a-z]+(?:['’][a-z]+)*$/;
const LOWER_WORD = /^[a-z]+(?:['’][a-z]+)*$/;
/** Starts with a capital: a Title-Cased word, an acronym, or a mixed-case name. */
const CAPITALISED = /^[A-Z]/;

const OPENING_QUOTES = /["“‘']/;
const CLOSING_QUOTES = /["”’']/;
const LEADING = /^[(\["“‘'¡¿]+/;
const TRAILING = /[)\]"”’'.,;:!?…]+$/;
const PART_SEPARATOR = /([-–/])/;

/** Words that end in a full stop without ending a sentence. */
const ABBREVIATIONS = new Set([
  "al", "vs", "etc", "e.g", "i.e", "dr", "mr", "mrs", "ms", "st", "no", "jr", "sr", "inc", "co", "corp", "approx", "est",
]);

/** Small words that can sit inside a name ("Department of Energy", "Doleac & Sanders"). */
const NAME_CONNECTORS = new Set(["of", "and", "for", "the", "on", "in", "&", "de", "la", "von", "van", "der", "du"]);

/** Never a name on its own, however the prose capitalises it. */
const FUNCTION_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "nor", "of", "in", "on", "at", "to", "for", "with", "by", "from", "as",
  "into", "over", "under", "after", "before", "about", "than", "that", "this", "these", "those", "it", "its",
  "is", "are", "was", "were", "be", "been", "has", "have", "had", "do", "does", "did", "not", "no", "yes",
  "more", "most", "less", "least", "only", "all", "any", "some", "may", "might", "can", "could", "will",
  "would", "should", "must", "new", "old", "one", "two", "three", "first", "second", "how", "why", "what",
  "when", "where", "who", "which", "if", "so", "up", "out", "per", "via",
]);

/** Always capitalised, whatever the map's prose happens to contain. */
const ALWAYS_PROPER = new Set([
  "january", "february", "april", "june", "july", "september", "october", "november", "december",
  "jan", "feb", "apr", "jun", "jul", "aug", "sep", "sept", "oct", "nov", "dec",
  "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",
  "god", "english", "american", "americans", "america", "european", "europeans", "europe", "african",
  "africa", "asian", "asia", "british", "britain", "england", "chinese", "china", "russian", "russia",
  "indian", "india", "israel", "israeli", "israelis", "iran", "iranian", "ukraine", "ukrainian", "japan",
  "japanese", "germany", "german", "france", "french", "canada", "canadian", "mexico", "mexican",
  "australia", "australian", "sweden", "swedish", "denmark", "danish", "norway", "norwegian", "finland",
  "finnish", "congress", "senate", "christian", "christians", "christianity", "muslim", "muslims",
  "islam", "islamic", "jewish", "jews", "hispanic", "latino", "latina", "latinos", "catholic", "protestant", "republican", "republicans",
  "democrat", "democrats", "marxist", "keynesian", "darwin", "darwinian", "covid", "medicare", "medicaid",
]);

/** The lookup key for a word: lowercase, without a possessive ending. */
function key(word: string): string {
  return word.toLowerCase().replace(/['’]s$/, "");
}

interface Token {
  lead: string;
  core: string;
  trail: string;
}

function splitToken(raw: string): Token {
  const lead = raw.match(LEADING)?.[0] ?? "";
  const rest = raw.slice(lead.length);
  const trail = rest.match(TRAILING)?.[0] ?? "";
  return { lead, core: rest.slice(0, rest.length - trail.length), trail };
}

/** A full stop or colon that ends a clause (not "vs." or "U.S."). */
function endsClause(token: Token): boolean {
  if (/[:!?]/.test(token.trail)) return true;
  if (!token.trail.includes(".")) return false;
  return !token.core.includes(".") && !ABBREVIATIONS.has(token.core.toLowerCase());
}

/** Every part of a (hyphenated) word starts with a capital or a digit: "Iran", "US-UK", "Covid-19". */
function isNameShaped(core: string): boolean {
  const parts = core.split(/[-–/]/).filter(Boolean);
  return parts.length > 0 && CAPITALISED.test(parts[0]) && parts.every((p) => /^[A-Z0-9]/.test(p));
}

interface RunWord {
  key: string;
  /** A capitalised word, not a connector ("of", "&"). */
  name: boolean;
  /** Its key when it is a plain Title-Cased word that could stand alone. */
  single: string | null;
  /** The keys of its Title-Cased parts ("Tully-Fisher": tully, fisher). */
  parts: string[];
}

/** The names a map's own prose uses: single words and multi-word runs. */
export interface MapNames {
  words: ReadonlySet<string>;
  /** Each a run of lookup keys, e.g. ["congressional", "research", "service"]. */
  phrases: readonly (readonly string[])[];
}

/**
 * Read a map's names from its prose. `prose` is running text (a capital at
 * the start of a sentence says nothing); `names` is text that is all names,
 * such as source lines ("Doleac & Sanders, Journal of Human Resources").
 * Never feed it titles: Title Case would make every word a name.
 */
export function namesIn(prose: readonly string[], names: readonly string[] = []): MapNames {
  const capitalised = new Map<string, number>();
  /** Words seen only inside a multi-word name ("Kenneth Starr", "Tully-Fisher"). */
  const inNames = new Map<string, number>();
  const lowercase = new Map<string, number>();
  const phrases = new Map<string, string[]>();
  const bump = (map: Map<string, number>, word: string) => map.set(word, (map.get(word) ?? 0) + 1);

  const finishRun = (run: RunWord[]) => {
    while (run.length > 0 && !run[run.length - 1].name) run.pop();
    const nameCount = run.filter((t) => t.name).length;
    if (nameCount === 1 && run.length === 1 && run[0].single) bump(capitalised, run[0].single);
    for (const word of run) {
      if (!word.name || (nameCount === 1 && word.single)) continue;
      for (const k of [word.key, ...word.parts]) bump(inNames, k);
    }
    if (nameCount >= 2) {
      const keys = run.map((t) => t.key);
      phrases.set(keys.join(" "), keys);
      // Without a leading acronym too, so "DOE Hydrogen Shot" also protects
      // "Hydrogen Shot". No other shorter runs: a paper title in a source
      // line ("The Effect of Minimum Wages on…") must not make "Minimum
      // Wage" a name.
      let start = 0;
      while (start < run.length && run[start].name && !run[start].single) start += 1;
      const rest = keys.slice(start);
      if (start > 0 && run.slice(start).filter((t) => t.name).length >= 2) {
        phrases.set(rest.join(" "), rest);
      }
    }
    run.length = 0;
  };

  const read = (text: string, allNames: boolean) => {
    let sentenceStart = !allNames;
    const run: RunWord[] = [];
    for (const raw of text.split(/\s+/)) {
      if (!raw) continue;
      const token = splitToken(raw);
      // Opening punctuation starts a new name ("(Surrey LCA, 2025)").
      if (token.lead) finishRun(run);
      // A quotation, a list marker or a heading can open with a capital.
      const positional = sentenceStart || OPENING_QUOTES.test(token.lead) || /^[-•*#]/.test(raw);
      const core = token.core;
      const lower = key(core);
      if (core && isNameShaped(core) && !positional) {
        const parts = core.split(/[-–/]/).filter((p) => TITLE_WORD.test(p)).map(key);
        run.push({ key: lower, name: true, single: TITLE_WORD.test(core) ? lower : null, parts });
      } else if (run.length > 0 && NAME_CONNECTORS.has(lower) && !token.trail) {
        run.push({ key: lower, name: false, single: null, parts: [] });
      } else {
        finishRun(run);
        for (const part of core.split(/[-–/]/)) {
          if (LOWER_WORD.test(part)) bump(lowercase, key(part));
          // "Iran-backed": the name part of a mixed compound, mid-sentence.
          else if (!positional && TITLE_WORD.test(part) && core !== part) bump(capitalised, key(part));
        }
      }
      // Punctuation after a word ends any name it was part of.
      if (token.trail) finishRun(run);
      sentenceStart = !allNames && endsClause(token);
    }
    finishRun(run);
  };

  for (const text of prose) read(text, false);
  for (const text of names) read(text, true);

  // A word is a name when the prose capitalises it on its own at least as
  // often as it lowercases it, or capitalises it inside a name and never
  // lowercases it ("Starr" in "Kenneth Starr", but not "Research" in
  // "Congressional Research Service").
  const words = new Set<string>();
  for (const [word, count] of capitalised) {
    if (!FUNCTION_WORDS.has(word) && count >= (lowercase.get(word) ?? 0)) words.add(word);
  }
  for (const word of inNames.keys()) {
    if (!FUNCTION_WORDS.has(word) && !lowercase.has(word)) words.add(word);
  }
  return {
    words,
    phrases: [...phrases.values()].sort((a, b) => b.length - a.length),
  };
}

/**
 * Whether a title is written in Title Case: most of its longer words after
 * the first start with a capital. Sentence-case titles are left alone.
 */
export function isTitleCase(title: string): boolean {
  let capitalised = 0;
  let lowercase = 0;
  for (const raw of title.split(/\s+/).slice(1)) {
    for (const part of splitToken(raw).core.split(/[-–/]/)) {
      if (part.length < 4) continue;
      if (TITLE_WORD.test(part)) capitalised += 1;
      else if (LOWER_WORD.test(part)) lowercase += 1;
    }
  }
  return capitalised >= 2 && capitalised / (capitalised + lowercase) >= 0.7;
}

const NO_NAMES: MapNames = { words: new Set(), phrases: [] };

/**
 * A Title Case card title in sentence case. `names` is the map's own names
 * (`namesIn` over its prose); without them only the built-in list and the
 * structural rules protect a name.
 */
export function sentenceCaseTitle(title: string, names: MapNames = NO_NAMES): string {
  if (!isTitleCase(title)) return title;
  const pieces = title.split(/(\s+)/);
  const words = pieces.filter((piece, index) => index % 2 === 0 && piece.length > 0);
  const tokens = words.map(splitToken);
  const keys = tokens.map((t) => key(t.core));

  // Words inside a name the map's prose uses, kept whole.
  const inName = new Set<number>();
  for (let i = 0; i < keys.length; i += 1) {
    for (const phrase of names.phrases) {
      if (phrase.length > keys.length - i) continue;
      if (phrase.every((k, j) => keys[i + j] === k)) {
        for (let j = 0; j < phrase.length; j += 1) inName.add(i + j);
        break;
      }
    }
  }
  // A short label before the first colon ("Cengiz et al.:", "Oxford Study:")
  // is a name or a source, kept as written.
  const colonAt = tokens.findIndex((t) => t.trail.includes(":"));
  const labelEnd = colonAt >= 0 && colonAt < 4 ? colonAt : -1;

  const lowerPart = (part: string, whole: string): string => {
    if (!TITLE_WORD.test(part)) return part;
    const k = key(part);
    if (names.words.has(k) || names.words.has(whole) || ALWAYS_PROPER.has(k)) return part;
    return part.toLowerCase();
  };

  let wordIndex = -1;
  let startsClause = true;
  let inQuote = false;
  const out = pieces.map((piece, index) => {
    if (index % 2 === 1 || piece.length === 0) return piece;
    wordIndex += 1;
    const token = tokens[wordIndex];
    const opensQuote = OPENING_QUOTES.test(token.lead);
    const closesQuote = CLOSING_QUOTES.test(token.trail);
    const quoted = inQuote || opensQuote;
    if (opensQuote && !closesQuote) inQuote = true;
    else if (inQuote && closesQuote) inQuote = false;

    const beforeEtAl = words[wordIndex + 1] === "et" && /^al\.?/.test(words[wordIndex + 2] ?? "");
    const first = startsClause;
    startsClause = endsClause(token);
    if (quoted || wordIndex <= labelEnd || beforeEtAl || inName.has(wordIndex)) return piece;
    // The article "A" mid-title ("— A Ban May Be…"); "I" stays.
    if (!first && token.core === "A") return `${token.lead}a${token.trail}`;

    // A clause's first word keeps its capital; the rest of a compound
    // ("Problem-Gambling") is treated like any other word.
    const core = token.core
      .split(PART_SEPARATOR)
      .map((part, i) => (i % 2 === 1 || (first && i === 0) ? part : lowerPart(part, keys[wordIndex])))
      .join("");
    return `${token.lead}${core}${token.trail}`;
  });
  return out.join("");
}
