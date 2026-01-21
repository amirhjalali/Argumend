"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Lightbulb, Scale, Target, Sparkles } from "lucide-react";

const STEPS = [
  {
    icon: Sparkles,
    title: "Welcome to Argumend",
    subtitle: "Where ideas go to be understood, not defeated",
    description:
      "Most debates generate heat, not light. We're building something different: a map of human knowledge that shows you not just what people believe, but why they believe it—and what evidence would change their minds.",
    highlight: "Beyond Winning",
  },
  {
    icon: Lightbulb,
    title: "Every Topic, Mapped",
    subtitle: "See the structure beneath the argument",
    description:
      "Each controversial topic is broken into Pillars—the core claims that matter. Explore the strongest arguments on all sides, traced to their sources. No strawmen. No cheap shots.",
    highlight: "Steel-manned arguments",
  },
  {
    icon: Scale,
    title: "Confidence, Not Certainty",
    subtitle: "We show our uncertainty",
    description:
      "A 99% confidence score means overwhelming evidence. 45% means genuinely contested. We never pretend to know more than we do. Hover over any score to see how we calculated it.",
    highlight: "Calibrated confidence",
  },
  {
    icon: Target,
    title: "Find the Crux",
    subtitle: "The question that would change everything",
    description:
      "Every disagreement has a crux—the specific evidence that would resolve it. We make that explicit. If you walk away with nothing else, you'll know exactly what question to investigate.",
    highlight: "What would change your mind?",
  },
];

export function WelcomeOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if user has seen the welcome before
    const hasSeenWelcome = localStorage.getItem("argumend-welcomed");
    if (!hasSeenWelcome) {
      setIsVisible(true);
    }
  }, []);

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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg bg-gradient-to-br from-[#fdfcfa] to-[#f8f5f0] rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Progress dots */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStep(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentStep
                      ? "w-6 bg-[#D4A012]"
                      : i < currentStep
                      ? "w-2 bg-[#D4A012]/50"
                      : "w-2 bg-stone-300"
                  }`}
                />
              ))}
            </div>

            {/* Content */}
            <div className="pt-16 pb-6 px-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4A012]/20 to-[#CF7B3E]/10 flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-[#D4A012]" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="text-center mb-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A012] mb-2">
                      {step.highlight}
                    </p>
                    <h2 className="font-serif text-2xl md:text-3xl text-primary mb-2">
                      {step.title}
                    </h2>
                    <p className="text-sm text-[#8B5A3C] font-medium mb-4">
                      {step.subtitle}
                    </p>
                    <p className="text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handleSkip}
                  className="text-sm text-stone-400 hover:text-stone-600 transition-colors"
                >
                  Skip intro
                </button>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4A012] to-[#CF7B3E] text-white font-semibold shadow-lg shadow-[#D4A012]/20 hover:shadow-xl hover:shadow-[#D4A012]/30 hover:-translate-y-0.5 transition-all"
                >
                  {isLastStep ? "Start Exploring" : "Next"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Decorative footer */}
            <div className="h-1 bg-gradient-to-r from-[#D4A012] via-[#CF7B3E] to-[#a23b3b]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
