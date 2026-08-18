import { ImageResponse } from "next/og";
import { OG_HEIGHT, OG_IMAGE_CACHE_CONTROL, OG_NOT_FOUND_CACHE_CONTROL, OG_WIDTH, truncateOgText } from "@/lib/og";
import { isDatabaseConfigured } from "@/lib/db";
import { getPublishedDisagreementReport } from "@/lib/db/queries";

export const runtime = "nodejs";
export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isDatabaseConfigured()) {
    return new Response("Not found", { status: 404, headers: { "cache-control": OG_NOT_FOUND_CACHE_CONTROL } });
  }
  const row = await getPublishedDisagreementReport(slug);
  if (!row) {
    return new Response("Not found", { status: 404, headers: { "cache-control": OG_NOT_FOUND_CACHE_CONTROL } });
  }

  const headline = truncateOgText(row.report.share.headline, 90);
  const crux = truncateOgText(row.report.cruxes[0]?.question ?? "No single crux established", 140);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f1eb",
          color: "#3d3a36",
          padding: "56px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ color: "#3a6965", fontSize: 22, letterSpacing: 4 }}>ARGUMEND</div>
          <div style={{ color: "#C4613C", fontSize: 20, letterSpacing: 3 }}>THE REAL DISAGREEMENT</div>
          <div style={{ fontSize: 48, lineHeight: 1.15, maxWidth: 1000 }}>{headline}</div>
          <div style={{ fontSize: 28, color: "#a23b3b", maxWidth: 1000 }}>{crux}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#564d45" }}>
          <span>
            {row.report.share.metrics.positionCount} positions · {row.report.share.metrics.commonGroundCount} shared
            premises · {row.report.share.metrics.disagreementCount} disputed questions
          </span>
          <span>Source-only analysis · No independent fact-check</span>
        </div>
      </div>
    ),
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      headers: { "cache-control": OG_IMAGE_CACHE_CONTROL },
    },
  );
}
