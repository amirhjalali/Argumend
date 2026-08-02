export default function EmbedNotFound() {
  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-64 w-full max-w-[600px] items-center justify-center px-4 py-8 text-center"
    >
      <section aria-labelledby="embed-not-found-title" className="rounded-xl border border-stone-200/70 bg-white/70 p-6 dark:border-[var(--border-default)] dark:bg-[var(--bg-card)]">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted dark:text-stone-400">
          Preview unavailable
        </p>
        <h1 id="embed-not-found-title" className="mt-2 font-serif text-xl text-primary dark:text-stone-100">
          This argument map could not be found
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-secondary dark:text-stone-400">
          Check the embed link or visit Argumend to explore another map.
        </p>
        <a
          href="https://argumend.org"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-rust-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rust-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[var(--bg-card)]"
        >
          Open Argumend
        </a>
      </section>
    </main>
  );
}
