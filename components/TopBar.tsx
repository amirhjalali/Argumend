"use client";

import { useState, useEffect, useCallback, type ReactNode, type Ref } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Search, HelpCircle, ExternalLink, Home, Brain } from "lucide-react";
import { MenuIcon } from "@/components/icons/MenuIcon";
import { UserMenu } from "./UserMenu";
import { ThemeToggle } from "./ThemeToggle";

// TopBar renders on every route via AppShell, so anything it imports eagerly
// lands in the shared client bundle. SearchModal drags in MiniSearch plus the
// full topic/blog/concept indexes (~100KB+) but is only ever shown after the
// user opens search, so it is code-split AND gated behind `hasOpenedSearch` —
// next/dynamic only fetches the chunk once the component is actually rendered.
const SearchModal = dynamic(
  () => import("./SearchModal").then((m) => ({ default: m.SearchModal })),
  { ssr: false }
);

const authEntryEnabled = process.env.NEXT_PUBLIC_ENABLE_AUTH === "true";

interface TopBarProps {
  onMenuClick?: () => void;
  showBackToHero?: boolean;
  onBackToHero?: () => void;
  viewToggle?: ReactNode;
  sidebarId?: string;
  sidebarOpen?: boolean;
  menuButtonRef?: Ref<HTMLButtonElement>;
}

export function TopBar({
  onMenuClick,
  showBackToHero,
  onBackToHero,
  viewToggle,
  sidebarId,
  sidebarOpen,
  menuButtonRef,
}: TopBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  // Stays true once search has been opened, so the modal keeps its mount (and
  // its exit animation) across close/reopen while never mounting before use.
  const [hasOpenedSearch, setHasOpenedSearch] = useState(false);

  const openSearch = useCallback(() => {
    setHasOpenedSearch(true);
    setSearchOpen(true);
  }, []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setHasOpenedSearch(true);
        setSearchOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header role="banner" className="sticky top-0 z-50 flex w-full items-center justify-between gap-1 bg-[#f4f1eb]/90 dark:bg-[#1a1917]/90 backdrop-blur-sm px-4 md:px-6 py-3 text-primary dark:text-stone-200 border-b border-stone-200/40 dark:border-[#3d3a36]/60">
        {/* Left: Menu + Logo */}
        <div className="flex min-w-0 flex-1 items-center gap-3 md:flex-none md:gap-5">
          <button
            ref={menuButtonRef}
            onClick={onMenuClick}
            className="group relative flex h-11 w-11 shrink-0 items-center justify-center -ml-2 rounded-lg text-secondary dark:text-stone-400 transition-all duration-200 hover:text-primary dark:hover:text-stone-200 hover:bg-[#f0ebe3] dark:hover:bg-[#302e2a]"
            aria-label="Toggle sidebar"
            aria-expanded={sidebarId ? Boolean(sidebarOpen) : undefined}
            aria-controls={sidebarId}
          >
            <MenuIcon className="h-5 w-5 transition-transform duration-200 group-hover:scale-105" />
          </button>

          <Link href="/" prefetch={false} className="flex min-h-11 min-w-0 items-center gap-3 rounded-lg">
            <div className="flex min-w-0 flex-col">
              <span className="truncate font-serif text-lg md:text-xl font-medium tracking-[0.08em] text-primary dark:text-stone-200 leading-none">
                ARGUMEND
              </span>
              <span className="truncate text-[10px] font-sans text-stone-600 dark:text-stone-400 leading-none mt-1 max-[420px]:hidden">
                Disagree better.
              </span>
            </div>
          </Link>

          {showBackToHero && onBackToHero && (
            <button
              onClick={onBackToHero}
              className="flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm text-stone-500 transition-colors hover:bg-stone-100/60 hover:text-stone-800 dark:text-stone-400 dark:hover:bg-[#302e2a] dark:hover:text-stone-200"
              aria-label="Home"
            >
              <Home className="h-3.5 w-3.5" strokeWidth={1.8} />
              <span>Home</span>
            </button>
          )}
        </div>

        {/* Center: View Toggle + Value Prop */}
        <div className="hidden items-center gap-4 md:flex">
          {viewToggle && (
            <div className="hidden md:block">
              {viewToggle}
            </div>
          )}
          <div
            className={`${
              viewToggle ? "hidden lg:block" : "hidden"
            } text-[13px] text-stone-500 dark:text-stone-400 italic font-serif`}
          >
            What would change your mind?
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex shrink-0 items-center gap-1 md:gap-2">
          <Link
            href="/analyze"
            prefetch={false}
            aria-label="Analyze text"
            className="flex items-center gap-1.5 px-3 py-2.5 min-h-[44px] text-rust-600 dark:text-rust-400 text-sm font-medium hover:text-rust-800 dark:hover:text-rust-300 hover:bg-rust-50/60 dark:hover:bg-rust-900/30 rounded-lg transition-colors"
          >
            <Brain className="h-3.5 w-3.5" strokeWidth={1.8} />
            <span className="hidden sm:inline">Analyze</span>
          </Link>

          <Link
            href="/how-it-works"
            prefetch={false}
            className="hidden lg:flex items-center gap-1.5 px-3 py-2.5 min-h-[44px] text-stone-500 dark:text-stone-400 text-sm hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
          >
            <HelpCircle className="h-3.5 w-3.5" strokeWidth={1.8} />
            <span>How it works</span>
          </Link>

          <button
            onClick={openSearch}
            className="flex items-center gap-1.5 px-3 py-2.5 min-h-[44px] text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
            aria-label="Search"
            type="button"
          >
            <Search className="h-3.5 w-3.5" strokeWidth={1.8} />
            <span className="hidden sm:inline text-sm">Search</span>
            <kbd className="hidden md:inline-flex h-5 items-center gap-0.5 rounded border border-stone-200 dark:border-[#3d3a36] bg-stone-50 dark:bg-[#252420] px-1.5 font-mono text-[10px] text-muted dark:text-stone-400">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>

          <a
            href="https://github.com/amirhjalali/Argumend"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3 py-2.5 min-h-[44px] text-stone-500 dark:text-stone-400 text-sm hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.8} />
            <span>Contribute</span>
          </a>

          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          {authEntryEnabled && (
            <div className="ml-1 border-l border-stone-200/60 pl-2 dark:border-[#3d3a36]/60">
              <UserMenu />
            </div>
          )}
        </div>
      </header>

      {hasOpenedSearch && <SearchModal isOpen={searchOpen} onClose={closeSearch} />}
    </>
  );
}
