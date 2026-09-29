import Link from "next/link";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { PAGE_GUTTER } from "@/components/ui/PageContainer";
import { cx } from "@/components/ui/cx";
import { footerColumns, legalLinks, type NavLink } from "@/lib/nav";

const FOOTER_LINK =
  "inline-flex min-h-11 items-center rounded-md text-sm text-secondary dark:text-stone-400 transition-colors duration-200 hover:text-deep dark:hover:text-accent-text";

function FooterLink({ link }: { link: NavLink }) {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={FOOTER_LINK}>
        {link.label}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={link.href} prefetch={false} className={FOOTER_LINK}>
      {link.label}
    </Link>
  );
}

/**
 * The site footer: the one newsletter signup on every page, the primary
 * destinations again ("Argumend"), the Learn sections ("Learn"), the
 * secondary ones ("More"), and the legal
 * line. Columns come from lib/nav.ts.
 *
 * Its content column is the default page width (PageContainer's max-w-5xl
 * and gutter), so its left edge is the h1's on every hub page. Phones get
 * the three columns side by side, as from `sm` up, instead of two columns
 * and a third row: the footer is only as tall as its longest column, and
 * every link keeps its 44px target. A long label wraps inside its column.
 */
export function Footer() {
  return (
    <footer className="bg-canvas border-t border-stone-300/70 dark:border-divider" role="contentinfo">
      <div className={cx("mx-auto max-w-5xl py-10 sm:py-12 md:py-16", PAGE_GUTTER)}>
        <div className="grid gap-8 sm:gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:gap-12">
          <div>
            <Link href="/" prefetch={false} className="inline-flex min-h-11 items-center rounded-md">
              <span className="font-serif text-2xl text-primary dark:text-stone-200">
                Argumend
              </span>
            </Link>
            <p className="mt-1 max-w-sm font-serif text-lg leading-snug text-secondary dark:text-stone-400">
              Disagree better. Maps of hard questions, built around what
              would change a mind, never around who won.
            </p>

            <nav aria-label="Footer navigation" className="mt-6 grid max-w-xl grid-cols-3 gap-x-4 gap-y-6 sm:mt-8 sm:gap-x-8 md:grid-cols-2 lg:grid-cols-3">
              {footerColumns.map((column) => {
                const headingId = `footer-${column.title.toLowerCase()}`;
                return (
                  <div key={column.title}>
                    <p id={headingId} className="label-caps">
                      {column.title}
                    </p>
                    <ul aria-labelledby={headingId} className="mt-1">
                      {column.links.map((link) => (
                        <li key={link.href}>
                          <FooterLink link={link} />
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </nav>
          </div>
          {/* The signup card brings its own heading. The only signup on a page. */}
          <div className="md:justify-self-end md:w-full">
            <NewsletterSignup variant="compact" source="footer" />
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-stone-300/70 pt-3 dark:border-divider sm:mt-10 sm:pt-4">
          <p className="text-xs text-muted">&copy; 2026 Argumend</p>
          {/* Legal links belong on every page, not in a discovery column. */}
          <nav aria-label="Legal" className="flex items-center gap-x-5">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className="inline-flex min-h-11 items-center rounded-md text-xs text-muted transition-colors duration-200 hover:text-deep dark:hover:text-accent-text"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
