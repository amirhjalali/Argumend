import { expect, test, waitForHydration } from "./fixtures";

/**
 * The paste flow at /analyze, offline: the built-in example goes to the
 * server's own map lane (/api/analyze) and comes back as a map and its crux,
 * or as the honest no-match state. Nothing may reach a third party; the
 * fixture blocks and records any attempt, and this test asserts on it.
 */
test("the example finds a map and links to its crux, without leaving the server", async ({
  page,
  externalRequests,
}) => {
  const apiCalls: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.pathname.startsWith("/api/")) apiCalls.push(`${request.method()} ${url.pathname}`);
  });

  await page.goto("/analyze");
  const example = page.getByRole("button", { name: "See an example" });
  await waitForHydration(example);
  await example.click();

  const input = page.getByRole("textbox", { name: "The argument to read" });
  await expect(input).not.toHaveValue("");

  await page.getByRole("button", { name: "Find what it turns on" }).click();

  const result = page.getByRole("region", { name: "Result" });
  await expect(result).toBeVisible({ timeout: 15_000 });

  const cruxLink = result.getByRole("link", { name: /^Open the map/ });
  const noMatch = result.getByRole("heading", { name: /^No map/ });
  await expect(cruxLink.or(noMatch).first()).toBeVisible();
  if ((await cruxLink.count()) > 0) {
    await expect(cruxLink.first()).toHaveAttribute("href", /^\/topics\/[a-z0-9-]+/);
  }

  expect(apiCalls).toContain("POST /api/analyze");
  expect(externalRequests).toEqual([]);
});
