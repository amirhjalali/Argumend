import { describe, expect, it } from "vitest";
import manifest from "./manifest";

describe("web manifest", () => {
  it("describes an installable canonical app using the real icon asset", () => {
    const result = manifest();
    expect(result.name).toContain("ARGUMEND");
    expect(result.short_name).toBe("ARGUMEND");
    expect(result.start_url).toBe("/");
    expect(result.scope).toBe("/");
    expect(result.display).toBe("standalone");
    expect(result.icons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          src: "/icon.png",
          sizes: "512x512",
          type: "image/png",
        }),
      ]),
    );
  });
});
