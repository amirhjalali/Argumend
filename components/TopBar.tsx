"use client";

import { LogIn, PenSquare, Search } from "lucide-react";
import { useState } from "react";

export function TopBar() {
  const [query, setQuery] = useState("");

  return (
    <header className="flex items-center justify-between border-b border-lw-border/70 bg-white/80 px-8 py-4 backdrop-blur-lg shadow-lw sticky top-0 z-30">
      <div className="flex items-baseline gap-4 text-xs uppercase tracking-[0.4em] text-secondary">
        <span className="text-sm font-semibold text-primary">ARGUMEND</span>
        <span className="tracking-[0.3em] text-muted">Evidence Atlas</span>
      </div>

      <div className="flex flex-1 items-center justify-end gap-4">
        <div className="relative w-1/2 min-w-[240px] max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search claims, authors, or tags"
            className="w-full rounded-full border border-lw-border/80 bg-white/70 py-2 pl-10 pr-4 text-sm text-primary placeholder:text-muted focus:border-accent-main focus:outline-none focus:ring-0"
          />
        </div>

        <button className="inline-flex items-center gap-2 rounded-full border border-lw-border/80 px-4 py-2 text-sm font-semibold text-secondary transition hover:border-accent-main hover:text-primary">
          <PenSquare className="h-4 w-4" />
          Write
        </button>

        <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-accent-main">
          <LogIn className="h-4 w-4" />
          Log In
        </button>
      </div>
    </header>
  );
}

