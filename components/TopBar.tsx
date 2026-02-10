"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, Search, HelpCircle, ExternalLink, Home, Brain } from "lucide-react";
import { ViewToggle } from "./ViewToggle";
import { UserMenu } from "./UserMenu";
import { SearchModal } from "./SearchModal";

interface TopBarProps {
  onMenuClick?: () => void;
  showBackToHero?: boolean;
  onBackToHero?: () => void;
}

export function TopBar({ onMenuClick, showBackToHero, onBackToHero }: TopBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 flex w-full items-center justify-between bg-[#f4f1eb]/90 backdrop-blur-sm px-4 md:px-6 py-3 text-primary border-b border-stone-200/40">
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-3 md:gap-5">
          <button
            onClick={onMenuClick}
            className="group relative p-2 -m-2 rounded-lg text-[#5a5347] transition-all duration-200 hover:text-primary hover:bg-[#f0ebe3]"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5 transition-transform duration-200 group-hover:scale-105" strokeWidth={2} />
          </button>

          <Link href="/" className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="font-serif text-lg md:text-xl font-medium tracking-[0.08em] text-primary leading-none">
                ARGUMEND
              </span>
              <span className="text-[10px] font-sans text-stone-400 leading-none mt-1">
                Map the Truth
              </span>
            </div>
          </Link>

          {showBackToHero && onBackToHero && (
            <button
              onClick={onBackToHero}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-stone-500 text-sm hover:text-stone-800 hover:bg-stone-100/60 rounded-lg transition-colors"
            >
              <Home className="h-3.5 w-3.5" strokeWidth={1.8} />
              <span className="hidden sm:inline">Home</span>
            </button>
          )}
        </div>

        {/* Center: View Toggle + Value Prop */}
        <div className="flex items-center gap-4">
          <ViewToggle />
          <div className="hidden xl:block text-[13px] text-stone-400 italic font-serif">
            What would change your mind?
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 md:gap-2">
          <Link
            href="/analyze"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-rust-600 text-sm font-medium hover:text-rust-800 hover:bg-rust-50/60 rounded-lg transition-colors"
          >
            <Brain className="h-3.5 w-3.5" strokeWidth={1.8} />
            <span className="hidden sm:inline">Analyze</span>
          </Link>

          <Link
            href="/how-it-works"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-stone-500 text-sm hover:text-stone-800 transition-colors"
          >
            <HelpCircle className="h-3.5 w-3.5" strokeWidth={1.8} />
            <span>How it works</span>
          </Link>

          <button
            onClick={openSearch}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-stone-500 hover:text-stone-800 transition-colors"
            aria-label="Search"
            type="button"
          >
            <Search className="h-3.5 w-3.5" strokeWidth={1.8} />
            <span className="hidden sm:inline text-sm">Search</span>
            <kbd className="hidden md:inline-flex h-5 items-center gap-0.5 rounded border border-stone-200 bg-stone-50 px-1.5 font-mono text-[10px] text-stone-400">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>

          <a
            href="https://github.com/amirhjalali/Argumend"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-stone-500 text-sm hover:text-stone-800 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.8} />
            <span>Contribute</span>
          </a>

          <div className="ml-1 border-l border-stone-200/60 pl-2">
            <UserMenu />
          </div>
        </div>
      </header>

      <SearchModal isOpen={searchOpen} onClose={closeSearch} />
    </>
  );
}
