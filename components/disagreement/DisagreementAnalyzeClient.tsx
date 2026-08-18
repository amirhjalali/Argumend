"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { DISAGREEMENT_EXAMPLE_SOURCE } from "@/lib/disagreement/constants";
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
  const [publicationToken, setPublicationToken] = useState<string>();
  const [unavailableReason, setUnavailableReason] = useState<string>();

  useEffect(() => {
    if (status !== "loading") return;
    const timer = window.setInterval(() => setStep((value) => value + 1), PROGRESS_MS);
    return () => window.clearInterval(timer);
  }, [status]);

  async function submit() {
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

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 px-4 py-10">
      <div>
        <h1 className="font-serif text-4xl text-[var(--text-heading)]">What are they actually arguing about?</h1>
        <p className="mt-3 text-lg text-[var(--text-secondary)]">
          Paste a conversation, article, or argument. Argumend finds the common ground, the real disagreements, and the
          question everything turns on.
        </p>
      </div>

      <AnalyzeInput
        content={content}
        contentType={contentType}
        disabled={status === "loading"}
        onContentChange={setContent}
        onTypeChange={setContentType}
      />

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={submit}
          disabled={status === "loading"}
          className="min-h-11 rounded-full bg-[#C4613C] px-6 text-white disabled:opacity-60"
        >
          Find the crux
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
          Use example
        </button>
      </div>

      {status === "loading" ? <AnalysisProgress step={step} /> : null}
      {status === "error" ? (
        <div className="space-y-3">
          <p className="text-[#a23b3b]">{error}</p>
          <Link className="text-sm underline" href="/analyze">
            Try the limited local parser
          </Link>
        </div>
      ) : null}

      {report && graph ? (
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
              <button
                type="button"
                className="min-h-11 text-sm underline"
                onClick={() => {
                  setReport(null);
                  setStatus("idle");
                  trackEvent({ action: "disagreement_analyze_another", surface: "session" });
                }}
              >
                Analyze another
              </button>
            </>
          }
        />
      ) : null}
    </div>
  );
}
