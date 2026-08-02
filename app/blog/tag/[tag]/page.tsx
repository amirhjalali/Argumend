import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { CollectionPagination } from "@/components/CollectionPagination";
import {
  articleSummaries,
  getArticleSummaryTags,
  blogTagToSlug,
} from "@/data/blogIndex";

import { formatLongDate } from "@/lib/formatDate";
import { buildGenericOgUrl } from "@/lib/og";
import {
  buildPageHref,
  paginate,
  parsePageParam,
} from "@/lib/collectionPagination";
import { getTagsForSlug, TAG_PAGE_SIZE } from "./_config";

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return Array.from(new Set(getArticleSummaryTags().map(blogTagToSlug))).map((tag) => ({
    tag,
  }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata
// ---------------------------------------------------------------------------
type PageProps = {
  params: Promise<{ tag: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function findTagBySlug(slug: string): string | undefined {
  return getTagsForSlug(slug)[0];
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const page = parsePageParam((await searchParams)?.page);
  const tag = findTagBySlug(tagSlug);
  if (!tag) {
    return {
      title: "Tag Not Found",
      robots: { index: false, follow: false },
    };
  }

  const filteredCount = articleSummaries.filter((article) =>
    article.tags.some((articleTag) => blogTagToSlug(articleTag) === tagSlug),
  ).length;
  const pageCount = Math.max(1, Math.ceil(filteredCount / TAG_PAGE_SIZE));
  const title = page > 1
    ? `Articles tagged "${tag}" — Page ${page} of ${pageCount}`
    : `Articles tagged "${tag}"`;
  const description = `Browse all articles tagged "${tag}" on the Argumend Blog. Evidence-based analysis and structured reasoning.`;
  const canonical = buildPageHref(
    `https://argumend.org/blog/tag/${tagSlug}`,
    page,
  );
  const socialImage = buildGenericOgUrl({ title, subtitle: "ARGUMEND Blog" });

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ARGUMEND Blog`,
      description,
      type: "website",
      url: canonical,
      siteName: "ARGUMEND",
      images: [{ url: socialImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [socialImage] },
    alternates: {
      canonical,
    },
    pagination: {
      previous: page > 1
        ? buildPageHref(
            `https://argumend.org/blog/tag/${tagSlug}`,
            page - 1,
          )
        : null,
      next: page < pageCount
        ? buildPageHref(
            `https://argumend.org/blog/tag/${tagSlug}`,
            page + 1,
          )
        : null,
    },
    robots: page > pageCount ? { index: false, follow: true } : undefined,
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function TagPage({ params, searchParams }: PageProps) {
  const { tag: tagSlug } = await params;
  const tag = findTagBySlug(tagSlug);

  if (!tag) {
    notFound();
  }

  const allFiltered = articleSummaries
    .filter((article) =>
      article.tags.some((articleTag) => blogTagToSlug(articleTag) === tagSlug),
    )
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  const pagination = paginate(
    allFiltered,
    parsePageParam((await searchParams)?.page),
    TAG_PAGE_SIZE,
  );
  if (pagination.isOutOfRange) notFound();
  const filtered = pagination.items;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Articles tagged "${tag}"`,
    description: `All articles tagged "${tag}" on the Argumend Blog.`,
    url: buildPageHref(
      `https://argumend.org/blog/tag/${tagSlug}`,
      pagination.page,
    ),
    isPartOf: {
      "@type": "Blog",
      name: "ARGUMEND Blog",
      url: "https://argumend.org/blog",
    },
  };

  return (
    <AppShell>
      <JsonLd data={jsonLd} />
      <div className="min-h-[100svh]">
        {/* Hero */}
        <div className="bg-[#faf8f5]/60 dark:bg-[#1a1916]/60 border-b border-[#e8e0d4] dark:border-[#3d3a36]">
          <div className="mx-auto max-w-4xl px-4 md:px-8 py-10 md:py-16">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: `Tag: "${tag}"` },
              ]}
            />
            <p className="text-xs font-medium uppercase tracking-widest text-muted dark:text-stone-400 mb-4">
              Tag
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary dark:text-stone-200 mb-6 leading-[1.08]">
              &ldquo;{tag}&rdquo;
            </h1>
            <p className="text-lg text-secondary dark:text-stone-400 leading-relaxed max-w-2xl">
              {pagination.total} article{pagination.total !== 1 ? "s" : ""}{" "}
              tagged with &ldquo;{tag}&rdquo;.
            </p>
          </div>
        </div>

        {/* Article Grid */}
        <div className="mx-auto max-w-4xl px-4 md:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((article, index) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group block animate-card-fade-in"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <article className="relative h-full bg-[#faf8f5] dark:bg-[#252420] rounded-xl p-6 md:p-8 border border-stone-200/60 dark:border-[#3d3a36] shadow-card hover:border-[#c8c0b4] dark:hover:border-[#4a4640] hover:shadow-lw-hover hover:-translate-y-0.5 transition-all duration-200">
                  {/* Category Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center rounded-full bg-deep/10 px-3 py-1 text-xs font-medium text-deep">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted dark:text-stone-400">
                      <Calendar className="h-3 w-3" />
                      {formatLongDate(article.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted dark:text-stone-400">
                      <Clock className="h-3 w-3" />
                      {article.readingTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-serif text-xl md:text-2xl tracking-tight text-primary dark:text-stone-200 group-hover:text-deep transition-colors mb-3 leading-tight">
                    {article.title}
                  </h2>

                  {/* Description */}
                  <p className="text-secondary dark:text-stone-400 leading-relaxed mb-5 max-w-2xl">
                    {article.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    {article.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] ${
                          blogTagToSlug(t) === tagSlug
                            ? "bg-deep/10 text-deep font-medium"
                            : "bg-stone-100 dark:bg-[#302e2a] text-stone-500"
                        }`}
                      >
                        <Tag className="h-2.5 w-2.5" />
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-sm font-medium text-deep group-hover:text-deep-dark transition-colors">
                    <span>Read article</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-stone-500" role="status">
            Showing {pagination.startIndex + 1}&ndash;{pagination.endIndex} of{" "}
            {pagination.total} articles
          </p>
          <CollectionPagination
            basePath={`/blog/tag/${tagSlug}`}
            currentPage={pagination.page}
            pageCount={pagination.pageCount}
            label={`${tag} articles`}
          />

          {/* Back to Blog */}
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-deep hover:text-deep-dark transition-colors"
            >
              <ArrowRight className="h-3.5 w-3.5 rotate-180" />
              Back to all articles
            </Link>
          </div>

        </div>
      </div>
    </AppShell>
  );
}
