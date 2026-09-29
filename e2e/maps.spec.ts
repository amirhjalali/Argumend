import { expect, pageText, test } from "./fixtures";

/**
 * The crux-first topic page (components/topic/TopicPage.tsx): a question as
 * the h1, what the sides already agree on, then the crux sheet, and never a
 * score, a verdict or a winner.
 */
const FLAGSHIP = "/topics/ai-mass-unemployment";

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
