import { describe, expect, it } from "vitest";
import {
  articleSummaries,
  blogCategoryToSlug,
  blogTagToSlug,
  getArticleSummaryCategories,
  getArticleSummaryTags,
} from "@/data/blogIndex";
import { topicSummaries } from "@/data/topicIndex";
import { CONTENT_LAST_UPDATED } from "@/lib/site";
import sitemap from "./sitemap";

describe("sitemap", () => {
  const entries = sitemap();
  const urls = entries.map(({ url }) => url);

  it("contains only unique canonical-origin URLs", () => {
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every((url) => url.startsWith("https://argumend.org"))).toBe(
      true,
    );
  });

  it("uses clean canonical URL shapes", () => {
    for (const rawUrl of urls) {
      const url = new URL(rawUrl);
      expect(url.search).toBe("");
      expect(url.hash).toBe("");
      if (url.pathname !== "/") expect(url.pathname.endsWith("/")).toBe(false);
    }
  });

  it("excludes private, account, and embeddable utility surfaces", () => {
    expect(
      urls.some((url) =>
        ["/api/", "/dashboard", "/saved", "/auth/", "/embed/"].some(
          (segment) => url.includes(segment),
        ),
      ),
    ).toBe(false);
  });

  it("includes the public discovery hubs", () => {
    expect(urls).toEqual(
      expect.arrayContaining([
        "https://argumend.org",
        "https://argumend.org/topics",
        "https://argumend.org/blog",
        "https://argumend.org/questions",
        "https://argumend.org/is",
      ]),
    );
  });

  it("covers every lightweight topic and blog index entry", () => {
    for (const topic of topicSummaries) {
      expect(urls).toContain(`https://argumend.org/topics/${topic.id}`);
    }
    for (const article of articleSummaries) {
      expect(urls).toContain(`https://argumend.org/blog/${article.slug}`);
    }
  });

  it("uses the same normalized category and tag slugs as public blog routes", () => {
    for (const category of getArticleSummaryCategories()) {
      expect(urls).toContain(
        `https://argumend.org/blog/category/${blogCategoryToSlug(category)}`,
      );
    }
    for (const tag of getArticleSummaryTags()) {
      expect(urls).toContain(
        `https://argumend.org/blog/tag/${blogTagToSlug(tag)}`,
      );
    }
  });

  it("publishes the current corpus revision date for topic records", () => {
    const expected = new Date(`${CONTENT_LAST_UPDATED}T00:00:00Z`).getTime();
    const topicUrls = new Set(
      topicSummaries.map((topic) =>
        `https://argumend.org/topics/${topic.id}`,
      ),
    );
    const topicEntries = entries.filter((entry) => topicUrls.has(entry.url));

    expect(topicEntries).toHaveLength(topicSummaries.length);
    for (const entry of topicEntries) {
      expect(new Date(entry.lastModified as string | Date).getTime()).toBe(
        expected,
      );
    }
  });
});
