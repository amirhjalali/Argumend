"use client";

import { motion, Variants } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { Pillar } from "@/types/logic";
import { useState, useEffect, useRef } from "react";
import { InlineMath } from "react-katex";

interface DeepDiveModalProps {
  pillar: Pillar | null;
  onClose: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
};

export function DeepDiveModal({ pillar, onClose }: DeepDiveModalProps) {
  const [cruxRevealed, setCruxRevealed] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset state when pillar changes
  useEffect(() => {
    setCruxRevealed(false);
  }, [pillar?.id]);

  // ESC key handler
  useEffect(() => {
    if (!pillar) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [pillar, onClose]);

  // Focus trap
  useEffect(() => {
    if (!pillar || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    firstElement?.focus();

    return () => document.removeEventListener('keydown', handleTab);
  }, [pillar]);

  // Body scroll lock
  useEffect(() => {
    if (pillar) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [pillar]);

  if (!pillar) return null;

  return (
    <motion.div
      key="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-accent-logos/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        ref={modalRef}
        layoutId={`pillar-${pillar.id}`}
        className="relative bg-parchment border border-accent-logos/20 rounded-sm
                   max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl font-sans"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        {/* Top Bar - Stoic Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent-logos"></div>

        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-sm bg-white border border-black/10 hover:border-accent-logos z-10 group transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Close dialog"
        >
          <X className="w-5 h-5 text-secondary group-hover:text-accent-logos transition-colors" aria-hidden="true" />
        </motion.button>

        {/* Header */}
        <div className="p-8 sm:p-12 border-b border-black/5 bg-parchment-dark">
          <motion.h2
            id="modal-title"
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-accent-logos font-serif"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {pillar.title}
          </motion.h2>
          <motion.p
            className="text-lg text-secondary font-serif italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {pillar.short_summary}
          </motion.p>
        </div>

        {/* Split View: Doubt vs Defense */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-black/5">
          {/* Left: The Skeptic */}
          <motion.div
            className="p-8 sm:p-10 border-r border-black/5 bg-white relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-accent-pathos"></div>
              <h3 className="text-xl font-bold text-accent-pathos font-serif tracking-wide">
                THE SKEPTIC
              </h3>
            </div>
            <p className="text-primary/80 leading-relaxed text-lg font-serif">
              &ldquo;{pillar.skeptic_premise}&rdquo;
            </p>
          </motion.div>

          {/* Right: The Proponent */}
          <motion.div
            className="p-8 sm:p-10 bg-parchment relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-accent-logos"></div>
              <h3 className="text-xl font-bold text-accent-logos font-serif tracking-wide">
                THE PROPONENT
              </h3>
            </div>
            <p className="text-primary/80 leading-relaxed text-lg font-serif">
              &ldquo;{pillar.proponent_rebuttal}&rdquo;
            </p>
          </motion.div>
        </div>

        {/* The Crux Section */}
        <motion.div
          className="p-8 sm:p-12 bg-parchment-dark relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-sm bg-white border border-black/5">
              <Sparkles className="w-6 h-6 text-accent-ethos" />
            </div>
            <h3 className="text-2xl font-bold text-accent-logos font-serif tracking-tight">
              THE DEFINITIVE TEST
            </h3>
          </div>

          {!cruxRevealed ? (
            <motion.button
              onClick={() => setCruxRevealed(true)}
              className="relative px-10 py-5 bg-accent-logos text-parchment font-bold rounded-sm
                         hover:bg-accent-logos/90 transition-all font-sans tracking-widest text-sm group overflow-hidden border border-accent-logos"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-expanded="false"
              aria-controls="crux-content"
            >
              <span className="relative z-10 flex items-center gap-3">
                REVEAL THE TEST
                <Sparkles className="w-4 h-4" />
              </span>
            </motion.button>
          ) : (
            <motion.div
              id="crux-content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
              aria-live="polite"
            >
              <motion.div variants={itemVariants}>
                <h4 className="text-2xl font-bold text-accent-logos mb-3 font-serif">
                  {pillar.crux.title}
                </h4>
                <p className="text-secondary text-lg leading-relaxed">
                  {pillar.crux.description}
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white p-8 rounded-sm border border-black/5"
              >
                <h5 className="text-sm font-bold text-accent-ethos mb-4 font-sans uppercase tracking-widest flex items-center gap-2">
                  Methodology
                </h5>
                <p className="text-primary leading-relaxed font-serif text-base italic">
                  {pillar.crux.methodology}
                </p>
              </motion.div>

              {pillar.crux.equation && (
                <motion.div
                  variants={itemVariants}
                  className="bg-white p-8 rounded-sm border border-black/5"
                >
                  <h5 className="text-sm font-bold text-accent-logos mb-6 font-sans uppercase tracking-widest flex items-center gap-2">
                    Mathematical Model
                  </h5>
                  <div className="text-3xl text-accent-logos font-mono overflow-x-auto p-4 bg-parchment rounded-sm border border-black/5">
                    <InlineMath math={pillar.crux.equation} />
                  </div>
                </motion.div>
              )}

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-black/5"
              >
                <div className="p-6 rounded-sm bg-white border border-black/5">
                  <div className="text-xs text-secondary font-sans uppercase tracking-wider mb-2 font-bold">
                    Verification Status
                  </div>
                  <div className="text-accent-ethos font-bold font-serif text-lg">
                    {pillar.crux.verification_status.toUpperCase()}
                  </div>
                </div>
                <div className="p-6 rounded-sm bg-white border border-black/5">
                  <div className="text-xs text-secondary font-sans uppercase tracking-wider mb-2 font-bold">
                    Cost to Verify
                  </div>
                  <div className="text-accent-logos font-serif text-lg font-bold">
                    {pillar.crux.cost_to_verify}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
