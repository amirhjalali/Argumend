"use client";

import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import { useSidebarState, SIDEBAR_WIDTH } from "@/hooks/useSidebarState";
import { ANIMATION } from "@/lib/constants";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const sidebar = useSidebarState();
  const currentTopicId = useLogicGraph((state) => state.currentTopicId);
  const setTopic = useLogicGraph((state) => state.setTopic);

  return (
    <div className="flex min-h-screen w-full flex-col bg-transparent font-sans text-primary">
      <TopBar onMenuClick={sidebar.toggle} />

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
            flex-shrink-0 transition-all duration-500
            ${sidebar.isOpen ? `w-[${SIDEBAR_WIDTH}px]` : "w-0 md:w-0"}
          `}
          style={{ transitionTimingFunction: ANIMATION.SPRING_EASING }}
        >
          {/* Sidebar - slides in from left with spring easing */}
          <div
            className={`absolute top-0 bottom-0 left-0 w-[${SIDEBAR_WIDTH}px] transition-transform duration-500 ${
              sidebar.isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            style={{ transitionTimingFunction: ANIMATION.SPRING_EASING }}
          >
            <Sidebar
              isOpen={sidebar.isOpen}
              onClose={sidebar.close}
              currentTopicId={currentTopicId}
              onTopicSelect={setTopic}
            />
          </div>

          {/* Shadow overlay when sidebar is open - adds depth (desktop only) */}
          <div
            className={`hidden md:block absolute inset-y-0 right-0 w-4 pointer-events-none transition-opacity duration-300 ${
              sidebar.isOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.04), transparent)",
            }}
          />
        </div>

        {/* Main Content Area */}
        <main id="main-content" className="relative flex-1 min-w-0 overflow-y-auto">
          {/* Content inner shadow for depth */}
          <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_4px_0_12px_-4px_rgba(0,0,0,0.04)]" />

          <div className="relative z-0">
            {children}
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
