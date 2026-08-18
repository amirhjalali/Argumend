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
  | { action: "node_expand"; topicId: string; nodeId: string }
  | { action: "engaged_2min"; topicId: string }
  | { action: "newsletter_signup"; source: string }
  | { action: "share_click"; platform: string; topicId: string }
  | { action: "cta_click"; ctaName: string; location: string }
  | {
      action: "disagreement_analysis_started";
      contentType: string;
      characterBucket: string;
    }
  | {
      action: "disagreement_analysis_completed";
      diagnosisPattern: string;
      positionCount: number;
      cruxCount: number;
      latencyBucket: string;
    }
  | {
      action: "disagreement_analysis_failed";
      errorCode: string;
    }
  | {
      action: "disagreement_section_opened";
      section: "common-ground" | "position" | "disagreement" | "crux" | "source";
    }
  | {
      action: "disagreement_public_link_created";
      diagnosisPattern: string;
    }
  | {
      action: "disagreement_share_clicked";
      platform: "copy" | "x" | "native";
      surface: "session" | "public";
    }
  | {
      action: "disagreement_feedback_submitted";
      section: string;
      vote?: string;
    }
  | {
      action: "disagreement_analyze_another";
      surface: "session" | "public";
    };

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window !== "undefined" && window.gtag) {
    const { action, ...params } = event;
    window.gtag("event", action, params);
  }
}
