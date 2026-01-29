"use client";

import { motion } from "framer-motion";
import { Map, Scale, Swords } from "lucide-react";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import type { ArgumentView } from "@/types/logic";

const views: { id: ArgumentView; label: string; icon: typeof Map }[] = [
  { id: "logic-map", label: "Logic Map", icon: Map },
  { id: "scales", label: "Scales", icon: Scale },
  { id: "debate", label: "Debate", icon: Swords },
];

export function ViewToggle() {
  const currentView = useLogicGraph((state) => state.currentView);
  const setView = useLogicGraph((state) => state.setView);

  return (
    <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg">
      {views.map((view) => {
        const Icon = view.icon;
        const isActive = currentView === view.id;

        return (
          <button
            key={view.id}
            onClick={() => setView(view.id)}
            className={`
              relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
              transition-colors duration-200
              ${isActive ? "text-primary" : "text-stone-500 hover:text-stone-700"}
            `}
          >
            {isActive && (
              <motion.div
                layoutId="view-toggle-bg"
                className="absolute inset-0 bg-white rounded-md shadow-sm"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative flex items-center gap-1.5">
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{view.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
