"use client";

/**
 * Loads the one configured analytics provider (lib/analyticsConfig.ts) and
 * defines its queue stub, then lets lib/analytics.ts deliver whatever the page
 * queued while it was loading. Rendered by app/layout.tsx only when a provider
 * is configured; with none, nothing here is in the page at all.
 *
 * The stubs are defined here rather than in an inline <script>, so the GA
 * measurement ID is never interpolated into script text, and Plausible's URL
 * filter can be a real function that shares the site's query allow-list.
 */
import Script from "next/script";
import { Suspense, useEffect } from "react";
import { GAPageView } from "@/components/GAPageView";
import { flushAnalyticsQueue } from "@/lib/analytics";
import { sanitizeAnalyticsUrl, type AnalyticsConfig } from "@/lib/analyticsConfig";

let bootstrapped = false;

/** Exported for tests. Idempotent: React StrictMode runs effects twice. */
export function bootstrapAnalytics(config: AnalyticsConfig) {
  if (typeof window === "undefined") return;
  const w = window;
  if (!bootstrapped) {
    bootstrapped = true;
    if (config.provider === "ga") {
      const dataLayer = (w.dataLayer = w.dataLayer || []);
      if (typeof w.gtag !== "function") {
        // gtag.js reads Arguments objects from dataLayer, not arrays.
        w.gtag = function gtag() {
          // eslint-disable-next-line prefer-rest-params
          dataLayer.push(arguments);
        };
      }
      w.gtag("js", new Date());
      w.gtag("config", config.measurementId, {
        send_page_view: false,
        page_location: sanitizeAnalyticsUrl(w.location.href),
      });
    } else if (config.provider === "plausible") {
      // Plausible's queue stub, so calls made before the script loads are
      // replayed by it.
      if (typeof w.plausible !== "function") {
        const stub = function plausible() {
          // eslint-disable-next-line prefer-rest-params
          (stub.q = stub.q || []).push(arguments);
        } as unknown as NonNullable<Window["plausible"]>;
        stub.init = (options?: Record<string, unknown>) => {
          stub.o = options || {};
        };
        w.plausible = stub;
      }
      // Drop query parameters outside the allow-list from every URL Plausible
      // sends. (The legacy script.js ignores init.)
      w.plausible.init?.({
        transformRequest: (payload: { u?: string }) => {
          if (payload && typeof payload.u === "string") payload.u = sanitizeAnalyticsUrl(payload.u);
          return payload;
        },
      });
    }
  }
  flushAnalyticsQueue();
}

/** Tests only. */
export function resetAnalyticsBootstrapForTesting() {
  bootstrapped = false;
}

export function AnalyticsScripts({ config }: { config: AnalyticsConfig }) {
  useEffect(() => {
    bootstrapAnalytics(config);
  }, [config]);

  if (config.provider === "ga") {
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.measurementId)}`}
          strategy="afterInteractive"
        />
        <Suspense fallback={null}>
          <GAPageView />
        </Suspense>
      </>
    );
  }
  if (config.provider === "plausible") {
    return (
      <Script
        src={config.scriptSrc}
        strategy="afterInteractive"
        {...(config.domain ? { "data-domain": config.domain } : {})}
        onLoad={flushAnalyticsQueue}
      />
    );
  }
  return (
    <Script
      src={config.scriptSrc}
      strategy="afterInteractive"
      data-website-id={config.websiteId}
      // The query string can hold what a visitor typed into a search box.
      data-exclude-search="true"
      onLoad={flushAnalyticsQueue}
    />
  );
}
