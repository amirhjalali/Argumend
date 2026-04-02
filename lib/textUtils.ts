/**
 * Shared text processing utilities used by offline analysis and judging modules.
 */

export const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "if", "then", "is", "are", "was",
  "were", "to", "of", "for", "in", "on", "at", "by", "with", "as", "it",
  "its", "that", "this", "these", "those", "be", "can", "could", "should",
  "would", "will", "from", "about", "into", "their", "they", "them", "there",
  "also", "than", "more", "most", "very", "much",
]);

export const ABSOLUTE_MARKERS = [
  "always", "never", "everyone", "nobody", "completely",
  "guaranteed", "all", "none", "obviously", "undeniable",
];

export const EMOTIONAL_MARKERS = [
  "outrageous", "absurd", "disaster", "catastrophe",
  "evil", "ridiculous", "panic", "fear",
];

export const EVIDENCE_MARKERS = [
  "study", "report", "data", "evidence", "according to",
  "research", "analysis", "survey", "%", "$",
];

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function normalize(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

export function splitSentences(text: string): string[] {
  return normalize(text)
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export function countMarkers(text: string, markers: string[]): number {
  const lower = text.toLowerCase();
  let count = 0;
  for (const marker of markers) {
    if (lower.includes(marker)) count += 1;
  }
  return count;
}

export function extractKeywords(content: string, max = 3): string[] {
  const tokens = content
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 3 && !STOP_WORDS.has(token));

  const counts = new Map<string, number>();
  for (const token of tokens) {
    counts.set(token, (counts.get(token) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([token]) => token);
}

export function keywordSet(text: string): Set<string> {
  const set = new Set<string>();
  for (const token of text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/)) {
    if (token.length > 3 && !STOP_WORDS.has(token)) {
      set.add(token);
    }
  }
  return set;
}
