"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
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
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
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
      className="fixed inset-0 bg-void bg-opacity-95 z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        ref={modalRef}
        layoutId={`pillar-${pillar.id}`}
        className="bg-card border border-muted rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-subtle hover:bg-muted transition-colors z-10"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close dialog"
        >
          <X className="w-6 h-6 text-secondary" aria-hidden="true" />
        </motion.button>

        {/* Header */}
        <div className="p-4 sm:p-8 border-b border-muted">
          <motion.h2
            id="modal-title"
            className="text-3xl sm:text-4xl font-bold text-primary tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {pillar.title}
          </motion.h2>
          <motion.p
            className="text-secondary mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {pillar.short_summary}
          </motion.p>
        </div>

        {/* Split View: Doubt vs Defense */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left: The Doubt */}
          <motion.div
            className="p-4 sm:p-8 border-r border-muted bg-void bg-opacity-50 border-l-4 border-accent-doubt"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-accent-doubt" aria-hidden="true"></div>
              <h3 className="text-xl font-bold text-accent-doubt font-mono tracking-tight">
                THE SKEPTIC
              </h3>
            </div>
            <p className="text-primary leading-relaxed">
              {pillar.skeptic_premise}
            </p>
          </motion.div>

          {/* Right: The Defense */}
          <motion.div
            className="p-4 sm:p-8 border-l-4 border-accent-truth"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-accent-truth" aria-hidden="true"></div>
              <h3 className="text-xl font-bold text-accent-truth font-mono tracking-tight">
                THE PROPONENT
              </h3>
            </div>
            <p className="text-primary leading-relaxed">
              {pillar.proponent_rebuttal}
            </p>
          </motion.div>
        </div>

        {/* The Crux Section */}
        <motion.div
          className="p-4 sm:p-8 border-t-4 border-accent-crux bg-subtle"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-4 h-4 rounded-full bg-accent-crux animate-pulse" aria-hidden="true"></div>
            <h3 className="text-2xl font-bold text-accent-crux font-mono tracking-tight">
              THE DEFINITIVE TEST
            </h3>
          </div>

          {!cruxRevealed ? (
            <motion.button
              onClick={() => setCruxRevealed(true)}
              className="px-8 py-4 bg-accent-crux text-void font-bold rounded-lg hover:bg-opacity-80 transition-all font-mono tracking-wide"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-expanded="false"
              aria-controls="crux-content"
            >
              REVEAL THE TEST
            </motion.button>
          ) : (
            <motion.div
              id="crux-content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
              aria-live="polite"
            >
              <motion.div variants={itemVariants}>
                <h4 className="text-xl font-bold text-primary mb-2">
                  {pillar.crux.title}
                </h4>
                <p className="text-secondary mb-4">
                  {pillar.crux.description}
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-card p-6 rounded-lg border border-accent-crux border-opacity-30"
              >
                <h5 className="text-sm font-bold text-accent-crux mb-2 font-mono uppercase tracking-wide">
                  Methodology
                </h5>
                <p className="text-primary leading-relaxed font-mono text-sm">
                  {pillar.crux.methodology}
                </p>
              </motion.div>

              {pillar.crux.equation && (
                <motion.div
                  variants={itemVariants}
                  className="bg-void p-6 rounded-lg border border-accent-truth border-opacity-20"
                >
                  <h5 className="text-sm font-bold text-accent-truth mb-3 font-mono uppercase tracking-wide">
                    Mathematical Model
                  </h5>
                  <div className="text-2xl text-primary font-mono overflow-x-auto">
                    <InlineMath math={pillar.crux.equation} />
                  </div>
                </motion.div>
              )}

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-muted"
              >
                <div>
                  <div className="text-xs text-secondary font-mono uppercase tracking-wide mb-1">
                    Verification Status
                  </div>
                  <div className="text-accent-crux font-bold font-mono">
                    {pillar.crux.verification_status.toUpperCase()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-secondary font-mono uppercase tracking-wide mb-1">
                    Cost to Verify
                  </div>
                  <div className="text-primary font-mono">
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
