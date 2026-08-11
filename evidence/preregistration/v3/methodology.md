# GreenSquare benchmark v3: current methodology

Current as at 14 July 2026.

> **Superseded, 11 August 2026.** Every figure below describes the retired 54-run grid, which pooled
> nine design-phase pilot runs that `protocol.md` line 23 excluded from the pre-registered grid. That
> grid was re-cut to the 45 pre-registered runs, and five disputed cells were adjudicated on
> 10 August 2026 against the sealed reference answers. The counts in the "Current result" section
> below are out of 18 and are no longer the published result; the current figures are out of 15 and
> are reported at https://www.greensquare.ai/benchmark/, which is the only current record.
>
> This file is left in place rather than rewritten because it is part of the disclosed record. It is
> not one of the six hashed inputs listed in `PREREGISTRATION.md`, so this notice alters no hash.

## Completed grid

The scored result currently covers two models, three cases, three conditions and three repeats per cell.

| Item | Current completed result |
|---|---|
| Models | Claude Opus 4.8 and ChatGPT GPT-5.5 |
| Cases | Meridian, Larkfield and Corvan |
| Conditions | Question only, all facts provided, The Decision loaded |
| Repeats | Three per cell |
| Total runs | 54 |
| Scoring | One scorer |
| Pending | Gemini, independent re-score, transcript publication, senior reviewer study |

The pre-registered protocol targeted about 180 runs, with ten repeats for Case A, five repeats for Cases B and C, and three model families. The completed grid was reduced to 54 runs. Gemini remains pending. This reduction is disclosed here and on the public methodology page.

## Claim under test

The Decision is designed to make an AI model follow a reliable process for one business decision. The benchmark tests whether the file consistently makes the model:

1. Ask for missing facts before giving a recommendation.
2. Test the framing and unverified constraints.
3. Compare genuine options, including keeping the current position.
4. Mark the basis of important claims.
5. State what would change the recommendation.

The judgment checks then test whether the model connects the facts that reveal the underlying decision, recommends the direction recorded in the sealed answer, and catches the planted inconsistency or bias.

## Cases

The three cases are fictional and cannot be found through search. Each case presents a plausible surface question and places three facts elsewhere in the fact sheet that change the underlying decision.

1. Meridian is a managed service bid with concentration, regulatory and stranded investment risk.
2. Larkfield is a build or acquire choice where the evidence supports the acquisition.
3. Corvan is a continue or exit decision adapted from a documented Australian post mortem.

Larkfield tests whether the method follows evidence towards a more aggressive option when that direction is supported.

## Test conditions

### Question only

The model receives the short question a business user might type into a new chat. It answers once. Any questions it asks receive no reply.

### All facts provided

The model receives the same question plus the full fact sheet in the first message. It answers once.

### The Decision loaded

The model receives the product file and the short question. It asks its own questions. The operator answers only from the same fact sheet used in the all facts condition and replies “That has not been assessed” when the fact sheet is silent.

## Scoring

Each run is scored against the rubric fixed before the scored grid began.

The five process checks measure behaviour directly requested by the product file. The three judgment checks use the sealed case answer.

The current grid has one scorer. Results are reported as raw counts with the number of runs shown. A second independent score has yet to be completed.

## Current result

**Retired. Superseded on 10 August 2026 by the adjudicated 45-run grid. The five counts below are out
of 18 because they pooled the excluded pilot runs. They are kept here as a record of what was
published, not as a result. The current figures are out of 15 and are published at
https://www.greensquare.ai/benchmark/.**

1. The loaded file completed all five process checks in 18 of 18 runs.
2. It surfaced the underlying decision in 17 of 18 runs.
3. The question only condition surfaced the underlying decision in 0 of 18 runs.
4. The all facts condition surfaced it in 15 of 18 runs.
5. The all facts and loaded conditions matched the sealed direction in 18 of 18 runs each.

These results support a claim about process consistency and fact gathering across the two tested models.

## Limitations

1. Three repeats per cell provide an early signal and leave substantial uncertainty.
2. GreenSquare wrote two cases.
3. Gemini remains pending.
4. One person scored the current grid.
5. One loaded ChatGPT run integrated two of the three required facts.
6. The senior reviewer study and independent re-score remain pending.
7. The saved transcripts will be published after the Gemini grid is complete. Public independent re-scoring is therefore unavailable today.

## Refresh policy

GreenSquare commits to re-running the benchmark within 14 days of a major model release. Results remain labelled with the tested model version and date until the refresh is complete.
