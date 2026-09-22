import Link from "next/link";
import type { MapReplyMatch } from "@/lib/mapReply/types";
import { CruxLists } from "./CruxLists";
import { DISPLAY_CONFIDENCE_HEDGE, isHedged } from "./confidence";
import { EvidenceCards } from "./EvidenceCards";
import { MapReplyFooter } from "./MapReplyFooter";
import { Meter, percentLabel } from "./meters";
import { PatternSignals } from "./PatternSignals";
import { SectionBar } from "./SectionBar";
import { TurnList } from "./TurnList";

/**
 * The composed reply, laid out as a short report.
 *
 * The order is the order a reader needs it in: which map this is and how sure
 * we are, what the thread is actually about, what each turn was doing, what
 * shape the disagreement has, which crux it reached, and the best evidence on
 * each side. Nothing here is generated prose — every sentence is either a
 * number from the pipeline or a string that already exists on the map.
 */

function MapReplyHeader({ match }: { match: MapReplyMatch }) {
  const { topic, topicChoice } = match;
  const hedged = isHedged(topicChoice.confidence);

  return (
    <header className="space-y-4">
      <p className="font-sans text-xs uppercase tracking-[0.14em] text-deep dark:text-deep-light">
        Argumend map
      </p>

      <h2 className="font-serif text-3xl leading-tight text-[var(--text-heading)] sm:text-4xl">
        <Link href={topic.path} className="link-underline">
          {topic.title}
        </Link>
      </h2>

      <p className="max-w-prose font-serif text-lg italic leading-relaxed text-[var(--text-secondary)]">
        {topic.metaClaim}
      </p>

      <div className="max-w-xs space-y-1.5">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-sans text-xs uppercase tracking-wide text-[var(--text-muted)]">
            Confidence this is the map
          </span>
          <span className="font-sans text-sm tabular-nums text-deep dark:text-deep-light">
            {percentLabel(topicChoice.confidence)}
          </span>
        </div>
        <Meter
          value={topicChoice.confidence}
          tone={hedged ? "brown" : "teal"}
          threshold={topicChoice.threshold}
        />
      </div>

      {hedged ? (
        <p className="max-w-prose rounded-lg border-l-2 border-crux bg-[var(--bg-paper)] px-4 py-3 text-sm leading-relaxed text-[var(--text-secondary)] dark:border-crux-light">
          Below {percentLabel(DISPLAY_CONFIDENCE_HEDGE)}, treat the map itself as a guess.
          Everything under this heading is read off this map and no other, so check it is the
          argument you meant before you use the reply.
        </p>
      ) : null}

      <p className="max-w-prose font-sans text-sm text-[var(--text-muted)]">
        Argumend does not say who is right. Nothing below is a verdict.
      </p>
    </header>
  );
}

export function MapReplyResult({
  match,
  onReset,
}: {
  match: MapReplyMatch;
  onReset: () => void;
}) {
  return (
    <article className="space-y-8">
      <MapReplyHeader match={match} />

      <SectionBar
        sectionCounts={match.sectionCounts}
        dominantSectionId={match.dominantSection?.id ?? null}
        dominantIsTentative={match.dominantSection?.tentative ?? false}
        unplacedCount={match.unplacedCount}
        thread={match.thread}
      />

      <TurnList
        turns={match.turns}
        notArguing={match.notArguing}
        notArguingInProbedTurns={match.notArguingInProbedTurns}
        thresholds={match.thresholds}
      />

      <PatternSignals pattern={match.pattern} signals={match.signals} />

      <CruxLists cruxes={match.cruxes} thresholds={match.thresholds} />

      <EvidenceCards
        evidence={match.evidence}
        sectionTitle={match.dominantSection?.title ?? null}
      />

      <MapReplyFooter
        markdown={match.markdown}
        execution={match.execution}
        onReset={onReset}
      />
    </article>
  );
}
