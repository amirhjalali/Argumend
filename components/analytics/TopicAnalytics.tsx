"use client";

/**
 * The topic page funnel, counted from outside the page template.
 *
 * Mounted by app/topics/[id]/page.tsx beside the page, not inside it, so the
 * template (components/topic/TopicPage.tsx) carries no analytics code. It
 * reads the page through three DOM hooks the template renders, pinned by
 * TopicAnalytics.test.tsx against the real template:
 *
 *   [data-crux-sheet]          the <ol> of cruxes; each <li> is one crux
 *   [data-crux-sheet] li > details   that crux's own disclosure
 *   [data-evidence]            the "evidence on each side" disclosure in a crux
 *
 * Events, once per page view each (lib/analytics.ts has the types):
 *   topic_view       on mount
 *   first_crux_seen  half of the first crux entered the viewport
 *   crux_open        a crux opened (per crux)
 *   evidence_expand  a crux's evidence opened (per crux)
 *   scroll_depth     25 / 50 / 75 / 100 % of the page scrolled past
 *
 * With analytics off, the effect returns before attaching anything.
 */
import { useEffect } from "react";
import {
  analyticsEnabled,
  trackEvent,
  type ScrollMilestone,
  type TopicKind,
} from "@/lib/analytics";

export const CRUX_SHEET_SELECTOR = "[data-crux-sheet]";
export const EVIDENCE_ATTRIBUTE = "data-evidence";

const MILESTONES: readonly ScrollMilestone[] = [25, 50, 75, 100];

/** Which crux (1-based) and which disclosure a toggled <details> is, if any. */
export function classifyDisclosure(
  details: HTMLDetailsElement,
): { kind: "crux_open" | "evidence_expand"; cruxIndex: number } | null {
  const sheet = details.closest(CRUX_SHEET_SELECTOR);
  if (!sheet) return null;
  const entries = Array.from(sheet.children).filter((child) => child.tagName === "LI");
  const entry = entries.find((li) => li.contains(details));
  if (!entry) return null;
  const cruxIndex = entries.indexOf(entry) + 1;
  if (details.hasAttribute(EVIDENCE_ATTRIBUTE)) return { kind: "evidence_expand", cruxIndex };
  if (details.parentElement === entry) return { kind: "crux_open", cruxIndex };
  return null;
}

/** Share of the document scrolled past, in percent. */
function scrolledPercent(): number {
  const height = document.documentElement.scrollHeight;
  if (height <= 0) return 0;
  return ((window.scrollY + window.innerHeight) / height) * 100;
}

export function TopicAnalytics({ topicId, topicKind }: { topicId: string; topicKind: TopicKind }) {
  useEffect(() => {
    if (!analyticsEnabled()) return;
    trackEvent({ action: "topic_view", topicId, topicKind });
    const cleanups: Array<() => void> = [];

    // First crux in view.
    const first = document.querySelector(CRUX_SHEET_SELECTOR)?.querySelector(":scope > li");
    if (first && typeof IntersectionObserver === "function") {
      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer.disconnect();
          trackEvent({ action: "first_crux_seen", topicId });
        },
        { threshold: 0.5 },
      );
      observer.observe(first);
      cleanups.push(() => observer.disconnect());
    }

    // Crux and evidence disclosures. `toggle` does not bubble, so listen in
    // the capture phase.
    const opened = new Set<string>();
    const onToggle = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLDetailsElement) || !target.open) return;
      const hit = classifyDisclosure(target);
      if (!hit) return;
      const key = `${hit.kind}:${hit.cruxIndex}`;
      if (opened.has(key)) return;
      opened.add(key);
      trackEvent({ action: hit.kind, topicId, cruxIndex: hit.cruxIndex });
    };
    document.addEventListener("toggle", onToggle, true);
    cleanups.push(() => document.removeEventListener("toggle", onToggle, true));

    // Scroll depth, measured on scroll only: landing on a page is not reading it.
    const reached = new Set<ScrollMilestone>();
    let frame = 0;
    const measure = () => {
      frame = 0;
      const percent = scrolledPercent();
      for (const milestone of MILESTONES) {
        // 100 allows for sub-pixel rounding at the very bottom.
        const bar = milestone === 100 ? 99 : milestone;
        if (percent >= bar && !reached.has(milestone)) {
          reached.add(milestone);
          trackEvent({ action: "scroll_depth", topicId, percent: milestone });
        }
      }
      if (reached.size === MILESTONES.length) window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    });

    return () => {
      for (const cleanup of cleanups) cleanup();
    };
  }, [topicId, topicKind]);

  return null;
}
