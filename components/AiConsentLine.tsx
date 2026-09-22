import Link from "next/link";
import {
  buildConsentLine,
  DIAGNOSIS_PROVIDER_IDS,
  type AiProviderId,
  type ConsentLine,
} from "@/lib/aiProviders";

/**
 * The disclosure that sits immediately above a submit button which sends a
 * visitor's text to an AI provider.
 *
 * It is one line, at the point of the decision, rather than a banner further
 * up the page: the moment that matters is the click. The sentence itself comes
 * from `buildConsentLine`, split around the linked phrase, so the rendered
 * text and the string the tests assert on cannot drift apart.
 *
 * Pass the same `id` to the button's `aria-describedby` so the disclosure is
 * announced with the button rather than being read minutes earlier and
 * forgotten.
 *
 * A surface whose sentence genuinely differs passes its own built line
 * instead of a roster: `/reply` does, because the map-reply lane scrubs
 * identifiers before sending and says so, which the analyze lanes cannot
 * truthfully claim. The markup is the same either way, so there is one place
 * where a consent line is rendered.
 */
export function AiConsentLine({
  id,
  providerIds = DIAGNOSIS_PROVIDER_IDS,
  consent,
  className = "",
}: {
  id?: string;
  providerIds?: readonly AiProviderId[];
  /** Overrides `providerIds`; see `buildMapReplyConsentLine`. */
  consent?: ConsentLine;
  className?: string;
}) {
  const line = consent ?? buildConsentLine(providerIds);

  return (
    <p
      id={id}
      role="note"
      aria-label="How your text is handled"
      className={`text-sm leading-relaxed text-[var(--text-secondary)] ${className}`.trim()}
    >
      {line.before}
      <Link
        href="/privacy"
        className="text-deep underline underline-offset-2 hover:text-deep-dark dark:text-deep-light dark:hover:text-stone-200"
      >
        {line.linkText}
      </Link>
      {line.after}
    </p>
  );
}
