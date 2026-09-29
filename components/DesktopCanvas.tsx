"use client";

import "@xyflow/react/dist/style.css";

import { useCallback, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useTheme } from "next-themes";
import {
  Background,
  BackgroundVariant,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type Edge,
} from "@xyflow/react";
import {
  ActiveDiagramNode,
  DiagramNode,
  type DiagramFlowNode,
} from "@/components/nodes/DiagramNode";
import { DiagramDetail, DETAIL_PANEL_WIDTH } from "@/components/DiagramDetail";
import { ZoomIndicator } from "@/components/ZoomIndicator";
import { FIT_VIEW, layoutDiagram } from "@/lib/diagram/layout";
import type { DiagramModel, DiagramNode as DiagramNodeModel } from "@/lib/diagram/model";
import { GRAPH } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * The diagram canvas for /topics/[id]/map (desktop only; phones get the
 * outline in MobileArgumentList). Loaded through next/dynamic with
 * `ssr: false`, so React Flow and its CSS ship only to desktop sessions.
 *
 * The whole tree is laid out up front (lib/diagram/layout.ts) and framed on
 * load. Nothing expands or moves: each box is a button that opens its full
 * text. Tab walks the boxes in the page's reading order (question, then each
 * crux with its two sides and their evidence), Enter opens, Escape closes.
 */

const NODE_TYPES = { diagram: DiagramNode };

/**
 * Keyboard focus on a box: the one focus colour, drawn around the box's own
 * rounded corners (the global :focus-visible rule would square them off).
 */
const NODE_FOCUS =
  "cursor-pointer rounded-lg focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

const A11Y_LABELS = {
  "node.a11yDescription.default": "Press Enter to read it in full.",
  "node.a11yDescription.keyboardDisabled": "Press Enter to read it in full.",
};

function accessibleName(node: DiagramNodeModel, model: DiagramModel): string {
  switch (node.kind) {
    case "question":
      return `The question: ${node.label}`;
    case "crux": {
      const total = model.nodes.filter((n) => n.kind === "crux").length;
      return `Crux ${node.number} of ${total}${node.kicker ? `, ${node.kicker}` : ""}: ${node.label}`;
    }
    case "side":
      return `${node.heading} on ${node.lead}: ${node.label}`;
    case "evidence":
      return `Evidence that ${node.side === "for" ? "supports" : "challenges"} the claim: ${node.label}`;
  }
}

function buildNodes(model: DiagramModel): DiagramFlowNode[] {
  const { boxes } = layoutDiagram(model);
  return model.nodes.map((node) => {
    const box = boxes.get(node.id)!;
    return {
      id: node.id,
      type: "diagram",
      position: { x: box.x, y: box.y },
      width: box.width,
      height: box.height,
      data: { node },
      draggable: false,
      selectable: false,
      connectable: false,
      deletable: false,
      className: NODE_FOCUS,
      ariaRole: "button",
      ariaLabel: accessibleName(node, model),
      domAttributes: { "aria-haspopup": "dialog", "aria-roledescription": undefined },
    };
  });
}

function buildEdges(model: DiagramModel, isDark: boolean): Edge[] {
  const stroke = isDark ? "#5f5850" : "#c2b8ac";
  return model.nodes.flatMap((node) => {
    if (node.kind === "question") return [];
    const spine = node.kind === "evidence";
    return [
      {
        id: `edge-${node.parentId}-${node.id}`,
        source: node.parentId,
        target: node.id,
        sourceHandle: spine ? "spine" : "out",
        targetHandle: "in",
        type: "smoothstep",
        pathOptions: spine ? { borderRadius: 6, offset: 0 } : { borderRadius: 10 },
        focusable: false,
        selectable: false,
        style: { stroke, strokeWidth: 1.25 },
      },
    ];
  });
}

function CanvasInner({ diagram }: { diagram: DiagramModel }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const reactFlow = useReactFlow();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Stable for the life of the map: React Flow keeps the boxes it measured.
  const nodes = useMemo(() => buildNodes(diagram), [diagram]);
  const edges = useMemo(() => buildEdges(diagram, isDark), [diagram, isDark]);
  const byId = useMemo(() => new Map(diagram.nodes.map((n) => [n.id, n])), [diagram]);

  const [activeId, setActiveId] = useState<string | null>(null);
  const active = activeId ? byId.get(activeId) ?? null : null;

  /** Slide the canvas left if the opened box would sit under the panel. */
  const keepClearOfPanel = useCallback(
    (id: string) => {
      const node = nodes.find((n) => n.id === id);
      const wrapper = wrapperRef.current;
      if (!node || !wrapper) return;
      const { x, y, zoom } = reactFlow.getViewport();
      const right = (node.position.x + (node.width ?? 0)) * zoom + x;
      const clearEdge = wrapper.clientWidth - DETAIL_PANEL_WIDTH - 24;
      if (right <= clearEdge) return;
      reactFlow.setViewport(
        { x: x - (right - clearEdge), y, zoom },
        { duration: reduceMotion ? 0 : GRAPH.TRANSITION_DURATION },
      );
    },
    [nodes, reactFlow, reduceMotion],
  );

  const open = useCallback(
    (id: string) => {
      if (!byId.has(id)) return;
      setActiveId(id);
      keepClearOfPanel(id);
      trackEvent({ action: "node_expand", topicId: diagram.topicId, nodeId: id });
    },
    [byId, diagram.topicId, keepClearOfPanel],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const target = event.target as HTMLElement;
      if (!target.classList.contains("react-flow__node")) return;
      const id = target.dataset.id;
      if (!id) return;
      event.preventDefault();
      open(id);
    },
    [open],
  );

  return (
    <div ref={wrapperRef} className="relative h-full" onKeyDown={onKeyDown}>
      <ActiveDiagramNode.Provider value={activeId}>
        <ReactFlow
          className="h-full w-full"
          nodes={nodes}
          edges={edges}
          nodeTypes={NODE_TYPES}
          fitView
          fitViewOptions={FIT_VIEW}
          minZoom={FIT_VIEW.minZoom}
          maxZoom={GRAPH.MAX_ZOOM}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          nodesFocusable
          edgesFocusable={false}
          zoomOnScroll
          panOnScroll
          panOnDrag
          zoomOnDoubleClick={false}
          onNodeClick={(_, node) => open(node.id)}
          ariaLabelConfig={A11Y_LABELS}
          aria-label={`Diagram of ${diagram.title}`}
        >
          <Background
            color={isDark ? "#45413b" : "#cdc6bb"}
            gap={GRAPH.GRID_GAP}
            size={GRAPH.DOT_SIZE}
            variant={BackgroundVariant.Dots}
            className="opacity-50"
          />
          <ZoomIndicator />
        </ReactFlow>
      </ActiveDiagramNode.Provider>
      <DiagramDetail model={diagram} node={active} onClose={() => setActiveId(null)} />
    </div>
  );
}

export default function DesktopCanvas({ diagram }: { diagram: DiagramModel }) {
  return (
    <ReactFlowProvider>
      <CanvasInner diagram={diagram} />
    </ReactFlowProvider>
  );
}
