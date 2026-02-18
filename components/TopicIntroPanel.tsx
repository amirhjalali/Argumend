"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Scale, ChevronRight, Map } from "lucide-react";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import { topics } from "@/data/topics";


export function TopicIntroPanel() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [prevTopicId, setPrevTopicId] = useState<string | null>(null);
  const currentTopicId = useLogicGraph((state) => state.currentTopicId);
  const nodes = useLogicGraph((state) => state.nodes);

  const topic = topics.find((t) => t.id === currentTopicId);

  // Find the crux node for this topic
  const cruxNode = nodes.find((n) => n.data.variant === "crux");

  // Reset visibility when topic changes (using state to avoid ref-during-render and setState-in-effect)
  if (prevTopicId !== currentTopicId) {
    setPrevTopicId(currentTopicId);
    if (!isVisible) setIsVisible(true);
    if (isMinimized) setIsMinimized(false);
  }

  const handleFocusCrux = () => {
    if (cruxNode) {
      useLogicGraph.getState().setFocusTargets([cruxNode.id]);
    }
  };

  // Check if any nodes have been expanded
  const expandedNodes = useLogicGraph((state) => state.expandedNodes);
  const hasExpandedAny = Object.values(expandedNodes).some(Boolean);

  return (
    <AnimatePresence>
      {topic && isVisible && (
      <motion.div
        key="topic-intro-panel"
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
        className="absolute z-20 top-auto bottom-3 left-1/2 -translate-x-1/2 w-[94%] max-w-xs md:top-4 md:bottom-auto md:left-auto md:right-4 md:translate-x-0 md:w-72"
      >
        <div className="bg-[#faf8f5]/95 backdrop-blur-sm rounded-2xl border border-stone-200/40 shadow-2xl overflow-hidden max-h-[45vh] md:max-h-none overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200/40">
            <div className="flex items-center gap-2">
              <Map className="h-3.5 w-3.5 text-deep" />
              <span className="text-[11px] font-semibold text-deep tracking-wide uppercase">
                Topic
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
                aria-label={isMinimized ? "Show topic details" : "Hide topic details"}
              >
                <ChevronRight
                  className={`h-4 w-4 transition-transform duration-200 ${isMinimized ? "rotate-90" : "-rotate-90"}`}
                />
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1.5 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
                aria-label="Dismiss topic panel"
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
                  {/* Topic Title + Confidence inline */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h2 className="font-serif text-base font-bold text-primary truncate">
                      {topic.title}
                    </h2>
                    <span
                      className="text-xs font-bold font-mono tabular-nums flex-shrink-0 px-2 py-0.5 rounded-full"
                      style={{
                        color: topic.confidence_score >= 80
                          ? "#4f7b77"
                          : topic.confidence_score >= 50
                          ? "#C4613C"
                          : "#8B5A3C",
                        backgroundColor: topic.confidence_score >= 80
                          ? "#4f7b7712"
                          : topic.confidence_score >= 50
                          ? "#C4613C12"
                          : "#8B5A3C12",
                      }}
                    >
                      {topic.confidence_score}%
                    </span>
                  </div>

                  {/* Brief description */}
                  <p className="text-xs text-stone-500 leading-relaxed mb-4 line-clamp-2">
                    {topic.meta_claim}
                  </p>

                  {/* Contextual Action */}
                  {hasExpandedAny && cruxNode ? (
                    <button
                      onClick={handleFocusCrux}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#a23b3b] text-white text-sm font-semibold hover:bg-[#8a3232] transition-all shadow-sm hover:shadow-md"
                    >
                      Find the Crux
                      <Scale className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsVisible(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rust-500 to-rust-600 text-white text-sm font-semibold hover:from-rust-600 hover:to-rust-700 transition-all shadow-md hover:shadow-lg"
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
