"use client";

import { LogIn } from "lucide-react";

export function UserMenu() {
  // Auth disabled — no SessionProvider, no login yet.
  // Re-enable when Google OAuth is configured.
  return (
    <button
      className="flex items-center gap-1.5 px-3 py-2.5 min-h-[44px] text-stone-500 dark:text-stone-400 text-sm hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100/60 dark:hover:bg-[#302e2a] rounded-lg transition-colors opacity-50 cursor-default"
      aria-label="Sign in (coming soon)"
      disabled
    >
      <LogIn className="h-4 w-4" strokeWidth={1.8} />
      <span className="hidden sm:inline">Sign in</span>
    </button>
  );
}
