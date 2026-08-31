---
id: kelbrane-2026-08-30
label: Demonstration, not part of the pre-registered study
model: Claude Opus
run_on: 2026-08-30
case_name: Kelbrane Group
case_fictional: true
product_file: decision-brief-v2.0.md
product_sha256: 3FF4672830AD1AB590AFD58F0D56DDC4B14E095588F730FACACD14CE3ABBE1E1
operator: AI agent holding the case fact sheet only, never the answer key
harness: agent session, not a consumer chat
scored: false
adjudicated: false
edited: false
attempts_before_this: 1
attempt_note: >-
  A first attempt was abandoned because the operator had not been given its own opening message and
  wrongly contradicted it, which would have shown the product appearing to invent a fact it did not
  invent. That was a fault in how the run was set up, not a product failure. The attempt was
  abandoned rather than edited, and no content from it was carried forward into this one.
---

# Demonstration run, Kelbrane Group

**This is a demonstration, not part of the pre-registered study.** One run, on a fictional case, not
scored, not adjudicated, with no sealed key and no baseline to compare against. It shows what the
file does. It measures nothing.

Three ways this differs from a buyer's own use, stated so the reader can discount them:

1. The operator is an AI agent constrained to a fixed fact sheet, not a person.
2. The model ran inside an agent session rather than a clean consumer chat.
3. The model is a current Claude release, not either of the two models the benchmark tested.

The transcript below is verbatim and unedited. Nothing has been trimmed, re-ordered or spliced.

---

## The operator's opening message

> We're putting the new ordering and warehouse system into all 42 branches and the plan is one
> national cutover on the weekend of 6 February. I have to put a recommendation to the steering
> committee on Thursday and I'm the one who owns it. The integrator has signed off that we're ready,
> my test manager is not comfortable, and the only alternative anyone will agree to is the June
> window. Support on the old platform ends 31 March so June is already awkward. My instinct is we
> hold February and manage the rest through hypercare, but I want to pressure-test that before I put
> my name to it. What do I need to be able to defend the readiness call?

## Compass, first reply

> Before I start, one choice: constructive pressure, or a full stress-test where I challenge every
> assumption behind the February call? Given this is 42 branches in one weekend and you are putting
> your name to it, I would suggest the second, but it is your call.
>
> Either way, I need six answers before I build anything. Short answers are fine.
>
> 1. What exactly is your test manager not comfortable about? Not "not comfortable", the specific
> thing: open defects by severity, test scripts written but not executed, integration or interface
> testing, data migration dry runs, performance at peak volume, or branch-level user readiness. Name
> the top two, and say whether they are trending closed or static.
>
> 2. What did the integrator sign off against? Their own exit criteria or yours, and is there a
> written set of cutover entry criteria that both parties agreed in advance? Who assesses it who is
> not the integrator and not paid by them?
>
> 3. Rollback. If the cutover fails, what is the plan, has it been rehearsed end to end on
> production-scale data, and what is the latest hour on that weekend at which you can still reverse
> it? If the answer is that you cannot practically go back once orders are flowing through the new
> system on Monday, say so.
>
> 4. The 31 March date. What does the contract or the vendor notice actually say, and has anyone
> asked in writing what extended support or a paid extension would cost? I am asking whether that
> date has been tested or assumed.
>
> 5. Why is a phased cutover ruled out? Not why big bang is attractive, but who ruled out running a
> small group of branches first, and on what grounds: the integrator's contract and pricing, an
> interface that cannot run in parallel, warehouse and stock constraints, or nobody wanting to run
> two systems at once.
>
> 6. Blast radius and success. If it goes badly, what does that look like in branch terms for a week:
> orders not taken, picks not completed, revenue or service at risk per day. And what would the
> steering committee treat as an unacceptable outcome? A number or a plain description is fine.

## The operator

> Full stress-test. Go hard.
>
> 1. Test manager: he has not put anything in writing, so I do not have his top two ranked. What I
> know is he is not comfortable. I have not pinned him to specifics.
>
> 2. That has not been assessed, in the sense that I do not know whether there was a jointly agreed
> cutover entry criteria document. What I can tell you is the exit criteria the steering committee
> set at programme start: zero open severity-1 and zero open severity-2 at the go/no-go gate. Against
> that, 19 of 47 sev-1/sev-2 defects are still open, six of them sev-1. I do not know who assesses
> the integrator's attestation independently of the integrator.
>
> 3. That has not been assessed.
>
> 4. In March 2026 the programme director asked the vendor account manager whether the end-of-support
> date could move, and was told no. But the question asked was whether the vendor would move the
> product's global end-of-life date, not whether Kelbrane could buy extended support on our own
> instance. Nobody has asked that question or requested a price.
>
> 5. A phased regional rollout was assessed in design phase 2025 and rejected on the grounds it would
> add seven months and about $9m. That assessment predates the EDI integration design and predates
> the current stock accuracy data, so I cannot tell you it was made on today's facts.
>
> 6. That has not been assessed. No work has been done on what a failed or partial cutover costs in
> service credits, lost trading days or remediation, and I do not have a defined unacceptable-outcome
> threshold from the steering committee.

## Compass, the framing challenge and the read-back

> Taking it hard, as asked.
>
> **The framing, tested once.** You have framed this as: how do I defend the readiness call for
> February. That is a question about how to support a conclusion you have already reached, not a
> question about whether the conclusion holds. On what you have given me, the more honest question
> is: on Thursday, do I ask the steering committee to waive the go/no-go criteria it set itself, and
> do I put my name to that waiver or to a date change? Everything else follows from which of those
> two you are actually doing. Tell me if you think that is the wrong read.
>
> Here is why I have re-pointed it. The only written readiness standard on the table is the steering
> committee's own: zero open sev-1 and zero open sev-2 at the gate. You are at 19 open of 47, six of
> them sev-1, which is 40 per cent of the population still open (derived, from your figures). There
> is no version of Thursday where you defend February against that criterion. You can ask for it to
> be relaxed, which is a legitimate thing to ask and their decision to grant, but that is a different
> paper and a different set of signatures. If you present February as "ready", the gate criterion is
> the first thing a director reads back to you, and it is in the programme's own founding documents.
>
> **My read of where you are.**
>
> The real decision is what recommendation you carry into Thursday: hold February on a waiver of the
> gate, move to June, or reopen an option that is currently closed. The options actually on the table
> are February big bang, June big bang, and (currently ruled out) a phased rollout. What decides it
> is three things: whether the six sev-1 defects can be closed and re-tested with margin before the
> gate, whether 31 March is a real wall or a purchasable one, and what a failed national cutover
> costs, which nobody has costed. Known: the defect position, the design-phase phased assessment from
> 2025, the March 2026 vendor exchange. Unknown: the test manager's specific objections, the rollback
> position, the price of extended support, the current-facts cost of a phased option, and the blast
> radius. On my read the cutover weekend is February 2027, roughly five months out, so several of
> those unknowns are closeable before the date rather than after it. Correct me if the year is wrong,
> because it changes the answer.
>
> **Four things you have told me that do not sit together. I am not going to resolve these for you.**
>
> First, you want to defend a readiness call, but the only person whose job is to assess readiness
> has not been asked to put his position in writing. If February goes badly, the fact that his
> discomfort was known and unrecorded is the finding that lands on you personally, not on him. I take
> it you can see the other edge of that: pinning him in writing may make February indefensible, which
> is precisely why it has not been done yet. Which is it, and are you willing to ask him this week?
>
> Second, June is described as awkward because support ends 31 March, and that date is carrying the
> entire argument for February. The only question ever put to the vendor was whether they would move
> the global end-of-life date for everyone. Nobody has asked what extended support on Kelbrane's own
> instance costs. Until someone does, 31 March is an assumption you are treating as a fact, and it is
> the assumption doing the most work in your recommendation.
>
> Third, your instinct is to manage the residual risk through hypercare. Hypercare absorbs the
> defects nobody predicted in a system that broadly works. You would be asking it to absorb six known
> sev-1 defects across 42 branches that all went live on the same Monday. Those are different things.
> Tell me what hypercare is resourced to handle, because right now it is being used as the answer to
> a risk that has not been sized.
>
> Fourth, the phased option was ruled out at $9m and seven months on 2025 facts, before the EDI
> integration design and before you had today's stock accuracy data. You are holding that door shut
> with a number you have told me you cannot stand behind, while the alternative you favour has no
> rollback assessment and no costed failure case. The $9m is at least a measured figure. The cost of
> a bad February is not a figure at all.
>
> Confirm or correct this read, and tell me which of the four you can actually get an answer to
> before Thursday. Then I will build the brief.

## The operator

> That framing is right. It is not "how do I defend February", it is "what am I actually asking the
> committee for on Thursday". I did not put it to myself that way until you did. Noting that.
>
> On the timing, check your maths. Today is 9 November. Cutover weekend is 6 February. That is about
> three months, not five. It changes how much of this is genuinely closeable before the date, and
> Thursday itself is three days away, not five months away.
>
> The four tensions stand as you have put them. I am not going to soften any of them.
>
> On what I can get answered before Thursday: I can put two questions in motion this week. I can ask
> my test manager to put his position in writing, ranked and against the criteria you listed in your
> first message. And I can get someone to ask the vendor, in writing, what extended support on our
> own instance would cost, separate from the global end-of-life question. Both of those are asks I
> can start today.
>
> What I cannot get by Thursday is a rollback assessment, a costed failure case, or a re-cut of the
> phased option against today's facts. Those take longer than three days. So the honest position for
> Thursday is that at least two of the four gaps will still be open when I am standing in front of
> the committee.

## Compass, the Decision Brief

> Your maths, not mine. Nine November to six February is 89 days, near enough to 13 weeks (derived),
> and the Christmas and New Year trading period sits inside it, so the usable remediation and
> regression window is materially shorter than 13 weeks (inferred). Thursday is 12 November. That
> changes the shape of the answer, and it is in the brief below.
>
> ---
>
> ## 1. The decision, and why now
>
> The decision is not whether the programme is ready. On the only written standard that exists, the
> steering committee's own zero open sev-1 and zero open sev-2 gate, it is not, and 19 open defects
> of 47 with six at sev-1 (given) is not a position you can attest to on Thursday. The live decision
> is what you ask the committee for on 12 November: a waiver of their own gate so February can be
> confirmed, a change of date, or a structured gate in January that decides it on evidence you do not
> have yet. It is live now because three of the four things the call turns on (rollback, failure
> cost, a current-facts phased option) cannot be answered in three days, and because 6 February is
> close enough that the option to do the work still exists, and will not exist in December. Part of
> the pull towards confirming February looks like commitment escalation, with the 31 March support
> date used as the forcing device. Set both aside and the forward-looking question is whether six
> sev-1 defects can be closed and regression-tested across 42 branches inside a window that includes
> Christmas.
>
> ## 2. The options, compared
>
> | Option | What it asks the committee for | Evidence behind it on Thursday | Exposure if it goes wrong |
> |---|---|---|---|
> | A. Confirm 6 February now, on the integrator's attestation (current plan) | Sign-off against a gate the programme fails today, without saying so | Integrator attestation, assessed by nobody independent of the integrator (given) | 42 branches live at once, rollback unassessed, failure cost unknown, and your test manager's unrecorded objection surfaces afterwards |
> | B. Hold 6 February as the working date, decide it at a formal gate in mid-January | A named gate date, written criteria (original or explicitly relaxed and owned by them), and three commissioned assessments | The defect trajectory and the gate criteria, both documented (given) | Loses about eight weeks of committed run-up if the gate fails, and a January no-go is a harder conversation than a November one |
> | C. Move to June now | A date change, plus funding for extended support from April (unpriced) | The test manager's discomfort, currently not in writing (unknown) | Runs unsupported from 31 March unless extended support is available, and the price has never been asked for |
> | D. Re-cut the phased option on today's facts, pilot branches in February | Funding for a re-assessment, and a hold on the big bang commitment | A 2025 assessment ($9m, seven months) that predates the EDI design and current stock accuracy data (given, but stale) | Adds cost and duration on numbers that may no longer be right, in either direction |
>
> ## 3. The recommendation
>
> Take option B. On Thursday, do not ask the committee to accept a readiness call; ask them to set a
> formal go/no-go gate for 15 January, to state in writing whether the zero-zero criteria stand or
> are being relaxed and by whom, and to commission the rollback rehearsal, the costed failure case
> and the phased re-cut now so the January gate has something to decide on. Keep 6 February as the
> working date throughout, because nothing yet justifies giving it up.
>
> This rests on two assumptions. That the six sev-1 defects are on a closure and regression path that
> can complete before mid-January (unknown, and the single thing most likely to break the
> recommendation). And that 31 March is a purchasable date rather than a wall (unknown, because the
> only question ever put to the vendor was about the global end-of-life date, not about extended
> support on Kelbrane's instance).
>
> ## 4. Next steps
>
> 1. Today, ask your test manager for his position in writing by close of business Wednesday 11
> November, ranked, against defect closure trajectory, environments, migration dry runs, interface
> testing and branch readiness. It goes in the Thursday pack as written, whatever it says.
> 2. Today, put the extended support question to the vendor in writing, priced, for Kelbrane's own
> instance through to at least 31 December 2027, with a requested response date. If the answer does
> not arrive before Thursday, the request itself is minuted and June stops being blocked by an
> untested assumption.
> 3. Rewrite the Thursday paper as a gate paper, not a readiness paper. Name 15 January, name the
> criteria, and ask the committee to record whether they stand by zero-zero or are relaxing it. Do
> not carry a relaxation on your own signature.
> 4. Commission by 20 November, reporting by 12 December: a rollback rehearsal on production-scale
> data, and a costed failure case covering lost trading days, service credits and remediation, with
> an unacceptable-outcome threshold the committee agrees.
> 5. Commission the phased re-cut against the EDI design and current stock accuracy data, reporting
> into the 15 January gate, so a no-go has somewhere to go other than June.
>
> ## 5. What would change this call
>
> If the test manager's written position names something structural, a migration or EDI interface
> problem rather than a defect count, that is not closeable in 13 weeks across Christmas, and
> February should be called off in November rather than in January.
>
> If extended support comes back unavailable or priced beyond reach, 31 March is a real wall,
> February becomes the only supported window, and the case for the committee accepting a documented
> relaxation of its own gate gets considerably stronger.
>
> If the rollback rehearsal shows there is no practical way back once orders flow through 42 branches
> on the Monday, this is a one-way door, and the January gate should be stricter than the original
> criteria, not more permissive.
>
> Carried forward unresolved: hypercare is being asked to absorb a risk nobody has sized. Until the
> failure case exists, "we will manage it through hypercare" is a sentence, not a mitigation, and it
> should not appear in Thursday's paper as one.
>
> **Confidence: medium** on what to ask for on Thursday, which rests on two confirmed inputs (the
> gate criteria and the defect position). Confidence in the February-versus-June call underneath is
> low, and that is precisely why Thursday should not settle it. **Validate first:** the test
> manager's written position, and the extended support price.
>
> Tell me what is off or what has changed, and I will sharpen it.
