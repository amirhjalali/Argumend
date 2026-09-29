import { describe, it, expect } from "vitest";
import { buildSearchParams } from "./utils";

describe("buildSearchParams", () => {
  it("serializes string and number values", () => {
    expect(buildSearchParams({ q: "nuclear", page: 2 }).toString()).toBe(
      "q=nuclear&page=2",
    );
  });

  it("drops undefined and null but keeps falsy zero and empty string", () => {
    const params = buildSearchParams({
      keep: 0,
      empty: "",
      skipUndefined: undefined,
      skipNull: null,
    });
    expect(params.get("keep")).toBe("0");
    expect(params.get("empty")).toBe("");
    expect(params.has("skipUndefined")).toBe(false);
    expect(params.has("skipNull")).toBe(false);
    expect([...params.keys()]).toEqual(["keep", "empty"]);
  });

  it("URL-encodes values", () => {
    expect(buildSearchParams({ q: "a b&c=d" }).toString()).toBe("q=a+b%26c%3Dd");
  });

  it("returns an empty params object for {} and for all-nullish input", () => {
    expect(buildSearchParams({}).toString()).toBe("");
    expect(buildSearchParams({ a: undefined, b: null }).toString()).toBe("");
  });

  it("returns a real URLSearchParams instance", () => {
    expect(buildSearchParams({ a: "1" })).toBeInstanceOf(URLSearchParams);
  });
});
