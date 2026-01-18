"use client";

import Link from "next/link";
import { Menu, Search } from "lucide-react";

interface TopBarProps {
  onMenuClick?: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between bg-gradient-to-b from-[#fffcf8] to-[#faf7f2] px-6 py-3 text-primary border-b border-[#e8e0d4] shadow-[0_1px_3px_rgba(30,24,18,0.04),0_4px_12px_rgba(30,24,18,0.02)]">
      {/* Left: Menu + Logo */}
      <div className="flex items-center gap-5">
        <button
          onClick={onMenuClick}
          className="group relative p-2 -m-2 rounded-lg text-[#5a5347] transition-all duration-200 hover:text-primary hover:bg-[#f0ebe3]"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5 transition-transform duration-200 group-hover:scale-105" strokeWidth={2} />
        </button>

        <Link href="/" className="group flex items-center gap-3">
          <div className="flex flex-col">
            <span className="font-serif text-xl font-medium tracking-[0.12em] text-primary leading-none">
              ARGUMEND
            </span>
            <span className="text-[9px] font-sans font-medium uppercase tracking-[0.25em] text-[#9a918a] leading-none mt-0.5">
              Beyond Winning
            </span>
          </div>
        </Link>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button
          className="group flex items-center gap-2 rounded-lg px-3 py-2 text-[#6d645c] transition-all duration-200 hover:bg-[#f0ebe3] hover:text-primary"
          aria-label="Search"
          type="button"
        >
          <Search className="h-4 w-4" strokeWidth={2} />
          <span className="hidden sm:inline text-sm font-medium">Search</span>
          <kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border border-[#ddd6cc] bg-[#f8f5f0] px-1.5 font-mono text-[10px] font-medium text-[#8a8279]">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </div>
    </header>
  );
}
