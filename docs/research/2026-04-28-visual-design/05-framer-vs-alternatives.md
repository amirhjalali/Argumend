# Visual-Design Research: Framer vs Webflow vs Plasmic vs Custom Next.js

**Date:** 2026-04-28
**Analyst:** Research agent 05/10 in the visual-design swarm
**Audience:** Argumend founder, weighing whether to split the marketing site off from the Next.js app

## 1. The Decision Space

There is exactly one architectural question on the table: **does Argumend's marketing surface live in the same Next.js codebase as the React Flow canvas, or does it move to a no-code visual builder while the app stays in code?**

The unified-Next.js path is what Argumend has today. Everything from `argumend.org/` to `/topics/[id]` to `/api/analyze` lives in one App Router codebase. Pros: zero context-switch, components and types are shared (a `RichNode` preview on the homepage is the same React Flow node used in the canvas), no second hosting bill, no DNS gymnastics, every page benefits from the same `globals.css` design tokens. Cons: every marketing change is a git commit, the founder is the only person who can ship a hero update, and "ship something visually distinctive in an afternoon" is structurally hard because you are competing against a marketing-site-builder team that has spent five years optimizing for that exact loop.

The split path puts the marketing apex (`/`, `/about`, `/blog`, maybe `/guides` and `/explore`) in Framer or Webflow, and keeps `/topics/*`, `/analyses/*`, `/analyze`, and all `/api/*` in Next.js. Pros: marketing can iterate at the speed of a single designer with no PR review, motion and scrollytelling get *enormous*, the no-code-builder team's work compounds for you (CDN, image optimization, A/B testing, AEO, localization). Cons: two stacks, two repos in the founder's head, a domain-routing layer that has to be set up correctly or SEO bleeds, and a hard cliff between the marketing aesthetic and the app aesthetic.

Real-world examples in 2026 sit on a spectrum:

- **Linear, Vercel, Stripe, Notion, Anthropic, Cursor** — keep marketing unified with their app stack. They have design engineers on staff who *enjoy* hand-rolling Framer Motion and WebGL in production Next.js. Their marketing pages are themselves a recruiting flex.
- **Perplexity** — split. Migrated nearly all public-facing marketing pages (help center, careers, security, changelog, API platform landing, Comet landing, back-to-school campaign pages) to Framer; the core app stays elsewhere. Per the [Framer case study](https://www.framer.com/stories/perplexity), Henry Modisett (Head of Design) explicitly framed this as *"clean, smart, and sharp"* without engineering overhead. The Comet and API pages went "from idea to live in just a few weeks."
- **Superhuman** — split. Migrated the marketing site to Framer in three months, reports 50% faster page launches, marketing and design teams now ship without engineers ([Framer story](https://www.framer.com/stories/superhuman)).
- **Mixpanel, Cal.com, Miro, GitBook, Twingate, Dribbble, Mollie, bunq, Hodinkee** — all have public Framer case studies. These are not toy brands. Cal.com is a developer-tools company with comparable cerebral DNA to Argumend.
- **Paste** — went the *other* direction: migrated *off* a custom Next.js + React + GSAP + Sanity stack *to* Framer because the design team wanted autonomy ([LogRocket](https://blog.logrocket.com/ux-design/framer-next-full-stack-web-design-tool/)).

The pattern: the more your marketing surface needs to *visually compete* with peers in a crowded category, and the smaller your design-engineering bench, the more the split path wins. The more your product *is* the marketing surface (e.g., a graph canvas you want strangers to immediately interact with on the homepage), the more unified wins. Argumend is honestly somewhere in between, which is the hardest place to be.

## 2. Framer in April 2026

Framer is the dominant visual-marketing-site builder for design-led teams in 2026. The [pricing page](https://www.framer.com/pricing) shows: Free (1 site, Framer subdomain, 1K visitors/mo, full CMS up to 1K pages, 10 collections, AI features), Mini ($5/mo per site, custom domain), Basic ($15/mo, removes Framer badge, 1K CMS pages), Pro ($45/mo, 10K CMS pages, full SEO, A/B testing, password protection), Scale ($100/mo, 500+ pages with overages, premium CDN, 2TB bandwidth, usage-based pricing for high-traffic sites), Enterprise (custom). Pro is the realistic plan for a real marketing site; Basic is fine for a single-page launch.

The 2026 AI suite is significantly past the toy phase. Announced at [Framer I/O 2025](https://www.businesswire.com/news/home/20250521574932/en/Framer-Launches-AI-Features-to-Supercharge-Web-Design-Democratizing-How-Stunning-Websites-are-Built) and matured through 2026:

- **Wireframer** generates a multi-page site from a text prompt — usable as a starting skeleton, not a finished site.
- **Workshop** is the load-bearing AI feature: an in-editor coding assistant that generates *real React-style code components* (animated WebGL gradients, multi-step forms, pricing calculators, region-specific cookie banners, hover-driven interactive demos) directly inside Framer ([Framer Workshop](https://www.framer.com/workshop/)). It's GPT-backed and accepts plain-English iteration. This is the feature that closes the gap between Framer-as-template-mill and Framer-as-hand-rolled-cerebral-site.
- **Vectors 2.0** — vector drawing on par with Figma.
- **AI translation** — one-click localization across the site, including CMS content.
- **Advanced Analytics + native A/B testing** — replaces Google Analytics + an external A/B tool for most marketing teams.

The CMS is genuinely good now: collections, fields, dynamic pages, references, draft/publish, role-based access. It's not Sanity-class structured content but it covers everything Argumend's `data/blog.ts` and `data/guides.ts` files do today. Custom domains are one DNS record. The CDN is fast — multiple [SEO reviews](https://www.oma-kase.com/blog/framer-seo-2026) report Framer sites consistently scoring 90+ Lighthouse without manual tuning, beating most hand-rolled Next.js sites that don't have a perf engineer babysitting them.

SEO controls are complete: per-page meta, OG, canonicals, indexing controls, sitemap.xml, robots.txt, redirects, schema markup. The historical "Framer is bad for SEO" critique died around 2024.

The remaining limitation that matters: **Framer code components run inside Framer's React runtime, not yours.** You can't `import` from your Next.js app's component library. You can paste in a code component, but it's effectively an island.

## 3. Webflow in April 2026

Webflow is in the middle of a strategic pivot away from "visual website builder" toward "AI-native full-stack platform." A correction on the brief: **Vlad Magdalin is CEO**, not Bryant Chou — Chou is the co-founder/Chief Architect who reportedly stepped away from Webflow Labs in early 2026 ([Crunchbase](https://www.crunchbase.com/person/bryant-chou)). The company itself is still very much Magdalin-led.

What changed in 2026:

- **February 2026:** Native Anthropic Claude connector — Claude can design pages, manage CMS content, and run audits inside Webflow ([Webflow integrations](https://webflow.com/integrations/anthropic-claude)).
- **March 12, 2026:** Webflow acquired Vidoso.ai for AI marketing-content generation ([TechCrunch](https://techcrunch.com/2026/03/12/webflow-buys-ai-content-generation-platform-vidoso-to-bolster-its-marketing-suite/)).
- **April 9, 2026:** Completed migration of all customer sites to next-gen CMS — collection lists per page doubled to 40, nested collection lists now support 10 nested lists per page (5x), 100 items per nested list ([CMSWire](https://www.cmswire.com/digital-experience/webflow-opens-next-gen-cms-to-all-customers-and-bets-big-on-ai-search-visibility/)).
- **April 13, 2026:** Webflow AEO (Answer Engine Optimization) launched in private beta — schema enrichment + content tuned to be cited by Claude/Perplexity/Gemini answers.
- **Webflow Cloud** (launched May 2025, mature now) — full-stack hosting that runs **Next.js and Astro apps on edge infrastructure** alongside the visual CMS ([Sanjeewa Works review](https://www.sanjeewa.works/blog/whats-a-webflow-cloud)). This is genuinely interesting: it's the first time a no-code-marketing-builder has a credible "you can host the app here too" story.
- **Webflow App Gen** — AI-driven web-app generation, mostly aimed at internal tools.

Webflow is structurally heavier than Framer. Its DOM is more verbose, its learning curve is steeper, the design idioms lean B2B/SaaS rather than indie-aesthetic. Where it wins: deep CMS (multi-reference fields, conditional visibility, structured editorial workflows), e-commerce, locales/translation at enterprise scale, accessibility audits, and now the Cloud full-stack story. For a *cerebral product* marketing site (sharp, motion-rich, opinionated), Webflow is the wrong instinct in 2026 — it's tuned for SaaS-with-five-pricing-tiers, not for a single-page argument-mapping manifesto. Pricing is also higher than Framer at the equivalent tier (CMS plan ~$23/mo, Business ~$39/mo, plus account workspace fees).

## 4. Plasmic + Headless Middle Ground

If neither full no-code nor full Next.js feels right, the middle is real:

- **[Plasmic](https://www.plasmic.app/nextjs)** — visual builder that emits clean React components into your existing Next.js codebase. You drag a hero in Plasmic; it generates a `<Hero>` component you `import` from `@plasmicapp/loader-react`. The marketing team edits visually; engineers keep code ownership. Plasmic vs Builder.io comparisons in 2026 ([pkgpulse](https://www.pkgpulse.com/blog/builder-io-vs-plasmic-vs-makeswift-visual-page-builders-2026)) consistently say Plasmic emits the cleanest code; Builder has broader framework support and better A/B-testing/personalization tooling but messier output. Plasmic's `@plasmicapp/loader-react` does ~10K weekly downloads vs Builder's ~40K — Builder is the bigger commercial bet, Plasmic is the design-engineer favorite.
- **Builder.io** — visual headless CMS. More commerce-flavored, Mitosis-backed (compile-once-render-anywhere), now bundled with their AI assistants. Heavier than Plasmic, more enterprise.
- **Makeswift** — Next.js-native inline editing; you mark components as editable in code, and a non-engineer edits them on the live site. The tightest Next.js integration of the three.
- **TinaCMS** — Git-backed visual editing on top of Markdown/MDX. The right choice if Argumend wanted to keep its `data/blog.ts` aesthetic but let a non-engineer edit it. Light, free, no vendor lock-in.

The middle-ground pitch is: *"the marketing team gets visual editing, the codebase stays canonical, and you don't pay the no-code site builder for hosting."* The middle-ground reality is: *you still own the perf, the CDN, the bug surface, and the design system. You're paying for visual editing alone, not for the whole compound flywheel of a Framer.* For a solo founder with no marketing team, this is *worse* than either extreme — it adds tooling complexity without reducing how much work you personally do.

## 5. Case Studies — What Cerebral Niche Sites Actually Run On

I tried to verify each of these using Framer's published gallery, BuiltWith-style detection, and where possible direct case studies. Detection is imperfect; treat as best-effort:

- **Linear (linear.app)** — custom Next.js, hand-rolled. Their marketing is a design-engineering recruiting tool. Not Framer.
- **Vercel (vercel.com)** — custom Next.js (obviously). Not Framer.
- **Anthropic (anthropic.com)** — custom, Next.js-flavored. Not Framer. Their site is famously sparse-on-purpose.
- **Cursor (cursor.com)** — appears custom Next.js with heavy Framer Motion (the npm library, not the platform). Not built on Framer-the-builder.
- **Perplexity (perplexity.ai)** — *YES*, marketing surface is on Framer per their case study. Core app is not.
- **Superhuman (superhuman.com)** — *YES*, marketing on Framer since their 2024-2025 migration.
- **Krea (krea.ai)** — marketing pages have Framer-y motion idioms but the app is React/Svelte heavy. The landing surface I cannot confirm is Framer; it's likely custom Next.js with their own motion code.
- **Lex.page** — custom Next.js, hand-rolled. Their cerebral aesthetic is *deliberately* minimalist — there is essentially no marketing motion to speak of, just typography. The opposite of a Framer use case.
- **Read.cv** — was custom React/Next.js; the company was acquired by Perplexity in 2024 and the standalone site was sunset. Whatever lives at read.cv now is part of Perplexity's stack.
- **Cosmos (cosmos.so)** — custom React/Next.js. The whole point of Cosmos is the canvas-y feed; that's not buildable in Framer.
- **Are.na** — custom Rails + custom React. Decade-old codebase. Not Framer.
- **Roam Research** — custom (ClojureScript, famously). Not Framer.
- **Asterisk Magazine (asteriskmag.com)** — custom CMS (likely Ghost or Webflow-style; Substack mirror at asteriskmag.substack.com). Editorial layout, very few interactive components, easily a Framer or Webflow target.
- **Persuasion (Yascha Mounk)** — Substack. Pure editorial.
- **Astral Codex Ten (ACX)** — Substack. Pure editorial.
- **Cal.com** — Framer for marketing per Framer's case study, Next.js for app.
- **GitBook** — Framer for marketing per case study.
- **Mixpanel** — Framer for marketing per case study.
- **Hodinkee** — Framer per case study (this is striking — Hodinkee is editorially heavy and they made it work).

The cluster: **AI-era cerebral products with a strong design instinct but a small marketing team default to Framer for marketing and keep the app in their own stack.** The Linear/Vercel/Anthropic tier — pure custom — only works because they have design engineers as a salaried function. Argumend does not.

## 6. Motion as a Wedge

This is where Framer's argument is sharpest. Framer's motion model is *declarative inside the visual editor* — scroll-linked animations, layout transitions, gesture-driven interactions, page transitions, magnetic hover, scrollytelling sequences. You author them in a panel, preview live, and ship. The hand-rolled Next.js equivalent is `framer-motion` (the library, now `motion/react`) plus often GSAP for scroll, plus `react-three-fiber` for any WebGL. Each of those is a real engineering project.

Where Framer dominates Argumend's potential needs:
- **Scrollytelling on the homepage** — "scroll through one debate from controversial claim → evidence reveal → crux highlight → judge verdict." This is genuinely hard to ship in custom code in under a week. A designer in Framer can do it in a day.
- **Animated explainer for what an argument map is** — staged element reveals, hover-to-define-term, timeline-driven node placement. Trivial in Framer Workshop, multi-week in custom.
- **Hover states on topic cards** that show inline previews — Framer has this as a primitive; custom code requires a `Popover` + transition state machine.
- **Page transitions** between marketing routes — Framer ships with these; Next.js App Router still requires fiddling with `motion.div` and route segments.

Where hand-rolled Next.js dominates:
- **The React Flow canvas itself** — interactive, app-data-driven, with a Zustand store and dynamic-imported topic data. Framer cannot host this. This is *Argumend's product*.
- **Anything that reads from `getDb()` or hits `/api/analyze`** — Framer can hit external APIs but the round-trip to your own Next.js API + auth state + session is awkward.
- **Topic detail pages (`/topics/[id]`)** — these are dynamic, dataful, and benefit from RSC.
- **Live judge-council UIs, debate orchestrators, anything streaming** — Framer is a static-page builder; streaming AI responses is a non-starter.

The motion-vs-data axis is actually the cleanest way to think about the split. **Framer wins where motion is the message; Next.js wins where data is the message.** Argumend's homepage is *motion-leaning* (you want strangers to feel "this is alive, this thinks, this is gorgeous"). Its `/topics/*` routes are *data-leaning* (the canvas IS the page).

## 7. Argumend's Specific Decision

**Recommendation: hybrid, with a 4-6 week migration window.**

Specifically:

- **Move to Framer:** `/` (homepage), `/about`, `/blog/*`, `/guides/*`. These are exactly the surfaces that should be visually distinctive, motion-rich, and edited without a deploy. They are also the surfaces where the founder is currently the bottleneck.
- **Keep in Next.js:** `/topics/*` (the canvas), `/analyses/*`, `/analyze`, `/explore` (if it's data-driven), all `/api/*`, all auth.
- **Routing:** Use Vercel (or Cloudflare) at the apex with Next.js rewrites that proxy `/`, `/about`, `/blog/*`, `/guides/*` to a `*.framer.website` origin. Pattern is well-documented and used in production by multiple teams ([unwrapdesign blog](https://www.unwrapdesign.com/blog/proxying-framer)). The user never sees `framer.website` in their URL bar — everything stays on `argumend.org`.
- **Design tokens:** Replicate the parchment/teal/rust palette and EB Garamond + Plus Jakarta Sans typography in Framer's design system. This is a one-day setup. The design system is small enough to hand-port.

Why hybrid wins for Argumend specifically:

1. **The founder is the only person.** A unified codebase means every marketing change is a 30-min context switch out of app code. Every framer-marketing change is "open Framer, edit, publish" — measured in single-digit minutes.
2. **The canvas is the product.** Framer cannot host React Flow with Argumend's hooks/stores/data. So the app *must* stay in Next.js. The only question is whether marketing joins it. Given (1), it shouldn't.
3. **Motion is the differentiator at the homepage.** Per the swarm's broader thesis, Argumend needs a visually distinctive homepage to break out of the niche-cerebral noise. Framer is faster to motion-rich than the founder is to ship motion-rich Next.js.
4. **The migration cost is bounded.** The current homepage, about, blog index, blog posts, and guides are maybe 10-15 pages of templated content. The data is in `data/blog.ts` and `data/guides.ts` — exportable to Framer CMS in one afternoon (CSV import). Realistic estimate: **20-30 hours of founder time to replicate everything in Framer**, with the design improvement *much* larger than that hour count would normally buy in custom code. Plus ~$45/mo on Framer Pro.

The case *against* hybrid (and for staying unified): if the founder genuinely enjoys hand-rolling marketing pages and treats it as creative recovery from app work, the unified path is fine — Linear and Vercel make it work for the same reason. But the memory note about being "in orbit, not climbing" with no real users suggests motion is more urgent than craft pleasure.

## 8. Risk and Lock-In

**Hosting lock-in.** Framer hosts your site. Period. There is no native code export. Third-party tools (e.g., Framer Export at $14.99/site) emit static HTML/CSS/JS but lose React fidelity — animations need polyfills, code components break ([nocodeexport.com](https://www.nocodeexport.com/en/blog/how-to-get-code-from-framer)). For a pure marketing site this is acceptable: if you ever want out, you take screenshots of every page, hire a designer, and rebuild in Next.js in a week. Not catastrophic, but real.

**Vendor risk.** Framer is venture-funded, growing, profitable-ish, and unlikely to disappear in the 1-3 year horizon that matters. Webflow has the same profile but is more mature/safer. Plasmic is the riskiest (smaller company, smaller commercial base) — if you bet on Plasmic and they get acquired and sunset, your codebase still works (it's just React) but you lose the visual editor.

**SEO risk.** Framer's SEO is fine in 2026 — multiple Lighthouse audits hit 90+. The actual SEO risk in a hybrid setup is **misconfigured rewrites** that cause `argumend.org/blog/foo` and `framer.website/blog/foo` to both be indexed (canonical issues, duplicate content). This is a one-time setup risk; once correct, it's invisible. Use canonical tags + a robots.txt on the Framer subdomain disallowing crawl, and serve only via the rewrite.

**Design-system drift.** The single biggest hybrid risk. The marketing site says "Argumend is parchment + teal + serif"; six months later someone updates Tailwind tokens in the Next.js app to a new shade and the marketing Framer site still ships the old one. Mitigation: a single source-of-truth token file (already exists at `globals.css`) that gets manually mirrored to Framer's design panel. Quarterly audit. Cheap.

**AI feature drift.** If Webflow's AEO product genuinely lands ranking lifts in Claude/Perplexity citations (the bet they're making), and Framer doesn't follow, that's a forcing function to reconsider in 6-12 months. Watch this.

**Escape plan.** If hybrid breaks: (a) screenshot every Framer page, (b) reimplement in Next.js using v0/Cursor in a week of focused work, (c) flip the Vercel rewrites off, (d) cancel the Framer subscription. Total downside: one focused week and ~$200 in Framer fees up to that point. This is a *cheap* experiment with a clear unwind path. That asymmetry is the strongest argument for trying it.

## Sources

- [Framer Pricing](https://www.framer.com/pricing)
- [Framer Workshop](https://www.framer.com/workshop/)
- [Framer Stories](https://www.framer.com/stories/) — index of customer case studies
- [Framer launches AI features at I/O 2025 — BusinessWire](https://www.businesswire.com/news/home/20250521574932/en/Framer-Launches-AI-Features-to-Supercharge-Web-Design-Democratizing-How-Stunning-Websites-are-Built)
- [Framer SEO 2026 — Oma Kase](https://www.oma-kase.com/blog/framer-seo-2026)
- [Framer to Next.js Migration Guide — BrowserCat](https://www.browsercat.com/post/migrate-framer-to-nextjs)
- [How to Get Code From Framer (2026 Methods) — NoCodeExport](https://www.nocodeexport.com/en/blog/how-to-get-code-from-framer)
- [Proxying a Framer site through Next.js — Unwrap Design](https://www.unwrapdesign.com/blog/proxying-framer)
- [Framer Perplexity Case Study](https://www.framer.com/stories/perplexity)
- [Framer Superhuman Case Study](https://www.framer.com/stories/superhuman)
- [Webflow Latest Updates 2026 — MyPrograming](https://www.myprograming.com/webflow-latest-updates-2026-the-complete-guide-to-every-new-feature/)
- [Webflow Completes CMS Overhaul, Launches AEO — CMSWire](https://www.cmswire.com/digital-experience/webflow-opens-next-gen-cms-to-all-customers-and-bets-big-on-ai-search-visibility/)
- [Webflow buys Vidoso for AI marketing content — TechCrunch](https://techcrunch.com/2026/03/12/webflow-buys-ai-content-generation-platform-vidoso-to-bolster-its-marketing-suite/)
- [Webflow Anthropic Claude integration](https://webflow.com/integrations/anthropic-claude)
- [What is Webflow Cloud? 2026 Guide — Sanjeewa Works](https://www.sanjeewa.works/blog/whats-a-webflow-cloud)
- [Webflow vs Framer 2026 — Omnius](https://www.omnius.so/blog/webflow-vs-framer)
- [Bryant Chou — Crunchbase profile](https://www.crunchbase.com/person/bryant-chou)
- [Plasmic for Next.js](https://www.plasmic.app/nextjs)
- [Builder.io vs Plasmic vs Makeswift 2026 — pkgpulse](https://www.pkgpulse.com/blog/builder-io-vs-plasmic-vs-makeswift-visual-page-builders-2026)
- [Plasmic vs Builder.io comparison — Plasmic](https://www.plasmic.app/vs-builder-io)
- [Why Framer might replace your stack — LogRocket](https://blog.logrocket.com/ux-design/framer-next-full-stack-web-design-tool/)
- [Framer vs. Webflow — Zapier](https://zapier.com/blog/framer-vs-webflow/)
- [Framer for marketing + Next.js for the app — Framer Community](https://www.framer.community/c/developers/framer-for-marketing-site-nextjs-for-actual-web-app)
