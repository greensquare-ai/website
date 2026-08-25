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

## Public Brand Capital Gate

Every public-facing change must satisfy `qa/public-brand/BRAND_CAPITAL_GATE.md` before release.

Technical correctness is necessary but insufficient. Do not merge a public surface that looks like a generic AI-generated landing page, an indie SaaS starter or merely competent template-based design. The required standard is the craft, restraint and systems coherence expected from a globally credible, well-capitalised technology and professional organisation.

For explanatory product visuals, GreenSquare uses a **research-grade, static-first visual language**. The governing principle is:

> Explain the method. Show the evidence. Centre the human. Remove the interface.

Use sparse figures, diagrams, annotations, charts and captions to make the reasoning architecture legible. One figure should communicate one mechanism or finding. Prefer white/light neutral grounds, thin rules, disciplined typography, generous negative space and GreenSquare green only where it carries meaning.

Do not depict fictional GreenSquare software interfaces simply to make the product look technological. Avoid faux windows, dashboards, chat simulations, toolbars, progress rails, looping demos, decorative technical complexity and motion that does not explain causality. Human professional accountability must remain structurally visible in how the product is described and visualised.

The gate is release blocking across:

- art direction;
- research clarity;
- product fidelity and human agency;
- typography and composition;
- motion and interaction; and
- system consistency.

All dimensions must pass. Do not average away a design failure.

## React quality controls

For changed React code:

1. run the React hooks lint gate;
2. run `npx react-doctor@latest --verbose --scope changed`;
3. run the React Doctor design scan on changed UI;
4. validate desktop, tablet, mobile and reduced-motion behaviour; and
5. inspect the generated QA screenshots before release.

React Scan is a preview diagnostic only. Use it when render churn or interactive performance warrants investigation. Never ship React Scan instrumentation to production.

## Documentation currency

Context7 is development tooling, not a production dependency. When Context7 is available in the coding-agent environment, use it for version-specific library/API documentation. If it is unavailable, use primary official documentation rather than guessing current APIs.
