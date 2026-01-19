"use client";

import { useState } from "react";
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
} from "lucide-react";

const LEGEND_ITEMS = [
  {
    label: "Meta Claim",
    description: "The central thesis being analyzed",
    color: "#c9a227",
    Icon: Landmark,
  },
  {
    label: "Proponent",
    description: "Arguments supporting the claim",
    color: "#c9a227",
    Icon: Shield,
  },
  {
    label: "Skeptic",
    description: "Counter-arguments and critiques",
    color: "#8b4513",
    Icon: Swords,
  },
  {
    label: "Evidence",
    description: "Supporting data and references",
    color: "#b87333",
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute bottom-6 left-6 z-50">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="legend"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-64 rounded-xl border-2 border-[#c9b896] bg-gradient-to-br from-[#f8f3e8] to-[#f0ebe0] p-4 shadow-lg"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-serif text-sm font-bold text-primary">
                Map Legend
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-muted transition-colors hover:bg-stone-200 hover:text-primary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2.5">
              {LEGEND_ITEMS.map((item) => (
                <div key={item.label} className="flex items-start gap-2.5">
                  <div
                    className="mt-0.5 flex h-5 w-5 items-center justify-center rounded"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <item.Icon
                      className="h-3.5 w-3.5"
                      style={{ color: item.color }}
                      strokeWidth={2}
                    />
                  </div>
                  <div className="flex-1">
                    <p
                      className="text-xs font-semibold"
                      style={{ color: item.color }}
                    >
                      {item.label}
                    </p>
                    <p className="text-[10px] leading-tight text-secondary">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 border-t border-stone-300 pt-3">
              <p className="text-[10px] text-muted">
                <span className="font-semibold">Tip:</span> Click nodes to expand and explore the argument map.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 rounded-xl border-2 border-[#c9b896] bg-gradient-to-br from-[#f8f3e8] to-[#f0ebe0] px-3 py-2 text-xs font-semibold text-secondary shadow-md transition-all hover:border-[#c9a227] hover:shadow-lg"
          >
            <Info className="h-4 w-4 text-[#c9a227]" />
            <span>Legend</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
