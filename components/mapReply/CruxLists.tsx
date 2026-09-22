import type { MapReplyCruxTouch } from "@/lib/mapReply/types";
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
 * wherever it lands, because "you never reached the question your own
 * argument turns on" is exactly the case worth spelling out.
 */

function CruxItem({ crux }: { crux: MapReplyCruxTouch }) {
  return (
    <li
      className={`rounded-xl p-4 ${
        crux.isDominantSection
          ? "border-l-2 border-crux bg-[var(--bg-paper)] dark:border-crux-light"
          : "bg-[var(--bg-paper)]"
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h5 className="font-serif text-lg leading-snug text-[var(--text-heading)]">
          {crux.cruxTitle}
        </h5>
        <span className="shrink-0 font-sans text-sm tabular-nums text-[var(--text-muted)]">
          {percentLabel(crux.touched)}
        </span>
      </div>
      <p className="mt-1 font-sans text-xs text-[var(--text-muted)]">{crux.pillarTitle}</p>
      <div className="mt-2.5">
        <Meter
          value={crux.touched}
          tone={crux.isDominantSection ? "crux" : "teal"}
          threshold={crux.touchedThreshold}
        />
      </div>
      {crux.isDominantSection ? (
        <>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
            {crux.cruxDescription}
          </p>
          <p className="mt-2 font-sans text-xs uppercase tracking-wide text-crux dark:text-crux-light">
            The crux for the section this thread spent most of its turns in
          </p>
        </>
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
    <div className="space-y-3">
      <h4 className="font-sans text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
        {title}
      </h4>
      {cruxes.length === 0 ? (
        <p className="text-sm text-[var(--text-secondary)]">{empty}</p>
      ) : (
        <ul className="space-y-3">
          {cruxes.map((crux) => (
            <CruxItem key={crux.cruxId} crux={crux} />
          ))}
        </ul>
      )}
    </div>
  );
}

export function CruxLists({ cruxes }: { cruxes: MapReplyCruxTouch[] }) {
  const byTouch = [...cruxes].sort((a, b) => b.touched - a.touched);
  const touched = byTouch.filter((crux) => crux.touched >= crux.touchedThreshold);
  const missed = byTouch.filter((crux) => crux.touched < crux.touchedThreshold);
  const threshold = cruxes[0]?.touchedThreshold ?? 0.5;

  return (
    <ResultSection
      title="Cruxes"
      aside={`touched at or above ${percentLabel(threshold)}`}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
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
