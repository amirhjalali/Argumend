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
 *   first_crux_seen  the first crux reached the top three quarters of the viewport
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
/** The viewport minus its bottom quarter: a crux peeking in at the very bottom is not yet "seen". */
const CRUX_ROOT_MARGIN = "0px 0px -25% 0px";

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

    // First crux in view: any part of it inside the top three quarters of the
    // viewport. Not a share of the element: an opened crux is taller than two
    // screens, so "half of it visible" can never happen. A jump that skips
    // past it (a fling, an anchor link) is caught by the scroll check below.
    const first = document.querySelector(CRUX_SHEET_SELECTOR)?.querySelector(":scope > li");
    let cruxSeen = !first;
    let observer: IntersectionObserver | null = null;
    const seeCrux = () => {
      if (cruxSeen) return;
      cruxSeen = true;
      observer?.disconnect();
      trackEvent({ action: "first_crux_seen", topicId });
    };
    if (first && typeof IntersectionObserver === "function") {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) seeCrux();
        },
        { threshold: 0, rootMargin: CRUX_ROOT_MARGIN },
      );
      observer.observe(first);
      cleanups.push(() => observer?.disconnect());
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
      if (!cruxSeen && first && first.getBoundingClientRect().top < window.innerHeight * 0.75) seeCrux();
      const percent = scrolledPercent();
      for (const milestone of MILESTONES) {
        // 100 allows for sub-pixel rounding at the very bottom.
        const bar = milestone === 100 ? 99 : milestone;
        if (percent >= bar && !reached.has(milestone)) {
          reached.add(milestone);
          trackEvent({ action: "scroll_depth", topicId, percent: milestone });
        }
      }
      if (cruxSeen && reached.size === MILESTONES.length) window.removeEventListener("scroll", onScroll);
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
