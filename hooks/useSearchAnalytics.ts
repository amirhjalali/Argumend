"use client";

import { useEffect, useRef } from "react";
import { analyticsEnabled, resultsBucket, trackEvent, type SearchSurface } from "@/lib/analytics";

/** How long typing must pause before a query counts as one search. */
export const SEARCH_SETTLE_MS = 1200;

/**
 * Counts a search once the visitor stops typing: `search_used` with the
 * surface and a results-count bucket. The query itself stays in this hook (in
 * a ref, compared and discarded); it is never part of the event.
 *
 * A query the page started with (a `?q=` in the URL, say) is not counted:
 * only one the visitor typed. Clearing the box is not a search either.
 */
export function useSearchAnalytics(surface: SearchSurface, query: string, resultCount: number) {
  const trimmed = query.trim();
  const last = useRef(trimmed);
  const count = useRef(resultCount);
  useEffect(() => {
    count.current = resultCount;
  }, [resultCount]);

  useEffect(() => {
    if (!trimmed || trimmed === last.current || !analyticsEnabled()) return;
    const timer = window.setTimeout(() => {
      last.current = trimmed;
      trackEvent({ action: "search_used", surface, resultsBucket: resultsBucket(count.current) });
    }, SEARCH_SETTLE_MS);
    return () => window.clearTimeout(timer);
  }, [surface, trimmed]);
}
