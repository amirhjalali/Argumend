"use client";

import { useEffect, useState, useCallback, useRef, type RefObject } from "react";
import dynamic from "next/dynamic";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import { useSidebarState } from "@/hooks/useSidebarState";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { HomeLanding } from "@/components/home/HomeLanding";
import { topicSummaries, featuredTopicId } from "@/data/topicIndex";
import { FEATURES } from "@/lib/constants";
import { useMobileSidebarA11y } from "@/hooks/useMobileSidebarA11y";
import { ViewToggle } from "@/components/ViewToggle";

const HOME_SIDEBAR_ID = "home-sidebar-navigation";

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

// The interactive React Flow canvas — code-split with ssr:false so React Flow
// (+CSS) is never shipped to mobile sessions (which render MobileArgumentList)
// or the hero landing. Owns its own ReactFlowProvider.
const DesktopCanvas = dynamic(() => import("@/components/DesktopCanvas"), {
  ssr: false,
});

// Self-building mini argument-map shown in the hero. Isolated React Flow
// instance (its own provider + local state), client-only to avoid SSR/hydration
// issues. Gated behind FEATURES.LIVE_HERO_CANVAS + non-mobile in CanvasExperience.
const HeroMiniCanvas = dynamic(() => import("@/components/HeroMiniCanvas"), {
  ssr: false,
});
// ---------------------------------------------------------------------------
// Sidebar layout wrapper -- eliminates duplication between hero and canvas views
// ---------------------------------------------------------------------------

interface SidebarLayoutProps {
  sidebar: ReturnType<typeof useSidebarState>;
  currentTopicId: string;
  onTopicSelect: (id: string) => void;
  sidebarRef: RefObject<HTMLElement | null>;
  children: React.ReactNode;
}

function SidebarLayout({
  sidebar,
  currentTopicId,
  onTopicSelect,
  sidebarRef,
  children,
}: SidebarLayoutProps) {
  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      {/* Mobile overlay when sidebar is open */}
      <div
        className={`fixed inset-0 bg-black/30 z-30 md:hidden ${
          sidebar.mounted ? "transition-opacity duration-300" : ""
        } ${sidebar.isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        role="button"
        tabIndex={sidebar.isOpen ? 0 : -1}
        aria-label="Close sidebar"
        onClick={sidebar.close}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sidebar.close(); } }}
      />

      {/* Sidebar Container */}
      <aside
        ref={sidebarRef}
        id={HOME_SIDEBAR_ID}
        aria-label="Sidebar navigation"
        aria-hidden={!sidebar.isOpen}
        inert={!sidebar.isOpen}
        className={`
          fixed md:relative top-0 md:top-auto bottom-0 left-0 z-40 md:z-auto
          flex-shrink-0 ${sidebar.mounted ? "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]" : ""}
          ${sidebar.isOpen ? "w-[260px]" : "w-0 md:w-0"}
        `}
      >
        <div
          className={`absolute top-0 bottom-0 left-0 w-[260px] ${
            sidebar.mounted ? "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]" : ""
          } ${sidebar.isOpen ? "translate-x-0" : "-translate-x-full"}`}
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

function CanvasExperience() {
  const sidebar = useSidebarState();
  const isMobile = useIsMobile();
  const [showHero, setShowHero] = useState(true);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  useMobileSidebarA11y({
    isOpen: sidebar.isOpen,
    close: sidebar.close,
    drawerRef: sidebarRef,
    triggerRef: menuButtonRef,
  });

  const currentTopicId = useLogicGraph((state) => state.currentTopicId);
  const setTopic = useLogicGraph((state) => state.setTopic);
  const currentView = useLogicGraph((state) => state.currentView);
  const setView = useLogicGraph((state) => state.setView);

  const didHandleParams = useRef(false);

  const handleTopicSelect = useCallback(
    (id: string) => {
      setTopic(id);
      setShowHero(false);
      const params = new URLSearchParams({ topic: id, view: currentView });
      window.history.replaceState({}, "", `/?${params.toString()}`);
    },
    [currentView, setTopic]
  );

  const handleBackToHero = useCallback(() => {
    setView("logic-map");
    setShowHero(true);
    window.history.replaceState({}, "", "/");
  }, [setView]);

  // Handle URL params like ?topic=X&view=debate (from topic detail page links)
  // Intentional mount-time initialization from URL state, not a cascading render.
  useEffect(() => {
    if (didHandleParams.current) return;
    didHandleParams.current = true;
    const params = new URLSearchParams(window.location.search);
    const topicParam = params.get("topic");
    const viewParam = params.get("view");
    const topicExists = topicParam
      ? topicSummaries.some((topic) => topic.id === topicParam)
      : false;
    if (topicParam && topicExists) {
      setTopic(topicParam);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional mount-time init from URL params
      setShowHero(false);
      if (viewParam === "debate") {
        setView("debate");
      } else if (viewParam === "scales") {
        setView("scales");
      } else if (viewParam === "graph" || viewParam === "logic-map") {
        setView("logic-map");
      }
      // Preserve the topic (and view) in the URL — instead of blanking it to
      // "/" — so refresh / bookmark / share retains the canvas state. Guarded
      // by didHandleParams above, so this runs once and never re-triggers the
      // ingest effect (replaceState does not cause a navigation or re-render).
      const preserved = new URLSearchParams({ topic: topicParam });
      if (viewParam === "graph" || viewParam === "logic-map") {
        preserved.set("view", "logic-map");
      } else if (viewParam) {
        preserved.set("view", viewParam);
      }
      window.history.replaceState({}, "", `/?${preserved.toString()}`);
    } else if (topicParam) {
      window.history.replaceState({}, "", "/");
    }
  }, [setTopic, setView]);

  // Show the hero landing when no topic has been explicitly selected
  if (showHero) {
    return (
      <div className="flex min-h-[100svh] w-full flex-col bg-transparent font-sans text-primary dark:text-stone-200">
        <TopBar
          onMenuClick={sidebar.toggle}
          showBackToHero={false}
          sidebarId={HOME_SIDEBAR_ID}
          sidebarOpen={sidebar.isOpen}
          menuButtonRef={menuButtonRef}
        />

        <SidebarLayout
          sidebar={sidebar}
          currentTopicId={currentTopicId}
          onTopicSelect={handleTopicSelect}
          sidebarRef={sidebarRef}
        >
          <main id="main-content" role="main" className="relative flex-1 min-w-0 overflow-y-auto">
            <HomeLanding
              onTopicSelect={handleTopicSelect}
              preview={
                FEATURES.LIVE_HERO_CANVAS && !isMobile ? (
                  <HeroMiniCanvas
                    onClick={() => handleTopicSelect(featuredTopicId)}
                  />
                ) : undefined
              }
            />
          </main>
        </SidebarLayout>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100svh] w-full flex-col bg-transparent font-sans text-primary dark:text-stone-200">
      <TopBar
        onMenuClick={sidebar.toggle}
        showBackToHero
        onBackToHero={handleBackToHero}
        viewToggle={<ViewToggle />}
        sidebarId={HOME_SIDEBAR_ID}
        sidebarOpen={sidebar.isOpen}
        menuButtonRef={menuButtonRef}
      />

      <SidebarLayout
        sidebar={sidebar}
        currentTopicId={currentTopicId}
        onTopicSelect={handleTopicSelect}
        sidebarRef={sidebarRef}
      >
        <main id="main-content" role="main" className="relative flex-1 min-w-0">
          <h1 className="sr-only">
            {topicSummaries.find((topic) => topic.id === currentTopicId)?.title ??
              "Interactive argument view"}
          </h1>
          {currentView === "scales" ? (
            <ScalesOfEvidence />
          ) : currentView === "debate" ? (
            <DebateView />
          ) : isMobile ? (
            <MobileArgumentList />
          ) : (
            <DesktopCanvas />
          )}
        </main>
      </SidebarLayout>
    </div>
  );
}

export default function HomeClient() {
  return <CanvasExperience />;
}
