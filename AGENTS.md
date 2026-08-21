# GreenSquare public-site contract

This repository contains the production GreenSquare website and intentionally public benchmark evidence.

## Scope

- Keep changes limited to the public website, acquisition flow, legal pages and published benchmark.
- Do not add internal strategy, roadmaps, audience research, pricing experiments, judgement-system source, content-production tooling or private design guidance.
- Treat `evidence/preregistration/` as a public evidence record. Do not rewrite frozen test material to match later product language.

## Production rules

- Use Australian English and the established restrained, evidence-led voice.
- Do not invent benchmark figures, testimonials or performance claims.
- Keep colour and typography changes in `src/styles/tokens-v2.css`.
- Reuse the active V2 components and styles rather than introducing parallel design systems.
- Validate with `npm run build` before merging.
