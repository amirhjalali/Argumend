import { describe, it, expect } from "vitest";
import { faqs } from "./faqs";

const allText = (f: (typeof faqs)[number]) =>
  [f.question, f.answer, f.linkText ?? ""].join(" ");

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

describe("faqs describe the product as it works today", () => {
  it("stays a short list of product questions (reference terms live in the glossary)", () => {
    expect(faqs.length).toBeLessThanOrEqual(14);
    // "What is the Gish gallop?"-style questions belong to /glossary and /fallacies.
    const productDefinitions = new Set(["What is Argumend?", "What is a crux?"]);
    const glossaryShaped = faqs.filter(
      (f) => /^What (is|are) /i.test(f.question) && !productDefinitions.has(f.question),
    );
    expect(glossaryShaped.map((f) => f.question)).toEqual([]);
  });

  it("never mentions retired features: judges, confidence scores, sign-in, pillars as a fixed count", () => {
    const retired =
      /judge council|multi-judge|multi-model judge|AI judges?\b|confidence scores?|sign in|three pillars|interactive graph/i;
    for (const f of faqs) {
      expect(allText(f), f.question).not.toMatch(retired);
    }
  });

  it("never frames Argumend as naming a winner or settling who is right", () => {
    const winnerFraming =
      /find out who is right|who won|settle the debate|verdict matrix|win an argument/i;
    for (const f of faqs) {
      expect(allText(f), f.question).not.toMatch(winnerFraming);
    }
  });

  it("answers the questions a first-time visitor asks", () => {
    const questions = faqs.map((f) => f.question).join("\n");
    expect(questions).toMatch(/What is Argumend\?/);
    expect(questions).toMatch(/crux/i);
    expect(questions).toMatch(/who is right/i);
    expect(questions).toMatch(/paste/i);
    expect(questions).toMatch(/save/i);
    expect(questions).toMatch(/correction/i);
  });
});
