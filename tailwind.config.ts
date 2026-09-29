import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Design metadata (chapter/family color tokens) lives in lib/ — the
    // canonical palette maps (categoryColors, fallacyMeta, glossaryMeta,
    // guideMeta, libraryMeta, questionMeta, …) hold class strings that pages
    // only interpolate, so they must be scanned or those utilities
    // (border-l-crux/50, hover:border-skeptic/40, …) are never generated.
    // Excludes *.test.ts: several lib/ test files embed raw regex source
    // (e.g. the dark-mode-token guards' `(?<![-:\w])` lookbehinds) whose
    // text the scanner otherwise misreads as arbitrary-value candidate
    // classes, producing invalid generated CSS and breaking the build.
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "!./lib/**/*.test.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic surfaces use channel variables so Tailwind's opacity
        // modifiers keep working (for example `bg-panel/85`) while the same
        // utility adapts to the active color scheme.
        canvas: "rgb(var(--bg-canvas-rgb) / <alpha-value>)", // LessWrong parchment
        sidebar: "rgb(var(--bg-sidebar-rgb) / <alpha-value>)", // Sidebar backdrop
        panel: "rgb(var(--bg-panel-rgb) / <alpha-value>)", // Cards / panels
        paper: "rgb(var(--bg-paper-rgb) / <alpha-value>)", // Lightweight paper for nodes
        overlay: "rgb(var(--bg-overlay-rgb) / <alpha-value>)",

        // Brand text tokens adapt with the theme through RGB channels
        // (light: #3d3a36 / #564d45 / #6d6058; dark: #e8e4de / #b0a99f / #9a9189).
        // A bare `text-primary` is therefore safe on dark surfaces; existing
        // `dark:text-stone-*` pairs still win as explicit overrides.
        primary: "rgb(var(--text-primary-rgb) / <alpha-value>)",
        secondary: "rgb(var(--text-secondary-rgb) / <alpha-value>)",
        muted: "rgb(var(--text-muted-rgb) / <alpha-value>)", // #6d6058 light: WCAG AA 4.5:1 on parchment
        // Surfaces behind CSS variables that also need opacity modifiers.
        card: "rgb(var(--bg-card-rgb) / <alpha-value>)",
        subtle: "rgb(var(--bg-subtle-rgb) / <alpha-value>)",
        divider: "rgb(var(--border-divider-rgb) / <alpha-value>)",
        // The one keyboard-focus colour: `focus-visible:ring-focus`. Teal in
        // both themes, at full strength so the ring clears 3:1 against the
        // surface (light #3a6965, 5.5:1 on the canvas; dark #7fb5b0, 7.6:1).
        // A faded `ring-deep/40` was 1.8:1 light and 1.4:1 dark.
        focus: "rgb(var(--focus-ring-rgb) / <alpha-value>)",

        deep: {
          DEFAULT: "#3a6965", // Deep teal — primary accent (darkened for WCAG AA 4.5:1 on parchment)
          light: "#4f7b77", // Original deep teal — decorative/large text only
          dark: "#2d524f",
        },

        // Rust palette — CTA buttons, "for" side, warm accents
        // Inspired by Claude's warm terracotta. NEVER use amber/tangerine.
        rust: {
          50: "#fdf5f2",
          100: "#fae8e0",
          200: "#f5c9b8",
          300: "#e6a48c",
          400: "#d4805f",
          500: "#C4613C", // Primary CTA button color
          600: "#b05434",
          700: "#8b3f27",
          800: "#6b301e",
          900: "#4a2115",
        },

        accent: {
          main: "#C4613C", // Rust — warm terracotta
          warn: "#d4805f", // Soft rust warning
          link: "#b05434", // Rust-600 link
          error: "#c4584d",
          // Theme-aware teal for text: #3a6965 light, #8bb5b1 dark (globals.css
          // --accent-text). `text-accent-text`, `decoration-accent-text/40`.
          text: "rgb(var(--accent-text-rgb) / <alpha-value>)",
        },

        // Category-only hues, never a signal. Plum is philosophy (crimson is
        // reserved for cruxes); slate ink is technology (stone is reserved for
        // status chips). Text contrast on their chip tints: plum 5.90:1 light /
        // 6.20:1 dark (plum.light), ink 5.61:1 light / 6.63:1 dark (ink.light).
        plum: {
          DEFAULT: "#6b4768",
          light: "#c9a2c5",
        },
        ink: {
          DEFAULT: "#4a5868",
          light: "#aab6c4",
        },

        // Error state. DEFAULT #c4584d is accent.error, for borders, icons and
        // tints (3.84:1 on the canvas, enough for non-text). Error TEXT uses the
        // theme-aware `text-error-text` (--error-text: #ab4a40 light, 4.92:1 on
        // the canvas; #e8897f dark, 6.96:1). Never crux crimson for an error:
        // crimson means a crux.
        error: {
          DEFAULT: "#c4584d",
          text: "rgb(var(--error-text-rgb) / <alpha-value>)",
        },

        // Bold semantic colors for graph elements
        crux: {
          DEFAULT: "#a23b3b", // Deep crimson for cruxes
          light: "#c45c5c",
          // Theme-aware crimson for text: #a23b3b light, #d97373 dark (4.61:1 on
          // dark paper). `text-crux-text`.
          text: "rgb(var(--crux-text-rgb) / <alpha-value>)",
          dark: "#7a2929",
        },
        evidence: {
          DEFAULT: "#3a6965", // Deep teal for evidence (darkened for WCAG AA)
          light: "#4f7b77", // Light teal
          dark: "#2d524f", // Dark teal
        },
        proponent: {
          DEFAULT: "#C4613C", // Rust for proponent
          light: "#d4805f",
          dark: "#b05434",
        },
        skeptic: {
          DEFAULT: "#8B5A3C", // Warm brown for skeptic
          light: "#A67350", // Light brown
          dark: "#6B442C", // Dark brown
        },
        score: {
          high: "#4f7b77", // High confidence - deep teal
          mid: "#C4613C", // Mid confidence - rust
          low: "#8B5A3C", // Low confidence - brown
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        lw: "0 12px 40px rgba(32, 25, 16, 0.07)",
        "lw-hover": "0 18px 48px rgba(32, 25, 16, 0.12)",
        card: "0 2px 8px -2px rgba(0,0,0,0.1)",
      },
      keyframes: {
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
        "pulse-medium": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.75" },
        },
        "pulse-hot": {
          "0%, 100%": { opacity: "1", transform: "scaleX(1)" },
          "50%": { opacity: "0.8", transform: "scaleX(1.01)" },
        },
        "pulse-explosive": {
          "0%, 100%": { opacity: "1", transform: "scaleX(1)" },
          "50%": { opacity: "0.7", transform: "scaleX(1.02)" },
        },
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("@tailwindcss/typography")],
};

export default config;
