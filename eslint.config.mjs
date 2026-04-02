import nextVitals from "eslint-config-next/core-web-vitals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "drizzle/**",
      "next-env.d.ts",
      ".work/**",
    ],
  },

  // Next.js core-web-vitals recommended rules
  ...nextVitals,

  // TypeScript strict rules for TS/TSX files
  ...tseslint.configs.strict.map((config) => ({
    ...config,
    files: ["**/*.ts", "**/*.tsx"],
  })),

  // Project-specific overrides for TS files
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // Warn on unused variables (allow underscore prefix)
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // Allow empty functions (common in React callbacks)
      "@typescript-eslint/no-empty-function": "off",

      // Allow `any` as warning, not error (gradual strictness)
      "@typescript-eslint/no-explicit-any": "warn",

      // Allow non-null assertions (common in Next.js patterns)
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
);
