import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getDb: vi.fn(),
  transaction: vi.fn(),
  insert: vi.fn(),
  values: vi.fn(),
  onConflictDoNothing: vi.fn(),
  returning: vi.fn(),
  remove: vi.fn(),
  deleteWhere: vi.fn(),
  select: vi.fn(),
  from: vi.fn(),
  selectWhere: vi.fn(),
  groupBy: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  findAnalysis: vi.fn(),
  listAnalyses: vi.fn(),
  findDebate: vi.fn(),
  listDebates: vi.fn(),
  findJudgment: vi.fn(),
  listJudgments: vi.fn(),
  listSavedTopics: vi.fn(),
  findSubscription: vi.fn(),
}));

vi.mock("./index", () => ({ getDb: mocks.getDb }));

import {
  getAnalysis,
  getDebate,
  getJudgment,
  getSavedTopicIds,
  getSubscriberCount,
  getTrendingTopics,
  isSubscribed,
  listAnalyses,
  listDebates,
  listJudgments,
  listUserDebates,
  recordTopicView,
  saveJudgment,
  saveTopic,
  subscribeTopic,
  unsaveTopic,
  unsubscribeTopic,
} from "./queries";

describe("database query state transitions", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    const insertBuilder = {
      values: mocks.values,
      onConflictDoNothing: mocks.onConflictDoNothing,
      returning: mocks.returning,
    };
    mocks.values.mockReturnValue(insertBuilder);
    mocks.onConflictDoNothing.mockReturnValue(insertBuilder);
    mocks.returning.mockResolvedValue([{ id: "row-1" }]);

    mocks.remove.mockReturnValue({ where: mocks.deleteWhere });
    mocks.deleteWhere.mockResolvedValue(undefined);

    const selectBuilder = {
      from: mocks.from,
      where: mocks.selectWhere,
      groupBy: mocks.groupBy,
      orderBy: mocks.orderBy,
      limit: mocks.limit,
    };
    mocks.select.mockReturnValue(selectBuilder);
    mocks.from.mockReturnValue(selectBuilder);
    mocks.selectWhere.mockReturnValue(selectBuilder);
    mocks.groupBy.mockReturnValue(selectBuilder);
    mocks.orderBy.mockReturnValue(selectBuilder);
    mocks.limit.mockResolvedValue([]);

    const database = {
      insert: mocks.insert.mockReturnValue(insertBuilder),
      delete: mocks.remove,
      select: mocks.select,
      query: {
        analyses: { findFirst: mocks.findAnalysis, findMany: mocks.listAnalyses },
        debates: { findFirst: mocks.findDebate, findMany: mocks.listDebates },
        judgments: { findFirst: mocks.findJudgment, findMany: mocks.listJudgments },
        savedTopics: { findMany: mocks.listSavedTopics },
        topicSubscriptions: { findFirst: mocks.findSubscription },
      },
    };
    mocks.transaction.mockImplementation(async (operation) => operation(database));
    mocks.getDb.mockReturnValue({ ...database, transaction: mocks.transaction });
  });

  it("delegates public record reads and bounded list limits", async () => {
    mocks.findAnalysis.mockResolvedValue({ id: "analysis-1" });
    mocks.listAnalyses.mockResolvedValue([{ id: "analysis-2" }]);
    mocks.findDebate.mockResolvedValue({ id: "debate-1", rounds: [] });
    mocks.listDebates.mockResolvedValue([{ id: "debate-2" }]);
    mocks.findJudgment.mockResolvedValue({ id: "judgment-1", verdicts: [] });
    mocks.listJudgments.mockResolvedValue([{ id: "judgment-2" }]);

    await expect(getAnalysis("analysis-1")).resolves.toEqual({ id: "analysis-1" });
    await expect(listAnalyses(7)).resolves.toEqual([{ id: "analysis-2" }]);
    await expect(getDebate("debate-1")).resolves.toEqual({ id: "debate-1", rounds: [] });
    await expect(listDebates(8)).resolves.toEqual([{ id: "debate-2" }]);
    await expect(getJudgment("judgment-1")).resolves.toEqual({
      id: "judgment-1",
      verdicts: [],
    });
    await expect(listJudgments(9)).resolves.toEqual([{ id: "judgment-2" }]);

    expect(mocks.listAnalyses).toHaveBeenCalledWith(expect.objectContaining({ limit: 7 }));
    expect(mocks.listDebates).toHaveBeenCalledWith(expect.objectContaining({ limit: 8 }));
    expect(mocks.listJudgments).toHaveBeenCalledWith(expect.objectContaining({ limit: 9 }));
  });

  it("returns saved topic ids in persistence order and scopes debate lists to the user", async () => {
    mocks.listSavedTopics.mockResolvedValue([
      { topicId: "ai-risk" },
      { topicId: "nuclear-energy-safety" },
    ]);
    mocks.listDebates.mockResolvedValue([{ id: "debate-1" }]);

    await expect(getSavedTopicIds("user-1")).resolves.toEqual([
      "ai-risk",
      "nuclear-energy-safety",
    ]);
    await expect(listUserDebates("user-1", 4)).resolves.toEqual([{ id: "debate-1" }]);
    expect(mocks.listSavedTopics).toHaveBeenCalledWith(
      expect.objectContaining({ orderBy: expect.anything() }),
    );
    expect(mocks.listDebates).toHaveBeenCalledWith(
      expect.objectContaining({ limit: 4, where: expect.anything() }),
    );
  });

  it.each([
    ["saveTopic", saveTopic],
    ["subscribeTopic", subscribeTopic],
  ])("makes %s idempotent and returns the inserted row", async (_name, operation) => {
    mocks.returning.mockResolvedValueOnce([{ id: "saved-1" }]);

    await expect(operation("user-1", "ai-risk")).resolves.toEqual({ id: "saved-1" });
    expect(mocks.values).toHaveBeenCalledWith({ userId: "user-1", topicId: "ai-risk" });
    expect(mocks.onConflictDoNothing).toHaveBeenCalledOnce();
  });

  it("returns undefined when an idempotent insert loses a conflict race", async () => {
    mocks.returning.mockResolvedValueOnce([]);

    await expect(saveTopic("user-1", "ai-risk")).resolves.toBeUndefined();
  });

  it.each([
    ["unsaveTopic", unsaveTopic],
    ["unsubscribeTopic", unsubscribeTopic],
  ])("makes %s deletion safe when no row exists", async (_name, operation) => {
    await expect(operation("user-1", "ai-risk")).resolves.toBeUndefined();
    expect(mocks.remove).toHaveBeenCalledOnce();
    expect(mocks.deleteWhere).toHaveBeenCalledOnce();
  });

  it("maps subscription row presence to a strict boolean", async () => {
    mocks.findSubscription
      .mockResolvedValueOnce({ userId: "user-1", topicId: "ai-risk" })
      .mockResolvedValueOnce(undefined);

    await expect(isSubscribed("user-1", "ai-risk")).resolves.toBe(true);
    await expect(isSubscribed("user-1", "ai-risk")).resolves.toBe(false);
  });

  it("returns subscriber counts and safely defaults a missing aggregate row to zero", async () => {
    mocks.selectWhere.mockResolvedValueOnce([{ count: 12 }]).mockResolvedValueOnce([]);

    await expect(getSubscriberCount("ai-risk")).resolves.toBe(12);
    await expect(getSubscriberCount("ai-risk")).resolves.toBe(0);
  });

  it("stores anonymous topic views as null and preserves authenticated owners", async () => {
    await recordTopicView("ai-risk");
    await recordTopicView("ai-risk", "user-1");

    expect(mocks.values.mock.calls.map(([value]) => value)).toEqual([
      { topicId: "ai-risk", userId: null },
      { topicId: "ai-risk", userId: "user-1" },
    ]);
  });

  it("returns the grouped trending query and respects the caller's limit", async () => {
    mocks.limit.mockResolvedValue([{ topicId: "ai-risk", viewCount: 20 }]);

    await expect(getTrendingTopics(6)).resolves.toEqual([
      { topicId: "ai-risk", viewCount: 20 },
    ]);
    expect(mocks.groupBy).toHaveBeenCalledOnce();
    expect(mocks.orderBy).toHaveBeenCalledOnce();
    expect(mocks.limit).toHaveBeenCalledWith(6);
  });

  it("skips individual verdict writes when a judgment has no verdicts", async () => {
    const result = {
      verdicts: [],
      winner: null,
      hasConsensus: false,
      aggregatedScores: {
        for: { average: 0, byDimension: {} },
        against: { average: 0, byDimension: {} },
      },
      disagreements: [],
      flaggedForReview: true,
      timestamp: 1,
    };

    await expect(saveJudgment(result, {})).resolves.toEqual({ id: "row-1" });
    expect(mocks.transaction).toHaveBeenCalledOnce();
    expect(mocks.insert).toHaveBeenCalledOnce();
  });

  it("writes normalized individual verdict rows after the parent judgment", async () => {
    const verdict = {
      judgeId: "judge-1",
      judgeName: "Judge One",
      model: "claude" as const,
      forScore: { side: "for" as const, dimensions: [], totalScore: 8, summary: "", confidence: 0.8 },
      againstScore: { side: "against" as const, dimensions: [], totalScore: 5, summary: "", confidence: 0.7 },
      winner: "for" as const,
      overallReasoning: "For was stronger",
      latencyMs: 25,
    };
    const result = {
      verdicts: [verdict],
      winner: "for" as const,
      hasConsensus: true,
      aggregatedScores: {
        for: { average: 8, byDimension: {} },
        against: { average: 5, byDimension: {} },
      },
      disagreements: [],
      flaggedForReview: false,
      timestamp: 1,
    };

    await saveJudgment(result, { debateId: "debate-1" });

    expect(mocks.transaction).toHaveBeenCalledOnce();
    expect(mocks.getDb).toHaveBeenCalledOnce();
    expect(mocks.insert).toHaveBeenCalledTimes(2);
    expect(mocks.values).toHaveBeenLastCalledWith([
      {
        judgmentId: "row-1",
        judgeId: "judge-1",
        judgeName: "Judge One",
        model: "claude",
        forScore: verdict.forScore,
        againstScore: verdict.againstScore,
        winner: "for",
        overallReasoning: "For was stronger",
        latencyMs: 25,
      },
    ]);
  });

  it("propagates a multi-verdict transaction failure without direct writes", async () => {
    const failure = new Error("second statement failed");
    const rootInsert = vi.fn();
    const transactionInsert = vi.fn();
    const parentValues = vi.fn().mockReturnValue({
      returning: vi.fn().mockResolvedValue([{ id: "judgment-atomic" }]),
    });
    const verdictValues = vi.fn().mockRejectedValue(failure);
    transactionInsert
      .mockReturnValueOnce({ values: parentValues })
      .mockReturnValueOnce({ values: verdictValues });
    const transaction = vi.fn(async (operation) =>
      operation({ insert: transactionInsert }),
    );
    mocks.getDb.mockReturnValueOnce({
      insert: rootInsert,
      transaction,
    });

    const score = (side: "for" | "against", totalScore: number) => ({
      side,
      dimensions: [],
      totalScore,
      summary: "",
      confidence: 0.8,
    });
    const result = {
      verdicts: [
        {
          judgeId: "judge-1",
          judgeName: "Judge One",
          model: "claude" as const,
          forScore: score("for", 8),
          againstScore: score("against", 5),
          winner: "for" as const,
          overallReasoning: "For was stronger",
        },
        {
          judgeId: "judge-2",
          judgeName: "Judge Two",
          model: "gpt-4" as const,
          forScore: score("for", 7),
          againstScore: score("against", 6),
          winner: "for" as const,
          overallReasoning: "For narrowly won",
          latencyMs: 40,
        },
      ],
      winner: "for" as const,
      hasConsensus: true,
      aggregatedScores: {
        for: { average: 7.5, byDimension: {} },
        against: { average: 5.5, byDimension: {} },
      },
      disagreements: [],
      flaggedForReview: false,
      timestamp: 1,
    };

    await expect(
      saveJudgment(result, { analysisId: "analysis-1" }),
    ).rejects.toBe(failure);

    expect(mocks.getDb).toHaveBeenCalledOnce();
    expect(transaction).toHaveBeenCalledOnce();
    expect(rootInsert).not.toHaveBeenCalled();
    expect(transactionInsert).toHaveBeenCalledTimes(2);
    expect(verdictValues).toHaveBeenCalledWith([
      expect.objectContaining({
        judgmentId: "judgment-atomic",
        judgeId: "judge-1",
        latencyMs: undefined,
      }),
      expect.objectContaining({
        judgmentId: "judgment-atomic",
        judgeId: "judge-2",
        latencyMs: 40,
      }),
    ]);
  });
});
