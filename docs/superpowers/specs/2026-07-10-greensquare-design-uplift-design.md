# GreenSquare Design Uplift — Scope & Brief

**Date:** 2026-07-10
**Repo:** `_repo-greensquare` (Astro, "Operational Gravity" v2 system)
**Live:** https://greensquare-two.vercel.app/
**Purpose of this doc:** the *scope and constraints* for an ultra-premium design uplift. It defines the
what, the locked decisions, and the acceptance bar. The *how* (exact type scale, motion system, card
and eyebrow treatments) is Fable's job in the design-architecture phase that follows this spec.

Australian English. No em dashes (commas/parentheses). Brand voice and the word blacklist in the repo
`CLAUDE.md` still apply. Visual north star stays Linear / Palantir: quiet authority, infrastructure-first.

---

## 1. Goal

Take the site from "nearly there" to an ultra-premium feel, remove every element that reads as
obviously AI-generated, and reduce the system to a disciplined, reusable brand kit. The brand kit
produced here becomes the source of truth that also re-skins the free Decision Frame afterwards.

Two success tests, applied to every change:
1. **Would a top studio ship this?** No AI tells (tracked eyebrows, arrow links, coloured card lips,
   near-invisible hairlines, green-on-green text).
2. **Does it collapse into a system?** Fewer fonts, fewer weights, one set of tokens, reused components.
   No one-off styles.

---

## 2. Locked decisions (confirmed with the owner)

1. **Font system: three families.**
   - `Space Grotesk` = display / headers (the hero font, kept).
   - `Manrope` = body, sub-heads, captions, **and the GreenSquare wordmark in SemiBold**.
   - `IBM Plex Mono` = reserved for the code/markdown *readout artefacts* only (e.g. `DECISION_BRIEF.md`
     module). Never for eyebrows or section labels.
   - **`Cormorant Garamond` is removed entirely.** The single serif pull-quote on the home page is
     re-set in Space Grotesk (or Manrope), Fable to choose.
   - A tight, deliberate weight ladder. Reduce the number of weights in play; Fable defines the exact set.

2. **Pricing / CTA: full reorient to email capture.**
   - Remove **Pricing** from the nav. Redirect `/pricing` to home (keep the page file, unlinked).
   - Every primary CTA (nav button, hero, split-CTA, home free-frame section) becomes **"Get the free
     Decision Frame"** and points at the email capture (Kit form 9283111).
   - The **Product** page keeps explaining the paid Decision, but its buy/`$49` CTA is replaced by the
     free-frame capture. No `$49` price surfaced anywhere at launch.
   - Add "pricing page + buy flow" to the roadmap doc (`docs/` or `00_strategy` roadmap) so it is not lost.
   - The Stripe/price wiring stays in the repo, dormant and unlinked.

3. **Eyebrows: mostly removed, quiet label where earned.**
   - Default: drop the kicker and lead with the headline.
   - Where a kicker genuinely aids scanning, render it small, **sentence-case Manrope, muted ink, no
     letter-spacing, no hairline rule**. Kill `.v-label--rule` (the left vertical rule) as a motif.
   - Same treatment on the benchmark condition cards.

---

## 3. System-level changes (fix once, propagates everywhere)

These live in `tokens-v2.css` / `global-v2.css` and cascade across all pages.

1. **Green-button contrast bug.** `.v2 a { color: var(--v-green) }` out-specifies `.v-btn--green`, so
   green link-buttons render green-on-green. Fix specificity so all filled buttons have high-contrast
   (cream/white) text. Verify: nav "Get the free frame", hero primary, split-CTA button.
2. **Remove extended letter-spacing globally.** Eyebrows (`0.16em`), nav/footer labels (`0.14em`),
   table heads, readout bars, legal line. Target near-zero tracking. (Mono readout chrome may keep the
   minimum tracking mono legibility genuinely needs, Fable's call, but no "spaced-out" look anywhere.)
3. **Remove all `→` arrow glyphs** from links/buttons (hero, evidence, split-CTA, benchmark). Motion or a
   button shape carries affordance instead.
4. **Secondary button style.** Introduce a proper secondary/ghost button of equal height/width weight to
   the primary, in a contrasting scheme. Convert the hero `See the benchmark` link and peers to it.
5. **Borders / elevation.** The `rgba(...,0.13)` hairlines read as unnatural AI borders. Replace the card
   treatment with either higher-contrast structure or (preferred) a restrained motion/elevation system on
   hover so cards feel prominent without heavy outlines. Fable defines the motion system (Linear-grade
   restraint: short, eased, purposeful; respects `prefers-reduced-motion`).
6. **List markers.** Replace the em-dash bullet (`.v-marked li::before { content: '—' }`) with a more
   elegant marker consistent with the brand mark (Fable to design). Apply to every instance (benchmark
   key findings, pricing tiers, anywhere else).
7. **Decorative dot separators (`·`).** Remove from footer meta and the legal line. Within operational
   readout data lines, replace with a subtler treatment (spacing or a hairline), no scattered middots.
8. **Wordmark.** GreenSquare wordmark set in Manrope SemiBold in nav and footer (currently Space Grotesk).
9. **Font loading.** Drop the Cormorant Garamond web font; add/confirm IBM Plex Mono is scoped to the
   readout use only. Trim unused weights from the font links.

---

## 4. Component & page-specific work

**Nav (`NavV2.astro`)**
- Remove Pricing link. CTA button becomes the free-frame CTA. Ensure the CTA text is visible (bug #3.1).

**Footer (`FooterV2.astro` + `.v-footer` styles)**
- Darker green than the section above it. Introduce/darken a footer-specific green (deeper than
  `--v-green-deep`) so the split-CTA green and the footer are clearly separated.
- Footer mark in a contrast colour (lime) on the dark footer, so it is visible. Needs a lime/cream
  variant of `logo-mark.svg`.
- Remove `ABN TO BE CONFIRMED` (here and anywhere else it appears).
- Remove `·` separators. Remove the Pricing link from the footer columns.
- Wordmark in Manrope SemiBold.

**Home (`index.astro`)**
- Hero: primary CTA = free frame (visible text); secondary = benchmark as a contrasting box button, no arrow.
- Free-frame section: **balance the two columns.** Today the left copy sits flush on grey while the form
  is boxed in a `.v-card`, so they look asymmetric. Make the pairing tidy and balanced (both framed, or a
  single unified module), and make the email input + submit read as one cohesive control.
- Split-CTA: both panels point at the free frame; darker/greener footer must be distinct from the green panel.
- Pull-quote: re-set without Cormorant.
- Evidence green block: the darker readout box on green (see benchmark item) reworked the same way.

**Benchmark (`benchmark.astro`)**
- **Condition cards** ("how each condition treated the questions"): remove the green top-border "lip"
  (`.bm-col { border-top: 2px solid var(--v-green) }`). Replace with an elegant, non-AI treatment
  (motion/elevation or a considered structural cue). Rethink the card eyebrows per §2.3.
- **Key findings** box: replace the dash bullets (§3.6).
- **"Produced a defensible brief"** section: the dark `.v-readout` box on the already-dark green ground is
  not best practice. Rework the contrast (e.g. a light/paper or lime-accented module on green), applied
  consistently with the home Evidence block.

**Product / Pricing / Methodology / Decision-frame / Legal**
- Apply the reorient (§2.2) and all system changes. Redirect `/pricing`. Sweep every page for arrows,
  tracked eyebrows, dash bullets, `ABN`, `·`, and green-on-green.

---

## 5. Brand kit deliverable

Produce a single brand-kit reference (markdown + a rendered swatch/spec page) capturing the final system:
colour tokens and roles, the three-font ladder with weights and usage rules, button/link specs, the
eyebrow/label rule, list-marker, card + motion spec, logo/mark usage (incl. the lime variant), and a
do/don't list encoding the owner's rules (no tracked eyebrows, no arrows, no card lips, no dash bullets,
no green-on-green, no `·`, no `ABN`, no Cormorant). This is the artefact reused to re-skin the free
Decision Frame in a later pass (the Frame itself is out of scope here).

---

## 6. Quality bar

- **Responsive:** every page reviewed and correct at desktop, tablet and mobile; layout scales up and down
  as intended; no horizontal scroll; touch targets adequate. This is a required QA pass, not a spot check.
- **Accessibility:** text contrast passes on light and green grounds; focus states intact; motion respects
  `prefers-reduced-motion`.
- **No regressions** to the reveal animations (content must never render blank if JS runs) and no broken
  Kit form or redirects.

---

## 7. Out of scope (this pass)

- Re-skinning the free Decision Frame document (later, using the brand kit from §5).
- Building the pricing/buy flow (roadmapped, dormant).
- New copy or new benchmark data (voice/word rules still enforced on any text touched).
- Custom domain cutover.

---

## 8. Acceptance criteria

1. No green-on-green (or otherwise low-contrast) button text anywhere.
2. No extended letter-spacing anywhere; eyebrows removed or quiet per §2.3.
3. No `→` arrows, no em-dash bullets, no `·` separators, no `ABN TO BE CONFIRMED`, no Cormorant Garamond.
4. Exactly three font families in use, per §2.1; wordmark is Manrope SemiBold.
5. Secondary button exists and is used where the old underline links were; `See the benchmark` is a box.
6. Footer is a distinctly darker green than the section above it; footer mark visible (lime).
7. Pricing removed from nav/footer, `/pricing` redirects, every primary CTA is the free frame, no `$49` shown.
8. Home free-frame section reads as balanced/symmetrical; benchmark cards have no coloured lip; the
   defensible-brief and home Evidence modules no longer use a dark box on dark green.
9. Cards feel prominent via contrast or motion, not thin AI borders.
10. All pages pass the desktop + mobile QA and accessibility bar in §6.
11. Brand-kit reference (§5) exists and encodes the do/don't rules.
