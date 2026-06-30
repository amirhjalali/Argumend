import type { Crux } from "@/lib/schemas/topic";
import { GlossaryTerm } from "@/components/GlossaryTerm";

/**
 * Renders a pillar's crux. When the crux carries a `falsification` block it
 * leads with the flagship "what would change your mind" framing — the specific
 * new information that would flip a supporter or a skeptic — and demotes the
 * empirical verification test to a secondary, collapsible note. When there is
 * no falsification data it falls back to the original "what would settle this"
 * test view, so every other topic renders exactly as before.
 */
export function FalsificationCrux({ crux }: { crux: Crux }) {
  const f = crux.falsification;

  return (
    <aside
      id={`crux-${crux.id}`}
      className="mt-6 rounded-lg border border-[color:var(--crux-crimson,#a23b3b)]/30 bg-[color:var(--crux-crimson,#a23b3b)]/5 px-5 py-4 scroll-mt-24"
    >
      <div className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[color:var(--crux-crimson,#a23b3b)] mb-2">
        ◆ <GlossaryTerm term="crux">Crux</GlossaryTerm> —{" "}
        {f ? "what would change your mind" : "what would settle this"}
      </div>

      {f ? (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            {/* A supporter (FOR the claim) — rust/proponent tone */}
            <div className="rounded-md border-l-4 border-l-rust-400 bg-rust-50/40 dark:bg-rust-900/10 pl-3 pr-3 py-2.5">
              <div className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-rust-700 mb-1">
                A supporter changes their mind if…
              </div>
              <p className="font-serif text-[15.5px] leading-snug text-primary">
                {f.supporter_flip}
              </p>
            </div>
            {/* A skeptic (AGAINST the claim) — stone tone */}
            <div className="rounded-md border-l-4 border-l-stone-500 bg-stone-100/50 dark:bg-stone-900/10 pl-3 pr-3 py-2.5">
              <div className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-stone-700 dark:text-stone-300 mb-1">
                A skeptic changes their mind if…
              </div>
              <p className="font-serif text-[15.5px] leading-snug text-primary">
                {f.skeptic_flip}
              </p>
            </div>
          </div>

          {(f.common_ground || f.live_disagreement) && (
            <dl className="mt-3 space-y-1.5 text-[14px] font-serif leading-snug">
              {f.common_ground && (
                <div className="flex gap-2">
                  <dt className="font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-deep whitespace-nowrap pt-0.5">
                    Both agree
                  </dt>
                  <dd className="text-primary/90">{f.common_ground}</dd>
                </div>
              )}
              {f.live_disagreement && (
                <div className="flex gap-2">
                  <dt className="font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--crux-crimson,#a23b3b)] whitespace-nowrap pt-0.5">
                    Live fight
                  </dt>
                  <dd className="text-primary/90">{f.live_disagreement}</dd>
                </div>
              )}
            </dl>
          )}

          {/* Secondary: the empirical test that could resolve it */}
          <details className="mt-3 group">
            <summary className="cursor-pointer text-xs font-sans text-secondary hover:text-primary">
              How it could be settled empirically — {crux.title}
            </summary>
            <p className="font-serif text-[15px] leading-relaxed text-primary/90 mt-2">
              {crux.description}
            </p>
            <div className="mt-1.5 text-xs text-secondary font-sans">
              <span className="font-semibold">Method:</span> {crux.methodology}
            </div>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono text-secondary">
              <span>cost: {crux.cost_to_verify}</span>
              <span>
                <GlossaryTerm term="verification status">status</GlossaryTerm>:{" "}
                {crux.verification_status}
              </span>
            </div>
          </details>
        </>
      ) : (
        <>
          <h4 className="font-serif text-[19px] text-primary mb-1.5">{crux.title}</h4>
          <p className="font-serif text-[16px] leading-relaxed text-primary/90 mb-2">
            {crux.description}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-secondary font-sans">
            <span>
              <span className="font-semibold">Method:</span> {crux.methodology}
            </span>
          </div>
          <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono text-secondary">
            <span>cost: {crux.cost_to_verify}</span>
            <span>
              <GlossaryTerm term="verification status">status</GlossaryTerm>:{" "}
              {crux.verification_status}
            </span>
          </div>
        </>
      )}
    </aside>
  );
}
