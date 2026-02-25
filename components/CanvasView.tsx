"use client";

import "@xyflow/react/dist/style.css";

import { useEffect, useMemo } from "react";
import {
  Background,
  BackgroundVariant,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import type { Node } from "@xyflow/react";
import dynamic from "next/dynamic";
import { CruxModal } from "@/components/CruxModal";
import { MetaNode } from "@/components/nodes/MetaNode";
import { RichNode } from "@/components/nodes/RichNode";
import { EvidenceNode } from "@/components/nodes/EvidenceNode";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { MapLegend } from "@/components/MapLegend";
import { ZoomIndicator } from "@/components/ZoomIndicator";
import { NavigationPath } from "@/components/NavigationPath";
import { TopicIntroPanel } from "@/components/TopicIntroPanel";
import { getMiniMapColor } from "@/lib/variantStyles";
import { GRAPH, MINIMAP } from "@/lib/constants";
import type { LogicNodeData } from "@/types/graph";

// Heavy view components — only loaded when the user switches to them
const ScalesOfEvidence = dynamic(
  () => import("@/components/ScalesOfEvidence").then((m) => m.ScalesOfEvidence),
  { ssr: false }
);
const DebateView = dynamic(
  () => import("@/components/DebateView").then((m) => m.DebateView),
  { ssr: false }
);
const MobileArgumentList = dynamic(
  () => import("@/components/MobileArgumentList").then((m) => m.MobileArgumentList),
  { ssr: false }
);

function CanvasInner() {
  const nodeTypes = useMemo(
    () => ({
      metaNode: MetaNode,
      richNode: RichNode,
      evidenceNode: EvidenceNode,
    }),
    []
  );

  const isMobile = useIsMobile();

  const nodes = useLogicGraph((state) => state.nodes);
  const edges = useLogicGraph((state) => state.edges);
  const onNodesChange = useLogicGraph((state) => state.onNodesChange);
  const focusTargets = useLogicGraph((state) => state.focusTargets);
  const consumeFocusTargets = useLogicGraph(
    (state) => state.consumeFocusTargets
  );
  const currentView = useLogicGraph((state) => state.currentView);
  const initialized = useLogicGraph((state) => state._initialized);
  const loadInitialTopic = useLogicGraph((state) => state.loadInitialTopic);

  // Lazy-load initial topic data (topics.ts is ~500KB, only loaded when canvas is shown)
  useEffect(() => {
    if (!initialized) {
      loadInitialTopic();
    }
  }, [initialized, loadInitialTopic]);

  const reactFlow = useReactFlow();

  const getNodeColor = (node: Node<LogicNodeData>): string => {
    return getMiniMapColor(node?.data?.variant);
  };

  useEffect(() => {
    if (!focusTargets.length) return;
    const targetNodes = nodes.filter((node) =>
      focusTargets.includes(node.id)
    );
    if (!targetNodes.length) return;

    reactFlow.fitView({
      nodes: targetNodes,
      padding: GRAPH.FIT_VIEW_PADDING,
      duration: GRAPH.TRANSITION_DURATION,
    });
    consumeFocusTargets();
  }, [consumeFocusTargets, focusTargets, nodes, reactFlow]);

  if (currentView === "scales") {
    return <ScalesOfEvidence />;
  }

  if (currentView === "debate") {
    return <DebateView />;
  }

  if (isMobile) {
    return <MobileArgumentList />;
  }

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
          color="#cdc6bb"
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
          maskColor="rgba(244, 241, 235, 0.75)"
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

export default function CanvasView() {
  return (
    <ReactFlowProvider>
      <CanvasInner />
    </ReactFlowProvider>
  );
}
