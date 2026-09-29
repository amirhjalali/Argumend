import Link from "next/link";
import { HowThisWasRead, ReadingNote } from "@/components/paste/HowThisWasRead";
import type { MapReplyMatch } from "@/lib/mapReply/types";
import { CruxLists, CruxNumbers } from "./CruxLists";
import { DISPLAY_CONFIDENCE_HEDGE, isHedged } from "./confidence";
import { EvidenceCards, EvidenceWeights } from "./EvidenceCards";
import { ExecutionNote, MapReplyFooter } from "./MapReplyFooter";
import { Meter, percentLabel } from "./meters";
import { PatternNumbers, PatternSignals } from "./PatternSignals";
import { renderInlineBold, replyLede } from "./replyLede";
import { SectionBar } from "./SectionBar";
import { TurnList } from "./TurnList";

/**
 * The composed reply, laid out as a short report.
 *
 * The order is the order a reader needs it in: which map this is; the
 * reply's own opening paragraph (what the thread is actually arguing about,
 * and whether it talks past itself); where the turns landed; what kind of
 * disagreement it is; which cruxes it reached; the best evidence on each
 * side. It describes turns, never people, and it shows no probabilities.
 *
 * Every number the reply rests on (the map confidence, the pattern and
 * signal probabilities, each crux's touch against its bar, the evidence
 * weights, the turn-by-turn receipts and the execution line) is kept in one
 * collapsed "How this was read" disclosure at the end. Nothing is hidden,
 * and nothing there is needed to read the reply.
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

      {hedged ? (
        <p className="mt-4 max-w-[36rem] border-l-2 border-skeptic pl-4 font-sans text-[0.9375rem] leading-relaxed text-[var(--text-secondary)] dark:border-skeptic-light">
          This is not a confident match, so treat the map itself as a guess. Everything below is
          read off this map and no other: check it is the argument you meant before you use the
          reply.
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
  const { topicChoice } = match;

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

      <PatternSignals pattern={match.pattern} />

      <CruxLists cruxes={match.cruxes} />

      <EvidenceCards
        evidence={match.evidence}
        sectionTitle={match.dominantSection?.title ?? null}
      />

      <MapReplyFooter markdown={match.markdown} onReset={onReset} />

      <HowThisWasRead>
        <ReadingNote label="Which map">
          <div className="max-w-md">
            <div className="flex items-baseline justify-between gap-3">
              <span>Confidence this is the map</span>
              <span className="tabular-nums">{percentLabel(topicChoice.confidence)}</span>
            </div>
            <Meter
              className="mt-1.5"
              value={topicChoice.confidence}
              tone={isHedged(topicChoice.confidence) ? "brown" : "teal"}
              threshold={topicChoice.threshold}
            />
          </div>
          <p>
            No map is shown below {percentLabel(topicChoice.threshold)}; below{" "}
            {percentLabel(DISPLAY_CONFIDENCE_HEDGE)} the page calls it a guess.
          </p>
        </ReadingNote>
        <ReadingNote label="What kind of disagreement">
          <PatternNumbers pattern={match.pattern} signals={match.signals} />
        </ReadingNote>
        <ReadingNote label="Which cruxes it reached">
          <CruxNumbers cruxes={match.cruxes} thresholds={match.thresholds} />
        </ReadingNote>
        {match.evidence.length > 0 ? (
          <ReadingNote label="Why these cards">
            <EvidenceWeights evidence={match.evidence} />
          </ReadingNote>
        ) : null}
        <TurnList turns={match.turns} thresholds={match.thresholds} />
        <ReadingNote label="The run">
          <ExecutionNote execution={match.execution} />
        </ReadingNote>
      </HowThisWasRead>
    </article>
  );
}
