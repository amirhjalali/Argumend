import { describe, expect, it } from "vitest";
import { topics } from "@/data/topics";
import { topicSummaries } from "@/data/topicIndex";
import type { Topic } from "@/lib/schemas/topic";
import { legacyTopicPage } from "./legacy";

/**
 * Authored question headlines (`topic.question`) and crux questions
 * (`crux.question`) on the legacy maps. Both are optional: a map without them
 * passes and renders its label and live disagreement as before. Where they are
 * authored they must read as one short, neutral question — the h1 a visitor
 * sees and the crux they are asked to hold in their head.
 */

// Authoring targets are ~70 (headline) and ~110 (crux) characters; the bounds
// leave a little room so a precise question is not forced into jargon.
const TOPIC_QUESTION_MAX = 90;
const CRUX_QUESTION_MAX = 120;
const MIN_LENGTH = 10;

// The product never names a winner or hands down a verdict (CLAUDE.md,
// north-star plan), so neither may a question.
const FORBIDDEN = [/\bverdicts?\b/i, /\bwinners?\b/i, /\bsettled\b/i, /\bwho is right\b/i, /\bsettle the debate\b/i];

function problems(text: string, max: number): string[] {
  const out: string[] = [];
  if (text !== text.trim()) out.push("leading or trailing whitespace");
  if (text.length < MIN_LENGTH) out.push(`shorter than ${MIN_LENGTH}`);
  if (text.length > max) out.push(`${text.length} chars > ${max}`);
  if (!text.endsWith("?")) out.push('does not end with "?"');
  if (/\n/.test(text)) out.push("contains a line break");
  if (text[0] !== text[0].toUpperCase()) out.push("does not start with a capital");
  for (const word of FORBIDDEN) if (word.test(text)) out.push(`uses ${word}`);
  return out;
}

describe("authored map questions", () => {
  it("keeps every headline question short, neutral in wording, and a question", () => {
    const failures: string[] = [];
    for (const topic of topics) {
      if (topic.question === undefined) continue;
      for (const p of problems(topic.question, TOPIC_QUESTION_MAX)) {
        failures.push(`${topic.id}: ${p} — ${topic.question}`);
      }
    }
    expect(failures).toEqual([]);
  });

  it("keeps every crux question short, neutral in wording, and a question", () => {
    const failures: string[] = [];
    for (const topic of topics) {
      for (const pillar of topic.pillars) {
        const q = pillar.crux.question;
        if (q === undefined) continue;
        for (const p of problems(q, CRUX_QUESTION_MAX)) {
          failures.push(`${topic.id}/${pillar.id}: ${p} — ${q}`);
        }
      }
    }
    expect(failures).toEqual([]);
  });

  it("authors crux questions for a whole map or not at all", () => {
    // A map that mixes question headings with paragraph headings reads as broken.
    const partial = topics
      .filter((t) => {
        const n = t.pillars.filter((p) => p.crux.question !== undefined).length;
        return n > 0 && n < t.pillars.length;
      })
      .map((t) => t.id);
    expect(partial).toEqual([]);
  });

  it("does not repeat a crux question within a map", () => {
    for (const topic of topics) {
      const qs = topic.pillars.map((p) => p.crux.question).filter((q): q is string => !!q);
      expect(new Set(qs).size, topic.id).toBe(qs.length);
    }
  });

  it("carries each headline question into the summaries the lists read", () => {
    // data/topicSummaries.json is generated (scripts/regen-summaries.ts); a
    // stale file would show the old label on /topics and search.
    const byId = new Map(topicSummaries.map((s) => [s.id, s]));
    for (const topic of topics) {
      expect(byId.get(topic.id)?.question, topic.id).toBe(topic.question);
    }
  });

  it("the library's first crux matches the map page's first crux heading", () => {
    // Regenerate with `npx tsx scripts/regen-summaries.ts` when this fails.
    const byId = new Map(topicSummaries.map((s) => [s.id, s]));
    for (const topic of topics) {
      expect(byId.get(topic.id)?.firstCrux, topic.id).toBe(legacyTopicPage(topic).cruxes[0]?.question);
    }
  });
});

describe("legacyTopicPage with authored questions", () => {
  const authored = topics.find(
    (t) => t.question && t.pillars.some((p) => p.crux.question && p.crux.falsification?.live_disagreement),
  );

  it("heads the page and each crux with the authored question, keeping the live disagreement beneath", () => {
    if (!authored) return; // nothing authored yet: the fallback test below covers the page
    const { page, cruxes } = legacyTopicPage(authored);
    expect(page.title).toBe(authored.question);
    expect(page.crumb).toBe(authored.question);
    for (const [index, crux] of cruxes.entries()) {
      const pillar = authored.pillars[index];
      if (!pillar.crux.question) continue;
      expect(crux.question).toBe(pillar.crux.question);
      const live = pillar.crux.falsification?.live_disagreement;
      if (live) {
        expect(crux.runIns[0]).toEqual({ lead: "Where the fight is.", text: live.trim() });
      }
    }
  });

  it("falls back to the label, the live disagreement, then the crux title when nothing is authored", () => {
    const source = authored ?? topics[0];
    const bare: Topic = {
      ...source,
      question: undefined,
      pillars: source.pillars.map((p) => ({ ...p, crux: { ...p.crux, question: undefined } })),
    };
    const { page, cruxes } = legacyTopicPage(bare);
    expect(page.title).toBe(source.title);
    for (const [index, crux] of cruxes.entries()) {
      const c = bare.pillars[index].crux;
      expect(crux.question).toBe(c.falsification?.live_disagreement?.trim() || c.title);
      expect(crux.runIns.some((r) => r.lead === "Where the fight is.")).toBe(false);
    }
  });
});
