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
          main: "#b87333", // Warm copper - punchy action color
          warn: "#c9a227", // Rich gold - confidence/highlights
          link: "#d4943a", // Burnished gold links
          error: "#c4584d",
        },

        // Bold semantic colors for graph elements
        crux: {
          DEFAULT: "#a23b3b", // Deep crimson for cruxes
          light: "#c45c5c",
          dark: "#7a2929",
        },
        evidence: {
          DEFAULT: "#b87333", // Warm copper for evidence
          light: "#d4943a", // Burnished gold
          dark: "#8b5a2b", // Deep bronze
        },
        proponent: {
          DEFAULT: "#c9a227", // Rich gold for proponent
          light: "#e0bc4c",
          dark: "#a68820",
        },
        skeptic: {
          DEFAULT: "#8b4513", // Saddle brown for skeptic (earthy contrast)
          light: "#a0522d", // Sienna
          dark: "#5c3317", // Dark brown
        },
        score: {
          high: "#c9a227", // High confidence - gold
          mid: "#b87333", // Mid confidence - copper
          low: "#8b4513", // Low confidence - saddle brown
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
