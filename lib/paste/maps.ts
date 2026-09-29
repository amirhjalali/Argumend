/**
 * The map lane of the paste flow: which of the site's maps is this argument
 * already on?
 *
 * Offline and free: a keyword index over every map's own text
 * (lib/paste/mapIndex.ts), with no network, no model and nothing stored. The
 * index ranks the maps; this module decides whether one of them can be named
 * as the paste's map, and which neighbours to show beside it.
 *
 * "No map, rather than the wrong map" is the promise, so a map is named only
 * when all of this holds:
 *
 * 1. It stands clear of every map on a different subject. Maps on the same
 *    subject (the two nuclear-power maps, the three AI-and-jobs maps) share
 *    most of their words, so a paste that fits one scores well on its
 *    siblings too, and a fixed lead over the runner-up refused exactly those
 *    pastes. So siblings are set aside (and shown as "closely related"), and
 *    the lead is measured against the best map on a different subject, the
 *    rival, in two ways:
 *    - on the words where the two maps differ (`minExclusiveLead`): a rival
 *      that scored on the same generic words as the top map ("labor",
 *      "wage", "jobs") is not a competing reading of the paste, while one
 *      that scored on words the top map lacks is;
 *    - and on the whole score (`minLead`), so a near tie is never named.
 * 2. Enough of the paste stands behind it: a score of at least `minScore`, or,
 *    for a short paste that cannot score high, at least `minCoverage` of its
 *    words accounted for with a score of at least `minShortScore`.
 *
 * Calibrated on 2026-09-29 against data/evals/paste-matching/pastes.json and
 * checked on holdout.json; lib/paste/matchEval.test.ts holds the floors, and
 * docs/reviews/2026-09-29-r2-paste-matching.md has the measurements.
 *
 * Every sentence the result carries already exists in the topic data. The
 * lane writes no prose about the paste and names no winner.
 */
import { loadTopicById } from "@/data/topicLoader";
import type { Pillar, Topic } from "@/lib/schemas/topic";
import { legacyTopicPage, type LegacyEvidenceItem } from "@/lib/topicPage/legacy";
import type { ArgumentGraph, Claim, Evidence as GraphEvidence } from "@/types/argument";
import { EXPECTED_MAP_COUNT, loadMapDocuments } from "./mapDocuments";
import {
  buildMapIndex,
  mapSimilarity,
  rankMaps,
  type MapIndex,
  type MapRanking,
  type RankedMap,
} from "./mapIndex";
import { pasteTerms } from "./terms";
import type {
  PasteMapCandidate,
  PasteMapCard,
  PasteMapCrux,
  PasteMapMatch,
  PasteMapsResult,
} from "./types";

export const MAP_MATCH = {
  /**
   * Two maps are siblings (same subject) when their whole-map profiles are at
   * least this similar. Across all pairs of the 159 maps the 99th percentile
   * is 0.16, so this admits a map's two or three nearest neighbours.
   */
  siblingSimilarity: 0.15,
  /** Siblings are looked for among the leaders only: ranks 2 to 6. */
  siblingWindow: 5,
  /** On the words where they differ, the top map must outscore the rival this many times. */
  minExclusiveLead: 2,
  /** And on the whole score, by at least this much. */
  minLead: 1.3,
  /** Evidence floor: a score this high names a map on its own... */
  minScore: 12,
  /** ...or, for a short paste, this share of its words accounted for by the map... */
  minCoverage: 0.36,
  /** ...with at least this score, so one borrowed word ("exhausting") is never enough. */
  minShortScore: 4.5,
  /**
   * With no map named, the closest maps are offered only when the best one
   * reaches this score, or `closestCoverage` of a short paste's words with
   * at least `minShortScore`. Below that, the overlap is a word or two
   * ("water", "nuclear") and a list would be noise dressed as a lead.
   */
  closestFloor: 8,
  closestCoverage: 0.3,
  /** A map is listed beside the answer only when it scores at least this share of the best one. */
  shownShare: 0.5,
  /** Maps named in any one answer, the match and its neighbours included. */
  maxMaps: 3,
} as const;

// ---------------------------------------------------------------------------
// The index, built once per process
// ---------------------------------------------------------------------------

let indexPromise: Promise<MapIndex> | null = null;

/**
 * Reads every map and builds the index on the first paste, then reuses it.
 * An index missing a map (one whose module failed to load) serves this paste
 * but is not kept, so the next paste retries.
 */
export function getMapIndex(): Promise<MapIndex> {
  if (indexPromise) return indexPromise;
  const attempt = loadMapDocuments().then((documents) => {
    const index = buildMapIndex(documents);
    if (documents.length < EXPECTED_MAP_COUNT && indexPromise === attempt) indexPromise = null;
    return index;
  });
  indexPromise = attempt;
  attempt.catch(() => {
    if (indexPromise === attempt) indexPromise = null;
  });
  return attempt;
}

// ---------------------------------------------------------------------------
// The decision
// ---------------------------------------------------------------------------

export interface MapDecision {
  /** The map named as the paste's map, or null. */
  named: RankedMap | null;
  /** Siblings of the top map shown as "closely related" (only when one is named). */
  related: RankedMap[];
  /** Other maps worth a look: beside a named map, or instead of one. */
  closest: RankedMap[];
  top: RankedMap | null;
  /** The best-scoring map that is not a sibling of the top one. */
  rival: RankedMap | null;
  /** Top score over the rival's. Infinity when no other map shares a word. */
  lead: number;
  /** The same, counting only the words where the two maps differ. */
  exclusiveLead: number;
  /** Share of the paste's words the top map accounts for, 0 to 1. */
  coverage: number;
}

/**
 * Pure: decides from a ranking and a sibling test. `isSibling` is asked only
 * about the top map and the maps just below it.
 */
export function decideMatch(
  ranking: Pick<MapRanking, "ranked" | "ceiling" | "exclusiveLead">,
  isSibling: (a: string, b: string) => boolean,
): MapDecision {
  const [top, ...rest] = ranking.ranked;
  if (!top) {
    return {
      named: null,
      related: [],
      closest: [],
      top: null,
      rival: null,
      lead: 0,
      exclusiveLead: 0,
      coverage: 0,
    };
  }

  const siblings = rest.slice(0, MAP_MATCH.siblingWindow).filter((map) => isSibling(top.id, map.id));
  const siblingIds = new Set(siblings.map((map) => map.id));
  const rival = rest.find((map) => !siblingIds.has(map.id)) ?? null;
  const lead = rival ? top.score / rival.score : Number.POSITIVE_INFINITY;
  const exclusiveLead = rival ? ranking.exclusiveLead(top.id, rival.id) : Number.POSITIVE_INFINITY;
  const coverage = ranking.ceiling > 0 ? Math.min(1, top.wordScore / ranking.ceiling) : 0;

  const enough =
    top.score >= MAP_MATCH.minScore ||
    (coverage >= MAP_MATCH.minCoverage && top.score >= MAP_MATCH.minShortScore);
  const clear = lead >= MAP_MATCH.minLead && exclusiveLead >= MAP_MATCH.minExclusiveLead;
  const shown = (map: RankedMap) => map.score >= MAP_MATCH.shownShare * top.score;

  if (enough && clear) {
    const related = siblings.filter(shown).slice(0, MAP_MATCH.maxMaps - 1);
    const closest = rest
      .filter((map) => !siblingIds.has(map.id) && shown(map))
      .slice(0, MAP_MATCH.maxMaps - 1 - related.length);
    return { named: top, related, closest, top, rival, lead, exclusiveLead, coverage };
  }

  const cameClose =
    top.score >= MAP_MATCH.closestFloor ||
    (coverage >= MAP_MATCH.closestCoverage && top.score >= MAP_MATCH.minShortScore);
  const closest = cameClose ? [top, ...rest.filter(shown)].slice(0, MAP_MATCH.maxMaps) : [];
  return { named: null, related: [], closest, top, rival, lead, exclusiveLead, coverage };
}

function topicHref(id: string, anchor?: string): string {
  return `/topics/${id}${anchor ? `#${anchor}` : ""}`;
}

function toCandidate(map: RankedMap): PasteMapCandidate {
  return { id: map.id, title: map.title, claim: map.claim, href: topicHref(map.id) };
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
  const query = new Set(pasteTerms(text));
  const overlap = pillars.map((pillar) => {
    let shared = 0;
    for (const term of new Set(pasteTerms(pillarText(pillar)))) {
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

// ---------------------------------------------------------------------------
// The lane
// ---------------------------------------------------------------------------

async function buildMatch(map: RankedMap, kind: "map" | "flagship", text: string): Promise<PasteMapMatch | null> {
  if (kind === "flagship") return flagshipMatch(map.id);
  const topic = await loadTopicById(map.id);
  return topic ? pillarMatch(topic, text) : null;
}

const round = (value: number | null, places = 2) =>
  value === null || !Number.isFinite(value) ? null : Math.round(value * 10 ** places) / 10 ** places;

export async function findMaps(text: string): Promise<PasteMapsResult> {
  const started = performance.now();
  const index = await getMapIndex();
  const indexed = performance.now();
  const ranking = rankMaps(index, text);
  const decision = decideMatch(
    ranking,
    (a, b) => mapSimilarity(index, a, b) >= MAP_MATCH.siblingSimilarity,
  );
  const matchedMs = performance.now() - indexed;

  const named = decision.named;
  const match = named
    ? await buildMatch(named, index.byId.get(named.id)?.document.kind ?? "map", text)
    : null;
  // A named map that could not be read degrades to "closest", never to a wrong map.
  const related = match ? decision.related.map(toCandidate) : [];
  const closest = (match ? decision.closest : named ? [named, ...decision.closest] : decision.closest)
    .slice(0, MAP_MATCH.maxMaps)
    .map(toCandidate);

  return {
    status: match ? "matched" : closest.length > 0 ? "closest" : "none",
    match,
    related,
    closest,
    reading: {
      method: "keyword-index",
      mapsSearched: index.maps.length,
      topScore: round(decision.top?.score ?? null),
      rivalScore: round(decision.rival?.score ?? null),
      lead: round(decision.top ? decision.lead : null),
      exclusiveLead: round(decision.top ? decision.exclusiveLead : null),
      coverage: round(decision.top ? decision.coverage : null),
      minLead: MAP_MATCH.minLead,
      minExclusiveLead: MAP_MATCH.minExclusiveLead,
      minScore: MAP_MATCH.minScore,
      minCoverage: MAP_MATCH.minCoverage,
      matchMs: round(matchedMs, 1) ?? 0,
      elapsedMs: Math.round(performance.now() - started),
    },
  };
}
