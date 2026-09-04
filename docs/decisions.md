# Decisions

Current public-site decisions, their rationale and the condition that would reverse them.

## 2026-09-04 · One label tier, in the reading face

**Decided.** IBM Plex Mono is removed from the site. Space Grotesk Semibold carries h1, h2 and the two large display figures only. IBM Plex Sans carries everything else, including h3, labels, tables and controls. Labels are sentence case at 15px with no letter-spacing. Manrope stays in the logo lockup.

**Why.** Guideline V5.1 contains no monospace face and states that capitals and letter-spacing do not create hierarchy. The site was using mono for 18 labels at 11.5px, uppercase and tracked, at weight 700 against a face loaded only to 500, so browsers were synthesising the bold. Measured at 1440px on 4 September, the DeepMind AlphaGo page and the OpenAI GPT-5.6 page carry no uppercase or tracked label at all, and Anthropic carries one at 10px. The label tier, not the heading size, was the loudest signal that this page did not belong beside them.

**Constraint.** A new label may not reintroduce uppercase, letter-spacing or a monospace family. Figures use `font-variant-numeric: tabular-nums`, which is what the mono was actually providing.

**Reversed by.** A guideline revision that admits a monospace face and says what job it does.

## 2026-09-04 · The display size deviates from guideline V5.1, deliberately

**Decided.** The page title caps at 64px. Guideline V5.1 specifies 48 to 56px.

**Why.** Measured at 1440px, Anthropic and OpenAI both render their page title at exactly 64px and DeepMind renders 54px. Conforming would make the site quieter than the standard it is being read against. Letter-spacing moved from -0.032em to -0.02em in the same pass, because the old value was tighter than all three comparators.

**Constraint.** This is the only deliberate departure from the guideline type scale. Family, weight and the label scale all conform. The deviation is recorded so the next guideline revision inherits it rather than treating it as drift.

**Reversed by.** A guideline revision that sets the display scale against the current comparator set, in either direction.

## 2026-09-04 · Muted is the faint grey, not the reading grey

**Decided.** `--v-ink-faint` takes the guideline's Muted value `#63645C`. `--v-ink-soft`, which carries most reading text, stays at `#4f514b`.

**Why.** Conforming the reading grey would have taken body copy from 8.04:1 to 5.99:1 on white. The guideline requires contrast to be protected, and the review feedback objected to grey text, so lightening it would have satisfied the letter of one rule against the point of both. On the faint tier the guideline value is the better of the two: 5.25:1 against 4.75:1 on the cream surface.

**Reversed by.** A guideline revision that sets both greys against measured contrast rather than a single named value.

## 2026-09-01 · One product, two plans

**Decided.** GreenSquare AI is the company. GreenSquare is the product. GreenSquare Free is the current adaptive beta. GreenSquare Pro is the future paid plan. Decision Brief remains the output name.

**Why.** A company, product, feature and evidence vocabulary had accumulated too many names. The new structure makes the product legible and leaves room for future products under the company.

**Constraint.** Pro is described only as “in development”. No features, price or date are promised.

**Reversed by.** A deliberate product-portfolio decision recorded here and in the private product repository.

## 2026-09-01 · Product and research are separate routes

**Decided.** `/product` explains the product and plans. `/free` owns acquisition. `/research` is the evidence overview. `/benchmark` remains the complete study record. `/methodology` explains the study design.

**Why.** Product comprehension and research integrity are different reading jobs. The evidence remains close and linked without forcing a first-time buyer through the full record.

**Reversed by.** Evidence that the information architecture prevents users finding or correctly interpreting the study.

## 2026-09-01 · Earlier names are retired, evidence is not rewritten

**Decided.** Earlier product names do not appear on marketing surfaces. Frozen evidence remains verbatim. Research pages describe the third arm as the GreenSquare-loaded condition and include a compact historical naming note.

**Why.** The launch needs one vocabulary, while post-hoc editing of frozen evidence would damage the record.

**Constraint.** The disclosure must say that the study is not a test of GreenSquare Free or GreenSquare Pro.

**Reversed by.** Nothing short of a new study using the current artefact and plan definition.

## 2026-08-30 · The complete benchmark record remains public

**Decided.** All eight checks, 18 protocol deviations, eight limitations and source-status disclosures remain on `/benchmark`.

**Why.** The headline is partly unfavourable to the product. Removing inconvenient detail would turn a research record into marketing.

**Constraint.** Counts render from `src/lib/benchmark.ts`. The process composite always appears with the line explaining that it is the lowest of five check counts, not an independent result.

**Reversed by.** A new record of account that preserves every current disclosure and provenance obligation.

## 2026-08-30 · Frozen demonstration and preregistration material is immutable

**Decided.** `evidence/preregistration/` and `src/data/demonstrations/` are not edited to improve presentation or match new names.

**Why.** They are evidence, not website copy.

**Reversed by.** A separately published replacement artefact with its own provenance. The original record remains available.
