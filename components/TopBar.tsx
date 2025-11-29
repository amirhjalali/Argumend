"use client";

import { Menu, Search, MapPin, Settings } from "lucide-react";

interface TopBarProps {
  onMenuClick?: () => void;
}

const filters = ["Latest", "Enriched", "Recommended"] as const;
const activeFilter = "Enriched";

export function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#DCD3C3] bg-gradient-to-r from-[#F8F4EA]/95 via-[#F4EDE1]/95 to-[#F0E8D9]/95 shadow-[0_6px_24px_rgba(18,16,14,0.12)] backdrop-blur">
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E1D7C6] bg-white/80 text-[#5E5647] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8AE98] lg:hidden"
            aria-label="Toggle navigation"
          >
            <Menu className="h-5 w-5" strokeWidth={2.4} />
          </button>

          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-[0.75em] text-[#B0A58E]">
              LessWrong Style
            </span>
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-[24px] font-semibold tracking-[0.35em] text-[#1F1D1A]">
                ARGUMEND
              </span>
              <span className="text-xs font-semibold tracking-[0.45em] text-[#B0A58E]">LW</span>
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#8E8575] lg:flex">
          <span>Community</span>
          <span>Sequences</span>
          <span>Events</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E1D7C6] bg-white/80 text-[#5E5647] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8AE98]"
            aria-label="Search"
          >
            <Search className="h-5 w-5" strokeWidth={2.4} />
          </button>
          <button
            type="button"
            className="text-xs font-semibold uppercase tracking-[0.4em] text-[#6F6657] transition hover:text-[#1F1D1A]"
          >
            Login
          </button>
        </div>
      </div>

      <div className="px-5 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <button
                key={filter}
                type="button"
                className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] transition ${
                  isActive
                    ? "border-white/60 bg-white text-[#1F1D1A] shadow-[0_4px_14px_rgba(18,16,14,0.15)]"
                    : "border-transparent bg-transparent text-[#8E8575] hover:border-white/50 hover:bg-white/40 hover:text-[#1F1D1A]"
                }`}
              >
                {filter}
              </button>
            );
          })}

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E1D7C6] bg-white/70 text-[#6F6657] transition hover:bg-white"
              aria-label="Choose location"
            >
              <MapPin className="h-4 w-4" strokeWidth={2.2} />
            </button>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E1D7C6] bg-white/70 text-[#6F6657] transition hover:bg-white"
              aria-label="Feed settings"
            >
              <Settings className="h-4 w-4" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
