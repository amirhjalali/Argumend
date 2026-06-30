import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { renderMarkdown } from "@/lib/markdown";
import {
  Calendar,
  Clock,
  Tag,
  User,
} from "lucide-react";
import {
  articles,
  getArticleBySlug,
  categoryToSlug,
  tagToSlug,
} from "@/data/blog";
import { articleSummaries, type ArticleSummary } from "@/data/blogIndex";
import { absoluteMediaUrl, getGeneratedMedia } from "@/data/generatedMedia";
import { topicSummaries, CATEGORY_LABELS } from "@/data/topicIndex";
import { guides } from "@/data/guides";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ShareButtons } from "@/components/ShareButtons";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import {
  TableOfContents,
  slugifyHeading,
  type TocHeading,
} from "@/components/TableOfContents";
import { BlogArticleClient } from "./client";

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
// Related reading (cross-type internal linking)
// ---------------------------------------------------------------------------
// Surface a small, on-brand set of related content sourced ONLY from the
// lightweight indexes (`articleSummaries` / `topicSummaries` / `guides`) — never
// the heavy `data/blog` bodies — ranked by keyword overlap with the current
// post's tags + category + title. Server-rendered for SEO + internal linking.
type RelatedItem = {
  kind: "Article" | "Topic" | "Guide";
  href: string;
  title: string;
  label: string;
};

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

  // Related posts — tag/title overlap + a same-category bonus; recency tiebreak.
  const relatedPosts: RelatedItem[] = articleSummaries
    .filter((p) => p.slug !== current.slug)
    .map((p) => ({
      p,
      score:
        relatedOverlap(want, relatedKeywords(...p.tags, p.title)) +
        (p.category.toLowerCase() === current.category.toLowerCase() ? 2 : 0),
    }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        +new Date(b.p.publishedAt) - +new Date(a.p.publishedAt),
    )
    .slice(0, 3)
    .map(({ p }) => ({
      kind: "Article",
      href: `/blog/${p.slug}`,
      title: p.title,
      label: p.category,
    }));

  // Related guide — guides carry no tags, so match on title/subtitle/description.
  // Optional: only surfaced when there's genuine overlap.
  const bestGuide = guides
    .map((g) => ({
      g,
      score: relatedOverlap(
        want,
        relatedKeywords(g.title, g.subtitle, g.description),
      ),
    }))
    .sort((a, b) => b.score - a.score)[0];
  const guideItem: RelatedItem | null =
    bestGuide && bestGuide.score > 0
      ? {
          kind: "Guide",
          href: `/guides/${bestGuide.g.id}`,
          title: bestGuide.g.title,
          label: bestGuide.g.subtitle,
        }
      : null;

  // Related topics — tag/title overlap; evidence-rich topics as stable fallback.
  // Keep the whole section to ~5 items: 1 topic when a guide is shown, else 2.
  const topicItems: RelatedItem[] = topicSummaries
    .map((t) => ({
      t,
      score: relatedOverlap(want, relatedKeywords(...t.tags, t.title)),
    }))
    .sort((a, b) => b.score - a.score || b.t.evidenceCount - a.t.evidenceCount)
    .slice(0, guideItem ? 1 : 2)
    .map(({ t }) => ({
      kind: "Topic",
      href: `/topics/${t.id}`,
      title: t.title,
      label: CATEGORY_LABELS[t.category] ?? "Topic",
    }));

  return [...relatedPosts, ...topicItems, ...(guideItem ? [guideItem] : [])];
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
      : `https://argumend.org/api/og?title=${encodeURIComponent(
          article.title,
        )}&subtitle=${encodeURIComponent(article.category)}`;

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
// Markdown → HTML (simple, no external deps)
// ---------------------------------------------------------------------------
// Markdown rendering moved to lib/markdown.ts (shared with guides; adds list
// support + consolidates the link-href hardening so it can't drift).

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const media = getGeneratedMedia("blog", article.slug);
  const relatedReading = getRelatedReading(article);
  const { html: contentHtml, headings } = withHeadingAnchors(
    renderMarkdown(article.content),
  );

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Word count for structured data
  const wordCount = article.content
    .replace(/[#*\[\]()]/g, "")
    .split(/\s+/)
    .filter(Boolean).length;

  // JSON-LD structured data (BlogPosting for richer search results)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Organization",
      name: article.author,
      url: "https://argumend.org",
      logo: {
        "@type": "ImageObject",
        url: "https://argumend.org/icon.png",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "ARGUMEND",
      url: "https://argumend.org",
      logo: {
        "@type": "ImageObject",
        url: "https://argumend.org/icon.png",
      },
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
        : `https://argumend.org/api/og?title=${encodeURIComponent(
            article.title,
          )}&subtitle=${encodeURIComponent(article.category)}`,
      width: media?.hero.width ?? 1200,
      height: media?.hero.height ?? 630,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://argumend.org/blog/${article.slug}`,
    },
    keywords: article.tags.join(", "),
    isPartOf: {
      "@type": "Blog",
      name: "ARGUMEND Blog",
      url: "https://argumend.org/blog",
    },
  };

  return (
    <BlogArticleClient>
      <div className="min-h-[100svh] bg-canvas">
        {/* JSON-LD (placed early for crawlers) */}
        <JsonLd data={jsonLd} />

        {/* Breadcrumb + article header */}
        <div className="bg-[#faf8f5]/60 border-b border-stone-200/60">
          <div className="mx-auto max-w-3xl px-4 md:px-8 pt-6 md:pt-10 pb-8 md:pb-12">
            {/* Breadcrumb with BreadcrumbList JSON-LD */}
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: article.title },
              ]}
            />

            {/* Category */}
            <Link
              href={`/blog/category/${categoryToSlug(article.category)}`}
              className="inline-flex items-center rounded-full bg-deep/10 border border-deep/20 px-3 py-1 text-xs font-medium text-deep mb-4 hover:bg-deep/20 transition-colors"
            >
              {article.category}
            </Link>

            {/* Title */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary mb-6 leading-[1.08]">
              {article.title}
            </h1>

            {/* Description / lede */}
            {article.description && (
              <p className="text-lg text-secondary leading-relaxed mb-6 max-w-2xl">
                {article.description}
              </p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(article.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {article.readingTime}
              </span>
            </div>

            {/* Share */}
            <div className="mt-5">
              <ShareButtons
                title={article.title}
                url={`https://argumend.org/blog/${article.slug}`}
                description={article.description}
              />
            </div>

            {media?.hero && (
              <div className="relative mt-8 aspect-[1672/941] overflow-hidden rounded-xl border border-stone-200/70 bg-stone-100 shadow-sm">
                <Image
                  src={media.hero.src}
                  alt={media.hero.alt}
                  fill
                  priority
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Article body */}
        <div className="relative mx-auto max-w-3xl px-4 md:px-8 py-8 md:py-14">
          <TableOfContents headings={headings} />

          <article
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Tags */}
          <div className="mt-14 pt-8 border-t border-stone-200/60">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-muted mr-1">
                Tags:
              </span>
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tagToSlug(tag)}`}
                  className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-1 text-xs text-secondary hover:bg-deep/10 hover:text-deep transition-colors"
                >
                  <Tag className="h-2.5 w-2.5" />
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-10">
            <NewsletterSignup variant="compact" />
          </div>

          {/* Related reading — cross-type internal linking (posts + topics + guide) */}
          {relatedReading.length > 0 && (
            <div className="mt-14">
              <h3 className="font-serif text-lg text-primary mb-3">
                Related reading
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedReading.map((item, idx) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group block animate-card-fade-in"
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    <div className="bg-[#faf8f5] rounded-xl p-5 border border-stone-200/60 hover:border-deep/30 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 h-full">
                      <span className="text-[10px] font-medium text-deep uppercase tracking-wide">
                        {item.kind}
                      </span>
                      <h4 className="font-serif text-sm text-primary mt-2 mb-2 leading-snug group-hover:text-deep transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted">
                        {item.label}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </BlogArticleClient>
  );
}
