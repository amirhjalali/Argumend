import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionIndex } from "@/components/learn/CollectionIndex";
import { JsonLd } from "@/components/JsonLd";
import { CollectionPagination } from "@/components/CollectionPagination";
import {
  articleSummaries,
  getArticleSummaryTags,
  blogTagToSlug,
} from "@/data/blogIndex";

import { buildGenericOgUrl } from "@/lib/og";
import { LEARN_HUB_HREF } from "@/lib/learn/sections";
import { essayRow } from "../../_rows";
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
    // 153 tags, most holding one post: tag pages help readers move between
    // posts but are thin pages for search, so they stay out of the index
    // while their links are still followed (2026-09-29 learn overhaul).
    robots: { index: false, follow: true },
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

  // The Learn index template, as /blog and its category pages.
  return (
    <CollectionIndex
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Learn", href: LEARN_HUB_HREF },
        { label: "Essays", href: "/blog" },
        { label: `Tagged \u201c${tag}\u201d` },
      ]}
      eyebrow="Essays tagged"
      title={`\u201c${tag}\u201d`}
      meta={`${pagination.total} ${pagination.total === 1 ? "essay" : "essays"} with this tag`}
      chrome={<JsonLd data={jsonLd} />}
      groups={[
        {
          id: "essays",
          items: pagination.items.map(essayRow),
          more: { href: "/blog", label: "All essays" },
        },
      ]}
    >
      <p className="mt-6 font-sans text-sm text-muted" role="status">
        Showing {pagination.startIndex + 1}&ndash;{pagination.endIndex} of{" "}
        {pagination.total} articles
      </p>
      <CollectionPagination
        basePath={`/blog/tag/${tagSlug}`}
        currentPage={pagination.page}
        pageCount={pagination.pageCount}
        label={`Articles tagged ${tag}`}
      />
    </CollectionIndex>
  );
}
