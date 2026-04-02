import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { topics, CATEGORY_LABELS } from "@/data/topics";
import { getVerdictLabel, calculateEvidenceScore } from "@/lib/schemas/topic";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { COMPARISON_PAIRS } from "@/app/topics/compare/comparisonPairs";
import ComparisonView from "./ComparisonView";

// ---------------------------------------------------------------------------
// ISR: Revalidate every 24 hours
// ---------------------------------------------------------------------------

export const revalidate = 86400;

// ---------------------------------------------------------------------------
// Static Generation
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return COMPARISON_PAIRS.map(([id1, id2]) => ({ id1, id2 }));
}

// ---------------------------------------------------------------------------
// Dynamic Metadata
// ---------------------------------------------------------------------------

type PageProps = { params: Promise<{ id1: string; id2: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id1, id2 } = await params;
  const topic1 = topics.find((t) => t.id === id1);
  const topic2 = topics.find((t) => t.id === id2);

  if (!topic1 || !topic2) {
    return { title: "Comparison Not Found" };
  }

  const title = `${topic1.title} vs ${topic2.title} — Argument Comparison`;
  const description = `Compare the evidence and arguments for "${topic1.title}" and "${topic2.title}" side by side. See confidence scores, evidence balance, key cruxes, and analytical pillars for both debates.`;

  return {
    title,
    description,
    keywords: [
      topic1.title,
      topic2.title,
      "compare arguments",
      "debate comparison",
      "side by side analysis",
      "evidence comparison",
      topic1.status,
      topic2.status,
    ],
    alternates: {
      canonical: `https://argumend.org/topics/compare/${id1}/vs/${id2}`,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: `https://argumend.org/topics/compare/${id1}/vs/${id2}`,
      siteName: "ARGUMEND",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// ---------------------------------------------------------------------------
// Helper: compute topic stats
// ---------------------------------------------------------------------------

function computeTopicStats(topic: (typeof topics)[number]) {
  const allEvidence = topic.pillars.flatMap((p) => p.evidence ?? []);
  const totalEvidence = allEvidence.length;
  const forEvidence = allEvidence.filter((e) => e.side === "for");
  const againstEvidence = allEvidence.filter((e) => e.side === "against");
  const totalFor = forEvidence.length;
  const totalAgainst = againstEvidence.length;

  const avgForWeight =
    totalFor > 0
      ? Math.round(
          forEvidence.reduce((sum, e) => sum + calculateEvidenceScore(e.weight), 0) /
            totalFor
        )
      : 0;
  const avgAgainstWeight =
    totalAgainst > 0
      ? Math.round(
          againstEvidence.reduce(
            (sum, e) => sum + calculateEvidenceScore(e.weight),
            0
          ) / totalAgainst
        )
      : 0;

  const cruxes = topic.pillars.map((p) => p.crux);

  return {
    totalEvidence,
    totalFor,
    totalAgainst,
    avgForWeight,
    avgAgainstWeight,
    cruxes,
  };
}

// ---------------------------------------------------------------------------
// Page Component (Server)
// ---------------------------------------------------------------------------

export default async function ComparisonPage({ params }: PageProps) {
  const { id1, id2 } = await params;
  const topic1 = topics.find((t) => t.id === id1);
  const topic2 = topics.find((t) => t.id === id2);

  if (!topic1 || !topic2) {
    notFound();
  }

  const stats1 = computeTopicStats(topic1);
  const stats2 = computeTopicStats(topic2);

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${topic1.title} vs ${topic2.title} — Argument Comparison`,
    description: `Side-by-side comparison of evidence and arguments for ${topic1.title} and ${topic2.title}.`,
    url: `https://argumend.org/topics/compare/${id1}/vs/${id2}`,
    isPartOf: {
      "@type": "WebSite",
      name: "ARGUMEND",
      url: "https://argumend.org",
    },
    about: [
      {
        "@type": "Claim",
        name: topic1.title,
        description: topic1.meta_claim,
      },
      {
        "@type": "Claim",
        name: topic2.title,
        description: topic2.meta_claim,
      },
    ],
  };

  // JSON-LD ItemList structured data for comparison
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Comparison: ${topic1.title} vs ${topic2.title}`,
    description: `Side-by-side evidence comparison of "${topic1.title}" and "${topic2.title}" with confidence scores, argument pillars, and crux questions.`,
    numberOfItems: 2,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Article",
          name: topic1.title,
          url: `https://argumend.org/topics/${id1}`,
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Article",
          name: topic2.title,
          url: `https://argumend.org/topics/${id2}`,
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={itemListJsonLd} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Topics", href: "/topics" },
          { label: "Compare", href: "/topics/compare" },
          { label: `${topic1.title} vs ${topic2.title}` },
        ]}
      />
      <ComparisonView
        topic1={topic1}
        topic2={topic2}
        stats1={stats1}
        stats2={stats2}
      />
    </>
  );
}
