import { expect, horizontalOverflow, test, waitForHydration } from "./fixtures";

/**
 * "Which question would change your mind?" (r3 review #6): every option wraps
 * in full, and a tap leads somewhere — the crux's settle line, the strongest
 * card on each side, and a link that opens the crux — announced to a screen
 * reader through a status region that was in the page before the tap.
 */
for (const id of ["ai-mass-unemployment", "nuclear-energy-safety"]) {
  test(`the reflection on ${id} leads to the crux it picked`, async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: { writeText: async () => { throw new DOMException("Blocked", "NotAllowedError"); } },
      });
      Object.defineProperty(document, "execCommand", { configurable: true, value: () => false });
    });
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
    const starter = [
      "Could we start with this question?",
      await first.locator("span").last().innerText(),
      `Read the evidence: https://argumend.org/topics/${id}${href}`,
    ].join("\n\n");
    const copy = reflection.getByRole("button", { name: "Copy this question", exact: true });
    expect(await copy.evaluate((element) => element.getBoundingClientRect().top)).toBeLessThan(
      await reflection.locator("[data-other-side-cards]").evaluate((element) => element.getBoundingClientRect().top),
    );
    await reflection.getByText("Preview conversation starter", { exact: true }).click();
    await expect(reflection.locator("details > p")).toHaveText(starter);
    await copy.click();
    const manual = reflection.getByRole("textbox", { name: "Question to copy" });
    await expect(manual).toHaveValue(starter);
    await expect(copy).toBeFocused();
    await expect(reflection.getByRole("button", { name: "Copied", exact: true })).toHaveCount(0);
    await manual.focus();
    expect(await manual.evaluate((element: HTMLTextAreaElement) =>
      element.selectionStart === 0 && element.selectionEnd === element.value.length,
    )).toBe(true);
    expect(await horizontalOverflow(page)).toEqual([]);
    await open.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(page.locator(href!)).toBeInViewport();
    // Leave the map first: navigating to its current fragment can be a
    // same-document visit rather than the fresh load a recipient makes.
    await page.goto("/");
    await page.goto(`/topics/${id}${href}`);
    const linkedCrux = page.locator(href!).locator(":scope > details");
    await expect(linkedCrux).toHaveAttribute("open", "");
    await expect(linkedCrux.locator(":scope > summary")).toBeFocused();
  });
}
