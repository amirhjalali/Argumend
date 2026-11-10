/**
 * Topics shaped for the paste flow's tests, so a test of how a result shows
 * a borrowed card does not depend on some live map happening to have a crux
 * with evidence on one side only (every content round that balanced that
 * map broke those tests: student-debt in round 13, tiktok-ban after it).
 */
import { buildTopic } from "@/data/buildTopic";
import type { Evidence, Pillar, Topic } from "@/lib/schemas/topic";
import { findMaps, matchOnTopic } from "./maps";
import type { PasteMapsResult } from "./types";

const weight = { sourceReliability: 7, independence: 7, replicability: 6, directness: 7 };

function card(id: string, side: Evidence["side"], title: string, description: string): Evidence {
  return {
    id,
    side,
    title,
    description,
    weight,
    source: `${title} (fixture)`,
    sourceUrl: `https://example.org/${id}`,
  };
}

function pillar(id: string, title: string, question: string, summary: string, evidence: Evidence[]): Pillar {
  return {
    id,
    title,
    short_summary: summary,
    icon_name: "Scale",
    skeptic_premise: summary,
    proponent_rebuttal: summary,
    crux: {
      id: `${id}-test`,
      title: `${title} test`,
      question,
      description: summary,
      methodology: "Fixture.",
      verification_status: "theoretical",
      cost_to_verify: "None (fixture)",
    },
    evidence,
  };
}

/**
 * A two-crux map whose first crux (lighthouse funding) has evidence against
 * the map's question only. A paste about lighthouse funding selects that
 * crux, so its "for" card is borrowed from the second crux (harbour pilots).
 * The words are chosen to share nothing with the library's maps.
 */
export const ONE_SIDED_TOPIC: Topic = buildTopic({
  id: "fixture-lighthouses",
  title: "Lighthouse Keepers",
  question: "Should coastal towns keep paid lighthouse keepers?",
  meta_claim: "Coastal towns should keep paid lighthouse keepers.",
  status: "contested",
  category: "policy",
  pillars: [
    pillar(
      "lighthouse-funding",
      "Lighthouse Funding",
      "Can a town's harbour dues pay for a resident lighthouse keeper?",
      "Whether harbour dues cover a resident lighthouse keeper's wage and cottage.",
      [
        card(
          "dues-fall-short",
          "against",
          "Harbour dues cover a third of a keeper's wage",
          "The fixture ledger shows harbour dues paying about a third of a resident lighthouse keeper's wage and cottage upkeep.",
        ),
      ],
    ),
    pillar(
      "harbour-pilots",
      "Harbour Pilots",
      "Do harbour pilots rely on a keeper during fog?",
      "Whether harbour pilots bringing trawlers in through fog depend on a keeper's foghorn.",
      [
        card(
          "pilots-want-foghorn",
          "for",
          "Pilots ask for a keeper's foghorn in fog",
          "Harbour pilots in the fixture survey say a keeper sounding the foghorn guides trawlers in through fog.",
        ),
        card(
          "automatic-foghorns",
          "against",
          "Automatic foghorns sound without a keeper",
          "Automatic foghorns in the fixture trial sounded on schedule through every fog without a keeper.",
        ),
      ],
    ),
  ],
});

/** A paste about ONE_SIDED_TOPIC's one-sided crux. */
export const ONE_SIDED_PASTE =
  "Our harbour dues can't pay a resident lighthouse keeper's wage and cottage; the lighthouse funding just isn't there.";

/** This topic with every card on one side of one pillar taken away. */
export function withoutSide(topic: Topic, pillarId: string, side: Evidence["side"]): Topic {
  return {
    ...topic,
    pillars: topic.pillars.map((item) =>
      item.id === pillarId
        ? { ...item, evidence: (item.evidence ?? []).filter((evidence) => evidence.side !== side) }
        : item,
    ),
  };
}

/**
 * The paste result for ONE_SIDED_PASTE as if ONE_SIDED_TOPIC were the
 * library's match: its crux and cards from the live matcher, the rest of the
 * result as the live lane returns it for that paste.
 */
export async function oneSidedMaps(): Promise<PasteMapsResult> {
  const [found, match] = await Promise.all([
    findMaps(ONE_SIDED_PASTE),
    matchOnTopic(ONE_SIDED_TOPIC, ONE_SIDED_PASTE),
  ]);
  return { ...found, status: "matched", match, related: [], closest: [] };
}
