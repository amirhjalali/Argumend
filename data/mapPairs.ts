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
  {
    a: "housing-affordability-crisis",
    b: "rent-control-effectiveness",
    reason:
      "One asks whether building more homes makes housing affordable; the other asks whether capping rents does. They share supply evidence because rent control's critics name supply as the alternative.",
  },
  {
    a: "children-smartphone-age",
    b: "school-phone-bans",
    reason:
      "One asks whether children should own a phone at all, turning on the age threshold and whether pledges or laws solve the collective-action problem; the other asks whether a school-day ban works, turning on test scores and fair enforcement. They cite the same mental-health studies.",
  },
  {
    a: "consciousness-ai-systems",
    b: "consciousness-hard-problem",
    reason:
      "One asks whether AI might be conscious and what we owe it under that uncertainty; the other asks whether explaining brain function leaves experience unexplained. Only substrate independence is a crux in both.",
  },
  {
    a: "gain-of-function-research-ban",
    b: "pandemic-preparedness",
    reason:
      "One asks whether one kind of lab research should be banned worldwide, turning on accident risk and whether a ban could be enforced; the other asks whether governments should spend heavily on readiness. They share pandemic vocabulary, and neither question is a sub-case of the other.",
  },
  {
    a: "remote-work-permanence",
    b: "return-to-office-productivity",
    reason:
      "One forecasts whether the five-day office week is gone for good and how cities adapt; the other asks whether office mandates actually raise output. One asks what will happen, the other whether a policy works.",
  },
  {
    a: "obesity-personal-responsibility",
    b: "ultra-processed-food",
    reason:
      "One asks whether obesity comes down to individual choice or to environment, genes and biology; the other asks whether one food category causes disease beyond its nutrients, and whether labels or taxes would help. Both cite the Hall trial and Chile's labels.",
  },
];

export const PENDING_MERGE_MAP_PAIRS: readonly AllowedMapPair[] = [];
