import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { topics, CATEGORY_LABELS } from "@/data/topics";
import { getVerdictLabel } from "@/lib/schemas/topic";
import { isClaims } from "@/data/is-claims";
import { getTopicMentions, buildTopicLinkTargets } from "@/lib/topic-links";
import { LinkedText } from "@/components/LinkedText";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";

// ---------------------------------------------------------------------------
// ISR: Revalidate every 24 hours
// ---------------------------------------------------------------------------

export const revalidate = 86400;

// ---------------------------------------------------------------------------
// Static Generation
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return isClaims.map((c) => ({ slug: c.slug }));
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function findClaim(slug: string) {
  const claim = isClaims.find((c) => c.slug === slug);
  if (!claim) return null;
  const topic = topics.find((t) => t.id === claim.topicId);
  if (!topic) return null;
  return { claim, topic };
}

// ---------------------------------------------------------------------------
// Dynamic Metadata
// ---------------------------------------------------------------------------

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = findClaim(slug);

  if (!result) {
    return { title: "Claim Not Found" };
  }

  const { claim, topic } = result;
  const verdict = getVerdictLabel(topic.confidence_score);
  const description = `${claim.claim}. Evidence assessment: ${verdict} (${topic.confidence_score}/100). Explore ${topic.pillars.length} argument pillars with weighted evidence.`;

  return {
    title: `${claim.question} | Evidence-Based Answer`,
    description,
    keywords: [
      claim.question,
      claim.claim,
      topic.title,
      "evidence-based",
      "fact check",
      "argument analysis",
      "is it true",
    ],
    alternates: {
      canonical: `https://argumend.org/is/${claim.slug}`,
    },
    openGraph: {
      type: "article",
      title: `${claim.question} | ARGUMEND`,
      description,
      url: `https://argumend.org/is/${claim.slug}`,
      siteName: "ARGUMEND",
      images: [
        {
          url: `https://argumend.org/api/og/${topic.id}`,
          width: 1200,
          height: 630,
          alt: claim.question,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${claim.question} | ARGUMEND`,
      description,
      images: [`https://argumend.org/api/og/${topic.id}`],
    },
  };
}

// ---------------------------------------------------------------------------
// Page Component (Server)
// ---------------------------------------------------------------------------

export default async function IsClaimPage({ params }: PageProps) {
  const { slug } = await params;
  const result = findClaim(slug);

  if (!result) {
    notFound();
  }

  const { claim, topic } = result;
  const verdict = getVerdictLabel(topic.confidence_score);
  const categoryLabel = CATEGORY_LABELS[topic.category];

  // Topic link targets for cross-linking
  const linkTargets = buildTopicLinkTargets(topics);

  // Collect "for" and "against" arguments from pillars
  const forArguments: { title: string; summary: string }[] = [];
  const againstArguments: { title: string; summary: string }[] = [];

  for (const pillar of topic.pillars) {
    forArguments.push({
      title: pillar.title,
      summary: pillar.proponent_rebuttal,
    });
    againstArguments.push({
      title: pillar.title,
      summary: pillar.skeptic_premise,
    });
  }

  // Count total evidence pieces across all pillars
  const totalEvidence = topic.pillars.reduce(
    (sum, p) => sum + (p.evidence?.length ?? 0),
    0,
  );

  // Synthesized answer for JSON-LD
  const synthesizedAnswer = [
    `${claim.claim}.`,
    `Based on ${totalEvidence} pieces of evidence across ${topic.pillars.length} argument pillars, the evidence assessment is: ${verdict} (Confidence: ${topic.confidence_score}/100).`,
    `Key arguments in favor: ${forArguments.map((a) => a.summary).join(" ")}`,
    `Key arguments against: ${againstArguments.map((a) => a.summary).join(" ")}`,
  ].join(" ");

  // Cross-linked text segments for the meta_claim
  const metaClaimSegments = getTopicMentions(
    topic.meta_claim,
    linkTargets,
    topic.id,
  );

  // ── JSON-LD: QAPage schema ─────────────────────────────────────────────
  const qaPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: claim.question,
      text: claim.claim,
      answerCount: 1,
      acceptedAnswer: {
        "@type": "Answer",
        text: synthesizedAnswer,
        url: `https://argumend.org/is/${claim.slug}`,
        author: {
          "@type": "Organization",
          name: "ARGUMEND",
          url: "https://argumend.org",
        },
      },
    },
  };

  // ── JSON-LD: Article schema ─────────────────────────────────────────────
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: claim.question,
    description: claim.claim,
    url: `https://argumend.org/is/${claim.slug}`,
    author: {
      "@type": "Organization",
      name: "ARGUMEND",
      url: "https://argumend.org",
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
    datePublished: "2026-03-25",
    dateModified: "2026-03-25",
    articleSection: categoryLabel,
    inLanguage: "en-US",
    about: {
      "@type": "Thing",
      name: topic.title,
    },
  };

  // Confidence bar color based on score
  const confidenceColor =
    topic.confidence_score >= 75
      ? "bg-deep"
      : topic.confidence_score >= 50
        ? "bg-deep/70"
        : "bg-stone-400";

  // Related "is" claims (exclude current)
  const relatedClaims = isClaims.filter((c) => c.slug !== claim.slug);

  return (
    <>
      <JsonLd data={qaPageJsonLd} />
      <JsonLd data={articleJsonLd} />

      <div className="min-h-screen bg-canvas">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: topic.title, href: `/topics/${topic.id}` },
              { label: claim.question },
            ]}
          />

          {/* Category badge */}
          <div className="mb-6">
            <span className="inline-block rounded-full bg-deep/10 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wide text-deep">
              {categoryLabel}
            </span>
          </div>

          {/* Main question heading */}
          <h1 className="font-serif text-4xl font-bold leading-tight text-primary sm:text-5xl">
            {claim.question}
          </h1>

          {/* Direct answer */}
          <div className="mt-8 rounded-xl border border-deep/15 bg-panel p-6">
            <p className="font-sans text-xs font-semibold uppercase tracking-wide text-deep">
              Evidence-based assessment
            </p>
            <p className="mt-3 font-sans text-lg leading-relaxed text-primary">
              Based on{" "}
              <strong className="font-semibold">
                {totalEvidence} pieces of evidence
              </strong>{" "}
              across{" "}
              <strong className="font-semibold">
                {topic.pillars.length} argument pillars
              </strong>
              , the evidence assessment is:
            </p>

            {/* Verdict + confidence score */}
            <div className="mt-4">
              <p className="font-serif text-2xl font-bold text-primary">
                {verdict}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-stone-200">
                  <div
                    className={`h-full rounded-full ${confidenceColor} transition-all`}
                    style={{ width: `${topic.confidence_score}%` }}
                  />
                </div>
                <span className="font-sans text-sm font-semibold text-primary tabular-nums">
                  {topic.confidence_score}/100
                </span>
              </div>
            </div>
          </div>

          {/* The claim being evaluated */}
          <div className="mt-8">
            <h2 className="font-serif text-xl font-bold text-primary">
              The claim
            </h2>
            <p className="mt-2 font-sans text-base italic leading-relaxed text-secondary">
              &ldquo;{claim.claim}&rdquo;
            </p>
          </div>

          {/* Meta claim / context with cross-links */}
          <div className="mt-6">
            <h2 className="font-serif text-xl font-bold text-primary">
              Context
            </h2>
            <p className="mt-2 font-sans text-base leading-relaxed text-secondary">
              <LinkedText segments={metaClaimSegments} />
            </p>
          </div>

          {/* Key arguments: For & Against */}
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {/* For column */}
            <div>
              <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
                Key arguments for
              </h2>
              <ul className="space-y-4">
                {forArguments.map((arg, i) => (
                  <li
                    key={i}
                    className="rounded-lg border border-rust-200 bg-rust-50 p-4"
                  >
                    <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-rust-700">
                      {arg.title}
                    </h3>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-primary">
                      <LinkedText
                        segments={getTopicMentions(
                          arg.summary,
                          linkTargets,
                          topic.id,
                        )}
                      />
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Against column */}
            <div>
              <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
                Key arguments against
              </h2>
              <ul className="space-y-4">
                {againstArguments.map((arg, i) => (
                  <li
                    key={i}
                    className="rounded-lg border border-stone-200 bg-stone-50 p-4"
                  >
                    <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-stone-600">
                      {arg.title}
                    </h3>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-primary">
                      <LinkedText
                        segments={getTopicMentions(
                          arg.summary,
                          linkTargets,
                          topic.id,
                        )}
                      />
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA to full topic page */}
          <div className="mt-12 rounded-xl border border-rust-200 bg-rust-50 p-8 text-center">
            <h2 className="font-serif text-2xl font-bold text-primary">
              See the full argument map
            </h2>
            <p className="mx-auto mt-2 max-w-md font-sans text-sm text-secondary">
              Explore all the evidence, weighted scores, crux questions, and
              detailed analysis for each argument pillar on the full{" "}
              <strong>{topic.title}</strong> topic page.
            </p>
            <Link
              href={`/topics/${topic.id}`}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-rust-500 to-rust-600 px-6 py-3 font-sans text-sm font-semibold text-white shadow-md transition-all hover:from-rust-600 hover:to-rust-700 hover:shadow-lg"
            >
              See the full argument map
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Related "Is ... ?" questions */}
          {relatedClaims.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-4 font-serif text-xl font-bold text-primary">
                More questions people ask
              </h2>
              <ul className="space-y-2">
                {relatedClaims.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/is/${c.slug}`}
                      className="font-sans text-deep underline decoration-deep/30 transition-colors hover:text-deep-dark hover:decoration-deep"
                    >
                      {c.question}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer attribution */}
          <footer className="mt-16 border-t border-stone-200 pt-6">
            <p className="font-sans text-xs text-muted">
              This analysis is generated by ARGUMEND using structured argument
              mapping. Every claim is steel-manned, every piece of evidence is
              independently weighted. Not a poll. Not an opinion.{" "}
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
