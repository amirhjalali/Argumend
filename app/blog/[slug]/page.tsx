import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  Tag,
  User,
} from "lucide-react";
import { articles, getArticleBySlug, getRelatedArticles } from "@/data/blog";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ShareButtons } from "@/components/ShareButtons";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BlogArticleClient } from "./client";

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
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
    alternates: {
      canonical: `https://argumend.org/blog/${article.slug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Markdown → HTML (simple, no external deps)
// ---------------------------------------------------------------------------
function markdownToHtml(md: string): string {
  let html = md
    // Headings
    .replace(/^### (.+)$/gm, '<h3 class="font-serif text-lg text-primary mt-10 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="font-serif text-2xl sm:text-3xl text-primary mt-12 mb-4">$1</h2>')
    // Bold + italic
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic (including book titles wrapped in single asterisks)
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Links
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-deep underline underline-offset-2 hover:text-deep-dark transition-colors" target="_blank" rel="noopener noreferrer">$1</a>',
    );

  // Paragraphs: split by double newlines
  const blocks = html.split(/\n\n+/);
  html = blocks
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      // Already wrapped in a tag
      if (
        trimmed.startsWith("<h2") ||
        trimmed.startsWith("<h3") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<ol")
      ) {
        return trimmed;
      }
      return `<p class="mb-6 leading-[1.8] text-primary">${trimmed.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("\n");

  return html;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug, 3);
  const contentHtml = markdownToHtml(article.content);

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
      url: `https://argumend.org/api/og/blog/${article.slug}`,
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
      <div className="min-h-screen bg-canvas">
        {/* JSON-LD (placed early for crawlers) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

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
            <span className="inline-flex items-center rounded-full bg-deep/10 border border-deep/20 px-3 py-1 text-xs font-medium text-deep mb-4">
              {article.category}
            </span>

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
        <div className="mx-auto max-w-3xl px-4 md:px-8 py-8 md:py-14">
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
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-1 text-xs text-secondary"
                >
                  <Tag className="h-2.5 w-2.5" />
                  {tag}
                </span>
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
