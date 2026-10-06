/**
 * The paste lane's index of every map on the site: which maps does a paste
 * share its words with, and how much?
 *
 * The map-reply shortlist (lib/mapReply/prefilter.ts) reads only a map's
 * title, one-sentence claim and search phrasings, which is enough to shortlist
 * eight maps for a model to choose from. The paste lane has no model after
 * it: the index itself has to tell "nuclear power is too dangerous, look at
 * Chernobyl" (the nuclear-energy map) from its three nuclear siblings. The
 * words that do that live inside the map (its pillars, cruxes and evidence),
 * so this index reads all of it, weighted by field:
 *
 *   name      title, question headline, search phrasings, aliases     ×3
 *   claim     the map's claim, pillar and crux titles, crux questions  ×2
 *   body      pillar summaries, both sides' premises, crux framings    ×1
 *   evidence  evidence titles, descriptions and sources               ×0.5
 *
 * Scoring is BM25F (per-field length normalisation, one saturation per term)
 * with IDF over the whole map corpus, so a word most maps use ("evidence",
 * "cost") counts for little and a word one map uses ("Chernobyl") counts for
 * a lot. Deterministic, offline, and built once per process.
 */
import { pasteTerms, termPairs } from "./terms";

export const FIELDS = ["name", "claim", "body", "evidence"] as const;
export type FieldName = (typeof FIELDS)[number];

/** One map as the index reads it: plain text per field. */
export interface MapDocument {
  id: string;
  title: string;
  claim: string;
  kind: "map" | "flagship";
  fields: Record<FieldName, readonly string[]>;
  /** Subjects the map discusses but is not about (`Topic.notAbout`). */
  notAbout?: readonly string[];
}

export interface IndexParams {
  weights: Record<FieldName, number>;
  /** BM25 length normalisation per field (0 = none, 1 = full). */
  b: Record<FieldName, number>;
  k1: number;
  /** How much an adjacent pair of words counts against a single word. */
  pairWeight: number;
  /** Count a pair only for its IDF beyond its rarer word's. */
  pairGain: boolean;
}

export const DEFAULT_INDEX_PARAMS: IndexParams = {
  weights: { name: 3, claim: 2, body: 1, evidence: 0.5 },
  b: { name: 0.5, claim: 0.6, body: 0.75, evidence: 0.75 },
  k1: 1.2,
  pairWeight: 1,
  pairGain: true,
};

interface IndexedMap {
  document: MapDocument;
  /** Per term, the field-weighted, length-normalised frequency (BM25F's tf~). */
  weightedFrequency: Map<string, number>;
}

export interface MapIndex {
  params: IndexParams;
  maps: IndexedMap[];
  byId: Map<string, IndexedMap>;
  documentFrequency: Map<string, number>;
  /**
   * Per term, the maps that use it: flat pairs of [position in `maps`,
   * saturated frequency]. A paste is scored by walking only its own terms'
   * lists, so a long paste costs its distinct words, not words times maps.
   */
  postings: Map<string, number[]>;
  /** Unit-length vector per map over its single words, for telling siblings apart. */
  profiles: Map<string, Map<string, number>>;
  similarities: Map<string, number>;
}

export interface RankedMap {
  id: string;
  title: string;
  claim: string;
  /** BM25F over single words and adjacent pairs. */
  score: number;
  /** Single words only: the part comparable with the ranking's ceiling. */
  wordScore: number;
  /** Distinct single words of the paste this map uses. */
  wordsMatched: number;
}

export interface MapRanking {
  ranked: RankedMap[];
  /**
   * The score a map would earn by matching every term of the paste at full
   * strength, terms no map uses included. The top score over this is how much
   * of the paste the best map accounts for.
   */
  ceiling: number;
  terms: number;
  /**
   * How much the paste leads one map over another, counting only the words
   * where the two differ: the first map's surplus over the second's, summed
   * term by term, over the second's surplus over the first. Two maps scored
   * on the same generic words ("labor", "wage", "jobs") are not rival
   * readings of the paste; a map scored on words the other lacks is.
   */
  exclusiveLead: (firstId: string, secondId: string) => number;
}

function idf(total: number, documentCount: number): number {
  return Math.log(1 + (total - documentCount + 0.5) / (documentCount + 0.5));
}

export function buildMapIndex(
  documents: readonly MapDocument[],
  params: IndexParams = DEFAULT_INDEX_PARAMS,
): MapIndex {
  const tokenized = documents.map((document) => {
    const perField = {} as Record<FieldName, string[]>;
    const pairsPerField = {} as Record<FieldName, string[]>;
    for (const field of FIELDS) {
      // Pairs are taken within one entry, never across two sentences' seam.
      const entries = document.fields[field].map((entry) => pasteTerms(entry));
      perField[field] = entries.flat();
      pairsPerField[field] = entries.flatMap((terms) => termPairs(terms));
    }
    return { document, perField, pairsPerField };
  });

  const averageLength = {} as Record<FieldName, number>;
  for (const field of FIELDS) {
    const total = tokenized.reduce((sum, entry) => sum + entry.perField[field].length, 0);
    averageLength[field] = tokenized.length > 0 ? total / tokenized.length || 1 : 1;
  }

  const documentFrequency = new Map<string, number>();
  const maps: IndexedMap[] = tokenized.map(({ document, perField, pairsPerField }) => {
    const weightedFrequency = new Map<string, number>();
    for (const field of FIELDS) {
      const terms = perField[field];
      if (terms.length === 0) continue;
      const norm = 1 - params.b[field] + (params.b[field] * terms.length) / averageLength[field];
      const scale = params.weights[field] / norm;
      for (const term of terms) weightedFrequency.set(term, (weightedFrequency.get(term) ?? 0) + scale);
      for (const pair of pairsPerField[field]) {
        weightedFrequency.set(pair, (weightedFrequency.get(pair) ?? 0) + scale);
      }
    }
    for (const term of weightedFrequency.keys()) {
      documentFrequency.set(term, (documentFrequency.get(term) ?? 0) + 1);
    }
    return { document, weightedFrequency };
  });

  // Each map's profile: its single words, weighted the way a paste would
  // score them (saturated field-weighted frequency times IDF), unit length.
  const total = maps.length;
  const profiles = new Map<string, Map<string, number>>();
  for (const { document, weightedFrequency } of maps) {
    const vector = new Map<string, number>();
    let norm = 0;
    for (const [term, frequency] of weightedFrequency) {
      if (term.includes("_")) continue;
      const value =
        (frequency / (params.k1 + frequency)) * idf(total, documentFrequency.get(term) ?? 0);
      vector.set(term, value);
      norm += value * value;
    }
    norm = Math.sqrt(norm) || 1;
    for (const [term, value] of vector) vector.set(term, value / norm);
    profiles.set(document.id, vector);
  }

  const postings = new Map<string, number[]>();
  maps.forEach(({ weightedFrequency }, position) => {
    for (const [term, frequency] of weightedFrequency) {
      let list = postings.get(term);
      if (!list) {
        list = [];
        postings.set(term, list);
      }
      list.push(position, frequency / (params.k1 + frequency));
    }
  });

  return {
    params,
    maps,
    byId: new Map(maps.map((entry) => [entry.document.id, entry])),
    documentFrequency,
    postings,
    profiles,
    similarities: new Map(),
  };
}

/**
 * Cosine similarity of two maps' whole-map profiles, 0 to 1, memoised. Maps
 * on the same subject score well above the rest: across all 12,561 pairs of
 * the 159 maps on 2026-09-29 the median pair scored 0.06 and the 99th
 * percentile 0.16, while the two nuclear-power maps scored 0.28 and the two
 * housing maps 0.49.
 */
export function mapSimilarity(index: MapIndex, a: string, b: string): number {
  if (a === b) return 1;
  const key = a < b ? `${a} ${b}` : `${b} ${a}`;
  const cached = index.similarities.get(key);
  if (cached !== undefined) return cached;
  const left = index.profiles.get(a);
  const right = index.profiles.get(b);
  let dot = 0;
  if (left && right) {
    const [small, large] = left.size <= right.size ? [left, right] : [right, left];
    for (const [term, value] of small) {
      const other = large.get(term);
      if (other) dot += value * other;
    }
  }
  index.similarities.set(key, dot);
  return dot;
}

/** Every map that shares a term with the paste, best first; ties broken by id. */
export function rankMaps(index: MapIndex, text: string): MapRanking {
  const terms = pasteTerms(text);
  const queryFrequency = new Map<string, number>();
  for (const term of terms) queryFrequency.set(term, (queryFrequency.get(term) ?? 0) + 1);
  const pairFrequency = new Map<string, number>();
  for (const pair of termPairs(terms)) pairFrequency.set(pair, (pairFrequency.get(pair) ?? 0) + 1);

  const total = index.maps.length;
  const { k1, pairWeight } = index.params;

  // The ceiling counts single words only: most pairs in a paste are not
  // phrases at all ("chatgpt drink"), so an unmatched pair says nothing.
  let ceiling = 0;
  const weights: Array<[string, number]> = [];
  for (const [term, count] of queryFrequency) {
    // Query repetition is damped so one word said five times cannot win alone.
    const weight = idf(total, index.documentFrequency.get(term) ?? 0) * (1 + Math.log(count));
    ceiling += weight;
    if (index.documentFrequency.has(term)) weights.push([term, weight]);
  }
  for (const [pair, count] of pairFrequency) {
    const documentCount = index.documentFrequency.get(pair);
    if (!documentCount) continue;
    // A pair counts only for what it says beyond its rarer word: "data
    // center" is far rarer than "data" or "center", so it counts; "small
    // modular" is no rarer than "modular", so it adds nothing to it.
    const [first, second] = pair.split("_");
    const wordIdf = Math.max(
      idf(total, index.documentFrequency.get(first) ?? 0),
      idf(total, index.documentFrequency.get(second) ?? 0),
    );
    const gain = index.params.pairGain
      ? Math.max(0, idf(total, documentCount) - wordIdf)
      : idf(total, documentCount);
    if (gain > 0) weights.push([pair, pairWeight * gain * (1 + Math.log(count))]);
  }

  const count = index.maps.length;
  const scores = new Float64Array(count);
  const wordScores = new Float64Array(count);
  const wordsMatched = new Uint32Array(count);
  for (const [term, weight] of weights) {
    const list = index.postings.get(term);
    if (!list) continue;
    const isWord = !term.includes("_");
    for (let at = 0; at < list.length; at += 2) {
      const position = list[at];
      const contribution = weight * list[at + 1];
      scores[position] += contribution;
      if (isWord) {
        wordScores[position] += contribution;
        wordsMatched[position] += 1;
      }
    }
  }

  const ranked: RankedMap[] = [];
  index.maps.forEach(({ document }, position) => {
    if (scores[position] <= 0) return;
    ranked.push({
      id: document.id,
      title: document.title,
      claim: document.claim,
      score: scores[position],
      wordScore: wordScores[position],
      wordsMatched: wordsMatched[position],
    });
  });
  ranked.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));

  const exclusiveLead = (firstId: string, secondId: string): number => {
    const first = index.byId.get(firstId)?.weightedFrequency;
    const second = index.byId.get(secondId)?.weightedFrequency;
    if (!first || !second) return 0;
    let ahead = 0;
    let behind = 0;
    for (const [term, weight] of weights) {
      const a = first.get(term) ?? 0;
      const b = second.get(term) ?? 0;
      const difference = weight * (a / (k1 + a) - b / (k1 + b));
      if (difference > 0) ahead += difference;
      else behind -= difference;
    }
    if (behind === 0) return ahead > 0 ? Number.POSITIVE_INFINITY : 1;
    return ahead / behind;
  };

  return { ranked, ceiling, terms: queryFrequency.size, exclusiveLead };
}
