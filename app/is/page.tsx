import Link from "next/link";
import type { Metadata } from "next";
import { topics, CATEGORY_LABELS, CATEGORY_ORDER } from "@/data/topics";
import { isClaims } from "@/data/is-claims";
import { confidenceTier } from "@/lib/schemas/topic";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";

// ---------------------------------------------------------------------------
// ISR: Revalidate every 24 hours
// ---------------------------------------------------------------------------

export const revalidate = 86400;

const totalCount = isClaims.length;

export const metadata: Metadata = {
  title: `Is It True? ${totalCount} Claims Fact-Checked with Evidence — ARGUMEND`,
  description: `Direct, evidence-based answers to ${totalCount} "is it true?" questions — from "is nuclear energy safe?" to "do antidepressants work?" Each shows a confidence-rated verdict with steel-manned arguments on both sides.`,
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
    description: `Confidence-rated, evidence-based answers to ${totalCount} contested "is it true?" questions.`,
    url: "https://argumend.org/is",
    siteName: "ARGUMEND",
    images: [
      {
        url: `https://argumend.org/api/og?title=${encodeURIComponent("Is It True?")}&subtitle=${encodeURIComponent(`${totalCount} claims fact-checked with evidence`)}`,
        width: 1200,
        height: 630,
        alt: `${totalCount} claims fact-checked with evidence on Argumend`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Is It True? ${totalCount} Claims Fact-Checked`,
    description: `Confidence-rated, evidence-based answers to contested "is it true?" questions.`,
    images: [
      `https://argumend.org/api/og?title=${encodeURIComponent("Is It True?")}&subtitle=${encodeURIComponent(`${totalCount} claims fact-checked with evidence`)}`,
    ],
  },
};

// ---------------------------------------------------------------------------
// Grouped data
// ---------------------------------------------------------------------------

interface IsEntry {
  slug: string;
  question: string;
  topicId: string;
  topicTitle: string;
  confidence: number;
}

function getGrouped(): Record<string, IsEntry[]> {
  const grouped: Record<string, IsEntry[]> = {};
  for (const cat of CATEGORY_ORDER) grouped[cat] = [];

  for (const claim of isClaims) {
    const topic = topics.find((t) => t.id === claim.topicId);
    if (!topic) continue;
    (grouped[topic.category] ??= []).push({
      slug: claim.slug,
      question: claim.question,
      topicId: topic.id,
      topicTitle: topic.title,
      confidence: topic.confidence_score,
    });
  }
  return grouped;
}

/** Tier → tone classes (teal = settled, stone = thin). No amber per design system. */
function tierTone(pct: number): string {
  const tier = confidenceTier(pct);
  if (tier === "Established") return "bg-deep/10 text-deep border-deep/20";
  if (tier === "Strong") return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
  if (tier === "Contested") return "bg-rust-50 text-rust-700 border-rust-200/60";
  return "bg-stone-100 text-stone-600 border-stone-200/60";
}

export default function IsIndexPage() {
  const grouped = getGrouped();

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Is It True? ${totalCount} Claims Fact-Checked with Evidence`,
    description: `Direct, confidence-rated answers to ${totalCount} contested "is it true?" questions across policy, technology, science, economics, and philosophy.`,
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

      <div className="min-h-[100svh] bg-canvas">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Is it true?" }]} />

          <div className="mb-10">
            <h1 className="font-serif text-4xl font-bold leading-tight text-primary sm:text-5xl">
              Is it true?
            </h1>
            <p className="mt-4 font-sans text-lg text-secondary">
              Direct, evidence-based answers to {totalCount} contested claims — each
              with a confidence-rated verdict and steel-manned arguments on both sides.
              The badge shows how settled the evidence is, not which side is louder.
            </p>
          </div>

          {CATEGORY_ORDER.map((cat) => {
            const entries = grouped[cat];
            if (!entries || entries.length === 0) return null;
            return (
              <section key={cat} className="mt-12" id={cat}>
                <div className="mb-5 flex items-baseline justify-between border-b border-stone-200 pb-3">
                  <h2 className="font-serif text-2xl font-bold text-primary">
                    {CATEGORY_LABELS[cat]}
                  </h2>
                  <span className="font-sans text-sm text-muted">
                    {entries.length} {entries.length === 1 ? "question" : "questions"}
                  </span>
                </div>

                <ul className="space-y-2 list-none p-0">
                  {entries.map((e) => (
                    <li key={e.slug}>
                      <Link
                        href={`/is/${e.slug}`}
                        className="surface-card card-hover flex items-center justify-between gap-4 rounded-lg border border-stone-200/70 dark:border-[#3d3a36] px-4 py-3 transition-colors"
                      >
                        <span className="font-serif text-[17px] leading-snug text-primary">
                          {e.question}
                        </span>
                        <span
                          className={`flex-shrink-0 rounded-full border px-2 py-0.5 font-mono text-[11px] ${tierTone(e.confidence)}`}
                          title={`Confidence ${e.confidence}/100 — ${confidenceTier(e.confidence)}`}
                        >
                          {e.confidence}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}

          <div className="mt-16 rounded-xl border border-rust-200 bg-rust-50 p-8 text-center">
            <h2 className="font-serif text-2xl font-bold text-primary">
              Don&rsquo;t just take the verdict
            </h2>
            <p className="mx-auto mt-2 max-w-md font-sans text-sm text-secondary">
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

          <footer className="mt-16 border-t border-stone-200 pt-6">
            <p className="font-sans text-xs text-muted">
              Each verdict reflects independently weighted evidence, not opinion.{" "}
              <Link
                href="/methodology"
                className="text-deep underline decoration-deep/30 hover:decoration-deep"
              >
                Read our methodology
              </Link>
              .
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
