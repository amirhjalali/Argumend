import { expect, test, waitForHydration } from "./fixtures";

test("map pagination follows Next and Previous without retaining the old page", async ({ page }) => {
  await page.goto("/topics");
  const main = page.getByRole("main");
  const pagination = main.getByRole("navigation", { name: "Maps pagination" });
  const status = main.getByRole("status");
  await waitForHydration(main.getByRole("searchbox", { name: "Search maps" }));

  const firstPageLinks = await main.locator('ul a[href^="/topics/"]').evaluateAll(
    (links) => links.map((link) => link.getAttribute("href")),
  );
  await pagination.getByRole("link", { name: "Next" }).click();
  await expect(page).toHaveURL(/\/topics\?page=2$/);
  await expect(pagination.getByRole("link", { name: "Page 2", exact: true })).toHaveAttribute("aria-current", "page");
  await expect(status).toContainText("Showing 25–48");
  const secondPageLinks = await main.locator('ul a[href^="/topics/"]').evaluateAll(
    (links) => links.map((link) => link.getAttribute("href")),
  );
  // The three pinned Start here maps stay; every paginated row changes.
  expect(secondPageLinks.filter((href) => !firstPageLinks.includes(href))).toHaveLength(24);

  await pagination.getByRole("link", { name: "Previous" }).click();
  await expect(page).toHaveURL(/\/topics$/);
  await expect(status).toContainText("Showing 1–24");
  await expect(pagination.getByRole("link", { name: "Page 1", exact: true })).toHaveAttribute("aria-current", "page");
  expect(await main.locator('ul a[href^="/topics/"]').evaluateAll(
    (links) => links.map((link) => link.getAttribute("href")),
  )).toEqual(firstPageLinks);
});

test("map pagination keeps the chosen category and order", async ({ page }) => {
  await page.goto("/topics");
  const main = page.getByRole("main");
  const search = main.getByRole("searchbox", { name: "Search maps" });
  await waitForHydration(search);
  await main.getByRole("navigation", { name: "Map categories" }).getByRole("link", { name: /^Policy/ }).click();
  await main.getByRole("combobox", { name: "Order:" }).selectOption("title-asc");
  await expect(page).toHaveURL(/\/topics\?category=policy&sort=title-asc$/);
  const firstRow = await main.locator('ul a[href^="/topics/"]').first().getAttribute("href");

  await main.getByRole("navigation", { name: "Maps pagination" }).getByRole("link", { name: "Next" }).click();
  await expect(page).toHaveURL(/\/topics\?category=policy&sort=title-asc&page=2$/);
  await expect(main.getByRole("status")).toContainText("Showing 25–");
  await expect(main.getByRole("combobox", { name: "Order:" })).toHaveValue("title-asc");
  await expect(main.getByRole("navigation", { name: "Map categories" }).getByRole("link", { name: /^Policy/ })).toHaveAttribute("aria-current", "page");
  await expect(main.locator('ul a[href^="/topics/"]').first()).not.toHaveAttribute("href", firstRow!);
});
