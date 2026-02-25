"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Scale, Crosshair, ArrowRight, X } from "lucide-react";
import { useModalAccessibility } from "@/hooks/useModalAccessibility";

const STORAGE_KEY = "argumend-onboarded";

const steps = [
  {
    icon: MapPin,
    title: "Pick a topic",
    description:
      "We map controversial debates visually\u2014climate change, AI ethics, gun control, you name it. Start with whatever you care about.",
  },
  {
    icon: Scale,
    title: "Explore the evidence",
    description:
      "Both sides, weighted by evidence. Every claim traces back to sources and gets scored by an AI judge council. No hand-waving.",
  },
  {
    icon: Crosshair,
    title: "Find the crux",
    description:
      "The crux is the one question that would actually change minds. We find it for you. That\u2019s the whole point.",
  },
];

export function OnboardingOverlay() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !localStorage.getItem(STORAGE_KEY);
  });

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  const modalRef = useModalAccessibility<HTMLDivElement>({
    isOpen: visible,
    onClose: handleDismiss,
  });

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
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Welcome to Argumend"
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
                <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">
                  Welcome to Argumend
                </h2>
                <p className="mt-2 text-sm text-stone-500 max-w-sm mx-auto leading-relaxed">
                  Clarity and evidence instead of outrage. Here&apos;s how it works.
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
              <ol className="space-y-5 list-none p-0">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <motion.li
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
                    </motion.li>
                  );
                })}
              </ol>

              {/* Actions */}
              <div className="mt-8 flex flex-col items-center gap-3">
                <button
                  onClick={handleDismiss}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rust-500 to-rust-600 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg hover:from-rust-600 hover:to-rust-700 transition-all"
                >
                  Got it
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={handleDismiss}
                  className="text-xs text-stone-500 hover:text-stone-600 transition-colors"
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
