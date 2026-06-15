"use client";

import "@xyflow/react/dist/style.css";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Handle,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import type { Edge, Node, NodeProps } from "@xyflow/react";
import { Crown, Landmark } from "lucide-react";
import { featuredTopicId } from "@/data/topicIndex";

// ---------------------------------------------------------------------------
// HeroMiniCanvas
//
// A small, NON-INTERACTIVE, self-building argument-map preview for the homepage
// hero. It is fully isolated from the global `useLogicGraph` Zustand store —
// it keeps its OWN local nodes/edges state and uses lightweight inline node
// components (NOT the heavy RichNode/MetaNode, which read the global store and
// are far too wide for a ~300px canvas).
//
// Lifecycle: render the root meta node, then stagger in 3 pillar children over
// ~2.5s, then fitView and STOP (no loop). With prefers-reduced-motion the final
// state is rendered immediately with no animation. Clicking anywhere calls
// `onClick` so the parent can open the full interactive map.
// ---------------------------------------------------------------------------

interface HeroNodeData extends Record<string, unknown> {
  kind: "root" | "pillar";
  label: string;
  index?: number;
}

type HeroNode = Node<HeroNodeData>;

const ROOT_ID = "hero-root";

// Layout geometry (in flow coordinates). Root centered up top; pillars fanned
// out below it.
const ROOT_POS = { x: 0, y: 0 };
const PILLAR_Y = 170;
const PILLAR_SPACING = 250;

const PILLAR_COUNT = 3;
const ROOT_DELAY_MS = 600; // wait before the pillars start appearing
const PILLAR_STAGGER_MS = 480; // gap between each pillar
const FIT_DELAY_MS = 350; // settle time before the final fitView

const FALLBACK_TITLE = "Could AI systems be conscious?";

// --- Inline node renderers -------------------------------------------------

const RootNode = memo(function RootNode({ data }: NodeProps<HeroNode>) {
  return (
    <div className="hero-mini-node w-[260px] rounded-xl border border-stone-200/80 border-t-2 border-t-deep bg-[#fefcf9] px-4 py-3 shadow-[0_2px_6px_rgba(120,100,80,0.12)]">
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="!h-1.5 !w-1.5 !border-0 !bg-deep/40"
        isConnectable={false}
      />
      <div className="mb-1 flex items-center gap-1.5">
        <Crown className="h-3 w-3 text-deep" strokeWidth={1.8} />
        <span className="text-[10px] font-sans font-medium uppercase tracking-wide text-stone-500">
          Meta Claim
        </span>
      </div>
      <p className="font-serif text-[15px] font-normal leading-snug text-primary">
        {data.label}
      </p>
    </div>
  );
});

const PillarNode = memo(function PillarNode({ data }: NodeProps<HeroNode>) {
  return (
    <div className="hero-mini-node w-[210px] rounded-xl border border-stone-200/80 border-l-[3px] border-l-stone-400 bg-[#fefcf9] px-3.5 py-2.5 shadow-[0_1px_3px_rgba(120,100,80,0.1)]">
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className="!h-1.5 !w-1.5 !border-0 !bg-stone-400/50"
        isConnectable={false}
      />
      <div className="mb-1 flex items-center gap-1.5">
        <Landmark className="h-3 w-3 text-stone-500" strokeWidth={1.8} />
        <span className="text-[10px] font-sans font-medium uppercase tracking-wide text-stone-500">
          Pillar
        </span>
      </div>
      <p className="font-serif text-[13px] font-normal leading-snug text-primary line-clamp-3">
        {data.label}
      </p>
    </div>
  );
});

// --- Helpers ---------------------------------------------------------------

function buildRootNode(title: string): HeroNode {
  return {
    id: ROOT_ID,
    type: "heroRoot",
    position: ROOT_POS,
    data: { kind: "root", label: title },
    draggable: false,
    selectable: false,
    connectable: false,
  };
}

function buildPillarNode(label: string, index: number, total: number): HeroNode {
  // Center the fan of pillars under the root.
  const span = (total - 1) * PILLAR_SPACING;
  const x = ROOT_POS.x - span / 2 + index * PILLAR_SPACING;
  return {
    id: `hero-pillar-${index}`,
    type: "heroPillar",
    position: { x, y: PILLAR_Y },
    data: { kind: "pillar", label, index },
    draggable: false,
    selectable: false,
    connectable: false,
  };
}

function buildPillarEdge(index: number): Edge {
  return {
    id: `hero-edge-${index}`,
    source: ROOT_ID,
    sourceHandle: "bottom",
    target: `hero-pillar-${index}`,
    targetHandle: "top",
    type: "default",
    style: { stroke: "#b8ad9e", strokeWidth: 1.5 },
    animated: false,
  };
}

// --- Inner canvas (inside ReactFlowProvider) -------------------------------

interface InnerProps {
  pillarTitles: string[];
  rootTitle: string;
  reduceMotion: boolean;
}

function HeroMiniCanvasInner({ pillarTitles, rootTitle, reduceMotion }: InnerProps) {
  const reactFlow = useReactFlow<HeroNode>();

  const pillars = useMemo(() => pillarTitles.slice(0, PILLAR_COUNT), [pillarTitles]);
  const total = pillars.length;

  const fullNodes = useMemo<HeroNode[]>(() => {
    const list: HeroNode[] = [buildRootNode(rootTitle)];
    pillars.forEach((label, i) => list.push(buildPillarNode(label, i, total)));
    return list;
  }, [rootTitle, pillars, total]);

  const fullEdges = useMemo<Edge[]>(
    () => pillars.map((_, i) => buildPillarEdge(i)),
    [pillars]
  );

  // Reduced motion: render the final state immediately.
  const [nodes, setNodes] = useState<HeroNode[]>(() =>
    reduceMotion ? fullNodes : [buildRootNode(rootTitle)]
  );
  const [edges, setEdges] = useState<Edge[]>(() => (reduceMotion ? fullEdges : []));

  const nodeTypes = useMemo(
    () => ({ heroRoot: RootNode, heroPillar: PillarNode }),
    []
  );

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (reduceMotion) {
      // Final state already set; just frame it once on mount.
      const t = setTimeout(() => {
        reactFlow.fitView({ padding: 0.18, duration: 0 });
      }, 40);
      timers.current.push(t);
      return () => {
        clearTimeout(t);
      };
    }

    const schedule = (fn: () => void, delay: number) => {
      const t = setTimeout(fn, delay);
      timers.current.push(t);
    };

    // Frame the root first.
    schedule(() => reactFlow.fitView({ padding: 0.3, duration: 250 }), 60);

    // Stagger the pillars in.
    pillars.forEach((label, i) => {
      const at = ROOT_DELAY_MS + i * PILLAR_STAGGER_MS;
      schedule(() => {
        setNodes((prev) => [...prev, buildPillarNode(label, i, total)]);
        setEdges((prev) => [...prev, buildPillarEdge(i)]);
        // Keep everything in frame as it grows.
        schedule(() => reactFlow.fitView({ padding: 0.22, duration: 320 }), 30);
      }, at);
    });

    // Final settle + freeze.
    const finalAt = ROOT_DELAY_MS + total * PILLAR_STAGGER_MS + FIT_DELAY_MS;
    schedule(() => reactFlow.fitView({ padding: 0.18, duration: 400 }), finalAt);

    const captured = timers.current;
    return () => {
      captured.forEach(clearTimeout);
      captured.length = 0;
    };
    // Intentionally run once on mount; inputs are stable for the canvas lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  return (
    <ReactFlow
      className="h-full w-full"
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      minZoom={0.2}
      maxZoom={1.5}
      proOptions={{ hideAttribution: true }}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      zoomOnScroll={false}
      panOnScroll={false}
      panOnDrag={false}
      zoomOnDoubleClick={false}
      zoomOnPinch={false}
      preventScrolling={false}
      nodesFocusable={false}
      edgesFocusable={false}
      autoPanOnNodeFocus={false}
    >
      <Background
        color="#cdc6bb"
        gap={20}
        size={1}
        variant={BackgroundVariant.Dots}
        className="opacity-40"
      />
    </ReactFlow>
  );
}

// --- Public component ------------------------------------------------------

export interface HeroMiniCanvasProps {
  onClick?: () => void;
  /** Optional override for the root title (defaults to the featured topic). */
  title?: string;
}

export default function HeroMiniCanvas({ onClick, title }: HeroMiniCanvasProps) {
  const [mounted, setMounted] = useState(false);
  const [rootTitle, setRootTitle] = useState<string>(title ?? FALLBACK_TITLE);
  const [pillarTitles, setPillarTitles] = useState<string[]>([]);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Guard React Flow against SSR / hydration surprises: only render after mount.
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && window.matchMedia) {
      setReduceMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }
  }, []);

  // Lazy-load the featured topic to source real pillar titles. Falls back to a
  // small static set if the load fails so the showpiece is never empty.
  useEffect(() => {
    let cancelled = false;
    import("@/data/topics")
      .then((mod) => {
        if (cancelled) return;
        const topics = mod.topics;
        const topic = topics.find((t) => t.id === featuredTopicId);
        if (!topic) return;
        if (!title) setRootTitle(topic.title);
        const titles = (topic.pillars ?? [])
          .slice(0, PILLAR_COUNT)
          .map((p) => p.title);
        if (titles.length) setPillarTitles(titles);
      })
      .catch(() => {
        /* keep fallbacks */
      });
    return () => {
      cancelled = true;
    };
  }, [title]);

  const effectivePillars = useMemo(
    () =>
      pillarTitles.length
        ? pillarTitles
        : ["Behavioral evidence", "Architecture & substrate", "Moral status"],
    [pillarTitles]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick?.();
      }
    },
    [onClick]
  );

  return (
    <div
      className="relative h-[300px] w-full overflow-hidden rounded-2xl border border-stone-200/70 bg-gradient-to-b from-[#faf8f3] to-[#f4f1eb] shadow-[0_2px_12px_rgba(120,100,80,0.08)] dark:border-[#3d3a36] dark:from-[#201f1c] dark:to-[#1a1917]"
      role="button"
      tabIndex={0}
      aria-label="Open the interactive argument map"
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {/* Static parchment fallback rendered until React Flow mounts (also the
          SSR-safe output). Keeps the hero from flashing empty. */}
      {!mounted && (
        <div className="flex h-full w-full items-center justify-center">
          <div className="w-[240px] rounded-xl border border-stone-200/80 border-t-2 border-t-deep bg-[#fefcf9] px-4 py-3 shadow-sm">
            <div className="mb-1 flex items-center gap-1.5">
              <Crown className="h-3 w-3 text-deep" strokeWidth={1.8} />
              <span className="text-[10px] font-sans font-medium uppercase tracking-wide text-stone-500">
                Meta Claim
              </span>
            </div>
            <p className="font-serif text-[15px] leading-snug text-primary">
              {rootTitle}
            </p>
          </div>
        </div>
      )}

      {mounted && (
        // The provider is local to this component, so its store never touches
        // the global useLogicGraph store or the real canvas's ReactFlowProvider.
        <ReactFlowProvider>
          <HeroMiniCanvasInner
            pillarTitles={effectivePillars}
            rootTitle={rootTitle}
            reduceMotion={reduceMotion}
          />
        </ReactFlowProvider>
      )}

      {/* Transparent overlay: swallows all pointer interaction so the canvas
          stays a pure showpiece, and routes any click to `onClick`. */}
      <div
        className="absolute inset-0 z-10 cursor-pointer"
        aria-hidden="true"
        onClick={onClick}
      />

      <span className="pointer-events-none absolute bottom-2.5 right-3 z-20 rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-sans font-medium text-stone-500 backdrop-blur-sm dark:bg-[#1a1917]/70 dark:text-stone-400">
        Live preview &middot; click to explore
      </span>
    </div>
  );
}
