import { ImageResponse } from "next/og";
import topicSummaryData from "@/data/topicSummaries.json";
import type { TopicSummary } from "@/data/topicIndex";
import {
  OG_HEIGHT,
  OG_IMAGE_CACHE_CONTROL,
  OG_NOT_FOUND_CACHE_CONTROL,
  OG_WIDTH,
  isValidTopicOgId,
  ogErrorResponse,
  truncateOgText,
} from "@/lib/og";
import { mapDisplayTitle } from "@/lib/mapNaming";

export const runtime = "edge";

const topicSummaries = topicSummaryData as TopicSummary[];

/**
 * The share image for an older map: the question, the first crux it turns
 * on, and what the map holds. Like the page, it never shows a score, a
 * verdict or which way the evidence leans (those stay in the open API).
 */
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

  const title = truncateOgText(mapDisplayTitle(topic), 110);
  const firstCrux = topic.firstCrux ? truncateOgText(topic.firstCrux, 150) : null;
  const questions = topic.pillarCount;
  const cards = topic.evidenceCount;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#f4f1eb",
          padding: "52px 64px 40px",
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

        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", gap: "28px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "18px",
              color: "#7a7068",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "3px",
            }}
          >
            A map of the argument
          </div>

          <div
            style={{
              display: "flex",
              fontSize: title.length > 80 ? "44px" : title.length > 48 ? "52px" : "60px",
              fontWeight: 700,
              color: "#3d3a36",
              lineHeight: 1.1,
              fontFamily: "Georgia, serif",
              letterSpacing: "-0.5px",
            }}
          >
            {title}
          </div>

          {firstCrux && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                borderLeft: "4px solid #a23b3b",
                paddingLeft: "22px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "16px",
                  color: "#a23b3b",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "2.5px",
                }}
              >
                It turns first on
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "30px",
                  color: "#3d3a36",
                  lineHeight: 1.3,
                  fontFamily: "Georgia, serif",
                }}
              >
                {firstCrux}
              </div>
            </div>
          )}
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
          <div style={{ display: "flex", fontSize: "19px", color: "#564d45" }}>
            {`${questions} ${questions === 1 ? "question" : "questions"} it turns on · ${cards} sourced cards · Never names a winner`}
          </div>

          {/* Brand mark */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
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
