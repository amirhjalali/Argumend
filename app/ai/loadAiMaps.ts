/**
 * Server loader for /ai: the registered AI maps with their cruxes and
 * ledgers. Reads the ledger files through `loadArgumentTopic`, which caches
 * per process.
 */
import type { AiMapSource } from "@/components/ai/types";
import { loadArgumentTopic } from "@/lib/argument/draftTopics";
import { AI_MAP_TOPIC_IDS, ledgerAsOf } from "@/lib/argument/ledgerPool";
import { ARGUMENT_TOPICS_FIRST_PUBLISHED } from "@/lib/site";

/** The registered AI maps, in page order. The Covid ledger is not one. */
export function loadAiMaps(): AiMapSource[] {
  return AI_MAP_TOPIC_IDS.flatMap((id) => {
    const topic = loadArgumentTopic(id);
    if (!topic) return [];
    return [
      {
        topicId: id,
        title: topic.meta.title,
        graph: topic.graph,
        cruxes: topic.cruxes,
        ledger: topic.ledger,
        cruxNotes: topic.meta.cruxNotes,
      },
    ];
  });
}

/**
 * The day /ai is "as of": the latest day any public ledger entry was
 * recorded, or the day the maps were first published when none has been.
 * The page's JSON-LD and the sitemap both use it, so they agree.
 */
export function aiPageAsOf(maps: AiMapSource[] = loadAiMaps()): string {
  return ledgerAsOf(maps) ?? ARGUMENT_TOPICS_FIRST_PUBLISHED;
}
