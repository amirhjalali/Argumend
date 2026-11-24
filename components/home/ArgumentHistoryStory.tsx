"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  POINTS,
  buildStrands,
  knotCenter,
  smoothstep,
  strandPoint,
  treeNode,
  wobble,
  type StrandCounts,
} from "@/components/home/threadGeometry";

export interface StoryChapter {
  readonly id: string;
  readonly number: string;
  readonly era: string;
  readonly plateTitle: string;
  readonly plateCaption: string;
  readonly title: string;
  readonly imageSrc?: string;
  readonly imageAlt?: string;
  readonly liveGraph?: StrandCounts & {
    readonly claimCount: number;
    readonly openLabel: string;
  };
  readonly marginNote: string;
}

interface ArgumentHistoryStoryProps {
  chapters: readonly StoryChapter[];
  /** Server-rendered prose bodies keyed 1:1 with `chapters`. */
  bodies: readonly React.ReactNode[];
}

/**
 * Scroll-driven editorial intro tracing 2,400 years of how humans argue —
 * from the Athenian Agora and the Royal Society to modern outrage feeds and
 * Argumend's crux-first method — with bespoke parchment watercolor plates and
 * an interactive live strand-untangling stage for Chapter 4.
 *
 * Desktop (`lg+`): left scrolling narrative column + right sticky plate theater.
 * Mobile (`<lg`): each chapter renders its own 16:9 plate cleanly above its copy.
 */
export function ArgumentHistoryStory({ chapters, bodies }: ArgumentHistoryStoryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const nodes = stepRefs.current.filter((node): node is HTMLElement => node !== null);
    if (nodes.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = Number((entry.target as HTMLElement).dataset.chapterIndex);
          if (Number.isFinite(idx)) setActiveIndex(idx);
        }
      },
      { rootMargin: "-36% 0px -42% 0px", threshold: 0.01 },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [chapters.length]);

  const scrollToChapter = (index: number) => {
    setActiveIndex(index);
    stepRefs.current[index]?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "center",
    });
  };

  const active = chapters[activeIndex] ?? chapters[0];
  const progressPct = chapters.length > 1 ? ((activeIndex + 1) / chapters.length) * 100 : 100;

  return (
    <section
      id="story"
      data-history-story=""
      aria-labelledby="story-intro-heading"
      className="border-t border-divider/80 py-14 md:py-20"
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14">
        <div className="max-w-2xl">
          <p className="label-caps">A brief history of disagreement</p>
          <h2
            id="story-intro-heading"
            className="mt-2 text-balance font-serif text-[2rem] font-normal leading-[1.1] tracking-[-0.015em] text-primary dark:text-stone-100 sm:text-[2.5rem]"
          >
            Why arguing stopped helping us think—and how to untangle it.
          </h2>
        </div>
        <a
          href="#home-crux"
          className="inline-flex min-h-11 items-center gap-1.5 font-sans text-sm text-secondary dark:text-stone-400 underline decoration-divider underline-offset-4 transition-colors hover:text-primary dark:hover:text-stone-200"
        >
          Skip intro to live maps
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-12">
        {/* Left column: scrolling narrative chapters */}
        <ol className="space-y-12 lg:space-y-0">
          {chapters.map((chapter, index) => {
            const isActive = index === activeIndex;
            return (
              <li
                key={chapter.id}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                data-chapter-step={chapter.id}
                data-chapter-index={index}
                className="flex flex-col justify-center lg:min-h-[60svh] lg:py-8"
              >
                {/* Mobile plate shown inline above each chapter */}
                <div className="mb-5 lg:hidden">
                  <ChapterPlateFrame chapter={chapter} reducedMotion={!!reducedMotion} compact />
                </div>

                <div
                  className={`border-l-2 pl-5 transition-colors duration-300 ${
                    isActive
                      ? "border-crux dark:border-crux"
                      : "border-divider/80 lg:opacity-70"
                  }`}
                >
                  <p className="label-caps flex items-center gap-2">
                    <span className="font-semibold text-crux-text">{chapter.number}</span>
                    <span aria-hidden="true">·</span>
                    <span>{chapter.era}</span>
                  </p>
                  <h3 className="mt-2 text-balance font-serif text-[1.6875rem] font-normal leading-[1.16] tracking-[-0.01em] text-primary dark:text-stone-100 sm:text-[2rem]">
                    {chapter.title}
                  </h3>
                  <div className="mt-3.5 space-y-3 font-serif text-[1.125rem] leading-[1.6] text-secondary dark:text-stone-300">
                    {bodies[index]}
                  </div>
                  <p className="mt-4 font-sans text-[0.8125rem] leading-relaxed text-muted dark:text-stone-400">
                    {chapter.marginNote}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Right column (desktop only): pinned theatrical parchment stage */}
        <div className="hidden lg:sticky lg:top-24 lg:block">
          <div className="overflow-hidden rounded-2xl border border-divider bg-card shadow-md">
            {/* Stage header bar + interactive chapter jump pills */}
            <div className="flex items-center justify-between gap-3 border-b border-divider bg-canvas/70 px-5 py-3">
              <div className="min-w-0">
                <p className="label-caps truncate">
                  {active.number} · {active.era}
                </p>
                <p className="truncate font-serif text-sm text-primary dark:text-stone-200">
                  {active.plateTitle}
                </p>
              </div>
              <nav aria-label="Story chapters" className="flex shrink-0 items-center gap-1.5">
                {chapters.map((chapter, index) => {
                  const selected = index === activeIndex;
                  return (
                    <button
                      key={chapter.id}
                      type="button"
                      onClick={() => scrollToChapter(index)}
                      aria-label={`Jump to chapter ${chapter.number}: ${chapter.plateTitle}`}
                      aria-current={selected ? "step" : undefined}
                      className={`flex h-7 w-7 items-center justify-center rounded-full font-sans text-[0.6875rem] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
                        selected
                          ? "bg-primary text-canvas shadow-xs"
                          : "border border-divider bg-card text-secondary dark:text-stone-400 hover:border-stone-400 hover:text-primary dark:hover:text-stone-100"
                      }`}
                    >
                      {chapter.number}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Crossfading illustrated plate or live untangle canvas */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-canvas">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={reducedMotion ? false : { opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reducedMotion ? undefined : { opacity: 0, scale: 0.99 }}
                  transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <ChapterVisual chapter={active} reducedMotion={!!reducedMotion} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Caption + hairline reading progress */}
            <div className="border-t border-divider bg-canvas/55 px-5 py-3.5">
              <p className="font-serif text-[0.9375rem] leading-snug text-secondary dark:text-stone-300">
                {active.plateCaption}
              </p>
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-divider/60" aria-hidden="true">
                <motion.div
                  className="h-full rounded-full bg-crux"
                  initial={false}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: reducedMotion ? 0 : 0.35, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between px-1 font-sans text-xs text-muted dark:text-stone-400">
            <span>Every plate reflects how Argumend structures a real map.</span>
            <Link
              href="/blog/how-argumend-evolved-and-how-we-map-a-topic"
              className="font-medium text-deep underline decoration-deep/30 underline-offset-4 transition-colors hover:decoration-deep dark:text-accent-text dark:decoration-accent-text/40"
            >
              Read our evolution essay
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChapterPlateFrame({
  chapter,
  reducedMotion,
  compact = false,
}: {
  chapter: StoryChapter;
  reducedMotion: boolean;
  compact?: boolean;
}) {
  return (
    <figure className="overflow-hidden rounded-xl border border-divider bg-card shadow-xs">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-canvas">
        <ChapterVisual chapter={chapter} reducedMotion={reducedMotion} />
      </div>
      <figcaption className={`border-t border-divider bg-canvas/60 px-3.5 py-2.5 font-serif text-secondary dark:text-stone-300 ${compact ? "text-sm" : "text-[0.9375rem]"}`}>
        {chapter.plateCaption}
      </figcaption>
    </figure>
  );
}

function ChapterVisual({
  chapter,
  reducedMotion,
}: {
  chapter: StoryChapter;
  reducedMotion: boolean;
}) {
  if (chapter.liveGraph) {
    return (
      <LiveUntangleCanvas
        counts={{
          agreed: chapter.liveGraph.agreed,
          contested: chapter.liveGraph.contested,
          cruxes: chapter.liveGraph.cruxes,
        }}
        openLabel={chapter.liveGraph.openLabel}
        reducedMotion={reducedMotion}
      />
    );
  }

  return (
    <div className="relative h-full w-full">
      {chapter.imageSrc ? (
        <Image
          src={chapter.imageSrc}
          alt={chapter.imageAlt ?? chapter.plateTitle}
          fill
          sizes="(min-width: 1024px) 580px, 100vw"
          className="object-cover transition-transform duration-700 dark:brightness-[0.88] dark:contrast-[1.04]"
          priority={chapter.number === "01"}
        />
      ) : null}
      {/* Subtle animated ink annotation pulse over the artwork */}
      {!reducedMotion ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 800 450"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <motion.circle
            cx={chapter.number === "03" ? 400 : chapter.number === "05" ? 520 : 400}
            cy={chapter.number === "01" ? 390 : chapter.number === "02" ? 326 : chapter.number === "03" ? 355 : 290}
            r="16"
            fill="none"
            stroke="rgb(var(--thread-crux))"
            strokeWidth="1.25"
            initial={{ opacity: 0.15, scale: 0.7 }}
            animate={{ opacity: [0.45, 0.1, 0.45], scale: [0.85, 1.35, 0.85] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        </svg>
      ) : null}
    </div>
  );
}

const LIVE_PHASES = [
  { state: 0, label: "1. Tangle" },
  { state: 2, label: "2. Agreed ground" },
  { state: 3, label: "3. Crux knots" },
  { state: 4, label: "4. Mapped" },
] as const;

/**
 * Interactive real-time strand untangling canvas for Chapter 4, built directly
 * on `components/home/threadGeometry.ts` using the flagship map's live claim
 * counts. Auto-cycles gently unless the visitor picks a phase or prefers
 * reduced motion.
 */
function LiveUntangleCanvas({
  counts,
  openLabel,
  reducedMotion,
}: {
  counts: StrandCounts;
  openLabel: string;
  reducedMotion: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [targetIndex, setTargetIndex] = useState(2);
  const [userLocked, setUserLocked] = useState(false);
  const targetStateRef = useRef<number>(LIVE_PHASES[2].state);
  const currentStateRef = useRef<number>(LIVE_PHASES[2].state);

  useEffect(() => {
    targetStateRef.current = LIVE_PHASES[targetIndex].state;
  }, [targetIndex]);

  // Gentle auto-progression through the 4 stages until the reader clicks one.
  useEffect(() => {
    if (reducedMotion || userLocked) return;
    const timer = window.setInterval(() => {
      setTargetIndex((prev) => (prev + 1) % LIVE_PHASES.length);
    }, 3400);
    return () => window.clearInterval(timer);
  }, [reducedMotion, userLocked]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const strands = buildStrands(counts);
    let frameId = 0;

    const readRgb = (style: CSSStyleDeclaration, name: string, fallback: [number, number, number]) => {
      const parts = style.getPropertyValue(name).trim().split(/[\s,]+/).map(Number);
      return parts.length >= 3 && parts.every((n) => Number.isFinite(n))
        ? ([parts[0], parts[1], parts[2]] as [number, number, number])
        : fallback;
    };

    const draw = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cw = rect.width;
      const ch = rect.height;
      ctx.clearRect(0, 0, cw, ch);

      // Smoothly interpolate toward the selected phase.
      if (reducedMotion) {
        currentStateRef.current = targetStateRef.current;
      } else {
        currentStateRef.current += (targetStateRef.current - currentStateRef.current) * 0.065;
      }

      const raw = currentStateRef.current;
      const stateA = Math.min(4, Math.max(0, Math.floor(raw)));
      const stateB = Math.min(4, stateA + 1);
      const t = smoothstep(0, 1, raw - stateA);

      const style = getComputedStyle(document.documentElement);
      const agreedRgb = readRgb(style, "--thread-agreed", [58, 105, 101]);
      const contestedRgb = readRgb(style, "--thread-contested", [196, 97, 60]);
      const cruxRgb = readRgb(style, "--thread-crux", [162, 59, 59]);
      const padX = cw * 0.08;
      const padY = ch * 0.1;
      const boxW = cw - padX * 2;
      const boxH = ch - padY * 2.4;

      for (const strand of strands) {
        ctx.beginPath();
        const [r, g, b] = strand.group === "agreed" ? agreedRgb : contestedRgb;
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${strand.group === "agreed" ? 0.72 : 0.78})`;
        ctx.lineWidth = strand.width;
        ctx.lineCap = "round";
        const shiver =
          wobble(stateA, strand.group) * (1 - t) + wobble(stateB, strand.group) * t;

        for (let step = 0; step <= POINTS; step += 1) {
          const u = step / POINTS;
          const pA = strandPoint(strand, stateA, u, counts);
          const pB = strandPoint(strand, stateB, u, counts);
          const ux = pA[0] + (pB[0] - pA[0]) * t;
          const uy = pA[1] + (pB[1] - pA[1]) * t;
          let px = padX + ux * boxW;
          let py = padY + uy * boxH;
          if (!reducedMotion && shiver > 0.05) {
            const envelope = Math.sin(Math.PI * u);
            const phase = time * 0.0014 + strand.phase[0] + u * 5;
            px += Math.cos(phase * 0.8) * shiver * 0.4 * envelope;
            py += Math.sin(phase) * shiver * 0.55 * envelope;
          }
          if (step === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // Draw crimson crux dots in states 3 and 4.
      if (raw > 2.2) {
        const dotAlpha = Math.min(1, (raw - 2.2) / 0.6);
        for (let k = 0; k < counts.cruxes; k += 1) {
          const k3 = knotCenter(k, counts.cruxes);
          const k4 = treeNode(k, counts.cruxes);
          const blend = raw >= 3 ? smoothstep(0, 1, Math.min(1, raw - 3)) : 0;
          const cx = padX + (k3[0] + (k4[0] - k3[0]) * blend) * boxW;
          const cy = padY + (k3[1] + (k4[1] - k3[1]) * blend) * boxH;
          ctx.beginPath();
          ctx.arc(cx, cy, 8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cruxRgb[0]}, ${cruxRgb[1]}, ${cruxRgb[2]}, ${dotAlpha * 0.18})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(cx, cy, 3.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cruxRgb[0]}, ${cruxRgb[1]}, ${cruxRgb[2]}, ${dotAlpha * 0.92})`;
          ctx.fill();
        }
      }

      if (!reducedMotion) frameId = window.requestAnimationFrame(draw);
    };

    frameId = window.requestAnimationFrame(draw);
    return () => window.cancelAnimationFrame(frameId);
  }, [counts, reducedMotion, targetIndex]);

  return (
    <div className="relative flex h-full w-full flex-col justify-between bg-canvas p-3">
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 font-sans text-[0.75rem] text-secondary dark:text-stone-400">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-deep dark:bg-accent-text" aria-hidden="true" />
          {counts.agreed} agreed
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rust-600" aria-hidden="true" />
          {counts.contested} {openLabel}
        </span>
        <span className="inline-flex items-center gap-1.5 font-medium text-crux-text">
          <span className="h-2 w-2 rounded-full bg-crux" aria-hidden="true" />
          {counts.cruxes} cruxes
        </span>
      </div>

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="h-full w-full flex-1"
      />

      <div
        role="group"
        aria-label="Untangle stages"
        className="flex flex-wrap items-center justify-center gap-1.5 pt-1"
      >
        {LIVE_PHASES.map((phase, idx) => {
          const active = idx === targetIndex;
          return (
            <button
              key={phase.label}
              type="button"
              onClick={() => {
                setUserLocked(true);
                setTargetIndex(idx);
              }}
              aria-pressed={active}
              className={`rounded-full px-2.5 py-1 font-sans text-[0.7rem] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
                active
                  ? "bg-primary text-canvas"
                  : "border border-divider bg-card text-secondary dark:text-stone-400 hover:text-primary dark:hover:text-stone-100"
              }`}
            >
              {phase.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
