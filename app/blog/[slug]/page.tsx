import { Metadata } from "next";
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
  getRelatedArticles,
  categoryToSlug,
  tagToSlug,
} from "@/data/blog";
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
  const ogImage = `https://argumend.org/api/og?title=${encodeURIComponent(
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: article.title }],
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

  const related = getRelatedArticles(slug, 3);
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
      url: `https://argumend.org/api/og?title=${encodeURIComponent(
        article.title,
      )}&subtitle=${encodeURIComponent(article.category)}`,
      width: 1200,
      height: 630,
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

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="mt-14">
              <h3 className="font-serif text-lg text-primary mb-2">
                Related Articles
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                {related.map((rel, idx) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group block animate-card-fade-in"
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    <div className="bg-[#faf8f5] rounded-xl p-5 border border-stone-200/60 hover:border-deep/30 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 h-full">
                      <span className="text-[10px] font-medium text-deep uppercase tracking-wide">
                        {rel.category}
                      </span>
                      <h4 className="font-serif text-sm text-primary mt-2 mb-2 leading-snug group-hover:text-deep transition-colors">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-muted">
                        {rel.readingTime}
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
