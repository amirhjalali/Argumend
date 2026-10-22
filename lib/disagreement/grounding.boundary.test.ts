import { describe, expect, it } from "vitest";
import { groundQuotes, locateQuote } from "./grounding";

describe("quote location boundaries", () => {
  it.each([
    {
      source: "😀 Alice: The 🧪 trial passed.",
      quote: "🧪 trial passed.",
      matched: "🧪 trial passed.",
    },
    {
      source: "🧑🏽‍🔬 Zoë: “Café\u00a0☕ is open.”",
      quote: '"Café ☕ is open."',
      matched: "“Café\u00a0☕ is open.”",
    },
    {
      source: "Zoë: cafe\u0301 quality improved.",
      quote: "cafe\u0301 quality",
      matched: "cafe\u0301 quality",
    },
    {
      source: "Maya:\r\nThe pilot\r\nreduced    delays.",
      quote: "The pilot\nreduced delays.",
      matched: "The pilot\r\nreduced    delays.",
    },
    {
      source: "Budget: 2\u202f000 dollars.",
      quote: "2 000 dollars.",
      matched: "2\u202f000 dollars.",
    },
  ])("keeps source offsets for $quote", ({ source, quote, matched }) => {
    const located = locateQuote(source, quote);

    expect(located).toEqual({ start: source.indexOf(matched), end: source.indexOf(matched) + matched.length });
    expect(source.slice(located!.start, located!.end)).toBe(matched);
    const result = groundQuotes(source, [{ quote }], "quote");
    expect(result.refs[0]).toMatchObject({ quote, ...located });
  });

  it("drops an identical quotation repeated by two speakers without assigning either occurrence", () => {
    const source = "Alice: We support this.\nBob: We support this.";

    const result = groundQuotes(source, [
      { quote: "We support this.", participantId: "alice" },
      { quote: "We support this.", participantId: "bob" },
    ], "quote");

    expect(result.refs).toEqual([]);
    expect(result.dropped).toBe(2);
  });

  it("drops an ambiguous normalized quotation when neither occurrence is an exact match", () => {
    const source = "Alice: We support this.\nBob: We   support this.";

    expect(locateQuote(source, "We\t support this.")).toBeNull();
  });

  it("preserves the documented precedence of a unique exact match", () => {
    const source = "Alice: We support this.\nBob: We   support this.";
    const quote = "We support this.";

    expect(locateQuote(source, quote)).toEqual({ start: source.indexOf(quote), end: source.indexOf(quote) + quote.length });
  });
});
