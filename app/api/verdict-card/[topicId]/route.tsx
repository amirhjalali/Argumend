import { ImageResponse } from "next/og";
import { topics } from "@/data/topics";
import { getMockVerdict } from "@/data/mockVerdicts";
import { DEFAULT_RUBRIC } from "@/lib/judge/rubric";
import type { JudgingResult } from "@/lib/judge/rubric";

export const runtime = "edge";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getWinnerLabel(winner: "for" | "against" | "draw" | null): string {
  switch (winner) {
    case "for":
      return "FOR WINS";
    case "against":
      return "AGAINST WINS";
    case "draw":
      return "DRAW";
    default:
      return "NO VERDICT";
  }
}

function getWinnerColors(winner: "for" | "against" | "draw" | null): {
  bg: string;
  text: string;
} {
  switch (winner) {
    case "for":
      return { bg: "#C4613C", text: "#ffffff" };
    case "against":
      return { bg: "#4f7b77", text: "#ffffff" };
    case "draw":
      return { bg: "#78716c", text: "#ffffff" };
    default:
      return { bg: "#a8a29e", text: "#ffffff" };
  }
}

function getDrivingDimension(result: JudgingResult): string | null {
  let bestName: string | null = null;
  let bestGap = 0;

  for (const dim of DEFAULT_RUBRIC) {
    const f = result.aggregatedScores.for.byDimension[dim.id] ?? 0;
    const a = result.aggregatedScores.against.byDimension[dim.id] ?? 0;
    const gap = Math.abs(f - a) * dim.weight;
    if (gap > bestGap) {
      bestGap = gap;
      bestName = dim.name;
    }
  }
  return bestName;
}

function getConsensusLabel(result: JudgingResult): string {
  const total = result.verdicts.length;
  if (result.hasConsensus) return `${total}/${total} Unanimous`;
  const agree = result.verdicts.filter(
    (v) => v.winner === result.winner
  ).length;
  return `${agree}/${total} Split`;
}

// ---------------------------------------------------------------------------
// GET handler
// ---------------------------------------------------------------------------

export async function GET(
  request: Request,
  { params }: { params: Promise<{ topicId: string }> }
) {
  const { topicId } = await params;
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format") === "instagram" ? "instagram" : "twitter";

  const topic = topics.find((t) => t.id === topicId);
  if (!topic) {
    return new Response("Topic not found", { status: 404 });
  }

  const result = getMockVerdict(topicId);
  if (!result) {
    return new Response("No verdict available for this topic", { status: 404 });
  }

  const width = format === "instagram" ? 1080 : 1200;
  const height = format === "instagram" ? 1080 : 675;

  const forScore = result.aggregatedScores.for.average;
  const againstScore = result.aggregatedScores.against.average;
  const winnerLabel = getWinnerLabel(result.winner);
  const winnerColors = getWinnerColors(result.winner);
  const drivingDim = getDrivingDimension(result);
  const consensus = getConsensusLabel(result);

  const forBarWidth = Math.round((forScore / 10) * 100);
  const againstBarWidth = Math.round((againstScore / 10) * 100);

  const isInsta = format === "instagram";
  const titleSize = isInsta
    ? topic.title.length > 50
      ? "40px"
      : "48px"
    : topic.title.length > 50
    ? "36px"
    : "44px";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#f4f1eb",
          padding: isInsta ? "56px 52px" : "44px 56px",
          position: "relative",
        }}
      >
        {/* Top accent line */}
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

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          {/* Top section: badge + title */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Winner badge */}
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: winnerColors.bg,
                  borderRadius: "24px",
                  padding: "8px 24px",
                }}
              >
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: winnerColors.text,
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                  }}
                >
                  {winnerLabel}
                </span>
              </div>
            </div>

            {/* Topic title */}
            <div
              style={{
                display: "flex",
                fontSize: titleSize,
                fontWeight: 700,
                color: "#3d3a36",
                lineHeight: 1.15,
                fontFamily: "Georgia, serif",
                letterSpacing: "-0.5px",
              }}
            >
              {topic.title.length > 80
                ? topic.title.slice(0, 77) + "..."
                : topic.title}
            </div>
          </div>

          {/* Score comparison section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* FOR bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "90px",
                  justifyContent: "flex-end",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#C4613C",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                FOR
              </div>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  height: "28px",
                  backgroundColor: "#e7e5df",
                  borderRadius: "14px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: `${forBarWidth}%`,
                    height: "100%",
                    background: "linear-gradient(to right, #C4613C, #d4785e)",
                    borderRadius: "14px",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  width: "60px",
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#C4613C",
                  fontFamily: "monospace",
                }}
              >
                {forScore.toFixed(1)}
              </div>
            </div>

            {/* AGAINST bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "90px",
                  justifyContent: "flex-end",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#4f7b77",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                AGAINST
              </div>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  height: "28px",
                  backgroundColor: "#e7e5df",
                  borderRadius: "14px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: `${againstBarWidth}%`,
                    height: "100%",
                    background: "linear-gradient(to right, #4f7b77, #6a9e99)",
                    borderRadius: "14px",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  width: "60px",
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#4f7b77",
                  fontFamily: "monospace",
                }}
              >
                {againstScore.toFixed(1)}
              </div>
            </div>

            {/* Driving dimension + consensus */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "4px",
              }}
            >
              {drivingDim && (
                <div
                  style={{
                    display: "flex",
                    fontSize: "16px",
                    color: "#78716c",
                  }}
                >
                  Decisive factor:{" "}
                  <span
                    style={{
                      fontWeight: 600,
                      color: "#3d3a36",
                      marginLeft: "6px",
                    }}
                  >
                    {drivingDim}
                  </span>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  fontSize: "16px",
                  color: "#78716c",
                }}
              >
                Judges:{" "}
                <span
                  style={{
                    fontWeight: 600,
                    color: "#3d3a36",
                    marginLeft: "6px",
                  }}
                >
                  {consensus}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom branding bar */}
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
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
            <div
              style={{
                display: "flex",
                fontSize: "16px",
                color: "#a8a29e",
              }}
            >
              argumend.com
            </div>
          </div>
        </div>
      </div>
    ),
    { width, height }
  );
}
