# Frame Free demonstration transcript: vendor-renewal

- Fact sheet SHA-256 (frozen before the run): 0a0156dbe93a3cdc9df3b6976ad01f9dfdb81dd988b7ef5e5a1f97996655f3e6
- Guide: text extracted from public/frame-free.pdf (SHA-256 21a0cf55f3fc93b4d2fe12a8cf74fdd2dfc141f9fcac097fff835410af84aa7e); extracted text SHA-256 c59427ad5f5f2a9fbf32531a0884caeca13650af133163f7834be17e3daf120f
- Input mode: extracted PDF text read from a file by the method agent, in Claude Code. Not a consumer-account PDF upload.
- Environment: Claude Code general-purpose subagents launched from a session running Claude Opus 5.5. Each turn is a fresh subagent that reads only its own source (guide or fact sheet) plus this transcript. Subagent model identifier not independently confirmed.
- Date: 2026-10-09

### Turn 1, User (operator agent; opening message taken verbatim from the frozen fact sheet)

Use Frame Free in this PDF. Ask me one question at a time.

Our warehouse management system contract runs out on 30 November and the vendor says the version we're on is losing support, so I need to pick between two replacement platforms by the end of October. Picking errors are costing us money and I want this sorted before the Christmas peak.

### Turn 2, Assistant (method agent)

Thanks. Let me confirm what you've given me before we go further.

**Decision as stated:** choose one of two replacement warehouse management platforms by the end of October.

**Trigger as stated:** your current WMS contract ends on 30 November, and the vendor says your version is losing support. You also want this settled before the Christmas peak.

One thing to sharpen before we move on. "Picking errors are costing us money" is the problem you want fixed, but as it stands it's a category, not a measurable scenario. So, first question:

**Roughly how often do picking errors happen now, what does each one cost you, and how do you know? Is that a figure someone has measured, or a sense of the pain?**

### Turn 3, User (operator agent)

We ship about 10,000 order lines a week. Over the last quarter the picking error rate was 2.1%, so roughly 210 wrong lines a week. On cost, the hard number I have is credit notes: we issued $14,200 in credit notes for picking errors last quarter. I don't have a cost-per-error figure beyond that, and I don't know what else each error costs us on top of the credit notes. So the rate and the credit note total are figures from the quarter, not a gut feel, but the full cost per error isn't something I've measured.

### Turn 4, Assistant (method agent)

That's useful, and it's more measured than most people have at this stage. Here is what I'm holding:

- **GIVEN:** about 10,000 order lines a week; a 2.1% picking error rate last quarter; $14,200 in credit notes for picking errors last quarter.
- **DERIVED:** about 210 wrong lines a week. If the quarter was 13 weeks, that is roughly 2,730 wrong lines and about $5 in credit notes per wrong line. That figure is a floor, because it counts only credit notes.
- **UNKNOWN:** what else each error costs you beyond the credit note.

So the decision and trigger are clear: two platforms, chosen by the end of October, because the contract ends on 30 November and your version is losing support.

Second question:

**Suppose the platform choice disappeared tomorrow, for example because your current vendor agreed to keep supporting your version for another two years. What larger question would still be sitting there?** Put another way, would those 210 wrong lines a week go away with the decision, or would they still need solving?

### Turn 5, User (operator agent)

No, the 210 wrong lines a week wouldn't go away just because the platform decision went away. If the current vendor kept supporting us, I'd still be sitting on a 2.1% error rate and the credit notes that come with it, and I'd still want it fixed before the December peak. So the bigger question is how we get picking errors down. I've been treating a new platform as the way to do that, because both vendors showed in their demonstrations that their systems would cut errors. But that comes from the demos only. I haven't checked it any further than that.

### Turn 6, Assistant (method agent)

That changes the shape of it. The platform choice is the surface. The decision underneath is **how you get picking errors down from 2.1% before the December peak**, and a new platform is one means to that, not the outcome itself.

I'm noting one thing for later rather than testing it now. The belief that a new platform would cut your errors comes from the two vendor demonstrations, and you've said you haven't checked it further. I'll hold that as:

- **GIVEN:** both vendors showed in their demonstrations that their systems would cut errors.
- **UNKNOWN:** whether either system would cut errors in your warehouse, and by how much.

We'll come back to that. First, the option set. Right now it's framed as platform A or platform B.

Third question:

**What genuine third path have you not been treating as real?** That could be keeping the current position for a while, for example asking the current vendor about an extension or extended support past 30 November. It could be working on the picking errors directly before or without changing platform. Or it could be a smaller version of one of the two. I'm not asking you to judge it yet, only to name one you'd be willing to take seriously.

### Turn 7, User (operator agent)

The one I'd take seriously is staying with our current vendor on their newer version. Their account manager sent us a quote in September to upgrade to it. I haven't opened it, so I don't know what it costs or what it includes. I'd been treating it as a choice between A and B and hadn't counted that quote as a real option, but I'd be willing to.

### Turn 8, Assistant (method agent)

Good. That's a genuine third path, and it was already sitting in your inbox. The option set is now three, not two:

- Platform A
- Platform B
- Staying with your current vendor and moving to their newer version

I'm not weighing it against the other two. I'm only recording what we know about it:

- **GIVEN:** your current vendor's account manager sent a quote in September to upgrade to their newer version.
- **UNKNOWN:** what the quote costs, what it includes, and whether the newer version would do anything about picking errors.

Now the belief that carries the decision. So far everything has pointed at the platform as the way to bring errors down. Fourth question:

**Finish this sentence in your own words: "Changing or upgrading the platform makes sense provided that ..."** Then tell me what you have actually seen, measured or checked that supports it, apart from the vendor demonstrations.

### Turn 9, User (operator agent)

"Changing or upgrading the platform makes sense provided that the new system actually cuts our picking errors, and it's in and working before the December peak."

As for what I've actually seen, measured or checked that supports the first part: nothing beyond the vendor demonstrations. I haven't trialled either platform, spoken to their customers or tested them against our own orders. The peak timing is the part I have checked, from last year's sales data, but the claim that a new platform would bring our errors down rests on the demos alone.

### Turn 10, Assistant (method agent)

That sentence has two conditions in it, and you've told me they rest on different evidence. So I'll split them.

The load-bearing one is the first: **"the new system actually cuts our picking errors."** If that's wrong, the timing doesn't matter, because a platform that's in and working before the peak would still leave you at 2.1%. Here is how I'm holding it:

- **GIVEN:** both vendors showed in their demonstrations that their systems would cut errors.
- **GIVEN:** you haven't trialled either platform, spoken to their customers or tested them against your own orders.
- **UNKNOWN:** whether any of the three options would cut errors in your warehouse, and by how much. That includes the current vendor's newer version, which nobody has looked at yet.

The second condition, being in and working before the December peak, is one I'll treat as a constraint. You've checked the peak timing from last year's sales data, so that part has evidence behind it. How long each option would take to get in and working hasn't come up yet.

Fifth question. You've been working to three dates or positions that act as fixed:

1. The contract ends on 30 November.
2. Your current version is losing support.
3. The choice has to be made by the end of October.

**For each one, is it verified or assumed? Specifically: have you read the 30 November date in the contract itself, do you know the actual date support stops and what "losing support" means in practice, and who set the end-of-October deadline?** If there's a budget limit you've been working within, tell me where that came from too.

### Turn 11, User (operator agent)

Taking them in order.

1. The 30 November date: assumed. Nobody has read the renewal or termination clauses in the contract, me included. I've been working on the basis that we can't use the current system after 30 November, but I haven't checked that against the contract.

2. Losing support: assumed. It comes from a call and a follow-up email from the current vendor's account manager, saying our installed version "moves to limited support". I don't know what limited support means in practice, and I don't know the actual date it starts.

3. The end-of-October deadline: that's my own target. I want a contract signed by 31 October. No one else set it.

On budget, we have $90,000 for systems projects this year. That one is checked: the managing director approved it.

### Turn 12, Assistant (method agent)

That's a clear split, and it moves more than it might look like. Here is how I'm marking the constraints:

- **30 November contract end: ASSUMED.** Nobody has read the renewal or termination clauses, so what happens to your use of the current system after that date is not yet established.
- **Losing support: ASSUMED.** The source is a call and a follow-up email from the account manager saying your version "moves to limited support". What that means in practice, and when it starts, is not known.
- **End-of-October deadline: VERIFIED as your own target, not an external constraint.** You set it, and no one else did. As far as I can tell it rests on the 30 November date, which is itself assumed.
- **$90,000 systems budget for this year: VERIFIED.** The managing director approved it.
- **December peak timing: VERIFIED.** You checked it against last year's sales data.

So two of the three dates you were treating as fixed haven't been checked, and the third is one you set yourself.

Sixth and last question: the evidence map. I've drafted it from what you've told me so far. Each claim carries one tag: GIVEN, DERIVED, INFERRED or UNKNOWN.

- **GIVEN:** about 10,000 order lines a week; a 2.1% picking error rate last quarter; $14,200 in credit notes for picking errors last quarter; both vendors showed in demonstrations that their systems would cut errors; no trial, customer reference or test against your own orders for either platform; a September upgrade quote from your current vendor, not yet opened; the account manager's "moves to limited support" call and email; the end-of-October target is yours; the $90,000 budget is approved; the peak timing checked from last year's sales data.
- **DERIVED:** about 210 wrong lines a week; roughly 2,730 wrong lines last quarter if it ran 13 weeks; about $5 in credit notes per wrong line, which is a floor because it counts credit notes only.
- **INFERRED:** nothing yet. I haven't put the platform-cuts-errors belief here, because the only support for it is the demos.
- **UNKNOWN:** the full cost of each error beyond the credit note; whether any of the three options would cut errors in your warehouse, and by how much; what the September quote costs and includes; what the contract says about renewal, termination or use after 30 November; what "limited support" means and when it starts; how long each option would take to get in and working; what platforms A and B cost against the $90,000, which hasn't come up.

**Is anything on that map wrongly tagged, and is anything material missing?** In particular, do you know anything measured about what causes the picking errors, for example particular products, shifts, pickers or locations? Or is that unknown too?

### Turn 13, User (operator agent)

On the tagging, nothing looks wrong to me. A few things are missing, though.

On what causes the picking errors, here is what I know:

- About 60% of picking errors happen on the night shift. The night shift moved to mostly casual pickers in March 2026.
- The racking was reconfigured in February 2026, and some bin labels were not updated.
- Error rates were below 1% for the two years before March 2026, on the same software we're running now.

I can't tell you how the 60% figure was worked out beyond that, and I don't have a breakdown by product or by individual picker.

On the platform costs, which you've marked as not having come up: Platform A is $68,000 to implement plus $2,900 a month, and Platform B is $41,000 to implement plus $3,600 a month, both on three-year terms. Over three years that's $172,400 for A and $170,600 for B.

One more unknown that isn't on the map: I don't know whether either new platform integrates with our accounting system without custom work.

### Turn 14, Assistant (method agent)

Thanks. Those three facts about the errors matter a lot, so I've added them, along with the platform costs and the integration question. That was the last of the six questions. Here is the framing handoff.

**1. Presented decision and trigger**

Choose between two replacement warehouse management platforms, with a contract signed by 31 October. The trigger is that your current WMS contract runs out on 30 November and the vendor says your version is losing support. You want it settled before the Christmas peak.

**2. Decision underneath**

How you get picking errors down from 2.1% before the December peak. A new platform is one way to do that. It is not the outcome itself. If the platform choice disappeared, the 210 wrong lines a week would still be there.

**3. Missing third option**

Staying with your current vendor and moving to their newer version. The account manager sent a quote for it in September. Nobody has opened it, so its cost and contents are not known. It was not being treated as a real option until now. The option set is three, not two: Platform A, Platform B, or the current vendor's newer version.

**4. Load-bearing assumption**

In your words: "Changing or upgrading the platform makes sense provided that the new system actually cuts our picking errors." The only support for this is the two vendor demonstrations. You have not trialled either platform, spoken to their customers or tested them against your own orders. What you told me in your last message bears directly on it. Error rates were below 1% for two years on the software you run now, and the rise came after the racking change in February 2026 and the move to mostly casual night-shift pickers in March 2026. That timing doesn't prove what caused the errors, but it is the main evidence that bears on this assumption.

**5. Untested constraints**

- **30 November contract end: ASSUMED.** Nobody has read the renewal or termination clauses, so what happens to your use of the current system after that date is not established.
- **Losing support: ASSUMED.** The source is a call and a follow-up email from the account manager saying your version "moves to limited support". What that means in practice, and when it starts, is not known.
- **31 October signing deadline: VERIFIED as your own target, not an external constraint.** It appears to rest on the 30 November date, which is assumed.
- **$90,000 systems budget for this year: VERIFIED.** The managing director approved it.
- **December peak timing: VERIFIED.** Checked against last year's sales data.

**6. Evidence map**

- **GIVEN:** about 10,000 order lines a week; a 2.1% picking error rate last quarter; $14,200 in credit notes for picking errors last quarter; error rates below 1% for the two years before March 2026, on the current software; about 60% of picking errors happen on the night shift, though you don't know how that figure was worked out; the night shift moved to mostly casual pickers in March 2026; the racking was reconfigured in February 2026 and some bin labels were not updated; both vendors showed in demonstrations that their systems would cut errors; no trial, customer reference or test against your own orders for either platform; a September upgrade quote from your current vendor, not yet opened; the account manager's "moves to limited support" call and email; Platform A at $68,000 to implement plus $2,900 a month, and Platform B at $41,000 to implement plus $3,600 a month, both on three-year terms; the 31 October target is yours; the $90,000 budget is approved; the peak timing is checked against last year's sales data.
- **DERIVED:** about 210 wrong lines a week now. Below 1% would be fewer than 100 a week. Roughly 2,730 wrong lines last quarter if it ran 13 weeks. About $5 in credit notes per wrong line, which is a floor because it counts credit notes only. Three-year cost of $172,400 for A and $170,600 for B, a difference of $1,800. Implementation plus the first twelve months comes to $102,800 for A and $84,200 for B. How that lines up against this year's $90,000 depends on when spending would fall, which hasn't come up.
- **INFERRED:** the rise from below 1% to 2.1% began around the racking change and the night-shift staffing change, on the same software. So at least part of the error problem may come from bin labelling and night-shift picking rather than the software. This is reasoned from the timing and the 60% figure. It has not been tested.
- **UNKNOWN:** what is actually driving the errors, including whether they cluster on bins with labels that weren't updated, and how the 60% night-shift figure was produced; the full cost of each error beyond the credit note; whether any of the three options would cut errors in your warehouse, and by how much; what the September quote costs and includes; what the contract says about renewal, termination or use after 30 November; what "limited support" means and when it starts; how long each option would take to get in and working; whether either new platform integrates with your accounting system without custom work.

**7. Reframed decision and the single evidence gap to verify next**

Reframed decision: how to bring picking errors back from 2.1% toward the below-1% level you had on the same software, before the December peak, and what part a platform change plays in that, if any. The timing should come from what the contract and the support terms actually say, not from the 30 November date as assumed.

Evidence gap to verify next: what is driving the rise in errors since early 2026. Specifically, check whether the errors cluster on the bins whose labels weren't updated after the February reconfiguration and on the night shift, and find out how the 60% figure was produced. If the errors trace mainly to those two changes, the role a new platform plays in fixing them changes, and so does what you need from any of the three options.

That's where Frame Free stops. I haven't compared the three options, scored them or recommended one. The question is now framed, but the decision itself is still yours to make.
