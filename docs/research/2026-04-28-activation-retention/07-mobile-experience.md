# Mobile Experience Audit & Recommendations

**Date:** 2026-04-28
**Agent:** 07/10 — activation-retention swarm
**Scope:** Mobile UX audit at 375x812 (iPhone 14 logical), recommendations ranked by impact × effort

## 1. Mobile Traffic Share for Cerebral Products

The "rationalist crowd uses desktop" assumption is wrong, and it has been wrong for years. The directional reality across niche-cerebral products in 2025-2026:

- **Statcounter, global, March 2026:** mobile **62.54%**, desktop **34.04%**, tablet **3.42%** ([Statcounter Global Stats](https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet)). North America skews more desktop than the global average, but mobile is still the majority for almost every general-content surface.
- **Substack publications (Similarweb panel data, 2024-2025 in their public traffic explorer):** typical "smart-people-write-essays" stacks like Astral Codex Ten, Slow Boring, The Ankler track in the **45-58% mobile** band, with longer-form publications skewing slightly more desktop than average lifestyle Substacks. ACX specifically: Similarweb's traffic-source breakdown for astralcodexten.com shows **~52% desktop / ~48% mobile** as of late 2025 ([Similarweb — astralcodexten.substack.com](https://www.similarweb.com/website/astralcodexten.substack.com/)). LessWrong is closer to **~58% desktop / ~42% mobile** per the same panel ([Similarweb — lesswrong.com](https://www.similarweb.com/website/lesswrong.com/)) — the most-desktop-skewing site in the cluster, and even there mobile is over 40%.
- **Manifold Markets** — the most "interactive" of the cluster, more app-like, runs **~55% mobile** because betting is a phone behavior ([Similarweb — manifold.markets](https://www.similarweb.com/website/manifold.markets/)).
- **Rationalist-Twitter referral traffic specifically** is mobile-dominant. X/Twitter's own engagement reports consistently put mobile share at **~85% of sessions**. Any link landing from a mobile X tap is, with high probability, opened in mobile Safari or the in-app browser.

**Working number for Argumend in 2026:** assume **50-58% mobile, 38-45% desktop, 3-5% tablet** in steady state once organic Twitter/ACX/HN traffic kicks in. The current internal share (founder + a handful of dev sessions) is desktop-heavy, but that is a sample-size artifact, not a real signal. Build for mobile-first, verify with GA4 once volume exists.

## 2. Argumend Mobile Audit at 375x812

Walking through each surface using the codebase. Argumend has no `viewport` width meta override (Next.js 16 injects a sensible default), but it also has **no explicit `viewport` configuration in `app/layout.tsx` beyond `themeColor`** (`app/layout.tsx:27-32`) — meaning it uses Next's default `width=device-width, initial-scale=1`, which is correct.

### Homepage hero + topic grid

`components/HomeClient.tsx:194-258` and `components/FeaturedTopicHero.tsx:66-188`.

- **Works:** the hero uses `flex flex-col items-center px-4 md:px-8` (`FeaturedTopicHero.tsx:66`) so horizontal padding shrinks on mobile. Title scales `text-3xl sm:text-4xl lg:text-5xl` (`FeaturedTopicHero.tsx:73`) — 30px on mobile is fine. Confidence bar is `max-w-xs` and stays centered. Crux callout reads cleanly. Evidence cards are `grid-cols-1 sm:grid-cols-2` (`FeaturedTopicHero.tsx:124`) — they stack vertically below 640px, which is correct.
- **Works:** topic grid is `grid-cols-2 sm:grid-cols-3 lg:grid-cols-6` (`HomeClient.tsx:224`) — at 375px you get a 2-column grid of topic cards, each ~165px wide, which is acceptable.
- **Breaks:** the topic-grid heading "109 topics analyzed" + "Browse all topics" link below the grid both work, but the cards use `hover:scale-[1.01] hover:-translate-y-0.5` (`HomeClient.tsx:229`) — hover effects on mobile fire on tap-and-hold and feel unresponsive. Replace with `active:` variants or no transition on touch devices.
- **Breaks (subtle):** the gradient `bg-gradient-to-b from-[#f4f1eb] to-stone-50` on the hero is fine, but the parchment watercolor `body::after` pulled from `/images/lw-background.webp` (`globals.css:116`) is `background-size: cover` over a fixed full-viewport area. On mobile this is rendered at full-bleed and then masked with a 30%→8% top-down gradient. The image is ~200KB+ as a webp at desktop dimensions; mobile pays full bandwidth for a decoration that's mostly invisible at small sizes. Quick win: serve a smaller mobile variant via a `<picture>` element or a `@media (max-width: 768px)` CSS rule that hides it entirely.

### Topic page — canvas

`app/topics/[id]/TopicDetailView.tsx` is **1,924 lines** of dense topic-detail rendering, which is actually a structured-essay layout (`max-w-4xl px-4 sm:px-6 lg:px-8`, `TopicDetailView.tsx:1108`). Good — that surface is mobile-friendly.

The actual React Flow canvas only fires on the homepage when a topic is selected and viewed in `currentView === "logic-map"`. **And the codebase already routes mobile away from the canvas** at `HomeClient.tsx:294-296`:

```tsx
isMobile ? (
  <MobileArgumentList />
) : (
  <ReactFlow ... />
)
```

This is good, and `MobileArgumentList` (`components/MobileArgumentList.tsx`) is a competent vertical-stack accordion of pillars with proponent/skeptic blocks, evidence with 4-axis weight bars, and crux callouts. It's also keyboard-friendly, has 44px min-height tap targets (`MobileArgumentList.tsx:223, 312`), and uses `aria-expanded` correctly.

**The canvas-on-mobile problem is therefore mostly already solved on the home topic-explorer route.** The remaining gap is the `/explore` page (graph-of-graphs view), which is not gated by `useIsMobile`.

- **Breaks:** `useIsMobile` returns true below 768px (`hooks/useMediaQuery.ts:25-27`). Tablets in portrait (e.g., iPad mini at 768px exactly) get the desktop canvas, which is fine. But the breakpoint is set in JS only — the canvas component still mounts in the bundle. For mobile users on slow connections, you're shipping `@xyflow/react` (~80KB gzipped) and not using it. The dynamic-import gating used for `ScalesOfEvidence` and `DebateView` (`HomeClient.tsx:40-51`) is not applied to the desktop ReactFlow path. Worth a code-split.
- **Breaks (when canvas does load):** for tablet users the canvas is `fitView`-mounted with `minZoom`/`maxZoom` from `lib/constants.ts`. Pinch-zoom on touch devices works in React Flow 12+ via the `panOnDrag` + native gesture handling, but **the MiniMap is hidden with `hidden md:block`** (`HomeClient.tsx:324`) — correct. The MapLegend, ZoomIndicator, NavigationPath, and TopicIntroPanel components all overlay the canvas; on a tablet portrait, these can crowd the viewport. Audit overlay positioning at 768-820px.

### Topic page navigation between sections

`TopicDetailView.tsx:1107-1924` is one long scroll. It uses anchor IDs (`#ai-debate`, `#pillars`) but no sticky table-of-contents on mobile. On a 1924-line essay-style page rendered to maybe 8-12k pixels of mobile scroll, **users will lose orientation**. There's a depth toggle (`30s`/`5min`/`30min`, referenced in `TopicDetailView.tsx:1408`) which mitigates length, but the section nav is not mobile-optimized — there's no floating "jump to section" affordance.

### Share UI

`components/ShareButtons.tsx:96-263`. Uses `navigator.share` when available (`ShareButtons.tsx:99-100, 111-119`) — this is the right call for mobile. iOS Safari and Chrome-on-Android both support Web Share API and will show the native share sheet. Looks good.

- **Works:** native share, X intent, LinkedIn intent, copy link, share-the-crux all there. `aria-label`s present.
- **Breaks (minor):** the horizontal share row may overflow at 375px if the buttons each have `min-h-[44px]` + visible labels. Confirm the row collapses to icons-only below `sm:`.

### Email capture

`components/NewsletterSignup.tsx:11-137`. `<input type="email">` (`NewsletterSignup.tsx:100`) is correct — iOS shows the email keyboard with `@` and `.com` keys. Good.

- **Works:** correct input type, `aria-label`, valid email regex client-side check.
- **Breaks (minor):** no `autocomplete="email"` attribute, no `inputmode="email"`, no `enterkeyhint="send"`. These three attributes together would give iOS the full email-optimized experience: autofill from contacts, `@.com` keys, and "Send" instead of "Go" on the return key. Trivial fix.

## 3. The Canvas-on-Mobile Problem

React Flow on mobile is genuinely hard regardless of how well it's implemented. Three solution directions:

**(a) Reading mode default on mobile, "view as graph" opt-in.**
Render the topic as a structured essay (which `TopicDetailView` already does on `/topics/[id]`) and put a small "view as interactive map" link that takes desktop-class users to the graph. On mobile, that link can either degrade gracefully to the existing `MobileArgumentList` or be hidden entirely.

**(b) Vertical-stack canvas — single column, top-to-bottom flow with collapsible nodes.**
This is what `MobileArgumentList.tsx` already does. It loses the graph metaphor entirely — there's no visual sense of "evidence radiates from pillars" or "cruxes hang off pillars" — but it gains legibility. The current implementation is the right floor, not the ceiling.

**(c) Lossless canvas with mobile-specific affordances** — fit-to-screen on load, large tap targets, collapsed evidence by default, double-tap-to-fit, swipe between pillars.
This is the most ambitious option. It preserves the visual identity of Argumend on mobile but requires nontrivial work: custom React Flow controls, gesture handlers, a "node carousel" pattern, etc. Likely 1-2 weeks of work for marginal benefit over (a).

**Recommendation: (a) + keep (b) as the canvas fallback for mobile homepage.** The graph metaphor is a desktop showcase; on mobile, the essay is the artifact. This matches what (some of) the codebase already does on `/topics/[id]`. The work is to make *every* mobile entry point default to reading mode.

## 4. The Reading-Mode Case (Mobile Default)

Extending agent 03's reading-mode recommendation: on mobile, this should be **the default with no opt-out friction**. The argument-as-prose layout, optimized for thumb-scroll:

```
┌─────────────────────────────────────┐
│  [confidence pill]  82% confidence  │
│                                     │
│  Title in 28-32px serif             │
│  ──────────────────────────         │
│  Meta-claim in 16px serif italic    │
│  (one sentence, what's at stake).   │
│                                     │
│  ━━━ THE CRUX ━━━                   │
│  ┌─────────────────────────────┐    │
│  │ Decisive question:          │    │
│  │ "What would change your     │    │
│  │  mind here?"                │    │
│  │ — verification: theoretical │    │
│  └─────────────────────────────┘    │
│                                     │
│  Strongest argument FOR             │
│  Lorem ipsum, two paragraphs max,   │
│  with the strongest evidence cited  │
│  inline as [1].                     │
│                                     │
│  Strongest argument AGAINST         │
│  Same shape, opposite side.         │
│                                     │
│  Judges' verdict                    │
│  3 model logos in a row, with       │
│  one-line take from each.           │
│                                     │
│  Related topics                     │
│  [Card] [Card] [Card]               │
│                                     │
│  [Share] [Save] [Subscribe]         │
└─────────────────────────────────────┘
```

This is a 90-second read on mobile. The current `MobileArgumentList` is closer to a 5-minute deep-dive — that's the right *secondary* surface but the wrong *first* surface. The 90-second read should be what loads when a mobile user lands on a topic.

## 5. Mobile-Only Formats

Per cycle 2 file 10 (short-form vertical), Argumend should detect mobile and offer a **"swipe through cruxes" gallery format**. Implementation sketch:

- Use `framer-motion`'s drag/swipe primitives (already in deps via `package.json`).
- Each card is a single pillar with: title, 2-line summary, crux question, "verdict so far" gauge.
- Snap scroll behavior with CSS `scroll-snap-type: x mandatory; scroll-snap-align: center`.
- Progress dots at the bottom showing pillar 2 of 5.
- Final card: "share this analysis" + "see all 109 topics."

This is a TikTok-shaped reading experience. It would let Argumend post a topic ID to X with a single screenshot/clip teaser and have the landing page deliver the same vertical-swipe payoff, instead of dropping users into a graph they can't read.

## 6. Touch Interaction Patterns

For the surfaces that genuinely need touch interaction (canvas-on-tablet, evidence panels, crux modal):

- **Pinch-zoom** — React Flow 12 supports this natively via `panOnPinch` (which is `true` by default in v12). Verify behavior at 768-820px.
- **Double-tap-to-fit** — currently disabled (`zoomOnDoubleClick={false}`, `HomeClient.tsx:312`). Consider re-enabling on touch only; double-tap-to-zoom is a stronger mobile gesture than mouse double-click. Use `pointertype === 'touch'` to gate.
- **Swipe-between-nodes on mobile-list view** — overlay a horizontal pillar carousel above `MobileArgumentList`'s vertical accordion. Tap a pillar in the carousel to scroll it into view.
- **Bottom-sheet evidence panels** — use **Vaul** ([vaul.emilkowal.ski](https://vaul.emilkowal.ski/)) or **@radix-ui/react-dialog** with custom mobile-positioned content. Vaul is the iOS-native-feel option (used by Linear, Vercel) and handles all the drag-to-dismiss, momentum, and edge-case scroll-locking that you don't want to build yourself. ~6KB gzipped. The pattern: tap an evidence card → bottom sheet rises 75% of the viewport with the full evidence detail, drag down or backdrop-tap to dismiss.

```tsx
// minimal sketch
import { Drawer } from "vaul";
<Drawer.Root>
  <Drawer.Trigger>{evidenceTitle}</Drawer.Trigger>
  <Drawer.Portal>
    <Drawer.Overlay className="fixed inset-0 bg-black/40" />
    <Drawer.Content className="fixed bottom-0 inset-x-0 bg-paper rounded-t-2xl">
      {/* evidence body */}
    </Drawer.Content>
  </Drawer.Portal>
</Drawer.Root>
```

## 7. Performance on Mobile

Mobile users are on cellular ~30% of the time; CDN edges help bytes-on-wire but don't help the device's parsing/rendering budget. Argumend's bundle has heavy guests:

- **`@xyflow/react`** ~80KB gzip. Currently loaded on homepage even when `MobileArgumentList` is what renders. Code-split it.
- **`data/topics`** ~500KB. Already lazy-loaded per `CLAUDE.md` ("dynamic imports" section), good. Verify the homepage doesn't pull the full module before user picks a topic.
- **`framer-motion`** ~50KB gzip. Used widely — keep but audit `motion.*` imports for tree-shaking.
- **`lucide-react`** — verify only used icons are bundled (Next 16 with the `optimizePackageImports` config does this automatically; confirm it's enabled).
- **`/images/lw-background.webp`** — see §2. Big decorative image loaded on every page.

**Lighthouse mobile-performance estimate (current):** Performance ~62-72, LCP ~2.8-3.4s, CLS ~0.05, TBT ~280-450ms. Numbers are unmeasured guesses based on the bundle composition. Argumend should run a real Lighthouse mobile audit (Moto G Power profile, slow 4G) and measure.

**Targets per Web Vitals 2025:**
- LCP < 2.5s (good), < 4.0s (needs improvement)
- CLS < 0.1 (good)
- INP < 200ms (good) — replaced FID in March 2024

**Three plausible perf wins:**
1. Replace decorative `lw-background.webp` with a CSS gradient on mobile (saves 100-200KB).
2. Code-split `ReactFlow` so mobile homepage doesn't ship it.
3. Convert remaining `.jpg`/`.webp` assets in `public/images/topics` to AVIF where supported (cycle 3 file 03).

## 8. iOS Safari Specifics

iOS Safari is roughly **50% of all mobile traffic** ([Statcounter — mobile browser](https://gs.statcounter.com/browser-market-share/mobile/worldwide)). Known issues to mitigate:

- **`100vh` viewport quirk.** iOS Safari includes the address bar in the initial `100vh` calculation, then the bar collapses on scroll, leaving content cropped. Argumend uses `min-h-screen` (Tailwind's `100vh`) on the homepage shell (`HomeClient.tsx:200, 271`). Replace with `min-h-[100svh]` (small-viewport-height) which is supported in iOS 15.4+ and Safari 15.4+, fully covering current iOS field.
- **Scroll-bounce / rubber-band.** The fixed sidebar overlay (`HomeClient.tsx:73-82`) and `body::before/::after` parchment background can interact weirdly with overscroll. Add `overscroll-behavior-y: none` to `body` for the homepage canvas shell, but **not** for the topic detail page where natural scroll is desired.
- **React Flow + iOS Safari.** Open issues on the React Flow repo (e.g., [xyflow/xyflow#3248](https://github.com/xyflow/xyflow/issues/3248) on iOS pinch-zoom hijack — fixed in v12.x but verify version) intermittently affect gesture handling. Argumend already routes mobile away from the canvas via `MobileArgumentList`, so this is largely moot — but worth retesting if you ever ship mobile canvas.
- **Momentum scroll inside scroll containers.** The sidebar `<div className="flex-1 overflow-y-auto">` (`Sidebar.tsx:111`) needs `-webkit-overflow-scrolling: touch` for smooth momentum on older iOS; modern iOS handles this natively.
- **`backdrop-filter` performance.** `bg-[#f4f1eb]/90 ... backdrop-blur-sm` on the sticky header (`TopBar.tsx:38`) is 60fps on iOS 17+ but jankier on older iPhones. Consider gating `backdrop-blur` to `@media (min-width: 768px)`.
- **`100dvh` for the canvas main area** — same fix as `100svh`. Use `dvh` for surfaces that should fill exactly the visible viewport when it changes.

## 9. PWA / Offline / Install

**Argumend has no manifest.** Confirmed: no `app/manifest.ts`, no `app/manifest.json`, no `public/manifest.webmanifest`, no manifest link in `app/layout.tsx`. The only mobile-relevant meta is `viewport.themeColor` (`app/layout.tsx:27-32`). There's a single `/icons/claude.png` and no PWA icon set.

**Should it be installable?** The honest answer is **not yet, but the prep is cheap.** Argumend has:

- ✅ HTTPS canonical
- ✅ Theme color
- ✅ Responsive viewport
- ❌ No manifest
- ❌ No icon set (192/512 PNGs and an SVG)
- ❌ No service worker
- ❌ No offline shell

A minimal `app/manifest.ts` (Next 16 supports the typed manifest convention) plus 4 icon sizes would unlock the "Add to Home Screen" prompt that some browsers show after dwell time. A service worker for offline reading of cached topics is more work and would be premature.

**Pros of pushing PWA install prompts:**
- Returning-user retention. A homescreen icon is one of the few asymmetric retention wins available.
- Brand legitimacy — the install prompt signals "real app."
- Once installed, push notifications become possible (announce new topics, weekly cruxes).

**Cons:**
- Install prompts are pushy and can scare off cerebral readers expecting a quiet site.
- iOS Safari's PWA support is famously incomplete (no programmatic install prompt; users must use the share-sheet "Add to Home Screen" manually) so the win is mostly Android.
- Premature for a site with no validated retention behavior — see project memory: "many plans shipped, no real users."

**Recommendation:** ship the manifest + icons (1-2 hour task) so Argumend is *capable* of being installed for any user who wants it. Do not surface an install banner. Defer the service worker and push notifications to post-product-market-fit.

## 10. Concrete Mobile Improvement Plan

Ranked by **(impact × likelihood-of-being-correct) ÷ effort**. Each line is one trackable shipping unit.

| # | Item | Effort | Impact | Priority |
|---|---|---|---|---|
| 1 | **Reading-mode-as-default-on-mobile** for topic pages — keep `TopicDetailView` essay layout, suppress the canvas link/CTA on mobile, make sure `/topics/[id]` is the canonical mobile entry point | 2-3 days | High | **Ship first** |
| 2 | **Lighthouse audit + 3 perf wins**: kill decorative bg image on mobile, code-split ReactFlow off mobile homepage, audit lucide-react tree-shake | 1 day | High | **Ship first** |
| 3 | **iOS viewport fixes**: replace `min-h-screen` with `min-h-[100svh]`, add `overscroll-behavior-y: none` on canvas shell, gate `backdrop-blur` to ≥768px | 0.5 day | Med-High | **Ship first** |
| 4 | **Email-capture mobile polish**: add `autocomplete="email"`, `inputmode="email"`, `enterkeyhint="send"` to NewsletterSignup | 5 minutes | Low-but-free | **Ship first** |
| 5 | **PWA manifest + icon set** (4 PNGs, 1 SVG, `app/manifest.ts`); no install banner | 2-3 hours | Low-Med (retention prep) | Ship soon |
| 6 | **Bottom-sheet (Vaul) for evidence detail** on mobile reading mode — replaces tap-to-expand-inline with a iOS-native-feel sheet | 2 days | Med | Ship within 2 weeks |
| 7 | **Swipe-through-cruxes vertical-card format** — TikTok-shaped pillar carousel, sharable as a single screenshot per pillar | 3-4 days | Med-High (distribution lever) | Ship within 2 weeks |
| 8 | **Sticky mobile section-nav** on `/topics/[id]` — small floating "jump to: pillars / debate / verdict" pill | 1 day | Med | Ship within 1 month |
| 9 | **Replace hover-only effects** with `active:` variants on touch — kill jankiness on mobile cards | 0.5 day | Low | Ship within 1 month |
| 10 | **Tablet (768-820px) overlay audit** of MapLegend, NavigationPath, TopicIntroPanel — fix crowding | 0.5 day | Low | Ship within 1 month |

**Single most-leveraged item:** #1 — reading-mode default on mobile. This is a routing/CTA change, not a rebuild. The `MobileArgumentList` work is already done; the gap is making sure mobile users *land* on the essay/list and never on the canvas. Argumend has spent effort building beautiful mobile fallbacks; the remaining work is making them the front door.

## Sources

- [Statcounter — Desktop vs Mobile vs Tablet Market Share Worldwide](https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet)
- [Statcounter — Mobile Browser Market Share Worldwide](https://gs.statcounter.com/browser-market-share/mobile/worldwide)
- [Similarweb — astralcodexten.substack.com](https://www.similarweb.com/website/astralcodexten.substack.com/)
- [Similarweb — lesswrong.com](https://www.similarweb.com/website/lesswrong.com/)
- [Similarweb — manifold.markets](https://www.similarweb.com/website/manifold.markets/)
- [Vaul — drawer-component for React](https://vaul.emilkowal.ski/)
- [web.dev — Core Web Vitals (LCP, CLS, INP)](https://web.dev/articles/vitals)
- [Web.dev — INP replaces FID (March 2024)](https://web.dev/blog/inp-cwv-march-12)
- [MDN — `100svh` / `100dvh`](https://developer.mozilla.org/en-US/docs/Web/CSS/length#viewport-percentage_lengths)
- [xyflow/xyflow GitHub issues](https://github.com/xyflow/xyflow/issues)
- [Next.js — manifest.json convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest)
- File refs: `app/layout.tsx:27-32`, `components/HomeClient.tsx:194-296,324`, `components/FeaturedTopicHero.tsx:66-188`, `components/MobileArgumentList.tsx:1-339`, `components/TopBar.tsx:38`, `components/Sidebar.tsx:96-111`, `components/NewsletterSignup.tsx:100`, `components/ShareButtons.tsx:99-119`, `app/topics/[id]/TopicDetailView.tsx:1107-1924`, `app/globals.css:109-129`, `hooks/useMediaQuery.ts:25-27`, `next.config.js:1-72`.
