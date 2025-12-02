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
          main: "#4f7b77", // Teal action
          warn: "#b39664", // Gold highlights
          link: "#6b8c84", // Sage/teal links
          error: "#c4584d",
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
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
