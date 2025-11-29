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

export function PillarCard({ pillar, onClick, layoutId }: PillarCardProps) {
  const IconComponent = ICON_MAP[pillar.icon_name] ?? LucideIcons.HelpCircle;

  return (
    <motion.div
      layoutId={layoutId}
      onClick={onClick}
      className="relative cursor-pointer group h-full"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Card Surface */}
      <div className="relative h-full bg-parchment border border-black/10 rounded-sm p-8
                      shadow-card group-hover:shadow-card-hover group-hover:border-accent-logos/30 transition-all duration-300">

        {/* Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent-logos
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="flex flex-col gap-6 h-full">
          {/* Icon Container */}
          <motion.div
            className="relative w-fit"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative p-4 rounded-sm bg-parchment-dark border border-black/5">
              <IconComponent className="w-8 h-8 text-accent-logos" strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-primary mb-3 tracking-tight group-hover:text-accent-logos transition-colors font-serif">
              {pillar.title}
            </h3>
            <p className="text-secondary leading-relaxed group-hover:text-primary/90 transition-colors font-serif italic">
              {pillar.short_summary}
            </p>
          </div>

          {/* Arrow Indicator */}
          <motion.div
            className="flex items-center gap-2 text-accent-logos font-sans font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span>Explore Evidence</span>
            <LucideIcons.ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
