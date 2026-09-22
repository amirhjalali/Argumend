import Link from "next/link";
import { consentCopy } from "@/lib/aiProviders";

/**
 * The disclosure that sits immediately above the submit button.
 *
 * It belongs at the point of the decision, not in a banner higher up the page
 * that a reader scrolled past before they had any text to send. The sentence
 * itself comes from `lib/aiProviders.ts` so the copy and the code path that
 * makes the request cannot name different companies.
 *
 * Pass `id` to the button's `aria-describedby` so a screen reader hears the
 * disclosure as part of the control rather than minutes earlier.
 *
 * MERGE NOTE: `jev/privacy-consent` adds `components/AiConsentLine.tsx` with
 * the same job and a different sentence. Reconcile them when those branches
 * meet; the map-reply sentence names TypeSafe AI directly and adds the
 * redaction clause, so it is a distinct surface, not a duplicate.
 */
export function MapReplyConsent({ id }: { id?: string }) {
  const copy = consentCopy("mapReply");

  return (
    <p
      id={id}
      role="note"
      aria-label="How your text is handled"
      className="max-w-prose text-sm leading-relaxed text-[var(--text-secondary)]"
    >
      {copy.sentence}{" "}
      <Link
        href={copy.policyPath}
        className="text-deep underline underline-offset-2 hover:text-deep-dark dark:text-deep-light dark:hover:text-stone-200"
      >
        {copy.policyLabel}
      </Link>
      .
    </p>
  );
}
