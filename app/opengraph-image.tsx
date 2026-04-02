import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ARGUMEND — Map Arguments, Not Win Them";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #f4f1eb 0%, #e8e0d5 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: 400,
              color: "#3d3a36",
              letterSpacing: "-0.02em",
            }}
          >
            ARGUMEND
          </div>
          <div
            style={{
              width: "80px",
              height: "3px",
              background: "#C4613C",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              fontSize: "28px",
              color: "#78716c",
              fontFamily: "sans-serif",
              fontWeight: 400,
            }}
          >
            Map Arguments, Not Win Them
          </div>
          <div
            style={{
              display: "flex",
              gap: "32px",
              marginTop: "24px",
              fontSize: "18px",
              color: "#a8a29e",
              fontFamily: "sans-serif",
            }}
          >
            <span>50 Topics</span>
            <span>·</span>
            <span>AI-Powered Analysis</span>
            <span>·</span>
            <span>Evidence-Based</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
