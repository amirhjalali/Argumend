"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, Search, X } from "lucide-react";
import { MenuIcon } from "@/components/icons/MenuIcon";
import { useModalAccessibility } from "@/hooks/useModalAccessibility";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSavedTopicIds } from "@/hooks/useSavedTopics";
import { SAVED_HREF, getActivePrimaryHref, learnNav, primaryNav, type NavLink } from "@/lib/nav";
import { UserMenu } from "./UserMenu";
import { ThemeToggle } from "./ThemeToggle";

// TopBar renders on every route, so anything it imports eagerly lands in the
// shared client bundle. SearchModal drags in MiniSearch plus the full
// topic/blog/concept indexes (~100KB+) but is only shown after the visitor
// opens search, so it is code-split AND gated behind `hasOpenedSearch`:
// next/dynamic only fetches the chunk once the component actually renders.
const SearchModal = dynamic(
  () => import("./SearchModal").then((m) => ({ default: m.SearchModal })),
  { ssr: false }
);

const authEntryEnabled = process.env.NEXT_PUBLIC_ENABLE_AUTH === "true";

const MENU_ID = "site-menu";
const DESKTOP_QUERY = "(min-width: 768px)";

const NAV_LINK =
  "inline-flex min-h-11 items-center rounded-md px-2.5 font-sans text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus lg:px-3";
const NAV_LINK_IDLE =
  "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100";
const NAV_LINK_CURRENT =
  "text-stone-900 underline decoration-deep/50 decoration-2 underline-offset-[6px] dark:text-stone-100 dark:decoration-accent-text/60";

const ICON_BUTTON =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-stone-500 transition-colors hover:bg-subtle hover:text-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus dark:text-stone-400 dark:hover:text-stone-200";

/**
 * The site header, and the only navigation on the site.
 *
 *   ≥768px  ARGUMEND / Disagree better. · Maps · Paste an argument · Learn ·
 *           About · [saved] · Search ⌘K · theme
 *   <768px  ARGUMEND / Disagree better. · [saved] · search · menu
 *
 * The menu button opens a sheet this component owns (primary items, the
 * Learn group, theme), so it works on every route without a sidebar. Items
 * come from lib/nav.ts. Sticky: `html, body { overflow-x: clip }` in
 * globals.css keeps the window as the scroll container so it can stick.
 */
export function TopBar() {
  const pathname = usePathname();
  const activeHref = getActivePrimaryHref(pathname);
  const { ids: savedIds, hydrated: savedHydrated } = useSavedTopicIds();
  const savedCount = savedHydrated ? savedIds.length : 0;

  const [searchOpen, setSearchOpen] = useState(false);
  // Stays true once search has been opened, so the modal keeps its mount (and
  // its exit animation) across close/reopen while never mounting before use.
  const [hasOpenedSearch, setHasOpenedSearch] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  // The sheet is a phone affordance. Widening the window past the breakpoint
  // closes it for good (state adjusted during render, not in an effect), so
  // narrowing again does not reopen it unasked.
  const [wasDesktop, setWasDesktop] = useState(isDesktop);
  if (wasDesktop !== isDesktop) {
    setWasDesktop(isDesktop);
    if (isDesktop) setMenuOpen(false);
  }
  const sheetOpen = menuOpen && !isDesktop;
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const sheetRef = useModalAccessibility<HTMLDivElement>({ isOpen: sheetOpen, onClose: closeMenu });

  // Focus was inside the sheet when it closed on widening, and the menu
  // button it would return to is hidden on desktop: hand it to the inline
  // nav that replaced the sheet (its current item, else its first).
  const mainNavRef = useRef<HTMLElement>(null);
  const sheetWasOpen = useRef(false);
  useEffect(() => {
    if (!isDesktop || !sheetWasOpen.current) return;
    const nav = mainNavRef.current;
    const target =
      nav?.querySelector<HTMLElement>('[aria-current="page"]') ?? nav?.querySelector<HTMLElement>("a");
    target?.focus();
  }, [isDesktop]);
  useEffect(() => {
    sheetWasOpen.current = sheetOpen;
  }, [sheetOpen]);

  const openSearch = useCallback(() => {
    setMenuOpen(false);
    setHasOpenedSearch(true);
    setSearchOpen(true);
  }, []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setMenuOpen(false);
        setHasOpenedSearch(true);
        setSearchOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const savedLabel = `Saved maps (${savedCount})`;

  return (
    <>
      <header
        role="banner"
        className="sticky top-0 z-40 w-full border-b border-stone-300/60 bg-canvas/90 text-primary dark:text-stone-200 backdrop-blur-sm dark:border-divider/70"
      >
        <div className="flex h-14 w-full items-center gap-2 px-4 md:gap-3 md:px-6">
          {/* Wordmark */}
          <Link href="/" prefetch={false} className="flex min-h-11 min-w-0 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus">
            <span className="flex min-w-0 flex-col">
              <span className="font-serif text-[1.0625rem] font-medium leading-none tracking-[0.08em] text-primary dark:text-stone-200 sm:text-lg md:text-xl">
                ARGUMEND
              </span>
              <span className="mt-1 font-sans text-[10px] leading-none text-stone-600 dark:text-stone-400">
                Disagree better.
              </span>
            </span>
          </Link>

          {/* Primary navigation (≥768px) */}
          <nav ref={mainNavRef} aria-label="Main" className="ml-2 hidden items-center gap-0.5 md:flex lg:ml-6">
            {primaryNav.map((item) => (
              <HeaderLink
                key={item.href}
                item={item}
                current={item.href === activeHref}
                className={`${NAV_LINK} ${item.href === activeHref ? NAV_LINK_CURRENT : NAV_LINK_IDLE}`}
              />
            ))}
          </nav>

          {/* Utilities */}
          <div className="ml-auto flex shrink-0 items-center gap-0.5">
            {savedCount > 0 ? (
              <Link
                href={SAVED_HREF}
                prefetch={false}
                aria-label={savedLabel}
                title={savedLabel}
                aria-current={pathname === SAVED_HREF ? "page" : undefined}
                className={ICON_BUTTON}
              >
                <Bookmark className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              </Link>
            ) : null}

            {/* The secondary text token, not stone-500: "Search" is a text label, and
                stone-500 was 4.26:1 on the canvas. */}
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search"
              aria-haspopup="dialog"
              className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-1.5 rounded-lg px-2.5 text-secondary dark:text-stone-400 transition-colors hover:bg-subtle hover:text-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus dark:hover:text-stone-200"
            >
              <Search className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              <span className="hidden font-sans text-sm lg:inline">Search</span>
              <kbd className="hidden h-5 items-center gap-0.5 rounded border border-stone-300/70 bg-card px-1.5 font-mono text-[10px] text-muted dark:border-divider dark:text-stone-400 lg:inline-flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>

            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {authEntryEnabled ? (
              <div className="ml-1 hidden border-l border-stone-300/60 pl-2 dark:border-divider/60 md:block">
                <UserMenu />
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={sheetOpen}
              aria-controls={MENU_ID}
              className={`${ICON_BUTTON} -mr-2 md:hidden`}
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {sheetOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" onClick={closeMenu} />
          <div
            ref={sheetRef}
            id={MENU_ID}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="animate-sheet-in absolute inset-y-0 right-0 flex w-[min(20rem,86vw)] flex-col overflow-y-auto border-l border-stone-300/60 bg-canvas shadow-xl dark:border-divider"
          >
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-stone-300/60 px-4 dark:border-divider/70">
              <span className="label-caps">Menu</span>
              <button type="button" onClick={closeMenu} aria-label="Close menu" className={`${ICON_BUTTON} -mr-2`}>
                <X className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Menu" className="flex flex-col px-4 pb-2 pt-3">
              <ul>
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <HeaderLink
                      item={item}
                      current={item.href === activeHref}
                      onNavigate={closeMenu}
                      className={`flex min-h-12 items-center rounded-md font-serif text-xl transition-colors ${
                        item.href === activeHref
                          ? "text-stone-900 underline decoration-deep/50 decoration-2 underline-offset-[6px] dark:text-stone-100"
                          : "text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100"
                      }`}
                    />
                  </li>
                ))}
              </ul>

              <p id="site-menu-learn" className="label-caps mt-5 border-t border-stone-300/60 pt-4 dark:border-divider/70">
                Learn
              </p>
              <ul aria-labelledby="site-menu-learn" className="mt-1">
                {learnNav.map((item) => (
                  <li key={item.href}>
                    <HeaderLink
                      item={item}
                      current={pathname === item.href || Boolean(pathname?.startsWith(`${item.href}/`))}
                      onNavigate={closeMenu}
                      className="flex min-h-11 items-center rounded-md font-sans text-[0.9375rem] text-stone-600 transition-colors hover:text-stone-900 aria-[current=page]:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 dark:aria-[current=page]:text-stone-100"
                    />
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto flex items-center justify-between border-t border-stone-300/60 px-4 py-3 dark:border-divider/70">
              <span className="font-sans text-sm text-stone-600 dark:text-stone-400">Theme</span>
              <ThemeToggle variant="labeled" />
            </div>
          </div>
        </div>
      ) : null}

      {hasOpenedSearch && <SearchModal isOpen={searchOpen} onClose={closeSearch} />}
    </>
  );
}

function HeaderLink({
  item,
  current,
  className,
  onNavigate,
}: {
  item: NavLink;
  current: boolean;
  className: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={item.href}
      prefetch={false}
      aria-current={current ? "page" : undefined}
      onClick={onNavigate}
      className={className}
    >
      {item.label}
    </Link>
  );
}
