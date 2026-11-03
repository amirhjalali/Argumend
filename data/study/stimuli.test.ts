import { describe, expect, it } from "vitest";
import { loadTopicById } from "@/data/topicLoader";
import { STUDY_TOPICS } from "@/lib/study/constants";
import { STUDY_INSTRUMENTS } from "./instruments";
import {
  ARM_A_VISIBLE_WORDS,
  ARTICLE_STIMULI,
  CHATBOT_STIMULI,
  LENGTH_TOLERANCE,
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
    const mapText = JSON.stringify(await mapOf(topic));
    for (const stimulus of texts) {
      for (const token of numbers(stimulusText(stimulus))) {
        expect(mapText.includes(token), `${stimulus.arm} uses ${token}, which is not in the map`).toBe(true);
      }
    }
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
