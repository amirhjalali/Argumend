import { expect, test, waitForHydration } from "./fixtures";

test("search over an embed dialog closes one layer at a time and releases page scrolling", async ({ page }) => {
  await page.goto("/topics/nuclear-energy-safety");
  const embed = page.getByRole("button", { name: "Embed", exact: true });
  await waitForHydration(embed);
  await embed.click();
  const embedDialog = page.getByRole("dialog", { name: "Embed this topic" });
  const embedClose = embedDialog.getByRole("button", { name: "Close", exact: true });
  await expect(embedClose).toBeFocused();

  await page.keyboard.press("ControlOrMeta+k");
  const search = page.getByRole("dialog", { name: "Search Argumend" });
  const input = search.getByRole("combobox");
  await expect(input).toBeFocused();
  await expect(embedDialog).toHaveAttribute("aria-modal", "false");
  await input.press("Shift+Tab");
  await expect(search.getByRole("option").last()).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(search).toBeHidden();
  await expect(embedDialog).toBeVisible();
  await expect(embedDialog).toHaveAttribute("aria-modal", "true");
  await expect(embedClose).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("hidden");

  await page.keyboard.press("Escape");
  await expect(embedDialog).toBeHidden();
  await expect(embed).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("");
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});

for (const fallbackSucceeds of [true, false]) {
  test(`share copy keeps keyboard focus when clipboard is denied and fallback succeeds=${fallbackSucceeds}`, async ({ page }) => {
    await page.addInitScript((succeeds) => {
      Object.defineProperty(navigator, "share", { configurable: true, value: undefined });
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: { writeText: () => Promise.reject(new DOMException("Denied", "NotAllowedError")) },
      });
      // Keep the browser's real textarea selection and focus behavior without
      // changing the system clipboard during the test.
      document.execCommand = () => succeeds;
    }, fallbackSucceeds);
    await page.goto("/topics/nuclear-energy-safety");
    const share = page.getByRole("button", { name: "Share", exact: true });
    await waitForHydration(share);
    await share.click();
    const panel = page.getByRole("group", { name: "Share this map" });
    const copy = panel.getByRole("button", { name: /^(Copy link|Link copied)$/ });
    await copy.focus();
    const selected = await page.getByRole("heading", { level: 1 }).evaluate((heading) => {
      const range = document.createRange();
      range.selectNodeContents(heading);
      const selection = window.getSelection()!;
      selection.removeAllRanges();
      selection.addRange(range);
      return selection.toString();
    });

    await copy.press("Enter");

    if (fallbackSucceeds) {
      await expect(panel.getByRole("status")).toHaveText("Link copied!");
    } else {
      await expect(panel.getByRole("alert")).toContainText("could not be copied");
      await expect(panel.getByRole("textbox", { name: "Link to copy" }))
        .toHaveValue("https://argumend.org/topics/nuclear-energy-safety");
      await expect(panel.getByRole("status")).toBeEmpty();
    }
    await expect(copy).toBeFocused();
    expect(await page.evaluate(() => window.getSelection()?.toString())).toBe(selected);
    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
    await expect(share).toBeFocused();
  });
}
