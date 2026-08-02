import { describe, expect, it, vi } from "vitest";
import { judgeContentOffline, judgeDebateOffline } from "./offline";

describe("offline judge boundary behavior", () => {
  it("falls back to the default local council when an empty model list is supplied", () => {
    const result = judgeDebateOffline([], undefined, []);

    expect(result.verdicts.map((verdict) => verdict.model)).toEqual([
      "claude",
      "gpt-4",
      "gemini",
    ]);
    expect(result.verdicts.every((verdict) => verdict.latencyMs !== undefined)).toBe(true);
  });

  it("uses safe placeholder text when either debate side is absent", () => {
    const forOnly = judgeDebateOffline([
      {
        side: "for",
        round: 1,
        content: "Evidence from a replicated study supports the claim.",
      },
    ]);
    const empty = judgeDebateOffline([]);

    for (const result of [forOnly, empty]) {
      expect(result.verdicts).toHaveLength(3);
      expect(result.winner).toMatch(/^(for|against|draw)$/);
      for (const verdict of result.verdicts) {
        expect(verdict.forScore.totalScore).toBeGreaterThan(0);
        expect(verdict.againstScore.totalScore).toBeGreaterThan(0);
        expect(verdict.forScore.dimensions.every(({ score }) => score >= 1 && score <= 10)).toBe(
          true,
        );
      }
    }
  });

  it.each([
    ["claude", "Claude Programmatic Judge"],
    ["gpt-4", "GPT-4 Programmatic Judge"],
    ["gpt-5", "GPT-5 Programmatic Judge"],
    ["gemini", "Gemini Programmatic Judge"],
    ["grok", "Grok Programmatic Judge"],
  ] as const)("labels %s without hiding the requested model", (model, expectedName) => {
    const result = judgeDebateOffline([], undefined, [model]);

    expect(result.verdicts[0]).toMatchObject({
      judgeId: `offline-${model}`,
      judgeName: expectedName,
      model,
    });
  });

  it("is deterministic apart from timestamp metadata", () => {
    vi.spyOn(Date, "now").mockReturnValue(1_234_567);
    const messages = [
      {
        side: "for" as const,
        round: 1,
        content: "A study found 42 percent improvement because the intervention was targeted.",
      },
      {
        side: "against" as const,
        round: 1,
        content: "However, critics respond that the sample was limited and uncertain.",
      },
    ];

    expect(judgeDebateOffline(messages)).toEqual(judgeDebateOffline(messages));
  });

  it("judges empty freeform content without requiring a model provider", () => {
    const result = judgeContentOffline("", "freeform", ["gpt-5"]);

    expect(result.verdicts).toHaveLength(1);
    expect(result.verdicts[0]).toMatchObject({
      model: "gpt-5",
      judgeName: "GPT-5 Programmatic Judge",
    });
    expect(result.aggregatedScores.for.average).toBeGreaterThan(0);
    expect(result.aggregatedScores.against.average).toBeGreaterThan(0);
  });
});
