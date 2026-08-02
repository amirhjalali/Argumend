"use client";

import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";

export function calculateReadingProgress(
  scrollTop: number,
  scrollHeight: number,
  clientHeight: number,
): number {
  const scrollableDistance = scrollHeight - clientHeight;
  if (scrollableDistance <= 0) return 0;
  return Math.min(Math.max(scrollTop / scrollableDistance, 0), 1);
}

function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // AppShell's main can own scrolling when its flex parent is height-bound,
    // but long article routes currently grow the document instead. Detect the
    // element that is actually scrollable rather than assuming either model.
    const main = document.getElementById("main-content");
    const scrollContainer =
      main && main.scrollHeight > main.clientHeight ? main : null;
    const scrollTarget: HTMLElement | Window = scrollContainer ?? window;

    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = scrollContainer?.scrollTop ?? window.scrollY;
        const scrollHeight =
          scrollContainer?.scrollHeight ?? document.documentElement.scrollHeight;
        const clientHeight = scrollContainer?.clientHeight ?? window.innerHeight;
        setProgress(
          calculateReadingProgress(scrollTop, scrollHeight, clientHeight),
        );
        rafRef.current = 0;
      });
    };

    scrollTarget.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      scrollTarget.removeEventListener("scroll", handleScroll);
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

export function BlogArticleClient({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      <ReadingProgressBar />
      {children}
    </AppShell>
  );
}
