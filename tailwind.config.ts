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

        accent: {
          main: "#2d7a6f", // Vivid teal - punchy action color
          warn: "#c9a227", // Rich gold - confidence/highlights
          link: "#3d8b7a", // Stronger teal links
          error: "#c4584d",
        },

        // Bold semantic colors for graph elements
        crux: {
          DEFAULT: "#a23b3b", // Deep crimson for cruxes
          light: "#c45c5c",
          dark: "#7a2929",
        },
        evidence: {
          DEFAULT: "#2d7a6f", // Vivid teal for evidence
          light: "#4a9e91",
          dark: "#1d5a52",
        },
        skeptic: {
          DEFAULT: "#b85c38", // Warm terracotta for skeptic
          light: "#d4805c",
          dark: "#8a4429",
        },
        score: {
          high: "#2d7a6f", // High confidence - teal
          mid: "#c9a227", // Mid confidence - gold
          low: "#b85c38", // Low confidence - terracotta
        },
      },
      fontFamily: {
        serif: ["EB Garamond", "Georgia", "serif"],
        sans: ["Source Sans 3", "system-ui", "sans-serif"],
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
