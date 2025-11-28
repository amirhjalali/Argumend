"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Pillar, IconName } from "@/types/logic";
import type { LucideIcon } from "lucide-react";

interface PillarCardProps {
  pillar: Pillar;
  onClick: () => void;
  layoutId: string;
}

// Type-safe icon mapping
const ICON_MAP: Record<IconName, LucideIcon> = {
  Target: LucideIcons.Target,
  Zap: LucideIcons.Zap,
  HelpCircle: LucideIcons.HelpCircle,
  Shield: LucideIcons.Shield,
  Atom: LucideIcons.Atom,
  Telescope: LucideIcons.Telescope,
  Microscope: LucideIcons.Microscope,
};

export function PillarCard({ pillar, onClick, layoutId }: PillarCardProps): JSX.Element {
  const IconComponent = ICON_MAP[pillar.icon_name] ?? LucideIcons.HelpCircle;

  return (
    <motion.div
      layoutId={layoutId}
      onClick={onClick}
      className="relative cursor-pointer group h-full"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-truth/0 via-accent-truth/30 to-accent-purple/0
                      rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Glass Card */}
      <div className="relative h-full bg-card/40 backdrop-blur-xl border border-white/20 rounded-2xl p-8
                      shadow-glass group-hover:border-accent-truth/50 transition-all duration-300
                      group-hover:shadow-glow-truth">

        {/* Top gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-truth via-accent-purple to-accent-crux
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"></div>

        <div className="flex flex-col gap-6 h-full">
          {/* Icon Container with Glow */}
          <motion.div
            className="relative w-fit"
            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-accent-truth/30 blur-lg rounded-2xl"></div>
            <div className="relative p-4 rounded-2xl bg-gradient-to-br from-accent-truth/20 to-accent-purple/20
                          border border-accent-truth/30 backdrop-blur-sm">
              <IconComponent className="w-8 h-8 text-accent-truth" strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-primary mb-3 tracking-tight group-hover:text-accent-truth transition-colors">
              {pillar.title}
            </h3>
            <p className="text-secondary leading-relaxed group-hover:text-primary/90 transition-colors">
              {pillar.short_summary}
            </p>
          </div>

          {/* Arrow Indicator */}
          <motion.div
            className="flex items-center gap-2 text-accent-truth font-mono text-sm opacity-0 group-hover:opacity-100"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span>Explore Evidence</span>
            <LucideIcons.ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700
                        bg-gradient-to-r from-transparent via-white/5 to-transparent
                        translate-x-[-200%] group-hover:translate-x-[200%] group-hover:transition-transform
                        group-hover:duration-1000"></div>
      </div>
    </motion.div>
  );
}
