# GreenSquare

The public GreenSquare website and Decision Operating System.

- Marketing site: `/`
- Decision OS v3: `/v3/`
- Live site: <https://www.greensquare.ai/>

The project is built with Astro and uses small React islands for interactive decision models.

The access-controlled design-language site is a separate Astro app in `design-language/`. The
Vercel project `greensquare-design-language` must use that folder as its Root Directory. This keeps
the design deployment separate from the public website deployment.

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
- `public/assets/` — public logos, video, poster and sharing image
- `design-language/` — dedicated app for the protected Vercel design-language project

## Deploy

Vercel builds and deploys `main` to production at <https://www.greensquare.ai/>. Pull requests get
their own preview deployment.

This is a public repository. Internal strategy, commercial material and working documentation stay
in the private `ks-projects-66/greensquare-ops` repository.
