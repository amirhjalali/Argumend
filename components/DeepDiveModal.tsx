"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Pillar } from "@/types/logic";
import { useState } from "react";
import { InlineMath } from "react-katex";

interface DeepDiveModalProps {
  pillar: Pillar | null;
  onClose: () => void;
}

export function DeepDiveModal({ pillar, onClose }: DeepDiveModalProps) {
  const [cruxRevealed, setCruxRevealed] = useState(false);

  if (!pillar) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-8"
        onClick={onClose}
      >
        <motion.div
          layoutId={`pillar-${pillar.id}`}
          className="bg-card border border-muted rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-subtle hover:bg-muted transition-colors z-10"
          >
            <X className="w-6 h-6 text-secondary" />
          </button>

          {/* Header */}
          <div className="p-8 border-b border-muted">
            <motion.h2
              className="text-4xl font-bold text-primary tracking-tight"
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
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: The Doubt */}
            <motion.div
              className="p-8 border-r border-muted bg-void bg-opacity-50"
              style={{ borderLeftColor: "#FF9500", borderLeftWidth: "4px" }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-accent-doubt"></div>
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
              className="p-8"
              style={{ borderLeftColor: "#00E5FF", borderLeftWidth: "4px" }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-accent-truth"></div>
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
            className="p-8 border-t-4 border-accent-crux bg-subtle"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-4 rounded-full bg-accent-crux animate-pulse"></div>
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
              >
                REVEAL THE TEST
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="space-y-6"
              >
                <div>
                  <h4 className="text-xl font-bold text-primary mb-2">
                    {pillar.crux.title}
                  </h4>
                  <p className="text-secondary mb-4">
                    {pillar.crux.description}
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-accent-crux border-opacity-30">
                  <h5 className="text-sm font-bold text-accent-crux mb-2 font-mono uppercase tracking-wide">
                    Methodology
                  </h5>
                  <p className="text-primary leading-relaxed font-mono text-sm">
                    {pillar.crux.methodology}
                  </p>
                </div>

                {pillar.crux.equation && (
                  <div className="bg-void p-6 rounded-lg border border-accent-truth border-opacity-20">
                    <h5 className="text-sm font-bold text-accent-truth mb-3 font-mono uppercase tracking-wide">
                      Mathematical Model
                    </h5>
                    <div className="text-2xl text-primary font-mono overflow-x-auto">
                      <InlineMath math={pillar.crux.equation} />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-muted">
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
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
