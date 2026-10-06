/**
 * Learn speaks the maps' vocabulary (r3 review issue #9, fixed in r4).
 *
 * The 2026-09-29 overhaul retired side scores, card scores, "pillars",
 * verdicts and the judge council from the interface. Learn kept teaching
 * them. This guard reads every piece of Learn copy a reader can reach (the
 * core ideas, both glossaries, the guides, the fallacy catalogue and the
 * product FAQ) and fails if any of it brings the retired vocabulary back.
 *
 * The patterns are phrases, not bare words: "weight", "score", "verdict" and
 * "winner" all have honest uses ("weighing evidence", "a Brier score", "the
 * map won't give you a verdict"), and a fallacy may well be named after one.
 * What is banned is the product's old scoring language. /methodology is not
 * scanned: it is where the older maps' internal reading is still explained,
 * because it is still how those maps are made.
 */
import { describe, expect, it } from "vitest";
import { concepts } from "@/data/concepts";
import { fallacies } from "@/data/fallacies";
import { faqs } from "@/data/faqs";
import { glossaryPageTerms } from "@/data/glossaryPageTerms";
import { GLOSSARY_TERMS } from "@/data/glossaryTerms";
import { guides } from "@/data/guides";

/** Every string inside a value, however deeply nested. */
function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

const SOURCES: Record<string, { label: string; text: string }[]> = {
  concepts: concepts.map((c) => ({ label: c.id, text: strings(c).join("\n") })),
  glossary: glossaryPageTerms.map((t) => ({ label: t.term, text: strings(t).join("\n") })),
  tooltips: GLOSSARY_TERMS.map((t) => ({ label: t.term, text: strings(t).join("\n") })),
  guides: guides.map((g) => ({ label: g.id, text: strings(g).join("\n") })),
  fallacies: fallacies.map((f) => ({ label: f.slug, text: strings(f).join("\n") })),
  faqs: faqs.map((f) => ({ label: f.question, text: strings(f).join("\n") })),
};

const RETIRED: { name: string; pattern: RegExp }[] = [
  { name: "pillars", pattern: /\bpillars?\b/i },
  { name: "balance and weight", pattern: /\bbalance\s*(and|&)\s*weight\b|\bbalance from weight\b/i },
  {
    name: "a score for evidence, a side or a card",
    pattern: /\b(balance|weight|evidence|confidence|card|strength|reliability|replicability|directness|independence) scores?\b/i,
  },
  { name: "the 0–40 card score", pattern: /\bout of 40\b|\b\d+\s*\/\s*40\b|score of 40\b|scored (from )?0\s*(to|-|–)\s*10\b/i },
  { name: "the balance formula", pattern: /\b(for|against)Strength\b/ },
  {
    name: "the old card words",
    pattern: /\bEstablished, Strong\b|\brated (Established|Strong|Contested|Thin)\b/,
  },
  {
    name: "the judge council",
    pattern: /\bjudg(e|ing) council\b|\bcouncil of (AI )?judges\b|\bfour-judge\b|\bmulti-(model|judge) (judg|council)|\bAI judges?\b/i,
  },
  { name: "verdicts as a feature", pattern: /\bverdict (matrix|card|panel)\b|\bthe map'?s verdict\b|\bAI verdicts?\b/i },
  {
    name: "the old crux status trio",
    pattern: /\bverified\b[^.]{0,80}\btheoretical\b[^.]{0,80}\bimpossible\b/i,
  },
  { name: "links to retired idea pages", pattern: /\/concepts\/(pillars|confidence-calibration)\b/ },
];

describe("Learn copy never teaches retired scoring vocabulary", () => {
  for (const [source, items] of Object.entries(SOURCES)) {
    it(`${source}: no retired terms`, () => {
      expect(items.length).toBeGreaterThan(0);
      const hits: string[] = [];
      for (const { label, text } of items) {
        for (const { name, pattern } of RETIRED) {
          const match = text.match(pattern);
          if (match) hits.push(`${label}: ${name} ("${match[0]}")`);
        }
      }
      expect(hits).toEqual([]);
    });
  }

  it("the guard itself catches what it bans and spares honest uses", () => {
    const caught = (text: string) => RETIRED.some(({ pattern }) => pattern.test(text));
    for (const bad of [
      "Each pillar has a crux.",
      "Read the map's balance and weight.",
      "Every card carries an evidence score out of 40.",
      "Each dimension is scored 0-10.",
      "Cards rated Established count most.",
      "A four-judge council reads the map.",
      "Statuses: verified (tested), theoretical (testable), or impossible.",
      "See [pillars](/concepts/pillars).",
    ]) {
      expect(caught(bad), bad).toBe(true);
    }
    for (const fine of [
      "Weighing evidence means asking how far it should move you.",
      "The appeal to weight of numbers is a fallacy.",
      "Keep score with a Brier score.",
      "The map won't give you a verdict.",
      "It never names a winner.",
      "A study that has been verified twice.",
    ]) {
      expect(caught(fine), fine).toBe(false);
    }
  });
});

describe("Learn defines a crux one way, the way the maps use it", () => {
  const DEFINITION = "the question a fight turns on, and what would settle it";

  it("the core idea, the glossary, the tooltip and the FAQ all lead with it", () => {
    const crux = concepts.find((c) => c.id === "cruxes")!;
    expect(crux.description.startsWith(`A crux is ${DEFINITION}.`)).toBe(true);
    expect(crux.keyPoints[0]).toBe(`A crux is ${DEFINITION}`);

    const glossary = glossaryPageTerms.find((t) => t.term === "Crux")!;
    expect(glossary.definition.startsWith("The question a fight turns on, and what would settle it.")).toBe(true);

    const tooltip = GLOSSARY_TERMS.find((t) => t.term === "Crux")!;
    expect(tooltip.definition).toBe("The question a fight turns on, and what would settle it.");

    const faq = faqs.find((f) => f.question === "What is a crux?")!;
    expect(faq.answer.startsWith(`A crux is ${DEFINITION}.`)).toBe(true);
  });

  it("never calls a crux a piece of evidence", () => {
    const texts = [
      ...SOURCES.concepts,
      ...SOURCES.glossary,
      ...SOURCES.tooltips,
      ...SOURCES.guides,
      ...SOURCES.faqs,
    ];
    for (const { label, text } of texts) {
      expect(text, label).not.toMatch(/\bcrux (is|was) (the|a) (specific )?piece of evidence\b/i);
      expect(text, label).not.toMatch(/\bcrux is the specific evidence\b/i);
    }
  });

  it("names a real flagship crux and only the statuses the maps show", () => {
    const crux = concepts.find((c) => c.id === "cruxes")!.description;
    // A crux question as the AI unemployment map words it.
    expect(crux).toContain("When AI makes a firm more productive, does it hire fewer people — or just sell more?");
    // The ledger's labels (components/argument/CruxMovement.tsx), verbatim.
    for (const label of ["Open", "Narrowed", "Resolved", "Unresolvable by evidence", "Still open", "How this has moved"]) {
      expect(crux).toContain(label);
    }
    // The settle line's own words (components/topic/cruxPrimitives.tsx).
    expect(crux).toContain("Nothing does");
    expect(crux).toContain("Not yet specified.");
  });
});
