import { describe, expect, it } from "vitest";
import { topicSummaries } from "./topicIndex";
import { topics } from "./topics";
import {
  TOPIC_LOADER_IDS,
  hasTopicLoader,
  loadTopicById,
} from "./topicLoader";

describe("per-topic loader registry", () => {
  it("has exactly one loader for every indexed topic", () => {
    expect(new Set(TOPIC_LOADER_IDS)).toEqual(
      new Set(topicSummaries.map((topic) => topic.id)),
    );
  });

  it("returns null for unknown IDs without selecting a module", async () => {
    expect(hasTopicLoader("not-a-real-topic")).toBe(false);
    await expect(loadTopicById("not-a-real-topic")).resolves.toBeNull();
  });

  it.each(["moon-landing", "ai-risk", "lab-leak-theory"])(
    "normalizes %s identically to the server corpus",
    async (topicId) => {
      const loaded = await loadTopicById(topicId);
      expect(loaded).toEqual(topics.find((topic) => topic.id === topicId));
    },
  );
});
