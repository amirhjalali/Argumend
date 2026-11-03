import { MetadataRoute } from "next";
import { topicSummaries } from "@/data/topicIndex";
import {
  articleSummaries,
  blogCategoryToSlug,
  getArticleSummaryCategories,
} from "@/data/blogIndex";
import { argumentTopicIds } from "@/lib/argument/topicIds";
import {
  CONCEPT_ROUTE_SLUGS,
  FALLACY_ROUTE_SLUGS,
  GUIDE_ROUTE_IDS,
  WORKSHEET_ROUTE_IDS,
} from "@/lib/dynamicRoutePolicy";
import { getPrimaryQuestionVariations } from "@/lib/questions";
import { aiPageAsOf } from "./ai/loadAiMaps";
import {
  ARGUMENT_TOPICS_LAST_UPDATED,
  CONTENT_LAST_UPDATED,
  LEGAL_LAST_UPDATED,
  SITE_URL,
} from "@/lib/site";

export const revalidate = 86400;

/**
 * Every indexable page the site links to, at its canonical URL: home, the
 * maps (both models), /analyze, /ai, the /learn hub and everything that
 * hangs off it (blog, guides, ideas, fallacies, glossary, questions), the
 * story and method pages (/about, /methodology, /faq, /research,
 * /perspectives), /for-educators and its worksheets, and the legal pages.
 *
 * Left out on purpose: URLs that redirect (/guides, /concepts, retired
 * concepts and maps; next.config.js), noindex pages (diagrams, blog tags,
 * /reply, /saved, embeds, reports), other phrasings of a question (they
 * canonicalise to the primary), and paginated or filtered list views.
 * app/sitemap.test.ts checks each listed URL against the redirects, the
 * proxy's 404 policy and the page's own robots and canonical metadata.
 *
 * Dates come from the data where it has them (a post's publishedAt, the AI
 * ledgers, the legal revision date); otherwise the corpus revision date.
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

  // ── Learn: the hub, and the pages that hang off it ────────────────────
  const entry = (
    path: string,
    priority: number,
    lastModified: Date = contentLastUpdated,
    changeFrequency: "weekly" | "monthly" = "monthly",
  ): MetadataRoute.Sitemap[number] => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });
  const dayOf = (iso: string) => new Date(`${iso.slice(0, 10)}T00:00:00Z`);
  const latest = (dates: readonly string[]) =>
    dayOf(dates.reduce((a, b) => (a > b ? a : b)));

  const learnPages: MetadataRoute.Sitemap = [
    entry("/learn", 0.7, contentLastUpdated, "weekly"),
    entry("/glossary", 0.5),
    entry("/fallacies", 0.6),
    ...GUIDE_ROUTE_IDS.map((id) => entry(`/guides/${id}`, 0.6)),
    ...CONCEPT_ROUTE_SLUGS.map((slug) => entry(`/concepts/${slug}`, 0.6)),
    ...FALLACY_ROUTE_SLUGS.map((slug) => entry(`/fallacies/${slug}`, 0.5)),
  ];

  // ── Blog: dated by the posts themselves ───────────────────────────────
  const blogPages: MetadataRoute.Sitemap = [
    entry("/blog", 0.6, latest(articleSummaries.map((a) => a.publishedAt)), "weekly"),
    ...articleSummaries.map((article) => entry(`/blog/${article.slug}`, 0.6, dayOf(article.publishedAt))),
    ...getArticleSummaryCategories().map((category) =>
      entry(
        `/blog/category/${blogCategoryToSlug(category)}`,
        0.4,
        latest(articleSummaries.filter((a) => a.category === category).map((a) => a.publishedAt)),
      ),
    ),
  ];

  // ── Questions: one page per map, its primary phrasing ─────────────────
  // The other phrasings canonicalise to it, so they are not listed.
  const questionPages: MetadataRoute.Sitemap = [
    entry("/questions", 0.7, contentLastUpdated, "weekly"),
    ...getPrimaryQuestionVariations(topicSummaries).map((variation) =>
      entry(`/questions/${variation.slug}`, 0.6),
    ),
  ];

  // ── Story, method and teaching pages ──────────────────────────────────
  const infoPages: MetadataRoute.Sitemap = [
    entry("/methodology", 0.6),
    entry("/faq", 0.5),
    entry("/research", 0.5),
    entry("/perspectives", 0.4),
    entry("/for-educators", 0.5),
    ...WORKSHEET_ROUTE_IDS.map((id) => entry(`/for-educators/worksheets/${id}`, 0.4)),
  ];

  return [
    ...homepage,
    ...listingPages,
    ...topicPages,
    ...argumentTopicPages,
    ...aiPage,
    ...aboutPage,
    ...learnPages,
    ...blogPages,
    ...questionPages,
    ...infoPages,
    ...legalPages,
  ];
}
