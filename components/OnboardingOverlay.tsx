"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Scale, Crosshair, ArrowRight, X } from "lucide-react";

const STORAGE_KEY = "argumend-onboarded";

const steps = [
  {
    icon: MapPin,
    title: "Pick a topic",
    description:
      "We map controversial debates visually — from climate change to AI ethics. Choose one that matters to you.",
  },
  {
    icon: Scale,
    title: "Explore the evidence",
    description:
      "See both sides with weighted evidence. Every claim is backed by sources and scored by an AI judge council.",
  },
  {
    icon: Crosshair,
    title: "Find the crux",
    description:
      "Discover the key questions that would actually change minds — the crux of the disagreement.",
  },
];

export function OnboardingOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if user has never been onboarded
    const onboarded = localStorage.getItem(STORAGE_KEY);
    if (!onboarded) {
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#3d3a36]/40 backdrop-blur-sm"
            onClick={handleDismiss}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full max-w-lg bg-[#faf8f5] rounded-2xl border border-stone-200/60 shadow-xl shadow-stone-900/10 overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="px-6 pt-8 pb-6 sm:px-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3d3a36]">
                  Welcome to Argumend
                </h2>
                <p className="mt-2 text-sm text-stone-500 max-w-sm mx-auto leading-relaxed">
                  We help you navigate complex debates with clarity and evidence
                  — not outrage.
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-5">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + idx * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#4f7b77]/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-[#4f7b77]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-[#4f7b77]/60">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <h3 className="font-serif text-sm font-semibold text-[#3d3a36]">
                            {step.title}
                          </h3>
                        </div>
                        <p className="mt-0.5 text-sm text-stone-500 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col items-center gap-3">
                <button
                  onClick={handleDismiss}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-serif font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all hover:brightness-105"
                >
                  Start Exploring
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={handleDismiss}
                  className="text-xs text-stone-400 hover:text-stone-600 transition-colors"
                >
                  Skip — I know my way around
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
