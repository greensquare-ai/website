# GreenSquare peer design bar

**Status:** governing reference for the public website visual finish.

This file supplements `BRAND_CAPITAL_GATE.md`. It does not create a second design system. It defines the external quality bar and the role each reference is allowed to play.

## Objective

GreenSquare should be credible beside Google DeepMind, Linear, Stripe, ElevenLabs, Anthropic and IBM research/product surfaces without imitating any of them.

The target is not visual novelty. It is clarity, beautiful execution, evidence-led communication and the finish expected from a globally credible technology and professional organisation.

## Reference hierarchy

### 1. GreenSquare V4: identity and semantics

GreenSquare V4 remains authoritative for identity, typography, colour, evidence semantics and the Through-flow visual grammar.

The V4 system must carry meaning. Pattern is secondary to information. Do not repeat Through-flow geometry as ambient decoration.

### 2. Google DeepMind / Google Research: research clarity

Learn from:
- real research or product mechanisms as the visual material;
- sparse figures with one idea per figure;
- strong captions and annotations;
- generous but purposeful negative space;
- quiet editorial hierarchy;
- authority created by substance rather than effects.

Do not copy Google typography, colour or illustration.

### 3. Linear: precision and restraint

Reference: `VoltAgent/awesome-design-md/design-md/linear.app/DESIGN.md`.

Learn from:
- disciplined spacing and typography;
- quiet surface hierarchy;
- hairlines rather than shadows;
- one chromatic accent used sparingly;
- product/evidence doing the visual work;
- minimal marketing chrome.

Do not copy Linear's dark theme or lavender accent.

### 4. Stripe: infrastructure credibility

Reference: `VoltAgent/awesome-design-md/design-md/stripe/DESIGN.md`.

Learn from:
- confidence in dense information;
- tabular/numeric discipline;
- product proof and evidence integrated into the page;
- a clear hierarchy between editorial content and technical detail;
- selective brand moments rather than continuous visual signalling.

Do not copy Stripe's gradient mesh or colour system.

### 5. ElevenLabs: content supplies the voltage

Reference: `VoltAgent/awesome-design-md/design-md/elevenlabs/DESIGN.md`.

Learn from:
- neutral architecture;
- light editorial hierarchy;
- quiet controls;
- letting the actual product/output provide interest rather than decorating the shell.

Do not copy its serif/editorial aesthetic or gradient orbs.

### 6. IBM Carbon: system discipline

Reference: `carbon-design-system/carbon` and the IBM analysis in `VoltAgent/awesome-design-md`.

Learn from:
- explicit grids and spacing systems;
- semantic colour;
- accessible information hierarchy;
- data-heavy clarity;
- repeatable system behaviour.

Do not make GreenSquare look like an IBM product.

## Implementation references

Use these as engineering and QA references, not as visual templates:

- `radix-ui/primitives`: accessible behaviour and interaction primitives.
- `vercel-labs/agent-skills/skills/web-design-guidelines/SKILL.md`: interface QA and implementation correctness.
- `microsoft/skills/.github/skills/frontend-design-review/SKILL.md`: final craft, friction and trust review.
- `shadcn-ui/ui`: implementation examples only. Its default visual language is not a GreenSquare reference.

## Anthropic skill boundary

`anthropics/skills/skills/frontend-design/SKILL.md` may be used only as a critic for principles such as:

- structure is information;
- decorative elements must encode something true;
- self-critique before shipping;
- typography and spacing require deliberate choices;
- remove an unnecessary visual element before adding one.

**Do not use the Anthropic skill as GreenSquare art direction.**

Its aesthetic suggestions, font recommendations, layout tendencies, signature motifs and generic anti-template responses are not visual inputs. Many agents use the same skill, so following its aesthetics risks the same generative-design convergence GreenSquare is trying to avoid.

## Website composition rules

1. Evidence, product behaviour and reasoning structure are the primary visual material.
2. A page should normally have one dominant visual idea, not one visual idea per section.
3. Prefer typography, rules, alignment and whitespace before cards, containers or illustration.
4. Use cards only when the information is genuinely a bounded object.
5. Avoid equal-sized panels for information of unequal importance.
6. Do not use abstract AI imagery, glowing geometry, gradient meshes, floating cards, faux product windows or decorative technical complexity.
7. Through-flow geometry is a signature, not wallpaper. Use it sparingly and only where it communicates passage, boundary, movement or state.
8. Colour carries identity or semantics. It does not fill space because a composition feels empty.
9. Motion is exceptional. Static-first is the default.
10. The professional remains visibly accountable for the decision.

## Visual proportion

For public GreenSquare surfaces, use this as a judgement heuristic rather than a mechanical formula:

- **80%** typography, information architecture, evidence and real product structure;
- **15%** GreenSquare spatial/line grammar;
- **5%** explicit brand signalling.

If a page still looks distinctive after the logo, decorative geometry and colour are removed, the system is doing its job.

## Explicit anti-patterns

Reject:
- abstract animated hero geometry as the primary value signal;
- bento layouts without semantic need;
- chunky paired CTAs with equal emphasis;
- oversized rounded cards;
- pseudo-technical microcopy used only to manufacture sophistication;
- ornamental line intersections repeated page after page;
- boxed diagrams that would be clearer as editorial figures;
- generic progress rails and numbered pills;
- large empty areas created by fixed templates rather than content rhythm;
- gradients, glows, blur or parallax used to signal AI;
- decorative motion;
- any composition that looks recognisably generated from a common AI design prompt.

## Release question

Before release, ask:

> If the GreenSquare logo were removed, would the typography, evidence treatment, figure design, hierarchy and spatial discipline still feel like one serious professional institution?

If not, the public Brand Capital Gate fails.