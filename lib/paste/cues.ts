/**
 * Simple word cues for the "Read it yourself" guide shown when a paste has no
 * map (components/paste/ReadItYourself.tsx).
 *
 * A word search, nothing more: no model, no network, and no verdict. It finds
 * the sentence of the reader's own text that most plainly carries words that
 * often mark a question of value ("should", "fair"), something checkable (a
 * number, "cost", "studies") or a disputed word ("counts as", a word in
 * quotation marks), and hands it back so the guide can quote it. The guide
 * labels these as simple cues that can be wrong. Pure and deterministic: the
 * same text always gives the same cues.
 */

export type CueKind = "value" | "fact" | "word";

export interface TextCue {
  kind: CueKind;
  /** The cue words found in the sentence, as the reader wrote them, at most three. */
  words: string[];
  /** The reader's sentence, speaker label removed, cut to `MAX_SENTENCE` characters. */
  sentence: string;
}

const PATTERNS: Record<CueKind, RegExp> = {
  value:
    /\b(?:should(?:n['’]t)?|ought|fair|unfair|deserves?|deserved|responsib(?:le|ility)|irresponsible|duty|right to|selfish|wrong to)\b/gi,
  fact:
    /\b(?:\d+(?:[.,]\d+)*%?|percent|stud(?:y|ies)|data|research|evidence|statistics?|surveys?|polls?|costs?|more than|less than|fewer than)(?![\w])/gi,
  word: /\b(?:counts? as|mean by|by definition|definition|define|so-called|what you call)\b|[“"][^“”"]{2,30}[”"]/gi,
};

/** Cues in the order the guide names the kinds: fact, value, word. */
export const CUE_ORDER: readonly CueKind[] = ["fact", "value", "word"];

export const MAX_SENTENCE = 180;

/** Splits on sentence ends and line breaks, and drops a leading "A:" or "Sam:". */
function sentences(text: string): string[] {
  return text
    .split(/(?<=[.?!])\s+|\n+/)
    .map((sentence) => sentence.replace(/^\s*[A-Z][\w'’.-]{0,19}:\s+/, "").trim())
    .filter((sentence) => sentence.length > 0);
}

function cut(sentence: string): string {
  if (sentence.length <= MAX_SENTENCE) return sentence;
  const clipped = sentence.slice(0, MAX_SENTENCE);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, lastSpace > 80 ? lastSpace : MAX_SENTENCE).trimEnd()}…`;
}

/**
 * At most one cue per kind: the sentence with the most distinct cue words of
 * that kind (the earliest on a tie). Kinds with no cue are left out.
 */
export function readCues(text: string): TextCue[] {
  const all = sentences(text);
  const cues: TextCue[] = [];
  for (const kind of CUE_ORDER) {
    let best: TextCue | null = null;
    for (const sentence of all) {
      const found = new Map<string, string>();
      for (const match of sentence.matchAll(PATTERNS[kind])) {
        const word = match[0].trim();
        const key = word.toLowerCase();
        if (!found.has(key)) found.set(key, word);
      }
      if (found.size > (best?.words.length ?? 0)) {
        best = { kind, words: [...found.values()].slice(0, 3), sentence: cut(sentence) };
      }
    }
    if (best) cues.push(best);
  }
  return cues;
}
