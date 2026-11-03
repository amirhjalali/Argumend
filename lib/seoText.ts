/**
 * Length limits for what search results show of a page: the meta
 * description (Google truncates around 160 characters) and the title
 * (around 60–65, including the " | ARGUMEND" the title templates add).
 */

export const META_DESCRIPTION_MAX = 160;
export const TITLE_MAX = 65;
/** What the "%s | ARGUMEND" title templates append. */
export const TITLE_SUFFIX = " | ARGUMEND";

const TRAILING_JOINERS = /[\s,;:—–-]+$/;

/**
 * A meta description of at most `max` characters, cut where it reads whole.
 *
 * Text that fits is returned as written (whitespace collapsed). Longer text
 * ends at the last full sentence that fits, when that keeps at least half
 * the budget; otherwise at the last word that fits, with an ellipsis. Never
 * mid-word.
 */
export function fitMetaDescription(text: string, max = META_DESCRIPTION_MAX): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;

  const sentenceEnds = [...clean.matchAll(/[.!?]["”’')\]]*(?= )/g)]
    .map((match) => match.index + match[0].length)
    .filter((end) => end <= max);
  const lastSentence = sentenceEnds.at(-1);
  if (lastSentence !== undefined && lastSentence >= max / 2) {
    return clean.slice(0, lastSentence);
  }

  // Leave room for the ellipsis, and cut at the last space inside the budget.
  const window = clean.slice(0, max);
  const lastSpace = window.lastIndexOf(" ");
  const cut = lastSpace > 0 ? window.slice(0, lastSpace) : window.slice(0, max - 1);
  return `${cut.replace(TRAILING_JOINERS, "")}…`;
}

/**
 * The `title` for a page under a "%s | ARGUMEND" template: the title alone
 * when the suffix would push it past `TITLE_MAX`, so the words that say what
 * the page is are the ones a search result keeps. The title itself is never
 * rewritten.
 */
export function templatedTitle(title: string): string | { absolute: string } {
  return title.length + TITLE_SUFFIX.length > TITLE_MAX ? { absolute: title } : title;
}
