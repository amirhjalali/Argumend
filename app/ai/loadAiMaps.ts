/**
 * Server loader for /ai: the registered AI maps with their cruxes and
 * ledgers. Reads the ledger files through `loadArgumentTopic`, which caches
 * per process.
 */
import type { AiMapSource } from "@/components/ai/types";
import { loadArgumentTopic } from "@/lib/argument/draftTopics";
import { AI_MAP_TOPIC_IDS } from "@/lib/argument/ledgerPool";

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
