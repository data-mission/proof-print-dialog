# SPEC — Cursor Calgary Hackathon
**Status:** v3.0 · **FORMAT LOCKED BY VLAD: THE PRINT DIALOG** · building
**Clock:** ~2 hours to a turn-key deliverable. Research is timeboxed; see §2B.
**Last updated:** 2026-08-26
**Workspace:** `/Users/vlad/repos/cursor-2` (design here → later published to a public GitHub repo)

> This is the single dumping ground. Every finding, decision, rejected idea, and piece of
> evidence lands here until the spec is undeniable. **We do not write product code until
> this document is good.** Intermediate artifacts live beside it in `_brainstorming/`.

---

## 1. The brief (verbatim)

> **Choose a boring everyday application format and reinvent it with a dramatically more
> engaging visual design, user experience, or functionality.**

Note the "or" — visual design **or** UX **or** functionality. We only have to be dramatic on
one axis. We will aim for two, and be honest about which is the primary claim.

## 2. Judging — the constraint that reshapes everything

- **The judge is an AI.**
- **The submission artifact is screenshots.** The AI assesses those.

### What this immediately kills
Everything time-based. Scroll choreography, hover states, transitions, easing curves, page
load reveals, velocity-reactive motion, sound. All of it is **invisible to the judge**.
This is the single most important fact in this document.

### What this immediately promotes
Composition. Typography. Colour. Density. Layout. Texture. Contrast. Information design.
The still frame is the entire product as far as the judge is concerned.

### Working rules (v0.1 — to be sharpened by research)
1. **RULE-SHOT-1 — Every frame stands alone.** Any screenshot, taken at random, must
   communicate what the product is and why it's remarkable. No frame may depend on the
   previous one for meaning.
2. **RULE-SHOT-2 — No mid-animation captures.** A half-drawn line photographs as a rendering
   bug, not as craft. Animations are captured at rest, at `p=1`, or not relied upon.
3. **RULE-SHOT-3 — Self-playing scenes.** Where motion exists, it must auto-advance on load
   (`p = max(autoProgress, scrollProgress)` — see technique #12) so a naive capture lands
   mid-drama rather than at frame zero.
4. **RULE-SHOT-4 — The contrast must be IN the submission.** The judge does not know what the
   boring original looked like. A before/after must be shown explicitly, or the drama is
   invisible. *(This may deserve to be the hero shot. Open question — see §7.)*
5. **RULE-SHOT-5 — Verify on the PNG, never the live page.** Acceptance is "open the image
   file and look at it." Small text, thin strokes, and low-contrast detail may not survive.

> ⚠️ **Unverified assumptions in the above.** We do not yet know: the screenshot count allowed,
> dimensions/resolution, whether captions accompany them, whether the judge sees the repo or
> a live URL too, or the rubric. `judge-research` agent is investigating what is knowable.
> **Everything unknown here should be asked of the organizers if at all possible.** See §8.

---

## 2A. Competitive reality — the field

**~200 people are building against this exact brief, in the same room, right now.**
Mixed skill: many are AI vibecoders. We are not. That asymmetry is the strategy.

### Consequence 1 — the obvious picks are saturated
With 200 entrants, the top-of-mind formats will be built dozens of times over. Expect a
large pile of calculators, to-do lists, weather apps, and unit converters. **An excellent
calculator loses to a good version of something nobody else picked**, because the judge sees
it 30 times and our craft advantage gets averaged into a crowd.

> **RULE-PICK-1 — Saturation is a disqualifier.** If a format is a top-5 answer to
> "name a boring app", we do not build it. It must survive the crowd, not just the rubric.

### Consequence 2 — but recognizability is still a hard gate
The other failure mode is over-correcting into obscurity. A brilliant reinvention of a format
nobody recognizes as "boring everyday" fails the brief on its face.

> **RULE-PICK-2 — The target band is narrow and it is the whole game:
> instantly recognizable to everyone, but NOT a top-5 obvious pick.**
> Rank 6–20 on the "name a boring app" list. High recognition, low saturation.

This band is exactly what the two ideation agents are triangulating from opposite sides.

### Consequence 3 — the humans behind the judge are entrepreneurs who post to LinkedIn
The AI grades it, but entrepreneurs built the judge and will look at the winners — and they
share what makes them look good to share.

> **RULE-PICK-3 — Optimize for the screenshot someone wants to repost.**
> The entry should read as an obvious *product*, not a tech demo: a clear premise, a name,
> a point of view, and one image that carries the whole idea without a caption.
> "I would post this" is a real acceptance test, not a soft one.

### Consequence 4 — our edge is craft depth, and it must be *visible*
Vibecoded entries share a look: default Tailwind, purple gradients, centered hero, three
feature cards, generic glassmorphism, em-dash-laden filler copy. **That look is our contrast
medium.** Every signature of it we avoid is a point of separation the judge can see.
`visual-sota` is building the explicit avoid-list.

Craft that photographs: real typographic scale, art-directed palette, deliberate density,
texture, optical alignment, considered empty states, real content instead of lorem, and
edge cases handled on screen.

> **RULE-PICK-4 — Anti-slop is a design requirement, not a preference.**

## 2B. Timebox

~2 hours, total, to turn-key. Therefore:
- Research ends when the four agents report. We judge, synthesize, **pick, and stop looking.**
- Budget shape: **~25% decide, ~60% build, ~15% capture screenshots + README.**
- Scope discipline: **one format, one screen family, finished.** A finished small thing
  photographs infinitely better than an ambitious broken thing. Unfinished edges are the
  single most visible tell in a still frame.
- Screenshot capture is **not** the last 5 minutes. It is a deliverable with its own budget.


---

## 2D. Product requirements (from Vlad — these bind)

### Interaction model — locked
**Scroll-driven reveal of NESTED components.** As the user scrolls, components reveal, and
inside those components further components reveal. Not a flat fade-in list — a hierarchy that
unfolds. This is the spine of the experience and the reason the `bty` engine matters.

> **Corrected assumption:** §2 claimed motion is worth zero because the judge sees stills.
> That was too strong. **With scripted capture we choose the exact frame**, so animation can be
> frozen at its *peak* moment rather than wherever a naive capture lands. Motion is not wasted —
> it is *directed*. `capture.mjs` exists to exploit this.
> RULE-SHOT-2 is amended: **capture animation deliberately at peak, never accidentally mid-flight.**

### Focus — in priority order
1. **User attraction** — it must be immediately compelling. The first frame earns the next.
2. **User convenience** — genuinely easier than the boring original, not just prettier.
3. **Effective, modern UX** — current idiom, no dated patterns, no novelty that costs usability.
4. Beauty and sound construction throughout — "all sound, all beautiful, all convenient."

> **RULE-UX-1 — Attraction and convenience beat cleverness.** If a device is impressive but
> makes the thing harder to use, it is cut. The reinvention must make the boring format *better
> to actually use*, not merely better to look at.

### Platform — both, non-negotiable
**Desktop AND mobile.** Both must be genuinely designed, not one scaled down. Both get
screenshots in the submission. `capture.mjs` ships desktop (1440×900), tall (1280×1600), and
phone (430×932) viewports.

### Backend — DECIDED: none
**No backend. Single-file, no dependencies, no server, no deploy.**
Rationale: a backend is invisible to a screenshot judge, introduces a deploy that can fail at
the worst possible moment, and spends time on the axis we are *not* graded on. All state is
local (`localStorage` where persistence helps the demo). Any "data" is hand-crafted realistic
content — which **photographs better than real API output**, because every frame can be
composed deliberately. Reversible if a specific need appears.


---

## 2E. Architecture — AGENTIC (Vlad directive, binds hard)

The solution is **not efficient scripting**. It is modern, contemporary, **agentic**.

**The app IS an AI agent underneath.** The UI is one surface on it, not the product.

### Required
1. **MCP server** — DOSE exposes an MCP endpoint so *other* AI agents connect to it and use it.
   Integration is a first-class feature, not a bolt-on.
2. **Outbound connections** — DOSE connects out to other apps/agents. Both directions matter.
3. **Agentic memory + brain** — persistent memory that accumulates across sessions and changes
   behaviour over time. Not a stateless renderer.

### Consequence for D12 (no backend)
D12 stands for *web hosting* — still no server to deploy, no cloud dependency. But the MCP
server is a local stdio process, which is not a deploy risk. **D12 is amended, not revoked.**

### Consequence for the screenshots
If the agentic layer is the substance, it **must be visible in the submission**. A dial alone
undersells it. At least one hero frame has to show the agent surface: MCP tools exposed, a live
client transcript, accumulated memory.


---

## 2C. The governing doctrine — where the balance sits

**The pick must clear a bar. The execution must win.**

A still frame measures *execution* far more reliably than it measures *concept*. An AI judge
can see whether the type scale is real, whether spacing is deliberate, whether empty states
were considered. It can only *infer* whether the idea was clever.

> **A B+ idea executed at A+ beats an A+ idea executed at B.** With this judge, every time.

**Therefore the idea hunt is a FILTER, not a SEARCH.** It must return something recognizable
and un-saturated — and then it must stop. The 200-entrant field makes selection high-variance,
which justifies a hard parallel push on it; but returns diminish fast, and every minute past
that point is stolen from the only thing that actually separates us.

### The clock (committed)
| Phase | Budget | Rule |
|---|---|---|
| Decide | ~15 min, **hard cut** | When panels report, judge → pick → **do not reopen**. If still arguing at the cut, pick from what's on the table. |
| Build | ~55 min | One format, one screen family, **finished**. Unfinished edges are the most visible flaw in a still. |
| Capture + README + repo | ~20 min | Budgeted, not leftover. This is where most of the field bleeds out. |

### Delegation contract
- **Claude decides and reports:** format, palette, layout, typography, structure, scope cuts.
  These are not escalated. Vlad may veto anything — a veto outranks the reasoning, always.
- **Escalated to Vlad only:** exact deadline; submission mechanics (screenshot count, captions,
  whether the judge sees repo/live URL); and any direction he might not want his name on.

### Named risk
Seven agents running. If returns come back diffuse and contradictory, the failure mode is
analysis paralysis at the worst possible moment. **Mitigation is the hard cut above** — a good
option chosen decisively beats the best option chosen too late.


---

## 3. What "everyday application format" actually means

A **format** is the interface *genre*, not a product. It's the archetype whose conventions are
so settled you know how to use it before you open it.

- "Calculator" is a format. iOS Calculator is an instance.
- "Receipt", "boarding pass", "settings panel", "timesheet", "404 page" — all formats.

**Three tests a candidate must pass:**
1. **Pre-installed conventions** — the user knows the layout without being taught.
2. **Many near-identical instances** from different makers.
3. **Nobody uses it for pleasure** — it's obligation software.

**Where the boring comes from:** the format is dull because its *conventions calcified*, not
because the underlying human activity is dull. Somebody's first bill, first tax form, first
boarding pass is a real moment in a real life — the format flattens it. **That gap is the
opening.** The strongest reinventions will re-inject the human stakes the format erased.

**Corollary for selection:** prefer a format where the erased human stakes are large. A
calculator has almost none. A medical intake form, a utility bill, or a boarding pass has a lot.

---

## 4. Design assets in hand — `bty` landing drafts

Located, extracted, and documented. Source: `/Users/vlad/repos/bty/_dev_notes/concept/`,
commit `d08003a`. Four skins: `acid`, `pop`, `kinetic`, `original`. **A/B finalists: acid + pop.**
"Toxic" = **ACID**.

- Full technique catalogue → **[`scroll-techniques-pop-acid.md`](./scroll-techniques-pop-acid.md)**
- Original files preserved → `evidence/landing-draft-{acid,pop,kinetic}.html`, `landing-draft.html`

**Headline reusable assets:**
- A ~60-line dependency-free scroll engine (single rAF loop + dirty flag + IntersectionObserver,
  two progress functions `pinP`/`flowP`, gain-and-bias slicing).
- Two complete art directions: **ACID** (lab brutalism, `#c9ff2e` on `#0b100c`, all-mono,
  film grain) and **POP** (sticker hyper-pop, `#2B3BFF`/`#FF4D9E`/`#FFD21C`, 3px strokes,
  hard shadows, per-element rotation, overshoot easing).
- A progressive-enhancement contract worth keeping verbatim: **CSS final states are the
  default; JS rewinds and scroll replays.** No-JS / reduced-motion / crawler → a complete
  finished page. **This also means a JS-less screenshotter still captures a finished design.**

**Honest caveat:** most of what makes these files special is *motion*, and motion is worth zero
to our judge. What transfers is the **art direction, typography, palette, texture, and
composition** — plus the engineering discipline. We are borrowing the taste, not the engine.

---


## 5. DECISION — the print dialog

**Chosen by Vlad.** Everything before this is superseded.

### The format
The **print dialog**. Copies, page range, orientation, a printer dropdown, and a preview
thumbnail the size of a stamp. Functionally unchanged since 1995. Everyone alive has used it,
and everyone alive has printed 40 pages of garbage by accident.

### The reinvention
It shows you **exactly what is about to come out of the machine** — every page, at readable
size, with the waste flagged before it happens:
- Pages that are one orphaned footer line
- Blank and near-blank pages
- What it costs in ink and paper
- One tap to drop the junk and reflow

### Why this one won, when nine others died
**It is the only survivor where every number on screen can be computed for real.**
Page breaks, blank-page detection, and ink coverage (mean darkness per rendered page) are all
genuinely measurable in the browser from a real document. Nothing is invented.

Four earlier candidates (DOSE, subscriptions, package tracking, utility bill) died on exactly
this fault — the drama depended on data we could not truthfully produce. This one has no
hollow centre.

### Scorecard
| Test | Verdict |
|---|---|
| Understood in 1 second | ✅ Universal. Needs no setup sentence — the thing that killed DOSE |
| Adds information absent from the source | ✅ The current dialog shows a stamp-sized preview and hides everything |
| **Buildable as TRUTH, not mockup** | ✅ **The deciding factor.** All figures computed |
| Visual surface | ✅ A document is pages, type, density, structure — lots to be beautiful on |
| Already solved | ✅ Nobody has tried since 1995 |
| Nested scroll reveal (D11) | ✅ document → pages → flagged page → why |
| Agentic (D21) | ✅ MCP: `preview()` `waste_report()` `drop_pages()` `ink_cost()` |

### Known weakness, accepted
**Low emotional stakes.** It is funny, not moving. Mitigation: the reveal ("you were about to
print 12 pages; 5 are footer orphans") carries the punch, and the moral force is waste — paper
and ink you were about to burn for nothing.

### Killed on assessment (with reasons, for the record)
| Idea | Cause of death |
|---|---|
| Subscriptions · Package tracking · Utility bill | **Data would be faked** — no bank/carrier/meter access |
| Cancellation flow | Adds no information, only fewer steps; tiny canvas |
| CAPTCHA | Adds no information; inventing a working replacement is unbounded risk |
| Wifi captive portal | Genuine hidden truth (encryption, logging, real speed) but **unmeasurable from a browser**; single-card canvas |
| Video call UI | No information added; massively crowded |
| Cookie banner | Best on the information test, but a banner is too small a canvas for nested scroll work |
| Airline seat map | Real runner-up. Lost on novelty — SeatGuru exists |
| Browser tabs | Real runner-up, and Vlad's genuine pain. Lost on crowdedness (OneTab, Toby, Arc) |
| DOSE (prescription dial) | Killed by Vlad — failed instant comprehension; collisions needed a 5th drug to be truthful |
| Insurance / pay stub / report card / lab results / voicemail | See panel findings — monotonic transforms, reskins, or not everyday |

## 5A. Deliverables
1. **The app** — single file, no backend, desktop + mobile, scroll-driven nested reveal.
2. **Screenshots** — via `capture.mjs`, frame-exact, both platforms.
3. **A short, beautiful, very modern product presentation** — a compact deck/page that sells
   DOSE after the app is built. Small and sharp, not long. Same art direction as the product.
   *(Standing requirement from Vlad — do not wait to be asked again.)*
4. **README + public GitHub repo.**



## 6. Visual direction

*Pending — `visual-sota` agent researching 2025-26 static-frame design SOTA, system-font-only
typography, textures without images, and the "AI slop" signatures to actively avoid.*

## 7. Open questions
- **Q1.** Is the before/after contrast the hero shot, or does it read as defensive? (RULE-SHOT-4)
- ~~**Q2.**~~ **ANSWERED: visual + a mechanic that adds real information.**
- **Q2-old.** Primary claim: dramatic-visual, dramatic-UX, or dramatic-functionality?
  *(Leaning: **visual + one novel mechanic.** A still can prove visual drama and imply a mechanic; it cannot prove functionality. Awaiting user confirmation.)*
- **Q3.** How much does the AI judge reward *working* functionality it can't see in a still?
- **Q4.** One format done impeccably, or one format shown in several states?

## 8. Things to ask the organizers
- How many screenshots? Dimensions/resolution limits?
- Do screenshots carry captions or a written description?
- Does the judge also see the repo, README, or a live URL?
- Is the rubric published?
- ~~Time remaining~~ → **answered: ~2 hours.**

## 9. Decision log
| # | Decision | Rationale | Date |
|---|---|---|---|
| D1 | Design-first; no product code until this spec is strong | User directive | 2026-08-26 |
| D2 | "Toxic" resolved to the ACID skin; both finalists recovered | Confirmed in commit `d08003a` | 2026-08-26 |
| D3 | Screenshot-first design supersedes motion-first | AI judges stills; motion scores zero | 2026-08-26 |
| D4 | Reject top-5 obvious formats outright | ~200 entrants; saturation averages away our craft edge | 2026-08-26 |
| D5 | Target recognizability rank 6–20 ("high recognition, low saturation") | Narrow band between saturated and unrecognizable | 2026-08-26 |
| D6 | Anti-AI-slop is a hard design requirement | Vibecoded field is the contrast medium; separation must be visible | 2026-08-26 |
| D7 | Timebox: 25% decide / 60% build / 15% capture | ~2h total; capture is a budgeted deliverable, not a leftover | 2026-08-26 |
| D8 | **Execution over concept.** Idea hunt is a filter, not a search | Stills measure execution reliably, concept only by inference | 2026-08-26 |
| D9 | Hard cut on deciding; no reopening the pick | Analysis paralysis is the live risk with 7 agents running | 2026-08-26 |
| D10 | Claude owns design calls; Vlad holds veto + the 3 escalations | Explicit delegation of responsibility, accepted | 2026-08-26 |
| D11 | Interaction model = scroll-driven reveal of **nested** components | Vlad directive; the spine of the experience | 2026-08-26 |
| D12 | **No backend.** Single-file, no deps, no deploy | Invisible to judge, adds failure mode, steals craft time | 2026-08-26 |
| D13 | Desktop **and** mobile both first-class | Vlad directive; both appear in the submission | 2026-08-26 |
| D14 | Amended D3: motion is *directed*, not worthless — scripted capture picks peak frames | `capture.mjs` gives frame-exact control | 2026-08-26 |
| D15 | Capture harness built before the product | It is a graded deliverable, not a final chore | 2026-08-26 |
| D16 | **FORMAT LOCKED: `DOSE`** — prescriptions on one 24h dial | Passes the adds-information test; daily; whitespace; bounded build | 2026-08-26 |
| D17 | Pay stub abandoned after both panels killed it | Mechanic was a monotonic transform; hero frame re-rendered the source table | 2026-08-26 |
| D18 | Reopened D9's "no reopening" once, deliberately | D9 guards against paralysis, not against disproof. Ignoring a disproof is cargo-culting process | 2026-08-26 |
| D19 | **NOT** the near-black + single-acid-accent palette | It is the uniform of the top ~20 entrants — excellent *and invisible* | 2026-08-26 |
| D20 | Short modern product presentation is a standing deliverable | Vlad directive; no need to re-ask | 2026-08-26 |
| D21 | **Architecture is agentic, not scripted.** MCP server + agentic memory + two-way integration | Vlad directive | 2026-08-26 |
| D22 | D12 amended: no *web* backend, but a local MCP process is required and is not a deploy risk | MCP is stdio, not hosting | 2026-08-26 |
| D23 | **No implementation until Vlad approves the spec** | Process correction — Claude started early, was wrong to | 2026-08-26 |
| D24 | **DOSE killed by Vlad.** Format switched to insurance-as-floor-plan | Failed instant-comprehension; collision mechanic needed a 5th drug to be truthful | 2026-08-26 |
| D25 | Instant comprehension is now a hard gate on any format | Judge scores Interesting/Memorable (r=.61-.85); usability polish correlates ~0 | 2026-08-26 |
| D26 | Capture pinned: 1456x816 PNG, 2x supersampled, never a tall full-page grab | 28px patch tokenization; 1440x5000 collapses to 451x1568 and destroys glyphs | 2026-08-26 |
| D27 | **FORMAT LOCKED: the print dialog** (Vlad's choice) | Only survivor whose every on-screen number is computable for real | 2026-08-26 |
| D28 | New hard gate: **if the data must be invented, the idea is dead** | Killed 5 candidates; it is the fault that killed DOSE | 2026-08-26 |
| D29 | Saturation demoted from disqualifier to tiebreaker | Goal is to be BEST at the task, not unique. Saturation only bites under comparative judging | 2026-08-26 |

## 10. Rejected
*(empty — nothing rejected yet)*
