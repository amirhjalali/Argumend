import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { loadTopicById } from "@/data/topicLoader";
import { STUDY_TOPICS } from "@/lib/study/constants";
import { STUDY_INSTRUMENTS } from "./instruments";
import {
  ARM_A_VISIBLE_WORDS,
  ARTICLE_STIMULI,
  CHATBOT_STIMULI,
  LENGTH_TOLERANCE,
  MAPS_CHECKED,
  stimulusText,
  wordCount,
} from "./stimuli";

async function mapOf(topic: (typeof STUDY_TOPICS)[number]) {
  const map = await loadTopicById(topic);
  if (!map) throw new Error(`missing map ${topic}`);
  return map;
}

/** Every evidence card id and crux id on the map. */
function mapIds(map: Awaited<ReturnType<typeof mapOf>>): Set<string> {
  return new Set(map.pillars.flatMap((pillar) => [pillar.crux.id, ...(pillar.evidence ?? []).map((e) => e.id)]));
}

/** Number tokens as written: 12.8, 44,000, 2.47, 1979. */
function numbers(text: string): string[] {
  return (text.match(/\d[\d,.]*/g) ?? []).map((token) => token.replace(/[.,]+$/, ""));
}

/**
 * Every sentence a reader of the map can see: its strings, without links and
 * ids. Numeric fields (card weights, the keystone's confidence) are left out
 * too, so a "90" in a text cannot pass on `confidence: 90`, or an "890" on
 * the digits inside a source URL. Both happened before 10 Nov 2026.
 */
function mapProse(value: unknown, key = ""): string[] {
  if (typeof value === "string") return /url$/i.test(key) || key === "id" ? [] : [value];
  if (Array.isArray(value)) return value.flatMap((item) => mapProse(item, key));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([childKey, child]) => mapProse(child, childKey));
  }
  return [];
}

describe.each(STUDY_TOPICS)("study texts for %s", (topic) => {
  const texts = [CHATBOT_STIMULI[topic], ARTICLE_STIMULI[topic]];

  it("are labelled with their arm and topic", () => {
    expect(CHATBOT_STIMULI[topic]).toMatchObject({ arm: "chatbot", topic });
    expect(ARTICLE_STIMULI[topic]).toMatchObject({ arm: "article", topic });
  });

  it("match what the topic page shows unexpanded, to within the tolerance", () => {
    const target = ARM_A_VISIBLE_WORDS[topic];
    for (const stimulus of texts) {
      const words = wordCount(stimulusText(stimulus));
      expect(words, `${stimulus.arm} has ${words} words; target ${target}`).toBeGreaterThanOrEqual(
        Math.floor(target * (1 - LENGTH_TOLERANCE)),
      );
      expect(words, `${stimulus.arm} has ${words} words; target ${target}`).toBeLessThanOrEqual(
        Math.ceil(target * (1 + LENGTH_TOLERANCE)),
      );
    }
  });

  it("cite only cards and cruxes that exist on the map", async () => {
    const ids = mapIds(await mapOf(topic));
    for (const stimulus of texts) {
      expect(stimulus.sourceIds.length).toBeGreaterThan(0);
      for (const id of stimulus.sourceIds) expect(ids, `${stimulus.arm}: ${id}`).toContain(id);
    }
  });

  it("use no number the map does not contain", async () => {
    // Whole tokens, not substrings: "90" is not found inside "1990".
    const mapNumbers = new Set(numbers(mapProse(await mapOf(topic)).join("\n")));
    for (const stimulus of texts) {
      for (const token of numbers(stimulusText(stimulus))) {
        expect(mapNumbers.has(token), `${stimulus.arm} uses ${token}, which is not in the map`).toBe(true);
      }
    }
  });

  it("list each cited card and crux once", () => {
    for (const stimulus of texts) {
      expect(new Set(stimulus.sourceIds).size, stimulus.arm).toBe(stimulus.sourceIds.length);
    }
  });

  it("were last read against the map file as it stands now", () => {
    const file = path.join(process.cwd(), "data", "topics", `${topic}.ts`);
    const sha256 = createHash("sha256").update(readFileSync(file)).digest("hex");
    expect(
      sha256,
      `data/topics/${topic}.ts has changed since the study texts were read against it on ${MAPS_CHECKED.date}. ` +
        "Re-read both texts and the crux options in data/study against the map, fix them, " +
        "then record the new hash in MAPS_CHECKED (data/study/stimuli.ts). After the freeze, undo the map edit instead.",
    ).toBe(MAPS_CHECKED.sha256[topic]);
  });

  it("quote no one and name no winner", () => {
    for (const stimulus of texts) {
      const text = stimulusText(stimulus);
      expect(text).not.toMatch(/["“”]/);
      expect(text).not.toMatch(/\b(?:is|are) (?:right|correct)\b|\bthe winner\b|\bwins the (?:argument|debate)\b|\bthe truth is\b/i);
    }
  });
});

describe.each(STUDY_TOPICS)("study measures for %s", (topic) => {
  const instrument = STUDY_INSTRUMENTS[topic];

  it("ask the map's own question", async () => {
    expect(instrument.question).toBe((await mapOf(topic)).question);
  });

  it("have five statements with unique ids", () => {
    expect(instrument.statements).toHaveLength(5);
    expect(new Set(instrument.statements.map((s) => s.id)).size).toBe(5);
  });

  it("score exactly one crux option, and tie every option to a crux on the map", async () => {
    const map = await mapOf(topic);
    const cruxIds = new Set(map.pillars.map((pillar) => pillar.crux.id));
    expect(instrument.cruxOptions.filter((option) => option.crux)).toHaveLength(1);
    expect(instrument.cruxOptions).toHaveLength(4);
    for (const option of instrument.cruxOptions) expect(cruxIds, option.id).toContain(option.mapRef);
  });

  it("paraphrase the crux, so no arm shows the right answer word for word", async () => {
    const map = await mapOf(topic);
    const questions = map.pillars.map((pillar) => (pillar.crux.question ?? "").toLowerCase());
    for (const option of instrument.cruxOptions) {
      expect(questions).not.toContain(option.text.toLowerCase());
    }
    const answer = instrument.cruxOptions.find((option) => option.crux)!.text;
    for (const stimulus of [CHATBOT_STIMULI[topic], ARTICLE_STIMULI[topic]]) {
      expect(stimulusText(stimulus)).not.toContain(answer);
    }
  });
});
