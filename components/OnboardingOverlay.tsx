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
      "We map controversial debates visually \u2014 from climate change to AI ethics. Choose one that matters to you.",
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
      "Discover the key questions that would actually change minds \u2014 the crux of the disagreement.",
  },
];

export function OnboardingOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 backdrop-blur-sm bg-black/30"
            onClick={handleDismiss}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full max-w-lg bg-[#faf8f5] rounded-2xl border border-stone-200/40 shadow-2xl overflow-hidden"
          >
            {/* Subtle top accent border */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-deep/40 via-deep to-deep/40" />

            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors z-10"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6 pt-8 sm:p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
                  Welcome to Argumend
                </h2>
                <p className="mt-2 text-sm text-stone-500 max-w-sm mx-auto leading-relaxed">
                  We help you navigate complex debates with clarity and evidence
                  &mdash; not outrage.
                </p>
              </div>

              {/* Step indicators */}
              <div className="flex justify-center gap-1.5 mb-6">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 w-8 rounded-full bg-deep/20"
                  >
                    <div className="h-full rounded-full bg-deep w-full" />
                  </div>
                ))}
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
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-deep/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-deep" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-deep/60">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <h3 className="font-serif text-sm font-semibold text-primary">
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
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rust-500 to-rust-600 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg hover:from-rust-600 hover:to-rust-700 transition-all"
                >
                  Start Exploring
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={handleDismiss}
                  className="text-xs text-stone-400 hover:text-stone-600 transition-colors"
                >
                  Skip &mdash; I know my way around
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
