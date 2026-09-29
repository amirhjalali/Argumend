/**
 * Every map on the site, as text the paste index can read (lib/paste/mapIndex.ts).
 *
 * Read from the maps themselves at runtime, never from a generated copy, so a
 * map edited today (a new crux question, a new piece of evidence) is found by
 * its new words on the next process start with nothing to regenerate. Fields
 * a map does not have yet (`topic.question`, `crux.question`) are simply
 * empty.
 */
import { isClaims } from "@/data/is-claims";
import { topicSummaries } from "@/data/topicIndex";
import { loadTopicById } from "@/data/topicLoader";
import { argumentTopicIndex } from "@/lib/argument/topicIds";
import { getAllQuestionVariations } from "@/lib/questions";
import type { Topic } from "@/lib/schemas/topic";
import type { MapDocument } from "./mapIndex";

/** The reader-facing phrasings for each topic, from the two search catalogues. */
function phrasingsByTopic(): Map<string, string[]> {
  const collected = new Map<string, string[]>();
  const push = (topicId: string, text: string) => {
    const list = collected.get(topicId) ?? [];
    list.push(text);
    collected.set(topicId, list);
  };
  for (const variation of getAllQuestionVariations(topicSummaries)) {
    push(variation.topicId, variation.question);
  }
  for (const claim of isClaims) push(claim.topicId, `${claim.question} ${claim.claim}`);
  return collected;
}

function present(values: ReadonlyArray<string | undefined>): string[] {
  return values.filter((value): value is string => Boolean(value && value.trim()));
}

export function pillarMapDocument(topic: Topic, phrasings: readonly string[] = []): MapDocument {
  const pillars = topic.pillars;
  const evidence = [...(topic.evidence ?? []), ...pillars.flatMap((pillar) => pillar.evidence ?? [])];
  return {
    id: topic.id,
    title: topic.title,
    claim: topic.meta_claim,
    kind: "map",
    fields: {
      name: present([topic.title, topic.question, topic.id.replace(/-/g, " "), ...phrasings, ...(topic.aliases ?? [])]),
      claim: present([
        topic.meta_claim,
        ...pillars.flatMap((pillar) => [pillar.title, pillar.crux.title, pillar.crux.question]),
      ]),
      body: present([
        topic.keystone_fact?.statement,
        ...(topic.simple_case ?? []),
        ...pillars.flatMap((pillar) => [
          pillar.short_summary,
          pillar.skeptic_premise,
          pillar.proponent_rebuttal,
          pillar.crux.description,
          pillar.crux.falsification?.live_disagreement,
          pillar.crux.falsification?.common_ground,
          // supporter_flip / skeptic_flip are left out: they describe
          // hypothetical evidence ("If … the case would weaken"), whose
          // generic vocabulary (wages, jobs, studies) pulled unrelated maps
          // level with the right one once every map carried them.
        ]),
      ]),
      evidence: present(evidence.flatMap((item) => [item.title, item.description, item.source])),
    },
  };
}

async function flagshipDocument(entry: (typeof argumentTopicIndex)[number]): Promise<MapDocument | null> {
  // The drafts and the crux engine load only when the index is first built.
  const { loadArgumentTopic } = await import("@/lib/argument/draftTopics");
  const topic = loadArgumentTopic(entry.id);
  if (!topic) return null;
  const { meta, graph } = topic;
  const text = (node: { statement: string; summary?: string }) => node.summary ?? node.statement;
  const ofType = (type: string) => graph.nodes.filter((node) => node.type === type);
  return {
    id: entry.id,
    title: meta.title,
    claim: graph.question.statement,
    kind: "flagship",
    fields: {
      name: present([meta.title, graph.question.statement, entry.id.replace(/-/g, " "), ...entry.aliases]),
      claim: present([
        entry.tagline,
        ...ofType("position").map(text),
        ...Object.values(meta.cruxNotes ?? {}).map((note) => note.question),
      ]),
      body: present([
        meta.hook,
        meta.contextNote,
        meta.tldr,
        ...meta.takeaways,
        ...ofType("claim").map(text),
      ]),
      evidence: present(
        graph.nodes.flatMap((node) =>
          node.type === "evidence" ? [node.summary, node.source.title] : [],
        ),
      ),
    },
  };
}

/** How many maps the site has: the pillar maps plus the flagship maps. */
export const EXPECTED_MAP_COUNT = topicSummaries.length + argumentTopicIndex.length;

/**
 * Pillar maps in the topic index's order, then the flagship maps. A map whose
 * module fails to load is left out rather than failing the paste; the caller
 * sees the shortfall (fewer than EXPECTED_MAP_COUNT) and does not cache it.
 */
export async function loadMapDocuments(): Promise<MapDocument[]> {
  const phrasings = phrasingsByTopic();
  const topics = await Promise.all(topicSummaries.map((summary) => loadTopicById(summary.id)));
  const pillarMaps = topics.flatMap((topic) =>
    topic ? [pillarMapDocument(topic, phrasings.get(topic.id) ?? [])] : [],
  );
  const flagships = await Promise.all(argumentTopicIndex.map(flagshipDocument));
  return [...pillarMaps, ...flagships.filter((doc): doc is MapDocument => doc !== null)];
}
