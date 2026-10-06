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
  { a: "tiktok-ban", b: "government-platform-bans", reason: "Same question; merging (2026-10-06)." },
  {
    a: "housing-affordability-crisis",
    b: "rent-control-effectiveness",
    reason: "Housing map overlaps rent control; reframing it around supply (2026-10-06).",
  },
  { a: "ai-job-displacement", b: "ai-white-collar-displacement", reason: "Same question; merging into ai-mass-unemployment (2026-10-06)." },
  { a: "longevity-science", b: "longevity-anti-aging", reason: "Same subject; merging (2026-10-06)." },
  { a: "us-iran-conflict", b: "iran-war-justification", reason: "Overlapping; merging or reframing (2026-10-06)." },
  { a: "ev-environmental-impact", b: "lithium-mining-ev-impact", reason: "Same question; merging (2026-10-06)." },
  { a: "psychedelics-mental-health", b: "psychedelic-therapy-hype", reason: "Same subject; merging (2026-10-06)." },
];
