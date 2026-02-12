import { ImageResponse } from "next/og";
import { topics } from "@/data/topics";
import { getVerdictLabel } from "@/lib/schemas/topic";

export const runtime = "edge";

function getScoreColor(score: number): string {
  if (score >= 85) return "#059669"; // emerald
  if (score >= 60) return "#4f7b77"; // deep teal
  if (score >= 40) return "#C4613C"; // rust
  return "#78716c"; // stone
}

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
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const topic = topics.find((t) => t.id === id);

  if (!topic) {
    return new Response("Topic not found", { status: 404 });
  }

  const scoreColor = getScoreColor(topic.confidence_score);
  const verdict = getVerdictLabel(topic.confidence_score);
  const statusLabel = getStatusLabel(topic.status);
  const statusColor = getStatusColor(topic.status);

  const evidenceCount = topic.pillars.reduce(
    (sum, p) => sum + (p.evidence?.length ?? 0),
    0
  );
  const referenceCount = topic.references?.length ?? 0;
  const pillarCount = topic.pillars.length;

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
                fontSize: "54px",
                fontWeight: 700,
                color: "#3d3a36",
                lineHeight: 1.12,
                fontFamily: "Georgia, serif",
                letterSpacing: "-0.5px",
                marginTop: "4px",
              }}
            >
              {topic.title}
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
                {referenceCount} References
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
                  {topic.confidence_score}
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
              Confidence
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
              flex: 1,
              fontSize: "16px",
              color: "#78716c",
              lineHeight: 1.5,
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "800px",
              fontStyle: "italic",
            }}
          >
            &ldquo;{topic.meta_claim.length > 110
              ? topic.meta_claim.slice(0, 107) + "..."
              : topic.meta_claim}&rdquo;
          </div>

          {/* Brand mark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
              marginLeft: "24px",
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
      width: 1200,
      height: 630,
    }
  );
}
