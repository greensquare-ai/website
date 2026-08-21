# GreenSquare website

Production source for [greensquare.ai](https://www.greensquare.ai/).

The site is built with Astro and uses a small React island for email capture. It includes the public marketing pages, the free Decision Frame acquisition flow and the published benchmark evidence.

Internal product strategy, commercial planning, judgement IP, brand-system source and content-production tooling belong in the private `greensquare-ops` repository.

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
- `src/data/` and `src/lib/benchmark.ts` contain the published benchmark results and presentation logic.
- `src/styles/` contains the active design tokens and global site styles.
- `public/assets/` contains production logos, icons and sharing imagery.
- `evidence/preregistration/` contains the public benchmark protocol, cases and methodology.

## Deploy

Vercel deploys `main` to [greensquare.ai](https://www.greensquare.ai/). Pull requests receive preview deployments.

This repository is public. Add only production website source and material intentionally published as evidence.
