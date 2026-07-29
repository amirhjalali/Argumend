import { describe, it, expect } from "vitest";
import {
  buildSearchParams,
  BRACKETED_KEYWORD_PATTERN,
  extractBracketedKeyword,
  splitByBracketedKeywords,
  isBracketedKeyword,
} from "./utils";

describe("buildSearchParams", () => {
  it("serializes string and number values", () => {
    expect(buildSearchParams({ q: "nuclear", page: 2 }).toString()).toBe(
      "q=nuclear&page=2",
    );
  });

  it("drops undefined and null but keeps falsy zero and empty string", () => {
    const params = buildSearchParams({
      keep: 0,
      empty: "",
      skipUndefined: undefined,
      skipNull: null,
    });
    expect(params.get("keep")).toBe("0");
    expect(params.get("empty")).toBe("");
    expect(params.has("skipUndefined")).toBe(false);
    expect(params.has("skipNull")).toBe(false);
    expect([...params.keys()]).toEqual(["keep", "empty"]);
  });

  it("URL-encodes values", () => {
    expect(buildSearchParams({ q: "a b&c=d" }).toString()).toBe("q=a+b%26c%3Dd");
  });

  it("returns an empty params object for {} and for all-nullish input", () => {
    expect(buildSearchParams({}).toString()).toBe("");
    expect(buildSearchParams({ a: undefined, b: null }).toString()).toBe("");
  });

  it("returns a real URLSearchParams instance", () => {
    expect(buildSearchParams({ a: "1" })).toBeInstanceOf(URLSearchParams);
  });
});

describe("extractBracketedKeyword", () => {
  it("unwraps a bracketed keyword", () => {
    expect(extractBracketedKeyword("{Steelman}")).toBe("Steelman");
  });

  it("returns null for unbracketed text", () => {
    expect(extractBracketedKeyword("Steelman")).toBeNull();
    expect(extractBracketedKeyword("{Steelman")).toBeNull();
    expect(extractBracketedKeyword("Steelman}")).toBeNull();
  });

  it("returns an empty string for the empty pair", () => {
    expect(extractBracketedKeyword("{}")).toBe("");
  });

  it("preserves inner whitespace and casing", () => {
    expect(extractBracketedKeyword("{ Base Rate }")).toBe(" Base Rate ");
  });
});

describe("isBracketedKeyword", () => {
  it("recognizes bracketed parts", () => {
    expect(isBracketedKeyword("{Crux}")).toBe(true);
    expect(isBracketedKeyword("{}")).toBe(true);
  });

  it("rejects plain text and half-bracketed text", () => {
    expect(isBracketedKeyword("Crux")).toBe(false);
    expect(isBracketedKeyword("{Crux")).toBe(false);
    expect(isBracketedKeyword("Crux}")).toBe(false);
    expect(isBracketedKeyword("")).toBe(false);
  });

  it("agrees with extractBracketedKeyword on every part of a split", () => {
    const parts = splitByBracketedKeywords("A {Crux} and a {Steelman} walk in");
    for (const part of parts) {
      expect(isBracketedKeyword(part)).toBe(extractBracketedKeyword(part) !== null);
    }
  });
});

describe("splitByBracketedKeywords", () => {
  it("keeps the delimiters (capture group) so text can be reassembled", () => {
    const parts = splitByBracketedKeywords("A {Crux} and a {Steelman} walk in");
    expect(parts.join("")).toBe("A {Crux} and a {Steelman} walk in");
    expect(parts.filter(isBracketedKeyword)).toEqual(["{Crux}", "{Steelman}"]);
  });

  it("returns the whole string as one part when there are no brackets", () => {
    expect(splitByBracketedKeywords("plain text")).toEqual(["plain text"]);
  });

  it("is non-greedy — adjacent keywords stay separate", () => {
    const parts = splitByBracketedKeywords("{A}{B}");
    expect(parts.filter(isBracketedKeyword)).toEqual(["{A}", "{B}"]);
  });

  it("round-trips arbitrary content", () => {
    const inputs = [
      "",
      "{OnlyKeyword}",
      "leading text {K}",
      "{K} trailing text",
      "no braces at all",
    ];
    for (const input of inputs) {
      expect(splitByBracketedKeywords(input).join("")).toBe(input);
    }
  });
});

describe("BRACKETED_KEYWORD_PATTERN", () => {
  it("is global, which makes lastIndex stateful across .test() calls", () => {
    // Guard against reusing the shared regex with .test()/.exec() — the global
    // flag carries lastIndex between calls. Consumers must use .split()/.match()
    // or reset lastIndex. This test documents that hazard.
    expect(BRACKETED_KEYWORD_PATTERN.global).toBe(true);
    BRACKETED_KEYWORD_PATTERN.lastIndex = 0;
    expect(BRACKETED_KEYWORD_PATTERN.test("{A}{B}")).toBe(true);
    expect(BRACKETED_KEYWORD_PATTERN.lastIndex).toBeGreaterThan(0);
    BRACKETED_KEYWORD_PATTERN.lastIndex = 0;
  });

  it("matches each bracketed group non-greedily", () => {
    expect("{A} x {B}".match(BRACKETED_KEYWORD_PATTERN)).toEqual(["{A}", "{B}"]);
  });
});
