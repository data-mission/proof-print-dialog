# Scroll-animation techniques — extracted from `bty` POP + ACID drafts

Source: `/Users/vlad/repos/bty/_dev_notes/concept/`
Copies preserved in `_brainstorming/evidence/`.
Origin commit: `d08003a` — "Domain finalized getbty.com, landing page drafts".
Four skins existed: `acid`, `pop`, `kinetic`, `original`. **A/B finalists were acid + pop** —
i.e. the two you remembered as "pop and toxic". "Toxic" = **ACID** (electric chartreuse
`#c9ff2e` on green-biased near-black `#0b100c`, hot magenta `#ff3d8e` accents).

Both are single-file, zero-dependency, no-framework, no-external-resources HTML.
Both hit the same architecture. That architecture is the reusable asset.

---

## The shared engine (this is the part worth stealing)

**One `requestAnimationFrame` loop + one `IntersectionObserver`. No library. No scroll-jacking.**

```js
addEventListener('scroll', () => { dirty = true; }, { passive: true });
function frame(now) {
  if (dirty) { dirty = false; /* ...all reads+writes... */ }
  requestAnimationFrame(frame);
}
```

A dirty-flag gate so scroll events never do layout work themselves — the rAF loop is the only
place the DOM is touched. Passive listener, so scrolling is never blocked.

### Two progress functions do all the math

```js
// element pinned via position:sticky — 0..1 across its scroll-through
function pinP(el){ const r=el.getBoundingClientRect(), d=r.height-innerHeight;
  return d<=0 ? 1 : clamp01(-r.top/d); }

// element flowing past the viewport — 0..1 from first-touch to fully-gone
function flowP(el){ const r=el.getBoundingClientRect();
  return clamp01((innerHeight-r.top)/(innerHeight+r.height)); }
```

Every animation in both files is a remap of one of those two scalars. That's the whole trick:
**one scalar per scene, then slice it.**

### Slicing — staggering N elements off one scalar

```js
const seg = clamp01((p - idx/N) * 6);        // acid: per-line offset with steep gain
const lp  = clamp01(q*2.6 - 0.35 - j*0.045); // pop: gain, bias, per-index delay
```

The `*2.6 - 0.35` pattern is a **gain-and-bias remap**: multiply to compress the action into
part of the scroll range, subtract to delay its start. Per-index term staggers the cascade.

---

## Technique inventory

| # | Technique | ACID | POP | How |
|---|---|---|---|---|
| 1 | **Pinned scene** | `.pin{position:sticky;top:0;height:100vh}` | `.stage .sticky{position:sticky;top:0;height:100vh;overflow:clip}` | Tall parent scrolls, child pins; `pinP()` reads progress |
| 2 | **Scroll-scrubbed decode** | 24 INCI chips light/dim as sweep advances | 18 chips dim, live counter | `Math.floor(p*N)` → `classList.toggle` per index |
| 3 | **SVG line-draw** | `pathLength=1` + dashoffset 1→0 | measured `Math.hypot(dx,dy)` dasharray | Stagger by index → network "grows" |
| 4 | **Node pop-in** | `.hid` class toggle | `transform:scale(0→1)` w/ `transformOrigin` at `cx,cy` | Threshold per index off same scalar |
| 5 | **Word-by-word close** | `.close-line .w.off{opacity:.12;transform:translateY(.25em)}` | — | Sentence assembles as you scroll into it |
| 6 | **Timeline spine** | `--tp` custom prop → `scaleY` | `spine.style.transform=scaleY(s)` | `transform-origin:top`, markers un-dim past threshold |
| 7 | **Parallax** | `[data-px]` → `translate3d(0,Ypx,0)` | `[data-float]` → translateY **+ rotate** | Offset from viewport centre, scaled per element |
| 8 | **Velocity-reactive marquee** | — | `vel = vel*0.9 + abs(Δy)*0.1` drives ticker speed | Smoothed scroll velocity; page *feels* alive |
| 9 | **Progress hairline** | 2px acid bar, `scrollY/docH` | — | Cheapest possible "this page is a journey" signal |
| 10 | **Auto-hiding HUD** | `.hud.gone` on scroll-down past 0.6vh, returns on scroll-up | — | Direction-aware chrome |
| 11 | **IO reveals w/ CSS-var delay** | `.rev-init` → `.in` | `[data-reveal]` + `style="--d:.12s"` | Per-element stagger authored **in HTML**, not JS |
| 12 | **Intro auto-play** | `INTRO_TARGET=.16` eased over 1700ms | `auto = min(0.2,(now-t0)/8000)` | `p = max(autoProgress, scrollProgress)` — animates before you touch anything |
| 13 | **Film grain** | `position:fixed;mix-blend-mode:overlay` | — | Static overlay, huge texture payoff |
| 14 | **Hard-shadow pop physics** | — | `translate(-2px,-2px)` + `8px 8px 0` shadow on hover; inverts on active | Sticker/tactile feel, no images |

### Technique 12 is the one that matters for an AI judge
`p = Math.max(autoProgress, scrollProgress)` — the scene **plays itself** on load and scroll
takes over seamlessly. A screenshot taken at t=2s is already mid-drama instead of at frame zero.

---

## The two skins

**ACID / "toxic"** — lab-report brutalism. `--void:#0b100c`, `--acid:#c9ff2e`, `--hot:#ff3d8e`.
All-mono type, wide letterspacing, uppercase micro-labels, fixed film grain, vertical-writing
scroll cue, glowing box-shadows on the acid elements. Reads as instrument readout.

**POP** — hyper-pop stickers. `--blue:#2B3BFF`, `--pink:#FF4D9E`, `--yellow:#FFD21C` on white.
Rounded-900 display type, `--stroke:3px` outlines, 3D hard shadows, rotated elements
(`--r:-1.5deg` per element), overshoot easing `cubic-bezier(.2,.9,.25,1.18)`.

---

## Progressive-enhancement contract (both files, identical, and it's the right call)

```
<html class="no-js">  →  JS removes no-js, adds js
```
CSS **final states are the default**. JS *rewinds* them to start states, then scroll replays.
Result: no JS, or `prefers-reduced-motion`, or a crawler → a complete, readable, finished page.
Never a blank one. Also means: **an AI that screenshots without executing JS still sees a
finished design.** Keep this contract.

---

## Direct implications for the hackathon (AI judges screenshots)

1. **#12 (auto-play intro) is mandatory.** Anything that requires scroll to become interesting
   is invisible to a judge that captures a frame.
2. **#3, #5, #6 (line-draw, word-assembly, spine) are near-worthless mid-animation** — a
   half-drawn line photographs as a bug, not as craft. Either capture them at `p=1` or don't
   rely on them.
3. **#13, #14, and the two palettes are pure static value.** Grain, hard shadows, rotation,
   and a committed palette all survive a PNG at full strength.
4. **#9 (progress hairline) and #1 (pinned scene) read as "considered product"** in a still —
   they cost almost nothing and signal intent.
5. The reusable engine is ~60 lines. Porting it costs minutes, not hours.
