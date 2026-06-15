"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";
import { BookOpen, AlignLeft } from "lucide-react";

export type ReadGraphView = "read" | "graph";

const PREF_KEY = "argumend.preferredView";

export function ReadGraphToggle({ current }: { current: ReadGraphView }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(PREF_KEY, current);
    } catch {
      // ignore
    }
  }, [current]);

  const switchTo = useCallback(
    (next: ReadGraphView) => {
      if (next === current) return;
      const params = new URLSearchParams(searchParams.toString());
      if (next === "graph") {
        params.set("view", "graph");
      } else {
        params.delete("view");
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [current, pathname, router, searchParams]
  );

  return (
    <div
      role="tablist"
      aria-label="View mode"
      className="inline-flex items-center gap-1 rounded-full border border-stone-200/70 dark:border-[#3d3a36] bg-white/80 dark:bg-[#252420] p-1 shadow-sm backdrop-blur"
    >
      <button
        role="tab"
        type="button"
        aria-selected={current === "read"}
        onClick={() => switchTo("read")}
        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors ${
          current === "read"
            ? "bg-deep text-white"
            : "text-secondary hover:text-primary"
        }`}
      >
        <BookOpen className="h-3.5 w-3.5" aria-hidden />
        Read
      </button>
      <button
        role="tab"
        type="button"
        aria-selected={current === "graph"}
        onClick={() => switchTo("graph")}
        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors ${
          current === "graph"
            ? "bg-deep text-white"
            : "text-secondary hover:text-primary"
        }`}
      >
        <AlignLeft className="h-3.5 w-3.5" aria-hidden />
        Detailed
      </button>
    </div>
  );
}

export function readPreferredView(): ReadGraphView | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(PREF_KEY);
    return v === "graph" || v === "read" ? v : null;
  } catch {
    return null;
  }
}
