"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Sparkles,
  Brain,
  Upload,
  ArrowRight,
  Map,
  Scale,
  Target,
  FileText,
  Beaker,
  ChevronRight,
  Flame,
} from "lucide-react";
import { topics, featuredTopicId, featuredReason, CATEGORY_ORDER } from "@/data/topics";
import { getQuoteOfTheDay } from "@/data/quotes";

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

  const dailyQuote = getQuoteOfTheDay();
  const featuredTopic = topics.find((t) => t.id === featuredTopicId);
  // Show one topic from each category for variety, excluding featured
  const nonFeatured = topics.filter((t) => t.id !== featuredTopicId);
  const displayedTopics = CATEGORY_ORDER
    .map((cat) => nonFeatured.find((t) => t.category === cat))
    .filter(Boolean)
    .slice(0, DISPLAY_TOPICS_COUNT) as typeof topics;
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
  const remainingCount = topics.length - displayedTopics.length - (featuredTopic ? 1 : 0);

  return (
    <div className="flex flex-col bg-gradient-to-b from-[#f4f1eb] to-stone-50">
      {/* Hero Section */}
      <div className="flex flex-col items-center px-4 md:px-8 pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl space-y-5"
        >
          {/* Tagline */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-deep/10 border border-deep/20 rounded-full text-xs font-medium text-deep tracking-wide">
              <Scale className="h-3 w-3" />
              Steel-man every side. Find the crux.
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-primary leading-tight">
              What if we could disagree
              <br />
              <span className="text-deep">
                without destroying each other?
              </span>
            </h1>
            <p className="font-serif text-lg md:text-xl text-stone-600 max-w-lg mx-auto leading-relaxed">
              Map every argument. Weigh the evidence. Know where you stand.
            </p>
            <p className="text-stone-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              For anyone tired of shouting matches and shallow takes. Paste any
              debate and watch AI map every argument, weigh every piece of
              evidence, and find what actually matters.
            </p>
          </div>

          {/* Input Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-stone-200/60 p-5 shadow-lg shadow-stone-200/30"
          >
            {/* Content Type */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-1.5">
                {(["freeform", "article", "transcript"] as ContentType[]).map(
                  (type) => (
                    <button
                      key={type}
                      onClick={() => setContentType(type)}
                      className={`px-3 py-2 min-h-[44px] rounded-md text-xs font-medium transition-all ${
                        contentType === type
                          ? "bg-stone-800 text-white"
                          : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  )
                )}
              </div>
              <label className="flex items-center gap-1.5 px-2.5 py-2 min-h-[44px] bg-stone-50 hover:bg-stone-100 rounded-md cursor-pointer transition-colors">
                <Upload className="h-3.5 w-3.5 text-stone-400" />
                <span className="text-xs text-stone-500">Upload</span>
                <input
                  type="file"
                  accept=".txt,.md"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Paste a debate transcript, op-ed, podcast segment, or any argumentative text..."
              className="w-full h-32 md:h-36 p-4 bg-stone-50/50 border border-stone-200/60 rounded-xl text-stone-700 text-sm placeholder-stone-400 resize-none focus:outline-none focus:ring-2 focus:ring-rust-500/30 focus:border-rust-500/50"
            />

            {/* Actions */}
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-stone-400">
                {content.length > 0
                  ? `${content.length.toLocaleString()} chars`
                  : ""}
                {content.trim() && (
                  <span className="ml-2 text-stone-300">
                    {"\u2318"}Enter to analyze
                  </span>
                )}
              </span>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={handleTryExample}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-serif font-semibold text-sm border border-stone-300 text-stone-600 bg-white hover:bg-stone-50 hover:border-stone-400 transition-all"
                >
                  <Beaker className="h-4 w-4" />
                  Try an Example
                </motion.button>
                <motion.button
                  onClick={handleAnalyze}
                  disabled={!content.trim()}
                  whileHover={content.trim() ? { scale: 1.02 } : {}}
                  whileTap={content.trim() ? { scale: 0.98 } : {}}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-serif font-semibold transition-all ${
                    content.trim()
                      ? "bg-gradient-to-r from-rust-500 to-rust-600 text-white shadow-md hover:shadow-lg"
                      : "bg-stone-100 text-stone-400 cursor-not-allowed"
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  Analyze
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* How it works + stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {[
              { icon: FileText, label: "Extract positions", stat: `${topics.length} topics` },
              { icon: Target, label: "Find cruxes", stat: "Key questions" },
              { icon: Scale, label: "Weigh evidence", stat: "150+ sources" },
              { icon: Brain, label: "AI judge council", stat: "4 LLM judges" },
            ].map(({ icon: Icon, label, stat }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 p-3 bg-white/70 border border-stone-200/40 rounded-xl hover:bg-white hover:shadow-sm hover:border-stone-200/60 transition-all duration-200"
              >
                <Icon className="h-4 w-4 text-deep" />
                <span className="text-xs font-medium text-stone-600">{label}</span>
                <span className="text-[10px] font-mono tabular-nums text-stone-400">{stat}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Quote of the Day */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.58 }}
        className="px-4 md:px-8 py-6"
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-stone-200/60" />
            <div className="text-center px-4">
              <p className="font-serif italic text-stone-500 text-sm md:text-base leading-relaxed">
                &ldquo;{dailyQuote.text}&rdquo;
              </p>
              <p className="text-xs text-stone-400 mt-2">
                {dailyQuote.author}
              </p>
            </div>
            <div className="h-px flex-1 bg-stone-200/60" />
          </div>
        </div>
      </motion.div>

      {/* Why This Matters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.59 }}
        className="px-4 md:px-8 pb-4"
      >
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-stone-500 leading-relaxed">
            Polarization is tearing apart families, communities, and democracies.
            We believe better tools for reasoning can help.{" "}
            <Link
              href="/research"
              className="font-medium text-deep hover:text-deep-dark underline underline-offset-2 decoration-deep/30 hover:decoration-deep/60 transition-colors"
            >
              See the research
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Topics Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="px-4 md:px-8 pb-12"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-stone-200/60" />
            <span className="text-xs font-medium text-stone-400 tracking-wide flex items-center gap-1.5">
              <Map className="h-3 w-3" />
              EXPLORE MAPPED DEBATES
            </span>
            <div className="h-px flex-1 bg-stone-200/60" />
          </div>

          {/* Debate of the Week */}
          {featuredTopic && (
            <motion.button
              onClick={() => onTopicSelect(featuredTopic.id)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              whileHover={{ scale: 1.005, y: -2 }}
              className="group w-full text-left mb-5 rounded-xl bg-gradient-to-r from-[#fefcf9] to-white border border-stone-200/60 border-l-[3.5px] border-l-deep shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-5 md:p-6">
                {/* Badge row */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-deep/10 rounded-full text-[11px] font-semibold tracking-wide text-deep">
                    <Flame className="h-3 w-3" />
                    Debate of the Week
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full border text-[11px] font-medium ${
                      featuredTopic.status === "settled"
                        ? "border-emerald-200 text-emerald-500"
                        : featuredTopic.status === "contested"
                        ? "border-rust-200 text-rust-500"
                        : "border-stone-200 text-stone-400"
                    }`}
                  >
                    {featuredTopic.status}
                  </span>
                </div>

                {/* Title + confidence */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg md:text-xl font-semibold text-primary group-hover:text-deep transition-colors leading-snug">
                      {featuredTopic.title}
                    </h3>
                    <p className="mt-2 text-sm text-stone-500 leading-relaxed">
                      {featuredReason}
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full border-[3px] flex items-center justify-center ${
                        featuredTopic.confidence_score >= 80
                          ? "border-emerald-400"
                          : featuredTopic.confidence_score >= 50
                          ? "border-rust-400"
                          : "border-stone-300"
                      }`}
                    >
                      <span
                        className={`font-mono text-sm font-bold ${
                          featuredTopic.confidence_score >= 80
                            ? "text-emerald-600"
                            : featuredTopic.confidence_score >= 50
                            ? "text-rust-600"
                            : "text-stone-500"
                        }`}
                      >
                        {featuredTopic.confidence_score}%
                      </span>
                    </div>
                    <span className="text-[9px] text-stone-400 mt-1">
                      confidence
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-rust-500 to-rust-600 text-white text-xs font-semibold rounded-lg shadow-sm group-hover:from-rust-600 group-hover:to-rust-700 transition-all">
                    Explore This Debate
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="text-xs text-stone-400">
                    {featuredTopic.pillars.length} pillars &middot;{" "}
                    {featuredTopic.pillars.flatMap((p) => p.evidence ?? []).length}{" "}
                    evidence nodes
                  </span>
                </div>
              </div>
            </motion.button>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {displayedTopics.map((topic, idx) => (
              <motion.button
                key={topic.id}
                onClick={() => onTopicSelect(topic.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + idx * 0.05 }}
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
                <div className="mt-2 flex items-center gap-1.5 text-[10px] text-stone-400">
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
                </div>
              </motion.button>
            ))}
          </div>

          {/* View all topics link */}
          {remainingCount > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-5 text-center"
            >
              <Link
                href="/topics"
                className="inline-flex items-center gap-1 text-sm font-serif font-medium text-deep hover:text-deep-dark transition-colors group"
              >
                View all {topics.length} topics
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
