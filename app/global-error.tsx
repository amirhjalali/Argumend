"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error boundary caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            'Georgia, "Times New Roman", Times, serif',
          backgroundColor: "#f4f1eb",
          color: "#3d3a36",
        }}
      >
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div style={{ maxWidth: "28rem", width: "100%", textAlign: "center" }}>
            <div
              style={{
                backgroundColor: "#faf8f5",
                borderRadius: "0.75rem",
                border: "1px solid rgba(214, 211, 209, 0.6)",
                padding: "2.5rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              {/* Warning icon */}
              <div
                style={{
                  width: "3rem",
                  height: "3rem",
                  margin: "0 auto 1.25rem",
                  borderRadius: "50%",
                  backgroundColor: "#fef2f2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  style={{ height: "1.5rem", width: "1.5rem", color: "#ef4444" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
              </div>

              <h1
                style={{
                  fontFamily: 'Georgia, "Times New Roman", Times, serif',
                  fontSize: "1.5rem",
                  color: "#3d3a36",
                  marginBottom: "0.5rem",
                }}
              >
                Something went wrong
              </h1>
              <p
                style={{
                  fontFamily: "system-ui, sans-serif",
                  color: "#78716c",
                  fontSize: "0.875rem",
                  marginBottom: "1.5rem",
                  lineHeight: "1.6",
                }}
              >
                An unexpected error occurred. We apologize for the
                inconvenience. Please try refreshing the page.
              </p>

              {error.digest && (
                <p
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: "0.75rem",
                    color: "#a8a29e",
                    marginBottom: "1.5rem",
                  }}
                >
                  Error ID: {error.digest}
                </p>
              )}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <button
                  onClick={reset}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.625rem 1.25rem",
                    borderRadius: "0.5rem",
                    background: "linear-gradient(to right, #C4613C, #b05434)",
                    color: "white",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  Try again
                </button>
                <a
                  href="/"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.625rem 1.25rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #d6d3d1",
                    color: "#3d3a36",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  Back to Home
                </a>
              </div>
            </div>

            {/* Branding */}
            <div style={{ marginTop: "2rem" }}>
              <a
                href="/"
                style={{
                  fontFamily: 'Georgia, "Times New Roman", Times, serif',
                  fontSize: "1rem",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  color: "#9c9288",
                  textDecoration: "none",
                }}
              >
                ARGUMEND
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
