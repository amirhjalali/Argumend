"use client";

import type { DisagreementContentType } from "@/types/disagreement";

export function AnalyzeInput({
  content,
  contentType,
  disabled,
  onContentChange,
  onTypeChange,
}: {
  content: string;
  contentType: DisagreementContentType;
  disabled: boolean;
  onContentChange: (value: string) => void;
  onTypeChange: (value: DisagreementContentType) => void;
}) {
  return (
    <div className="space-y-4">
      <fieldset className="flex flex-wrap gap-2">
        <legend className="sr-only">Input type</legend>
        {(["conversation", "article", "freeform"] as const).map((value) => (
          <label
            key={value}
            className={`min-h-11 cursor-pointer rounded-full border px-4 py-2 text-sm capitalize ${
              contentType === value
                ? "border-[#3a6965] bg-[#3a6965] text-white"
                : "border-[var(--border-default)]"
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
            {value}
          </label>
        ))}
      </fieldset>
      <label className="block">
        <span className="sr-only">Disagreement text</span>
        <textarea
          value={content}
          disabled={disabled}
          onChange={(event) => onContentChange(event.target.value)}
          rows={12}
          maxLength={20000}
          className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-input)] p-4 text-base text-[var(--text-primary)]"
          placeholder="Paste a conversation, article, or argument."
        />
      </label>
      <p className="text-sm text-[var(--text-muted)]">{content.length} / 20,000 characters</p>
    </div>
  );
}
