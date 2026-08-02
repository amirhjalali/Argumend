/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useEffect, useRef } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    console.error("Global error boundary caught:", error);
    headingRef.current?.focus();
  }, [error]);

  return (
    <html lang="en">
      <head>
        <style>{`
          :root {
            color-scheme: light dark;
            --error-canvas: #f4f1eb;
            --error-card: #faf8f5;
            --error-border: rgba(214, 211, 209, 0.7);
            --error-primary: #3d3a36;
            --error-secondary: #78716c;
            --error-muted: #9c9288;
            --error-icon-bg: #fef2f2;
          }
          .global-error-action:focus-visible {
            outline: 2px solid #C4613C;
            outline-offset: 3px;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --error-canvas: #1a1917;
              --error-card: #252420;
              --error-border: #3d3a36;
              --error-primary: #e8e4de;
              --error-secondary: #b0a99f;
              --error-muted: #928a80;
              --error-icon-bg: rgba(127, 29, 29, 0.35);
            }
          }
        `}</style>
      </head>
      <body
        style={{
          margin: 0,
          fontFamily:
            'Georgia, "Times New Roman", Times, serif',
          backgroundColor: "var(--error-canvas)",
          color: "var(--error-primary)",
        }}
      >
        <div
          style={{
            minHeight: "100svh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div style={{ maxWidth: "28rem", width: "100%", textAlign: "center" }}>
            <div
              role="alert"
              aria-labelledby="global-error-title"
              style={{
                backgroundColor: "var(--error-card)",
                borderRadius: "0.75rem",
                border: "1px solid var(--error-border)",
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
                  backgroundColor: "var(--error-icon-bg)",
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
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
              </div>

              <h1
                ref={headingRef}
                id="global-error-title"
                tabIndex={-1}
                style={{
                  fontFamily: 'Georgia, "Times New Roman", Times, serif',
                  fontSize: "1.5rem",
                  color: "var(--error-primary)",
                  marginBottom: "0.5rem",
                  outline: "none",
                }}
              >
                Something went wrong
              </h1>
              <p
                style={{
                  fontFamily: "system-ui, sans-serif",
                  color: "var(--error-secondary)",
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
                    color: "var(--error-muted)",
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
                  type="button"
                  onClick={reset}
                  className="global-error-action"
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
                    minHeight: "2.75rem",
                    minWidth: "10rem",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  Try again
                </button>
                <a
                  href="/"
                  className="global-error-action"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.625rem 1.25rem",
                    borderRadius: "0.5rem",
                    border: "1px solid var(--error-border)",
                    color: "var(--error-primary)",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    backgroundColor: "transparent",
                    minHeight: "2.75rem",
                    minWidth: "10rem",
                    boxSizing: "border-box",
                    justifyContent: "center",
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
                  minHeight: "2.75rem",
                  display: "inline-flex",
                  alignItems: "center",
                  fontFamily: 'Georgia, "Times New Roman", Times, serif',
                  fontSize: "1rem",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  color: "var(--error-muted)",
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
