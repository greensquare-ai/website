# GreenSquare OS

Status: working canonical knowledge layer
Updated: 21 August 2026

GreenSquare is a judgement system for AI-assisted work. It helps a person move from ambiguity to a defensible decision, then from that decision towards execution and learning.

## Authority

This directory contains the durable, machine-readable operating logic behind GreenSquare products. It does not replace product code, evidence transcripts or the V4 design system.

Source-of-truth hierarchy:

1. `02-judgment-os/judgment-os.md` governs the methodology.
2. `03-ai-behaviour/behaviour-spec.md` governs AI behaviour.
3. Product specifications under `04-products/` govern individual implementations.
4. `06-brand/v4-governance.md` records that V4 is the sole governing brand/design system. V1-V3 are historical drafts.
5. `10-decisions/decision-log.md` records material product and methodology decisions.

Where a product implementation conflicts with the Judgment OS, flag the conflict rather than silently changing the methodology.

## Core proposition

AI has made answers abundant. It has not made judgement abundant.

GreenSquare supplies structure, interrogation, discipline and decision logic. It shapes how a user and AI reach a decision, not what that decision must be.

The intended experience is: the AI asks the right questions, keeps pushing until it understands what matters, stress-tests the user's thinking, helps make the call and turns it into something executable.

## Working architecture

- `01-philosophy/green-square-thesis.md`: core philosophy and principles.
- `02-judgment-os/judgment-os.md`: deep operating methodology and six-stage interaction model.
- `03-ai-behaviour/behaviour-spec.md`: executable AI behaviour rules.
- `04-products/decision-frame/decision-frame-v2-spec.md`: free-product rebuild specification.
- `04-products/decision-frame/test-standard.md`: cross-model product tests.
- `06-brand/v4-governance.md`: V4 design and writing governance.
- `07-content-os/content-operating-system.md`: launch content operating model.
- `08-commercial/product-ladder.md`: current commercial architecture and unresolved boundary decisions.
- `09-launch/readiness.md`: implementation backlog and readiness gates.
- `10-decisions/decision-log.md`: dated decisions.

## Governing build principle

Decision system before artefact. Every step must improve the decision. If it does not, remove it.
