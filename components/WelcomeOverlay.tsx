"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Lightbulb, Scale, Target, Sparkles } from "lucide-react";

const STEPS = [
  {
    icon: Sparkles,
    title: "Welcome to Argumend",
    subtitle: "Where ideas go to be understood, not defeated",
    description:
      "Most debates generate heat, not light. We're building something different: a map of human knowledge that shows you not just what people believe, but why they believe it\u2014and what evidence would change their minds.",
    highlight: "Beyond Winning",
  },
  {
    icon: Lightbulb,
    title: "Every Topic, Mapped",
    subtitle: "See the structure beneath the argument",
    description:
      "Each controversial topic is broken into Pillars\u2014the core claims that matter. Explore the strongest arguments on all sides, traced to their sources. No strawmen. No cheap shots.",
    highlight: "Steel-manned arguments",
  },
  {
    icon: Scale,
    title: "Confidence, Not Certainty",
    subtitle: "We show our uncertainty",
    description:
      "A 90%+ confidence score means overwhelming evidence. 45% means genuinely contested. We never pretend to know more than we do. Hover over any score to see how we calculated it.",
    highlight: "Calibrated confidence",
  },
  {
    icon: Target,
    title: "Find the Crux",
    subtitle: "The question that would change everything",
    description:
      "Every disagreement has a crux\u2014the specific evidence that would resolve it. We make that explicit. If you walk away with nothing else, you'll know exactly what question to investigate.",
    highlight: "What would change your mind?",
  },
];

export function WelcomeOverlay() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !localStorage.getItem("argumend-welcomed");
  });
  const [currentStep, setCurrentStep] = useState(0);

  const handleClose = () => {
    localStorage.setItem("argumend-welcomed", "true");
    setIsVisible(false);
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleSkip = () => {
    handleClose();
  };

  const step = STEPS[currentStep];
  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm bg-black/30 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
            className="relative w-full max-w-lg bg-[#faf8f5] rounded-2xl shadow-2xl border border-stone-200/40 overflow-hidden"
          >
            {/* Subtle top accent border */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-deep/40 via-deep to-deep/40" />

            {/* Close button */}
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors z-10"
              aria-label="Close welcome"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Progress dots */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 flex gap-1.5">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStep(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentStep
                      ? "w-6 bg-deep"
                      : i < currentStep
                      ? "w-1.5 bg-deep/40"
                      : "w-1.5 bg-stone-200"
                  }`}
                />
              ))}
            </div>

            {/* Content */}
            <div className="pt-14 pb-6 px-6 sm:px-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-5">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-deep/10">
                      <step.icon className="h-7 w-7 text-deep" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="text-center mb-8">
                    <p className="text-[11px] font-semibold text-deep/70 mb-2 tracking-widest uppercase">
                      {step.highlight}
                    </p>
                    <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-4">
                      {step.title}
                    </h2>
                    <p className="text-sm text-stone-500 mb-4 italic font-serif">
                      {step.subtitle}
                    </p>
                    <p className="text-[15px] text-stone-600 leading-relaxed max-w-md mx-auto">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handleSkip}
                  className="text-sm text-stone-400 hover:text-stone-600 transition-colors"
                >
                  Skip
                </button>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rust-500 to-rust-600 text-white text-sm font-semibold hover:from-rust-600 hover:to-rust-700 transition-all shadow-md hover:shadow-lg"
                >
                  {isLastStep ? "Start Exploring" : "Continue"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
