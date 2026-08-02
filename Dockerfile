# Build with Bun; run the traced Next.js standalone server on Node.js 20.
FROM oven/bun:1.3.14 AS base
ENV NEXT_TELEMETRY_DISABLED=1

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Client-visible flags are intentionally build arguments. They are public and
# must never be used for provider keys or other secrets.
ARG NEXT_PUBLIC_ENABLE_AUTH=false
ARG NEXT_PUBLIC_ENABLE_LIVE_ANALYZE_API=false
ARG NEXT_PUBLIC_ENABLE_LIVE_DEBATE_API=false
ARG NEXT_PUBLIC_ENABLE_LIVE_JUDGING_API=false
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID=
ENV NEXT_PUBLIC_ENABLE_AUTH=$NEXT_PUBLIC_ENABLE_AUTH \
    NEXT_PUBLIC_ENABLE_LIVE_ANALYZE_API=$NEXT_PUBLIC_ENABLE_LIVE_ANALYZE_API \
    NEXT_PUBLIC_ENABLE_LIVE_DEBATE_API=$NEXT_PUBLIC_ENABLE_LIVE_DEBATE_API \
    NEXT_PUBLIC_ENABLE_LIVE_JUDGING_API=$NEXT_PUBLIC_ENABLE_LIVE_JUDGING_API \
    NEXT_PUBLIC_GA_MEASUREMENT_ID=$NEXT_PUBLIC_GA_MEASUREMENT_ID
# The package build script also assembles standalone assets for bare-metal
# runtimes. Docker copies them explicitly below, avoiding duplicate layers.
RUN bun --bun next build

# Production image — use Node.js for the runner because Next.js standalone
# server.js relies on Node.js streaming APIs for RSC. Bun's incomplete
# ReadableStream support causes "Connection closed" errors that prevent
# client component hydration on every page.
FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Create non-root user
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs nextjs

# Copy built assets
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/api/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"]

STOPSIGNAL SIGTERM

CMD ["node", "server.js"]
