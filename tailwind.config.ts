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
        canvas: "#F8F5EE",
        paper: "#FFFDF7",
        primary: "#1F1E1C",
        secondary: "#5C625A",
        muted: "#918375",
        border: "#DED7C5",
        accent: {
          main: "#5F8F65",
          link: "#2F5937",
          warn: "#D29D3A",
          error: "#C8513C",
        },
        lw: {
          sand: "#F8F5EE",
          parchment: "#F1EDE0",
          veil: "#F8F1E3",
          border: "#DED7C5",
          night: "#0C1222",
          sage: "#5F8F65",
        },
      },
      fontFamily: {
        serif: ["Newsreader", "Palatino", "Book Antiqua", "serif"],
        sans: [
          "Public Sans",
          "Gill Sans",
          "Gill Sans MT",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: ["IBM Plex Mono", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        lw: "0 1px 2px rgba(17, 24, 39, 0.08)",
        "lw-hover": "0 8px 30px rgba(23, 20, 18, 0.12)",
        "lw-panel": "0 20px 45px rgba(16, 14, 12, 0.18)",
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
