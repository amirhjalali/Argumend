"use client";

import "@xyflow/react/dist/style.css";

import { useEffect, useMemo, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import { CruxDrawer } from "@/components/CruxDrawer";
import { MetaNode } from "@/components/nodes/MetaNode";
import { RichNode } from "@/components/nodes/RichNode";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { topics } from "@/data/topics";

function CanvasExperience() {
  const nodeTypes = useMemo(
    () => ({
      metaNode: MetaNode,
      richNode: RichNode,
    }),
    [],
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const nodes = useLogicGraph((state) => state.nodes);
  const edges = useLogicGraph((state) => state.edges);
  const onNodesChange = useLogicGraph((state) => state.onNodesChange);
  const focusTargets = useLogicGraph((state) => state.focusTargets);
  const consumeFocusTargets = useLogicGraph(
    (state) => state.consumeFocusTargets,
  );
  const currentTopicId = useLogicGraph((state) => state.currentTopicId);
  const setTopic = useLogicGraph((state) => state.setTopic);

  const currentTopic = useMemo(
    () => topics.find((topic) => topic.id === currentTopicId) ?? topics[0],
    [currentTopicId],
  );
  const leadPillars = currentTopic?.pillars?.slice(0, 2) ?? [];

  const reactFlow = useReactFlow();

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
    <div className="flex h-screen w-screen overflow-hidden bg-canvas text-primary font-sans">
      <Sidebar
        topics={topics}
        currentTopicId={currentTopicId}
        onSelectTopic={setTopic}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="relative flex-1 overflow-hidden bg-canvas">
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
              color="#D1D5DB"
              gap={24}
              size={2}
              variant={BackgroundVariant.Dots}
              className="opacity-50"
            />
            <Controls
              position="bottom-left"
              className="!bg-white !border !border-gray-200 !shadow-lg !text-gray-600 !rounded-full m-4"
            />
          </ReactFlow>

          <CruxDrawer />
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
