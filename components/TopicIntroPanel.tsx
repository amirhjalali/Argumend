"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Scale, ChevronRight, Sparkles } from "lucide-react";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import { topics } from "@/data/topics";

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

  if (!topic || !isVisible) return null;

  const handleFocusCrux = () => {
    if (cruxNode) {
      // Use the store's focus mechanism
      useLogicGraph.getState().setFocusTargets([cruxNode.id]);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-md"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#D4A012]/10 to-[#CF7B3E]/5 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#D4A012]" strokeWidth={2} />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8B6914]">
                Now Exploring
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
                    <p className="text-sm text-secondary mb-4 line-clamp-2">
                      {topic.meta_claim}
                    </p>
                  )}

                  {/* Confidence Score */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-secondary">Confidence:</span>
                      <span
                        className="text-sm font-bold"
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
                    </div>
                    <span className="text-xs text-stone-400">|</span>
                    <span className="text-xs text-secondary">
                      {topic.confidence_score >= 80
                        ? "Strong evidence"
                        : topic.confidence_score >= 50
                        ? "Moderate evidence"
                        : "Contested"}
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

                  {/* Action */}
                  <button
                    onClick={handleFocusCrux}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#a23b3b] to-[#c45c5c] text-white text-sm font-semibold shadow-md shadow-[#a23b3b]/20 hover:shadow-lg hover:shadow-[#a23b3b]/30 hover:-translate-y-0.5 transition-all"
                  >
                    Find the Crux
                    <Scale className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
