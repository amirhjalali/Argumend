"use client";

import { motion } from "framer-motion";

interface ConfidenceGaugeProps {
  score: number;
  size?: number;
}

export function ConfidenceGauge({ score, size = 120 }: ConfidenceGaugeProps) {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Color based on score - rich gold/copper spectrum
  const getColor = () => {
    if (score >= 80) return { main: "#D4A012", light: "#E8B923" }; // Metallic gold
    if (score >= 50) return { main: "#CF7B3E", light: "#E09555" }; // Rich copper
    return { main: "#8B5A3C", light: "#A67350" }; // Warm brown
  };

  const colors = getColor();

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg
        className="absolute inset-0 -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e8e0d4"
          strokeWidth="8"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#gauge-gradient-${score})`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
        <defs>
          <linearGradient id={`gauge-gradient-${score}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.light} />
            <stop offset="100%" stopColor={colors.main} />
          </linearGradient>
        </defs>
      </svg>

      {/* Score text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="font-serif font-bold leading-none"
          style={{
            color: colors.main,
            fontSize: size * 0.22,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {score}%
        </motion.span>
        <span
          className="font-sans uppercase tracking-[0.15em] text-muted"
          style={{ fontSize: size * 0.07, marginTop: size * 0.02 }}
        >
          Confidence
        </span>
      </div>

      {/* Decorative dots */}
      <div className="absolute inset-0">
        {[0, 90, 180, 270].map((angle) => (
          <div
            key={angle}
            className="absolute w-1.5 h-1.5 rounded-full bg-stone-300"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${angle}deg) translateY(-${radius + 12}px) translateX(-50%)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
