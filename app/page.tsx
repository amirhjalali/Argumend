"use client";

import "@xyflow/react/dist/style.css";

import { useEffect, useMemo, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
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

  const reactFlow = useReactFlow();

  const getMiniMapColor = (node: Node<LogicNodeData>) => {
    switch (node?.data?.variant) {
      case "meta":
        return "#e9d7c2";
      case "skeptic":
        return "#c97a62";
      case "crux":
        return "#6db0ff";
      case "proponent":
      case "evidence":
        return "#91c8b3";
      default:
        return "#a8b5c3";
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

      <div className="flex min-h-0 flex-1">
        <div
          className={`relative h-full overflow-hidden transition-[width] duration-300 ease-in-out ${isSidebarOpen ? "w-[280px]" : "w-0"
            }`}
        >
          <div
            className={`h-full transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
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

        <div className="flex-1 min-h-0 px-0 pb-4 pt-0 md:px-0">
          <div className="relative h-full min-h-[80vh] overflow-hidden border-y border-white/40 bg-transparent">
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
                color="#d4cec4"
                gap={30}
                size={1.6}
                variant={BackgroundVariant.Dots}
                className="opacity-60"
              />
              <Controls
                position="bottom-left"
                className="m-4"
                showInteractive={false}
              />
              <MiniMap
                pannable
                zoomable
                className="logic-minimap hidden md:block"
                style={{
                  position: "absolute",
                  width: 200,
                  height: 150,
                  bottom: 48,
                  right: 44,
                  zIndex: 50,
                  pointerEvents: "auto",
                }}
                nodeColor={getMiniMapColor}
                nodeStrokeColor={() => "transparent"}
                maskColor="rgba(244, 241, 235, 0.7)"
              />
            </ReactFlow>

            <CruxModal />
          </div>
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
