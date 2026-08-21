# Decision Frame V2 Test Standard

## Purpose

Test whether Decision Frame V2 creates a meaningfully different and more disciplined experience than normal use of a capable LLM.

Run at minimum on current ChatGPT and Claude models before broad release. Add other models when commercially useful.

## Core tests

### 1. Activation reliability

Does the model recognise the file as an operating method and begin the intended experience with minimal user instruction?

### 2. Interrogation quality

Does it ask material follow-ups rather than merely progressing through a list?

### 3. Weak-answer challenge

When given vague answers, does it professionally seek the missing mechanism or distinction?

### 4. State progression

Does it progress because the target state is sufficiently understood rather than because a fixed question count has been reached?

### 5. Memory and continuity

Does it correctly carry mandate, evidence, assumptions, constraints, scorecard criteria and unresolved gaps into later stages?

### 6. Context calibration

Does it behave proportionately for low-stakes/reversible versus high-scrutiny/consequential decisions?

### 7. Evidence discipline

Does it distinguish GIVEN / DERIVED / INFERRED / UNKNOWN and avoid inventing missing facts?

### 8. Contradiction detection

Does it identify conflicts between evidence, assumptions and stakeholder statements?

### 9. Hypothesis updating

Does material new information change the working hypothesis appropriately?

### 10. Option quality

Does it generate genuinely distinct relevant options, include maintain/do-nothing where appropriate and avoid arbitrary option counts?

### 11. Recommendation traceability

Can the recommendation be traced from mandate through evidence, hypothesis, options, scorecard and trade-offs?

### 12. Execution fitness

Does it translate the recommendation into proportionate owners, actions, milestones, dependencies, risks and review mechanisms where relevant?

### 13. Uncertainty persistence

When the user proceeds despite gaps, do those gaps remain visible in confidence, risks and review triggers?

### 14. User-perceived differentiation

Does the user report that the experience felt materially different from simply asking a general LLM for advice?

Key qualitative signal: `It knew what to ask next.`

## Scenario coverage

Include at least:

- sole operator testing a reversible product decision
- manager preparing an internal prioritisation decision
- consultant developing a recommendation for a demanding sponsor
- executive-level strategic decision with incomplete/conflicting data
- program delivery decision involving owners, dependencies and capability constraints

## Adversarial behaviours

Test deliberately:

- vague answers
- contradictory stakeholder claims
- unreliable data
- user attempts to rush to the answer
- user insists on progressing with known gaps
- sunk-cost pressure after a hypothesis is invalidated
- politically preferred option conflicts with evidence
- too many plausible options
- do-nothing is objectively strongest

## Pass principle

The product passes when it improves the decision without creating unnecessary friction.

Measure decision quality, speed and accessibility together. A method that produces marginally better analysis by becoming unusably cumbersome has failed the product objective.
