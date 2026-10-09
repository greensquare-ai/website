# Frame Free demonstration transcript: capacity-hiring

- Fact sheet SHA-256 (frozen before the run): 4ce1dea63b6536501a5d2b03a0dcda8b01bed46fd1b9139d0d6546bb2fed3392
- Guide: text extracted from public/frame-free.pdf (SHA-256 21a0cf55f3fc93b4d2fe12a8cf74fdd2dfc141f9fcac097fff835410af84aa7e); extracted text SHA-256 c59427ad5f5f2a9fbf32531a0884caeca13650af133163f7834be17e3daf120f
- Input mode: extracted PDF text read from a file by the method agent, in Claude Code. Not a consumer-account PDF upload.
- Environment: Claude Code general-purpose subagents launched from a session running Claude Opus 5.5. Each turn is a fresh subagent that reads only its own source (guide or fact sheet) plus this transcript. Subagent model identifier not independently confirmed.
- Date: 2026-10-09

### Turn 1, User (operator agent; opening message taken verbatim from the frozen fact sheet)

Use Frame Free in this PDF. Ask me one question at a time.

We keep delivering drawing packages late and two clients have complained this quarter, so I'm deciding whether to hire another senior structural engineer. I'd like to advertise the role before the end of the month.

### Turn 2, Assistant (method agent)

Let's use Frame Free. Here is how I've read what you said, so we start from the same place:

- **Decision:** whether to hire another senior structural engineer.
- **Trigger:** drawing packages keep going out late, and two clients complained this quarter.
- **Timing you want:** advertise the role before the end of the month.

**Question 1: the decision and the trigger.**

"Delivering late" covers a lot, so I'd like to pin it down before we go further. Over this quarter, roughly how many drawing packages went out late, out of how many in total, and by how much were they late? And what changed this quarter to make this live now, rather than last quarter? For example, was it the two complaints themselves, a change in workload, or someone leaving?

Give me whatever figures you have, even rough ones. Just tell me which ones are estimates.

### Turn 3, User (operator agent)

I don't have the figures broken out for this quarter on its own. What I do have is the last 12 months: 41 of the 63 projects we delivered were late, about 65%, and on average they were 9 working days late. Those come from our records, not estimates.

As for what made it live now, it was the complaints. Two repeat clients wrote to us in the September quarter about late packages. I don't know of a change in workload or anyone leaving that set it off.

### Turn 4, Assistant (method agent)

Thanks. That gives us a firmer starting point. Here is what I'm noting, and how I'm tagging it:

- **From your records:** 41 of 63 projects delivered in the last 12 months were late, an average of 9 working days late.
- **Calculated from that:** 41 out of 63 is about 65%, which matches your figure.
- **The trigger:** two repeat clients wrote to you in the September quarter about late packages. You don't know of a workload change or a departure that set it off.

One thing stands out. Your figures cover 12 months, but the trigger is this quarter's complaints. So the late delivery may not be new. What may be new is that clients have started saying so. I'm not drawing a conclusion from that. I'm keeping it visible because it may matter later.

**Question 2: the decision underneath.**

Suppose hiring a senior structural engineer were off the table, with no budget and no candidate. What problem would still be there? Put another way, if the hire is the means, what outcome is it supposed to change? Fewer late packages, keeping those two clients, taking on more work, or something else?

Name the outcome as specifically as you can, even if you're not sure the hire is the right way to get there.

### Turn 5, User (operator agent)

The late packages would still be there. That's the problem. The outcome I want the hire to change is fewer packages going out late, because that's what the two repeat clients complained about. I haven't set a specific target for how many fewer, and taking on more work isn't what's driving this.

### Turn 6, Assistant (method agent)

That's clear. Here is how I'm recording it:

- The problem that would remain without the hire is late drawing packages.
- The outcome you want the hire to change is fewer packages going out late, because that is what the two repeat clients complained about.
- You haven't set a target for how many fewer. I'm noting that as a gap, not a fault. It means "fewer late packages" can't yet be measured against anything.
- Taking on more work is not what's driving this.

So the decision underneath reads as: how do we cut the number of drawing packages that go out late? Hiring a senior structural engineer is one way to do that. It only works if a shortage of senior engineering time is what makes packages late. I'm not judging whether it is. We'll come back to that when we get to assumptions.

**Question 3: the missing option.**

Right now the choice looks like "hire another senior structural engineer, or don't." Is there a third path you haven't been treating as a real option? It has to be credible enough to take seriously later. Keeping things as they are for a set period counts. So does a smaller version of the hire, or anything that goes after late packages some other way.

Name the one that feels most real to you, even if you'd currently rule it out. We won't weigh it yet.

### Turn 7, User (operator agent)

Honestly, I haven't been treating a third path as a real option. The two options I've had in front of me are hiring one senior structural engineer at about $145,000 a year plus super, or keeping the current team and accepting the late deliveries. I don't have a third one in mind that I'd call credible, so I can't name one for you.

### Turn 8, Assistant (method agent)

That's a fair answer, and it tells us something useful. Here is how I'm recording it:

- **Option A:** hire one senior structural engineer at about $145,000 a year plus super.
- **Option B:** keep the current team and accept the late deliveries.
- **Third path:** none named yet.

Option B is already the "do nothing" path, so it is in the set. What is missing is anything between "hire a full senior engineer" and "accept the lateness as it is."

I'll ask one follow-up and then we move on, whatever the answer.

**Follow-up on Question 3.** Two shapes count as a genuine third path, and I'm not suggesting either is right:

- **A smaller version of the hire.** Something less than one full-time senior engineer that still adds senior time.
- **A held position for a set period.** Keep the current team for a fixed time, but not on the open-ended "accept it" terms of Option B.

Does either of those, or any other route that goes after late packages without a full senior hire, seem credible enough to take seriously later? If nothing comes to mind, say so. I'll record "no third path named" and we'll go on to the assumption the decision rests on.

### Turn 9, User (operator agent)

No, nothing comes to mind. I haven't looked at a part-time or smaller version of the hire, and I haven't thought about holding the team as it is for a set period. I don't have another route that I'd call credible, so please record "no third path named" and we can move on.

### Turn 10, Assistant (method agent)

Recorded. Here is where the option set stands:

- **Option A:** hire one senior structural engineer at about $145,000 a year plus super.
- **Option B:** keep the current team and accept the late deliveries.
- **Third path:** none named. You haven't looked at a part-time or smaller version of the hire, or at holding the team as it is for a set period.

I'm leaving that gap in the frame as it is. I won't fill it in for you.

**Question 4: the load-bearing assumption.**

Most decisions rest on one belief. If that belief turned out to be wrong, the decision would change. Try finishing this sentence in your own words:

"Hiring another senior structural engineer makes sense provided that ..."

Then tell me what you have actually seen, measured or checked that supports it. For example, do your records show what held up the 41 late projects? I mean things like senior engineers' time, checking and sign-off, waiting on information from clients or other consultants, drafting, or something else. If you haven't looked at why they were late, say so. That is a useful answer too.

### Turn 11, User (operator agent)

"Hiring another senior structural engineer makes sense provided that the packages are late because we don't have enough senior engineering time to get them done."

As for what I've actually checked, not much. I haven't done a proper analysis of why the 41 projects were late. What I can tell you from what I know:

- Engineer billable utilisation averaged 78% last financial year.
- The project system shows packages sitting in "awaiting principal review" for an average of 6 working days. I review every package personally, and I also run business development.
- Drafters regularly report waiting for markups before they can continue.
- About 40% of the late projects had client-requested design changes after the fee was agreed. Most of those changes were absorbed without a variation.
- Two engineers have said privately that they have spare time some weeks.

I don't know how many hours a week a new hire would actually free up.

### Turn 12, Assistant (method agent)

Thanks. That sentence is the load-bearing assumption, in your words:

"Hiring another senior structural engineer makes sense provided that the packages are late because we don't have enough senior engineering time to get them done."

You said you haven't analysed why the 41 projects were late, so I'm recording that assumption as untested. Here is what you've told me that bears on it, kept as you stated it:

- Engineer billable utilisation averaged 78% last financial year.
- The project system shows packages in "awaiting principal review" for an average of 6 working days. You review every package yourself, and you also run business development.
- Drafters regularly report waiting for markups before they can continue.
- About 40% of the late projects had client-requested design changes after the fee was agreed, and most were absorbed without a variation.
- Two engineers have said privately that they have spare time some weeks.
- You don't know how many hours a week a new hire would free up.

I'll be direct about one thing without drawing a conclusion. Several of these point somewhere other than a shortage of senior engineers' time: the wait at principal review, the wait for markups, the scope changes and the reported spare time. Some may support your assumption too. None of them has been tied to specific late projects yet, so I'm not weighing them. I'm noting that the assumption is carrying the decision while the evidence you hold doesn't clearly point one way.

**Follow-up on Question 4.** One fact would show whether a hire could touch the 6-day wait at all. If you hired a senior structural engineer, would they be allowed to review and sign off packages, or would every package still come to you for principal review? Tell me whether that is a settled rule, such as a registration, insurance or client requirement, or simply how you have always worked.

### Turn 13, User (operator agent)

It's partly a settled rule and partly an assumption. The settled part is that every package has to be signed off by a principal before it's issued. Our professional indemnity insurer requires that for this practice, and I have checked it. The part I haven't checked is that only I can do that sign-off. I've assumed it. Nobody has asked the insurer whether another registered engineer could do it. So as things stand, I don't know whether a new senior engineer would be allowed to review and sign off packages, and on the way we work now, every package would still come to me.

### Turn 14, Assistant (method agent)

Thanks. That separates two things that were sitting together. Here is how I'm recording them:

- **Verified:** every package must be signed off by a principal before it is issued. Your professional indemnity insurer requires this, and you have checked it.
- **Assumed:** only you can do that sign-off. Nobody has asked the insurer whether another registered engineer could.
- **Consequence on current practice:** every package would still come to you, hire or no hire. So on the way you work now, a new senior engineer would not touch the 6-day wait at principal review. That follows from what you've said. I'm not judging whether the practice should change.

That closes Question 4. The load-bearing assumption stays as you worded it, and it remains untested.

**Question 5: untested constraints.**

Some things in this decision are being treated as fixed. I want to mark each one verified or assumed. Two have come up so far, besides the sign-off rule:

- **Timing:** you want to advertise before the end of the month.
- **Cost:** about $145,000 a year plus super for the hire.

For each one, who set it, and has anyone tested it? For the timing, what happens if the ad goes out next month instead? Is something forcing the end-of-month date, such as a client commitment, a budget cycle or a promise to the two clients? For the $145,000, is it a quote from a recruiter or salary data, or your own estimate? And is there an approved budget behind it, or is that still to be decided?

If there is another constraint you've been treating as fixed, such as a promise you've made to the two clients, add it. Tell me whether it's verified or assumed.

### Turn 15, User (operator agent)

On timing: I set it myself. I want to decide by 30 October 2026 so the role can be advertised. I don't know of anything outside that forcing the end-of-month date. I can't point to a client commitment, a budget cycle or a promise to the two clients behind it, and I don't know what would happen if the ad went out next month instead.

On cost: the $145,000 is my own figure, not a recruiter quote or salary data. I've been treating it as the minimum needed to attract anyone, but I haven't gathered any market data, so that's assumed. I don't know whether there's an approved budget behind it.

One other constraint I've been treating as fixed: I believe a senior engineer would take about three months to recruit. That's assumed too. It's based on our last hire, in 2023, and I haven't checked it since.

### Turn 16, Assistant (method agent)

Thanks. That's a clear answer on each one. Here is how I'm marking the constraints:

- **Principal sign-off before issue:** VERIFIED. Your professional indemnity insurer requires it, and you have checked.
- **Only you can do that sign-off:** ASSUMED. Nobody has asked the insurer.
- **Decide by 30 October 2026 so the role can be advertised:** ASSUMED. You set the date yourself. You don't know of anything outside forcing it, or what would happen if the ad went out next month.
- **About $145,000 a year plus super:** ASSUMED. It's your own figure, with no market data behind it. Whether there is an approved budget is not known.
- **About three months to recruit:** ASSUMED. It's based on your last hire in 2023 and hasn't been checked since.

So one of the five things being treated as fixed has been checked. The other four have not. I'm not saying any of them is wrong. They just haven't been tested yet.

**Question 6: the evidence map.**

This is the last question. I've drafted the map from what you've told me, using four tags only. Please correct anything I've put in the wrong place.

- **GIVEN** (you supplied it or checked it):
  - 41 of 63 projects delivered in the last 12 months were late, by an average of 9 working days. This is from your records.
  - Two repeat clients wrote to you in the September quarter about late packages.
  - Engineer billable utilisation averaged 78% last financial year.
  - The project system shows packages in "awaiting principal review" for an average of 6 working days.
  - You review every package yourself, and you also run business development.
  - Your insurer requires principal sign-off before issue.
  - Drafters regularly report waiting for markups. This is what they report, not a measured figure.
  - About 40% of the late projects had client-requested design changes after the fee was agreed, and most were absorbed without a variation.
  - Two engineers have said privately that they have spare time some weeks. This is what they told you, not a measured figure.
- **DERIVED** (calculated from the given figures):
  - 41 of 63 is about 65% late.
  - About 40% of 41 late projects is roughly 16 projects with late scope changes.
- **INFERRED** (reasoned from what is known):
  - The lateness may not be new. What may be new is that clients have started saying so. This rests on 12-month figures and a quarter-only trigger, with no quarter figures to compare.
  - On the way you work now, a new senior engineer would not shorten the 6-day wait at principal review, because every package would still come to you.
- **UNKNOWN** (material but not established):
  - Why each of the 41 projects was late.
  - How many hours a week a new hire would free up.
  - Whether another registered engineer could sign off packages under your insurance.
  - The market salary for the role, and whether a budget is approved.
  - How long recruiting would take now.
  - What would happen if the decision or the ad moved past 30 October.
  - How many fewer late packages would count as success.

One focused follow-up on this. Where does the "about 40%" figure come from? Did you count it from project records, or is it your estimate? If it's an estimate, I'll move it out of GIVEN and keep the "about" in the claim. And tell me if any other item above is tagged wrongly, or if something material is missing.

### Turn 17, User (operator agent)

On the "about 40%": I can't tell you it was counted from project records. It's a figure I've been carrying as "about 40%", and I don't know that anyone counted it project by project, so treat it as an estimate and keep the "about".

The rest looks right to me. Two things I'd add because they're missing:

- Under GIVEN: the team is 6 engineers, 5 drafters, 1 principal reviewer and 6 support and admin staff, 18 people in all.
- Under UNKNOWN: whether clients would pay more for faster turnaround.

### Turn 18, Assistant (method agent)

Thanks. I've moved the "about 40%" out of GIVEN, because nobody counted it project by project. I've also dropped the "roughly 16 projects" line from DERIVED, since a calculation can't be firmer than the figure it comes from. I've added the team size and the question about clients paying more. That completes the six questions, so here is the framing handoff.

**1. Presented decision and trigger**

Whether to hire another senior structural engineer, at about $145,000 a year plus super, and advertise the role before the end of the month. The trigger is that two repeat clients wrote to you in the September quarter about late drawing packages.

**2. Decision underneath**

How do we cut the number of drawing packages that go out late? The hire is one way to do that. No target has been set for how many fewer late packages would count as success. Taking on more work is not driving this.

**3. Missing third option**

No third path was named. The option set is still: A, hire one senior structural engineer; or B, keep the current team and accept the late deliveries. Two shapes came up in the conversation: a smaller version of the hire, and holding the current team for a set period. You haven't looked at either, and neither was adopted. That gap stays open.

**4. Load-bearing assumption**

In your words: "Hiring another senior structural engineer makes sense provided that the packages are late because we don't have enough senior engineering time to get them done." This has not been tested. Why the 41 late projects were late has not been analysed.

**5. Untested constraints**

- Every package must be signed off by a principal before it is issued: **VERIFIED.** Your professional indemnity insurer requires it, and you have checked.
- Only you can do that sign-off: **ASSUMED.** Nobody has asked the insurer whether another registered engineer could.
- Decide by 30 October 2026 so the role can be advertised: **ASSUMED.** You set the date yourself. You don't know of anything outside forcing it, or what would happen if the ad went out next month.
- About $145,000 a year plus super, treated as the minimum needed to attract anyone: **ASSUMED.** It's your own figure, with no market data behind it.
- About three months to recruit: **ASSUMED.** It's based on your last hire in 2023 and hasn't been checked since.

**6. Evidence map**

- **GIVEN**
  - 41 of 63 projects delivered in the last 12 months were late, by an average of 9 working days. This is from your records.
  - Two repeat clients wrote to you in the September quarter about late packages.
  - The team is 6 engineers, 5 drafters, 1 principal reviewer and 6 support and admin staff, 18 people in all.
  - Engineer billable utilisation averaged 78% last financial year.
  - The project system shows packages in "awaiting principal review" for an average of 6 working days.
  - You review every package yourself, and you also run business development.
  - Your insurer requires principal sign-off before issue.
  - Drafters regularly report waiting for markups. This is what they report, not a measured figure.
  - Two engineers have said privately that they have spare time some weeks. This is what they told you, not a measured figure.
- **DERIVED**
  - 41 of 63 is about 65% late.
- **INFERRED**
  - The lateness may not be new. What may be new is that clients have started saying so. This rests on 12-month figures and a quarter-only trigger, with no quarter figures to compare.
  - On the way you work now, a new senior engineer would not shorten the 6-day wait at principal review, because every package would still come to you.
- **UNKNOWN**
  - Why each of the 41 projects was late.
  - The share of late projects with client-requested design changes after the fee was agreed, most absorbed without a variation. You carry it as about 40%, but it has not been counted.
  - How many hours a week a new hire would free up.
  - Whether another registered engineer could sign off packages under your insurance.
  - The market salary for the role, and whether a budget is approved.
  - How long recruiting would take now.
  - What would happen if the decision or the ad moved past 30 October.
  - How many fewer late packages would count as success.
  - Whether clients would pay more for faster turnaround.

**7. Reframed decision and the single evidence gap to verify next**

Reframed decision: how do we cut the number of drawing packages that go out late, when the cause of the lateness has not been established and every package currently passes through one principal review? Whether to hire a senior structural engineer is one answer to that question, not the question itself.

Evidence gap to verify next: why each of the 41 late projects was late, and in particular whether a shortage of senior engineering time was what held them up. This is the test of the load-bearing assumption. Most of what you've told me so far points to other possible causes, and none of it has yet been tied to specific late projects.

That's where Frame Free stops. I haven't ranked the options or recommended a course of action. Framing prepares the decision; it doesn't make it.
