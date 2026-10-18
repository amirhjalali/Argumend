import { expect, test, waitForHydration } from "./fixtures";
import { PASTE_LIMITS } from "../lib/paste/limits";

test("an oversized paste keeps its ending and waits for the reader to shorten it", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).pathname === "/api/analyze") requests.push(request.method());
  });
  await page.goto("/analyze");
  const input = page.getByRole("textbox", { name: "The argument to read" });
  await waitForHydration(input);
  const draft = `${"a".repeat(PASTE_LIMITS.maxCharacters)} ORIGINAL ENDING`;
  await input.fill(draft);
  await expect(input).toHaveValue(draft);
  await expect(input).toHaveAttribute("aria-invalid", "true");
  const limitError = page.getByRole("alert").filter({ hasText: "Your full draft is still here" });
  await expect(limitError).toBeVisible();
  const submit = page.getByRole("button", { name: "Find what it turns on" });
  await expect(submit).toBeDisabled();
  await input.fill("a".repeat(PASTE_LIMITS.maxCharacters));
  await expect(submit).toBeEnabled();
  await expect(limitError).toHaveCount(0);
  expect(requests).toEqual([]);
});

test("common policy names find maps while a hairstyle dispute stays unmapped", async ({ page }) => {
  await page.goto("/analyze");
  const input = page.getByRole("textbox", { name: "The argument to read" });
  await waitForHydration(input);
  await input.fill("My ISP says it needs paid fast lanes for websites to fund better networks. I worry it will slow competing video streams and favor its own services.");
  const submit = page.getByRole("button", { name: "Find what it turns on" });
  await submit.click();
  const match = page.getByRole("region", { name: "This argument is already mapped" });
  await expect(match.locator('a[href="/topics/net-neutrality"]')).toBeVisible();
  await page.getByRole("button", { name: "Edit", exact: true }).click();
  await input.fill("States should reduce job licensing requirements for barbers and hair braiders. Training can protect customers, but expensive classes and fees may exclude people who already know the trade.");
  await submit.click();
  await expect(match.locator('a[href="/topics/occupational-licensing-reform"]')).toBeVisible();
  await page.getByRole("button", { name: "Edit", exact: true }).click();
  await input.fill("My sister wants me to braid her hair for a wedding. I prefer loose curls because braids pull too tightly.");
  await submit.click();
  await expect(page.getByRole("heading", { name: "No map, rather than the wrong map" })).toBeVisible();
  await expect(match).toHaveCount(0);
  await expect(page.getByLabel("You would think again if…")).toBeVisible();
});

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
  const firstNote = page.getByLabel("You would think again if…");
  const screensBeforeWriting = await firstNote.evaluate((input) => {
    const result = document.querySelector('section[aria-label="Result"]')!;
    return (input.getBoundingClientRect().top - result.getBoundingClientRect().top) / innerHeight;
  });
  expect(screensBeforeWriting).toBeLessThan(1.1);
  const help = page.getByText("Help me tell them apart", { exact: true });
  await help.click();
  await expect(page.getByText("Is the new route actually faster at rush hour?", { exact: false })).toBeVisible();
  await help.click();
  await page.getByLabel("You would think again if…").fill("we kept an emergency fund");
  await page.getByLabel("They would think again if…").fill("we planned time together");
  await page.getByLabel("We both agree that…").fill("we want to enjoy life without worrying about money");
  const notes = page.getByRole("region", { name: "Your conversation notes" });
  await expect(notes).toContainText("You might think again if: we planned time together");
  await expect(notes.getByRole("button", { name: "Copy your notes" })).toBeVisible();
  await notes.getByRole("button", { name: "A little" }).click();
  await expect(notes.getByRole("button", { name: "A little" })).toHaveAttribute("aria-pressed", "true");
  await page.getByLabel("We both agree that…").fill(`we should check https://example.org/${"evidence".repeat(80)}`);
  await expect(notes).toContainText("https://example.org/");
  expect(await notes.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  expect(apiCalls).toEqual(["POST /api/analyze"]);
});

test("reanalyzing unchanged text keeps conversation notes", async ({ page }) => {
  await page.goto("/analyze");
  const input = page.getByRole("textbox", { name: "The argument to read" });
  await waitForHydration(input);
  await input.fill("My partner wants to spend our savings on a holiday. I want to keep the money for emergencies. They say we never do anything fun. I say we cannot afford the risk.");
  await page.getByRole("button", { name: "Find what it turns on" }).click();
  const note = page.getByLabel("You would think again if…");
  await note.fill("we kept an emergency fund");
  await page.getByRole("button", { name: "Edit", exact: true }).click();
  await page.getByRole("button", { name: "Find what it turns on" }).click();
  await expect(page.getByRole("heading", { name: "No map, rather than the wrong map" })).toBeVisible();
  await expect(note).toHaveValue("we kept an emergency fund");
  await expect(page.getByRole("button", { name: "Copy your notes" })).toBeVisible();
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

  const previewToggle = result.getByText("Preview summary", { exact: true });
  await previewToggle.click();
  const preview = result.getByRole("region", { name: "Summary preview" });
  await expect(preview).toBeVisible();
  await expect(preview).toContainText("Questions to explore together");
  await expect(preview).toContainText("What would make each of us think again?");
  await previewToggle.click();
  await expect(preview).not.toBeVisible();

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
