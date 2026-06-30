import { describe, it, expect } from "vitest";

import { articles } from "@/data/blog";
import { articleSummaries } from "@/data/blogIndex";

/**
 * Sync guard for the lightweight blog index.
 *
 * `data/blogIndex.ts` holds standalone literals (it deliberately does NOT
 * import `data/blog.ts`, so client bundles stay small). The price of that
 * decoupling is drift risk: a new post added to `data/blog.ts` won't show up
 * in search unless a matching summary is added here too.
 *
 * These tests turn that drift into a CI failure: every article must have
 * exactly one matching summary (and vice-versa), with identical
 * title/description/tags/category.
 */
describe("blog index is in sync with data/blog", () => {
  const articlesBySlug = new Map(articles.map((a) => [a.slug, a]));
  const summariesBySlug = new Map(articleSummaries.map((s) => [s.slug, s]));

  it("has no duplicate slugs in either source", () => {
    expect(articlesBySlug.size).toBe(articles.length);
    expect(summariesBySlug.size).toBe(articleSummaries.length);
  });

  it("has exactly one summary per article (no orphans either way)", () => {
    expect(articleSummaries.length).toBe(articles.length);

    const articleSlugs = [...articlesBySlug.keys()].sort();
    const summarySlugs = [...summariesBySlug.keys()].sort();
    expect(summarySlugs).toEqual(articleSlugs);
  });

  it("every article's summary matches title/description/tags/category", () => {
    for (const article of articles) {
      const summary = summariesBySlug.get(article.slug);
      expect(summary, `missing summary for "${article.slug}"`).toBeDefined();
      if (!summary) continue;

      expect(summary.title, article.slug).toBe(article.title);
      expect(summary.description, article.slug).toBe(article.description);
      expect(summary.category, article.slug).toBe(article.category);
      expect(summary.tags, article.slug).toEqual(article.tags);
      expect(summary.publishedAt, article.slug).toBe(article.publishedAt);
      expect(summary.readingTime, article.slug).toBe(article.readingTime);
    }
  });

  it("has no summary without a backing article (orphan summaries)", () => {
    for (const summary of articleSummaries) {
      expect(
        articlesBySlug.has(summary.slug),
        `orphan summary "${summary.slug}" has no matching article`
      ).toBe(true);
    }
  });
});
