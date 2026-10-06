import { expect, test, waitForHydration } from "./fixtures";

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
