"use client";

import { motion } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { Pillar } from "@/types/logic";
import { useState, useEffect, useRef } from "react";
import { InlineMath } from "react-katex";

interface DeepDiveModalProps {
  pillar: Pillar | null;
  onClose: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
};

export function DeepDiveModal({ pillar, onClose }: DeepDiveModalProps): JSX.Element | null {
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
      className="fixed inset-0 bg-void/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        ref={modalRef}
        layoutId={`pillar-${pillar.id}`}
        className="relative bg-card/60 backdrop-blur-2xl border border-white/20 rounded-3xl
                   max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-glass"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        {/* Top Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-truth via-accent-purple to-accent-crux rounded-t-3xl"></div>

        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20
                     backdrop-blur-sm border border-white/20 z-10 group"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close dialog"
        >
          <X className="w-5 h-5 text-white group-hover:text-accent-truth transition-colors" aria-hidden="true" />
        </motion.button>

        {/* Header */}
        <div className="p-8 sm:p-12 border-b border-white/10">
          <motion.h2
            id="modal-title"
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-white via-accent-truth to-white bg-clip-text text-transparent">
              {pillar.title}
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-secondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {pillar.short_summary}
          </motion.p>
        </div>

        {/* Split View: Doubt vs Defense */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left: The Skeptic */}
          <motion.div
            className="p-8 sm:p-10 border-r border-white/10 bg-accent-doubt/5 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent-doubt to-transparent"></div>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-accent-doubt/20 border border-accent-doubt/30">
                <div className="w-2 h-2 rounded-full bg-accent-doubt"></div>
              </div>
              <h3 className="text-xl font-bold text-accent-doubt font-mono tracking-tight">
                THE SKEPTIC
              </h3>
            </div>
            <p className="text-primary/90 leading-relaxed text-lg">
              {pillar.skeptic_premise}
            </p>
          </motion.div>

          {/* Right: The Proponent */}
          <motion.div
            className="p-8 sm:p-10 bg-accent-truth/5 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent-truth to-transparent"></div>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-accent-truth/20 border border-accent-truth/30">
                <div className="w-2 h-2 rounded-full bg-accent-truth"></div>
              </div>
              <h3 className="text-xl font-bold text-accent-truth font-mono tracking-tight">
                THE PROPONENT
              </h3>
            </div>
            <p className="text-primary/90 leading-relaxed text-lg">
              {pillar.proponent_rebuttal}
            </p>
          </motion.div>
        </div>

        {/* The Crux Section */}
        <motion.div
          className="p-8 sm:p-12 border-t-2 border-accent-crux/50 bg-gradient-to-br from-accent-crux/10 via-transparent to-accent-purple/5 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-crux to-transparent"></div>

          <div className="flex items-center gap-4 mb-8">
            <motion.div
              className="p-3 rounded-xl bg-gradient-to-br from-accent-crux/30 to-accent-crux/10 border border-accent-crux/40"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6 text-accent-crux" />
            </motion.div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-accent-crux to-accent-truth bg-clip-text text-transparent font-mono tracking-tight">
              THE DEFINITIVE TEST
            </h3>
          </div>

          {!cruxRevealed ? (
            <motion.button
              onClick={() => setCruxRevealed(true)}
              className="relative px-10 py-5 bg-gradient-to-r from-accent-crux to-accent-truth text-void font-bold rounded-2xl
                         hover:shadow-glow-crux transition-all font-mono tracking-wide text-lg group overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-expanded="false"
              aria-controls="crux-content"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles className="w-5 h-5" />
                REVEAL THE TEST
                <Sparkles className="w-5 h-5" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0
                              translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
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
                <h4 className="text-2xl font-bold text-white mb-3">
                  {pillar.crux.title}
                </h4>
                <p className="text-secondary text-lg leading-relaxed">
                  {pillar.crux.description}
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="relative bg-card/40 backdrop-blur-sm p-8 rounded-2xl border border-accent-crux/30 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-crux to-transparent"></div>
                <h5 className="text-sm font-bold text-accent-crux mb-4 font-mono uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1 h-4 bg-accent-crux rounded-full"></div>
                  Methodology
                </h5>
                <p className="text-primary leading-relaxed font-mono text-base">
                  {pillar.crux.methodology}
                </p>
              </motion.div>

              {pillar.crux.equation && (
                <motion.div
                  variants={itemVariants}
                  className="relative bg-void/40 backdrop-blur-sm p-8 rounded-2xl border border-accent-truth/30 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-truth to-transparent"></div>
                  <h5 className="text-sm font-bold text-accent-truth mb-6 font-mono uppercase tracking-widest flex items-center gap-2">
                    <div className="w-1 h-4 bg-accent-truth rounded-full"></div>
                    Mathematical Model
                  </h5>
                  <div className="text-3xl text-white font-mono overflow-x-auto p-4 bg-white/5 rounded-xl">
                    <InlineMath math={pillar.crux.equation} />
                  </div>
                </motion.div>
              )}

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/10"
              >
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs text-muted font-mono uppercase tracking-wider mb-2">
                    Verification Status
                  </div>
                  <div className="text-accent-crux font-bold font-mono text-lg">
                    {pillar.crux.verification_status.toUpperCase()}
                  </div>
                </div>
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs text-muted font-mono uppercase tracking-wider mb-2">
                    Cost to Verify
                  </div>
                  <div className="text-primary font-mono text-lg">
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
