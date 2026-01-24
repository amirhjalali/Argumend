"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Landmark,
  Swords,
  Shield,
  Scale,
  ScrollText,
  MessageCircleQuestion,
  Info,
  X,
  Crown,
} from "lucide-react";

const LEGEND_ITEMS = [
  {
    label: "Meta Claim",
    description: "The central thesis being analyzed",
    color: "#2563eb",
    Icon: Crown,
  },
  {
    label: "Proponent",
    description: "Arguments supporting the claim",
    color: "#D4A012",
    Icon: Shield,
  },
  {
    label: "Skeptic",
    description: "Counter-arguments and critiques",
    color: "#8B5A3C",
    Icon: Swords,
  },
  {
    label: "Evidence",
    description: "Supporting data and references",
    color: "#CF7B3E",
    Icon: ScrollText,
  },
  {
    label: "Crux",
    description: "Key disagreement points",
    color: "#a23b3b",
    Icon: Scale,
  },
  {
    label: "Inquiry",
    description: "Open questions to explore",
    color: "#78716c",
    Icon: MessageCircleQuestion,
  },
];

export function MapLegend() {
  // Open by default on desktop; on mobile, auto-collapse after 4 seconds
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) {
      const timer = setTimeout(() => setIsOpen(false), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="absolute bottom-3 left-3 md:bottom-6 md:left-6 z-50">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="legend"
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-52 md:w-64 rounded-lg border border-stone-200/60 bg-[#fefcf9]/95 backdrop-blur-sm p-3 md:p-4 shadow-[0_2px_8px_rgba(120,100,80,0.08)] max-h-[40vh] md:max-h-none overflow-y-auto"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-base font-semibold text-primary">
                How to Read This Map
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
                aria-label="Collapse legend"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              {LEGEND_ITEMS.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div
                    className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-md flex-shrink-0"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <item.Icon
                      className="h-3.5 w-3.5"
                      style={{ color: item.color }}
                      strokeWidth={2}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[13px] font-semibold leading-tight"
                      style={{ color: item.color }}
                    >
                      {item.label}
                    </p>
                    <p className="text-[12px] leading-snug text-stone-500 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-stone-200 pt-3">
              <p className="text-[12px] text-stone-500">
                <span className="font-semibold text-stone-600">Tip:</span> Click &ldquo;Explore&rdquo; on nodes to reveal deeper arguments.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="button"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-stone-200/60 bg-[#fefcf9]/90 backdrop-blur-sm px-2.5 py-1.5 text-xs text-stone-500 shadow-[0_2px_8px_rgba(120,100,80,0.08)] hover:border-stone-300 transition-colors"
          >
            <Info className="h-3.5 w-3.5 text-stone-400" />
            <span>Legend</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
