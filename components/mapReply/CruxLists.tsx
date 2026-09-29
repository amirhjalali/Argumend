import type { MapReplyCruxTouch, MapReplyThresholds } from "@/lib/mapReply/types";
import { Meter, percentLabel } from "./meters";
import { ResultSection } from "./ResultSection";

/**
 * Which of the map's cruxes the thread actually argued about, and which it
 * never got to.
 *
 * This is the part of the reply that is worth the most to someone in the
 * middle of the argument: the map already knows what question would settle
 * each section, and the probe says whether anyone in the thread reached it.
 * The crux of the section the thread spent most of its turns in is expanded
 * wherever it lands, and is the only one drawn in crux crimson, because "you
 * never reached the question your own argument turns on" is exactly the case
 * worth spelling out.
 *
 * The list is words only. How strongly each crux came up, and the bar it had
 * to clear, are in `CruxNumbers` under "How this was read".
 */

function CruxItem({ crux }: { crux: MapReplyCruxTouch }) {
  const dominant = crux.isDominantSection;
  return (
    <li
      className={
        dominant
          ? "rounded-md border border-[var(--border-divider)] border-l-[3px] border-l-crux bg-[var(--bg-paper)] p-4 dark:border-l-crux-light sm:p-5"
          : "border-b border-[var(--border-divider)] pb-4 last:border-b-0 last:pb-0"
      }
    >
      {dominant ? (
        <p className="mb-1.5 font-sans text-[0.8125rem] text-crux dark:text-crux-text">
          The crux for the section this thread spent most of its turns in
        </p>
      ) : null}
      <h5 className="font-serif text-[1.1875rem] leading-snug text-[var(--text-heading)]">
        {crux.cruxTitle}
      </h5>
      <p className="mt-0.5 font-sans text-[0.8125rem] text-[var(--text-muted)]">{crux.pillarTitle}</p>
      {dominant ? (
        <p className="mt-3 max-w-[36rem] font-serif text-[1.0625rem] leading-relaxed text-[var(--text-secondary)]">
          {crux.cruxDescription}
        </p>
      ) : null}
    </li>
  );
}

function CruxColumn({
  title,
  empty,
  cruxes,
}: {
  title: string;
  empty: string;
  cruxes: MapReplyCruxTouch[];
}) {
  return (
    <div>
      <h4 className="label-caps">{title}</h4>
      {cruxes.length === 0 ? (
        <p className="mt-2 font-sans text-[0.9375rem] text-[var(--text-secondary)]">{empty}</p>
      ) : (
        <ul className="mt-3 space-y-4">
          {cruxes.map((crux) => (
            <CruxItem key={crux.cruxId} crux={crux} />
          ))}
        </ul>
      )}
    </div>
  );
}

function split(cruxes: MapReplyCruxTouch[]) {
  const byTouch = [...cruxes].sort((a, b) => b.touched - a.touched);
  return {
    touched: byTouch.filter((crux) => crux.touched >= crux.touchedThreshold),
    missed: byTouch.filter((crux) => crux.touched < crux.touchedThreshold),
  };
}

export function CruxLists({ cruxes }: { cruxes: MapReplyCruxTouch[] }) {
  const { touched, missed } = split(cruxes);

  return (
    <ResultSection title="Which cruxes it reached">
      <div className="space-y-10">
        <CruxColumn
          title="This thread touched"
          empty="None of the map's cruxes came up."
          cruxes={touched}
        />
        <CruxColumn
          title="It never reached"
          empty="Every crux on the map came up."
          cruxes={missed}
        />
      </div>
    </ResultSection>
  );
}

/** How strongly each crux came up, against its bar, for "How this was read". */
export function CruxNumbers({
  cruxes,
  thresholds,
}: {
  cruxes: MapReplyCruxTouch[];
  thresholds: MapReplyThresholds;
}) {
  const byTouch = [...cruxes].sort((a, b) => b.touched - a.touched);
  return (
    <div className="space-y-3">
      <p>A crux counts as touched at or above {percentLabel(thresholds.cruxTouched)}.</p>
      <ul className="max-w-md space-y-3">
        {byTouch.map((crux) => (
          <li key={crux.cruxId}>
            <div className="flex items-baseline justify-between gap-3">
              <span>{crux.cruxTitle}</span>
              <span className="shrink-0 tabular-nums">{percentLabel(crux.touched)}</span>
            </div>
            <Meter
              className="mt-1.5"
              value={crux.touched}
              tone={crux.isDominantSection ? "crux" : "teal"}
              threshold={crux.touchedThreshold}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
