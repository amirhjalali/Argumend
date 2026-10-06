"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { ChangedQuestion, changedLabel } from "@/components/topic/ChangedQuestion";
import { TextAction } from "@/components/ui";
import { copyTextToClipboard } from "@/lib/copyToClipboard";
import type { ChangedAnswer } from "@/lib/changedQuestion";

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
}: {
  /** Absent when there is nothing worth copying. */
  summary?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [answer, setAnswer] = useState<ChangedAnswer | null>(null);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    if (!summary) return;
    setCopyFailed(false);
    try {
      await copyTextToClipboard(summary);
      setCopied(true);
    } catch {
      setCopyFailed(true);
    }
  }

  return (
    <section aria-label="Next step" className="space-y-6 border-t border-[var(--border-divider)] pt-8">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        {summary ? (
          <TextAction onClick={copy} className="gap-2">
            {copied ? (
              <Check aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Copy aria-hidden="true" className="h-4 w-4" />
            )}
            {copied ? "Copied" : "Copy a summary"}
          </TextAction>
        ) : null}
      </div>
      <p aria-live="polite" className="sr-only">
        {copied ? "Summary copied to the clipboard" : ""}
      </p>
      {copyFailed && summary ? (
        <div className="space-y-2">
          <p className="font-sans text-sm text-error-text" role="status">
            The clipboard was not available. Here is the summary to copy by hand.
          </p>
          <textarea
            readOnly
            aria-label="Summary to copy"
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
