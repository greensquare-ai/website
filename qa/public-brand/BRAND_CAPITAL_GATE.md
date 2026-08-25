# Public Brand Capital Gate

**Status:** release blocking for public-facing GreenSquare surfaces.

Technical correctness is necessary but not sufficient. A change does not ship if the resulting public surface looks like a generic AI-generated site, an indie SaaS starter or a collection of individually competent components without one authored design system.

## Required standard

A reasonable informed viewer should believe the surface belongs to a well-capitalised, globally credible technology and professional organisation whose product has been deeply considered, tested and built in service of the professional using it.

For explanatory product visuals, the reference is **research-grade communication**: the calm, sparse, mechanism-led clarity associated with Google Research / DeepMind figures and high-quality scientific or institutional publications. Linear is a reference for visual restraint and hierarchy. These are quality references only, never visual templates.

The operating principle is:

> **Explain the method. Show the evidence. Centre the human. Remove the interface.**

## Six pass/fail dimensions

Every dimension must pass. There is no averaging across failures.

### 1. Art direction

Pass only when the composition feels authored, recognisably GreenSquare and governed by one visual idea.

Fail for template-like hero treatments, gradient/glow AI motifs, decorative technical theatre, soft floating cards, arbitrary rounded containers, gratuitous 3D, visual novelty without product meaning or pattern usage that competes with the content.

### 2. Research clarity

Pass only when one figure communicates one mechanism or finding with the minimum visual apparatus necessary. Figures should remain intelligible when viewed as a static image with their caption.

Fail for faux product windows, dashboards, toolbars, progress rails, stacked explanatory chrome, unnecessary controls, animation used to manufacture sophistication or diagrams that require extensive decoding before the core idea becomes clear.

### 3. Product fidelity and human agency

Pass only when visuals demonstrate real GreenSquare behaviour, terminology and reasoning structure while preserving the professional as the accountable decision-maker.

Fail for fabricated software interfaces, invented metrics, generic chat simulations, autonomous-AI theatre, animation that implies unsupported capability or any depiction that suggests GreenSquare replaces rather than strengthens professional judgement.

### 4. Typography and composition

Pass only when hierarchy, spacing, alignment, negative space, line length and responsive recomposition remain deliberate at desktop, tablet and mobile sizes.

Fail for accidental wrapping, inconsistent axes, cramped mobile layouts, weak optical balance, excessive density, arbitrary spacing or any surface that looks assembled rather than designed.

### 5. Motion and interaction

Static-first is the default. Motion is acceptable only when it explains causal change better than a static figure and must settle quickly.

Fail for looping content animation, bounce, elastic easing, glow, typewriter theatre, unnecessary parallax, hover-only meaning, delayed content or movement added solely to make the page feel technological.

### 6. System consistency

Pass only when the new surface belongs to the same organisation as the navigation, typography, Through-flow V4 system, acquisition flow and other public GreenSquare assets.

Fail for parallel design systems, local token inventions without need, mismatched control styles, inconsistent evidence semantics or a figure that feels embedded from another product.

## Evidence required before release

1. Production build passes.
2. React hooks lint passes on changed React code.
3. React Doctor changed-code scan does not regress.
4. React Doctor design scan passes on changed UI.
5. Browser QA passes on `/`, `/decision-frame/` and `/product/` at desktop, tablet and mobile widths.
6. Reduced-motion behaviour passes.
7. QA screenshots are generated and inspected at all three viewport classes.
8. Every research figure has an explicit figure number/caption and remains understandable without motion or interaction.
9. A reviewer records **Brand Capital Gate: PASS** after inspecting the screenshots and preview.

## Performance diagnostic

React Scan is diagnostic, not a production dependency. Use it on the Vercel preview when an interactive surface shows unexpected render churn or performance degradation. Do not ship React Scan instrumentation.

## Documentation currency

Context7 is an agent/development aid, not a website dependency. When it is configured in the coding environment, use it for version-specific library and API documentation. If unavailable, use primary official documentation rather than guessing.

## Release decision

A surface that is technically correct but merely looks like “good SaaS” fails this gate. A GreenSquare product figure should be credible beside a research publication, institutional report or top-tier strategy document without needing decorative software chrome to signal sophistication.
