import { ImageResponse } from "next/og";

export const runtime = "edge";

function getVerdictColor(verdict: string): string {
  switch (verdict) {
    case "for":
      return "#C4613C"; // rust
    case "against":
      return "#4f7b77"; // deep teal
    case "draw":
      return "#78716c"; // stone
    default:
      return "#78716c";
  }
}

function getVerdictLabel(verdict: string): string {
  switch (verdict) {
    case "for":
      return "Evidence Supports";
    case "against":
      return "Evidence Challenges";
    case "draw":
      return "Evidence Divided";
    default:
      return "";
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") || "ARGUMEND";
  const subtitle = searchParams.get("subtitle") || "";
  const verdict = searchParams.get("verdict") || ""; // "for" | "against" | "draw"
  const score = searchParams.get("score") || "";

  const verdictColor = getVerdictColor(verdict);
  const verdictLabel = getVerdictLabel(verdict);
  const hasScore = score !== "" && !isNaN(Number(score));
  const scoreNum = hasScore ? Number(score) : 0;

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
            {/* Verdict badge */}
            {verdict && (
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: verdictColor + "18",
                    border: `2px solid ${verdictColor}`,
                    borderRadius: "24px",
                    padding: "6px 20px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      color: verdictColor,
                      letterSpacing: "0.5px",
                    }}
                  >
                    {verdictLabel}
                  </span>
                </div>
              </div>
            )}

            {/* Title */}
            <div
              style={{
                display: "flex",
                fontSize: title.length > 40 ? "44px" : "54px",
                fontWeight: 700,
                color: "#3d3a36",
                lineHeight: 1.12,
                fontFamily: "Georgia, serif",
                letterSpacing: "-0.5px",
                marginTop: "4px",
              }}
            >
              {title.length > 70 ? title.slice(0, 67) + "..." : title}
            </div>

            {/* Subtitle */}
            {subtitle && (
              <div
                style={{
                  display: "flex",
                  fontSize: "21px",
                  color: "#78716c",
                  lineHeight: 1.4,
                  fontStyle: "italic",
                }}
              >
                {subtitle.length > 120
                  ? subtitle.slice(0, 117) + "..."
                  : subtitle}
              </div>
            )}
          </div>

          {/* Right: Score circle (only if score provided) */}
          {hasScore && (
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
                  border: `2px solid ${verdictColor}20`,
                  backgroundColor: verdictColor + "08",
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
                    border: `6px solid ${verdictColor}`,
                    backgroundColor: verdictColor + "14",
                  }}
                >
                  {/* Score number */}
                  <div
                    style={{
                      display: "flex",
                      fontSize: "76px",
                      fontWeight: 700,
                      color: verdictColor,
                      lineHeight: 1,
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    {scoreNum % 1 === 0
                      ? scoreNum.toFixed(0)
                      : scoreNum.toFixed(1)}
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
                Score
              </div>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingTop: "20px",
            borderTop: "2px solid #e7e5df",
          }}
        >
          {/* Brand mark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
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
