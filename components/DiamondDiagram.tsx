"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Scale, Swords, Shield, Landmark } from "lucide-react";

interface Point {
  x: number;
  y: number;
}

export function DiamondDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const skepticRef = useRef<HTMLDivElement>(null);
  const proponentRef = useRef<HTMLDivElement>(null);
  const cruxRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<
    { from: Point; to: Point }[]
  >([]);

  const computeLines = useCallback(() => {
    const container = containerRef.current;
    const meta = metaRef.current;
    const skeptic = skepticRef.current;
    const proponent = proponentRef.current;
    const crux = cruxRef.current;
    if (!container || !meta || !skeptic || !proponent || !crux) return;

    const cRect = container.getBoundingClientRect();

    // Helper: get the bounding rect of a node relative to the container
    const rel = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return {
        top: r.top - cRect.top,
        bottom: r.bottom - cRect.top,
        left: r.left - cRect.left,
        right: r.right - cRect.left,
        cx: (r.left + r.right) / 2 - cRect.left,
        cy: (r.top + r.bottom) / 2 - cRect.top,
      };
    };

    const m = rel(meta);
    const s = rel(skeptic);
    const p = rel(proponent);
    const cr = rel(crux);

    setLines([
      // Meta bottom-center -> Skeptic top-center
      { from: { x: m.cx, y: m.bottom }, to: { x: s.cx, y: s.top } },
      // Meta bottom-center -> Proponent top-center
      { from: { x: m.cx, y: m.bottom }, to: { x: p.cx, y: p.top } },
      // Skeptic bottom-center -> Crux top-center
      { from: { x: s.cx, y: s.bottom }, to: { x: cr.cx, y: cr.top } },
      // Proponent bottom-center -> Crux top-center
      { from: { x: p.cx, y: p.bottom }, to: { x: cr.cx, y: cr.top } },
    ]);
  }, []);

  useEffect(() => {
    // Initial compute after layout
    const timer = setTimeout(computeLines, 50);

    // Recompute on resize
    const onResize = () => computeLines();
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, [computeLines]);

  return (
    <div
      ref={containerRef}
      className="relative bg-gradient-to-br from-[#f8f5ef] to-[#fefcf9] rounded-2xl border border-stone-200/60 p-8 md:p-12 overflow-hidden"
    >
      {/* Connection lines — dynamically positioned */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <defs>
          <marker
            id="arrowhead-diamond"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#b05434" />
          </marker>
        </defs>
        {lines.map((line, i) => (
          <line
            key={i}
            x1={line.from.x}
            y1={line.from.y}
            x2={line.to.x}
            y2={line.to.y}
            stroke="#b05434"
            strokeWidth="2"
            strokeDasharray="4 4"
            markerEnd="url(#arrowhead-diamond)"
          />
        ))}
      </svg>

      {/* Nodes */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Meta Node */}
        <div className="flex flex-col items-center">
          <div
            ref={metaRef}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-deep to-deep-dark text-white font-semibold shadow-lg"
          >
            <div className="flex items-center gap-2">
              <Landmark className="h-4 w-4" />
              <span>Meta Claim</span>
            </div>
          </div>
          <p className="mt-2 text-xs text-secondary italic">
            The central topic
          </p>
        </div>

        {/* Skeptic and Proponent Row */}
        <div className="flex items-center justify-center gap-8 md:gap-24 w-full">
          <div className="flex flex-col items-center">
            <div
              ref={skepticRef}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5A3C] to-[#A67350] text-white font-semibold shadow-md"
            >
              <div className="flex items-center gap-2">
                <Swords className="h-4 w-4" />
                <span>Skeptic</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-secondary italic text-center">
              Strongest objection
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div
              ref={proponentRef}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rust-500 to-rust-600 text-white font-semibold shadow-md"
            >
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Proponent</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-secondary italic text-center">
              Best response
            </p>
          </div>
        </div>

        {/* Crux Node */}
        <div className="flex flex-col items-center">
          <div
            ref={cruxRef}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#a23b3b] to-[#c45c5c] text-white font-bold shadow-lg ring-2 ring-[#a23b3b]/20 ring-offset-2"
          >
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4" />
              <span>Crux</span>
            </div>
          </div>
          <p className="mt-2 text-xs text-crux font-medium">
            What would settle this?
          </p>
        </div>
      </div>
    </div>
  );
}
