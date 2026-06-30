"use client";

import { useState, useCallback, useEffect, useLayoutEffect } from "react";

const DESKTOP_BREAKPOINT = 768;
const SIDEBAR_WIDTH = 260;

// useLayoutEffect logs a warning during SSR; fall back to useEffect on the server.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface SidebarState {
  isOpen: boolean;
  /**
   * False during SSR and the first client render, true after mount. Consumers
   * gate enter-transitions on this so the sidebar doesn't animate in on load.
   */
  mounted: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
}

/**
 * Custom hook for managing sidebar state across the application.
 * Handles responsive behavior and provides consistent controls.
 *
 * Issue #1, #18: Consolidates duplicated sidebar logic from page.tsx and AppShell.tsx
 *
 * Renders closed on the server and on the first client render so the hydrated
 * markup matches the server output (reading window.innerWidth during render
 * caused a hydration mismatch). The real responsive value is applied in a
 * layout effect before the browser paints, so there is no visible flash.
 */
export function useSidebarState(): SidebarState {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setIsOpen(window.innerWidth >= DESKTOP_BREAKPOINT);
  }, []);

  // Enable transitions only after the first paint so the initial open state
  // (set above, before paint) appears instantly instead of sliding in.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: flip the mount flag after first paint so the pre-set open state appears instantly instead of animating in.
    setMounted(true);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  return { isOpen, mounted, toggle, close, open };
}

export { DESKTOP_BREAKPOINT, SIDEBAR_WIDTH };
