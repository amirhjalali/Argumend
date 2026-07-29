import { describe, it, expect } from "vitest";
import { topics } from "@/data/topics";
import { getAllQuestionVariations } from "@/lib/questions";
import { categoryColors, categoryTopBorder } from "@/lib/categoryColors";
import {
  questionCategories,
  getQuestionCategoryMeta,
  questionKinds,
  questionKindOrder,
  classifyQuestion,
  getQuestionKindIcon,
} from "./questionMeta";

const allQuestions = getAllQuestionVariations(topics);

describe("questionMeta — category axis", () => {
  it("covers every category actually present in the topic catalog", () => {
    const used = new Set(topics.map((t) => t.category));
    expect(used.size).toBeGreaterThan(0);
    for (const category of used) {
      expect(Object.keys(questionCategories)).toContain(category);
    }
  });

  it("gives each category a distinct icon", () => {
    const icons = Object.values(questionCategories).map((c) => c.icon);
    expect(new Set(icons).size).toBe(icons.length);
  });

  it("gives each category a distinct chip and accent, so no two read alike", () => {
    const chips = Object.values(questionCategories).map((c) => c.chip);
    expect(new Set(chips).size).toBe(chips.length);

    const accents = Object.values(questionCategories).map((c) => c.accentText);
    expect(new Set(accents).size).toBe(accents.length);
  });

  it("stays in lockstep with categoryColors — no forked palette", () => {
    for (const [id, meta] of Object.entries(questionCategories)) {
      expect(meta.chip).toBe(
        categoryColors[id as keyof typeof categoryColors]
      );
      expect(meta.topBorder).toBe(
        categoryTopBorder[id as keyof typeof categoryTopBorder]
      );
    }
  });

  it("uses only on-brand color families (no amber/indigo/violet/sky)", () => {
    const banned =
      /(amber|tangerine|orange|yellow|indigo|violet|sky|purple|pink|green|blue|emerald|cyan|teal-)/;
    for (const meta of Object.values(questionCategories)) {
      const classes = [
        meta.chip,
        meta.iconBg,
        meta.iconText,
        meta.accentText,
        meta.ruleBorder,
        meta.topBorder,
      ].join(" ");
      expect(classes).not.toMatch(banned);
    }
  });

  it("falls back to policy for an unknown category rather than throwing", () => {
    expect(getQuestionCategoryMeta("not-a-category")).toBe(
      questionCategories.policy
    );
    expect(getQuestionCategoryMeta("science")).toBe(questionCategories.science);
  });
});

describe("questionMeta — kind axis", () => {
  it("orders every kind exactly once", () => {
    expect([...questionKindOrder].sort()).toEqual(
      Object.keys(questionKinds).sort()
    );
  });

  it("gives each kind a distinct icon", () => {
    const icons = Object.values(questionKinds).map((k) => k.icon);
    expect(new Set(icons).size).toBe(icons.length);
  });

  it("classifies grammatical forms by their leading interrogative", () => {
    expect(classifyQuestion("Does gun control reduce violence?").id).toBe(
      "empirical"
    );
    expect(classifyQuestion("Should drugs be decriminalized?").id).toBe(
      "normative"
    );
    expect(classifyQuestion("Will lab-grown meat replace farming?").id).toBe(
      "predictive"
    );
    expect(classifyQuestion("Why is housing so expensive?").id).toBe(
      "explanatory"
    );
  });

  it("treats value-laden 'Is X …?' questions as normative, not empirical", () => {
    // These wear empirical grammar but turn on values — the normative test
    // must run before the leading-word test for them to land correctly.
    expect(classifyQuestion("Is capital punishment morally justified?").id).toBe(
      "normative"
    );
    expect(
      classifyQuestion("Is it fair for trans women to compete?").id
    ).toBe("normative");
    expect(classifyQuestion("Are reparations for slavery justified?").id).toBe(
      "normative"
    );
  });

  it("is total — every question in the live catalog gets a real kind", () => {
    expect(allQuestions.length).toBeGreaterThan(100);
    for (const v of allQuestions) {
      const kind = classifyQuestion(v.question);
      expect(Object.values(questionKinds)).toContain(kind);
      expect(getQuestionKindIcon(v.question)).toBe(kind.icon);
    }
  });

  it("actually differentiates the catalog — every kind has real members", () => {
    const counts = new Map<string, number>();
    for (const v of allQuestions) {
      const id = classifyQuestion(v.question).id;
      counts.set(id, (counts.get(id) ?? 0) + 1);
    }
    for (const id of questionKindOrder) {
      // A bucket nobody lands in would be decoration, not a taxonomy.
      expect(counts.get(id) ?? 0).toBeGreaterThan(5);
    }
  });

  it("is case- and whitespace-insensitive", () => {
    expect(classifyQuestion("  SHOULD the minimum wage be raised?  ").id).toBe(
      "normative"
    );
  });
});
