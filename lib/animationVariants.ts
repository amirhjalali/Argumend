/**
 * Reusable Framer Motion animation variants.
 *
 * Issue #9: Extract animation variants from DeepDiveModal.tsx and other components.
 */

import type { Variants } from "framer-motion";

/**
 * Container variants for staggered children animations.
 */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

/**
 * Standard item variants for fade + slide up animation.
 */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};
