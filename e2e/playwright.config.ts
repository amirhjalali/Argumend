import { existsSync } from "node:fs";
import path from "node:path";
import { defineConfig, devices } from "@playwright/test";
import { OFFLINE_SERVER_ENV } from "../scripts/offline-server-env.mjs";

/**
 * End-to-end suite: drives the production build in Chromium at phone and
 * desktop widths. Run with `bun run test:e2e` after a build.
 *
 * Server:
 *  - `E2E_BASE_URL` set: test that server; nothing is started. Use this when a
 *    server is already running (a worktree build served with `next start`,
 *    or a deployed preview).
 *  - otherwise: start the build on `E2E_PORT` (3290). The standalone server
 *    when `bun run build` assembled it (CI, Docker-like), else `next start`
 *    on `.next` (a plain `bun --bun next build`, e.g. inside a worktree, where
 *    the standalone copy step does not apply).
 *
 * A server started here runs with the smoke test's offline runtime overrides:
 * no database, no provider keys, every live flag off. Build with offline public
 * flags too: launch overrides cannot replace values baked into client bundles.
 * E2E_BASE_URL servers keep their own configuration. Tests also block browser
 * requests that leave the server's own host (e2e/fixtures.ts).
 *
 * `E2E_CHROMIUM_PATH` points Playwright at a Chromium binary already on disk
 * instead of the one `playwright install` downloads.
 */

const ROOT = path.resolve(__dirname, "..");
const CI = Boolean(process.env.CI);
const PORT = Number(process.env.E2E_PORT ?? 3290);
const externalBaseURL = process.env.E2E_BASE_URL;
const baseURL = externalBaseURL ?? `http://127.0.0.1:${PORT}`;

const standaloneReady =
  existsSync(path.join(ROOT, ".next/standalone/server.js")) &&
  existsSync(path.join(ROOT, ".next/standalone/.next/static"));

const serverCommand = standaloneReady
  ? "node .next/standalone/server.js"
  : `node node_modules/next/dist/bin/next start --port ${PORT} --hostname 127.0.0.1`;

/** The same offline environment scripts/smoke-standalone.mjs gives the server. */
const offlineServerEnv: Record<string, string> = {
  ...OFFLINE_SERVER_ENV,
  HOSTNAME: "127.0.0.1",
  PORT: String(PORT),
};

const chromiumPath = process.env.E2E_CHROMIUM_PATH;

export default defineConfig({
  testDir: ".",
  testMatch: "**/*.spec.ts",
  outputDir: path.join(ROOT, "test-results"),
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 1 : 0,
  workers: CI ? 2 : undefined,
  timeout: 30_000,
  expect: { timeout: CI ? 10_000 : 5_000 },
  reporter: CI
    ? [["github"], ["list"], ["html", { open: "never", outputFolder: path.join(ROOT, "playwright-report") }]]
    : [["list"], ["html", { open: "never", outputFolder: path.join(ROOT, "playwright-report") }]],
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    ...(chromiumPath ? { launchOptions: { executablePath: chromiumPath } } : {}),
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
      // The phone sheet only exists below 768px.
      testIgnore: "**/phone-menu.spec.ts",
    },
    {
      name: "phone",
      use: {
        ...devices["Pixel 7"],
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
      },
      // Redirects are HTTP-only; the desktop project covers them once.
      testIgnore: "**/redirects.spec.ts",
    },
  ],
  webServer: externalBaseURL
    ? undefined
    : {
        command: serverCommand,
        cwd: ROOT,
        url: `${baseURL}/api/health`,
        env: offlineServerEnv,
        // Never test whatever else answers on the port (another checkout's
        // build): a busy port fails the run. Point E2E_BASE_URL at a server
        // to test it on purpose.
        reuseExistingServer: false,
        timeout: 60_000,
        stdout: "ignore",
        stderr: "pipe",
      },
});
