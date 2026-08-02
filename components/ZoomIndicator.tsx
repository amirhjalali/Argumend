"use client";

import { useState, useEffect } from "react";
import { useReactFlow, useViewport } from "@xyflow/react";
import { Minus, Plus, Maximize2, Move } from "lucide-react";
import { GRAPH } from "@/lib/constants";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function ZoomIndicator() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const { zoom } = useViewport();
  const [showDragHint, setShowDragHint] = useState(false);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const zoomPercent = Math.round(zoom * 100);

  // Show "Drag to explore" hint once on first render, then fade away
  useEffect(() => {
    const hasSeenHint = sessionStorage.getItem("argumend-drag-hint");
    if (!hasSeenHint) {
      const showTimer = setTimeout(() => setShowDragHint(true), 1500);
      const hideTimer = setTimeout(() => {
        setShowDragHint(false);
        sessionStorage.setItem("argumend-drag-hint", "1");
      }, 6000);
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  return (
    <div className="absolute top-4 left-4 z-50">
      <div className="flex items-center gap-1 rounded-lg border border-stone-200/60 dark:border-[var(--border-default)] bg-[#fefcf9]/90 dark:bg-[var(--bg-card)]/90 backdrop-blur-sm p-1 shadow-[0_2px_8px_rgba(120,100,80,0.08)]">
        <button
          onClick={() => zoomOut()}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-secondary dark:text-stone-400 transition-colors hover:bg-stone-200 dark:hover:bg-[#302e2a] hover:text-primary dark:hover:text-stone-200"
          aria-label="Zoom out"
          title="Zoom out"
        >
          <Minus className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="min-w-[52px] px-2 text-center" role="status" aria-live="polite" aria-atomic="true" aria-label={`Zoom level: ${zoomPercent}%`}>
          <span className="font-mono text-xs font-semibold text-primary dark:text-stone-200" aria-hidden="true">
            {zoomPercent}%
          </span>
        </div>

        <button
          onClick={() => zoomIn()}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-secondary dark:text-stone-400 transition-colors hover:bg-stone-200 dark:hover:bg-[#302e2a] hover:text-primary dark:hover:text-stone-200"
          aria-label="Zoom in"
          title="Zoom in"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="mx-1 h-5 w-px bg-stone-200 dark:bg-[#3d3a36]" aria-hidden="true" />

        <button
          onClick={() =>
            fitView({
              padding: GRAPH.OVERVIEW_FIT_VIEW_PADDING,
              duration: reduceMotion ? 0 : GRAPH.TRANSITION_DURATION,
            })
          }
          className="flex h-8 w-8 items-center justify-center rounded-lg text-secondary dark:text-stone-400 transition-colors hover:bg-stone-200 dark:hover:bg-[#302e2a] hover:text-primary dark:hover:text-stone-200"
          aria-label="Fit to view"
          title="Fit to view"
        >
          <Maximize2 className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* One-time "Drag to explore" tooltip */}
      {showDragHint && (
        <div className="mt-2 flex items-center gap-2 rounded-lg bg-stone-800/90 px-3 py-2 text-xs text-white shadow-lg animate-fade-in" role="status" aria-live="polite">
          <Move className="h-3.5 w-3.5 text-stone-300" aria-hidden="true" />
          <span>Drag to pan, scroll to zoom</span>
        </div>
      )}
    </div>
  );
}
