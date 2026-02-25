"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { LogIn, LogOut, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function UserMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") {
    return (
      <div className="h-8 w-8 animate-pulse rounded-full bg-stone-200" />
    );
  }

  if (!session) {
    return (
      <button
        onClick={() => signIn("google")}
        className="flex items-center gap-1.5 px-3 py-2.5 min-h-[44px] text-stone-500 text-sm hover:text-stone-800 hover:bg-stone-100/60 rounded-lg transition-colors"
        aria-label="Sign in with Google"
      >
        <LogIn className="h-4 w-4" strokeWidth={1.8} />
        <span className="hidden sm:inline">Sign in</span>
      </button>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg px-2 py-2 min-h-[44px] hover:bg-stone-100/60 transition-colors"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`User menu for ${session.user?.name || "user"}`}
      >
        {session.user?.image ? (
          <img
            src={session.user.image}
            alt={`${session.user.name || "User"} avatar`}
            className="h-7 w-7 rounded-full"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-200">
            <User className="h-4 w-4 text-stone-500" />
          </div>
        )}
        <span className="hidden sm:block text-sm text-stone-600 max-w-[120px] truncate">
          {session.user?.name?.split(" ")[0]}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-48 rounded-lg border border-stone-200 bg-white py-1 shadow-lg" role="menu" aria-label="User menu">
          <div className="px-3 py-2 border-b border-stone-100">
            <p className="text-sm font-medium text-stone-700 truncate">
              {session.user?.name}
            </p>
            <p className="text-xs text-stone-500 truncate">
              {session.user?.email}
            </p>
          </div>
          <button
            onClick={() => signOut()}
            className="flex w-full items-center gap-2 px-3 py-2.5 min-h-[44px] text-sm text-stone-500 hover:bg-stone-50 hover:text-stone-700"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
