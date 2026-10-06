import { expect, horizontalOverflow, test, waitForHydration } from "./fixtures";

/**
 * "Which question would change your mind?" (r3 review #6): every option wraps
 * in full, and a tap leads somewhere — the crux's settle line, the strongest
 * card on each side, and a link that opens the crux — announced to a screen
 * reader through a status region that was in the page before the tap.
 */
for (const id of ["ai-mass-unemployment", "nuclear-energy-safety"]) {
  test(`the reflection on ${id} leads to the crux it picked`, async ({ page }) => {
    await page.goto(`/topics/${id}`);
    const reflection = page.locator("#reflect");
    await reflection.scrollIntoViewIfNeeded();

    const options = reflection.getByRole("list").first().getByRole("button");
    const first = options.first();
    await waitForHydration(first);

    // No option is cut off: its text fits its own box.
    const clipped = await options.evaluateAll((buttons) =>
      buttons.filter((button) =>
        [...button.querySelectorAll("span")].some((span) => span.scrollWidth > span.clientWidth + 1),
      ).length,
    );
    expect(clipped).toBe(0);
    expect(await horizontalOverflow(page)).toEqual([]);

    const status = reflection.getByRole("status");
    await expect(status).toHaveText("");

    // Keyboard: focus the option and press Enter.
    await first.focus();
    await page.keyboard.press("Enter");
    await expect(first).toHaveAttribute("aria-pressed", "true");

    await expect(reflection.locator("[data-settle]")).toBeVisible();
    await expect(reflection.getByRole("heading", { name: "The other side’s best card" })).toBeVisible();
    await expect(reflection.locator("[data-other-side-cards] li")).toHaveCount(2);
    await expect(status).toContainText("shown below, with a link to open this crux");

    const open = reflection.getByRole("link", { name: "Open this crux" });
    const href = await open.getAttribute("href");
    expect(href).toMatch(/^#crux-/);
    await open.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(page.locator(href!)).toBeInViewport();
  });
}
