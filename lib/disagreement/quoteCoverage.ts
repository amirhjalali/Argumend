import type { GroundingRef, RawGroundingQuote } from "@/types/disagreement";

function inputKey(quote: RawGroundingQuote): string {
  return JSON.stringify([quote.quote, quote.participantId ?? null]);
}

/** Count one object's support without changing its displayed quote references. */
export function countQuoteCoverage(quotes: RawGroundingQuote[], refs: GroundingRef[]): {
  expected: number;
  grounded: number;
  dropped: number;
} {
  const matchedInputs = new Set(refs.map(inputKey));
  const groundedSpans = new Set(refs.map((ref) => JSON.stringify([ref.start, ref.end, ref.participantId ?? null])));
  const unmatchedInputs = new Set(quotes.filter((quote) => !matchedInputs.has(inputKey(quote))).map(inputKey));
  return {
    expected: groundedSpans.size + unmatchedInputs.size,
    grounded: groundedSpans.size,
    dropped: unmatchedInputs.size,
  };
}
