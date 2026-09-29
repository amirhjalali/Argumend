import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";

/**
 * /analysis/[id]: links to the retired analyzer's saved results.
 *
 * The old analyzer saved every paste's extraction and scored the two sides
 * against each other ("7/10 strong" against "3/10 weak", plus a judge panel).
 * Argumend no longer names a stronger side, so those pages are not rendered,
 * not even from rows that still exist. This page answers an old shared link
 * without reading the database: it says what happened and where the paste
 * tool is now.
 */

export const metadata: Metadata = {
  title: "This older analysis format is retired",
  robots: { index: false, follow: true },
};

export default function RetiredAnalysisPage() {
  return (
    <AppShell layout="reading">
      <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
        <p className="label-caps">Saved analysis</p>
        <h1 className="mt-2 font-serif text-[2.375rem] leading-[1.1] text-[var(--text-heading)] sm:text-5xl">
          This older analysis format is retired
        </h1>
        <p className="mt-5 max-w-[36rem] font-serif text-xl leading-[1.5] text-[var(--text-secondary)]">
          It scored the two sides of an argument against each other. Argumend no longer does that:
          it shows what an argument turns on and the strongest evidence on each side, and it never
          says who is right.
        </p>
        <p className="mt-4 max-w-[36rem] font-sans text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
          If you still have the text, paste it again to see which map it is on.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link
            href="/analyze"
            className="inline-flex min-h-11 items-center rounded-full bg-rust-600 px-6 font-sans text-base font-medium text-white transition-colors hover:bg-rust-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust-600/40 focus-visible:ring-offset-2"
          >
            Paste an argument
          </Link>
          <Link
            href="/topics"
            className="inline-flex min-h-11 items-center font-sans text-sm text-deep underline underline-offset-2 hover:text-deep-dark dark:text-accent-text dark:hover:text-stone-200"
          >
            Browse the maps
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
