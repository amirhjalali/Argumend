"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  topics,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
} from "@/data/topics";
import type { TopicCategory } from "@/lib/schemas/topic";

const CATEGORY_BORDER_COLORS: Record<TopicCategory, string> = {
  policy: "border-l-blue-400",
  technology: "border-l-violet-400",
  science: "border-l-emerald-400",
  economics: "border-l-rust-400",
  philosophy: "border-l-stone-400",
};

const STORAGE_KEY = "argumend-quickstart-dismissed";

interface QuickStartBannerProps {
  onTopicSelect: (id: string) => void;
}

export function QuickStartBanner({ onTopicSelect }: QuickStartBannerProps) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !localStorage.getItem(STORAGE_KEY);
  });
  const [activeCategory, setActiveCategory] = useState<TopicCategory | null>(
    null
  );

  const handleDismiss = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  }, []);

  const handleCategoryClick = useCallback(
    (category: TopicCategory) => {
      if (activeCategory === category) {
        setActiveCategory(null);
      } else {
        setActiveCategory(category);
      }
    },
    [activeCategory]
  );

  // When a category is active, show its topics
  const filteredTopics = activeCategory
    ? topics.filter((t) => t.category === activeCategory)
    : [];

  // Show 4 categories as pills
  const categoryPills = CATEGORY_ORDER.slice(0, 4);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8, height: 0, marginBottom: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl mx-auto px-4 pt-6 mb-0"
        >
          <div className="relative bg-[#faf8f5] rounded-xl border border-stone-200/60 shadow-sm overflow-hidden">
            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 p-1 rounded-md text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors z-10"
              aria-label="Dismiss"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <div className="p-5">
              {/* Quick start heading */}
              <p className="text-xs font-medium text-stone-500 mb-3">
                Jump in — browse topics by category:
              </p>

              {/* Category pills */}
              <div className="flex flex-wrap gap-2">
                {categoryPills.map((cat) => {
                  const isActive = activeCategory === cat;
                  const count = topics.filter(
                    (t) => t.category === cat
                  ).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => handleCategoryClick(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                        isActive
                          ? "bg-[#4f7b77] text-white border-[#4f7b77]"
                          : "bg-white text-stone-600 border-stone-200 hover:border-deep/40 hover:text-deep"
                      }`}
                    >
                      {CATEGORY_LABELS[cat]}
                      <span
                        className={`ml-1.5 ${
                          isActive ? "text-white/70" : "text-stone-400"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Filtered topics list */}
              <AnimatePresence mode="wait">
                {activeCategory && filteredTopics.length > 0 && (
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {filteredTopics.slice(0, 4).map((topic) => (
                        <button
                          key={topic.id}
                          onClick={() => {
                            onTopicSelect(topic.id);
                            handleDismiss();
                          }}
                          className={`group text-left p-3.5 bg-white border border-stone-200/60 border-l-2 ${CATEGORY_BORDER_COLORS[topic.category]} rounded-xl hover:border-deep/30 hover:shadow-sm transition-all duration-200`}
                        >
                          <h4 className="font-serif text-xs font-medium text-primary group-hover:text-deep transition-colors leading-snug">
                            {topic.title}
                          </h4>
                          <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-stone-400">
                            <span
                              className={`px-1.5 py-0.5 rounded-full border ${
                                topic.status === "settled"
                                  ? "border-emerald-200 text-emerald-500"
                                  : topic.status === "contested"
                                  ? "border-rust-200 text-rust-500"
                                  : "border-stone-200 text-stone-400"
                              }`}
                            >
                              {topic.status}
                            </span>
                            <span>{topic.pillars.length} pillars</span>
                            <span className="font-mono text-[11px] text-stone-400 ml-auto">
                              {topic.confidence_score}%
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
