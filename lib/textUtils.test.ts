import { describe, it, expect } from "vitest";
import {
  STOP_WORDS,
  ABSOLUTE_MARKERS,
  EMOTIONAL_MARKERS,
  EVIDENCE_MARKERS,
  clamp,
  normalize,
  splitSentences,
  countMarkers,
  extractKeywords,
  keywordSet,
} from "./textUtils";

describe("clamp", () => {
  it("passes through values already inside the range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
  });

  it("clamps below the minimum and above the maximum", () => {
    expect(clamp(-3, 0, 10)).toBe(0);
    expect(clamp(42, 0, 10)).toBe(10);
  });

  it("works with fractional confidence-style ranges", () => {
    expect(clamp(1.7, 0, 1)).toBe(1);
    expect(clamp(-0.2, 0, 1)).toBe(0);
    expect(clamp(0.55, 0, 1)).toBeCloseTo(0.55);
  });

  it("returns the min when min > max (Math.min wins last)", () => {
    // Documents the actual behaviour of the max(min, min(max, v)) formulation.
    expect(clamp(5, 10, 0)).toBe(10);
  });
});

describe("normalize", () => {
  it("collapses runs of whitespace into single spaces", () => {
    expect(normalize("a    b\t\tc")).toBe("a b c");
  });

  it("collapses newlines and trims the edges", () => {
    expect(normalize("  line one\n\n  line two  ")).toBe("line one line two");
  });

  it("returns an empty string for whitespace-only input", () => {
    expect(normalize("   \n\t ")).toBe("");
  });
});

describe("splitSentences", () => {
  it("splits on terminal punctuation and keeps the punctuation", () => {
    expect(splitSentences("One. Two! Three?")).toEqual(["One.", "Two!", "Three?"]);
  });

  it("normalizes whitespace before splitting", () => {
    expect(splitSentences("  First   thing.\n\nSecond thing.  ")).toEqual([
      "First thing.",
      "Second thing.",
    ]);
  });

  it("returns a single segment when there is no terminal punctuation", () => {
    expect(splitSentences("no punctuation here")).toEqual(["no punctuation here"]);
  });

  it("drops empty segments and returns [] for empty input", () => {
    expect(splitSentences("")).toEqual([]);
    expect(splitSentences("   ")).toEqual([]);
  });

  it("does not split when punctuation is not followed by whitespace", () => {
    // Decimals and abbreviations without a following space stay intact.
    expect(splitSentences("Growth was 3.5% last year.")).toEqual([
      "Growth was 3.5% last year.",
    ]);
  });
});

describe("countMarkers", () => {
  it("counts each distinct marker at most once", () => {
    expect(countMarkers("always always always", ["always"])).toBe(1);
  });

  it("counts distinct markers independently", () => {
    expect(countMarkers("This is always true and never false", ABSOLUTE_MARKERS)).toBe(2);
  });

  it("is case-insensitive", () => {
    expect(countMarkers("ALWAYS", ["always"])).toBe(1);
  });

  it("returns 0 when no marker is present", () => {
    expect(countMarkers("a measured, hedged claim", EMOTIONAL_MARKERS)).toBe(0);
  });

  it("detects the symbolic evidence markers", () => {
    expect(countMarkers("Revenue rose 12% to $4B", EVIDENCE_MARKERS)).toBe(2);
  });
});

describe("extractKeywords", () => {
  it("ranks by frequency and respects the max", () => {
    const text = "nuclear nuclear nuclear reactor reactor safety";
    expect(extractKeywords(text, 2)).toEqual(["nuclear", "reactor"]);
  });

  it("defaults to at most 3 keywords", () => {
    const text = "alpha bravo charlie delta echo foxtrot";
    expect(extractKeywords(text)).toHaveLength(3);
  });

  it("excludes stop words and short tokens", () => {
    const keywords = extractKeywords("the of and is it a cat dog evidence evidence");
    expect(keywords).toContain("evidence");
    expect(keywords).not.toContain("the");
    expect(keywords).not.toContain("cat"); // length 3, below the >3 threshold
  });

  it("strips punctuation and lowercases", () => {
    expect(extractKeywords("Reactors, reactors! REACTORS?", 1)).toEqual(["reactors"]);
  });

  it("returns [] when nothing survives filtering", () => {
    expect(extractKeywords("the a an and or")).toEqual([]);
  });
});

describe("keywordSet", () => {
  it("dedupes tokens and excludes stop words / short tokens", () => {
    const set = keywordSet("Safety safety of the reactor is key");
    expect(set.has("safety")).toBe(true);
    expect(set.has("reactor")).toBe(true);
    expect(set.has("the")).toBe(false);
    expect(set.has("is")).toBe(false);
    expect(set.has("key")).toBe(false); // length 3
    expect(set.size).toBe(2);
  });

  it("returns an empty set for stop-word-only text", () => {
    expect(keywordSet("the and but if then").size).toBe(0);
  });

  it("supports overlap scoring between two texts", () => {
    const a = keywordSet("Nuclear reactors improve grid reliability");
    const b = keywordSet("Grid reliability suffers without reactors");
    const overlap = [...a].filter((t) => b.has(t));
    expect(overlap.sort()).toEqual(["grid", "reactors", "reliability"]);
  });
});

describe("marker/stop-word vocabularies", () => {
  it("STOP_WORDS contains no entry long enough to survive the >3 filter gap", () => {
    // Sanity: extractKeywords only consults STOP_WORDS for tokens of length > 3,
    // so any stop word of length <= 3 is redundant-but-harmless. Assert the set
    // is non-trivial and lowercase so the case-insensitive lookups work.
    expect(STOP_WORDS.size).toBeGreaterThan(20);
    for (const word of STOP_WORDS) {
      expect(word).toBe(word.toLowerCase());
    }
  });

  it("marker lists are lowercase so countMarkers' lowercasing matches", () => {
    for (const marker of [...ABSOLUTE_MARKERS, ...EMOTIONAL_MARKERS, ...EVIDENCE_MARKERS]) {
      expect(marker).toBe(marker.toLowerCase());
    }
  });

  it("marker lists contain no duplicates (duplicates would double-count)", () => {
    for (const list of [ABSOLUTE_MARKERS, EMOTIONAL_MARKERS, EVIDENCE_MARKERS]) {
      expect(new Set(list).size).toBe(list.length);
    }
  });
});
