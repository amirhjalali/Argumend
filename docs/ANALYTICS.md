# Analytics: what is counted, where, and how to turn it on

Argumend counts how people use the site: page views, plus a short list of events
that carry counts, ids and buckets, never text. Nothing is counted until the founder
configures a provider at build time. This document lists what is collected, what
to set in Coolify, and the five numbers to read each week.

The code lives in `lib/analytics.ts` (events), `lib/analyticsConfig.ts` (provider,
URL allow-list), `components/AnalyticsScripts.tsx` (loader), and
`components/analytics/TopicAnalytics.tsx` (the topic-page funnel). The privacy page's
claims about all this are mapped to code in `docs/PRIVACY_AND_CONSENT.md`.

## Where things stand (audited 2026-11-03)

- **No Argumend analytics run in production.** The live HTML has no analytics tag
  because `NEXT_PUBLIC_GA_MEASUREMENT_ID` is not set in the Coolify build. No events
  have ever been recorded.
- **Cloudflare Web Analytics is already running.** A browser-like request to
  `https://argumend.org/topics/nuclear-energy-safety` on 2026-11-03 returned HTML with
  Cloudflare's `beacon.min.js` injected at the edge. A plain `curl` request did not
  get it. The CSP has allowed the beacon since `183cabb`. So the Cloudflare dashboard
  (argumend.org zone → Analytics & Logs → Web Analytics) should already show visits,
  page views, top pages and referrers. It cannot count custom events: Cloudflare's FAQ
  answers "Not yet". That makes it the place to read **number 1** below today, before
  anything else is switched on.
- **Fixed in this change:**
  - **The CSP would have blocked most GA4 hits.** `connect-src` allowed only
    `www.google-analytics.com`, but GA4 sends to regional hosts such as
    `region1.google-analytics.com`. It now allows `https://*.google-analytics.com`
    and `https://*.analytics.google.com`, following Google's CSP guide for
    "Google Analytics without any Ads features".
  - **Search text would have reached GA.** `/topics?q=…` and `/questions?q=…` write
    the search into the URL, and the old page-view code sent the full URL. Every
    URL a provider receives now keeps only allow-listed query parameters
    (`ANALYTICS_URL_PARAMS`: page, category, sort, view, map, since, utm_*, ref).
  - **The landing page view could be dropped.** The inline `gtag` snippet and the
    page-view effect raced each other. Both now go through a queue that delivers in
    order once the provider is ready.
  - **The privacy page listed events that were never fired** ("a view switched", "a
    topic viewed"). It also described a sidebar that no longer exists, and it did not
    mention the Cloudflare beacon. It now names the provider the build actually loads,
    and it lists the events below.
  - **The GA ID was interpolated into inline script text unchecked.** It is now
    validated (`G-` followed by letters and digits), and no inline script is left.
- **Not changed (founder decision): consent.** With GA configured, GA loads without a
  cookie banner. `/privacy` says so in a `[Pending founder decision]` block. See
  "Choosing a provider" below.
- **Not added: Do Not Track or Global Privacy Control.** The existing code did not
  honour either one, and this change keeps it that way rather than deciding for the
  founder. Umami supports it with one attribute (`data-do-not-track="true"` in
  `components/AnalyticsScripts.tsx`). For GA it would be a check in `trackEvent` and
  in the loader.

## What is collected

Every event goes through `analyticsParams()`, which drops any string parameter that
is not a short token: letters, digits and `_ - . : /`, at most 64 characters, no
spaces, no `@`. A sentence, a query or an email address cannot get through, even if a
future caller passes one by mistake. With no provider configured, `trackEvent`
returns at once, and the topic tracker and search hook attach no listeners and set no
timers.

| Event | Parameters | Fired from | When |
| --- | --- | --- | --- |
| `page_view` (GA only) | `page_path`, `page_location`, `page_referrer`, each with the query reduced to allow-listed parameters | `components/GAPageView.tsx` | Every client-side navigation, including the landing page. Plausible and Umami count page views themselves. |
| `topic_view` | `topicId`, `topicKind` (`flagship` / `legacy`) | `components/analytics/TopicAnalytics.tsx`, mounted by `app/topics/[id]/page.tsx` | A map page mounts |
| `first_crux_seen` | `topicId` | same | Half of the first crux entry enters the viewport (IntersectionObserver). Once per page view. |
| `crux_open` | `topicId`, `cruxIndex` (1-based) | same | A crux's disclosure opens. Once per crux per page view. This includes a crux opened by a `#crux` link. |
| `evidence_expand` | `topicId`, `cruxIndex` | same | A crux's "evidence on each side" disclosure (`details[data-evidence]`) opens. Once per crux per page view. |
| `scroll_depth` | `topicId`, `percent` (25 / 50 / 75 / 100) | same | The bottom of the viewport passes that share of the document. Measured on scroll only, so landing on a page is not counted as reading it. |
| `share_click` | `platform` (`native` / `copy` / `x` / `linkedin`) | `components/ShareButtons.tsx`; `native` from `ShareTopicButton` in `components/topic/TopicActions.tsx` | Share or copy-link pressed (`native` after the share sheet completes) |
| `diagram_view` | `topicId` | `app/topics/[id]/map/TopicDiagram.tsx` | "Open the map": the diagram route mounts |
| `node_expand` | `topicId`, `nodeId` | `components/DesktopCanvas.tsx` | A diagram node opens (unchanged) |
| `paste_submit` | `contentType`, `lengthBucket` (`xs` <250, `s` <800, `m` <2500, `l` <8000, `xl` characters) | `components/paste/PasteClient.tsx` | Text submitted at `/analyze` |
| `paste_result` | `result` (`match` / `closest` / `no_match` / `error`), `lengthBucket` | same | The map search for that submission returns. A superseded run is not counted. |
| `search_used` | `surface` (`site_search` / `library` / `questions`), `resultsBucket` (`0` / `1-5` / `6-20` / `21+`) | `hooks/useSearchAnalytics.ts`, in `components/SearchModal.tsx`, `app/topics/TopicsPageClient.tsx`, `app/questions/QuestionsSearch.tsx` | Typing pauses for 1.2 s on a new, non-empty query. A `?q=` the library page loads with is not counted. |
| `newsletter_signup`, `cta_click`, `disagreement_*` | as before | as before | Unchanged |

**Never collected:** pasted text, search queries, names, emails, which map a paste
matched, or any free text. The matched map id was left out of `paste_result` on
purpose. It would tell a provider that holds a cookie id what subject someone pasted
(abortion, say). Add it only if that trade is acceptable.

**Known imprecisions:**
- `crux_open` also fires when a `#crux` link opens a crux for the reader.
- `/questions` restores its `?q=` after mount, so arriving on a shared
  `/questions?q=…` link counts as one search.
- Scroll depth is measured against the whole document, footer included.

## Choosing a provider (founder decision)

The code supports exactly one provider at a time, selected by
`NEXT_PUBLIC_ANALYTICS_PROVIDER`. It does not pick one.

| | Google Analytics 4 | Plausible | Umami | Cloudflare Web Analytics (already on) |
| --- | --- | --- | --- | --- |
| Cookies | Yes (`_ga`) | Not used, per the vendor | Not used, per the vendor | Cloudflare: "does not collect or use your visitors' personal data" |
| Consent banner for EU/UK visitors | Generally needed for analytics cookies | The usual reason to choose it is avoiding one; confirm with counsel | Same as Plausible | Same |
| Custom events and parameters | Yes; each parameter must be registered as a custom dimension before it shows in reports | Yes ("goals" plus custom properties) | Yes (event data) | No |
| Funnels | Free-form explorations | Funnels, depending on plan | Funnels and retention reports | No |
| Cost and hosting | Free, Google-hosted | Paid hosted, or self-hosted Community Edition | Free self-hosted (it could run on the same Coolify), or Umami Cloud | Free, already running |
| Data leaves to | Google | Plausible (EU-hosted, per the vendor) or your own server | Your own server, if self-hosted | Cloudflare |

Trade-off in one line: GA4 is free and the most capable, but it sets cookies, so
honest EU/UK use needs a consent banner, and a banner lowers the counts.
Plausible and Umami count less but are designed to need no banner. Self-hosted Umami
also keeps the data on Argumend's own server. Before relying on any vendor claim in
this table, check that vendor's current documentation; none of them was verified
beyond the pages cited.

## Turning it on in Coolify

All of these are read **at build time**. The root layout and the CSP header are fixed
when the site is built, so set each one as a **build variable** in Coolify (tick "Is
Build Variable?" for that variable) and redeploy. A runtime-only variable does
nothing. The Dockerfile declares an `ARG` for each one, and
`lib/analyticsConfig.test.ts` fails if a new variable is added without one.

**Google Analytics 4**
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX     # GA Admin → Data streams → Web → Measurement ID
# NEXT_PUBLIC_ANALYTICS_PROVIDER=ga            # optional: a GA ID alone already selects GA
```
Then, in GA Admin → Custom definitions, register these event-scoped custom dimensions
so the parameters appear in reports: `topicId`, `topicKind`, `cruxIndex`, `percent`,
`result`, `lengthBucket`, `contentType`, `surface`, `resultsBucket`, `platform`.
Optionally mark `first_crux_seen`, `evidence_expand` and `paste_submit` as key events.

**Plausible**
```
NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible
NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC=https://plausible.io/js/pa-XXXXXXXX.js   # copy from Site settings → Site installation
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=argumend.org      # only for the legacy https://plausible.io/js/script.js snippet
```
In Plausible, add each event name you want reported as a custom-event goal
(`topic_view`, `first_crux_seen`, `evidence_expand`, `paste_submit`, `paste_result`,
`search_used`, `share_click`, `diagram_view`, `scroll_depth`), and allow the custom
properties `topicId`, `result`, `percent` and `surface`. This code was written against
Plausible's published docs and has not been tested against a live Plausible site.
Check that events arrive after the first deploy.

**Umami**
```
NEXT_PUBLIC_ANALYTICS_PROVIDER=umami
NEXT_PUBLIC_UMAMI_SCRIPT_SRC=https://<your-umami-host>/script.js   # or https://cloud.umami.is/script.js
NEXT_PUBLIC_UMAMI_WEBSITE_ID=<website UUID from Umami settings>
```
The loader adds `data-exclude-search="true"`, so Umami never records query strings.

**Turning analytics off** without removing the ID: `NEXT_PUBLIC_ANALYTICS_PROVIDER=none`.

**Checking it worked:** run `curl -sI https://argumend.org/ | grep -i content-security`.
For Plausible or Umami, the provider's origin should appear in `script-src` and
`connect-src`. Then open the site with the browser devtools Network tab open: GA sends
`collect?…` requests, Plausible and Umami send `/api/event` or `/api/send`. In GA, the
Realtime report should show `page_view` and `topic_view` within a minute.

## Google Search Console

```
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<token>   # build variable
```
This is the token from Search Console's "HTML tag" method: the `content` value of the
`<meta name="google-site-verification" …>` tag Search Console shows you. With it set,
every page emits that tag (`siteVerificationMetadata()` in `lib/analyticsConfig.ts`).

The alternative is a **Domain property**, verified with a DNS TXT record in Cloudflare.
It needs no deploy, and it covers `www`, http and https in one property. Either method
works, and the meta tag can be removed once verification succeeds, as long as the DNS
record or another method stays in place.

## The first dashboard: five numbers, weekly

Read these at the same time each week, for the previous 7 days.

1. **Visits.** Unique visitors and sessions. Read it today from Cloudflare Web
   Analytics; once a provider is on, read it there (GA: Reports → Acquisition →
   Users; Plausible/Umami: the top of the dashboard). Expect Cloudflare and the
   provider to disagree: they count differently and are blocked by different
   extensions.
2. **% reaching the first crux** = `first_crux_seen` ÷ `topic_view`. This is the
   share of map views where the reader got to what the map is about. Use event
   counts, since both events fire once per page view.
3. **% expanding evidence** = page views with an `evidence_expand` ÷ `topic_view`.
   `evidence_expand` fires once per crux, so divide by users or sessions rather than
   raw counts: in GA, "Active users" for the event over "Active users" for
   `topic_view`; in Plausible, the goal's conversion rate.
4. **Paste submissions and match rate.** The count of `paste_submit`, then
   `paste_result` with `result = match` ÷ all `paste_result` except `error`. Watch
   `closest` and `no_match` alongside it: a growing `no_match` share points to
   subjects the library does not cover yet.
5. **Top maps.** `topic_view` broken down by `topicId` (or page views for
   `/topics/*`), top ten. Set it beside 2 and 3: a map that many people open but few
   read to its first crux is the one to fix first.

Two numbers to add once there is enough traffic: the 75% `scroll_depth` share per
map (who reads to the end), and `search_used` with `resultsBucket = 0` (searches
that found nothing, which point to missing maps).

This is separate from the server-side `gap_observations` metric
(`docs/GAP_METRIC.md`). That metric counts map-reply and diagnosis outcomes in the
database and needs no analytics provider.
