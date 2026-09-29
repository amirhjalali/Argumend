import { describe, expect, it } from "vitest";
import { MAP_REPLY_LIMITS } from "./constants";
import { chunkTurns } from "./chunk";
import { parseThread } from "./parse";
import { RENT_CONTROL_THREAD } from "./__fixtures__/rentControlThread";

function turns(count: number) {
  return Array.from({ length: count }, (_unused, index) => ({
    index,
    speaker: `user${index}`,
    text: "text",
    wordCount: 20,
  }));
}

describe("chunkTurns", () => {
  it("defaults to eight turns per request", () => {
    expect(MAP_REPLY_LIMITS.turnsPerRequest).toBe(8);
    const chunks = chunkTurns(turns(20));
    expect(chunks.map((chunk) => chunk.length)).toEqual([8, 8, 4]);
  });

  it("keeps the original turn indices so answers can be keyed globally", () => {
    const chunks = chunkTurns(turns(10));
    expect(chunks[1].map((turn) => turn.index)).toEqual([8, 9]);
  });

  it("puts the rent-control thread in a single request", () => {
    const parsed = parseThread(RENT_CONTROL_THREAD);
    expect(chunkTurns(parsed.substantive)).toHaveLength(1);
  });

  it("returns nothing for no turns", () => {
    expect(chunkTurns([])).toEqual([]);
  });

  it("never produces a zero-sized chunk, whatever it is asked for", () => {
    expect(chunkTurns(turns(3), 0).map((chunk) => chunk.length)).toEqual([1, 1, 1]);
    expect(chunkTurns(turns(3), -5).map((chunk) => chunk.length)).toEqual([1, 1, 1]);
  });

  it("loses no turn when splitting", () => {
    const all = turns(41);
    const flat = chunkTurns(all).flat();
    expect(flat).toEqual(all);
  });
});
