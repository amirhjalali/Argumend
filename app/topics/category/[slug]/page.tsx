import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle, AlertCircle, HelpCircle } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import {
  topicSummaries,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
} from "@/data/topicIndex";
import type { TopicCategory, TopicStatus, TopicSummary } from "@/data/topicIndex";
import {
  categoryColors,
  statusColors,
  categoryTopBorder,
} from "@/lib/categoryColors";

// ---------------------------------------------------------------------------
// Slug helpers — categories are single words, so the slug is the category id.
// ---------------------------------------------------------------------------
function categoryToSlug(category: TopicCategory): string {
  return category;
}

function findCategoryBySlug(slug: string): TopicCategory | undefined {
  return CATEGORY_ORDER.find((c) => categoryToSlug(c) === slug);
}

// ---------------------------------------------------------------------------
// Status badge config (mirrors /topics card styling)
// ---------------------------------------------------------------------------
const statusIcons: Record<TopicStatus, typeof CheckCircle> = {
  settled: CheckCircle,
  contested: AlertCircle,
  highly_speculative: HelpCircle,
};

// ---------------------------------------------------------------------------
// Static params — one page per category.
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return CATEGORY_ORDER.map((cat) => ({ slug: categoryToSlug(cat) }));
}

export const dynamicParams = false;

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = findCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found — Argumend" };

  const label = CATEGORY_LABELS[category];
  const count = topicSummaries.filter((t) => t.category === category).length;
  const title = `${label} Debates — Argumend`;
  const description = `Explore ${count} ${label.toLowerCase()} debates mapped as interactive argument graphs — steel-man positions, weighted evidence, and crux questions.`;
  const url = `https://argumend.org/topics/category/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: "ARGUMEND",
    },
    alternates: { canonical: url },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function TopicCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = findCategoryBySlug(slug);

  if (!category) notFound();

  const label = CATEGORY_LABELS[category];
  const topics: TopicSummary[] = topicSummaries
    .filter((t) => t.category === category)
    .sort((a, b) => b.confidence_score - a.confidence_score);

  const url = `https://argumend.org/topics/category/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${label} Debates`,
    description: `All ${label.toLowerCase()} debates mapped on Argumend.`,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: "ARGUMEND",
      url: "https://argumend.org",
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: topics.length,
      itemListElement: topics.map((topic, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: topic.title,
        url: `https://argumend.org/topics/${topic.id}`,
        description: topic.meta_claim,
      })),
    },
  };

  return (
    <AppShell>
      <JsonLd data={jsonLd} />
      <div className="min-h-[100svh] bg-transparent">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header */}
          <div className="mb-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Topics", href: "/topics" },
                { label },
              ]}
            />
            <p className="text-xs font-medium uppercase tracking-widest text-muted dark:text-stone-400 mb-3">
              Category
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary mb-6 leading-[1.08]">
              {label} Debates
            </h1>
            <p className="text-lg text-secondary leading-relaxed max-w-2xl">
              <span className="font-mono text-stone-700 dark:text-stone-300">
                {topics.length}
              </span>{" "}
              {label.toLowerCase()} debate{topics.length !== 1 ? "s" : ""} mapped
              with steel-man arguments, weighted evidence, and crux questions.
            </p>
          </div>

          {/* Topic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {topics.map((topic, index) => {
              const StatusIcon = statusIcons[topic.status];
              return (
                <Link
                  key={topic.id}
                  href={`/topics/${topic.id}`}
                  className={`group flex flex-col bg-white dark:bg-[var(--bg-card)] border border-stone-200/60 dark:border-[var(--border-default)] border-t-[3px] rounded-xl p-5 pb-4 shadow-card hover:border-x-deep/30 hover:border-b-deep/30 dark:hover:border-x-deep/50 dark:hover:border-b-deep/50 hover:shadow-lw-hover hover:-translate-y-0.5 transition-all duration-200 animate-card-fade-in card-hover ${categoryTopBorder[topic.category]}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <h2 className="font-serif text-lg text-stone-900 dark:text-[var(--text-heading)] group-hover:text-deep transition-colors leading-snug mb-3">
                    {topic.title}
                  </h2>

                  <p className="text-sm text-stone-500 leading-relaxed line-clamp-2 mb-4 flex-1">
                    {topic.meta_claim}
                  </p>

                  <div className="flex items-center gap-2.5 mb-3">
                    <div
                      className="h-1.5 flex-1 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden"
                      role="meter"
                      aria-valuenow={topic.confidence_score}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`Confidence: ${topic.confidence_score}%`}
                    >
                      <div
                        className="h-full bg-deep rounded-full transition-all duration-500 animate-bar-fill"
                        style={{ width: `${topic.confidence_score}%` }}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="flex-shrink-0 font-mono text-sm tabular-nums text-stone-600 dark:text-stone-400">
                      {topic.confidence_score}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-3 mt-auto border-t border-stone-100 dark:border-stone-700/50">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border capitalize ${categoryColors[topic.category]}`}
                      >
                        {topic.category}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${statusColors[topic.status]}`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {topic.status.replace("_", " ")}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-500">
                      {topic.pillarCount} pillars
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Browse other categories */}
          <div className="mt-12 pt-8 border-t border-stone-200/60 dark:border-[var(--border-default)]">
            <p className="text-xs font-medium uppercase tracking-widest text-muted dark:text-stone-400 mb-4">
              Browse other categories
            </p>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_ORDER.filter((c) => c !== category).map((cat) => (
                <Link
                  key={cat}
                  href={`/topics/category/${categoryToSlug(cat)}`}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white dark:bg-[var(--bg-card)] text-stone-600 dark:text-stone-400 border border-stone-200/60 dark:border-[var(--border-default)] hover:border-deep/30 dark:hover:border-deep/50 hover:text-deep transition-colors"
                >
                  {CATEGORY_LABELS[cat]}
                </Link>
              ))}
            </div>
          </div>

          {/* Back to all topics */}
          <div className="mt-10 text-center">
            <Link
              href="/topics"
              className="inline-flex items-center gap-2 text-sm font-medium text-deep hover:text-deep-dark transition-colors"
            >
              <ArrowRight className="h-3.5 w-3.5 rotate-180" />
              Back to all topics
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
