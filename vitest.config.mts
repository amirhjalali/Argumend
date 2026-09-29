/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    globals: true,
    include: ["**/*.test.ts", "**/*.test.tsx"],
    // Agent worktrees and tool artifacts live under .claude/; never collect their copies of the suite.
    // e2e/ is the Playwright suite (`bun run test:e2e`), run against a built server, not here.
    exclude: ["**/node_modules/**", "**/.claude/**", "**/.playwright-mcp/**", "**/.next/**", "e2e/**"],
    coverage: {
      reporter: ["text", "html"],
      exclude: [
        "node_modules/",
        "**/*.test.ts",
        "**/*.test.tsx",
        "**/*.config.ts",
        "**/*.config.js",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
