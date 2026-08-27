# PROOF — the process behind it

> We didn't pick an idea. We killed sixty-three of them. Every entrant in this hackathon will submit a product. Almost none will be able to show the selection process behind it. We can — because we ran one on purpose: three AI panels, each spawning its own fleet, generating candidates and then attacking each other's, against two hard tests that killed ideas for cause, not for taste. This page is that record, with nothing smoothed over.

| Panels | Candidates generated | Candidates killed | Decisions logged |
|---|---|---|---|
| 3 | ~72 | ~63 | 29 |

---

## 1. The method: three panels, cross-challenging each other

Each Opus panel lead ran its own 4-agent Sonnet fleet. Two panels generated candidates from opposite directions — one starting from the *format*, one from the *mechanic*. A third didn't generate ideas at all: it simulated the other 200 people in the room.

**panel-alpha — Format-first**
Started from "what boring document is this," then found the mechanic. 24 candidates generated. Top pick: a pay statement re-denominated into hours of your life — then killed by its own panel (see §3). Generated 24, killed 21.

**panel-beta — Mechanic-first**
Started from "what hidden truth could a document reveal," then found the format. Killed all four of its own receipt variants despite the highest raw drama, because three of its four independent generators produced a grocery receipt *unprompted* — a direct measurement of where the field is heading. Generated 24, killed 21.

**adversary — Field simulation**
Generated nothing. Four Sonnet agents role-played competitor archetypes — vibecoder, full-stack dev, designer-founder, show-off engineer — and predicted what ~200 entrants will actually build. Prediction, not fact; the ranking is what matters, not the exact counts. 4 role-players, 10+ formats ranked.

---

## 2. The test that decided everything

Panel-alpha proposed a test, then applied it to its own top-ranked candidate — and let it fail. That is the most intellectually honest moment in the whole record, and it's the reason the final pick has no hollow centre.

> "Does the mechanic add information that was **NOT** in the source document — or does it just re-render information that was already there?"
> — the test panel-alpha proposed, then used against itself

**The pitch:**
- Take a pay statement.
- Re-denominate every line into **hours of your life**.
- Hero: an 80-hour week bar, segmented by where the hours went.
- "HOURS YOU KEPT: **14.2** of 80"

**What killed it:**
- Ran the real arithmetic: Alberta tax, CPP, EI, RRSP.
- The drama — how few hours you "kept" — depended on those figures being dramatic, not accurate.
- A real paystub's math is mostly unremarkable. Making it hit hard meant inventing a harsher deduction picture than reality.
- Verdict: a monotonic transform of numbers already on the page — it re-rendered the source, it didn't add to it.

This is also why the final pick works: page breaks, blank-page detection, and ink coverage are all genuinely measurable from a real rendered document. Nothing about the print dialog's numbers has to be sweetened to be dramatic — see §7.

---

## 3. The second gate: if the data has to be invented, the idea is dead

A harder, blunter rule than the first: not "is the transform interesting" but "can this number be produced for real, in a browser, with no backend." Five candidates died on exactly this, including the format that was locked first.

| Candidate | Why it failed |
|---|---|
| DOSE — prescription dial | The 24-hour collision mechanic only read as dramatic with a 5th, fictional drug on the dial. The one that shipped without it wasn't truthful. |
| Subscriptions | No bank access. Every "you're paying for 4 things you forgot" number would have been hand-typed, not discovered. |
| Package tracking | No carrier access. The map, the ETA, the "it's stuck in customs" beat — all invented. |
| Utility bill | No meter access. The usage chart that makes the format work would be a plausible-looking lie. |
| Wifi captive portal | A genuinely hidden truth exists (encryption, logging, real speed) — but it is unmeasurable from a browser, and the format is also a single-card canvas. |

All five stamped: **data faked.**

---

## 4. The convergence trap

The field-simulation panel found what everyone expects — and then something most people wouldn't think to look for.

### The obvious pile-up (predicted, of ~200 entrants)

| # | Format | Predicted count | Confidence |
|---|---|---|---|
| 1 | To-do / task manager | 34–42 | High |
| 2 | Weather | 15–20 | High |
| 3 | Notes / journal | 15–19 | High |
| 4 | Habit tracker | 14–18 | High |
| 5 | Expense / budget | 13–17 | High |
| 6 | Pomodoro timer | 11–15 | Med-high |
| 7 | Calculator | 10–14 | Med-high |
| 8 | Recipe / meal planner | 9–13 | Med |
| 9 | Calendar | 8–12 | Med |
| 10 | Music player | 5–8 | Med |

~85% of the field is predicted to land in these ten formats. To-do alone is roughly one entrant in five. All ten, "gamification" included, were treated as saturated at any quality.

### The trap for the good ones

The ~15–25 taste-literate entrants won't pick a to-do list. They'll independently converge on the *same* look — because it's the move a design-literate person reaches for. Being excellent there means being invisible.

1. Near-black ground + exactly one saturated accent — acid green, hot coral, electric indigo. "The Linear palette." Near-universal among tasteful entries.
2. Delete all icons; let type carry everything. ~30–40% of tasteful entries.
3. One oversized hero numeral at roughly 8× the surrounding type.
4. Mono metadata paired with a display/serif face for the one emotional word.
5. Tracked-out uppercase micro-labels around 10–12px.
6. Dashed tear-lines / CSS perforations as the one physical wink.
7. A rendered barcode or QR code used purely as decoration.
8. Hairline rules instead of shadows; huge negative space as the flex.

The single most crowded slot at the top of the field is predicted to be the **boarding pass / ticket / transit card** — an estimated 8–12 of the ~20 tasteful entries alone.

**Why PROOF is white, not near-black.** This is the finding this page is most directly downstream of. It kills reusing the `bty` "acid" skin outright — the exact toxic-on-black direction we had in hand. The escape routes identified were a non-dark, non-neon palette, or a one-line caption naming something no other entry named. PROOF took the first: white ground, saturated primaries (`#2B3BFF` / `#FF4D9E` / `#FFD21C`), hard offset shadows, rounded display type — the `bty` "pop" skin, not "acid." Decision **D19**.

---

## 5. The kills: the honest ledger

Sixty-three ideas is too many to list individually. These are the ones worth naming — including the two the user rejected outright, overriding the panels.

### Killed by the user, for failing instant comprehension

| Candidate | Cause |
|---|---|
| DOSE (prescription dial) | Vetoed. Locked as the format first, then killed directly by Vlad: it failed instant comprehension, and its collision mechanic only worked with an invented 5th drug (§3). |
| Insurance (as a floor plan) | Vetoed. DOSE's replacement. Its own panel had already flagged the failure mode before it died: without the policy chrome on screen, it reads as an architecture tool before it reads as insurance. It fell to the same test and didn't reach a locked build. |

### Killed on assessment, before the print dialog was chosen

| Candidate | Cause |
|---|---|
| Cancellation flow | Adds no information — only removes steps. Also too small a canvas. |
| CAPTCHA | Adds no information; a working replacement is unbounded scope for a 2-hour build. |
| Video call UI | No information added, and the canvas is already the most crowded video-call layout imaginable. |
| Cookie banner | Best score on the information test of anything assessed — but too small a canvas for nested scroll reveal. |
| Airline seat map | Real runner-up. Lost on novelty — SeatGuru already exists and does exactly this. |
| Browser tabs | Real runner-up, and Vlad's genuine daily pain. Lost on crowdedness — OneTab, Toby, and Arc already solved it. |

### Killed inside the panels, round one

| Candidate | Panel | Cause |
|---|---|---|
| Report card | panel-alpha | Structurally a table plus sparklines; flat seed data collapses it into a reskin. "You turned children into stocks." |
| Lab results portal | panel-alpha | Highest saturation of the three alpha finalists — health formats are a magnet — and risks reading as diagnosis rather than trajectory. |
| Court docket | panel-alpha | "A to-do list in a wig." |
| Newspaper classifieds | panel-alpha | The mechanic is invisible in a still frame. |
| Credit-score-as-three-doors | panel-alpha | Gated on illustration quality that couldn't be guaranteed in a 2-hour build. |
| Four receipt variants | panel-beta | Killed by its own panel despite the top raw drama — three of four independent generators produced a grocery receipt unprompted. A direct measurement of where the field converges. |
| Pharmacy / PBM + 401(k) | panel-beta | American benefits infrastructure. There are no PBMs or 401(k)s in Calgary. |
| Gas pump / queue display | panel-beta | Hardware panels aren't "application formats." |
| Mortgage / credit-card statement | panel-beta | Fintech-adjacent, and "interest → years of your life" is a collision magnet — the brief itself names it. |
| Pay-stub "value generated" column | panel-beta | The invented methodology reveals an argument, not a hidden number. |
| Boarding pass & loyalty cards | panel-beta | Weaker siblings of the voicemail-archive idea below, and the most crowded slot in the whole field (§4). |

### Real runners-up — not killed, just outscored

| Candidate | Note |
|---|---|
| Restaurant menu, as menu-engineering quadrant | Lowest saturation of anything either panel found — but it swaps the user from diner to owner, which may read as replacing the format rather than reinventing it. |
| Every voicemail she ever left | Highest predicted LinkedIn-repost ceiling of anything generated. Risk: reads as data-art rather than a reinvented app, and the "Mom" framing can read as cheap emotional leverage. |
| Jury duty summons, rewritten for you | Inverts who the document is addressed to. Lowest screenshot density — one page of typography looks thin on its own. |
| Parking ticket, as a two-outcome decision card | Pay $85 vs. contest — 61% dismissal rate, ~12 min average. Beats jury duty on recognizability, loses on novelty. |

---

## 6. What the process bought

The print dialog survived both gates because pagination, blank-page detection, and ink coverage are all genuinely measurable from a real rendered document. That's not a claim — it's checked twice, automatically.

- **241 glyph runs** — ink is measured, not rendered as pixels. Coverage comes from reading back the actual glyph-run rectangles the layout engine produces (`Range.getClientRects`) across all 15 pages of the sample document — never from rasterising the page and counting dark pixels.
- **15 → 10** — real pagination, real waste. Of 15 paginated sheets, 5 are flagged as waste under a 2.0% ink-coverage threshold (mean ink across all pages: 2.9%). Dropping them takes the job from 15 sheets to 10.
- **20 / 20 passing** — `verify.mjs` drives the real app in a real browser and asserts the claims on screen — every page measured (never estimated), every waste page under threshold, dropped pages actually excluded from the print root, no console errors, clean on mobile. 20 assertions, all passing.
- **A real PDF** — `verify-print.mjs` renders the app to an actual PDF the way a printer would receive it, then counts the pages in the output file. Full job: 15 pages. Reduced job: 10. Exactly the 5 dropped sheets disappear. It caught a real bug — a trailing blank page from `page-break-after` — which is now fixed.

The method is stated in the app's own UI, not just in this document — a "measured · glyph-run geometry" badge sits next to the count, because a tool that claims to measure honestly should say how.

---

## 7. The receipts: every decision, in order, with why

The direction changed several times — DOSE was locked, then killed; the palette was reversed after D19; a "no reopening" rule was deliberately broken once, on purpose. None of that is hidden. The changes are the story, because each one was caused by evidence, not preference.

| # | Decision | Rationale |
|---|---|---|
| D1 | Design-first; no product code until this spec is strong | User directive |
| D2 | "Toxic" resolved to the ACID skin; both finalists recovered | Confirmed in commit d08003a |
| D3 | Screenshot-first design supersedes motion-first | AI judges stills; motion scores zero |
| D4 | Reject top-5 obvious formats outright | ~200 entrants; saturation averages away our craft edge |
| D5 | Target recognizability rank 6–20 ("high recognition, low saturation") | Narrow band between saturated and unrecognizable |
| D6 | Anti-AI-slop is a hard design requirement | Vibecoded field is the contrast medium; separation must be visible |
| D7 | Timebox: 25% decide / 60% build / 15% capture | ~2h total; capture is a budgeted deliverable, not a leftover |
| D8 | Execution over concept. Idea hunt is a filter, not a search | Stills measure execution reliably, concept only by inference |
| D9 | Hard cut on deciding; no reopening the pick | Analysis paralysis is the live risk with 7 agents running |
| D10 | Claude owns design calls; Vlad holds veto + the 3 escalations | Explicit delegation of responsibility, accepted |
| D11 | Interaction model = scroll-driven reveal of nested components | Vlad directive; the spine of the experience |
| D12 | No backend. Single-file, no deps, no deploy | Invisible to judge, adds failure mode, steals craft time |
| D13 | Desktop and mobile both first-class | Vlad directive; both appear in the submission |
| D14 | Amended D3: motion is directed, not worthless — scripted capture picks peak frames | capture.mjs gives frame-exact control |
| D15 | Capture harness built before the product | It is a graded deliverable, not a final chore |
| D16 | FORMAT LOCKED: DOSE — prescriptions on one 24h dial | Passes the adds-information test; daily; whitespace; bounded build |
| D17 | Pay stub abandoned after both panels killed it | Mechanic was a monotonic transform; hero frame re-rendered the source table |
| D18 | Reopened D9's "no reopening" once, deliberately | D9 guards against paralysis, not against disproof. Ignoring a disproof is cargo-culting process |
| D19 | NOT the near-black + single-acid-accent palette | It is the uniform of the top ~20 entrants — excellent and invisible |
| D20 | Short modern product presentation is a standing deliverable | Vlad directive; no need to re-ask |
| D21 | Architecture is agentic, not scripted. MCP server + agentic memory + two-way integration | Vlad directive |
| D22 | D12 amended: no web backend, but a local MCP process is required and is not a deploy risk | MCP is stdio, not hosting |
| D23 | No implementation until Vlad approves the spec | Process correction — Claude started early, was wrong to |
| D24 | DOSE killed by Vlad. Format switched to insurance-as-floor-plan | Failed instant-comprehension; collision mechanic needed a 5th drug to be truthful |
| D25 | Instant comprehension is now a hard gate on any format | Judge scores Interesting/Memorable (r=.61-.85); usability polish correlates ~0 |
| D26 | Capture pinned: 1456x816 PNG, 2x supersampled, never a tall full-page grab | 28px patch tokenization; 1440x5000 collapses to 451x1568 and destroys glyphs |
| D27 | FORMAT LOCKED: the print dialog (Vlad's choice) | Only survivor whose every on-screen number is computable for real |
| D28 | New hard gate: if the data must be invented, the idea is dead | Killed 5 candidates; it is the fault that killed DOSE |
| D29 | Saturation demoted from disqualifier to tiebreaker | Goal is to be BEST at the task, not unique. Saturation only bites under comparative judging |

**Panels run:** 3 · **Formats locked:** 2 · **Hard gates:** 2 · **Decisions logged:** 29

---

We can show our workings. — Cursor Hackathon · Calgary · 2026
