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
        // Backgrounds
        void: "#050505",
        card: "#0F0F10",
        subtle: "#1A1A1C",

        // Text
        primary: "#EDEDED",
        secondary: "#A1A1AA",
        muted: "#52525B",

        // Semantic Accents
        accent: {
          truth: "#00E5FF",
          doubt: "#FF9500",
          crux: "#10B981",
          danger: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Roboto Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
