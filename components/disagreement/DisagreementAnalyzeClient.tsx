"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { DISAGREEMENT_EXAMPLE_SOURCE, DISAGREEMENT_LIMITS } from "@/lib/disagreement/constants";
import { characterBucket, latencyBucket } from "@/lib/disagreement/labels";
import type { ArgumentGraph } from "@/types/argument";
import type { DisagreementContentType, DisagreementReportV1 } from "@/types/disagreement";
import { AnalysisProgress } from "./AnalysisProgress";
import { AnalyzeInput } from "./AnalyzeInput";
import { DisagreementReportView } from "./DisagreementReportView";
import { RepresentationFeedback } from "./RepresentationFeedback";
import { ShareReport } from "./ShareReport";

const PROGRESS_MS = 1800;

export function DisagreementAnalyzeClient() {
  const [content, setContent] = useState("");
  const [contentType, setContentType] = useState<DisagreementContentType>("conversation");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [report, setReport] = useState<DisagreementReportV1 | null>(null);
  const [graph, setGraph] = useState<ArgumentGraph | null>(null);
  const [inputCollapsed, setInputCollapsed] = useState(false);
  const [publicationToken, setPublicationToken] = useState<string>();
  const [unavailableReason, setUnavailableReason] = useState<string>();
  const mastheadRef = useRef<HTMLDivElement>(null);

  const tooShort = content.trim().length < DISAGREEMENT_LIMITS.minSourceCharacters;

  // The home hero parks pasted text in sessionStorage before navigating here
  // during the alpha, so the visitor's text survives the redirect. Same
  // microtask pattern as the legacy /analyze prefill: setState runs in a
  // callback, not synchronously in the effect body.
  useEffect(() => {
    let cancelled = false;
    try {
      const raw = sessionStorage.getItem("argumend-analyze-prefill");
      if (raw) {
        const parsed = JSON.parse(raw) as { content?: string; contentType?: DisagreementContentType };
        queueMicrotask(() => {
          if (cancelled) return;
          if (parsed.content) setContent(parsed.content);
          if (parsed.contentType) setContentType(parsed.contentType);
          sessionStorage.removeItem("argumend-analyze-prefill");
        });
      }
    } catch {
      // Malformed prefill is stale junk; ignore it rather than block the page.
    }
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (status !== "loading") return;
    const timer = window.setInterval(() => setStep((value) => value + 1), PROGRESS_MS);
    return () => window.clearInterval(timer);
  }, [status]);

  useEffect(() => {
    if (status === "done") {
      mastheadRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [status]);

  async function submit() {
    // Reset the progress steps at submission so a rerun after "Analyze
    // another" never resumes from the previous run's step count.
    setStep(0);
    setStatus("loading");
    setError("");
    setReport(null);
    trackEvent({
      action: "disagreement_analysis_started",
      contentType,
      characterBucket: characterBucket(content.length),
    });
    try {
      const response = await fetch("/api/disagreements/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ content, contentType }),
      });
      const data = (await response.json()) as {
        report?: DisagreementReportV1;
        graph?: ArgumentGraph;
        execution?: { latencyMs: number };
        publishing?: { token?: string; unavailableReason?: string };
        error?: string;
        code?: string;
      };
      if (!response.ok || !data.report || !data.graph) {
        setError(data.error || "The analysis failed.");
        setStatus("error");
        trackEvent({
          action: "disagreement_analysis_failed",
          errorCode: data.code || "INTERNAL_ERROR",
        });
        return;
      }
      setReport(data.report);
      setGraph(data.graph);
      setPublicationToken(data.publishing?.token);
      setUnavailableReason(data.publishing?.unavailableReason);
      setInputCollapsed(true);
      setStatus("done");
      trackEvent({
        action: "disagreement_analysis_completed",
        diagnosisPattern: data.report.diagnosis.pattern,
        positionCount: data.report.positions.length,
        cruxCount: data.report.cruxes.length,
        latencyBucket: latencyBucket(data.execution?.latencyMs ?? 0),
      });
    } catch {
      setError("The analysis failed.");
      setStatus("error");
    }
  }

  function startOver() {
    setReport(null);
    setStatus("idle");
    setInputCollapsed(false);
    trackEvent({ action: "disagreement_analyze_another", surface: "session" });
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-4xl text-[var(--text-heading)]">
          What is the argument really resting on?
        </h1>
        <p className="mt-3 text-lg text-[var(--text-secondary)]">
          Paste a disagreement. Argumend separates facts from values, finds the hinge, and shows
          what each major claim is actually committed to changing.
        </p>
      </div>

      {status === "done" && inputCollapsed ? (
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 border-b border-[var(--border-divider)] pb-4">
          <p className="text-sm text-[var(--text-secondary)]">
            Source submitted · {content.length.toLocaleString()} characters
          </p>
          <button
            type="button"
            className="min-h-11 text-sm text-[#3a6965] dark:text-deep-bright underline"
            onClick={() => setInputCollapsed(false)}
          >
            Edit
          </button>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl space-y-8">
          <AnalyzeInput
            content={content}
            contentType={contentType}
            disabled={status === "loading"}
            onContentChange={setContent}
            onTypeChange={setContentType}
          />

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={submit}
              disabled={status === "loading" || tooShort}
              className="min-h-11 rounded-full bg-[#C4613C] px-6 text-white disabled:opacity-60"
            >
              Find what it turns on
            </button>
            <button
              type="button"
              disabled={status === "loading"}
              onClick={() => {
                setContentType("conversation");
                setContent(DISAGREEMENT_EXAMPLE_SOURCE);
              }}
              className="min-h-11 rounded-full border border-[var(--border-default)] px-5"
            >
              See an example
            </button>
          </div>
          {tooShort && content.length > 0 ? (
            <p className="text-sm text-[var(--text-muted)]" role="status">
              Add a little more — the analysis needs at least {DISAGREEMENT_LIMITS.minSourceCharacters}{" "}
              characters of the argument to work with ({DISAGREEMENT_LIMITS.minSourceCharacters - content.trim().length}{" "}
              to go).
            </p>
          ) : null}
        </div>
      )}

      {status === "loading" ? <AnalysisProgress step={step} /> : null}
      {status === "error" ? (
        <div className="mx-auto max-w-3xl space-y-3">
          <p className="text-[#a23b3b] dark:text-crux-light">{error}</p>
          <Link className="text-sm underline" href="/analyze">
            Try the limited local parser
          </Link>
        </div>
      ) : null}

      {report && graph ? (
        <div ref={mastheadRef} className="scroll-mt-8">
          <DisagreementReportView
            report={report}
            footer={
              <>
                <RepresentationFeedback section="overall" />
                <ShareReport
                  report={report}
                  graph={graph}
                  publicationToken={publicationToken}
                  unavailableReason={unavailableReason}
                  surface="session"
                />
                <button type="button" className="min-h-11 text-sm underline" onClick={startOver}>
                  Analyze another
                </button>
              </>
            }
          />
        </div>
      ) : null}
    </div>
  );
}
