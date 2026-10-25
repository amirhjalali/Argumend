import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { isAuthConfigured } from "@/lib/auth-config";
import { isDatabaseConfigured } from "@/lib/db";
import {
  isDisagreementPublishingEnabled,
  isDisagreementV2Enabled,
} from "@/lib/disagreement/model";
import { isGapMetricLoggingEnabled, logGapObservation } from "@/lib/gapMetric/log";
import { resolveJevLane } from "@/lib/jev/client";
import { resolvePasteLanes } from "@/lib/paste/lanes";
import { GET as health } from "@/app/api/health/route";
import { OFFLINE_SERVER_ENV } from "./offline-server-env.mjs";

afterEach(() => vi.unstubAllEnvs());

describe("offline verification server environment", () => {
  it.each(["fake", "cli", "anthropic"])(
    "disables optional services inherited from a %s diagnosis setup",
    async (diagnosisProvider) => {
      // Synthetic values only: exercise the merge order the launchers use.
      const inherited: Record<string, string> = Object.fromEntries(
        Object.keys(OFFLINE_SERVER_ENV).map((key) => [
          key,
          key.includes("ENABLE_") ? "true" : "synthetic-configured-value",
        ]),
      );
      inherited.ARGUMEND_DISAGREEMENT_PROVIDER = diagnosisProvider;
      // The explicit HTTP override bypasses the Jev feature flag when a key
      // exists, so turning the flag off alone does not isolate the harness.
      inherited.ARGUMEND_JEV_PROVIDER = "http";
      const serverEnv = { ...inherited, ...OFFLINE_SERVER_ENV };
      for (const [key, value] of Object.entries(serverEnv)) vi.stubEnv(key, value);

      expect(resolvePasteLanes()).toEqual({ maps: true, diagnosis: { enabled: false } });
      expect(isDisagreementV2Enabled()).toBe(false);
      expect(isDisagreementPublishingEnabled()).toBe(false);
      expect(resolveJevLane()).toBe("fake");
      expect(isDatabaseConfigured()).toBe(false);
      expect(isAuthConfigured()).toBe(false);
      expect(isGapMetricLoggingEnabled()).toBe(false);
      const derive = vi.fn();
      await logGapObservation(derive);
      expect(derive).not.toHaveBeenCalled();
      expect(await health().json()).toMatchObject({ status: "ok", mode: "offline" });
    },
  );

  it("uses the shared overrides after parent environment inheritance in both launchers", () => {
    const smoke = readFileSync("scripts/smoke-standalone.mjs", "utf8");
    const playwright = readFileSync("e2e/playwright.config.ts", "utf8");
    expect(smoke).toMatch(/\.\.\.process\.env,\s*\.\.\.OFFLINE_SERVER_ENV/);
    expect(playwright).toContain("...OFFLINE_SERVER_ENV");
    expect(playwright).toContain("env: offlineServerEnv");
  });
});
