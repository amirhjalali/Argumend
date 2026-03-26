import { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { getAnalysis } from "@/lib/db/queries";
import { getDb } from "@/lib/db";
import { judgments } from "@/lib/db/schema";
import { JsonLd } from "@/components/JsonLd";
import { AnalysisView } from "./AnalysisView";

interface PageProps {
  params: Promise<{ id: string }>;
}

// ---------- Metadata (Open Graph) ----------

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const analysis = await getAnalysis(id);

  if (!analysis) {
    return { title: "Analysis Not Found - ARGUMEND" };
  }

  const description =
    analysis.summary.length > 160
      ? analysis.summary.slice(0, 157) + "..."
      : analysis.summary;

  return {
    title: `${analysis.topic} - ARGUMEND Analysis`,
    description,
    openGraph: {
      title: `${analysis.topic} - ARGUMEND Analysis`,
      description,
      type: "article",
      siteName: "ARGUMEND",
      url: `/analysis/${id}`,
      images: [
        {
          url: `https://argumend.org/api/og?title=${encodeURIComponent(analysis.topic)}&subtitle=${encodeURIComponent("Argument Analysis")}`,
          width: 1200,
          height: 630,
          alt: analysis.topic,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${analysis.topic} - ARGUMEND`,
      description,
      images: [`https://argumend.org/api/og?title=${encodeURIComponent(analysis.topic)}&subtitle=${encodeURIComponent("Argument Analysis")}`],
    },
  };
}

// ---------- Page Component (Server) ----------

export default async function AnalysisPage({ params }: PageProps) {
  const { id } = await params;

  // Validate UUID
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    notFound();
  }

  const analysis = await getAnalysis(id);
  if (!analysis) {
    notFound();
  }

  // Fetch associated judgment with verdicts
  const judgment = await getDb().query.judgments.findFirst({
    where: eq(judgments.analysisId, id),
    with: { verdicts: true },
  });

  // Reconstruct the shape that the JudgingResults component expects.
  // The DB stores aggregatedScores/disagreements as jsonb, and verdicts
  // come from the relation. We need to rebuild the JudgingResult shape.
  let judgingResult = null;
  if (judgment) {
    judgingResult = {
      verdicts: (judgment.verdicts ?? []).map((v) => ({
        judgeId: v.judgeId,
        judgeName: v.judgeName,
        model: v.model as import("@/types/logic").LLMModel,
        forScore: v.forScore as import("@/lib/judge/rubric").JudgeScore,
        againstScore: v.againstScore as import("@/lib/judge/rubric").JudgeScore,
        winner: v.winner as "for" | "against" | "draw",
        overallReasoning: v.overallReasoning,
        latencyMs: v.latencyMs ?? undefined,
      })),
      winner: judgment.winner as "for" | "against" | "draw" | null,
      hasConsensus: judgment.hasConsensus,
      aggregatedScores: judgment.aggregatedScores as import("@/lib/judge/rubric").JudgingResult["aggregatedScores"],
      disagreements: judgment.disagreements as import("@/lib/judge/rubric").JudgingResult["disagreements"],
      flaggedForReview: judgment.flaggedForReview,
      timestamp: judgment.createdAt.getTime(),
    };
  }

  // Build extracted arguments shape from the DB row
  const extracted = {
    topic: analysis.topic,
    summary: analysis.summary,
    positions: analysis.positions as import("@/lib/analyze/extractor").ExtractedPosition[],
    identifiedCruxes: analysis.cruxes as import("@/lib/analyze/extractor").IdentifiedCrux[],
    potentialFallacies: analysis.fallacies as import("@/lib/analyze/extractor").PotentialFallacy[],
    confidence: analysis.confidence,
    detectedBiases: (analysis.detectedBiases as import("@/lib/analyze/extractor").DetectedBias[]) ?? [],
    forStrength: analysis.forStrength ?? undefined,
    againstStrength: analysis.againstStrength ?? undefined,
  };

  const analysisJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: analysis.topic,
    description: analysis.summary.length > 160
      ? analysis.summary.slice(0, 157) + "..."
      : analysis.summary,
    url: `https://argumend.org/analysis/${id}`,
    datePublished: analysis.createdAt.toISOString(),
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://argumend.org/analysis/${id}`,
    },
  };

  return (
    <>
      <JsonLd data={analysisJsonLd} />
      <AnalysisView
        id={id}
        extracted={extracted}
        judgingResult={judgingResult}
        createdAt={analysis.createdAt.toISOString()}
      />
    </>
  );
}
