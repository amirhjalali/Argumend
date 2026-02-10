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
    tint: "#C4613C",
  },
  {
    icon: Lightbulb,
    title: "Every Topic, Mapped",
    subtitle: "See the structure beneath the argument",
    description:
      "Each controversial topic is broken into Pillars—the core claims that matter. Explore the strongest arguments on all sides, traced to their sources. No strawmen. No cheap shots.",
    highlight: "Steel-manned arguments",
    tint: "#b05434",
  },
  {
    icon: Scale,
    title: "Confidence, Not Certainty",
    subtitle: "We show our uncertainty",
    description:
      "A 99% confidence score means overwhelming evidence. 45% means genuinely contested. We never pretend to know more than we do. Hover over any score to see how we calculated it.",
    highlight: "Calibrated confidence",
    tint: "#2563eb",
  },
  {
    icon: Target,
    title: "Find the Crux",
    subtitle: "The question that would change everything",
    description:
      "Every disagreement has a crux—the specific evidence that would resolve it. We make that explicit. If you walk away with nothing else, you'll know exactly what question to investigate.",
    highlight: "What would change your mind?",
    tint: "#a23b3b",
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
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
            className="relative w-full max-w-lg bg-[#fefcf9] rounded-xl shadow-[0_20px_50px_-10px_rgba(80,60,40,0.15)] overflow-hidden border border-stone-200/60"
          >
            {/* Close button */}
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Progress dots */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 flex gap-1.5">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStep(i)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === currentStep
                      ? "w-5 bg-stone-800"
                      : i < currentStep
                      ? "w-1.5 bg-stone-400"
                      : "w-1.5 bg-stone-200"
                  }`}
                />
              ))}
            </div>

            {/* Content */}
            <div className="pt-14 pb-6 px-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${step.tint}12` }}
                    >
                      <step.icon className="h-6 w-6" style={{ color: step.tint }} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="text-center mb-7">
                    <p className="text-[11px] font-medium text-stone-400 mb-2 tracking-wide">
                      {step.highlight}
                    </p>
                    <h2 className="font-serif text-2xl text-primary mb-2">
                      {step.title}
                    </h2>
                    <p className="text-sm text-stone-500 mb-4">
                      {step.subtitle}
                    </p>
                    <p className="text-[15px] text-stone-600 leading-relaxed">
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
                  Skip
                </button>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1f1f1d] text-white text-sm font-medium hover:bg-[#3a3a38] transition-colors"
                >
                  {isLastStep ? "Start Exploring" : "Continue"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
