"use client";

import { motion } from "framer-motion";

interface ConfidenceGaugeProps {
  score: number;
  size?: number;
}

export function ConfidenceGauge({ score, size = 120 }: ConfidenceGaugeProps) {
  const strokeWidth = 7;
  const radius = (size - strokeWidth * 2 - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Color based on score - deep teal / rust / warm brown spectrum
  const getColor = () => {
    if (score >= 80) return { main: "#4f7b77", light: "#6a9b96", track: "#d5e5e3" }; // Deep teal
    if (score >= 50) return { main: "#C4613C", light: "#d4805f", track: "#f5c9b8" }; // Warm rust
    return { main: "#8B5A3C", light: "#A67350", track: "#e0c9b8" }; // Warm brown
  };

  const colors = getColor();

  // Tick marks at 25%, 50%, 75%
  const tickAngles = [90, 180, 270]; // offset by -90 since SVG starts at top after rotation

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Background circle (track) */}
      <svg
        className="absolute inset-0 -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.track}
          strokeWidth={strokeWidth}
          opacity={0.5}
        />

        {/* Filled progress arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#gauge-gradient-${score})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id={`gauge-gradient-${score}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.light} />
            <stop offset="100%" stopColor={colors.main} />
          </linearGradient>
        </defs>
      </svg>

      {/* Tick marks */}
      <div className="absolute inset-0">
        {tickAngles.map((angle) => (
          <div
            key={angle}
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${angle}deg) translateY(-${radius}px)`,
              transformOrigin: "0 0",
            }}
          >
            <div
              className="w-[2px] h-[6px] rounded-full bg-stone-300/50"
              style={{ transform: "translateX(-50%) translateY(-3px)" }}
            />
          </div>
        ))}
      </div>

      {/* Score text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="font-serif font-bold leading-none tabular-nums"
          style={{
            color: colors.main,
            fontSize: size * 0.24,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {score}%
        </motion.span>
        <span
          className="font-sans uppercase tracking-[0.15em] text-muted font-medium"
          style={{ fontSize: size * 0.075, marginTop: size * 0.02 }}
        >
          Confidence
        </span>
      </div>
    </div>
  );
}
