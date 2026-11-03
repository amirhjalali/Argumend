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
export function GAPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams?.toString() ?? "";

  useEffect(() => {
    if (!pathname) return;
    trackPageView(pathname, search);
  }, [pathname, search]);

  return null;
}
