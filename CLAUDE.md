# CLAUDE.md — Argumend

AI-powered argument mapping platform. Visualizes controversial topics as interactive graphs showing positions, evidence, cruxes, and fallacies.

## Quick Start

```bash
bun install          # install deps (uses bun.lock)
bun dev              # dev server at localhost:3000
bun run build        # production build (standalone output)
bun test             # run vitest tests
bun run lint         # eslint
bun run db:generate  # generate drizzle migrations
bun run db:push      # push schema to postgres
bun run db:studio    # open drizzle studio
```

No API keys or database needed for local dev — the app runs offline by default with static data from `data/`.

## Tech Stack

- **Framework:** Next.js 16+ (App Router), React 19, TypeScript (strict)
- **Package manager:** Bun (`bun --bun` for scripts, `bun.lock`)
- **Styling:** Tailwind CSS 3, CSS custom properties in `globals.css`, Framer Motion
- **Graph visualization:** React Flow (`@xyflow/react`) — the core interactive canvas
- **Database:** PostgreSQL via Drizzle ORM + `postgres` driver
- **Auth:** NextAuth v5 beta with Google OAuth, DrizzleAdapter
- **AI providers:** Anthropic SDK, OpenAI, Google Generative AI
- **Testing:** Vitest + happy-dom, `@testing-library/react`
- **Deployment:** Docker (Bun builds, Node.js runs) or nixpacks on Coolify
- **Path alias:** `@/*` maps to project root

## Project Structure

```
app/                    # Next.js App Router pages
  api/                  # API routes (analyze, debate, judge, auth, etc.)
  topics/[id]/          # Topic detail pages
  analyses/, analyze/   # Analysis pages
  blog/, guides/, explore/, about/  # Content pages
components/             # React components
  HomeClient.tsx        # Main canvas — React Flow graph viewer
  nodes/                # Custom React Flow nodes (RichNode, EvidenceNode, MetaNode)
  Sidebar.tsx, TopBar.tsx, Footer.tsx  # Shell components
hooks/
  useLogicGraph.ts      # Core state management (Zustand store) — graph nodes/edges
  useDebateOrchestrator.ts  # Debate session state
lib/
  analyze/              # Argument extraction (offline.ts for static, extractor.ts for live)
  debate/               # Debate generation
  judge/                # Multi-model judge council
  agents/               # AI agent orchestration (cruxtacean, etc.)
  db/                   # Database: schema.ts, queries.ts, index.ts (lazy init)
  schemas/              # Zod validation schemas for topics
  constants.ts          # Centralized magic numbers and config
data/                   # Static content
  topics.ts, topics/    # 109+ pre-analyzed topic datasets (~500KB)
  blog.ts, guides.ts    # Blog posts, educational guides
  logicBlueprint.ts     # Graph layout blueprints
types/                  # TypeScript type definitions (graph.ts, logic.ts, debate.ts)
drizzle/                # Migration files
```

## Key Conventions

### Database Access

Always use `getDb()` (lazy initialization), never import `db` directly. This prevents crashes when the database is unreachable:

```ts
import { getDb } from "@/lib/db";
const db = getDb(); // throws if unavailable, but doesn't crash at import time
```

### Runtime Feature Flags

Set via environment variables. All default to off (offline mode):

- `ENABLE_LIVE_ANALYZE_API=true` — live argument extraction via AI
- `NEXT_PUBLIC_ENABLE_LIVE_DEBATE_API=true` — live debate generation
- `NEXT_PUBLIC_ENABLE_LIVE_JUDGING_API=true` — live multi-model judging

### Dynamic Imports

Heavy components are loaded with `next/dynamic` to reduce initial bundle size. The `data/topics.ts` module (~500KB) is lazy-loaded in `useLogicGraph.ts`.

### Database Schema

Schema at `lib/db/schema.ts`. Drizzle config reads `.env.local` for `DATABASE_URL`. Key tables:

- `analyses` — extracted positions, cruxes, fallacies (jsonb columns)
- `debates`, `debate_rounds` — multi-round AI debates
- `judgments`, `judge_verdicts` — multi-model judge council results
- `users`, `accounts`, `sessions` — NextAuth auth tables
- `saved_topics`, `topic_subscriptions`, `topic_views`, `newsletters`

### Auth

NextAuth v5 beta with Google OAuth. Auth middleware is currently disabled in `middleware.ts`. The auth system degrades gracefully — falls back to JWT sessions when the database is unavailable.

## Design System

Stoic/parchment aesthetic inspired by LessWrong.

### Typography
- **Serif:** EB Garamond (`--font-serif`) — headings, body prose
- **Sans:** Plus Jakarta Sans (`--font-sans`) — UI elements, labels

### Color Palette
- Canvas background: `#f4f1eb` (light), `#1a1917` (dark)
- Deep teal: `#3a6965` — primary accent, evidence nodes, high-confidence scores
- Rust: `#C4613C` — CTAs, proponent side, mid-confidence. **Never use amber/tangerine.**
- Brown: `#8B5A3C` — skeptic side, low-confidence
- Crux crimson: `#a23b3b` — crux highlights
- Stone grays for text: primary `#3d3a36`, secondary `#564d45`, muted `#7a7068`

### Dark Mode
Toggle via `class` strategy on `<html>`. CSS custom properties (`--bg-canvas`, `--text-primary`, etc.) defined in `globals.css` under `:root` and `.dark`. Use Tailwind `dark:` classes or CSS variables.

### Component Classes
Utility classes defined in `globals.css`: `.surface-card`, `.surface-paper`, `.btn-*`, `.card-hover`, `.link-underline`.

## Deployment

Production uses standalone Next.js output. The Dockerfile uses Bun for install/build but Node.js 20 as the runner (Bun's ReadableStream breaks Next.js RSC streaming). Same approach in `nixpacks.toml` for Coolify deployments.

Security headers (CSP, HSTS, X-Frame-Options) are configured in `next.config.js`. The site is canonical at `argumend.org` with www-to-non-www redirects.

## Environment Variables

See `.env.example`. Key variables:

- `DATABASE_URL` — Postgres connection string
- `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `GOOGLE_AI_API_KEY` — AI providers
- `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` — NextAuth
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — Google Analytics

Local env files go in `.env.local` (gitignored).
