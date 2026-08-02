import { describe, expect, it } from "vitest";
import { topics } from "./topics";
import { evidenceCitationStats } from "./corpusStats";

describe("lightweight corpus statistics", () => {
  it("matches citation counts recomputed from the full topic corpus", () => {
    const evidence = topics.flatMap((topic) =>
      topic.pillars.flatMap((pillar) => pillar.evidence ?? []),
    );
    const withUrl = evidence.filter(
      (item) =>
        typeof item.sourceUrl === "string" &&
        /^https?:\/\/\S+\.\S+/.test(item.sourceUrl),
    ).length;

    expect(evidenceCitationStats).toMatchObject({
      withUrl,
      total: evidence.length,
    });
  });
});
