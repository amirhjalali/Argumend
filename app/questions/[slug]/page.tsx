import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { topicSummaries, CATEGORY_LABELS } from "@/data/topicIndex";
import { loadTopicById } from "@/data/topicLoader";
import {
  findQuestionBySlug,
  getAllQuestionVariations,
  getPrimaryQuestionSlug,
  getQuestionVariations,
  getTopicQuestionPhrasings,
} from "@/lib/questions";
import { classifyQuestion } from "@/lib/questionMeta";
import { legacyTopicPage } from "@/lib/topicPage/legacy";
import { standingLineFor, type SettleView } from "@/lib/topicPage/model";
import { getRelatedMaps } from "@/lib/relatedMaps";
import { getTopicMentions, buildTopicLinkTargets } from "@/lib/topic-links";
import { mapLinkFor } from "@/lib/learn/nextStep";
import { mapDisplayTitle } from "@/lib/mapNaming";
import { buildTopicOgUrl } from "@/lib/og";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { ArticleLayout, type RelatedItem } from "@/components/learn/ArticleLayout";
import { AgreementBlock } from "@/components/topic/TopicPage";
import { SettleAnswer, asSentence } from "@/components/topic/cruxPrimitives";
import { LinkedText } from "@/components/LinkedText";
import { JsonLd } from "@/components/JsonLd";
import { Button, Section, TextAction } from "@/components/ui";

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
// Page: the question's crux, then the map. A question page is the short way
// in, not a second copy of the map. It leads with the first question the map
// says the fight turns on and what would settle it (the topic page's own crux
// model and settle line), sends the reader to the full map, then names the
// map's other crux questions, what both sides already agree on and the other
// phrasings. The evidence, both sides' full cases and the other settle lines
// stay on the map. No verdict, ever.
// ---------------------------------------------------------------------------

const ROW_LINK =
  "flex min-h-11 items-center rounded-sm py-2.5 font-serif text-lg leading-snug text-primary transition-colors hover:text-accent-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus";

/** The settle line as the crux card prints it. */
function settleLine(settle: SettleView): string {
  return settle.mode === "standing"
    ? standingLineFor(settle.kind)
    : asSentence(settle.condition ?? "Not yet specified.");
}

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
  // The topic page's own model, so the crux and its settle line read here
  // exactly as they do on the map.
  const { page, cruxes } = legacyTopicPage(topic);
  const [lead, ...otherCruxes] = cruxes;
  // A page that turns first on a value weighing says so in its kind line.
  const kind = classifyQuestion(
    variation.question,
    lead?.settle.mode === "standing" ? lead.settle.kind : undefined,
  );
  const mapHref = `/topics/${topic.id}`;

  const linkTargets = buildTopicLinkTargets(topicSummaries);
  const claimSegments = getTopicMentions(topic.meta_claim, linkTargets, topic.id);

  // The same neighbours as the map's "Keep exploring" (lib/relatedMaps.ts),
  // each as its question page where it has one.
  const related: RelatedItem[] = (await getRelatedMaps(topic.id)).map((map) => {
    const questionSlug = getPrimaryQuestionSlug(map.id);
    const question = getTopicQuestionPhrasings(map.id)[0];
    return questionSlug && question
      ? { href: `/questions/${questionSlug}`, title: question, kind: "Question", description: map.title }
      : { href: `/topics/${map.id}`, title: map.title, kind: "Map" };
  });

  // QAPage: the answer is what the page shows (the first crux and its settle
  // line, the other crux questions, the agreement), never a verdict.
  const answer = [
    cruxes.length > 0
      ? `This question turns on ${cruxes.length} ${cruxes.length === 1 ? "question" : "questions"}.`
      : "",
    lead ? `First: ${asSentence(lead.question)} What would settle it: ${settleLine(lead.settle)}` : "",
    otherCruxes.length > 0
      ? `It also turns on: ${otherCruxes.map((crux) => asSentence(crux.question)).join(" ")}`
      : "",
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
        url: `${SITE_URL}${mapHref}`,
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
      meta={`${CATEGORY_LABELS[topic.category]} · from the map “${mapDisplayTitle(topic)}”`}
      nextMap={mapLinkFor(topic.id) ?? { href: mapHref, title: mapDisplayTitle(topic) }}
      nextMapLabel="Read the whole map"
      related={related}
      chrome={<JsonLd data={qaPageJsonLd} />}
    >
      {lead ? (
        <section
          id="crux"
          aria-labelledby="crux-heading"
          className="surface-paper rounded-lg border-l-[3px] border-l-crux/70 p-5 dark:border-l-crux-text/60 sm:px-6"
        >
          <p className="label-caps">{otherCruxes.length > 0 ? "It turns first on" : "It turns on"}</p>
          <h2
            id="crux-heading"
            className="mt-2 text-pretty font-serif text-[1.375rem] font-medium leading-snug text-primary sm:text-[1.5rem]"
          >
            {lead.question}
          </h2>
          <SettleAnswer
            mode={lead.settle.mode}
            kind={lead.settle.kind}
            condition={lead.settle.condition}
            resolved={lead.settle.resolved}
            label={lead.settle.label}
          />
          {lead.settle.note ? (
            <p className="mt-1.5 text-xs leading-snug text-muted">{lead.settle.note}</p>
          ) : null}
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <Button href={mapHref}>Open the full map →</Button>
            <TextAction href={`${mapHref}#${lead.anchor}`}>The evidence on this question →</TextAction>
          </div>
        </section>
      ) : (
        <p>
          <Button href={mapHref}>Open the full map →</Button>
        </p>
      )}

      <p className="mt-6 font-sans text-sm leading-relaxed text-muted">
        <span className="font-medium text-secondary">The claim the map weighs:</span>{" "}
        <LinkedText segments={claimSegments} />
      </p>

      {otherCruxes.length > 0 ? (
        <Section
          id="also-turns-on"
          title="It also turns on"
          lede="Each one's test, and the evidence on both sides, is on the map."
          className="mt-10"
        >
          <ol className="border-b border-divider">
            {otherCruxes.map((crux, index) => (
              <li key={crux.anchor} className={index > 0 ? "border-t border-divider" : undefined}>
                <Link href={`${mapHref}#${crux.anchor}`} className={ROW_LINK}>
                  {crux.question}
                </Link>
              </li>
            ))}
          </ol>
        </Section>
      ) : null}

      <AgreementBlock heading={page.agreementHeading} items={page.agreement} />

      {alsoAskedAs.length > 0 ? (
        <Section id="also-asked" title="Also asked as" className="mt-12">
          <ul className="border-b border-divider">
            {alsoAskedAs.map((v, index) => (
              <li key={v.slug} className={index > 0 ? "border-t border-divider" : undefined}>
                <Link href={`/questions/${v.slug}`} className={ROW_LINK}>
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
