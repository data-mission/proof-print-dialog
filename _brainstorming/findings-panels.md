# Panel findings — raw returns (adversary, panel-alpha, panel-beta)

Three Opus panel leads, each running a 4-agent Sonnet fleet, cross-challenging each other.
~72 candidates generated, ~63 killed. Full reasoning preserved here; the judged outcome is
in `SPEC.md` §5.

---
## ADVERSARY — field simulation (the highest-value return)

**Method:** 4 Sonnet agents role-played competitor archetypes (vibecoder / full-stack dev /
designer-founder / show-off engineer). Prediction, not fact. Counts assume ~200 solo entries;
if teams, scale down proportionally — **the ranking is what matters, not the absolutes.**

### Predicted frequency (of 200)
| # | Format | Count | Conf |
|---|---|---|---|
| 1 | **To-do / task manager** | **34-42** | HIGH |
| 2 | Weather | 15-20 | HIGH |
| 3 | Notes / journal | 15-19 | HIGH |
| 4 | Habit tracker | 14-18 | HIGH |
| 5 | Expense / budget | 13-17 | HIGH |
| 6 | Pomodoro timer | 11-15 | MED-HIGH |
| 7 | Calculator | 10-14 | MED-HIGH |
| 8 | Recipe / meal planner | 9-13 | MED |
| 9 | Calendar | 8-12 | MED |
| 10 | Music player | 5-8 | MED |

**~85% of the field lands in 10 formats. To-do alone is ~1 in 5.**

### DO-NOT-BUILD (saturated at any quality)
To-do · habit tracker · pomodoro · weather · notes · expense tracker · calculator ·
music player · **and "gamification as the twist" on any of them** (3 of 4 sims produced this
independently — it will appear 20+ times).

### ⚠️ THE CONVERGENT-EXCELLENCE TRAP — the most important finding in the project
The ~15-25 *taste-literate* entrants will independently converge on:
- **Boarding pass / ticket / transit card** — est. **8-12 of the ~20 tasteful entries.** Most
  crowded slot at the top of the field.
- **Thermal receipt / invoice** — mono, dashed cut-lines, ALL CAPS. Live trend. 3-5 entries.
- Weather-as-pure-typography · calculator-as-Braun/Rams homage.

**The specific moves ~20 smart people will all make** — our real enemy, because they are the
moves *we* would reach for:
1. Near-black `#0B0B0C` + exactly ONE saturated accent (acid green `#C8FF00`, hot coral,
   electric indigo). "The Linear palette." Near-universal.
2. Delete all icons; type communicates. ~30-40% of tasteful entries.
3. One oversized hero numeral at 8× everything else.
4. Mono metadata + grotesk/display-serif for the one emotional word ("editorial tech").
5. Tracked-out uppercase micro-labels at 10-12px.
6. CSS perforations / dashed tear-lines as the one physical wink.
7. Rendered barcode or QR as decoration.
8. Hairline rules instead of shadows; huge negative space as the flex.

> **Implication (acted on):** a dark, restrained, one-acid-accent, huge-numeral, mono-labeled
> design makes us **excellent and invisible.** This directly kills reusing the `bty` ACID skin.
> Escape hatches: (a) a **non-dark, non-neon palette** — warm paper, clinical white, flat
> saturated signage colour; (b) a format whose one-line caption **names something no other
> entry named.**

**Bonus (HIGH confidence, mechanically true):** a still cannot distinguish a real simulation
from layered noise. Audio-reactivity, fluid sims, WASM, live API data — **worth zero**. Only
bloom, chromatic aberration, and a physics scene frozen mid-collision survive a still.

### The whitespace — recognizable to everyone, near-zero competition
Split-flap departures board [1-3] · pharmacy/prescription label [0-1] · parking ticket [0-1] ·
elevator floor directory [0-1] · library due-date card [0] · **tax/government form [0-1]
(highest literal brief-alignment of anything found)** · spreadsheet [1-2] · voicemail [0] ·
thermostat [0-1] · email client / settings / print dialog / file explorer [0-2 each]
*(these last were rejected by the sims as "nothing to animate" — a motion objection, which is
void under still-frame judging).*

---
## PANEL-ALPHA — format-first (24 candidates, 21 killed)
1. **PAY STATEMENT** — re-denominate the document from dollars into **hours of your life**;
   totals to "HOURS YOU KEPT: 14.2 of 80". Hero: 80-hour week bar segmented by where hours went,
   above an itemized ledger ("CPP — 3.1 hrs / EI — 1.4 hrs / ALBERTA TAX — 6.2 hrs").
   *Changed after cross-challenge:* dropped thermal-receipt styling (most-copied look, beta's
   fleet converged on receipts 3× unprompted); re-plumbed US→Alberta (CPP/EI/provincial/RRSP)
   because this is Calgary; added the week bar so the frame carries a second visual system.
   **Risk:** "time is money" is familiar — a judge may read it as a clever caption over an
   ordinary table. The week bar exists to make it structural rather than rhetorical.
2. **SCHOOL REPORT CARD** — grades as position + trajectory; Bloomberg-terminal rows with
   deltas, sparklines, class-distribution ticks. **Risk:** structurally a table + sparklines;
   flat seed data collapses it to a reskin. "You turned children into stocks."
3. **LAB RESULTS PORTAL** — reference-band instrument panel; answers "am I moving toward the
   red" not "am I in range today." **Risk:** highest saturation of the three (health is a
   magnet); must read as trajectory, never diagnosis.

**Killed:** eviction notice, life insurance, certified-mail notice, library card, movie stub,
voicemail radar (recognizability / documents-not-apps) · court docket (*"a to-do list in a wig"*) ·
package tracker (saturated) · newspaper classifieds (mechanic invisible in a still) ·
credit-score-as-three-doors (gated on illustration quality we can't guarantee in 2h).
**Runners-up not killed:** restaurant menu as menu-engineering quadrant (lowest saturation of
anything either panel found, but swaps user from diner to owner — may read as *replacing* the
format); prescription label as 24h radial dose dial (medical-advice landmine, weakest build).

---
## PANEL-BETA — mechanic-first (24 candidates, 21 killed)
1. **INSURANCE DECLARATIONS AS YOUR FLOOR PLAN** — coverage table redrawn as an annotated CAD
   plan, rooms tinted by coverage, exclusions cross-hatched red. **Risk:** without the policy
   chrome it reads "architecture tool" before "insurance." *Alpha's standing objection:* a
   credible floor plan is bespoke SVG path work with **no fallback if it renders cheap, and 2h
   affords no second attempt.*
2. **EVERY VOICEMAIL SHE EVER LEFT** — aggregate the singular: a decade-long archive from one
   caller laid out at once, inbox as portrait of a relationship. "MOM · 214 messages ·
   2014-2026", tiles sized by duration, shaded by age, footer "9h 42m of her voice saved."
   **Highest LinkedIn-repost ceiling of anything generated.** **Risk:** reads as data-art rather
   than a reinvented app; "Mom" framing can read as cheap emotional leverage.
3. **JURY DUTY SUMMONS REWRITTEN FOR YOU** — invert who the document is addressed to.
   **Risk:** lowest screenshot density; one page of typography looks thin.

**Killed:** all four receipt variants *despite top raw drama* — 3 of 4 independent generators
produced a grocery receipt unprompted, **a direct measurement that the field will converge
there** · pharmacy/PBM + 401(k) on locale (no PBMs or 401(k)s in Calgary) · gas pump / queue
display (hardware panels are not "application formats") · mortgage & credit-card statement
(fintech-adjacent; the brief itself names "interest → years of your life" = collision magnet) ·
pay-stub "value you generated" column (invented methodology reveals an argument, not a hidden
number) · boarding pass & loyalty cards (weaker siblings of voicemail).
**Best alternate:** parking ticket as a two-outcome decision card (pay $85 vs contest — 61%
dismissal rate, avg 12 min). Beats jury summons on recognizability, loses on novelty.
