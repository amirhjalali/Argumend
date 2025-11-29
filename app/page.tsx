"use client";

import "@xyflow/react/dist/style.css";

import { useEffect, useMemo } from "react";
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
import { ArrowRight, Compass, MousePointerClick, ScanLine } from "lucide-react";
import { topics } from "@/data/topics";

function CanvasExperience() {
  const nodeTypes = useMemo(
    () => ({
      metaNode: MetaNode,
      richNode: RichNode,
    }),
    [],
  );

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
    <div className="flex h-screen w-screen overflow-hidden bg-canvas text-primary">
      <Sidebar topics={topics} currentTopicId={currentTopicId} onSelectTopic={setTopic} />

      <div className="relative flex flex-1 flex-col overflow-hidden bg-[#050B1F]">
        <TopBar />

        <div className="relative flex-1 overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-64 bg-gradient-to-r from-canvas via-lw-parchment/80 to-transparent" />
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
              color="#2B3B57"
              gap={40}
              size={1}
              variant={BackgroundVariant.Dots}
              className=""
            />
            <Controls
              position="bottom-left"
              className="!bg-white/70 !border !border-white/20 !shadow-lw !text-secondary !rounded-full"
            />
          </ReactFlow>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#050B1F]" />

          <div className="pointer-events-none absolute bottom-10 left-12 z-30">
            <div className="flex items-center gap-4 rounded-full border border-white/30 bg-white/15 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-white backdrop-blur">
              <div className="flex items-center gap-2">
                <Compass className="h-3.5 w-3.5" />
                <span>Pan</span>
              </div>
              <div className="flex items-center gap-2">
                <MousePointerClick className="h-3.5 w-3.5" />
                <span>Expand</span>
              </div>
              <div className="flex items-center gap-2">
                <ScanLine className="h-3.5 w-3.5" />
                <span>Inspect</span>
              </div>
            </div>
          </div>

          {currentTopic && (
            <div className="pointer-events-auto absolute right-12 bottom-16 z-30 w-[360px] rounded-[28px] border border-white/15 bg-[#0B1327]/85 px-6 py-6 text-white shadow-[0_25px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <p className="text-[11px] uppercase tracking-[0.45em] text-white/70">Meta Claim</p>
              <h3 className="mt-2 font-serif text-[30px] leading-tight">{currentTopic.title}</h3>
              <p className="mt-2 text-sm text-white/80">{currentTopic.meta_claim}</p>

              <div className="mt-4 grid grid-cols-2 gap-4 text-[11px] uppercase tracking-[0.3em] text-white/60">
                <div>
                  <p>Confidence</p>
                  <p className="mt-2 font-serif text-3xl text-white">
                    {Math.round(currentTopic.confidence_score)}
                    <span className="text-sm align-top">%</span>
                  </p>
                </div>
                <div>
                  <p>Status</p>
                  <p className="mt-2 text-lg font-semibold capitalize text-white">{currentTopic.status}</p>
                </div>
              </div>

              {leadPillars.length > 0 && (
                <div className="mt-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/70">Key Pillars</p>
                  <ul className="mt-2 space-y-1 text-sm text-white/85">
                    {leadPillars.map((pillar) => (
                      <li key={pillar.id} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-main" />
                        <span>{pillar.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10">
                View analysis
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

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

