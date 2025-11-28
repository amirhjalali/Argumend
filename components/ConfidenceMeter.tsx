"use client";

import { motion } from "framer-motion";

interface ConfidenceMeterProps {
  score: number;
}

export function ConfidenceMeter({ score }: ConfidenceMeterProps) {
  const circumference = 2 * Math.PI * 50;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-40 h-40">
      {/* Outer Glow Ring */}
      <div className="absolute inset-0 bg-accent-truth/20 rounded-full blur-2xl"></div>

      {/* SVG Circle */}
      <svg className="transform -rotate-90 w-40 h-40 relative z-10">
        {/* Background circle with gradient */}
        <circle
          cx="80"
          cy="80"
          r="50"
          stroke="url(#gradient-bg)"
          strokeWidth="3"
          fill="none"
          className="opacity-20"
        />
        {/* Progress circle with vibrant gradient */}
        <motion.circle
          cx="80"
          cy="80"
          r="50"
          stroke="url(#gradient-progress)"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: "easeOut" }}
          filter="drop-shadow(0 0 8px rgba(0, 217, 255, 0.6))"
        />

        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="gradient-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6B6B80" />
            <stop offset="100%" stopColor="#B4B4C5" />
          </linearGradient>
          <linearGradient id="gradient-progress" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D9FF" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#00FFA3" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          className="text-5xl font-bold font-mono bg-gradient-to-r from-accent-truth via-accent-purple to-accent-crux bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {score}
        </motion.div>
        <div className="text-sm text-secondary font-mono mt-1">percent</div>
      </div>
    </div>
  );
}
