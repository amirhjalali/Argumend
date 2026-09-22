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

const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+/g;
const HANDLE = /(^|[^A-Za-z0-9_@./-])@([A-Za-z0-9_][A-Za-z0-9_.]{1,29})/g;
/** A candidate run of digits and separators; the digit count decides. */
const PHONE_CANDIDATE = /\+?\d[\d\s().-]{6,20}\d/g;

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

  text = text.replace(PHONE_CANDIDATE, (match: string) => {
    // Years, percentages and money are digit runs too; only a plausible phone
    // number length is redacted.
    const digits = match.replace(/\D/g, "").length;
    if (digits < 9 || digits > 15) return match;
    redactions.phones += 1;
    const leading = /^\s/.test(match) ? " " : "";
    const trailing = /\s$/.test(match) ? " " : "";
    return `${leading}${PHONE_PLACEHOLDER}${trailing}`;
  });

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
 * Replace each speaker's own name where it appears inside another turn's text.
 * Short names are left alone: substituting every "Sam" in a thread would do
 * more damage to the argument than it does for privacy.
 */
function maskSpeakerNames(text: string, aliasBySpeaker: Record<string, string>): string {
  const names = Object.keys(aliasBySpeaker)
    .filter((name) => name.length >= 4)
    .sort((a, b) => b.length - a.length);
  let masked = text;
  for (const name of names) {
    const pattern = new RegExp(`(^|[^A-Za-z0-9_])${escapeRegExp(name)}(?![A-Za-z0-9_])`, "gi");
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

  let redactions = emptyScrubCounts();
  const turns: ScrubbedTurn[] = parsed.turns.map((turn) => {
    const scrubbed = scrubText(turn.text);
    redactions = addScrubCounts(redactions, scrubbed.redactions);
    return {
      index: turn.index,
      alias: aliasBySpeaker[turn.speaker] ?? "Speaker 1",
      text: maskSpeakerNames(scrubbed.text, aliasBySpeaker),
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
