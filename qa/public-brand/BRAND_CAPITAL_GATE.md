# Public Brand Capital Gate

**Status:** release blocking for public-facing GreenSquare surfaces.

Technical correctness is necessary but not sufficient. A change does not ship if the resulting public surface looks like a generic AI-generated site, an indie SaaS starter or a collection of individually competent components without one authored design system.

## Required standard

A reasonable informed viewer should believe the surface belongs to a well-capitalised, globally credible technology and professional organisation. The quality reference is the level of craft, restraint and systems coherence associated with companies such as Google Labs, Stripe, ElevenLabs and IBM. These are quality references only, never visual templates.

## Five pass/fail dimensions

Every dimension must pass. There is no averaging across failures.

### 1. Art direction

Pass only when the composition feels authored, recognisably GreenSquare and governed by one visual idea.

Fail for template-like hero treatments, gradient/glow AI motifs, decorative technical theatre, soft floating cards, arbitrary rounded containers, gratuitous 3D, visual novelty without product meaning or pattern usage that competes with the content.

### 2. Product fidelity

Pass only when visuals demonstrate real GreenSquare behaviour, real terminology and plausible product states.

Fail for fake dashboards, fabricated metrics, generic chat simulations, animation that implies unsupported product capability or decorative abstractions standing in for the product.

### 3. Typography and composition

Pass only when hierarchy, spacing, alignment, negative space, line length and responsive recomposition remain deliberate at desktop, tablet and mobile sizes.

Fail for accidental wrapping, inconsistent axes, cramped mobile layouts, weak optical balance, excessive density, arbitrary spacing or any surface that looks assembled rather than designed.

### 4. Motion and interaction

Pass only when motion explains state change, responds predictably, settles cleanly and remains useful without animation.

Fail for looping content animation, bounce, elastic easing, glow, typewriter theatre, unnecessary parallax, hover-only meaning, delayed content or movement added solely to make the page feel technological.

### 5. System consistency

Pass only when the new surface belongs to the same organisation as the navigation, typography, Through-flow V4 system, acquisition flow and other public GreenSquare assets.

Fail for parallel design systems, local token inventions without need, mismatched control styles, inconsistent evidence semantics or a demo that feels embedded from another product.

## Evidence required before release

1. Production build passes.
2. React hooks lint passes on changed React code.
3. React Doctor changed-code scan does not regress.
4. React Doctor design scan passes on changed UI.
5. Browser QA passes on `/`, `/decision-frame/` and `/product/` at desktop, tablet and mobile widths.
6. Reduced-motion behaviour passes.
7. QA screenshots are generated and inspected at all three viewport classes.
8. Interactive demo states are exercised, not only initial render.
9. A reviewer records **Brand Capital Gate: PASS** after inspecting the screenshots and preview.

## Performance diagnostic

React Scan is diagnostic, not a production dependency. Use it on the Vercel preview when an interactive surface shows unexpected render churn or performance degradation. Do not ship React Scan instrumentation.

## Documentation currency

Context7 is an agent/development aid, not a website dependency. When it is configured in the coding environment, use it for version-specific library and API documentation. If unavailable, use primary official documentation rather than guessing.

## Release decision

A surface that is technically correct but merely looks like “good SaaS” fails this gate.
