"use client";

import { useState, useCallback } from "react";

const DESKTOP_BREAKPOINT = 768;
const SIDEBAR_WIDTH = 260;

interface SidebarState {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
}

/**
 * Custom hook for managing sidebar state across the application.
 * Handles responsive behavior and provides consistent controls.
 *
 * Issue #1, #18: Consolidates duplicated sidebar logic from page.tsx and AppShell.tsx
 */
export function useSidebarState(): SidebarState {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth >= DESKTOP_BREAKPOINT;
  });

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  return { isOpen, toggle, close, open };
}

export { DESKTOP_BREAKPOINT, SIDEBAR_WIDTH };
