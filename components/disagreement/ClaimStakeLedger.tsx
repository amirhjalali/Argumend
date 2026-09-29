import { STAKE_STATUS_COPY } from "@/lib/disagreement/stakes";
import type { ArgumentAccountability, DisagreementReportV1 } from "@/types/disagreement";
import { ReportSection } from "./ReportSection";

const BASIS_LABEL = {
  explicit: "the participant says so",
  inferred: "read from the argument",
  unstated: "the text doesn’t say",
} as const;

const NOTE_MARKS = ["¹", "²", "³", "⁴"];

/**
 * "What is actually at stake?" — an editorial ledger, not cards. Desktop is a
 * four-column table with hairline rules; mobile stacks into labelled blocks.
 * Grounding quotes render as numbered source notes beneath the table, the way
 * a print brief would run them.
 */
export function ClaimStakeLedger({ report }: { report: DisagreementReportV1 }) {
  const accountability: ArgumentAccountability | undefined = report.accountability;
  if (!accountability || accountability.stakes.length === 0) return null;

  const participants = new Map(report.participants.map((item) => [item.id, item.label]));
  const notes = accountability.stakes.flatMap((stake) =>
    stake.grounding.map((ref) => {
      const speaker = ref.participantId ? participants.get(ref.participantId) : undefined;
      return { mark: NOTE_MARKS[stake.grounding.indexOf(ref)] ?? "•", ref, speaker };
    }),
  );

  const marks = (stake: (typeof accountability.stakes)[number]) =>
    stake.grounding.map((ref, index) => (
      <sup key={ref.id} className="ml-0.5 font-sans text-deep dark:text-accent-text">
        {NOTE_MARKS[index] ?? "•"}
      </sup>
    ));

  const ifWrong = (stake: (typeof accountability.stakes)[number]) =>
    stake.ifFalseEffect === "not-stated"
      ? "The text doesn’t say what would change."
      : stake.consequence;

  return (
    <ReportSection
      id="stakes"
      title="What is actually at stake?"
      lede={
        <>
          <span className="font-medium text-[var(--text-primary)]">{accountability.headline}</span>{" "}
          {accountability.summary}
        </>
      }
    >
      {/* Desktop ledger */}
      <table className="hidden w-full border-collapse text-left font-sans text-sm md:table">
        <thead>
          <tr className="border-b border-[var(--text-muted)]">
            <th scope="col" className="label-caps py-2 pr-4 font-medium">Claim</th>
            <th scope="col" className="label-caps py-2 pr-4 font-medium">What it supports</th>
            <th scope="col" className="label-caps py-2 pr-4 font-medium">If it is wrong</th>
            <th scope="col" className="label-caps py-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {accountability.stakes.map((stake) => (
            <tr key={stake.id} className="border-b border-[var(--border-divider)] align-top">
              <td className="py-4 pr-4">
                <p className="font-serif text-[1.0625rem] leading-snug text-[var(--text-heading)]">
                  &ldquo;{stake.claim}&rdquo;
                  {marks(stake)}
                </p>
                {stake.participantId ? (
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    {participants.get(stake.participantId) ?? "Participant"}
                  </p>
                ) : null}
              </td>
              <td className="py-4 pr-4 leading-relaxed text-[var(--text-secondary)]">{stake.targetConclusion}</td>
              <td className="py-4 pr-4 leading-relaxed text-[var(--text-secondary)]">{ifWrong(stake)}</td>
              <td className="py-4">
                <p className="leading-relaxed text-[var(--text-primary)]">{STAKE_STATUS_COPY[stake.diagnostic]}</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">{BASIS_LABEL[stake.basis]}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile stacked ledger */}
      <div className="divide-y divide-[var(--border-divider)] md:hidden">
        {accountability.stakes.map((stake) => (
          <div key={stake.id} className="py-5 first:pt-0">
            <p className="font-serif text-[1.25rem] leading-snug text-[var(--text-heading)]">
              &ldquo;{stake.claim}&rdquo;
              {marks(stake)}
            </p>
            {stake.participantId ? (
              <p className="mt-1 font-sans text-[0.8125rem] text-[var(--text-muted)]">
                {participants.get(stake.participantId) ?? "Participant"}
              </p>
            ) : null}
            <dl className="mt-4 space-y-3 font-sans text-[0.9375rem] leading-relaxed">
              <div>
                <dt className="label-caps">Used to support</dt>
                <dd className="text-[var(--text-secondary)]">{stake.targetConclusion}</dd>
              </div>
              <div>
                <dt className="label-caps">If it is wrong</dt>
                <dd className="text-[var(--text-secondary)]">{ifWrong(stake)}</dd>
              </div>
              <div>
                <dt className="label-caps">Status</dt>
                <dd className="text-[var(--text-primary)]">{STAKE_STATUS_COPY[stake.diagnostic]}</dd>
                <dd className="text-[0.8125rem] text-[var(--text-muted)]">{BASIS_LABEL[stake.basis]}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      {notes.length > 0 ? (
        <ol className="mt-5 space-y-1.5 border-t border-[var(--border-divider)] pt-4">
          {notes.map((note) => (
            <li key={note.ref.id} className="font-sans text-xs leading-relaxed text-[var(--text-muted)]">
              <span className="mr-1 text-deep dark:text-accent-text">{note.mark}</span>
              {note.speaker ? `${note.speaker}: ` : ""}
              &ldquo;{note.ref.quote}&rdquo;
            </li>
          ))}
        </ol>
      ) : null}
    </ReportSection>
  );
}
