"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Scale, ChevronRight, Sparkles, Info, Swords, Shield, ChevronDown, HelpCircle } from "lucide-react";
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
  const [showMethodology, setShowMethodology] = useState(false);
  const [showDebatePreview, setShowDebatePreview] = useState(false);
  const currentTopicId = useLogicGraph((state) => state.currentTopicId);
  const nodes = useLogicGraph((state) => state.nodes);

  const topic = topics.find((t) => t.id === currentTopicId);

  // Find the crux node for this topic
  const cruxNode = nodes.find((n) => n.data.variant === "crux");

  // Get the first pillar for steel-man vs rebuttal preview
  const firstPillar = topic?.pillars[0];

  // Reset visibility when topic changes
  useEffect(() => {
    setIsVisible(true);
    setIsMinimized(false);
    setShowMethodology(false);
    setShowDebatePreview(false);
  }, [currentTopicId]);

  if (!topic || !isVisible) return null;

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

  const methodology = getMethodology(topic.confidence_score);

  // Check if any nodes have been expanded
  const expandedNodes = useLogicGraph((state) => state.expandedNodes);
  const hasExpandedAny = Object.values(expandedNodes).some(Boolean);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="absolute z-20 top-auto bottom-3 left-1/2 -translate-x-1/2 w-[94%] max-w-md md:top-4 md:bottom-auto md:max-w-lg"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-stone-200 overflow-hidden max-h-[45vh] md:max-h-none overflow-y-auto">
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
                    <p className="text-sm text-secondary mb-4 leading-relaxed">
                      {topic.meta_claim}
                    </p>
                  )}

                  {/* Confidence Score with Methodology */}
                  <div className="mb-4 pb-4 border-b border-stone-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-secondary">Confidence:</span>
                        <span
                          className="text-base font-bold tabular-nums"
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
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
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
                      <button
                        onClick={() => setShowMethodology(!showMethodology)}
                        className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-700 transition-colors"
                      >
                        <HelpCircle className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">How calculated?</span>
                        <ChevronDown className={`h-3 w-3 transition-transform ${showMethodology ? "rotate-180" : ""}`} />
                      </button>
                    </div>

                    {/* Confidence Methodology Explanation */}
                    <AnimatePresence>
                      {showMethodology && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 p-3 rounded-lg bg-stone-50 border border-stone-200">
                            <div className="flex items-start gap-2 mb-2">
                              <Info className="h-4 w-4 text-stone-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-xs font-semibold text-stone-700 mb-1">
                                  Score Range: {methodology.range}
                                </p>
                                <p className="text-xs text-stone-600 leading-relaxed mb-2">
                                  {methodology.description}
                                </p>
                                <ul className="space-y-1">
                                  {methodology.factors.map((factor, i) => (
                                    <li key={i} className="text-xs text-stone-500 flex items-start gap-1.5">
                                      <span className="text-stone-400">•</span>
                                      {factor}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Steel-man vs Rebuttal Preview (hidden on mobile to save space) */}
                  {firstPillar && (
                    <div className="mb-4 hidden md:block">
                      <button
                        onClick={() => setShowDebatePreview(!showDebatePreview)}
                        className="w-full flex items-center justify-between text-left mb-2"
                      >
                        <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                          The Core Debate
                        </span>
                        <ChevronDown className={`h-3.5 w-3.5 text-stone-400 transition-transform ${showDebatePreview ? "rotate-180" : ""}`} />
                      </button>

                      <AnimatePresence>
                        {showDebatePreview && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-3">
                              {/* Skeptic View */}
                              <div className="p-3 rounded-lg bg-[#8B5A3C]/5 border border-[#8B5A3C]/20">
                                <div className="flex items-center gap-2 mb-2">
                                  <Swords className="h-3.5 w-3.5 text-[#8B5A3C]" strokeWidth={2} />
                                  <span className="text-xs font-semibold text-[#8B5A3C] uppercase tracking-wide">
                                    Skeptic&apos;s Best Argument
                                  </span>
                                </div>
                                <p className="text-xs text-stone-700 leading-relaxed line-clamp-3">
                                  {firstPillar.skeptic_premise}
                                </p>
                              </div>

                              {/* Proponent Response */}
                              <div className="p-3 rounded-lg bg-[#D4A012]/5 border border-[#D4A012]/20">
                                <div className="flex items-center gap-2 mb-2">
                                  <Shield className="h-3.5 w-3.5 text-[#D4A012]" strokeWidth={2} />
                                  <span className="text-xs font-semibold text-[#8B6914] uppercase tracking-wide">
                                    Proponent&apos;s Response
                                  </span>
                                </div>
                                <p className="text-xs text-stone-700 leading-relaxed line-clamp-3">
                                  {firstPillar.proponent_rebuttal}
                                </p>
                              </div>

                              {topic.pillars.length > 1 && (
                                <p className="text-xs text-stone-500 text-center italic">
                                  + {topic.pillars.length - 1} more pillar{topic.pillars.length > 2 ? "s" : ""} to explore
                                </p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {!showDebatePreview && (
                        <div className="flex gap-2 text-xs">
                          <div className="flex-1 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#8B5A3C]/5 text-[#8B5A3C]">
                            <Swords className="h-3 w-3" strokeWidth={2} />
                            <span className="truncate">Skeptic</span>
                          </div>
                          <span className="text-stone-300 self-center">vs</span>
                          <div className="flex-1 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#D4A012]/5 text-[#8B6914]">
                            <Shield className="h-3 w-3" strokeWidth={2} />
                            <span className="truncate">Proponent</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

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

                  {/* Contextual Action - demote "Find the Crux" until graph is expanded */}
                  {hasExpandedAny && cruxNode ? (
                    <button
                      onClick={handleFocusCrux}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#a23b3b] to-[#c45c5c] text-white text-sm font-semibold shadow-md shadow-[#a23b3b]/20 hover:shadow-lg hover:shadow-[#a23b3b]/30 hover:-translate-y-0.5 transition-all"
                    >
                      Find the Crux
                      <Scale className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsVisible(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4A012] to-[#CF7B3E] text-white text-sm font-semibold shadow-md shadow-[#D4A012]/20 hover:shadow-lg hover:shadow-[#D4A012]/30 hover:-translate-y-0.5 transition-all"
                    >
                      Explore the Map
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
