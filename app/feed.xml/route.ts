import { articles } from "@/data/blog";
import { topicSummaries, CATEGORY_LABELS } from "@/data/topicIndex";

/**
 * Stable fallback publish date for topic items. Topic summaries carry no
 * per-item `addedAt`, so we use a single deterministic constant rather than
 * fabricating recent dates (which would churn the feed on every build).
 */
const TOPIC_PUB_DATE = new Date("2025-01-01T00:00:00Z").toUTCString();

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const blogItems = articles
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .map(
      (article) => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>https://argumend.org/blog/${article.slug}</link>
      <description>${escapeXml(article.description)}</description>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <category>${escapeXml(article.category)}</category>
      <guid>https://argumend.org/blog/${article.slug}</guid>
    </item>`,
    )
    .join("");

  const topicItems = topicSummaries
    .map((topic) => {
      const url = `https://argumend.org/topics/${topic.id}`;
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
      <guid>${url}</guid>
    </item>`;
    })
    .join("");

  const rssItems = blogItems + topicItems;

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Argumend Blog</title>
    <link>https://argumend.org/blog</link>
    <description>Evidence-based analysis of controversial topics. Steel-manned arguments, weighted evidence, and crux identification.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://argumend.org/feed.xml" rel="self" type="application/rss+xml"/>${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
