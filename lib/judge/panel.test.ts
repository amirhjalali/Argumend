import { describe, expect, it, vi } from "vitest";
import { DEFAULT_RUBRIC } from "./rubric";
import { judgeWithClaudePanel } from "./panel";
import type { DebateMessageInput } from "@/types/debate";

const dimension = (
  result: ReturnType<typeof judgeWithClaudePanel>,
  side: "for" | "against",
  dimensionId: string,
) => {
  const score = result.verdicts[0][`${side}Score`].dimensions.find(
    (candidate) => candidate.dimensionId === dimensionId,
  );
  if (!score) throw new Error(`Missing ${side} ${dimensionId} score`);
  return score;
};

describe("judgeWithClaudePanel", () => {
  it("returns three distinct Claude personas with a complete bounded rubric", () => {
    vi.spyOn(Date, "now").mockReturnValue(42_000);
    const result = judgeWithClaudePanel([
      {
        side: "for",
        round: 1,
        content:
          "A replicated study found a 42 percent reduction because the intervention targets the causal mechanism.",
      },
      {
        side: "against",
        round: 1,
        content:
          "However, critics respond that the study is limited and the core tradeoff remains uncertain.",
      },
    ]);

    expect(result.verdicts.map(({ judgeId }) => judgeId)).toEqual([
      "claude-analyst",
      "claude-reviewer",
      "claude-arbiter",
    ]);
    expect(result.verdicts.every(({ model }) => model === "claude")).toBe(true);
    expect(result.timestamp).toBe(42_000);
    expect(result.winner).toMatch(/^(for|against|draw)$/);
    for (const verdict of result.verdicts) {
      for (const sideScore of [verdict.forScore, verdict.againstScore]) {
        expect(sideScore.dimensions).toHaveLength(DEFAULT_RUBRIC.length);
        expect(sideScore.dimensions.every(({ score }) => score >= 1 && score <= 10)).toBe(true);
        expect(sideScore.summary).toMatch(/strongest|tightly clustered/);
        expect(sideScore.confidence).toBeGreaterThanOrEqual(0.45);
        expect(sideScore.confidence).toBeLessThanOrEqual(0.92);
      }
      expect(verdict.overallReasoning).toContain(verdict.judgeName);
    }
  });

  it("is deterministic apart from timestamp metadata", () => {
    vi.spyOn(Date, "now").mockReturnValue(1_000);
    const messages: DebateMessageInput[] = [
      { side: "for", round: 1, content: "Evidence supports this because the data is replicated." },
      { side: "against", round: 1, content: "Critics respond that the evidence is limited." },
    ];

    expect(judgeWithClaudePanel(messages)).toEqual(judgeWithClaudePanel(messages));
  });

  it("uses stable placeholder arguments when both sides are absent", () => {
    const result = judgeWithClaudePanel([]);

    expect(result.verdicts).toHaveLength(3);
    expect(result.aggregatedScores.for.average).toBeGreaterThan(0);
    expect(result.aggregatedScores.against.average).toBeGreaterThan(0);
    expect(result.hasConsensus).toBe(true);
  });

  it("rewards evidence and numeric specificity over unsupported assertion", () => {
    const result = judgeWithClaudePanel([
      {
        side: "for",
        round: 1,
        content:
          "A peer-reviewed study and independent data found 42 percent improvement across 3 replicated trials.",
      },
      { side: "against", round: 1, content: "This is bad and should stop." },
    ]);

    expect(dimension(result, "for", "evidence-quality").score).toBeGreaterThan(
      dimension(result, "against", "evidence-quality").score,
    );
    expect(result.aggregatedScores.for.byDimension["evidence-quality"]).toBeGreaterThan(
      result.aggregatedScores.against.byDimension["evidence-quality"],
    );
  });

  it("penalizes emotional absolutes and rewards measured uncertainty", () => {
    const result = judgeWithClaudePanel([
      {
        side: "for",
        round: 1,
        content: "This outrageous disaster always proves everyone is completely wrong and never credible.",
      },
      {
        side: "against",
        round: 1,
        content:
          "However, the conclusion depends on limited evidence and remains uncertain, although the mechanism is plausible.",
      },
    ]);

    expect(dimension(result, "against", "bias-credibility").score).toBeGreaterThan(
      dimension(result, "for", "bias-credibility").score,
    );
    expect(dimension(result, "for", "bias-credibility").reasoning).toContain(
      "emotional terms",
    );
  });

  it("recognizes direct rebuttal and shared crux framing", () => {
    const shared = "The core issue is whether cost evidence changes the burden of proof.";
    const result = judgeWithClaudePanel([
      {
        side: "for",
        round: 1,
        content: `${shared} Supporters respond to critics with a direct counter and rebuttal.`,
      },
      { side: "against", round: 1, content: `${shared} Critics dispute the causal evidence.` },
    ]);

    expect(dimension(result, "for", "rebuttal-strength").score).toBeGreaterThan(6);
    expect(dimension(result, "for", "crux-identification").score).toBeGreaterThan(6);
    expect(dimension(result, "for", "rebuttal-strength").reasoning).toContain(
      "keyword overlap",
    );
  });

  it("joins multiple rounds before scoring rather than ignoring later evidence", () => {
    const opening: DebateMessageInput = {
      side: "for",
      round: 1,
      content: "The claim is plausible.",
    };
    const oneRound = judgeWithClaudePanel([
      opening,
      { side: "against", round: 1, content: "The claim is disputed." },
    ]);
    const twoRounds = judgeWithClaudePanel([
      opening,
      {
        side: "for",
        round: 2,
        content: "Independent research found 35 percent improvement in 4 replicated studies.",
      },
      { side: "against", round: 1, content: "The claim is disputed." },
    ]);

    expect(twoRounds.aggregatedScores.for.byDimension["evidence-quality"]).toBeGreaterThan(
      oneRound.aggregatedScores.for.byDimension["evidence-quality"],
    );
  });
});
