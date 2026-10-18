import { expect, pageText, test, waitForHydration } from "./fixtures";

/**
 * The crux-first topic page (components/topic/TopicPage.tsx): a question as
 * the h1, what the sides already agree on, then the crux sheet, and never a
 * score, a verdict or a winner.
 */
const FLAGSHIP = "/topics/ai-mass-unemployment";

test("saved maps survive a return visit and keyboard removal keeps a useful next action", async ({ page }) => {
  for (const id of ["ai-mass-unemployment", "nuclear-energy-safety", "climate-change"]) {
    await page.goto(`/topics/${id}`);
    const save = page.getByRole("button", { name: "Save this map on this device", exact: true });
    await waitForHydration(save);
    await save.click();
    await expect(page.getByRole("button", { name: "Remove this map from saved", exact: true })).toBeVisible();
  }
  await page.getByRole("contentinfo").getByRole("link", { name: "Saved", exact: true }).click();
  await expect(page).toHaveURL(/\/saved$/);
  await page.reload();
  const main = page.getByRole("main");
  const status = main.getByRole("status", { name: "Saved map updates" });
  await expect(main.getByText("3 saved, in the order you saved them", { exact: true })).toBeVisible();
  const nuclear = main.getByRole("button", { name: /^Remove "Should nuclear power/ });
  await nuclear.press("Enter");
  const climate = main.getByRole("link", { name: /^Is climate change/ });
  await expect(climate).toBeFocused();
  await expect(status).toContainText("2 saved maps remaining.");
  await climate.press("Enter");
  await expect(page).toHaveURL(/\/topics\/climate-change$/);
  await expect(page.getByRole("button", { name: "Remove this map from saved", exact: true })).toBeVisible();
  await page.getByRole("contentinfo").getByRole("link", { name: "Saved", exact: true }).click();
  await expect(page).toHaveURL(/\/saved$/);
  await main.getByRole("button", { name: /^Remove "Is climate change/ }).press("Enter");
  await expect(main.getByRole("link", { name: /^Will AI cause mass unemployment/ })).toBeFocused();
  await expect(status).toContainText("1 saved map remaining.");
  await main.getByRole("button", { name: /^Remove "Will AI cause/ }).press("Enter");
  await expect(main.getByRole("link", { name: "Browse maps", exact: true })).toBeFocused();
  await expect(status).toContainText("0 saved maps remaining.");
  await page.reload();
  await expect(main.getByRole("heading", { name: "Nothing saved yet", exact: true })).toBeVisible();
});

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

  await page.getByRole("link", { name: "Method and limits", exact: true }).click();
  await expect(page).toHaveURL(/#how-the-pilot-count-was-produced$/);
  await expect(page.getByRole("heading", { name: "How the pilot count was produced", exact: true })).toBeInViewport();
  await page.goBack();
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

test("related links stay on nearby subjects and an isolated map still offers browsing", async ({ page }) => {
  await page.goto("/topics/congestion-pricing");
  const relatedMaps = page.getByRole("navigation", { name: "Related maps" });
  await expect(relatedMaps.locator('a[href="/topics/self-driving-car-safety"]')).toBeVisible();
  for (const id of ["universal-basic-income", "immigration-border-crisis", "daylight-saving-time-abolition"]) {
    await expect(relatedMaps.locator(`a[href="/topics/${id}"]`)).toHaveCount(0);
  }

  await page.goto("/questions/does-congestion-pricing-work");
  const relatedQuestions = page.locator("#related");
  const drivingQuestion = relatedQuestions.locator('a[href="/questions/are-self-driving-cars-safer-than-human-drivers"]');
  await expect(drivingQuestion).toBeVisible();
  await drivingQuestion.click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Are self-driving cars safer than human drivers?");

  await page.goto("/topics/dark-matter-vs-mond");
  await expect(relatedMaps.locator('a[href^="/topics/"]')).toHaveCount(0);
  const browse = relatedMaps.getByRole("link", { name: "Browse all maps →", exact: true });
  await expect(browse).toBeVisible();
  await browse.click();
  await expect(page).toHaveURL(/\/topics$/);
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
