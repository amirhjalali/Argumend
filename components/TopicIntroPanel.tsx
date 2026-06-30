"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Scale, ChevronRight, Map } from "lucide-react";
import { useLogicGraph } from "@/hooks/useLogicGraph";
import { topicSummaries } from "@/data/topicIndex";

// Once dismissed (timer, X, "Explore", or first canvas interaction) the intro
// stays gone for the rest of the session so it never re-occludes the canvas
// when the user switches topics or toggles views.
const SESSION_KEY = "argumend-intro-dismissed";
// How long the intro lingers before auto-dismissing if the user does nothing.
const AUTO_DISMISS_MS = 7000;

interface TopicIntroPanelProps {
  /**
   * Flips true on the user's first real canvas interaction (pan/zoom/node
   * click). Lifted in DesktopCanvas because only the ReactFlow instance can
   * observe those events. Dismisses the panel so it stops occluding nodes.
   */
  userInteracted?: boolean;
}

export function TopicIntroPanel({ userInteracted = false }: TopicIntroPanelProps) {
  // Lazy-init from sessionStorage: a dismissal earlier this session keeps the
  // panel hidden even after DesktopCanvas remounts (e.g. Scales → Map). Safe to
  // read on init because this component is client-only (DesktopCanvas is ssr:false).
  const [dismissedState, setDismissedState] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [isMinimized, setIsMinimized] = useState(false);
  const [prevTopicId, setPrevTopicId] = useState<string | null>(null);

  // Read prefers-reduced-motion once on mount (client-only) so the entrance can
  // be a quick fade instead of the spring/translate for motion-sensitive users.
  const [reducedMotion] = useState<boolean>(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const currentTopicId = useLogicGraph((state) => state.currentTopicId);
  // Subscribe to only the crux node ID, not the entire nodes array
  const cruxNodeId = useLogicGraph((state) => {
    const crux = state.nodes.find((n) => n.data.variant === "crux");
    return crux?.id ?? null;
  });
  // Derive a boolean rather than subscribing to the full expandedNodes object
  const hasExpandedAny = useLogicGraph((state) =>
    Object.values(state.expandedNodes).some(Boolean)
  );

  const topic = topicSummaries.find((t) => t.id === currentTopicId);
  const hasTopic = !!topic;

  // A first canvas interaction dismisses the panel just like an explicit close.
  const dismissed = dismissedState || userInteracted;
  const isVisible = hasTopic && !dismissed;

  // Reset the minimized state when the topic changes (render-time to avoid
  // ref-during-render and setState-in-effect). Visibility is derived from
  // `dismissed`, so a non-dismissed panel re-shows for each new topic on its own.
  if (prevTopicId !== currentTopicId) {
    setPrevTopicId(currentTopicId);
    if (isMinimized) setIsMinimized(false);
  }

  // Persist any dismissal (including a first interaction) so it survives remounts.
  useEffect(() => {
    if (!dismissed) return;
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* sessionStorage may be unavailable (private mode) — non-fatal */
    }
  }, [dismissed]);

  // Auto-dismiss after a short linger so the panel never permanently occludes
  // nodes. Keyed on the topic so each freshly shown topic gets its own timer.
  useEffect(() => {
    if (dismissed || !hasTopic) return;
    const timer = window.setTimeout(() => setDismissedState(true), AUTO_DISMISS_MS);
    return () => window.clearTimeout(timer);
  }, [dismissed, hasTopic, currentTopicId]);

  const handleFocusCrux = () => {
    if (cruxNodeId) {
      useLogicGraph.getState().setFocusTargets([cruxNodeId]);
    }
  };

  const motionProps = reducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 },
      }
    : {
        initial: { opacity: 0, y: -20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -20, scale: 0.95 },
        transition: { type: "spring" as const, duration: 0.4, bounce: 0.15 },
      };

  return (
    <AnimatePresence>
      {isVisible && (
      <motion.div
        key="topic-intro-panel"
        {...motionProps}
        className="absolute z-20 top-auto bottom-3 left-1/2 -translate-x-1/2 w-[94%] max-w-xs md:top-4 md:bottom-auto md:left-auto md:right-4 md:translate-x-0 md:w-72"
      >
        <div className="bg-[#faf8f5]/95 dark:bg-[var(--bg-card)]/95 backdrop-blur-sm rounded-2xl border border-stone-200/40 dark:border-[var(--border-default)] shadow-2xl overflow-hidden max-h-[45vh] md:max-h-none overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200/40 dark:border-[var(--border-default)]">
            <div className="flex items-center gap-2">
              <Map className="h-3.5 w-3.5 text-deep" />
              <span className="text-[11px] font-semibold text-deep tracking-wide uppercase">
                Topic
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-[#302e2a] transition-colors"
                aria-label={isMinimized ? "Show topic details" : "Hide topic details"}
              >
                <ChevronRight
                  className={`h-4 w-4 transition-transform duration-200 ${isMinimized ? "rotate-90" : "-rotate-90"}`}
                />
              </button>
              <button
                onClick={() => setDismissedState(true)}
                className="p-1.5 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-[#302e2a] transition-colors"
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
                initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: reducedMotion ? 0.12 : 0.2 }}
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
                  <p className="text-xs text-stone-500 dark:text-[#8a8279] leading-relaxed mb-4 line-clamp-2">
                    {topic.meta_claim}
                  </p>

                  {/* Contextual Action */}
                  {hasExpandedAny && cruxNodeId ? (
                    <button
                      onClick={handleFocusCrux}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#a23b3b] text-white text-sm font-semibold hover:bg-[#8a3232] transition-all shadow-sm hover:shadow-md"
                    >
                      Find the Crux
                      <Scale className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setDismissedState(true)}
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
