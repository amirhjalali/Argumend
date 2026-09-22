/**
 * Tolerant parser for pasted online threads.
 *
 * People paste three shapes: `name: text` lines (chat, Slack, a transcript),
 * markdown bullets with a bold name (`- **name:** text`), and plain paragraphs
 * with no attribution at all. All three become the same list of turns.
 *
 * Two rules come straight from the probe harness: consecutive turns by one
 * speaker are merged, and turns under `minTurnWords` words get no per-turn
 * questions, because a one-line interjection routes to noise and drags the
 * chunk's answers with it.
 */
import { MAP_REPLY_LIMITS } from "./constants";

export interface ThreadTurn {
  /** Position in the merged turn list. */
  index: number;
  speaker: string;
  text: string;
  wordCount: number;
}

export interface ParsedThread {
  turns: ThreadTurn[];
  /** Turns long enough to carry an argument, capped at `maxSubstantiveTurns`. */
  substantive: ThreadTurn[];
  /** False when no attribution was found and turns are labelled "Paragraph n". */
  hasSpeakerLabels: boolean;
  speakers: string[];
  wordCount: number;
  /** True when substantive turns were dropped by the cap. */
  truncated: boolean;
}

export interface ParseThreadOptions {
  minTurnWords?: number;
  maxSubstantiveTurns?: number;
  maxTurnCharacters?: number;
}

const LIST_MARKER = /^\s*(?:[-*+]\s+|>\s*)+/;

/**
 * Labels a single author uses to annotate their own post. They look exactly
 * like a speaker line, and treating them as one turns one Reddit post into a
 * conversation between "Unattributed", "Edit" and "Update". They belong to the
 * turn above them.
 */
const ANNOTATION_LABEL =
  /^(?:edit|update|eta|tl;?dr|note|source|sources|ref|refs|correction|clarification|disclaimer|ps|p\.s\.)\s*\d*$/i;

export function isAnnotationLabel(candidate: string): boolean {
  return ANNOTATION_LABEL.test(candidate.trim());
}

/** `**name:** text`, `**name**: text`, `__name__: text`, `name: text`. */
const SPEAKER_PATTERNS: RegExp[] = [
  /^\*\*([^*\n]{1,40}?)\s*:\s*\*\*\s*(.*)$/,
  /^\*\*([^*\n]{1,40}?)\*\*\s*:\s*(.*)$/,
  /^__([^_\n]{1,40}?)\s*:\s*__\s*(.*)$/,
  /^__([^_\n]{1,40}?)__\s*:\s*(.*)$/,
  /^([^:\n]{1,40}):(?:\s+(.*)|\s*)$/,
];

function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

/**
 * A speaker label is short, unpunctuated, and looks like a name or handle.
 * Rejecting "Econ 101 also says my rent" style lead-ins matters more than
 * catching every exotic username.
 */
export function isSpeakerLabel(candidate: string): boolean {
  const name = candidate.trim();
  if (name.length === 0 || name.length > 40) return false;
  if (!/[A-Za-z]/.test(name)) return false;
  if (isAnnotationLabel(name)) return false;
  if (/[.!?,;"']$/.test(name)) return false;
  if (/https?$/i.test(name)) return false;
  if (countWords(name) > 4) return false;
  return true;
}

interface SpeakerLine {
  speaker: string;
  text: string;
}

function matchSpeakerLine(line: string): SpeakerLine | null {
  const stripped = line.replace(LIST_MARKER, "");
  for (const pattern of SPEAKER_PATTERNS) {
    const match = stripped.match(pattern);
    if (!match) continue;
    const speaker = match[1].trim();
    const text = (match[2] ?? "").trim();
    if (!isSpeakerLabel(speaker)) continue;
    // "At 10:30 we voted" is a clock, not a speaker.
    if (/\d$/.test(speaker) && /^\d/.test(text)) continue;
    return { speaker, text };
  }
  return null;
}

function pushTurn(turns: SpeakerLine[], speaker: string, text: string): void {
  const trimmed = text.trim();
  if (!trimmed) return;
  const last = turns[turns.length - 1];
  // Merge consecutive turns by the same speaker, as the clip harness does.
  if (last && last.speaker.toLowerCase() === speaker.toLowerCase()) {
    last.text = `${last.text} ${trimmed}`.trim();
    return;
  }
  turns.push({ speaker, text: trimmed });
}

function parseSpeakerMode(lines: string[]): SpeakerLine[] {
  const turns: SpeakerLine[] = [];
  let current: SpeakerLine | null = null;

  for (const line of lines) {
    if (!line.trim()) continue;
    const match = matchSpeakerLine(line);
    if (match) {
      if (current) pushTurn(turns, current.speaker, current.text);
      current = { speaker: match.speaker, text: match.text };
      continue;
    }
    // A continuation line belongs to the turn above it.
    const body = line.replace(LIST_MARKER, "").trim();
    if (current) current.text = `${current.text} ${body}`.trim();
    else current = { speaker: "Unattributed", text: body };
  }
  if (current) pushTurn(turns, current.speaker, current.text);
  return turns;
}

/** Does this block open with "Edit:", "Update:", "PS:" and friends? */
function opensWithAnnotation(block: string): boolean {
  const head = block.replace(LIST_MARKER, "").match(/^([^:\n]{1,40}):/);
  return head !== null && isAnnotationLabel(head[1]);
}

function parseParagraphMode(text: string): SpeakerLine[] {
  const blocks = text
    .split(/\n\s*\n+/)
    .map((block) =>
      block
        .split("\n")
        .map((line) => line.replace(LIST_MARKER, "").trim())
        .filter(Boolean)
        .join(" ")
        .trim(),
    )
    .filter(Boolean);

  // An author's own "Edit:" is part of their post, not a new voice.
  const merged: string[] = [];
  for (const block of blocks) {
    if (merged.length > 0 && opensWithAnnotation(block)) {
      merged[merged.length - 1] = `${merged[merged.length - 1]} ${block}`;
      continue;
    }
    merged.push(block);
  }

  return merged.map((body, index) => ({ speaker: `Paragraph ${index + 1}`, text: body }));
}

export function parseThread(input: string, options: ParseThreadOptions = {}): ParsedThread {
  const minTurnWords = options.minTurnWords ?? MAP_REPLY_LIMITS.minTurnWords;
  const maxSubstantiveTurns = options.maxSubstantiveTurns ?? MAP_REPLY_LIMITS.maxSubstantiveTurns;
  const maxTurnCharacters = options.maxTurnCharacters ?? MAP_REPLY_LIMITS.maxTurnCharacters;

  const normalized = input.replace(/\r\n?/g, "\n").trim();
  const lines = normalized.split("\n");

  // One stray "Note: …" must not turn a paragraph blob into a speaker thread.
  const speakerLineCount = lines.filter((line) => matchSpeakerLine(line) !== null).length;
  const hasSpeakerLabels = speakerLineCount >= 2;

  const raw = hasSpeakerLabels ? parseSpeakerMode(lines) : parseParagraphMode(normalized);

  const turns: ThreadTurn[] = raw.map((turn, index) => {
    const text =
      turn.text.length > maxTurnCharacters
        ? `${turn.text.slice(0, maxTurnCharacters).trimEnd()}…`
        : turn.text;
    return { index, speaker: turn.speaker, text, wordCount: countWords(text) };
  });

  const eligible = turns.filter((turn) => turn.wordCount >= minTurnWords);
  const substantive = eligible.slice(0, maxSubstantiveTurns);

  return {
    turns,
    substantive,
    hasSpeakerLabels,
    speakers: [...new Set(turns.map((turn) => turn.speaker))],
    wordCount: turns.reduce((sum, turn) => sum + turn.wordCount, 0),
    truncated: eligible.length > substantive.length,
  };
}

/** `speaker: text`, the shape every thread-level probe sees. */
export function renderTranscript(
  turns: ThreadTurn[],
  maxCharacters: number = MAP_REPLY_LIMITS.maxTranscriptCharacters,
): string {
  const full = turns.map((turn) => `${turn.speaker}: ${turn.text}`).join("\n");
  return full.length > maxCharacters ? `${full.slice(0, maxCharacters).trimEnd()}…` : full;
}
