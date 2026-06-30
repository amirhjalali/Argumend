import { describe, it, expect } from "vitest";
import { getVerdictSentence, getVerdictLabel } from "./topic";

// getVerdictLabel (compact, for badges) is covered elsewhere; this exercises the
// full-sentence sibling used in prose contexts at each confidence boundary.
describe("getVerdictSentence", () => {
  it("returns the 'beyond reasonable doubt' sentence for score >= 95", () => {
    expect(getVerdictSentence(95)).toBe(
      "The evidence establishes this claim beyond reasonable doubt",
    );
    expect(getVerdictSentence(100)).toBe(
      "The evidence establishes this claim beyond reasonable doubt",
    );
  });

  it("returns the 'weight of evidence supports' sentence for 75-94", () => {
    expect(getVerdictSentence(75)).toBe(
      "The weight of evidence supports this claim",
    );
    expect(getVerdictSentence(94)).toBe(
      "The weight of evidence supports this claim",
    );
  });

  it("returns the 'leans toward but contested' sentence for 50-74", () => {
    expect(getVerdictSentence(50)).toBe(
      "The evidence leans toward this claim, but it stays genuinely contested",
    );
    expect(getVerdictSentence(74)).toBe(
      "The evidence leans toward this claim, but it stays genuinely contested",
    );
  });

  it("returns the 'too little evidence' sentence for score < 50", () => {
    expect(getVerdictSentence(49)).toBe(
      "There's too little evidence to settle this claim",
    );
    expect(getVerdictSentence(0)).toBe(
      "There's too little evidence to settle this claim",
    );
  });

  it("reads as a complete clause distinct from the compact label", () => {
    for (const score of [10, 60, 80, 99]) {
      const sentence = getVerdictSentence(score);
      // Prose form is longer than the badge label and starts with a capital.
      expect(sentence.length).toBeGreaterThan(getVerdictLabel(score).length);
      expect(sentence[0]).toBe(sentence[0].toUpperCase());
    }
  });
});
