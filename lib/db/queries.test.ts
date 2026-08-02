import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getDb: vi.fn(),
  insert: vi.fn(),
  values: vi.fn(),
  returning: vi.fn(),
  findDebate: vi.fn(),
  update: vi.fn(),
  set: vi.fn(),
  where: vi.fn(),
  updateReturning: vi.fn(),
}));

vi.mock("./index", () => ({ getDb: mocks.getDb }));

import {
  DebateOwnershipError,
  saveAnalysis,
  saveDebate,
  saveDebateRound,
  updateDebateStatus,
} from "./queries";

describe("debate persistence queries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getDb.mockReturnValue({
      query: { debates: { findFirst: mocks.findDebate } },
      insert: mocks.insert,
      update: mocks.update,
    });
    mocks.insert.mockReturnValue({ values: mocks.values });
    mocks.values.mockReturnValue({ returning: mocks.returning });
    mocks.returning.mockResolvedValue([{ id: "saved-row" }]);
    mocks.update.mockReturnValue({ set: mocks.set });
    mocks.set.mockReturnValue({ where: mocks.where });
    mocks.where.mockReturnValue({ returning: mocks.updateReturning });
    mocks.updateReturning.mockResolvedValue([{ id: "debate-1" }]);
  });

  it("returns only the public id from analysis persistence", async () => {
    const saved = await saveAnalysis(
      { contentType: "article" },
      {
        topic: "A claim",
        summary: "A derived summary",
        positions: [],
        identifiedCruxes: [],
        potentialFallacies: [],
        detectedBiases: [],
        confidence: 0.8,
      }
    );

    expect(saved).toEqual({ id: "saved-row" });
    expect(mocks.values).toHaveBeenCalledWith(
      expect.not.objectContaining({
        inputContent: expect.anything(),
        contentHash: expect.anything(),
      })
    );
    expect(Object.keys(mocks.returning.mock.calls[0][0])).toEqual(["id"]);
  });

  it("writes userId on debate creation", async () => {
    await saveDebate({
      userId: "user-1",
      topicTitle: "Topic",
      forModel: "claude",
      againstModel: "gpt-4",
    });

    expect(mocks.values).toHaveBeenCalledWith(
      expect.objectContaining({ userId: "user-1" })
    );
  });

  it("refuses to insert a round when ownership cannot be established", async () => {
    mocks.findDebate.mockResolvedValueOnce(undefined);

    await expect(
      saveDebateRound("user-2", {
        debateId: "debate-1",
        roundNumber: 1,
        forContent: "For",
        againstContent: "Against",
      })
    ).rejects.toBeInstanceOf(DebateOwnershipError);
    expect(mocks.insert).not.toHaveBeenCalled();
  });

  it("inserts a round after finding an owned debate", async () => {
    mocks.findDebate.mockResolvedValueOnce({ id: "debate-1" });

    await saveDebateRound("user-1", {
      debateId: "debate-1",
      roundNumber: 1,
      forContent: "For",
      againstContent: "Against",
    });

    expect(mocks.findDebate).toHaveBeenCalledWith(
      expect.objectContaining({ columns: { id: true } })
    );
    expect(mocks.values).toHaveBeenCalledWith({
      debateId: "debate-1",
      roundNumber: 1,
      forContent: "For",
      againstContent: "Against",
    });
  });

  it("throws the typed ownership error when an owned status row is not updated", async () => {
    mocks.updateReturning.mockResolvedValueOnce([]);

    await expect(
      updateDebateStatus("user-2", "debate-1", "completed", "for")
    ).rejects.toBeInstanceOf(DebateOwnershipError);
  });
});
