import { expect, test, waitForHydration } from "./fixtures";

test("an unmapped personal argument becomes conversation notes without another request", async ({ page }) => {
  const apiCalls: string[] = [];
  page.on("request", (request) => {
    const path = new URL(request.url()).pathname;
    if (path.startsWith("/api/")) apiCalls.push(`${request.method()} ${path}`);
  });
  await page.goto("/analyze");
  const input = page.getByRole("textbox", { name: "The argument to read" });
  await waitForHydration(input);
  await input.fill("My partner wants us to spend our savings on a holiday. I want to keep the money for emergencies. They say we never do anything fun, and I say we cannot afford to take the risk.");
  await page.getByRole("button", { name: "Find what it turns on" }).click();
  await expect(page.getByRole("heading", { name: "No map, rather than the wrong map" })).toBeVisible();
  await page.getByLabel("You would think again if…").fill("we kept an emergency fund");
  await page.getByLabel("They would think again if…").fill("we planned time together");
  await page.getByLabel("We both agree that…").fill("we want to enjoy life without worrying about money");
  const notes = page.getByRole("region", { name: "Your conversation notes" });
  await expect(notes).toContainText("You might think again if: we planned time together");
  await expect(notes.getByRole("button", { name: "Copy your notes" })).toBeVisible();
  await notes.getByRole("button", { name: "A little" }).click();
  await expect(notes.getByRole("button", { name: "A little" })).toHaveAttribute("aria-pressed", "true");
  expect(apiCalls).toEqual(["POST /api/analyze"]);
});

/**
 * The paste flow at /analyze, offline: the built-in example goes to the
 * server's own map lane (/api/analyze) and comes back as a map and its crux.
 * The reader continues at that crux by keyboard. Nothing may reach a third party; the
 * fixture blocks and records any attempt, and this test asserts on it.
 */
test("the example opens its crux and continues there by keyboard, without leaving the server", async ({
  page,
  externalRequests,
}, testInfo) => {
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
  await expect(cruxLink).toBeVisible();
  const href = await cruxLink.getAttribute("href");
  expect(href).toMatch(/^\/topics\/[a-z0-9-]+#crux-/);
  await cruxLink.click();
  await expect(page).toHaveURL(new RegExp(`${href}$`));

  const fragment = new URL(page.url()).hash;
  const entry = page.locator(fragment);
  const fold = entry.locator(":scope > details");
  const summary = fold.locator(":scope > summary");
  await expect(fold).toHaveAttribute("open", "");
  await expect(summary).toBeFocused();
  await expect(summary).toBeInViewport();

  // Tab continues into this crux's evidence, rather than the site header or
  // a link left behind on the paste result.
  await page.keyboard.press("Tab");
  expect(await entry.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  await expect(summary).not.toBeFocused();

  // Close the destination, then follow a link to the same fragment again.
  // The desktop rail is a native anchor: no hashchange fires on this visit.
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(fold).not.toHaveAttribute("open");
  let returnLink;
  if (testInfo.project.name === "desktop") {
    returnLink = page.getByRole("complementary", { name: "On this page" }).locator(`a[href="${fragment}"]`);
  } else {
    const question = await entry.locator("h3 > span").first().innerText();
    const reflection = page.locator("#reflect");
    const choice = reflection.getByRole("button", { name: question, exact: true });
    await waitForHydration(choice);
    await choice.click();
    returnLink = reflection.getByRole("link", { name: "Open this crux" });
  }
  await returnLink.focus();
  await page.keyboard.press("Enter");
  await expect(fold).toHaveAttribute("open", "");
  await expect(summary).toBeFocused();
  await expect(summary).toBeInViewport();

  expect(apiCalls).toContain("POST /api/analyze");
  expect(externalRequests).toEqual([]);
});

/**
 * On a phone the result's one rust action sits under the crux box, with the
 * long texts above it clamped behind "Show more" (r3 review #11: it used to be
 * ~4.5 screens down). Measured from the top of the result region.
 */
test("on a phone, the crux's action is within about a screen and a half of the result", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "phone", "phone layout only");
  await page.goto("/analyze");
  const example = page.getByRole("button", { name: "See an example" });
  await waitForHydration(example);
  await example.click();
  await page.getByRole("button", { name: "Find what it turns on" }).click();

  const result = page.getByRole("region", { name: "Result" });
  await expect(result).toBeVisible({ timeout: 15_000 });
  const cta = result.getByRole("link", { name: /^Open the map at (this|the first) crux$/ });
  await expect(cta).toBeVisible();

  const firstMore = result.getByRole("button", { name: /^Show more/ }).first();
  await expect(firstMore).toHaveAttribute("aria-expanded", "false");
  // Held by what it controls: its name changes to "Show less" once open.
  const controls = await firstMore.getAttribute("aria-controls");
  const more = result.locator(`button[aria-controls="${controls}"]`);

  const { screens } = await page.evaluate(() => {
    const region = document.querySelector('section[aria-label="Result"]')!;
    const link = [...region.querySelectorAll("a")].find((a) => /^Open the map at (this|the first) crux$/.test(a.textContent?.trim() ?? ""))!;
    return {
      screens: (link.getBoundingClientRect().top - region.getBoundingClientRect().top) / window.innerHeight,
    };
  });
  expect(screens).toBeLessThan(1.5);

  await more.click();
  await expect(more).toHaveAttribute("aria-expanded", "true");
  await expect(more).toHaveText(/^Show less/);
});
