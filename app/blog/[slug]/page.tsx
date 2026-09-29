import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { renderMarkdown } from "@/lib/markdown";
import { articles, getArticleBySlug, categoryToSlug } from "@/data/blog";
import { articleSummaries, type ArticleSummary } from "@/data/blogIndex";
import { absoluteMediaUrl, getGeneratedMedia } from "@/data/generatedMedia";
import { guides } from "@/data/guides";
import { JsonLd } from "@/components/JsonLd";
import { ArticleLayout, type RelatedItem } from "@/components/learn/ArticleLayout";
import { slugifyHeading, type TocHeading } from "@/components/TableOfContents";
import { ReadingProgressBar } from "./client";
import { buildGenericOgUrl } from "@/lib/og";
import { pickNextMap } from "@/lib/learn/nextStep";
import { monthYear } from "@/lib/learn/readTime";

// ---------------------------------------------------------------------------
// Heading anchors + TOC collection
// ---------------------------------------------------------------------------
// Post-process the rendered markdown HTML (rather than touching lib/markdown.ts,
// which is shared): stamp a slugified `id` + `scroll-mt-24` onto every H2/H3 so
// they're deep-linkable and clear the sticky topbar, and collect them for the
// table of contents. Heading inner HTML (bold/links) is preserved; the slug/label
// use the tag-stripped text.
function withHeadingAnchors(markdownHtml: string): {
  html: string;
  headings: TocHeading[];
} {
  const headings: TocHeading[] = [];
  const used = new Set<string>();

  const html = markdownHtml.replace(
    /<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/g,
    (_match, tag: string, attrs: string, inner: string) => {
      const text = inner
        .replace(/<[^>]+>/g, "")
        .replace(/\s+/g, " ")
        .trim();
      let id = slugifyHeading(text) || tag;
      if (used.has(id)) {
        let n = 2;
        while (used.has(`${id}-${n}`)) n += 1;
        id = `${id}-${n}`;
      }
      used.add(id);
      headings.push({ id, text, level: tag === "h2" ? 2 : 3 });

      const attrsWithScrollMargin = /class="/.test(attrs)
        ? attrs.replace(/class="([^"]*)"/, 'class="$1 scroll-mt-24"')
        : `${attrs} class="scroll-mt-24"`;
      return `<${tag}${attrsWithScrollMargin} id="${id}">${inner}</${tag}>`;
    },
  );

  return { html, headings };
}

// ---------------------------------------------------------------------------
// Related reading
// ---------------------------------------------------------------------------
// At most three items, sourced ONLY from the lightweight indexes
// (`articleSummaries` / `guides`), never the heavy `data/blog` bodies, and
// ranked by keyword overlap with the post's tags, category and title. Maps
// are left out: the next step above already names one.

// Generic connectors + the blog's boilerplate phrasing. Stripping these keeps
// overlap scoring on meaningful domain terms (we keep short but meaningful tokens
// like "ai" by stopping noise words rather than filtering purely on length).
const RELATED_STOP_WORDS = new Set([
  "of", "to", "in", "on", "is", "it", "or", "as", "at", "by", "an", "be", "we",
  "do", "no", "so", "us", "if", "up", "my", "the", "and", "for", "are", "you",
  "your", "what", "why", "how", "does", "did", "can", "will", "with", "from",
  "that", "this", "its", "not", "but", "who", "our", "was", "has", "have",
  "about", "actually", "says", "say", "both", "sides", "real", "vs", "into",
  "when", "where", "which", "more", "than", "like", "get", "gets", "explained",
  "guide", "case", "study", "studies", "they", "them", "their", "were", "been",
  "all", "any", "one", "two", "out", "off", "per", "via", "yet", "still",
  "might", "could", "should", "would", "most", "some", "much", "very",
]);

function relatedKeywords(...parts: string[]): Set<string> {
  const tokens = new Set<string>();
  for (const part of parts) {
    if (!part) continue;
    for (const raw of part.toLowerCase().split(/[^a-z0-9]+/)) {
      if (raw.length >= 2 && !RELATED_STOP_WORDS.has(raw)) tokens.add(raw);
    }
  }
  return tokens;
}

function relatedOverlap(a: Set<string>, b: Set<string>): number {
  let n = 0;
  for (const token of a) if (b.has(token)) n += 1;
  return n;
}

function getRelatedReading(current: ArticleSummary): RelatedItem[] {
  const want = relatedKeywords(current.title, current.category, ...current.tags);

  // A guide only when it genuinely overlaps; guides carry no tags, so match
  // on title, subtitle and description.
  const bestGuide = guides
    .map((g) => ({
      g,
      score: relatedOverlap(want, relatedKeywords(g.title, g.subtitle, g.description)),
    }))
    .sort((a, b) => b.score - a.score)[0];
  const guideItem: RelatedItem | null =
    bestGuide && bestGuide.score > 0
      ? {
          kind: "Guide",
          href: `/guides/${bestGuide.g.id}`,
          title: bestGuide.g.title,
          description: bestGuide.g.subtitle,
        }
      : null;

  // Posts: tag/title overlap plus a same-category bonus; recency breaks ties.
  const posts: RelatedItem[] = articleSummaries
    .filter((p) => p.slug !== current.slug)
    .map((p) => ({
      p,
      score:
        relatedOverlap(want, relatedKeywords(...p.tags, p.title)) +
        (p.category.toLowerCase() === current.category.toLowerCase() ? 2 : 0),
    }))
    .sort((a, b) => b.score - a.score || +new Date(b.p.publishedAt) - +new Date(a.p.publishedAt))
    .slice(0, guideItem ? 2 : 3)
    .map(({ p }) => ({
      kind: "Essay",
      href: `/blog/${p.slug}`,
      title: p.title,
      description: p.description,
    }));

  return [...posts, ...(guideItem ? [guideItem] : [])];
}

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata
// ---------------------------------------------------------------------------
type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };

  // Per-post social card via the query-param OG route (the path-param /api/og/[id]
  // route is topic-only and 404s for blog slugs). Without this, posts had no
  // og:image at all despite a summary_large_image Twitter card.
  const media = getGeneratedMedia("blog", article.slug);
  const ogImage =
    media?.hero
      ? absoluteMediaUrl(media.hero.src)
      : buildGenericOgUrl({ title: article.title, subtitle: article.category });

  return {
    title: article.title,
    description: article.description,
    authors: [{ name: article.author }],
    keywords: article.tags,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: article.tags,
      siteName: "ARGUMEND",
      url: `https://argumend.org/blog/${article.slug}`,
      images: [
        {
          url: ogImage,
          width: media?.hero.width ?? 1200,
          height: media?.hero.height ?? 630,
          alt: media?.hero.alt ?? article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [ogImage],
    },
    alternates: {
      canonical: `https://argumend.org/blog/${article.slug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Page: the Learn article template. Markdown rendering lives in
// lib/markdown.ts (shared with guides).
// ---------------------------------------------------------------------------
export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const media = getGeneratedMedia("blog", article.slug);
  const { html: contentHtml, headings } = withHeadingAnchors(renderMarkdown(article.content));
  const published = monthYear(article.publishedAt);

  // Word count for structured data
  const wordCount = article.content
    .replace(/[#*\[\]()]/g, "")
    .split(/\s+/)
    .filter(Boolean).length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Organization",
      name: article.author,
      url: "https://argumend.org",
      logo: { "@type": "ImageObject", url: "https://argumend.org/icon.png" },
    },
    publisher: {
      "@type": "Organization",
      name: "ARGUMEND",
      url: "https://argumend.org",
      logo: { "@type": "ImageObject", url: "https://argumend.org/icon.png" },
    },
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    wordCount,
    articleSection: article.category,
    inLanguage: "en-US",
    image: {
      "@type": "ImageObject",
      url: media?.hero
        ? absoluteMediaUrl(media.hero.src)
        : buildGenericOgUrl({ title: article.title, subtitle: article.category }),
      width: media?.hero.width ?? 1200,
      height: media?.hero.height ?? 630,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://argumend.org/blog/${article.slug}` },
    keywords: article.tags.join(", "),
    isPartOf: { "@type": "Blog", name: "ARGUMEND Blog", url: "https://argumend.org/blog" },
  };

  return (
    <ArticleLayout
      kind="essay"
      title={article.title}
      lede={article.description}
      meta={
        <>
          {article.readingTime}
          {" · "}
          <Link
            href={`/blog/category/${categoryToSlug(article.category)}`}
            className="underline decoration-divider underline-offset-2 transition-colors hover:text-accent-text"
          >
            {article.category}
          </Link>
          {published ? ` · Published ${published}` : null}
        </>
      }
      headings={headings}
      hero={
        media?.hero ? (
          <div className="relative aspect-[1672/941] overflow-hidden rounded-lg border border-divider bg-subtle">
            <Image
              src={media.hero.src}
              alt={media.hero.alt}
              fill
              priority
              sizes="(min-width: 768px) 704px, 100vw"
              className="object-cover"
            />
          </div>
        ) : undefined
      }
      nextMap={pickNextMap({
        text: article.content,
        keywords: [article.title, article.category, ...article.tags].join(" "),
      })}
      related={getRelatedReading(article)}
      chrome={
        <>
          <JsonLd data={jsonLd} />
          <ReadingProgressBar />
        </>
      }
    >
      <div className="prose-custom" dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </ArticleLayout>
  );
}
