"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface HeroSpecimenProps {
  claimCount: number;
  acceptedCount: number;
  openCount: number;
  cruxCount: number;
}

/**
 * Interactive SVG specimen sitting beside the hero copy on desktop (and neatly
 * beneath the actions on phones). Lets a first-time visitor toggle between
 * "The Feed" (tangled noise) and "The Crux" (agreed teal ground + contested
 * rust strands gathered cleanly through crimson crux knots) before scrolling.
 */
export function HeroSpecimen({
  claimCount,
  acceptedCount,
  openCount,
  cruxCount,
}: HeroSpecimenProps) {
  const [mode, setMode] = useState<"tangle" | "crux">("crux");
  const reducedMotion = useReducedMotion();
  const isCrux = mode === "crux";

  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const };

  // Five agreed strands (teal) — knotted in Feed mode, calm horizontal rails in Crux mode.
  const agreedPaths = [
    {
      tangle: "M 24 62 C 110 210, 195 28, 285 162 C 350 250, 410 74, 496 142",
      crux: "M 24 224 C 145 224, 345 224, 496 224",
    },
    {
      tangle: "M 24 198 C 118 46, 212 238, 304 92 C 378 24, 428 214, 496 86",
      crux: "M 24 238 C 145 238, 345 238, 496 238",
    },
    {
      tangle: "M 24 128 C 96 254, 188 76, 266 196 C 344 268, 418 52, 496 194",
      crux: "M 24 252 C 145 252, 345 252, 496 252",
    },
    {
      tangle: "M 24 244 C 122 110, 206 38, 294 218 C 362 128, 422 246, 496 122",
      crux: "M 24 266 C 145 266, 345 266, 496 266",
    },
  ];

  // Six contested strands (rust/brown) — wild tangle in Feed mode, gathered through 3 crimson cruxes in Crux mode.
  const contestedPaths = [
    {
      tangle: "M 24 44 C 132 184, 174 264, 272 78 C 358 22, 412 240, 496 64",
      crux: "M 24 54 C 120 54, 160 66, 260 66 C 360 66, 400 44, 496 44",
      tone: "rust",
    },
    {
      tangle: "M 24 94 C 102 18, 218 224, 292 48 C 364 192, 424 114, 496 224",
      crux: "M 24 82 C 120 82, 160 66, 260 66 C 360 66, 400 84, 496 84",
      tone: "brown",
    },
    {
      tangle: "M 24 162 C 140 28, 198 188, 308 254 C 378 90, 428 42, 496 168",
      crux: "M 24 114 C 120 114, 160 122, 260 122 C 360 122, 400 108, 496 108",
      tone: "rust",
    },
    {
      tangle: "M 24 216 C 98 92, 224 24, 278 156 C 344 264, 412 138, 496 48",
      crux: "M 24 136 C 120 136, 160 122, 260 122 C 360 122, 400 138, 496 138",
      tone: "brown",
    },
    {
      tangle: "M 24 74 C 142 252, 202 108, 316 144 C 376 238, 428 78, 496 248",
      crux: "M 24 164 C 120 164, 160 176, 260 176 C 360 176, 400 162, 496 162",
      tone: "rust",
    },
    {
      tangle: "M 24 264 C 114 148, 194 266, 286 112 C 354 34, 424 192, 496 102",
      crux: "M 24 188 C 120 188, 160 176, 260 176 C 360 176, 400 190, 496 190",
      tone: "brown",
    },
  ] as const;

  const cruxPins = [
    { y: 66, label: "Crux 1" },
    { y: 122, label: "Crux 2" },
    { y: 176, label: "Crux 3" },
  ];

  return (
    <div className="rounded-xl border border-divider bg-card/85 p-4 shadow-sm backdrop-blur-xs dark:bg-card/90 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-divider pb-3">
        <div>
          <p className="label-caps">Live specimen · AI &amp; jobs</p>
          <p className="mt-0.5 font-serif text-sm text-secondary dark:text-stone-400">
            {isCrux
              ? `${claimCount} claims pulled apart into ${acceptedCount} agreed & ${cruxCount} cruxes`
              : `${claimCount} claims tangled together, as they arrive in a thread`}
          </p>
        </div>

        <div
          role="group"
          aria-label="Argument view mode"
          className="inline-flex rounded-full border border-divider bg-canvas p-0.5 font-sans text-xs"
        >
          <button
            type="button"
            onClick={() => setMode("tangle")}
            aria-pressed={!isCrux}
            className={`rounded-full px-3 py-1.5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
              !isCrux
                ? "bg-primary text-canvas"
                : "text-secondary dark:text-stone-400 hover:text-primary dark:hover:text-stone-200"
            }`}
          >
            The Feed
          </button>
          <button
            type="button"
            onClick={() => setMode("crux")}
            aria-pressed={isCrux}
            className={`rounded-full px-3 py-1.5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
              isCrux
                ? "bg-primary text-canvas"
                : "text-secondary dark:text-stone-400 hover:text-primary dark:hover:text-stone-200"
            }`}
          >
            The Crux
          </button>
        </div>
      </div>

      <div className="relative mt-3 overflow-hidden rounded-lg border border-divider/70 bg-canvas/80 px-2 py-2">
        <svg
          viewBox="0 0 520 296"
          className="h-auto w-full"
          role="img"
          aria-label={
            isCrux
              ? `Diagram showing ${acceptedCount} agreed claims laid flat in teal and ${openCount} contested claims gathered cleanly through ${cruxCount} crimson crux points.`
              : `Diagram showing ${claimCount} claims tangled together in a chaotic knot.`
          }
        >
          {/* Faint drafting grid lines */}
          <line x1="260" y1="18" x2="260" y2="205" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="3 4" />
          <line x1="24" y1="208" x2="496" y2="208" stroke="currentColor" strokeOpacity="0.12" />

          {/* Agreed strands (deep teal) */}
          {agreedPaths.map((strand, index) => (
            <motion.path
              key={`agreed-${index}`}
              initial={false}
              animate={{
                d: isCrux ? strand.crux : strand.tangle,
                strokeOpacity: isCrux ? 0.85 : 0.45,
              }}
              transition={transition}
              fill="none"
              stroke="rgb(var(--thread-agreed))"
              strokeWidth={isCrux ? 1.8 : 1.5}
              strokeLinecap="round"
            />
          ))}

          {/* Contested strands (rust & warm brown) */}
          {contestedPaths.map((strand, index) => (
            <motion.path
              key={`contested-${index}`}
              initial={false}
              animate={{
                d: isCrux ? strand.crux : strand.tangle,
                strokeOpacity: isCrux ? 0.82 : 0.62,
              }}
              transition={transition}
              fill="none"
              stroke={strand.tone === "rust" ? "rgb(var(--thread-contested))" : "rgb(var(--thread-knot))"}
              strokeWidth={1.7}
              strokeLinecap="round"
            />
          ))}

          {/* Crimson crux pins appearing when untangled */}
          {cruxPins.map((pin) => (
            <motion.g
              key={pin.label}
              initial={false}
              animate={{
                opacity: isCrux ? 1 : 0,
                scale: isCrux ? 1 : 0.4,
              }}
              transition={transition}
              style={{ transformOrigin: `260px ${pin.y}px` }}
            >
              <circle cx="260" cy={pin.y} r="10" fill="rgb(var(--thread-crux))" fillOpacity="0.14" />
              <circle cx="260" cy={pin.y} r="4.5" fill="rgb(var(--thread-crux))" />
            </motion.g>
          ))}
        </svg>

        {/* Crisp non-overlapping caption bar */}
        <div className="mt-1 flex flex-wrap items-center justify-between gap-2 border-t border-divider/60 px-2 pt-2 font-sans text-[0.75rem] text-secondary dark:text-stone-400">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-deep dark:bg-accent-text" aria-hidden="true" />
            {acceptedCount} not in dispute
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rust-600" aria-hidden="true" />
            {openCount} open
          </span>
          <span className="inline-flex items-center gap-1.5 font-medium text-crux-text">
            <span className="h-2 w-2 rounded-full bg-crux" aria-hidden="true" />
            {cruxCount} cruxes
          </span>
        </div>
      </div>
    </div>
  );
}
