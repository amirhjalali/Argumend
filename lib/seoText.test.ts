import { describe, expect, it } from "vitest";
import { META_DESCRIPTION_MAX, TITLE_MAX, fitMetaDescription, templatedTitle } from "./seoText";

describe("fitMetaDescription", () => {
  it("returns text that fits as written, whitespace collapsed", () => {
    expect(fitMetaDescription("A short line.\n  Another.")).toBe("A short line. Another.");
  });

  it("ends at the last whole sentence that fits", () => {
    const first = "a".repeat(100) + ".";
    const text = `${first} ${"b".repeat(80)} ends here.`;
    expect(fitMetaDescription(text)).toBe(first);
  });

  it("cuts at a word with an ellipsis when no sentence end is close enough", () => {
    const text = `${"word ".repeat(40).trim()}.`;
    const fitted = fitMetaDescription(text);
    expect(fitted.length).toBeLessThanOrEqual(META_DESCRIPTION_MAX);
    expect(fitted.endsWith("word…")).toBe(true);
  });

  it("never leaves a dangling comma or dash before the ellipsis", () => {
    const text = `${"x".repeat(150)}, — ${"y".repeat(30)}`;
    expect(fitMetaDescription(text)).toBe(`${"x".repeat(150)}…`);
  });
});

describe("templatedTitle", () => {
  it("keeps the template for titles that fit with the suffix", () => {
    expect(templatedTitle("Is nuclear energy safe?")).toBe("Is nuclear energy safe?");
  });

  it("drops the suffix, not words, for a long title", () => {
    const long = "Should wealthy countries pay climate reparations to the developing world?";
    expect(long.length + " | ARGUMEND".length).toBeGreaterThan(TITLE_MAX);
    expect(templatedTitle(long)).toEqual({ absolute: long });
  });
});
