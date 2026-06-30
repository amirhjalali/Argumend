import type { Pillar } from "@/lib/schemas/topic";

export function SynopticTable({ pillars }: { pillars: Pillar[] }) {
  return (
    <section
      aria-label="At a glance: proponent vs skeptic"
      className="my-10 overflow-hidden rounded-xl border border-stone-200/70 dark:border-[#3d3a36] bg-white/70 dark:bg-[#252420]/70"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-200/70 dark:divide-[#3d3a36]">
        {/* Column headers carry the side meaning on md+ (two-column layout).
            Hidden on mobile, where the single column would detach them from
            their rows — each cell repeats a compact text label instead. */}
        <div className="hidden md:block bg-rust-50/40 dark:bg-rust-900/10 border-l-4 border-l-rust-400">
          <div className="px-5 py-2.5 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-rust-700">
            Proponent says
          </div>
        </div>
        <div className="hidden md:block bg-stone-100/40 dark:bg-stone-900/20 border-l-4 border-l-stone-500">
          <div className="px-5 py-2.5 text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-stone-700 dark:text-stone-300">
            Skeptic says
          </div>
        </div>
        {pillars.map((pillar) => (
          <div key={`${pillar.id}-row`} className="contents">
            <div className="px-5 py-4 bg-rust-50/20 dark:bg-rust-900/5 border-l-4 border-l-rust-400/70">
              {/* Per-cell label keeps the side legible on mobile (where the
                  column header is hidden) and conveys it by text, not color. */}
              <span className="md:hidden mb-1.5 block text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-rust-700">
                Proponent says
              </span>
              <p className="font-serif text-[15px] leading-relaxed text-primary">
                {pillar.proponent_rebuttal}
              </p>
            </div>
            <div className="px-5 py-4 bg-stone-100/20 dark:bg-stone-900/10 border-l-4 border-l-stone-500/70">
              <span className="md:hidden mb-1.5 block text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-stone-700 dark:text-stone-300">
                Skeptic says
              </span>
              <p className="font-serif text-[15px] leading-relaxed text-primary">
                {pillar.skeptic_premise}
              </p>
            </div>
          </div>
        ))}
      </div>
      {pillars.length > 0 && (
        <div className="border-t border-stone-200/70 dark:border-[#3d3a36] bg-[var(--bg-canvas)] px-5 py-3">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-[color:var(--crux-crimson,#a23b3b)]">
              Cruxes
            </span>
            <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-secondary">
              {pillars.map((pillar, idx) => (
                <li key={pillar.crux.id} className="font-sans">
                  <span className="text-[color:var(--crux-crimson,#a23b3b)] font-semibold">
                    {idx + 1}.
                  </span>{" "}
                  <a
                    href={`#crux-${pillar.crux.id}`}
                    className="link-underline hover:text-primary"
                  >
                    {pillar.crux.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
