/** Words a reader gets through in a minute of careful reading. */
const WORDS_PER_MINUTE = 220;

/** "3 min read", from the words in one or more blocks of text. */
export function readTime(...texts: readonly string[]): string {
  const words = texts.join(" ").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min read`;
}

/** "June 2026", from an ISO date: month and year only, never the batch day. */
export function monthYear(iso: string): string | undefined {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return undefined;
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(date);
}
