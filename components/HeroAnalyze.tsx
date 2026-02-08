"use client";

import { useState, useCallback } from "react";
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
} from "lucide-react";
import { topics } from "@/data/topics";

type ContentType = "transcript" | "article" | "freeform";

interface HeroAnalyzeProps {
  onTopicSelect: (id: string) => void;
}

export function HeroAnalyze({ onTopicSelect }: HeroAnalyzeProps) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [contentType, setContentType] = useState<ContentType>("freeform");

  const handleAnalyze = useCallback(() => {
    if (!content.trim()) return;
    sessionStorage.setItem(
      "argumend-analyze-prefill",
      JSON.stringify({ content, contentType })
    );
    router.push("/analyze");
  }, [content, contentType, router]);

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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f4f1eb] to-stone-50">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl space-y-6"
        >
          {/* Tagline */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50/80 border border-amber-200/50 rounded-full text-xs font-medium text-amber-700 tracking-wide">
              <Brain className="h-3 w-3" />
              AI-Powered Argument Analysis
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-primary leading-tight">
              Paste anything.
              <br />
              <span className="text-amber-600">Understand everything.</span>
            </h1>
            <p className="text-stone-500 text-base md:text-lg max-w-lg mx-auto">
              Drop a debate transcript, article, or any argumentative text.
              We'll extract positions, find cruxes, detect fallacies, and score
              argument quality with a council of AI judges.
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
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
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
              <label className="flex items-center gap-1.5 px-2.5 py-1 bg-stone-50 hover:bg-stone-100 rounded-md cursor-pointer transition-colors">
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
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Paste a debate transcript, op-ed, podcast segment, or any argumentative text..."
              className="w-full h-36 md:h-44 p-4 bg-stone-50/50 border border-stone-200/60 rounded-xl text-stone-700 text-sm placeholder-stone-400 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50"
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
              <motion.button
                onClick={handleAnalyze}
                disabled={!content.trim()}
                whileHover={content.trim() ? { scale: 1.02 } : {}}
                whileTap={content.trim() ? { scale: 0.98 } : {}}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-serif font-semibold transition-all ${
                  content.trim()
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md hover:shadow-lg"
                    : "bg-stone-100 text-stone-400 cursor-not-allowed"
                }`}
              >
                <Sparkles className="h-4 w-4" />
                Analyze
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2 text-xs text-stone-400"
          >
            {[
              { icon: FileText, label: "Extract positions" },
              { icon: Target, label: "Find cruxes" },
              { icon: Scale, label: "Weigh evidence" },
              { icon: Brain, label: "AI judge council" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/60 border border-stone-200/40 rounded-full"
              >
                <Icon className="h-3 w-3" />
                {label}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Topics Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-4 md:px-8 pb-12"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-stone-200/60" />
            <span className="text-xs font-medium text-stone-400 tracking-wide flex items-center gap-1.5">
              <Map className="h-3 w-3" />
              OR EXPLORE CURATED TOPICS
            </span>
            <div className="h-px flex-1 bg-stone-200/60" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {topics.map((topic, idx) => (
              <motion.button
                key={topic.id}
                onClick={() => onTopicSelect(topic.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.05 }}
                whileHover={{ scale: 1.01, y: -2 }}
                className="group text-left p-4 bg-white border border-stone-200/60 rounded-xl hover:border-amber-300/60 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-sm font-medium text-primary group-hover:text-amber-700 transition-colors leading-snug">
                    {topic.title}
                  </h3>
                  <span
                    className={`flex-shrink-0 text-[11px] font-mono px-1.5 py-0.5 rounded-md ${
                      topic.confidence_score >= 80
                        ? "bg-emerald-50 text-emerald-600"
                        : topic.confidence_score >= 50
                        ? "bg-amber-50 text-amber-600"
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
                        ? "border-amber-200 text-amber-500"
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
        </div>
      </motion.div>
    </div>
  );
}
