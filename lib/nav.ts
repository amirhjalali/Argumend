/**
 * Single source of truth for site navigation.
 *
 * Strategic Bet E (IA): the Sidebar and Footer used to maintain their own
 * divergent hardcoded link arrays, which let them drift — `/questions` was
 * reachable only from the footer, several pages used different labels in each
 * place, etc. Every navigation destination is now declared ONCE in `navItems`
 * below; the Sidebar and Footer DERIVE their links from it so they can't drift.
 *
 * To add, remove, rename, or re-group a destination, edit `navItems` (and, for
 * the footer's curated columns, `footerColumns`). Do not reintroduce local link
 * arrays in the components.
 */

import type { LucideIcon } from "lucide-react";
import {
  ArrowLeftRight,
  BadgeCheck,
  BookOpen,
  Bookmark,
  Brain,
  Compass,
  Eye,
  FileText,
  GraduationCap,
  HelpCircle,
  History,
  LayoutDashboard,
  Layers,
  ListChecks,
  Map as MapIcon,
  MessageCircleQuestion,
  Network,
  Newspaper,
  Scale,
  Shell,
  Users,
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
}

/** A NavItem that is guaranteed to carry an icon (primary/learn groups). */
export interface NavItemWithIcon extends NavItem {
  icon: LucideIcon;
}

/**
 * THE canonical list — every navigation destination, declared exactly once.
 * The UNION of everything that previously lived in the Sidebar and the Footer.
 * Order within a group defines render order in the sidebar.
 */
export const navItems: NavItem[] = [
  // --- Primary (sidebar main list) ---
  { label: "Home", href: "/", icon: Compass, group: "primary" },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, group: "primary", noPrefetch: true },
  { label: "Analyze Text", href: "/analyze", icon: Brain, group: "primary", highlight: true },
  { label: "Recent Analyses", href: "/analyses", icon: History, group: "primary", noPrefetch: true },
  { label: "Saved", href: "/saved", icon: Bookmark, group: "primary", noPrefetch: true },
  { label: "Topics", href: "/topics", icon: ListChecks, group: "primary" },
  { label: "Compare Topics", href: "/topics/compare", icon: ArrowLeftRight, group: "primary" },
  { label: "Is It True?", href: "/is", icon: BadgeCheck, group: "primary" },
  { label: "How It Works", href: "/how-it-works", icon: MapIcon, group: "primary" },
  { label: "About", href: "/about", icon: HelpCircle, group: "primary" },

  // --- Learn & Explore (sidebar collapsible section) ---
  { label: "Blog", href: "/blog", icon: Newspaper, group: "learn" },
  { label: "Research", href: "/research", icon: FileText, group: "learn" },
  { label: "Guides", href: "/guides", icon: GraduationCap, group: "learn" },
  { label: "Fallacies", href: "/fallacies", icon: Network, group: "learn" },
  { label: "Concepts", href: "/concepts", icon: Layers, group: "learn" },
  { label: "Perspectives", href: "/perspectives", icon: Eye, group: "learn" },
  { label: "Library", href: "/library", icon: BookOpen, group: "learn" },
  { label: "Questions", href: "/questions", icon: MessageCircleQuestion, group: "learn" },
  { label: "Lessons From the Deep", href: "/lessons-from-the-deep", icon: Shell, group: "learn" },
  { label: "Community", href: "/community", icon: Users, group: "learn" },
  { label: "For Educators", href: "/for-educators", icon: GraduationCap, group: "learn" },
  { label: "Methodology", href: "/methodology", icon: Scale, group: "learn" },
  { label: "Glossary", href: "/glossary", icon: BookOpen, group: "learn" },

  // --- Meta (sidebar footer utility links) ---
  { label: "FAQ", href: "/faq", group: "meta" },
];

/** Lookup by href, used to resolve the footer's curated columns. */
const byHref = new Map(navItems.map((item) => [item.href, item]));

/** Sidebar primary navigation (icon-bearing). */
export const primaryNav = navItems.filter(
  (item): item is NavItemWithIcon => item.group === "primary",
);

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
    hrefs: ["/topics", "/is", "/saved", "/questions", "/blog", "/guides", "/library"],
  },
  {
    title: "Learn",
    hrefs: ["/research", "/concepts", "/how-it-works", "/methodology", "/for-educators", "/glossary"],
  },
  {
    title: "About",
    hrefs: ["/about", "/community", "/faq", "/perspectives"],
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
