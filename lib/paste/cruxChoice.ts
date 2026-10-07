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
 * shares nothing that tells its cruxes apart. A leader that leads on one
 * incidental word or phrase ("engagement ring", "Andrew Tate") is not shown
 * alone: see `pickCruxes`. Measured by
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
  decidingShare: number;
  restLead: number;
}

/**
 * Set on 2026-10-06 against data/evals/paste-matching/cruxes.json. Weights,
 * b and k1 hardly mattered there (every setting tried scored 34 or 35 of 36);
 * `clearLead` sets how often two cruxes are shown: at 1.4, 4 of the 36 crux
 * pastes and 23 of the 102 pastes the matching eval names a map for, many of
 * which were written to cover a whole map. With `restLead` (r9), 4 of 36 and
 * 44 of the 128 pastes it names a map for (25 without it).
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
  /** A word is part of the leader's deciding run when it adds at least this share of its lead. */
  decidingShare: 0.2,
  /**
   * Without its deciding run, a leader shown alone must still outscore every
   * other crux this many times, unless the run is in its own question or
   * title. Set on 2026-10-06 (r9): 1.05–1.1 kept the original 36 cases at
   * 34 top-1 and took the 5 r9 cases from 0 to 3; 1.2 and up cost originals.
   */
  restLead: 1.1,
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

/**
 * What each of the paste's words adds to each crux's score: the paste's
 * terms in order, and per crux (in the map's order) each term's share.
 */
function termContributions(
  cruxes: readonly CruxText[],
  text: string,
  corpusIdf: (term: string) => number,
  params: CruxChoiceParams,
): { sequence: string[]; shares: Map<string, number>[]; names: Set<string>[] } {
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

  const sequence = pasteTerms(text);
  const queryCount = new Map<string, number>();
  for (const term of sequence) queryCount.set(term, (queryCount.get(term) ?? 0) + 1);

  const shares = frequencies.map((frequency) => {
    const share = new Map<string, number>();
    for (const [term, count] of queryCount) {
      const tf = frequency.get(term);
      if (!tf) continue;
      const weight =
        corpusIdf(term) * localIdf(cruxes.length, cruxCount.get(term) ?? 0) * (1 + Math.log(count));
      share.set(term, weight * (tf / (params.k1 + tf)));
    }
    return share;
  });
  return { sequence, shares, names: tokenized.map((fields) => new Set(fields.name)) };
}

const total = (share: ReadonlyMap<string, number>, without: ReadonlySet<string> = new Set()) => {
  let sum = 0;
  for (const [term, value] of share) if (!without.has(term)) sum += value;
  return sum;
};

/** Each crux's score for the paste, in the map's order. */
export function scoreCruxes(
  cruxes: readonly CruxText[],
  text: string,
  corpusIdf: (term: string) => number,
  params: CruxChoiceParams = CRUX_CHOICE,
): CruxScore[] {
  const { shares } = termContributions(cruxes, text, corpusIdf, params);
  return cruxes.map((crux, position) => ({ id: crux.id, score: total(shares[position]) }));
}

/**
 * The one word, or run of adjacent words ("Andrew Tate", "engagement
 * ring"), that does most to put the leader ahead of the runner-up: the
 * paste's terms in order, grouped where each one adds at least
 * `decidingShare` of the lead.
 */
function decidingRun(
  sequence: readonly string[],
  leader: ReadonlyMap<string, number>,
  runnerUp: ReadonlyMap<string, number>,
  params: CruxChoiceParams,
): Set<string> {
  const lead = total(leader) - total(runnerUp);
  const gain = (term: string) => (leader.get(term) ?? 0) - (runnerUp.get(term) ?? 0);
  let best = new Set<string>();
  let bestGain = 0;
  let run = new Set<string>();
  for (const term of [...sequence, ""]) {
    if (term && gain(term) > 0 && gain(term) >= params.decidingShare * lead) {
      run.add(term);
      continue;
    }
    const runGain = [...run].reduce((sum, word) => sum + gain(word), 0);
    if (runGain > bestGain) {
      best = run;
      bestGain = runGain;
    }
    run = new Set();
  }
  return best;
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
  const { sequence, shares, names } = termContributions(cruxes, text, corpusIdf, params);
  const scores = cruxes.map((crux, position) => ({ id: crux.id, score: total(shares[position]) }));
  if (cruxes.length <= 1) return { ids: cruxes.map((crux) => crux.id), scores };
  // Stable: ties keep the map's order, so the lead crux wins a tie.
  const rank = (without: ReadonlySet<string>) =>
    shares
      .map((share, position) => ({ id: cruxes[position].id, score: total(share, without), position }))
      .sort((a, b) => b.score - a.score || a.position - b.position);
  const isClear = (best: { score: number }, second: { score: number }) =>
    second.score < params.minSecond || best.score >= params.clearLead * second.score;

  const [best, second] = rank(new Set());
  if (best.score < params.minScore) return { ids: [cruxes[0].id], scores };
  const clear = isClear(best, second);

  // One incidental word must not decide (r9 live review #3): a paste asking
  // whether a lab-grown engagement ring is more ethical was shown the crux
  // whose evidence counts engagement-ring sales, and one that mentions
  // Andrew Tate the crux that discusses him. A clear leader is shown alone
  // only if it still leads by `restLead` without the word or phrase that
  // does most to put it ahead, or if that word is in its own question or
  // title ("trust", "leverage": then the paste is using the crux's words).
  // Otherwise the choice rests on that word, and the reader gets the map's
  // lead crux with the leader as the other reading, or, when the leader is
  // the lead crux, the leader and the runner-up.
  if (clear) {
    const deciding = decidingRun(sequence, shares[best.position], shares[second.position], params);
    const inName = [...deciding].some((term) => names[best.position].has(term));
    const rest = rank(deciding);
    const leaderRest = rest.find((entry) => entry.position === best.position)!;
    const otherRest = rest.find((entry) => entry.position !== best.position)!;
    const rests =
      !inName &&
      (leaderRest.score < params.minScore || leaderRest.score < params.restLead * otherRest.score);
    if (rests && best.position !== 0) return { ids: [cruxes[0].id, best.id], scores };
    if (rests && second.score >= params.minSecond) return { ids: [best.id, second.id], scores };
  }
  return { ids: clear ? [best.id] : [best.id, second.id], scores };
}
