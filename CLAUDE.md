# GreenSquare — project context (read first)

Static marketing site for GreenSquare. This file is the working context for anyone
(human or AI) editing the repo. It carries the locked decisions from the original
build handoff and documents the site as actually built.

Australian English throughout. Never use em dashes (use commas or parentheses).

---

## 1. What GreenSquare is

GreenSquare sells uploadable AI framework bundles for business professionals. A user
loads a bundle into ChatGPT or Claude and it turns the model into a decision-grade
assistant. The IP is structured thinking, not prompts.

Brand is anonymous and infrastructure-first. No founder photos, no personal narrative.
Visual benchmark is Linear.app. Positioning is "quiet authority, the advisor behind
the throne".

The launch product is **The Decision Brief**: one uploadable file that runs a
structured decision analysis and writes a five-part brief inline in the chat.
Rule of thumb for any change: **broad product, narrow message, one file, one
deliverable, fast win.** If a change reintroduces complexity, file juggling or jargon,
it is wrong.

---

## 2. Brand system (as built)

- **Palette** (taken from the live old Framer site, confirmed):
  - `--green: #133f26` (primary), `--green-deep: #0e2c1b` (dark sections), `--green-500: #1c5638` (hover)
  - `--bg: #f5f5f5` (cool near-white page background), `--paper: #ffffff`, `--panel: #ececec`
  - `--lime: #DFF49F` (the brand mark colour and the highlight on dark), `--sage: #cfe4a9` (used sparingly)
  - `--ink: #14140f`, `--ink-soft: #5f5c54`
  - All colour lives in the `:root` block of `assets/styles.css`. Change it there, nowhere else.
- **Type**: Cormorant Garamond for all headers and sub-headers (`--serif`), Manrope for
  everything else (`--sans`). Loaded from Google Fonts. If the page ever looks plain,
  check the Google Fonts link is not blocked before touching the design.
- **Mark**: the four-part green-square glyph. `assets/logo-mark.svg` (green, for light
  surfaces) is the canonical file, used as the header/footer logo. `assets/logo.svg`
  is a `currentColor` version. `assets/favicon.svg` is the mark on a dark-green tile.
- **Voice**: precise, restrained, advisor-like. Declarative statements, not questions as
  headlines. No exclamation marks. Adjectives sparse.

### Banned words (do not use)
unlock, unleash, supercharge, leverage (as a verb), seamless, robust, elevate, empower,
game-changer, revolutionary, cutting-edge, harness, synergy, holistic, deep dive,
ecosystem, disrupt, next-level, turbocharge, best-in-class. Also: never use "board-ready"
or any claim that caps the use cases.

---

## 3. Site structure (as built)

**Astro site** (migrated July 2026 from the old flat static HTML, which is preserved under
`legacy/`). Build with `npm install` then `npm run build`; dev with `npm run dev`.

| Path | Purpose |
|---|---|
| `src/pages/index.astro` | Home |
| `src/pages/product.astro` | The Decision Brief: five-part output, how it works, pricing ($49/$59), FAQ, signup |
| `src/pages/benchmark.astro` | The benchmark, in an editorial exhibit format. Data-driven from `src/data/benchmark-results.json`. Route is `/benchmark` (old `/evidence` redirects here) |
| `src/pages/methodology.astro` | Test design and honest caveats |
| `src/pages/decision-frame.astro` | Free lead magnet: the one-page Decision Frame |
| `src/pages/pricing.astro` | Pricing ladder |
| `src/pages/404.astro`, `src/pages/legal/*.md` | 404 + privacy/terms/cookies |
| `src/layouts/`, `src/components/` | Layouts (incl. `BaseLayoutV2` from the "Operational Gravity" uplift) and shared components (Nav, Footer, EmailCaptureForm) |
| `src/styles/tokens*.css`, `global*.css` | Design tokens + system. Canonical palette in the token files; change colour there only |
| `public/assets/*` | Media (logo, favicon, og-image, hero.mp4) |
| `legacy/` | The old flat static site, preserved, not built |

Nav is Home / Benchmark / Product / Pricing. Footer also links Methodology and the free frame.
Integrations: Kit form 9283111 (email capture) and the Stripe Payment Link (buy button) are wired.

---

## 4. Locked product decisions

- **The Decision Brief**: one uploadable file, a compressed system prompt with the output
  schema embedded. Zero template files. Output is generated inline as structured markdown
  (behaves the same on Claude and GPT). A downloadable .docx/.pptx is an optional bonus the
  model can offer, never the headline.
- **Five parts, every time**: the decision and why now; the options compared; the
  recommendation with the one or two assumptions it rests on (evidence-tagged); the next
  steps; the risks that would change the call.
- **Price**: $49 at launch, anchored to $59. One file, no subscription.
- **Free lead magnet**: the one-page Decision Frame (structure only). Give away the frame,
  sell the engine. Built at `decision-frame.html`.
- **Audience**: broad professionals at the moment of making a decision (consultants,
  managers, analysts, founders, students). Not "solo advisors only".
- **Evidence (current, honest — the old framing is RETIRED)**: the benchmark page leads with
  an honest, pre-registered result, NOT a "reversal". Do NOT use: the "+35%" uplift, the 6.1 to
  8.6 scores, the 12-dimension weighted table, the FreshTaste case, or "baseline launches,
  framework reverses it" (that reversal claim was disproven on 2026 frontier models, which reframe
  on their own). The real claim: only the loaded product reliably produces a defensible,
  interrogated, evidence-tagged, options-compared brief (18/18 across two models and three cases,
  baselines ~0); naked baselines miss the hidden decision because they do not interrogate; informed
  baselines are capable, so the product's edge is discipline and reliability, not raw reasoning. All
  numbers must trace to a saved transcript. Pre-registration + full method live in
  `evidence/preregistration/v3/`; scoring is in the main project's `04_evidence/v3/scoring/`.
- **Pro tier** (full nine-section framework + templates, ~$129): later, not now. Do not put
  it on the site.

---

## 5. What is stubbed / outstanding

1. **Email capture is wired** to Kit form 9283111 (`EmailCaptureForm`), and the buy button uses the
   Stripe Payment Link. Stripe Tax and post-payment file delivery still need configuring on Stripe.
2. **Custom domain not connected.** OG/sitemap URLs point at `https://www.greensquare.ai/`. Deploy
   is via Vercel; the domain cutover from the Framer waitlist is a manual DNS step at Crazy Domains.
3. **Visual uplift** ("Operational Gravity", Palantir/Linear direction) is in progress across the
   site; review before the domain cutover.
4. **Paid product file is NOT in this repo** by design (it is the thing being sold). Only its
   SHA-256 hash is published, under `evidence/preregistration/v3/`. Never commit the product text.
5. **Gemini** benchmark leg is pre-registered but pending (two models run so far: Claude, ChatGPT).

---

## 6. Conventions

- Keep all colour and type in the `:root` block of `assets/styles.css`.
- Reuse the existing components (`.section`, `.wrap`, `.panel`, `.steps`, `.squares`,
  `.video-frame`, `.price-card`, `.data` tables, `.prose`). Do not invent one-off styles.
- Keep copy in brand voice: Australian English, no em dashes, no banned words, declarative.
- Do not invent benchmark numbers or testimonials. The only real figures are the five
  category scores and the reversal case, sourced from the cross-platform test.
- Keep the launch to roughly three pages (plus methodology and the free frame) and one
  product file.
