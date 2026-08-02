import { describe, expect, it } from "vitest";
import { isKnownSoft404Url, validateSourceUrl } from "./source-url-health";

describe("validateSourceUrl", () => {
  it("accepts absolute HTTP(S) publication URLs", () => {
    expect(validateSourceUrl("https://www.sec.gov/newsroom/press-releases/2025-47"))
      .toMatchObject({ valid: true });
    expect(validateSourceUrl("http://archive.org/details/report"))
      .toMatchObject({ valid: true });
  });

  it.each([
    "not a URL",
    "ftp://example.edu/report.pdf",
    "https://localhost/report",
    "https://example.com/report",
    "https://source.invalid/report",
    " https://www.sec.gov/report",
    "https://user:secret@publisher.org/report",
  ])("rejects malformed or placeholder source URL %s", (url) => {
    expect(validateSourceUrl(url)).toMatchObject({ valid: false });
  });

  it("recognizes explicit soft-404 destinations without flagging generic pages", () => {
    expect(isKnownSoft404Url("https://www.fcc.gov/page-not-found")).toBe(true);
    expect(isKnownSoft404Url("https://publisher.org/404/")).toBe(true);
    expect(isKnownSoft404Url("https://publisher.org/newsroom/")).toBe(false);
  });
});
