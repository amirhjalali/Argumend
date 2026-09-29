import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { DisagreementReportView } from "@/components/disagreement/DisagreementReportView";
import { PublicShareControls } from "@/components/disagreement/PublicShareControls";
import { RepresentationFeedback } from "@/components/disagreement/RepresentationFeedback";
import { TextAction } from "@/components/ui/Button";
import { isDatabaseConfigured } from "@/lib/db";
import { getPublishedDisagreementReport } from "@/lib/db/queries";
import { ANALYZE_HREF } from "@/lib/nav";

/**
 * Loads a published report, treating every failure path the same way: an
 * unconfigured database, an unreachable one, or an absent slug all mean "no
 * report here" — a crawl-safe 404, never a 500.
 */
async function loadPublishedReport(slug: string) {
  if (!isDatabaseConfigured()) return null;
  try {
    return await getPublishedDisagreementReport(slug);
  } catch (error) {
    console.error("Failed to load published report", { slug: Boolean(slug), error: String(error) });
    return null;
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const row = await loadPublishedReport(slug);
  if (!row) {
    return { title: "Report not found", robots: { index: false, follow: false } };
  }
  return {
    title: `${row.report.diagnosis.headline} — ARGUMEND`,
    description: row.report.diagnosis.insight,
    robots: { index: false, follow: true },
    alternates: { canonical: `https://argumend.org/d/${slug}` },
    openGraph: {
      title: row.report.diagnosis.headline,
      description: row.report.cruxes[0]?.question ?? row.report.diagnosis.insight,
      url: `https://argumend.org/d/${slug}`,
      images: [{ url: `/d/${slug}/opengraph-image`, width: 1200, height: 630 }],
    },
  };
}

export default async function PublicDisagreementPage({ params }: PageProps) {
  const { slug } = await params;
  const row = await loadPublishedReport(slug);
  if (!row) notFound();

  const sourceUrl = row.sourceUrl && /^https?:\/\//.test(row.sourceUrl) ? row.sourceUrl : null;

  return (
    <AppShell layout="reading">
      <div className="px-4 pb-16 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <p className="mx-auto mb-6 max-w-3xl text-sm text-[var(--text-muted)]">
          Generated {row.publishedAt.toISOString().slice(0, 10)} · Source-only AI assembly
          {sourceUrl ? (
            <>
              {" "}
              ·{" "}
              <a href={sourceUrl} rel="noopener noreferrer nofollow" className="underline">
                Source
              </a>
            </>
          ) : null}
        </p>
        <DisagreementReportView
          report={row.report}
          renderPositionFeedback={(positionId) => (
            <RepresentationFeedback slug={slug} section="position" targetId={positionId} />
          )}
          footer={
            <>
              <RepresentationFeedback slug={slug} section="overall" />
              <RepresentationFeedback slug={slug} section="abuse" />
              <PublicShareControls
                slug={slug}
                publicUrl={`https://argumend.org/d/${slug}`}
                headline={row.report.diagnosis.headline}
              />
              <TextAction href={ANALYZE_HREF}>Analyze another disagreement</TextAction>
            </>
          }
        />
      </div>
    </AppShell>
  );
}
