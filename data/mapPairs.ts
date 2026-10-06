/**
 * Map pairs that score at or above the duplicate line
 * (lib/mapDuplicates.ts `MAP_DUPLICATE_SIMILARITY`) and are allowed to.
 *
 * `distinct`: two different questions that share vocabulary. The reason must
 * say what each map asks that the other does not.
 *
 * `pendingMerge`: known duplicates being merged or reframed. This list may
 * only shrink: the test fails once a listed pair drops below the line (remove
 * it then) and fails on any new pair that is not listed.
 */
export interface AllowedMapPair {
  a: string;
  b: string;
  reason: string;
}

export const DISTINCT_MAP_PAIRS: readonly AllowedMapPair[] = [
  {
    a: "glp1-weight-loss-drugs",
    b: "obesity-personal-responsibility",
    reason:
      "One asks whether a class of drugs is a safe, lasting treatment; the other asks what mainly causes obesity. Same vocabulary, different questions.",
  },
];

export const PENDING_MERGE_MAP_PAIRS: readonly AllowedMapPair[] = [
  { a: "ai-job-displacement", b: "ai-white-collar-displacement", reason: "Same question; merging into ai-mass-unemployment (2026-10-06)." },
];
