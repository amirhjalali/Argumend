"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Upload,
  ArrowRight,
  Beaker,
  ChevronRight,
  Flame,
  PenLine,
  Newspaper,
  Mic,
} from "lucide-react";
import { topicSummaries, featuredTopicId, featuredReason, CATEGORY_ORDER } from "@/data/topicIndex";

type ContentType = "transcript" | "article" | "freeform";

interface HeroAnalyzeProps {
  onTopicSelect: (id: string) => void;
}

const EXAMPLE_TEXT = `The debate over nuclear energy has intensified. Proponents argue it's essential for meeting climate goals — nuclear produces minimal carbon emissions and provides reliable baseload power that renewables can't match. France generates 70% of its electricity from nuclear and has among the lowest carbon emissions in Europe.

Critics counter that nuclear is too expensive and too slow to build. The Vogtle plant in Georgia came in at $35 billion, more than double its original estimate. Meanwhile, solar and wind costs have plummeted 90% in a decade. There are also unresolved questions about waste storage — the US still has no permanent repository despite decades of trying.

Supporters respond that newer reactor designs like SMRs could dramatically cut costs and construction times, and that the waste problem is more political than technical — Finland's Onkalo facility proves deep geological storage works. The real question may be whether we can afford to exclude any zero-carbon source while facing a climate emergency.`;

const DISPLAY_TOPICS_COUNT = 6;

export function HeroAnalyze({ onTopicSelect }: HeroAnalyzeProps) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [contentType, setContentType] = useState<ContentType>("freeform");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleAnalyze = useCallback(() => {
    if (!content.trim()) return;
    sessionStorage.setItem(
      "argumend-analyze-prefill",
      JSON.stringify({ content, contentType })
    );
    router.push("/analyze");
  }, [content, contentType, router]);

  const handleTryExample = useCallback(() => {
    setContent(EXAMPLE_TEXT);
    setContentType("freeform");
    // Focus and scroll to textarea after setting content
    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  }, []);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setContent(event.target?.result as string);
        };
        reader.readAsText(file);
      }
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && content.trim()) {
        handleAnalyze();
      }
    },
    [content, handleAnalyze]
  );

  const featuredTopic = topicSummaries.find((t) => t.id === featuredTopicId);
  // Show one topic from each category for variety, excluding featured
  const nonFeatured = topicSummaries.filter((t) => t.id !== featuredTopicId);
  const displayedTopics = CATEGORY_ORDER
    .map((cat) => nonFeatured.find((t) => t.category === cat))
    .filter(Boolean)
    .slice(0, DISPLAY_TOPICS_COUNT) as typeof topicSummaries;
  // Fill remaining slots if fewer categories than DISPLAY_TOPICS_COUNT
  if (displayedTopics.length < DISPLAY_TOPICS_COUNT) {
    const usedIds = new Set(displayedTopics.map((t) => t.id));
    for (const t of nonFeatured) {
      if (displayedTopics.length >= DISPLAY_TOPICS_COUNT) break;
      if (!usedIds.has(t.id)) {
        displayedTopics.push(t);
        usedIds.add(t.id);
      }
    }
  }
  const remainingCount = topicSummaries.length - displayedTopics.length - (featuredTopic ? 1 : 0);

  return (
    <div className="flex flex-col bg-gradient-to-b from-[#f4f1eb] to-stone-50">
      {/* Hero Section */}
      <div className="flex flex-col items-center px-4 md:px-8 pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl space-y-5"
        >
          {/* Tagline */}
          <div className="text-center space-y-4">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary mb-6 leading-[1.08]">
              What if we could disagree
              <br />
              <span className="text-deep">
                without destroying each other?
              </span>
            </h1>
            <p className="font-serif text-lg md:text-xl text-stone-600 max-w-lg mx-auto leading-relaxed">
              Map every argument. Weigh the evidence. Know where you stand.
            </p>
          </div>

          {/* Input Card */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-stone-200/60 p-5 shadow-lg shadow-stone-200/30"
          >
            {/* Content Type — segmented control */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="inline-flex bg-stone-100 rounded-xl p-1 gap-0.5">
                {(
                  [
                    { type: "freeform" as ContentType, icon: PenLine, label: "Freeform" },
                    { type: "article" as ContentType, icon: Newspaper, label: "Article" },
                    { type: "transcript" as ContentType, icon: Mic, label: "Transcript" },
                  ] as const
                ).map(({ type, icon: Icon, label }) => (
                  <button
                    key={type}
                    onClick={() => setContentType(type)}
                    className={`relative flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-lg text-xs font-medium transition-all duration-200 ${
                      contentType === type
                        ? "bg-deep text-white shadow-sm"
                        : "bg-transparent text-stone-500 hover:text-stone-700 hover:bg-white/60"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-1.5 px-2.5 py-2 min-h-[44px] bg-stone-50 hover:bg-stone-100 border border-stone-200/60 rounded-lg cursor-pointer transition-all duration-200">
                <Upload className="h-3.5 w-3.5 text-stone-400" />
                <span className="text-xs font-medium text-stone-500">Upload</span>
                <input
                  type="file"
                  accept=".txt,.md"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Textarea */}
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Paste an article, argument, or any text you'd like analyzed..."
                aria-label="Text to analyze"
                className="w-full min-h-[140px] md:min-h-[160px] p-4 bg-[#faf8f5] border border-stone-200/60 rounded-xl text-stone-700 text-sm leading-relaxed placeholder-stone-500/70 resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-deep/20 focus:border-deep/40 focus:bg-white"
              />
              {/* Word count indicator */}
              <div className="absolute bottom-3 right-3 pointer-events-none">
                <span className="text-xs text-stone-500 tabular-nums">
                  {content.trim()
                    ? `${content.trim().split(/\s+/).length} words`
                    : ""}
                </span>
              </div>
            </div>

            {/* Hint row */}
            <div className="flex items-center justify-end mt-2.5 mb-1">
              <span className="text-xs text-stone-400">
                {content.trim() && (
                  <span className="text-stone-300">
                    {"\u2318"}Enter to analyze
                  </span>
                )}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end mt-2">
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={handleTryExample}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-serif font-semibold text-sm border border-deep/20 text-deep bg-deep/5 hover:bg-deep/10 hover:border-deep/30 transition-all duration-200"
                >
                  <Beaker className="h-4 w-4" />
                  Try an Example
                </motion.button>
                <motion.button
                  onClick={handleAnalyze}
                  disabled={!content.trim()}
                  whileHover={content.trim() ? { scale: 1.03, y: -1 } : {}}
                  whileTap={content.trim() ? { scale: 0.97 } : {}}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-serif font-semibold text-sm transition-all duration-200 ${
                    content.trim()
                      ? "bg-gradient-to-r from-rust-500 to-rust-600 text-white shadow-md hover:shadow-lg hover:from-rust-600 hover:to-rust-700"
                      : "bg-stone-100 text-stone-400 cursor-not-allowed"
                  }`}
                >
                  Analyze
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Topics Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4 md:px-8 pb-12"
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-medium text-stone-400 tracking-wide mb-5">
            Or explore a mapped debate
          </p>

          {/* Debate of the Week */}
          {featuredTopic && (
            <motion.button
              onClick={() => onTopicSelect(featuredTopic.id)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              whileHover={{ scale: 1.005, y: -2 }}
              className="group w-full text-left mb-5 rounded-xl bg-gradient-to-r from-[#fefcf9] to-white border border-stone-200/60 border-l-[3.5px] border-l-deep shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-5 md:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="h-3 w-3 text-deep/60" />
                  <span className="text-[11px] font-medium text-deep/70 tracking-wide">
                    Featured
                  </span>
                </div>

                <h3 className="font-serif text-lg md:text-xl font-semibold text-primary group-hover:text-deep transition-colors leading-snug">
                  {featuredTopic.title}
                </h3>
                <p className="mt-2 text-sm text-stone-500 leading-relaxed">
                  {featuredReason}
                </p>

                <div className="mt-3 flex items-center gap-2 text-xs text-stone-400">
                  <span>{featuredTopic.pillarCount} pillars</span>
                  <span className="text-stone-300">&middot;</span>
                  <span
                    className={`${
                      featuredTopic.status === "contested"
                        ? "text-rust-500"
                        : featuredTopic.status === "settled"
                        ? "text-emerald-500"
                        : "text-stone-400"
                    }`}
                  >
                    {featuredTopic.status}
                  </span>
                  <ArrowRight className="h-3 w-3 ml-auto text-stone-300 transition-transform group-hover:translate-x-0.5 group-hover:text-deep" />
                </div>
              </div>
            </motion.button>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {displayedTopics.map((topic, idx) => (
              <motion.button
                key={topic.id}
                onClick={() => onTopicSelect(topic.id)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + idx * 0.03 }}
                whileHover={{ scale: 1.01, y: -2 }}
                className="group text-left p-4 bg-white border border-stone-200/60 rounded-xl hover:border-rust-300/60 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-sm font-medium text-primary group-hover:text-rust-700 transition-colors leading-snug">
                    {topic.title}
                  </h3>
                  <span
                    className={`flex-shrink-0 text-[11px] font-mono px-1.5 py-0.5 rounded-md ${
                      topic.confidence_score >= 80
                        ? "bg-emerald-50 text-emerald-600"
                        : topic.confidence_score >= 50
                        ? "bg-rust-50 text-rust-600"
                        : "bg-stone-50 text-stone-500"
                    }`}
                  >
                    {topic.confidence_score}%
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-stone-400 line-clamp-2">
                  {topic.meta_claim}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-stone-400">
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
                  <span>{topic.pillarCount} pillars</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* View all topics link */}
          {remainingCount > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-5 text-center"
            >
              <Link
                href="/topics"
                className="inline-flex items-center gap-1 text-sm font-serif font-medium text-deep hover:text-deep-dark transition-colors group"
              >
                View all {topicSummaries.length} topics
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
