import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { EXAMPLE_ANALYSIS_TEXT } from "@/lib/constants";
import { DISAGREEMENT_EXAMPLE_SOURCE } from "@/lib/disagreement/constants";
import { getMapIndex, MAP_MATCH } from "@/lib/paste/maps";
import type { PasteMapsResult } from "@/lib/paste/types";
import * as route from "./route";

const { POST } = route;

function postRequest(body: unknown): NextRequest {
  return new NextRequest(new URL("http://localhost/api/analyze"), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": `test-${Math.random()}`,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

async function mapsFor(content: string): Promise<PasteMapsResult> {
  const response = await POST(postRequest({ content, contentType: "conversation" }));
  expect(response.status).toBe(200);
  const body = (await response.json()) as { maps: PasteMapsResult };
  return body.maps;
}

function mapCount(maps: PasteMapsResult): number {
  return (maps.match ? 1 : 0) + maps.related.length + maps.closest.length;
}

describe("POST /api/analyze (the paste flow's map lane)", () => {
  // The first paste in a process reads every map to build the index.
  beforeAll(() => getMapIndex(), 60_000);

  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    // No network, ever: any fetch from the lane fails the test.
    vi.stubGlobal(
      "fetch",
      vi.fn(() => {
        throw new Error("the map lane must not make network requests");
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("maps the immigration example to its map, at the crux, with one card per side", async () => {
    const maps = await mapsFor(DISAGREEMENT_EXAMPLE_SOURCE);

    expect(maps.status).toBe("matched");
    expect(maps.match?.id).toBe("immigration-wage-impact");
    expect(maps.match?.crux?.href).toMatch(/^\/topics\/immigration-wage-impact#crux-/);
    expect(maps.match?.crux?.supporterFlip).toBeTruthy();
    expect(maps.match?.crux?.skepticFlip).toBeTruthy();
    expect(new Set(maps.match?.cards.map((card) => card.side))).toEqual(new Set(["for", "against"]));
    expect(fetch).not.toHaveBeenCalled();
  });

  it("maps the nuclear example to the nuclear map, with the small-reactor map closely related", async () => {
    const maps = await mapsFor(EXAMPLE_ANALYSIS_TEXT);
    expect(maps.match?.id).toBe("nuclear-energy-safety");
    expect(maps.related.map((map) => map.id)).toContain("nuclear-renaissance-smr");
  });

  it("names the nuclear-safety map for the paste the live site refused on 2026-09-29", async () => {
    const maps = await mapsFor(
      "A: Nuclear power is too dangerous, look at Chernobyl and Fukushima. B: Per terawatt-hour nuclear kills fewer people than coal or gas, and new plants are safer. A: Even so, the waste lasts thousands of years and new reactors are years late and billions over budget.",
    );
    expect(maps.status).toBe("matched");
    expect(maps.match?.id).toBe("nuclear-energy-safety");
  });

  it("can match a flagship debate map, anchored at its top crux", async () => {
    const maps = await mapsFor(
      "The US should stop sending weapons to Israel until it protects civilians in Gaza. No, Israel is an ally facing Hamas and conditioning aid would reward terrorism.",
    );
    expect(maps.match?.id).toBe("us-israel-support");
    expect(maps.match?.kind).toBe("flagship");
    expect(maps.match?.crux?.href).toMatch(/^\/topics\/us-israel-support#crux-[a-z0-9-]+$/);
  });

  it("never names more than three maps", async () => {
    for (const text of [DISAGREEMENT_EXAMPLE_SOURCE, EXAMPLE_ANALYSIS_TEXT, "Vaccines cause autism, my cousin changed after the MMR shot. That study was retracted."]) {
      const maps = await mapsFor(text);
      expect(mapCount(maps)).toBeLessThanOrEqual(MAP_MATCH.maxMaps);
    }
  });

  it("answers 'no map' rather than a wrong map for unrelated text", async () => {
    const maps = await mapsFor(
      "Pineapple on pizza is great, the sweetness balances the salty ham. It's an abomination, fruit does not belong on pizza.",
    );
    expect(maps.match).toBeNull();
    expect(maps.status).not.toBe("matched");
  });

  it("carries no weight scores on the cards it shows", async () => {
    const maps = await mapsFor(DISAGREEMENT_EXAMPLE_SOURCE);
    for (const card of maps.match?.cards ?? []) {
      expect(card).not.toHaveProperty("score");
    }
  });

  it("refuses text too short to place", async () => {
    const response = await POST(postRequest({ content: "Too short." }));
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({ code: "INVALID_REQUEST" });
  });

  it("returns a stable 400 for malformed JSON", async () => {
    const response = await POST(postRequest("{not-json"));
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "The request could not be understood.",
      code: "INVALID_JSON",
    });
  });

  it("no longer scores, judges, saves or lists anything", async () => {
    const response = await POST(postRequest({ content: DISAGREEMENT_EXAMPLE_SOURCE }));
    const body = await response.json();

    expect(Object.keys(body)).toEqual(["maps"]);
    expect(JSON.stringify(body)).not.toMatch(/judg|verdict|winner|aggregate/i);
    // The public listing that exposed every saved extraction is gone.
    expect("GET" in route).toBe(false);
  });
});
