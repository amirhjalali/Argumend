import { describe, expect, it } from "vitest";
import { topicSummaries } from "@/data/topicIndex";
import { prefilterTopics, stem, tokenize } from "./prefilter";
import { RENT_CONTROL_THREAD } from "./__fixtures__/rentControlThread";

describe("tokenize", () => {
  it("lowercases, drops stopwords and singularises", () => {
    expect(tokenize("The Landlords should maintain their Policies")).toEqual([
      "landlord",
      "maintain",
    ]);
  });

  it("drops punctuation and strips common suffixes", () => {
    expect(tokenize("Auckland's upzoning, 15%!")).toEqual(["auckland'", "upzon", "15"]);
  });

  it("stems a thread's word onto a map's word", () => {
    // The miss that kept the immigration clip out of the shortlist.
    expect(tokenize("immigrants")).toEqual(tokenize("immigration"));
    expect(tokenize("cultural")).toEqual(tokenize("culture"));
    expect(tokenize("landlords")).toEqual(tokenize("landlord"));
  });

  it("does not over-stem short words into each other", () => {
    expect(tokenize("police")).not.toEqual(tokenize("policies"));
    expect(stem("data")).toBe("data");
  });

  it("returns nothing for text with no content words", () => {
    expect(tokenize("the and of to a")).toEqual([]);
  });
});

describe("prefilterTopics", () => {
  it("puts the rent-control map first for the rent-control thread", () => {
    const candidates = prefilterTopics(RENT_CONTROL_THREAD);
    expect(candidates[0].id).toBe("rent-control-effectiveness");
    expect(candidates).toHaveLength(8);
    expect(candidates[0].score).toBeGreaterThan(candidates[1].score);
  });

  it("shortlists the immigration map for an immigration argument", () => {
    const candidates = prefilterTopics(
      "Immigrants have a duty to uphold the host society's norms. You can come to this country and keep your own culture. Requiring conformity is bigoted. Assimilation, diversity and national identity.",
    );
    expect(candidates.map((candidate) => candidate.id)).toContain("immigration-national-identity");
  });

  it("respects the limit and keeps the order stable", () => {
    const first = prefilterTopics(RENT_CONTROL_THREAD, { limit: 3 });
    const second = prefilterTopics(RENT_CONTROL_THREAD, { limit: 3 });
    expect(first).toHaveLength(3);
    expect(first).toEqual(second);
  });

  it("returns nothing when the text has no scoreable words", () => {
    expect(prefilterTopics("the and of to a")).toEqual([]);
    expect(prefilterTopics("")).toEqual([]);
  });

  it("scores over a caller-supplied slice of the index", () => {
    const slice = topicSummaries.filter((summary) =>
      ["rent-control-effectiveness", "ai-risk"].includes(summary.id),
    );
    const candidates = prefilterTopics(RENT_CONTROL_THREAD, { summaries: slice });
    expect(candidates[0].id).toBe("rent-control-effectiveness");
    expect(candidates.length).toBeLessThanOrEqual(slice.length);
  });

  it("carries the title and claim a Choice needs", () => {
    const [top] = prefilterTopics(RENT_CONTROL_THREAD);
    expect(top.title).toBe("Does Rent Control Help or Hurt Renters?");
    expect(top.metaClaim.length).toBeGreaterThan(20);
  });
});
