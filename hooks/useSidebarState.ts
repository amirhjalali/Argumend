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
 * LEGACY (2026-09-29): the header owns navigation and there is no sidebar.
 * Only the two private copies of the old shell (components/HomeClient.tsx,
 * app/analyze/page.tsx) still call this; it now starts closed on every
 * viewport so their empty sidebar column never opens. Delete it with
 * components/Sidebar.tsx when those files move onto AppShell.
 *
 * Renders closed on the server and derives the desktop default from a
 * subscribe-able media-query snapshot on the client. User actions override the
 * responsive default until the next explicit open/close/toggle.
 *
 * The choice is not persisted: it lasts while the shell stays mounted.
 */
export function useSidebarState({
  desktopDefaultOpen = false,
}: { desktopDefaultOpen?: boolean } = {}): SidebarState {
  const isDesktop = useMediaQuery(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
  const [openOverride, setOpenOverride] = useState<boolean | null>(null);
  const mounted = useSyncExternalStore(
    subscribeMounted,
    getMountedSnapshot,
    getServerMountedSnapshot,
  );
  // Reading routes pass desktopDefaultOpen=false: closed on every viewport,
  // which also matches the server render, so nothing moves on hydration.
  const defaultOpen = desktopDefaultOpen && isDesktop;
  const isOpen = openOverride ?? defaultOpen;

  const toggle = useCallback(() => {
    setOpenOverride((prev) => !(prev ?? defaultOpen));
  }, [defaultOpen]);

  const close = useCallback(() => {
    setOpenOverride(false);
  }, []);

  const open = useCallback(() => {
    setOpenOverride(true);
  }, []);

  return { isOpen, mounted, toggle, close, open };
}

export { DESKTOP_BREAKPOINT, SIDEBAR_WIDTH };
