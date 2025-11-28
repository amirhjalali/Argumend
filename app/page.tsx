"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { moonLanding } from "@/data/topics";
import { Pillar } from "@/types/logic";
import { ConfidenceMeter } from "@/components/ConfidenceMeter";
import { PillarCard } from "@/components/PillarCard";
import { DeepDiveModal } from "@/components/DeepDiveModal";

export default function HomePage() {
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(null);
  const topic = moonLanding;

  return (
    <div className="min-h-screen bg-void text-primary relative overflow-hidden">
      {/* Animated Gradient Mesh Background */}
      <div className="fixed inset-0 bg-gradient-mesh opacity-30 animate-pulse"
           style={{ animationDuration: '8s' }}></div>

      {/* Gradient Orbs */}
      <motion.div
        className="fixed top-20 left-10 w-96 h-96 bg-accent-truth/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="fixed bottom-20 right-10 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-xl bg-void/50">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <motion.h1
              className="text-3xl font-bold tracking-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="bg-gradient-to-r from-accent-truth via-accent-purple to-accent-crux bg-clip-text text-transparent">
                ARGUMEND
              </span>
            </motion.h1>
          </div>
        </header>

        {/* Main Content */}
        <main id="main-content" className="max-w-7xl mx-auto px-8 py-16">
          {/* Hero Section */}
          <motion.div
            className="mb-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Status Badge */}
            <motion.div
              className="inline-block px-6 py-2 mb-8 rounded-full
                         bg-gradient-to-r from-accent-truth/20 to-accent-purple/20
                         backdrop-blur-sm border border-white/20"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-mono text-accent-truth uppercase tracking-wider">
                {topic.status.replace('_', ' ')}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              className="text-6xl md:text-7xl font-bold mb-8 tracking-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-white via-accent-truth to-white bg-clip-text text-transparent">
                {topic.title}
              </span>
            </motion.h2>

            {/* Meta Claim */}
            <motion.p
              className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {topic.meta_claim}
            </motion.p>

            {/* Confidence Meter - Enhanced */}
            <motion.div
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-sm font-mono text-secondary uppercase tracking-wider">
                Confidence Score
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-accent-truth/30 blur-xl rounded-full"></div>
                <ConfidenceMeter score={topic.confidence_score} />
              </div>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="relative h-px mb-20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-truth/50 to-transparent"></div>
          </motion.div>

          {/* Pillars Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-accent-truth to-accent-crux bg-clip-text text-transparent">
                The Pillars of Evidence
              </h3>
              <p className="text-secondary">Click any pillar to explore the argument</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {topic.pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.15 }}
                >
                  <PillarCard
                    pillar={pillar}
                    onClick={() => setSelectedPillar(pillar)}
                    layoutId={`pillar-${pillar.id}`}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            className="mt-32 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="inline-block px-6 py-3 rounded-full
                          bg-white/5 backdrop-blur-sm border border-white/10">
              <p className="text-sm text-muted font-mono">
                Logic Mapping Platform • Built with Modern Design
              </p>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Deep Dive Modal */}
      <AnimatePresence mode="wait">
        {selectedPillar && (
          <DeepDiveModal
            pillar={selectedPillar}
            onClose={() => setSelectedPillar(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
