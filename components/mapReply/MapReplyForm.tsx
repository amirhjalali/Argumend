"use client";

import { MAP_REPLY_LIMITS } from "@/lib/mapReply/constants";
// The demo thread lives with the recorded model answers so the example a
// visitor loads is byte-identical to the one the pipeline tests replay. It is
// a plain exported string; importing it here does not pull in the fixture JSON.
import { RENT_CONTROL_THREAD } from "@/lib/mapReply/__fixtures__/rentControlThread";
import { MapReplyConsent } from "./MapReplyConsent";

const INPUT_ID = "map-reply-thread";
const CONSENT_ID = "map-reply-consent";
const COUNTER_ID = "map-reply-counter";

const PLACEHOLDER = [
  "One turn per line, as  name: what they said",
  "",
  "marisol_k: Council is voting on a 3% rent cap Tuesday. Every economist on the planet says rent control destroys housing supply.",
  "dtown_renter: Econ 101 also says my rent going up 22% in one year is the market clearing. A cap means I don't get pushed out.",
].join("\n");

export function MapReplyForm({
  value,
  disabled,
  onChange,
  onSubmit,
}: {
  value: string;
  disabled: boolean;
  onChange: (next: string) => void;
  onSubmit: () => void;
}) {
  const { minCharacters, maxCharacters } = MAP_REPLY_LIMITS;
  const trimmedLength = value.trim().length;
  const tooShort = trimmedLength < minCharacters;
  // `maxLength` already truncates a paste, so this only ever reports the cap
  // being reached rather than exceeded.
  const atCap = value.length >= maxCharacters;

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        if (!disabled && !tooShort) onSubmit();
      }}
    >
      <div className="space-y-2">
        <label htmlFor={INPUT_ID} className="sr-only">
          Thread to map
        </label>
        <textarea
          id={INPUT_ID}
          value={value}
          disabled={disabled}
          rows={12}
          maxLength={maxCharacters}
          spellCheck={false}
          aria-describedby={COUNTER_ID}
          // `maxLength` covers typing and pasting in a browser; the slice
          // covers everything else that can set a value, so the cap is a
          // property of the component rather than of the input element.
          onChange={(event) => onChange(event.target.value.slice(0, maxCharacters))}
          placeholder={PLACEHOLDER}
          className="w-full resize-y rounded-xl border border-[var(--border-default)] bg-[var(--bg-input)] p-4 font-sans text-base leading-relaxed text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-deep focus:outline-none focus:ring-2 focus:ring-deep/30 disabled:opacity-60"
        />

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <button
            type="button"
            disabled={disabled}
            onClick={() => onChange(RENT_CONTROL_THREAD)}
            className="inline-flex min-h-11 items-center rounded-md text-sm text-deep underline underline-offset-2 hover:text-deep-dark disabled:opacity-60 dark:text-deep-light dark:hover:text-stone-200"
          >
            Load example
          </button>
          <p
            id={COUNTER_ID}
            className={`font-sans text-sm tabular-nums ${
              atCap ? "text-crux dark:text-crux-light" : "text-[var(--text-muted)]"
            }`}
          >
            {value.length.toLocaleString()} / {maxCharacters.toLocaleString()} characters
            {atCap ? " — at the cap" : ""}
          </p>
        </div>
      </div>

      <MapReplyConsent id={CONSENT_ID} />

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={disabled || tooShort}
          aria-describedby={CONSENT_ID}
          className="btn-lift inline-flex min-h-11 items-center rounded-full bg-rust-500 px-6 font-sans text-base font-medium text-white transition-colors hover:bg-rust-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Map this thread
        </button>
        {tooShort && trimmedLength > 0 ? (
          <p className="text-sm text-[var(--text-muted)]" role="status">
            {minCharacters - trimmedLength} more characters before there is an argument to route.
          </p>
        ) : null}
      </div>
    </form>
  );
}
