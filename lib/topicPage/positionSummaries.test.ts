/**
 * "Says yes / Says no" summaries on the legacy topic pages (round-9 note,
 * fixed 2026-11-02).
 *
 * Each side's one-sentence summary was the opening sentence of its first
 * pillar text, whatever it said. Often that opening was a fact the map
 * lists under "What both sides already agree on" ("CO₂ levels have
 * fluctuated naturally throughout Earth's history" as the no side's case on
 * climate change; "Even the Hubble telescope cannot see the flags" on the
 * Moon landings). A summary now comes from the side's own text only, and
 * skips a sentence that restates an agreed fact (lib/topicPage/legacy.ts,
 * positionSummary): twelve of 298 summaries changed, and five openings the
 * detector flags were read and kept (./agreedFacts.distinct.ts). These tests
 * read every legacy map.
 */
import { describe, expect, it } from "vitest";
import { topicSummaries } from "@/data/topicIndex";
import { loadTopicById } from "@/data/topicLoader";
import type { Topic } from "@/lib/schemas/topic";
import { DISTINCT_SUMMARY_FROM_AGREED_FACT } from "./agreedFacts.distinct";
import {
  AGREED_FACT_THRESHOLDS,
  agreedFacts,
  agreedShareOfSentence,
  firstSentence,
  legacyTopicPage,
  SIDE_TEXT,
} from "./legacy";

const SIDES = Object.keys(SIDE_TEXT) as (keyof typeof SIDE_TEXT)[];
const OTHER = { supporters: "skeptics", skeptics: "supporters" } as const;

async function legacyMaps(): Promise<Topic[]> {
  const loaded = await Promise.all(topicSummaries.map(({ id }) => loadTopicById(id)));
  return loaded.filter((topic): topic is Topic => topic !== null && topic.pillars.length > 0);
}

describe("legacy position summaries", () => {
  it("draw each side's summary from that side's own case, never the other side's", async () => {
    const wrong: string[] = [];
    for (const topic of await legacyMaps()) {
      for (const card of legacyTopicPage(topic).page.positions) {
        const side = card.id as keyof typeof SIDE_TEXT;
        const own = topic.pillars.map((pillar) => pillar[SIDE_TEXT[side]]);
        const other = topic.pillars.map((pillar) => pillar[SIDE_TEXT[OTHER[side]]]);
        if (!card.summary || !own.some((text) => text.includes(card.summary))) {
          wrong.push(`${topic.id} ${side}: not in its own case: ${card.summary}`);
        } else if (other.some((text) => text.includes(card.summary))) {
          wrong.push(`${topic.id} ${side}: also in the other side's case: ${card.summary}`);
        }
      }
    }
    expect(wrong, wrong.join("\n")).toEqual([]);
  });

  it("never lead a side with an agreed fact", async () => {
    const restating: string[] = [];
    for (const topic of await legacyMaps()) {
      const share = agreedShareOfSentence(topic);
      const facts = agreedFacts(topic);
      for (const card of legacyTopicPage(topic).page.positions) {
        const side = card.id as keyof typeof SIDE_TEXT;
        const listed = topic.pillars.some(
          (pillar) =>
            DISTINCT_SUMMARY_FROM_AGREED_FACT[`${topic.id}/${pillar.id}/${side}`] !== undefined &&
            firstSentence(pillar[SIDE_TEXT[side]]) === card.summary,
        );
        if (facts.some((fact) => fact.includes(card.summary) || card.summary.includes(fact))) {
          restating.push(`${topic.id} ${side}: quotes the common ground: ${card.summary}`);
        } else if (!listed && share(card.summary) >= AGREED_FACT_THRESHOLDS.summary) {
          restating.push(`${topic.id} ${side} (${share(card.summary).toFixed(2)}): ${card.summary}`);
        }
      }
    }
    expect(restating, restating.join("\n")).toEqual([]);
  });

  it.each([
    ["climate-change", "skeptics", "CO₂ levels have fluctuated naturally throughout Earth's history."],
    ["moon-landing", "skeptics", "Even the Hubble telescope cannot see the flags or the Lunar Module."],
    ["college-value-proposition", "skeptics", "The headline averages hide enormous variance."],
    ["rent-control-effectiveness", "supporters", "The San Francisco study found that covered landlords reduced rental supply by 15%"],
    ["encryption-backdoors", "skeptics", "A guaranteed access path is itself an attack surface."],
    ["ai-content-labeling", "supporters", "No serious proponent claims watermarks are unbreakable"],
  ] as const)("%s: the %s summary is no longer the agreed fact it used to open with", async (id, side, before) => {
    const topic = (await loadTopicById(id))!;
    const card = legacyTopicPage(topic).page.positions.find((position) => position.id === side)!;
    expect(card.summary.startsWith(before)).toBe(false);
    // Still a sentence of that side's own case.
    expect(topic.pillars.some((pillar) => pillar[SIDE_TEXT[side]].includes(card.summary))).toBe(true);
  });

  it("lists an opening as distinct from an agreed fact only while the detector still flags it", async () => {
    const stale: string[] = [];
    for (const key of Object.keys(DISTINCT_SUMMARY_FROM_AGREED_FACT)) {
      const [id, pillarId, side] = key.split("/") as [string, string, keyof typeof SIDE_TEXT];
      const topic = await loadTopicById(id);
      const pillar = topic?.pillars.find((p) => p.id === pillarId);
      if (!topic || !pillar || !SIDE_TEXT[side]) {
        stale.push(`${key}: no such pillar side`);
        continue;
      }
      const share = agreedShareOfSentence(topic)(firstSentence(pillar[SIDE_TEXT[side]]));
      if (share < AGREED_FACT_THRESHOLDS.summary) stale.push(`${key}: scores ${share.toFixed(2)}`);
    }
    expect(stale, stale.join("\n")).toEqual([]);
  });

  it("keeps SIDES in step with the position cards", async () => {
    const [topic] = await legacyMaps();
    expect(legacyTopicPage(topic).page.positions.map((card) => card.id)).toEqual(SIDES);
  });
});
