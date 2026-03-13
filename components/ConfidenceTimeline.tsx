"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import type { TimelineEvent } from "@/lib/topicTimelines";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Interpolate between deep teal (#4f7b77) and rust (#C4613C) based on confidence */
function confidenceToColor(confidence: number): string {
  // High confidence = teal, low confidence = rust
  const t = confidence / 100;
  // Teal: rgb(79, 123, 119) — Rust: rgb(196, 97, 60)
  const r = Math.round(196 + (79 - 196) * t);
  const g = Math.round(97 + (123 - 97) * t);
  const b = Math.round(60 + (119 - 60) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

/** Create a smooth SVG path through points using Catmull-Rom to Bezier conversion */
function smoothPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return "";
  if (points.length === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  }

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    // Catmull-Rom to cubic Bezier
    const tension = 6; // Higher = smoother
    const cp1x = p1.x + (p2.x - p0.x) / tension;
    const cp1y = p1.y + (p2.y - p0.y) / tension;
    const cp2x = p2.x - (p3.x - p1.x) / tension;
    const cp2y = p2.y - (p3.y - p1.y) / tension;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return path;
}

/** Create the closed area path (line + bottom edge) */
function areaPath(
  points: { x: number; y: number }[],
  bottomY: number,
): string {
  const line = smoothPath(points);
  if (!line) return "";
  const first = points[0];
  const last = points[points.length - 1];
  return `${line} L ${last.x} ${bottomY} L ${first.x} ${bottomY} Z`;
}

// ---------------------------------------------------------------------------
// Chart Constants
// ---------------------------------------------------------------------------

const CHART_PADDING = { top: 24, right: 24, bottom: 44, left: 44 };
const DOT_RADIUS = 5;
const DOT_HOVER_RADIUS = 8;
const Y_TICKS = [0, 25, 50, 75, 100];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface ConfidenceTimelineProps {
  events: TimelineEvent[];
  topicTitle?: string;
}

export function ConfidenceTimeline({ events, topicTitle }: ConfidenceTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 320 });

  // Responsive sizing
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        // Smaller height on mobile
        const h = w < 500 ? 260 : 320;
        setDimensions({ width: w, height: h });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const sortedEvents = useMemo(
    () => [...events].sort((a, b) => a.year - b.year),
    [events],
  );

  // Calculate chart area
  const chartLeft = CHART_PADDING.left;
  const chartRight = dimensions.width - CHART_PADDING.right;
  const chartTop = CHART_PADDING.top;
  const chartBottom = dimensions.height - CHART_PADDING.bottom;
  const chartWidth = chartRight - chartLeft;
  const chartHeight = chartBottom - chartTop;

  const minYear = sortedEvents[0]?.year ?? 1900;
  const maxYear = sortedEvents[sortedEvents.length - 1]?.year ?? 2025;
  const yearSpan = maxYear - minYear || 1;

  // Map data to pixel coordinates
  const points = useMemo(
    () =>
      sortedEvents.map((ev) => ({
        x: chartLeft + ((ev.year - minYear) / yearSpan) * chartWidth,
        y: chartTop + (1 - ev.confidence / 100) * chartHeight,
      })),
    [sortedEvents, chartLeft, chartTop, chartWidth, chartHeight, minYear, yearSpan],
  );

  const linePath = useMemo(() => smoothPath(points), [points]);
  const fillPath = useMemo(() => areaPath(points, chartBottom), [points, chartBottom]);

  // Year tick labels — pick a sensible subset
  const yearTicks = useMemo(() => {
    if (sortedEvents.length <= 8) {
      return sortedEvents.map((e) => e.year);
    }
    // Show first, last, and roughly evenly spaced
    const step = Math.ceil(sortedEvents.length / 6);
    const ticks: number[] = [];
    for (let i = 0; i < sortedEvents.length; i += step) {
      ticks.push(sortedEvents[i].year);
    }
    if (ticks[ticks.length - 1] !== maxYear) ticks.push(maxYear);
    return ticks;
  }, [sortedEvents, maxYear]);

  // Calculate the total path length for animation
  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [linePath]);

  // Click outside to dismiss tooltip
  const handleContainerClick = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest("[data-timeline-dot]")) {
        setHoveredIndex(null);
      }
    },
    [],
  );

  // Gradient definition ID
  const gradientId = `confidence-gradient-${useMemo(() => Math.random().toString(36).slice(2, 8), [])}`;
  const areaGradientId = `area-gradient-${gradientId}`;

  return (
    <div
      ref={containerRef}
      className="w-full"
      onClick={handleContainerClick}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="w-full"
        style={{ height: dimensions.height }}
        role="img"
        aria-label={`Confidence timeline chart${topicTitle ? ` for ${topicTitle}` : ""}`}
      >
        <defs>
          {/* Line gradient based on confidence */}
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            {sortedEvents.map((ev, i) => (
              <stop
                key={i}
                offset={`${(i / Math.max(sortedEvents.length - 1, 1)) * 100}%`}
                stopColor={confidenceToColor(ev.confidence)}
              />
            ))}
          </linearGradient>

          {/* Area fill gradient (vertical fade) */}
          <linearGradient id={areaGradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4f7b77" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#4f7b77" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Y-axis grid lines */}
        {Y_TICKS.map((tick) => {
          const y = chartTop + (1 - tick / 100) * chartHeight;
          return (
            <g key={tick}>
              <line
                x1={chartLeft}
                y1={y}
                x2={chartRight}
                y2={y}
                stroke="#d6d3ce"
                strokeWidth={tick === 0 ? 1 : 0.5}
                strokeDasharray={tick === 0 ? "none" : "4 4"}
                opacity={0.6}
              />
              <text
                x={chartLeft - 8}
                y={y + 4}
                textAnchor="end"
                className="fill-stone-400"
                fontSize={11}
                fontFamily="ui-monospace, SFMono-Regular, monospace"
              >
                {tick}%
              </text>
            </g>
          );
        })}

        {/* X-axis year labels */}
        {yearTicks.map((year) => {
          const x = chartLeft + ((year - minYear) / yearSpan) * chartWidth;
          return (
            <text
              key={year}
              x={x}
              y={chartBottom + 24}
              textAnchor="middle"
              className="fill-stone-400"
              fontSize={11}
              fontFamily="ui-monospace, SFMono-Regular, monospace"
            >
              {year}
            </text>
          );
        })}

        {/* Area fill under the line */}
        {isInView && fillPath && (
          <motion.path
            d={fillPath}
            fill={`url(#${areaGradientId})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          />
        )}

        {/* Animated line */}
        {linePath && (
          <path
            ref={pathRef}
            d={linePath}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={
              isInView && pathLength > 0
                ? {
                    strokeDasharray: pathLength,
                    strokeDashoffset: 0,
                    transition: "stroke-dashoffset 1.5s ease-out",
                  }
                : pathLength > 0
                  ? {
                      strokeDasharray: pathLength,
                      strokeDashoffset: pathLength,
                    }
                  : undefined
            }
          />
        )}

        {/* Data points */}
        {points.map((pt, i) => {
          const ev = sortedEvents[i];
          const isHovered = hoveredIndex === i;
          const color = confidenceToColor(ev.confidence);
          return (
            <g key={i}>
              {/* Invisible larger hit area */}
              <circle
                data-timeline-dot
                cx={pt.x}
                cy={pt.y}
                r={16}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setHoveredIndex(isHovered ? null : i);
                }}
              />
              {/* Visible dot */}
              {isInView && (
                <motion.circle
                  cx={pt.x}
                  cy={pt.y}
                  fill={color}
                  stroke="#faf8f5"
                  strokeWidth={2}
                  initial={{ r: 0 }}
                  animate={{ r: isHovered ? DOT_HOVER_RADIUS : DOT_RADIUS }}
                  transition={{
                    r: { type: "spring", stiffness: 300, damping: 20 },
                    default: { duration: 0.4, delay: 0.8 + i * 0.08 },
                  }}
                  className="cursor-pointer"
                  style={{ filter: isHovered ? "drop-shadow(0 2px 6px rgba(0,0,0,0.15))" : "none" }}
                />
              )}
            </g>
          );
        })}

        {/* Tooltip */}
        {hoveredIndex !== null && (() => {
          const ev = sortedEvents[hoveredIndex];
          const pt = points[hoveredIndex];
          const tooltipWidth = 220;
          const tooltipHeight = 58;

          // Position tooltip to avoid overflowing edges
          let tx = pt.x - tooltipWidth / 2;
          if (tx < 4) tx = 4;
          if (tx + tooltipWidth > dimensions.width - 4) tx = dimensions.width - tooltipWidth - 4;
          const above = pt.y - tooltipHeight - 16;
          const ty = above > 4 ? above : pt.y + 20;

          return (
            <g>
              {/* Connector line from dot to tooltip */}
              <line
                x1={pt.x}
                y1={ty > pt.y ? pt.y + DOT_HOVER_RADIUS + 2 : pt.y - DOT_HOVER_RADIUS - 2}
                x2={pt.x}
                y2={ty > pt.y ? ty : ty + tooltipHeight}
                stroke="#d6d3ce"
                strokeWidth={1}
                strokeDasharray="3 3"
                opacity={0.6}
              />
              {/* Tooltip background */}
              <rect
                x={tx}
                y={ty}
                width={tooltipWidth}
                height={tooltipHeight}
                rx={8}
                fill="#faf8f5"
                stroke="#d6d3ce"
                strokeWidth={1}
                filter="drop-shadow(0 2px 8px rgba(0,0,0,0.08))"
              />
              {/* Year and confidence */}
              <text
                x={tx + 12}
                y={ty + 18}
                fontSize={12}
                fontWeight={600}
                fontFamily="ui-monospace, SFMono-Regular, monospace"
                fill="#3d3a36"
              >
                {ev.year}
                <tspan
                  fill={confidenceToColor(ev.confidence)}
                  fontWeight={700}
                  dx={8}
                >
                  {ev.confidence}%
                </tspan>
              </text>
              {/* Event description — wrap text */}
              <foreignObject
                x={tx + 12}
                y={ty + 26}
                width={tooltipWidth - 24}
                height={tooltipHeight - 30}
              >
                <p
                  style={{
                    fontSize: "11px",
                    lineHeight: "1.35",
                    color: "#6d645c",
                    fontFamily: "Georgia, serif",
                    margin: 0,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical" as const,
                  }}
                >
                  {ev.event}
                </p>
              </foreignObject>
            </g>
          );
        })()}
      </svg>

      {/* Mobile: show selected event below chart */}
      {hoveredIndex !== null && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 px-4 py-3 rounded-lg border border-stone-200/60 bg-[#faf8f5] sm:hidden"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-semibold text-primary tabular-nums">
              {sortedEvents[hoveredIndex].year}
            </span>
            <span
              className="font-mono text-xs font-bold tabular-nums"
              style={{ color: confidenceToColor(sortedEvents[hoveredIndex].confidence) }}
            >
              {sortedEvents[hoveredIndex].confidence}%
            </span>
          </div>
          <p className="text-xs text-stone-600 font-serif leading-relaxed">
            {sortedEvents[hoveredIndex].event}
          </p>
        </motion.div>
      )}
    </div>
  );
}
