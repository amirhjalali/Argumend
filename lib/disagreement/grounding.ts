import { DISAGREEMENT_LIMITS } from "./constants";
import type { GroundingRef, RawGroundingQuote } from "@/types/disagreement";

export interface GroundingResult {
  refs: GroundingRef[];
  dropped: number;
  warnings: string[];
}

function fold(text: string): { folded: string; map: number[] } {
  const map: number[] = [];
  let folded = "";
  let lastWasSpace = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const normalized =
      char === "\u2018" || char === "\u2019"
        ? "'"
        : char === "\u201c" || char === "\u201d"
          ? '"'
          : char === "\u00a0"
            ? " "
            : char;

    if (/\s/.test(normalized)) {
      if (!lastWasSpace && folded.length > 0) {
        folded += " ";
        map.push(index);
      }
      lastWasSpace = true;
      continue;
    }

    folded += normalized;
    map.push(index);
    lastWasSpace = false;
  }

  return { folded: folded.trimEnd(), map };
}

function findExact(source: string, quote: string): Array<{ start: number; end: number }> {
  const matches: Array<{ start: number; end: number }> = [];
  let from = 0;
  while (from <= source.length) {
    const start = source.indexOf(quote, from);
    if (start === -1) break;
    matches.push({ start, end: start + quote.length });
    from = start + 1;
  }
  return matches;
}

function findFolded(source: string, quote: string): Array<{ start: number; end: number }> {
  const sourceFold = fold(source);
  const quoteFold = fold(quote);
  if (!quoteFold.folded) return [];

  const matches: Array<{ start: number; end: number }> = [];
  let from = 0;
  while (from <= sourceFold.folded.length) {
    const foldedStart = sourceFold.folded.indexOf(quoteFold.folded, from);
    if (foldedStart === -1) break;
    const start = sourceFold.map[foldedStart] ?? 0;
    const lastFolded = foldedStart + quoteFold.folded.length - 1;
    const end = (sourceFold.map[lastFolded] ?? start) + 1;
    matches.push({ start, end });
    from = foldedStart + 1;
  }
  return matches;
}

export function locateQuote(source: string, quote: string): { start: number; end: number } | null {
  const exact = findExact(source, quote);
  if (exact.length === 1) return exact[0];
  if (exact.length > 1) return null;

  const folded = findFolded(source, quote);
  if (folded.length === 1) return folded[0];
  return null;
}

export function groundQuotes(
  source: string,
  quotes: RawGroundingQuote[],
  idPrefix: string,
): GroundingResult {
  const refs: GroundingRef[] = [];
  const warnings: string[] = [];
  let dropped = 0;

  for (const [index, item] of quotes.entries()) {
    const quote = item.quote.slice(0, DISAGREEMENT_LIMITS.maxQuoteCharacters);
    const located = locateQuote(source, quote);
    if (!located) {
      dropped += 1;
      warnings.push(`Dropped ungrounded quote at ${idPrefix}[${index}]`);
      continue;
    }
    refs.push({
      id: `${idPrefix}-g${index + 1}`,
      quote,
      participantId: item.participantId,
      start: located.start,
      end: located.end,
    });
  }

  return { refs, dropped, warnings };
}
