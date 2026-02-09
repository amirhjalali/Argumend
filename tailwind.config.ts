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

        accent: {
          main: "#D4A012", // Rich metallic gold
          warn: "#E8B923", // Bright gold
          link: "#CF7B3E", // Warm copper link
          error: "#c4584d",
        },

        // Bold semantic colors for graph elements
        crux: {
          DEFAULT: "#a23b3b", // Deep crimson for cruxes
          light: "#c45c5c",
          dark: "#7a2929",
        },
        evidence: {
          DEFAULT: "#CF7B3E", // Rich copper for evidence
          light: "#E09555", // Light copper
          dark: "#A65F2A", // Deep copper
        },
        proponent: {
          DEFAULT: "#D4A012", // Metallic gold for proponent
          light: "#E8B923",
          dark: "#B8890F",
        },
        skeptic: {
          DEFAULT: "#8B5A3C", // Warm brown for skeptic
          light: "#A67350", // Light brown
          dark: "#6B442C", // Dark brown
        },
        score: {
          high: "#D4A012", // High confidence - metallic gold
          mid: "#CF7B3E", // Mid confidence - copper
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
