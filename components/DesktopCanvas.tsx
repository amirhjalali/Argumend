"use client";

import "@xyflow/react/dist/style.css";

import { useCallback, useEffect, useMemo } from "react";
import { useTheme } from "next-themes";
import {
  Background,
  BackgroundVariant,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import type { Node } from "@xyflow/react";
import { CruxModal } from "@/components/CruxModal";
import { MetaNode } from "@/components/nodes/MetaNode";
import { RichNode } from "@/components/nodes/RichNode";
import { EvidenceNode } from "@/components/nodes/EvidenceNode";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import { MapLegend } from "@/components/MapLegend";
import { ZoomIndicator } from "@/components/ZoomIndicator";
import { NavigationPath } from "@/components/NavigationPath";
import { TopicIntroPanel } from "@/components/TopicIntroPanel";
import { getMiniMapColor } from "@/lib/variantStyles";
import { GRAPH, MINIMAP } from "@/lib/constants";
import type { LogicNodeData } from "@/types/graph";

/**
 * The interactive React Flow canvas. Extracted from HomeClient and loaded via
 * next/dynamic with `ssr: false` so the ~React-Flow bundle (+CSS) is NOT shipped
 * to mobile sessions, which render MobileArgumentList instead. Owns its own
 * ReactFlowProvider so HomeClient no longer needs React Flow in its module graph.
 */
function CanvasInner() {
  const nodes = useLogicGraph((state) => state.nodes);
  const edges = useLogicGraph((state) => state.edges);
  const onNodesChange = useLogicGraph((state) => state.onNodesChange);
  const focusTargets = useLogicGraph((state) => state.focusTargets);
  const consumeFocusTargets = useLogicGraph(
    (state) => state.consumeFocusTargets,
  );
  const reactFlow = useReactFlow();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Theme-aware canvas chrome. The dot grid and minimap mask are otherwise
  // hardcoded to parchment, leaving dark-mode users with bright artifacts on a
  // near-black canvas. `useTheme` re-renders on toggle so these update live.
  const backgroundDotColor = isDark ? "#45413b" : "#cdc6bb";
  const miniMapMaskColor = isDark
    ? "rgba(26, 25, 23, 0.78)"
    : "rgba(244, 241, 235, 0.75)";

  const nodeTypes = useMemo(
    () => ({
      metaNode: MetaNode,
      richNode: RichNode,
      evidenceNode: EvidenceNode,
    }),
    [],
  );

  const getNodeColor = useCallback((node: Node<LogicNodeData>): string => {
    return getMiniMapColor(node?.data?.variant);
  }, []);

  useEffect(() => {
    if (!focusTargets.length) return;
    const focusSet = new Set(focusTargets);
    // Also keep the parent of the focused nodes in frame so expanding a node
    // doesn't yank the camera off the node the user just clicked.
    const parentIds = new Set(
      edges.filter((e) => focusSet.has(e.target)).map((e) => e.source),
    );
    const targetNodes = nodes.filter(
      (node) => focusSet.has(node.id) || parentIds.has(node.id),
    );
    if (!targetNodes.length) return;

    reactFlow.fitView({
      nodes: targetNodes,
      padding: GRAPH.FIT_VIEW_PADDING,
      duration: GRAPH.TRANSITION_DURATION,
    });
    consumeFocusTargets();
  }, [consumeFocusTargets, focusTargets, nodes, edges, reactFlow]);

  return (
    <div className="h-full">
      <ReactFlow
        className="h-full w-full"
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        defaultViewport={GRAPH.DEFAULT_VIEWPORT}
        minZoom={GRAPH.MIN_ZOOM}
        maxZoom={GRAPH.MAX_ZOOM}
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll
        panOnScroll
        panOnDrag
        zoomOnDoubleClick={false}
        onNodesChange={onNodesChange}
        fitView
      >
        <Background
          color={backgroundDotColor}
          gap={GRAPH.GRID_GAP}
          size={GRAPH.DOT_SIZE}
          variant={BackgroundVariant.Dots}
          className="opacity-50"
        />
        <MiniMap
          className="logic-minimap hidden md:block"
          style={{
            position: "absolute",
            width: MINIMAP.WIDTH,
            height: MINIMAP.HEIGHT,
            bottom: MINIMAP.BOTTOM,
            right: MINIMAP.RIGHT,
            zIndex: MINIMAP.Z_INDEX,
          }}
          nodeColor={getNodeColor}
          nodeStrokeColor={() => "transparent"}
          maskColor={miniMapMaskColor}
        />
        <ZoomIndicator />
        <MapLegend />
        <NavigationPath />
        <TopicIntroPanel />
      </ReactFlow>

      <CruxModal />
    </div>
  );
}

export default function DesktopCanvas() {
  return (
    <ReactFlowProvider>
      <CanvasInner />
    </ReactFlowProvider>
  );
}
