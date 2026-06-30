"use client";

import { useState, useCallback, useSyncExternalStore } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const DESKTOP_BREAKPOINT = 768;
const SIDEBAR_WIDTH = 260;

function subscribeMounted(onStoreChange: () => void) {
  queueMicrotask(onStoreChange);
  return () => {};
}

function getMountedSnapshot() {
  return true;
}

function getServerMountedSnapshot() {
  return false;
}

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
 * Renders closed on the server and derives the desktop default from a
 * subscribe-able media-query snapshot on the client. User actions override the
 * responsive default until the next explicit open/close/toggle.
 */
export function useSidebarState(): SidebarState {
  const isDesktop = useMediaQuery(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
  const [openOverride, setOpenOverride] = useState<boolean | null>(null);
  const mounted = useSyncExternalStore(
    subscribeMounted,
    getMountedSnapshot,
    getServerMountedSnapshot,
  );
  const isOpen = openOverride ?? isDesktop;

  const toggle = useCallback(() => {
    setOpenOverride((prev) => !(prev ?? isDesktop));
  }, [isDesktop]);

  const close = useCallback(() => {
    setOpenOverride(false);
  }, []);

  const open = useCallback(() => {
    setOpenOverride(true);
  }, []);

  return { isOpen, mounted, toggle, close, open };
}

export { DESKTOP_BREAKPOINT, SIDEBAR_WIDTH };
