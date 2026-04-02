"use client";

import "@xyflow/react/dist/style.css";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  Background,
  BackgroundVariant,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import type { Node, Edge, NodeMouseHandler } from "@xyflow/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Filter,
  X,
  ArrowRight,
  Map as MapIcon,
  List,
  ChevronLeft,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import type { TopicSummary } from "@/data/topicIndex";
import type { TopicCategory, TopicStatus } from "@/lib/schemas/topic";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TopicExplorerProps {
  topics: TopicSummary[];
  edges: { source: string; target: string }[];
  categoryLabels: Record<TopicCategory, string>;
}

interface TopicNodeData {
  topicId: string;
  title: string;
  category: TopicCategory;
  status: TopicStatus;
  confidence_score: number;
  pillarCount: number;
  selected: boolean;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Category Colors (matching the topics list page)
// ---------------------------------------------------------------------------

const CATEGORY_BORDER_COLORS: Record<TopicCategory, string> = {
  policy: "#3a6965",     // deep teal
  technology: "#9c9288", // stone
  science: "#059669",    // emerald
  economics: "#C4613C",  // rust
  philosophy: "#6d645c", // secondary stone
};

const CATEGORY_BG_COLORS: Record<TopicCategory, string> = {
  policy: "rgba(58, 105, 101, 0.08)",
  technology: "rgba(156, 146, 136, 0.08)",
  science: "rgba(5, 150, 105, 0.08)",
  economics: "rgba(196, 97, 60, 0.08)",
  philosophy: "rgba(109, 100, 92, 0.08)",
};

const CATEGORY_PILL_CLASSES: Record<TopicCategory, string> = {
  policy: "bg-deep/10 text-deep border-deep/20",
  technology: "bg-stone-100 text-stone-600 border-stone-200/60",
  science: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
  economics: "bg-rust-50 text-rust-700 border-rust-200/60",
  philosophy: "bg-stone-100 text-stone-600 border-stone-200/60",
};

const STATUS_ICONS: Record<TopicStatus, typeof CheckCircle> = {
  settled: CheckCircle,
  contested: AlertCircle,
  highly_speculative: HelpCircle,
};

const STATUS_LABELS: Record<TopicStatus, string> = {
  settled: "Settled",
  contested: "Contested",
  highly_speculative: "Speculative",
};

const STATUS_COLORS: Record<TopicStatus, string> = {
  settled: "text-emerald-600",
  contested: "text-rust-600",
  highly_speculative: "text-stone-500",
};

const ALL_CATEGORIES: TopicCategory[] = [
  "policy",
  "technology",
  "science",
  "economics",
  "philosophy",
];

const ALL_STATUSES: TopicStatus[] = [
  "settled",
  "contested",
  "highly_speculative",
];

// ---------------------------------------------------------------------------
// Custom Node Component
// ---------------------------------------------------------------------------

function TopicMapNode({ data }: { data: TopicNodeData }) {
  const StatusIcon = STATUS_ICONS[data.status];
  const borderColor = data.selected
    ? "#C4613C"
    : CATEGORY_BORDER_COLORS[data.category];
  const bgColor = data.selected
    ? "rgba(196, 97, 60, 0.04)"
    : CATEGORY_BG_COLORS[data.category];

  return (
    <div
      className="w-[200px] rounded-lg border bg-white dark:bg-[var(--bg-card)] shadow-[0_1px_4px_rgba(120,100,80,0.1)] transition-shadow duration-150 hover:shadow-[0_4px_12px_rgba(120,100,80,0.15)] cursor-pointer"
      style={{
        borderLeft: `3px solid ${borderColor}`,
        borderColor: data.selected ? "#C4613C" : "rgba(214, 208, 198, 0.6)",
        borderLeftColor: borderColor,
        background: bgColor,
      }}
    >
      <div className="p-3">
        {/* Title */}
        <h3
          className="font-serif text-[13px] font-medium leading-snug text-primary mb-2 line-clamp-2"
          title={data.title}
        >
          {data.title}
        </h3>

        {/* Bottom row: status + confidence */}
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <StatusIcon
              className={`h-3 w-3 flex-shrink-0 ${STATUS_COLORS[data.status]}`}
              strokeWidth={2}
            />
            <span className="text-[10px] text-stone-500">
              {STATUS_LABELS[data.status]}
            </span>
          </div>

          {/* Confidence badge */}
          <span
            className="flex-shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-mono font-medium tabular-nums"
            style={{
              backgroundColor:
                data.confidence_score >= 75
                  ? "rgba(79, 123, 119, 0.15)"
                  : data.confidence_score >= 50
                  ? "rgba(196, 97, 60, 0.12)"
                  : "rgba(139, 90, 60, 0.12)",
              color:
                data.confidence_score >= 75
                  ? "#3a6965"
                  : data.confidence_score >= 50
                  ? "#C4613C"
                  : "#8B5A3C",
            }}
          >
            {data.confidence_score}%
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Force-directed layout
// ---------------------------------------------------------------------------

function computeForceLayout(
  topics: TopicSummary[],
  edgeList: { source: string; target: string }[],
  width: number,
  height: number
): Record<string, { x: number; y: number }> {
  const NODE_W = 200;
  const NODE_H = 80;

  // Group by category for initial seeding
  const categoryGroups: Record<string, TopicSummary[]> = {};
  for (const t of topics) {
    if (!categoryGroups[t.category]) categoryGroups[t.category] = [];
    categoryGroups[t.category].push(t);
  }

  const categories = Object.keys(categoryGroups);
  const positions: Record<string, { x: number; y: number }> = {};

  // Seed positions in clusters around the center
  const cx = width / 2;
  const cy = height / 2;
  const clusterRadius = Math.min(width, height) * 0.32;

  categories.forEach((cat, catIdx) => {
    const angle = (catIdx / categories.length) * 2 * Math.PI - Math.PI / 2;
    const clusterX = cx + Math.cos(angle) * clusterRadius;
    const clusterY = cy + Math.sin(angle) * clusterRadius;
    const group = categoryGroups[cat];

    group.forEach((t, i) => {
      const subAngle = (i / group.length) * 2 * Math.PI;
      const subRadius = 80 + group.length * 12;
      positions[t.id] = {
        x: clusterX + Math.cos(subAngle) * subRadius + (Math.random() - 0.5) * 40,
        y: clusterY + Math.sin(subAngle) * subRadius + (Math.random() - 0.5) * 40,
      };
    });
  });

  // Build adjacency lookup
  const adjacency: Record<string, Set<string>> = {};
  for (const t of topics) adjacency[t.id] = new Set();
  for (const e of edgeList) {
    if (adjacency[e.source]) adjacency[e.source].add(e.target);
    if (adjacency[e.target]) adjacency[e.target].add(e.source);
  }

  // Simple force simulation (N iterations)
  const ITERATIONS = 120;
  const REPULSION = 50000;
  const ATTRACTION = 0.005;
  const DAMPING = 0.92;
  const MIN_DIST = NODE_W + 30;

  const velocities: Record<string, { vx: number; vy: number }> = {};
  for (const t of topics) velocities[t.id] = { vx: 0, vy: 0 };

  for (let iter = 0; iter < ITERATIONS; iter++) {
    const cooling = 1 - iter / ITERATIONS * 0.7;

    // Repulsion between all pairs
    for (let i = 0; i < topics.length; i++) {
      for (let j = i + 1; j < topics.length; j++) {
        const a = topics[i].id;
        const b = topics[j].id;
        const dx = positions[a].x - positions[b].x;
        const dy = positions[a].y - positions[b].y;
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
        const force = (REPULSION / (dist * dist)) * cooling;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        velocities[a].vx += fx;
        velocities[a].vy += fy;
        velocities[b].vx -= fx;
        velocities[b].vy -= fy;
      }
    }

    // Attraction along edges
    for (const e of edgeList) {
      const pa = positions[e.source];
      const pb = positions[e.target];
      if (!pa || !pb) continue;
      const dx = pb.x - pa.x;
      const dy = pb.y - pa.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const idealDist = MIN_DIST * 2.5;
      const force = (dist - idealDist) * ATTRACTION * cooling;
      const fx = (dx / Math.max(dist, 1)) * force;
      const fy = (dy / Math.max(dist, 1)) * force;
      if (velocities[e.source]) {
        velocities[e.source].vx += fx;
        velocities[e.source].vy += fy;
      }
      if (velocities[e.target]) {
        velocities[e.target].vx -= fx;
        velocities[e.target].vy -= fy;
      }
    }

    // Category gravity: pull nodes slightly toward their cluster center
    categories.forEach((cat, catIdx) => {
      const angle = (catIdx / categories.length) * 2 * Math.PI - Math.PI / 2;
      const clusterX = cx + Math.cos(angle) * clusterRadius;
      const clusterY = cy + Math.sin(angle) * clusterRadius;
      for (const t of categoryGroups[cat]) {
        const dx = clusterX - positions[t.id].x;
        const dy = clusterY - positions[t.id].y;
        velocities[t.id].vx += dx * 0.001 * cooling;
        velocities[t.id].vy += dy * 0.001 * cooling;
      }
    });

    // Apply velocities
    for (const t of topics) {
      velocities[t.id].vx *= DAMPING;
      velocities[t.id].vy *= DAMPING;
      positions[t.id].x += velocities[t.id].vx;
      positions[t.id].y += velocities[t.id].vy;
    }
  }

  return positions;
}

// ---------------------------------------------------------------------------
// Filter Panel (desktop map overlay)
// ---------------------------------------------------------------------------

interface FilterPanelProps {
  activeCategories: Set<TopicCategory>;
  activeStatuses: Set<TopicStatus>;
  confidenceRange: [number, number];
  categoryLabels: Record<TopicCategory, string>;
  filteredCount: number;
  totalCount: number;
  hasActiveFilters: boolean;
  onToggleCategory: (cat: TopicCategory) => void;
  onToggleStatus: (status: TopicStatus) => void;
  onSetConfidenceRange: (range: [number, number]) => void;
  onReset: () => void;
}

function FilterPanel({
  activeCategories,
  activeStatuses,
  confidenceRange,
  categoryLabels,
  filteredCount,
  totalCount,
  hasActiveFilters,
  onToggleCategory,
  onToggleStatus,
  onSetConfidenceRange,
  onReset,
}: FilterPanelProps) {
  return (
    <div
      id="topic-filter-panel"
      role="region"
      aria-label="Topic filters"
      className="absolute top-14 left-4 z-10 w-[260px] bg-white dark:bg-[var(--bg-card)] rounded-xl border border-stone-200/60 dark:border-[var(--border-default)] shadow-lw p-4 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-primary">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            aria-label="Reset all filters"
            className="text-[11px] text-stone-500 hover:text-stone-700 transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      {/* Categories */}
      <div>
        <p className="text-[11px] font-medium text-stone-400 mb-2 tracking-wide">
          Category
        </p>
        <div className="space-y-1">
          {ALL_CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 cursor-pointer py-1 group"
            >
              <input
                type="checkbox"
                checked={activeCategories.has(cat)}
                onChange={() => onToggleCategory(cat)}
                className="h-3.5 w-3.5 rounded border-stone-300 text-deep focus:ring-deep/20 cursor-pointer"
              />
              <span
                className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: CATEGORY_BORDER_COLORS[cat] }}
              />
              <span className="text-xs text-stone-600 group-hover:text-stone-800 capitalize">
                {categoryLabels[cat]}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Status */}
      <div>
        <p className="text-[11px] font-medium text-stone-400 mb-2 tracking-wide">
          Status
        </p>
        <div className="space-y-1">
          {ALL_STATUSES.map((status) => {
            const Icon = STATUS_ICONS[status];
            return (
              <label
                key={status}
                className="flex items-center gap-2 cursor-pointer py-1 group"
              >
                <input
                  type="checkbox"
                  checked={activeStatuses.has(status)}
                  onChange={() => onToggleStatus(status)}
                  className="h-3.5 w-3.5 rounded border-stone-300 text-deep focus:ring-deep/20 cursor-pointer"
                />
                <Icon
                  className={`h-3 w-3 ${STATUS_COLORS[status]}`}
                  strokeWidth={2}
                />
                <span className="text-xs text-stone-600 group-hover:text-stone-800">
                  {STATUS_LABELS[status]}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Confidence Range */}
      <div>
        <p className="text-[11px] font-medium text-stone-400 mb-2 tracking-wide">
          Confidence Range
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-stone-500 w-7 text-right font-mono">
              {confidenceRange[0]}
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={confidenceRange[0]}
              onChange={(e) =>
                onSetConfidenceRange([
                  Math.min(Number(e.target.value), confidenceRange[1]),
                  confidenceRange[1],
                ])
              }
              aria-label="Minimum confidence"
              className="flex-1 h-1 appearance-none bg-stone-200 rounded-full accent-deep"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-stone-500 w-7 text-right font-mono">
              {confidenceRange[1]}
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={confidenceRange[1]}
              onChange={(e) =>
                onSetConfidenceRange([
                  confidenceRange[0],
                  Math.max(Number(e.target.value), confidenceRange[0]),
                ])
              }
              aria-label="Maximum confidence"
              className="flex-1 h-1 appearance-none bg-stone-200 rounded-full accent-deep"
            />
          </div>
        </div>
      </div>

      {/* Count */}
      <div className="pt-2 border-t border-stone-100">
        <p className="text-[11px] text-stone-500">
          Showing{" "}
          <span className="font-medium text-stone-700">
            {filteredCount}
          </span>{" "}
          of {totalCount} topics
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Selected Topic Detail Panel (desktop map overlay)
// ---------------------------------------------------------------------------

interface SelectedTopicPanelProps {
  topic: TopicSummary;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

function SelectedTopicPanel({ topic, onClose, onNavigate }: SelectedTopicPanelProps) {
  return (
    <div className="absolute bottom-4 right-4 z-10 w-[300px] bg-white dark:bg-[var(--bg-card)] rounded-xl border border-stone-200/60 dark:border-[var(--border-default)] shadow-lw overflow-hidden">
      {/* Category color bar */}
      <div
        className="h-1"
        style={{ backgroundColor: CATEGORY_BORDER_COLORS[topic.category] }}
      />
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-serif text-base text-primary leading-snug pr-4">
            {topic.title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close topic details"
            className="flex-shrink-0 p-1 text-stone-400 hover:text-stone-600 transition-colors"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
        <p className="text-xs text-stone-500 leading-relaxed line-clamp-3 mb-3">
          {topic.meta_claim}
        </p>
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border capitalize ${
              CATEGORY_PILL_CLASSES[topic.category]
            }`}
          >
            {topic.category}
          </span>
          <span className="text-[10px] text-stone-500">
            {topic.pillarCount} pillars
          </span>
          <span className="font-mono text-xs text-stone-600 ml-auto">
            {topic.confidence_score}%
          </span>
        </div>
        <button
          onClick={() => onNavigate(topic.id)}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-rust-500 to-rust-600 px-4 py-2.5 text-sm font-medium text-white hover:from-rust-600 hover:to-rust-700 transition-colors"
        >
          View Analysis
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Inner component (needs useReactFlow context)
// ---------------------------------------------------------------------------

function TopicExplorerInner({
  topics,
  edges: edgeList,
  categoryLabels,
}: TopicExplorerProps) {
  const router = useRouter();
  const reactFlowInstance = useReactFlow();
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter state
  const [activeCategories, setActiveCategories] = useState<Set<TopicCategory>>(
    new Set(ALL_CATEGORIES)
  );
  const [activeStatuses, setActiveStatuses] = useState<Set<TopicStatus>>(
    new Set(ALL_STATUSES)
  );
  const [confidenceRange, setConfidenceRange] = useState<[number, number]>([0, 100]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Filter topics
  const filteredTopics = useMemo(
    () =>
      topics.filter(
        (t) =>
          activeCategories.has(t.category) &&
          activeStatuses.has(t.status) &&
          t.confidence_score >= confidenceRange[0] &&
          t.confidence_score <= confidenceRange[1]
      ),
    [topics, activeCategories, activeStatuses, confidenceRange]
  );

  const filteredIds = useMemo(
    () => new Set(filteredTopics.map((t) => t.id)),
    [filteredTopics]
  );

  // Compute layout
  const positions = useMemo(
    () => computeForceLayout(filteredTopics, edgeList, 3000, 2400),
    [filteredTopics, edgeList]
  );

  // Build nodes
  const nodes: Node<TopicNodeData>[] = useMemo(
    () =>
      filteredTopics.map((t) => ({
        id: t.id,
        type: "topicMapNode",
        position: positions[t.id] ?? { x: 0, y: 0 },
        data: {
          topicId: t.id,
          title: t.title,
          category: t.category,
          status: t.status,
          confidence_score: t.confidence_score,
          pillarCount: t.pillarCount,
          selected: selectedNodeId === t.id,
        },
      })),
    [filteredTopics, positions, selectedNodeId]
  );

  // Build edges (only between visible nodes)
  const flowEdges: Edge[] = useMemo(
    () =>
      edgeList
        .filter((e) => filteredIds.has(e.source) && filteredIds.has(e.target))
        .map((e, i) => ({
          id: `e-${i}`,
          source: e.source,
          target: e.target,
          type: "default",
          style: {
            stroke: "rgba(156, 146, 136, 0.3)",
            strokeWidth: 1,
          },
          animated: false,
        })),
    [edgeList, filteredIds]
  );

  const nodeTypes = useMemo(
    () => ({
      topicMapNode: TopicMapNode,
    }),
    []
  );

  // Handlers
  const onNodeClick: NodeMouseHandler<Node<TopicNodeData>> = useCallback(
    (_event, node) => {
      setSelectedNodeId(node.id);
    },
    []
  );

  const onNodeDoubleClick: NodeMouseHandler<Node<TopicNodeData>> = useCallback(
    (_event, node) => {
      router.push(`/topics/${node.data.topicId}`);
    },
    [router]
  );

  const handleNavigate = useCallback(
    (id: string) => {
      router.push(`/topics/${id}`);
    },
    [router]
  );

  const toggleCategory = useCallback((cat: TopicCategory) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        if (next.size > 1) next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  }, []);

  const toggleStatus = useCallback((status: TopicStatus) => {
    setActiveStatuses((prev) => {
      const next = new Set(prev);
      if (next.has(status)) {
        if (next.size > 1) next.delete(status);
      } else {
        next.add(status);
      }
      return next;
    });
  }, []);

  const resetFilters = useCallback(() => {
    setActiveCategories(new Set(ALL_CATEGORIES));
    setActiveStatuses(new Set(ALL_STATUSES));
    setConfidenceRange([0, 100]);
  }, []);

  // Fit view on load and filter change
  useEffect(() => {
    const timer = setTimeout(() => {
      reactFlowInstance.fitView({ padding: 0.15, duration: 400 });
    }, 100);
    return () => clearTimeout(timer);
  }, [filteredTopics.length, reactFlowInstance]);

  const hasActiveFilters =
    activeCategories.size < ALL_CATEGORIES.length ||
    activeStatuses.size < ALL_STATUSES.length ||
    confidenceRange[0] > 0 ||
    confidenceRange[1] < 100;

  // Find selected topic
  const selectedTopic = selectedNodeId
    ? topics.find((t) => t.id === selectedNodeId)
    : null;

  // ---------- MOBILE LIST VIEW ----------
  if (isMobile) {
    return (
      <AppShell>
        <div className="min-h-screen bg-transparent">
          <div className="mx-auto max-w-2xl px-4 py-6">
            {/* Header */}
            <div className="mb-6">
              <Link
                href="/topics"
                className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-700 mb-3"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                All Topics
              </Link>
              <h1 className="font-serif text-2xl tracking-tight text-primary mb-2">
                Topic Explorer
              </h1>
              <p className="text-sm text-secondary leading-relaxed">
                {topics.length} topics connected by thematic relationships.
                Tap a topic to explore its analysis.
              </p>
            </div>

            {/* Category filter chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all capitalize ${
                    activeCategories.has(cat)
                      ? "bg-deep text-white"
                      : "bg-white dark:bg-[var(--bg-card)] text-stone-400 border border-stone-200/60 dark:border-[var(--border-default)]"
                  }`}
                >
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>

            {/* Topic list */}
            <div className="space-y-2">
              {filteredTopics.map((topic) => {
                const StatusIcon = STATUS_ICONS[topic.status];
                return (
                  <Link
                    key={topic.id}
                    href={`/topics/${topic.id}`}
                    className="flex items-center gap-3 p-3 bg-white dark:bg-[var(--bg-card)] rounded-lg border border-stone-200/60 dark:border-[var(--border-default)] hover:border-deep/30 transition-colors"
                    style={{
                      borderLeftWidth: 3,
                      borderLeftColor: CATEGORY_BORDER_COLORS[topic.category],
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-sm text-primary truncate">
                        {topic.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <StatusIcon
                          className={`h-3 w-3 ${STATUS_COLORS[topic.status]}`}
                          strokeWidth={2}
                        />
                        <span className="text-[10px] text-stone-500 capitalize">
                          {topic.category}
                        </span>
                      </div>
                    </div>
                    <span className="flex-shrink-0 font-mono text-xs tabular-nums text-stone-600">
                      {topic.confidence_score}%
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-stone-400 flex-shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  // ---------- DESKTOP MAP VIEW ----------
  return (
    <AppShell>
      <div className="relative h-[calc(100vh-56px)] w-full overflow-hidden" ref={containerRef}>
        {/* ReactFlow Canvas */}
        <ReactFlow
          nodes={nodes}
          edges={flowEdges}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          onNodeDoubleClick={onNodeDoubleClick}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          minZoom={0.1}
          maxZoom={2}
          proOptions={{ hideAttribution: true }}
          className="bg-[#f4f1eb]"
          nodesDraggable={true}
          nodesConnectable={false}
          elementsSelectable={true}
          panOnScroll={true}
          zoomOnScroll={true}
          defaultEdgeOptions={{
            type: "default",
          }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={24}
            size={1}
            color="rgba(156, 146, 136, 0.2)"
          />
          <MiniMap
            nodeColor={(node) => {
              const data = node.data as TopicNodeData;
              return CATEGORY_BORDER_COLORS[data.category] ?? "#9c9288";
            }}
            maskColor="rgba(244, 241, 235, 0.85)"
            bgColor="#faf8f5"
            style={{
              borderRadius: 8,
              border: "1px solid rgba(214, 208, 198, 0.6)",
            }}
          />
        </ReactFlow>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          aria-expanded={showFilters}
          aria-controls="topic-filter-panel"
          aria-label={`Filters${hasActiveFilters ? " (active)" : ""}`}
          className={`absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors shadow-card ${
            showFilters
              ? "bg-deep text-white"
              : "bg-white dark:bg-[var(--bg-card)] text-stone-700 dark:text-stone-300 border border-stone-200/60 dark:border-[var(--border-default)] hover:border-deep/30"
          }`}
        >
          <Filter className="h-4 w-4" aria-hidden="true" />
          Filters
          {hasActiveFilters && (
            <span className="flex h-2 w-2 rounded-full bg-rust-500" aria-hidden="true" />
          )}
        </button>

        {/* Filter Panel */}
        {showFilters && (
          <div id="topic-filter-panel" role="region" aria-label="Topic filters" className="absolute top-14 left-4 z-10 w-[260px] bg-white dark:bg-[var(--bg-card)] rounded-xl border border-stone-200/60 dark:border-[var(--border-default)] shadow-lw p-4 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-primary">Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  aria-label="Reset all filters"
                  className="text-[11px] text-stone-500 hover:text-stone-700 transition-colors"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Categories */}
            <div>
              <p className="text-[11px] font-medium text-stone-400 mb-2 tracking-wide">
                Category
              </p>
              <div className="space-y-1">
                {ALL_CATEGORIES.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 cursor-pointer py-1 group"
                  >
                    <input
                      type="checkbox"
                      checked={activeCategories.has(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="h-3.5 w-3.5 rounded border-stone-300 text-deep focus:ring-deep/20 cursor-pointer"
                    />
                    <span
                      className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: CATEGORY_BORDER_COLORS[cat] }}
                    />
                    <span className="text-xs text-stone-600 group-hover:text-stone-800 capitalize">
                      {categoryLabels[cat]}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <p className="text-[11px] font-medium text-stone-400 mb-2 tracking-wide">
                Status
              </p>
              <div className="space-y-1">
                {ALL_STATUSES.map((status) => {
                  const Icon = STATUS_ICONS[status];
                  return (
                    <label
                      key={status}
                      className="flex items-center gap-2 cursor-pointer py-1 group"
                    >
                      <input
                        type="checkbox"
                        checked={activeStatuses.has(status)}
                        onChange={() => toggleStatus(status)}
                        className="h-3.5 w-3.5 rounded border-stone-300 text-deep focus:ring-deep/20 cursor-pointer"
                      />
                      <Icon
                        className={`h-3 w-3 ${STATUS_COLORS[status]}`}
                        strokeWidth={2}
                      />
                      <span className="text-xs text-stone-600 group-hover:text-stone-800">
                        {STATUS_LABELS[status]}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Confidence Range */}
            <div>
              <p className="text-[11px] font-medium text-stone-400 mb-2 tracking-wide">
                Confidence Range
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-stone-500 w-7 text-right font-mono">
                    {confidenceRange[0]}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={confidenceRange[0]}
                    onChange={(e) =>
                      setConfidenceRange([
                        Math.min(Number(e.target.value), confidenceRange[1]),
                        confidenceRange[1],
                      ])
                    }
                    aria-label="Minimum confidence"
                    className="flex-1 h-1 appearance-none bg-stone-200 rounded-full accent-deep"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-stone-500 w-7 text-right font-mono">
                    {confidenceRange[1]}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={confidenceRange[1]}
                    onChange={(e) =>
                      setConfidenceRange([
                        confidenceRange[0],
                        Math.max(Number(e.target.value), confidenceRange[0]),
                      ])
                    }
                    aria-label="Maximum confidence"
                    className="flex-1 h-1 appearance-none bg-stone-200 rounded-full accent-deep"
                  />
                </div>
              </div>
            </div>

            {/* Count */}
            <div className="pt-2 border-t border-stone-100">
              <p className="text-[11px] text-stone-500">
                Showing{" "}
                <span className="font-medium text-stone-700">
                  {filteredTopics.length}
                </span>{" "}
                of {topics.length} topics
              </p>
            </div>
          </div>
        )}

        {/* Selected Topic Detail Panel */}
        {selectedTopic && (
          <div className="absolute bottom-4 right-4 z-10 w-[300px] bg-white dark:bg-[var(--bg-card)] rounded-xl border border-stone-200/60 dark:border-[var(--border-default)] shadow-lw overflow-hidden">
            {/* Category color bar */}
            <div
              className="h-1"
              style={{
                backgroundColor: CATEGORY_BORDER_COLORS[selectedTopic.category],
              }}
            />
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-serif text-base text-primary leading-snug pr-4">
                  {selectedTopic.title}
                </h3>
                <button
                  onClick={() => setSelectedNodeId(null)}
                  aria-label="Close topic details"
                  className="flex-shrink-0 p-1 text-stone-400 hover:text-stone-600 transition-colors"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed line-clamp-3 mb-3">
                {selectedTopic.meta_claim}
              </p>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border capitalize ${
                    CATEGORY_PILL_CLASSES[selectedTopic.category]
                  }`}
                >
                  {selectedTopic.category}
                </span>
                <span className="text-[10px] text-stone-500">
                  {selectedTopic.pillarCount} pillars
                </span>
                <span className="font-mono text-xs text-stone-600 ml-auto">
                  {selectedTopic.confidence_score}%
                </span>
              </div>
              <button
                onClick={() => handleNavigate(selectedTopic.id)}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-rust-500 to-rust-600 px-4 py-2.5 text-sm font-medium text-white hover:from-rust-600 hover:to-rust-700 transition-colors"
              >
                View Analysis
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-10 bg-white/90 dark:bg-[#252420]/90 backdrop-blur rounded-lg border border-stone-200/60 dark:border-[var(--border-default)] p-3">
          <p className="text-[10px] font-medium text-stone-400 mb-2 tracking-wide">
            Categories
          </p>
          <div className="space-y-1.5">
            {ALL_CATEGORIES.map((cat) => (
              <div key={cat} className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: CATEGORY_BORDER_COLORS[cat] }}
                />
                <span className="text-[11px] text-stone-600 capitalize">
                  {categoryLabels[cat]}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[9px] text-stone-400 mt-2 pt-2 border-t border-stone-100">
            Double-click a topic to open it
          </p>
        </div>

        {/* Topic count badge */}
        <div className="absolute top-4 right-4 z-10 bg-white/90 dark:bg-[#252420]/90 backdrop-blur rounded-lg border border-stone-200/60 dark:border-[var(--border-default)] px-3 py-1.5">
          <p className="text-xs text-stone-600">
            <span className="font-mono font-medium">{filteredTopics.length}</span>{" "}
            topics &middot;{" "}
            <span className="font-mono font-medium">{flowEdges.length}</span>{" "}
            connections
          </p>
        </div>
      </div>
    </AppShell>
  );
}

// ---------------------------------------------------------------------------
// Wrapper with ReactFlowProvider
// ---------------------------------------------------------------------------

export function TopicExplorer(props: TopicExplorerProps) {
  return (
    <ReactFlowProvider>
      <TopicExplorerInner {...props} />
    </ReactFlowProvider>
  );
}
