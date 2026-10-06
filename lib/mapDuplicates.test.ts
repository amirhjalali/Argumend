import { beforeAll, describe, expect, it } from "vitest";
import { DISTINCT_MAP_PAIRS, PENDING_MERGE_MAP_PAIRS } from "@/data/mapPairs";
import { getMapIndex } from "@/lib/paste/maps";
import { mapSimilarity, type MapIndex } from "@/lib/paste/mapIndex";
import { MAP_DUPLICATE_SIMILARITY, nearDuplicatePairs, pairKey } from "./mapDuplicates";

let index: MapIndex;

beforeAll(async () => {
  index = await getMapIndex();
}, 60_000);

describe("one map per question", () => {
  it("has no near-duplicate maps beyond the listed pairs", () => {
    const allowed = new Set(
      [...DISTINCT_MAP_PAIRS, ...PENDING_MERGE_MAP_PAIRS].map((pair) => pairKey(pair.a, pair.b)),
    );
    const unlisted = nearDuplicatePairs(index)
      .filter((pair) => !allowed.has(pairKey(pair.a, pair.b)))
      .map((pair) => `${pair.a} + ${pair.b} (${pair.similarity.toFixed(2)})`);
    // A new map this close to an existing one is almost always the same
    // argument filed twice: fold it into the existing map (as an "Also asked
    // as" phrasing, an alias, or a crux), or reframe it to a distinct question.
    // Check first with: npx tsx scripts/nearest-maps.ts "<question>"
    expect(unlisted, `near-duplicate maps (>= ${MAP_DUPLICATE_SIMILARITY})`).toEqual([]);
  });

  it("lists only pairs of maps that exist, each once, with a reason", () => {
    const seen = new Set<string>();
    for (const pair of [...DISTINCT_MAP_PAIRS, ...PENDING_MERGE_MAP_PAIRS]) {
      const key = pairKey(pair.a, pair.b);
      expect(seen.has(key), key).toBe(false);
      seen.add(key);
      expect(index.byId.has(pair.a), pair.a).toBe(true);
      expect(index.byId.has(pair.b), pair.b).toBe(true);
      expect(pair.reason.length, key).toBeGreaterThan(20);
    }
  });

  it("lets the pending-merge list only shrink", () => {
    const stale = PENDING_MERGE_MAP_PAIRS.filter(
      (pair) => mapSimilarity(index, pair.a, pair.b) < MAP_DUPLICATE_SIMILARITY,
    ).map((pair) => pairKey(pair.a, pair.b));
    expect(stale, "merged or reframed: remove from PENDING_MERGE_MAP_PAIRS").toEqual([]);
  });
});
