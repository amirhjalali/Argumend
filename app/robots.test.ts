import { describe, expect, it } from "vitest";
import robots from "./robots";

describe("robots", () => {
  it("advertises the canonical host and sitemap", () => {
    const result = robots();
    expect(result.host).toBe("https://argumend.org");
    expect(result.sitemap).toBe("https://argumend.org/sitemap.xml");
  });

  it("keeps private API routes blocked while allowing the public v1 API", () => {
    const configuredRules = robots().rules;
    const rules = Array.isArray(configuredRules)
      ? configuredRules[0]
      : configuredRules;

    expect(rules.disallow).toContain("/api/");
    expect(rules.allow).toEqual(
      expect.arrayContaining(["/api/v1", "/api/v1/"]),
    );
  });
});
