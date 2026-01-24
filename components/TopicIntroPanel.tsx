"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Scale, ChevronRight } from "lucide-react";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import { topics } from "@/data/topics";

// Confidence score methodology explanation
const CONFIDENCE_METHODOLOGY = {
  high: {
    range: "80-100%",
    label: "Strong Evidence",
    description: "Multiple independent lines of verified evidence. Scientific consensus with reproducible results.",
    factors: ["Verified cruxes with reproducible methodology", "Independent confirmation from multiple sources", "Strong scientific consensus"]
  },
  medium: {
    range: "50-79%",
    label: "Moderate Evidence",
    description: "Significant evidence exists but with notable uncertainties or ongoing research.",
    factors: ["Partially verified cruxes", "Some disputed evidence", "Active academic debate"]
  },
  low: {
    range: "0-49%",
    label: "Contested",
    description: "Fundamental disagreements remain. Evidence is limited, theoretical, or interpretive.",
    factors: ["Mostly theoretical cruxes", "Limited empirical evidence", "Significant expert disagreement"]
  }
};

export function TopicIntroPanel() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const currentTopicId = useLogicGraph((state) => state.currentTopicId);
  const nodes = useLogicGraph((state) => state.nodes);

  const topic = topics.find((t) => t.id === currentTopicId);

  // Find the crux node for this topic
  const cruxNode = nodes.find((n) => n.data.variant === "crux");

  // Reset visibility when topic changes
  useEffect(() => {
    setIsVisible(true);
    setIsMinimized(false);
  }, [currentTopicId]);

  const handleFocusCrux = () => {
    if (cruxNode) {
      // Use the store's focus mechanism
      useLogicGraph.getState().setFocusTargets([cruxNode.id]);
    }
  };

  // Get the appropriate methodology based on score
  const getMethodology = (score: number) => {
    if (score >= 80) return CONFIDENCE_METHODOLOGY.high;
    if (score >= 50) return CONFIDENCE_METHODOLOGY.medium;
    return CONFIDENCE_METHODOLOGY.low;
  };

  const methodology = topic ? getMethodology(topic.confidence_score) : CONFIDENCE_METHODOLOGY.low;

  // Check if any nodes have been expanded
  const expandedNodes = useLogicGraph((state) => state.expandedNodes);
  const hasExpandedAny = Object.values(expandedNodes).some(Boolean);

  return (
    <AnimatePresence>
      {topic && isVisible && (
      <motion.div
        key="topic-intro-panel"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="absolute z-20 top-auto bottom-3 left-1/2 -translate-x-1/2 w-[94%] max-w-md md:top-4 md:bottom-auto md:max-w-lg"
      >
        <div className="bg-[#fefcf9]/95 backdrop-blur-sm rounded-lg border border-stone-200/60 shadow-[0_2px_8px_rgba(120,100,80,0.08)] overflow-hidden max-h-[45vh] md:max-h-none overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-stone-400 tracking-wide">
                Topic
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
                aria-label={isMinimized ? "Expand" : "Minimize"}
              >
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${isMinimized ? "rotate-90" : "-rotate-90"}`}
                />
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Content - collapsible */}
          <AnimatePresence>
            {!isMinimized && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-4">
                  {/* Topic Title */}
                  <h2 className="font-serif text-xl font-semibold text-primary mb-2">
                    {topic.title}
                  </h2>

                  {/* Meta claim */}
                  {topic.meta_claim && (
                    <p className="text-sm text-secondary mb-4 leading-relaxed">
                      {topic.meta_claim}
                    </p>
                  )}

                  {/* Confidence Score - inline, simple */}
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-xs text-secondary">Confidence:</span>
                    <span
                      className="text-sm font-bold font-mono tabular-nums"
                      style={{
                        color: topic.confidence_score >= 80
                          ? "#D4A012"
                          : topic.confidence_score >= 50
                          ? "#CF7B3E"
                          : "#8B5A3C"
                      }}
                    >
                      {topic.confidence_score}%
                    </span>
                    <span
                      className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: topic.confidence_score >= 80
                          ? "#D4A012"
                          : topic.confidence_score >= 50
                          ? "#CF7B3E"
                          : "#8B5A3C",
                        color: "white"
                      }}
                    >
                      {methodology.label}
                    </span>
                  </div>

                  {/* Crux Highlight */}
                  {cruxNode && cruxNode.data.detail && (
                    <div className="p-3 rounded-xl bg-gradient-to-br from-[#a23b3b]/10 to-[#a23b3b]/5 border border-[#a23b3b]/20 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Scale className="h-4 w-4 text-[#a23b3b]" strokeWidth={2} />
                        <span className="text-xs font-bold uppercase tracking-wider text-[#a23b3b]">
                          The Key Question
                        </span>
                      </div>
                      <p className="text-sm font-serif italic text-[#7a2929] leading-relaxed">
                        &ldquo;{cruxNode.data.detail.description}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Contextual Action */}
                  {hasExpandedAny && cruxNode ? (
                    <button
                      onClick={handleFocusCrux}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#a23b3b] text-white text-sm font-medium hover:bg-[#8a3232] transition-colors"
                    >
                      Find the Crux
                      <Scale className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsVisible(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1f1f1d] text-white text-sm font-medium hover:bg-[#3a3a38] transition-colors"
                    >
                      Explore the Map
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
