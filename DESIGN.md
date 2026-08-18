---
name: GreenSquare Design Language
description: An institutional operating standard for making consequential decisions legible, inspectable, and defensible.
colors:
  forest: "#133f26"
  deep-forest: "#0b2313"
  ink: "#12140f"
  rail: "#10110f"
  white: "#ffffff"
  ground: "#f5f5f5"
  paper: "#fbf8f0"
  mineral: "#c7cbc0"
  muted: "#63645c"
  line: "#dedad2"
  confirmed: "#24553b"
  assumption: "#745b2d"
  uncertainty: "#686b65"
  material-risk: "#77372f"
typography:
  display:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.15rem, 5.1vw, 4.8rem)"
    fontWeight: 600
    lineHeight: 0.97
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.2vw, 2.15rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  body:
    fontFamily: "IBM Plex Sans, Arial, sans-serif"
    fontSize: "clamp(1.05rem, 1.35vw, 1.15rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "IBM Plex Sans, Arial, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 700
    lineHeight: 1.45
    letterSpacing: "0.02em"
components:
  button-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.forest}"
    padding: "0.75rem 1rem"
    height: "2.75rem"
  button-forest:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.white}"
    padding: "0.75rem 1rem"
    height: "2.75rem"
  rail-nav-current:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.white}"
    padding: "0.55rem 1.25rem"
    height: "2.75rem"
  decision-resolution:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.white}"
    padding: "0.9rem"
---

# Design System: GreenSquare Design Language

## Overview

**Creative North Star: "The Decision Ledger"**

GreenSquare looks like an institutional working standard, not a content gallery. A stable black rail contains the system; forest fields carry governing questions and decisive calls; white, ground, and paper sheets hold inspectable working material. Mineral rules, strict axes, and tabular numerals make the page read as a document that can be audited.

The social extension carries one source idea into native channel work without losing the decision. It adds paper working sheets and mineral dividers to the incumbent black/forest/paper world, then uses canonical markers and written labels to preserve evidence, assumption, uncertainty, material risk, owner, and reversal condition. This is a durable operating language, not a prescribed page composition.

The system is code-led and deliberately established rather than decorative. Its authority comes from visible structure, source-aware evidence, and restrained contrast. It rejects generic template galleries, decorative terminal theatre, faces and presenter-led visual language, and any claim whose evidence state cannot be inspected.

**Key Characteristics:**

- Institutional, calm, direct, and faceless.
- Strong field changes: black rail, forest decision fields, paper working sheets.
- Hard horizontal and vertical rules establish the reading axis.
- Evidence is both marked and written; colour never carries meaning alone.
- Dense operational content stays legible through controlled type, generous section spacing, and responsive reflow.

## Colors

The palette uses dark institutional fields for commitment, pale sheets for inspection, and restrained state colours for evidence—not decoration.

### Primary

- **Decision Forest:** used for active navigation, decision fields, primary actions, and recommendation resolution. It is the visual signal that a governed decision is being made.
- **Deep Forest:** used for the deepest dark range and forest-field depth when the base forest needs a denser companion.

### Secondary

- **Working Paper:** a warm off-white working surface reserved for social application sheets, records, and master-register material.
- **Mineral Divider:** the social extension's muted structural rule. It separates evidence rows and working-sheet sections without competing with ink.

### Tertiary

- **Confirmed Leaf:** the verified-evidence colour. Pair it with the filled leaf-quadrant marker and the written label “Confirmed.”
- **Assumption Ochre:** the untested-belief colour. Pair it with the open leaf quadrant, dashed continuation, and the written label “Assumption.”
- **Uncertainty Mineral:** the unresolved-direction colour. Pair it with the open-circle marker and the written label “Uncertainty.”
- **Material Risk Oxide:** the downside colour. Pair it with the filled diamond marker and the written label “Material risk.”

### Neutral

- **Rail Black:** the permanent containment field for the navigation rail and dark operating bands.
- **Decision Ink:** primary reading colour and the strongest structural rule.
- **Ground:** cool neutral page field for evidence tables and quieter inspection zones.
- **White:** primary document surface and reversed-text companion.
- **Muted Record:** secondary copy, labels, metadata, and low-priority supporting information.
- **Structural Line:** the default divider for sheets, registers, tables, and section boundaries.

**The Written-State Rule.** Every evidence state that changes interpretation must include its written label. Marker shape and colour reinforce the state; neither substitutes for the label.

**The Paper Addition Rule.** Paper and Mineral are the only social-application palette additions. Use them for work-in-progress documentation and separation, never as a new expressive accent system.

## Typography

**Display Font:** Space Grotesk (with ui-sans-serif and system-ui fallbacks)

**Body Font:** IBM Plex Sans (with Arial fallback)

**Brand Font:** Manrope (with Arial fallback) for the rail wordmark only.

**Character:** Space Grotesk makes the decision and its consequence feel concise and deliberate. IBM Plex Sans explains, labels, and records evidence with institutional clarity; its tabular numeral feature supports ledgers, IDs, and export-oriented fields.

### Hierarchy

- **Display:** Space Grotesk 600; governs primary promises and decision questions. Use the established large fluid display scale and tight tracking.
- **Headline:** Space Grotesk 600; introduces sections, register calls, and compact decision statements without becoming promotional.
- **Body:** IBM Plex Sans 400; explains evidence and operations. Keep explanatory text at a bounded readable measure (roughly 58–66ch where the source establishes one).
- **Label:** IBM Plex Sans 700; names metadata, states, facts, and table heads at the established compact label size. Use modest tracking only where the source already does.
- **Literal code:** IBM Plex Sans remains the default for literal URLs, UTM strings, and operating fields. Monospace is an exception for literal GitHub or code content only.

**The Decide / Explain Rule.** Space Grotesk decides; IBM Plex Sans explains. Do not use display typography to make ordinary metadata perform.

## Layout

The design language is built from a persistent 14.25rem black rail and a flexible document field. A 3.75rem sticky top bar maintains orientation while sections occupy full-width fields inside the main document. Large section blocks use fluid insets from 1.25rem to 6.5rem and a generous vertical cadence from 4.5rem to 8rem.

Use grids to show relationships: paired narrative-and-proof fields, split operational outputs, ledger rows, and register tables. Strong one-pixel rules are the default boundary. The social extension may use a promise beside a paper decision record when that comparison improves inspection, but the 62/38 opening composition is specific to the current social surface—not a global invariant.

At 860px, paired fields become single columns and multi-column registers reduce to two-column reading paths. At 620px, dense grids collapse to one column, table headers can become visually hidden when row labels retain meaning, and controls retain a 2.75rem minimum height. The rail becomes a mobile navigation overlay rather than permanently consuming the viewport.

**The Axis Rule.** Align records and decisions to a visible vertical and horizontal rule before adding decoration. If a relationship cannot survive the grid, the content is not ready for ornament.

## Elevation & Depth

The system is flat by default. Depth comes from field change, borders, document overlap, and contrast between rail, forest, paper, and white—not a general card-shadow vocabulary. The one observed lifted treatment is the paper decision specimen: it may use a deep forest shadow and a single offset outline to read as a working sheet placed on a decision field.

**The Field-First Rule.** Create hierarchy with surface colour and rules before shadow. Reserve physical lift for an inspectable artefact that benefits from reading as a sheet.

## Shapes

The dominant language is square and rectilinear: buttons, rails, tables, sheets, fields, and borders are unrounded. The exception is semantic geometry. Confirmed and assumption markers use a leaf quadrant, uncertainty is an open circle, and material risk is a filled diamond. These silhouettes are notation, not decoration.

**The Semantic Shape Rule.** Curves and rotations belong to evidence notation or a documented sheet specimen. Do not introduce pill controls, soft cards, or arbitrary rounded containers.

## Components

### Navigation

The rail is a durable system boundary: white brand text over Rail Black, grouped links, quiet group labels, and one forest current state with a white inset axis. Links have a minimum 2.75rem interactive height. The sticky top bar repeats section context in muted record text and uses a translucent white field with blur only to retain reading position.

### Buttons

**Character:** firm, square, and document-like rather than promotional.

- **Shape:** square corners with a 1px current-colour border.
- **Light:** White fill and Decision Forest text for action inside a dark field.
- **Forest:** Decision Forest fill and White text for action on a light sheet.
- **Padding:** the established 0.75rem × 1rem internal space with a 2.75rem minimum height.
- **Hover / Focus:** hover darkens by a small brightness shift; focus is a 3px lime outline with a 4px offset. Do not remove the visible focus treatment.

### Text Links

**Character:** operational references, not secondary buttons.

- **Style:** bold IBM Plex Sans, underlined with a 0.3em offset, and a 2.75rem minimum interactive height.
- **Colour:** Forest on light sheets and White inside dark fields.
- **Use:** guidance, downloads, source destinations, and related records.

### Choice Controls

**Character:** a compact chooser that behaves like a labelled record, not a row of decorative pills.

- **Channel choices:** use visible labels and native radio inputs; the selected state must remain legible without colour alone.
- **Select fields:** retain a native, inspectable control with the same clear focus outline as buttons.
- **Use:** choose a channel and content job before opening a master or beginning production.

### Paper Decision Sheet

**Character:** a readable, source-aware artefact placed inside a darker operating field.

- **Surface:** Working Paper with Mineral row rules and Decision Ink reading text.
- **Structure:** a compact head, governing question, evidence ledger, recommendation resolution, and a visible source note.
- **Resolution:** a Decision Forest inset field with White recommendation text and muted supporting reversal language.
- **Depth:** use the documented specimen lift only when the component needs to read as a placed sheet.

### Evidence Ledger

**Character:** a table or stacked record that makes interpretation inspectable at a glance.

- **Rows:** one state marker, written state label, concise evidence text, and a structural divider.
- **Markers:** use only the canonical confirmed leaf, assumption leaf with dashed continuation, uncertainty circle, and material-risk diamond.
- **Accessibility:** labels remain present at every crop, size, and export. Include a source note where the evidence is simulated or otherwise qualified.

### Registers and Tables

**Character:** working documentation with strict axes and no card treatment.

- **Structure:** border-top opening, 1px row dividers, concise labels, and aligned columns.
- **Responsive behaviour:** collapse toward labelled record rows; do not preserve a desktop table at the cost of horizontal overflow.
- **Use:** channel guidance, master registers, QA lists, and scheduled operating records.

## Do's and Don'ts

### Do:

- **Do** lead consequential content with a governing question, then preserve evidence state, source, recommendation owner, and reversal condition through every derivative.
- **Do** use black rail containment, forest decision fields, paper working sheets, and mineral dividers as a restrained, legible material hierarchy.
- **Do** retain the supplied lockup when introducing GreenSquare; reserve the mark alone for recognised or explicitly labelled contexts.
- **Do** make controls keyboard-operable, visibly focused, and at least 44 by 44 CSS pixels where the source establishes an interactive target.
- **Do** make essential meaning survive without colour, sound, motion, or pointer interaction.

### Don't:

- **Don't** turn the social extension into a generic gallery of templates or promote the current social page composition into a system-wide rule.
- **Don't** use evidence colours or marker shapes without their written state labels.
- **Don't** introduce soft rounded cards, pills, decorative terminal styling, presenter imagery, AI avatars, or synthetic voice as substitutes for institutional proof.
- **Don't** use monospace decoratively; limit it to literal GitHub or code content.
- **Don't** publish a recommendation without a visible owner and reversal condition, or claim observed evidence when a scenario is simulated.
