"use client";

import "@xyflow/react/dist/style.css";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
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
import { useSidebarState } from "@/hooks/useSidebarState";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { MapLegend } from "@/components/MapLegend";
import { ZoomIndicator } from "@/components/ZoomIndicator";
import { NavigationPath } from "@/components/NavigationPath";
import { TopicIntroPanel } from "@/components/TopicIntroPanel";
import { HeroAnalyze } from "@/components/HeroAnalyze";
import { FeaturedTopicHero } from "@/components/FeaturedTopicHero";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { topicSummaries, CATEGORY_ORDER } from "@/data/topicIndex";
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

// ---------------------------------------------------------------------------
// Sidebar layout wrapper -- eliminates duplication between hero and canvas views
// ---------------------------------------------------------------------------

interface SidebarLayoutProps {
  sidebar: ReturnType<typeof useSidebarState>;
  currentTopicId: string;
  onTopicSelect: (id: string) => void;
  children: React.ReactNode;
}

function SidebarLayout({
  sidebar,
  currentTopicId,
  onTopicSelect,
  children,
}: SidebarLayoutProps) {
  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      {/* Mobile overlay when sidebar is open */}
      <div
        className={`fixed inset-0 bg-black/30 z-30 md:hidden transition-opacity duration-300 ${
          sidebar.isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        role="button"
        tabIndex={sidebar.isOpen ? 0 : -1}
        aria-label="Close sidebar"
        onClick={sidebar.close}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sidebar.close(); } }}
      />

      {/* Sidebar Container */}
      <aside
        aria-label="Sidebar navigation"
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
            onTopicSelect={onTopicSelect}
          />
        </div>
      </aside>

      {children}
    </div>
  );
}

const GRID_TOPICS_COUNT = 6;

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
  const setView = useLogicGraph((state) => state.setView);

  const reactFlow = useReactFlow();
  const didHandleParams = useRef(false);

  const getNodeColor = useCallback((node: Node<LogicNodeData>): string => {
    return getMiniMapColor(node?.data?.variant);
  }, []);

  const handleTopicSelect = useCallback(
    (id: string) => {
      setTopic(id);
      setShowHero(false);
    },
    [setTopic]
  );

  // Handle URL params like ?topic=X&view=debate (from topic detail page links)
  // Intentional mount-time initialization from URL state, not a cascading render.
  useEffect(() => {
    if (didHandleParams.current) return;
    didHandleParams.current = true;
    const params = new URLSearchParams(window.location.search);
    const topicParam = params.get("topic");
    const viewParam = params.get("view");
    if (topicParam) {
      setTopic(topicParam);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional mount-time init from URL params
      setShowHero(false);
      if (viewParam === "debate") {
        setView("debate");
      } else if (viewParam === "scales") {
        setView("scales");
      }
      // Clean up URL without reload
      window.history.replaceState({}, "", "/");
    }
  }, [setTopic, setView]);

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
    const gridTopics = CATEGORY_ORDER
      .map((cat) => topicSummaries.find((t) => t.category === cat))
      .filter(Boolean)
      .slice(0, GRID_TOPICS_COUNT) as typeof topicSummaries;

    return (
      <div className="flex min-h-screen w-full flex-col bg-transparent font-sans text-primary">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[#4f7b77] focus:text-white focus:rounded"
        >
          Skip to main content
        </a>
        <TopBar onMenuClick={sidebar.toggle} showBackToHero={false} />

        <SidebarLayout
          sidebar={sidebar}
          currentTopicId={currentTopicId}
          onTopicSelect={handleTopicSelect}
        >
          <main id="main-content" role="main" className="relative flex-1 min-w-0 overflow-y-auto">
            {/* Section 1: Featured Topic Hero */}
            <FeaturedTopicHero onTopicSelect={handleTopicSelect} />

            {/* Section 2: Topic Grid */}
            <div className="px-4 md:px-8 py-10">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-serif text-xl font-semibold text-primary mb-5">
                  {topicSummaries.length} topics analyzed
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {gridTopics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => handleTopicSelect(topic.id)}
                      className="group text-left p-4 bg-white dark:bg-[#252420] border border-stone-200/60 dark:border-[#3d3a36] rounded-xl hover:border-deep/30 hover:shadow-md hover:scale-[1.01] hover:-translate-y-0.5 transition-all"
                    >
                      <h3 className="font-serif text-sm font-medium text-primary group-hover:text-deep transition-colors leading-snug line-clamp-2">
                        {topic.title}
                      </h3>
                      <span
                        className={`mt-2 inline-block text-xs font-mono px-1.5 py-0.5 rounded-md ${
                          topic.confidence_score >= 80
                            ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                            : topic.confidence_score >= 50
                            ? "bg-rust-50 dark:bg-rust-900/30 text-rust-600 dark:text-rust-400"
                            : "bg-stone-50 dark:bg-[#302e2a] text-stone-500"
                        }`}
                      >
                        {topic.confidence_score}%
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-5 text-center">
                  <Link
                    href="/topics"
                    className="inline-flex items-center gap-1 text-sm font-serif font-medium text-deep hover:text-deep-dark transition-colors group"
                  >
                    Browse all topics
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Section 3: Demoted Analyze CTA */}
            <HeroAnalyze onTopicSelect={handleTopicSelect} />

            <Footer />
          </main>
        </SidebarLayout>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-transparent font-sans text-primary">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[#4f7b77] focus:text-white focus:rounded"
      >
        Skip to main content
      </a>
      <TopBar
        onMenuClick={sidebar.toggle}
        showBackToHero
        onBackToHero={() => setShowHero(true)}
      />

      <SidebarLayout
        sidebar={sidebar}
        currentTopicId={currentTopicId}
        onTopicSelect={handleTopicSelect}
      >
        <main id="main-content" role="main" className="relative flex-1 min-w-0">
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
        </main>
      </SidebarLayout>
    </div>
  );
}

export default function HomeClient() {
  return (
    <ReactFlowProvider>
      <CanvasExperience />
    </ReactFlowProvider>
  );
}
