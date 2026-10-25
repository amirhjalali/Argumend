"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { ChangedQuestion, changedLabel } from "@/components/topic/ChangedQuestion";
import { TextAction } from "@/components/ui";
import { copyTextToClipboard } from "@/lib/copyToClipboard";
import type { ChangedAnswer } from "@/lib/changedQuestion";
import { SITE_URL } from "@/lib/site";

/**
 * What to do with a paste result: copy a plain summary, and answer the
 * north-star question with the same control, words and answers as the
 * question under every map (components/topic/ChangedQuestion.tsx). The page's one rust
 * action, opening the map at its crux, sits under the crux box itself
 * (components/paste/MapResult.tsx).
 *
 * The one-tap answer stays in this component for now: it is not stored, sent
 * or counted (the map page keeps its copy in the browser only). The gap-metric path
 * (lib/gapMetric) only accepts per-reply records with a fixed strict schema,
 * and a yes/no answer is not one of them; widening that schema is a decision
 * for the metric's owner, not for the paste page. See
 * docs/reviews/2026-09-29-paste-flow.md.
 */
export function NextStep({
  summary,
  kind = "summary",
}: {
  /** Absent when there is nothing worth copying. */
  summary?: string;
  kind?: "summary" | "notes";
}) {
  const [copiedSummary, setCopiedSummary] = useState<string | null>(null);
  const copied = Boolean(summary && copiedSummary === summary);
  const [copyFailed, setCopyFailed] = useState(false);
  const [answer, setAnswer] = useState<ChangedAnswer | null>(null);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopiedSummary(null), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    if (!summary) return;
    setCopiedSummary(null);
    setCopyFailed(false);
    try {
      await copyTextToClipboard(summary);
      setCopiedSummary(summary);
    } catch {
      setCopyFailed(true);
    }
  }

  return (
    <section aria-label="Next step" className="space-y-6 border-t border-[var(--border-divider)] pt-8">
      {summary && kind === "summary" ? (
        <details className="max-w-[40rem]">
          <summary className="min-h-11 cursor-pointer py-2.5 font-sans text-sm text-deep underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus dark:text-[#8bb5b1]">
            Preview summary
          </summary>
          <section aria-label="Summary preview" className="mt-3 border-l-2 border-[var(--border-default)] pl-4">
            <p className="whitespace-pre-wrap break-words font-serif text-base leading-relaxed text-[var(--text-secondary)]">
              {summary}
            </p>
          </section>
        </details>
      ) : null}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        {summary ? (
          <TextAction onClick={copy} className="gap-2">
            {copied ? (
              <Check aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Copy aria-hidden="true" className="h-4 w-4" />
            )}
            {copied ? "Copied" : kind === "notes" ? "Copy your notes" : "Copy a summary"}
          </TextAction>
        ) : null}
      </div>
      <p aria-live="polite" className="sr-only">
        {copied ? `${kind === "notes" ? "Notes" : "Summary"} copied to the clipboard` : ""}
      </p>
      {copyFailed && summary ? (
        <div className="space-y-2">
          <p className="font-sans text-sm text-error-text" role="status">
            The clipboard was not available. Here {kind === "notes" ? "are your notes" : "is the summary"} to copy by hand.
          </p>
          <textarea
            readOnly
            aria-label={kind === "notes" ? "Notes to copy" : "Summary to copy"}
            value={summary}
            rows={6}
            onFocus={(event) => event.currentTarget.select()}
            className="w-full max-w-[40rem] rounded-lg border border-[var(--border-default)] bg-[var(--bg-input)] p-3 font-sans text-sm text-[var(--text-primary)]"
          />
        </div>
      ) : null}

      <ChangedQuestion value={answer ?? undefined} onChange={setAnswer}>
        {answer ? (
          <p className="mt-3 font-sans text-sm text-[var(--text-secondary)]">
            Thanks. Your answer is not sent or counted.
          </p>
        ) : null}
      </ChangedQuestion>
      {/* Always in the page, so the first answer is announced. */}
      <p role="status" className="sr-only">
        {answer ? `You answered ${changedLabel(answer).toLowerCase()}. Your answer is not sent or counted.` : ""}
      </p>
    </section>
  );
}

/** A short, previewable takeaway shared by paste results and map reflections. */
export function QuestionTakeaway({
  question, href, scope, leadingAction, copyLabel = "Copy this question",
  previewLabel = "Preview conversation starter", fallbackLabel = "Question to copy",
}: {
  question: string;
  href: string;
  scope?: string;
  leadingAction: ReactNode;
  copyLabel?: string;
  previewLabel?: string;
  fallbackLabel?: string;
}) {
  const starter = [
    "Could we start with this question?",
    ...(scope ? [`Map scope: ${scope}`] : []),
    question,
    `Read the evidence: ${SITE_URL}${href}`,
  ].join("\n\n");
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    setCopied(false);
    setFailed(false);
    try {
      await copyTextToClipboard(starter);
      setCopied(true);
    } catch {
      setFailed(true);
    }
  }

  return (
    <div className="mt-3">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
        {leadingAction}
        <TextAction onClick={copy}>
          <span className="inline-grid">
            {/* Keep feedback from moving a wrapped action into another row. */}
            <span aria-hidden="true" className="invisible col-start-1 row-start-1">{copyLabel}</span>
            <span className="col-start-1 row-start-1">{copied ? "Copied" : copyLabel}</span>
          </span>
        </TextAction>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-muted dark:text-stone-400">
        Take a question back to the conversation, with a link to its evidence.
      </p>
      <details className="mt-1">
        <summary className="min-h-11 cursor-pointer py-2.5 text-xs text-deep underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus dark:text-accent-text">
          {previewLabel}
        </summary>
        <p className="whitespace-pre-wrap break-words border-l-2 border-divider pl-3 text-sm leading-relaxed text-secondary dark:text-stone-300">
          {starter}
        </p>
      </details>
      <p aria-live="polite" className="sr-only">
        {copied ? "Question and evidence link copied to the clipboard." : ""}
      </p>
      {failed ? (
        <div className="mt-2 space-y-2">
          <p role="alert" className="text-sm text-error-text">
            The clipboard was not available. Select the conversation starter and copy it by hand.
          </p>
          <textarea
            aria-label={fallbackLabel}
            readOnly
            value={starter}
            rows={6}
            onFocus={(event) => event.currentTarget.select()}
            className="w-full rounded-lg border border-divider bg-[var(--bg-input)] p-3 text-sm text-primary dark:text-stone-200"
          />
        </div>
      ) : null}
    </div>
  );
}
