# How we test the Decision Brief (methodology)

*Public-facing methodology, drafted for the Evidence and Methodology pages. Honest by construction: every claim traces to a saved transcript, the inputs are pre-registered before any scored run, and the failures are published with the successes. Numbers are filled from the scored grid; until then this reads as method, not results.*

## What we are actually claiming
Frontier models are brilliant on their good days. Your executive committee is not scheduled for the model's good days. The Decision Brief exists to make the brief that survives senior scrutiny the one you get **every time**, not the one you get when the model happens to interrogate the question instead of answering it.

So the claim we test is **reliability and defensibility**, not "raw AI fails." A modern model, well prompted and fully informed, will sometimes surface the real decision on its own. We show you how often "sometimes" is, and we show the Decision Brief doing it consistently, on three different models, on cases the model has never seen.

## The cases
Three fictional, un-Googleable cases built at ASX-200 scale, each with a seductive surface question that hides the real decision. They are fictional on purpose: a famous real case (a well-known collapse) is useless here, because the model recognises it and recalls the answer from memory instead of reasoning. One of the three is adapted and disguised from a documented Australian post-mortem so the answer key is not entirely ours to write.

Critically, one case is a **GO case**: the correct call is the bold, aggressive option, not caution. It is there to prove the Decision Brief changes direction *toward the evidence*, not toward hedging. If it ever recommends "validate first" on the case where the evidence says "move now", we publish that.

Each case surfaces its real decision only by **integrating three facts placed far apart** in the brief. A single-pass read tends to mention one of them. Connecting all three, and acting on them, is the judgment we measure.

## Three arms, so the comparison is fair
For each case, on each model, we run three conditions:
- **Arm A — the naked baseline.** The question as a real person would paste it. This is what you actually experience.
- **Arm B — the informed baseline.** The same question with the full fact sheet handed over up front. Equal information to the Decision Brief; the only difference is discipline. This is the controlled comparison a skeptic should demand.
- **Arm C — the Decision Brief.** The model loaded with the product, interrogating; a person answers its questions using only the case fact sheet, and says "that has not been assessed" to anything the sheet does not cover.

Publishing Arm A and Arm B both matters: A shows the felt difference, B rules out "it only won because it knew more."

## The scorecard, split in two
We score each run against a rubric fixed and published in advance, split into two honestly-labelled groups:
- **Process discipline** (the product tells the model to do these): asked before answering; generated real options including doing nothing; tagged its evidence; named an untested constraint; stated what would change the call. We expect the baselines to manage some of these sometimes. The point is whether they hold *every time*.
- **Judgment** (the product does not name these; scored against a sealed answer key): surfaced the hidden decision by integrating the three facts; the recommendation went the right direction; caught the planted inconsistency or bias. This is the part that separates reasoning from instruction-following.

## Discipline that makes the numbers trustworthy
- **Pre-registration.** The cases, fact sheets, rubric, and the sealed answer key are hashed and committed to a public repository before any scored run. The commit timestamp proves the test was fixed in advance and the scoring was not fitted to the results.
- **Repetition.** The primary case is run ten times per cell; reliability is the whole claim, so a single run is not evidence. Results are reported as raw counts (for example, 10/10 versus 4/10), never a lone percentage.
- **Independent, blinded scoring.** Transcripts are stripped of which arm and model produced them before scoring. A second scorer checks a sample; an AI judge from a different model family is a cross-check only, never the headline.
- **Everything is downloadable.** Every count links to the transcript behind it, including the runs where the baseline did well and the case where the Decision Brief added least.

## The part that speaks your language: the blind senior-reviewer study
Machines grading machines does not answer the only question that matters to you: would a senior person send this up under their own name? So we also run a blind panel. Verified senior operators (ex-Big-4 and MBB, current ASX corporate strategy and finance) are shown two briefs per case, de-identified and in random order, and asked one question: which would you be more willing to send to your executive committee under your own name? We publish the split and their verbatim comments, including any who preferred the baseline.

## Run it yourself
The whole point of a vendor-built benchmark is that you should not have to believe it. Download the cases, the fact sheets, the rubric, and the Decision Brief, and run the comparison on your own live decision. The benchmark's real job is to teach you how to check us.

## Limitations we will not hide
- We wrote two of the three cases. Pre-registration and independent scoring shrink that problem; they do not erase it. Run your own.
- Frontier models change monthly. These results carry model versions and dates, and we re-run the grid within fourteen days of every major model release.
- Fictional cases are not your business. They are designed to be representative, not identical. The reproduction pack exists so you can test the one thing that is identical to your business: your decision.
