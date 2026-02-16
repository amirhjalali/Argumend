import { MetadataRoute } from "next";
import { topics } from "@/data/topics";
import { guides } from "@/data/guides";
import { articles } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://argumend.org";

  // ── Static pages ──────────────────────────────────────────────────────
  const staticPages = [
    "",
    "/about",
    "/how-it-works",
    "/methodology",
    "/for-educators",
    "/community",
    "/analyze",
    "/topics",
    "/analyses",
    "/faq",
    "/concepts",
    "/guides",
    "/library",
    "/perspectives",
    "/lessons-from-the-deep",
    "/research",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency:
      route === "" ? ("daily" as const) : ("weekly" as const),
    priority: route === "" ? 1 : route === "/analyze" ? 0.9 : 0.7,
  }));

  // ── Topic detail pages (38 topics) ────────────────────────────────────
  const topicPages = topics.map((topic) => ({
    url: `${baseUrl}/topics/${topic.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // ── Guide detail pages ────────────────────────────────────────────────
  const guidePages = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.id}`,
    lastModified: new Date(),
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
  const conceptPages = conceptSlugs.map((slug) => ({
    url: `${baseUrl}/concepts/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // ── Blog pages ────────────────────────────────────────────────────────
  const blogIndexPage = {
    url: `${baseUrl}/blog`,
    lastModified: new Date(),
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
