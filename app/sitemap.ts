import { MetadataRoute } from "next";
import { topics } from "@/data/topics";
import { guides } from "@/data/guides";
import {
  articles,
  getUniqueCategories,
  getUniqueTags,
  categoryToSlug,
  tagToSlug,
} from "@/data/blog";
import { getAllQuestionVariations } from "@/lib/questions";
import { COMPARISON_PAIRS } from "@/app/topics/compare/comparisonPairs";
import { isClaims } from "@/data/is-claims";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://argumend.org";

  // ── Homepage (priority 1.0) ───────────────────────────────────────────
  const homepage: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date("2026-03-18"),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  // ── High-traffic listing pages (priority 0.9) ────────────────────────
  const listingPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/topics`,
      lastModified: new Date("2026-03-18"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date("2026-03-18"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // ── Content hub pages (priority 0.8) ──────────────────────────────────
  const latestArticleDate =
    articles.length > 0
      ? new Date(
          Math.max(...articles.map((a) => new Date(a.publishedAt).getTime())),
        )
      : new Date("2025-12-15");

  const hubPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: latestArticleDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date("2025-12-05"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/topics/compare`,
      lastModified: new Date("2026-03-18"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // ── Topic detail pages (priority 0.8) ─────────────────────────────────
  const topicBaseDate = new Date("2026-03-01");
  const topicPages: MetadataRoute.Sitemap = topics.map((topic, index) => ({
    url: `${baseUrl}/topics/${topic.id}`,
    lastModified: new Date(
      topicBaseDate.getTime() + index * 24 * 60 * 60 * 1000,
    ),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // ── Blog articles (priority 0.7) ──────────────────────────────────────
  const blogArticlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}/blog/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // ── Guide detail pages (priority 0.7) ─────────────────────────────────
  const guideBaseDate = new Date("2025-11-15");
  const guidePages: MetadataRoute.Sitemap = guides.map((guide, index) => ({
    url: `${baseUrl}/guides/${guide.id}`,
    lastModified: new Date(
      guideBaseDate.getTime() + index * 24 * 60 * 60 * 1000,
    ),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // ── Comparison pages (priority 0.7) ───────────────────────────────────
  const comparisonPages: MetadataRoute.Sitemap = COMPARISON_PAIRS.map(
    ([id1, id2], index) => ({
      url: `${baseUrl}/topics/compare/${id1}/vs/${id2}`,
      lastModified: new Date(
        topicBaseDate.getTime() + index * 24 * 60 * 60 * 1000,
      ),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  // ── Question pages (priority 0.7) ─────────────────────────────────────
  const questionVariations = getAllQuestionVariations(topics);
  const questionPages: MetadataRoute.Sitemap = questionVariations.map(
    (v, index) => ({
      url: `${baseUrl}/questions/${v.slug}`,
      lastModified: new Date(
        topicBaseDate.getTime() + index * 24 * 60 * 60 * 1000,
      ),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  // ── "Is [claim] true?" pages (priority 0.7) ──────────────────────────
  const isClaimPages: MetadataRoute.Sitemap = isClaims.map((c, index) => ({
    url: `${baseUrl}/is/${c.slug}`,
    lastModified: new Date(
      topicBaseDate.getTime() + index * 24 * 60 * 60 * 1000,
    ),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // ── Glossary (priority 0.7) ───────────────────────────────────────────
  const glossaryPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/glossary`,
      lastModified: new Date("2026-03-17"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // ── Concept detail pages (priority 0.7) ───────────────────────────────
  const conceptSlugs = [
    "pillars",
    "cruxes",
    "confidence-scores",
    "verification-status",
    "steel-manning",
  ];
  const conceptBaseDate = new Date("2025-11-20");
  const conceptPages: MetadataRoute.Sitemap = conceptSlugs.map(
    (slug, index) => ({
      url: `${baseUrl}/concepts/${slug}`,
      lastModified: new Date(
        conceptBaseDate.getTime() + index * 24 * 60 * 60 * 1000,
      ),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  // ── Informational / secondary pages (priority 0.6) ────────────────────
  const secondaryPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2025-11-15"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date("2025-11-15"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/methodology`,
      lastModified: new Date("2025-11-20"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/for-educators`,
      lastModified: new Date("2025-12-01"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/perspectives`,
      lastModified: new Date("2025-12-10"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/community`,
      lastModified: new Date("2025-11-10"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/research`,
      lastModified: new Date("2025-12-10"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/library`,
      lastModified: new Date("2025-12-01"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/concepts`,
      lastModified: new Date("2025-11-20"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date("2025-12-10"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/lessons-from-the-deep`,
      lastModified: new Date("2025-12-05"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // ── Educator worksheets (priority 0.6) ────────────────────────────────
  const worksheetIds = [
    "argument-map-template",
    "steel-man-challenge",
    "evidence-evaluation-rubric",
    "crux-finder",
  ];
  const worksheetPages: MetadataRoute.Sitemap = worksheetIds.map((id) => ({
    url: `${baseUrl}/for-educators/worksheets/${id}`,
    lastModified: new Date("2025-12-01"),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // ── Blog category pages (priority 0.6) ────────────────────────────────
  const blogCategoryPages: MetadataRoute.Sitemap = getUniqueCategories().map(
    (cat) => ({
      url: `${baseUrl}/blog/category/${categoryToSlug(cat)}`,
      lastModified: latestArticleDate,
      changeFrequency: "weekly",
      priority: 0.6,
    }),
  );

  // ── Blog tag pages (priority 0.5) ─────────────────────────────────────
  const blogTagPages: MetadataRoute.Sitemap = getUniqueTags().map((tag) => ({
    url: `${baseUrl}/blog/tag/${tagToSlug(tag)}`,
    lastModified: latestArticleDate,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  // ── Tool pages (priority 0.5) ─────────────────────────────────────────
  // Note: /embed/[topicId] pages are excluded — they set robots noindex
  // because they are designed for iframe embedding, not direct visits.
  const toolPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/analyze`,
      lastModified: new Date("2025-12-20"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/analyses`,
      lastModified: new Date("2025-12-15"),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  return [
    ...homepage,
    ...listingPages,
    ...hubPages,
    ...topicPages,
    ...blogArticlePages,
    ...guidePages,
    ...comparisonPages,
    ...questionPages,
    ...isClaimPages,
    ...glossaryPage,
    ...conceptPages,
    ...secondaryPages,
    ...worksheetPages,
    ...blogCategoryPages,
    ...blogTagPages,
    ...toolPages,
  ];
}
