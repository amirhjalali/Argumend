• ## 1. Verdict: SHIP

  It crossed the line — I'd send this to a friend who argues about AI and jobs, which I would not have done with round 1. The single biggest remaining blocker: the page's middle (the five questions) still reads like a database with better headlines — prose-dense bodies under punchy question titles — so momentum dies exactly where the page claims the payoff lives.

  ## 2. Scores

  - **First-screen hook: 8/10** — "If you're 22–25 in an office job: hiring in AI-exposed work is down 16%… while overall unemployment sits near 4%. Both numbers are real. The fight is over what they mean." Personal, paradoxical, two verifiable numbers. Docked for the title still being a generic yes/no question.
  - **Would-I-share: 7/10** — Yes to an econ/policy friend with "steal the −16% vs 4% chart." Not yet to a general group chat; there's no human to root for and nothing to *do* on the page.
  - **Insight-per-scroll: 6/10** — Top third is excellent (hook, trench-coat framing, stealable numbers); the five-question section halves the rate with paragraph-per-row bodies.
  - **Voice/edge: 7/10** — "Three fights in a trench coat," "Numbers worth stealing," "did the economy 'adjust'?" have real edge. The crux bodies snap back to neutral-academic register.
  - **Trust: 9/10** — Dashed line because it's an estimate, a literal data table under the chart, ⚑ disclosures that indict the page's own sources ("research lab whose flagship finding is the result under dispute"), and the honesty payoff block. This is now the product's moat.

  ## 3. Top 5 remaining problems

  **1. The crux bodies are still seminar prose.**
  Offending: *"The claim, precisely: Firms facing improved AI capability respond primarily by reducing hiring and headcount growth rather than by expanding output or redesigning jobs to use the freed-up capacity."*
  Why it fails: The question-form headlines fixed the titles but not the payload. Every one of the five sections demands a slow re-read, right after the fastest, best part of the page. The promise "Settle one of these and whole positions move" is made in the headline and broken in the body.
  Fix: Lead each crux with one plain sentence ("If AI makes a worker 2× productive, does the firm keep both workers and sell twice as much — or keep one?"), then put "The claim, precisely" behind the same expand pattern the camps already use. The pattern exists on the page; apply it.

  **2. Still no named humans.**
  Offending: *"Held by: Labor economists documenting entry-level hiring collapse (Stanford Digital Economy Lab, Census researchers), frontier-lab leaders forecasting rapid capability growth, and journalists covering AI-attributed layoffs."*
  Why it fails: Round 1's "no people, no stakes" was answered with categories of people, not people. Institutions don't get quoted in group chats; "Brynjolfsson's team found −16%" and "Amodei says 10–20% unemployment within five years" do. The corpus already contains these names — they're just not surfaced.
  Fix: One named advocate with a one-line quote per camp (e.g., Erik Brynjolfsson for camp one, David Autor for camp two, Daron Acemoglu for camp three, a WGA negotiator for camp four). Four names, four quotes, ~200 words total.

  **3. Stealable numbers with no way to steal them.**
  Offending: the "Numbers worth stealing" cards (−16%, 700 "agents", 2.7×, $34,900) render as plain cards; the only `og:image` is a text card (`/api/og?title=…`), and there is zero share UI anywhere in the page (one incidental "share" string in the whole HTML).
  Why it fails: The section's own concept — numbers worth stealing — promises an artifact and delivers a paragraph. When someone pastes this link, the preview is a text card, not the chart that's the actual argument.
  Fix: Make the OG image the two-panel chart with the headline overlaid. Add a copy-as-image / copy-as-text affordance on each stat card. This is an afternoon of work and it's the difference between "link" and "screenshot that travels."

  **4. The chart's right panel is a two-point line pretending to be a series.**
  Offending: *"22–25s in AI-exposed jobs (index)… 100 → 84… dashed because it is a cumulative estimate, not an observed monthly path."*
  Why it fails: The left panel is a real five-point line; the right is two dots and a dash. Side by side at similar size, the asymmetry reads as either chartjunk or cherry-picking to a skeptical sharer — exactly the person you want to win. The honesty note is correct but doesn't fix the visual thinness.
  Fix: Render the right panel as a dumbbell/slope (100 → 84 with the −16% annotation large) so the format itself admits it's an endpoint estimate. Same data, no false texture, bigger visual punch.

  **5. The page dead-ends.**
  Offending: *"What you can honestly say after five minutes"* → three bullets → *"Researcher mode — All 54 claims…"* → footer.
  Why it fails: The payoff block is genuinely good, but after it the only doors are a 54-claim wall or leaving. There's no action for the 95% who won't open researcher mode — nothing to react to, vote on, or carry away. Pages get shared when the reader does something with them.
  Fix: End with a one-tap poll: "Which of the five questions would settle it for you?" Show live results mapped to the four camps. That turns the ending into the share trigger ("72% of readers picked the same crux I did") and generates the engagement data the next round of critique will want.

  ## 4. Highest-leverage change

  Name the people. Round 1 said "no people"; round 2 relabeled institutions but a debate map with no debaters is still an atlas of nobody's hometown. Put one named, quoted human on each of the four camps — Brynjolfsson's −16%, Autor's "new tasks have always come," Acemoglu's so-so automation, a WGA or ILA negotiator's actual contract language — and reuse those same names inside the five questions ("this is the assumption Autor's whole position rests on"). The page's thesis is that this is a fight; fights get shared when you can see the fighters. This is cheap (the corpus already contains every name and position), touches only the top half of the page, and it compounds with everything else: the camps become characters, the cruxes become the things the characters disagree about, and the payoff block becomes "here's what each of them is right and wrong about." That is the version someone forwards.

  ## 5. Media check

  The chart is the right visual in concept: the entire page is the gap between calm U-3 and the sliding early-career index, and staging that paradox visually is the correct single chart. It's the wrong execution of it — a five-point series versus a two-point dashed segment invites the "you compared a trend to a guess" attack from exactly the skeptics the map is trying to reach. Convert the right panel to a dumbbell and it becomes unimpeachable.

  The single additional piece of media that would most increase shares: a **2×2 "map of the fight" diagram** — axes like "Will U-3 break 10% by 2041?" (yes/no) × "Is the real harm joblessness or worse jobs?" — with the four camps plotted as labeled dots and arrows showing which of the five questions would drag each camp toward another. It does three jobs at once: it's the whole page's argument in one screenshot, it's the natural OG/social image, and it gives readers a "which square am I in" hook that pure prose and a data chart can't. People share charts that inform; they share diagrams they can place themselves inside.

