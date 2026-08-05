# GreenSquare

The public GreenSquare website and Decision Operating System.

- Marketing site: `/`
- Decision OS v3: `/v3/`
- Public Pages site: <https://ks-projects-66.github.io/greensquare/>

The project is built with Astro and uses small React islands for interactive decision models.

## Run locally

```bash
npm ci
npm run dev
```

Astro serves the project at `http://localhost:4321/greensquare/` because the production site is
hosted as a GitHub project page.

## Validate

```bash
npm run build
npm run preview
```

The production build is written to `dist/`.

## Structure

- `src/pages/` — Astro routes, including the complete `/v3/` system
- `src/components/v3/` — Decision Field, Decision Model, workspace and application specimens
- `src/styles/v3.css` — the v3 visual and interaction language
- `public/assets/` — public logos, video, poster and sharing image
- `.github/workflows/deploy-pages.yml` — GitHub Pages build and deployment

## Deploy

Merging to `main` runs the Pages workflow. The workflow builds Astro, uploads `dist/`, and
publishes the result to the repository's GitHub Pages environment.

This is a public repository. Internal strategy, commercial material and working documentation stay
in the private `ks-projects-66/greensquare-ops` repository.
