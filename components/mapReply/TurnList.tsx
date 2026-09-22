import type { MapReplyTurn } from "@/lib/mapReply/types";
import { isHedged } from "./confidence";
import { Meter, percentLabel } from "./meters";
import { ResultSection } from "./ResultSection";

/**
 * Every probed turn, with the numbers that placed it.
 *
 * The section chip is the claim a reader is most likely to argue with, so it
 * carries its own confidence and changes shape below the hedge line: a dashed
 * chip is the tool saying "this is where I put it, and I would not defend it".
 * A turn composed as "not an argument" is dimmed rather than dropped, and says
 * which of the two rules caught it, because "you were not making an argument"
 * is a claim that has to show its work.
 */

const STANCE_LABEL: Record<string, string> = {
  for: "For the claim",
  against: "Against the claim",
  neither: "Neither",
};

const STANCE_CHIP: Record<string, string> = {
  for: "border-rust-500/40 bg-rust-50 text-rust-700 dark:border-rust-400/40 dark:bg-transparent dark:text-rust-400",
  against:
    "border-skeptic/40 bg-[var(--bg-paper)] text-skeptic dark:border-skeptic-light/40 dark:bg-transparent dark:text-skeptic-light",
  neither:
    "border-[var(--border-default)] bg-[var(--bg-paper)] text-[var(--text-muted)]",
};

function stanceChip(stance: string): string {
  return STANCE_CHIP[stance] ?? STANCE_CHIP.neither;
}

function notAnArgumentReason(turn: MapReplyTurn): string {
  if (turn.section === "none") {
    return `Routed to no section of the map (${percentLabel(turn.sectionConfidence)} on "none").`;
  }
  return `High fallacy (${percentLabel(turn.fallacy)}) with almost nothing checkable (${percentLabel(
    turn.factual,
  )}).`;
}

function TurnChips({ turn }: { turn: MapReplyTurn }) {
  if (turn.notAnArgument) {
    return (
      <span className="inline-flex items-center rounded-full border border-[var(--border-default)] bg-[var(--bg-overlay)] px-2.5 py-1 font-sans text-xs text-[var(--text-muted)]">
        Not an argument
      </span>
    );
  }

  const hedged = isHedged(turn.sectionConfidence);

  return (
    <>
      <span
        title={hedged ? "Below 70% confidence: treat this placement as a guess." : undefined}
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-sans text-xs ${
          hedged
            ? "border border-dashed border-deep/50 text-deep dark:border-deep-light/50 dark:text-deep-light"
            : "border border-deep/30 bg-deep/10 text-deep dark:border-deep-light/30 dark:text-deep-light"
        }`}
      >
        {turn.sectionTitle ?? turn.section}
        <span className="tabular-nums opacity-70">{percentLabel(turn.sectionConfidence)}</span>
        {hedged ? <span className="font-medium">low confidence</span> : null}
      </span>
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-sans text-xs ${stanceChip(
          turn.stance,
        )}`}
      >
        {STANCE_LABEL[turn.stance] ?? turn.stance}
        <span className="tabular-nums opacity-70">{percentLabel(turn.stanceConfidence)}</span>
      </span>
    </>
  );
}

function TurnCard({ turn }: { turn: MapReplyTurn }) {
  return (
    <li
      className={`surface-card p-4 sm:p-5 ${
        turn.notAnArgument ? "opacity-70" : ""
      }`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="font-sans text-sm font-medium text-[var(--text-primary)]">
          {turn.speaker}
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <TurnChips turn={turn} />
        </div>
      </div>

      <p className="mt-3 font-serif text-base leading-relaxed text-[var(--text-secondary)]">
        {turn.text}
      </p>

      {turn.notAnArgument ? (
        <p className="mt-3 font-sans text-xs text-[var(--text-muted)]">
          {notAnArgumentReason(turn)}
        </p>
      ) : null}

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-3">
          <span className="w-24 shrink-0 font-sans text-xs text-[var(--text-muted)]">Fallacy</span>
          <Meter value={turn.fallacy} tone="brown" />
          <span className="w-10 shrink-0 text-right font-sans text-xs tabular-nums text-[var(--text-muted)]">
            {percentLabel(turn.fallacy)}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-24 shrink-0 font-sans text-xs text-[var(--text-muted)]">
            Checkable
          </span>
          <Meter value={turn.factual} tone="teal" />
          <span className="w-10 shrink-0 text-right font-sans text-xs tabular-nums text-[var(--text-muted)]">
            {percentLabel(turn.factual)}
          </span>
        </div>
      </div>
    </li>
  );
}

export function TurnList({
  turns,
  notArguing,
}: {
  turns: MapReplyTurn[];
  notArguing: string[];
}) {
  const hedgedCount = turns.filter(
    (turn) => !turn.notAnArgument && isHedged(turn.sectionConfidence),
  ).length;

  return (
    <ResultSection
      title="Turn by turn"
      aside={
        hedgedCount > 0
          ? `${hedgedCount} placement${hedgedCount === 1 ? "" : "s"} below 70% confidence`
          : "every placement above 70% confidence"
      }
    >
      {notArguing.length > 0 ? (
        <p className="text-[var(--text-secondary)]">
          <span className="font-medium text-[var(--text-primary)]">
            {notArguing.join(", ")}
          </span>{" "}
          made no argument about the topic in any probed turn.
        </p>
      ) : null}

      <ul className="space-y-3">
        {turns.map((turn) => (
          <TurnCard key={turn.index} turn={turn} />
        ))}
      </ul>
    </ResultSection>
  );
}
