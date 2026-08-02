import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

interface RouteNotFoundProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
}

/** Accessible route-family fallback for dynamic pages that call `notFound()`. */
export function RouteNotFound({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
}: RouteNotFoundProps) {
  return (
    <main
      id="main-content"
      className="flex min-h-[100svh] items-center justify-center bg-[#f4f1eb] px-4 py-12 text-center dark:bg-[var(--bg-canvas)]"
    >
      <section
        aria-labelledby="route-not-found-title"
        className="w-full max-w-lg rounded-2xl border border-stone-200/70 bg-[#faf8f5] px-5 py-10 shadow-sm sm:px-10 dark:border-[var(--border-default)] dark:bg-[var(--bg-card)]"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted dark:text-stone-400">
          {eyebrow}
        </p>
        <h1
          id="route-not-found-title"
          className="mt-3 font-serif text-3xl leading-tight text-primary dark:text-stone-200 sm:text-4xl"
        >
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-secondary dark:text-stone-400 sm:text-base">
          {description}
        </p>

        <nav
          aria-label="Not found navigation"
          className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
        >
          <Link
            href={primaryHref}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rust-500 to-rust-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:from-rust-600 hover:to-rust-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[var(--bg-card)]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {primaryLabel}
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-primary dark:text-stone-200 transition-colors hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep focus-visible:ring-offset-2 sm:w-auto dark:border-[var(--border-default)] dark:bg-[var(--bg-overlay)] dark:hover:bg-[#34312d] dark:focus-visible:ring-offset-[var(--bg-card)]"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Back to Home
          </Link>
        </nav>
      </section>
    </main>
  );
}
