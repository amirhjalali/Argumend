import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionIndex } from "@/components/learn/CollectionIndex";
import { JsonLd } from "@/components/JsonLd";
import { CollectionPagination } from "@/components/CollectionPagination";
import {
  articleSummaries,
  getArticleSummaryCategories,
  blogCategoryToSlug,
} from "@/data/blogIndex";

import { buildGenericOgUrl } from "@/lib/og";
import { LEARN_HUB_HREF } from "@/lib/learn/sections";
import { essayCategoryChips, essayRow } from "../../_rows";
import {
  buildPageHref,
  paginate,
  parsePageParam,
} from "@/lib/collectionPagination";

import { CATEGORY_PAGE_SIZE } from "./_config";

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return getArticleSummaryCategories().map((cat) => ({
    category: blogCategoryToSlug(cat),
  }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata
// ---------------------------------------------------------------------------
type PageProps = {
  params: Promise<{ category: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function findCategoryBySlug(slug: string): string | undefined {
  return getArticleSummaryCategories().find(
    (category) => blogCategoryToSlug(category) === slug,
  );
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const page = parsePageParam((await searchParams)?.page);
  const category = findCategoryBySlug(categorySlug);
  if (!category) {
    return {
      title: "Category Not Found",
      robots: { index: false, follow: false },
    };
  }

  const filteredCount = articleSummaries.filter(
    (article) => article.category === category,
  ).length;
  const pageCount = Math.max(1, Math.ceil(filteredCount / CATEGORY_PAGE_SIZE));
  const title = page > 1
    ? `${category} Articles — Page ${page} of ${pageCount}`
    : `${category} Articles`;
  const description = `Browse all ${category.toLowerCase()} articles on the Argumend Blog. Evidence-based analysis and structured reasoning.`;
  const canonical = buildPageHref(
    `https://argumend.org/blog/category/${categorySlug}`,
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
            `https://argumend.org/blog/category/${categorySlug}`,
            page - 1,
          )
        : null,
      next: page < pageCount
        ? buildPageHref(
            `https://argumend.org/blog/category/${categorySlug}`,
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
export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category: categorySlug } = await params;
  const category = findCategoryBySlug(categorySlug);

  if (!category) notFound();

  const allFiltered = articleSummaries
    .filter((a) => a.category === category)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  const pagination = paginate(
    allFiltered,
    parsePageParam((await searchParams)?.page),
    CATEGORY_PAGE_SIZE,
  );
  if (pagination.isOutOfRange) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category} Articles`,
    description: `All ${category.toLowerCase()} articles on the Argumend Blog.`,
    url: buildPageHref(
      `https://argumend.org/blog/category/${categorySlug}`,
      pagination.page,
    ),
    isPartOf: {
      "@type": "Blog",
      name: "ARGUMEND Blog",
      url: "https://argumend.org/blog",
    },
  };

  // The Learn index template, as /blog: the same header, the category chips
  // with this one marked, and the same hairline rows.
  return (
    <CollectionIndex
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Learn", href: LEARN_HUB_HREF },
        { label: "Essays", href: "/blog" },
        { label: category },
      ]}
      eyebrow="Essays"
      title={category}
      meta={`${pagination.total} ${pagination.total === 1 ? "essay" : "essays"} in this category`}
      chips={essayCategoryChips(categorySlug)}
      chipsLabel="Top blog categories"
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
        basePath={`/blog/category/${categorySlug}`}
        currentPage={pagination.page}
        pageCount={pagination.pageCount}
        label={`${category} articles`}
      />
    </CollectionIndex>
  );
}
