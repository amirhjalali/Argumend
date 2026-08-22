"use client";

import { useEffect, useState, useCallback, useRef, type RefObject } from "react";
import dynamic from "next/dynamic";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import { useSidebarState } from "@/hooks/useSidebarState";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { HeroAnalyze } from "@/components/HeroAnalyze";
import { FeaturedTopicHero } from "@/components/FeaturedTopicHero";
import { Footer } from "@/components/Footer";
import { BalanceWeightChip } from "@/components/BalanceWeightChip";
import Link from "next/link";
import { ChevronRight, Network } from "lucide-react";
import { topicSummaries, CATEGORY_ORDER, featuredTopicId } from "@/data/topicIndex";
import { FEATURES } from "@/lib/constants";
import { useMobileSidebarA11y } from "@/hooks/useMobileSidebarA11y";
import { ViewToggle } from "@/components/ViewToggle";
import { argumentTopicIndex } from "@/lib/argument/topicIds";

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

const GRID_TOPICS_COUNT = 6;

function FlagshipDebateMaps() {
  return (
    <section
      aria-labelledby="flagship-debate-maps-heading"
      className="px-4 pb-8 pt-6 md:px-8 md:pb-10 md:pt-8"
    >
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-rust-200/70 bg-rust-50/40 shadow-sm dark:border-rust-900/50 dark:bg-rust-900/10">
        <div className="border-b border-rust-200/60 px-5 py-6 sm:px-7 dark:border-rust-900/40">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-rust-700 dark:text-rust-300">
            <Network className="h-4 w-4" aria-hidden />
            Start here · Debate maps
          </div>
          <div className="mt-3 grid gap-2 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)] md:items-end md:gap-8">
            <h1
              id="flagship-debate-maps-heading"
              className="font-serif text-2xl font-semibold leading-tight text-primary dark:text-stone-200 sm:text-3xl"
            >
              The whole fight, not a verdict.
            </h1>
            <p className="text-sm leading-relaxed text-secondary dark:text-stone-400">
              Choose a live question to compare four serious positions, the
              load-bearing cruxes between them, and the evidence each camp
              reads differently — all in about five minutes.
            </p>
          </div>
        </div>

        <div className="grid divide-y divide-rust-200/60 md:grid-cols-3 md:divide-x md:divide-y-0 dark:divide-rust-900/40">
          {argumentTopicIndex.map((topic) => (
            <Link
              key={topic.id}
              href={`/topics/${topic.id}`}
              className="group flex min-h-48 flex-col p-5 transition-colors hover:bg-white/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-rust-600 sm:p-6 dark:hover:bg-white/5"
            >
              <h2 className="font-serif text-xl leading-snug text-primary dark:text-stone-200 transition-colors group-hover:text-rust-700 dark:group-hover:text-rust-300">
                {topic.title}
              </h2>
              <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-secondary dark:text-stone-400">
                {topic.tagline}
              </p>
              <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-rust-700 dark:text-rust-300">
                Open debate map
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
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
    const gridTopics = CATEGORY_ORDER
      .map((cat) => topicSummaries.find((t) => t.category === cat))
      .filter(Boolean)
      .slice(0, GRID_TOPICS_COUNT) as typeof topicSummaries;

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
            {/* Section 1: primary discovery path for the flagship maps. */}
            <FlagshipDebateMaps />

            {/* Section 2: legacy featured-topic experience. */}
            <FeaturedTopicHero
              onTopicSelect={handleTopicSelect}
              headingLevel="h2"
              preview={
                FEATURES.LIVE_HERO_CANVAS && !isMobile ? (
                  <HeroMiniCanvas
                    onClick={() => handleTopicSelect(featuredTopicId)}
                  />
                ) : undefined
              }
            />

            {/* Section 3: Topic Grid */}
            <div className="px-4 md:px-8 py-10">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-serif text-xl font-semibold text-primary dark:text-stone-200 mb-5">
                  {topicSummaries.length} topics analyzed
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {gridTopics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => handleTopicSelect(topic.id)}
                      className="group text-left p-4 bg-white dark:bg-[var(--bg-card)] border border-stone-200/60 dark:border-[var(--border-divider)] rounded-xl hover:border-deep/30 hover:shadow-md hover:scale-[1.01] hover:-translate-y-0.5 transition-all"
                    >
                      <h3 className="font-serif text-sm font-medium text-primary dark:text-stone-200 group-hover:text-deep transition-colors leading-snug line-clamp-2">
                        {topic.title}
                      </h3>
                      <BalanceWeightChip
                        balance={topic.balance}
                        weight={topic.weight}
                        verdict={topic.verdict}
                        showLabel
                        className="mt-2"
                      />
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

            {/* Section 4: Demoted Analyze CTA */}
            <HeroAnalyze onTopicSelect={handleTopicSelect} />

            <Footer />
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
