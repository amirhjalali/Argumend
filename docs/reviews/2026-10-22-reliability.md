# Reliability review, 2026-10-22

Work branch: `codex/reliability-20261022`, based on `9ecfc38`.
Integration worktree: `/tmp/argumend-reliability-20261022`.
The original checkout and its existing work remain untouched. No branch was
pushed or merged, no site was deployed, and no live database or model provider was
used. Environment files and credentials were not read or copied.

The final runtime revision is `0a3250c`. Subsequent changes only complete this
record, the file inventory, and README wording. Checkpoints below identify the
revision they actually tested.

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
- Generated introductions, consequences, questions, and diagnostics stay within
  their schema limits while retaining complete source assertions. Exact claim
  aliases preserve their references; claims with different attribution or
  stances remain distinct. Fallback stakes receive unique identities.
- When exact claim aliases merge, a relation between those aliases no longer
  becomes an invented self-loop that removes the graph and its cruxes. Genuine
  original self-dependencies and cycles still reach graph validation. Relation
  normalization also preserves the caller's raw extraction.
- Private diagnosis validation retains grounded quotations beyond the public
  report's combined `1_500` character cap. Publication and stored public reads
  continue to enforce that cap, including an inclusive boundary test.
- Repeated quotation references no longer inflate grounding coverage within a
  report object or stake. Accounting preserves case distinctions used by the
  quote matcher and counts whitespace or punctuation variants matching the same
  source span once. Distinct source spans and participant assessments remain
  distinct. Tests demonstrate that repetition cannot turn insufficient grounding
  into publication eligibility.
- Generated repair diagnostics use positions, counts, and fixed rule names.
  A participant label such as "Critical Rationalist" no longer becomes an
  accidental publication severity marker. Existing critical-warning blocks
  remain intact. Canonical participant aliases do not repeat bylines or
  identical stance rows; distinct stance wording and position references remain.
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
- Map-reply failure logs retain request IDs, stable codes, lengths, and timing,
  without provider error text that can echo a private answer identifier.

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
  the app's typed route handlers. Post and comment identifiers are encoded as
  individual URL path segments.
- Topic and worksheet registries reject inherited object keys. The worksheet
  and draft-topic guards protect direct renderers and loader callers; the
  existing proxy already returns `404` for those unknown public routes.
- Malformed percent encoding in the public topic JSON, social-image, and
  verdict-card API paths returns `400` before Next.js route decoding can fail.
  Valid paths retain their handlers, and JSON API error responses retain CORS.

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
- Desktop diagrams show a polite loading status before hydration and while the
  canvas downloads. Phone outlines remain server-rendered. A production browser
  regression delays the canvas chunk to verify both the pending and ready states.
- Existing theme tokens improve active input hints, pagination labels, and
  newsletter confirmation text. Four browser cases measure the rendered colors
  on solid surfaces in both themes at desktop and phone sizes. Newsletter
  success is mocked in the browser, with no real subscription request.

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
| `dfa83d4` integration | `bun run test:ci` | 0 | 289 files, 3,632 tests |
| `dfa83d4` integration | `bun run lint` | 0 | Zero warnings |
| `dfa83d4` integration | `bun run typecheck` | 0 | Passed |
| `dfa83d4` integration | Clean environment build, below | 0 | Unchanged retry after intermittent copying failure |
| `dfa83d4` integration | Clean environment smoke, below | 0 | Offline standalone passed |
| `dfa83d4` integration | Clean environment E2E, below | 0 | 72 passed, 4 intentional skips |
| `85c369c` integration | `bun run test:ci` | 0 | 290 files, 3,675 tests |
| `85c369c` integration | `bun run lint` | 0 | Zero warnings |
| `85c369c` integration | `bun run typecheck` | 0 | Passed |
| `85c369c` integration | Clean environment build with pinned Bun `1.3.14` | 0 | Production standalone assembled |
| `85c369c` integration | Clean environment smoke, below | 0 | Offline standalone passed |
| `85c369c` integration plus `eded406` HTTP tests | Clean environment E2E, below | 0 | 78 passed, 5 intentional skips |
| `50a86d0` integration | `bun run test:ci` | 0 | 295 files, 3,714 tests |
| `50a86d0` integration | `bun run lint` | 0 | Zero warnings |
| `50a86d0` integration | `bun run typecheck` | 0 | Passed |
| `50a86d0` integration | Clean environment build with pinned Bun `1.3.14` | 0 | Production standalone assembled |
| `50a86d0` integration | Clean environment smoke, below | 0 | Offline standalone passed |
| `50a86d0` integration | Clean environment E2E, below | 0 | 82 passed, 5 intentional skips |
| `50a86d0` integration | Clean environment offline evaluation, below | 0 | 48/48 fixtures |
| `50a86d0` integration | Clean environment fake corpus, below | 0 | 159/159 completed; smoke coverage, not model quality |
| Final runtime `0a3250c` | `bun run test:ci` | 0 | 296 files, 3,723 tests |
| Final runtime `0a3250c` | `bun run lint` | 0 | Zero warnings |
| Final runtime `0a3250c` | `bun run typecheck` | 0 | Passed |
| Final runtime `0a3250c` | Clean environment build with pinned Bun `1.3.14` | 0 | Production standalone assembled |
| Final runtime `0a3250c` | Clean environment smoke, below | 0 | Offline standalone passed |
| Final runtime `0a3250c` | Clean environment E2E, below | 0 | 82 passed, 5 intentional skips |
| Final runtime `0a3250c` | Clean environment offline evaluation, below | 0 | 48/48 fixtures |
| Final runtime `0a3250c` | Clean environment fake corpus, below | 0 | 159/159 completed; smoke coverage, not model quality |
| `a557aa2` integration | Clean environment offline evaluation, below | 0 | 48/48 fixtures |
| `a557aa2` integration | Clean environment fake corpus, below | 0 | 159/159 completed; smoke coverage, not model quality |

Exact final production and evaluation commands (run from the integration worktree):

```sh
env -i PATH="/tmp/argumend-reliability-bun-20261022/bun-darwin-aarch64:$PATH" HOME="$HOME" TMPDIR="$TMPDIR" NEXT_TELEMETRY_DISABLED=1 bun run build
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
Earlier builds used `PATH="$PATH"` with the installed runtime. The five final E2E
skips are layout-specific: three desktop-canvas cases do not apply to phones,
and two phone-only paste/search cases do not apply to desktop.

Browser corpus checks used the package's E2E command with a task-specific config
under `/tmp/argumend-reliability-corpus-audit-20261022`. The first run exited 0:
159 topic pages with every disclosure open at 320px in each theme, and 156 desktop
diagrams measured for fit and overlap. Console errors and third-party requests
were forbidden. An earlier local HTML crawl checked 845 pages and found no broken
internal links, missing anchors, or main-heading/landmark issues.
Subsequent browser checks also passed for all 156 phone diagrams at 320px in dark
mode and for core flows at 320px and 1440px with both browser storage getters
throwing. Those flows covered the homepage paste handoff, honest saved-map
failure feedback, diagram rendering, and search focus restoration.

```sh
env -i PATH="$PATH" HOME="$HOME" TMPDIR="$TMPDIR" NEXT_TELEMETRY_DISABLED=1 CI=1 bun run test:e2e -c /tmp/argumend-reliability-corpus-audit-20261022/playwright.config.ts
env -i PATH="$PATH" HOME="$HOME" TMPDIR="$TMPDIR" NEXT_TELEMETRY_DISABLED=1 CI=1 bun run test:e2e -c /tmp/argumend-reliability-corpus-audit-20261022/playwright.config.ts -g "every phone diagram"
env -i PATH="$PATH" HOME="$HOME" TMPDIR="$TMPDIR" NEXT_TELEMETRY_DISABLED=1 CI=1 bun run test:e2e -c /tmp/argumend-reliability-corpus-audit-20261022/playwright.config.ts -g "core flows survive"
```

A deterministic projection check at `73d84fa` passed 500 combinations of
schema-valid extraction variations through report projection, report validation,
reference checks, and graph construction. It used
`bun run test:ci output/reliability-projection-combinations.test.ts`, exit 0.
The temporary test was removed from the worktree after execution; its source is
retained at `/tmp/argumend-reliability-projection-combinations-20261022.ts`.
An initial harness attempt exited 1 because its fixture text was below the
pipeline's minimum length. Correcting that fixture required no product change.

The contrast audit measured 5,808 text samples across 24 route, theme, and viewport
combinations. Targeted regressions cover the changed solid-surface hints and
status text at a contrast ratio of at least `4.5`. This is targeted contrast
coverage, not a claim of complete accessibility conformance. The threshold comes
from [WCAG contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

## Change inventory

The complete [file inventory](./2026-10-22-reliability-files.txt) lists 170 paths
relative to `9ecfc38`, including 90 test files. The unit and component suite grew
from 3,198 to 3,723 cases, a net increase of 525, across 296 files. New tests cover
cancellation and late results, typed API receipts, privacy in failure logging,
publication and private-report boundaries, graph and grounding invariants,
modal ownership, keyboard focus, storage failures, malformed public API paths,
diagram loading, and text contrast.

Independent final reviewers inspected API lifecycle, ownership, persistence,
privacy, report schemas, grounding accounting, and alias interactions. That review
found and corrected an integration regression where a duplicate claim alias
created a self-loop and removed an otherwise valid five-node graph with two
cruxes. Nine permanent cases now exercise that boundary. A second reviewer
checked the correction independently. The review also narrowed README's deadline
description to distinguish diagnosis/map-reply `504` responses from the existing
debate/judging fallback policy. These reviews do not substitute for the live
provider and database checks listed as untested below.

## Compatibility with existing work

Four separate compatibility checkouts projected the original uncommitted work,
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

The third checkpoint, `/tmp/argumend-reliability-compat3-20261022`, includes
`7f5c285` and the test-only `dfa83d4` change. Final results:

- `bun run test:ci`: exit 0, 292 files, 3,675 tests.
- `bun run typecheck`: exit 0.
- `bun run lint`: exit 0, zero warnings.
- Clean environment `bun run build`: initial exit 1 from intermittent standalone
  copying `EBADF`, identical unchanged retry exit 0.
- Clean environment `SMOKE_PORT=3331 bun run smoke:standalone`: exit 0.
- Clean environment E2E with `E2E_PORT=3330` and installed Chrome: exit 0,
  78 passed, 4 intentional skips.
- `git diff --check -- . ':(exclude).env*' ':(exclude)**/.env*'`: exit 0.

One additional test passes the genuinely grounded private diagnosis exceeding
`1_500` quoted characters through the user's new `PasteDiagnosisResponseSchema`.
It verifies exact report and graph preservation, alongside the public cap tests.
Its supplemental patch is
`/tmp/argumend-reliability-compat3-20261022-private-diagnosis-schema-test-only.patch`.

The fourth checkpoint, `/tmp/argumend-reliability-compat4-20261022`, integrates
runtime revision `50a86d0` as local `339b846`. Before the uncommitted user changes,
its committed tree exactly matches the integration tree
`bd6e95a65d7c61fa9441d1743071b0f9aad860ee`. Results with the projected user work:

- `bun run test:ci`: exit 0, 298 files, 3,757 tests.
- `bun run typecheck`: exit 0.
- `bun run lint`: exit 0, zero warnings.
- Clean environment `bun run build` with pinned Bun `1.3.14`: exit 0 on its first attempt.
- Clean environment `SMOKE_PORT=3331 bun run smoke:standalone`: exit 0.
- Clean environment production E2E with `E2E_PORT=3330` and installed Chrome:
  exit 0, 88 passed, 5 intentional skips. All four new contrast cases passed
  alongside the user's topic search changes.

These checks validate the combined work without committing the user's changes or
modifying the original checkout. Compatibility conflict resolutions are retained
in the isolated checkout for a later integration decision.

The same fourth checkout then integrated the final alias fix, `0a3250c`, as local
`bf7ba06`. Its committed tree matched
`1ccd3d78b9a85c4a89b1effba5df7725978ea02d` before projected user changes. Final
verification with that user work:

- `bun run test:ci`: exit 0, 299 files, 3,766 tests.
- `bun run typecheck`: exit 0.
- `bun run lint`: exit 0, zero warnings.
- Pinned clean environment `bun run build`: initial exit 1 from the standalone
  copy failure described below; identical unchanged retry exit 0.
- Clean environment `SMOKE_PORT=3331 bun run smoke:standalone`: exit 0.
- Clean environment production E2E with `E2E_PORT=3330` and installed Chrome:
  exit 0, 88 passed, 5 intentional skips.

Exact final compatibility commands, run from that worktree:

```sh
env -i PATH="/tmp/argumend-reliability-bun-20261022/bun-darwin-aarch64:$PATH" HOME="$HOME" TMPDIR="$TMPDIR" NEXT_TELEMETRY_DISABLED=1 bun run test:ci
env -i PATH="/tmp/argumend-reliability-bun-20261022/bun-darwin-aarch64:$PATH" HOME="$HOME" TMPDIR="$TMPDIR" NEXT_TELEMETRY_DISABLED=1 bun run lint
env -i PATH="/tmp/argumend-reliability-bun-20261022/bun-darwin-aarch64:$PATH" HOME="$HOME" TMPDIR="$TMPDIR" NEXT_TELEMETRY_DISABLED=1 bun run typecheck
env -i PATH="/tmp/argumend-reliability-bun-20261022/bun-darwin-aarch64:$PATH" HOME="$HOME" TMPDIR="$TMPDIR" NEXT_TELEMETRY_DISABLED=1 bun run build
env -i PATH="/tmp/argumend-reliability-bun-20261022/bun-darwin-aarch64:$PATH" HOME="$HOME" TMPDIR="$TMPDIR" NEXT_TELEMETRY_DISABLED=1 SMOKE_PORT=3331 bun run smoke:standalone
env -i PATH="/tmp/argumend-reliability-bun-20261022/bun-darwin-aarch64:$PATH" HOME="$HOME" TMPDIR="$TMPDIR" NEXT_TELEMETRY_DISABLED=1 CI=1 E2E_PORT=3330 E2E_CHROMIUM_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' bun run test:e2e
git diff --check -- . ':(exclude).env*' ':(exclude)**/.env*'
```

The final comparison, exact command exits, source hashes, and unchanged-main
verification are retained in
`/tmp/argumend-reliability-compat4-20261022-final2-source-comparison.json`.
No user work was staged or committed. Both compatibility server ports were
closed after verification.

## Build runtime investigation

The installed Bun is `1.3.6`; the repository, CI, and Docker pin `1.3.14`.
Two separate checkouts encountered an intermittent `EBADF` while Next.js copied
edge chunks into the standalone directory under `1.3.6`. Both identical retries
passed with no source or configuration changes.

The final compatibility build also encountered `EBADF` under verified Bun
`1.3.14`, while copying an `@vercel/og` resvg WASM chunk after successful compile,
typechecking, and 1,379 prerendered pages. The first attempt exited 1. The pinned
runtime therefore does not eliminate this intermittent failure. No application
or build configuration workaround was introduced. An identical unchanged retry
exited 0, then standalone smoke and production browser checks both passed.

The official macOS ARM64 `1.3.14` archive was downloaded into
`/tmp/argumend-reliability-bun-20261022`. Its SHA256,
`d8b96221828ad6f97ac7ac0ab7e95872341af763001e8803e8267652c2652620`,
matches both official release metadata and the checksum manifest. The unchanged
third compatibility checkout built and passed standalone smoke with this
temporary runtime, exits 0. The global runtime remains unchanged.

```sh
env -i PATH="/tmp/argumend-reliability-bun-20261022/bun-darwin-aarch64:$PATH" HOME="$HOME" TMPDIR="$TMPDIR" NEXT_TELEMETRY_DISABLED=1 bun run build
env -i PATH="/tmp/argumend-reliability-bun-20261022/bun-darwin-aarch64:$PATH" HOME="$HOME" TMPDIR="$TMPDIR" NEXT_TELEMETRY_DISABLED=1 SMOKE_PORT=3331 bun run smoke:standalone
```

Successful pinned-runtime builds do not establish the cause of the intermittent
failure. Details and exact commands are retained in
`/tmp/argumend-reliability-bun-20261022/verification.json`. The official release is
<https://github.com/oven-sh/bun/releases/tag/bun-v1.3.14>.

Upstream review located the traced-file packaging calls in
[Next.js](https://github.com/vercel/next.js/blob/v16.2.12/packages/next/src/build/utils.ts)
and the Darwin copy implementation in
[Bun](https://github.com/oven-sh/bun/blob/bun-v1.3.14/src/runtime/node/node_fs.zig#L3544-L3639).
It did not establish which native operation failed or identify a confirmed
matching upstream bug. Runtime attribution remains unverified.

A bounded copy probe on Darwin `25.6.0 arm64` compared Bun
`1.3.14+0d9b296af` and Node `v22.11.0` using the same `1,378,357` byte public WASM
file. Each runtime completed 200 copies at concurrency 10: ten fresh-destination
rounds and ten overwrite rounds. All 200 hashes matched for each runtime, with
zero failures. This did not reproduce the error outside the full build and does
not exclude a workload-dependent failure.

The probe used temporary package scripts in
`/tmp/argumend-reliability-slug-contract-20261022`, both exit 0:

```sh
/tmp/argumend-reliability-bun-20261022/bun-darwin-aarch64/bun --no-env-file run diagnose:copyfile:bun
/tmp/argumend-reliability-bun-20261022/bun-darwin-aarch64/bun --no-env-file run diagnose:copyfile:node
```

Temporary package entries, the script, and copy destinations were removed from
the worktree. No runtime or application configuration was changed.
A reviewable reconstruction of the exact probe source, package scripts, and
results is retained at `/tmp/argumend-reliability-copy-probe-20261022`. The retained
copy was syntax-checked but was not rerun; `results.json` records that distinction.

A final read-only artifact inspection checked both successful standalone builds
against 65 trace manifests each. All 1,863 unique traced files were present in
each output, with no paths outside the worktree and no environment paths in the
trace lists. The packaged resvg WASM hash matched its source in each checkout.
`python3 /tmp/argumend-reliability-trace-audit-20261022.py` exited 0; its script and
JSONL results are retained under that task-specific `/tmp` name. This checks the
completed artifacts, not the reliability of a future build.

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
- Grounding checks source-text matching and reference accounting. It does not
  establish whether model-assigned speakers are semantically correct or whether
  different overlapping excerpts provide independent evidence. The existing
  policy for reuse across different report objects remains unchanged.
- Browser automation used installed Chrome. Safari and Firefox were not tested.
  Native computer-use service startup failed; Chromium automation remained usable.
