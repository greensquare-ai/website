# Frame Free demonstration transcript: project-continuation

- Fact sheet SHA-256 (frozen before the run): 21321c9d17299bb2c996963da66f808bec72f0dd957a958624cb79942a120bdc
- Guide: text extracted from public/frame-free.pdf (SHA-256 21a0cf55f3fc93b4d2fe12a8cf74fdd2dfc141f9fcac097fff835410af84aa7e); extracted text SHA-256 c59427ad5f5f2a9fbf32531a0884caeca13650af133163f7834be17e3daf120f
- Input mode: extracted PDF text read from a file by the method agent, in Claude Code. Not a consumer-account PDF upload.
- Environment: Claude Code general-purpose subagents launched from a session running Claude Opus 5.5. Each turn is a fresh subagent that reads only its own source (guide or fact sheet) plus this transcript. Subagent model identifier not independently confirmed.
- Date: 2026-10-09

### Turn 1, User (operator agent; opening message taken verbatim from the frozen fact sheet)

Use Frame Free in this PDF. Ask me one question at a time.

Our client portal programme is over budget and behind, and I have to tell the board on 22 October whether we finish it or pause it. We've put $310,000 into it so far.

### Turn 2, Assistant (method agent)

Thanks. Here is what I have so far:

- **Decision:** whether to finish or pause the client portal programme.
- **Trigger:** you report to the board on 22 October, and the programme is over budget and behind schedule.
- **Spent to date:** $310,000.

We'll go through six questions, one at a time. This is framing only. I won't score the options or recommend one.

**Question 1: The decision and trigger**

Can you state the decision in one sentence, in specific terms? Two things would make it concrete:

1. What do "finish" and "pause" mean in practice? For example, how much more money and time would finishing take, and would a pause stop all spending or keep a reduced team going?
2. What made this live now rather than last month? Is it the board date itself, or did something happen recently, such as a revised estimate, a missed milestone or a budget threshold being crossed?

### Turn 3, User (operator agent)

In one sentence: I need to recommend to the board on 22 October whether we put an estimated $190,000 more into the client portal to finish it by mid-2027, or pause it.

1. Finishing means funding that extra $190,000, which takes the total to $500,000 against the $360,000 the board approved, with completion by mid-2027. Pausing means stopping development and holding the work done so far. I haven't worked out whether a pause would keep a reduced team going; I don't know that yet.
2. It was the contractor's revised estimate in September 2026. That pushed the total past the approved budget, so I have to go back to the board.

### Turn 4, Assistant (method agent)

That is a clear statement. Here is Question 1 as I will carry it forward:

- **Presented decision:** recommend to the board on 22 October whether to put an estimated $190,000 more into the client portal to finish it by mid-2027, or pause it.
- **Trigger:** the contractor's revised estimate in September 2026, which took the projected total to $500,000 against the $360,000 the board approved.
- **Still open:** what a pause would actually involve, including whether a reduced team stays on. You said you don't know that yet, so I'll record it as open rather than fill it in.

**Question 2: The decision underneath**

Suppose the finish-or-pause choice disappeared tomorrow. What larger question would still be sitting there?

To make that concrete: what was the client portal meant to change for the business, and for whom? I mean the outcome it was approved to deliver, not the features. Is that outcome still the one that matters to you and the board today?

### Turn 5, User (operator agent)

The approved business case was to cut inbound client calls. The portal was meant to let our clients get their certificates of currency and lodge claims online, so they wouldn't need to ring us for those things. When the board approved it, inbound calls averaged 2,400 a month, and certificate requests were about 55% of them.

As far as I'm concerned, cutting those calls is still the outcome that matters. I don't know whether the board would see it differently today; I haven't asked them.

### Turn 6, Assistant (method agent)

Thanks. Here is Question 2 as I will carry it forward:

- **Outcome the portal was approved to deliver:** fewer inbound client calls, by letting clients get certificates of currency and lodge claims online.
- **Baseline at approval:** inbound calls averaged 2,400 a month, and certificate requests were about 55% of them.
- **Decision underneath:** what is the best way to cut inbound client calls, and in particular certificate requests? The portal is one means to that outcome. Finishing or pausing it is a choice about that means, not about the outcome.
- **Still open:** whether the board still sees cutting calls as the outcome that matters. You said you haven't asked them, so I'll record that as untested rather than assume it.

**Question 3: The missing option**

So far the choice has been framed as two paths: put in $190,000 more to finish, or pause. Which genuine third path have you not been treating as real?

It has to be credible enough to take seriously later, and it can include keeping the current position. The guide's own examples are "do nothing for six months" and "A, but half the size". Since the outcome is fewer calls rather than a finished portal, a third path might also be one that goes at the calls by a route other than the full build. I won't evaluate whatever you name. I only want it on the table.

### Turn 7, User (operator agent)

Honestly, I haven't been treating any third path as real. I've only looked at it as two options: fund the extra $190,000 and finish, or pause. I don't have a third option worked out, so I can't name one for you with any confidence.

### Turn 8, Assistant (method agent)

That's a useful answer in itself. It confirms the choice reached you as two options and nobody has built a third yet. I won't make one up for you. It has to come from you to be worth carrying forward.

I'll ask one follow-up on this question, then move on whatever the answer is. Take the shapes the guide uses and test them against your own programme:

1. **A smaller version of finishing.** The portal has two jobs: certificates of currency and claims lodgement. Certificates were about 55% of inbound calls at approval. Is there a part of the build you could fund and finish on its own, for less than $190,000?
2. **Holding the current position for a set period.** Is there a version of "pause" with an end date and a condition for restarting, rather than an open-ended stop?
3. **Reaching the outcome another way.** Is there any route to fewer certificate calls that doesn't depend on the portal being finished?

If one of these is real for you, name it in your own words. If none of them is, say so and I'll record that no third path was identified. That is a legitimate result too. I won't judge whichever you pick, here or later in this framing.

### Turn 9, User (operator agent)

Taking them in turn:

1. On a smaller version: the certificate module is about 80% built, and the claims lodgement module hasn't started. I don't know how the $190,000 splits between the two, so I can't tell you what finishing certificates alone would cost.
2. On a time-limited hold: I haven't considered a pause with an end date or a restart condition. I don't know what that would look like.
3. On another route: in March 2026 our main underwriter launched its own online service where clients can download certificates of currency directly. I hadn't thought of that as an option for us, but it is a route to certificates that doesn't depend on our portal.

If I had to name a third path in my own words, it would be finishing only the certificate module and not building claims. I can't say yet whether that's credible, because I don't know the cost.

### Turn 10, Assistant (method agent)

Thanks. That was the one follow-up for this question, so here is Question 3 as I will carry it forward:

- **Missing third option, in your words:** finish only the certificate module and do not build claims lodgement.
- **What you know about it:** the certificate module is about 80% built, and the claims module has not started.
- **What you don't know:** how the $190,000 splits between the two modules, so the cost of finishing certificates alone is open. You said you can't yet say whether this path is credible, and I'll record it that way.
- **Also on the table:** since March 2026, your main underwriter has run its own online service where clients can download certificates of currency directly. You hadn't treated that as an option. I'll record it as a fact about the situation, not as a path you have chosen.
- **Not considered yet:** a pause with an end date or a restart condition. I'll record it as not explored.

I'm not weighing any of these against each other.

**Question 4: The load-bearing assumption**

Which single belief would change the decision if it proved wrong? I'm asking for the one that carries the decision, not a list of risks.

One way to find it is to finish this sentence in your own words: "Putting more money into the portal makes sense provided that ..."

Then tell me what has actually been seen, measured or checked in support of that belief, and when. For example, the business case rests on the 2,400 calls a month and the 55% share for certificates at approval. Has anyone measured either figure since then? If not, say so. A belief nobody has checked is still worth naming.

### Turn 11, User (operator agent)

In my own words: "Putting more money into the portal makes sense provided that the work we've already done would be wasted if we paused." That's what I've been working from. I've told colleagues we've spent too much to stop now.

What's been checked behind it: nothing. Nobody has assessed what of the work done so far could be reused if we paused.

On the business case figures: inbound calls have averaged about 1,500 a month since April 2026, against 2,400 at approval. I don't know whether anyone has re-measured the share that are certificate requests since approval; I haven't seen a figure for it. I also don't know how many clients would actually use the portal.

### Turn 12, Assistant (method agent)

Thanks. Here is what I have for Question 4 so far:

- **Belief you have been working from, in your words:** "Putting more money into the portal makes sense provided that the work we've already done would be wasted if we paused."
- **What has been checked behind it:** nothing. Nobody has assessed what of the work done so far could be reused if you paused.
- **Business case figures:** inbound calls have averaged about 1,500 a month since April 2026, against 2,400 at approval. Nobody you know of has re-measured the certificate share since approval. How many clients would use the portal is not known.

I want to push on this once before moving on, because the belief as stated is about money already spent. The $310,000 is gone whichever way the board decides. What the board is actually being asked to approve is the next $190,000. So the belief that carries the decision may be a different one.

**Follow-up:** try finishing the sentence about the new money rather than the old: "Putting a further $190,000 into the portal makes sense provided that ..."

As you answer, two facts you have given me may be relevant. I'm putting them side by side, not drawing a conclusion from them:

1. Calls fell from about 2,400 to about 1,500 a month, and the lower level dates from April 2026.
2. Your main underwriter launched its own certificate download service in March 2026.

Nothing you've told me establishes whether the second has anything to do with the first. If you know why calls fell, say so. If you don't, say that, and I'll record the cause of the drop as unknown.

If you would still finish the sentence the way you did first time, that's fine too. I'll record your answer as it stands and we'll move to Question 5.

### Turn 13, User (operator agent)

I hadn't framed it around the new money before. If I try: "Putting a further $190,000 into the portal makes sense provided that it cuts inbound client calls the way the business case said it would." But I don't know how many clients would actually use the portal, and I don't know whether the $190,000 estimate will hold.

On why calls fell: I don't know. Nobody has looked into the cause, as far as I know, so please record it as unknown.

### Turn 14, Assistant (method agent)

Thanks. That was the one follow-up for this question, so here is Question 4 as I will carry it forward:

- **Load-bearing assumption, in your words:** "Putting a further $190,000 into the portal makes sense provided that it cuts inbound client calls the way the business case said it would."
- **What has been checked behind it:** you don't know how many clients would actually use the portal, and you don't know whether the $190,000 estimate will hold. Nobody you know of has re-measured the certificate share of calls since approval.
- **Related facts, side by side:** inbound calls have averaged about 1,500 a month since April 2026, against 2,400 at approval. Your main underwriter launched its own certificate download service in March 2026. The cause of the drop in calls is unknown, and I'm recording it that way.
- **Earlier belief, also recorded:** you had been working from "the work we've already done would be wasted if we paused". Nobody has assessed what of that work could be reused. I'm keeping it on the record as a belief that hasn't been checked, not discarding it.

**Question 5: Untested constraints**

Several things have been treated as fixed so far. I'll list them as you've given them. For each one, tell me whether it is verified or assumed: who set it, when it was last tested, and how you would know if it moved.

1. **The board date of 22 October.** Is that the only point at which the board can decide this, or could the decision go to a later meeting or be made out of session?
2. **The $190,000 estimate and the mid-2027 completion date.** Both come from the contractor's revised estimate in September 2026. Has anyone checked either one independently, and is the contractor committed to them on any terms?
3. **The $360,000 the board approved.** Is that a hard ceiling, or is there a delegation or tolerance that applies to overruns?
4. **What "pause" means.** You said it means stopping development and holding the work done so far. Is there anything in the contractor's agreement about suspending work, such as notice, holding costs or loss of the team, or has nobody looked?

If you don't know the answer to one of these, say so and I'll mark it assumed. That is a useful result here.

### Turn 15, User (operator agent)

Taking them in turn:

1. The board date: the recommendation is due to the board on 22 October 2026. I don't know whether it could go to a later meeting or be decided out of session; I haven't asked.
2. The $190,000 and mid-2027: both come from the contractor's revised estimate in September 2026. I don't know of anyone checking either one independently, and I don't know whether the contractor is committed to them on any terms. I don't know whether the $190,000 will hold. Mark both as assumed.
3. The $360,000: that's what the board approved in March 2025. I don't know of any delegation or tolerance for overruns. On the ceiling, I've been working on the basis that the board won't approve more than $500,000 in total, but that's my own reading of the chair. Nobody has tested it, so mark it assumed.
4. What pause means: I've been assuming a pause means losing the contractor's team. That hasn't been checked; the contractor hasn't been asked about a pause. I haven't looked at what the agreement says about suspending work, notice or holding costs, so I don't know.

### Turn 16, Assistant (method agent)

Thanks. Here is Question 5 as I will carry it forward. Where you said you don't know, or nobody has asked, I've marked it assumed.

1. **Board date of 22 October 2026.** The date the recommendation is due is as you stated it. Whether 22 October is the only point at which the board can decide, or whether it could go to a later meeting or out of session, has not been asked. **ASSUMED** fixed.
2. **The $190,000 and mid-2027 completion.** Both come from the contractor's revised estimate in September 2026. Nobody you know of has checked either independently, and you don't know whether the contractor is committed to them on any terms. **ASSUMED**, both of them.
3. **The $360,000 approved budget.** The board approved $360,000 in March 2025. You know of no delegation or tolerance for overruns, and nobody has checked for one. The approval itself is your record of the board decision. Treating it as a hard ceiling with no tolerance is **ASSUMED**.
4. **A $500,000 total limit.** This is your own reading of the chair, and nobody has tested it. **ASSUMED**.
5. **Pause means losing the contractor's team.** The contractor hasn't been asked about a pause, and nobody has read what the agreement says about suspending work, notice or holding costs. **ASSUMED**.

None of the constraints you've treated as fixed has been verified. I'm recording that as it stands, not as a judgement on the decision.

**Question 6: The evidence map**

This is the last question. Below is a draft map of the material claims from what you've told me, each tagged with one of four labels: GIVEN (you supplied it or it's on record), DERIVED (calculated from given figures), INFERRED (reasoned from what is known) or UNKNOWN (material but not established). Approximate figures stay approximate inside the claim.

**GIVEN**
- $310,000 spent to date.
- The board approved $360,000 in March 2025.
- The contractor's revised estimate in September 2026 is a further $190,000, with completion by mid-2027.
- The business case was to cut inbound client calls by letting clients get certificates of currency and lodge claims online.
- At approval, inbound calls averaged 2,400 a month, and certificate requests were about 55% of them.
- Inbound calls have averaged about 1,500 a month since April 2026.
- The certificate module is about 80% built. The claims lodgement module has not started.
- Your main underwriter launched its own online certificate download service in March 2026.
- The recommendation is due to the board on 22 October 2026.

**DERIVED**
- Finishing would take the total to $500,000, which is $140,000 (about 39%) over the $360,000 approved.
- $50,000 of the approved $360,000 has not yet been spent.
- At approval, certificate requests were roughly 1,320 calls a month (55% of 2,400).
- Inbound calls are down about 900 a month, or roughly 37%, against the approval baseline.

**INFERRED**
- If the certificate share were still about 55%, certificate calls would now run at roughly 825 a month. That share has not been re-measured, so this holds only on that condition.

**UNKNOWN**
- Why inbound calls fell, including whether the underwriter's service had anything to do with it.
- The current share of calls that are certificate requests.
- How many clients would use the portal.
- Whether the $190,000 and mid-2027 will hold.
- How the $190,000 splits between the certificate and claims modules.
- What of the work done so far could be reused if you paused.
- What the contractor's agreement says about suspending work, and what a pause would cost or involve.
- Whether the board could decide later than 22 October, whether any overrun tolerance exists, and whether the board still sees cutting calls as the outcome that matters.

Please check it. Is any claim tagged wrongly, for example something I've marked GIVEN that you have only heard second-hand, or something marked UNKNOWN that you can in fact confirm? Is there any material claim missing? Once you've corrected it, I'll put the full framing together and stop there.

### Turn 17, User (operator agent)

I've checked it. As far as I know the tags are right. I can't confirm anything you've marked UNKNOWN; those really are open for me.

Two facts are missing that I'd add under GIVEN:
- Work started in April 2025.
- The original go-live date was June 2026.

Otherwise it matches what I've told you.

### Turn 18, Assistant (method agent)

Thanks. I've added both facts under GIVEN and worked out what follows from them under DERIVED. Here is the full framing.

**1. Presented decision and trigger**

- **Decision:** recommend to the board on 22 October 2026 whether to put an estimated $190,000 more into the client portal to finish it by mid-2027, or pause it.
- **Trigger:** the contractor's revised estimate in September 2026, which took the projected total to $500,000 against the $360,000 the board approved.
- **Still open:** what a pause would actually involve, including whether a reduced team stays on.

**2. Decision underneath**

What is the best way to cut inbound client calls, and certificate requests in particular? The portal is one means to that outcome. Finishing or pausing it is a choice about that means, not about the outcome. Whether the board still sees cutting calls as the outcome that matters has not been asked.

**3. Missing third option**

In your words: finish only the certificate module and do not build claims lodgement. The certificate module is about 80% built and the claims module has not started. How the $190,000 splits between the two is unknown, so you can't yet say whether this path is credible.

Two related items, recorded but not chosen:
- Since March 2026 your main underwriter has run its own online service where clients can download certificates of currency directly. You hadn't treated it as an option. It is recorded as a fact about the situation.
- A pause with an end date or a restart condition has not been explored.

**4. Load-bearing assumption**

In your words: "Putting a further $190,000 into the portal makes sense provided that it cuts inbound client calls the way the business case said it would."

Nothing has been checked behind it. Nobody knows how many clients would use the portal, whether the $190,000 will hold, or what share of calls are certificate requests today.

Your earlier belief is also on the record: "the work we've already done would be wasted if we paused." Nobody has assessed what of that work could be reused. The $310,000 is spent whichever way the board decides. The board is being asked to approve the next $190,000.

**5. Untested constraints**

| Constraint | Status | Basis |
|---|---|---|
| 22 October 2026 is the only point at which the board can decide | ASSUMED | The due date is as you stated it. Whether a later meeting or an out-of-session decision is possible has not been asked. |
| The further $190,000 | ASSUMED | Contractor's September 2026 estimate. Not checked independently. Contractor's commitment to it on any terms is unknown. |
| Completion by mid-2027 | ASSUMED | Same source and same position as the $190,000. |
| $360,000 is a hard ceiling with no tolerance for overruns | ASSUMED | The March 2025 approval is your record of the board decision. Whether any delegation or tolerance applies has not been checked. |
| The board won't approve more than $500,000 in total | ASSUMED | Your own reading of the chair. Not tested. |
| A pause means losing the contractor's team | ASSUMED | The contractor hasn't been asked. The agreement hasn't been read on suspension, notice or holding costs. |

None of the constraints treated as fixed has been verified.

**6. Evidence map**

GIVEN
- $310,000 spent to date.
- The board approved $360,000 in March 2025.
- Work started in April 2025.
- The original go-live date was June 2026.
- The contractor's revised estimate in September 2026 is a further $190,000, with completion by mid-2027.
- The business case was to cut inbound client calls by letting clients get certificates of currency and lodge claims online.
- At approval, inbound calls averaged 2,400 a month, and certificate requests were about 55% of them.
- Inbound calls have averaged about 1,500 a month since April 2026.
- The certificate module is about 80% built. The claims lodgement module has not started.
- Your main underwriter launched its own online certificate download service in March 2026.
- The recommendation is due to the board on 22 October 2026.

DERIVED
- Finishing would take the total to $500,000, which is $140,000 (about 39%) over the $360,000 approved.
- $50,000 of the approved $360,000 has not yet been spent.
- The original plan ran about 14 months, from April 2025 to June 2026. Completion by mid-2027 is roughly a year after the original go-live date, which has already passed.
- At approval, certificate requests were roughly 1,320 calls a month (55% of 2,400).
- Inbound calls are down about 900 a month, or roughly 37%, against the approval baseline.

INFERRED
- If the certificate share were still about 55%, certificate calls would now run at roughly 825 a month. That share has not been re-measured, so this holds only on that condition.

UNKNOWN
- Why inbound calls fell, including whether the underwriter's service had anything to do with it.
- The current share of calls that are certificate requests.
- How many clients would use the portal.
- Whether the $190,000 and mid-2027 will hold.
- How the $190,000 splits between the certificate and claims modules.
- What of the work done so far could be reused if you paused.
- What the contractor's agreement says about suspending work, and what a pause would cost or involve.
- Whether the board could decide later than 22 October, whether any overrun tolerance exists, and whether the board still sees cutting calls as the outcome that matters.

**7. Reframed decision and the single evidence gap to verify next**

**Reframed decision:** how should the business reduce the certificate and claims calls that remain, now that inbound calls have already fallen by about a third for reasons nobody has established? Finishing the portal, finishing the certificate module alone, and pausing are all means to that outcome. The board can only weigh them once it knows what call volume each one is meant to remove.

**Evidence gap to verify next:** the current share of inbound calls that are certificate requests, and whether it has changed since March 2026. Your load-bearing assumption is that the portal cuts calls the way the business case said. That figure tells you how many certificate calls there are left for the portal to cut. It also shows whether certificate calls account for part of the unexplained drop since April 2026. The answer changes what the certificate-only path and the full build are each being asked to achieve.

That is the framing. I have not ranked the options, scored them or recommended a course of action. Framing prepares the decision; it does not make it.
