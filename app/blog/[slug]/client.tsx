"use client";

import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";

function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
        setProgress(scrolled);
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

export function BlogArticleClient({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      <ReadingProgressBar />
      {children}
    </AppShell>
  );
}
