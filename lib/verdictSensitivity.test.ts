import { describe, expect, it } from "vitest";
import {
  balanceOfCards,
  computeCardSensitivity,
  computeVerdictSensitivity,
  isFragileSettled,
  topicCards,
  topicVerdictSensitivity,
  verdictQuadrant,
  type SidedCard,
} from "./verdictSensitivity";
import { VERDICT_ROBUSTNESS } from "./constants";
import type { Crux, Evidence, Pillar } from "./schemas/topic";

// ---------------------------------------------------------------------------
// Fixtures — hand-built so every number in the assertions is checkable by hand.
// A card of score s is written as {side, score}; a 0–40 score is four 0–10
// sub-scores, so score 40 = a perfect card and score 20 = a middling one.
// ---------------------------------------------------------------------------

const card = (side: "for" | "against", score: number): SidedCard => ({ side, score });

/** n cards of equal score on one side. */
const cards = (side: "for" | "against", n: number, score: number): SidedCard[] =>
  Array.from({ length: n }, () => card(side, score));

/** A high weight (>= VERDICT.HIGH_WEIGHT) so the settled/contested line is live. */
const HIGH_WEIGHT = 80;

describe("balanceOfCards", () => {
  it("is 50 for an empty map and for a perfect tie", () => {
    expect(balanceOfCards([])).toBe(50);
    expect(balanceOfCards([card("for", 20), card("against", 20)])).toBe(50);
  });

  it("is 100 / 0 when every card sits on one side", () => {
    expect(balanceOfCards(cards("for", 4, 30))).toBe(100);
    expect(balanceOfCards(cards("against", 4, 30))).toBe(0);
  });

  it("weighs by score, not by card count", () => {
    // one strong for (40) against two weak againsts (5 each) → 40/50 = 80
    expect(balanceOfCards([card("for", 40), card("against", 5), card("against", 5)])).toBe(80);
  });

  it("is 50 when every card scores zero", () => {
    expect(balanceOfCards([card("for", 0), card("against", 0)])).toBe(50);
  });
});

describe("verdictQuadrant", () => {
  it("splits the high-weight half at d = 20", () => {
    expect(verdictQuadrant(70, 80)).toBe("settled");
    expect(verdictQuadrant(30, 80)).toBe("settled");
    expect(verdictQuadrant(69, 80)).toBe("contested");
    expect(verdictQuadrant(50, 80)).toBe("contested");
  });

  it("ignores balance below the high-weight line", () => {
    expect(verdictQuadrant(99, 50)).toBe("moderate");
    expect(verdictQuadrant(50, 50)).toBe("moderate");
    expect(verdictQuadrant(99, 20)).toBe("open");
  });
});

describe("computeCardSensitivity — 4-card map", () => {
  // 3 for @ 30, 1 against @ 30 → balance 90/120 = 75, settled.
  const map = [...cards("for", 3, 30), card("against", 30)];

  it("reads the quadrant and card count", () => {
    const s = computeCardSensitivity(map, HIGH_WEIGHT);
    expect(s.balance).toBe(75);
    expect(s.quadrant).toBe("settled");
    expect(s.cardCount).toBe(4);
  });

  it("needs one flip to lose settled, because a card is a quarter of the map", () => {
    // flip one "for": 60/120 = 50 → contested.
    const s = computeCardSensitivity(map, HIGH_WEIGHT);
    expect(s.flipsToChange).toBe(1);
  });

  it("reports the one-card balance range around the current reading", () => {
    // flipping a "for" → 50; flipping the "against" → 100. Current 75.
    const s = computeCardSensitivity(map, HIGH_WEIGHT);
    expect(s.oneCardBalanceRange).toEqual({ min: 50, max: 100, span: 50 });
  });
});

describe("computeCardSensitivity — 16-card map", () => {
  // 11 for @ 20, 5 against @ 20 → 220/320 = 69 (contested, just under d=20).
  const map = [...cards("for", 11, 20), ...cards("against", 5, 20)];

  it("sits one card away from settled", () => {
    const s = computeCardSensitivity(map, HIGH_WEIGHT);
    expect(s.balance).toBe(69);
    expect(s.quadrant).toBe("contested");
    // flip one "against" → 240/320 = 75 → settled.
    expect(s.flipsToChange).toBe(1);
    // flip one "for" → 200/320 = 62.5, which rounds to 63.
    expect(s.oneCardBalanceRange).toEqual({ min: 63, max: 75, span: 12 });
  });

  it("needs two flips when the margin is a full card wider", () => {
    // 12 for / 4 against @ 20 → 240/320 = 75, settled.
    // one flip → 220/320 = 69 (contested)… so one flip still changes it.
    // Widen instead: 14 for / 2 against → 280/320 = 88.
    // one flip of a "for" → 260/320 = 81, still settled; two flips → 240/320 = 75, settled;
    // three → 69, contested.
    const wide = [...cards("for", 14, 20), ...cards("against", 2, 20)];
    const s = computeCardSensitivity(wide, HIGH_WEIGHT);
    expect(s.balance).toBe(88);
    expect(s.quadrant).toBe("settled");
    expect(s.flipsToChange).toBe(3);
  });

  it("sits exactly on the settled line and loses it to one flip", () => {
    // 12 for @ 20, 4 against @ 20 → 240/320 = 75, settled by 5 points.
    const even = [...cards("for", 12, 20), ...cards("against", 4, 20)];
    const s = computeCardSensitivity(even, HIGH_WEIGHT);
    expect(s.balance).toBe(75);
    expect(s.quadrant).toBe("settled");
    expect(s.flipsToChange).toBe(1); // 220/320 = 68.75 → 69, contested
  });
});

describe("computeCardSensitivity — degenerate maps", () => {
  it("handles a map with no cards", () => {
    const s = computeCardSensitivity([], HIGH_WEIGHT);
    expect(s.balance).toBe(50);
    expect(s.cardCount).toBe(0);
    expect(s.flipsToChange).toBeNull();
    expect(s.oneCardBalanceRange).toEqual({ min: 50, max: 50, span: 0 });
  });

  it("handles an all-for map", () => {
    // 10 for @ 25 → balance 100, settled. One flip → 225/250 = 90, still settled.
    const s = computeCardSensitivity(cards("for", 10, 25), HIGH_WEIGHT);
    expect(s.balance).toBe(100);
    expect(s.quadrant).toBe("settled");
    expect(s.oneCardBalanceRange).toEqual({ min: 90, max: 100, span: 10 });
    // needs 4 flips: 6 for / 4 against → 150/250 = 60 → contested.
    expect(s.flipsToChange).toBe(4);
  });

  it("handles an all-against map", () => {
    const s = computeCardSensitivity(cards("against", 10, 25), HIGH_WEIGHT);
    expect(s.balance).toBe(0);
    expect(s.quadrant).toBe("settled");
    expect(s.oneCardBalanceRange).toEqual({ min: 0, max: 10, span: 10 });
  });

  it("returns null past the search cap instead of guessing", () => {
    // 20 for @ 20 → balance 100, and each flip costs 5 points, so seven flips
    // are needed to reach 65. The default cap of 4 stops well short.
    const s = computeCardSensitivity(cards("for", 20, 20), HIGH_WEIGHT);
    expect(s.flipsToChange).toBeNull();
    // …and a deeper search finds it exactly.
    expect(computeCardSensitivity(cards("for", 20, 20), HIGH_WEIGHT, { maxFlips: 9 }).flipsToChange).toBe(7);
  });

  it("calls a perfect tie contested and unmovable by one card", () => {
    // 8 for @ 20, 8 against @ 20 → 50. One flip → 7/9 → 140/320 = 44 (d=6).
    const tie = [...cards("for", 8, 20), ...cards("against", 8, 20)];
    const s = computeCardSensitivity(tie, HIGH_WEIGHT);
    expect(s.balance).toBe(50);
    expect(s.quadrant).toBe("contested");
    expect(s.oneCardBalanceRange).toEqual({ min: 44, max: 56, span: 12 });
    expect(s.flipsToChange).toBe(4); // 4 flips → 210/320 = 66… then 5 → 70
  });

  it("never moves a moderate or open map, whatever the labels say", () => {
    const map = [...cards("for", 10, 20), ...cards("against", 2, 20)];
    expect(computeCardSensitivity(map, 50).quadrant).toBe("moderate");
    expect(computeCardSensitivity(map, 50).flipsToChange).toBeNull();
    expect(computeCardSensitivity(map, 20).quadrant).toBe("open");
    expect(computeCardSensitivity(map, 20).flipsToChange).toBeNull();
  });

  it("respects a settled balance floor the way buildTopic does", () => {
    // Cards compute to 75, but the topic is authored settled at 95.
    const map = [...cards("for", 3, 30), card("against", 30)];
    const floored = computeCardSensitivity(map, HIGH_WEIGHT, { balanceFloor: 95 });
    expect(floored.balance).toBe(95);
    // One flip drops the computed balance to 50, but the floor holds it at 95.
    expect(floored.flipsToChange).toBeNull();
    expect(floored.oneCardBalanceRange).toEqual({ min: 95, max: 100, span: 5 });
  });
});

describe("isFragileSettled", () => {
  const base = {
    balance: 80,
    oneCardBalanceRange: { min: 70, max: 90, span: 20 },
  };

  it("passes a wide, well-populated settled map", () => {
    expect(
      isFragileSettled({ ...base, quadrant: "settled", cardCount: 12, flipsToChange: 2 })
    ).toBe(false);
  });

  it("flags a settled map one flip from contested", () => {
    expect(
      isFragileSettled({ ...base, quadrant: "settled", cardCount: 12, flipsToChange: 1 })
    ).toBe(true);
  });

  it("flags a settled map with too few cards even when two flips are needed", () => {
    expect(
      isFragileSettled({ ...base, quadrant: "settled", cardCount: 4, flipsToChange: 2 })
    ).toBe(true);
  });

  it("treats an unmovable quadrant as robust", () => {
    expect(
      isFragileSettled({ ...base, quadrant: "settled", cardCount: 12, flipsToChange: null })
    ).toBe(false);
  });

  it("never flags contested, moderate or open", () => {
    for (const quadrant of ["contested", "moderate", "open"] as const) {
      expect(isFragileSettled({ ...base, quadrant, cardCount: 2, flipsToChange: 1 })).toBe(false);
    }
  });

  it("is driven by the shared constants", () => {
    expect(VERDICT_ROBUSTNESS.MIN_FLIPS_TO_CHANGE).toBe(2);
    expect(VERDICT_ROBUSTNESS.MIN_CARDS).toBe(8);
  });
});

// ---------------------------------------------------------------------------
// Pillar-shaped fixtures
// ---------------------------------------------------------------------------

const crux: Crux = {
  id: "crux-1",
  title: "Crux",
  description: "d",
  methodology: "m",
  verification_status: "verified",
  cost_to_verify: "$0",
};

const evidence = (id: string, side: "for" | "against", sub: number): Evidence => ({
  id,
  title: id,
  description: "d",
  side,
  weight: {
    sourceReliability: sub,
    independence: sub,
    replicability: sub,
    directness: sub,
  },
});

const pillar = (id: string, items: Evidence[]): Pillar => ({
  id,
  title: id,
  short_summary: "s",
  icon_name: "Scale",
  skeptic_premise: "p",
  proponent_rebuttal: "r",
  crux,
  evidence: items,
});

describe("topicCards / computeVerdictSensitivity", () => {
  const pillars = [
    pillar("p1", [evidence("e1", "for", 8), evidence("e2", "for", 8)]),
    pillar("p2", [evidence("e3", "against", 5)]),
  ];

  it("flattens every pillar's evidence into scored cards", () => {
    expect(topicCards(pillars)).toEqual([
      { side: "for", score: 32 },
      { side: "for", score: 32 },
      { side: "against", score: 20 },
    ]);
  });

  it("ignores pillars with no evidence", () => {
    expect(topicCards([...pillars, { ...pillar("p3", []), evidence: undefined }])).toHaveLength(3);
  });

  it("agrees with computeCardSensitivity", () => {
    expect(computeVerdictSensitivity(pillars, HIGH_WEIGHT)).toEqual(
      computeCardSensitivity(topicCards(pillars), HIGH_WEIGHT)
    );
  });
});

describe("topicVerdictSensitivity", () => {
  const pillars = [
    pillar("p1", [evidence("e1", "for", 8), evidence("e2", "for", 8), evidence("e3", "against", 8)]),
  ];

  it("uses the cards' own balance when no floor was applied", () => {
    // 64 for / 96 total → 67
    const s = topicVerdictSensitivity({ pillars, balance: 67, weight: HIGH_WEIGHT });
    expect(s.balance).toBe(67);
    expect(s.oneCardBalanceRange.min).toBe(33);
  });

  it("reconstructs a settled floor from a published balance above the computed one", () => {
    const s = topicVerdictSensitivity({ pillars, balance: 95, weight: HIGH_WEIGHT });
    expect(s.balance).toBe(95);
    expect(s.oneCardBalanceRange.min).toBe(95);
  });
});
