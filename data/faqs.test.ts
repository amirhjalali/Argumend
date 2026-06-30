import { describe, it, expect } from "vitest";
import { faqs } from "./faqs";

describe("faqs data integrity", () => {
  it("has at least one FAQ", () => {
    expect(faqs.length).toBeGreaterThan(0);
  });

  it("every entry has a non-empty question and answer", () => {
    for (const f of faqs) {
      expect(f.question.trim().length, `empty question`).toBeGreaterThan(0);
      expect(
        f.answer.trim().length,
        `empty answer for: ${f.question}`,
      ).toBeGreaterThan(0);
    }
  });

  it("has unique questions (no duplicate FAQ entries)", () => {
    const questions = faqs.map((f) => f.question);
    expect(new Set(questions).size).toBe(questions.length);
  });

  it("supplies linkText and linkHref together or not at all", () => {
    for (const f of faqs) {
      const hasText = f.linkText !== undefined;
      const hasHref = f.linkHref !== undefined;
      expect(
        hasText,
        `linkText/linkHref mismatch for: ${f.question}`,
      ).toBe(hasHref);
    }
  });

  it("uses only safe link hrefs (internal '/path', anchors, or http(s))", () => {
    const safe = /^(https?:\/\/|\/|#)/;
    for (const f of faqs) {
      if (f.linkHref) {
        expect(f.linkHref, `unsafe href: ${f.linkHref}`).toMatch(safe);
      }
    }
  });
});
