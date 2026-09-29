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
