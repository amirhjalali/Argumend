import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { TopBar } from "@/components/TopBar";
import { DisagreementReportView } from "@/components/disagreement/DisagreementReportView";
import { PublicShareControls } from "@/components/disagreement/PublicShareControls";
import { RepresentationFeedback } from "@/components/disagreement/RepresentationFeedback";
import { isDatabaseConfigured } from "@/lib/db";
import { getPublishedDisagreementReport } from "@/lib/db/queries";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isDatabaseConfigured()) {
    return { title: "Report not found", robots: { index: false, follow: false } };
  }
  const row = await getPublishedDisagreementReport(slug);
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
  if (!isDatabaseConfigured()) notFound();
  const row = await getPublishedDisagreementReport(slug);
  if (!row) notFound();

  const sourceUrl = row.sourceUrl && /^https?:\/\//.test(row.sourceUrl) ? row.sourceUrl : null;

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)]">
      <TopBar />
      <main className="px-4 py-10">
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
              <Link
                href="/analyze-v2"
                className="min-h-11 text-sm underline"
              >
                Analyze another disagreement
              </Link>
            </>
          }
        />
      </main>
      <Footer />
    </div>
  );
}
