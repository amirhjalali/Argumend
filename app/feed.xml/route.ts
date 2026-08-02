import { articleSummaries } from "@/data/blogIndex";
import { topicSummaries, CATEGORY_LABELS } from "@/data/topicIndex";
import {
  CONTENT_FIRST_PUBLISHED,
  CONTENT_LAST_UPDATED,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

/**
 * Stable fallback publish date for topic items. Topic summaries carry no
 * per-item `addedAt`, so we use a single deterministic constant rather than
 * fabricating recent dates (which would churn the feed on every build).
 */
const TOPIC_PUB_DATE = new Date(
  `${CONTENT_FIRST_PUBLISHED}T00:00:00Z`,
).toUTCString();

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  // Sort a copy: `articles` is a shared module export consumed by pages and
  // sitemap generation, so a feed request must not reorder global state.
  const sortedArticles = [...articleSummaries].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  const blogItems = sortedArticles
    .map(
      (article) => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${SITE_URL}/blog/${article.slug}</link>
      <description>${escapeXml(article.description)}</description>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <category>${escapeXml(article.category)}</category>
      <guid isPermaLink="true">${SITE_URL}/blog/${article.slug}</guid>
    </item>`,
    )
    .join("");

  const topicItems = topicSummaries
    .map((topic) => {
      const url = `${SITE_URL}/topics/${topic.id}`;
      const categoryLabel = CATEGORY_LABELS[topic.category] ?? topic.category;
      const pubDate = topic.addedAt
        ? new Date(topic.addedAt).toUTCString()
        : TOPIC_PUB_DATE;
      return `
    <item>
      <title>${escapeXml(topic.title)}</title>
      <link>${url}</link>
      <description>${escapeXml(topic.meta_claim)}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(categoryLabel)}</category>
      <guid isPermaLink="true">${url}</guid>
    </item>`;
    })
    .join("");

  const rssItems = blogItems + topicItems;

  const lastBuildDate = new Date(
    Math.max(
      new Date(`${CONTENT_LAST_UPDATED}T00:00:00Z`).getTime(),
      ...sortedArticles.map((article) =>
        new Date(article.publishedAt).getTime(),
      ),
    ),
  ).toUTCString();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}: Arguments and Analysis</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <generator>ARGUMEND</generator>
    <ttl>60</ttl>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
