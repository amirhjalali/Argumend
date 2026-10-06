import { describe, expect, it } from "vitest";
import { searchQuestions, type QuestionSearchItem } from "./questionSearch";

const ITEMS: QuestionSearchItem[] = [
  { slug: "is-nuclear-energy-safe", question: "Is nuclear energy safe?", topicTitle: "Should nuclear power be expanded?", topicId: "nuclear-energy-safety" },
  { slug: "should-we-build-more-nuclear-power-plants", question: "Should we build more nuclear power plants?", topicTitle: "Should nuclear power be expanded?", topicId: "nuclear-energy-safety" },
  { slug: "is-nuclear-deterrence-safer", question: "Does nuclear deterrence keep us safer?", topicTitle: "Does nuclear deterrence keep the world safer?", topicId: "nuclear-weapons-abolition" },
  { slug: "does-rent-control-work", question: "Does rent control work?", topicTitle: "Does rent control make housing less affordable?", topicId: "rent-control-effectiveness" },
];

describe("searchQuestions", () => {
  it("finds a question by its words, not the whole query as one string", () => {
    expect(searchQuestions(ITEMS, "is nuclear power safe")[0].topicId).toBe("nuclear-energy-safety");
    expect(searchQuestions(ITEMS, "rent contrl")[0].slug).toBe("does-rent-control-work");
  });

  it("lists each map once, as its primary question page", () => {
    const results = searchQuestions(ITEMS, "nuclear power plants");
    // Both phrasings of the energy map match; deterrence holds only one of
    // the three words, under the half a result has to hold.
    expect(results.map((item) => item.topicId)).toEqual(["nuclear-energy-safety"]);
    // The phrasing that matched was the second; the page listed is the primary.
    expect(results[0].slug).toBe("is-nuclear-energy-safe");
  });

  it("returns nothing for an empty or question-words-only query", () => {
    expect(searchQuestions(ITEMS, "  ")).toEqual([]);
    expect(searchQuestions(ITEMS, "is it")).toEqual([]);
  });
});
