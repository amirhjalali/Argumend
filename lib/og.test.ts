import { describe, expect, it } from "vitest";
import {
  buildGenericOgUrl,
  buildTopicOgUrl,
  isValidTopicOgId,
  truncateOgText,
} from "./og";
import { parseGenericOgUrl } from "./ogQuery";

describe("Open Graph request contracts", () => {
  it("normalizes safe copy and parses a bounded score", () => {
    expect(parseGenericOgUrl(
      "https://argumend.org/api/og?title=%20A%20%20clear%20title%20&subtitle=Evidence%0Amap&verdict=for&score=72.5",
    )).toEqual({
      success: true,
      data: {
        title: "A clear title",
        subtitle: "Evidence map",
        verdict: "for",
        score: 72.5,
      },
    });
  });

  it("rejects ambiguous, unknown, oversized, and out-of-range input", () => {
    expect(parseGenericOgUrl("https://argumend.org/api/og?score=101")).toMatchObject({ success: false, status: 400 });
    expect(parseGenericOgUrl("https://argumend.org/api/og?title=a&title=b")).toMatchObject({ success: false, status: 400 });
    expect(parseGenericOgUrl("https://argumend.org/api/og?redirect=https://example.com")).toMatchObject({ success: false, status: 400 });
    expect(parseGenericOgUrl(`https://argumend.org/api/og?title=${"a".repeat(4100)}`)).toEqual({
      success: false,
      status: 414,
      code: "OG_QUERY_TOO_LARGE",
    });
  });

  it("builds encoded first-party URLs and truncates on Unicode boundaries", () => {
    const url = new URL(buildGenericOgUrl({
      title: "Steel-manning & cruxes",
      subtitle: "A practical guide",
      verdict: "draw",
      score: 50,
    }));
    expect(url.origin + url.pathname).toBe("https://argumend.org/api/og");
    expect(Object.fromEntries(url.searchParams)).toEqual({
      title: "Steel-manning & cruxes",
      subtitle: "A practical guide",
      verdict: "draw",
      score: "50",
    });
    expect(truncateOgText("A😀BC", 3)).toBe("A😀…");
    expect(
      new URL(buildGenericOgUrl({ title: `  ${"x".repeat(300)}  ` })).searchParams.get("title"),
    ).toHaveLength(96);
    expect(() => buildGenericOgUrl({ title: "Invalid", score: 101 })).toThrow(RangeError);
  });

  it("round-trips maximum Unicode copy through the endpoint contract", () => {
    const url = buildGenericOgUrl({
      title: "😀".repeat(200),
      subtitle: "🧭".repeat(300),
      verdict: "for",
      score: 100,
    });

    expect(url.length).toBeLessThanOrEqual(4096);
    expect(parseGenericOgUrl(url)).toMatchObject({ success: true });
  });

  it("accepts only bounded lowercase topic slugs", () => {
    expect(isValidTopicOgId("nuclear-energy-safety")).toBe(true);
    expect(isValidTopicOgId("../secret")).toBe(false);
    expect(isValidTopicOgId("UPPERCASE")).toBe(false);
    expect(isValidTopicOgId(`a${"b".repeat(100)}`)).toBe(false);
    expect(buildTopicOgUrl("nuclear-energy-safety")).toBe(
      "https://argumend.org/api/og/nuclear-energy-safety",
    );
    expect(() => buildTopicOgUrl("../secret")).toThrow(RangeError);
  });
});
