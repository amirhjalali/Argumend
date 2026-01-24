"use client";

import { useState, useEffect } from "react";
import { useReactFlow, useViewport } from "@xyflow/react";
import { Minus, Plus, Maximize2, Move } from "lucide-react";

export function ZoomIndicator() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const { zoom } = useViewport();
  const [showDragHint, setShowDragHint] = useState(false);

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
      <div className="flex items-center gap-1 rounded-lg border border-stone-200/60 bg-[#fefcf9]/90 backdrop-blur-sm p-1 shadow-[0_2px_8px_rgba(120,100,80,0.08)]">
        <button
          onClick={() => zoomOut()}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-stone-200 hover:text-primary"
          title="Zoom out"
        >
          <Minus className="h-4 w-4" />
        </button>

        <div className="min-w-[52px] px-2 text-center">
          <span className="font-mono text-xs font-semibold text-primary">
            {zoomPercent}%
          </span>
        </div>

        <button
          onClick={() => zoomIn()}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-stone-200 hover:text-primary"
          title="Zoom in"
        >
          <Plus className="h-4 w-4" />
        </button>

        <div className="mx-1 h-5 w-px bg-stone-200" />

        <button
          onClick={() => fitView({ padding: 0.2, duration: 500 })}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-stone-200 hover:text-primary"
          title="Fit to view"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      {/* One-time "Drag to explore" tooltip */}
      {showDragHint && (
        <div className="mt-2 flex items-center gap-2 rounded-lg bg-stone-800/90 px-3 py-2 text-xs text-white shadow-lg animate-fade-in">
          <Move className="h-3.5 w-3.5 text-stone-300" />
          <span>Drag to pan, scroll to zoom</span>
        </div>
      )}
    </div>
  );
}
