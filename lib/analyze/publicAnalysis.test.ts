import { describe, expect, it } from "vitest";
import { toPublicAnalysis } from "./publicAnalysis";

describe("toPublicAnalysis", () => {
  it("removes source text, hashes, and ownership identifiers", () => {
    const stored = {
      id: "analysis-1",
      topic: "A public topic",
      summary: "A public summary",
      inputContent: "private pasted source text",
      contentHash: "private-hash",
      userId: "private-user-id",
    };

    expect(toPublicAnalysis(stored)).toEqual({
      id: "analysis-1",
      topic: "A public topic",
      summary: "A public summary",
    });
    expect(stored.inputContent).toBe("private pasted source text");
  });

  it("does not remove similarly named public fields", () => {
    expect(
      toPublicAnalysis({
        inputContentSummary: "safe synopsis",
        ownerDisplayName: "Anonymous",
      }),
    ).toEqual({
      inputContentSummary: "safe synopsis",
      ownerDisplayName: "Anonymous",
    });
  });

  it("redacts private fields recursively without mutating nested input", () => {
    const stored = {
      id: "analysis-1",
      metadata: {
        userId: "private-owner",
        inputContent: "private nested source",
        publicLabel: "Shared analysis",
      },
      revisions: [
        {
          contentHash: "private-revision-hash",
          summary: "Public revision",
        },
      ],
    };

    expect(toPublicAnalysis(stored)).toEqual({
      id: "analysis-1",
      metadata: { publicLabel: "Shared analysis" },
      revisions: [{ summary: "Public revision" }],
    });
    expect(stored.metadata.userId).toBe("private-owner");
    expect(stored.revisions[0].contentHash).toBe("private-revision-hash");
  });

  it("preserves JSON scalars and Date values while returning fresh containers", () => {
    const createdAt = new Date("2026-07-31T12:00:00.000Z");
    const stored = {
      createdAt,
      confidence: 0,
      detectedBiases: null,
      tags: ["public", "reviewed"],
    };

    const projected = toPublicAnalysis(stored);

    expect(projected).toEqual(stored);
    expect(projected).not.toBe(stored);
    expect(projected.tags).not.toBe(stored.tags);
    expect(projected.createdAt).toBe(createdAt);
  });
});
