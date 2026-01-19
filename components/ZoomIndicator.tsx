"use client";

import { useReactFlow, useViewport } from "@xyflow/react";
import { Minus, Plus, Maximize2 } from "lucide-react";

export function ZoomIndicator() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const { zoom } = useViewport();

  const zoomPercent = Math.round(zoom * 100);

  return (
    <div className="absolute top-4 left-4 z-50 flex items-center gap-1 rounded-xl border-2 border-[#c9b896] bg-gradient-to-br from-[#f8f3e8] to-[#f0ebe0] p-1 shadow-md">
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

      <div className="mx-1 h-6 w-px bg-stone-300" />

      <button
        onClick={() => fitView({ padding: 0.2, duration: 500 })}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-stone-200 hover:text-primary"
        title="Fit to view"
      >
        <Maximize2 className="h-4 w-4" />
      </button>
    </div>
  );
}
