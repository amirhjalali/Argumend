import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { AppShell } from "@/components/AppShell";
import { Chip } from "@/components/ui/Chip";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { cx } from "@/components/ui/cx";
import type { Crumb } from "@/lib/learn/sections";

/** An index shows at most this many chips under its header. */
export const MAX_CHIPS = 6;

/** Above this many items an index paginates. */
export const COLLECTION_PAGE_SIZE = 24;

export interface CollectionItem {
  href: string;
  title: string;
  /** One line; clamped to two on phones. */
  description?: string;
  /** Read time, kind, count: small and muted. */
  meta?: string;
  /** The blog index only. */
  image?: { src: string; alt: string; width: number; height: number };
}

export interface CollectionGroup {
  /** Anchor for the group's section; chips jump here. */
  id?: string;
  title?: string;
  lede?: ReactNode;
  aside?: ReactNode;
  items: readonly CollectionItem[];
  /** A trailing "All …" link under the rows. */
  more?: { href: string; label: string };
  /** Anything else the group needs under its rows. */
  children?: ReactNode;
}

export interface CollectionChip {
  href: string;
  label: string;
  count?: number;
  current?: boolean;
}

interface CollectionIndexProps {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  lede?: ReactNode;
  meta?: ReactNode;
  chips?: readonly CollectionChip[];
  chipsLabel?: string;
  /** Between the header and the first group: a search field, a notice. */
  intro?: ReactNode;
  groups: readonly CollectionGroup[];
  /** After the groups: pagination, a legend. */
  children?: ReactNode;
  /** Rendered first inside the shell: JSON-LD. */
  chrome?: ReactNode;
}

/**
 * The one index template for the Learn library: the /learn hub, /blog,
 * /fallacies and /questions.
 *
 * The same header as an article, at most six neutral chips (the current one
 * teal), then groups of compact hairline rows: a title, one line of
 * description, a muted meta line, 44px tall at least. No cards, no icon
 * circles, no catalogue numbers; images only where a page passes them (the
 * blog). Content starts on a phone's first screen.
 */
export function CollectionIndex({
  crumbs,
  eyebrow,
  title,
  lede,
  meta,
  chips = [],
  chipsLabel = "Sections",
  intro,
  groups,
  children,
  chrome,
}: CollectionIndexProps) {
  const shownChips = chips.slice(0, MAX_CHIPS);
  return (
    <AppShell>
      {chrome}
      <PageContainer>
        <PageHeader breadcrumbs={crumbs} eyebrow={eyebrow} title={title} lede={lede} meta={meta}>
          {shownChips.length > 0 ? (
            <nav aria-label={chipsLabel}>
              <ul className="flex flex-wrap gap-2">
                {shownChips.map((chip) => (
                  <li key={chip.href}>
                    <Chip
                      href={chip.href}
                      current={chip.current}
                      tone={chip.current ? "teal" : "neutral"}
                      className={cx("px-3.5 text-[0.8125rem]", chip.current ? "ring-1 ring-deep/30" : null)}
                    >
                      <span>{chip.label}</span>
                      {/* Lighter weight, not opacity: a 70% count was 2.9–4.1:1
                          on the chip tints (axe color-contrast). The space keeps
                          the link's name "Science 31", not "Science31". */}
                      {chip.count !== undefined ? (
                        <>
                          {" "}
                          <span className="tabular-nums font-normal">{chip.count}</span>
                        </>
                      ) : null}
                    </Chip>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </PageHeader>

        {intro}

        <div className="space-y-14">
          {groups.map((group, index) =>
            group.title ? (
              <Section
                key={group.id ?? group.title}
                id={group.id}
                title={group.title}
                lede={group.lede}
                aside={group.aside}
              >
                <CollectionRows items={group.items} />
                {group.more ? <MoreLink {...group.more} /> : null}
                {group.children}
              </Section>
            ) : (
              <div key={group.id ?? index} id={group.id}>
                <CollectionRows items={group.items} bordered />
                {group.more ? <MoreLink {...group.more} /> : null}
                {group.children}
              </div>
            ),
          )}
        </div>

        {children}
      </PageContainer>
    </AppShell>
  );
}

function MoreLink({ href, label }: { href: string; label: string }) {
  return (
    <p className="mt-2">
      <Link
        href={href}
        className="inline-flex min-h-11 items-center gap-1 rounded-sm font-sans text-sm text-deep underline underline-offset-2 transition-colors hover:text-deep-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus dark:text-accent-text dark:hover:text-stone-200"
      >
        {label}
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </p>
  );
}

/**
 * Compact hairline rows, one column on phones and two from `sm`. Exported for
 * pages that need rows outside a group (search results, a hub aside).
 */
export function CollectionRows({
  items,
  bordered = false,
}: {
  items: readonly CollectionItem[];
  /** Draw a top hairline too (for rows that do not sit under a Section). */
  bordered?: boolean;
}) {
  return (
    <ul className={cx("grid gap-x-10 sm:grid-cols-2", bordered ? "border-t border-divider" : null)}>
      {items.map((item) => (
        <li key={item.href} className="border-b border-divider">
          <Link
            href={item.href}
            className="group flex min-h-11 items-start gap-4 rounded-sm py-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            <span className="min-w-0 flex-1">
              <span className="block font-serif text-lg leading-snug text-primary transition-colors group-hover:text-accent-text">
                {item.title}
              </span>
              {item.description ? (
                <span className="mt-1 line-clamp-2 font-sans text-sm leading-relaxed text-secondary">
                  {item.description}
                </span>
              ) : null}
              {item.meta ? (
                <span className="mt-1 block font-sans text-xs text-muted">{item.meta}</span>
              ) : null}
            </span>
            {item.image ? (
              <span className="relative mt-1 aspect-[16/9] w-24 shrink-0 overflow-hidden rounded-md border border-divider bg-subtle sm:w-32">
                <Image
                  src={item.image.src}
                  alt=""
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </span>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}
