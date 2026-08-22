"use client";

import { LogIn } from "lucide-react";
import Link from "next/link";

export function UserMenu() {
  return (
    <Link
      href="/auth/signin"
      className="flex min-h-[44px] items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm text-stone-500 transition-colors hover:bg-stone-100/60 hover:text-stone-800 dark:text-stone-400 dark:hover:bg-[var(--bg-muted)] dark:hover:text-stone-200"
      aria-label="Sign in"
    >
      <LogIn className="h-4 w-4" strokeWidth={1.8} />
      <span className="hidden sm:inline">Sign in</span>
    </Link>
  );
}
