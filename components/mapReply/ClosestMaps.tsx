import Link from "next/link";
import { Section } from "@/components/ui";

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
  level = 3,
}: {
  maps: readonly ClosestMapItem[];
  title: string;
  lede?: string;
  level?: 2 | 3;
}) {
  if (maps.length === 0) return null;
  return (
    <Section title={title} lede={lede} level={level}>
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
    </Section>
  );
}
