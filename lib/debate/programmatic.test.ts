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
});

describe("chunkForSse", () => {
  it("chunks text while preserving readable token order", () => {
    const chunks = chunkForSse("one two three four five six", 2);
    expect(chunks).toEqual(["one two ", "three four ", "five six"]);
  });
});
