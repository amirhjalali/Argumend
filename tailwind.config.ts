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
        // New "Warm Paper" Palette
        canvas: "#FDFBF7", // App Background (Warm off-white)
        sidebar: "#F2EFE9", // Sidebar Background (Darker beige)
        paper: "#FFFFFF", // Node Background (White)
        
        // Text
        primary: "#2D2D2D", // Soft Black
        secondary: "#6B7280", // Gray-500
        muted: "#9CA3AF", // Gray-400

        // Accents
        accent: {
          main: "#059669", // Emerald-600 (Truth/Proponent)
          warn: "#D97706", // Amber-600 (Doubt/Skeptic)
          link: "#2563EB", // Royal Blue (Links/Action)
          error: "#EF4444", // Red-500
        },
      },
      fontFamily: {
        serif: ["Merriweather", "Georgia", "serif"],
        sans: ["Merriweather Sans", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        lw: "0 1px 2px rgba(0, 0, 0, 0.05)",
        "lw-hover": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        card: "0 2px 8px -2px rgba(0,0,0,0.1)",
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
