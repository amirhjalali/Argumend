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
      className="relative bg-card border border-muted hover:border-accent-truth cursor-pointer rounded-lg p-6 transition-all duration-300 group"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex flex-col items-start gap-4">
        <motion.div
          className="p-3 rounded-full bg-subtle group-hover:bg-accent-truth group-hover:bg-opacity-10 transition-colors"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <IconComponent className="w-6 h-6 text-accent-truth" />
        </motion.div>

        <div>
          <h3 className="text-xl font-bold text-primary mb-2 tracking-tight">
            {pillar.title}
          </h3>
          <p className="text-sm text-secondary leading-relaxed">
            {pillar.short_summary}
          </p>
        </div>

        <motion.div
          className="absolute bottom-4 right-4 text-accent-truth opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          <LucideIcons.ArrowRight className="w-5 h-5" />
        </motion.div>
      </div>
    </motion.div>
  );
}
