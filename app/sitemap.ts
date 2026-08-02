import { MetadataRoute } from "next";
import { guides } from "@/data/guides";
import {
  articleSummaries,
  blogCategoryToSlug,
  blogTagToSlug,
  getArticleSummaryCategories,
  getArticleSummaryTags,
} from "@/data/blogIndex";
import { getAllQuestionVariations } from "@/lib/questions";
import { COMPARISON_PAIRS } from "@/app/topics/compare/comparisonPairs";
import { isClaims } from "@/data/is-claims";
import { getAllFallacySlugs } from "@/data/fallacies";
import { concepts } from "@/data/concepts";
import { topicSummaries, CATEGORY_ORDER } from "@/data/topicIndex";
import { CONTENT_LAST_UPDATED, SITE_URL } from "@/lib/site";

export const revalidate = 86400;

/** Mirror of the tag-page slug scheme (lowercase, spaces → hyphens). */
function tagToTopicSlug(tag: string): string {
  return tag.toLowerCase().trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  // Topics, guides, and concept pages have no per-item timestamps in the data
  // model, so we can't fabricate a real per-page freshness signal. Instead we
  // expose ONE honest "content corpus last revised" date. Bump this whenever
  // the topic/guide/concept corpus is meaningfully updated.
  const contentLastUpdated = new Date(`${CONTENT_LAST_UPDATED}T00:00:00Z`);

  // ── Homepage (priority 1.0) ───────────────────────────────────────────
  const homepage: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: contentLastUpdated,
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  // ── High-traffic listing pages (priority 0.9) ────────────────────────
  const listingPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/topics`,
      lastModified: contentLastUpdated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // ── Content hub pages (priority 0.8) ──────────────────────────────────
  const latestArticleDate =
    articleSummaries.length > 0
      ? new Date(
          Math.max(
            ...articleSummaries.map((a) =>
              new Date(a.publishedAt).getTime(),
            ),
          ),
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
      lastModified: contentLastUpdated,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // ── Topic detail pages (priority 0.8) ─────────────────────────────────
  const topicPages: MetadataRoute.Sitemap = topicSummaries.map((topic) => ({
    url: `${baseUrl}/topics/${topic.id}`,
    lastModified: contentLastUpdated,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // ── Blog articles (priority 0.7) ──────────────────────────────────────
  const blogArticlePages: MetadataRoute.Sitemap = articleSummaries.map((a) => ({
    url: `${baseUrl}/blog/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // ── Guide detail pages (priority 0.7) ─────────────────────────────────
  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.id}`,
    lastModified: contentLastUpdated,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // ── Comparison pages (priority 0.7) ───────────────────────────────────
  const comparisonPages: MetadataRoute.Sitemap = COMPARISON_PAIRS.map(
    ([id1, id2]) => ({
      url: `${baseUrl}/topics/compare/${id1}/vs/${id2}`,
      lastModified: contentLastUpdated,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  // ── Question pages (priority 0.7) ─────────────────────────────────────
  const questionVariations = getAllQuestionVariations(topicSummaries);
  const questionPages: MetadataRoute.Sitemap = questionVariations.map((v) => ({
    url: `${baseUrl}/questions/${v.slug}`,
    lastModified: contentLastUpdated,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // ── "Is [claim] true?" pages (priority 0.7) ──────────────────────────
  const isClaimPages: MetadataRoute.Sitemap = isClaims.map((c) => ({
    url: `${baseUrl}/is/${c.slug}`,
    lastModified: contentLastUpdated,
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
  // Derived from the concepts data so the sitemap can't drift from the real
  // /concepts/[slug] routes (previously hardcoded with two 404 slugs).
  const conceptSlugs = concepts.map((c) => c.id);
  const conceptPages: MetadataRoute.Sitemap = conceptSlugs.map((slug) => ({
    url: `${baseUrl}/concepts/${slug}`,
    lastModified: contentLastUpdated,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // ── Questions + "is it true?" listing pages (priority 0.8) ──────────────
  const questionsListingPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/questions`,
      lastModified: contentLastUpdated,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/is`,
      lastModified: contentLastUpdated,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

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
  const blogCategoryPages: MetadataRoute.Sitemap = getArticleSummaryCategories().map(
    (cat) => ({
      url: `${baseUrl}/blog/category/${blogCategoryToSlug(cat)}`,
      lastModified: latestArticleDate,
      changeFrequency: "weekly",
      priority: 0.6,
    }),
  );

  // ── Blog tag pages (priority 0.5) ─────────────────────────────────────
  const blogTagSlugs = Array.from(
    new Set(getArticleSummaryTags().map(blogTagToSlug)),
  );
  const blogTagPages: MetadataRoute.Sitemap = blogTagSlugs.map((slug) => ({
    url: `${baseUrl}/blog/tag/${slug}`,
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

  // ── Fallacies hub (priority 0.7) ──────────────────────────────────────
  const fallacyPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/fallacies`,
      lastModified: contentLastUpdated,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...getAllFallacySlugs().map((slug) => ({
      url: `${baseUrl}/fallacies/${slug}`,
      lastModified: contentLastUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
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
    ...hubPages,
    ...topicPages,
    ...blogArticlePages,
    ...guidePages,
    ...comparisonPages,
    ...questionsListingPage,
    ...questionPages,
    ...isClaimPages,
    ...glossaryPage,
    ...conceptPages,
    ...secondaryPages,
    ...worksheetPages,
    ...blogCategoryPages,
    ...blogTagPages,
    ...toolPages,
    ...fallacyPages,
    ...topicCategoryPages,
    ...topicTagPages,
  ];
}
