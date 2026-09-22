/**
 * What leaves the building.
 *
 * The HTTP lane posts pasted text to a third party, so before anything is sent
 * it loses its direct identifiers: email addresses, phone numbers and @handles
 * become placeholder tokens, and every speaker becomes "Speaker 1", "Speaker 2"
 * and so on. The real names are kept locally and put back when the reply is
 * composed, so the reader still sees who did not make an argument.
 *
 * This is redaction of obvious identifiers, not anonymisation: prose can
 * identify a person without containing a single handle, and nothing here can
 * change that. It shrinks the disclosure, it does not eliminate it.
 *
 * The other half of the job is doing no damage. A scrubber that eats "2019
 * 2020 2021" or rewrites "the host country" has corrupted the argument it was
 * supposed to protect, and every rule below is deliberately narrow for that
 * reason: it would rather miss an unusual identifier than mangle a number or a
 * common word.
 */
import { MAP_REPLY_LIMITS } from "./constants";
import type { ParsedThread } from "./parse";

export const EMAIL_PLACEHOLDER = "[email]";
export const PHONE_PLACEHOLDER = "[phone]";
export const HANDLE_PLACEHOLDER = "[handle]";

export interface ScrubCounts {
  emails: number;
  phones: number;
  handles: number;
}

export interface ScrubTextResult {
  text: string;
  redactions: ScrubCounts;
}

/** Unicode-aware: a Cyrillic or accented address is still an address. */
const EMAIL = /[\p{L}\p{N}._%+-]+[@＠][\p{L}\p{N}-]+(?:\.[\p{L}\p{N}-]+)+/gu;

/** Unicode-aware, and fullwidth ＠ counts, because a paste carries what it carries. */
const HANDLE =
  /(^|[^\p{L}\p{N}_@＠./-])[@＠]([\p{L}\p{N}_][\p{L}\p{N}_.]{1,29})/gu;

/**
 * Phone numbers are matched by shape, never by "a run of digits and spaces".
 * The permissive version redacted "2019 2020 2021" and "12000 34000 56000",
 * which is worse than missing a number: it silently deletes the evidence
 * people are arguing about.
 *
 * Each pattern needs a structural signal that prose numbers do not have — a
 * country code, a parenthesised group, or internal punctuation — or ten-plus
 * contiguous digits. Bare space-separated groups with no such signal
 * ("020 7946 0958") are deliberately left alone: nothing distinguishes them
 * from a row of figures.
 */
const PHONE_PATTERNS: RegExp[] = [
  // +1 (415) 555-0132 · +44 20 7946 0958 · +1-415-555-0132
  // At most three groups after the country code, so it cannot run on into a
  // following number.
  /\+\d{1,3}(?:[ .-]?\(\d{1,5}\)|[ .-]?\d{1,5}){1,3}/g,
  // (415) 555-0132
  /\(\d{2,5}\)[ .-]?\d{2,5}(?:[ .-]?\d{2,5})?/g,
  // 415-555-0132 · 0800.123.4567 — three punctuated groups, and not part of a
  // longer dotted run such as an IP address or a version string.
  /(?<![\d.-])\d{2,5}[.-]\d{2,5}[.-]\d{2,6}\b(?![.-]?\d)/g,
  // 4155550132
  /(?<![\d.-])\d{10,15}(?![\d.-])/g,
];

const MIN_PHONE_DIGITS = 9;
const MAX_PHONE_DIGITS = 15;

export function emptyScrubCounts(): ScrubCounts {
  return { emails: 0, phones: 0, handles: 0 };
}

export function addScrubCounts(a: ScrubCounts, b: ScrubCounts): ScrubCounts {
  return {
    emails: a.emails + b.emails,
    phones: a.phones + b.phones,
    handles: a.handles + b.handles,
  };
}

function digitCount(value: string): number {
  return value.replace(/\D/g, "").length;
}

/**
 * Order matters: emails first, or the handle rule eats their local part; phones
 * last, so a redacted email cannot leave a digit run behind.
 */
export function scrubText(input: string): ScrubTextResult {
  const redactions = emptyScrubCounts();

  let text = input.replace(EMAIL, () => {
    redactions.emails += 1;
    return EMAIL_PLACEHOLDER;
  });

  text = text.replace(HANDLE, (_match, prefix: string) => {
    redactions.handles += 1;
    return `${prefix}${HANDLE_PLACEHOLDER}`;
  });

  for (const pattern of PHONE_PATTERNS) {
    text = text.replace(pattern, (match: string) => {
      const digits = digitCount(match);
      if (digits < MIN_PHONE_DIGITS || digits > MAX_PHONE_DIGITS) return match;
      redactions.phones += 1;
      return PHONE_PLACEHOLDER;
    });
  }

  return { text, redactions };
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export interface ScrubbedTurn {
  /** Index into the parsed thread, so the reply can map back. */
  index: number;
  /** "Speaker 1", "Speaker 2", … — what the API sees. */
  alias: string;
  text: string;
}

export interface ScrubbedThread {
  turns: ScrubbedTurn[];
  byIndex: Map<number, ScrubbedTurn>;
  /** `Speaker 1: …` lines, truncated to the transcript cap. */
  transcript: string;
  aliasBySpeaker: Record<string, string>;
  speakerByAlias: Record<string, string>;
  redactions: ScrubCounts;
}

/**
 * Handles and screen names that are also ordinary English words, or the role
 * labels a transcript uses. Masking these inside body text rewrites the
 * argument: a thread with a speaker called "Host" would read "The Speaker 1
 * country", and one with a speaker called "Will" would lose every future
 * tense. When in doubt, leave the word alone — the speaker's *label* is
 * renamed either way, which is what the privacy rule actually requires.
 */
const AMBIGUOUS_SPEAKER_WORDS = new Set([
  // roles and transcript furniture
  "host", "guest", "chair", "panel", "panelist", "moderator", "speaker", "caller",
  "admin", "mods", "user", "anon", "staff", "team", "board", "council", "mayor",
  "judge", "doctor", "nurse", "teacher", "student", "author", "editor", "reporter",
  "interviewer", "audience", "narrator", "voice", "reply", "question", "answer",
  // given names that are also common words
  "will", "mark", "grant", "rose", "bill", "frank", "hope", "faith", "joy",
  "chase", "drew", "page", "rich", "sue", "earl", "pat", "don", "victor",
  "miles", "brook", "bond", "hunter", "carter", "mason", "reed", "wood",
  "stone", "fields", "banks", "king", "prince", "price", "love", "young",
  "bright", "noble", "sunny", "star", "dawn", "summer", "winter", "autumn",
  "april", "august", "march", "june", "may", "art", "bob", "jack",
]);

/** A handle is unambiguous: it carries punctuation or digits, or it is a full name. */
function isHandleShaped(name: string): boolean {
  return /[_\d]/.test(name) || /\s/.test(name);
}

/**
 * Above this length, a plain alphabetic label that matches a speaker is a
 * screen name rather than a word ("buildmorehomes"), so the lowercase-use
 * check below is skipped. Short ones ("bridge", "chase") stay suspect.
 */
const PLAIN_NAME_AMBIGUITY_LIMIT = 8;

/**
 * Decide which speaker names are safe to replace where they appear inside
 * another turn's prose. Three gates, all of which a name must pass:
 * it is long enough to be distinctive, it is not a word the language already
 * uses, and — for plain alphabetic names — the thread does not itself use it
 * lowercase as an ordinary word.
 */
export function maskableSpeakerNames(
  speakers: readonly string[],
  body: string,
): string[] {
  return speakers.filter((name) => {
    if (name.length < 4) return false;
    if (AMBIGUOUS_SPEAKER_WORDS.has(name.toLowerCase())) return false;
    if (isHandleShaped(name)) return true;
    if (name.length > PLAIN_NAME_AMBIGUITY_LIMIT) return true;
    // A word the thread itself uses lowercase is prose, not a mention: "the
    // bridge collapsed" in a thread with a speaker called Bridge. Matched
    // case-sensitively against the original body, which is the whole point.
    const lowercaseUse = new RegExp(
      `(^|[^\\p{L}\\p{N}_])${escapeRegExp(name.toLowerCase())}(?![\\p{L}\\p{N}_])`,
      "u",
    );
    return !lowercaseUse.test(body);
  });
}

function maskSpeakerNames(
  text: string,
  aliasBySpeaker: Record<string, string>,
  maskable: readonly string[],
): string {
  // Longest first, so "Piers Morgan" is replaced before "Piers".
  const names = [...maskable].sort((a, b) => b.length - a.length);
  let masked = text;
  for (const name of names) {
    const pattern = new RegExp(
      `(^|[^\\p{L}\\p{N}_])${escapeRegExp(name)}(?![\\p{L}\\p{N}_])`,
      "giu",
    );
    masked = masked.replace(pattern, (_match, prefix: string) => `${prefix}${aliasBySpeaker[name]}`);
  }
  return masked;
}

export function scrubThread(
  parsed: ParsedThread,
  options: { maxTranscriptCharacters?: number } = {},
): ScrubbedThread {
  const maxTranscriptCharacters =
    options.maxTranscriptCharacters ?? MAP_REPLY_LIMITS.maxTranscriptCharacters;

  const aliasBySpeaker: Record<string, string> = {};
  const speakerByAlias: Record<string, string> = {};
  for (const speaker of parsed.speakers) {
    const alias = `Speaker ${Object.keys(aliasBySpeaker).length + 1}`;
    aliasBySpeaker[speaker] = alias;
    speakerByAlias[alias] = speaker;
  }

  const body = parsed.turns.map((turn) => turn.text).join("\n");
  const maskable = maskableSpeakerNames(parsed.speakers, body);

  let redactions = emptyScrubCounts();
  const turns: ScrubbedTurn[] = parsed.turns.map((turn) => {
    const scrubbed = scrubText(turn.text);
    redactions = addScrubCounts(redactions, scrubbed.redactions);
    return {
      index: turn.index,
      alias: aliasBySpeaker[turn.speaker] ?? "Speaker 1",
      text: maskSpeakerNames(scrubbed.text, aliasBySpeaker, maskable),
    };
  });

  const full = turns.map((turn) => `${turn.alias}: ${turn.text}`).join("\n");
  const transcript =
    full.length > maxTranscriptCharacters
      ? `${full.slice(0, maxTranscriptCharacters).trimEnd()}…`
      : full;

  return {
    turns,
    byIndex: new Map(turns.map((turn) => [turn.index, turn])),
    transcript,
    aliasBySpeaker,
    speakerByAlias,
    redactions,
  };
}
