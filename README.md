# GreenSquare website

Production source for [greensquare.ai](https://www.greensquare.ai/).

The site is built with Astro and uses a small React island for email capture. It includes the public marketing pages, the free Lens acquisition flow and the published benchmark evidence.

Internal product strategy, commercial planning, judgement IP, brand-system source and content-production tooling belong in the private `greensquare-ops` repository.

## Product naming

Three things share a family name and are routinely confused, so they are fixed here.

- **Compass** is the paid product: a plain markdown instruction file loaded into Claude, ChatGPT or Gemini, which interrogates the operator before it advises. It was renamed from "The Decision" on 30 August 2026, after the benchmark was run and scored. Anywhere the study's arm is labelled Compass, that is the arm tested under the former name, and `/benchmark` says so on the page.
- **Lens** is the free one-page worksheet, shipping as Lens 4.0. It was previously "the Decision Frame".
- **The Decision Brief** is the output Compass produces. This name did not change.

The legal pages still use the former names as defined terms. That is deliberate: changing a defined term in an outward-facing legal document is not a copy edit.

## How the benchmark figures work, and why

`/benchmark` publishes a study whose headline is partly unfavourable to the product. The code is arranged so that staying honest does not depend on anyone remembering to be.

- **Every figure renders from `src/lib/benchmark.ts`.** No page types a count, a date or a denominator as a literal, and no page does arithmetic in a template. If you need a new figure, add an accessor; do not read `src/data/benchmark-results.json` from a page.
- **`assertInvariants()` runs at module scope**, so `astro build` fails rather than shipping a bad figure. It checks cell bounds and denominators, that the composite is derived rather than stored, that the retired 54-run total never appears in a "clean" item without the current total beside it, and that the transcript inventory agrees with the grid it claims to reconcile against. `src/lib/demo.ts` adds guards for the demonstration. **If a guard fires, fix the input. Do not relax the guard.**
- **The composite is a per-check minimum, not a per-run conjunction.** It is an upper bound on the number of runs passing all five process checks. On the current grid the two coincide because every component cell is zero or the full n. Its provenance line says this, and it must never render without that line.
- **The run window is not claimable.** `dates.run_window` carries `verified: false` and `dates().runWindow` returns null. No copy may state when the runs took place.
- **Transcripts are unpublished by decision, not absent.** All 45 exist. Write "not published"; never imply they do not exist.
- **`src/data/demonstrations/demo-1.md` is a verbatim, unedited transcript.** It is a demonstration and not part of the pre-registered study, and the page says so at every point it appears. It contains a tagging error, which the page names beside it rather than correcting, because the transcript is evidence and editing evidence to look better is the thing this page exists not to do.

The two-line version: numbers come from accessors, disclosures are load-bearing, and anything that looks like an inconvenient sentence is probably deliberate. Check the commit that introduced it before removing it.

## Run locally

```bash
npm ci
npm run dev
```

Astro serves the site at `http://localhost:4321/`.

## Validate

```bash
npm run build
npm run preview
```

The production build is written to `dist/`.

## Structure

- `src/pages/` contains the public routes and legal pages.
- `src/components/` contains the active navigation, footer, email form and hero animation.
- `src/data/` and `src/lib/benchmark.ts` contain the published benchmark results and the accessor layer every figure must come through.
- `src/data/demonstrations/` contains the published demonstration transcript, loaded and guarded by `src/lib/demo.ts`.
- `src/styles/` contains the active design tokens and global site styles.
- `public/assets/` contains production logos, icons and sharing imagery.
- `evidence/preregistration/` contains the public benchmark protocol, cases and methodology.

## Deploy

Vercel deploys `main` to [greensquare.ai](https://www.greensquare.ai/). Pull requests receive preview deployments.

This repository is public. Add only production website source and material intentionally published as evidence.
