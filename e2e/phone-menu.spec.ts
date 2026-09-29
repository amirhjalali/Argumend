import { PRIMARY_NAV, expect, test, waitForHydration } from "./fixtures";

/** The phone menu sheet TopBar owns (runs in the phone project only). */
test("the phone menu lists the four destinations, locks the page and gives focus back", async ({ page }) => {
  await page.goto("/learn");
  const menuButton = page.getByRole("banner").getByRole("button", { name: "Open menu" });
  await waitForHydration(menuButton);

  await menuButton.click();
  const sheet = page.getByRole("dialog", { name: "Menu" });
  await expect(sheet).toBeVisible();
  const primary = sheet.getByRole("navigation", { name: "Menu" }).getByRole("list").first();
  await expect(primary.getByRole("link")).toHaveText(PRIMARY_NAV);

  // The page behind the sheet does not scroll (wheel over the backdrop).
  await page.mouse.move(20, 500);
  await page.mouse.wheel(0, 800);
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => window.scrollY)).toBe(0);

  await page.keyboard.press("Escape");
  await expect(sheet).toBeHidden();
  await expect(menuButton).toBeFocused();
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");

  // Control: the same wheel scrolls the page once the sheet is closed, so
  // the check above is not passing because wheel input does nothing here.
  await page.mouse.wheel(0, 800);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
});
