/**
 * Verdict sensitivity — how much of a topic's quadrant rests on a single
 * evidence card's `side` label.
 *
 * Two independent adjudication passes over the library found that on a 12–16
 * card map one ordinary card moves `balance` by 8–12 points, while the
 * "settled" quadrant only needs a 20-point gap from even. A published
 * "Settled — evidence strongly favors the counterclaim" that one defensible
 * relabel would erase is a stronger public claim than the map can carry.
 *
 * Everything here is pure and deterministic over the authored cards.
 *
 * Key property the search relies on: `computeWeight` reads only the evidence
 * *scores* and the crux verification statuses — never `side`. Flipping sides
 * therefore leaves `weight` fixed and moves `balance` alone, so the quadrant
 * under a flip is a function of one number.
 *
 * See docs/reviews/2026-09-21-verdict-robustness.md.
 */

import { VERDICT, VERDICT_ROBUSTNESS } from "@/lib/constants";
import { calculateEvidenceScore } from "@/lib/evidenceMetrics";
import type { Pillar, Topic, VerdictQuadrant } from "@/lib/schemas/topic";

/** One evidence card reduced to the two things the balance depends on. */
export interface SidedCard {
  /** "for" tips toward the claim, "against" toward the counterclaim. */
  side: "for" | "against";
  /** The card's 0–40 evidence score. */
  score: number;
}

/** The spread of balance readings that sit one card-relabel away. */
export interface OneCardBalanceRange {
  /** Lowest balance reachable by flipping at most one card (includes the current reading). */
  min: number;
  /** Highest balance reachable by flipping at most one card (includes the current reading). */
  max: number;
  /** max − min: how wide the one-card uncertainty band is, in balance points. */
  span: number;
}

export interface VerdictSensitivity {
  /** Quadrant under the authored labels. */
  quadrant: VerdictQuadrant;
  /** Balance under the authored labels (after any settled floor). */
  balance: number;
  /** Number of evidence cards on the map. */
  cardCount: number;
  /**
   * Fewest simultaneous side flips that land the map in a different quadrant,
   * searched exhaustively up to `maxFlips`. `null` means no combination that
   * small changes it — for a moderate or open map that is exact, because those
   * quadrants are set by weight alone and no relabelling can move them.
   */
  flipsToChange: number | null;
  /** Balance range reachable by flipping any single card. */
  oneCardBalanceRange: OneCardBalanceRange;
}

export interface SensitivityOptions {
  /**
   * Floor applied to balance before reading a quadrant. `buildTopic` floors
   * the balance of topics authored as `status: "settled"` at their authored
   * confidence score, and the flip search has to respect the same floor or it
   * reports flips that the published number would never show.
   */
  balanceFloor?: number;
  /** Largest number of simultaneous flips to search. Defaults to the constant. */
  maxFlips?: number;
}

/** Flatten a topic's pillars into the sided cards that drive the balance. */
export function topicCards(pillars: readonly Pillar[]): SidedCard[] {
  return pillars.flatMap((pillar) =>
    (pillar.evidence ?? []).map((evidence) => ({
      side: evidence.side,
      score: calculateEvidenceScore(evidence.weight),
    }))
  );
}

/** Balance of evidence for a card list. 0–100, 50 = even. */
export function balanceOfCards(cards: readonly SidedCard[]): number {
  let forScore = 0;
  let total = 0;
  for (const card of cards) {
    total += card.score;
    if (card.side === "for") forScore += card.score;
  }
  if (total === 0) return 50;
  return Math.round((forScore / total) * 100);
}

/**
 * The quadrant alone, from the two axes. The single definition of the
 * boundaries — `getVerdict` puts the labels on it, the flip search re-reads it.
 */
export function verdictQuadrant(balance: number, weight: number): VerdictQuadrant {
  const d = Math.abs(balance - 50);
  if (weight >= VERDICT.HIGH_WEIGHT) {
    return d >= VERDICT.SETTLED_D ? "settled" : "contested";
  }
  if (weight >= VERDICT.LOW_WEIGHT) return "moderate";
  return "open";
}

/** True when some size-`k` subset of `deltas` added to `base` satisfies `hit`. */
function anySubsetHits(
  deltas: readonly number[],
  k: number,
  base: number,
  hit: (value: number) => boolean
): boolean {
  const walk = (start: number, remaining: number, acc: number): boolean => {
    if (remaining === 0) return hit(acc);
    for (let i = start; i <= deltas.length - remaining; i++) {
      if (walk(i + 1, remaining - 1, acc + (deltas[i] ?? 0))) return true;
    }
    return false;
  };
  return walk(0, k, base);
}

/** Sensitivity of a card list's quadrant to relabelling its cards. */
export function computeCardSensitivity(
  cards: readonly SidedCard[],
  weight: number,
  options: SensitivityOptions = {}
): VerdictSensitivity {
  const { balanceFloor, maxFlips = VERDICT_ROBUSTNESS.MAX_FLIP_SEARCH } = options;

  const total = cards.reduce((sum, card) => sum + card.score, 0);
  const forScore = cards.reduce(
    (sum, card) => sum + (card.side === "for" ? card.score : 0),
    0
  );
  // Flipping a "for" card moves that score out of the for-side total; flipping
  // an "against" card moves it in.
  const deltas = cards.map((card) => (card.side === "for" ? -card.score : card.score));

  const balanceAt = (forTotal: number): number => {
    const raw = total === 0 ? 50 : Math.round((forTotal / total) * 100);
    return balanceFloor === undefined ? raw : Math.max(raw, balanceFloor);
  };

  const balance = balanceAt(forScore);
  const quadrant = verdictQuadrant(balance, weight);

  let min = balance;
  let max = balance;
  for (const delta of deltas) {
    const flipped = balanceAt(forScore + delta);
    if (flipped < min) min = flipped;
    if (flipped > max) max = flipped;
  }

  let flipsToChange: number | null = null;
  const cap = Math.min(maxFlips, cards.length);
  const changesQuadrant = (forTotal: number): boolean =>
    verdictQuadrant(balanceAt(forTotal), weight) !== quadrant;
  for (let k = 1; k <= cap; k++) {
    if (anySubsetHits(deltas, k, forScore, changesQuadrant)) {
      flipsToChange = k;
      break;
    }
  }

  return {
    quadrant,
    balance,
    cardCount: cards.length,
    flipsToChange,
    oneCardBalanceRange: { min, max, span: max - min },
  };
}

/** Sensitivity for a set of authored pillars at a known weight. */
export function computeVerdictSensitivity(
  pillars: readonly Pillar[],
  weight: number,
  options: SensitivityOptions = {}
): VerdictSensitivity {
  return computeCardSensitivity(topicCards(pillars), weight, options);
}

/**
 * Sensitivity for a built topic, reconstructing the settled balance floor:
 * a published balance above the one the cards compute can only have come from
 * `buildTopic`'s floor, and the flip search has to keep it.
 */
export function topicVerdictSensitivity(
  topic: Pick<Topic, "pillars" | "balance" | "weight">,
  options: Omit<SensitivityOptions, "balanceFloor"> = {}
): VerdictSensitivity {
  const cards = topicCards(topic.pillars);
  const computed = balanceOfCards(cards);
  return computeCardSensitivity(cards, topic.weight, {
    ...options,
    ...(topic.balance > computed ? { balanceFloor: topic.balance } : {}),
  });
}

/**
 * The robustness rule for the *displayed* verdict.
 *
 * "Settled" is the only quadrant this guards, and it only ever demotes. A map
 * earns the word when no single defensible relabel could take it away
 * (`flipsToChange >= MIN_FLIPS_TO_CHANGE`) and when it has enough cards for one
 * card not to be a large share of the evidence (`cardCount >= MIN_CARDS`).
 */
export function isFragileSettled(sensitivity: VerdictSensitivity): boolean {
  if (sensitivity.quadrant !== "settled") return false;
  const survivesOneCard =
    sensitivity.flipsToChange === null ||
    sensitivity.flipsToChange >= VERDICT_ROBUSTNESS.MIN_FLIPS_TO_CHANGE;
  const enoughCards = sensitivity.cardCount >= VERDICT_ROBUSTNESS.MIN_CARDS;
  return !(survivesOneCard && enoughCards);
}

export { VERDICT_ROBUSTNESS };
