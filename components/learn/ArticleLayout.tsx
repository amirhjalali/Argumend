import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { TableOfContents, type TocHeading } from "@/components/TableOfContents";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { cx } from "@/components/ui/cx";
import { ANALYZE_HREF } from "@/lib/nav";
import { ARTICLE_KINDS, articleCrumbs, type ArticleKind } from "@/lib/learn/sections";
import type { MapLink } from "@/lib/learn/nextStep";

/** A table of contents appears only on pages with more than this many H2s. */
export const TOC_MIN_H2 = 5;

/** At most this many related items close a page. */
export const MAX_RELATED = 3;

export interface RelatedItem {
  href: string;
  title: string;
  /** The item's kind, shown above its title: "Guide", "Essay", "Map". */
  kind: string;
  description?: string;
}

interface ArticleLayoutProps {
  kind: ArticleKind;
  title: string;
  /** One sentence under the title. */
  lede?: ReactNode;
  /** Read time and, when the data has one, a month and year. */
  meta?: ReactNode;
  /** The page's H2/H3 anchors; a contents list shows only when there are more than four H2s. */
  headings?: readonly TocHeading[];
  /** Essays and guides only: never on idea, fallacy or question pages. */
  hero?: ReactNode;
  /** The page body. Wrap prose in `.prose-custom`. */
  children: ReactNode;
  takeaways?: readonly string[];
  /** The one map this page points to next. */
  nextMap: MapLink;
  /** The label over that map's title. */
  nextMapLabel?: string;
  related?: readonly RelatedItem[];
  /** Rendered first inside the shell: JSON-LD, a reading-progress bar. */
  chrome?: ReactNode;
}

/**
 * The one article template for the Learn library: essays, guides, ideas,
 * fallacies and questions.
 *
 * Header (crumbs Home › Learn › Section › Title, an eyebrow naming the kind,
 * a regular-weight serif title, one sentence, a meta line), a serif body in
 * the 44rem reading column, and at the end exactly two things: the next step
 * (one map and the paste tool) and up to three related pages. The newsletter
 * lives in the footer; there are no catalogue numbers, icon circles or
 * category colours here.
 */
export function ArticleLayout({
  kind,
  title,
  lede,
  meta,
  headings = [],
  hero,
  children,
  takeaways,
  nextMap,
  nextMapLabel = "Read the map",
  related = [],
  chrome,
}: ArticleLayoutProps) {
  const h2Count = headings.filter((heading) => heading.level === 2).length;
  const showToc = h2Count >= TOC_MIN_H2;

  return (
    <AppShell layout="reading">
      {chrome}
      <PageContainer width="reading" as="article">
        <PageHeader
          breadcrumbs={articleCrumbs(kind, title)}
          eyebrow={ARTICLE_KINDS[kind].eyebrow}
          title={title}
          lede={lede}
          meta={meta}
        />

        {hero ? <div className="mb-10">{hero}</div> : null}

        <div className="relative">
          {showToc ? <TableOfContents headings={headings} label="On this page" /> : null}
          {children}
        </div>

        {takeaways && takeaways.length > 0 ? <KeyTakeaways items={takeaways} /> : null}

        <NextStep map={nextMap} label={nextMapLabel} />

        {related.length > 0 ? <RelatedReading items={related.slice(0, MAX_RELATED)} /> : null}
      </PageContainer>
    </AppShell>
  );
}

export function KeyTakeaways({ items }: { items: readonly string[] }) {
  return (
    <aside aria-labelledby="key-takeaways" className="surface-card mt-12 px-5 py-5 sm:px-6">
      <h2 id="key-takeaways" className="label-caps">
        Key takeaways
      </h2>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="relative pl-5 font-serif text-lg leading-snug text-primary before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-deep/60 dark:before:bg-accent-text/60"
          >
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}

const ROW_LINK =
  "group flex min-h-11 items-center justify-between gap-4 py-4 transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep/40 rounded-sm";

/** One map, then the paste tool. The only call to action on an article. */
export function NextStep({ map, label }: { map: MapLink; label: string }) {
  return (
    <Section id="next-step" title="Next step" className="mt-16">
      <ul className="border-b border-divider">
        <li>
          <Link href={map.href} className={ROW_LINK}>
            <span className="min-w-0">
              <span className="label-caps block">{label}</span>
              <span className="mt-1 block font-serif text-xl leading-snug text-primary transition-colors group-hover:text-accent-text">
                {map.title}
              </span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </li>
        <li className="border-t border-divider">
          <Link href={ANALYZE_HREF} className={ROW_LINK}>
            <span className="min-w-0">
              <span className="label-caps block">Or bring your own</span>
              <span className="mt-1 block font-serif text-xl leading-snug text-primary transition-colors group-hover:text-accent-text">
                Try it on an argument you&rsquo;re in
              </span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </li>
      </ul>
    </Section>
  );
}

export function RelatedReading({
  items,
  title = "Related reading",
  className,
}: {
  items: readonly RelatedItem[];
  title?: string;
  className?: string;
}) {
  return (
    <Section id="related" title={title} className={cx("mt-12", className)}>
      <ul className="border-b border-divider">
        {items.map((item, index) => (
          <li key={item.href} className={index > 0 ? "border-t border-divider" : undefined}>
            <Link href={item.href} className={ROW_LINK}>
              <span className="min-w-0">
                <span className="label-caps block">{item.kind}</span>
                <span className="mt-1 block font-serif text-lg leading-snug text-primary transition-colors group-hover:text-accent-text">
                  {item.title}
                </span>
                {item.description ? (
                  <span className="mt-1 line-clamp-2 block font-sans text-sm leading-relaxed text-secondary">
                    {item.description}
                  </span>
                ) : null}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
