import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#f4f1eb", // LessWrong parchment
        sidebar: "#efe9df", // Sidebar backdrop
        panel: "#fdfaf6", // Cards / panels
        paper: "#fefdfb", // Lightweight paper for nodes
        overlay: "#e7e0d5",

        primary: "#1f1f1d",
        secondary: "#6d645c",
        muted: "#9c9288",

        deep: {
          DEFAULT: "#4f7b77", // Deep teal — primary accent
          light: "#6a9b96",
          dark: "#3d5f5c",
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
        },

        // Bold semantic colors for graph elements
        crux: {
          DEFAULT: "#a23b3b", // Deep crimson for cruxes
          light: "#c45c5c",
          dark: "#7a2929",
        },
        evidence: {
          DEFAULT: "#4f7b77", // Deep teal for evidence
          light: "#6a9b96", // Light teal
          dark: "#3d5f5c", // Dark teal
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
        serif: ["EB Garamond", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        lw: "0 12px 40px rgba(32, 25, 16, 0.07)",
        "lw-hover": "0 18px 48px rgba(32, 25, 16, 0.12)",
        card: "0 2px 8px -2px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
