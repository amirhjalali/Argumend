/**
 * Single source of truth for site navigation.
 *
 * Argumend 1.0 pruning collapses public navigation to Explore · Analyze ·
 * About. Hidden routes still serve when visited directly, but they are
 * deliberately de-linked from the canonical nav.
 *
 * To add, remove, rename, or re-group a destination, edit `navItems` (and, for
 * the footer's curated columns, `footerColumns`). Do not reintroduce local link
 * arrays in the components.
 */

import type { LucideIcon } from "lucide-react";
import {
  Bookmark,
  Brain,
  Compass,
  HelpCircle,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";

/**
 * Where an item lives in the SIDEBAR:
 * - "primary" — the main, always-visible navigation list.
 * - "learn"   — the collapsible "Learn & Explore" section.
 * - "meta"    — small utility links pinned to the sidebar footer (e.g. FAQ).
 */
export type NavGroup = "primary" | "learn" | "meta";

export interface NavItem {
  label: string;
  href: string;
  /** Lucide icon. Present for "primary"/"learn"; optional for "meta" links. */
  icon?: LucideIcon;
  group: NavGroup;
  /** Render with the rust "highlight" accent in the sidebar (e.g. Analyze). */
  highlight?: boolean;
  /** Opt out of Next.js prefetch for heavier/auth-gated routes. */
  noPrefetch?: boolean;
  /** Only expose this destination when account-backed features are enabled. */
  requiresAuth?: boolean;
}

/** A NavItem that is guaranteed to carry an icon (primary/learn groups). */
export interface NavItemWithIcon extends NavItem {
  icon: LucideIcon;
}

/**
 * THE canonical list — every linked navigation destination, declared exactly
 * once. Order within a group defines render order in the sidebar.
 */
export const navItems: NavItem[] = [
  // --- Primary (sidebar main list) ---
  { label: "Home", href: "/", icon: Compass, group: "primary" },
  { label: "Explore", href: "/topics", icon: ListChecks, group: "primary" },
  { label: "Analyze Text", href: "/analyze", icon: Brain, group: "primary", highlight: true },
  { label: "Saved", href: "/saved", icon: Bookmark, group: "primary", noPrefetch: true },
  { label: "About", href: "/about", icon: HelpCircle, group: "primary" },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, group: "primary", noPrefetch: true, requiresAuth: true },
];

/** Lookup by href, used to resolve the footer's curated columns. */
const byHref = new Map(navItems.map((item) => [item.href, item]));

/** Sidebar primary navigation (icon-bearing). */
export const primaryNav = navItems.filter(
  (item): item is NavItemWithIcon => item.group === "primary",
);

export function getVisiblePrimaryNav(authEnabled: boolean): NavItemWithIcon[] {
  return primaryNav.filter((item) => authEnabled || !item.requiresAuth);
}

/** Sidebar "Learn & Explore" section (icon-bearing). */
export const learnNav = navItems.filter(
  (item): item is NavItemWithIcon => item.group === "learn",
);

/** Sidebar footer utility links (e.g. FAQ). */
export const metaNav = navItems.filter((item) => item.group === "meta");

/**
 * Footer columns. These are a curated PRESENTATION grouping (independent of the
 * sidebar's primary/learn split) that references destinations by href, so the
 * canonical label for each link still comes from `navItems` — no drift. Adding
 * a destination to `navItems` and listing its href here surfaces it in the
 * footer; both surfaces always agree on the label.
 */
const FOOTER_COLUMN_HREFS: { title: string; hrefs: string[] }[] = [
  {
    title: "Explore",
    hrefs: ["/topics", "/saved"],
  },
  {
    title: "About",
    hrefs: ["/about"],
  },
];

export interface FooterColumn {
  title: string;
  links: NavItem[];
}

/** Footer columns resolved to canonical NavItems (label/href from `navItems`). */
export const footerColumns: FooterColumn[] = FOOTER_COLUMN_HREFS.map(({ title, hrefs }) => ({
  title,
  links: hrefs
    .map((href) => byHref.get(href))
    .filter((item): item is NavItem => item !== undefined),
}));
