import { describe, expect, it } from "vitest";
import {
  FLAGSHIP_MAP_IDS,
  flagshipFor,
  mapLinkFor,
  pickNextMap,
  topicIdsLinkedIn,
} from "./nextStep";
import { readTime, monthYear } from "./readTime";
import { ARTICLE_KINDS, articleCrumbs } from "./sections";
import { leadSentences } from "./summary";

describe("leadSentences", () => {
  it("adds the second sentence when the first is only a set-up line", () => {
    expect(
      leadSentences("Not all evidence is created equal. A meta-analysis outweighs an anecdote. More."),
    ).toBe("Not all evidence is created equal. A meta-analysis outweighs an anecdote.");
    expect(
      leadSentences("A crux is the specific piece of evidence that would change minds on a debate. More."),
    ).toBe("A crux is the specific piece of evidence that would change minds on a debate.");
  });
});

describe("next-step map", () => {
  it("resolves legacy and flagship maps, and nothing else", () => {
    expect(mapLinkFor("nuclear-energy-safety")?.href).toBe("/topics/nuclear-energy-safety");
    expect(mapLinkFor(FLAGSHIP_MAP_IDS.unemployment)).toEqual({
      href: "/topics/ai-mass-unemployment",
      title: "Will AI cause mass unemployment?",
    });
    expect(mapLinkFor("no-such-map")).toBeUndefined();
  });

  it("reads map links out of markdown, skipping the topic index filters", () => {
    expect(
      topicIdsLinkedIn("See [the map](/topics/climate-change) and [science](/topics/category/science)."),
    ).toEqual(["climate-change"]);
  });

  it("prefers the page's own map, then a linked one, then a flagship", () => {
    expect(pickNextMap({ topicIds: ["free-will"] }).href).toBe("/topics/free-will");
    expect(pickNextMap({ topicIds: ["missing"], text: "[x](/topics/moon-landing)" }).href).toBe(
      "/topics/moon-landing",
    );
    expect(pickNextMap({ keywords: "wages and markets" }).href).toBe("/topics/capitalism-after-ai");
    expect(pickNextMap({ keywords: "steel-manning" }).href).toBe("/topics/ai-mass-unemployment");
    expect(flagshipFor("unemployment and wages").href).toBe("/topics/ai-mass-unemployment");
  });
});

describe("learn vocabulary", () => {
  it("builds Home › Learn › Section › Title crumbs", () => {
    expect(articleCrumbs("fallacy", "Straw Man")).toEqual([
      { label: "Home", href: "/" },
      { label: "Learn", href: "/learn" },
      { label: "Fallacies", href: "/fallacies" },
      { label: "Straw Man" },
    ]);
    expect(Object.values(ARTICLE_KINDS).map((k) => k.eyebrow)).toEqual([
      "Essay",
      "Guide",
      "Idea",
      "Fallacy",
      "Question",
    ]);
  });

  it("reports read time in whole minutes and dates as month and year", () => {
    expect(readTime("word ".repeat(10))).toBe("1 min read");
    expect(readTime("word ".repeat(660))).toBe("3 min read");
    expect(monthYear("2026-06-29T23:59:00Z")).toBe("June 2026");
    expect(monthYear("not a date")).toBeUndefined();
  });
});
