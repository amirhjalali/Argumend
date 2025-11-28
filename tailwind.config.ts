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
        // Backgrounds - Modern gradient base
        void: "#0A0A0F",
        card: "#1A1A2E",
        subtle: "#16213E",

        // Text
        primary: "#FFFFFF",
        secondary: "#B4B4C5",
        muted: "#6B6B80",

        // Vibrant Modern Accents
        accent: {
          truth: "#00D9FF",    // Bright cyan
          doubt: "#FF6B00",    // Vibrant orange
          crux: "#00FFA3",     // Electric green
          danger: "#FF3366",   // Hot pink
          purple: "#A855F7",   // Purple for variety
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Roboto Mono", "monospace"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 0.3) 0px, transparent 50%), radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 0.3) 0px, transparent 50%), radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 0.3) 0px, transparent 50%), radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 0.3) 0px, transparent 50%), radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 0.3) 0px, transparent 50%), radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 0.3) 0px, transparent 50%), radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 0.3) 0px, transparent 50%)',
      },
      boxShadow: {
        'glow-truth': '0 0 20px rgba(0, 217, 255, 0.5)',
        'glow-doubt': '0 0 20px rgba(255, 107, 0, 0.5)',
        'glow-crux': '0 0 20px rgba(0, 255, 163, 0.5)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
