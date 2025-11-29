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
        // Backgrounds - Stoic/Classical Theme
        agora: "#FDFCF8", // Warm off-white parchment
        stone: "#E5E5E0", // Light stone grey
        marble: "#F4F4F0", // Clean marble
        
        // Cards & Surfaces
        parchment: "#FDFCF8",
        "parchment-dark": "#F2F0E6",
        
        // Text - Classical Discourse
        primary: "#2C2C2C", // Dark charcoal, softer than black
        secondary: "#595959", // Medium grey
        muted: "#8C8C8C", // Light grey

        // Accents - Classical Elements
        accent: {
          logos: "#2C3E50",    // Deep Navy (Logic/Truth) - replaces 'truth'
          pathos: "#8B4513",   // Saddle Brown/Clay (Emotion/Doubt) - replaces 'doubt'
          ethos: "#556B2F",    // Olive Green (Character/Crux) - replaces 'crux'
          gold: "#C5A059",     // Antique Gold (Highlight)
          marble: "#E5E5E0",   // Stone accent
        },
      },
      fontFamily: {
        serif: ["Cinzel", "Merriweather", "serif"],
        sans: ["Lato", "Inter", "system-ui", "sans-serif"],
        mono: ["Courier Prime", "monospace"], // Typewriter feel
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'paper-texture': "url('/paper-texture.png')", // Placeholder for potential texture
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'engraved': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
