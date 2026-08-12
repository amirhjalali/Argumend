"use client";

import "@xyflow/react/dist/style.css";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import {
  Background,
  BackgroundVariant,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  applyNodeChanges,
  useReactFlow,
} from "@xyflow/react";
import type { Node, NodeChange } from "@xyflow/react";
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
import { getFocusFrameNodes } from "@/lib/graphViewport";
import { useMediaQuery } from "@/hooks/useMediaQuery";
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
  const onNodesChange = useCallback((changes: NodeChange<Node<LogicNodeData>>[]) => {
    useLogicGraph.setState((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    }));
  }, []);
  const focusTargets = useLogicGraph((state) => state.focusTargets);
  const consumeFocusTargets = useLogicGraph(
    (state) => state.consumeFocusTargets,
  );
  const reactFlow = useReactFlow();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  // A crux is reachable whenever the graph holds a crux node (already revealed)
  // or a pillar (whose expansion reveals one). Drives the persistent "Find the
  // crux" affordance so the crux is never buried an expansion deep.
  const hasCruxPath = useLogicGraph((state) =>
    state.nodes.some(
      (n) => n.data.variant === "crux" || n.data.variant === "pillar",
    ),
  );

  // First-interaction tracking for auto-dismissing the topic intro panel.
  // `interactionReady` gates viewport moves so the initial/auto-expand fitView
  // animations (which fire onMoveStart programmatically) don't count as a user
  // interaction; node clicks and drags are always user-driven so count at once.
  const [userInteracted, setUserInteracted] = useState(false);
  const interactionReady = useRef(false);
  useEffect(() => {
    const t = window.setTimeout(() => {
      interactionReady.current = true;
    }, 1200);
    return () => window.clearTimeout(t);
  }, []);
  const handleUserInteract = useCallback(() => setUserInteracted(true), []);
  const handleViewportInteract = useCallback(() => {
    if (interactionReady.current) setUserInteracted(true);
  }, []);

  // Surface the crux in one click: focus it if already on the canvas, otherwise
  // expand the first pillar to reveal its crux, then focus that. Uses only the
  // store's public actions (the focus effect below animates the camera).
  const handleFindCrux = useCallback(() => {
    const store = useLogicGraph.getState();
    const existingCrux = store.nodes.find((n) => n.data.variant === "crux");
    if (existingCrux) {
      store.setFocusTargets([existingCrux.id]);
      return;
    }
    const pillar = store.nodes.find((n) => n.data.variant === "pillar");
    if (!pillar) return;
    store.expandNode(pillar.id);
    const next = useLogicGraph.getState();
    const revealed = next.nodes.find((n) => n.data.variant === "crux");
    if (revealed) next.setFocusTargets([revealed.id]);
  }, []);

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
    // Initial topic framing favors the readable root/pillar backbone; later
    // expansions keep the clicked parent and every revealed child in frame.
    const targetNodes = getFocusFrameNodes(nodes, edges, focusTargets);
    if (!targetNodes.length) return;

    reactFlow.fitView({
      nodes: targetNodes,
      padding: GRAPH.FOCUS_FIT_VIEW_PADDING,
      duration: reduceMotion ? 0 : GRAPH.TRANSITION_DURATION,
    });
    consumeFocusTargets();
  }, [consumeFocusTargets, focusTargets, nodes, edges, reactFlow, reduceMotion]);

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
        onMoveStart={handleViewportInteract}
        onNodeClick={handleUserInteract}
        onNodeDragStart={handleUserInteract}
        nodesFocusable={false}
        edgesFocusable={false}
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
        <MapLegend onFindCrux={hasCruxPath ? handleFindCrux : undefined} />
        <NavigationPath />
        <TopicIntroPanel userInteracted={userInteracted} />
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
