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
        // Backgrounds - LessWrong Style
        canvas: "#F2F2F2", // Light grey page background
        paper: "#FFFFFF",  // Clean white cards
        
        // Text
        primary: "#2A2A2A", // Soft black
        secondary: "#666666", // Medium grey
        muted: "#8F8F8F", // Light grey

        // Accents - LW Inspired
        accent: {
          main: "#5BA150", // LW Green (Logic/Truth/Score)
          link: "#3C6B2E", // Darker green for interaction
          warn: "#E5A02F", // Warm yellow/orange
          error: "#D93025", // Standard red
        },
      },
      fontFamily: {
        serif: ["Crimson Pro", "Georgia", "serif"], // For body text, headers
        sans: ["Source Sans Pro", "Verdana", "sans-serif"], // For UI elements, metadata
        mono: ["Inconsolata", "monospace"],
      },
      boxShadow: {
        'lw': '0 1px 2px rgba(0, 0, 0, 0.08)',
        'lw-hover': '0 4px 12px rgba(0, 0, 0, 0.12)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
