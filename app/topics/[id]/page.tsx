import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { topics, getCrossCategoryRelated, CATEGORY_LABELS } from "@/data/topics";
import { absoluteMediaUrl, getGeneratedMedia } from "@/data/generatedMedia";
import { getVerdictLabel } from "@/lib/schemas/topic";
import { JsonLd } from "@/components/JsonLd";
import TopicPageClient from "./TopicPageClient";

// ---------------------------------------------------------------------------
// Static Generation
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return topics.map((topic) => ({ id: topic.id }));
}

// ---------------------------------------------------------------------------
// Dynamic Metadata
// ---------------------------------------------------------------------------

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ view?: string | string[] }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const topic = topics.find((t) => t.id === id);

  if (!topic) {
    return { title: "Topic Not Found" };
  }

  const verdict = getVerdictLabel(topic.confidence_score);
  const description = `${topic.meta_claim} — ${verdict}. Explore ${topic.pillars.length} argument pillars with steel-manned positions, weighted evidence, and crux questions.`;
  const categoryLabel = CATEGORY_LABELS[topic.category];
  const media = getGeneratedMedia("topic", topic.id);
  const socialImage = media?.hero
    ? absoluteMediaUrl(media.hero.src)
    : `https://argumend.org/api/og/${topic.id}`;

  return {
    title: `${topic.title} — Argument Analysis`,
    description,
    keywords: [
      topic.title,
      categoryLabel,
      "argument mapping",
      "evidence analysis",
      "steel man",
      "crux question",
      topic.status,
    ],
    alternates: {
      canonical: `https://argumend.org/topics/${topic.id}`,
    },
    openGraph: {
      type: "article",
      title: `${topic.title} — Argument Analysis | ARGUMEND`,
      description,
      url: `https://argumend.org/topics/${topic.id}`,
      siteName: "ARGUMEND",
      images: [
        {
          url: socialImage,
          width: media?.hero.width ?? 1200,
          height: media?.hero.height ?? 630,
          alt: media?.hero.alt ?? topic.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${topic.title} — Argument Analysis`,
      description,
      images: [socialImage],
    },
  };
}

// ---------------------------------------------------------------------------
// Page Component — thin server wrapper, rendering done client-side
// ---------------------------------------------------------------------------

export default async function TopicPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const topic = topics.find((t) => t.id === id);

  if (!topic) {
    return <TopicPageClient topic={null} relatedTopics={[]} crossCategoryTopics={[]} />;
  }

  const view = (await searchParams)?.view;
  const requestedView = Array.isArray(view) ? view[0] : view;
  if (requestedView === "graph" || requestedView === "logic-map") {
    redirect(`/?topic=${encodeURIComponent(topic.id)}&view=logic-map`);
  }

  const categoryLabel = CATEGORY_LABELS[topic.category];
  const media = getGeneratedMedia("topic", topic.id);
  const socialImage = media?.hero
    ? absoluteMediaUrl(media.hero.src)
    : `https://argumend.org/api/og/${topic.id}`;

  // Resolve related topics SERVER-SIDE and pass as props, so the client bundle
  // doesn't import the full ~150-topic `data/topics` module (TopicDetailView
  // only needs these few objects). Mirrors the read view's summary approach.
  const relatedTopics = topics
    .filter((t) => t.category === topic.category && t.id !== topic.id)
    .slice(0, 4);
  const crossCategoryTopics = getCrossCategoryRelated(topic.id, topic.category, 4);

  // Honest dates: published constant, modified from topic.last_updated if present.
  const datePublished = "2025-01-01";
  const dateModified = topic.last_updated ?? "2026-06-15";

  // Extractable primary-source citations for AI answer engines (AEO).
  // Surfaces the verified evidence URLs as schema.org `citation` so crawlers and
  // LLMs can reach the underlying sources, not just the confidence score.
  const URL_RE = /^https?:\/\/\S+\.\S+/;
  const seenCitationUrls = new Set<string>();
  const citations = topic.pillars
    .flatMap((p) => p.evidence ?? [])
    .filter(
      (e) =>
        typeof e.sourceUrl === "string" &&
        URL_RE.test(e.sourceUrl) &&
        !seenCitationUrls.has(e.sourceUrl) &&
        seenCitationUrls.add(e.sourceUrl),
    )
    .map((e) => ({
      "@type": "CreativeWork" as const,
      name: e.source ?? e.title ?? "Source",
      url: e.sourceUrl as string,
    }));

  return (
    <>
      {/* No ClaimReview: Argumend's confidence-spectrum verdicts aren't binary
          fact-checks and the brand isn't a registered fact-checker (Google
          restricts ClaimReview rich results). Article + FAQPage cover the page;
          /is pages use QAPage. Consistent with the cycle-4 schema decision. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: topic.title,
          description: topic.meta_claim,
          url: `https://argumend.org/topics/${topic.id}`,
          image: socialImage,
          articleSection: categoryLabel,
          inLanguage: "en-US",
          datePublished,
          dateModified,
          author: { "@type": "Organization", name: "ARGUMEND", url: "https://argumend.org" },
          publisher: { "@type": "Organization", name: "ARGUMEND", url: "https://argumend.org" },
          ...(citations.length ? { citation: citations } : {}),
        }}
      />
      {topic.questions?.length ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: topic.questions.map((q) => ({
              "@type": "Question",
              name: q.title,
              acceptedAnswer: { "@type": "Answer", text: q.content },
            })),
          } as unknown as Record<string, unknown>}
        />
      ) : null}
      <TopicPageClient
        topic={topic}
        relatedTopics={relatedTopics}
        crossCategoryTopics={crossCategoryTopics}
      />
    </>
  );
}
