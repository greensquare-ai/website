# Frame process storyboard

Status: static composition approval candidate. Full motion requires Karim's approval of these seven states. This branch must not be promoted to production before the completed motion preview is approved.

## Integration and baseline

The public default branch is `main` at `8dc64d7`. The initial local baseline was `refine/recomposition` at `0d6039b`, including PR #26's typography/QA work, the reduced palette and Frame naming. While the storyboard was being built, that branch advanced to `5b905f7` with the centred marketing hero and an explicit below-hero animation slot. That update was merged into this isolated feature branch. Compare this feature against `refine/recomposition`, not against main, to see its exact scope. Reconcile the other branch before merging.

The homepage keeps the other agent's centred hero, copy and calls to action and places `FrameProcessAnimation.astro` in its below-hero `v-hero__visual` slot. The obsolete passage-only fixed height is removed from this slot because the responsive semantic composition supplies its dimensions. The old `ThroughFlowHero` source remains available, but its homepage import is removed. Retire that file only after final motion approval and a repository-wide import check. Frozen evidence and demonstration records are untouched by this feature.

## Files and responsibilities

| File | Responsibility |
| --- | --- |
| `src/data/frame-process.ts` | Single illustrative narrative: categories, questions, options, criteria, captions, final fields |
| `src/components/FrameProcessAnimation.astro` | Semantic text, SVG connectors, scoped desktop/mobile composition, default complete static state |
| `src/pages/frame-storyboard/[state].astro` | Seven deterministic static review URLs; current state marked accessibly |
| `src/pages/index.astro` | Proposed below-hero integration |
| `src/layouts/BaseLayoutV2.astro` | Optional noindex metadata for review routes |
| `astro.config.mjs` | Excludes review routes from sitemap |
| `qa/check-frame-process.mjs` | Every state at 1440/820/390, readable text, accessibility, equal alternatives, no-JS reduced-motion meaning |
| `qa/run-launch-qa.mjs` | Existing regression suite now checks decision meaning rather than the obsolete component name |

All colours and typography inherit active site tokens. Functional text uses IBM Plex Sans, at least 15px. Only the principal title uses Space Grotesk. No dependencies were added in the static phase. Install GSAP from npm when motion work is authorised; use its ScrollTrigger plugin, not another animation library.

## Narrative contract

1. Separate facts, constraints, assumptions and goals. Dashed assumption boundaries distinguish claims that need testing.
2. Let “Should we expand?” appear plausible within a bounded question.
3. Activate the capacity constraint. The old boundary opens; the new question expands around “without overloading”. This is the principal transformation.
4. Expand four equally weighted alternatives, including maintaining the current position.
5. Reveal criteria on a separate track. They were agreed in mandate clarification, not invented after seeing options. Capacity is the active common comparison in this example; all four options show its consequence without numerical scoring.
6. Test whether managers can absorb more. The illustrative finding of no spare management time blocks immediate expansion. Stages is a supported candidate only if capacity is released before each stage, with slower growth and reversibility visible. Partner and maintain remain alternatives. This is not proof that stages is universally best.
7. Retain the direction, reasons/trade-offs, conditions and next step. Demand durability stays uncertain. The human makes the call.

The added capacity finding is explicitly illustrative, not research evidence or a customer result. No benchmark data or frozen demonstration is used to justify the recommendation.

## Static review

Open `/frame-storyboard/situation/` and use the seven state links. Each URL renders its state on the server. No query-driven hydration, playback or scroll position is required. The homepage renders the complete final explanation even without JavaScript. The seven review pages use noindex and are excluded from the sitemap; remove them or gate them to previews before final production release.

`state` is a 1-based component prop, defaulting to 7. Give instances unique `id` props if more than one appears on a page. Stable `data-part`, `data-input`, `data-option` and `data-field` selectors are the future animation hooks. The static renderer currently conditionally renders phases; the motion implementation must retain the necessary groups together for continuity, not swap server-rendered scenes.

Mobile inputs and intermediate alternatives use a vertical flow with side collectors, not a scaled desktop SVG. The final state compacts alternatives into a matrix and preserves the four closing fields as a single reading group.

## Motion implementation after approval

Suggested equivalent timing, to validate in a real preview: inputs 0.7s, initial question 0.8s, reframing 2s, alternatives 1s, criteria 1.7s, uncertainty 2s, resolution 1.8s. Total 10s. These are design targets, not implemented timings.

Start with one desktop timeline. Test a modest sticky region and enough travel to read the reframe and loop without trapping the reader; choose the actual travel from live testing. Build mobile only after the main motion idea works. Consider a controlled entry play-through on mobile rather than prolonged pinning.

Use viewport-aware dynamic import, `gsap.matchMedia()` for breakpoints and reduced motion, and a scoped GSAP context. Revert contexts, kill ScrollTriggers and disconnect observers on route teardown/HMR. Cleanly rebuild geometry on breakpoint change. Prefer SVG path drawing, masks and transforms. Reserve dimensions before initialisation. Never autoplay or scrub for reduced motion; leave the complete static final structure visible. Avoid colour-only state changes.

## Verification boundaries

Run `npm run build`, `npx astro check`, `node qa/check-static.mjs`, `node qa/check-links.mjs`, and the launch/browser suites. Supply `QA_BASE_URL` for the target preview; `QA_OUTPUT` redirects the storyboard evidence folder. Measure performance and CLS on the deployed Vercel preview. No inference about future GSAP performance follows from a static storyboard result.

Scroll reversal, sticky pacing, timeline cleanup and animated resize are intentionally unimplemented pending static approval. A fresh-person comprehension check and actual Safari/device testing remain part of the completed-motion gate.
