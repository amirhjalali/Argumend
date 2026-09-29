import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionIndex, type CollectionItem } from "@/components/learn/CollectionIndex";
import { CollectionPagination } from "@/components/CollectionPagination";
import { JsonLd } from "@/components/JsonLd";
import { articleSummaries, getArticleSummaryCategoryFacets } from "@/data/blogIndex";
import { getGeneratedMedia } from "@/data/generatedMedia";
import { buildPageHref, paginate, parsePageParam } from "@/lib/collectionPagination";
import { indexCrumbs } from "@/lib/learn/sections";
import { BLOG_CATEGORY_CHIPS, BLOG_PAGE_SIZE } from "./_config";

type BlogPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const DESCRIPTION =
  "Essays from Argumend on disagreeing well: case studies of contested questions, how-tos on evidence and reasoning, and notes on how the maps work.";

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const query = await searchParams;
  const page = parsePageParam(query.page);
  const pageCount = Math.max(1, Math.ceil(articleSummaries.length / BLOG_PAGE_SIZE));
  const canonical = buildPageHref("https://argumend.org/blog", page);

  return {
    title: page > 1 ? `Blog — Page ${page} of ${pageCount}` : "Blog — Essays on Disagreeing Well",
    description: DESCRIPTION,
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

  // The largest categories only. Every category page still serves, and each
  // post links its own category; tags stay off the index head.
  const categories = getArticleSummaryCategoryFacets().slice(0, BLOG_CATEGORY_CHIPS);

  const items: CollectionItem[] = pagination.items.map((article) => {
    const hero = getGeneratedMedia("blog", article.slug)?.hero;
    return {
      href: `/blog/${article.slug}`,
      title: article.title,
      description: article.description,
      meta: `${article.category} · ${article.readingTime}`,
      image: hero ? { src: hero.src, alt: hero.alt, width: hero.width, height: hero.height } : undefined,
    };
  });

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "The Argumend Blog",
    description: DESCRIPTION,
    url: buildPageHref("https://argumend.org/blog", pagination.page),
    publisher: {
      "@type": "Organization",
      name: "ARGUMEND",
      url: "https://argumend.org",
      logo: { "@type": "ImageObject", url: "https://argumend.org/icon.png" },
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
    <CollectionIndex
      crumbs={indexCrumbs("Essays")}
      eyebrow="Learn"
      title="Essays"
      lede="Case studies of contested questions, how-tos on evidence and reasoning, and notes on how the maps work."
      meta={
        <>
          {articleSummaries.length} essays ·{" "}
          <Link
            href="/feed.xml"
            prefetch={false}
            className="inline-flex min-h-11 items-center underline decoration-divider underline-offset-2 transition-colors hover:text-accent-text"
          >
            RSS feed
          </Link>
        </>
      }
      chips={categories.map((category) => ({
        href: `/blog/category/${category.slug}`,
        label: category.label,
        count: category.count,
      }))}
      chipsLabel="Top blog categories"
      chrome={<JsonLd data={blogJsonLd} />}
      groups={[{ id: "essays", items }]}
    >
      <p className="mt-6 font-sans text-sm text-muted" role="status">
        Showing {pagination.startIndex + 1}&ndash;{pagination.endIndex} of {pagination.total} articles
      </p>
      <CollectionPagination
        basePath="/blog"
        currentPage={pagination.page}
        pageCount={pagination.pageCount}
        label="Blog"
      />
    </CollectionIndex>
  );
}
