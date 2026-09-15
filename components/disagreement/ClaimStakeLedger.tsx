import { STAKE_STATUS_COPY } from "@/lib/disagreement/stakes";
import type { ArgumentAccountability, DisagreementReportV1 } from "@/types/disagreement";

const BASIS_LABEL = {
  explicit: "consequence stated by the participant",
  inferred: "consequence inferred from the argument",
  unstated: "no consequence stated",
} as const;

const NOTE_MARKS = ["¹", "²", "³", "⁴"];

/**
 * "What is actually at stake?" — an editorial ledger, not cards. Desktop is a
 * four-column table with hairline rules; mobile stacks into labelled blocks.
 * Grounding quotes render as numbered source notes beneath the table, the way
 * a print brief would run them. The claim column is the report's restatement
 * of the claim, so it carries no quotation marks; only the source notes are
 * verbatim, and only they are quoted.
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

  return (
    <section aria-labelledby="stake-ledger-heading">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2
          id="stake-ledger-heading"
          className="font-serif text-2xl text-[var(--text-heading)] sm:text-3xl"
        >
          What is actually at stake?
        </h2>
        <p className="text-xs tracking-[0.14em] text-[var(--text-muted)]">
          {accountability.headline.toUpperCase()}
        </p>
      </div>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
        {accountability.summary}
      </p>

      {/* Desktop ledger */}
      <table className="mt-6 hidden w-full border-collapse text-left text-sm md:table">
        <thead>
          <tr className="border-b border-[var(--text-primary)] text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
            <th scope="col" className="py-2 pr-4 font-medium">Claim</th>
            <th scope="col" className="py-2 pr-4 font-medium">What it supports</th>
            <th scope="col" className="py-2 pr-4 font-medium">If it is wrong</th>
            <th scope="col" className="py-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {accountability.stakes.map((stake) => (
            <tr key={stake.id} className="border-b border-[var(--border-divider)] align-top">
              <td className="py-4 pr-4">
                <p className="font-serif text-[15px] leading-snug text-[var(--text-primary)]">
                  {stake.claim}
                  {stake.grounding.map((ref, index) => (
                    <sup key={ref.id} className="ml-0.5 text-[#3a6965] dark:text-deep-bright">
                      {NOTE_MARKS[index] ?? "•"}
                    </sup>
                  ))}
                </p>
                {stake.participantId ? (
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    {participants.get(stake.participantId) ?? "Participant"}
                  </p>
                ) : null}
              </td>
              <td className="py-4 pr-4 text-[var(--text-secondary)]">{stake.targetConclusion}</td>
              <td className="py-4 pr-4 text-[var(--text-secondary)]">
                {stake.ifFalseEffect === "not-stated"
                  ? "No update is stated."
                  : stake.consequence}
              </td>
              <td className="py-4">
                <p className="text-[var(--text-primary)]">{STAKE_STATUS_COPY[stake.diagnostic]}</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">{BASIS_LABEL[stake.basis]}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile stacked ledger */}
      <div className="mt-4 md:hidden">
        {accountability.stakes.map((stake) => (
          <div key={stake.id} className="border-b border-[var(--border-divider)] py-5">
            <p className="text-[10px] font-medium tracking-[0.18em] text-[var(--text-muted)]">CLAIM</p>
            <p className="mt-1 font-serif text-lg leading-snug text-[var(--text-primary)]">
              {stake.claim}
              {stake.grounding.map((ref, index) => (
                <sup key={ref.id} className="ml-0.5 text-[#3a6965] dark:text-deep-bright">
                  {NOTE_MARKS[index] ?? "•"}
                </sup>
              ))}
            </p>
            {stake.participantId ? (
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                {participants.get(stake.participantId) ?? "Participant"}
              </p>
            ) : null}
            <p className="mt-4 text-[10px] font-medium tracking-[0.18em] text-[var(--text-muted)]">
              USED TO SUPPORT
            </p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{stake.targetConclusion}</p>
            <p className="mt-4 text-[10px] font-medium tracking-[0.18em] text-[var(--text-muted)]">
              IF IT IS WRONG
            </p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              {stake.ifFalseEffect === "not-stated" ? "No update is stated." : stake.consequence}
            </p>
            <p className="mt-4 text-[10px] font-medium tracking-[0.18em] text-[var(--text-muted)]">STATUS</p>
            <p className="mt-1 text-sm text-[var(--text-primary)]">{STAKE_STATUS_COPY[stake.diagnostic]}</p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">{BASIS_LABEL[stake.basis]}</p>
          </div>
        ))}
      </div>

      {notes.length > 0 ? (
        <ol className="mt-5 space-y-1.5 border-t border-[var(--border-divider)] pt-4">
          {notes.map((note) => (
            <li key={note.ref.id} className="text-xs leading-relaxed text-[var(--text-muted)]">
              <span className="mr-1 text-[#3a6965] dark:text-deep-bright">{note.mark}</span>
              {note.speaker ? `${note.speaker}: ` : ""}
              &ldquo;{note.ref.quote}&rdquo;
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
