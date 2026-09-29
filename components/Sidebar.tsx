"use client";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentTopicId?: string;
  onTopicSelect?: (id: string) => void;
}

/**
 * Retired 2026-09-29. The header (components/TopBar.tsx) is the only
 * navigation on the site, with its own phone menu sheet; the sidebar's nav
 * list, its random "Topics" list and "Most read this week" are gone.
 *
 * This stub renders nothing. It exists only because the two private copies
 * of the old shell, components/HomeClient.tsx and app/analyze/page.tsx,
 * still mount it (and hooks/useSidebarState + hooks/useMobileSidebarA11y).
 * Delete all three when those files move onto AppShell.
 */
export function Sidebar(props: SidebarProps): null {
  void props;
  return null;
}
