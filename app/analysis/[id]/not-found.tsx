import Link from "next/link";
import { FileQuestion, PenLine } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export default function AnalysisNotFound() {
  return (
    <AppShell>
      <div className="flex min-h-[70svh] items-center justify-center bg-[#f4f1eb] px-4 py-12 text-center dark:bg-[var(--bg-canvas)]">
        <section aria-labelledby="analysis-not-found-title" className="w-full max-w-lg">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-stone-200/60 text-stone-600 dark:bg-[var(--bg-overlay)] dark:text-stone-300">
            <FileQuestion className="h-7 w-7" aria-hidden="true" />
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted dark:text-stone-400">
            Analysis unavailable
          </p>
        <h1 id="analysis-not-found-title" className="font-serif text-3xl text-primary dark:text-stone-200 sm:text-4xl">
            We could not find this saved analysis
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-secondary dark:text-stone-400 sm:text-base">
            The link may be incomplete, the analysis may no longer be stored, or this site may be running in on-device-only mode.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/analyze"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rust-500 to-rust-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:from-rust-600 hover:to-rust-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[var(--bg-canvas)]"
            >
              <PenLine className="h-4 w-4" aria-hidden="true" />
              Start a New Analysis
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-primary dark:text-stone-200 transition-colors hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep focus-visible:ring-offset-2 dark:border-[var(--border-default)] dark:bg-[var(--bg-card)] dark:hover:bg-[var(--bg-overlay)] dark:focus-visible:ring-offset-[var(--bg-canvas)]"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
