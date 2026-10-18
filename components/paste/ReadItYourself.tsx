"use client";

import { useId, useState, type ReactNode } from "react";
import { TextAction } from "@/components/ui";
import { questionKinds } from "@/lib/questionMeta";
import { readCues, type CueKind, type TextCue } from "@/lib/paste/cues";
import { NextStep } from "./NextStep";

/**
 * "Read it yourself": what a paste with no map gets instead of a map.
 *
 * Three questions that find what most arguments rest on, in the site's own
 * words for kinds of question (lib/questionMeta.ts, the /questions legend):
 * is it about a fact, a value or a word; what would change each person's
 * mind; what do both already agree on. Deterministic and offline: the only
 * thing read from the paste is a word search (lib/paste/cues.ts), labelled as
 * a simple cue and never as a reading. The lines a reader types stay in this
 * component's state: they are not sent or saved. Readers can choose to copy
 * their own notes, separately from the pasted argument and the word cues.
 */

const KINDS: ReadonlyArray<{ kind: CueKind; name: string; term: string; says: string; example: string }> = [
  {
    kind: "fact",
    name: "A fact",
    term: "empirical",
    says: questionKinds.empirical.description,
    example: "Is the new route actually faster at rush hour?",
  },
  {
    kind: "value",
    name: "A value",
    term: "normative",
    says: questionKinds.normative.description,
    example: "Should we spend the bonus on a holiday or save it?",
  },
  {
    kind: "word",
    name: "A word",
    term: "definitional",
    says: "Asks what a word means. Two people can use one word for two things; agree on the meaning and much of it can settle.",
    example: "Is it lying if you just leave something out?",
  },
];

function cueLead(cue: TextCue): string {
  const words = cue.words.map((word) => (/^[“"]/.test(word) ? word : `“${word}”`)).join(", ");
  switch (cue.kind) {
    case "fact":
      return `${words}: there may be something here you could check.`;
    case "value":
      return `${words}: words like these often mark a question of value.`;
    case "word":
      return `${words}: the two of you may mean different things by a word.`;
  }
}

function Cues({ cues }: { cues: readonly TextCue[] }) {
  if (cues.length === 0) return null;
  return (
    <div className="mt-6 border-l-2 border-[var(--border-default)] pl-4">
      <p className="label-caps">Simple cues from your words</p>
      <p className="mt-1 font-sans text-sm text-[var(--text-muted)]">
        A word search, not a reading. It can be wrong.
      </p>
      <ul className="mt-3 space-y-4">
        {cues.map((cue) => (
          <li key={cue.kind}>
            <p className="font-sans text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
              {cueLead(cue)}
            </p>
            <blockquote className="mt-1 font-serif text-lg italic leading-snug text-[var(--text-primary)]">
              “{cue.sentence}”
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
}

const INPUT =
  "mt-1 w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-input)] px-3 py-2.5 font-sans text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-deep focus:outline-none focus:ring-2 focus:ring-focus";

/** One line the reader can choose to include in their conversation notes. */
function FillIn({ label, describedBy, value, onChange }: {
  label: string;
  describedBy: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="font-sans text-sm font-medium text-[var(--text-secondary)]">
        {label}
      </label>
      <input
        id={id}
        type="text"
        autoComplete="off"
        aria-describedby={describedBy}
        className={INPUT}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function Step({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <li className="border-t border-[var(--border-divider)] pt-6">
      <h4 className="font-serif text-[1.375rem] leading-snug text-[var(--text-heading)] sm:text-[1.5rem]">
        {/* The list already numbers its items for a screen reader. */}
        <span aria-hidden="true" className="mr-2 font-sans text-base text-[var(--text-muted)]">
          {number}.
        </span>
        {title}
      </h4>
      {children}
    </li>
  );
}

export function ReadItYourself({
  text,
  diagnosisOn,
}: {
  /** The pasted text, read here for cues only. */
  text: string;
  /** Whether the AI diagnosis lane runs on this deployment. */
  diagnosisOn: boolean;
}) {
  const cues = readCues(text);
  const noteId = useId();
  const [yourCondition, setYourCondition] = useState("");
  const [theirCondition, setTheirCondition] = useState("");
  const [agreement, setAgreement] = useState("");
  const notes = [
    ["I would think again if", yourCondition],
    ["You might think again if", theirCondition],
    ["I think we both agree that", agreement],
  ].filter(([, value]) => value.trim());
  const summary = notes.length > 0
    ? ["My notes for our conversation", ...notes.map(([label, value]) => `${label}: ${value.trim()}`)].join("\n\n")
    : undefined;

  return (
    <section aria-labelledby="read-yourself-heading" className="max-w-[40rem]">
      <h3
        id="read-yourself-heading"
        className="font-serif text-[1.625rem] leading-tight text-[var(--text-heading)] sm:text-[1.875rem]"
      >
        Read it yourself
      </h3>
      <p className="mt-2 font-sans text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
        Three questions that find what most arguments rest on. They work on any argument, mapped
        or not.
      </p>

      <ol className="mt-6 space-y-8">
        <Step number={1} title="Is this about a fact, a value, or a word?">
          <dl className="mt-4 space-y-4">
            {KINDS.map((kind) => (
              <div key={kind.kind}>
                <dt className="font-serif text-lg text-[var(--text-heading)]">
                  {kind.name} <span className="text-[var(--text-muted)]">&middot; {kind.term}</span>
                </dt>
                <dd className="mt-0.5 font-sans text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
                  {kind.says} <span className="italic">For example: {kind.example}</span>
                </dd>
              </div>
            ))}
          </dl>
          <Cues cues={cues} />
        </Step>

        <Step number={2} title="What would change each person’s mind?">
          <p className="mt-2 font-sans text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
            Name one thing that would make each of you think again. If neither of you can name
            anything yet, try a smaller question: what would you need to learn before deciding?
            A disagreement can involve facts, values, and definitions at the same time.
          </p>
          <div className="mt-4 space-y-4">
            <FillIn label="You would think again if…" describedBy={noteId} value={yourCondition} onChange={setYourCondition} />
            <FillIn label="They would think again if…" describedBy={noteId} value={theirCondition} onChange={setTheirCondition} />
          </div>
        </Step>

        <Step number={3} title="What do you both already agree on?">
          <p className="mt-2 font-sans text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
            Most arguments share more than they show: the same worry, the same goal, some of the
            same facts. Naming it shows how much is really in dispute.
          </p>
          <div className="mt-4">
            <FillIn label="We both agree that…" describedBy={noteId} value={agreement} onChange={setAgreement} />
          </div>
        </Step>
      </ol>

      <p id={noteId} className="mt-6 font-sans text-sm text-[var(--text-muted)]">
        Your notes are not sent or saved. They stay on this page unless you choose to copy them.
      </p>

      <p className="mt-8 font-serif text-lg leading-relaxed text-[var(--text-primary)]">
        Where the answers meet is the crux: the question that, once answered, would change a mind.
      </p>
      {summary ? (
        <section aria-label="Your conversation notes" className="mt-8 space-y-5">
          <h4 className="font-serif text-2xl text-[var(--text-heading)]">Take this back to the conversation</h4>
          <p className="font-sans text-sm leading-relaxed text-[var(--text-secondary)]">
            These are your words. Check your understanding of the other person’s view with them.
            Only the notes below are copied, not your original paste.
          </p>
          <p className="whitespace-pre-wrap break-words border-l-2 border-[var(--border-default)] pl-4 font-serif text-lg leading-relaxed">
            {summary}
          </p>
          <NextStep summary={summary} kind="notes" />
        </section>
      ) : null}
      {diagnosisOn ? null : (
        <p className="mt-3 font-sans text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
          A fuller reading of an argument that is not on a map, one that lays out each side and
          finds its crux, needs Argumend’s AI diagnosis, which is not switched on here.
        </p>
      )}
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
        <TextAction href="/concepts/cruxes">What a crux is</TextAction>
        <TextAction href="/topics">Browse all maps</TextAction>
      </div>
    </section>
  );
}
