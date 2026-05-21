"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

// Fires GA4 page_view on Next.js App Router client-side route changes.
// Without this, gtag('config', ID) in <head> only records the initial
// landing page — every subsequent navigation goes uncounted, which can
// undercount real engagement by 5-10x on multi-page browsing sessions.
export function GAPageView({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag || !pathname) return;
    const query = searchParams?.toString();
    const page_path = query ? `${pathname}?${query}` : pathname;
    window.gtag("event", "page_view", {
      page_path,
      page_location: window.location.href,
      send_to: measurementId,
    });
  }, [pathname, searchParams, measurementId]);

  return null;
}
