"use client";

import Link from "next/link";
import { Menu, Search, HelpCircle, ExternalLink } from "lucide-react";

interface TopBarProps {
  onMenuClick?: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between bg-[#fdfaf6] px-4 md:px-6 py-3 text-primary border-b border-stone-200">
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
      </div>

      {/* Center: Value Prop (hidden on mobile) */}
      <div className="hidden lg:block text-[13px] text-stone-400 italic font-serif">
        What would change your mind?
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1 md:gap-2">
        <Link
          href="/how-it-works"
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-stone-500 text-sm hover:text-stone-800 transition-colors"
        >
          <HelpCircle className="h-3.5 w-3.5" strokeWidth={1.8} />
          <span>How it works</span>
        </Link>

        <button
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
      </div>
    </header>
  );
}
