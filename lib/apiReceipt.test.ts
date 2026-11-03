import { describe, expect, it } from "vitest";

import { isSuccessReceipt, receiptError } from "./apiReceipt";

describe("API receipt guards", () => {
  it("accepts only a literal success: true object", () => {
    expect(isSuccessReceipt({ success: true })).toBe(true);
    expect(isSuccessReceipt({ success: true, id: "x" })).toBe(true);
    for (const value of [{ success: "true" }, { success: false }, {}, null, undefined, [true], "ok", 1]) {
      expect(isSuccessReceipt(value), JSON.stringify(value)).toBe(false);
    }
  });

  it("reads a string error and nothing else", () => {
    expect(receiptError({ error: "Rate limited" })).toBe("Rate limited");
    expect(receiptError({ error: "" })).toBe("");
    for (const value of [{ error: 429 }, { message: "x" }, null, ["error"], "error"]) {
      expect(receiptError(value), JSON.stringify(value)).toBeUndefined();
    }
  });
});
