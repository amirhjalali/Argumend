import { describe, expect, it } from "vitest";
import { chunkForSse, generateProgrammaticDebateTurn } from "./programmatic";

describe("generateProgrammaticDebateTurn", () => {
  const baseInput = {
    topic: "Nuclear energy should expand",
    round: 1,
    previousMessages: [],
    pillars: [
      {
        title: "Climate reliability",
        skepticPremise: "Build times and costs are too high to scale quickly.",
        proponentRebuttal: "Reliable low-carbon baseload reduces fossil fallback risk.",
      },
    ],
  };

  it("generates FOR opening turn with deterministic output", () => {
    const first = generateProgrammaticDebateTurn({
      ...baseInput,
      side: "for",
    });
    const second = generateProgrammaticDebateTurn({
      ...baseInput,
      side: "for",
    });

    expect(first).toContain("Opening FOR case");
    expect(first).toContain("Climate reliability");
    expect(first).toBe(second);
  });

  it("generates AGAINST rebuttal that references opponent text", () => {
    const rebuttal = generateProgrammaticDebateTurn({
      ...baseInput,
      side: "against",
      round: 2,
      previousMessages: [
        {
          side: "for",
          round: 1,
          content: "Proponents argue reliability and emissions benefits are decisive.",
        },
      ],
    });

    expect(rebuttal).toContain("AGAINST rebuttal");
    expect(rebuttal).toContain("Response to opponent");
  });

  it.each([
    ["for", "Opening FOR case", "evidence quality"],
    ["against", "Opening AGAINST case", "under-justified"],
  ] as const)("generates a %s opening without mapped pillars", (side, heading, fallback) => {
    const opening = generateProgrammaticDebateTurn({
      ...baseInput,
      side,
      pillars: [],
    });

    expect(opening).toContain(heading);
    expect(opening).toContain(fallback);
  });

  it("generates a FOR rebuttal without an opponent or pillar", () => {
    const rebuttal = generateProgrammaticDebateTurn({
      ...baseInput,
      side: "for",
      round: 2,
      previousMessages: [{ side: "for", round: 1, content: "Our own opening." }],
      pillars: undefined,
    });

    expect(rebuttal).toContain("FOR rebuttal");
    expect(rebuttal).toContain("most recent objection does not defeat");
    expect(rebuttal).toContain("available evidence");
  });

  it("normalizes rounds, rotates pillars, and bounds opponent excerpts", () => {
    const rebuttal = generateProgrammaticDebateTurn({
      ...baseInput,
      side: "for",
      round: 2.9,
      pillars: [
        baseInput.pillars[0],
        {
          title: "Second pillar",
          skepticPremise: "Second objection.",
          proponentRebuttal: "Second response.",
        },
      ],
      previousMessages: [
        { side: "against", round: 1, content: `  ${"long ".repeat(60)}  ` },
      ],
    });

    expect(rebuttal).toContain("Round 2 focus (Second pillar): Second response.");
    const excerpt = rebuttal.match(/Response to opponent: "([^"]*)"/)?.[1] ?? "";
    expect(excerpt.length).toBe(220);
    expect(excerpt).not.toMatch(/\s{2,}/);
  });

  it("clamps non-positive rounds to an opening turn", () => {
    expect(generateProgrammaticDebateTurn({
      ...baseInput,
      side: "against",
      round: 0,
    })).toContain("Opening AGAINST case");
  });
});

describe("chunkForSse", () => {
  it("chunks text while preserving readable token order", () => {
    const chunks = chunkForSse("one two three four five six", 2);
    expect(chunks).toEqual(["one two ", "three four ", "five six"]);
  });

  it("returns one empty event for whitespace-only text", () => {
    expect(chunkForSse(" \n\t ")).toEqual([""]);
  });

  it.each([0, -2, Number.NaN, Number.POSITIVE_INFINITY])(
    "uses a safe default for invalid chunk size %s",
    (size) => {
      expect(chunkForSse("one two three four", size)).toEqual([
        "one two three ",
        "four",
      ]);
    },
  );

  it("normalizes fractional chunk sizes to whole words", () => {
    expect(chunkForSse("one two three four five", 2.8)).toEqual([
      "one two ",
      "three four ",
      "five",
    ]);
  });
});
