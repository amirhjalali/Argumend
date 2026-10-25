import type { Locator } from "@playwright/test";
import { expect, test, waitForHydration } from "./fixtures";

/**
 * Measure the browser's rendered colors, including translucent text and
 * backgrounds. These cases use solid surfaces; images and group opacity
 * need visual review rather than a misleading computed-color result.
 */
async function textContrast(locator: Locator, placeholder = false): Promise<number> {
  await expect(locator).toBeVisible();
  return locator.evaluate((element, isPlaceholder) => {
    type Color = [number, number, number, number];
    const parse = (value: string): Color => {
      const channels = value.match(/[\d.]+/g)?.map(Number);
      if (!value.startsWith("rgb") || !channels || channels.length < 3) {
        throw new Error(`Unsupported color: ${value}`);
      }
      return [channels[0], channels[1], channels[2], channels[3] ?? 1];
    };
    const composite = (front: Color, back: Color): Color => {
      const alpha = front[3] + back[3] * (1 - front[3]);
      return [0, 1, 2].map((i) =>
        (front[i] * front[3] + back[i] * back[3] * (1 - front[3])) / (alpha || 1),
      ).concat(alpha) as Color;
    };
    let background: Color = [0, 0, 0, 0];
    for (let current: Element | null = element; current; current = current.parentElement) {
      const style = getComputedStyle(current);
      if (Number(style.opacity) !== 1) throw new Error("Group opacity needs visual review");
      if (background[3] < 1) {
        if (style.backgroundImage !== "none") throw new Error("Background image needs visual review");
        background = composite(background, parse(style.backgroundColor));
      }
    }
    if (background[3] !== 1) throw new Error("No opaque background found");
    const style = getComputedStyle(element, isPlaceholder ? "::placeholder" : null);
    const foreground = parse(style.color);
    if (isPlaceholder) foreground[3] *= Number(style.opacity);
    const luminance = (color: Color) => color.slice(0, 3)
      .map((channel) => channel / 255)
      .map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
      .reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
    const ink = luminance(composite(foreground, background));
    const surface = luminance(background);
    return (Math.max(ink, surface) + 0.05) / (Math.min(ink, surface) + 0.05);
  }, placeholder);
}

for (const theme of ["light", "dark"] as const) {
  test(`form hints, pagination, and signup confirmation are readable in ${theme} mode`, async ({ page }) => {
    await page.addInitScript((value) => localStorage.setItem("theme", value), theme);
    await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(new RegExp(theme));
    expect.soft(await textContrast(page.getByRole("textbox", { name: "Text to analyze" }), true), "home paste hint").toBeGreaterThanOrEqual(4.5);

    const signup = page.getByRole("form", { name: "Footer newsletter signup" });
    const email = signup.getByRole("textbox", { name: "Email address" });
    expect.soft(await textContrast(email, true), "newsletter email hint").toBeGreaterThanOrEqual(4.5);
    // Keep the receipt check entirely in the browser, with no subscription.
    await page.route("**/api/newsletter", (route) => route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    }));
    await waitForHydration(email);
    await email.fill("contrast@example.com");
    await signup.getByRole("button", { name: "Subscribe", exact: true }).click();
    const receipt = page.getByRole("status").filter({ hasText: "You're subscribed." });
    expect.soft(await textContrast(receipt.locator("p")), "newsletter confirmation").toBeGreaterThanOrEqual(4.5);

    await page.goto("/topics");
    expect.soft(await textContrast(page.getByPlaceholder("Search the maps"), true), "map search hint").toBeGreaterThanOrEqual(4.5);
    const pagination = page.getByRole("navigation", { name: "Maps pagination" });
    expect.soft(await textContrast(pagination.getByRole("link", { name: "Page 2", exact: true })), "unselected page number").toBeGreaterThanOrEqual(4.5);

    await page.goto("/analyze");
    expect.soft(await textContrast(page.getByPlaceholder("Paste a conversation, article, or argument."), true), "paste flow hint").toBeGreaterThanOrEqual(4.5);
  });
}
