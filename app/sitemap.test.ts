import { describe, expect, it } from "vitest";
import { topicSummaries } from "@/data/topicIndex";
import { argumentTopicIds } from "@/lib/argument/topicIds";
import {
  ARGUMENT_TOPICS_LAST_UPDATED,
  CONTENT_LAST_UPDATED,
} from "@/lib/site";
import sitemap from "./sitemap";

/**
 * The sitemap advertises only the pruned CORE surface. Hidden and
 * merge-pending routes (docs/PRODUCT_PRUNING_AUDIT.md) must stay out of the
 * crawlable index; these tests pin that boundary so a future edit cannot
 * quietly re-advertise de-linked content to search engines.
 */
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
        ["/api/", "/dashboard", "/saved", "/auth/", "/embed/", "/analyses"].some(
          (segment) => url.includes(segment),
        ),
      ),
    ).toBe(false);
  });

  it("includes only the core discovery surfaces", () => {
    expect(urls).toEqual(
      expect.arrayContaining([
        "https://argumend.org",
        "https://argumend.org/topics",
        "https://argumend.org/analyze",
        "https://argumend.org/about",
      ]),
    );
  });

  it("excludes hidden and merge-pending routes from the pruning audit", () => {
    const deLinkedPrefixes = [
      "/blog",
      "/guides",
      "/glossary",
      "/faq",
      "/concepts",
      "/fallacies",
      "/questions",
      "/is",
      "/topics/compare",
      "/for-educators",
      "/community",
      "/perspectives",
      "/research",
      "/library",
      "/how-it-works",
      "/methodology",
      "/lessons-from-the-deep",
    ];
    for (const prefix of deLinkedPrefixes) {
      const offending = urls.filter((url) =>
        new URL(url).pathname.startsWith(prefix),
      );
      expect(offending, `expected no sitemap entries for ${prefix}`).toEqual(
        [],
      );
    }
  });

  it("covers every lightweight topic index entry", () => {
    for (const topic of topicSummaries) {
      expect(urls).toContain(`https://argumend.org/topics/${topic.id}`);
    }
  });

  it("covers every registered ArgumentGraph map as a high-priority topic", () => {
    const expectedLastModified = new Date(
      `${ARGUMENT_TOPICS_LAST_UPDATED}T00:00:00Z`,
    ).getTime();

    for (const id of argumentTopicIds) {
      const url = `https://argumend.org/topics/${id}`;
      const matchingEntries = entries.filter((entry) => entry.url === url);

      expect(matchingEntries).toHaveLength(1);
      expect(matchingEntries[0].priority).toBe(0.9);
      expect(matchingEntries[0].changeFrequency).toBe("weekly");
      expect(
        new Date(matchingEntries[0].lastModified as string | Date).getTime(),
      ).toBe(expectedLastModified);
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
