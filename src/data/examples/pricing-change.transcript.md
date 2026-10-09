# Frame Free demonstration transcript: pricing-change

- Fact sheet SHA-256 (frozen before the run): c0a867203d78462fc74b8faa224ebe308f5e11845fd1d4fbefbd5db458f192a8
- Guide: text extracted from public/frame-free.pdf (SHA-256 21a0cf55f3fc93b4d2fe12a8cf74fdd2dfc141f9fcac097fff835410af84aa7e); extracted text SHA-256 c59427ad5f5f2a9fbf32531a0884caeca13650af133163f7834be17e3daf120f
- Input mode: extracted PDF text read from a file by the method agent, in Claude Code. Not a consumer-account PDF upload.
- Environment: Claude Code general-purpose subagents launched from a session running Claude Opus 5.5. Each turn is a fresh subagent that reads only its own source (guide or fact sheet) plus this transcript. Subagent model identifier not independently confirmed.
- Date: 2026-10-09

### Turn 1, User (operator agent; opening message taken verbatim from the frozen fact sheet)

Use Frame Free in this PDF. Ask me one question at a time.

Our gross margin has dropped from 31% to 24% in a year, and I'm deciding between a 9% price rise and cutting deliveries from three a week to two. Customers need 30 days' notice, so I want to send letters by 1 November.

### Turn 2, Assistant (method agent)

We'll use Frame Free. I'll ask one question at a time, and I'll stop before ranking options or recommending anything.

Here's what I have so far:

- **Decision:** a 9% price rise or cutting deliveries from three a week to two.
- **Context:** gross margin fell from 31% to 24% over a year. Customers need 30 days' notice, so you want letters out by 1 November.

Before we move on, one point needs sharpening. The margin fell over a full year, so the drop on its own doesn't explain why this is live now and wasn't last quarter. **What made it urgent now?** For example, a specific month's result, a cost increase you were told about, a cash pressure, or the 1 November date itself. If 1 November is the reason, where does that date come from?

### Turn 3, User (operator agent)

It was the September management accounts. They showed a 24% gross margin for the year to 30 September 2026, and that's what made me act. The 1 November date comes from the notice period. Our standard terms let us change prices on 30 days' written notice, and I want the change to start on 1 December, so the letters have to go out by 1 November.

### Turn 4, Assistant (method agent)

Thanks. That gives the decision a clear trigger. The September management accounts showed a 24% gross margin for the year to 30 September 2026. The 1 November date follows from your 30-day notice term and a chosen start date of 1 December. I'll note that 1 December is a date you picked, not one the terms impose, and we'll come back to that when we look at constraints.

Question 2 is about the decision underneath this one.

Suppose neither option existed: no price rise and no change to delivery frequency. What larger question would you still face? Put another way, a price rise and fewer deliveries are both means. What outcome are they meant to change, and do you know yet what caused the margin to fall from 31% to 24%?

### Turn 5, User (operator agent)

The outcome I'm trying to change is the gross margin. It fell from 31% ($992,000) to 24% ($768,000), a drop of $224,000, on revenue of about $3.2 million that's roughly flat on last year. Without either option, I'd still be facing how to get that margin back.

On the cause, I know part of it. Gas costs rose $96,000 over the year, and wages rose about $52,500, mostly from award increases, on a wage bill of about $1.4 million. Together that's about $148,500 of the $224,000. I've assumed the rest is general costs, but I haven't broken it down.

### Turn 6, Assistant (method agent)

Thanks. So the decision underneath is how to recover about $224,000 of gross margin on revenue that has stayed roughly flat at $3.2 million. A price rise and fewer deliveries are two ways to do that.

Your figures check out. 24% of $3.2 million is $768,000, and 31% is $992,000. Gas ($96,000) and wages (about $52,500) together come to about $148,500. That leaves about $75,500, roughly a third of the drop, with no identified cause. You've assumed it is general costs, but you haven't broken it down yet. I'll carry that into the evidence map as unknown rather than settle it now, because it affects which part of the margin each option would act on.

Question 3 is about the missing option.

At the moment you have two paths: a 9% price rise, or cutting deliveries from three a week to two. Which genuine third path haven't you treated as real yet? Keeping things as they are counts, and so does a smaller or slower version of either option. It only needs to be credible enough to look at seriously later. We won't evaluate it now.

### Turn 7, User (operator agent)

Honestly, I don't know. I've only been weighing those two: a 9% rise across the board, or dropping standard delivery from three a week to two at current prices. I haven't seriously looked at a third path, whether that's leaving things as they are or a smaller or slower version of either one.

### Turn 8, Assistant (method agent)

That's a useful answer. It tells us the choice came to you as two options, and neither of them has been tested against a third. I won't make one up for you, but I'll ask one follow-up before we move on.

Both of your options apply to every customer from 1 December: a 9% rise across the board, or two deliveries a week instead of three at current prices. The forms a third path usually takes are these:

- Keep things as they are for a set period, for example until you know what the remaining $75,500 of the drop is.
- A smaller version of either option, such as a lower rise or a delivery cut for some customers only.
- A slower version of either option, such as a later start date or a change made in stages.

**Which of these could you credibly put on the table, even if you don't like it yet?** One is enough, and we won't judge it now. If none of them is credible for your business, say so. I'll record the third path as not yet identified and we'll move on to the assumption the decision rests on.

### Turn 9, User (operator agent)

I don't know. I haven't looked at any of those, so I can't tell you which one would be credible for us. Record the third path as not yet identified.

### Turn 10, Assistant (method agent)

Recorded. The third path is not yet identified, and the handoff will say so. That is a finding in its own right: the choice reached you as two options, and nothing has yet been tested against them.

Question 4 is about the load-bearing assumption.

Many things could go wrong with either option. I'm not asking for that list. I'm asking for the one belief that would change your decision if it proved wrong. Try finishing this sentence:

"This decision makes sense provided that ..."

Then tell me what you have actually seen, measured or checked that supports it. For example, have you seen how customers reacted to a past price change, or worked out what moving from three deliveries a week to two would save in gas and wages? If the honest answer is that nothing has been checked yet, say so. That is useful to know at this stage.

### Turn 11, User (operator agent)

This decision makes sense provided that customers will accept a 9% rise, because costs are up everywhere. For the delivery option, it rests on cutting a delivery day saving running costs.

Honestly, nothing has been checked on either. I haven't asked any customers about the 9%. On a past price change, we put prices up 5% in 2024 and six customers left afterwards, but nobody followed up on why. On deliveries, I haven't done any route or cost analysis, so I haven't worked out what going from three to two a week would save in gas or wages.

### Turn 12, Assistant (method agent)

Thanks. Saying plainly that nothing has been checked is useful, and I'll record it that way.

You've given me two beliefs, one for each option:

- **Price rise:** customers will accept a 9% rise because costs are up everywhere.
- **Delivery cut:** dropping from three deliveries a week to two will save running costs.

"Costs are up everywhere" is a reason customers might accept the rise. It isn't evidence that they will. The only evidence you have points the other way and is incomplete: after the 5% rise in 2024, six customers left, and nobody found out why. I'll record that as given, with the reason for leaving unknown.

For a sense of scale: if every customer stayed, 9% on about $3.2 million would bring in about $288,000 a year. That's my calculation from your figures, and it assumes nobody leaves. It's more than the $224,000 drop, so the question becomes how much revenue you could lose before the rise no longer covers the gap. We won't work that out now.

My one follow-up on this question: the guide asks for the single belief the decision rests on, not one per option. **If you could test only one belief before 1 November, which one would change what you do if it proved wrong?** It could be one of the two above. It could also be something underneath both, for example that the cost increases you've identified are the main cause of the margin fall, when about $75,500 of it still has no identified cause. Pick the one that matters most to you, in your own words.

### Turn 13, User (operator agent)

If I could only test one, it would be whether customers will actually accept a 9% rise. If a lot of them would walk, the price rise stops making sense, and the last time we put prices up, 5% in 2024, six customers left and we never found out why. I take the point about the other $75,500, but I don't know what's in it yet, so I can't say whether that's the bigger issue.

### Turn 14, Assistant (method agent)

Recorded. The load-bearing assumption is that customers will accept a 9% rise. Nothing has been checked on it yet. The only evidence is the 5% rise in 2024, after which six customers left for reasons nobody found out. I'll also note that you've put the $75,500 aside because you don't know what's in it yet, not because you've ruled it out.

Question 5 is about untested constraints.

Several things in this decision are being treated as fixed. For each one, tell me whether it is verified (someone has checked it in a document or with the person who set it) or assumed:

1. Every customer is on your standard terms, and those terms allow a price change on 30 days' written notice. Has anyone checked whether some customers have their own contracts, fixed prices or different notice periods?
2. The 1 December start date, and so the 1 November deadline for letters. You chose 1 December. What makes it 1 December and not a later date?
3. Delivery frequency can be cut from three a week to two on the same notice. Is three deliveries a week written into your terms or any customer contract, or is it a habit customers have come to expect?
4. Anything else you're treating as fixed: a budget, a bank or owner expectation, a capacity limit, or a commitment you've made to someone.

For any you mark verified, say who checked it and when. "Our terms say so" counts as verified only if someone has read the clause recently.

### Turn 15, User (operator agent)

1. Partly verified. The 30 days' written notice for price changes is in our customer terms, and that has been checked. I can't tell you who checked it or when. Not every customer is on standard terms, though. Our 12 largest customers, about 38% of revenue, are on two-year contracts that only allow CPI increases on each contract anniversary.
2. Assumed. I chose 1 December myself. Nothing I know of makes it 1 December rather than a later date.
3. I don't know. I haven't checked whether three deliveries a week is written into our terms or any customer contract.
4. The four vans are leased on fixed terms, and the drivers work fixed 38-hour weeks. I don't know of any budget, bank or owner expectation that applies here.

### Turn 16, Assistant (method agent)

Thanks. That answer changes the shape of the decision more than anything so far, so here is how I'm recording it:

1. The 30-day notice clause for price changes is in your customer terms. I'll mark the clause as verified, but you can't say who checked it or when, so I'll note that gap. It applies only to customers on standard terms. Your 12 largest customers, about 38% of revenue, are on two-year contracts that allow only CPI increases on each contract anniversary. A 9% rise across the board from 1 December can't reach them under those contracts, as you've described them.
2. The 1 December start date is assumed. You chose it, and nothing you know of fixes it. That makes the 1 November deadline for letters assumed too.
3. Whether three deliveries a week is written into your terms or any contract is unknown.
4. The four van leases are on fixed terms and the drivers work fixed 38-hour weeks. I'll record those as you gave them. I can't tell from what you've said whether anyone has checked the lease terms or the employment arrangements recently.

For scale only: if the 9% rise applied just to the roughly 62% of revenue on standard terms, and every one of those customers stayed, it would bring in about $178,560 a year (9% of about $1.98 million). That's my calculation from your figures, not a forecast, and we won't weigh it now.

I'll also note something without judging it. Your delivery option rests on the belief that cutting a delivery day saves running costs. The vans are on fixed leases and the drivers are on fixed hours, so it's an open question which costs would actually fall. That goes into the evidence map as inferred, not settled.

My one follow-up on this question: **has anyone read the 12 two-year contracts recently, and do you know (a) when each one's anniversary falls and (b) whether they say anything about delivery frequency?** If nobody has, say so and I'll record both as unknown. Then we'll move to the last question, the evidence map.

### Turn 17, User (operator agent)

I don't know whether anyone has read the 12 contracts recently. I also don't know when each one's anniversary falls, or whether they say anything about delivery frequency. Record all of that as unknown.

### Turn 18, Assistant (method agent)

Recorded. Nobody is known to have read the 12 contracts recently. Their anniversary dates are unknown, and so is whether they say anything about delivery frequency.

Question 6 is the evidence map, the last question. Every material claim gets one of four tags. GIVEN means you supplied it or it has been checked. DERIVED means it is calculated from given figures. INFERRED means it is reasoned from what is known. UNKNOWN means it matters but hasn't been established. Here is my draft from what you've told me.

GIVEN
- The September management accounts show a 24% gross margin for the year to 30 September 2026, down from 31% a year earlier.
- Revenue is about $3.2 million, roughly flat on last year.
- Gas costs rose $96,000 over the year.
- Wages rose about $52,500, mostly from award increases, on a wage bill of about $1.4 million.
- Your customer terms allow price changes on 30 days' written notice. The clause has been checked, but you don't know who checked it or when.
- Your 12 largest customers, about 38% of revenue, are on two-year contracts that allow only CPI increases on each contract anniversary.
- Prices rose 5% in 2024, and six customers left afterwards.
- The four vans are leased on fixed terms, and the drivers work fixed 38-hour weeks.
- You chose 1 December as the start date. Nothing you know of fixes it.

DERIVED
- Gross margin fell from about $992,000 to about $768,000, a drop of about $224,000.
- Gas and wages together explain about $148,500 of that, which leaves about $75,500 with no identified cause.
- The 1 November deadline for letters follows from the 1 December start date and the 30-day notice term.
- If every customer stayed, a 9% rise on all revenue would bring in about $288,000 a year.
- If the rise reached only the roughly 62% of revenue on standard terms (about $1.98 million) and every one of those customers stayed, it would bring in about $178,560 a year. That is about $45,000 less than the $224,000 drop. This is a calculation, not a forecast.

INFERRED
- Cutting from three deliveries a week to two will save running costs. With fixed van leases and fixed driver hours, it is open which costs would actually fall.

UNKNOWN
- Whether customers will accept a 9% rise. This is the load-bearing assumption, and nothing has been checked.
- Why the six customers left after the 2024 rise.
- What makes up the remaining $75,500. You've assumed general costs, but it hasn't been broken down.
- What going from three deliveries to two would save in gas or wages.
- Whether three deliveries a week is written into your terms or any customer contract.
- When each of the 12 contracts' anniversaries falls, whether they mention delivery frequency, and whether anyone has read them recently.
- Whether anyone has recently checked the van lease terms or the drivers' employment arrangements.

My one follow-up: **is any tag here wrong, or is a material claim missing?** For example, a figure I've marked GIVEN that is really your own estimate, or something you know about customers, costs or the contracts that you haven't mentioned yet. If the map is right as it stands, say so and I'll write up the full framing handoff.

### Turn 19, User (operator agent)

The tags look right to me. Two things are missing.

First, we replaced more linen stock this year than usual. I haven't pulled the amount out of the accounts, so I can't tell you how much it was. That belongs under unknown.

Second, I don't know what competitors charge now. Please add that as unknown too. I also don't know how many customers would leave at 9%, but I think your load-bearing item already covers that.

### Turn 20, Assistant (method agent)

Thanks. I've added both to the map as unknown: the extra linen stock replaced this year, and what competitors charge now. You're right that how many customers would leave at 9% is already covered by the load-bearing item, so I haven't listed it twice.

That completes the six questions. Here is the framing handoff.

**1. Presented decision and trigger**

Choose between a 9% price rise across the board and cutting standard delivery from three a week to two at current prices, with letters out by 1 November for a 1 December start. The trigger was the September management accounts, which showed a 24% gross margin for the year to 30 September 2026, down from 31%.

**2. Decision underneath**

How to recover about $224,000 of gross margin on revenue that has stayed roughly flat at about $3.2 million. The price rise and the delivery cut are two means to that outcome. About $148,500 of the fall has an identified cause (gas and wages). About $75,500 does not.

**3. Missing third option**

Not yet identified. The choice reached you as two options, and no third path has been tested against them. Keeping things as they are, a smaller version of either option, or a slower one have not been looked at. The handoff records that gap rather than filling it.

**4. Load-bearing assumption**

"This decision makes sense provided that customers will accept a 9% rise." Nothing has been checked on it. The only evidence is the 5% rise in 2024, after which six customers left for reasons nobody found out. You set aside the unexplained $75,500 because you don't know what's in it yet, not because you ruled it out.

**5. Untested constraints**

- 30 days' written notice for price changes under your customer terms: VERIFIED. The clause has been checked, but you don't know who checked it or when.
- All customers can be reached by a price change on that notice: ASSUMED, and contradicted by what you've told me. Your 12 largest customers, about 38% of revenue, are on two-year contracts that allow only CPI increases on each anniversary.
- The terms of those 12 contracts as you've described them: ASSUMED. Nobody is known to have read them recently.
- The 1 December start date, and so the 1 November deadline for letters: ASSUMED. You chose it, and nothing you know of fixes it.
- Delivery frequency can be cut from three a week to two on the same notice: ASSUMED. Nobody has checked whether three a week is written into your terms or any contract.
- Fixed van leases and fixed 38-hour driver weeks: ASSUMED. Stated as fact, but it isn't known whether anyone has checked the lease terms or employment arrangements recently.
- No budget, bank or owner expectation applies: ASSUMED. None that you know of, but none has been checked.

**6. Evidence map**

GIVEN
- The September management accounts show a 24% gross margin for the year to 30 September 2026, down from 31% a year earlier.
- Revenue is about $3.2 million, roughly flat on last year.
- Gas costs rose $96,000 over the year.
- Wages rose about $52,500, mostly from award increases, on a wage bill of about $1.4 million.
- Customer terms allow price changes on 30 days' written notice. Checked, but by whom and when is not known.
- The 12 largest customers, about 38% of revenue, are on two-year contracts allowing only CPI increases on each anniversary.
- Prices rose 5% in 2024, and six customers left afterwards.
- The four vans are leased on fixed terms, and drivers work fixed 38-hour weeks.
- You chose 1 December as the start date.

DERIVED
- Gross margin fell from about $992,000 to about $768,000, a drop of about $224,000.
- Gas and wages explain about $148,500 of that, leaving about $75,500 with no identified cause.
- The 1 November deadline follows from the 1 December start date and the 30-day notice term.
- If every customer stayed, 9% on all revenue would bring in about $288,000 a year.
- If the rise reached only the roughly 62% of revenue on standard terms (about $1.98 million) and every one of those customers stayed, it would bring in about $178,560 a year, about $45,000 short of the $224,000 drop. A calculation, not a forecast.

INFERRED
- Cutting from three deliveries a week to two will save running costs. With fixed van leases and fixed driver hours, it is open which costs would actually fall.

UNKNOWN
- Whether customers will accept a 9% rise (the load-bearing assumption), including how many would leave.
- Why the six customers left after the 2024 rise.
- What makes up the remaining $75,500. Assumed to be general costs, not broken down.
- How much was spent replacing linen stock this year, above the usual level.
- What competitors charge now.
- What going from three deliveries to two would save in gas or wages.
- Whether three deliveries a week is written into your terms or any customer contract.
- When each of the 12 contracts' anniversaries falls, whether they mention delivery frequency, and whether anyone has read them recently.
- Whether anyone has recently checked the van lease terms or the drivers' employment arrangements.

**7. Reframed decision and the single evidence gap to verify next**

Reframed decision: how to recover about $224,000 of gross margin when about a third of the fall has no identified cause, about 38% of revenue sits on contracts that a 9% rise from 1 December cannot reach as you've described them, the 1 December start is a date you chose, and no third path has yet been put alongside the two you inherited.

Evidence gap to verify next: what the 12 two-year contracts actually say, meaning each anniversary date, the exact price-change clause, and anything on delivery frequency. Reading them settles how much of your revenue either option can reach, and when. That changes the scale of the question before customer acceptance is even tested.

I'll stop here. Nothing has been ranked, scored or recommended. Framing prepares the decision; it doesn't make it.
