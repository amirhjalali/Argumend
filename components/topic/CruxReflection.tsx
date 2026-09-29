"use client";

/**
 * The one-tap reflection that replaced the for/against vote on topic pages.
 *
 * It asks which question would change the reader's mind, then whether the
 * map changed what they thought the argument was about. That is the north
 * star's "did this change what you thought you were arguing about?" answer,
 * asked of the reader about themselves.
 *
 * Never graded: it does not compare the answer with the map, with a score, or
 * with other readers. Stored in this browser only; nothing is sent or counted.
 */
import { useCallback, useEffect, useState } from "react";
import { TextAction } from "@/components/ui";

export interface ReflectionOption {
  id: string;
  label: string;
}

interface StoredReflection {
  choice: string;
  changed?: "yes" | "somewhat" | "no";
}

const KEY_PREFIX = "argumend-crux-reflection-";
export const NONE_OF_THEM = "none";

const CHANGED_CHOICES = [
  { id: "yes", label: "Yes" },
  { id: "somewhat", label: "A little" },
  { id: "no", label: "No" },
] as const;

function read(topicId: string): StoredReflection | null {
  try {
    const raw = window.localStorage.getItem(`${KEY_PREFIX}${topicId}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredReflection;
    return typeof parsed?.choice === "string" ? parsed : null;
  } catch {
    return null;
  }
}

function write(topicId: string, value: StoredReflection | null) {
  try {
    if (value) window.localStorage.setItem(`${KEY_PREFIX}${topicId}`, JSON.stringify(value));
    else window.localStorage.removeItem(`${KEY_PREFIX}${topicId}`);
  } catch {
    // Private browsing can refuse storage; the answer still shows for this visit.
  }
}

const OPTION_BASE =
  "flex min-h-11 w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-sm leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus";
const OPTION_IDLE =
  "border-stone-300/80 bg-white/60 text-stone-800 hover:border-deep/60 hover:bg-deep/[0.04] dark:border-[var(--border-divider)] dark:bg-transparent dark:text-stone-200 dark:hover:border-[#8bb5b1]/60";
const OPTION_CHOSEN =
  "border-deep bg-deep/[0.07] text-stone-900 dark:border-[#8bb5b1] dark:bg-deep/20 dark:text-stone-100";

export function CruxReflection({
  topicId,
  options,
}: {
  topicId: string;
  options: ReflectionOption[];
}) {
  const [answer, setAnswer] = useState<StoredReflection | null>(null);

  useEffect(() => {
    // Mount-time read of a device-local answer; SSR renders the unanswered state.
    setAnswer(read(topicId));
  }, [topicId]);

  const choose = useCallback(
    (choice: string) => {
      const next = { choice };
      setAnswer(next);
      write(topicId, next);
    },
    [topicId],
  );

  const setChanged = useCallback(
    (changed: StoredReflection["changed"]) => {
      setAnswer((current) => {
        if (!current) return current;
        const next = { ...current, changed };
        write(topicId, next);
        return next;
      });
    },
    [topicId],
  );

  const clear = useCallback(() => {
    setAnswer(null);
    write(topicId, null);
  }, [topicId]);

  return (
    <section
      id="reflect"
      aria-labelledby="reflect-heading"
      className="mt-12 surface-paper rounded-lg p-4 sm:p-5"
    >
      <h2
        id="reflect-heading"
        className="font-serif text-[1.25rem] leading-snug text-stone-900 dark:text-stone-100"
      >
        Which question would change your mind?
      </h2>
      <p className="mt-1 text-xs leading-relaxed text-muted dark:text-stone-400">
        One tap. Your answer stays in this browser: nothing is sent, counted, or compared.
      </p>
      <ul className="mt-4 space-y-2">
        {[...options, { id: NONE_OF_THEM, label: "None of these would" }].map((option, index) => {
          const chosen = answer?.choice === option.id;
          const numbered = option.id !== NONE_OF_THEM;
          return (
            <li key={option.id}>
              <button
                type="button"
                aria-pressed={chosen}
                onClick={() => choose(option.id)}
                className={`${OPTION_BASE} ${chosen ? OPTION_CHOSEN : OPTION_IDLE}`}
              >
                <span
                  aria-hidden="true"
                  className="w-4 shrink-0 text-right font-serif text-[1.0625rem] leading-5 text-[#a23b3b] dark:text-[#d27070]"
                >
                  {numbered ? index + 1 : ""}
                </span>
                <span className="line-clamp-2">{option.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {answer && (
        <div className="mt-5 border-t border-stone-200 pt-4 dark:border-[var(--border-divider)]">
          <p className="font-serif text-[1.0625rem] leading-snug text-stone-900 dark:text-stone-100">
            Did this map change what you thought the argument was about?
          </p>
          <div role="group" aria-label="Did this map change what you thought the argument was about?" className="mt-3 flex flex-wrap gap-2">
            {CHANGED_CHOICES.map((choice) => {
              const chosen = answer.changed === choice.id;
              return (
                <button
                  key={choice.id}
                  type="button"
                  aria-pressed={chosen}
                  onClick={() => setChanged(choice.id)}
                  className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
                    chosen ? OPTION_CHOSEN : OPTION_IDLE
                  }`}
                >
                  {choice.label}
                </button>
              );
            })}
          </div>
          <p role="status" className="mt-3 text-xs text-muted dark:text-stone-400">
            {answer.changed ? "Kept in this browser only." : "Noted in this browser only."}{" "}
            <TextAction onClick={clear} className="!text-xs">
              Clear my answer
            </TextAction>
          </p>
        </div>
      )}
    </section>
  );
}
