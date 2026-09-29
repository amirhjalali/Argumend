import { MetadataRoute } from "next";
import { topicSummaries } from "@/data/topicIndex";
import { argumentTopicIds } from "@/lib/argument/topicIds";
import { aiPageAsOf } from "./ai/loadAiMaps";
import {
  ARGUMENT_TOPICS_LAST_UPDATED,
  CONTENT_LAST_UPDATED,
  LEGAL_LAST_UPDATED,
  SITE_URL,
} from "@/lib/site";

export const revalidate = 86400;

/**
 * The sitemap advertises only the pruned CORE surface (see
 * docs/PRODUCT_PRUNING_AUDIT.md): home, Explore/topics, Analyze, the living
 * AI map (/ai), and About,
 * plus the two legal pages, which are not discovery surfaces but must be
 * findable. Hidden and merge-pending routes still serve when visited directly
 * but are deliberately kept out of the crawlable index so they do not compete
 * with the core pages.
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

  // ── The living AI map (priority 0.9) ──────────────────────────────────
  // Dated by its ledgers: the latest day any public entry was recorded, the
  // same "as of" the page shows and its JSON-LD carries.
  const aiPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/ai`,
      lastModified: new Date(`${aiPageAsOf()}T00:00:00Z`),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // ── About (priority 0.6) ──────────────────────────────────────────────
  const aboutPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/about`,
      lastModified: contentLastUpdated,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // ── Legal (priority 0.3) ──────────────────────────────────────────────
  // Not discovery surfaces, but they must be crawlable and citable: a policy
  // nobody can find is the same problem as no policy. They carry their own
  // revision date rather than the content corpus date.
  const legalLastUpdated = new Date(`${LEGAL_LAST_UPDATED}T00:00:00Z`);
  const legalPages: MetadataRoute.Sitemap = ["/privacy", "/terms"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: legalLastUpdated,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [
    ...homepage,
    ...listingPages,
    ...topicPages,
    ...argumentTopicPages,
    ...aiPage,
    ...aboutPage,
    ...legalPages,
  ];
}
