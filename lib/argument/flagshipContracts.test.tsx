import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { render, within } from "@testing-library/react";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { DebateView } from "@/components/argument/DebateView";
import type { ArgumentNode, Claim } from "@/types/argument";
import { loadArgumentTopic } from "./draftTopics";
import { argumentTopicIds, argumentTopicIndex } from "./topicIds";
import {
  ARGUMENT_TOPICS_FIRST_PUBLISHED,
  ARGUMENT_TOPICS_LAST_UPDATED,
} from "@/lib/site";

const HERO_WIDTH = 1600;
const HERO_HEIGHT = 1066;

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value !== null && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).flatMap(collectStrings);
  }
  return [];
}

function claimFor(nodes: ArgumentNode[], claimId: string): Claim {
  const node = nodes.find((candidate) => candidate.id === claimId);
  expect(node, `missing crux claim ${claimId}`).toBeDefined();
  expect(node?.type, `crux ${claimId} must resolve to a claim`).toBe("claim");
  return node as Claim;
}

describe("flagship debate-map contracts", () => {
  it("keeps honest flagship publication and review dates separate from corpus fallbacks", () => {
    expect(ARGUMENT_TOPICS_FIRST_PUBLISHED).toBe("2026-08-11");
    expect(ARGUMENT_TOPICS_LAST_UPDATED).toBe("2026-08-12");
    expect(ARGUMENT_TOPICS_FIRST_PUBLISHED <= ARGUMENT_TOPICS_LAST_UPDATED).toBe(true);
  });

  it("keeps the draft registry and lightweight discovery index in exact parity", () => {
    expect(new Set(argumentTopicIndex.map(({ id }) => id))).toEqual(
      new Set(argumentTopicIds),
    );
    expect(new Set(argumentTopicIds).size).toBe(argumentTopicIds.length);
    expect(new Set(argumentTopicIndex.map(({ id }) => id)).size).toBe(
      argumentTopicIndex.length,
    );

    const indexById = new Map<
      string,
      (typeof argumentTopicIndex)[number]
    >(argumentTopicIndex.map((entry) => [entry.id, entry]));
    for (const topicId of argumentTopicIds) {
      const topic = loadArgumentTopic(topicId);
      const indexEntry = indexById.get(topicId);

      expect(topic, `registered topic ${topicId} must load`).not.toBeNull();
      expect(indexEntry, `registered topic ${topicId} must be discoverable`).toBeDefined();
      expect(topic!.graph.topicId).toBe(topicId);
      expect(topic!.meta).toMatchObject({
        id: indexEntry!.id,
        title: indexEntry!.title,
        tagline: indexEntry!.tagline,
      });
    }
  });

  it("gives every emitted crux an effective question, resolution, authored stakes, and a relevant neighbor", () => {
    for (const topicId of argumentTopicIds) {
      const topic = loadArgumentTopic(topicId)!;
      const nodeById = new Map(topic.graph.nodes.map((node) => [node.id, node]));

      expect(topic.cruxes.length, `${topicId} must emit cruxes`).toBeGreaterThan(0);
      for (const crux of topic.cruxes) {
        const claim = claimFor(topic.graph.nodes, crux.claimId);
        const note = topic.meta.cruxNotes?.[crux.claimId];
        const summaryQuestion = claim.summary?.trim().endsWith("?")
          ? claim.summary.trim()
          : undefined;
        const effectiveQuestion = note?.question?.trim() || summaryQuestion;

        expect(
          effectiveQuestion,
          `${topicId}/${crux.claimId} needs an authored question or a question-form summary`,
        ).toBeDefined();
        expect(effectiveQuestion!.endsWith("?")).toBe(true);
        expect(effectiveQuestion!.length).toBeLessThanOrEqual(140);

        expect(
          claim.resolution,
          `${topicId}/${crux.claimId} needs an explicit resolution contract`,
        ).toBeDefined();
        expect(claim.resolution!.condition.trim().length).toBeGreaterThan(20);

        expect(
          note,
          `${topicId}/${crux.claimId} needs authored fight and soWhat copy`,
        ).toBeDefined();
        expect(note!.fight.trim().length).toBeGreaterThan(20);
        expect(note!.soWhat.trim().length).toBeGreaterThan(20);

        const relevantNeighbors = topic.graph.edges
          .filter((edge) => edge.from === crux.claimId || edge.to === crux.claimId)
          .map((edge) =>
            nodeById.get(edge.from === crux.claimId ? edge.to : edge.from),
          )
          .filter(
            (node): node is ArgumentNode =>
              node !== undefined && (node.type === "claim" || node.type === "evidence"),
          );
        expect(
          relevantNeighbors.length,
          `${topicId}/${crux.claimId} needs a direct evidence or claim relationship`,
        ).toBeGreaterThan(0);
      }
    }
  });

  it("ships decodable JPEG heroes whose intrinsic and rendered dimensions agree", async () => {
    const publicRoot = path.resolve(process.cwd(), "public");

    for (const topicId of argumentTopicIds) {
      const topic = loadArgumentTopic(topicId)!;
      const hero = topic.meta.hero;
      expect(hero, `${topicId} needs a hero`).toBeDefined();
      expect(hero!.src).toMatch(/^\/topics\/[a-z0-9-]+\.jpg$/);
      expect(hero!.alt.trim().length).toBeGreaterThan(20);

      const heroPath = path.resolve(publicRoot, hero!.src.slice(1));
      expect(heroPath.startsWith(`${publicRoot}${path.sep}`)).toBe(true);
      expect((await stat(heroPath)).isFile()).toBe(true);

      const image = sharp(await readFile(heroPath));
      const metadata = await image.metadata();
      expect(metadata).toMatchObject({
        format: "jpeg",
        width: HERO_WIDTH,
        height: HERO_HEIGHT,
      });
      // Force a complete decode so a plausible JPEG header cannot conceal a
      // truncated or otherwise corrupt payload.
      await expect(image.raw().toBuffer()).resolves.not.toHaveLength(0);

      const rendered = render(
        <DebateView meta={topic.meta} graph={topic.graph} cruxes={topic.cruxes} />,
      );
      const renderedHero = within(rendered.container).getByAltText(hero!.alt);
      expect(renderedHero.getAttribute("width")).toBe(String(HERO_WIDTH));
      expect(renderedHero.getAttribute("height")).toBe(String(HERO_HEIGHT));
      rendered.unmount();
    }
  });

  it("keeps dated Israel figures and the rescinded NSM-20 out of the present tense", () => {
    const israelTopic = loadArgumentTopic("us-israel-support")!;
    const israelIndex = argumentTopicIndex.find(
      ({ id }) => id === "us-israel-support",
    );
    const strings = collectStrings([israelTopic.meta, israelIndex]);
    const combined = strings.join("\n");

    const hundredPlusMentions = strings.filter(
      (text) => text.includes("100+") && text.trim() !== "100+",
    );
    expect(hundredPlusMentions.length).toBeGreaterThan(0);
    for (const mention of hundredPlusMentions) {
      expect(
        mention,
        `100+ military-sales copy needs its own calendar date: ${mention}`,
      ).toMatch(/100\+[\s\S]{0,140}\b20\d{2}\b/);
    }
    for (const highlight of israelTopic.meta.highlights.filter(({ fact }) =>
      fact.includes("100+"),
    )) {
      expect(`${highlight.fact} ${highlight.context}`).toMatch(
        /100\+[\s\S]{0,140}\b20\d{2}\b/,
      );
    }

    expect(combined).toMatch(/NSM-20[\s\S]{0,180}rescind|rescind[\s\S]{0,180}NSM-20/i);
    expect(combined).toMatch(/February 2025/i);
    expect(combined).not.toMatch(
      /(?:current|existing|still[- ]applicable|in force|in effect)\s+NSM-20|NSM-20\s+(?:currently|still)\s+(?:requires|applies|governs|remains)/i,
    );
    expect(combined).not.toMatch(
      /(?:death|casualty|fatality)[\s\S]{0,80}(?:toplines?|totals?|figures?)[\s\S]{0,50}(?:sharp(?:ly)?\s+diverg|far apart)|(?:sharp(?:ly)?\s+diverg)[\s\S]{0,80}(?:death|casualty|fatality|toplines?)/i,
    );
  });

  it("describes Stanford's 16% result as employment change, never a hiring-rate decline", () => {
    const aiTopic = loadArgumentTopic("ai-mass-unemployment")!;
    const aiIndex = argumentTopicIndex.find(
      ({ id }) => id === "ai-mass-unemployment",
    );
    const resultMentions = collectStrings([aiTopic.meta, aiIndex]).filter((text) =>
      /(?:−|-|~)?16%/.test(text),
    );

    expect(resultMentions.length).toBeGreaterThan(0);
    for (const mention of resultMentions) {
      expect(mention).not.toMatch(/hiring[- ]rate|rate of hiring|hiring[^.]{0,80}(?:down|declin|fell|fall)|(?:down|declin|fell|fall)[^.]{0,80}hiring/i);
    }

    const highTravelMentions = [
      aiIndex?.tagline,
      aiTopic.meta.tagline,
      aiTopic.meta.hook,
      aiTopic.meta.shareCard?.right.label,
      aiTopic.meta.highlights.find(({ fact }) => fact.includes("16%"))?.context,
      aiTopic.meta.closer?.take,
    ];
    for (const mention of highTravelMentions) {
      expect(mention).toMatch(/employ(?:ment|ed)/i);
    }
  });
});
