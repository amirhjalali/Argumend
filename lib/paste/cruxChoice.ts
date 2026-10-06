/**
 * Which of a map's cruxes a paste is about, once the map is known.
 *
 * The paste lane used to open every map at its first crux unless another
 * crux shared at least two more raw words with the paste. A long crux wins
 * raw counts and a short paste rarely clears "two more", so a rent-control
 * paste about families being pushed out of a neighbourhood was shown the
 * map's crux about new construction (round-6 live review, #8).
 *
 * Now each crux is scored the way the map index scores maps
 * (lib/paste/mapIndex.ts): BM25F over the crux's own text, weighted by field,
 * length-normalised, with each word weighted twice:
 *
 * - by its IDF across all the site's maps (the index's own weight), so a word
 *   most maps use ("evidence", "cost") counts for little;
 * - and by its IDF across this map's cruxes, so a word every crux of the map
 *   uses ("rent" on the rent-control map) counts for little too.
 *
 * Then: one crux when it clearly leads, the two leaders when it does not
 * ("It may turn on one of these"), and the map's lead crux when the paste
 * shares nothing that tells its cruxes apart. Measured by
 * data/evals/paste-matching/cruxes.json (lib/paste/cruxEval.test.ts).
 *
 * Pure: the caller supplies the cruxes' text and the corpus IDF.
 */
import { pasteTerms } from "./terms";

export interface CruxChoiceParams {
  weights: Record<"name" | "body" | "evidence", number>;
  b: Record<"name" | "body" | "evidence", number>;
  k1: number;
  minScore: number;
  clearLead: number;
  minSecond: number;
}

/**
 * Set on 2026-10-06 against data/evals/paste-matching/cruxes.json. Weights,
 * b and k1 hardly mattered there (every setting tried scored 34 or 35 of 36);
 * `clearLead` sets how often two cruxes are shown: at 1.4, 4 of the 36 crux
 * pastes and 23 of the 102 pastes the matching eval names a map for, many of
 * which were written to cover a whole map.
 */
export const CRUX_CHOICE: CruxChoiceParams = {
  /** Field weights: a crux's question and title count most. Its evidence is its own, so as much as its framing. */
  weights: { name: 3, body: 1, evidence: 1 },
  /** BM25 length normalisation per field. */
  b: { name: 0.5, body: 0.75, evidence: 0.75 },
  k1: 0.8,
  /** Below this score the paste says nothing about any one crux: open at the lead crux. */
  minScore: 1.2,
  /** The leader is shown alone when it outscores the runner-up this many times. */
  clearLead: 1.4,
  /** The runner-up is shown beside the leader only when it scores at least this much. */
  minSecond: 1.2,
};

type CruxField = keyof CruxChoiceParams["weights"];
const CRUX_FIELDS: readonly CruxField[] = ["name", "body", "evidence"];

export interface CruxText {
  id: string;
  /** The crux's question and title. */
  name: readonly (string | undefined)[];
  /** Its framing: summaries, both sides' premises, the crux description. */
  body: readonly (string | undefined)[];
  /** The evidence filed under it. */
  evidence: readonly (string | undefined)[];
}

export interface CruxScore {
  id: string;
  score: number;
}

export interface CruxPick {
  /** One crux id, or two when no crux clearly leads. Empty only for an empty list. */
  ids: string[];
  /** Every crux's score, in the map's order. */
  scores: CruxScore[];
}

function localIdf(total: number, count: number): number {
  return Math.log(1 + (total - count + 0.5) / (count + 0.5));
}

/** Each crux's score for the paste, in the map's order. */
export function scoreCruxes(
  cruxes: readonly CruxText[],
  text: string,
  corpusIdf: (term: string) => number,
  params: CruxChoiceParams = CRUX_CHOICE,
): CruxScore[] {
  const tokenized = cruxes.map((crux) => {
    const perField = {} as Record<CruxField, string[]>;
    for (const field of CRUX_FIELDS) {
      perField[field] = crux[field].flatMap((entry) => (entry ? pasteTerms(entry) : []));
    }
    return perField;
  });
  const average = {} as Record<CruxField, number>;
  for (const field of CRUX_FIELDS) {
    const total = tokenized.reduce((sum, fields) => sum + fields[field].length, 0);
    average[field] = tokenized.length > 0 ? total / tokenized.length || 1 : 1;
  }

  const frequencies = tokenized.map((fields) => {
    const frequency = new Map<string, number>();
    for (const field of CRUX_FIELDS) {
      const terms = fields[field];
      if (terms.length === 0) continue;
      const b = params.b[field];
      const scale = params.weights[field] / (1 - b + (b * terms.length) / average[field]);
      for (const term of terms) frequency.set(term, (frequency.get(term) ?? 0) + scale);
    }
    return frequency;
  });
  const cruxCount = new Map<string, number>();
  for (const frequency of frequencies) {
    for (const term of frequency.keys()) cruxCount.set(term, (cruxCount.get(term) ?? 0) + 1);
  }

  const queryCount = new Map<string, number>();
  for (const term of pasteTerms(text)) queryCount.set(term, (queryCount.get(term) ?? 0) + 1);

  return cruxes.map((crux, position) => {
    const frequency = frequencies[position];
    let score = 0;
    for (const [term, count] of queryCount) {
      const tf = frequency.get(term);
      if (!tf) continue;
      const weight =
        corpusIdf(term) * localIdf(cruxes.length, cruxCount.get(term) ?? 0) * (1 + Math.log(count));
      score += weight * (tf / (params.k1 + tf));
    }
    return { id: crux.id, score };
  });
}

/**
 * The crux (or two) to show for a paste. The lead crux when nothing in the
 * paste tells the cruxes apart; the best one when it clearly leads; else the
 * two best, best first.
 */
export function pickCruxes(
  cruxes: readonly CruxText[],
  text: string,
  corpusIdf: (term: string) => number,
  params: CruxChoiceParams = CRUX_CHOICE,
): CruxPick {
  const scores = scoreCruxes(cruxes, text, corpusIdf, params);
  if (cruxes.length <= 1) return { ids: cruxes.map((crux) => crux.id), scores };
  // Stable: ties keep the map's order, so the lead crux wins a tie.
  const ranked = scores
    .map((entry, position) => ({ ...entry, position }))
    .sort((a, b) => b.score - a.score || a.position - b.position);
  const [best, second] = ranked;
  if (best.score < params.minScore) return { ids: [cruxes[0].id], scores };
  const clear =
    second.score < params.minSecond || best.score >= params.clearLead * second.score;
  return { ids: clear ? [best.id] : [best.id, second.id], scores };
}
