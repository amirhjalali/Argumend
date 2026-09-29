"use client";

import { useEffect, useId, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button, TextAction } from "@/components/ui";
import { copyTextToClipboard } from "@/lib/copyToClipboard";
import { trackEvent } from "@/lib/analytics";

/**
 * What to do with a paste result: open the map at the crux (the page's one
 * rust action), copy a plain summary, and answer the north-star question.
 *
 * The one-tap answer stays in this component for now. The gap-metric path
 * (lib/gapMetric) only accepts per-reply records with a fixed strict schema,
 * and a yes/no answer is not one of them; widening that schema is a decision
 * for the metric's owner, not for the paste page. See
 * docs/reviews/2026-09-29-paste-flow.md.
 */
export function NextStep({
  mapHref,
  mapLabel,
  summary,
}: {
  /** Absent when no map was matched: the rust action then does not render. */
  mapHref?: string;
  mapLabel?: string;
  /** Absent when there is nothing worth copying. */
  summary?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
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
        {mapHref ? (
          <Button
            href={mapHref}
            size="lg"
            onClick={() => trackEvent({ action: "cta_click", ctaName: "open_map_at_crux", location: "analyze" })}
          >
            {mapLabel ?? "Open the map at this crux"}
          </Button>
        ) : null}
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
          Did this change what you thought you were arguing about?
        </p>
        {answer ? (
          <p role="status" className="font-sans text-sm text-[var(--text-secondary)]">
            Thanks. You answered {answer === "yes" ? "yes" : "no"}.
          </p>
        ) : (
          <div className="flex gap-3">
            {(["yes", "no"] as const).map((value) => (
              <Button key={value} variant="secondary" onClick={() => setAnswer(value)} className="min-w-16">
                {value === "yes" ? "Yes" : "No"}
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
