import { MetadataRoute } from "next";
import { topicSummaries, CATEGORY_ORDER } from "@/data/topicIndex";
import { argumentTopicIds } from "@/lib/argument/topicIds";
import {
  ARGUMENT_TOPICS_LAST_UPDATED,
  CONTENT_LAST_UPDATED,
  SITE_URL,
} from "@/lib/site";

export const revalidate = 86400;

/** Mirror of the tag-page slug scheme (lowercase, spaces → hyphens). */
function tagToTopicSlug(tag: string): string {
  return tag.toLowerCase().trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}

/**
 * The sitemap advertises only the pruned CORE surface (see
 * docs/PRODUCT_PRUNING_AUDIT.md): home, Explore/topics, Analyze, and About.
 * Hidden and merge-pending routes still serve when visited directly but are
 * deliberately kept out of the crawlable index so they do not compete with
 * the core pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  // Topic pages have no per-item timestamps in the data model, so we can't
  // fabricate a real per-page freshness signal. Instead we expose ONE honest
  // "content corpus last revised" date.
  const contentLastUpdated = new Date(`${CONTENT_LAST_UPDATED}T00:00:00Z`);
  const argumentTopicsLastUpdated = new Date(
    `${ARGUMENT_TOPICS_LAST_UPDATED}T00:00:00Z`,
  );

  // ── Homepage (priority 1.0) ───────────────────────────────────────────
  const homepage: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: contentLastUpdated,
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  // ── Core listing pages (priority 0.9) ─────────────────────────────────
  const listingPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/topics`,
      lastModified: contentLastUpdated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/analyze`,
      lastModified: contentLastUpdated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // ── Topic detail pages (priority 0.8) ─────────────────────────────────
  const topicPages: MetadataRoute.Sitemap = topicSummaries.map((topic) => ({
    url: `${baseUrl}/topics/${topic.id}`,
    lastModified: contentLastUpdated,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // ── New-model (ArgumentGraph) debate maps — the flagship experience ────
  const argumentTopicPages: MetadataRoute.Sitemap = argumentTopicIds.map((id) => ({
    url: `${baseUrl}/topics/${id}`,
    lastModified: argumentTopicsLastUpdated,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // ── About (priority 0.6) ──────────────────────────────────────────────
  const aboutPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/about`,
      lastModified: contentLastUpdated,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // ── Topic category landing pages (priority 0.7) ───────────────────────
  const topicCategoryPages: MetadataRoute.Sitemap = CATEGORY_ORDER.map(
    (cat) => ({
      url: `${baseUrl}/topics/category/${cat}`,
      lastModified: contentLastUpdated,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }),
  );

  // ── Topic tag landing pages (priority 0.6) ────────────────────────────
  const topicTagSlugs = Array.from(
    new Set(
      topicSummaries.flatMap((t) => (t.tags ?? []).map(tagToTopicSlug)),
    ),
  ).filter(Boolean);
  const topicTagPages: MetadataRoute.Sitemap = topicTagSlugs.map((slug) => ({
    url: `${baseUrl}/topics/tag/${slug}`,
    lastModified: contentLastUpdated,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    ...homepage,
    ...listingPages,
    ...topicPages,
    ...argumentTopicPages,
    ...aboutPage,
    ...topicCategoryPages,
    ...topicTagPages,
  ];
}
