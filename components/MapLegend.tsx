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
    color: "#4f7b77",
    Icon: Crown,
  },
  {
    label: "Proponent",
    description: "Arguments supporting the claim",
    color: "#C4613C",
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
    color: "#4f7b77",
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
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-48 md:w-56 lg:w-64 rounded-2xl border border-stone-200/40 bg-[#faf8f5]/95 backdrop-blur-sm p-4 md:p-5 shadow-2xl max-h-[45vh] md:max-h-none overflow-y-auto"
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-sm md:text-base font-semibold text-primary">
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

            {/* Legend items */}
            <div className="space-y-2.5 md:space-y-3">
              {LEGEND_ITEMS.map((item) => (
                <div key={item.label} className="flex items-start gap-2.5 md:gap-3">
                  <div
                    className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg flex-shrink-0"
                    style={{ backgroundColor: `${item.color}12` }}
                  >
                    <item.Icon
                      className="h-3.5 w-3.5"
                      style={{ color: item.color }}
                      strokeWidth={2}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs font-semibold leading-tight"
                      style={{ color: item.color }}
                    >
                      {item.label}
                    </p>
                    <p className="text-[10px] md:text-[11px] leading-snug text-stone-500 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tip */}
            <div className="mt-4 border-t border-stone-200/60 pt-3">
              <p className="text-[11px] md:text-xs text-stone-500 leading-relaxed">
                <span className="font-semibold text-deep">Tip:</span> Click &ldquo;Explore&rdquo; on nodes to reveal deeper arguments.
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
            className="flex items-center gap-1.5 rounded-xl border border-stone-200/40 bg-[#faf8f5]/95 backdrop-blur-sm px-3 py-2 text-xs text-stone-500 shadow-lg hover:border-stone-300 hover:shadow-xl transition-all"
          >
            <Info className="h-3.5 w-3.5 text-deep" />
            <span className="font-medium">Legend</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
