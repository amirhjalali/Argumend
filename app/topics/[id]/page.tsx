import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { topics, CATEGORY_LABELS } from "@/data/topics";
import { getVerdictLabel } from "@/lib/schemas/topic";
import { Breadcrumbs } from "@/components/Breadcrumbs";
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

  // JSON-LD structured data (enhanced Article schema)
  const categoryLabel = CATEGORY_LABELS[topic.category];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: topic.title,
    description: topic.meta_claim,
    url: `https://argumend.org/topics/${topic.id}`,
    image: topic.imageUrl || `https://argumend.org/api/og/${topic.id}`,
    author: {
      "@type": "Organization",
      name: "ARGUMEND",
      url: "https://argumend.org",
      logo: {
        "@type": "ImageObject",
        url: "https://argumend.org/icon.png",
      },
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
    dateModified: "2025-12-20",
    articleSection: categoryLabel,
    inLanguage: "en-US",
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
      name: categoryLabel,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://argumend.org/topics/${topic.id}`,
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
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Topics", href: "/topics" },
          { label: topic.title },
        ]}
      />
      <TopicDetailView topic={topic} relatedTopics={relatedTopics} />
    </>
  );
}
