import Link from "next/link";
import type { MapReplyMatch } from "@/lib/mapReply/types";
import { CruxLists } from "./CruxLists";
import { DISPLAY_CONFIDENCE_HEDGE, isHedged } from "./confidence";
import { EvidenceCards } from "./EvidenceCards";
import { MapReplyFooter } from "./MapReplyFooter";
import { Meter, percentLabel } from "./meters";
import { PatternSignals } from "./PatternSignals";
import { renderInlineBold, replyLede } from "./replyLede";
import { SectionBar } from "./SectionBar";
import { TurnList } from "./TurnList";

/**
 * The composed reply, laid out as a short report.
 *
 * The order is the order a reader needs it in: which map this is and how sure
 * we are; the reply's own opening paragraph (what the thread is actually
 * arguing about, and whether people are talking past each other); where the
 * turns landed; what kind of disagreement it is; which cruxes it reached; the
 * best evidence on each side; and last, turn by turn, the receipts every line
 * above rests on. Nothing here is generated prose — every sentence is either
 * a number from the pipeline or a string that already exists on the map.
 */

function MapReplyHeader({ match }: { match: MapReplyMatch }) {
  const { topic, topicChoice } = match;
  const hedged = isHedged(topicChoice.confidence);

  return (
    <header>
      <p className="label-caps">The map this thread belongs to</p>

      <h2 className="mt-2 font-serif text-[2.125rem] leading-[1.1] text-[var(--text-heading)] sm:text-[2.75rem]">
        <Link href={topic.path} className="link-underline">
          {topic.title}
        </Link>
      </h2>

      <p className="mt-4 max-w-[36rem] font-serif text-lg italic leading-relaxed text-[var(--text-secondary)]">
        {topic.metaClaim}
      </p>

      <div className="mt-6 max-w-sm">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-sans text-sm text-[var(--text-secondary)]">
            Confidence this is the map
          </span>
          <span
            className={`font-sans text-sm font-medium tabular-nums ${
              hedged ? "text-skeptic dark:text-skeptic-light" : "text-deep dark:text-accent-text"
            }`}
          >
            {percentLabel(topicChoice.confidence)}
          </span>
        </div>
        <Meter
          className="mt-1.5"
          value={topicChoice.confidence}
          tone={hedged ? "brown" : "teal"}
          threshold={topicChoice.threshold}
        />
      </div>

      {hedged ? (
        <p className="mt-4 max-w-[36rem] border-l-2 border-skeptic pl-4 font-sans text-[0.9375rem] leading-relaxed text-[var(--text-secondary)] dark:border-skeptic-light">
          Below {percentLabel(DISPLAY_CONFIDENCE_HEDGE)}, treat the map itself as a guess.
          Everything under this heading is read off this map and no other, so check it is the
          argument you meant before you use the reply.
        </p>
      ) : null}

      <p className="mt-4 font-sans text-sm text-[var(--text-muted)]">
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
  const lede = replyLede(match.markdown);

  return (
    <article className="space-y-12">
      <MapReplyHeader match={match} />

      {lede ? (
        <p className="max-w-[36rem] border-l-[3px] border-deep pl-5 font-serif text-[1.375rem] leading-[1.45] text-[var(--text-primary)] dark:border-deep-light sm:text-[1.5rem]">
          {renderInlineBold(lede)}
        </p>
      ) : null}

      <SectionBar
        sectionCounts={match.sectionCounts}
        dominantSectionId={match.dominantSection?.id ?? null}
        dominantIsTentative={match.dominantSection?.tentative ?? false}
        unplacedCount={match.unplacedCount}
        thread={match.thread}
      />

      <PatternSignals pattern={match.pattern} signals={match.signals} />

      <CruxLists cruxes={match.cruxes} thresholds={match.thresholds} />

      <EvidenceCards
        evidence={match.evidence}
        sectionTitle={match.dominantSection?.title ?? null}
      />

      <TurnList
        turns={match.turns}
        notArguing={match.notArguing}
        notArguingInProbedTurns={match.notArguingInProbedTurns}
        thresholds={match.thresholds}
      />

      <MapReplyFooter
        markdown={match.markdown}
        execution={match.execution}
        onReset={onReset}
      />
    </article>
  );
}
