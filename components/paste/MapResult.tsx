"use client";

import Link from "next/link";
import { Fragment, useEffect, useId, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { ClosestMaps } from "@/components/mapReply/ClosestMaps";
import { Button, TextAction, textActionClasses } from "@/components/ui";
import { trackEvent } from "@/lib/analytics";
import { toneStyles } from "@/lib/categoryColors";
import { ANSWER_SIDES, CLAIM_SIDES, type SideWords } from "@/lib/mapNaming";
import type {
  PasteMapCandidate,
  PasteMapCard,
  PasteMapMatch,
  PasteMapsResult,
} from "@/lib/paste/types";
import { ReadItYourself } from "./ReadItYourself";

/**
 * "This argument is already mapped": the part of a paste result that takes
 * the reader to the map.
 *
 * Everything shown is copied from the map itself: its title and claim, the
 * question its crux asks with what would change each side's mind, and the
 * strongest card on each side. The cards carry no weight score here. Two
 * scores side by side read as a side ahead on points, and the map page is
 * where a reader can see what a weight weighs.
 *
 * The page's one rust action, "Open the map at this crux", sits directly
 * under the crux box, and the long texts above it (what would change each
 * side's mind, each card's description) are clamped with "Show more", so on
 * a phone the action is about a screen into the result, not several.
 */

/** Sides by the answer to the map's question, else by the claim (lib/mapNaming.ts). */
function sideWordsFor(match: PasteMapMatch): SideWords {
  return match.cardsAbout === "map-question" ? ANSWER_SIDES : CLAIM_SIDES;
}

function sideLabel(side: PasteMapCard["side"], words: SideWords): string {
  return side === "for" ? words.yesEvidence : words.noEvidence;
}

// The tone map's small-text pairs: rust-500 and skeptic-light were 4.28:1
// and 4.34:1 on the dark canvas, under AA for 14px text.
const SIDE_TEXT: Record<PasteMapCard["side"], string> = {
  for: toneStyles.rust.accentText,
  against: toneStyles.brown.accentText,
};

const CLAMP = { 3: "line-clamp-3", 4: "line-clamp-4" } as const;

/**
 * Long text held to a few lines, with "Show more" when it runs longer, so the
 * crux box and the two cards do not push the rest of the result screens down
 * on a phone. The button appears only when the text is actually cut, says
 * what it opens to a screen reader (`about`), and is a real disclosure
 * (aria-expanded, aria-controls). Clamped text stays in the DOM, so search
 * and screen readers still have all of it.
 */
function ClampedText({
  text,
  className,
  about,
  lines = 3,
}: {
  text: string;
  className: string;
  /** Read after "Show more" by a screen reader: what the text is. */
  about: string;
  lines?: keyof typeof CLAMP;
}) {
  // A span, so it can sit in a <dd> or an <li> alike. Open, `block` makes it a
  // paragraph; clamped, line-clamp sets its own display, which a second
  // display class would override (and the clamp with it).
  const ref = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [cut, setCut] = useState(false);
  const id = useId();

  useEffect(() => {
    const element = ref.current;
    if (!element || open) return;
    const measure = () => setCut(element.scrollHeight > element.clientHeight + 1);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [open, text]);

  return (
    <>
      <span id={id} ref={ref} className={`${className} ${open ? "block" : CLAMP[lines]}`}>
        {text}
      </span>
      {cut || open ? (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((value) => !value)}
          className={textActionClasses("mt-1 self-start text-sm")}
        >
          {open ? "Show less" : "Show more"}
          <span className="sr-only">{about}</span>
        </button>
      ) : null}
    </>
  );
}

function Card({ card, words }: { card: PasteMapCard; words: SideWords }) {
  return (
    <li className="flex flex-col border-t-2 border-[var(--border-divider)] pt-4">
      <p className={`font-sans text-sm font-medium ${SIDE_TEXT[card.side]}`}>{sideLabel(card.side, words)}</p>
      <h4 className="mt-2 font-serif text-[1.25rem] leading-snug text-[var(--text-heading)]">
        {card.title}
      </h4>
      <ClampedText
        text={card.description}
        about={`: ${card.title}`}
        className="mt-2 font-sans text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]"
      />
      {card.source ? (
        <p className="mt-3 font-serif text-base italic text-[var(--text-muted)]">{card.source}</p>
      ) : null}
      {card.sourceUrl ? (
        <a
          href={card.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={textActionClasses("mt-1 gap-1.5 self-start")}
        >
          Open the source
          <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ) : null}
    </li>
  );
}

function CruxPanel({ match }: { match: PasteMapMatch }) {
  const crux = match.crux;
  if (!crux) return null;
  const flips = crux.supporterFlip && crux.skepticFlip;
  const words = sideWordsFor(match);

  const also = match.alsoCrux;

  return (
    <div className="mt-6 rounded-md border border-[var(--border-divider)] border-t-[3px] border-t-crux bg-[var(--bg-paper)] px-5 pb-6 pt-5 dark:border-t-crux-light sm:px-8 sm:pb-8 sm:pt-6">
      {/* Two cruxes when the text's words do not pick one: the reader knows
          which of the two their argument is about; the lane does not. */}
      <h3 className="label-caps text-crux dark:text-crux-text">
        {also ? "It may turn on one of these" : "What the map says it turns on"}
      </h3>
      <p className="mt-3 font-serif text-[1.3125rem] leading-[1.3] text-[var(--text-heading)] sm:text-[1.625rem]">
        {crux.question}
      </p>
      {flips ? (
        <dl className="mt-4 divide-y divide-[var(--border-divider)] border-t border-[var(--border-divider)]">
          <div className="py-4">
            <dt className="label-caps !text-rust-700 dark:!text-[#d4805f]">
              {words.yesChangesMind}
            </dt>
            <dd className="mt-1 flex flex-col">
              <ClampedText
                lines={3}
                text={crux.supporterFlip!}
                about={`: ${words.yesChangesMind}`}
                className="font-serif text-[1.125rem] leading-relaxed text-[var(--text-primary)]"
              />
            </dd>
          </div>
          <div className="pt-4">
            <dt className="label-caps !text-skeptic dark:!text-[#cfa88a]">
              {words.noChangesMind}
            </dt>
            <dd className="mt-1 flex flex-col">
              <ClampedText
                lines={3}
                text={crux.skepticFlip!}
                about={`: ${words.noChangesMind}`}
                className="font-serif text-[1.125rem] leading-relaxed text-[var(--text-primary)]"
              />
            </dd>
          </div>
        </dl>
      ) : (
        <dl className="mt-6 space-y-4 border-t border-[var(--border-divider)] pt-5 font-sans text-[0.9375rem]">
          {crux.settle ? (
            <div>
              <dt className="label-caps">What could settle it</dt>
              <dd className="mt-1 leading-relaxed text-[var(--text-primary)]">{crux.settle}</dd>
            </div>
          ) : null}
          {crux.fight ? (
            <div>
              <dt className="label-caps">Why it is still open</dt>
              <dd className="mt-1 leading-relaxed text-[var(--text-primary)]">{crux.fight}</dd>
            </div>
          ) : null}
        </dl>
      )}
      {also ? (
        <div className="mt-2 border-t border-[var(--border-divider)] pt-4">
          <p className="label-caps">Or</p>
          <p className="mt-2 font-serif text-[1.1875rem] leading-[1.35] sm:text-[1.375rem]">
            <Link
              href={also.href}
              className="text-[var(--text-heading)] underline decoration-[var(--border-default)] underline-offset-4 hover:decoration-deep"
            >
              {also.question}
            </Link>
          </p>
        </div>
      ) : null}
    </div>
  );
}

/**
 * The matched map's siblings (maps on the same subject that scored close to
 * it), named once, right under its claim, so a reader whose argument is
 * really about the neighbouring map sees it on the first screen. Which one
 * the argument is really about is the reader's call.
 */
function RelatedLine({ related }: { related: readonly PasteMapCandidate[] }) {
  if (related.length === 0) return null;
  return (
    <p className="mt-4 font-sans text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
      Closely related:{" "}
      {/* Each link carries its own ";" in one box: the links are inline-flex,
          so a free-standing separator could wrap to the start of a line. */}
      {related.map((map, index) => (
        <Fragment key={map.id}>
          <span className="inline-flex items-center">
            <Link href={map.href} className={textActionClasses("text-[0.9375rem]")}>
              {map.title}
            </Link>
            {index < related.length - 1 ? ";" : null}
          </span>
          {index < related.length - 1 ? " " : null}
        </Fragment>
      ))}
    </p>
  );
}

export function MapMatch({
  match,
  related = [],
}: {
  match: PasteMapMatch;
  /** Maps on the same subject, from `PasteMapsResult.related`. */
  related?: readonly PasteMapCandidate[];
}) {
  // Supporting card first, then the challenge: a fixed order, not a ranking.
  const cards = [...match.cards].sort((a, b) => (a.side === b.side ? 0 : a.side === "for" ? -1 : 1));

  return (
    <section aria-labelledby="map-match-heading" className="scroll-mt-24">
      <p className="label-caps">On the map</p>
      <h2
        id="map-match-heading"
        tabIndex={-1}
        className="mt-2 font-serif text-[2rem] leading-[1.1] text-[var(--text-heading)] focus:outline-none sm:text-[2.5rem]"
      >
        This argument is already mapped
      </h2>
      <p className="mt-3 max-w-[36rem] font-sans text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
        Argumend has a map of it, with the best evidence on each side. Argumend does not say who is
        right.
      </p>

      <div className="mt-6 max-w-[40rem]">
        <Link
          href={match.href}
          className="font-serif text-[1.5rem] leading-snug text-[var(--text-heading)] underline decoration-[var(--border-default)] underline-offset-4 hover:decoration-deep sm:text-[1.75rem]"
        >
          {match.title}
        </Link>
        <p className="mt-2 font-serif text-lg italic leading-relaxed text-[var(--text-secondary)]">
          {match.claim}
        </p>
        <RelatedLine related={related} />
      </div>

      <CruxPanel match={match} />

      <div className="mt-6">
        <Button
          href={match.crux?.href ?? match.href}
          size="lg"
          onClick={() => trackEvent({ action: "cta_click", ctaName: "open_map_at_crux", location: "analyze" })}
        >
          {match.crux ? (match.alsoCrux ? "Open the map at the first crux" : "Open the map at this crux") : "Open the map"}
        </Button>
      </div>

      {cards.length > 0 ? (
        <div className="mt-10">
          <h3 className="label-caps">The strongest card on each side</h3>
          <p className="mt-1 max-w-[36rem] font-sans text-[0.9375rem] text-[var(--text-secondary)]">
            {match.cardsAbout === "map-question"
              ? "Yes and no answer the map’s question at the top, not the crux."
              : match.cardsAbout === "map-claim"
                ? "Each card is read against the map’s claim above."
                : "Each card is read against the claim behind this question."}
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
            {cards.map((card) => (
              <Card key={card.id} card={card} words={sideWordsFor(match)} />
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

/**
 * "No map, rather than the wrong map", and what the reader gets instead:
 * the closest maps when several on the text's subject competed, then three
 * questions to read the argument themselves (ReadItYourself). The guide is
 * left out when the diagnosis lane has already read the text above.
 */
export function MapNoMatch({
  maps,
  text = "",
  diagnosisOn = false,
  guide = true,
}: {
  maps: PasteMapsResult;
  /** The submitted paste, for the guide's word cues. */
  text?: string;
  diagnosisOn?: boolean;
  /** False when a diagnosis of the text is already on the page. */
  guide?: boolean;
}) {
  const closest = maps.status === "closest";
  return (
    <section aria-labelledby="map-match-heading" className="scroll-mt-24 space-y-8">
      <header className="space-y-3">
        <p className="label-caps">On the map</p>
        <h2
          id="map-match-heading"
          tabIndex={-1}
          className="font-serif text-[2rem] leading-[1.1] text-[var(--text-heading)] focus:outline-none sm:text-[2.5rem]"
        >
          No map, rather than the wrong map
        </h2>
        <p className="max-w-[36rem] font-serif text-xl leading-[1.5] text-[var(--text-secondary)]">
          {closest
            ? "None of Argumend’s maps stood out for this text, so none is named as its map."
            : // Not "none is about this": the lane matches words, and a map can
              // cover a text that words it differently (r9 live review #2).
              `No map stood out for this text among Argumend’s ${maps.reading.mapsSearched}, so none is named. One may still cover it in other words.`}
        </p>
      </header>
      <ClosestMaps
        title="Closest maps"
        level={3}
        lede="These share the most words with your text. One of them may still be what you are arguing about."
        maps={maps.closest}
      />
      {guide ? (
        <ReadItYourself text={text} diagnosisOn={diagnosisOn} />
      ) : (
        <TextAction href="/topics">Browse all maps</TextAction>
      )}
    </section>
  );
}
