"use client";

import { useEffect, useRef, useState } from "react";
import type { MapReplyResult } from "@/lib/mapReply/types";
import { mapReplyErrorMessage } from "./errorCopy";
import { MapReplyForm } from "./MapReplyForm";
import { MapReplyNoMatch } from "./MapReplyNoMatch";
import { MapReplyProgress } from "./MapReplyProgress";
import { MapReplyResult as MapReplyResultView } from "./MapReplyResult";

/**
 * Paste box, request, and one of three answers: a map, no map, or an error.
 *
 * "No map" is deliberately not an error here. The pipeline refuses below its
 * confidence bar rather than guessing, and a reader who pasted an argument
 * Argumend has never mapped deserves to be told that, with the maps that came
 * closest, rather than shown a red box.
 */

/** Long enough that each stage is readable, short enough to finish a 700 ms run. */
const STAGE_INTERVAL_MS = 300;

type Status = "idle" | "loading" | "done" | "error";

interface ErrorState {
  message: string;
  requestId?: string;
}

interface MapReplyErrorBody {
  error?: string;
  code?: string;
  requestId?: string;
}

export function MapReplyClient() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<MapReplyResult | null>(null);
  const [error, setError] = useState<ErrorState | null>(null);
  const [inputCollapsed, setInputCollapsed] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status !== "loading") return;
    const timer = window.setInterval(() => setStep((value) => value + 1), STAGE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [status]);

  useEffect(() => {
    if (status === "done") {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [status]);

  async function submit() {
    setStep(0);
    setStatus("loading");
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/map-reply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const body: unknown = await response.json();
      const payload = (body ?? {}) as Partial<MapReplyResult> & MapReplyErrorBody;

      // A "no map" answer arrives as 200 with `ok: false`; only a missing or
      // non-boolean `ok` means the route sent an error envelope instead.
      if (!response.ok || typeof payload.ok !== "boolean") {
        setError({
          message: mapReplyErrorMessage(payload.code, payload.error),
          requestId: payload.requestId,
        });
        setStatus("error");
        return;
      }

      setResult(payload as MapReplyResult);
      setInputCollapsed(true);
      setStatus("done");
    } catch {
      setError({ message: mapReplyErrorMessage("PROVIDER_UNAVAILABLE") });
      setStatus("error");
    }
  }

  function reset() {
    setResult(null);
    setError(null);
    setStatus("idle");
    setInputCollapsed(false);
  }

  return (
    <div className="space-y-8">
      {inputCollapsed && status === "done" ? (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-divider)] pb-4">
          <p className="font-sans text-sm text-[var(--text-secondary)]">
            Thread submitted · {text.length.toLocaleString()} characters
          </p>
          <button
            type="button"
            onClick={() => setInputCollapsed(false)}
            className="inline-flex min-h-11 items-center rounded-md font-sans text-sm text-deep underline underline-offset-2 hover:text-deep-dark dark:text-deep-light dark:hover:text-stone-200"
          >
            Edit
          </button>
        </div>
      ) : (
        <MapReplyForm
          value={text}
          disabled={status === "loading"}
          onChange={setText}
          onSubmit={submit}
        />
      )}

      {status === "loading" ? <MapReplyProgress step={step} /> : null}

      {status === "error" && error ? (
        <div
          role="alert"
          className="space-y-2 rounded-xl border-l-2 border-crux bg-[var(--bg-paper)] p-5 dark:border-crux-light"
        >
          <p className="text-[var(--text-primary)]">{error.message}</p>
          {error.requestId ? (
            <p className="font-sans text-xs text-[var(--text-muted)]">
              Reference {error.requestId}
            </p>
          ) : null}
        </div>
      ) : null}

      {result ? (
        <div ref={resultRef} className="scroll-mt-8">
          {result.ok ? (
            <MapReplyResultView match={result} onReset={reset} />
          ) : (
            <MapReplyNoMatch result={result} onReset={reset} />
          )}
        </div>
      ) : null}
    </div>
  );
}
