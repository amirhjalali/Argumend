import { expect, test, waitForHydration } from "./fixtures";

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
