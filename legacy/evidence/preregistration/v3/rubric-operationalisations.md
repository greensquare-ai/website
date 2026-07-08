# Rubric operationalisations v3

*Each check is binary (met / not met) per run, scored from the transcript. Split into two groups. Published before scoring. A run's score is the vector of check results, not a single number.*

## Group 1 — Process-discipline checks
*These are behaviours the Decision Brief file instructs. The point of measuring them is (a) to show they hold reliably across models and repeats in Arm C, and (b) to show honestly how often the baselines (Arms A and B) also produce them unaided. We EXPECT baselines to pass some of these sometimes; that is the honest picture, not a threat to the claim.*

1. **Asked before answering.** MET if the response asks the user clarifying questions and withholds the final recommendation until they are answered. NOT MET if it delivers a recommendation/plan in the first turn without seeking input. (Arm A/B baselines are single-turn by protocol, so a baseline can only meet this if it opens by asking rather than answering.)
2. **Generated real options including do-nothing.** MET if the output compares three or more genuinely distinct options, at least one of which is the status quo / do-nothing / a materially de-risked structure, on consistent criteria. NOT MET if it presents one recommended path, a false binary, or a one-row table.
3. **Evidence tagged.** MET if load-bearing claims are marked by their basis (given / inferred / unknown, or an equivalent explicit confirmed/estimated/assumption scheme) such that a reader can see what is known versus assumed. NOT MET if claims are asserted without any basis marking.
4. **Named an untested constraint / assumption.** MET if the output explicitly identifies at least one stated "constraint" or premise as unverified and treats it as an assumption to test (not a fact). NOT MET if all stated constraints are taken at face value.
5. **Stated kill criteria.** MET if the output names the specific conditions/unknowns that would change or reverse the recommendation (not generic caveats). NOT MET if risks are absent or only boilerplate.

## Group 2 — Judgment checks
*These are NOT named anywhere in the product file. They are scored against the sealed reference answer for the case. These are the checks that distinguish reasoning from instruction-following.*

6. **Surfaced the hidden decision (by integration).** MET only if the output reframes from the surface question to the case's hidden decision AND does so by connecting the case's integration facts, not by mentioning one in isolation. Partial credit is recorded separately: "mentioned a component risk" (e.g. named the concentration OR the regulator dependency OR the bespoke-asset specificity, but did not integrate them into the reframing) is logged as PARTIAL, distinct from MET. This distinction is the core of the whole benchmark: baselines often score PARTIAL; integration into the recommendation is the measured judgment.
7. **Recommendation direction matched the reference answer.** MET if the substantive direction of the recommendation matches the sealed reference direction for the case (Case A: do not accept in this form / de-risk the structure; Case B: pursue the aggressive move and retest the stale constraint now; Case C: stop and commission the exit/redeploy analysis). NOT MET if it recommends the surface plan as posed. Recorded per case so the GO case is visible.
8. **Caught the planted inconsistency / bias.** MET if the output surfaces the case's specific planted tension: Case A, the board's own concentration preference and stated diversified strategy versus the plan; Case B, that the two failed e-commerce hires already falsify the build's staffing assumption, and the stale-rule provenance; Case C, the sunk-cost/escalation framing and the absence of an independent view. NOT MET if none is surfaced.

## How the split is reported
- The reliability grid shows Group 1 and Group 2 as visually distinct bands, labelled: "Process discipline (the file instructs this; we show it holds every time, and how often baselines also manage it)" and "Judgment (the file does not name these; scored against a sealed answer key)."
- The headline stat comes from Group 2, check 6 and 7, reported as counts per arm per case. Group 1 supports the reliability story; Group 2 supports the value story.
