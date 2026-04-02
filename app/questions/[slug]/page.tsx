import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { topics, CATEGORY_LABELS } from "@/data/topics";
import { getVerdictLabel } from "@/lib/schemas/topic";
import { getAllQuestionVariations, findQuestionBySlug } from "@/lib/questions";
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
  const variations = getAllQuestionVariations(topics);
  return variations.map((v) => ({ slug: v.slug }));
}

// ---------------------------------------------------------------------------
// Dynamic Metadata
// ---------------------------------------------------------------------------

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = findQuestionBySlug(slug, topics);

  if (!result) {
    return { title: "Question Not Found" };
  }

  const { variation, topic } = result;
  const categoryLabel = CATEGORY_LABELS[topic.category];

  return {
    title: variation.question,
    description: variation.metaDescription,
    keywords: [
      variation.question,
      topic.title,
      categoryLabel,
      "argument analysis",
      "evidence-based",
      "pros and cons",
      "debate",
    ],
    alternates: {
      canonical: `https://argumend.org/questions/${variation.slug}`,
    },
    openGraph: {
      type: "article",
      title: `${variation.question} | ARGUMEND`,
      description: variation.metaDescription,
      url: `https://argumend.org/questions/${variation.slug}`,
      siteName: "ARGUMEND",
      images: [
        {
          url: `https://argumend.org/api/og/${topic.id}`,
          width: 1200,
          height: 630,
          alt: variation.question,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${variation.question} | ARGUMEND`,
      description: variation.metaDescription,
      images: [`https://argumend.org/api/og/${topic.id}`],
    },
  };
}

// ---------------------------------------------------------------------------
// Page Component (Server)
// ---------------------------------------------------------------------------

export default async function QuestionPage({ params }: PageProps) {
  const { slug } = await params;
  const result = findQuestionBySlug(slug, topics);

  if (!result) {
    notFound();
  }

  const { variation, topic } = result;
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

  // Build a synthesized answer from the pillars for QAPage schema
  const synthesizedAnswer = [
    `${topic.meta_claim}`,
    `The evidence assessment yields a confidence score of ${topic.confidence_score}/100, which is classified as "${verdict}".`,
    `Key arguments in favor include: ${forArguments.map((a) => a.summary).join(" ")}`,
    `Key arguments against include: ${againstArguments.map((a) => a.summary).join(" ")}`,
  ].join(" ");

  // JSON-LD: QAPage schema (primary structured data for question pages)
  const qaPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: variation.question,
      text: variation.metaDescription,
      answerCount: 1,
      acceptedAnswer: {
        "@type": "Answer",
        text: synthesizedAnswer,
        url: `https://argumend.org/questions/${variation.slug}`,
        author: {
          "@type": "Organization",
          name: "ARGUMEND",
          url: "https://argumend.org",
        },
      },
    },
  };

  // JSON-LD: FAQPage schema from pillars (for additional rich snippets)
  const faqEntries = topic.pillars.map((pillar) => ({
    "@type": "Question" as const,
    name: `What does the evidence say about "${pillar.title}"?`,
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: `For: ${pillar.proponent_rebuttal} Against: ${pillar.skeptic_premise}`,
    },
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: variation.question,
    description: variation.metaDescription,
    mainEntity: faqEntries,
  };

  // JSON-LD: Article schema
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: variation.question,
    description: topic.meta_claim,
    url: `https://argumend.org/questions/${variation.slug}`,
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
    datePublished: "2025-01-01",
    dateModified: "2026-03-19",
    articleSection: categoryLabel,
    inLanguage: "en-US",
    about: {
      "@type": "Thing",
      name: topic.title,
    },
  };

  // Compute cross-linked text segments for the meta_claim
  const metaClaimSegments = getTopicMentions(
    topic.meta_claim,
    linkTargets,
    topic.id
  );

  // Related questions from the same topic
  const relatedQuestions = getAllQuestionVariations(topics).filter(
    (v) => v.topicId === topic.id && v.slug !== variation.slug
  );

  // Questions from other topics in the same category (for broader discovery)
  const crossTopicQuestions = getAllQuestionVariations(topics)
    .filter((v) => {
      const vTopic = topics.find((t) => t.id === v.topicId);
      return (
        vTopic &&
        vTopic.category === topic.category &&
        v.topicId !== topic.id
      );
    })
    .slice(0, 5);

  return (
    <>
      <JsonLd data={qaPageJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={articleJsonLd} />

      <div className="min-h-screen bg-canvas">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Questions", href: "/questions" },
              { label: topic.title, href: `/topics/${topic.id}` },
              { label: variation.question },
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
            {variation.question}
          </h1>

          {/* Intro paragraph with cross-links */}
          <p className="mt-6 font-sans text-lg leading-relaxed text-secondary">
            <LinkedText segments={metaClaimSegments} />
          </p>

          {/* Confidence verdict */}
          <div className="mt-6 rounded-lg border border-deep/15 bg-panel p-4">
            <p className="font-sans text-sm text-muted">
              Evidence assessment
            </p>
            <p className="mt-1 font-serif text-xl font-semibold text-primary">
              {verdict}
            </p>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-stone-200">
              <div
                className="h-full rounded-full bg-deep transition-all"
                style={{ width: `${topic.confidence_score}%` }}
              />
            </div>
            <p className="mt-1 font-sans text-xs text-muted">
              Confidence score: {topic.confidence_score}/100 across{" "}
              {topic.pillars.length} argument pillars
            </p>
          </div>

          {/* Arguments: For & Against */}
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {/* For column */}
            <div>
              <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
                Arguments for
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
                          topic.id
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
                Arguments against
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
                          topic.id
                        )}
                      />
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key crux questions */}
          <div className="mt-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
              The crux questions
            </h2>
            <p className="mb-6 font-sans text-sm text-secondary">
              These are the decisive points that could resolve the debate.
              Each pillar has a crux — a testable or definitive question
              that, if answered, would shift the balance of evidence.
            </p>
            <ul className="space-y-3">
              {topic.pillars.map((pillar) => (
                <li
                  key={pillar.crux.id}
                  className="rounded-lg border border-deep/10 bg-panel p-4"
                >
                  <h3 className="font-sans text-sm font-semibold text-deep">
                    {pillar.crux.title}
                  </h3>
                  <p className="mt-1 font-sans text-sm leading-relaxed text-secondary">
                    {pillar.crux.description}
                  </p>
                  <p className="mt-2 font-sans text-xs text-muted">
                    Status:{" "}
                    <span className="font-medium capitalize">
                      {pillar.crux.verification_status.replace("_", " ")}
                    </span>{" "}
                    &middot; Cost: {pillar.crux.cost_to_verify}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA to full topic page */}
          <div className="mt-12 rounded-xl border border-rust-200 bg-rust-50 p-8 text-center">
            <h2 className="font-serif text-2xl font-bold text-primary">
              Explore the full analysis
            </h2>
            <p className="mx-auto mt-2 max-w-md font-sans text-sm text-secondary">
              See all the evidence, weighted scores, and detailed analysis
              for each argument pillar on the full{" "}
              <strong>{topic.title}</strong> topic page.
            </p>
            <Link
              href={`/topics/${topic.id}`}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-rust-500 to-rust-600 px-6 py-3 font-sans text-sm font-semibold text-white shadow-md transition-all hover:from-rust-600 hover:to-rust-700 hover:shadow-lg"
            >
              See the full debate
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Related questions from the same topic */}
          {relatedQuestions.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-4 font-serif text-xl font-bold text-primary">
                Related questions about {topic.title}
              </h2>
              <ul className="space-y-2">
                {relatedQuestions.map((v) => (
                  <li key={v.slug}>
                    <Link
                      href={`/questions/${v.slug}`}
                      className="font-sans text-deep underline decoration-deep/30 transition-colors hover:text-deep-dark hover:decoration-deep"
                    >
                      {v.question}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Cross-topic questions (same category) */}
          {crossTopicQuestions.length > 0 && (
            <div className="mt-10">
              <h2 className="mb-4 font-serif text-xl font-bold text-primary">
                More {categoryLabel.toLowerCase()} questions
              </h2>
              <ul className="space-y-2">
                {crossTopicQuestions.map((v) => (
                  <li key={v.slug}>
                    <Link
                      href={`/questions/${v.slug}`}
                      className="font-sans text-deep underline decoration-deep/30 transition-colors hover:text-deep-dark hover:decoration-deep"
                    >
                      {v.question}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/questions"
                className="mt-4 inline-flex items-center gap-1 font-sans text-sm text-muted transition-colors hover:text-deep"
              >
                Browse all questions <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          )}

          {/* Footer attribution */}
          <footer className="mt-16 border-t border-stone-200 pt-6">
            <p className="font-sans text-xs text-muted">
              This analysis is generated by ARGUMEND using structured
              argument mapping. Every claim is steel-manned, every piece
              of evidence is independently weighted. Not a poll. Not an
              opinion.{" "}
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
