"use client";

import { useMemo } from "react";
import type { Pillar } from "@/types/logic";

/**
 * MiniGraphPreview
 *
 * A lightweight, NON-interactive preview of the argument map shape, shown at
 * the top of the mobile argument list so phone users get a glimpse of the
 * product's signature graph before the accordion.
 *
 * Pure inline SVG + divs — no React Flow, no deps, SSR-safe, offline-safe.
 * Static by design (respects prefers-reduced-motion implicitly: nothing moves).
 */

const VIEWBOX_W = 320;
const ROOT_X = VIEWBOX_W / 2;
const ROOT_Y = 26;
const PILLAR_Y = 92;
const MAX_PILLARS = 5;

// Parchment palette (see CLAUDE.md design system)
const TEAL = "#4f7b77"; // root accent
const STONE_CONNECTOR = "#cdc6bb"; // stone connectors
const RUST = "#C4613C"; // proponent-leaning pillar
const STONE_DOT = "#a39b8e"; // neutral / skeptic-leaning pillar

/** Decide a dot color from a pillar's evidence balance. */
function pillarTint(pillar: Pillar): string {
  const evidence = pillar.evidence ?? [];
  if (evidence.length === 0) return STONE_DOT;
  const forCount = evidence.filter((e) => e.side === "for").length;
  const againstCount = evidence.length - forCount;
  return forCount >= againstCount ? RUST : STONE_DOT;
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + "…";
}

export function MiniGraphPreview({
  topicTitle,
  pillars,
  onTap,
}: {
  topicTitle: string;
  pillars: Pillar[];
  onTap?: () => void;
}) {
  const shown = useMemo(() => pillars.slice(0, MAX_PILLARS), [pillars]);

  if (shown.length === 0) return null;

  // Evenly space pillar nodes across the width with padding on each side.
  const padX = 30;
  const span = VIEWBOX_W - padX * 2;
  const step = shown.length > 1 ? span / (shown.length - 1) : 0;
  const xs = shown.map((_, i) =>
    shown.length > 1 ? padX + step * i : ROOT_X,
  );

  const interactive = typeof onTap === "function";

  const content = (
    <svg
      viewBox={`0 0 ${VIEWBOX_W} 140`}
      width="100%"
      height="140"
      role="img"
      aria-label={`Argument map preview for "${topicTitle}": one central claim connected to ${pillars.length} key arguments.`}
      className="block"
    >
      {/* Connectors (drawn first, behind nodes) */}
      {xs.map((x, i) => (
        <path
          key={`edge-${i}`}
          d={`M ${ROOT_X} ${ROOT_Y + 11} C ${ROOT_X} ${
            (ROOT_Y + PILLAR_Y) / 2
          }, ${x} ${(ROOT_Y + PILLAR_Y) / 2}, ${x} ${PILLAR_Y - 7}`}
          fill="none"
          stroke={STONE_CONNECTOR}
          strokeWidth={1.5}
        />
      ))}

      {/* Root node (topic / central claim) */}
      <circle
        cx={ROOT_X}
        cy={ROOT_Y}
        r={11}
        fill="#faf8f5"
        stroke={TEAL}
        strokeWidth={2.5}
      />
      <circle cx={ROOT_X} cy={ROOT_Y} r={4} fill={TEAL} />

      {/* Pillar nodes + labels */}
      {shown.map((pillar, i) => {
        const x = xs[i];
        const tint = pillarTint(pillar);
        return (
          <g key={pillar.id}>
            <circle cx={x} cy={PILLAR_Y} r={6.5} fill={tint} opacity={0.92} />
            <circle cx={x} cy={PILLAR_Y} r={6.5} fill="none" stroke="#faf8f5" strokeWidth={1.5} />
            <text
              x={x}
              y={PILLAR_Y + 22}
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="var(--font-sans), system-ui, sans-serif"
              fill="#7a7068"
            >
              {truncate(pillar.title, 14)}
            </text>
          </g>
        );
      })}
    </svg>
  );

  return (
    <div className="rounded-xl border border-stone-200/60 dark:border-[var(--border-default)] bg-white/40 dark:bg-[#252420]/40 px-3 pt-3 pb-2">
      {interactive ? (
        <button
          type="button"
          onClick={onTap}
          aria-label="View the full argument list below"
          className="w-full block min-h-[44px] rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4f7b77]/50"
        >
          {content}
        </button>
      ) : (
        content
      )}
      <p className="text-center text-[11px] text-muted dark:text-stone-400 mt-0.5">
        Tap below to explore the argument map
      </p>
    </div>
  );
}
