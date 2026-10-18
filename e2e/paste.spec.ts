import { expect, test, waitForHydration } from "./fixtures";
import { PASTE_LIMITS } from "../lib/paste/limits";

test("an oversized paste keeps its ending and waits for the reader to shorten it", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).pathname === "/api/analyze") requests.push(request.method());
  });
  await page.goto("/analyze");
  const input = page.getByRole("textbox", { name: "The argument to read" });
  await waitForHydration(input);
  const draft = `${"a".repeat(PASTE_LIMITS.maxCharacters)} ORIGINAL ENDING`;
  await input.fill(draft);
  await expect(input).toHaveValue(draft);
  await expect(input).toHaveAttribute("aria-invalid", "true");
  const limitError = page.getByRole("alert").filter({ hasText: "Your full draft is still here" });
  await expect(limitError).toBeVisible();
  const submit = page.getByRole("button", { name: "Find what it turns on" });
  await expect(submit).toBeDisabled();
  await input.fill("a".repeat(PASTE_LIMITS.maxCharacters));
  await expect(submit).toBeEnabled();
  await expect(limitError).toHaveCount(0);
  expect(requests).toEqual([]);
});

test("common policy names find maps while a hairstyle dispute stays unmapped", async ({ page }) => {
  await page.goto("/analyze");
  const input = page.getByRole("textbox", { name: "The argument to read" });
  await waitForHydration(input);
  await input.fill("My ISP says it needs paid fast lanes for websites to fund better networks. I worry it will slow competing video streams and favor its own services.");
  const submit = page.getByRole("button", { name: "Find what it turns on" });
  await submit.click();
  const match = page.getByRole("region", { name: "This argument is already mapped" });
  await expect(match.locator('a[href="/topics/net-neutrality"]')).toBeVisible();
  await page.getByRole("button", { name: "Edit", exact: true }).click();
  await input.fill("States should reduce job licensing requirements for barbers and hair braiders. Training can protect customers, but expensive classes and fees may exclude people who already know the trade.");
  await submit.click();
  await expect(match.locator('a[href="/topics/occupational-licensing-reform"]')).toBeVisible();
  await page.getByRole("button", { name: "Edit", exact: true }).click();
  await input.fill("The city should charge people for driving downtown at peak times. The money would improve public transportation. Critics say commuters without a bus alternative would be unfairly punished.");
  await submit.click();
  await expect(match.locator('a[href="/topics/congestion-pricing"]')).toBeVisible();
  await expect(page.locator('a[href="/topics/drug-decriminalization"]')).toHaveCount(0);
  await expect(page.locator('a[href="/topics/police-reform"]')).toHaveCount(0);
  await page.getByRole("button", { name: "Edit", exact: true }).click();
  await input.fill("My sister wants me to braid her hair for a wedding. I prefer loose curls because braids pull too tightly.");
  await submit.click();
  await expect(page.getByRole("heading", { name: "No map, rather than the wrong map" })).toBeVisible();
  await expect(match).toHaveCount(0);
  await expect(page.getByLabel("You would think again if…")).toBeVisible();
});

test("uncovered family and school arguments stay unmapped while vaccine requirements keep their map", async ({ page }) => {
  await page.goto("/analyze");
  const input = page.getByRole("textbox", { name: "The argument to read" });
  await waitForHydration(input);
  const submit = page.getByRole("button", { name: "Find what it turns on" });
  const result = page.getByRole("region", { name: "Result" });
  for (const text of [
    "My sister wants to hire a surrogate to carry her baby. I think paying someone for pregnancy exploits women with less money, but she says consenting adults should be free to make that choice.",
    "Our teenager is exhausted when school starts at 7:20. I want classes to begin later so students can sleep, but the district says buses and after-school sports make that impossible.",
  ]) {
    await input.fill(text);
    await submit.click();
    await expect(result.getByRole("heading", { name: "No map, rather than the wrong map" })).toBeVisible();
    await expect(result.locator('a[href^="/topics/"]')).toHaveCount(0);
    await expect(page.getByLabel("You would think again if…")).toBeVisible();
    await page.getByRole("button", { name: "Edit", exact: true }).click();
  }
  await input.fill("Our school should require routine childhood vaccines to protect vulnerable children. Another parent says the government cannot force a medical procedure on their child.");
  await submit.click();
  const vaccineMap = result.locator('a[href="/topics/vaccine-mandates"]');
  await expect(vaccineMap).toBeVisible();
  await expect(result.locator('a[href^="/topics/"]')).toHaveCount(1);
  await expect(page.getByRole("region", { name: "This argument is already mapped" })).toHaveCount(0);
  await vaccineMap.click();
  await expect(page).toHaveURL(/\/topics\/vaccine-mandates$/);
  await expect(page.getByRole("heading", { level: 1, name: "Are government vaccine mandates a justified public-health measure?" })).toBeVisible();
});

test("AI-written essays lead to independent learning rather than the achievement gap", async ({ page }) => {
  await page.goto("/analyze");
  const input = page.getByRole("textbox", { name: "The argument to read" });
  await waitForHydration(input);
  await input.fill("My daughter uses ChatGPT to write her essays. I say she is skipping the thinking that school is meant to teach, but her teacher says the tool can help her learn if she explains each revision.");
  await page.getByRole("button", { name: "Find what it turns on" }).click();
  const match = page.getByRole("region", { name: "This argument is already mapped" });
  await expect(match).toContainText("Do students who learn with AI do better or worse when tested without it?");
  await expect(match).not.toContainText("Does AI tutoring help disadvantaged students most, or the already advantaged?");
  await expect(match.locator('a[href="https://doi.org/10.1038/s41598-025-97652-6"]')).toBeVisible();
  await expect(match.locator('a[href="https://arxiv.org/abs/2506.08872v2"]')).toBeVisible();
  const essayCard = match.getByRole("heading", { level: 4, name: /^MIT/ }).locator("..");
  await expect(essayCard).toContainText("preprint");
  await expect(match.locator('a[href="https://doi.org/10.1145/3626252.3630947"]')).toHaveCount(0);
  const open = match.getByRole("link", { name: "Open the map at this crux", exact: true });
  await expect(open).toHaveAttribute("href", "/topics/ai-in-education#crux-academic-integrity");
  await open.click();
  await expect(page).toHaveURL(/\/topics\/ai-in-education#crux-academic-integrity$/);
  const entry = page.locator("#crux-academic-integrity");
  await expect(entry.locator(":scope > details")).toHaveAttribute("open", "");
  await entry.getByText("Show the evidence on each side and the test", { exact: true }).click();
  await expect(entry.locator('a[href="https://doi.org/10.1073/pnas.2422633122"]')).toBeVisible();
});

test("AI equity and teacher-support arguments keep their own cruxes and audited sources", async ({ page }) => {
  await page.goto("/analyze");
  const input = page.getByRole("textbox", { name: "The argument to read" });
  await waitForHydration(input);
  const match = page.getByRole("region", { name: "This argument is already mapped" });
  for (const { text, crux, sources } of [
    {
      text: "AI tutors could finally give low-income students the personal help wealthy families pay for. Others worry these tools will reach rich schools first and widen achievement gaps.",
      crux: "learning-outcomes",
      sources: ["https://doi.org/10.3102/0034654315581420", "https://digitalpromise.org/wp-content/uploads/2024/09/SRM-Gates-Khanmigo-Report-Final.pdf"],
    },
    {
      text: "Schools are buying AI tools to reduce teacher workloads. I worry districts will use the savings to replace teachers rather than let them spend more time with students.",
      crux: "teacher-role-implementation",
      sources: ["https://www.nfer.ac.uk/publications/chatgpt-in-lesson-preparation-a-teacher-choices-trial/", "https://www.rand.org/pubs/research_reports/RRA956-31.html"],
    },
  ]) {
    await input.fill(text);
    await page.getByRole("button", { name: "Find what it turns on" }).click();
    await expect(match.getByRole("link", { name: "Open the map at this crux", exact: true }))
      .toHaveAttribute("href", `/topics/ai-in-education#crux-${crux}`);
    for (const source of sources) await expect(match.locator(`a[href="${source}"]`)).toBeVisible();
    await expect(page.getByRole("region", { name: "Result" }).locator('a[href="/topics/declining-birth-rates"]')).toHaveCount(0);
    await page.getByRole("button", { name: "Edit", exact: true }).click();
  }
});

test("health products and voting dates stay unmapped while AI diagnosis keeps its map", async ({ page }) => {
  await page.goto("/analyze");
  const input = page.getByRole("textbox", { name: "The argument to read" });
  await waitForHydration(input);
  const result = page.getByRole("region", { name: "Result" });
  for (const text of [
    "These hydrogen water bottles claim they reduce inflammation and give you more energy. My sister bought one for two hundred dollars. Is there actual evidence they do anything beyond plain tap water?",
    "Election day should be on a Sunday instead of a workday. People shouldn't have to choose between a shift and voting. A national holiday would help too, but service workers would still work.",
    "A: Everyone should take vitamin D all winter. B: Unless you're deficient, supplements don't prevent cancer or heart disease. A: My doctor said my levels were low. B: Then that's different from handing pills to everyone.",
  ]) {
    await input.fill(text);
    await page.getByRole("button", { name: "Find what it turns on", exact: true }).click();
    await expect(result.getByRole("heading", { name: "No map, rather than the wrong map" })).toBeVisible();
    await expect(result.locator('a[href^="/topics/"]')).toHaveCount(0);
    await page.getByRole("button", { name: "Edit", exact: true }).click();
  }
  await input.fill("Could an AI system diagnose routine illnesses more accurately than a doctor? I want a human to check its decisions, but my colleague says the model makes fewer mistakes.");
  await page.getByRole("button", { name: "Find what it turns on", exact: true }).click();
  await expect(result.locator('a[href="/topics/ai-replacing-doctors"]')).toBeVisible();
  await expect(result.locator('a[href="/topics/ai-in-education"]')).toHaveCount(0);
});

for (const { subject, text, crux, sourceUrls } of [
  {
    subject: "a shared-river argument",
    text: "Rivers cross borders, but upstream dams can leave downstream countries without enough water. As droughts worsen, will shortages lead to war or force countries to cooperate?",
    crux: "conflict-potential",
    sourceUrls: [
      "https://doi.org/10.1038/s41467-020-19089-x",
      "https://transboundarywaters.ceoas.oregonstate.edu/sites/transboundarywaters.ceoas.oregonstate.edu/files/Publications/Yoffe_Wolf_Giordano.pdf",
    ],
  },
  {
    subject: "an aquifer argument",
    text: "Farmers in western Kansas keep pumping the Ogallala aquifer faster than it recharges. They say efficient irrigation will buy time, but neighbors worry their wells will stop supporting crops before pumping limits can help.",
    crux: "supply-depletion",
    sourceUrls: ["https://pubs.usgs.gov/publication/sir20235143", "https://kgs.ku.edu/node/512"],
  },
  {
    subject: "a desalination argument",
    text: "Desalination plants and wastewater recycling could provide reliable water during droughts. Some say technology will make shortages manageable, but others say inland farmers cannot afford the energy and pipelines.",
    crux: "technology-adaptation",
    sourceUrls: [
      "https://doi.org/10.1016/j.scitotenv.2018.12.076",
      "https://www.oecd.org/en/publications/oecd-environmental-performance-reviews-israel-2023_0175ae95-en/full-report/component-6.html",
    ],
  },
]) {
  test(`${subject} opens its crux with scoped primary evidence`, async ({ page }) => {
    await page.goto("/analyze");
    const input = page.getByRole("textbox", { name: "The argument to read" });
    await waitForHydration(input);
    await input.fill(text);
    await page.getByRole("button", { name: "Find what it turns on", exact: true }).click();
    const result = page.getByRole("region", { name: "Result" });
    await expect(result.locator('a[href="/topics/global-water-crisis"]')).toBeVisible();
    await expect(result.locator('a[href="/topics/lab-diamonds-ethics"]')).toHaveCount(0);
    for (const url of sourceUrls) await expect(result.locator(`a[href="${url}"]`)).toBeVisible();
    await result.getByRole("link", { name: "Open the map at this crux", exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/topics/global-water-crisis#crux-${crux}$`));
    const entry = page.locator(`#crux-${crux}`);
    await expect(entry.locator(":scope > details")).toHaveAttribute("open", "");
    await entry.getByText("Show the evidence on each side and the test", { exact: true }).click();
    for (const url of sourceUrls) await expect(entry.locator(`a[href="${url}"]`)).toBeVisible();
  });
}

test("a family-policy argument keeps audited birth-rate evidence without unrelated links", async ({ page }) => {
  await page.goto("/analyze");
  const input = page.getByRole("textbox", { name: "The argument to read" });
  await waitForHydration(input);
  await input.fill("People are having fewer children because housing and childcare cost so much. Should the government pay families to have babies, or should we accept a smaller population?");
  await page.getByRole("button", { name: "Find what it turns on", exact: true }).click();
  const result = page.getByRole("region", { name: "Result" });
  await expect(result.locator('a[href="/topics/declining-birth-rates"]')).toBeVisible();
  await expect(result.locator('a[href="/topics/universal-basic-income"]')).toHaveCount(0);
  await expect(result.locator('a[href="/topics/space-exploration-value"]')).toHaveCount(0);
  await expect(result.getByRole("link", { name: "Open the map at this crux", exact: true }))
    .toHaveAttribute("href", "/topics/declining-birth-rates#crux-choice-theory");
  await expect(result.locator('a[href="https://www.unfpa.org/sites/default/files/pub-pdf/EN_State%20of%20World%20Population%20report%202025.pdf"]')).toBeVisible();
  await expect(result.locator('a[href="https://doi.org/10.1257/aer.20121607"]')).toBeVisible();
});

test("an unmapped personal argument becomes conversation notes without another request", async ({ page }) => {
  const apiCalls: string[] = [];
  page.on("request", (request) => {
    const path = new URL(request.url()).pathname;
    if (path.startsWith("/api/")) apiCalls.push(`${request.method()} ${path}`);
  });
  await page.goto("/analyze");
  const input = page.getByRole("textbox", { name: "The argument to read" });
  await waitForHydration(input);
  await input.fill("My partner wants us to spend our savings on a holiday. I want to keep the money for emergencies. They say we never do anything fun, and I say we cannot afford to take the risk.");
  await page.getByRole("button", { name: "Find what it turns on" }).click();
  await expect(page.getByRole("heading", { name: "No map, rather than the wrong map" })).toBeVisible();
  const firstNote = page.getByLabel("You would think again if…");
  const screensBeforeWriting = await firstNote.evaluate((input) => {
    const result = document.querySelector('section[aria-label="Result"]')!;
    return (input.getBoundingClientRect().top - result.getBoundingClientRect().top) / innerHeight;
  });
  expect(screensBeforeWriting).toBeLessThan(1.1);
  const help = page.getByText("Help me tell them apart", { exact: true });
  await help.click();
  await expect(page.getByText("Is the new route actually faster at rush hour?", { exact: false })).toBeVisible();
  await help.click();
  await page.getByLabel("You would think again if…").fill("we kept an emergency fund");
  await page.getByLabel("They would think again if…").fill("we planned time together");
  await page.getByLabel("We both agree that…").fill("we want to enjoy life without worrying about money");
  const notes = page.getByRole("region", { name: "Your conversation notes" });
  await expect(notes).toContainText("You might think again if: we planned time together");
  await expect(notes.getByRole("button", { name: "Copy your notes" })).toBeVisible();
  await notes.getByRole("button", { name: "A little" }).click();
  await expect(notes.getByRole("button", { name: "A little" })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("region", { name: "Result" }).getByRole("link", { name: "Browse all maps", exact: true }).click();
  await expect(page).toHaveURL(/\/topics$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/analyze$/);
  await expect(page.getByLabel("You would think again if…")).toHaveValue("we kept an emergency fund");
  await expect(page.getByLabel("They would think again if…")).toHaveValue("we planned time together");
  await expect(page.getByLabel("We both agree that…")).toHaveValue("we want to enjoy life without worrying about money");
  await page.getByLabel("We both agree that…").fill(`we should check https://example.org/${"evidence".repeat(80)}`);
  await expect(notes).toContainText("https://example.org/");
  expect(await notes.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  expect(apiCalls).toEqual(["POST /api/analyze"]);
});

test("a focused FOSTA paste surfaces the GAO evidence and opens its question", async ({ page }) => {
  await page.goto("/analyze");
  const input = page.getByRole("textbox", { name: "The argument to read" });
  await waitForHydration(input);
  await input.fill("FOSTA changed Section 230. Did it actually deter trafficking, or did liability cause platforms to remove lawful speech and useful safety tools?");
  await page.getByRole("button", { name: "Find what it turns on", exact: true }).click();
  const result = page.getByRole("region", { name: "Result" });
  await expect(result.getByRole("heading", { name: "Evidence to explore", exact: true })).toBeVisible();
  const gao = result.getByRole("heading", { level: 4, name: /^GAO's 2021 Review:/ }).locator("..");
  await expect(gao.locator('a[href="https://www.gao.gov/products/gao-21-385"]')).toBeVisible();
  await expect(gao.getByText("From another question on this map", { exact: true })).toHaveCount(0);
  expect(await gao.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return rect.left >= 0 && rect.right <= innerWidth;
  })).toBe(true);
  await result.getByRole("link", { name: "Open the map at this crux", exact: true }).click();
  await expect(page).toHaveURL(/\/topics\/section-230-reform#crux-collateral-damage$/);
  const entry = page.locator("#crux-collateral-damage");
  await expect(entry.locator(":scope > details")).toHaveAttribute("open", "");
  await entry.getByText("Show the evidence on each side and the test", { exact: true }).click();
  await expect(entry.locator('a[href="https://www.gao.gov/products/gao-21-385"]')).toBeVisible();
});

test("a borrowed evidence card names its own question and keeps that link in the takeaway", async ({ page }) => {
  const apiCalls: string[] = [];
  page.on("request", (request) => {
    const path = new URL(request.url()).pathname;
    if (path.startsWith("/api/")) apiCalls.push(`${request.method()} ${path}`);
  });
  await page.goto("/analyze");
  const input = page.getByRole("textbox", { name: "The argument to read" });
  await waitForHydration(input);
  await input.fill("Platforms want it both ways. They curate and algorithmically promote content like a publisher but claim they're just a neutral bulletin board when someone sues. Strip their immunity and watch how fast they moderate.");
  await page.getByRole("button", { name: "Find what it turns on", exact: true }).click();
  const result = page.getByRole("region", { name: "Result" });
  const question = "Can a reform deter targeted harms without a net loss of lawful speech?";
  const borrowedCard = result.getByText("From another question on this map", { exact: true }).locator("..").locator("..");
  const borrowedTitle = await borrowedCard.getByRole("heading", { level: 4 }).innerText();
  await expect(borrowedCard.getByText("From another question on this map", { exact: true })).toBeVisible();
  const origin = borrowedCard.getByRole("link", { name: question, exact: true });
  const href = "/topics/section-230-reform#crux-collateral-damage";
  await expect(origin).toHaveAttribute("href", href);
  const ownCard = result.getByRole("heading", { level: 4 }).locator("..").filter({ hasNotText: "From another question on this map" });
  await expect(ownCard).toHaveCount(1);
  await expect(ownCard.getByText("From another question on this map", { exact: true })).toHaveCount(0);
  expect(await borrowedCard.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return rect.left >= 0 && rect.right <= innerWidth;
  })).toBe(true);
  await result.getByText("Preview summary", { exact: true }).click();
  const preview = result.getByRole("region", { name: "Summary preview" });
  await expect(preview).toContainText(`Related evidence: ${question} https://argumend.org${href}`);
  await origin.click();
  await expect(page).toHaveURL(new RegExp(`${href}$`));
  const entry = page.locator("#crux-collateral-damage");
  await expect(entry.locator(":scope > details")).toHaveAttribute("open", "");
  await expect(entry.locator(":scope > details > summary")).toBeFocused();
  await entry.getByText("Show the evidence on each side and the test", { exact: true }).click();
  await expect(entry).toContainText(borrowedTitle);
  await page.getByRole("link", { name: "Paste an argument", exact: true }).first().click();
  await expect(origin).toHaveAttribute("href", href);
  expect(apiCalls).toEqual(["POST /api/analyze"]);
});

test("either plausible crux can be previewed, copied and opened without reading the paste again", async ({ page }, testInfo) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async (text: string) => { document.documentElement.dataset.copiedQuestion = text; } },
    });
  });
  const apiCalls: string[] = [];
  page.on("request", (request) => {
    const path = new URL(request.url()).pathname;
    if (path.startsWith("/api/")) apiCalls.push(`${request.method()} ${path}`);
  });
  await page.goto("/analyze");
  const input = page.getByRole("textbox", { name: "The argument to read" });
  await waitForHydration(input);
  await input.fill("Drip irrigation uses less water on each field, but does that conserve a river basin if farms expand and less water returns downstream? Can water technology solve scarcity without limits on pumping?");
  await page.getByRole("button", { name: "Find what it turns on", exact: true }).click();
  const result = page.getByRole("region", { name: "Result" });
  await expect(result.getByRole("heading", { name: "It may turn on one of these" })).toBeVisible();
  await expect(result.getByRole("heading", { name: "Evidence from the map" })).toBeVisible();
  const details = result.getByText("More on the first question", { exact: true }).locator("..");
  await expect(details).not.toHaveAttribute("open");
  const choices = [
    { ordinal: "first", label: "First", anchor: "supply-depletion" },
    { ordinal: "second", label: "Second", anchor: "technology-adaptation" },
  ];
  if (testInfo.project.name === "phone") {
    const second = result.getByRole("link", { name: "Open the map at the second crux", exact: true });
    const screens = await second.evaluate((link) => {
      const result = document.querySelector('section[aria-label="Result"]')!;
      return (link.getBoundingClientRect().top - result.getBoundingClientRect().top) / innerHeight;
    });
    expect(screens).toBeLessThan(2);
  }
  for (const { ordinal, label, anchor } of choices) {
    const choice = result.getByRole("region", { name: `${label} possible crux`, exact: true });
    const question = await choice.getByRole("heading", { level: 4 }).innerText();
    const href = `/topics/global-water-crisis#crux-${anchor}`;
    const preview = choice.getByText(`Preview the ${ordinal} takeaway`, { exact: true });
    await preview.click();
    const starter = await preview.locator("..").locator("p").innerText();
    expect(starter).toBe(`Could we start with this question?\n\n${question}\n\nRead the evidence: https://argumend.org${href}`);
    await preview.click();
    const copy = choice.getByRole("button", { name: `Copy the ${ordinal} question`, exact: true });
    await copy.click();
    await expect(page.locator("html")).toHaveAttribute("data-copied-question", starter);
    await expect(choice.getByRole("button", { name: "Copied", exact: true })).toBeVisible();
    await choice.getByRole("link", { name: `Open the map at the ${ordinal} crux`, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    const fold = page.locator(`#crux-${anchor} > details`);
    await expect(fold).toHaveAttribute("open", "");
    await expect(fold.locator(":scope > summary")).toBeFocused();
    await page.getByRole("link", { name: "Paste an argument", exact: true }).first().click();
    await expect(result.getByRole("region", { name: "First possible crux", exact: true })).toBeVisible();
    await expect(result.getByRole("region", { name: "Second possible crux", exact: true })).toBeVisible();
  }
  expect(apiCalls).toEqual(["POST /api/analyze"]);
});

test("question copy recovers from a blocked clipboard and preserves the argument on return", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async () => { throw new DOMException("Blocked", "NotAllowedError"); } },
    });
    Object.defineProperty(document, "execCommand", { configurable: true, value: () => false });
  });
  const apiCalls: string[] = [];
  page.on("request", (request) => {
    const path = new URL(request.url()).pathname;
    if (path.startsWith("/api/")) apiCalls.push(`${request.method()} ${path}`);
  });
  await page.goto("/analyze");
  const example = page.getByRole("button", { name: "See an example" });
  await waitForHydration(example);
  await example.click();
  await page.getByRole("button", { name: "Find what it turns on", exact: true }).click();
  const result = page.getByRole("region", { name: "Result" });
  const openMap = result.getByRole("link", { name: "Open the map at this crux", exact: true });
  const href = await openMap.getAttribute("href");
  const preview = result.getByText("Preview conversation starter", { exact: true });
  await preview.click();
  const starter = await preview.locator("..").locator("p").innerText();
  expect(starter).toMatch(/^Could we start with this question\?/);
  expect(starter).toContain(`Read the evidence: https://argumend.org${href}`);
  await preview.click();
  const copy = result.getByRole("button", { name: "Copy this question", exact: true });
  await copy.click();
  const manual = result.getByRole("textbox", { name: "Question to copy" });
  await expect(manual).toHaveValue(starter);
  await expect(result.getByRole("button", { name: "Copied", exact: true })).toHaveCount(0);
  await expect(copy).toBeFocused();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(manual).toBeFocused();
  expect(await manual.evaluate((element: HTMLTextAreaElement) =>
    element.selectionStart === 0 && element.selectionEnd === element.value.length,
  )).toBe(true);
  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async (text: string) => { document.documentElement.dataset.copiedQuestion = text; } },
    });
  });
  const resting = await copy.evaluate((button) => ({
    top: button.getBoundingClientRect().top - button.parentElement!.getBoundingClientRect().top,
    width: button.getBoundingClientRect().width,
  }));
  await copy.click();
  const copied = result.getByRole("button", { name: "Copied", exact: true });
  await expect(copied).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-copied-question", starter);
  await expect(manual).toHaveCount(0);
  const feedback = await copied.evaluate((button) => ({
    top: button.getBoundingClientRect().top - button.parentElement!.getBoundingClientRect().top,
    width: button.getBoundingClientRect().width,
  }));
  expect(Math.abs(feedback.top - resting.top)).toBeLessThan(1);
  expect(Math.abs(feedback.width - resting.width)).toBeLessThan(1);
  await openMap.click();
  await expect(page).toHaveURL(new RegExp(`${href}$`));
  await page.getByRole("link", { name: "Paste an argument", exact: true }).first().click();
  await expect(result).toBeVisible();
  await expect(openMap).toHaveAttribute("href", href!);
  await expect(result.getByRole("button", { name: "Copy this question", exact: true })).toBeVisible();
  expect(apiCalls).toEqual(["POST /api/analyze"]);
});

test("reanalyzing unchanged text keeps conversation notes", async ({ page }) => {
  await page.goto("/analyze");
  const input = page.getByRole("textbox", { name: "The argument to read" });
  await waitForHydration(input);
  await input.fill("My partner wants to spend our savings on a holiday. I want to keep the money for emergencies. They say we never do anything fun. I say we cannot afford the risk.");
  await page.getByRole("button", { name: "Find what it turns on" }).click();
  const note = page.getByLabel("You would think again if…");
  await note.fill("we kept an emergency fund");
  await page.getByRole("button", { name: "Edit", exact: true }).click();
  await page.getByRole("button", { name: "Find what it turns on" }).click();
  await expect(page.getByRole("heading", { name: "No map, rather than the wrong map" })).toBeVisible();
  await expect(note).toHaveValue("we kept an emergency fund");
  await expect(page.getByRole("button", { name: "Copy your notes" })).toBeVisible();
});

/**
 * The paste flow at /analyze, offline: the built-in example goes to the
 * server's own map lane (/api/analyze) and comes back as a map and its crux.
 * The reader continues at that crux by keyboard. Nothing may reach a third party; the
 * fixture blocks and records any attempt, and this test asserts on it.
 */
test("the example opens its crux and continues there by keyboard, without leaving the server", async ({
  page,
  externalRequests,
}, testInfo) => {
  const apiCalls: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.pathname.startsWith("/api/")) apiCalls.push(`${request.method()} ${url.pathname}`);
  });

  await page.goto("/analyze");
  const example = page.getByRole("button", { name: "See an example" });
  await waitForHydration(example);
  await example.click();

  const input = page.getByRole("textbox", { name: "The argument to read" });
  await expect(input).not.toHaveValue("");
  const original = await input.inputValue();

  await page.getByRole("button", { name: "Find what it turns on" }).click();

  const result = page.getByRole("region", { name: "Result" });
  await expect(result).toBeVisible({ timeout: 15_000 });

  const previewToggle = result.getByText("Preview summary", { exact: true });
  await previewToggle.click();
  const preview = result.getByRole("region", { name: "Summary preview" });
  await expect(preview).toBeVisible();
  await expect(preview).toContainText("Questions to explore together");
  await expect(preview).toContainText("What would make each of us think again?");
  await previewToggle.click();
  await expect(preview).not.toBeVisible();

  const cruxLink = result.getByRole("link", { name: /^Open the map/ });
  await expect(cruxLink).toBeVisible();
  const href = await cruxLink.getAttribute("href");
  expect(href).toMatch(/^\/topics\/[a-z0-9-]+#crux-/);
  await cruxLink.click();
  await expect(page).toHaveURL(new RegExp(`${href}$`));

  const fragment = new URL(page.url()).hash;
  const entry = page.locator(fragment);
  const fold = entry.locator(":scope > details");
  const summary = fold.locator(":scope > summary");
  await expect(fold).toHaveAttribute("open", "");
  await expect(summary).toBeFocused();
  await expect(summary).toBeInViewport();

  // Tab continues into this crux's evidence, rather than the site header or
  // a link left behind on the paste result.
  await page.keyboard.press("Tab");
  expect(await entry.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  await expect(summary).not.toBeFocused();

  // Close the destination, then follow a link to the same fragment again.
  // The desktop rail is a native anchor: no hashchange fires on this visit.
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(fold).not.toHaveAttribute("open");
  let returnLink;
  if (testInfo.project.name === "desktop") {
    returnLink = page.getByRole("complementary", { name: "On this page" }).locator(`a[href="${fragment}"]`);
  } else {
    const question = await entry.locator("h3 > span").first().innerText();
    const reflection = page.locator("#reflect");
    const choice = reflection.getByRole("button", { name: question, exact: true });
    await waitForHydration(choice);
    await choice.click();
    returnLink = reflection.getByRole("link", { name: "Open this crux" });
  }
  await returnLink.focus();
  await page.keyboard.press("Enter");
  await expect(fold).toHaveAttribute("open", "");
  await expect(summary).toBeFocused();
  await expect(summary).toBeInViewport();

  await page.goBack();
  await expect(page).toHaveURL(/\/analyze$/);
  await expect(result).toBeVisible();
  await page.getByRole("button", { name: "Edit", exact: true }).click();
  await expect(input).toHaveValue(original);
  await expect(input).toBeFocused();
  await page.keyboard.press("ControlOrMeta+a");
  await page.keyboard.type(`${original}\nOne more question to discuss.`);
  await expect(input).toHaveValue(`${original}\nOne more question to discuss.`);
  await page.reload();
  await expect(input).toHaveValue("");
  await expect(result).toHaveCount(0);
  expect(apiCalls.filter((call) => call === "POST /api/analyze")).toHaveLength(1);
  expect(externalRequests).toEqual([]);
});

/**
 * On a phone the result's one rust action sits under the crux box, with the
 * long texts above it clamped behind "Show more" (r3 review #11: it used to be
 * ~4.5 screens down). Measured from the top of the result region.
 */
test("on a phone, the crux's action is within about a screen and a half of the result", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "phone", "phone layout only");
  await page.goto("/analyze");
  const example = page.getByRole("button", { name: "See an example" });
  await waitForHydration(example);
  await example.click();
  await page.getByRole("button", { name: "Find what it turns on" }).click();

  const result = page.getByRole("region", { name: "Result" });
  await expect(result).toBeVisible({ timeout: 15_000 });
  const cta = result.getByRole("link", { name: /^Open the map at (this|the first) crux$/ });
  await expect(cta).toBeVisible();

  const firstMore = result.getByRole("button", { name: /^Show more/ }).first();
  await expect(firstMore).toHaveAttribute("aria-expanded", "false");
  // Held by what it controls: its name changes to "Show less" once open.
  const controls = await firstMore.getAttribute("aria-controls");
  const more = result.locator(`button[aria-controls="${controls}"]`);

  const { screens } = await page.evaluate(() => {
    const region = document.querySelector('section[aria-label="Result"]')!;
    const link = [...region.querySelectorAll("a")].find((a) => /^Open the map at (this|the first) crux$/.test(a.textContent?.trim() ?? ""))!;
    return {
      screens: (link.getBoundingClientRect().top - region.getBoundingClientRect().top) / window.innerHeight,
    };
  });
  expect(screens).toBeLessThan(1.5);

  await more.click();
  await expect(more).toHaveAttribute("aria-expanded", "true");
  await expect(more).toHaveText(/^Show less/);
});
