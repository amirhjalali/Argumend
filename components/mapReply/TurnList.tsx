import type { MapReplyThresholds, MapReplyTurn } from "@/lib/mapReply/types";
import { Meter, percentLabel } from "./meters";
import { ResultSection } from "./ResultSection";

/**
 * Every probed turn, with the numbers that placed it.
 *
 * Three outcomes, and the chip says which. A `confident` placement cleared the
 * pipeline's section floor and counts toward a section. A `tentative` one is a
 * placement the model made but not firmly enough to assert: it is drawn dashed
 * and labelled, its probability is still shown, and it is counted as unplaced
 * rather than dropped, because "we could not tell which section this belongs
 * to" is a finding. A turn composed as "not an argument" is dimmed and says
 * which of the two rules caught it, because that is a claim about a person and
 * it has to show its work.
 *
 * The floor itself is not hard-coded here. It arrives on every result as
 * `thresholds.sectionConfidence`, so the wording cannot drift from the gate.
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

function TurnChips({ turn, floor }: { turn: MapReplyTurn; floor: number }) {
  if (turn.placement === "none") {
    return (
      <span className="inline-flex items-center rounded-full border border-[var(--border-default)] bg-[var(--bg-overlay)] px-2.5 py-1 font-sans text-xs text-[var(--text-muted)]">
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
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-sans text-xs ${
          tentative
            ? "border border-dashed border-deep/50 text-deep dark:border-deep-light/50 dark:text-deep-light"
            : "border border-deep/30 bg-deep/10 text-deep dark:border-deep-light/30 dark:text-deep-light"
        }`}
      >
        {turn.sectionTitle ?? turn.section}
        <span className="tabular-nums opacity-70">{percentLabel(turn.sectionConfidence)}</span>
        {tentative ? <span className="font-medium">not placed</span> : null}
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

function TurnCard({ turn, floor }: { turn: MapReplyTurn; floor: number }) {
  return (
    <li
      className={`surface-card p-4 sm:p-5 ${turn.placement === "none" ? "opacity-70" : ""}`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="font-sans text-sm font-medium text-[var(--text-primary)]">
          {turn.speaker}
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <TurnChips turn={turn} floor={floor} />
        </div>
      </div>

      <p className="mt-3 font-serif text-base leading-relaxed text-[var(--text-secondary)]">
        {turn.text}
      </p>

      {turn.placement === "none" ? (
        <p className="mt-3 font-sans text-xs text-[var(--text-muted)]">
          {notAnArgumentReason(turn)}
        </p>
      ) : null}

      {turn.placement === "tentative" ? (
        <p className="mt-3 font-sans text-xs text-[var(--text-muted)]">
          The best guess is {turn.sectionTitle ?? turn.section} at{" "}
          {percentLabel(turn.sectionConfidence)}, under the{" "}
          {percentLabel(floor)} floor, so the reply does not count it as arguing about
          anything in particular.
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
  notArguingInProbedTurns,
  thresholds,
}: {
  turns: MapReplyTurn[];
  notArguing: string[];
  /** Speakers who also said things the pipeline never looked at. */
  notArguingInProbedTurns: string[];
  thresholds: MapReplyThresholds;
}) {
  const floor = thresholds.sectionConfidence;
  const tentativeCount = turns.filter((turn) => turn.placement === "tentative").length;

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
      {notArguing.length > 0 ? (
        <p className="text-[var(--text-secondary)]">
          <span className="font-medium text-[var(--text-primary)]">
            {notArguing.join(", ")}
          </span>{" "}
          made no argument about the topic in any turn.
        </p>
      ) : null}

      {notArguingInProbedTurns.length > 0 ? (
        <p className="text-[var(--text-secondary)]">
          <span className="font-medium text-[var(--text-primary)]">
            {notArguingInProbedTurns.join(", ")}
          </span>{" "}
          made no argument in the turns that were checked, but also said things that were
          never checked.
        </p>
      ) : null}

      <ul className="space-y-3">
        {turns.map((turn) => (
          <TurnCard key={turn.index} turn={turn} floor={floor} />
        ))}
      </ul>
    </ResultSection>
  );
}
