# GreenSquare brand kit

The single source of truth for the GreenSquare visual system, as shipped in the "Operational Gravity"
uplift (July 2026). Reuse this to re-skin the free Decision Frame and any future surface. Canonical CSS
tokens live in `src/styles/tokens-v2.css`; the system rules live in `src/styles/global-v2.css`. Change
colour and type in the token file only.

North star: Linear / Palantir. Quiet authority, infrastructure-first, faceless. Australian English. No em
dashes, no exclamation marks, no founder name, and honour the word blacklist in `CLAUDE.md`.

---

## 1. Colour

| Token | Value | Role |
|---|---|---|
| `--v-paper` | `#ffffff` | Base white; cards |
| `--v-off` | `#fbfbfa` | Barely-off-white section |
| `--v-fill` | `#f3f4f1` | Light grey section |
| `--v-fill-2` | `#e9ebe6` | Mid grey; secondary button; grey CTA panel |
| `--v-fill-3` | `#dde0da` | Deeper grey; secondary button hover |
| `--v-green` | `#1f5a3d` | The brand green block + accent |
| `--v-green-deep` | `#16452e` | Deeper green panel |
| `--v-green-bright` | `#29764e` | Primary button hover |
| `--v-green-ink` | `#0b2318` | Near-black green. **Footer only**, so it stays distinct from any green section above it |
| `--v-lime` | `#dff49f` | The single pop. The brand mark on dark grounds; index/label accent on green |
| `--v-ink` | `#171b18` | Near-black text |
| `--v-ink-soft` | `#545a54` | Muted body |
| `--v-ink-faint` | `#7d827c` | Captions, kickers |
| `--v-cream` | `#f2f4ee` | Text/mark on green |
| `--v-cream-soft` | `rgba(242,244,238,.74)` | Muted text on green |
| `--v-cream-faint` | `rgba(242,244,238,.52)` | Captions on green |
| `--v-signal` | `#2a9d55` | Readout progress/pass on light |
| `--v-signal-on-green` | `#cdeeb4` | Readout progress/pass on green |
| `--v-error` | `#b23a2a` | Form error text on light grounds |
| `--v-error-on-green` | `#ffd8d1` | Form error text on green grounds |

Hairlines are `currentColor`-based at low opacity (`--v-line`, `--v-line-strong`, and the `-green`
variants). Use them for structural dividers (list rows, tables), never as the only thing defining a card.

**Contrast rule:** any element on a green ground that is not itself a `.v-green` element must set its text
to `--v-cream` explicitly (e.g. the split-CTA green panel). Do not rely on inheritance.

---

## 2. Type

Three families, one tight weight ladder. Loaded in `BaseLayoutV2.astro`.

| Role | Family / weight | Token | Used for |
|---|---|---|---|
| Display | Space Grotesk 500 | `--vf-display` | h1–h4, `.v-display`, `.v-quote`, tier price |
| Body | Manrope 400 | `--vf-body` | body copy, leads, captions |
| UI | Manrope 500 | `--vf-body` | nav links, small UI labels, sub-labels |
| Semibold | Manrope 600 | `--vf-body` | wordmark, buttons, `.v-h3`/`.v-h4`, kickers, lead-in leads, table headers, FAQ summaries, footer headings |
| Mono | IBM Plex Mono 400 | `--vf-mono` | readout-module chrome, `/01` indexes, `.v-tag`, table numerics |

Rules:
- **No serif.** Cormorant is removed. The editorial pull-quote (`.v-quote`) is Space Grotesk.
- **No extended letter-spacing.** Body and labels are `0`. Display headings may go tight negative
  (`-0.01` to `-0.02em`). The only positive tracking permitted is `0.02em`, and only inside readout
  modules (the terminal idiom), never on eyebrows, labels, nav, footer or tables.
- Mono is reserved for the operational readout artefacts and index numerals. Never set an eyebrow,
  heading or nav item in mono.

---

## 3. Kickers (the old "eyebrow", reformed)

- Default to **no kicker**. Lead with the headline.
- Where a small section label genuinely aids scanning, use `.v-label`: Manrope 600, ~0.82rem, sentence
  case, `--v-ink-faint` (or `--v-cream-faint` on green), **zero tracking, no uppercase, no hairline rule**.
- The old `.v-label--rule` left-vertical-line motif is retired. Do not reintroduce it.

---

## 4. Buttons and links

| Class | Look | Use |
|---|---|---|
| `.v-btn.v-btn--green` | Green fill, cream text, hover `--v-green-bright` | Primary CTA on light grounds |
| `.v-btn.v-btn--grey` | `--v-fill-2` fill, ink text, no border, hover `--v-fill-3` | Secondary CTA, paired with the primary |
| `.v-btn.v-btn--on-green` | Cream fill, green text | Primary/secondary CTA on green grounds |
| `.v-link` | Green underline, `text-underline-offset:3px`, no arrow | Inline prose links only |

- Paired hero buttons share height and `min-width:220px` (`.hero-actions .v-btn`) so they read as equals;
  they go full-width when stacked on mobile.
- **No arrow glyphs** (`→`) anywhere. Affordance comes from the button shape or an underline, not an arrow.
- Filled link-buttons must out-specify the base link colour. The base rule is `.v2 :where(a){color:green}`
  (zero specificity) precisely so `.v-btn--green` etc. win. Never raise link specificity above that.

---

## 5. Lists: keyword lead-in

Retire bullet markers (no dashes, no dots, no squares). Use `.v-leadlist`: each item opens with a 2–4 word
`<strong>` lead (Manrope 600, ink; cream on green) ending in a full stop, then the sentence continues in
`--v-ink-soft` (`--v-cream-soft` on green). Example:

> **Defensible, every run.** Only the loaded product produced a structured, evidence-tagged brief, 18 of 18
> across both models.

Native prose lists (`.v-prose ul`) keep a simple green `::marker`, which is fine for long-form legal and
methodology copy.

---

## 6. Cards, elevation and motion

- `.v-card`: paper background, radius 0, **no hairline border on tinted grounds**. Presence comes from a
  layered soft shadow (`0 1px 2px rgba(23,27,24,.05), 0 16px 40px -20px rgba(23,27,24,.12)`).
- Static cards get elevation, not hover. **Interactive** elements (linked cards, artefact rows) get a hover
  lift: `translateY(-2px)` plus a deeper shadow, 150–300ms on `--v-ease`.
- Distinguish a "key" card by weight and a green kicker, not by a coloured top border ("lip"). Lips are
  banned.
- All motion respects `prefers-reduced-motion`.

---

## 7. Readout module (the code/markdown artefact)

The operational readout (`.v-readout`) is the one place the mono, uppercase, terminal idiom lives. On a
light ground it is an off-white panel with a `--v-line-strong` border and a soft shadow. **On a green
ground it flips to a floating white paper card** (`box-shadow: 0 24px 48px -16px rgba(0,0,0,.35)`), never a
dark box on dark green. Data separators inside readouts use ` / ` (the file-path idiom), never `·`.

---

## 8. Logo and wordmark

- Mark: the four-square glyph. `logo-mark.svg` (green `#133f26`) for light grounds; `logo-mark-lime.svg`
  (lime `#DFF49F`) for the dark footer; `logo.svg` is the `currentColor` tintable version; `favicon.svg` is
  the lime mark on a green tile.
- Wordmark "GreenSquare" is always **Manrope 600** (semibold), never the display face.
- On the near-black footer the mark is lime so it stays visible.

---

## 9. Footer

Near-black green (`--v-green-ink`), always darker than the section above it. Lime mark, Manrope 600
wordmark, sentence-case column headings, a plain meta line ("Decision infrastructure for Claude, GPT and
Gemini."), and a legal row of `© {year} GreenSquare` + `hello@greensquare.ai`. No ABN, no `·` separators.

---

## 10. Do / don't

**Never:** tracked or uppercase eyebrows · a left hairline rule on a label · arrow glyphs (`→`) · em-dash or
symbol bullet markers · `·` / `&middot;` separators · green text on a green fill (or any low-contrast button
text) · coloured card "lips" · faint hairline-only card borders · a dark box on a dark green ground · serif
type (Cormorant) · "ABN to be confirmed" · a price surfaced at launch · extended letter-spacing.

**Always:** headline-first sections · sentence case · three families and a tight weight ladder · elevation
or motion to make cards present · paper readouts on green · the free Decision Frame as the primary CTA ·
Australian English, no em dashes, no banned words.
