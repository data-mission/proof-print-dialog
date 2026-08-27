# Review Personas — PROOF (the print dialog, reinvented)

11 personas across 8 countries, ages 29–63, spanning heavy professional
printers, near-never printers, budget owners, and four expert lenses.
Built 26 Aug 2026 for the print-dialog reinvention.

## The cast

### Tier 0 — Synthesis
0. [Marisol](00-marisol-product-lead.md) — 41, Austin, product lead, ex-document-workflow. Decides when the cast disagrees.

### Tier 1 — Target users
1. [Deb](01-deb-litigation-paralegal.md) — 52, Chicago, litigation paralegal. 1,500–8,000 sheets/week. The heaviest printer alive.
2. [Tomás](02-tomas-near-never-printer.md) — 29, Lisbon, product designer. Prints 6x/year at a shop, €0.10/sheet.
3. [Angela](03-angela-office-manager.md) — 47, Manchester, office manager, £9,400/yr consumables budget, 30 seats.
4. [Henrik](04-henrik-sustainability.md) — 34, Oslo, sustainability lead. Sympathetic and therefore dangerous.
5. [Yvonne](05-yvonne-low-vision.md) — 63, São Paulo, retired, macular degeneration. Prints *because* of her vision.
6. [Kate](06-kate-secondary-teacher.md) — 44, Dublin, teacher, 4,000-page term quota, prints class sets of 30.

### Tier 2 — Domain expert
7. [Raj](07-raj-print-fleet-admin.md) — 38, Bengaluru, managed print services architect, fleets of 400–3,000 devices.

### Tier 3 — Technical expert
9. [Priyanka](09-priyanka-agent-evaluator.md) — 33, Seattle, agent tooling engineer. Has written 11 MCP servers, deleted 6.

### Tier 4 — Experience expert
10. [Ife](10-ife-design-director.md) — 31, Toronto, design director. Predicts the AI judge's aesthetic score.

### Tier 5 — Risk / adversary
8. [Dmitri](08-dmitri-skeptic.md) — 36, Berlin, staff engineer. Here to argue the product should not exist.

---

## Product bets PROOF is making

1. **CORE ACTION** — the user looks at a wall of readable page thumbnails
   instead of a 104px preview, and drops the flagged sheets.
2. **VALUE MOMENT** — "15 → 10. You were about to print 5 sheets of nothing."
3. **BEHAVIOURAL BET** — the user will route their print through PROOF
   *instead of* the OS dialog they already have muscle memory for.
4. **TRUTH BET** — every number on screen is measured, and the user can
   verify the method. This is the entire differentiator.
5. **FORMAT BET** — .html/.txt/.md is a sufficient input surface.
6. **AGENTIC BET** — an MCP server makes this infrastructure, not a page.
7. **STAKES BET** — five sheets and six cents is enough to make someone care.

---

## Cross-cutting tables

### Relationship to the core action

| Persona | Prints | Would drop pages? | Blocker |
|---|---|---|---|
| Deb | 1,500–8,000/wk | **No** — blanks can be legally mandatory | Bates numbering, PDF-only |
| Kate | class sets of 30 | Yes, eagerly | PDF-only, no copies field |
| Yvonne | weekly, growing | Only if shown what's on the sheet | Her own vision vs. the UI |
| Angela | rarely herself | N/A — she buys, doesn't print | Not present at the moment of print |
| Henrik | regulatory only | Yes, already does mentally | Nothing changes for him |
| Tomás | 6x/year | Sure, but it's noise | No volume, no reason to return |
| Dmitri | ~1x/year | Argues nobody should build this | Category doubt |

**Insight:** the two personas with the *most* volume (Deb, Kate) are both
blocked by the same thing — **their documents are PDFs**. The format bet
fails precisely where the value is highest. The personas who can use it
today are the ones for whom it matters least.

### Emotional relationship to waste

| Persona | Feeling | Source | Does "sheets of nothing" land? |
|---|---|---|---|
| Kate | Anxiety | Quota scarcity | Yes — hardest of anyone |
| Deb | Professional shame | A reprint at 11pm | **No — reads as being corrected** |
| Angela | Budget frustration | £310/head/yr | Only if aggregated |
| Henrik | Moral, but calibrated | Knows 5 sheets = 24g CO2e | No — scale too small |
| Yvonne | Confusion, not guilt | Can't see what she printed | Reframed: "now you can see" lands |
| Tomás | Mild embarrassment | €4 accident | Barely |
| Dmitri | None | Doesn't print | No |

**Insight:** the copy "You were about to print 5 sheets of nothing" is
written for Kate and lands on Deb as condescension. It is the single most
emotionally divisive string in the product, and Deb is the expert user.

### Which number do they actually want?

| Persona | PROOF shows | They want |
|---|---|---|
| Angela | $0.06 saved | sheets saved / month / department |
| Kate | $0.06 saved | pages against a 4,000 quota × 30 copies |
| Henrik | $0.06 saved | nothing — or honest CO2e, or silence |
| Raj | ink coverage % | click count, and the error bar vs device MIB |
| Deb | ink coverage % | page integrity, not ink |
| Tomás | $0.012/sheet | €0.10/sheet — the number is 8x off his reality |

**Insight:** the cost tile is the weakest module on screen. It is the
correct number for nobody in the cast. Four personas want a *different
unit*, and one (Tomás) would spot it as an order-of-magnitude mismatch
with his real cost.

### The one-second comprehension test

| Persona | Understands in 1s? | What they see |
|---|---|---|
| Ife | Yes | "pages, some flagged pink — a print checker" |
| Tomás | Yes | "print preview, but big" |
| Dmitri | Yes | "print preview, but big. And?" |
| Kate | Yes | "it shows me every page" |
| Deb | Yes | "it wants to delete pages from my document" |
| Angela | Partly | "a print thing — not sure what I do with it" |
| Yvonne | Partly | sees the yellow card, cannot read the thumbnails |
| Henrik | Yes | "waste flagging" |

**Insight:** comprehension is NOT the failure mode this time. 6 of 8 get it
instantly and the other 2 get it in three seconds. The DOSE problem is
solved. The remaining risks are trust and stakes, not legibility.

---

## The three universal questions

1. **Would you route your print through this instead of Cmd+P?**
   (Tests the behavioural bet. If most say no, it's a viewer, not a dialog.)
2. **Do you believe the numbers?** (Tests the truth bet — the whole product.)
3. **Would you tell someone about it?** (Tests whether it's memorable or
   merely correct.)

If most say no to #1, ship it as a *document viewer* and stop calling it a
dialog. If any say no to #2, nothing else matters. If most say no to #3,
it is a competent utility with no magic — and the judge is scoring magic.

## Marisol's uncomfortable questions

- Is the concept interesting, or just correct?
- Who was the invisible MCP server built for?
- Is the emotional payload oversized for five sheets and six cents?
- Would the flag rate survive a document we didn't author?
- Have we actually read our own screen?
- Would cutting the wall and shipping only the X-ray make it smaller and
  much more memorable?
