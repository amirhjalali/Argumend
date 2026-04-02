import type { Metadata } from "next";
import { topics, CATEGORY_LABELS } from "@/data/topics";
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

type PageProps = { params: Promise<{ id: string }> };

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
          url: `https://argumend.org/api/og/${topic.id}`,
          width: 1200,
          height: 630,
          alt: topic.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${topic.title} — Argument Analysis`,
      description,
      images: [`https://argumend.org/api/og/${topic.id}`],
    },
  };
}

// ---------------------------------------------------------------------------
// Page Component — thin server wrapper, rendering done client-side
// ---------------------------------------------------------------------------

export default async function TopicPage({ params }: PageProps) {
  const { id } = await params;
  const topic = topics.find((t) => t.id === id);

  if (!topic) {
    return <TopicPageClient />;
  }

  const categoryLabel = CATEGORY_LABELS[topic.category];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ClaimReview",
          url: `https://argumend.org/topics/${topic.id}`,
          claimReviewed: topic.meta_claim,
          datePublished: "2025-01-01",
          author: { "@type": "Organization", name: "ARGUMEND", url: "https://argumend.org" },
          reviewRating: {
            "@type": "Rating",
            ratingValue: topic.confidence_score,
            bestRating: 100,
            worstRating: 0,
            alternateName: getVerdictLabel(topic.confidence_score),
          },
          itemReviewed: {
            "@type": "Claim",
            name: topic.title,
            description: topic.meta_claim,
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: topic.title,
          description: topic.meta_claim,
          url: `https://argumend.org/topics/${topic.id}`,
          image: `https://argumend.org/api/og/${topic.id}`,
          articleSection: categoryLabel,
          inLanguage: "en-US",
          author: { "@type": "Organization", name: "ARGUMEND", url: "https://argumend.org" },
          publisher: { "@type": "Organization", name: "ARGUMEND", url: "https://argumend.org" },
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
      <TopicPageClient />
    </>
  );
}
