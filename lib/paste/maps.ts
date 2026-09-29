/**
 * The map lane of the paste flow: which of the site's maps is this argument
 * already on?
 *
 * Offline and free. It runs the same keyword shortlist the map-reply pipeline
 * uses (`lib/mapReply/prefilter.ts`, BM25 over titles, claims and the search
 * phrasings readers use), with no network, no model and nothing stored. What
 * it adds is a decision the shortlist alone does not make: whether one map
 * stands clear enough of the rest to say "this argument is already mapped".
 *
 * The decision is deliberately conservative, because a confident wrong map is
 * worse than an honest "closest maps" list. A match needs an absolute score
 * floor (short unrelated text shares a few words with something) and a lead
 * over the pack (long unrelated text shares a lot of words with everything,
 * so its scores rise together). Calibrated on 2026-09-29 against the two
 * example pastes, eight short on-topic pastes, and unrelated text at 150 to
 * 3,500 characters: every on-topic paste cleared both bars with its own map
 * first, and no unrelated paste cleared either.
 *
 * Every sentence the result carries already exists in the topic data. The
 * lane writes no prose about the paste and names no winner.
 */
import { topicSummaries } from "@/data/topicIndex";
import { loadTopicById } from "@/data/topicLoader";
import { argumentTopicIndex } from "@/lib/argument/topicIds";
import {
  prefilterTopics,
  tokenize,
  type PrefilterCandidate,
  type PrefilterDocument,
} from "@/lib/mapReply/prefilter";
import type { Pillar, Topic } from "@/lib/schemas/topic";
import { legacyTopicPage, type LegacyEvidenceItem } from "@/lib/topicPage/legacy";
import type { ArgumentGraph, Claim, Evidence as GraphEvidence } from "@/types/argument";
import type {
  PasteMapCandidate,
  PasteMapCard,
  PasteMapCrux,
  PasteMapMatch,
  PasteMapsResult,
} from "./types";

export const MAP_MATCH = {
  /** Below this no single map is claimed, however far it leads. */
  minScore: 15,
  /** The top map must score at least this multiple of the pack's mean. */
  leadRatio: 1.5,
  /** Shortlist size read from the index; ranks 3 to 6 form the pack. */
  shortlist: 8,
  /** Maps named in any one answer, the match included. */
  maxMaps: 3,
  /**
   * A map scoring below this is not offered even as "closest": at that level
   * the overlap is a word or two ("water", "nuclear") and the list would be
   * noise dressed as a lead.
   */
  closestFloor: 8,
} as const;

const FLAGSHIP_IDS = new Set<string>(argumentTopicIndex.map((topic) => topic.id));

/**
 * Pillar maps plus the flagship debate maps, which are not in the topic
 * summaries. A flagship is described by its title, tagline and aliases, the
 * same reader-facing words its own page leads with. One array for the life of
 * the process, so the prefilter's index cache is hit on every call.
 */
const PASTE_MAP_DOCUMENTS: readonly PrefilterDocument[] = [
  ...topicSummaries,
  ...argumentTopicIndex.map((topic) => ({
    id: topic.id,
    title: topic.title,
    meta_claim: topic.tagline,
    tags: [...topic.aliases],
  })),
];

export const PASTE_MAP_COUNT = PASTE_MAP_DOCUMENTS.length;

function topicHref(id: string, anchor?: string): string {
  return `/topics/${id}${anchor ? `#${anchor}` : ""}`;
}

function toCandidate(candidate: PrefilterCandidate): PasteMapCandidate {
  return {
    id: candidate.id,
    title: candidate.title,
    claim: candidate.metaClaim,
    href: topicHref(candidate.id),
  };
}

/** Mean of ranks 3 to 6: the pack a real match stands clear of. Rank 2 is skipped because sibling maps (two nuclear maps, two AI-jobs maps) legitimately tie. */
function packScore(candidates: PrefilterCandidate[]): number | null {
  const pack = candidates.slice(2, 6).map((candidate) => candidate.score);
  if (pack.length === 0) return null;
  return pack.reduce((sum, score) => sum + score, 0) / pack.length;
}

export function isClearMatch(candidates: PrefilterCandidate[]): boolean {
  const top = candidates[0];
  if (!top || top.score < MAP_MATCH.minScore) return false;
  const pack = packScore(candidates);
  return pack === null || top.score >= MAP_MATCH.leadRatio * pack;
}

// ---------------------------------------------------------------------------
// Pillar maps
// ---------------------------------------------------------------------------

function pillarText(pillar: Pillar): string {
  return [
    pillar.title,
    pillar.short_summary,
    pillar.crux.title,
    pillar.crux.description,
    pillar.skeptic_premise,
    pillar.proponent_rebuttal,
  ].join(" ");
}

/**
 * The pillar whose crux to open at. The first pillar unless another one shares
 * clearly more words with the paste (at least two more distinct terms), so a
 * single stray word never moves the reader off the map's lead crux.
 */
export function pickPillar(pillars: readonly Pillar[], text: string): Pillar | undefined {
  if (pillars.length <= 1) return pillars[0];
  const query = new Set(tokenize(text));
  const overlap = pillars.map((pillar) => {
    let shared = 0;
    for (const term of new Set(tokenize(pillarText(pillar)))) {
      if (query.has(term)) shared += 1;
    }
    return shared;
  });
  let best = 0;
  for (let index = 1; index < overlap.length; index += 1) {
    if (overlap[index] > overlap[best]) best = index;
  }
  return overlap[best] >= overlap[0] + 2 ? pillars[best] : pillars[0];
}

/** One card per side, strongest first, from the crux's own evidence. */
function cardsFrom(items: readonly LegacyEvidenceItem[]): PasteMapCard[] {
  const picked = (["for", "against"] as const)
    .map((side) => items.find((item) => item.side === side))
    .filter((item): item is LegacyEvidenceItem => Boolean(item));
  if (picked.length < 2) {
    // One-sided evidence still gets two cards, each labelled with its own side.
    const filler = items.find((item) => !picked.includes(item));
    if (filler) picked.push(filler);
  }
  return picked.map((item) => ({
    id: item.id,
    side: item.side,
    title: item.title,
    description: item.description,
    ...(item.source ? { source: item.source } : {}),
    ...(item.sourceUrl ? { sourceUrl: item.sourceUrl } : {}),
  }));
}

/**
 * A pillar map, read through the topic page's own model
 * (lib/topicPage/legacy.ts), so the crux shown here is worded exactly as the
 * page the reader lands on words it, and the link lands on that entry's
 * anchor.
 */
function pillarMatch(topic: Topic, text: string): PasteMapMatch {
  const { cruxes } = legacyTopicPage(topic);
  const pillar = pickPillar(topic.pillars, text);
  const entry = cruxes.find((crux) => crux.pillarId === pillar?.id) ?? cruxes[0];

  const crux: PasteMapCrux | null = entry
    ? {
        question: entry.question,
        ...(entry.flips
          ? { supporterFlip: entry.flips.supporter, skepticFlip: entry.flips.skeptic }
          : entry.settle.condition
            ? { settle: entry.settle.condition }
            : {}),
        href: topicHref(topic.id, entry.anchor),
      }
    : null;

  // A crux without cards borrows the map's strongest ones rather than showing
  // an empty section. No weight is carried: the cards are two readings, not a
  // contest, and the map page is where a reader can see what a weight weighs.
  let cards = cardsFrom(entry?.evidence ?? []);
  if (cards.length === 0) cards = cardsFrom(cruxes.flatMap((item) => item.evidence));

  return {
    id: topic.id,
    title: topic.title,
    claim: topic.meta_claim,
    href: topicHref(topic.id),
    kind: "map",
    crux,
    cards,
    cardsAbout: "map-claim",
  };
}

// ---------------------------------------------------------------------------
// Flagship (ArgumentGraph) maps
// ---------------------------------------------------------------------------

function evidenceWeight(evidence: GraphEvidence): number {
  const weight = evidence.weight;
  if (!weight) return 0;
  return weight.sourceReliability + weight.independence + weight.replicability + weight.directness;
}

function flagshipCards(graph: ArgumentGraph, claimId: string): PasteMapCard[] {
  const byId = new Map(graph.nodes.map((node) => [node.id, node]));
  const ranked = graph.edges
    .filter((edge) => edge.type === "evidences" && edge.to === claimId)
    .flatMap((edge) => {
      const node = byId.get(edge.from);
      if (node?.type !== "evidence" || node.status === "superseded") return [];
      if (edge.polarity !== "supporting" && edge.polarity !== "challenging") return [];
      return [{ node, side: edge.polarity === "supporting" ? ("for" as const) : ("against" as const) }];
    })
    .sort((a, b) => evidenceWeight(b.node) - evidenceWeight(a.node) || a.node.id.localeCompare(b.node.id));

  const picked = (["for", "against"] as const)
    .map((side) => ranked.find((item) => item.side === side))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return picked.map(({ node, side }) => ({
    id: node.id,
    side,
    title: node.summary ?? node.statement,
    description: node.relevance,
    source: node.source.title,
    ...(node.source.url ? { sourceUrl: node.source.url } : {}),
  }));
}

async function flagshipMatch(id: string): Promise<PasteMapMatch | null> {
  // Loaded on demand: the draft graphs and the crux engine are only needed
  // when a flagship map is the answer.
  const { loadArgumentTopic } = await import("@/lib/argument/draftTopics");
  const topic = loadArgumentTopic(id);
  if (!topic) return null;
  const nodes = new Map(topic.graph.nodes.map((node) => [node.id, node]));
  const top = topic.cruxes
    .map((crux) => nodes.get(crux.claimId))
    .find((node): node is Claim => node?.type === "claim");
  const note = top ? topic.meta.cruxNotes?.[top.id] : undefined;

  return {
    id,
    title: topic.meta.title,
    claim: topic.graph.question.statement,
    href: topicHref(id),
    kind: "flagship",
    crux: top
      ? {
          question: note?.question ?? top.summary ?? top.statement,
          ...(top.resolution?.condition ? { settle: top.resolution.condition } : {}),
          fight: note?.fight ?? top.statusBasis,
          // The topic template anchors each flagship crux entry by claim id.
          href: topicHref(id, `crux-${top.id}`),
        }
      : null,
    cards: top ? flagshipCards(topic.graph, top.id) : [],
    cardsAbout: "crux-claim",
  };
}

async function buildMatch(id: string, text: string): Promise<PasteMapMatch | null> {
  if (FLAGSHIP_IDS.has(id)) return flagshipMatch(id);
  const topic = await loadTopicById(id);
  return topic ? pillarMatch(topic, text) : null;
}

// ---------------------------------------------------------------------------
// The lane
// ---------------------------------------------------------------------------

export async function findMaps(text: string): Promise<PasteMapsResult> {
  const started = performance.now();
  const candidates = prefilterTopics(text, {
    limit: MAP_MATCH.shortlist,
    summaries: PASTE_MAP_DOCUMENTS,
  });
  const clear = isClearMatch(candidates);
  const match = clear ? await buildMatch(candidates[0].id, text) : null;

  const closest = (match ? candidates.slice(1, MAP_MATCH.maxMaps) : candidates.slice(0, MAP_MATCH.maxMaps))
    .filter((candidate) => candidate.score >= MAP_MATCH.closestFloor)
    .map(toCandidate);

  return {
    status: match ? "matched" : closest.length > 0 ? "closest" : "none",
    match,
    closest,
    reading: {
      method: "keyword-index",
      mapsSearched: PASTE_MAP_COUNT,
      topScore: candidates[0]?.score ?? null,
      runnerUpScore: candidates[1]?.score ?? null,
      packScore: packScore(candidates),
      minScore: MAP_MATCH.minScore,
      leadRatio: MAP_MATCH.leadRatio,
      elapsedMs: Math.round(performance.now() - started),
    },
  };
}
