"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Flame } from "lucide-react";
import {
  topics,
  featuredTopicId,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
} from "@/data/topics";
import type { TopicCategory } from "@/lib/schemas/topic";

const STORAGE_KEY = "argumend-quickstart-dismissed";

interface QuickStartBannerProps {
  onTopicSelect: (id: string) => void;
}

export function QuickStartBanner({ onTopicSelect }: QuickStartBannerProps) {
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<TopicCategory | null>(
    null
  );

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const handleDismiss = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  }, []);

  const handleStartFeatured = useCallback(() => {
    onTopicSelect(featuredTopicId);
    handleDismiss();
  }, [onTopicSelect, handleDismiss]);

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

  const featuredTopic = topics.find((t) => t.id === featuredTopicId);

  // When a category is active, show its topics
  const filteredTopics = activeCategory
    ? topics.filter(
        (t) => t.category === activeCategory && t.id !== featuredTopicId
      )
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
              {/* Featured topic suggestion */}
              {featuredTopic && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#4f7b77]/10 rounded-full text-[10px] font-semibold tracking-wide text-[#4f7b77]">
                      <Flame className="h-2.5 w-2.5" />
                      FEATURED TOPIC
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-semibold text-[#3d3a36] leading-snug">
                    {featuredTopic.title}
                  </h3>
                  <p className="mt-1 text-xs text-stone-500 leading-relaxed line-clamp-2">
                    {featuredTopic.meta_claim}
                  </p>
                  <button
                    onClick={handleStartFeatured}
                    className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold rounded-lg shadow-sm hover:shadow-md transition-all hover:brightness-105"
                  >
                    Start with this topic
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">
                <div className="h-px flex-1 bg-stone-200/60" />
                <span className="text-[10px] font-medium text-stone-400 tracking-wider uppercase">
                  or browse by category
                </span>
                <div className="h-px flex-1 bg-stone-200/60" />
              </div>

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
                          : "bg-white text-stone-600 border-stone-200 hover:border-[#4f7b77]/40 hover:text-[#4f7b77]"
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
                          className="group text-left p-3 bg-white border border-stone-200/60 rounded-lg hover:border-[#4f7b77]/40 hover:shadow-sm transition-all"
                        >
                          <h4 className="font-serif text-xs font-medium text-[#3d3a36] group-hover:text-[#4f7b77] transition-colors leading-snug">
                            {topic.title}
                          </h4>
                          <div className="mt-1 flex items-center gap-1.5 text-[10px] text-stone-400">
                            <span
                              className={`px-1.5 py-0.5 rounded-full border ${
                                topic.status === "settled"
                                  ? "border-emerald-200 text-emerald-500"
                                  : topic.status === "contested"
                                  ? "border-amber-200 text-amber-500"
                                  : "border-stone-200 text-stone-400"
                              }`}
                            >
                              {topic.status}
                            </span>
                            <span>{topic.pillars.length} pillars</span>
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
