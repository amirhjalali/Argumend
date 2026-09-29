"use client";

import { useEffect, useRef, useState } from "react";

export function calculateReadingProgress(
  scrollTop: number,
  scrollHeight: number,
  clientHeight: number,
): number {
  const scrollableDistance = scrollHeight - clientHeight;
  if (scrollableDistance <= 0) return 0;
  return Math.min(Math.max(scrollTop / scrollableDistance, 0), 1);
}

/** A 3px bar at the top of the window that fills as the essay is read. */
export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // The window is the scroll container on every page (the shell no longer
    // scrolls inside <main>), so progress is plain window scroll.
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setProgress(
          calculateReadingProgress(
            window.scrollY,
            document.documentElement.scrollHeight,
            window.innerHeight,
          ),
        );
        rafRef.current = 0;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[3px] bg-deep-light z-50"
      style={{
        width: `${progress * 100}%`,
        transition: "width 150ms linear",
        willChange: "width",
      }}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    />
  );
}
