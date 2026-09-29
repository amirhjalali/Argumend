"use client";

import { useEffect, useId, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button, TextAction } from "@/components/ui";
import { copyTextToClipboard } from "@/lib/copyToClipboard";
import { CHANGED_CHOICES, CHANGED_QUESTION, type ChangedAnswer } from "@/lib/changedQuestion";

/**
 * What to do with a paste result: copy a plain summary, and answer the
 * north-star question, in the same words and with the same answers as the
 * question under every map (lib/changedQuestion). The page's one rust
 * action, opening the map at its crux, sits under the crux box itself
 * (components/paste/MapResult.tsx).
 *
 * The one-tap answer stays in this component for now. The gap-metric path
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
  const questionId = useId();

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

      <div role="group" aria-labelledby={questionId} className="space-y-2">
        <p id={questionId} className="font-serif text-lg leading-snug text-[var(--text-heading)]">
          {CHANGED_QUESTION}
        </p>
        {answer ? (
          <p role="status" className="font-sans text-sm text-[var(--text-secondary)]">
            Thanks. You answered{" "}
            {CHANGED_CHOICES.find((choice) => choice.id === answer)?.label.toLowerCase()}.
          </p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {CHANGED_CHOICES.map((choice) => (
              <Button key={choice.id} variant="secondary" onClick={() => setAnswer(choice.id)} className="min-w-16">
                {choice.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
