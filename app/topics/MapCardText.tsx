import { CATEGORY_LABELS } from "@/data/topicIndex";
import { numberWord } from "@/lib/topicPage/model";
import type { LibraryEntry } from "./_query";

/**
 * What a library card says under the map's question: the question its first
 * crux asks, then a quiet line with how many questions the map turns on.
 * Shared by /topics and /saved so the two rows read the same.
 *
 * No evidence status and no counts of cards: how far the evidence has got is
 * read inside the map, next to the evidence, not on a shelf of maps.
 */
export function MapCardText({
  map,
  showCategory = false,
}: {
  map: LibraryEntry;
  /** Off under a category heading, which already names it. */
  showCategory?: boolean;
}) {
  const turnsOn =
    map.cruxCount !== undefined && map.cruxCount > 0
      ? `Turns on ${numberWord(map.cruxCount).toLowerCase()} ${map.cruxCount === 1 ? "question" : "questions"}`
      : null;
  const meta = [showCategory ? CATEGORY_LABELS[map.category] : null, turnsOn].filter(Boolean);

  return (
    <>
      {map.firstCrux ? (
        <p className="mt-1.5 line-clamp-3 font-serif text-[1.0625rem] italic leading-snug text-secondary dark:text-stone-400">
          {map.firstCrux}
        </p>
      ) : (
        <p className="mt-1.5 line-clamp-2 text-[0.9375rem] leading-relaxed text-secondary dark:text-stone-400">
          {map.summary}
        </p>
      )}
      {meta.length > 0 && (
        <p className="mt-2 text-[0.8125rem] text-muted">{meta.join(" · ")}</p>
      )}
    </>
  );
}
