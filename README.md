# GreenSquare

The public GreenSquare website and Decision Operating System.

- Marketing site: `/`
- Decision OS v3: `/v3/`
- Live site: <https://www.greensquare.ai/>

The project is built with Astro and uses small React islands for interactive decision models.

## Canonical brand system

The governing source is the [GreenSquare AI design language](https://greensquare-brand-guideline-51fb7ad.vercel.app/), sourced from `design-language/`.

Repository contributors must read `docs/brand-kit.md` before changing identity, colour, typography, language, charts, decision grammar or branded applications. If another document conflicts with the deployed guideline, the deployed guideline wins.

The access-controlled design-language site is a separate Astro app in `design-language/`. The Vercel project `greensquare-design-language` must use that folder as its Root Directory. This keeps the design deployment separate from the public website deployment.

## Run locally

```bash
npm ci
npm run dev
```

Astro serves the project at `http://localhost:4321/`.

## Validate

```bash
npm run build
npm run preview
```

The production build is written to `dist/`.

Validate the design-language app separately:

```bash
cd design-language
npm ci
npm run build
```

## Structure

- `src/pages/` — Astro routes, including the complete `/v3/` system
- `src/components/v3/` — Decision Field, Decision Model, workspace and application specimens
- `src/styles/v3.css` — the v3 visual and interaction language
- `public/assets/` — supplied logos, video, poster and sharing image
- `design-language/` — canonical design-language application
- `docs/brand-kit.md` — repository-facing summary of the canonical brand standard

## Deploy

Vercel builds and deploys `main` to production at <https://www.greensquare.ai/>. Pull requests get their own preview deployment.

This is a public repository. Internal strategy, commercial material and working documentation stay in the private `ks-projects-66/greensquare-ops` repository.
