"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  // Start false on the server AND the first client render so the hydrated
  // markup matches the server output (reading matchMedia during render caused
  // a hydration mismatch). Sync to the real value in an effect after mount.
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    function onChange(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }

    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export function useIsMobile(): boolean {
  return !useMediaQuery("(min-width: 768px)");
}
