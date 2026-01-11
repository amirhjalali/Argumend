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

// Type-safe icon mapping - classical icons
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
      whileHover={{ y: -3 }}
      transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
    >
      {/* Card Surface - classical parchment aesthetic */}
      <div className="relative h-full bg-canvas border border-stone-200 rounded-sm p-8
                      shadow-card group-hover:shadow-lw-hover group-hover:border-stone-300 transition-all duration-300">

        {/* Top Accent Bar - subtle reveal on hover */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent-main
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="flex flex-col gap-6 h-full">
          {/* Icon Container - subtle hover effect */}
          <motion.div
            className="relative w-fit"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
          >
            <div className="relative p-4 rounded-sm bg-overlay border border-stone-200">
              <IconComponent className="w-8 h-8 text-accent-main" strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-primary mb-3 tracking-tight group-hover:text-accent-main transition-colors font-serif">
              {pillar.title}
            </h3>
            <p className="text-secondary leading-relaxed group-hover:text-primary/90 transition-colors font-serif italic">
              {pillar.short_summary}
            </p>
          </div>

          {/* Arrow Indicator - organic reveal */}
          <motion.div
            className="flex items-center gap-2 text-accent-main font-sans font-semibold text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100"
            initial={{ x: -8 }}
            whileHover={{ x: 0 }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
          >
            <span>Explore Evidence</span>
            <LucideIcons.ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
