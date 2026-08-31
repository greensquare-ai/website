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

## Before you edit the benchmark page

`/benchmark` publishes a study whose headline is partly unfavourable to the product, and the code is
arranged so that staying honest does not depend on anyone remembering to be. Numbers come from
accessors rather than being typed, the build fails rather than shipping a bad figure, and several
sentences that read as inconvenient are deliberate.

Two files carry this, and they are not optional reading:

- **`AGENTS.md`** is the working contract: the accessor rule, the guards, the naming, and what must
  not be edited.
- **`docs/decisions.md`** records what was decided, why, and what would reverse it. If you are about
  to remove something because it seems like an oversight, look there first.

`npm run build` compiles the site and then runs `scripts/check-copy.mjs`, which enforces the
editorial constraints over `dist/`. A failure there is a constraint, not a style preference.

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
