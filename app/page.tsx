"use client";

import "@xyflow/react/dist/style.css";

import { useEffect, useMemo, useState, useCallback } from "react";
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
import { useSidebarState } from "@/hooks/useSidebarState";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { MapLegend } from "@/components/MapLegend";
import { ZoomIndicator } from "@/components/ZoomIndicator";
import { NavigationPath } from "@/components/NavigationPath";
import { TopicIntroPanel } from "@/components/TopicIntroPanel";
import { ScalesOfEvidence } from "@/components/ScalesOfEvidence";
import { DebateView } from "@/components/DebateView";
import { HeroAnalyze } from "@/components/HeroAnalyze";
import { MobileArgumentList } from "@/components/MobileArgumentList";
import { getMiniMapColor } from "@/lib/variantStyles";
import { GRAPH, MINIMAP } from "@/lib/constants";
import type { LogicNodeData } from "@/types/graph";

function CanvasExperience() {
  const nodeTypes = useMemo(
    () => ({
      metaNode: MetaNode,
      richNode: RichNode,
      evidenceNode: EvidenceNode,
    }),
    []
  );

  const sidebar = useSidebarState();
  const isMobile = useIsMobile();
  const [showHero, setShowHero] = useState(true);

  const nodes = useLogicGraph((state) => state.nodes);
  const edges = useLogicGraph((state) => state.edges);
  const onNodesChange = useLogicGraph((state) => state.onNodesChange);
  const focusTargets = useLogicGraph((state) => state.focusTargets);
  const consumeFocusTargets = useLogicGraph(
    (state) => state.consumeFocusTargets
  );
  const currentTopicId = useLogicGraph((state) => state.currentTopicId);
  const setTopic = useLogicGraph((state) => state.setTopic);
  const currentView = useLogicGraph((state) => state.currentView);

  const reactFlow = useReactFlow();

  const getNodeColor = (node: Node<LogicNodeData>): string => {
    return getMiniMapColor(node?.data?.variant);
  };

  const handleTopicSelect = useCallback(
    (id: string) => {
      setTopic(id);
      setShowHero(false);
    },
    [setTopic]
  );

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

  // Show the hero landing when no topic has been explicitly selected
  if (showHero) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-transparent font-sans text-primary">
        <TopBar onMenuClick={sidebar.toggle} showBackToHero={false} />

        <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* Mobile overlay when sidebar is open */}
          <div
            className={`fixed inset-0 bg-black/30 z-30 md:hidden transition-opacity duration-300 ${
              sidebar.isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={sidebar.close}
          />

          {/* Sidebar Container */}
          <div
            className={`
              fixed md:relative top-0 md:top-auto bottom-0 left-0 z-40 md:z-auto
              flex-shrink-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
              ${sidebar.isOpen ? "w-[260px]" : "w-0 md:w-0"}
            `}
          >
            <div
              className={`absolute top-0 bottom-0 left-0 w-[260px] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                sidebar.isOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <Sidebar
                isOpen={sidebar.isOpen}
                onClose={sidebar.close}
                currentTopicId={currentTopicId}
                onTopicSelect={handleTopicSelect}
              />
            </div>
          </div>

          {/* Hero Content */}
          <div className="relative flex-1 min-w-0 overflow-y-auto">
            <HeroAnalyze onTopicSelect={handleTopicSelect} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-transparent font-sans text-primary">
      <TopBar
        onMenuClick={sidebar.toggle}
        showBackToHero
        onBackToHero={() => setShowHero(true)}
      />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Mobile overlay when sidebar is open */}
        <div
          className={`fixed inset-0 bg-black/30 z-30 md:hidden transition-opacity duration-300 ${
            sidebar.isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={sidebar.close}
        />

        {/* Sidebar Container */}
        <div
          className={`
            fixed md:relative top-0 md:top-auto bottom-0 left-0 z-40 md:z-auto
            flex-shrink-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${sidebar.isOpen ? "w-[260px]" : "w-0 md:w-0"}
          `}
        >
          <div
            className={`absolute top-0 bottom-0 left-0 w-[260px] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              sidebar.isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar
              isOpen={sidebar.isOpen}
              onClose={sidebar.close}
              currentTopicId={currentTopicId}
              onTopicSelect={handleTopicSelect}
            />
          </div>
        </div>

        {/* Canvas Area */}
        <div className="relative flex-1 min-w-0">
          {currentView === "scales" ? (
            <ScalesOfEvidence />
          ) : currentView === "debate" ? (
            <DebateView />
          ) : isMobile ? (
            <MobileArgumentList />
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <ReactFlowProvider>
      <CanvasExperience />
    </ReactFlowProvider>
  );
}
