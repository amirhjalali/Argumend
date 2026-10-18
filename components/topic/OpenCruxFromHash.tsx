"use client";

import { useEffect } from "react";

/**
 * Opens the crux a link points at. "Open the map at this crux" (the paste
 * result) and the rail's "On this page" links land on `#crux-…`; without this
 * the reader arrives at a closed fold and has to find the toggle. Focus the
 * summary too, so keyboard and screen-reader users continue at that crux.
 */
export function OpenCruxFromHash() {
  useEffect(() => {
    const open = () => {
      let id: string;
      try {
        id = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        // A malformed fragment is a bad link, not a reason to crash the page.
        return;
      }
      if (!id.startsWith("crux-")) return;
      const entry = document.getElementById(id);
      const details = entry?.querySelector("details");
      if (!details) return;
      details.open = true;
      details.querySelector("summary")?.focus({ preventScroll: true });
      return entry;
    };
    const reopen = (event: MouseEvent) => {
      if (
        event.defaultPrevented || event.button !== 0 || event.metaKey ||
        event.ctrlKey || event.shiftKey || event.altKey
      ) return;
      const anchor = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a[href]")
        : null;
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;
      const current = window.location;
      // Clicking the current fragment does not fire hashchange. A reader may
      // have closed its fold since the last visit, then returned via the rail.
      if (
        anchor.origin !== current.origin || anchor.pathname !== current.pathname ||
        anchor.search !== current.search || anchor.hash !== current.hash
      ) return;
      const entry = open();
      if (!entry) return;
      event.preventDefault();
      entry.scrollIntoView({ block: "start" });
    };
    const initialHash = window.location.hash;
    const initialEntry = open();
    let focusFrame: number | undefined;
    const finishInitialNavigation = () => {
      // Native fragment navigation can reset focus after hydration has
      // opened the fold. Repair that once, after loading and layout finish.
      focusFrame = window.requestAnimationFrame(() => {
        if (!initialEntry?.isConnected || window.location.hash !== initialHash) return;
        const active = document.activeElement;
        if (active && active !== document.body && active !== document.documentElement && active !== initialEntry) return;
        const details = initialEntry.querySelector("details");
        if (details?.open) details.querySelector("summary")?.focus({ preventScroll: true });
      });
    };
    if (initialEntry) {
      if (document.readyState === "complete") finishInitialNavigation();
      else window.addEventListener("load", finishInitialNavigation, { once: true });
    }
    window.addEventListener("hashchange", open);
    document.addEventListener("click", reopen);
    return () => {
      window.removeEventListener("hashchange", open);
      document.removeEventListener("click", reopen);
      window.removeEventListener("load", finishInitialNavigation);
      if (focusFrame !== undefined) window.cancelAnimationFrame(focusFrame);
    };
  }, []);
  return null;
}
