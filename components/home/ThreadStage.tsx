"use client";

import { useEffect, useRef } from "react";
import {
  POINTS,
  STATE_COUNT,
  buildStrands,
  TREE_ROOT,
  knotCenter,
  smoothstep,
  strandPoint,
  treeNode,
  wobble,
  type StrandCounts,
} from "@/components/home/threadGeometry";

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

type Rgb = [number, number, number];

/** How far from the mouse, in CSS pixels, a loose strand is pushed aside. */
const POINTER_REACH = 130;

/** Above this stage width the copy and the figure sit side by side. */
const WIDE = 768;

/**
 * Each arrangement's pixel box. Side by side, the figure keeps to the right
 * of the copy column; on a phone it takes the upper stage and the copy
 * passes beneath it (the hero is the exception: its copy is on top, so the
 * tangle waits below it).
 */
function stateBoxes(width: number, height: number): Box[] {
  if (width >= WIDE) {
    const left = width >= 1100 ? 0.53 : 0.55;
    const sorted = { x: width * left, y: height * 0.09, w: width * (0.96 - left), h: height * 0.82 };
    return [
      { x: width * left, y: height * 0.05, w: width * 0.56, h: height * 0.82 },
      { x: width * (left - 0.02), y: height * 0.1, w: width * 0.56, h: height * 0.78 },
      sorted,
      sorted,
      { x: width * (left - 0.03), y: height * 0.12, w: width * (0.985 - left), h: height * 0.76 },
    ];
  }
  const sorted = { x: width * 0.05, y: height * 0.04, w: width * 0.9, h: height * 0.5 };
  return [
    { x: -width * 0.1, y: height * 0.58, w: width * 1.2, h: height * 0.44 },
    { x: -width * 0.08, y: height * 0.03, w: width * 1.16, h: height * 0.5 },
    sorted,
    sorted,
    { x: width * 0.02, y: height * 0.05, w: width * 0.94, h: height * 0.48 },
  ];
}

function readRgb(style: CSSStyleDeclaration, name: string, fallback: Rgb): Rgb {
  const parts = style.getPropertyValue(name).trim().split(/[\s,]+/).map(Number);
  return parts.length >= 3 && parts.every((n) => Number.isFinite(n))
    ? [parts[0], parts[1], parts[2]]
    : fallback;
}

const mix = (a: Rgb, b: Rgb, t: number): Rgb => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

/**
 * Home's thread figure: one strand per claim in the flagship map, pinned
 * behind the story and rearranged by the scroll position (see
 * threadGeometry.ts for the five arrangements).
 *
 * The canvas is decoration for a story the page tells in text: it is hidden
 * from assistive technology, takes no pointer events, and the page reads the
 * same with it blank (no JavaScript) or still (reduced motion, where the
 * figure steps between arrangements instead of morphing and never shivers).
 *
 * It finds the story's steps by `[data-thread-step]` inside the nearest
 * `[data-thread-section]`; a step's `[data-thread-copy]` block, when it has
 * one, is what has to reach the reading line for that step to be current.
 */
export function ThreadStage({ counts }: { counts: StrandCounts }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { agreed, contested, cruxes } = counts;

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const section = wrap?.closest<HTMLElement>("[data-thread-section]");
    const context = canvas?.getContext("2d");
    if (!wrap || !canvas || !section || !context) return;
    const ctx = context;

    const strandCounts = { agreed, contested, cruxes };
    const strands = buildStrands(strandCounts);
    const steps = Array.from(section.querySelectorAll<HTMLElement>("[data-thread-step]"));
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    let boxes: Box[] = [];
    /** shapes[state][strand] = x0, y0, x1, y1, … in CSS pixels. */
    let shapes: Float32Array[][] = [];
    let ink: Rgb = [61, 58, 54];
    let teal: Rgb = [58, 105, 101];
    let crimson: Rgb = [162, 59, 59];
    let rust: Rgb = [176, 84, 52];
    let paper: Rgb = [244, 241, 235];
    let fontFamily = "sans-serif";
    let frame = 0;
    let visible = false;
    let startedAt = 0;
    let lastDrawn = -1;
    const scratch = new Float32Array(POINTS * 2);
    /** The mouse, in stage pixels, while it is over the stage. */
    let pointer: { x: number; y: number } | null = null;

    function readTheme() {
      const style = getComputedStyle(document.documentElement);
      ink = readRgb(style, "--text-primary-rgb", [61, 58, 54]);
      teal = readRgb(style, "--accent-text-rgb", [58, 105, 101]);
      crimson = readRgb(style, "--crux-text-rgb", [162, 59, 59]);
      paper = readRgb(style, "--bg-canvas-rgb", [244, 241, 235]);
      fontFamily = getComputedStyle(wrap!).fontFamily || "sans-serif";
      rust = document.documentElement.classList.contains("dark") ? [217, 138, 106] : [176, 84, 52];
      lastDrawn = -1;
    }

    function layout() {
      width = wrap!.clientWidth;
      height = wrap!.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.max(1, Math.round(width * ratio));
      canvas!.height = Math.max(1, Math.round(height * ratio));
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      boxes = stateBoxes(width, height);
      shapes = boxes.map((box, state) =>
        strands.map((strand) => {
          const out = new Float32Array(POINTS * 2);
          for (let j = 0; j < POINTS; j += 1) {
            const [u, v] = strandPoint(strand, state, j / (POINTS - 1), strandCounts);
            out[j * 2] = box.x + u * box.w;
            out[j * 2 + 1] = box.y + v * box.h;
          }
          return out;
        }),
      );
      lastDrawn = -1;
    }

    /** 0..STATE_COUNT-1, continuous: which step is at the reading line. */
    function progress(): number {
      if (steps.length === 0) return 0;
      const stage = wrap!.getBoundingClientRect();
      const lineAt = width >= WIDE ? 0.5 : 0.74;
      const line = stage.top + stage.height * lineAt;
      const anchors = steps.map((step, index) => {
        if (index === 0) return step.getBoundingClientRect().top + stage.height * lineAt;
        const copy = step.querySelector<HTMLElement>("[data-thread-copy]") ?? step;
        const rect = copy.getBoundingClientRect();
        return rect.top + rect.height / 2;
      });
      const last = Math.min(anchors.length, STATE_COUNT) - 1;
      if (line <= anchors[0]) return 0;
      for (let k = 0; k < last; k += 1) {
        if (line < anchors[k + 1]) {
          return k + (line - anchors[k]) / Math.max(1, anchors[k + 1] - anchors[k]);
        }
      }
      return last;
    }

    function strokeStyleFor(group: "agreed" | "contested", state: number): [Rgb, number] {
      const hue = group === "agreed" ? teal : rust;
      if (state <= 0) return [mix(ink, hue, 0.5), 0.6];
      if (state === 1) return [mix(ink, hue, 0.3), 0.68];
      if (state === 2) return group === "agreed" ? [hue, 0.95] : [mix(ink, hue, 0.45), 0.66];
      if (state === 3) return group === "agreed" ? [hue, 0.32] : [hue, 0.95];
      return [hue, group === "agreed" ? 0.9 : 0.95];
    }

    function draw(now: number) {
      const still = motion.matches;
      const raw = progress();
      const position = still ? Math.round(raw) : raw;
      const from = Math.min(STATE_COUNT - 2, Math.floor(position));
      const eased = smoothstep(0.16, 0.84, position - from);
      if (!startedAt) startedAt = now;
      const reveal = still ? 1 : Math.min(1, (now - startedAt) / 1900);
      const settled = reveal >= 1 && (still || (from === STATE_COUNT - 2 && eased >= 1));
      if (settled && Math.abs(position - lastDrawn) < 0.0004) return;
      lastDrawn = position;

      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const wide = width >= WIDE;

      for (let s = 0; s < strands.length; s += 1) {
        const strand = strands[s];
        // Strands leave for the next arrangement a little apart, not as one.
        const t = smoothstep(0, 1, Math.min(1, Math.max(0, eased * 1.45 - strand.delay * 0.45)));
        const a = shapes[from][s];
        const b = shapes[from + 1][s];
        const shiver = still
          ? 0
          : wobble(from, strand.group) + (wobble(from + 1, strand.group) - wobble(from, strand.group)) * t;
        const drawn = Math.max(
          2,
          Math.round(POINTS * Math.min(1, Math.max(0, reveal * 1.7 - strand.delay * 0.7))),
        );
        const speed = 0.00055 + strand.delay * 0.00035;
        // A loose strand gives way under the mouse; a sorted one does not.
        const give = pointer ? Math.min(1, shiver / 5) * 26 : 0;
        for (let j = 0; j < drawn; j += 1) {
          const u = j / (POINTS - 1);
          const envelope = Math.sin(Math.PI * u);
          let x =
            a[j * 2] + (b[j * 2] - a[j * 2]) * t +
            shiver * envelope * Math.sin(now * speed + strand.phase[0] + u * 7.1);
          let y =
            a[j * 2 + 1] + (b[j * 2 + 1] - a[j * 2 + 1]) * t +
            shiver * envelope * Math.cos(now * speed * 0.83 + strand.phase[1] + u * 5.3);
          if (give > 0.5 && pointer) {
            const dx = x - pointer.x;
            const dy = y - pointer.y;
            const distance = Math.hypot(dx, dy);
            if (distance < POINTER_REACH && distance > 0.01) {
              const push = Math.pow(1 - distance / POINTER_REACH, 2) * give * envelope;
              x += (dx / distance) * push;
              y += (dy / distance) * push;
            }
          }
          scratch[j * 2] = x;
          scratch[j * 2 + 1] = y;
        }

        const [fromColor, fromAlpha] = strokeStyleFor(strand.group, from);
        const [toColor, toAlpha] = strokeStyleFor(strand.group, from + 1);
        const color = mix(fromColor, toColor, t);
        const alpha = fromAlpha + (toAlpha - fromAlpha) * t;
        ctx.strokeStyle = `rgba(${color[0] | 0}, ${color[1] | 0}, ${color[2] | 0}, ${alpha.toFixed(3)})`;
        ctx.lineWidth = strand.width * (wide ? 1 : 0.85);

        ctx.beginPath();
        ctx.moveTo(scratch[0], scratch[1]);
        for (let j = 1; j < drawn - 1; j += 1) {
          const midX = (scratch[j * 2] + scratch[j * 2 + 2]) / 2;
          const midY = (scratch[j * 2 + 1] + scratch[j * 2 + 3]) / 2;
          ctx.quadraticCurveTo(scratch[j * 2], scratch[j * 2 + 1], midX, midY);
        }
        ctx.lineTo(scratch[(drawn - 1) * 2], scratch[(drawn - 1) * 2 + 1]);
        ctx.stroke();
      }

      // Side by side, strands come out from behind the copy column softly.
      if (wide) {
        const edge = boxes[from].x + (boxes[from + 1].x - boxes[from].x) * eased;
        // The tangle fades in over a wide band; the sorted arrangements,
        // whose left ends carry meaning (the trunk), over a narrow one.
        const band = width * (from >= 2 ? 0.05 : from === 1 ? 0.13 - 0.08 * eased : 0.13);
        const fade = ctx.createLinearGradient(edge, 0, edge + band, 0);
        fade.addColorStop(0, "rgba(0, 0, 0, 1)");
        fade.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = fade;
        ctx.fillRect(0, 0, edge + band, height);
        ctx.globalCompositeOperation = "source-over";
      }

      // The cruxes: one crimson point where each bundle gathers. In the map
      // they line up as the forks of the tree.
      const knotWeight = from === 2 ? eased : from === 3 ? 1 : 0;
      const toTree = from === 3 ? smoothstep(0, 1, eased) : 0;
      const gather = boxes[3];
      const tree = boxes[STATE_COUNT - 1];
      if (knotWeight > 0.01) {
        const pulse = still ? 0 : (Math.sin(now * 0.0021) + 1) / 2;
        for (let k = 0; k < cruxes; k += 1) {
          const [gu, gv] = knotCenter(k, cruxes);
          const [tu, tv] = treeNode(k, cruxes);
          const gx = gather.x + gu * gather.w;
          const gy = gather.y + gv * gather.h;
          const x = gx + (tree.x + tu * tree.w - gx) * toTree;
          const y = gy + (tree.y + tv * tree.h - gy) * toTree;
          const radius = (wide ? 5.5 : 4.5) * knotWeight;
          ctx.fillStyle = `rgba(${crimson[0]}, ${crimson[1]}, ${crimson[2]}, ${(0.16 * knotWeight).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, radius * (2.3 + pulse * 0.7), 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgb(${crimson[0]}, ${crimson[1]}, ${crimson[2]})`;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // The question: the ring where the shared trunk ends and the map forks.
      if (toTree > 0.01) {
        const x = tree.x + TREE_ROOT[0] * tree.w;
        const y = tree.y + TREE_ROOT[1] * tree.h;
        ctx.fillStyle = `rgb(${paper[0]}, ${paper[1]}, ${paper[2]})`;
        ctx.strokeStyle = `rgba(${ink[0]}, ${ink[1]}, ${ink[2]}, ${toTree.toFixed(3)})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(x, y, (wide ? 8 : 6.5) * toTree, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      // Captions: what the reader is looking at, in the figure's own colours.
      ctx.font = `500 ${wide ? 13 : 12}px ${fontFamily}`;
      ctx.textBaseline = "middle";
      const caption = (text: string, x: number, y: number, color: Rgb, alpha: number, align: CanvasTextAlign) => {
        if (alpha <= 0.02) return;
        ctx.textAlign = align;
        ctx.fillStyle = `rgba(${color[0] | 0}, ${color[1] | 0}, ${color[2] | 0}, ${Math.min(1, alpha).toFixed(3)})`;
        ctx.fillText(text, x, y);
      };
      const inGround = from === 1 ? eased : from === 2 ? 1 - eased : 0;
      const inCruxes = from === 2 ? eased : from === 3 ? 1 - eased : 0;
      const right = gather.x + gather.w;
      caption(`${agreed} not in dispute`, right, gather.y + gather.h * 0.7, teal, inGround, "right");
      caption(`${contested} contested`, right, gather.y + gather.h * 0.02, rust, inGround, "right");
      caption(`${cruxes} cruxes`, right, gather.y + gather.h * 0.02 - 14, crimson, inCruxes, "right");
      caption(`${agreed} not in dispute`, right, gather.y + gather.h * 0.7, teal, inCruxes * 0.7, "right");
      if (toTree > 0.02) {
        const rootX = tree.x + TREE_ROOT[0] * tree.w;
        const rootY = tree.y + TREE_ROOT[1] * tree.h;
        const nodeX = tree.x + treeNode(0, cruxes)[0] * tree.w;
        caption("the question", rootX + 4, rootY - tree.h * 0.1 - 14, ink, toTree, "right");
        caption("shared ground", rootX - tree.w * 0.06, rootY + tree.h * 0.1 + 16, teal, toTree, "right");
        caption(`${cruxes} cruxes`, nodeX, tree.y + tree.h * 0.1 - (wide ? 24 : 20), crimson, toTree, "center");
      }
    }

    function tick(now: number) {
      draw(now);
      frame = visible ? requestAnimationFrame(tick) : 0;
    }

    function wake() {
      if (visible && !frame) frame = requestAnimationFrame(tick);
    }

    readTheme();
    layout();

    const resize = new ResizeObserver(() => {
      layout();
      wake();
    });
    resize.observe(wrap);
    const theme = new MutationObserver(readTheme);
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    const view = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      wake();
    });
    view.observe(section);
    const onMotionChange = () => {
      lastDrawn = -1;
    };
    motion.addEventListener("change", onMotionChange);
    // The stage takes no pointer events (the copy above it has to stay
    // clickable), so the mouse is read from the window.
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || motion.matches) {
        pointer = null;
        return;
      }
      const rect = wrap.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      pointer = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height ? { x, y } : null;
    };
    const onPointerGone = () => {
      pointer = null;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerGone);
    window.addEventListener("blur", onPointerGone);

    return () => {
      visible = false;
      if (frame) cancelAnimationFrame(frame);
      resize.disconnect();
      theme.disconnect();
      view.disconnect();
      motion.removeEventListener("change", onMotionChange);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerGone);
      window.removeEventListener("blur", onPointerGone);
    };
  }, [agreed, contested, cruxes]);

  // The outer box spans the whole story so the pinned stage inside it lets
  // go exactly where the story ends, instead of riding over the next section.
  return (
    <div aria-hidden="true" data-thread-stage="" className="pointer-events-none absolute inset-0 z-0">
      <div ref={wrapRef} className="sticky top-14 h-[calc(100svh-3.5rem)] overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      </div>
    </div>
  );
}
