import { afterEach, describe, expect, it } from "vitest";
import {
  DISAGREEMENT_CLI_TIMEOUT_MS,
  DISAGREEMENT_MODEL_TIMEOUT_MS,
} from "@/lib/disagreement/constants";
import { resolveAnalyzeTimeoutMs } from "./index";

const env = process.env as Record<string, string | undefined>;
const originals = {
  provider: env.ARGUMEND_DISAGREEMENT_PROVIDER,
  nodeEnv: env.NODE_ENV,
};

function set(key: string, value: string | undefined) {
  // An empty string reads the same as unset for every check in the resolver,
  // and avoids a dynamic delete.
  env[key] = value ?? "";
}

afterEach(() => {
  set("ARGUMEND_DISAGREEMENT_PROVIDER", originals.provider);
  set("NODE_ENV", originals.nodeEnv);
});

describe("resolveAnalyzeTimeoutMs", () => {
  it("uses the served 45s budget for the hosted provider", () => {
    set("ARGUMEND_DISAGREEMENT_PROVIDER", "anthropic");
    set("NODE_ENV", "development");
    expect(resolveAnalyzeTimeoutMs()).toBe(DISAGREEMENT_MODEL_TIMEOUT_MS);
  });

  it("uses the served budget when no provider is configured", () => {
    set("ARGUMEND_DISAGREEMENT_PROVIDER", undefined);
    set("NODE_ENV", "development");
    expect(resolveAnalyzeTimeoutMs()).toBe(DISAGREEMENT_MODEL_TIMEOUT_MS);
  });

  it("widens to the CLI budget when that lane is chosen outside production", () => {
    set("ARGUMEND_DISAGREEMENT_PROVIDER", "cli");
    set("NODE_ENV", "development");
    expect(resolveAnalyzeTimeoutMs()).toBe(DISAGREEMENT_CLI_TIMEOUT_MS);
    expect(DISAGREEMENT_CLI_TIMEOUT_MS).toBeGreaterThan(DISAGREEMENT_MODEL_TIMEOUT_MS);
  });

  it("never widens production, even if the cli lane is somehow configured there", () => {
    set("ARGUMEND_DISAGREEMENT_PROVIDER", "cli");
    set("NODE_ENV", "production");
    expect(resolveAnalyzeTimeoutMs()).toBe(DISAGREEMENT_MODEL_TIMEOUT_MS);
  });
});
