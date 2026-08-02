import { describe, expect, it } from "vitest";
import mockDebates from "./mockDebates.json";
import {
  MOCK_DEBATE_TOPIC_IDS,
  hasMockDebate,
} from "./mockDebateIndex";

describe("mock debate availability index", () => {
  it("stays aligned with the lazy-loaded example corpus", () => {
    expect([...MOCK_DEBATE_TOPIC_IDS].sort()).toEqual(
      Object.keys(mockDebates).sort(),
    );
  });

  it("answers availability without importing debate messages", () => {
    expect(hasMockDebate("ai-risk")).toBe(true);
    expect(hasMockDebate("not-a-real-topic")).toBe(false);
    expect(hasMockDebate(undefined)).toBe(false);
  });
});
