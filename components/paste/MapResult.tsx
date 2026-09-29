import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ClosestMaps } from "@/components/mapReply/ClosestMaps";
import { TextAction, textActionClasses } from "@/components/ui";
import type {
  PasteMapCandidate,
  PasteMapCard,
  PasteMapMatch,
  PasteMapsResult,
} from "@/lib/paste/types";

/**
 * "This argument is already mapped": the part of a paste result that takes
 * the reader to the map.
 *
 * Everything shown is copied from the map itself: its title and claim, the
 * question its crux asks with what would change each side's mind, and the
 * strongest card on each side. The cards carry no weight score here. Two
 * scores side by side read as a side ahead on points, and the map page is
 * where a reader can see what a weight weighs.
 */

const SIDE_LABEL: Record<PasteMapCard["side"], string> = {
  for: "Supports it",
  against: "Cuts against it",
};

const SIDE_TEXT: Record<PasteMapCard["side"], string> = {
  for: "text-rust-700 dark:text-rust-500",
  against: "text-skeptic dark:text-skeptic-light",
};

function Card({ card }: { card: PasteMapCard }) {
  return (
    <li className="flex flex-col border-t-2 border-[var(--border-divider)] pt-4">
      <p className={`font-sans text-sm font-medium ${SIDE_TEXT[card.side]}`}>{SIDE_LABEL[card.side]}</p>
      <h4 className="mt-2 font-serif text-[1.25rem] leading-snug text-[var(--text-heading)]">
        {card.title}
      </h4>
      <p className="mt-2 font-sans text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
        {card.description}
      </p>
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

  return (
    <div className="mt-8 rounded-md border border-[var(--border-divider)] border-t-[3px] border-t-crux bg-[var(--bg-paper)] px-5 pb-6 pt-5 dark:border-t-crux-light sm:px-8 sm:pb-8 sm:pt-6">
      <h3 className="label-caps text-crux dark:text-crux-text">What the map says it turns on</h3>
      <p className="mt-3 font-serif text-[1.3125rem] leading-[1.3] text-[var(--text-heading)] sm:text-[1.625rem]">
        {crux.question}
      </p>
      {flips ? (
        <dl className="mt-6 divide-y divide-[var(--border-divider)] border-t border-[var(--border-divider)]">
          <div className="py-4">
            <dt className="label-caps !text-rust-700 dark:!text-[#d4805f]">
              What would change a supporter&rsquo;s mind
            </dt>
            <dd className="mt-1 font-serif text-[1.125rem] leading-relaxed text-[var(--text-primary)]">
              {crux.supporterFlip}
            </dd>
          </div>
          <div className="pt-4">
            <dt className="label-caps !text-skeptic dark:!text-[#cfa88a]">
              What would change a skeptic&rsquo;s mind
            </dt>
            <dd className="mt-1 font-serif text-[1.125rem] leading-relaxed text-[var(--text-primary)]">
              {crux.skepticFlip}
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
    </div>
  );
}

/**
 * A pointer to the matched map's siblings, right under its claim, so a reader
 * whose argument is really about the neighbouring map sees it on the first
 * screen. The full entries follow the next step (`RelatedMaps`).
 */
function RelatedLine({ related }: { related: readonly PasteMapCandidate[] }) {
  if (related.length === 0) return null;
  return (
    <p className="mt-4 font-sans text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
      Closely related:{" "}
      {related.map((map, index) => (
        <span key={map.id}>
          {index > 0 ? "; " : null}
          <Link href={map.href} className={textActionClasses("text-[0.9375rem]")}>
            {map.title}
          </Link>
        </span>
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

      {cards.length > 0 ? (
        <div className="mt-10">
          <h3 className="label-caps">The strongest card on each side</h3>
          <p className="mt-1 max-w-[36rem] font-sans text-[0.9375rem] text-[var(--text-secondary)]">
            {match.cardsAbout === "map-claim"
              ? "Each card is read against the map’s claim above."
              : "Each card is read against the claim behind this question."}
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
            {cards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

/**
 * The matched map's siblings: maps on the same subject that scored close to
 * it. Shown after the next step, above any other closest maps, because a
 * paste that fits one sibling often fits the other, and which one the
 * argument is really about is the reader's call.
 */
export function RelatedMaps({ maps }: { maps: readonly PasteMapCandidate[] }) {
  return (
    <ClosestMaps
      title="Closely related"
      level={2}
      lede={
        maps.length === 1
          ? "Argumend also maps a neighbouring question on the same subject. If your argument is more about this one, start here."
          : "Argumend also maps neighbouring questions on the same subject. If your argument is more about one of these, start there."
      }
      maps={maps}
    />
  );
}

export function MapNoMatch({ maps }: { maps: PasteMapsResult }) {
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
          {closest ? "No map, rather than the wrong map" : "No map on the site came close"}
        </h2>
        <p className="max-w-[36rem] font-serif text-xl leading-[1.5] text-[var(--text-secondary)]">
          {closest
            ? "None of Argumend’s maps stood out for this text, so none is named as its map."
            : `Nothing here overlaps enough with any of Argumend’s ${maps.reading.mapsSearched} maps. It may be an argument nobody has mapped yet.`}
        </p>
      </header>
      <ClosestMaps
        title="Closest maps"
        level={3}
        lede="These share the most words with your text. One of them may still be what you are arguing about."
        maps={maps.closest}
      />
      <TextAction href="/topics">Browse every map</TextAction>
    </section>
  );
}
