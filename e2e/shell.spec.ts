import { PRIMARY_NAV, expect, horizontalOverflow, test } from "./fixtures";

/**
 * The one shell (components/AppShell.tsx): every page is the sticky header,
 * one <main>, and the footer. Desktop shows the four destinations inline;
 * phones fold them into the menu button.
 */
const SHELL_PAGES = [
  { path: "/", name: "home" },
  { path: "/topics", name: "maps library" },
  { path: "/topics/nuclear-energy-safety", name: "a legacy map" },
  { path: "/learn", name: "learn hub" },
  { path: "/analyze", name: "paste flow" },
];

for (const { path, name } of SHELL_PAGES) {
  test(`${name} (${path}) sits in the shell`, async ({ page, isMobile }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);

    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);

    const banner = page.getByRole("banner");
    await expect(banner).toHaveCount(1);
    await expect(banner).toBeVisible();
    const mainNav = banner.getByRole("navigation", { name: "Main" });
    const menuButton = banner.getByRole("button", { name: "Open menu" });
    if (isMobile) {
      await expect(menuButton).toBeVisible();
      await expect(mainNav).toBeHidden();
    } else {
      await expect(mainNav.getByRole("link")).toHaveText(PRIMARY_NAV);
      await expect(menuButton).toBeHidden();
    }

    const footer = page.getByRole("contentinfo");
    await expect(footer).toHaveCount(1);
    await expect(footer).toBeAttached();

    // Let hydration finish so its errors, if any, reach the console guard.
    await page.waitForLoadState("networkidle");
    expect(await horizontalOverflow(page)).toEqual([]);
  });
}

test("the header is still at the top after a long scroll", async ({ page }) => {
  await page.goto("/learn");
  await page.evaluate(() => window.scrollTo({ top: 2000, behavior: "instant" }));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThanOrEqual(1900);

  const banner = page.getByRole("banner");
  await expect(banner).toBeInViewport();
  const box = await banner.boundingBox();
  expect(box?.y).toBeCloseTo(0, 0);
});
