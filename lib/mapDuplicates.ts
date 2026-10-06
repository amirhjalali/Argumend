/**
 * One map per question. Two maps whose whole-map word profiles are this alike
 * are, in practice, the same argument filed twice: a reader can't tell which
 * one their fight is "on", the paste flow splits its answer between them, and
 * the library reads like a content farm.
 *
 * The similarity is the paste index's (lib/paste/mapIndex.ts `mapSimilarity`,
 * cosine over each map's word profile). On 2026-10-06, across all 12,561 pairs
 * of the 159 maps, 99.9% were below 0.30; the eight pairs at 0.41 to 0.54 were
 * all duplicates or near-duplicates, and the next pair down was 0.34 (school
 * phone bans and smartphones under 14: related, distinct questions).
 *
 * `lib/mapDuplicates.test.ts` fails on any pair at or above the line unless
 * `data/mapPairs.ts` lists it with a reason. Before adding a map, run
 * `npx tsx scripts/nearest-maps.ts "<the new map's question>"`.
 */
import { mapSimilarity, type MapIndex } from "@/lib/paste/mapIndex";

export const MAP_DUPLICATE_SIMILARITY = 0.35;

export interface MapPair {
  a: string;
  b: string;
  similarity: number;
}

/** Every pair of maps at or above the duplicate line, most alike first. */
export function nearDuplicatePairs(
  index: MapIndex,
  threshold: number = MAP_DUPLICATE_SIMILARITY,
): MapPair[] {
  const ids = index.maps.map((map) => map.document.id).sort();
  const pairs: MapPair[] = [];
  for (let i = 0; i < ids.length; i += 1) {
    for (let j = i + 1; j < ids.length; j += 1) {
      const similarity = mapSimilarity(index, ids[i], ids[j]);
      if (similarity >= threshold) pairs.push({ a: ids[i], b: ids[j], similarity });
    }
  }
  return pairs.sort((x, y) => y.similarity - x.similarity);
}

/** Order-free key for a pair of map ids. */
export function pairKey(a: string, b: string): string {
  return [a, b].sort().join(" + ");
}
