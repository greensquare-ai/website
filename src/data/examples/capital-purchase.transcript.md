# Frame Free demonstration transcript: capital-purchase

- Fact sheet SHA-256 (frozen before the run): 6b9bd07bf2b0528d7bfc3e509f7ed5cc57e81a11cf6c27dbda91820c1a1e1e9b
- Guide: text extracted from public/frame-free.pdf (SHA-256 21a0cf55f3fc93b4d2fe12a8cf74fdd2dfc141f9fcac097fff835410af84aa7e); extracted text SHA-256 c59427ad5f5f2a9fbf32531a0884caeca13650af133163f7834be17e3daf120f
- Input mode: extracted PDF text read from a file by the method agent, in Claude Code. Not a consumer-account PDF upload.
- Environment: Claude Code general-purpose subagents launched from a session running Claude Opus 5.5. Each turn is a fresh subagent that reads only its own source (guide or fact sheet) plus this transcript. Subagent model identifier not independently confirmed.
- Date: 2026-10-09

### Turn 1, User (operator agent; opening message taken verbatim from the frozen fact sheet)

Use Frame Free in this PDF. Ask me one question at a time.

I'm deciding whether to buy a $420,000 automated bun line for the bakery, because we expect a big lift in wholesale demand next year. The supplier's price only holds until 15 November.

### Turn 2, Assistant (method agent)

Happy to. Let me confirm what I have before we start.

The decision: whether to buy a $420,000 automated bun line for the bakery. The reason: you expect a big lift in wholesale demand next year. The timing: the supplier's price holds until 15 November.

You've given me two separate things that could be the trigger, and they aren't the same kind of thing. One is a demand expectation and the other is a price deadline. "A big lift" is also a category, not a number yet.

So here is the first question: **What made this decision live now, the demand signal or the supplier's 15 November date? And what does "a big lift in wholesale demand" mean in concrete terms, for example how many extra buns a week, from which customers, and starting when?**

### Turn 3, User (operator agent)

Honestly, both. The supplier's quote has an exchange-rate price hold that ends on 15 November, and that's written into the quote, so the price goes up after that. But the reason I'm looking at the line at all is a meeting in August with a regional cafe chain about wholesale supply.

On the numbers: the supplier's case assumes about 10,500 extra buns a day. Their buyer told me they "could take up to 9,000 a day", and the other 1,500 a day is general growth. They mentioned wanting supply from early 2027, but that was said in the meeting and there's nothing in writing. For context, we make about 7,500 buns a day now, over 300 production days a year.

### Turn 4, Assistant (method agent)

Thanks, that separates the two cleanly. The August meeting with the regional cafe chain is the reason you are looking at the line at all. The 15 November exchange-rate price hold, which is written into the quote, is what sets the timing.

I'll note a few things for later and not weigh them yet:

- The supplier's case rests on about 10,500 extra buns a day. That is more than your current 7,500 a day, so it works out to roughly 18,000 a day in total, about 2.4 times today's output.
- Up to 9,000 of those 10,500 come from one buyer, who said they "could take up to 9,000 a day". The early 2027 start was said in the meeting, and nothing is in writing.
- The other 1,500 a day is described as general growth, with no source given yet.

Here is the second question. **Suppose the bun line were off the table tomorrow: the supplier withdrew the quote and no other machine was available. What larger question about the bakery would still be sitting there, and what outcome are you trying to change?**

### Turn 5, User (operator agent)

I suppose the question still sitting there would be the cafe chain. Can we supply them if they come on, and how? The current semi-manual line does about 7,500 buns a day, and they talked about up to 9,000 a day on their own. What I'm trying to change is being able to take on that wholesale growth. Beyond that, I haven't really thought about it as a bigger question than the line, so I don't know how to put it more broadly.

### Turn 6, Assistant (method agent)

That helps. Without the line, the cafe chain is the question that's left. That tells us the line is a means, not the thing being decided.

"Being able to take on that wholesale growth" is still a means, though. Here is what you've told me so far. Up to 9,000 a day from one chain would on its own be more than your current 7,500 a day. So taking them on would more than double the bakery's output, and most of that new volume would depend on a single customer whose start date isn't in writing.

One follow-up, and then we'll move on. **If you did take on the chain, what would change for the bakery that matters to you, for example profit, owner income, keeping the team busy, or the long-term direction of the business? And would it be accurate to say the larger question is "should we become a bakery that depends substantially on one wholesale customer, and on what terms?" If that's wrong, correct it in your own words.**

### Turn 7, User (operator agent)

The only figure I've had in front of me is the supplier's: about $164,000 a year, made up of the extra buns at $0.04 contribution each plus $38,000 a year in labour savings. So profit, I suppose. Beyond that I honestly haven't worked out what it would mean for owner income or the direction of the business. On the team, the two staff on the current line would be redeployed, not made redundant. I've agreed that with both of them.

On your wording: I hadn't thought of it as "becoming a bakery that depends on one wholesale customer". I've been thinking about it as whether to buy the line. I can't tell you the terms, because I don't know whether the chain will sign a supply agreement or on what terms. So I can't say your version is wrong, but it isn't how I'd been putting it.

### Turn 8, Assistant (method agent)

That's a fair correction, and I'll keep your wording rather than mine. You have been framing this as "whether to buy the line". With the line removed, the question left is "can we supply the cafe chain if they come on, and how?" The outcome you named is profit. The one profit figure you have seen is the supplier's.

I'll note two things for the evidence map and not weigh them yet:

- The supplier's $164,000 a year does tie to their own inputs. 10,500 extra buns a day over 300 days at $0.04 each comes to $126,000, and adding $38,000 in labour savings gives $164,000. So all of it rests on the full 10,500 a day, and up to 9,000 of those depend on the chain.
- Whether the chain will sign a supply agreement, and on what terms, is unknown. You've also agreed redeployment with both staff on the current line, so that one is settled.

Here is the third question. **So far the choice on the table is buy the line by 15 November or don't. What is a genuine third path you haven't been treating as real? It could be keeping things as they are for a set period, a smaller version of the same move, or a different way of supplying the chain if they come on. It only needs to be credible enough to take seriously later. We won't judge it now.**

### Turn 9, User (operator agent)

I don't have one. The only two options I've had in front of me are buying the line at $420,000 installed, financed over five years, or carrying on with the existing semi-manual line. I haven't looked at a smaller version, a set waiting period, or another way of supplying the chain, so I don't know whether any of those would be credible.

### Turn 10, Assistant (method agent)

That's an honest answer, and "I don't have one" is useful to record. It also corrects how I put the choice. Your two options are buying the line at $420,000 installed, financed over five years, or carrying on with the existing semi-manual line. So keeping things as they are is already one of the two. The third path has to be something other than those.

I won't make one up for you. The guide gives two forms a third path often takes, and I'll ask about each using only what you've told me. This is my one follow-up on this question.

**First, a timing version. You have nothing in writing from the chain, and the price hold ends on 15 November. Is there any version of "get the chain's intent in writing first, then decide on the line" that you could take seriously, even if it meant missing the price hold? Second, a smaller version. Do you know whether the supplier, or anyone else, offers a smaller or staged line sized nearer the chain's volume than the full 10,500 extra a day? If you don't know, say so and I'll record both as unknown. We won't judge either of them now.**

### Turn 11, User (operator agent)

On the timing version: I haven't considered it, so I don't know whether I'd take it seriously. What I do know is that the price goes up after 15 November, because that's written into the quote. I don't know whether I could get anything in writing from the chain before then, because nothing has been put in writing so far and I don't know whether they'll sign a supply agreement at all.

On the smaller version: I don't know. The only line I've been quoted is the one that can make up to 24,000 a day, and I haven't asked the supplier or anyone else about a smaller or staged option.

### Turn 12, Assistant (method agent)

Thanks. I'll record both as you gave them and not judge either one.

- The timing version, getting the chain's intent in writing before deciding, has not been considered. Whether the chain would put anything in writing before 15 November is unknown.
- The smaller or staged version has not been asked about. The only line quoted is one that can make up to 24,000 buns a day. For comparison, your current 7,500 a day plus the supplier's 10,500 extra comes to about 18,000 a day.

So the missing third path stays open for now. Neither version has been tested, and that gap will go into the handoff.

Here is the fourth question. Nearly everything so far traces back to one point. The supplier's 10,500 extra buns a day, and so the $164,000 a year, depends mostly on the cafe chain taking up to 9,000 a day from early 2027. Nothing about that is in writing.

**Finish this sentence in your own words: "Buying the line makes sense provided that ..." If one belief turned out to be wrong and that would change your answer, what is it? And what have you actually seen, measured or had confirmed in support of it, apart from what the buyer said in the August meeting?**

### Turn 13, User (operator agent)

"Buying the line makes sense provided that the cafe chain actually comes on and takes the volume they talked about." That's the belief. If they don't sign, I'm not sure the case holds, though I can't tell you by how much.

What I've seen in support of it, apart from what the buyer said in August: nothing. There's no letter of intent and nothing in writing. The buyer said they "could take up to 9,000 a day", and that's all I have.

### Turn 14, Assistant (method agent)

Thanks. That's clear, and I'll use your words as the load-bearing assumption: "Buying the line makes sense provided that the cafe chain actually comes on and takes the volume they talked about." What has been seen in support of it, apart from the buyer's words in August, is nothing. There's no letter of intent and nothing in writing. You've also said you can't tell how far the case would move if they don't sign. I'll record that as unknown and not work it out now.

Here is the fifth question. Several things in this decision are being treated as fixed. I'll list them as you've given them, and I need you to tell me which ones have actually been checked:

- The 15 November date. The price hold is written into the quote, so the hold itself is on paper. Has anyone asked the supplier whether it can be extended, or how much the price rises after that date?
- The $420,000 installed price, financed over five years. Is that finance arranged or approved, or is it the structure in the supplier's proposal?
- The chain's early 2027 start, which you've said was said in the meeting and is not in writing.
- The redeployment of the two staff on the current line, which you've said you've agreed with both of them.

**For each one, who set it, when was it last tested, and would you call it verified or assumed? If you haven't asked, "nobody has asked" is a fine answer, and I'll mark it that way.**

### Turn 15, User (operator agent)

Taking them in order:

- The 15 November date: the supplier set it, and the price hold ending then is written into the quote, so I'd call the hold itself verified. Nobody has asked the supplier whether it can be extended, and I don't know how much the price rises after that date.
- The $420,000 installed, financed over five years: that's the option as I've had it in front of me. I don't know whether the finance is arranged or approved, so I can't call it verified.
- The chain's early 2027 start: the chain's buyer said it in the August meeting. Nothing is in writing and nobody has tested it since, so it's assumed.
- The redeployment of the two staff: I set that, and I've agreed it with both of them, so I'd call it verified. I can't give you a date for when it was last confirmed.

### Turn 16, Assistant (method agent)

Thanks. I'll mark the constraints as you've given them:

- The 15 November price hold: VERIFIED, because it is written into the quote. Whether it can be extended, and how much the price rises afterwards, has not been asked.
- The $420,000 installed, financed over five years: ASSUMED. You don't know whether the finance is arranged or approved.
- The chain's early 2027 start: ASSUMED. It was said in the August meeting, nothing is in writing, and nobody has tested it since.
- The redeployment of the two staff: VERIFIED, agreed with both of them. When it was last confirmed isn't known.

Here is the sixth and last question. It asks what you actually know. I've drafted an evidence map from what you've told me, using only four tags. Please correct anything I've put in the wrong place.

- GIVEN: the quote is $420,000 installed, and the price hold ends on 15 November. You make about 7,500 buns a day over 300 production days a year. The quoted line can make up to 24,000 a day. The chain's buyer said they "could take up to 9,000 a day". Both staff on the current line have agreed to be redeployed.
- GIVEN as the supplier's figures, with their accuracy not checked by you: 10,500 extra buns a day, $0.04 contribution per bun, and $38,000 a year in labour savings.
- DERIVED: today's 7,500 plus the 10,500 extra comes to about 18,000 a day, roughly 2.4 times today's output. The supplier's inputs give $126,000 from extra buns plus $38,000 in savings, which is $164,000 a year. On those same inputs, the chain's 9,000 a day is about $108,000 of that $164,000.
- INFERRED: the line is a means of supplying the chain rather than the decision itself, because without the line the chain is the question still left.
- UNKNOWN: whether the chain signs a supply agreement, on what terms, and when it would start. The source of the other 1,500 a day of general growth. Whether the finance is arranged. Whether the price hold can be extended, and how much the price rises after 15 November. Whether a smaller or staged line exists. How far the case moves if the chain doesn't sign. What any of this means for owner income or the direction of the business.

**Two things to check. First, is anything here in the wrong category? In particular, have you tested the $0.04 contribution or the $38,000 labour saving against your own costs, or are both only the supplier's numbers? Second, is there a material claim missing, something you're relying on that isn't in this list?**

### Turn 17, User (operator agent)

On the categories: the $0.04 contribution and the $38,000 labour saving are both from the supplier's case. I can't tell you I've tested either against our own costs, so treat them as the supplier's numbers only. The same goes for the 18,000 a day: the supplier filled that figure in during the sales meeting.

On what's missing, there are two things I'm relying on that aren't in your list:

- I've been assuming the building can take the line without electrical upgrades. That hasn't been checked. The electrician hasn't been asked.
- The supplier's payback calculator shows 2.6 years, based on 18,000 units a day. That's the payback figure I've had in front of me.

### Turn 18, Assistant (method agent)

Thanks. Both corrections go in. The $0.04 contribution, the $38,000 labour saving and the 18,000 a day are all the supplier's numbers, and you haven't tested any of them against your own costs. The electrical capacity and the 2.6-year payback are both new to the map. One note on the payback: $420,000 divided by the supplier's $164,000 a year comes to about 2.6 years. So it rests on the same inputs as the $164,000, including the full 10,500 extra buns a day.

That completes the six questions. Here is the framing handoff.

**1. Presented decision and trigger**

Whether to buy a $420,000 automated bun line, installed and financed over five years, or carry on with the existing semi-manual line. The reason it is being looked at is an August meeting with a regional cafe chain about wholesale supply. The timing comes from the exchange-rate price hold in the supplier's quote, which ends on 15 November.

**2. Decision underneath**

In your words: "Can we supply them if they come on, and how?" The line is a means of supplying the cafe chain, not the decision itself. Taking on the chain's up to 9,000 a day would more than double the bakery's current output of about 7,500 a day, and most of the new volume would come from one customer. You named profit as the outcome you are trying to change. You haven't yet worked out what it would mean for owner income or the direction of the business.

**3. Missing third option**

None identified. You said "I don't have one", and that is recorded as it stands. Two forms were raised and neither has been tested. One is a timing version: get the chain's intent in writing first, then decide on the line, even if that means missing the price hold. You haven't considered it. The other is a smaller or staged line sized nearer the chain's volume. Nobody has asked the supplier or anyone else whether one exists. The only line quoted can make up to 24,000 a day. Both stay open, and neither has been judged.

**4. Load-bearing assumption**

In your words: "Buying the line makes sense provided that the cafe chain actually comes on and takes the volume they talked about." What supports it, apart from the buyer saying in August that they "could take up to 9,000 a day", is nothing. There is no letter of intent and nothing in writing. How far the case moves if they don't sign is unknown.

**5. Untested constraints**

- The 15 November price hold: VERIFIED. It is written into the quote. Nobody has asked whether it can be extended, and how much the price rises afterwards is not known.
- The $420,000 installed, financed over five years: ASSUMED. Whether the finance is arranged or approved is not known.
- The chain's early 2027 start: ASSUMED. The buyer said it in the August meeting, nothing is in writing, and nobody has tested it since.
- The building can take the line without electrical upgrades: ASSUMED. The electrician hasn't been asked.
- The redeployment of the two staff on the current line: VERIFIED. You set it and agreed it with both of them. When it was last confirmed is not known.

**6. Evidence map**

- GIVEN: the quote is $420,000 installed, financed over five years, with a price hold ending 15 November. The bakery makes about 7,500 buns a day over 300 production days a year. The quoted line can make up to 24,000 a day. The chain's buyer said they "could take up to 9,000 a day" and mentioned early 2027, in the August meeting only. Both staff on the current line have agreed to be redeployed.
- GIVEN as the supplier's figures, none tested against your own costs: 10,500 extra buns a day, of which 1,500 is described as general growth. $0.04 contribution per bun. $38,000 a year in labour savings. 18,000 a day in total, filled in by the supplier during the sales meeting. A 2.6-year payback, based on 18,000 units a day.
- DERIVED: 7,500 plus 10,500 is about 18,000 a day, roughly 2.4 times today's output. 10,500 a day over 300 days at $0.04 is $126,000, plus $38,000 in savings gives $164,000 a year. On the same inputs, the chain's 9,000 a day accounts for about $108,000 of that. $420,000 divided by $164,000 is about 2.6 years, so the supplier's payback ties to their own inputs.
- INFERRED: the line is a means of supplying the chain rather than the decision itself, because without the line the chain is the question still left. Because the $164,000 and the 2.6-year payback both assume the full 10,500 extra a day, both depend mostly on the chain.
- UNKNOWN: whether the chain signs a supply agreement, on what terms, and when it would start. The source of the 1,500 a day of general growth. Whether the $0.04 and the $38,000 hold against your own costs. Whether the finance is arranged. Whether the price hold can be extended, and how much the price rises after 15 November. Whether a smaller or staged line exists. Whether the building needs electrical upgrades. How far the case moves if the chain doesn't sign. What any of this means for owner income or the direction of the business.

**7. Reframed decision and the single evidence gap to verify next**

Reframed decision: whether, and on what terms, to build capacity to supply the cafe chain's possible volume of up to 9,000 a day, given that nothing from the chain is in writing, and whether the supplier's 15 November price hold should set the timing of that decision.

The single evidence gap to verify next: whether the cafe chain will commit in writing to volume, terms and a start date. That is the load-bearing assumption, and the supplier's $164,000 a year and 2.6-year payback both depend mostly on it. What you find out may also change how much the 15 November date matters.

That is where the framing stops. No options have been compared or scored, and nothing has been recommended. Framing prepares the decision. It does not make it.
