/**
 * Which maps sit next to this one? The "Keep exploring" links on a map page
 * and the related questions on its /questions page.
 *
 * Related means "on a nearby subject", read from the maps' own words: the
 * paste index (lib/paste/mapIndex.ts) already keeps a whole-map word profile
 * per map and a cosine similarity between any two, so this module reuses it
 * rather than keeping a second similarity or a hand-written cluster list.
 *
 * A map must clear a similarity floor. An explicit shared subject tag can
 * admit a weaker text match, but broad category tags cannot. For example,
 * "transport" and "transportation" connect road pricing and self-driving
 * cars; merely filing two maps under "policy" does not connect them.
 * Without a shared subject tag, configured subject checks must hold in both
 * directions. Generic overlap cannot connect water scarcity to birth rates.
 *
 * Lists can be shorter than three, including empty. The reading page still
 * offers Browse all maps, without presenting unrelated maps as neighbours.
 *
 * Never random and never the corpus order: the same maps' text gives the same
 * list on every build, ties broken by id, and a map never relates to itself.
 */
import { topicSummaries } from "@/data/topicIndex";
import { mapSimilarity, type MapDocument, type MapIndex } from "@/lib/paste/mapIndex";
import { getMapIndex, MAP_MATCH } from "@/lib/paste/maps";
import { fitsMapSubject } from "@/lib/paste/mapSubjects";
import { pasteTerms } from "@/lib/paste/terms";
import type { RelatedMap } from "@/lib/topicPage/model";

export const RELATED_MAPS = {
  /** At most this many related maps, never a quota to fill. */
  count: 3,
  /**
   * Below the paste lane's sibling bar, while excluding loose matches such
   * as road pricing to basic income (0.081) or rent caps to estate tax (0.106).
   */
  minSimilarity: 0.12,
  /** A shared subject tag still needs text support, not the tag alone. */
  minTaggedSimilarity: 0.08,
} as const;

const tagKey = (tag: string) => pasteTerms(tag).join(" ");
const CATEGORY_TAGS = new Set(topicSummaries.map((topic) => tagKey(topic.category)));
const subjectTagKeys = (tags: readonly string[]) =>
  new Set(tags.map(tagKey).filter((tag) => tag.length > 0 && !CATEGORY_TAGS.has(tag)));
// A built index reuses immutable documents across page requests. Weak keys
// let an obsolete index and its token sets be collected together.
const termsByDocument = new WeakMap<MapDocument, ReadonlySet<string>>();
function subjectTerms(document: MapDocument): ReadonlySet<string> {
  const cached = termsByDocument.get(document);
  if (cached) return cached;
  const terms = new Set(
    Object.values(document.fields).flatMap((entries) =>
      entries.flatMap((text) => pasteTerms(text, { keepStopwords: true })),
    ),
  );
  termsByDocument.set(document, terms);
  return terms;
}

export interface RankedRelatedMap extends RelatedMap {
  similarity: number;
  sibling: boolean;
}

/**
 * The maps most related to `id`, best first. Pure and synchronous over a
 * built index. The optional tag reader supplies authored subject metadata;
 * maps without it (including the flagships) rank on text similarity alone.
 */
export function rankRelatedMaps(
  index: MapIndex,
  id: string,
  limit: number = RELATED_MAPS.count,
  tagsOf: (mapId: string) => readonly string[] = () => [],
): RankedRelatedMap[] {
  const source = index.byId.get(id)?.document;
  if (!source) return [];
  const sourceTags = subjectTagKeys(tagsOf(id));
  const sourceTerms = subjectTerms(source);
  const scored = index.maps
    .map(({ document }) => document)
    .filter((document) => document.id !== id)
    .map((document) => {
      const similarity = mapSimilarity(index, id, document.id);
      const sibling = similarity >= MAP_MATCH.siblingSimilarity;
      const sharedTag = [...subjectTagKeys(tagsOf(document.id))].some((tag) => sourceTags.has(tag));
      return {
        id: document.id,
        title: document.title,
        similarity,
        sibling,
        sharedTag,
      };
    })
    .filter(({ similarity, sharedTag }) =>
      similarity >= RELATED_MAPS.minSimilarity ||
      (sharedTag && similarity >= RELATED_MAPS.minTaggedSimilarity),
    )
    .filter(({ id: candidateId, sharedTag }) => {
      if (sharedTag) return true;
      const candidate = index.byId.get(candidateId)!.document;
      return fitsMapSubject(source.subjectAnchors, subjectTerms(candidate)) &&
        fitsMapSubject(candidate.subjectAnchors, sourceTerms);
    });
  scored.sort(
    (a, b) =>
      b.similarity - a.similarity ||
      a.id.localeCompare(b.id),
  );
  return scored.slice(0, limit).map(({ id, title, similarity, sibling }) => ({
    id,
    title,
    similarity,
    sibling,
  }));
}

const tagsById = new Map<string, readonly string[]>(topicSummaries.map((topic) => [topic.id, topic.tags]));

/** The related maps for a map page, from the process-wide paste index. */
export async function getRelatedMaps(
  id: string,
  limit: number = RELATED_MAPS.count,
): Promise<RelatedMap[]> {
  const index = await getMapIndex();
  return rankRelatedMaps(index, id, limit, (mapId) => tagsById.get(mapId) ?? []).map(({ id: mapId, title }) => ({
    id: mapId,
    title,
  }));
}
