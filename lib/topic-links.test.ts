import { describe, it, expect } from "vitest";
import { getTopicMentions, buildTopicLinkTargets, type TextSegment } from "./topic-links";
import type { Topic } from "@/lib/schemas/topic";

const topics = [
  { id: "ai-risk", title: "AI Risk" },
  { id: "ai", title: "AI" },
  { id: "nuclear", title: "Nuclear Energy" },
];

/** Reassemble the segments — must always round-trip to the original text. */
const rejoin = (segments: TextSegment[]) => segments.map((s) => s.content).join("");

describe("getTopicMentions", () => {
  it("returns a single text segment when nothing matches", () => {
    expect(getTopicMentions("nothing relevant here", topics)).toEqual([
      { type: "text", content: "nothing relevant here" },
    ]);
  });

  it("links a matched title and builds the topic href", () => {
    const segments = getTopicMentions("Debating Nuclear Energy today", topics);
    const link = segments.find((s) => s.type === "link");
    expect(link).toMatchObject({
      type: "link",
      content: "Nuclear Energy",
      href: "/topics/nuclear",
      topicTitle: "Nuclear Energy",
    });
  });

  it("prefers the longest title so 'AI' does not shadow 'AI Risk'", () => {
    const segments = getTopicMentions("We should discuss AI Risk seriously", topics);
    const links = segments.filter((s) => s.type === "link");
    expect(links).toHaveLength(1);
    expect(links[0].href).toBe("/topics/ai-risk");
    expect(links[0].content).toBe("AI Risk");
  });

  it("matches case-insensitively but preserves the original casing", () => {
    const segments = getTopicMentions("thoughts on nuclear energy policy", topics);
    const link = segments.find((s) => s.type === "link");
    expect(link?.content).toBe("nuclear energy");
    expect(link?.topicTitle).toBe("Nuclear Energy");
  });

  it("links only the first occurrence of a title", () => {
    const segments = getTopicMentions("AI Risk versus AI Risk again", topics);
    expect(segments.filter((s) => s.type === "link")).toHaveLength(1);
  });

  it("excludes the current topic from linking", () => {
    const segments = getTopicMentions("Nuclear Energy is complex", topics, "nuclear");
    expect(segments.every((s) => s.type === "text")).toBe(true);
  });

  it("respects word boundaries (no partial-word matches)", () => {
    const segments = getTopicMentions("AIrspace regulation", topics);
    expect(segments.filter((s) => s.type === "link")).toHaveLength(0);
  });

  it("links multiple distinct topics in document order", () => {
    const segments = getTopicMentions("Nuclear Energy and AI Risk both matter", topics);
    const links = segments.filter((s) => s.type === "link");
    expect(links.map((l) => l.href)).toEqual(["/topics/nuclear", "/topics/ai-risk"]);
  });

  it("round-trips: segment contents rejoin to the original text", () => {
    const text = "Nuclear Energy and AI Risk both matter a great deal";
    expect(rejoin(getTopicMentions(text, topics))).toBe(text);
  });

  it("round-trips even with no matches or an empty topic list", () => {
    const text = "AI Risk mentioned but no targets registered";
    expect(rejoin(getTopicMentions(text, []))).toBe(text);
    expect(getTopicMentions(text, [])).toEqual([{ type: "text", content: text }]);
  });

  it("escapes regex metacharacters in topic titles", () => {
    // Unescaped, `C++ (the language)` would be an invalid/mismatching pattern
    // (`+` quantifier + a capture group). Escaping makes it match literally.
    const tricky = [{ id: "cpp", title: "C++ (the language) explained" }];
    const segments = getTopicMentions(
      "Discussing C++ (the language) explained today",
      tricky,
    );
    const link = segments.find((s) => s.type === "link");
    expect(link?.href).toBe("/topics/cpp");
    expect(link?.content).toBe("C++ (the language) explained");
  });

  it("KNOWN LIMITATION: titles ending in a non-word char never match", () => {
    // The matcher wraps the escaped title in `\b…\b`. A trailing `\b` requires a
    // word char at the end of the match, so a title like `C++` or `Why now?`
    // silently never links. Documented here so a future fix (e.g. making the
    // boundaries conditional on the title's first/last char) has a red test to
    // flip. Change this assertion when the matcher is fixed.
    const tricky = [{ id: "cpp", title: "C++" }];
    const segments = getTopicMentions("I like C++ a lot", tricky);
    expect(segments.filter((s) => s.type === "link")).toHaveLength(0);
  });

  it("does not produce overlapping links", () => {
    // "AI" sits inside "AI Risk"; the overlap guard must drop the shorter one.
    const segments = getTopicMentions("AI Risk", topics);
    expect(segments).toEqual([
      { type: "link", content: "AI Risk", href: "/topics/ai-risk", topicTitle: "AI Risk" },
    ]);
  });

  it("emits leading and trailing text segments around a mid-string link", () => {
    const segments = getTopicMentions("about AI Risk here", topics);
    expect(segments[0]).toEqual({ type: "text", content: "about " });
    expect(segments[segments.length - 1]).toEqual({ type: "text", content: " here" });
  });
});

describe("buildTopicLinkTargets", () => {
  it("projects topics down to id/title pairs only", () => {
    const full = [
      { id: "a", title: "Alpha", summary: "long text", category: "science" },
      { id: "b", title: "Bravo", summary: "more text", category: "policy" },
    ] as unknown as Topic[];

    const targets = buildTopicLinkTargets(full);
    expect(targets).toEqual([
      { id: "a", title: "Alpha" },
      { id: "b", title: "Bravo" },
    ]);
    expect(Object.keys(targets[0])).toEqual(["id", "title"]);
  });

  it("returns [] for an empty input", () => {
    expect(buildTopicLinkTargets([])).toEqual([]);
  });
});
