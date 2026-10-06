/**
 * Which maps sit next to this one? The "Keep exploring" links on a map page
 * and the related questions on its /questions page.
 *
 * Related means "on a nearby subject", read from the maps' own words: the
 * paste index (lib/paste/mapIndex.ts) already keeps a whole-map word profile
 * per map and a cosine similarity between any two, so this module reuses it
 * rather than keeping a second similarity or a hand-written cluster list.
 *
 *   1. Siblings first: maps at least `MAP_MATCH.siblingSimilarity` alike,
 *      the same bar the paste flow uses for "closely related", most alike
 *      first.
 *   2. Then the nearest of the rest, where a map in the same category earns
 *      a small bonus (`RELATED_MAPS.sameCategoryBonus`), so a near tie goes
 *      to the map's own shelf but a clearly closer map on another shelf
 *      still wins (nuclear power is filed under policy; its closer
 *      neighbours are energy maps filed under science and technology).
 *
 * Never random and never the corpus order: the same maps' text gives the same
 * list on every build, ties broken by id, and a map never relates to itself.
 */
import { topicSummaries } from "@/data/topicIndex";
import { mapSimilarity, type MapIndex } from "@/lib/paste/mapIndex";
import { getMapIndex, MAP_MATCH } from "@/lib/paste/maps";
import type { RelatedMap } from "@/lib/topicPage/model";

export const RELATED_MAPS = {
  /** How many related maps a page lists. */
  count: 3,
  /**
   * Added to a same-category map's similarity outside the sibling tier.
   * Across all pairs the median similarity is about 0.06 and a map's third
   * nearest neighbour typically 0.13, so 0.03 settles near ties only.
   */
  sameCategoryBonus: 0.03,
} as const;

export interface RankedRelatedMap extends RelatedMap {
  similarity: number;
  sibling: boolean;
}

/**
 * The maps most related to `id`, best first. Pure and synchronous over a
 * built index; `categoryOf` returns undefined for maps without a category
 * (the flagship ArgumentGraph maps), which then rank on similarity alone.
 */
export function rankRelatedMaps(
  index: MapIndex,
  id: string,
  categoryOf: (mapId: string) => string | undefined,
  limit: number = RELATED_MAPS.count,
): RankedRelatedMap[] {
  if (!index.byId.has(id)) return [];
  const category = categoryOf(id);
  const scored = index.maps
    .map(({ document }) => document)
    .filter((document) => document.id !== id)
    .map((document) => {
      const similarity = mapSimilarity(index, id, document.id);
      const sibling = similarity >= MAP_MATCH.siblingSimilarity;
      const sameCategory = category !== undefined && categoryOf(document.id) === category;
      return {
        id: document.id,
        title: document.title,
        similarity,
        sibling,
        rank: similarity + (!sibling && sameCategory ? RELATED_MAPS.sameCategoryBonus : 0),
      };
    });
  scored.sort(
    (a, b) =>
      Number(b.sibling) - Number(a.sibling) ||
      (a.sibling ? b.similarity - a.similarity : b.rank - a.rank) ||
      a.id.localeCompare(b.id),
  );
  return scored.slice(0, limit).map(({ id, title, similarity, sibling }) => ({
    id,
    title,
    similarity,
    sibling,
  }));
}

const categoryById = new Map<string, string>(topicSummaries.map((topic) => [topic.id, topic.category]));

/** The site's categories: pillar maps have one, flagship maps none. */
export function mapCategory(mapId: string): string | undefined {
  return categoryById.get(mapId);
}

/** The related maps for a map page, from the process-wide paste index. */
export async function getRelatedMaps(
  id: string,
  limit: number = RELATED_MAPS.count,
): Promise<RelatedMap[]> {
  const index = await getMapIndex();
  return rankRelatedMaps(index, id, mapCategory, limit).map(({ id: mapId, title }) => ({
    id: mapId,
    title,
  }));
}
