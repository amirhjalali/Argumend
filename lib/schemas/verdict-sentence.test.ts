import { describe, it, expect } from "vitest";
import { getVerdictSentence } from "./topic";

// getVerdict (2-D balance+weight, compact label for badges) is covered elsewhere;
// this exercises the full-sentence sibling used in prose contexts at each
// confidence boundary.
describe("getVerdictSentence", () => {
  it("returns the 'converges strongly' sentence for score >= 95", () => {
    expect(getVerdictSentence(95)).toBe(
      "The evidence mapped here converges strongly on this claim",
    );
    expect(getVerdictSentence(100)).toBe(
      "The evidence mapped here converges strongly on this claim",
    );
  });

  it("returns the 'most of the weighted evidence' sentence for 75-94", () => {
    expect(getVerdictSentence(75)).toBe(
      "Most of the weighted evidence points toward this claim",
    );
    expect(getVerdictSentence(94)).toBe(
      "Most of the weighted evidence points toward this claim",
    );
  });

  it("returns the 'leans toward but still divided' sentence for 50-74", () => {
    expect(getVerdictSentence(50)).toBe(
      "The evidence leans toward this claim, but it is still divided",
    );
    expect(getVerdictSentence(74)).toBe(
      "The evidence leans toward this claim, but it is still divided",
    );
  });

  it("returns the 'does not lean toward' sentence for score < 50", () => {
    expect(getVerdictSentence(49)).toBe(
      "The evidence mapped here does not lean toward this claim",
    );
    expect(getVerdictSentence(0)).toBe(
      "The evidence mapped here does not lean toward this claim",
    );
  });

  it("reads as a complete, capitalized clause", () => {
    for (const score of [10, 60, 80, 99]) {
      const sentence = getVerdictSentence(score);
      expect(sentence.length).toBeGreaterThan(20);
      expect(sentence[0]).toBe(sentence[0].toUpperCase());
    }
  });
});
