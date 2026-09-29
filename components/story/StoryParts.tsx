/**
 * The editorial pieces the story pages share (/about, /methodology, /faq):
 * a left-aligned page header, hairline-ruled sections and one quiet link
 * style. They follow the PageHeader / Section / TextAction contract proposed
 * in docs/reviews/2026-09-29-site-review (design system P1, P3, P4), so the
 * story pages can move onto `components/ui` without changing a word.
 * TODO(ux/shell-foundation): replace with components/ui once it lands.
 */
import Link from "next/link";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/Breadcrumbs";

/** Reading measure, one gutter, one vertical rhythm. */
export const STORY_CONTAINER = "mx-auto w-full max-w-[44rem] px-4 pb-16 pt-6 sm:px-6 sm:pt-10 lg:px-8";

/** The quiet action: teal, underlined, at least 44px tall. */
export const TEXT_ACTION =
  "inline-flex min-h-11 items-center font-sans text-sm font-medium text-deep underline decoration-deep/30 underline-offset-4 transition-colors hover:decoration-deep dark:text-accent-text dark:decoration-accent-text/40";

/** An inline link inside serif prose. */
export const PROSE_LINK =
  "text-deep underline decoration-deep/30 underline-offset-[3px] transition-colors hover:decoration-deep dark:text-accent-text dark:decoration-accent-text/40";

/** Long-form serif body copy. */
export const PROSE = "reading-body space-y-5 text-primary dark:text-stone-200";

export function StoryHeader({
  breadcrumbs,
  eyebrow,
  title,
  lede,
  children,
}: {
  breadcrumbs?: BreadcrumbItem[];
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header>
      {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
      {eyebrow ? <p className="label-caps">{eyebrow}</p> : null}
      <h1 className="mt-2 text-balance font-serif text-[2.375rem] font-normal leading-[1.06] tracking-[-0.015em] text-primary dark:text-stone-200 sm:text-[3rem]">
        {title}
      </h1>
      {lede ? (
        <p className="mt-5 max-w-[36rem] font-serif text-xl leading-[1.5] text-secondary dark:text-stone-400">
          {lede}
        </p>
      ) : null}
      {children}
    </header>
  );
}

export function StorySection({
  id,
  title,
  lede,
  children,
}: {
  id: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="mt-12 scroll-mt-20 border-t border-divider pt-8 sm:mt-16"
    >
      <h2
        id={`${id}-heading`}
        className="text-balance font-serif text-[1.75rem] leading-[1.15] text-primary dark:text-stone-200 sm:text-[2rem]"
      >
        {title}
      </h2>
      {lede ? (
        <p className="mt-2 max-w-[36rem] font-sans text-[0.9375rem] leading-relaxed text-secondary dark:text-stone-400">
          {lede}
        </p>
      ) : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

/** "On this page": the anchored sections as plain links, 44px each. */
export function OnThisPage({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav aria-label="On this page" className="mt-8">
      <p className="label-caps">On this page</p>
      <ul className="mt-1 flex flex-wrap gap-x-5">
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`#${item.id}`} className={TEXT_ACTION}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** A hairline-ruled list of titled entries (not cards). */
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
