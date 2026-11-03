/**
 * Vite's `import.meta.glob`, which Vitest transforms in tests that load every
 * route module (lib/metaDescriptionLength.test.ts, app/sitemap.test.ts).
 * Declared here rather than through `vite/client`, whose asset-module
 * declarations would collide with Next's. Test-only: the Next build never
 * sees a call to it.
 */
interface ImportMeta {
  glob<T = Record<string, unknown>>(patterns: string | string[]): Record<string, () => Promise<T>>;
}
