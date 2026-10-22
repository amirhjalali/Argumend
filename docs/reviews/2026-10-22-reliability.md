# Reliability review, 2026-10-22

Work branch: `codex/reliability-20261022`, based on `9ecfc38`.
Integration worktree: `/tmp/argumend-reliability-20261022`.
The original checkout and its existing work remain untouched. No branch was
pushed or merged, no site was deployed, and no live database or model provider was
used. Environment files and credentials were not read or copied.

This record is being updated through the final integration checks. Intermediate
checkpoints below identify the revision they actually tested.

## Confirmed fixes

### Reports, graph correctness, and publication

- Model JSON parsing respects quoted braces, whole arrays, and explicit JSON
  fences. Invalid authoritative payloads do not silently become a nested object.
- Graph schemas reject duplicate identities and dangling endpoints. Generated
  duplicate relations no longer count twice. Scoring ignores superseded nodes,
  treats contradiction direction consistently, and is invariant to duplicate
  assertions of the same relation.
- Nonconvergent influence calculations retain an explicit diagnostic after the
  existing iteration policy is exhausted. The numerical policy is unchanged.
- Participant identifiers and quote attribution stay aligned through
  normalization. Ambiguous duplicate model identifiers are rejected for repair;
  valid cross-kind identifiers remain supported. Dropped positions do not leave
  optional references pointing at nonexistent report positions.
- The generated question identity is reserved, and the required source-only
  disclaimer fits within the existing caveat limits.
- Argument views retain challenges to reasoning and exclude retired objections.
  Diagram evidence labels identify the side of the map question they address.
- Publication receipts and deletion receipts are validated before confirming
  success or discarding management tokens. Blocked browser storage preserves the
  current visit's management token. Feedback validates its target and receipt,
  keeps retry usable, and saves written corrections explicitly.
- Report reads validate stored data; deleted reports are excluded. Public report
  images use `no-store`. Publication retries only a recognized slug collision.
  Provider and database diagnostics avoid private text and configurable judge
  identifiers.

### Request lifecycle and persistence

- Paste and map-reply clients abort abandoned requests and ignore late results.
  Map-reply response validation covers the nested fields its view consumes.
- Diagnosis, map reply, debate streaming, nonstreaming debate, and judging carry
  cancellation into their provider work. Later stages and retries do not start
  after cancellation. Deadline checks reject late provider success even if a
  provider ignored its abort signal.
- Grok streaming handles SSE framing across chunk boundaries, newline variants,
  multiline data, UTF-8 boundaries, and final frames. Reader cancellation closes
  the response and releases upstream resources.
- Saved-topic sync, follow controls, and newsletter signup reject malformed
  receipts and duplicate mutations. Follow responses belong to the current
  topic. Authentication outages return controlled API errors.
- Linked judgments require debate ownership. Offline judgments remain usable
  without persistence. Debate persistence validates JSON and UUIDs and handles
  unavailable authentication or storage explicitly.
- Moltbook responses validate their envelope and HTTP outcome before entering
  the app's typed route handlers.

### Browser behavior

- Nested modals share keyboard and pointer ownership, restore focus in order,
  and release the page scroll lock. Resizing an embed across the rail breakpoint
  does not retain an invisible modal. Menu-to-search handoff returns focus to a
  persistent header control.
- Search keeps clear/close controls usable at 320px and respects IME input.
- Removing a saved map moves keyboard focus to the next useful control. Failed
  storage writes preserve the existing saved state.
- Clipboard fallback preserves focus and selection and offers manual copying
  when copying fails. Success is announced only after copying succeeds.
- Homepage paste handoff works through temporary browser memory when session
  storage refuses a write. A consumed handoff is not replayed later in the same
  application session if storage also refuses removal.

## Verification checkpoints

All repository gates ran in isolated worktrees through package scripts.

| Revision / checkout | Command | Exit | Result |
| --- | --- | --- | --- |
| Initial baseline | `bun run test:ci` | 0 | 264 files, 3,198 tests |
| `684aac4` integration | `bun run test:ci` | 0 | 285 files, 3,558 tests |
| `684aac4` integration | `bun run lint` | 0 | Zero warnings |
| `684aac4` integration, after build | `bun run typecheck` | 0 | Passed |
| `684aac4` integration | Clean environment build, below | 0 | Production standalone assembled |
| `684aac4` integration | Clean environment smoke, below | 0 | Health, home, assets, API v1, offline analysis, debate, judging |
| `684aac4` integration | Clean environment E2E, below | 0 | 72 passed, 4 intentional skips |
| `d4183ef` integration | `bun run test:ci` | 0 | 287 files, 3,605 tests |
| `d4183ef` integration | `bun run lint` | 0 | Zero warnings |
| `d4183ef` integration | `bun run typecheck` | 0 | Passed |
| `a557aa2` integration | Clean environment offline evaluation, below | 0 | 48/48 fixtures |
| `a557aa2` integration | Clean environment fake corpus, below | 0 | 159/159 completed; smoke coverage, not model quality |

Exact production and evaluation commands (run from the integration worktree):

```sh
env -i PATH="$PATH" HOME="$HOME" TMPDIR="$TMPDIR" NEXT_TELEMETRY_DISABLED=1 bun run build
env -i PATH="$PATH" HOME="$HOME" TMPDIR="$TMPDIR" NEXT_TELEMETRY_DISABLED=1 PORT=3328 HOSTNAME=127.0.0.1 bun run start
env -i PATH="$PATH" HOME="$HOME" TMPDIR="$TMPDIR" NEXT_TELEMETRY_DISABLED=1 bun run smoke:standalone
env -i PATH="$PATH" HOME="$HOME" TMPDIR="$TMPDIR" NEXT_TELEMETRY_DISABLED=1 CI=1 E2E_BASE_URL=http://127.0.0.1:3328 E2E_CHROMIUM_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" bun run test:e2e
env -i PATH="$PATH" HOME="$HOME" TMPDIR="$TMPDIR" NEXT_TELEMETRY_DISABLED=1 bun run eval:disagreement
env -i PATH="$PATH" HOME="$HOME" TMPDIR="$TMPDIR" NEXT_TELEMETRY_DISABLED=1 bun run corpus:disagreement --provider fake --include-legacy
```

The start command is a long-running local server, not a completed gate. Servers
are stopped deliberately between builds. Sandbox restrictions initially blocked
Next.js local port access and the `tsx` IPC socket; those attempts exited 1. The
same commands passed with approved local process access and unchanged product
configuration. One concurrent typecheck exited 2 because the build removed its
generated `.next/types` inputs; its sequential rerun passed.

Browser corpus checks used the package's E2E command with a task-specific config
under `/tmp/argumend-reliability-corpus-audit-20261022`. The first run exited 0:
159 topic pages with every disclosure open at 320px in each theme, and 156 desktop
diagrams measured for fit and overlap. Console errors and third-party requests
were forbidden. An earlier local HTML crawl checked 845 pages and found no broken
internal links, missing anchors, or main-heading/landmark issues.

```sh
env -i PATH="$PATH" HOME="$HOME" TMPDIR="$TMPDIR" NEXT_TELEMETRY_DISABLED=1 CI=1 bun run test:e2e -c /tmp/argumend-reliability-corpus-audit-20261022/playwright.config.ts
```

## Compatibility with existing work

Two separate compatibility checkouts projected the original uncommitted work,
excluding all environment files and unrelated scratch/research material. The
second checkpoint, `/tmp/argumend-reliability-compat2-20261022`, includes `bbc1e4e`,
the webhook deadline fix, and the modal import contract correction. Its results:

- `bun run test:ci`: exit 0, 288 files, 3,600 tests.
- `bun run typecheck`: exit 0.
- `bun run lint`: exit 0, zero warnings.
- Clean environment `bun run build`: exit 0.
- Clean environment `SMOKE_PORT=3331 bun run smoke:standalone`: exit 0.
- Clean environment E2E with `E2E_PORT=3330` and installed Chrome: exit 0,
  78 passed, 4 intentional skips.
- `git diff --check -- . ':(exclude).env*' ':(exclude)**/.env*'`: exit 0.

README and PasteClient conflict resolutions preserve both sets of behavior.
The user's AI map reaches the newly reported nonconvergence condition. Only the
corresponding `cycleWarnings` metadata needs a fixture update; recursive comparison
confirmed every numeric value and other field is unchanged. The small supplemental
patch is `/tmp/argumend-reliability-compat2-20261022-warning-only.patch`. User work
remains uncommitted in the compatibility checkout.

## Limits

- Real provider and database behavior, production authentication sessions, and
  deployment proxy topology were not exercised. Their boundaries use mocked
  contract and failure tests.
- Cancellation prevents future work; it cannot roll back a database operation
  that was already dispatched.
- Browser memory fallback lasts for the current document. It cannot guarantee
  deletion of stale persisted data across a reload if the browser refuses removal.
- New `no-store` responses do not purge an image cached previously by an external
  service. No external cache was changed.
- Historical duplicate database feedback rows were not migrated or deleted.
- Nonconvergence is retained in quality diagnostics; the scoring formula and
  current default public UI remain unchanged.
