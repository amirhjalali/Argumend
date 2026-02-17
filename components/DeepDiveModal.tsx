"use client";

import { motion } from "framer-motion";
import { X, Scale } from "lucide-react";
import { Pillar } from "@/types/logic";
import { useState, useEffect } from "react";
import { InlineMath } from "react-katex";
import { useModalAccessibility } from "@/hooks/useModalAccessibility";
import { containerVariants, itemVariants } from "@/lib/animationVariants";

interface DeepDiveModalProps {
  pillar: Pillar | null;
  onClose: () => void;
}

export function DeepDiveModal({ pillar, onClose }: DeepDiveModalProps) {
  const [cruxRevealed, setCruxRevealed] = useState(false);
  const modalRef = useModalAccessibility<HTMLDivElement>({
    isOpen: Boolean(pillar),
    onClose,
  });

  // Reset state when pillar changes
  useEffect(() => {
    setCruxRevealed(false);
  }, [pillar?.id]);

  if (!pillar) return null;

  return (
    <motion.div
      key="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 backdrop-blur-sm bg-black/30 z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        ref={modalRef}
        layoutId={`pillar-${pillar.id}`}
        className="relative bg-[#faf8f5] rounded-2xl shadow-2xl border border-stone-200/40 max-w-5xl w-full max-h-[90vh] overflow-y-auto font-sans"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
      >
        {/* Deep teal top accent */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-deep/40 via-deep to-deep/40 rounded-t-2xl" />

        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 z-10 transition-colors"
          aria-label="Close dialog"
        >
          <X
            className="w-5 h-5"
            aria-hidden="true"
          />
        </motion.button>

        {/* Header */}
        <div className="p-6 sm:p-8 md:p-10 border-b border-stone-200/60 bg-gradient-to-b from-[#f4f1eb]/50 to-transparent">
          <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.35em] text-deep mb-3">
            Foundational Pillar
          </p>
          <motion.h2
            id="modal-title"
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 text-primary font-serif"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {pillar.title}
          </motion.h2>
          <motion.p
            className="text-base text-stone-500 font-serif italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {pillar.short_summary}
          </motion.p>
        </div>

        {/* Split View: Skeptic vs Proponent */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-stone-200/60">
          {/* Left: The Skeptic */}
          <motion.div
            className="p-6 sm:p-8 md:p-10 md:border-r border-stone-200/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <div className="flex items-center gap-3 mb-5 border-b border-stone-200/60 pb-3">
              <div className="h-px w-6 bg-rust-500"></div>
              <h3 className="text-[11px] font-sans font-semibold uppercase tracking-[0.35em] text-rust-600">
                The Skeptic
              </h3>
            </div>
            <p className="text-stone-600 leading-relaxed text-base font-serif">
              &ldquo;{pillar.skeptic_premise}&rdquo;
            </p>
          </motion.div>

          {/* Right: The Proponent */}
          <motion.div
            className="p-6 sm:p-8 md:p-10 bg-[#f4f1eb]/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-5 border-b border-stone-200/60 pb-3">
              <div className="h-px w-6 bg-deep"></div>
              <h3 className="text-[11px] font-sans font-semibold uppercase tracking-[0.35em] text-deep">
                The Proponent
              </h3>
            </div>
            <p className="text-stone-600 leading-relaxed text-base font-serif">
              &ldquo;{pillar.proponent_rebuttal}&rdquo;
            </p>
          </motion.div>
        </div>

        {/* The Crux Section */}
        <motion.div
          className="p-6 sm:p-8 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2.5 rounded-xl bg-deep/10">
              <Scale className="w-5 h-5 text-deep" />
            </div>
            <h3 className="text-[11px] font-sans font-semibold uppercase tracking-[0.35em] text-stone-500">
              The Crux of Verification
            </h3>
          </div>

          {!cruxRevealed ? (
            <motion.button
              onClick={() => setCruxRevealed(true)}
              className="px-8 py-4 bg-gradient-to-r from-rust-500 to-rust-600 text-white font-semibold rounded-xl
                         hover:from-rust-600 hover:to-rust-700 transition-all shadow-md hover:shadow-lg tracking-wider text-sm"
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
                <h4 className="text-2xl font-bold text-primary mb-3 font-serif">
                  {pillar.crux.title}
                </h4>
                <p className="text-stone-600 text-base leading-relaxed font-serif">
                  {pillar.crux.description}
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white p-6 rounded-xl border border-stone-200/60"
              >
                <h5 className="text-[11px] font-sans font-semibold uppercase tracking-[0.35em] text-stone-500 mb-4">
                  The Method
                </h5>
                <p className="text-stone-600 leading-relaxed font-serif text-base">
                  {pillar.crux.methodology}
                </p>
              </motion.div>

              {pillar.crux.equation && (
                <motion.div
                  variants={itemVariants}
                  className="bg-white p-6 rounded-xl border border-stone-200/60"
                >
                  <h5 className="text-[11px] font-sans font-semibold uppercase tracking-[0.35em] text-stone-500 mb-4">
                    Mathematical Form
                  </h5>
                  <div className="text-xl text-primary overflow-x-auto py-4 flex justify-center">
                    <InlineMath math={pillar.crux.equation} />
                  </div>
                </motion.div>
              )}

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-200/60"
              >
                <div className="p-5 rounded-xl bg-[#f4f1eb]/50 border border-stone-200/40 text-center">
                  <div className="text-[10px] text-stone-500 font-sans uppercase tracking-[0.35em] mb-2 font-semibold">
                    Verification Status
                  </div>
                  <div className="text-stone-700 font-bold font-serif text-lg capitalize">
                    {pillar.crux.verification_status}
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-[#f4f1eb]/50 border border-stone-200/40 text-center">
                  <div className="text-[10px] text-stone-500 font-sans uppercase tracking-[0.35em] mb-2 font-semibold">
                    Cost to Verify
                  </div>
                  <div className="text-rust-600 font-serif text-lg font-bold">
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
