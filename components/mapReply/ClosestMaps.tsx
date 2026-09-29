import Link from "next/link";

export interface ClosestMapItem {
  id: string;
  title: string;
  /** The map's one-sentence claim. */
  claim: string;
  href?: string;
}

/**
 * A short list of maps a paste came close to, each a link to the map.
 *
 * Shared by the map-reply "no map" answer and the paste flow at /analyze, so
 * the site offers "closest maps" one way wherever it offers them. Headings are
 * the caller's: a no-match answer says "Closest maps", a matched one "Closest
 * other maps".
 */
export function ClosestMaps({
  maps,
  title,
  lede,
  headingLevel: Heading = "h3",
}: {
  maps: readonly ClosestMapItem[];
  title: string;
  lede?: string;
  headingLevel?: "h2" | "h3";
}) {
  if (maps.length === 0) return null;
  return (
    <section className="space-y-4 border-t border-[var(--border-divider)] pt-8">
      <Heading className="font-serif text-[1.75rem] leading-tight text-[var(--text-heading)] sm:text-[2rem]">
        {title}
      </Heading>
      {lede ? (
        <p className="max-w-[36rem] font-sans text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
          {lede}
        </p>
      ) : null}
      <ul className="divide-y divide-[var(--border-divider)] border-y border-[var(--border-divider)]">
        {maps.map((map) => (
          <li key={map.id}>
            <Link href={map.href ?? `/topics/${map.id}`} className="group block py-4">
              <span className="font-serif text-[1.25rem] leading-snug text-[var(--text-heading)] underline decoration-[var(--border-default)] underline-offset-4 group-hover:decoration-deep">
                {map.title}
              </span>
              <span className="mt-1 block font-sans text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
                {map.claim}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
