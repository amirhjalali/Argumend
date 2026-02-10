import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { topics, CATEGORY_LABELS } from "@/data/topics";
import { getVerdictLabel } from "@/lib/schemas/topic";
import TopicDetailView from "./TopicDetailView";

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
      ...(topic.imageUrl && {
        images: [
          {
            url: topic.imageUrl,
            width: 800,
            height: 400,
            alt: topic.title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${topic.title} — Argument Analysis`,
      description,
      ...(topic.imageUrl && { images: [topic.imageUrl] }),
    },
  };
}

// ---------------------------------------------------------------------------
// Page Component (Server)
// ---------------------------------------------------------------------------

export default async function TopicPage({ params }: PageProps) {
  const { id } = await params;
  const topic = topics.find((t) => t.id === id);

  if (!topic) {
    notFound();
  }

  // Related topics: same category, excluding current, max 4
  const relatedTopics = topics
    .filter((t) => t.category === topic.category && t.id !== topic.id)
    .slice(0, 4);

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: topic.title,
    description: topic.meta_claim,
    url: `https://argumend.org/topics/${topic.id}`,
    ...(topic.imageUrl && { image: topic.imageUrl }),
    publisher: {
      "@type": "Organization",
      name: "ARGUMEND",
      url: "https://argumend.org",
    },
    mainEntity: {
      "@type": "Claim",
      name: topic.title,
      description: topic.meta_claim,
      claimReviewed: topic.meta_claim,
      reviewRating: {
        "@type": "Rating",
        ratingValue: topic.confidence_score,
        bestRating: 100,
        worstRating: 0,
        ratingExplanation: getVerdictLabel(topic.confidence_score),
      },
    },
    about: {
      "@type": "Thing",
      name: CATEGORY_LABELS[topic.category],
    },
    ...(topic.references && {
      citation: topic.references.map((ref) => ({
        "@type": "CreativeWork",
        name: ref.title,
        url: ref.url,
      })),
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TopicDetailView topic={topic} relatedTopics={relatedTopics} />
    </>
  );
}
