"use client";

import React, { useRef, useCallback, useEffect, useState, type ReactNode, type CSSProperties } from "react";

type AnimationVariant = "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale-up";

type AllowedTags = "div" | "section" | "article" | "li";

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
  as?: AllowedTags;
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
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const refCallback = useCallback((node: HTMLElement | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      const handle = setTimeout(() => setIsVisible(true), 0);
      return () => clearTimeout(handle);
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

    observer.observe(element);
    return () => observer.disconnect();
  }, [element, threshold]);

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
      ref={refCallback as React.RefCallback<HTMLElement>}
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
