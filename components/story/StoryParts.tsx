/**
 * The two pieces the story pages (/about, /methodology) share that the
 * site-wide primitives in components/ui do not cover: the "On this page"
 * anchor list and a hairline-ruled list of titled entries. Headers,
 * sections, containers and actions come from components/ui.
 */
import { TextAction } from "@/components/ui";

/** An inline link inside serif prose. */
export const PROSE_LINK =
  "text-deep underline decoration-deep/30 underline-offset-[3px] transition-colors hover:decoration-deep dark:text-accent-text dark:decoration-accent-text/40";

/** Long-form serif body copy (`.reading-body`, globals.css). */
export const PROSE = "reading-body space-y-5 text-primary dark:text-stone-200";

/** Space between the story pages' sections; anchors land below the sticky header. */
export const STORY_SECTION = "mt-12 scroll-mt-20 sm:mt-16";

/** "On this page": the anchored sections as plain links, 44px each. */
export function OnThisPage({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav aria-label="On this page">
      <p className="label-caps">On this page</p>
      <ul className="mt-1 flex flex-wrap gap-x-5">
        {items.map((item) => (
          <li key={item.id}>
            <TextAction href={`#${item.id}`}>{item.label}</TextAction>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** A hairline-ruled list of titled entries (rows, not cards). */
export function RuledList({
  items,
  numbered = false,
}: {
  items: { key: string; title: React.ReactNode; body: React.ReactNode }[];
  numbered?: boolean;
}) {
  const List = numbered ? "ol" : "ul";
  return (
    <List className="divide-y divide-divider border-y border-divider">
      {items.map((item, index) => (
        <li
          key={item.key}
          className={numbered ? "grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-2 py-5" : "py-5"}
        >
          {numbered ? (
            <span aria-hidden="true" className="pt-0.5 font-serif text-[1.125rem] tabular-nums text-muted dark:text-stone-400">
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : null}
          <div className="min-w-0">
            <h3 className="font-serif text-[1.25rem] leading-snug text-primary dark:text-stone-200">
              {item.title}
            </h3>
            <div className="mt-1.5 font-serif text-[1.0625rem] leading-[1.6] text-secondary dark:text-stone-400">
              {item.body}
            </div>
          </div>
        </li>
      ))}
    </List>
  );
}
