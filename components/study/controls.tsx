"use client";

/**
 * The study's answer controls. Native radio inputs inside a fieldset with a
 * legend, so every choice is a labelled, keyboard-reachable control; the
 * styled label is the 44px tap target. No control starts with a value: an
 * unanswered item is null, never a default the participant did not choose.
 */
import { useId } from "react";
import { cx } from "@/components/ui/cx";

export interface ChoiceOption<T extends string | number> {
  value: T;
  label: string;
}

const CHOICE_LABEL =
  "flex min-h-11 cursor-pointer items-center justify-center rounded-lg border px-2 py-2 text-center font-sans text-sm leading-tight transition-colors " +
  "border-stone-300/80 bg-card text-primary hover:border-stone-400 dark:border-divider " +
  "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-focus has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-canvas " +
  "has-[:checked]:border-deep has-[:checked]:bg-deep has-[:checked]:text-white dark:has-[:checked]:border-[#7fb5b0] dark:has-[:checked]:bg-[#2d524f]";

export function ChoiceGroup<T extends string | number>({
  legend,
  hint,
  options,
  value,
  onChange,
  columns = "grid-cols-2 sm:grid-cols-4",
  endLabels,
  name,
}: {
  legend: React.ReactNode;
  hint?: React.ReactNode;
  options: ChoiceOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  columns?: string;
  /** Labels under the two ends of a numeric scale. */
  endLabels?: [string, string];
  name?: string;
}) {
  const generated = useId();
  const groupName = name ?? generated;
  return (
    <fieldset className="min-w-0">
      <legend className="font-serif text-lg leading-snug text-primary">{legend}</legend>
      {hint ? <p className="mt-1 font-sans text-sm text-muted">{hint}</p> : null}
      <div className={cx("mt-3 grid gap-1.5", columns)}>
        {options.map((option) => (
          <label key={String(option.value)} className={CHOICE_LABEL}>
            <input
              type="radio"
              name={groupName}
              value={String(option.value)}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
      {endLabels ? (
        <div className="mt-1.5 flex justify-between gap-4 font-sans text-xs text-muted" aria-hidden="true">
          <span>{endLabels[0]}</span>
          <span className="text-right">{endLabels[1]}</span>
        </div>
      ) : null}
    </fieldset>
  );
}

/** 0–10, eleven buttons in one row; the ends are named in the hint for screen readers. */
export function ZeroToTen({
  legend,
  value,
  onChange,
  endLabels,
}: {
  legend: React.ReactNode;
  value: number | null;
  onChange: (value: number) => void;
  endLabels: [string, string];
}) {
  return (
    <ChoiceGroup
      legend={legend}
      hint={<span className="sr-only">{`0 means ${endLabels[0]}, 10 means ${endLabels[1]}.`}</span>}
      options={Array.from({ length: 11 }, (_, n) => ({ value: n, label: String(n) }))}
      value={value}
      onChange={onChange}
      columns="grid-cols-11 gap-0.5 sm:gap-1.5"
      endLabels={endLabels}
    />
  );
}

export const AGREE_OPTIONS: ChoiceOption<number>[] = [
  { value: 1, label: "Strongly disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Agree" },
  { value: 4, label: "Strongly agree" },
];

export const ATTITUDE_OPTIONS: ChoiceOption<number>[] = [
  { value: 1, label: "Definitely no" },
  { value: 2, label: "Probably no" },
  { value: 3, label: "Leaning no" },
  { value: 4, label: "Leaning yes" },
  { value: 5, label: "Probably yes" },
  { value: 6, label: "Definitely yes" },
];

/** A whole-number percentage, 0–100. Empty is null. */
export function PercentInput({
  label,
  value,
  onChange,
}: {
  label: React.ReactNode;
  value: number | null;
  onChange: (value: number | null) => void;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block font-sans text-sm leading-snug text-secondary">
        {label}
      </label>
      <div className="mt-1.5 flex items-center gap-2">
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={0}
          max={100}
          step={1}
          value={value ?? ""}
          onChange={(event) => {
            const raw = event.target.value;
            if (raw === "") return onChange(null);
            const parsed = Math.round(Number(raw));
            onChange(Number.isFinite(parsed) ? Math.max(0, Math.min(100, parsed)) : null);
          }}
          className="h-11 w-24 rounded-lg border border-stone-300/80 bg-card px-3 font-sans text-base text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus dark:border-divider"
        />
        <span className="font-sans text-base text-secondary">%</span>
      </div>
    </div>
  );
}
