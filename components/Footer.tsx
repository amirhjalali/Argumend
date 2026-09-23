import Link from "next/link";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { footerColumns, legalLinks } from "@/lib/nav";

export function Footer() {
  // The curated columns (lib/nav.ts) hold one or two links each, so as
  // columns they read as empty scaffolding ("Explore" above "Explore"). One
  // row of links says the same thing without the headings.
  const footerLinks = footerColumns.flatMap((column) => column.links);

  return (
    <footer className="bg-canvas border-t border-stone-300/70 px-4 dark:border-divider md:px-8" role="contentinfo">
      <div className="mx-auto max-w-5xl py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:gap-12">
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

            <nav aria-label="Footer navigation" className="mt-6">
              <ul className="flex flex-wrap gap-x-6">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      prefetch={false}
                      className="inline-flex min-h-11 items-center rounded-md text-sm text-secondary dark:text-stone-400 transition-colors duration-200 hover:text-deep dark:hover:text-[#8bb5b1]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          {/* The signup card brings its own heading. */}
          <div className="md:justify-self-end md:w-full">
            <NewsletterSignup variant="compact" source="footer" />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-stone-300/70 dark:border-divider pt-4">
          <div className="flex flex-wrap items-center gap-x-5">
            <p className="text-xs text-muted">
              &copy; 2026 Argumend. Built with stubbornness and peer review.
            </p>
            {/* Legal links belong on every page, not in a discovery column. */}
            <nav aria-label="Legal" className="flex items-center gap-x-5">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={false}
                  className="inline-flex min-h-11 items-center rounded-md text-xs text-muted transition-colors duration-200 hover:text-deep dark:hover:text-[#8bb5b1]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <a
            href="https://github.com/amirhjalali/Argumend"
            target="_blank"
            rel="noopener noreferrer"
            className="-ml-3 flex h-11 w-11 shrink-0 items-center sm:-mr-3 sm:ml-0 justify-center rounded-lg text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-800 dark:hover:bg-[var(--bg-muted)] dark:hover:text-stone-200"
            aria-label="Argumend on GitHub"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
