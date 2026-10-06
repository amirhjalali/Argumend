"use client";

/**
 * The one-tap reflection that replaced the for/against vote on topic pages.
 *
 * It asks which question would change the reader's mind, then shows what
 * would settle that question, the strongest card on each side of it (so
 * whichever answer the reader holds, the other side's best card is in front of
 * them), and a link to open the crux on the page: the tap leads somewhere.
 * Then it asks whether the map changed what they thought they were arguing
 * about: the north star's question, asked of the reader about themselves,
 * with the same control the paste result uses (./ChangedQuestion).
 *
 * Never graded: it does not compare the answer with the map, with a score, or
 * with other readers. Stored in this browser only; nothing is sent or counted.
 */
import { useCallback, useEffect, useState } from "react";
import { TextAction, textActionClasses } from "@/components/ui";
import { SOURCE_LINK, SettleAnswer } from "@/components/topic/cruxPrimitives";
import type { ChangedAnswer } from "@/lib/changedQuestion";
import type { SettleView, StrongestCard } from "@/lib/topicPage/model";
import {
  CHANGED_QUESTION_INLINE,
  CHOICE_BASE,
  CHOICE_CHOSEN,
  CHOICE_IDLE,
  ChangedQuestion,
} from "./ChangedQuestion";

export interface ReflectionOption {
  /** The crux's anchor on the page (`crux-…`). */
  id: string;
  label: string;
  /** What would settle it, shown once the reader picks this question. */
  settle?: SettleView;
  /** The strongest card on each side of it, shown with the settle line. */
  strongest?: readonly StrongestCard[];
}

interface StoredReflection {
  choice: string;
  changed?: ChangedAnswer;
}

const KEY_PREFIX = "argumend-crux-reflection-";
export const NONE_OF_THEM = "none";

/**
 * Open the crux's fold before the browser scrolls to it. OpenCruxFromHash
 * does this on `hashchange`, which does not fire when the hash is already
 * the one this link points at.
 */
function openCrux(anchor: string) {
  const details = document.getElementById(anchor)?.querySelector("details");
  if (details && !details.open) details.open = true;
}

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

const OPTION_BASE = `flex min-h-11 w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-sm leading-snug ${CHOICE_BASE}`;

const SIDE_TEXT: Record<StrongestCard["side"], string> = {
  for: "text-[#3a6965] dark:text-[#8fc0bb]",
  against: "text-[#8B5A3C] dark:text-[#cfa88a]",
};
const SIDE_RULE: Record<StrongestCard["side"], string> = {
  for: "border-[#3a6965]/60 dark:border-[#8fc0bb]/50",
  against: "border-[#8B5A3C]/60 dark:border-[#cfa88a]/50",
};

/**
 * The strongest card on each side of the picked crux, in a fixed order
 * (supporting first), never one side alone and never with a weight.
 */
function OtherSideCards({ cards }: { cards: readonly StrongestCard[] }) {
  return (
    <div className="mt-5" data-other-side-cards>
      <h3 className="label-caps">The other side’s best card</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted dark:text-stone-400">
        Whichever answer you hold, the strongest card against it is one of these.
      </p>
      <ul className="mt-3 space-y-4">
        {cards.map((card) => (
          <li key={card.side} data-side={card.side} className={`border-l-2 pl-3 ${SIDE_RULE[card.side]}`}>
            <p className={`font-sans text-xs font-medium ${SIDE_TEXT[card.side]}`}>{card.sideLabel}</p>
            <p className="mt-1 break-words font-serif text-[1rem] leading-[1.5] text-stone-800 dark:text-stone-200">
              {card.title}
            </p>
            {card.source ? (
              card.sourceUrl ? (
                <a
                  href={card.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open source from ${card.source} (opens in a new tab)`}
                  className={`${SOURCE_LINK} break-words text-xs`}
                >
                  {card.source} ↗
                </a>
              ) : (
                <p className="mt-1 break-words text-xs text-muted dark:text-stone-400">{card.source}</p>
              )
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** What the announcement says appeared under the options after a pick. */
function shownBelow(picked: ReflectionOption | undefined): string {
  const parts = picked
    ? [
        picked.settle ? "what would settle it" : "",
        picked.strongest?.length ? "the strongest card on each side" : "",
      ].filter(Boolean)
    : [];
  if (parts.length === 0) return "One more question below";
  const shown = parts.join(" and ");
  return `${shown.charAt(0).toUpperCase()}${shown.slice(1)} ${parts.length > 1 ? "are" : "is"} shown below, with a link to open this crux, then one more question`;
}

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
    (changed: ChangedAnswer) => {
      setAnswer((current) => {
        if (!current) return current;
        const next = { ...current, changed };
        write(topicId, next);
        return next;
      });
    },
    [topicId],
  );

  // The picked crux, or undefined for "None of these would".
  const picked = answer ? options.find((option) => option.id === answer.choice) : undefined;

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
                className={`${OPTION_BASE} ${chosen ? CHOICE_CHOSEN : CHOICE_IDLE}`}
              >
                <span
                  aria-hidden="true"
                  className="w-4 shrink-0 text-right font-serif text-[1.0625rem] leading-5 text-[#a23b3b] dark:text-[#d27070]"
                >
                  {numbered ? index + 1 : ""}
                </span>
                {/* Wraps in full: a question cut off mid-clause is not one
                    a reader can choose. */}
                <span className="min-w-0 flex-1 whitespace-normal break-words">{option.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {picked && (picked.settle || picked.strongest?.length) ? (
        <div className="mt-5 border-t border-stone-200 pt-1 dark:border-[var(--border-divider)]">
          {picked.settle ? (
            <SettleAnswer
              mode={picked.settle.mode}
              kind={picked.settle.kind}
              condition={picked.settle.condition}
              resolved={picked.settle.resolved}
              label={picked.settle.label}
            />
          ) : null}
          {picked.strongest?.length ? <OtherSideCards cards={picked.strongest} /> : null}
          <a
            href={`#${picked.id}`}
            onClick={() => openCrux(picked.id)}
            className={textActionClasses("mt-3")}
          >
            Open this crux
          </a>
        </div>
      ) : null}

      {answer && (
        <ChangedQuestion
          value={answer.changed}
          onChange={setChanged}
          className="mt-5 border-t border-stone-200 pt-4 dark:border-[var(--border-divider)]"
        >
          <p className="mt-3 text-xs text-muted dark:text-stone-400">
            {answer.changed ? "Kept in this browser only." : "Noted in this browser only."}{" "}
            <TextAction onClick={clear} className="!text-xs">
              Clear my answer
            </TextAction>
          </p>
        </ChangedQuestion>
      )}
      {/* Always in the page, so the first answer is announced: a status
          mounted together with its text is often missed, and a tap on an
          option otherwise says nothing about what appears below it. */}
      <div role="status" className="sr-only">
        {answer
          ? answer.changed
            ? "Kept in this browser only."
            : `Noted in this browser only. ${shownBelow(picked)}: ${CHANGED_QUESTION_INLINE}`
          : ""}
      </div>
    </section>
  );
}
