# GreenSquare public-site contract

This repository contains the production GreenSquare website and intentionally public benchmark evidence.

## Scope

- Keep changes limited to the public website, acquisition flow, legal pages and published benchmark.
- Do not add internal strategy, roadmaps, audience research, pricing experiments, judgement-system source, content-production tooling or private design guidance.
- Treat `evidence/preregistration/` as a public evidence record. Do not rewrite frozen test material to match later product language.
- The reasoning behind the constraints in this file, including buyer reads, adversarial reviews and the fact register every published figure is checked against, is held in the private `greensquare-ops` repository. This repository records the constraints. If a constraint looks arbitrary, it was arrived at somewhere; ask rather than assuming there was no reason.

## Production rules

- Use Australian English and the established restrained, evidence-led voice.
- Do not invent benchmark figures, testimonials or performance claims.
- Keep colour and typography changes in `src/styles/tokens-v2.css`.
- Reuse the active V2 components and styles rather than introducing parallel design systems.
- Validate with `npm run build` before merging. It runs the editorial guards as well as the compile.

## Read this before editing `/benchmark`

That page publishes a study whose headline is partly unfavourable to the product. Several sentences
on it look like oversights and are deliberate. **`docs/decisions.md` records what was decided, why,
and what would reverse it. Check it before removing anything that reads as inconvenient.**

- **Figures come from accessors.** `src/lib/benchmark.ts` and `src/lib/demo.ts` own every count,
  date and denominator. No page types a figure as a literal and no page does arithmetic in a
  template. Need a new figure? Add an accessor. Do not read `src/data/benchmark-results.json` from
  a page.
- **A firing guard means the input is wrong.** `assertInvariants()` runs at module scope so
  `astro build` fails rather than shipping a bad figure. Fixing a guard to make a build pass defeats
  the only mechanism protecting the published numbers.
- **`npm run build` also runs `scripts/check-copy.mjs`**, which enforces the editorial constraints
  over `dist/`: no former product names outside the legal pages, no unannounced product names, no
  price, no arrow glyphs or em dashes, no claim about when the runs took place, and the composite
  never rendering without its provenance line. Each rule names the decision it enforces.
- **The composite is a per-check minimum, not a per-run conjunction.** It is an upper bound on the
  number of runs passing all five process checks, and it must never render without the line saying
  so.
- **The run window is not claimable.** `dates.run_window` carries `verified: false`. No copy may
  state when the runs took place.
- **Transcripts are unpublished by decision, not absent.** All 45 exist. Write "not published";
  never imply they do not exist.
- **`src/data/demonstrations/demo-1.md` is verbatim evidence.** It contains a tagging error that the
  page names rather than corrects. Do not edit the transcript to improve it. Editing evidence to
  look better is the thing that page exists not to do.
- **The rename disclosure in the result section is load-bearing.** The study's arm was relabelled
  after it was run. Removing the sentence that says so makes the relabel dishonest.

## Product naming

**Compass** is the paid markdown product, renamed from "The Decision" on 30 August 2026. **Lens**,
shipping as Lens 4.0, is the free worksheet, formerly "the Decision Frame". **The Decision Brief**
is the output Compass produces and keeps its name. Scout, Atlas, Spark, Forge and Realm are
unannounced and must not appear. The legal pages retain the former names as defined terms on
purpose.
