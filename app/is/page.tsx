import Link from "next/link";
import type { Metadata } from "next";
import {
  topicSummaries as topics,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
} from "@/data/topicIndex";
import { isClaims } from "@/data/is-claims";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { IsHubClient, type IsCategoryGroup } from "./IsHubClient";
import { buildGenericOgUrl } from "@/lib/og";

// ---------------------------------------------------------------------------
// ISR: Revalidate every 24 hours
// ---------------------------------------------------------------------------

export const revalidate = 86400;

const totalCount = isClaims.length;
const SOCIAL_IMAGE = buildGenericOgUrl({
  title: "Is It True?",
  subtitle: `${totalCount} claims fact-checked with evidence`,
});

export const metadata: Metadata = {
  title: `Is It True? ${totalCount} Claims Fact-Checked with Evidence`,
  description: `Direct, evidence-based answers to ${totalCount} "is it true?" questions — from "is nuclear energy safe?" to "do antidepressants work?" Each separates evidence balance from evidential weight.`,
  keywords: [
    "is it true",
    "fact check",
    "evidence-based answers",
    "is X true",
    "claim verification",
    "what does the evidence say",
  ],
  alternates: { canonical: "https://argumend.org/is" },
  openGraph: {
    title: `Is It True? ${totalCount} Claims Fact-Checked with Evidence`,
    description: `Evidence-based answers to ${totalCount} contested questions with separate balance and weight scores.`,
    url: "https://argumend.org/is",
    siteName: "ARGUMEND",
    images: [
      {
        url: SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: `${totalCount} claims fact-checked with evidence on Argumend`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Is It True? ${totalCount} Claims Fact-Checked`,
    description: `Evidence-based answers to contested questions with separate balance and weight scores.`,
    images: [
      SOCIAL_IMAGE,
    ],
  },
};

// ---------------------------------------------------------------------------
// Grouped data — built server-side and passed to the client interactivity
// layer. Every category/question is rendered in the initial HTML (SSR), so the
// client's search/filter/sort only narrows an already-crawlable list.
// ---------------------------------------------------------------------------

function getGroups(): IsCategoryGroup[] {
  const byCategory: Record<string, IsCategoryGroup["entries"]> = {};
  for (const cat of CATEGORY_ORDER) byCategory[cat] = [];

  for (const claim of isClaims) {
    const topic = topics.find((t) => t.id === claim.topicId);
    if (!topic) continue;
    (byCategory[topic.category] ??= []).push({
      slug: claim.slug,
      question: claim.question,
      balance: topic.balance,
      weight: topic.weight,
      verdict: topic.verdict,
    });
  }

  return CATEGORY_ORDER.filter((cat) => byCategory[cat]?.length).map((cat) => ({
    id: cat,
    label: CATEGORY_LABELS[cat],
    entries: byCategory[cat] ?? [],
  }));
}

export default function IsIndexPage() {
  const groups = getGroups();

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Is It True? ${totalCount} Claims Fact-Checked with Evidence`,
    description: `Direct answers to ${totalCount} contested questions with evidence balance and weight across policy, technology, science, economics, and philosophy.`,
    url: "https://argumend.org/is",
    publisher: {
      "@type": "Organization",
      name: "ARGUMEND",
      url: "https://argumend.org",
    },
    numberOfItems: totalCount,
    hasPart: isClaims.slice(0, 50).map((c) => ({
      "@type": "QAPage",
      url: `https://argumend.org/is/${c.slug}`,
      name: c.question,
    })),
  };

  return (
    <>
      <JsonLd data={collectionJsonLd} />

      <main id="main-content" className="min-h-[100svh] bg-canvas">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Is it true?" }]} />

          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold leading-tight text-primary dark:text-stone-200 sm:text-5xl">
              Is it true?
            </h1>
            <p className="mt-4 font-sans text-lg text-secondary dark:text-stone-400">
              Direct, evidence-based answers to {totalCount} contested claims — each
              with separate evidence balance and weight plus steel-manned arguments on
              both sides. The badge shows both which way the evidence leans and how
              much evidence supports that assessment.
            </p>
          </div>

          <IsHubClient groups={groups} totalCount={totalCount} />

          <div className="mt-16 rounded-xl border border-rust-200 bg-rust-50 p-8 text-center dark:border-rust-800/70 dark:bg-rust-900/30">
            <h2 className="font-serif text-2xl font-bold text-primary dark:text-stone-200">
              Don&rsquo;t just take the verdict
            </h2>
            <p className="mx-auto mt-2 max-w-md font-sans text-sm text-secondary dark:text-stone-400">
              Every answer links to a full topic page with the argument map, weighted
              evidence, and the crux that would change each side&rsquo;s mind.
            </p>
            <Link
              href="/topics"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-rust-500 to-rust-600 px-6 py-3 font-sans text-sm font-semibold text-white shadow-md transition-all hover:from-rust-600 hover:to-rust-700 hover:shadow-lg"
            >
              Browse all topics
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <footer className="mt-16 border-t border-stone-200 pt-6 dark:border-[var(--border-default)]">
            <p className="font-sans text-xs text-muted dark:text-stone-400">
              Each verdict reflects independently weighted evidence, not opinion.{" "}
              <Link
                href="/methodology"
                className="text-deep underline decoration-deep/30 hover:decoration-deep dark:text-teal-300"
              >
                Read our methodology
              </Link>
              .
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
