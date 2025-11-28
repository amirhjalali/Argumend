"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { moonLanding } from "@/data/topics";
import { Pillar } from "@/types/logic";
import { ConfidenceMeter } from "@/components/ConfidenceMeter";
import { PillarCard } from "@/components/PillarCard";
import { DeepDiveModal } from "@/components/DeepDiveModal";

export default function HomePage() {
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(null);
  const topic = moonLanding;

  return (
    <div className="min-h-screen bg-void text-primary">
      {/* Header */}
      <header className="border-b border-muted py-6 px-8">
        <motion.h1
          className="text-2xl font-mono font-bold tracking-tight text-accent-truth"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ARGUMEND
        </motion.h1>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-16">
        {/* Hero Section */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-block px-4 py-2 bg-card border border-muted rounded-full mb-6">
            <span className="text-xs font-mono text-secondary uppercase tracking-wide">
              {topic.status.replace('_', ' ')}
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            {topic.title}
          </h2>

          <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed mb-8">
            {topic.meta_claim}
          </p>

          {/* Confidence Meter */}
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-sm font-mono text-secondary uppercase tracking-wide">
              Confidence Score
            </div>
            <ConfidenceMeter score={topic.confidence_score} />
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-muted to-transparent mb-16"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        />

        {/* Pillars Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center font-mono tracking-tight">
            THE PILLARS OF EVIDENCE
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {topic.pillars.map((pillar, index) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
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
          className="mt-24 text-center text-sm text-muted font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p>Logic Mapping Platform • Epistemological Brutalism Design</p>
        </motion.div>
      </main>

      {/* Deep Dive Modal */}
      {selectedPillar && (
        <DeepDiveModal
          pillar={selectedPillar}
          onClose={() => setSelectedPillar(null)}
        />
      )}
    </div>
  );
}
