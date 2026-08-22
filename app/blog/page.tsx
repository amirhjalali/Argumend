import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, ChevronDown, Clock, Rss, Tag } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { CollectionPagination } from "@/components/CollectionPagination";
import {
  articleSummaries,
  getArticleSummaryCategoryFacets,
  getArticleSummaryTags,
  blogTagToSlug,
  type BlogCategoryFacet,
} from "@/data/blogIndex";
import { getGeneratedMedia } from "@/data/generatedMedia";
import { formatLongDate } from "@/lib/formatDate";
import { getCollectionItemPresentation } from "@/lib/collectionStyles";
import { buildPageHref, paginate, parsePageParam } from "@/lib/collectionPagination";
import { BLOG_MOBILE_CATEGORY_LIMIT, BLOG_PAGE_SIZE } from "./_config";

function CategoryChip({
  category,
  mobile = false,
}: {
  category: BlogCategoryFacet;
  mobile?: boolean;
}) {
  return (
    <Link
      href={`/blog/category/${category.slug}`}
      aria-label={`${category.label}, ${category.count} ${category.count === 1 ? "article" : "articles"}`}
      className={`inline-flex items-center rounded-full border border-stone-200/80 dark:border-[var(--border-divider)] bg-[#faf8f5] dark:bg-[var(--bg-card)] text-xs font-medium text-secondary dark:text-stone-400 hover:border-deep/40 hover:text-deep hover:bg-deep/5 dark:hover:bg-deep/10 transition-all duration-150 ${mobile ? "min-h-11 px-3.5 py-2" : "px-3.5 py-1.5"}`}
    >
      {category.label}
      <span className="ml-1.5 text-[10px] tabular-nums text-muted dark:text-stone-400" aria-hidden="true">
        {category.count}
      </span>
    </Link>
  );
}

type BlogPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const query = await searchParams;
  const page = parsePageParam(query.page);
  const pageCount = Math.max(1, Math.ceil(articleSummaries.length / BLOG_PAGE_SIZE));
  const canonical = buildPageHref("https://argumend.org/blog", page);

  return {
    title: page > 1
      ? `Blog — Page ${page} of ${pageCount}`
      : "Blog — Essays on Critical Thinking & Argument Analysis",
    alternates: { canonical },
    pagination: {
      previous: page > 1 ? buildPageHref("https://argumend.org/blog", page - 1) : null,
      next: page < pageCount ? buildPageHref("https://argumend.org/blog", page + 1) : null,
    },
    robots: page > pageCount ? { index: false, follow: true } : undefined,
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const query = await searchParams;
  const requestedPage = parsePageParam(query.page);
  const pagination = paginate(articleSummaries, requestedPage, BLOG_PAGE_SIZE);
  if (pagination.isOutOfRange) notFound();

  const categories = getArticleSummaryCategoryFacets();
  const topCategories = categories.slice(0, BLOG_MOBILE_CATEGORY_LIMIT);
  const moreCategories = categories.slice(BLOG_MOBILE_CATEGORY_LIMIT);
  const allTags = getArticleSummaryTags();

  // Count tag frequency to show popular tags first
  const tagCounts = new Map<string, number>();
  for (const article of articleSummaries) {
    for (const tag of article.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }
  const popularTags = allTags
    .sort((a, b) => (tagCounts.get(b) ?? 0) - (tagCounts.get(a) ?? 0))
    .slice(0, 15);
  const featuredArticle = pagination.page === 1 ? pagination.items[0] : undefined;
  const gridArticles = featuredArticle ? pagination.items.slice(1) : pagination.items;
  const featuredMedia = featuredArticle
    ? getGeneratedMedia("blog", featuredArticle.slug)
    : undefined;

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "The Argumend Blog",
    description:
      "Essays on critical thinking, structured reasoning, and the art of productive disagreement.",
    url: buildPageHref("https://argumend.org/blog", pagination.page),
    publisher: {
      "@type": "Organization",
      name: "ARGUMEND",
      url: "https://argumend.org",
      logo: {
        "@type": "ImageObject",
        url: "https://argumend.org/icon.png",
      },
    },
    blogPost: pagination.items.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      description: article.description,
      url: `https://argumend.org/blog/${article.slug}`,
      datePublished: article.publishedAt,
      author: { "@type": "Organization", name: "ARGUMEND" },
    })),
  };

  return (
    <AppShell>
      <JsonLd data={blogJsonLd} />
      <div className="min-h-[100svh]">
        {/* Hero */}
        <div className="bg-[#faf8f5]/60 dark:bg-[#1a1916]/60 border-b border-[#e8e0d4] dark:border-[var(--border-divider)]">
          <div className="mx-auto max-w-4xl px-4 md:px-8 py-10 md:py-16">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Blog" },
              ]}
            />
            <p className="text-xs font-medium uppercase tracking-widest text-muted dark:text-stone-400 mb-4">
              Insights &amp; Analysis
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary dark:text-stone-200 mb-6 leading-[1.08]">
              The Argumend Blog
            </h1>
            <p className="text-lg text-secondary dark:text-stone-400 leading-relaxed max-w-2xl">
              Essays on critical thinking, structured reasoning, and the art of
              productive disagreement. Written to help you think more clearly
              about the topics that matter most.
            </p>

            {/* RSS link */}
            <div className="mt-4">
              <Link
                href="/feed.xml"
                className="inline-flex items-center gap-1.5 text-sm text-deep hover:text-deep-dark transition-colors"
              >
                <Rss className="h-3.5 w-3.5" />
                <span>RSS Feed</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Category & Tag Navigation */}
        <div className="mx-auto max-w-4xl px-4 md:px-8 pt-8 md:pt-10">
          {/* Categories */}
          <nav className="mb-6" aria-labelledby="blog-categories-heading">
            <h2 id="blog-categories-heading" className="text-xs font-medium uppercase tracking-widest text-muted dark:text-stone-400 mb-3">
              Browse by Category
            </h2>

            <div className="md:hidden">
              <ul className="flex flex-wrap gap-2" aria-label="Top blog categories">
                {topCategories.map((category) => (
                  <li key={category.category}>
                    <CategoryChip category={category} mobile />
                  </li>
                ))}
              </ul>

              <details className="group mt-3 overflow-hidden rounded-xl border border-stone-200/80 dark:border-[var(--border-divider)] bg-[#faf8f5]/70 dark:bg-[var(--bg-card)]/70">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 py-2.5 text-sm font-medium text-secondary dark:text-stone-400 hover:text-deep [&::-webkit-details-marker]:hidden">
                  <span>Browse all categories</span>
                  <span className="flex items-center gap-2 text-xs font-normal text-muted dark:text-stone-400">
                    {moreCategories.length} more
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
                  </span>
                </summary>
                <ul className="flex flex-wrap gap-2 border-t border-stone-200/80 dark:border-[var(--border-divider)] p-3" aria-label="More blog categories">
                  {moreCategories.map((category) => (
                    <li key={category.category}>
                      <CategoryChip category={category} mobile />
                    </li>
                  ))}
                </ul>
              </details>
            </div>

            <ul className="hidden flex-wrap gap-2 md:flex" aria-label="All blog categories">
              {categories.map((category) => (
                <li key={category.category}>
                  <CategoryChip category={category} />
                </li>
              ))}
            </ul>
          </nav>

          {/* Popular Tags */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted dark:text-stone-400 mb-3">
              Popular Tags
            </p>
            <div className="flex flex-wrap gap-1.5">
              {popularTags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${blogTagToSlug(tag)}`}
                  className="inline-flex min-h-11 items-center gap-1 rounded-md bg-stone-100 px-2.5 py-2 text-[11px] text-stone-500 transition-all duration-150 hover:bg-deep/10 hover:text-deep dark:bg-[var(--bg-muted)] dark:text-stone-400"
                >
                  <Tag className="h-2.5 w-2.5" />
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Article Grid */}
        <div className="mx-auto max-w-4xl px-4 md:px-8 py-8 md:py-12">
          {/* Featured Article (first) */}
          {featuredArticle && (
            <Link
              key={featuredArticle.slug}
              href={`/blog/${featuredArticle.slug}`}
              className="group block mb-6 md:mb-8 animate-card-fade-in"
              style={{ animationDelay: "0ms" }}
            >
              <article className="relative overflow-hidden bg-[#faf8f5] dark:bg-[var(--bg-card)] rounded-xl p-6 md:p-10 border border-stone-200/60 dark:border-[var(--border-divider)] shadow-card hover:border-[#c8c0b4] dark:hover:border-[#4a4640] hover:shadow-lw-hover hover:-translate-y-0.5 transition-all duration-200">
                {featuredMedia?.hero && (
                  <div className="-mx-6 -mt-6 mb-6 aspect-[1672/941] overflow-hidden border-b border-stone-200/60 bg-stone-100 md:-mx-10 md:-mt-10">
                    <Image
                      src={featuredMedia.hero.src}
                      alt={featuredMedia.hero.alt}
                      width={featuredMedia.hero.width}
                      height={featuredMedia.hero.height}
                      priority
                      sizes="(min-width: 768px) 896px, 100vw"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                )}

                {/* Category Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center rounded-full bg-deep/10 px-3 py-1 text-xs font-medium text-deep">
                    {featuredArticle.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted dark:text-stone-400">
                    <Calendar className="h-3 w-3" />
                    {formatLongDate(featuredArticle.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted dark:text-stone-400">
                    <Clock className="h-3 w-3" />
                    {featuredArticle.readingTime}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-primary dark:text-stone-200 group-hover:text-deep transition-colors mb-3 leading-tight">
                  {featuredArticle.title}
                </h2>

                {/* Description */}
                <p className="text-secondary dark:text-stone-400 leading-relaxed mb-5 max-w-2xl">
                  {featuredArticle.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  {featuredArticle.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-md bg-stone-100 dark:bg-[var(--bg-muted)] px-2 py-0.5 text-[11px] text-stone-500 dark:text-stone-400"
                    >
                      <Tag className="h-2.5 w-2.5" />
                      {tag}
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
          )}

          {/* Remaining Articles in 2-column grid */}
          {gridArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gridArticles.map((article, index) => {
                const media = getGeneratedMedia("blog", article.slug);
                const presentation = getCollectionItemPresentation(index + 1, {
                  staggerMs: 60,
                  intrinsicSize: "0 560px",
                });

                return (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className={`group block ${presentation.animate ? "animate-card-fade-in" : ""}`}
                    style={presentation.style}
                  >
                    <article className="relative h-full overflow-hidden bg-[#faf8f5] dark:bg-[var(--bg-card)] rounded-xl p-6 md:p-8 border border-stone-200/60 dark:border-[var(--border-divider)] shadow-card hover:border-[#c8c0b4] dark:hover:border-[#4a4640] hover:shadow-lw-hover hover:-translate-y-0.5 transition-all duration-200">
                      {media?.hero && (
                        <div className="-mx-6 -mt-6 mb-5 aspect-[1672/941] overflow-hidden border-b border-stone-200/60 bg-stone-100 md:-mx-8 md:-mt-8">
                          <Image
                            src={media.hero.src}
                            alt={media.hero.alt}
                            width={media.hero.width}
                            height={media.hero.height}
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                        </div>
                      )}

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
                        {article.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 rounded-md bg-stone-100 dark:bg-[var(--bg-muted)] px-2 py-0.5 text-[11px] text-stone-500 dark:text-stone-400"
                          >
                            <Tag className="h-2.5 w-2.5" />
                            {tag}
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
                );
              })}
            </div>
          )}

          <p className="mt-8 text-center text-sm text-stone-500 dark:text-stone-400" role="status">
            Showing {pagination.startIndex + 1}&ndash;{pagination.endIndex} of {pagination.total} articles
          </p>

          <CollectionPagination
            basePath="/blog"
            currentPage={pagination.page}
            pageCount={pagination.pageCount}
            label="Blog"
          />

          {/* Footer note */}
          <div className="mt-12 pt-8 border-t border-stone-200/60 dark:border-[var(--border-divider)]">
            <p className="text-sm text-secondary dark:text-stone-400">
              All articles are written by the Argumend team and reviewed for
              accuracy. We practice what we preach—every claim is backed by
              evidence, and we welcome corrections.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
