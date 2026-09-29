import { topicSummaries } from "@/data/topicIndex";
import { argumentTopicIndex } from "@/lib/argument/topicIds";

/**
 * The "Next step" at the end of every Learn article: one specific map, then
 * the paste tool. A reader who finishes a page about cruxes should land on a
 * map built around them, not on a list of every map.
 */

export interface MapLink {
  href: string;
  title: string;
}

/** The two flagship maps, used when a page links no map of its own. */
export const FLAGSHIP_MAP_IDS = {
  unemployment: "ai-mass-unemployment",
  capitalism: "capitalism-after-ai",
} as const;

/** A link to the map with this id, or undefined when no such map exists. */
export function mapLinkFor(topicId: string): MapLink | undefined {
  const flagship = argumentTopicIndex.find((topic) => topic.id === topicId);
  if (flagship) return { href: `/topics/${flagship.id}`, title: flagship.title };
  const topic = topicSummaries.find((summary) => summary.id === topicId);
  if (topic) return { href: `/topics/${topic.id}`, title: topic.title };
  return undefined;
}

/** Map ids linked from a piece of markdown or HTML, in order of appearance. */
export function topicIdsLinkedIn(text: string): string[] {
  const ids: string[] = [];
  for (const match of text.matchAll(/\/topics\/([a-z0-9-]+)/g)) {
    const id = match[1];
    if (id === "category" || id === "tag" || id === "compare") continue;
    if (!ids.includes(id)) ids.push(id);
  }
  return ids;
}

const ECONOMY_WORDS =
  /\b(capitalis\w*|econom\w*|labou?r|wages?|markets?|inequality|wealth|tax\w*|income|jobs?)\b/i;

/** The flagship that fits a page's words best: the economy map or the jobs map. */
export function flagshipFor(keywords: string): MapLink {
  const id = ECONOMY_WORDS.test(keywords) && !/\bunemploy/i.test(keywords)
    ? FLAGSHIP_MAP_IDS.capitalism
    : FLAGSHIP_MAP_IDS.unemployment;
  return mapLinkFor(id)!;
}

/**
 * Choose the one map an article points to next: the first map the content
 * itself names (curated ids first, then links in the text), otherwise the
 * flagship that fits its words.
 */
export function pickNextMap({
  topicIds = [],
  text = "",
  keywords = "",
}: {
  topicIds?: readonly string[];
  text?: string;
  keywords?: string;
}): MapLink {
  for (const id of [...topicIds, ...topicIdsLinkedIn(text)]) {
    const link = mapLinkFor(id);
    if (link) return link;
  }
  return flagshipFor(keywords);
}
