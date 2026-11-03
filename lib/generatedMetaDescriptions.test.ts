import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
  redirect: () => undefined,
  permanentRedirect: () => undefined,
}));

import type { Metadata } from "next";
import { topicSummaries } from "@/data/topicIndex";
import { articleSummaries } from "@/data/blogIndex";
import { guides } from "@/data/guides";
import { concepts } from "@/data/concepts";
import { fallacies } from "@/data/fallacies";
import { argumentTopicIds } from "@/lib/argument/draftTopics";
import { getAllQuestionVariations } from "@/lib/questions";
import { META_DESCRIPTION_MAX } from "@/lib/seoText";
import { generateMetadata as topicMetadata } from "@/app/topics/[id]/page";
import { generateMetadata as blogMetadata } from "@/app/blog/[slug]/page";
import { generateMetadata as guideMetadata } from "@/app/guides/[id]/page";
import { generateMetadata as conceptMetadata } from "@/app/concepts/[slug]/page";
import { generateMetadata as fallacyMetadata } from "@/app/fallacies/[slug]/page";

const props = (params: Record<string, string>) => ({ params: Promise.resolve(params) }) as never;

function expectFits(metadata: Metadata, label: string) {
  const description = String(metadata.description);
  expect(description.length, `${label}: ${description}`).toBeLessThanOrEqual(META_DESCRIPTION_MAX);
}

describe("generated meta descriptions fit in a search result", () => {
  it("topic pages, both models", async () => {
    for (const id of [...topicSummaries.map((t) => t.id), ...argumentTopicIds]) {
      expectFits(await topicMetadata(props({ id })), id);
    }
  });

  it("blog posts", async () => {
    for (const { slug } of articleSummaries) expectFits(await blogMetadata(props({ slug })), slug);
  });

  it("guides, concepts and fallacies", async () => {
    for (const { id } of guides) expectFits(await guideMetadata(props({ id })), id);
    for (const { id } of concepts) expectFits(await conceptMetadata(props({ slug: id })), id);
    for (const { slug } of fallacies) expectFits(await fallacyMetadata(props({ slug })), slug);
  });

  it("question pages", () => {
    for (const variation of getAllQuestionVariations(topicSummaries)) {
      expect(variation.metaDescription.length, variation.slug).toBeLessThanOrEqual(META_DESCRIPTION_MAX);
    }
  });
});

describe("long map titles", () => {
  it("drop the site suffix instead of words when it would push them past 65", async () => {
    for (const topic of topicSummaries) {
      const { title } = await topicMetadata(props({ id: topic.id }));
      const shown = typeof title === "string" ? `${title} | ARGUMEND` : (title as { absolute: string }).absolute;
      if (typeof title !== "string") expect(shown.length + " | ARGUMEND".length).toBeGreaterThan(65);
      else expect(shown.length).toBeLessThanOrEqual(65);
    }
  });
});
