import { describe, expect, it } from "vitest";
import { articleSummaries } from "@/data/blogIndex";
import { topicSummaries } from "@/data/topicIndex";
import { getAllQuestionVariations } from "@/lib/questions";
import sitemap from "./sitemap";
import { generateMetadata as topicMetadata } from "./topics/[id]/page";
import { generateMetadata as blogMetadata } from "./blog/[slug]/page";
import { generateMetadata as questionMetadata } from "./questions/[slug]/page";
import { metadata as privacyMetadata } from "./privacy/page";
import { metadata as termsMetadata } from "./terms/page";

function canonicalOf(metadata: Awaited<ReturnType<typeof topicMetadata>>) {
  return metadata.alternates?.canonical;
}

describe("canonical URL contracts", () => {
  const sitemapUrls = new Set(sitemap().map((entry) => entry.url));

  it("keeps every topic canonical aligned with the sitemap", async () => {
    for (const topic of topicSummaries) {
      const expected = `https://argumend.org/topics/${topic.id}`;
      const metadata = await topicMetadata({
        params: Promise.resolve({ id: topic.id }),
      });
      expect(canonicalOf(metadata)).toBe(expected);
      expect(sitemapUrls.has(expected)).toBe(true);
    }
  });

  it("keeps the legal canonicals self-aligned and advertised in the sitemap", () => {
    for (const [path, metadata] of [
      ["/privacy", privacyMetadata],
      ["/terms", termsMetadata],
    ] as const) {
      const expected = `https://argumend.org${path}`;
      expect(metadata.alternates?.canonical).toBe(expected);
      expect(sitemapUrls.has(expected)).toBe(true);
    }
  });

  it("keeps every blog canonical self-aligned and out of the pruned sitemap", async () => {
    for (const article of articleSummaries) {
      const expected = `https://argumend.org/blog/${article.slug}`;
      const metadata = await blogMetadata({
        params: Promise.resolve({ slug: article.slug }),
      });
      expect(metadata.alternates?.canonical).toBe(expected);
      // Blog is HIDDEN in docs/PRODUCT_PRUNING_AUDIT.md: pages still serve
      // with self-canonicals, but the sitemap must not advertise them.
      expect(sitemapUrls.has(expected)).toBe(false);
    }
  });

  it("points every question phrasing's canonical at its map's primary question", async () => {
    // One page per map: the primary phrasing is self-canonical and the other
    // phrasings canonicalize to it (/is/* redirects there too; see
    // lib/learn/isToQuestions.test.ts).
    const variations = getAllQuestionVariations(topicSummaries);
    for (const question of variations) {
      const primary = variations.find((v) => v.topicId === question.topicId && v.primary)!;
      const expected = `https://argumend.org/questions/${primary.slug}`;
      const metadata = await questionMetadata({
        params: Promise.resolve({ slug: question.slug }),
      });
      expect(metadata.alternates?.canonical).toBe(expected);
    }
  });
});
