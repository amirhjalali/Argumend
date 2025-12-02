"use client";

import { Menu, Search } from "lucide-react";

interface TopBarProps {
  onMenuClick?: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center border-b border-[#e7dfd5] bg-[#fffbf5] px-8 py-4 text-[#1d1b17] shadow-[0_1px_0_rgba(30,24,18,0.08)]">
      <div className="flex items-center gap-6">
        <button
          onClick={onMenuClick}
          className="text-[#1f1d19] transition hover:text-black"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-6 w-6" strokeWidth={2.6} />
        </button>
        <span className="font-serif text-2xl tracking-[0.2em]">
          ARGUMEND
        </span>
      </div>

      <div className="ml-auto flex items-center gap-6">
        <button
          className="text-[#1f1d19] transition hover:text-black"
          aria-label="Search"
          type="button"
        >
          <Search className="h-5 w-5" strokeWidth={2.2} />
        </button>

      </div>
    </header>
  );
}
