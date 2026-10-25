import { test, expect, waitForHydration } from "./fixtures";

test("the library keeps a typed search when returning from a map with browser Back", async ({ page }) => {
  await page.goto("/topics");
  const search = page.getByRole("searchbox", { name: "Search maps" });
  await waitForHydration(search);
  await search.fill("nuclear");
  await expect(page).toHaveURL(/\/topics\?q=nuclear$/);
  const results = page.locator('main ul a[href^="/topics/"]');
  const before = await results.evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  expect(before.length).toBeGreaterThan(0);
  await results.first().click();
  await expect(page).toHaveURL(/\/topics\/[^/?]+$/);

  await page.goBack();

  await expect(page).toHaveURL(/\/topics\?q=nuclear$/);
  await expect(search).toHaveValue("nuclear");
  await expect.poll(() => results.evaluateAll((links) => links.map((link) => link.getAttribute("href"))))
    .toEqual(before);
});

test("browser Back restores the chosen order after library pagination", async ({ page }) => {
  await page.goto("/topics");
  const order = page.getByRole("combobox", { name: "Order:" });
  await waitForHydration(order);
  await order.selectOption("title-asc");
  await expect(page).toHaveURL(/\/topics\?sort=title-asc$/);
  const results = page.locator('main ul a[href^="/topics/"]');
  const before = await results.evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  await page.getByRole("link", { name: "Next", exact: true }).click();
  await expect(page).toHaveURL(/\/topics\?sort=title-asc&page=2$/);
  await expect(page.getByRole("link", { name: "Page 2", exact: true })).toHaveAttribute("aria-current", "page");

  await page.goBack();

  await expect(page).toHaveURL(/\/topics\?sort=title-asc$/);
  await expect(order).toHaveValue("title-asc");
  await expect(page.getByRole("link", { name: "Page 1", exact: true })).toHaveAttribute("aria-current", "page");
  await expect.poll(() => results.evaluateAll((links) => links.map((link) => link.getAttribute("href"))))
    .toEqual(before);
});
