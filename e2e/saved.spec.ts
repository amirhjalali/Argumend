import { expect, test, waitForHydration } from "./fixtures";

test("saved maps survive navigation and keyboard removal keeps a useful focus target", async ({ page }) => {
  for (const topic of ["nuclear-energy-safety", "ai-mass-unemployment"]) {
    await page.goto(`/topics/${topic}`);
    const save = page.getByRole("button", { name: "Save this map on this device" });
    await waitForHydration(save);
    await save.click();
    await expect(page.getByRole("button", { name: "Remove this map from saved" })).toHaveAttribute("aria-pressed", "true");
  }

  await page.goto("/saved");
  const main = page.getByRole("main");
  const removals = main.getByRole("button", { name: /^Remove .* from saved$/ });
  await expect(removals).toHaveCount(2);
  const secondName = await removals.nth(1).getAttribute("aria-label");
  await removals.first().focus();
  await removals.first().press("Enter");
  await expect(removals).toHaveCount(1);
  await expect(removals.first()).toHaveAttribute("aria-label", secondName!);
  await expect(main.getByRole("link", { name: /^Will AI cause mass unemployment/ })).toBeFocused();

  await removals.first().focus();
  await removals.first().press("Enter");
  const empty = main.getByRole("heading", { name: "Nothing saved yet" });
  await expect(main.getByRole("link", { name: "Browse maps" })).toBeFocused();
  await expect(removals).toHaveCount(0);
  await page.reload();
  await expect(empty).toBeVisible();
});

test("a rejected bookmark write keeps the map and keyboard focus until a successful retry", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("argumend.savedTopics", JSON.stringify(["nuclear-energy-safety"]));
    const original = Storage.prototype.setItem;
    let denyNextBookmarkWrite = true;
    Storage.prototype.setItem = function (key: string, value: string) {
      if (key === "argumend.savedTopics" && denyNextBookmarkWrite) {
        denyNextBookmarkWrite = false;
        throw new DOMException("Storage is full", "QuotaExceededError");
      }
      return original.call(this, key, value);
    };
  });
  await page.goto("/saved");
  const main = page.getByRole("main");
  const removal = main.getByRole("button", { name: /^Remove .* from saved$/ });
  await expect(removal).toHaveCount(1);
  await waitForHydration(removal);
  await removal.focus();
  await removal.press("Enter");
  await expect(main.getByRole("alert")).toContainText("Your existing bookmarks have not changed.");
  await expect(removal).toBeFocused();
  await expect(removal).toHaveCount(1);

  await removal.press("Enter");
  await expect(main.getByRole("link", { name: "Browse maps" })).toBeFocused();
  await expect(main.getByRole("alert")).toHaveCount(0);
});
