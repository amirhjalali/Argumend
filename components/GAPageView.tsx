"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";

// Fires GA4 page_view on Next.js App Router client-side route changes.
// Without this, gtag('config', ID) only records the initial landing page —
// every subsequent navigation goes uncounted, which can undercount real
// engagement by 5-10x on multi-page browsing sessions.
//
// The path goes through sanitizeAnalyticsPath (lib/analyticsConfig.ts): query
// parameters outside the allow-list, such as the ?q= a search writes into the
// URL, never reach GA.

/** Paths that send no analytics page view. */
export function isUntrackedPath(pathname: string): boolean {
  return pathname === "/study" || pathname.startsWith("/study/");
}

export function GAPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams?.toString() ?? "";

  useEffect(() => {
    if (!pathname) return;
    // The study's URL carries a participant's Prolific id (PROLIFIC_PID); no
    // page view is sent for /study at all
    // (docs/plans/2026-11-03-study-plan.md, "Data handling").
    if (isUntrackedPath(pathname)) return;
    trackPageView(pathname, search);
  }, [pathname, search]);

  return null;
}
