import { describe, expect, it } from "vitest";
import { DEFAULT_RUBRIC } from "./rubric";
import { judgeContentOffline, judgeDebateOffline } from "./offline";
import type { DebateMessageInput as DebateMessage } from "@/types/debate";

const SAMPLE_MESSAGES: DebateMessage[] = [
  {
    side: "for",
    round: 1,
    content:
      "Nuclear energy provides reliable low-carbon electricity. France demonstrates strong emissions outcomes with high nuclear share.",
  },
  {
    side: "against",
    round: 1,
    content:
      "Nuclear projects are expensive and slow to build, and unresolved waste storage increases long-term risk.",
  },
];

describe("judgeDebateOffline", () => {
  it("produces a complete judging result with rubric dimensions", () => {
    const result = judgeDebateOffline(SAMPLE_MESSAGES, "Nuclear Energy");

    expect(result.verdicts.length).toBe(3);
    expect(result.winner === "for" || result.winner === "against" || result.winner === "draw").toBe(true);
    expect(Object.keys(result.aggregatedScores.for.byDimension)).toHaveLength(DEFAULT_RUBRIC.length);
    expect(Object.keys(result.aggregatedScores.against.byDimension)).toHaveLength(DEFAULT_RUBRIC.length);
    expect(result.timestamp).toBeGreaterThan(0);
  });

  it("supports custom model selection", () => {
    const result = judgeDebateOffline(SAMPLE_MESSAGES, "Nuclear Energy", ["grok"]);
    expect(result.verdicts).toHaveLength(1);
    expect(result.verdicts[0].model).toBe("grok");
  });
});

describe("judgeContentOffline", () => {
  it("judges freeform content end-to-end", () => {
    const content = `
      Supporters argue a carbon-free grid needs firm generation with nuclear plants.
      Critics argue build times and costs make expansion impractical.
      The core issue is whether reliability benefits outweigh cost and execution risk.
    `;
    const result = judgeContentOffline(content, "freeform");
    expect(result.verdicts.length).toBe(3);
    expect(result.aggregatedScores.for.average).toBeGreaterThan(0);
    expect(result.aggregatedScores.against.average).toBeGreaterThan(0);
  });
});
