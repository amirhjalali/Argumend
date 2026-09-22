import { describe, expect, it } from "vitest";
import type { Evidence, Pillar } from "@/lib/schemas/topic";
import { isNotAnArgument, selectEvidence } from "./compose";

function evidence(id: string, side: "for" | "against", score: number): Evidence {
  const per = score / 4;
  return {
    id,
    title: `Study ${id}`,
    description: "d",
    side,
    weight: {
      sourceReliability: per,
      independence: per,
      replicability: per,
      directness: per,
    },
    source: `source-${id}`,
  };
}

function pillar(items: Evidence[]): Pillar {
  return {
    id: "supply-effects",
    title: "Supply Effects",
    short_summary: "s",
    icon_name: "Scale",
    skeptic_premise: "s",
    proponent_rebuttal: "r",
    crux: {
      id: "c",
      title: "T",
      description: "d",
      methodology: "m",
      verification_status: "theoretical",
      cost_to_verify: "$1",
    },
    evidence: items,
  } as unknown as Pillar;
}

describe("isNotAnArgument", () => {
  it("is true for an explicit none", () => {
    expect(isNotAnArgument("none", 0, 1)).toBe(true);
  });

  it("is true for a high fallacy score with no checkable content", () => {
    expect(isNotAnArgument("supply-effects", 0.89, 0.05)).toBe(true);
  });

  it("is false for a fallacy that still carries a checkable claim", () => {
    expect(isNotAnArgument("supply-effects", 0.95, 0.55)).toBe(false);
  });

  it("is false for an ordinary argument", () => {
    expect(isNotAnArgument("supply-effects", 0.2, 0.9)).toBe(false);
  });

  it("uses inclusive thresholds so 0.8 / 0.2 counts", () => {
    expect(isNotAnArgument("supply-effects", 0.8, 0.2)).toBe(true);
    expect(isNotAnArgument("supply-effects", 0.79, 0.2)).toBe(false);
    expect(isNotAnArgument("supply-effects", 0.8, 0.21)).toBe(false);
  });
});

describe("selectEvidence", () => {
  it("takes the strongest item on each side", () => {
    const picked = selectEvidence(
      pillar([
        evidence("a", "for", 20),
        evidence("b", "for", 36),
        evidence("c", "against", 28),
        evidence("d", "against", 12),
      ]),
    );
    expect(picked.map((item) => [item.id, item.side, item.score])).toEqual([
      ["b", "for", 36],
      ["c", "against", 28],
    ]);
  });

  it("falls back to the two strongest when every item is on one side", () => {
    const picked = selectEvidence(
      pillar([evidence("a", "for", 20), evidence("b", "for", 36), evidence("c", "for", 28)]),
    );
    expect(picked.map((item) => item.id)).toEqual(["b", "c"]);
    expect(picked.every((item) => item.side === "for")).toBe(true);
  });

  it("never returns the same item twice", () => {
    const picked = selectEvidence(pillar([evidence("only", "against", 30)]));
    expect(picked).toHaveLength(1);
    expect(picked[0].id).toBe("only");
  });

  it("returns nothing for a section with no evidence", () => {
    expect(selectEvidence(pillar([]))).toEqual([]);
    expect(selectEvidence(undefined)).toEqual([]);
  });

  it("breaks score ties by id so the pick is stable", () => {
    const first = selectEvidence(pillar([evidence("z", "for", 20), evidence("a", "for", 20)]));
    const second = selectEvidence(pillar([evidence("a", "for", 20), evidence("z", "for", 20)]));
    expect(first.map((item) => item.id)).toEqual(second.map((item) => item.id));
    expect(first[0].id).toBe("a");
  });

  it("carries the source through when the map has one", () => {
    const [item] = selectEvidence(pillar([evidence("a", "for", 20)]));
    expect(item.source).toBe("source-a");
    expect(item.sourceUrl).toBeUndefined();
  });
});
