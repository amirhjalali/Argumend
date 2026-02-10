import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  User,
} from "lucide-react";
import { articles, getArticleBySlug, getRelatedArticles } from "@/data/blog";
import { NewsletterSignup } from "@/components/NewsletterSignup";
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
    .replace(/^### (.+)$/gm, '<h3 class="font-serif text-xl text-primary mt-10 mb-4 leading-snug">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="font-serif text-2xl text-primary mt-12 mb-4 leading-snug">$1</h2>')
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

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Organization",
      name: article.author,
      url: "https://argumend.org",
    },
    publisher: {
      "@type": "Organization",
      name: "ARGUMEND",
      url: "https://argumend.org",
    },
    datePublished: article.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://argumend.org/blog/${article.slug}`,
    },
    keywords: article.tags.join(", "),
  };

  return (
    <BlogArticleClient>
      <div className="min-h-screen bg-[#f4f1eb]">
        {/* Breadcrumb + article header */}
        <div className="bg-[#faf8f5] border-b border-[#e8e0d4]">
          <div className="mx-auto max-w-3xl px-4 md:px-8 pt-6 md:pt-10 pb-8 md:pb-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-stone-400 mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 hover:text-deep transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Blog
              </Link>
              <span>/</span>
              <span className="text-stone-500 truncate max-w-[200px] md:max-w-none">
                {article.title}
              </span>
            </nav>

            {/* Category */}
            <span className="inline-flex items-center rounded-full bg-deep/10 px-3 py-1 text-xs font-medium text-deep mb-4">
              {article.category}
            </span>

            {/* Title */}
            <h1 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] tracking-tight text-primary mb-5 leading-[1.15]">
              {article.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-stone-400">
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
          </div>
        </div>

        {/* Article body */}
        <div className="mx-auto max-w-3xl px-4 md:px-8 py-8 md:py-12">
          <article
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-stone-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-stone-400 mr-1">
                Tags:
              </span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-2.5 py-1 text-xs text-stone-500"
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
              <h3 className="font-serif text-xl text-primary mb-6">
                Related Articles
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group block"
                  >
                    <div className="bg-[#faf8f5] rounded-lg p-5 border border-[#e8e0d4] hover:border-[#c8c0b4] hover:shadow-sm transition-all duration-200 h-full">
                      <span className="text-[10px] font-medium text-deep uppercase tracking-wide">
                        {rel.category}
                      </span>
                      <h4 className="font-serif text-sm text-primary mt-2 mb-2 leading-snug group-hover:text-deep transition-colors">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-stone-400">
                        {rel.readingTime}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </div>
    </BlogArticleClient>
  );
}
