import { ImageResponse } from "next/og";
import topicSummaryData from "@/data/topicSummaries.json";
import type { TopicSummary } from "@/data/topicIndex";
import type { VerdictQuadrant } from "@/lib/schemas/topic";
import {
  OG_HEIGHT,
  OG_IMAGE_CACHE_CONTROL,
  OG_NOT_FOUND_CACHE_CONTROL,
  OG_WIDTH,
  isValidTopicOgId,
  ogErrorResponse,
  truncateOgText,
} from "@/lib/og";

export const runtime = "edge";

const QUADRANT_COLORS: Record<VerdictQuadrant, string> = {
  settled: "#3a6965",
  contested: "#a23b3b",
  moderate: "#C4613C",
  open: "#7a7068",
};
const topicSummaries = topicSummaryData as TopicSummary[];

function getStatusLabel(status: string): string {
  switch (status) {
    case "settled":
      return "Settled";
    case "contested":
      return "Contested";
    case "highly_speculative":
      return "Highly Speculative";
    default:
      return status;
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case "settled":
      return "#059669"; // emerald
    case "contested":
      return "#C4613C"; // rust
    case "highly_speculative":
      return "#78716c"; // stone
    default:
      return "#78716c";
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!isValidTopicOgId(id)) {
    return ogErrorResponse(400, "INVALID_TOPIC_ID");
  }
  const topic = topicSummaries.find((candidate) => candidate.id === id);
  if (!topic) {
    return ogErrorResponse(404, "TOPIC_NOT_FOUND", OG_NOT_FOUND_CACHE_CONTROL);
  }

  const scoreColor = QUADRANT_COLORS[topic.verdict.quadrant];
  const title = truncateOgText(topic.title, 96);
  const verdict = truncateOgText(topic.verdict.label, 140);
  const metaClaim = truncateOgText(topic.meta_claim, 150);
  const statusLabel = getStatusLabel(topic.status);
  const statusColor = getStatusColor(topic.status);

  const evidenceCount = topic.evidenceCount;
  const pillarCount = topic.pillarCount;
  const balance = Math.min(100, Math.max(0, topic.balance));
  const weight = Math.min(100, Math.max(0, topic.weight));

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#f4f1eb",
          padding: "48px 56px",
          position: "relative",
        }}
      >
        {/* Rust accent line at top */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            backgroundColor: "#C4613C",
          }}
        />

        {/* Main content area */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            gap: "48px",
            alignItems: "center",
          }}
        >
          {/* Left: Title and metadata */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
              gap: "16px",
            }}
          >
            {/* Status badge */}
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: statusColor + "18",
                  border: `2px solid ${statusColor}`,
                  borderRadius: "24px",
                  padding: "6px 20px",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: statusColor,
                    letterSpacing: "0.5px",
                  }}
                >
                  {statusLabel}
                </span>
              </div>
            </div>

            {/* Topic title */}
            <div
              style={{
                display: "flex",
                fontSize: title.length > 72 ? "38px" : title.length > 40 ? "44px" : "54px",
                fontWeight: 700,
                color: "#3d3a36",
                lineHeight: 1.12,
                fontFamily: "Georgia, serif",
                letterSpacing: "-0.5px",
                marginTop: "4px",
              }}
            >
              {title}
            </div>

            {/* Verdict */}
            <div
              style={{
                display: "flex",
                fontSize: "21px",
                color: "#78716c",
                lineHeight: 1.4,
              }}
            >
              {verdict}
            </div>

            {/* Stats row */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "24px",
                alignItems: "center",
                marginTop: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "18px",
                  color: "#78716c",
                  fontWeight: 500,
                }}
              >
                {pillarCount} Pillars
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "18px",
                  color: "#a8a29e",
                }}
              >
                ·
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "18px",
                  color: "#78716c",
                  fontWeight: 500,
                }}
              >
                {evidenceCount} Evidence Items
              </div>
            </div>
          </div>

          {/* Right: Score circle */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
            }}
          >
            {/* Outer glow ring */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "220px",
                height: "220px",
                borderRadius: "110px",
                border: `2px solid ${scoreColor}20`,
                backgroundColor: scoreColor + "08",
              }}
            >
              {/* Inner ring */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "190px",
                  height: "190px",
                  borderRadius: "95px",
                  border: `6px solid ${scoreColor}`,
                  backgroundColor: scoreColor + "14",
                }}
              >
                {/* Score number */}
                <div
                  style={{
                    display: "flex",
                    fontSize: "76px",
                    fontWeight: 700,
                    color: scoreColor,
                    lineHeight: 1,
                    fontFamily: "Georgia, serif",
                  }}
                >
                  {balance}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "14px",
                color: "#78716c",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "3px",
              }}
            >
              Balance
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "10px" }}>
              <div style={{ display: "flex", width: "120px", height: "8px", backgroundColor: "#e7e2d8", borderRadius: "4px" }}>
                <div style={{ display: "flex", width: `${(weight / 100) * 120}px`, height: "8px", backgroundColor: scoreColor, borderRadius: "4px" }} />
              </div>
              <div style={{ display: "flex", fontSize: "13px", color: "#78716c", fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px" }}>
                Weight {weight}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "20px",
            borderTop: "2px solid #e7e5df",
          }}
        >
          {/* Meta claim (truncated) */}
          <div
            style={{
              display: "flex",
              width: "800px",
              fontSize: "16px",
              color: "#78716c",
              lineHeight: 1.5,
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "800px",
              fontStyle: "italic",
            }}
          >
            &ldquo;{metaClaim}&rdquo;
          </div>

          {/* Brand mark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
              marginLeft: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "4px",
                height: "28px",
                backgroundColor: "#C4613C",
                borderRadius: "2px",
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: "22px",
                fontWeight: 700,
                color: "#4f7b77",
                letterSpacing: "3px",
                fontFamily: "Georgia, serif",
              }}
            >
              ARGUMEND
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      headers: {
        "Cache-Control": OG_IMAGE_CACHE_CONTROL,
        "X-Content-Type-Options": "nosniff",
      },
    }
  );
}
