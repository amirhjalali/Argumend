/**
 * The draft banner that sits at the top of /privacy and /terms.
 *
 * These pages were written from the source code, not by a lawyer, and they
 * ship before that review so the site is not silently sending pasted text to
 * a third party with no published policy at all. The banner says so plainly
 * rather than letting a visitor assume a reviewed document.
 */
export function LegalDraftNotice({
  document: documentName,
  lastUpdated,
}: {
  /** "privacy policy" / "terms" — read inside the sentence. */
  document: string;
  /** Human-readable revision date, e.g. "21 September 2026". */
  lastUpdated: string;
}) {
  return (
    <aside
      role="note"
      aria-label="Draft status"
      className="mb-10 rounded-xl border border-l-4 border-rust-200 border-l-rust-500 bg-rust-50/70 px-4 py-3 dark:border-[var(--border-default)] dark:border-l-rust-500 dark:bg-[var(--bg-card)]"
    >
      <p className="text-sm font-semibold text-primary dark:text-stone-200">
        Draft — pending legal review
      </p>
      <p className="mt-1 text-sm leading-relaxed text-secondary dark:text-stone-400">
        This {documentName} was written from Argumend&rsquo;s source code on {lastUpdated} and has
        not been reviewed by a lawyer. Passages in [square brackets] are unresolved. It is published
        in draft because describing how the site handles your text is better than describing
        nothing, but do not read it as a finished legal document.
      </p>
    </aside>
  );
}
