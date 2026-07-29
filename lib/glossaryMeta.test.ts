import { describe, it, expect } from "vitest";
import { glossaryPageTerms, glossaryTermId } from "@/data/glossaryPageTerms";
import {
  GLOSSARY_FALLBACK_ICON,
  glossaryChapterOrder,
  glossaryChapters,
  getGlossaryChapter,
  getGlossaryTermIcon,
  groupTermsByChapter,
} from "./glossaryMeta";

describe("glossaryMeta", () => {
  it("gives every glossary term its own icon (no repeats)", () => {
    const icons = glossaryPageTerms.map((t) => getGlossaryTermIcon(t.term));
    expect(new Set(icons).size).toBe(glossaryPageTerms.length);
  });

  it("maps every glossary term explicitly — nothing falls back", () => {
    const unmapped = glossaryPageTerms
      .filter((t) => getGlossaryTermIcon(t.term) === GLOSSARY_FALLBACK_ICON)
      .map((t) => t.term);
    expect(unmapped).toEqual([]);
  });

  it("returns the fallback icon for a term that isn't in the catalog", () => {
    expect(getGlossaryTermIcon("Not A Real Term")).toBe(GLOSSARY_FALLBACK_ICON);
  });

  it("resolves every term's category to a chapter with a distinct numeral", () => {
    for (const term of glossaryPageTerms) {
      const chapter = getGlossaryChapter(term.category);
      expect(chapter.id).toBe(term.category);
      expect(chapter.numeral).toBeTruthy();
    }
    const numerals = glossaryChapterOrder.map((id) => glossaryChapters[id].numeral);
    expect(new Set(numerals).size).toBe(glossaryChapterOrder.length);
    expect(numerals).toEqual(["I", "II", "III", "IV"]);
  });

  it("groups the full catalog with no duplicates or omissions", () => {
    const groups = groupTermsByChapter(glossaryPageTerms);
    expect(groups).toHaveLength(glossaryChapterOrder.length);

    const total = groups.reduce((sum, g) => sum + g.items.length, 0);
    expect(total).toBe(glossaryPageTerms.length);

    const seen = new Set(groups.flatMap((g) => g.items.map((t) => t.term)));
    expect(seen.size).toBe(glossaryPageTerms.length);
  });

  it("orders groups by glossaryChapterOrder and sorts terms alphabetically", () => {
    const groups = groupTermsByChapter(glossaryPageTerms);
    expect(groups.map((g) => g.chapter.id)).toEqual([...glossaryChapterOrder]);

    for (const group of groups) {
      const names = group.items.map((t) => t.term);
      expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
    }
  });

  it("omits chapters with no terms", () => {
    const coreOnly = glossaryPageTerms.filter((t) => t.category === "core");
    const groups = groupTermsByChapter(coreOnly);
    expect(groups.map((g) => g.chapter.id)).toEqual(["core"]);
  });

  it("keeps every chapter on the four on-brand color tokens", () => {
    const banned = /amber|tangerine|indigo|violet|sky|blue|purple|emerald/;
    for (const id of glossaryChapterOrder) {
      const c = glossaryChapters[id];
      const classes = [c.chip, c.iconBg, c.iconText, c.hoverBorder, c.borderAccent].join(" ");
      expect(classes).not.toMatch(banned);
      expect(classes).toMatch(/deep|rust|crux|skeptic/);
    }
  });

  it("assigns each chapter a different color family", () => {
    const families = glossaryChapterOrder.map(
      (id) => glossaryChapters[id].iconBg.match(/deep|rust|crux|skeptic/)?.[0]
    );
    expect(new Set(families).size).toBe(glossaryChapterOrder.length);
  });
});

describe("glossaryTermId", () => {
  it("produces a unique anchor for every term", () => {
    const ids = glossaryPageTerms.map((t) => glossaryTermId(t.term));
    expect(new Set(ids).size).toBe(glossaryPageTerms.length);
  });

  it("matches the legacy anchor transform (lowercase, hyphens, parens stripped)", () => {
    expect(glossaryTermId("Confidence Score")).toBe("confidence-score");
    expect(glossaryTermId("Correlation vs. Causation")).toBe("correlation-vs.-causation");
    expect(glossaryTermId("Dunning-Kruger Effect")).toBe("dunning-kruger-effect");
    expect(glossaryTermId("A (Test) Term")).toBe("a-test-term");
  });
});
