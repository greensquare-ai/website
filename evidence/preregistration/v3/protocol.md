# Benchmark protocol v3 (pre-registration candidate)

*This document is written to be frozen and hashed BEFORE any scored run. It is the pre-registration. Once committed, the cases, fact sheets, answering rule, arms, rubric, models, and repeat counts do not change; if they do, the change is logged with a timestamp and the affected runs are re-done. Companion files: `cases/`, `rubric-operationalisations.md`, `reference-answers-SEALED.md`.*

## What is being tested
Whether loading the Decision Brief v2.0 file makes a frontier model **reliably** surface the hidden decision, run the discipline (interrogate, reclassify untested constraints, generate real options, tag evidence, state kill criteria), and produce a defensible brief, **and whether it does so consistently across models and repeats** where a naked or even a fully-informed baseline does so only sometimes. The honest claim under test is reliability and defensibility, not "raw models fail."

## The three arms (per case, per model)
- **Arm A — naked baseline.** The frozen prompt only, as a real user would paste it. No fact sheet, no product file. One turn (the model answers; if it asks questions, they are not answered, matching a user who just wants an answer). This is the "what you actually experience" demo.
- **Arm B — informed baseline.** The frozen prompt with the full fact sheet appended in the first message. No product file. One turn. Equal information to Arm C; the only difference from C is the product's discipline. This is the skeptic's controlled comparison.
- **Arm C — loaded.** The Decision Brief v2.0 file pasted first, then the frozen prompt. The model interrogates; the operator answers each question using ONLY the fact sheet (verbatim in substance), and replies "That has not been assessed" to anything off-sheet. The interaction runs to a completed Decision Brief.

The answering rule (Arm C) is fixed and published so the interrogation phase is reproducible and the operator cannot feed the model convenient answers. Off-sheet questions are answered "That has not been assessed" so that how each condition handles a genuine unknown is itself measured.

## Models
- Claude (current Opus/Fable class at run date)
- ChatGPT (current GPT thinking class at run date)
- Gemini (current Pro class at run date)

Exact model version strings and dates are recorded in each transcript header and in `methodology.md`. Vanilla conditions: ChatGPT and Gemini verified to have no custom instructions; Claude custom style set to Normal for the run window, then restored (the restoration is logged). API with an empty system prompt is the preferred clean substrate if keys are available; browser automation is the fallback.

## Repeats
- **Pilot:** n=3, Case A, all three arms, Claude only. Purpose: confirm the design discriminates (Arm C passes the judgment checks reliably; Arms A/B do not, or only sometimes) before committing to the full grid. The pilot is disclosed as a design-phase pilot and its runs are not pooled with the pre-registered grid.
- **Full grid (after freeze + pre-registration):** Case A at n=10 per cell (3 models x 3 arms = 9 cells = 90 runs); Cases B and C at n=5 per cell (each 45 runs). Total target ~180 runs. If API keys are available the grid runs cheaply and can go higher; browser automation is the fallback at the stated n. If n is reduced for any cell, the reduction is logged in `methodology.md` (no silent caps).

## Scoring
- Each transcript is de-identified (arm and model stripped, given a Run-ID) before scoring.
- **Process-discipline checks** (see `rubric-operationalisations.md`) are scored mechanically from the transcript against the published one-paragraph operationalisations. These are things the product file instructs; the test is whether they hold reliably, and how often the baselines also do them.
- **Judgment checks** are scored against the sealed reference answer for that case. These are NOT named in the product file.
- Target: two independent scorers per transcript, from the published operationalisations; inter-scorer agreement reported; disagreements published with resolution. A cross-family LLM judge (a model from a different family than the one under test, given the de-identified transcript, the rubric, and the sealed reference answer) is a secondary cross-check only, its prompt published, never the headline. Where only one human scorer is available, that is disclosed and the LLM cross-check is reported alongside.
- Results are reported as **raw counts** (e.g. "hidden decision surfaced: Arm C 10/10, Arm B 4/10, Arm A 1/10"), never percentages alone. Baseline partial successes are reported prominently, per case.

## Reporting honesty commitments
- Every published count is traceable to a saved, downloadable transcript.
- The GO case (Case B) is reported with equal prominence to the reversal cases; if the engine fails to recommend the aggressive option there, that is published.
- The case where the engine adds least is identified.
- No percentage is reported without its underlying count and n.
- Model versions and dates are on every result; the grid is re-run within 14 days of a major model release and the date-stamped history kept.

## Pre-registration procedure
1. Freeze this file, the three case files, `rubric-operationalisations.md`, and `reference-answers-SEALED.md`.
2. Hash each file (SHA-256); record the hashes in `PREREGISTRATION.md` with a UTC timestamp.
3. Commit to the public repo `ks-projects-66/greensquare` under `evidence/preregistration/`. The commit timestamp is the pre-registration.
4. Only then begin the scored grid. The reference answers stay in the repo but the "SEALED" file is published only after scoring is complete, so scorers cannot be accused of fitting to it mid-run (its hash proves it was fixed in advance).
