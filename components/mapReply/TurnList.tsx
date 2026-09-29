"use client";

import { useEffect, useState } from "react";
import type { MapReplyThresholds, MapReplyTurn } from "@/lib/mapReply/types";
import { Meter, percentLabel } from "./meters";
import { ResultSection } from "./ResultSection";

/**
 * Every probed turn, with the numbers that placed it. It comes last in the
 * reply because it is the evidence for everything above it: a reader who
 * doubts "most of this thread is arguing about X" scrolls here to check.
 *
 * Three outcomes, and the placement line says which. A `confident` placement
 * cleared the pipeline's section floor and counts toward a section. A
 * `tentative` one is a placement the model made but not firmly enough to
 * assert: it is marked with a dashed "not placed" tag, its probability is
 * still shown, and it is counted as unplaced rather than dropped, because "we
 * could not tell which section this belongs to" is a finding. A turn composed
 * as "not an argument" is dimmed and says which of the two rules caught it,
 * because that is a claim about a move and it has to show its work.
 *
 * Turns are numbered, never attributed: the list sits under "How this was
 * read" and describes moves, not the people who made them, so no speaker's
 * name is printed and no meter can be read as a score for a person.
 *
 * On a phone the turns sit behind a native disclosure whose summary gives the
 * count, because eight probed turns are several screens of receipts under a
 * reply that has already said what they add up to. From 640px up the list is
 * simply open, and the summary is not drawn.
 *
 * The floor itself is not hard-coded here. It arrives on every result as
 * `thresholds.sectionConfidence`, so the wording cannot drift from the gate.
 */

const STANCE_LABEL: Record<string, string> = {
  for: "For the claim",
  against: "Against the claim",
  neither: "Neither",
};

/** Side colours as text only: rust for, brown against, stone for neither. */
const STANCE_TEXT: Record<string, string> = {
  for: "text-rust-700 dark:text-rust-500",
  against: "text-skeptic dark:text-skeptic-light",
  neither: "text-[var(--text-muted)]",
};

const DESKTOP_QUERY = "(min-width: 640px)";

function isDesktop(): boolean {
  return typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia(DESKTOP_QUERY).matches
    : false;
}

function notAnArgumentReason(turn: MapReplyTurn): string {
  if (turn.section === "none") {
    return `Routed to no section of the map (${percentLabel(turn.sectionConfidence)} on "none").`;
  }
  return `High fallacy (${percentLabel(turn.fallacy)}) with almost nothing checkable (${percentLabel(
    turn.factual,
  )}).`;
}

function Placement({ turn, floor }: { turn: MapReplyTurn; floor: number }) {
  if (turn.placement === "none") {
    return (
      <span className="inline-flex items-center rounded-full border border-[var(--border-default)] px-2 py-0.5 font-sans text-xs text-[var(--text-muted)]">
        Not an argument
      </span>
    );
  }

  const tentative = turn.placement === "tentative";

  return (
    <>
      <span
        title={
          tentative
            ? `Below the ${percentLabel(floor)} section floor, so this placement is not counted.`
            : undefined
        }
        className={`inline-flex items-baseline gap-1.5 ${
          tentative ? "text-[var(--text-secondary)]" : "text-deep dark:text-accent-text"
        }`}
      >
        <span>{turn.sectionTitle ?? turn.section}</span>
        <span className="tabular-nums opacity-80">{percentLabel(turn.sectionConfidence)}</span>
        {tentative ? (
          <span className="rounded-full border border-dashed border-[var(--text-muted)] px-2 text-xs font-medium text-[var(--text-secondary)]">
            not placed
          </span>
        ) : null}
      </span>
      <span className={`inline-flex items-baseline gap-1.5 ${STANCE_TEXT[turn.stance] ?? STANCE_TEXT.neither}`}>
        <span>{STANCE_LABEL[turn.stance] ?? turn.stance}</span>
        <span className="tabular-nums opacity-80">{percentLabel(turn.stanceConfidence)}</span>
      </span>
    </>
  );
}

function ProbeMeter({ label, value, tone }: { label: string; value: number; tone: "brown" | "teal" }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 font-sans text-xs">
        <span className="text-[var(--text-muted)]">{label}</span>
        <span className="tabular-nums text-[var(--text-secondary)]">{percentLabel(value)}</span>
      </div>
      <Meter className="mt-1" value={value} tone={tone} />
    </div>
  );
}

function TurnItem({ turn, floor }: { turn: MapReplyTurn; floor: number }) {
  return (
    <li className={`py-6 first:pt-0 ${turn.placement === "none" ? "opacity-70" : ""}`}>
      <p className="font-sans text-sm font-semibold text-[var(--text-primary)]">Turn {turn.index + 1}</p>

      <p className="mt-1.5 max-w-[36rem] font-serif text-lg leading-relaxed text-[var(--text-primary)]">
        {turn.text}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-sans text-sm">
        <Placement turn={turn} floor={floor} />
      </div>

      {turn.placement === "none" ? (
        <p className="mt-2 font-sans text-[0.8125rem] leading-relaxed text-[var(--text-muted)]">
          {notAnArgumentReason(turn)}
        </p>
      ) : null}

      {turn.placement === "tentative" ? (
        <p className="mt-2 max-w-[36rem] font-sans text-[0.8125rem] leading-relaxed text-[var(--text-muted)]">
          The best guess is {turn.sectionTitle ?? turn.section} at{" "}
          {percentLabel(turn.sectionConfidence)}, under the{" "}
          {percentLabel(floor)} floor, so the reply does not count it as arguing about
          anything in particular.
        </p>
      ) : null}

      <div className="mt-4 grid max-w-md grid-cols-2 gap-x-6">
        <ProbeMeter label="Fallacy" value={turn.fallacy} tone="brown" />
        <ProbeMeter label="Checkable" value={turn.factual} tone="teal" />
      </div>
    </li>
  );
}

export function TurnList({
  turns,
  thresholds,
}: {
  turns: MapReplyTurn[];
  thresholds: MapReplyThresholds;
}) {
  const floor = thresholds.sectionConfidence;
  const tentativeCount = turns.filter((turn) => turn.placement === "tentative").length;
  const offTopic = turns.filter((turn) => turn.placement === "none").length;
  // The reply only renders after a client-side submit, so reading the media
  // query in the initializer cannot mismatch a server render.
  const [open, setOpen] = useState(isDesktop);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia(DESKTOP_QUERY);
    // Widening past the breakpoint hides the summary, so the list must open.
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(true);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <ResultSection
      title="Turn by turn"
      aside={
        tentativeCount > 0
          ? `${tentativeCount} placement${tentativeCount === 1 ? "" : "s"} below the ${percentLabel(
              floor,
            )} floor`
          : `every placement above the ${percentLabel(floor)} floor`
      }
    >
      {offTopic > 0 ? (
        <p className="max-w-[36rem] font-sans text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
          {offTopic} of the {turns.length} checked {turns.length === 1 ? "turn" : "turns"}{" "}
          {offTopic === 1 ? "was not an argument" : "were not arguments"} about the topic.
        </p>
      ) : null}

      <details
        open={open}
        onToggle={(event) => setOpen(event.currentTarget.open)}
        className="group"
      >
        <summary className="flex min-h-11 cursor-pointer items-center gap-1.5 font-sans text-[0.9375rem] text-deep marker:content-none dark:text-accent-text sm:hidden [&::-webkit-details-marker]:hidden">
          <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-90">
            ›
          </span>
          {open ? "Hide" : "Show"} all {turns.length} {turns.length === 1 ? "turn" : "turns"}
        </summary>
        <ul className="divide-y divide-[var(--border-divider)] pt-4 sm:pt-0">
          {turns.map((turn) => (
            <TurnItem key={turn.index} turn={turn} floor={floor} />
          ))}
        </ul>
      </details>
    </ResultSection>
  );
}
