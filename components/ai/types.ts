import type { ArgumentNode, ArgumentGraph, Claim } from "@/types/argument";
import type { CruxResult } from "@/lib/crux";
import type { CruxLedgerEntry } from "@/types/cruxLedger";
import type { ArgumentTopicMeta } from "@/lib/argument/draftTopics";

/** One AI map as the page receives it from the server loader. */
export interface AiMapSource {
  topicId: string;
  title: string;
  graph: ArgumentGraph;
  /** The engine's emitted cruxes, engine order. */
  cruxes: CruxResult[];
  /** Every validated ledger entry; the pool filters to public ones. */
  ledger: CruxLedgerEntry[];
  cruxNotes?: ArgumentTopicMeta["cruxNotes"];
}

/** A map with its node index, built once per render. */
export interface IndexedMap extends AiMapSource {
  label: string;
  nodesById: Map<string, ArgumentNode>;
}

/** The crux's question as the map page words it. */
export function cruxQuestion(map: IndexedMap, claimId: string): string {
  const claim = map.nodesById.get(claimId);
  const note = map.cruxNotes?.[claimId];
  if (claim?.type !== "claim") return note?.question ?? claimId;
  return note?.question ?? claim.summary ?? claim.statement;
}

export function claimOf(map: IndexedMap, claimId: string): Claim | undefined {
  const node = map.nodesById.get(claimId);
  return node?.type === "claim" ? node : undefined;
}
