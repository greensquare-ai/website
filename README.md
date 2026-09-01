# GreenSquare website

Production source for [greensquare.ai](https://www.greensquare.ai/).

The site is built with Astro and uses a small React island for email capture. It includes the public product pages, the GreenSquare Free acquisition flow and the published benchmark evidence.

## Product architecture

- **GreenSquare AI** is the company.
- **GreenSquare** is the product.
- **GreenSquare Free** is the current adaptive decision-system beta.
- **GreenSquare Pro** is the future paid plan and remains in development.
- **Decision Brief** is the product output.

Earlier product names are retired from marketing surfaces. Frozen evidence remains unchanged, and the benchmark carries the required historical naming disclosure.

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

The production build is written to `dist/`. The build also runs `scripts/check-copy.mjs`.

## Structure

- `src/pages/` contains the public routes and legal pages.
- `src/components/` contains navigation, footer, product demonstration and email capture.
- `src/data/` and `src/lib/benchmark.ts` contain the published benchmark record and guarded accessor layer.
- `src/styles/` contains the active design tokens and global styles.
- `evidence/preregistration/` contains the frozen public study inputs.

## Deploy

Vercel deploys `main` to [greensquare.ai](https://www.greensquare.ai/). Pull requests receive preview deployments.

This repository is public. Add only production website source and material intentionally published as evidence.
