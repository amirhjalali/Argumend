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
      className="mt-8 scroll-mt-24 rounded-lg border border-stone-200/80 border-l-2 border-l-[color:var(--crux-crimson)] bg-[var(--bg-paper)] px-5 py-5 dark:border-[#3d3a36] dark:border-l-[color:var(--crux-crimson)] sm:px-6"
    >
      <p className="label-caps !text-[color:var(--crux-crimson)]">
        <GlossaryTerm term="crux" className="[font-variant-caps:inherit] [letter-spacing:inherit]">Crux</GlossaryTerm>:{" "}
        {f ? "what would change your mind" : "what would settle this"}
      </p>

      {f ? (
        <>
          {/* The two flips are the point of the block, so they get display
              size and one column each; the labels stay small. Rust names the
              proponent side and brown the skeptic, as everywhere else. */}
          <div className="mt-4 divide-y divide-stone-200/80 dark:divide-[#3d3a36]">
            <div className="pb-4">
              <p className="label-caps !text-[0.9375rem] !text-rust-700 dark:!text-[#d4805f]">
                A supporter changes their mind if…
              </p>
              <p className="mt-1 font-serif text-[1.25rem] leading-[1.45] text-primary dark:text-stone-200 sm:text-[1.375rem]">
                {f.supporter_flip}
              </p>
            </div>
            <div className="pt-4">
              <p className="label-caps !text-[0.9375rem] !text-[#8B5A3C] dark:!text-[#cfa88a]">
                A skeptic changes their mind if…
              </p>
              <p className="mt-1 font-serif text-[1.25rem] leading-[1.45] text-primary dark:text-stone-200 sm:text-[1.375rem]">
                {f.skeptic_flip}
              </p>
            </div>
          </div>

          {(f.common_ground || f.live_disagreement) && (
            <dl className="mt-5 space-y-2 font-serif text-[16px] leading-relaxed">
              {f.common_ground && (
                <div>
                  <dt className="inline font-medium italic text-primary dark:text-stone-200">
                    Both agree.
                  </dt>{" "}
                  <dd className="inline text-secondary dark:text-stone-400">{f.common_ground}</dd>
                </div>
              )}
              {f.live_disagreement && (
                <div>
                  <dt className="inline font-medium italic text-primary dark:text-stone-200">
                    The live fight.
                  </dt>{" "}
                  <dd className="inline text-secondary dark:text-stone-400">{f.live_disagreement}</dd>
                </div>
              )}
            </dl>
          )}

          {/* Secondary: the empirical test that could resolve it */}
          <details className="mt-3 group">
            <summary className="inline-flex min-h-11 cursor-pointer items-center rounded text-xs font-sans text-secondary dark:text-stone-400 hover:text-primary dark:hover:text-stone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep">
              How it could be settled empirically: {crux.title}
            </summary>
            <p className="font-serif text-[15px] leading-relaxed text-primary/90 dark:text-stone-200/90 mt-2">
              {crux.description}
            </p>
            <div className="mt-1.5 text-xs text-secondary dark:text-stone-400 font-sans">
              <span className="font-semibold">Method:</span> {crux.methodology}
            </div>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono text-secondary dark:text-stone-400">
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
          <h4 className="font-serif text-[19px] text-primary dark:text-stone-200 mb-1.5">{crux.title}</h4>
          <p className="font-serif text-[16px] leading-relaxed text-primary/90 dark:text-stone-200/90 mb-2">
            {crux.description}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-secondary dark:text-stone-400 font-sans">
            <span>
              <span className="font-semibold">Method:</span> {crux.methodology}
            </span>
          </div>
          <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono text-secondary dark:text-stone-400">
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
