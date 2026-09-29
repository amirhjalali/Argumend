import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { topicSummaries, CATEGORY_LABELS } from "@/data/topicIndex";
import { loadTopicById } from "@/data/topicLoader";
import {
  findQuestionBySlug,
  getAllQuestionVariations,
  getPrimaryQuestionVariations,
  getQuestionVariations,
} from "@/lib/questions";
import { classifyQuestion } from "@/lib/questionMeta";
import { legacyTopicPage } from "@/lib/topicPage/legacy";
import { getTopicMentions, buildTopicLinkTargets } from "@/lib/topic-links";
import { mapLinkFor } from "@/lib/learn/nextStep";
import { buildTopicOgUrl } from "@/lib/og";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { ArticleLayout, type RelatedItem } from "@/components/learn/ArticleLayout";
import {
  AgreementBlock,
  CruxSheet,
  PositionCards,
  type CruxEntryView,
} from "@/components/topic/TopicPage";
import { asSentence } from "@/components/topic/cruxPrimitives";
import { LinkedText } from "@/components/LinkedText";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/ui/Section";

// ---------------------------------------------------------------------------
// ISR: Revalidate every 24 hours
// ---------------------------------------------------------------------------

export const revalidate = 86400;

// ---------------------------------------------------------------------------
// Static Generation
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return getAllQuestionVariations(topicSummaries).map((v) => ({ slug: v.slug }));
}

const questionUrl = (slug: string) => `${SITE_URL}/questions/${slug}`;

// ---------------------------------------------------------------------------
// Metadata: every phrasing of a topic's question renders, but only the
// primary one is canonical.
// ---------------------------------------------------------------------------

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = findQuestionBySlug(slug, topicSummaries);
  if (!result) {
    return { title: "Question Not Found", robots: { index: false, follow: true } };
  }

  const { variation, topic } = result;
  const primary = getQuestionVariations(topic)[0];
  const canonical = questionUrl(primary.slug);
  const title = variation.question;

  return {
    title,
    description: variation.metaDescription,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: `${title} | ${SITE_NAME}`,
      description: variation.metaDescription,
      url: canonical,
      siteName: SITE_NAME,
      images: [{ url: buildTopicOgUrl(topic.id), width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description: variation.metaDescription,
      images: [buildTopicOgUrl(topic.id)],
    },
  };
}

// ---------------------------------------------------------------------------
// Page: crux first. The question, what kind of question it is (fact or
// value?), what both sides already agree on, what it turns on and what would
// settle it, then the two sides, then the whole map. No verdict: the map owns
// the evidence readings, and this page never names a winner.
// ---------------------------------------------------------------------------

export default async function QuestionPage({ params }: PageProps) {
  const { slug } = await params;
  const summaryResult = findQuestionBySlug(slug, topicSummaries);
  if (!summaryResult) notFound();

  const topic = await loadTopicById(summaryResult.topic.id);
  if (!topic) notFound();

  const { variation } = summaryResult;
  const variations = getQuestionVariations(summaryResult.topic);
  const primary = variations[0];
  const alsoAskedAs = variations.filter((v) => v.slug !== variation.slug);
  const kind = classifyQuestion(variation.question);

  // The same page model and crux sheet as the topic page, so a question page
  // and its map read as one thing. The map keeps the evidence cards.
  const { page, cruxes } = legacyTopicPage(topic);
  const cruxViews: CruxEntryView[] = cruxes.map((crux) => ({ ...crux, evidence: undefined }));

  const linkTargets = buildTopicLinkTargets(topicSummaries);
  const claimSegments = getTopicMentions(topic.meta_claim, linkTargets, topic.id);

  const related: RelatedItem[] = getPrimaryQuestionVariations(topicSummaries)
    .filter((v) => {
      if (v.topicId === topic.id) return false;
      return topicSummaries.find((t) => t.id === v.topicId)?.category === topic.category;
    })
    .slice(0, 3)
    .map((v) => ({
      href: `/questions/${v.slug}`,
      title: v.question,
      kind: "Question",
      description: topicSummaries.find((t) => t.id === v.topicId)?.title,
    }));

  // QAPage: the answer describes what the question turns on, never a verdict.
  const answer = [
    cruxes.length > 0
      ? `This question turns on ${cruxes.length} ${cruxes.length === 1 ? "question" : "questions"}.`
      : "",
    ...cruxes.map((crux) =>
      `${asSentence(crux.question)} What would settle it: ${asSentence(crux.settle.condition ?? "")}`.trim(),
    ),
    page.agreement.length > 0 ? `Both sides already agree: ${page.agreement.join(" ")}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const qaPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    url: questionUrl(primary.slug),
    mainEntity: {
      "@type": "Question",
      name: variation.question,
      text: variation.question,
      answerCount: 1,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
        url: `${SITE_URL}/topics/${topic.id}`,
        author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      },
    },
  };

  return (
    <ArticleLayout
      kind="question"
      title={variation.question}
      lede={
        <>
          <span className="text-primary">{kind.plain}</span> {kind.description}
        </>
      }
      meta={`${CATEGORY_LABELS[topic.category]} · from the map “${topic.title}”`}
      nextMap={mapLinkFor(topic.id) ?? { href: `/topics/${topic.id}`, title: topic.title }}
      nextMapLabel="Read the whole map"
      related={related}
      chrome={<JsonLd data={qaPageJsonLd} />}
    >
      <p className="font-sans text-sm leading-relaxed text-muted">
        <span className="font-medium text-secondary">The claim the map weighs:</span>{" "}
        <LinkedText segments={claimSegments} />
      </p>

      <AgreementBlock heading={page.agreementHeading} items={page.agreement} />
      <CruxSheet page={page} cruxes={cruxViews} />
      <PositionCards heading={page.positionsHeading} note={page.positionsNote} cards={page.positions} />

      {alsoAskedAs.length > 0 ? (
        <Section id="also-asked" title="Also asked as" className="mt-12">
          <ul className="border-b border-divider">
            {alsoAskedAs.map((v, index) => (
              <li key={v.slug} className={index > 0 ? "border-t border-divider" : undefined}>
                <Link
                  href={`/questions/${v.slug}`}
                  className="flex min-h-11 items-center rounded-sm py-2.5 font-serif text-lg leading-snug text-primary transition-colors hover:text-accent-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                >
                  {v.question}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </ArticleLayout>
  );
}
