import { MetadataRoute } from "next";
import { topics } from "@/data/topics";
import { guides } from "@/data/guides";
import { articles } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://argumend.org";

  // ── Static page last-modified dates ───────────────────────────────────
  // Use explicit dates so every URL doesn't share the same build-time
  // timestamp. Update these when substantial content changes are shipped.
  const staticPageDates: Record<string, string> = {
    "": "2025-12-20",
    "/about": "2025-11-15",
    "/how-it-works": "2025-11-15",
    "/methodology": "2025-11-20",
    "/for-educators": "2025-12-01",
    "/community": "2025-11-10",
    "/analyze": "2025-12-20",
    "/topics": "2025-12-20",
    "/analyses": "2025-12-15",
    "/faq": "2025-12-10",
    "/concepts": "2025-11-20",
    "/guides": "2025-12-05",
    "/library": "2025-12-01",
    "/perspectives": "2025-12-10",
    "/lessons-from-the-deep": "2025-12-05",
    "/research": "2025-12-10",
  };

  const staticPages = Object.entries(staticPageDates).map(([route, date]) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(date),
    changeFrequency:
      route === "" ? ("daily" as const) : ("weekly" as const),
    priority: route === "" ? 1 : route === "/analyze" ? 0.9 : 0.7,
  }));

  // ── Topic detail pages (50 topics) ──────────────────────────────────
  // Stagger dates using topic index so each URL has a unique lastmod.
  // Base date: 2025-12-01. Each topic gets +1 day offset.
  const topicBaseDate = new Date("2025-12-01");
  const topicPages = topics.map((topic, index) => ({
    url: `${baseUrl}/topics/${topic.id}`,
    lastModified: new Date(
      topicBaseDate.getTime() + index * 24 * 60 * 60 * 1000,
    ),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // ── Guide detail pages ────────────────────────────────────────────────
  const guideBaseDate = new Date("2025-11-15");
  const guidePages = guides.map((guide, index) => ({
    url: `${baseUrl}/guides/${guide.id}`,
    lastModified: new Date(
      guideBaseDate.getTime() + index * 24 * 60 * 60 * 1000,
    ),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // ── Concept detail slugs ──────────────────────────────────────────────
  const conceptSlugs = [
    "pillars",
    "cruxes",
    "confidence-scores",
    "verification-status",
    "steel-manning",
  ];
  const conceptBaseDate = new Date("2025-11-20");
  const conceptPages = conceptSlugs.map((slug, index) => ({
    url: `${baseUrl}/concepts/${slug}`,
    lastModified: new Date(
      conceptBaseDate.getTime() + index * 24 * 60 * 60 * 1000,
    ),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // ── Blog pages ────────────────────────────────────────────────────────
  // Blog index uses the most recent article's publish date.
  const latestArticleDate =
    articles.length > 0
      ? new Date(
          Math.max(...articles.map((a) => new Date(a.publishedAt).getTime())),
        )
      : new Date("2025-12-15");

  const blogIndexPage = {
    url: `${baseUrl}/blog`,
    lastModified: latestArticleDate,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  };
  const blogArticlePages = articles.map((a) => ({
    url: `${baseUrl}/blog/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  const blogPages = [blogIndexPage, ...blogArticlePages];

  return [
    ...staticPages,
    ...topicPages,
    ...guidePages,
    ...conceptPages,
    ...blogPages,
  ];
}
