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

/**
 * Modal backdrop variants.
 */
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Modal content variants with slide animation.
 */
export const modalContentVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 30,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

/**
 * Message bubble animation for debate view.
 */
export const messageBubbleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};

/**
 * Scale animation for selection indicators.
 */
export const scaleInVariants: Variants = {
  hidden: { scale: 0 },
  visible: { scale: 1 },
};

/**
 * Fade in from above for headers.
 */
export const fadeInFromAbove: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/**
 * Fade in from below for content.
 */
export const fadeInFromBelow: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/**
 * Simple fade transition.
 */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Spring-based hover animation config.
 */
export const hoverSpring = {
  hover: { y: -2 },
  tap: { scale: 0.98 },
};
