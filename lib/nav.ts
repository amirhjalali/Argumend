/**
 * Single source of truth for site navigation.
 *
 * One header, no sidebar (2026-09-29 site overhaul). The header, its phone
 * menu sheet and the footer all read the lists below; no component declares a
 * link array of its own.
 *
 *   Header      Maps · Paste an argument · Learn · About   (+ search, theme)
 *   Phone menu  the same four, then the Learn group, then theme
 *   Footer      "Argumend" (the same four) · "Learn" · "More" · legal
 *
 * Saved is a utility, not a destination: it lives in the footer, and the
 * header shows a bookmark icon only once the visitor has saved something.
 * The dashboard is auth-gated and reached from the account menu, never here.
 *
 * `ANALYZE_HREF` and `LEARN_HREF` are the two destinations still being
 * decided (which paste tool is canonical, where the learn hub lives). Every
 * shell-level link to them goes through these constants, so repointing is a
 * one-line change here.
 */

/** The paste tool. Repoint here when the canonical paste route is chosen. */
export const ANALYZE_HREF = "/analyze";

/** The learn hub (/learn, 2026-09-29): one index for the whole library. */
export const LEARN_HREF = "/learn";

export const SAVED_HREF = "/saved";

export const GITHUB_URL = "https://github.com/amirhjalali/Argumend";

export interface NavLink {
  label: string;
  href: string;
  /** Opt out of Next.js prefetch for heavier or storage-backed routes. */
  noPrefetch?: boolean;
  /** Off-site link: rendered as a plain anchor that opens a new tab. */
  external?: boolean;
  /**
   * Other route prefixes that count as "being in" this section, so the
   * header can mark it current (e.g. /fallacies is part of Learn).
   */
  activePrefixes?: readonly string[];
}

/** The four primary destinations, in header order. */
export const primaryNav: readonly NavLink[] = [
  { label: "Maps", href: "/topics" },
  {
    label: "Paste an argument",
    href: ANALYZE_HREF,
    activePrefixes: ["/analyze", "/analyze-v2", "/reply", "/d"],
  },
  {
    label: "Learn",
    href: LEARN_HREF,
    activePrefixes: [
      "/guides",
      "/concepts",
      "/fallacies",
      "/glossary",
      "/questions",
      "/blog",
      "/research",
      "/for-educators",
      "/perspectives",
    ],
  },
  {
    label: "About",
    href: "/about",
    activePrefixes: ["/how-it-works", "/methodology", "/faq", "/community"],
  },
];

/**
 * The "Learn" group in the phone menu sheet and the footer: the hub's main
 * sections (app/learn/page.tsx, lib/learn/sections.ts). The hub itself is the
 * primary "Learn" item, so it is not repeated here.
 */
export const learnNav: readonly NavLink[] = [
  { label: "Core ideas", href: `${LEARN_HREF}#ideas` },
  { label: "Guides", href: `${LEARN_HREF}#guides` },
  { label: "Fallacies", href: "/fallacies" },
  { label: "Glossary", href: "/glossary" },
  { label: "Essays", href: "/blog" },
  { label: "For teachers", href: "/for-educators" },
];

export interface FooterColumn {
  title: string;
  links: readonly NavLink[];
}

/** Footer columns: the primary four, the Learn sections, then the secondary pages. */
export const footerColumns: readonly FooterColumn[] = [
  { title: "Argumend", links: primaryNav },
  { title: "Learn", links: learnNav },
  {
    title: "More",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Methodology", href: "/methodology" },
      { label: "Saved", href: SAVED_HREF, noPrefetch: true },
      { label: "GitHub", href: GITHUB_URL, external: true },
    ],
  },
];

/**
 * Legal destinations. Reachable from every page, but they are neither a
 * product destination nor a discovery column, so they sit in the footer's
 * bottom line.
 */
export interface LegalLink {
  label: string;
  href: string;
}

export const legalLinks: readonly LegalLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

function isWithin(pathname: string, prefix: string): boolean {
  if (prefix === "/") return pathname === "/";
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

/**
 * The primary item the current route belongs to, or undefined. The longest
 * matching prefix wins, so a nested route never lights up two items.
 */
export function getActivePrimaryHref(pathname: string | null | undefined): string | undefined {
  if (!pathname) return undefined;
  let best: { href: string; length: number } | undefined;
  for (const item of primaryNav) {
    for (const prefix of [item.href, ...(item.activePrefixes ?? [])]) {
      if (isWithin(pathname, prefix) && (!best || prefix.length > best.length)) {
        best = { href: item.href, length: prefix.length };
      }
    }
  }
  return best?.href;
}
