import { describe, expect, it } from "vitest";
import { groundQuotes, locateQuote } from "./grounding";

describe("locateQuote", () => {
  it("finds an exact unique substring", () => {
    expect(locateQuote("Hello world", "world")).toEqual({ start: 6, end: 11 });
  });

  it("drops a quote that appears twice", () => {
    expect(locateQuote("wage wage", "wage")).toBeNull();
  });

  it("matches smart quotes to straight quotes", () => {
    const source = "She said \u201Chello there\u201D today.";
    expect(locateQuote(source, '"hello there"')).not.toBeNull();
  });

  it("matches CRLF source against LF quotes", () => {
    const source = "line one\r\nline two";
    expect(locateQuote(source, "line one\nline two")).not.toBeNull();
  });

  it("matches collapsed whitespace", () => {
    const source = "Immigrants   grow   the economy";
    expect(locateQuote(source, "Immigrants grow the economy")).not.toBeNull();
  });

  it("matches unicode letters", () => {
    const source = "The café is closed";
    expect(locateQuote(source, "café")).toEqual({ start: 4, end: 8 });
  });

  it("rejects quotes that are not present", () => {
    expect(locateQuote("hello", "goodbye")).toBeNull();
  });

  it("rejects model-added ellipses", () => {
    expect(locateQuote("Immigration is destroying wages", "Immigration is...wages")).toBeNull();
  });

  it("is case sensitive", () => {
    expect(locateQuote("Immigration is destroying wages", "immigration is destroying wages")).toBeNull();
  });
});

describe("groundQuotes", () => {
  it("stores offsets and drops missing quotes", () => {
    const result = groundQuotes(
      "Immigration is destroying wages for working-class Americans.",
      [
        { quote: "Immigration is destroying wages" },
        { quote: "not in the source" },
      ],
      "pos-a",
    );
    expect(result.refs).toHaveLength(1);
    expect(result.dropped).toBe(1);
    expect(result.refs[0].start).toBe(0);
    expect(result.warnings.length).toBeGreaterThan(0);
  });
});
