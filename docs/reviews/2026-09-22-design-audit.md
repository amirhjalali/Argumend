# Design audit, 2026-09-22

Scope: the pages people land on. Home `/`, the flagship map `/topics/ai-mass-unemployment`, a
legacy map `/topics/nuclear-energy-safety`, Explore (`/explore` redirects to `/topics`),
`/analyze-v2` (fake lane), `/reply`, `/blog` and one post, `/guides`, `/about`. Each page was
captured in light and dark at 1440 px desktop and 390 px mobile with Playwright (reduced motion,
full page). Screenshots live in `docs/reviews/2026-09-22-design-audit/before/` and are named
`<page>-<viewport>-<scheme>.jpg`. Long pages are cropped at 9000 px.

The yardstick is the design system in `CLAUDE.md` and the north star
(`docs/plans/2026-09-22-north-star.md`): calm, fair, "what would change your mind", never a
winner. A problem ranks higher when it hits a page people actually land on, when it breaks
legibility, or when it makes the product read as a scoreboard.

The Next.js dev-tools "N" badge in the lower-left corner of every screenshot is dev-only. It is
not a finding.

## Ranked findings

### 1. Dark mode: the brand text colours don't change, so text renders dark on dark (critical, system)

`tailwind.config.ts` defines `primary`, `secondary` and `muted` as fixed hex values. Any
`text-primary` without a `dark:` partner renders `#3d3a36` on the `#1a1917` canvas. A test
ratchet (`lib/darkModeTextTokenRatchet.test.ts`) has been pairing the classes one file at a time
since June, but the unpaired cases include the markdown renderer (`lib/markdown.ts`), so **the
body text of every blog post is almost unreadable in dark mode**. The newsletter heading
"Stay curious" is invisible too.

- `before/blog-post-desktop-dark.jpg`, `before/blog-post-mobile-dark.jpg`
- `before/home-mobile-dark.jpg` (footer, "Stay curious")

**Fix:** move `primary`, `secondary` and `muted` onto RGB channel variables
(`--text-primary-rgb` and friends in `:root` and `.dark`), the same way the surface tokens already
work. Every bare use then adapts at once, and the existing `dark:text-stone-*` pairs keep working
as overrides. `.btn-primary`, the one place that uses `bg-primary`, gets pinned to a fixed ink.

### 2. Dark mode: `bg-[var(--x)]/NN` utilities produce no CSS, so the top bar stays light (critical, system)

Tailwind 3 can't apply an opacity modifier to an arbitrary `var()` colour, so it drops the class
without a warning. There are about 90 such uses across 44 files (`dark:bg-[var(--bg-canvas)]/90`,
`bg-[var(--bg-card)]/80`, `border-[var(--border-divider)]/60`, …). The most visible result: **the
sticky top bar keeps its light parchment background in dark mode, so the white ARGUMEND wordmark
on it can't be seen.** That happens on every page that uses the shell. The home page's "Have your
own argument?" band is a flat grey slab for the same reason.

- `before/home-desktop-dark.jpg`, `before/topic-nuclear-safety-desktop-dark.jpg`,
  `before/reply-mobile-dark.jpg` (top bar)
- `before/home-desktop-dark.jpg`, lower half (grey band)

**Fix:** add channel tokens for the three variables these classes use (`card`, `subtle` for
`--bg-muted`, and `divider`), rewrite the classes to `bg-card/80`, `bg-subtle/50`,
`border-divider/60` and so on, and add a test that fails if an arbitrary `var()` colour with an
opacity modifier comes back.

### 3. Explore (`/topics`): the featured debate maps render above the site header (high)

`app/topics/page.tsx` renders `<FeaturedDebateMaps />` before `<TopicsPageClient />`, and the
client component is the one that opens `AppShell`. The three featured cards therefore sit above
the top bar, and the header appears in the middle of the page. On mobile you have to scroll past
three cards before you reach the header.

- `before/explore-desktop-light.jpg`, `before/explore-mobile-dark.jpg`

**Fix:** pass the featured maps into the client as a slot and render them inside the shell, under
the page heading.

### 4. Legacy topic pages open with a verdict, not a crux (high, north star)

The first thing under the title of all 150 legacy topics is a tinted panel: a balance-scale
glyph, "Well-mapped, genuinely contested", Balance 54/100, Weight 76/100, and two meters. A second
"Controversy meter" repeats the same information a screen further down. The crux ("what would
change your mind") only appears about three screens in, inside each pillar. The north star says
"verdict banners become secondary to crux cards", and right now it's the other way round. The
panel is also tinted crux crimson because the contested verdict borrows the crux colour
(finding 6), so the page looks alarmed before it says anything.

- `before/topic-nuclear-safety-desktop-light.jpg`, `before/topic-nuclear-safety-mobile-light.jpg`
- The home page's "Featured analysis" does the same thing: `before/home-desktop-light.jpg`

**Fix, done in this pass:** make `BalanceWeightReadout` a quiet readout. Neutral paper surface,
hairline border, stone ink, and the verdict colour only on the balance dot and the weight fill.
The data stays; the colour, loudness and alarm go.
**For a later wave:** move the readout below the first crux in `ReadModeView` and
`TopicIntroPanel`. Those crux sections belong to the concurrent crux-ledger work, so this pass
leaves the order alone.

### 5. "What's your verdict?" is a team vote at the end of every legacy map (high, north star)

`VerdictVoting` asks readers to pick from Strong disagree to Strong agree. The disagree end is
charcoal and the agree end is rust (the proponent colour). It's the one place on the page that
asks the reader to join a side, and the colouring makes one side look warmer than the other.

- `before/topic-nuclear-safety-desktop-light.jpg`, near the bottom

**Fix, done in this pass:** one neutral scale. Every option gets the same outline treatment and
the selected one gets the deep-teal fill; the heading changes from "What's Your Verdict?" to
"Where do you land, for now?"
**Founder decision:** swap the vote for the north-star one-tap question ("Did this change what
you thought you were arguing about?"), which is also what the gap metric needs.

### 6. The "Contested" verdict borrows crux crimson, so the navigation is a column of red meters (high)

`QUADRANT_STYLE.contested` is `#a23b3b`, which is the crux colour. Most maps are contested, so the
sidebar's topic list is nine red balance-and-weight glyphs, the home topic cards carry red
"CONTESTED" chips, and so does every Explore card. That turns navigation into a scoreboard and
spends the crux colour on something that isn't a crux. The design system reserves crimson for
cruxes.

- `before/home-desktop-light.jpg` (sidebar), `before/explore-desktop-light.jpg`

**Fix, done in this pass:** remove the glyphs from the sidebar's topic list, which is navigation
and not a comparison table.
**Founder decision:** give "contested" its own colour. The proposal is stone `#564d45`, since
contested is the normal state of a live question and not an alarm. That keeps crimson for cruxes
only.

### 7. Everything wears an all-caps tracked eyebrow (medium, system)

Nearly every block opens with a tracked sans label: `START HERE · DEBATE MAPS`,
`THE FACT THAT REFRAMES THIS DEBATE`, `THE HONEST VERSION, IN THREE SENTENCES`, `BOTTOM LINE`,
`CONTROVERSY METER`, `PROPONENT SAYS`, `STRONGEST EVIDENCE ON EACH SIDE`,
`HIDDEN ASSUMPTION — NOBODY SAYS THIS OUT LOUD`. When every block has a label, none of them
stands out, and it's the most recognisable tell of a generated template. It also clashes with the
LessWrong reference, which uses almost none.

- `before/topic-nuclear-safety-desktop-light.jpg`, `before/home-desktop-light.jpg`,
  `before/blog-desktop-light.jpg`

**Fix, done in this pass:** add a shared `.label-caps` class in `globals.css`: EB Garamond true
small caps (`font-variant-caps: all-small-caps`), light tracking, stone ink. The label then belongs
to the typeface instead of fighting it. Applied to the highest-traffic labels: the home flagship
panel, the legacy topic sections, and the blog and guides index eyebrows.
**Remaining:** cut labels that only repeat their heading.

### 8. Long-form prose is set in the UI sans (medium, system)

Blog posts, guide bodies, the about page and the flagship topic page set their body text in
Plus Jakarta Sans at about 17 px. `CLAUDE.md` gives EB Garamond to "headings, body prose", and the
legacy topic page already sets its proponent and skeptic cases in Garamond, which reads much
better. A post like the 20-minute Jev article is a long sans slab.

- `before/blog-post-desktop-light.jpg`

**Fix, done in this pass:** `lib/markdown.ts` output and `.prose-custom` set in the serif at
1.1875 rem (19 px) with 1.7 leading, in a column that stays under 72 characters. Sans stays for UI
chrome, captions and data.

### 9. Mobile: floating buttons cover the key fact, and the breadcrumb has no gutter (medium)

On a 390 px legacy topic page, the floating "Contents" and "Map" pills land on top of the
"fact that reframes this debate" card, which is the most important sentence on the page. The
breadcrumb starts at x = 0 with no side gutter.

- `before/topic-nuclear-safety-mobile-light.jpg`

**Fix:** give the breadcrumb row the page gutter, and keep the floating pills away from the
opening text. Either add bottom padding so they rest over whitespace, or show them only after the
first screen.

### 10. Home has two competing heroes, and the h1 sits below the fold (medium)

The first screen is the flagship panel ("The whole fight, not a verdict."). The actual h1,
"See both sides of any controversial topic, mapped", starts about 580 px down at 1440 px, and
about 1100 px down on mobile. Below that comes a "Featured analysis" that opens with a verdict
readout again. The page tells three stories before it lets you pick one.

- `before/home-desktop-light.jpg`, `before/home-mobile-light.jpg`

**Proposed:** one opening. Either the flagship panel becomes the hero and carries the h1, or the
h1 comes first and the flagship panel follows as "Start here". The fix in finding 4 already
removes the verdict's loudness.

### 11. Small copy and component bugs on the home page (medium)

- "Paste any text and we&apos;ll map it" prints the entity literally, because a JSX string literal
  doesn't decode HTML entities. `components/HeroAnalyze.tsx`. **Fixed.**
- The home "156 topics analyzed" cards are too narrow for the chip, so "CONTESTED" runs past the
  card edge at 1440 px. `before/home-desktop-light.jpg`. **Fixed** by dropping the chip's label
  in that five-up row.

### 12. Newsletter shown twice on topic pages; thin footer (low)

Legacy topic pages end with a full-width "Stay curious" signup and then the footer repeats it.
The footer columns have one or two links each ("Explore → Explore, Saved"; "About → About").
`before/topic-nuclear-safety-desktop-light.jpg`.

**Proposed:** keep the footer signup only, and fill the footer columns with what exists: Guides,
Blog, Methodology, Glossary, Reply, Analyze.

### 13. Proponent and skeptic colours are inconsistent (low)

The design system has proponent in rust and skeptic in brown. The home "Strongest for" card is
teal and "Strongest against" is rust. Legacy topic pages draw the skeptic in stone grey instead
of brown. `before/home-desktop-light.jpg`, `before/topic-nuclear-safety-desktop-light.jpg`.

**Proposed:** use the `proponent`/`skeptic` tokens everywhere the page names a side.

### 14. Nav: "Analyze" is permanently rust, and the theme toggle appears twice (low)

The top-bar "Analyze" link uses the CTA colour even when it isn't the current page, so the nav
looks as if you're already there. The sidebar footer repeats the top-bar theme toggle.

### 15. `/reply` placeholder reads as pre-filled text (low)

The placeholder is a full two-line example, drawn in a stone that is close to body text, so the
field looks already filled in. `before/reply-desktop-light.jpg`.

**Proposed:** a short placeholder ("name: what they said, one turn per line") plus the existing
"Load example" link.

### 16. About: a one-phrase grey accent and monospace "01 / 02" markers (low)

The headline greys out "without destroying each other?", which is the single-phrase accent trope.
The four principles carry monospace numbers but aren't a sequence.
`before/about-desktop-light.jpg`, `before/about-desktop-dark.jpg`.

### 17. Blog index: two chip clouds (low)

There are 30 category chips, many with a count of 1, then 16 tag chips, before the first post
appears. `before/blog-desktop-light.jpg`.

**Proposed:** show the five largest categories and move the rest behind "All categories".

### 18. Flagship hero image is a bright slab in dark mode (low)

`before/topic-ai-unemployment-desktop-dark.jpg`. **Proposed:** `dark:brightness-90`, plus a
hairline border so the image sits on the canvas instead of glowing.

### For the crux-card wave (not touched in this pass, by agreement)

- Flagship crux list (`/topics/ai-mass-unemployment`): all five crux cards have a full crimson
  border. When every crux is outlined in the alarm colour, crux 1 looks no more important than
  crux 5. **Proposed:** crimson only on the number and a thin left rule.
- The "HIDDEN ASSUMPTION — NOBODY SAYS THIS OUT LOUD" pill is an all-caps, spaced-em-dash label.
  It wraps into a two-line pill at 390 px (`before/topic-ai-unemployment-mobile-light.jpg`).
  **Proposed:** "Hidden assumption" in small caps, with the rest as a tooltip or subtitle.
- The legacy crux block's "A supporter changes their mind if… / A skeptic changes their mind if…"
  is the strongest north-star content on the page, but it's set in 14–15 px type under three
  labels. It deserves display size.
- The crux cards are crimson-bordered in light mode but not in dark mode. Pick one treatment.

## Fixes in this pass

Each fix has before and after screenshots in `docs/reviews/2026-09-22-design-audit/after/`. See
the log below.
