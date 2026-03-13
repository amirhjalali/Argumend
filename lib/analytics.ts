/**
 * Type-safe Google Analytics event tracking.
 *
 * Events are silently dropped when GA is not loaded (e.g. local dev,
 * ad-blockers, SSR). No runtime dependencies beyond window.gtag.
 */

type AnalyticsEvent =
  | { action: "topic_view"; topicId: string; topicTitle: string }
  | { action: "debate_start"; topicId: string; forModel: string; againstModel: string }
  | { action: "debate_complete"; topicId: string; totalRounds: number }
  | { action: "analysis_submit"; contentType: string }
  | { action: "analysis_complete"; topicCount: number }
  | { action: "view_switch"; view: "logic-map" | "scales" | "debate" }
  | { action: "newsletter_signup"; source: string }
  | { action: "share_click"; platform: string; topicId: string }
  | { action: "cta_click"; ctaName: string; location: string };

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window !== "undefined" && window.gtag) {
    const { action, ...params } = event;
    window.gtag("event", action, params);
  }
}
