"use client";

import { useId } from "react";
import { PASTE_LIMITS } from "@/lib/paste/limits";
import type { DisagreementContentType } from "@/types/disagreement";

const TYPE_LABEL: Record<DisagreementContentType, string> = {
  conversation: "Conversation",
  article: "Article",
  freeform: "My own draft",
};

/**
 * The paste box. The content type is a quiet segmented control rather than
 * three filled pills, so the only filled shape above the fold is the submit
 * button.
 */
export function AnalyzeInput({
  content,
  contentType,
  disabled,
  onContentChange,
  onTypeChange,
  label = "Disagreement text",
}: {
  content: string;
  contentType: DisagreementContentType;
  disabled: boolean;
  onContentChange: (value: string) => void;
  onTypeChange: (value: DisagreementContentType) => void;
  /** The textarea's accessible name. */
  label?: string;
}) {
  const limitId = useId();
  const tooLong = content.length > PASTE_LIMITS.maxCharacters;
  const characterLimit = PASTE_LIMITS.maxCharacters.toLocaleString("en-US");
  return (
    <div className="space-y-3">
      <fieldset className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <legend className="sr-only">Input type</legend>
        <span aria-hidden="true" className="label-caps">
          This is a
        </span>
        <div className="inline-flex rounded-full border border-[var(--border-default)] p-0.5">
          {(["conversation", "article", "freeform"] as const).map((value) => (
            <label
              key={value}
              className={`inline-flex min-h-10 cursor-pointer items-center rounded-full px-3.5 font-sans text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-focus ${
                contentType === value
                  ? "bg-deep/10 font-medium text-deep dark:bg-deep-light/20 dark:text-stone-100"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-heading)]"
              }`}
            >
              <input
                type="radio"
                className="sr-only"
                name="contentType"
                value={value}
                checked={contentType === value}
                disabled={disabled}
                onChange={() => onTypeChange(value)}
              />
              {TYPE_LABEL[value]}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="block">
        <span className="sr-only">{label}</span>
        <textarea
          value={content}
          disabled={disabled}
          onChange={(event) => onContentChange(event.target.value)}
          rows={11}
          aria-invalid={tooLong || undefined}
          aria-describedby={tooLong ? limitId : undefined}
          className="w-full resize-y rounded-lg border border-[var(--border-default)] bg-[var(--bg-input)] p-4 font-sans text-base leading-relaxed text-[var(--text-primary)] placeholder:font-serif placeholder:text-lg placeholder:italic placeholder:text-[var(--text-muted)] focus:border-deep focus:outline-none focus:ring-2 focus:ring-focus disabled:opacity-60"
          placeholder="Paste a conversation, article, or argument."
        />
      </label>
      <p className="text-right font-sans text-sm tabular-nums text-[var(--text-muted)]">
        {content.length.toLocaleString("en-US")} / {characterLimit} characters
      </p>
      {tooLong ? (
        <p id={limitId} role="alert" className="font-sans text-sm leading-relaxed text-error-text">
          Shorten your text to {characterLimit} characters or fewer so the whole argument can be read.
          Your full draft is still here.
        </p>
      ) : null}
    </div>
  );
}
