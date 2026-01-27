"use client";

import "@xyflow/react/dist/style.css";

import { useEffect, useMemo, useState } from "react";
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
import { useLogicGraph } from "@/hooks/useLogicGraph";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { MapLegend } from "@/components/MapLegend";
import { ZoomIndicator } from "@/components/ZoomIndicator";
import { NavigationPath } from "@/components/NavigationPath";
import { WelcomeOverlay } from "@/components/WelcomeOverlay";
import { TopicIntroPanel } from "@/components/TopicIntroPanel";
import { ScalesOfEvidence } from "@/components/ScalesOfEvidence";
import type { LogicNodeData } from "@/types/graph";

function CanvasExperience() {
  const nodeTypes = useMemo(
    () => ({
      metaNode: MetaNode,
      richNode: RichNode,
    }),
    [],
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Open sidebar by default on desktop
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(true);
    }
  }, []);

  const nodes = useLogicGraph((state) => state.nodes);
  const edges = useLogicGraph((state) => state.edges);
  const onNodesChange = useLogicGraph((state) => state.onNodesChange);
  const focusTargets = useLogicGraph((state) => state.focusTargets);
  const consumeFocusTargets = useLogicGraph(
    (state) => state.consumeFocusTargets,
  );
  const currentTopicId = useLogicGraph((state) => state.currentTopicId);
  const setTopic = useLogicGraph((state) => state.setTopic);
  const currentView = useLogicGraph((state) => state.currentView);

  const reactFlow = useReactFlow();

  const getMiniMapColor = (node: Node<LogicNodeData>) => {
    switch (node?.data?.variant) {
      case "meta":
        return "#2563eb"; // Blue for meta claim (distinct from proponent)
      case "skeptic":
        return "#8B5A3C"; // Warm brown for skeptic
      case "crux":
        return "#a23b3b"; // Crimson for crux
      case "proponent":
        return "#D4A012"; // Metallic gold for proponent
      case "evidence":
        return "#CF7B3E"; // Rich copper for evidence
      default:
        return "#a8a095"; // Warm gray for others
    }
  };

  useEffect(() => {
    if (!focusTargets.length) return;
    const targetNodes = nodes.filter((node) =>
      focusTargets.includes(node.id),
    );
    if (!targetNodes.length) return;

    reactFlow.fitView({
      nodes: targetNodes,
      padding: 0.4,
      duration: 800,
    });
    consumeFocusTargets();
  }, [consumeFocusTargets, focusTargets, nodes, reactFlow]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-transparent font-sans text-primary">
      <TopBar onMenuClick={() => setIsSidebarOpen((prev) => !prev)} />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Mobile overlay when sidebar is open - below sidebar */}
        <div
          className={`fixed inset-0 bg-black/30 z-30 md:hidden transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* Sidebar Container - fixed on mobile, relative on desktop */}
        <div
          className={`
            fixed md:relative inset-y-0 left-0 z-40 md:z-auto
            flex-shrink-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${isSidebarOpen ? "w-[260px]" : "w-0 md:w-0"}
          `}
        >
          {/* Sidebar - slides in from left */}
          <div
            className={`absolute inset-y-0 left-0 w-[260px] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              currentTopicId={currentTopicId}
              onTopicSelect={setTopic}
            />
          </div>

        </div>

        {/* Canvas Area */}
        <div className="relative flex-1 min-w-0">
          {currentView === "scales" ? (
            <ScalesOfEvidence />
          ) : (
            <div className="h-full">
              <ReactFlow
                className="h-full w-full"
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                defaultViewport={{ x: -200, y: 0, zoom: 0.8 }}
                minZoom={0.2}
                maxZoom={1.6}
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
                  gap={24}
                  size={1.2}
                  variant={BackgroundVariant.Dots}
                  className="opacity-50"
                />
                {/* Single MiniMap for orientation only - not interactive to avoid competing with ZoomIndicator */}
                <MiniMap
                  className="logic-minimap hidden md:block"
                  style={{
                    position: "absolute",
                    width: 160,
                    height: 100,
                    bottom: 24,
                    right: 24,
                    zIndex: 40,
                  }}
                  nodeColor={getMiniMapColor}
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
      <WelcomeOverlay />
    </ReactFlowProvider>
  );
}
