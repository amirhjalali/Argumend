import { expect, test, waitForHydration } from "./fixtures";

test("search keeps clear and close usable on narrow phones in either theme", async ({ page, isMobile }) => {
  test.skip(!isMobile, "The phone project checks the narrow search controls.");
  await page.addInitScript(() => localStorage.removeItem("theme"));

  for (const width of [320, 390]) {
    for (const colorScheme of ["light", "dark"] as const) {
      await page.setViewportSize({ width, height: 844 });
      await page.emulateMedia({ colorScheme });
      await page.goto("/topics");
      const search = page.getByRole("banner").getByRole("button", { name: "Search", exact: true });
      await waitForHydration(search);
      await search.click();

      const dialog = page.getByRole("dialog", { name: "Search Argumend" });
      const input = dialog.getByRole("combobox");
      await input.fill("nuclear");
      const clear = dialog.getByRole("button", { name: "Clear search" });
      const close = dialog.getByRole("button", { name: "Close search (Esc)" });
      await expect(dialog).toHaveCSS("transform", "none");
      await expect(clear).toBeInViewport({ ratio: 1 });
      await expect(close).toBeInViewport({ ratio: 1 });
      expect((await clear.boundingBox())!.width, `clear target at ${width}px in ${colorScheme}`).toBeGreaterThanOrEqual(44);

      await clear.focus();
      await clear.press("Enter");
      await expect(input).toBeFocused();
      await expect(input).toHaveValue("");
      await input.fill("climate");
      await close.click();
      await expect(dialog).toBeHidden();
      await expect(search).toBeFocused();
    }
  }
});

test("rapid search shortcut toggling preserves modal behavior", async ({ page }) => {
  await page.goto("/topics");
  const trigger = page.getByRole("banner").getByRole("button", { name: "Search", exact: true });
  await waitForHydration(trigger);
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Search Argumend" });
  await expect(dialog.getByRole("combobox")).toBeFocused();

  await page.keyboard.press("ControlOrMeta+k");
  await page.keyboard.press("ControlOrMeta+k");

  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute("aria-modal", "true");
  await expect(dialog.getByRole("combobox")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

for (const warmed of [false, true]) {
  for (const resize of [false, true]) {
    test(`menu to search returns focus to the header control (warmed=${warmed}, resize=${resize})`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto("/topics");
      const menu = page.getByRole("button", { name: "Open menu" });
      await waitForHydration(menu);
      const search = page.getByRole("dialog", { name: "Search Argumend" });
      if (warmed) {
        await page.getByRole("banner").getByRole("button", { name: "Search", exact: true }).click();
        await expect(search.getByRole("combobox")).toBeFocused();
        await page.keyboard.press("Escape");
        await expect(search).toBeHidden();
      }
      await menu.click();
      await expect(page.getByRole("button", { name: "Close menu" })).toBeFocused();
      await page.keyboard.press("ControlOrMeta+k");
      await expect(search.getByRole("combobox")).toBeFocused();
      if (resize) {
        await page.setViewportSize({ width: 1280, height: 900 });
        await expect(search.getByRole("combobox")).toBeFocused();
      }
      await page.keyboard.press("Escape");
      await expect(search).toBeHidden();
      await expect(page.getByRole("banner").getByRole("button", { name: "Search", exact: true })).toBeFocused();
      expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("");
    });
  }
}

/** Site search (components/SearchModal.tsx): ⌘K on desktop, the header's search button on phones. */
test("search lists a map and Enter opens it", async ({ page, isMobile }) => {
  await page.goto("/topics");
  const searchButton = page.getByRole("banner").getByRole("button", { name: "Search" });
  await waitForHydration(searchButton);

  const dialog = page.getByRole("dialog", { name: "Search Argumend" });
  if (isMobile) {
    await searchButton.click();
    await expect(dialog).toBeVisible();
  } else {
    // ⌘K / Ctrl+K toggles, and its listener attaches in an effect just after
    // hydration: press again only while the dialog is still closed.
    await expect(async () => {
      if (!(await dialog.isVisible())) await page.keyboard.press("ControlOrMeta+k");
      await expect(dialog).toBeVisible({ timeout: 2_000 });
    }).toPass({ timeout: 15_000 });
  }

  const input = dialog.getByRole("combobox", { name: "Search Argumend" });
  await expect(input).toBeFocused();
  await input.fill("nuclear");

  const options = dialog.getByRole("option");
  await expect(options.first()).toBeVisible();
  await expect(options.first()).toContainText(/nuclear/i);

  await input.press("Enter");
  await expect(page).toHaveURL(/\/topics\/[a-z0-9-]+$/);
  await expect(dialog).toBeHidden();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/\S/);
});

/** The library and the questions index rank a typed question too (r3 review #5). */
test("a typed question finds the nuclear-power map in the library and on /questions", async ({ page }) => {
  await page.goto("/topics?q=is+nuclear+power+safe");
  await expect(page.getByRole("main").locator('a[href^="/topics/"]').first()).toHaveAttribute(
    "href",
    "/topics/nuclear-energy-safety",
  );

  await page.goto("/questions?q=is+nuclear+power+safe");
  const results = page.locator("#question-search-results");
  await expect(results.getByRole("link").first()).toHaveAttribute(
    "href",
    "/questions/is-nuclear-energy-safe",
  );
});

/** Alternate names for a policy remain findable across the discovery surfaces. */
test("everyday rent-policy wording finds the same map in all three search boxes", async ({ page }) => {
  const query = "should landlords limit rent increases";
  await page.goto(`/topics?q=${encodeURIComponent(query)}`);
  await expect(page.getByRole("main").locator('a[href^="/topics/"]').first()).toHaveAttribute(
    "href",
    "/topics/rent-control-effectiveness",
  );

  const searchButton = page.getByRole("banner").getByRole("button", { name: "Search" });
  await waitForHydration(searchButton);
  await searchButton.click();
  const dialog = page.getByRole("dialog", { name: "Search Argumend" });
  await dialog.getByRole("combobox", { name: "Search Argumend" }).fill("rent control");
  await expect(dialog.getByRole("option").first()).toContainText("Turns on: Can rent stabilization preserve both new construction and existing rental supply?");
  await expect(dialog.getByRole("option").filter({ hasText: "Do stricter gun laws" })).toHaveCount(0);
  await dialog.getByRole("combobox", { name: "Search Argumend" }).fill(query);
  await expect(dialog.getByRole("option").first()).toContainText("Does rent control make housing less affordable in the long run?");
  await dialog.getByRole("combobox", { name: "Search Argumend" }).press("Escape");

  await page.goto(`/questions?q=${encodeURIComponent(query)}`);
  await expect(page.locator("#question-search-results").getByRole("link").first()).toHaveAttribute(
    "href",
    "/questions/does-rent-control-hurt-housing-affordability",
  );
});

/** A subject no map covers names itself as missing (r6 review #4), in the library and the header search. */
test("abortion finds no map, and the empty state says so and offers paste", async ({ page, isMobile }) => {
  await page.goto("/topics?q=abortion");
  const main = page.getByRole("main");
  await expect(main.getByText("No map on “abortion” yet.")).toBeVisible();
  await expect(main.getByRole("status")).toHaveText("No maps match");
  await expect(main.getByRole("button", { name: /Clear (all )?filters/ })).toHaveCount(1);
  await expect(main.locator('a[href="/topics/nuclear-weapons-abolition"]')).toHaveCount(0);

  const searchButton = page.getByRole("banner").getByRole("button", { name: "Search" });
  await waitForHydration(searchButton);
  const dialog = page.getByRole("dialog", { name: "Search Argumend" });
  if (isMobile) {
    await searchButton.click();
  } else {
    await expect(async () => {
      if (!(await dialog.isVisible())) await page.keyboard.press("ControlOrMeta+k");
      await expect(dialog).toBeVisible({ timeout: 2_000 });
    }).toPass({ timeout: 15_000 });
  }
  await dialog.getByRole("combobox", { name: "Search Argumend" }).fill("abortion");
  await expect(dialog.getByText("No map on “abortion” yet.")).toBeVisible();
  await expect(dialog.getByRole("option")).toHaveCount(0);
  await dialog.getByRole("button", { name: "Paste the argument you’re in" }).click();
  await expect(page).toHaveURL(/\/analyze$/);
});
