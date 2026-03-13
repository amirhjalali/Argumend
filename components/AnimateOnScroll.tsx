"use client";

import { useRef, useEffect, useState, type ReactNode, type CSSProperties } from "react";

type AnimationVariant = "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale-up";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Delay in ms before the animation starts once visible */
  delay?: number;
  /** Duration in ms (default 600) */
  duration?: number;
  /** Animation variant (default "fade-up") */
  variant?: AnimationVariant;
  /** IntersectionObserver threshold (default 0.1) */
  threshold?: number;
  /** Wrapper element type (default "div") */
  as?: "div" | "section" | "article" | "li";
}

const VARIANTS: Record<AnimationVariant, { from: CSSProperties; to: CSSProperties }> = {
  "fade-up": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
  "fade-in": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  "fade-left": {
    from: { opacity: 0, transform: "translateX(-20px)" },
    to: { opacity: 1, transform: "translateX(0)" },
  },
  "fade-right": {
    from: { opacity: 0, transform: "translateX(20px)" },
    to: { opacity: 1, transform: "translateX(0)" },
  },
  "scale-up": {
    from: { opacity: 0, transform: "scale(0.95)" },
    to: { opacity: 1, transform: "scale(1)" },
  },
};

export function AnimateOnScroll({
  children,
  className,
  style,
  delay = 0,
  duration = 600,
  variant = "fade-up",
  threshold = 0.1,
  as: Tag = "div",
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  const { from, to } = VARIANTS[variant];
  const activeStyle = isVisible ? to : from;

  const transitionProps = Object.keys(from)
    .map((prop) => {
      const cssProp = prop === "opacity" ? "opacity" : "transform";
      return `${cssProp} ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
    })
    .join(", ");

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={className}
      style={{
        ...style,
        ...activeStyle,
        transition: transitionProps,
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
