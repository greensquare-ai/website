# Decisions

Why the site is the way it is. Each entry records what was decided, why, and what would reverse it.

The last field matters most. Several things on this site look like oversights and are not. If you
are about to remove something because it seems inconvenient, find it here first.

The research behind these decisions, including buyer reads, adversarial reviews and the fact
register every published figure is checked against, is held in the private `greensquare-ops`
repository. This file records the constraints; that repository records how they were arrived at.

---

## 2026-08-30 · /product folds into /benchmark

**Decided.** The separate product page was merged into the benchmark page, which became the
flagship. `/product` is parked at `src/pages/_product.astro` and redirects.

**Why.** A cold read by a target buyer found the product page was where they nearly left, and the
benchmark page was the best thing on the site. The strongest material sat behind the weakest. A
reader also cannot evaluate evidence for a product they have not been told about, and the product
page did not carry the study's caveats, so a reader who saw only that page believed the evidence was
current when it was not.

**Reversed by.** A decision that the study should be readable without the product framing, for an
audience who already knows what Compass is. The redirect must survive either way; the URL is public.

---

## 2026-08-30 · The product was renamed after the study was run

**Decided.** "The Decision" became **Compass** and "the Decision Frame" became **Lens 4.0**. The
output keeps its name, the Decision Brief. The study's third arm is relabelled Compass throughout,
including in the results tables.

**Why.** Three product names shared a root and blurred together, and the product name was also
ordinary English doing ordinary work on the same pages. A naming pass scored candidates on cold
clarity, distinctness, chart-label fit, token-swap safety, honesty and ladder fit.

**The obligation this creates.** Relabelling an arm of a pre-registered study after it has been run
and scored is only available with disclosure. The page carries a dated sentence saying the product
was renamed on 30 August 2026, after the study was run and scored, and that the arm labelled Compass
is the arm tested under its former name. **That sentence is load-bearing, not boilerplate. If it is
removed, the relabel becomes dishonest and the tables must revert to the tested name.**

**Reversed by.** Nothing short of renaming the product again, which would carry the same obligation.

---

## 2026-08-30 · The legal pages keep the former names

**Decided.** `src/pages/legal/terms.md` and `privacy.md` still use "The Decision" and "the Decision
Frame" as defined terms. They were deliberately not included in the rename.

**Why.** Changing a defined term in an outward-facing legal document is not a copy edit.

**Known consequence.** The site offers Lens by name while the privacy policy consents people to the
Decision Frame. This is a real inconsistency and it is open, not resolved.

**Reversed by.** A legal review that updates both documents together.

---

## 2026-08-30 · No count is set in the display face

**Decided.** No numeral anywhere on `/benchmark` renders in `--vf-display`. Paired counts carry
identical size, weight and colour, separated only by position and mark. Green ground carries limits
and the call to action, never a result.

**Why.** A buyer read the previous page for thirty seconds, scored its honesty 9 out of 10, and
still came away believing a null result was a win. The cause was typographic rather than editorial:
three large green process counts were the loudest objects on the page and the honest sentence was
small grey text. The page was not lying; its typography was.

**Reversed by.** Nothing currently foreseen. If a count ever needs emphasis, the comparator must be
emphasised identically.

---

## 2026-08-30 · The four-bullet use-case grid was deleted

**Decided.** The "Investment and bids / Build, buy or partner / Programs and projects / Operating
choices" block did not survive the merge. It is replaced by a statement of what was tested and what
was not.

**Why.** It was four category names asserting what the product is for, with no supporting fact. A
buyer named it the only marketer-written object on either page and one of two places they wanted to
close the tab.

**Reversed by.** Evidence that supports a use-case claim. The replacement is fact-bound; the
original was not.

---

## 2026-08-30 · A demonstration run is published, verbatim and unedited

**Decided.** `src/data/demonstrations/demo-1.md` publishes one complete run of Compass on a
fictional case, with the transcript and the brief it produced.

**Why.** The published study scores behaviour but shows none of it. A buyer said they had evaluated
a product they had never seen, and asked for exactly this.

**The rules it ships under.** It is a demonstration and not part of the pre-registered study, and
the page says so at every point it appears. It was not scored or adjudicated, there is no sealed key
and no baseline. Three ways it differs from a buyer's own use are stated on the figure: the operator
is an AI agent constrained to a fixed fact sheet rather than a person, it ran in an agent session
rather than a consumer chat, and the model is a current release rather than either model the study
tested. `src/lib/demo.ts` fails the build if the label is missing, if the run is marked scored, if
the transcript is marked edited, or if the product hash does not match the published one.

**Reversed by.** A replacement run of at least equal quality, published under the same rules. Never
by quietly removing this one.

---

## 2026-08-30 · The first demonstration attempt was abandoned, and that is disclosed

**Decided.** An earlier attempt was discarded and the page says so, including that it happened.

**Why.** The operator in that attempt had not been given its own opening message and so contradicted
a fact its own character had stated. Publishing it would have shown the product appearing to invent
a fact it did not invent, which is misleading in the product's disfavour and simply untrue. It was
abandoned rather than edited, because editing a transcript to fix it is the thing this page exists
not to do.

**Reversed by.** Nothing. If further attempts are ever run, the count must be updated, not hidden.
The page states how many attempts were made and that only one is published.

---

## 2026-08-31 · The tagging error in the published demonstration is named, not corrected

**Decided.** The published run mis-tags one claim: it renders the operator's "I do not know who
assesses the integrator's attestation" as an assertion that nobody independent assessed it, tagged
given, when the file's own scheme makes an absence of knowledge unknown. The transcript is unchanged
and the error is named beside it, at body weight.

**Why.** Evidence tagging is the discipline the product sells, so a tagging failure in the showcase
is the most damaging thing a reader could find unaided. An adversarial review pointed out that a
reader would otherwise count it themselves, so the page states the base rate directly: of the three
transcripts of this feature ever published, two are known to carry a tagging error.

**Reversed by.** Nothing. Correcting the transcript would make it not a transcript. If a future run
is clean, publish that and say so.

---

## 2026-08-30 · The study record stays on the flagship rather than moving to /methodology

**Decided.** All eighteen protocol departures, the eight limitations, the hash tables and the full
grid remain on `/benchmark`, low on the page.

**Why.** The page carries a live commitment that it is the complete record, and the
fact-preservation harness diffs against this page. Splitting the record would force rewriting a
trust artefact to accommodate a layout choice.

**Reversed by.** A decision to make `/methodology` the record of account, which would require moving
the commitment sentence with it.

---

## 2026-08-30 · Four defects in the previously published record were corrected

**Decided and shipped.** Each correction leaves a visible trace of what it previously said.

1. A "clean" item published the retired 54-run total with no context, on a page whose grid is 45.
   Rewritten to state both steps of the reduction. `assertInvariants()` now fails the build if a
   clean item states the retired total without the current one beside it.
2. `PREREGISTRATION.md` asserted the commit was pushed on a date, which the file's own correction
   disclaimed two paragraphs below. Both push assertions removed; the record now claims only git
   authored and committer times.
3. A limitation stated the run inventory did not reconcile and the tenth pilot file had never been
   opened. Both were checked and neither held. Rewritten in place, keeping eight entries and stating
   what it previously reported, rather than retired.
4. The composite described itself as a logical AND of the five process checks. The code takes the
   lowest of the five counts, which is an upper bound on the number of runs passing all five, not a
   conjunction. No published figure was ever wrong, because on this grid every component cell is
   zero or the full n, but the description was.

**Why.** A page whose argument is exact self-description cannot carry a false statement about its
own workings, however small.

**Reversed by.** Nothing. Each is a correction of an error.

---

## 2026-08-30 · Figures render from accessors, and guards are not relaxed

**Decided.** No page types a count, date or denominator as a literal, and no page does arithmetic in
a template. `src/lib/benchmark.ts` and `src/lib/demo.ts` own every figure, and their invariants run
at module scope so `astro build` fails rather than shipping a bad one.

**Why.** The retired figures on this site drifted because the same number was typed in several
places. Binding them removes the failure mode rather than guarding against it.

**Reversed by.** Nothing. If a guard fires, the input is wrong. Fixing the guard to make a build
pass defeats the only mechanism protecting the published figures.

---

## 2026-08-31 · The methodology page counts were bound

**Decided.** `/methodology` renders its counts from the accessor layer rather than typing them.

**Why.** The page claimed every count lived on the benchmark page and nowhere else, which was false:
it stated six of its own. Rewriting the sentence to say counts elsewhere are rendered from the same
source would have been equally false while they were literals. Binding them made the sentence true.

**Reversed by.** Nothing, unless the claim is removed from that page as well.
