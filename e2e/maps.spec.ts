import { expect, pageText, test } from "./fixtures";

/**
 * The crux-first topic page (components/topic/TopicPage.tsx): a question as
 * the h1, what the sides already agree on, then the crux sheet, and never a
 * score, a verdict or a winner.
 */
const FLAGSHIP = "/topics/ai-mass-unemployment";

test("a blocked clipboard leaves a selectable map link and a keyboard way back", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "share", { configurable: true, value: undefined });
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async () => { throw new DOMException("Blocked", "NotAllowedError"); } },
    });
    Object.defineProperty(document, "execCommand", { configurable: true, value: () => false });
  });
  await page.goto(FLAGSHIP);
  const share = page.getByRole("button", { name: "Share", exact: true }).first();
  await share.click();
  const panel = page.getByRole("group", { name: "Share this map" });
  const copy = panel.getByRole("button", { name: "Copy link", exact: true });
  await copy.click();
  const manualLink = panel.getByRole("textbox", { name: "Link to copy" });
  await expect(manualLink).toHaveValue("https://argumend.org/topics/ai-mass-unemployment");
  await expect(panel.getByRole("button", { name: "Link copied" })).toHaveCount(0);
  await expect(copy).toBeFocused();
  expect(await panel.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return rect.left >= 0 && rect.right <= innerWidth;
  })).toBe(true);
  for (let step = 0; step < 3; step += 1) await page.keyboard.press("Tab");
  await expect(manualLink).toBeFocused();
  expect(await manualLink.evaluate((element: HTMLInputElement) =>
    element.selectionStart === 0 && element.selectionEnd === element.value.length,
  )).toBe(true);
  await manualLink.press("Escape");
  await expect(panel).toHaveCount(0);
  await expect(share).toBeFocused();
});

test("a map's search, social, and structured descriptions frame the question", async ({ page }) => {
  await page.goto("/topics/rent-control-effectiveness");
  const question = await page.getByRole("heading", { level: 1 }).innerText();
  const description = await page.locator('meta[name="description"]').getAttribute("content");
  expect(description).toContain(question);
  expect(description).toContain("evidence on each side");
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", description!);
  await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute("content", description!);
  const article = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
    scripts.map((script) => JSON.parse(script.textContent ?? "{}")).find((data) => data["@type"] === "Article"),
  );
  expect(article.description).toBe(description);
});

test("home's primary button opens the flagship map, crux first", async ({ page }) => {
  await page.goto("/");
  const cta = page.getByTestId("home-primary-cta");
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute("href", FLAGSHIP);

  await cta.click();
  await expect(page).toHaveURL(new RegExp(`${FLAGSHIP}$`));

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/\S.*\?$/);
  // "What both sides already agree on", or the map's own wording of it.
  await expect(page.locator("#agreement").getByRole("heading", { level: 2 })).toHaveText(/^What\b/);

  const cruxes = page.locator("[data-crux-sheet] > li");
  await expect(cruxes.first()).toBeVisible();

  const first = cruxes.first();
  const fold = first.locator(":scope > details");
  const body = fold.locator(":scope > div");
  await expect(fold).not.toHaveAttribute("open");
  await expect(body).toBeHidden();

  await fold.locator(":scope > summary").click();
  await expect(fold).toHaveAttribute("open", "");
  await expect(body).toBeVisible();
  await expect(first.getByText(/^What (would settle|settled) it/).first()).toBeVisible();
});

test("a legacy map leads with a question and a crux sheet, never a score", async ({ page }) => {
  const response = await page.goto("/topics/nuclear-energy-safety");
  expect(response?.status()).toBe(200);

  const h1 = page.getByRole("heading", { level: 1 });
  await expect(h1).toHaveText(/\S/);
  await expect(h1).toHaveText(/\?$/);
  await expect(page.locator("[data-crux-sheet] > li").first()).toBeVisible();

  const text = await pageText(page);
  expect(text).not.toMatch(/\bpts\b/);
  expect(text).not.toContain("/100");
  expect(text).not.toMatch(/\bwinner\b/i);
  expect(text).not.toMatch(/\bverdict\b/i);
});

test("the embed widget shows no verdict, margin or winner", async ({ page }) => {
  const response = await page.goto("/embed/nuclear-energy-safety");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/\S/);

  const text = await pageText(page);
  expect(text).not.toMatch(/\bverdict\b/i);
  expect(text).not.toMatch(/\bmargin\b/i);
  expect(text).not.toMatch(/\bwinner\b/i);
});
