"use client";

import { useId, type ReactNode } from "react";
import { CHANGED_CHOICES, CHANGED_QUESTION, type ChangedAnswer } from "@/lib/changedQuestion";

/**
 * The north star's question, as one control in both places it is asked: under
 * "Which question would change your mind?" on every map
 * (components/topic/CruxReflection.tsx) and after a paste result
 * (components/paste/NextStep.tsx). Same words, same three answers, same
 * buttons, so a reader who meets it twice meets one question.
 *
 * It only reports the answer. Where it is kept (this browser, or nowhere) and
 * what is announced are the caller's to say. Nothing grades the answer.
 */

/** An option the reader can pick (also the reflection's question options). */
export const CHOICE_BASE =
  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus";
export const CHOICE_IDLE =
  "border-stone-300/80 bg-white/60 text-stone-800 hover:border-deep/60 hover:bg-deep/[0.04] dark:border-[var(--border-divider)] dark:bg-transparent dark:text-stone-200 dark:hover:border-[#8bb5b1]/60";
export const CHOICE_CHOSEN =
  "border-deep bg-deep/[0.07] text-stone-900 dark:border-[#8bb5b1] dark:bg-deep/20 dark:text-stone-100";

export function ChangedQuestion({
  value,
  onChange,
  className = "",
  children,
}: {
  value?: ChangedAnswer;
  onChange: (answer: ChangedAnswer) => void;
  className?: string;
  /** A line under the answers (where the answer is kept). */
  children?: ReactNode;
}) {
  const questionId = useId();
  return (
    <div className={className}>
      <p
        id={questionId}
        className="font-serif text-[1.0625rem] leading-snug text-stone-900 dark:text-stone-100 sm:text-lg"
      >
        {CHANGED_QUESTION}
      </p>
      <div role="group" aria-labelledby={questionId} className="mt-3 flex flex-wrap gap-2">
        {CHANGED_CHOICES.map((choice) => {
          const chosen = value === choice.id;
          return (
            <button
              key={choice.id}
              type="button"
              aria-pressed={chosen}
              onClick={() => onChange(choice.id)}
              className={`inline-flex min-h-11 min-w-16 items-center justify-center rounded-full border px-4 font-sans text-sm font-medium ${CHOICE_BASE} ${
                chosen ? CHOICE_CHOSEN : CHOICE_IDLE
              }`}
            >
              {choice.label}
            </button>
          );
        })}
      </div>
      {children}
    </div>
  );
}

/** "Did this change…" lower-cased, to run on from a sentence. */
export const CHANGED_QUESTION_INLINE = `${CHANGED_QUESTION.charAt(0).toLowerCase()}${CHANGED_QUESTION.slice(1)}`;

/** The label of an answer, for an announcement ("You answered a little."). */
export function changedLabel(answer: ChangedAnswer): string {
  return CHANGED_CHOICES.find((choice) => choice.id === answer)?.label ?? answer;
}
