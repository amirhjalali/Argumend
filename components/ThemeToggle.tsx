"use client";

import { useTheme } from "next-themes";
import { Monitor, Moon, Sun, type LucideIcon } from "lucide-react";
import { useIsHydrated } from "@/hooks/useMediaQuery";

export type ThemeChoice = "light" | "dark" | "system";

const ORDER: readonly ThemeChoice[] = ["light", "dark", "system"];

const LABEL: Record<ThemeChoice, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

const ICON: Record<ThemeChoice, LucideIcon> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

/** light → dark → system → light. Anything unrecognised counts as system. */
export function nextThemeChoice(current: string | undefined): ThemeChoice {
  const index = ORDER.indexOf(toThemeChoice(current));
  return ORDER[(index + 1) % ORDER.length];
}

function toThemeChoice(theme: string | undefined): ThemeChoice {
  return theme === "light" || theme === "dark" ? theme : "system";
}

interface ThemeToggleProps {
  /**
   * "icon": one 44px icon button, for the header.
   * "labeled": the same button with the current mode written beside the
   * icon, for the phone menu sheet where there is room to say it.
   */
  variant?: "icon" | "labeled";
}

/**
 * One button that cycles the colour theme light → dark → system. The icon
 * shows the current mode and the accessible name says it ("Theme: Dark.
 * Switch to system."), so the control never needs three buttons' width.
 */
export function ThemeToggle({ variant = "icon" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const hydrated = useIsHydrated();

  // The theme lives in localStorage, so the server cannot know it. Hold the
  // space until the client does, instead of rendering the wrong icon.
  if (!hydrated) {
    return (
      <span
        aria-hidden="true"
        className={variant === "labeled" ? "inline-block h-11 w-28" : "inline-block h-11 w-11"}
      />
    );
  }

  const current = toThemeChoice(theme);
  const next = nextThemeChoice(current);
  const Icon = ICON[current];
  const label = `Theme: ${LABEL[current]}. Switch to ${LABEL[next].toLowerCase()}.`;

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={label}
      title={label}
      data-theme-choice={current}
      className={
        variant === "labeled"
          ? "inline-flex min-h-11 items-center gap-2 rounded-lg px-3 font-sans text-sm text-secondary dark:text-stone-400 transition-colors hover:bg-subtle hover:text-primary dark:hover:text-stone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep/40"
          : "inline-flex h-11 w-11 items-center justify-center rounded-lg text-stone-500 transition-colors hover:bg-subtle hover:text-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep/40 dark:text-stone-400 dark:hover:text-stone-200"
      }
    >
      <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
      {variant === "labeled" ? <span aria-hidden="true">{LABEL[current]}</span> : null}
    </button>
  );
}
