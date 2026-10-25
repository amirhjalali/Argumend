import { describe, expect, it } from "vitest";
import {
  classifyFetchOutcome,
  isCookieWallUrl,
  isKnownSoft404Url,
  validateSourceUrl,
} from "./source-url-health";

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

describe("classifyFetchOutcome", () => {
  const nature = "https://www.nature.com/articles/s41586-022-05172-4";
  const cookieWall = `${nature}?error=cookies_not_supported&code=65c87afa-9939-4e9a-8f86-338910710a1d`;

  it("detects Nature's cookie-wall bounce URL", () => {
    expect(isCookieWallUrl(cookieWall)).toBe(true);
    expect(isCookieWallUrl(nature)).toBe(false);
    expect(isCookieWallUrl("not a url")).toBe(false);
  });

  it("reports a 2xx behind the cookie wall as BOT_WALL, not REDIRECTED", () => {
    expect(
      classifyFetchOutcome({
        code: 200,
        finalUrl: cookieWall,
        redirected: true,
        requestedUrl: nature,
      }),
    ).toBe("BOT_WALL");
  });

  it("keeps a 404 behind the cookie wall DEAD so the wall cannot hide fabricated DOIs", () => {
    expect(
      classifyFetchOutcome({
        code: 404,
        finalUrl: cookieWall,
        redirected: true,
        requestedUrl: nature,
      }),
    ).toBe("DEAD");
  });

  it("classifies ordinary responses", () => {
    const base = { redirected: false, requestedUrl: nature, finalUrl: nature };
    expect(classifyFetchOutcome({ ...base, code: 200 })).toBe("OK");
    expect(classifyFetchOutcome({ ...base, code: 410 })).toBe("DEAD");
    expect(classifyFetchOutcome({ ...base, code: 403 })).toBe("BLOCKED");
    expect(classifyFetchOutcome({ ...base, code: 429 })).toBe("BLOCKED");
    expect(classifyFetchOutcome({ ...base, code: 500 })).toBe("ERROR");
    expect(
      classifyFetchOutcome({
        code: 200,
        redirected: true,
        requestedUrl: nature,
        finalUrl: "https://www.nature.com/articles/s41586-022-05172-4/new-home",
      }),
    ).toBe("REDIRECTED");
    expect(
      classifyFetchOutcome({
        code: 200,
        redirected: true,
        requestedUrl: "https://www.fcc.gov/old-report",
        finalUrl: "https://www.fcc.gov/page-not-found",
      }),
    ).toBe("DEAD");
  });
});
