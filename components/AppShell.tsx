"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { useLogicGraph } from "@/hooks/useLogicGraph";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentTopicId = useLogicGraph((state) => state.currentTopicId);
  const setTopic = useLogicGraph((state) => state.setTopic);

  useEffect(() => {
    // Open sidebar by default on desktop
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(true);
    }
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-transparent font-sans text-primary">
      <TopBar onMenuClick={() => setIsSidebarOpen((prev) => !prev)} />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Sidebar Container - smooth slide animation */}
        <div
          className={`relative flex-shrink-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isSidebarOpen ? "w-[260px]" : "w-0"
          }`}
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

          {/* Shadow overlay when sidebar is open - adds depth */}
          <div
            className={`absolute inset-y-0 right-0 w-4 pointer-events-none transition-opacity duration-300 ${
              isSidebarOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background: "linear-gradient(to right, rgba(0,0,0,0.04), transparent)",
            }}
          />
        </div>

        {/* Main Content Area */}
        <div className="relative flex-1 min-w-0 overflow-y-auto">
          {/* Content inner shadow for depth */}
          <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_4px_0_12px_-4px_rgba(0,0,0,0.04)]" />

          <div className="relative z-0">
            {children}
          </div>
        </div>

        {/* Mobile overlay when sidebar is open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-30 md:hidden transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
