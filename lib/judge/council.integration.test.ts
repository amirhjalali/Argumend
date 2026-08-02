import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AgentConfig } from "@/lib/agents/types";
import type { RubricDimension } from "./rubric";

const mocks = vi.hoisted(() => ({ executeAgent: vi.fn() }));

vi.mock("@/lib/agents/executor", () => ({ executeAgent: mocks.executeAgent }));

import { JudgeCouncil, createJudgeCouncil } from "./council";

const rubric: RubricDimension[] = [
  {
    id: "logic",
    name: "Logic",
    description: "Logical strength",
    weight: 1,
    guidelines: { low: "weak", medium: "mixed", high: "strong" },
  },
];

const judges: AgentConfig[] = [
  { id: "judge-a", name: "Judge A", type: "local-llm", model: "claude" },
  { id: "judge-b", name: "Judge B", type: "local-llm", model: "gpt-5" },
  { id: "judge-c", name: "Judge C", type: "local-llm", model: "gemini" },
];

const verdictJson = (
  winner: "for" | "against" | "draw",
  forScore: number,
  againstScore: number,
) =>
  JSON.stringify({
    forScore: {
      dimensions: [{ dimensionId: "logic", score: forScore, reasoning: "For rationale" }],
      summary: "For summary",
      confidence: 0.8,
    },
    againstScore: {
      dimensions: [
        { dimensionId: "logic", score: againstScore, reasoning: "Against rationale" },
      ],
      summary: "Against summary",
      confidence: 0.7,
    },
    winner,
    overallReasoning: "Overall rationale",
  });

describe("JudgeCouncil production orchestration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(Date, "now").mockReturnValue(10_000);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("aggregates valid provider verdicts and preserves model attribution", async () => {
    mocks.executeAgent
      .mockResolvedValueOnce({ content: verdictJson("for", 9, 4), agentId: "judge-a" })
      .mockResolvedValueOnce({ content: verdictJson("for", 8, 5), agentId: "judge-b" })
      .mockResolvedValueOnce({ content: verdictJson("against", 6, 7), agentId: "judge-c" });
    const council = new JudgeCouncil({ judges, rubric });

    const result = await council.judgeDebate(
      [
        { side: "for", round: 1, content: "Supporting case" },
        { side: "against", round: 1, content: "Opposing case" },
      ],
      "A contested claim",
    );

    expect(result.verdicts.map(({ judgeId, model }) => ({ judgeId, model }))).toEqual([
      { judgeId: "judge-a", model: "claude" },
      { judgeId: "judge-b", model: "gpt-5" },
      { judgeId: "judge-c", model: "gemini" },
    ]);
    expect(result.winner).toBe("for");
    expect(result.hasConsensus).toBe(false);
    expect(result.aggregatedScores.for.average).toBeCloseTo((9 + 8 + 6) / 3);
    expect(result.aggregatedScores.against.average).toBeCloseTo((4 + 5 + 7) / 3);
    expect(result.timestamp).toBe(10_000);
    expect(mocks.executeAgent).toHaveBeenCalledTimes(3);
    expect(mocks.executeAgent.mock.calls[0][0]).toMatchObject({
      agent: judges[0],
      systemPrompt: expect.stringContaining("### Logic (100% weight)"),
      userPrompt: expect.stringContaining('## Debate Topic\n"A contested claim"'),
    });
  });

  it("isolates typed provider errors and malformed responses while flagging degradation", async () => {
    mocks.executeAgent
      .mockResolvedValueOnce({
        content: "",
        agentId: "judge-a",
        error: "provider unavailable",
      })
      .mockResolvedValueOnce({ content: "not-json", agentId: "judge-b" })
      .mockResolvedValueOnce({ content: verdictJson("against", 4, 8), agentId: "judge-c" });
    const error = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const council = new JudgeCouncil({ judges, rubric, minJudges: 2 });

    const result = await council.judgeContent("An article body", "article");

    expect(result.verdicts).toHaveLength(1);
    expect(result.winner).toBe("against");
    expect(result.flaggedForReview).toBe(true);
    expect(result).toMatchObject({
      degraded: true,
      failedJudges: ["judge-a", "judge-b"],
    });
    expect(error).toHaveBeenCalledWith("Judge judge-a failed:", "provider unavailable");
    expect(error).toHaveBeenCalledWith("Judge judge-b returned invalid response");
    expect(warn).toHaveBeenCalledWith(
      "Only 1 judges returned valid verdicts (minimum: 2)",
    );
    expect(mocks.executeAgent.mock.calls[0][0].userPrompt).toContain(
      "argumentative article or essay",
    );
  });

  it("returns a stable empty aggregate when every judge fails", async () => {
    mocks.executeAgent.mockResolvedValue({
      content: "",
      agentId: "failed",
      error: "offline",
    });
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const council = new JudgeCouncil({ judges, rubric });

    const result = await council.judgeContent("content");

    expect(result).toMatchObject({
      verdicts: [],
      winner: null,
      hasConsensus: false,
      flaggedForReview: true,
      degraded: true,
      failedJudges: ["judge-a", "judge-b", "judge-c"],
      aggregatedScores: {
        for: { average: 0, byDimension: { logic: 0 } },
        against: { average: 0, byDimension: { logic: 0 } },
      },
    });
  });

  it("uses aggregate scores to break an even panel split and flags review", async () => {
    mocks.executeAgent
      .mockResolvedValueOnce({ content: verdictJson("for", 9, 4), agentId: "judge-a" })
      .mockResolvedValueOnce({ content: verdictJson("against", 8, 6), agentId: "judge-b" });
    const council = new JudgeCouncil({ judges: judges.slice(0, 2), rubric });

    const result = await council.judgeContent("content");

    expect(result.hasConsensus).toBe(false);
    expect(result.winner).toBe("for");
    expect(result.flaggedForReview).toBe(true);
  });

  it("reports per-dimension disagreement when judge scores spread by more than three", async () => {
    mocks.executeAgent
      .mockResolvedValueOnce({ content: verdictJson("for", 10, 5), agentId: "judge-a" })
      .mockResolvedValueOnce({ content: verdictJson("against", 2, 5), agentId: "judge-b" });
    const council = new JudgeCouncil({ judges: judges.slice(0, 2), rubric });

    const result = await council.judgeContent("content");

    expect(result.disagreements).toEqual([
      {
        dimensionId: "logic",
        dimensionName: "Logic (FOR)",
        spread: 8,
        scores: [
          { judgeId: "judge-a", score: 10 },
          { judgeId: "judge-b", score: 2 },
        ],
      },
    ]);
    expect(result.flaggedForReview).toBe(true);
  });

  it("supports mutation without exposing its internal judge array", () => {
    const council = createJudgeCouncil({ judges: [judges[0]], rubric });
    const snapshot = council.getJudges();
    snapshot.push(judges[1]);

    expect(council.getJudges()).toEqual([judges[0]]);
    council.addJudge(judges[1]);
    expect(council.getJudges()).toEqual([judges[0], judges[1]]);
    council.removeJudge("judge-a");
    expect(council.getJudges()).toEqual([judges[1]]);
  });
});
