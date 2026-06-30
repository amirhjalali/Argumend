import { describe, expect, it, vi } from "vitest";
import { parseJudgeResponse } from "./prompts";

const validResponse = {
  forScore: {
    dimensions: [
      {
        dimensionId: "logical-validity",
        score: 8,
        reasoning: "Clear causal reasoning.",
        examples: ["Reliable low-carbon generation."],
      },
    ],
    summary: "The for side is coherent.",
    confidence: 0.8,
  },
  againstScore: {
    dimensions: [
      {
        dimensionId: "logical-validity",
        score: 6,
        reasoning: "Reasonable but incomplete.",
      },
    ],
    summary: "The against side raises execution risks.",
    confidence: 0.7,
  },
  winner: "for",
  overallReasoning: "The for side better supported its claim.",
};

describe("parseJudgeResponse", () => {
  it("validates and returns a structured judge response", () => {
    const parsed = parseJudgeResponse(JSON.stringify(validResponse));

    expect(parsed).toMatchObject({
      winner: "for",
      forScore: {
        confidence: 0.8,
        dimensions: [{ score: 8 }],
      },
    });
  });

  it("rejects impossible model output instead of casting it", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const parsed = parseJudgeResponse(JSON.stringify({
      ...validResponse,
      winner: "undecided",
      forScore: {
        ...validResponse.forScore,
        dimensions: [{ dimensionId: "logical-validity", score: 99 }],
      },
    }));
    warnSpy.mockRestore();

    expect(parsed).toBeNull();
  });
});
