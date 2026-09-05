# Frame process component design record

## Overview

This records the implemented static storyboard in `src/components/FrameProcessAnimation.astro`, its illustrative narrative in `src/data/frame-process.ts`, and the active site tokens in `src/styles/tokens-v2.css`. It is a scoped extension of the existing site, not a replacement design system. The seven compositions await Karim's approval before motion implementation. See `frame-process-animation.md` for integration and verification gates.

The example shows how a capacity constraint changes a growth question, how common criteria compare alternatives, and how a tested assumption changes support. The capacity finding is illustrative; it is not a benchmark, customer result or claim that staged expansion is universally best.

## Colors

| Active token | Value | Component use |
| --- | --- | --- |
| `--v-paper` | `#ffffff` | Figure, input and option surfaces |
| `--v-ink` | `#12140f` | Primary text and initial question boundary |
| `--v-ink-soft` | `#4f514b` | Secondary text, ordinary connectors and untested assumption marks |
| `--v-line` | `#dedad2` | Dividers, opened old boundary and retained alternatives |
| `--v-green` | `#133f26` | Reframed boundary, active criterion, finding, conditional support and resolution |
| `--v-lime` | `#dff49f` | The words “without overloading” in the reframe |

Text, labels, border weight and dashed marks carry state alongside color.

## Typography

Only the figure's principal title uses `--vf-display`: `'Space Grotesk', 'Space Grotesk Fallback', Arial, sans-serif`. It is weight 600, `--vs-h2` (`clamp(1.65rem, 2.5vw, 2.45rem)`), line-height 1.16 and letter-spacing `-.025em`.

All functional copy uses `--vf-body`: `'IBM Plex Sans', 'IBM Plex Sans Fallback', Arial, sans-serif`. Introductory copy uses `--vs-body` (`clamp(1rem, 0.96rem + 0.18vw, 1.075rem)`) at line-height 1.6 with a 65ch limit. Small text uses `--vs-small` (`clamp(0.96rem, 0.93rem + 0.1vw, 1rem)`); labels use `--vs-label` (`0.9375rem`, 15px at the normal root size). Option and resolution text use `--vs-h4` (`1.0625rem`) at weight 500. Constraint emphasis and the human checkpoint use `--vs-h3` (`1.3125rem`).

The transformed question is the largest functional statement: `clamp(1.8rem, 3.6vw, 3.1rem)`, line-height 1.2, maximum 31ch. It becomes 1.8rem below 600px. The later persistent question uses `clamp(1.4rem, 2.3vw, 2rem)`, becoming 1.4rem on mobile.

## Layout

The figure sits on the white page below the homepage hero. The introduction is capped at 56rem; the canvas reserves a 540px minimum height. Desktop inputs and alternatives use four equal columns. The reframe puts the capacity constraint and original question in a `1fr 1.4fr` grid, with the new question spanning both columns. The initial question is capped at 32rem and the persistent question at 45rem. Criteria occupy a separate horizontal track. The resolution has four columns.

Spacing inherits `--v-1/2/3/4/5/6/8/10/12`: 4/8/12/16/24/32/48/64/96px. Common desktop padding and gaps are 24px. At 1000px and below, input and option padding becomes 16px, criteria stack, and resolution fields become two columns.

At 600px and below, the canvas minimum is 480px. Inputs and intermediate alternatives stack with side collectors and dedicated narrow connectors. The reframe becomes vertical. The final state uses a two-by-two alternative matrix, a compact feedback statement, and a single vertical group of four resolution fields. The human checkpoint aligns left. This is a recomposed mobile sequence, not a scaled desktop SVG.

## Elevation & Depth

The component has no shadows. White surfaces, single-pixel rules, spacing and connector routes establish grouping. SVG strokes do not scale with their viewBox. Green two-pixel boundaries distinguish reframing and conditional support without changing the alternatives' dimensions.

## Shapes

Containers have square corners. Assumptions have dashed boundaries; the untested question has a dashed underline. The old question's bottom border is absent and a short displaced rule suggests its boundary opening. The human checkpoint uses a small outlined square.

## Components

### Semantic evidence states

| Phase | Visible purpose |
| --- | --- |
| 1 — Situation | Separate facts, constraints, assumptions and goals; staggered inputs suggest an unresolved situation. |
| 2 — Question | Connect those inputs to the bounded “Should we expand?” question. |
| 3 — Reframe | Bring capacity and service quality into the question itself. |
| 4 — Options | Present four equal alternatives, including maintaining the current position. |
| 5 — Comparison | Apply growth, capacity, cost, risk and reversibility consistently; underline Capacity and show each option's capacity consequence and trade-off. |
| 6 — Uncertainty | Test whether managers can absorb more; the finding reduces immediate expansion's support. Staged expansion gains a stronger boundary while retaining its capacity condition. |
| 7 — Decision | Retain all alternatives, the finding, direction, reasons and trade-offs, conditions, next step and “You make the call.” Demand durability remains uncertain. |

### Reframe signature

The central transformation changes “Should we expand?” to “How should we grow without overloading the business?” The capacity constraint feeds a visibly larger green boundary; the new words receive the lime highlight. In this static phase, the opened old border and connector encode the intended transformation. They do not animate yet.

### Static review and no-motion fallback

`state` is a 1-based prop clamped to phases 1–7 and defaults to 7. Seven deterministic `/frame-storyboard/[state]/` review routes render server-side compositions. The default homepage state is the complete static explanation, with no JavaScript required. The figure has a title, descriptive text equivalent and illustrative-example disclosure; decorative SVGs are hidden from assistive technology.

No playback, scrubbing, sticky timeline, GSAP dependency or animated breakpoint rebuilding is implemented. Reduced-motion users currently receive the same static content as everyone else. Future enhancement must retain the complete final structure when motion is disabled or unavailable and must not autoplay or scrub for reduced motion.

### Stable targets and later motion

Scope future selectors to the figure instance, whose default `id` is `frame-process`; supply unique IDs for multiple instances. The stable hooks are `data-frame-process`, `data-state`, `data-phase`, `data-part`, `data-input`, `data-option` and `data-field`. Named parts include inputs, initial-question, reframe, reframed-question, criteria, alternatives, feedback, resolution and human-checkpoint. Input and option IDs come from the narrative data; field targets use the field names.

The current renderer conditionally includes phase groups. Approved motion work must retain the groups needed for continuous transitions rather than swap these static scenes. GSAP/ScrollTrigger timing, geometry, teardown, resize behavior and performance require a separate implementation and preview verification. Static approval is not completed-motion approval or production approval.

## Do's and Don'ts

- Do preserve the capacity condition, remaining uncertainty, retained alternatives and human decision authority.
- Do preserve the common comparison criteria and visible trade-offs without inventing numerical scores.
- Do keep motion hooks instance-scoped and keep the static explanation usable independently.
- Don't present illustrative evidence as research or a customer outcome.
- Don't infer animation quality, scroll behavior or production readiness from these static compositions.
