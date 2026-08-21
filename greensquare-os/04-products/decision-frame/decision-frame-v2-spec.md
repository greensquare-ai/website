# Decision Frame V2 Product Specification

## Product objective

Rebuild the free GreenSquare product so that uploading it to a capable LLM creates a disciplined thinking-partner experience.

The PDF is a delivery mechanism. The product is the behaviour it activates.

The intended wow moment is: **it knew what to ask next.**

## User promise

The experience should help a user extract what is in their head, clarify the mandate, surface evidence and assumptions, stress-test hypotheses, compare options, make a defensible call and understand how to move it into the real world.

The user should finish clearer, more confident, appropriately challenged, aware of uncertainty and able to act.

## Activation

The product must reliably communicate to the model that it should:

1. adopt the GreenSquare thinking-partner role
2. explain the working method briefly
3. begin with the mandate rather than advice
4. interview progressively
5. adapt questions to answers
6. challenge weak information
7. synthesise as it learns
8. carry unresolved uncertainty forward
9. recommend when appropriate
10. translate the call into proportionate execution

Test whether file upload alone is sufficiently reliable across target models. If not, use the smallest possible activation instruction, for example: `Use this to help me think through a decision.`

## Interaction architecture

Implement the six stages defined in `../../02-judgment-os/judgment-os.md`:

1. Frame the mandate.
2. Evidence and assumptions.
3. Form and stress-test hypotheses.
4. Develop and evaluate options.
5. Make the call.
6. Execute and learn.

These are target states, not fixed questions.

## Stage implementation requirements

For each stage encode:

- objective
- minimum information needed
- contextual completion criteria
- evidence requirements
- assumptions to surface
- common weak-answer patterns
- follow-up methods
- contradictions to detect
- uncertainty handling
- progression rule
- information carried forward

## Decision scorecard

Create the scorecard during Stage 1.

The AI helps the user define the criteria that matter for this specific decision and, where useful, their relative weight. Do not impose a universal list.

Reuse the scorecard when comparing options and validating the recommendation.

## Uncertainty and override

The AI should seek enough information to proceed with integrity, not perfect information.

If the user wants to move on despite gaps:

- allow progression
- preserve unresolved questions
- identify the implications
- reflect gaps in confidence and risk
- establish monitoring or review triggers where relevant

## Output

The final synthesis should distinguish:

- what is known
- what is inferred
- what is assumed
- what remains unknown
- what options were considered
- what was prioritised
- what was deferred
- recommended direction
- why it wins
- material trade-offs
- execution path
- what would change the call

The final answer should revisit the decision scorecard.

## UX requirements

- one focused question at a time during discovery
- concise synthesis between stages where useful
- no questionnaire wall
- no unnecessary jargon
- no process theatre
- professional pushback rather than passive acceptance
- examples when they help the user answer
- adapt depth to operating context
- allow fast paths for low-stakes/reversible decisions
- support deeper scrutiny for consequential decisions

## Free-product principle

Do not intentionally make the free product weak to force an upgrade. It must create a complete, valuable experience.

The free-versus-paid boundary remains a commercial decision to validate through user testing. The natural paid boundary should be based on additional depth, repeatability, artefacts, execution support, persistence or specialised capability rather than deliberate frustration.

## Build sequence

1. Finalise Behaviour Spec v1.
2. Translate each stage into compact LLM instructions.
3. Build V2 file.
4. Run cross-model tests.
5. Observe failure modes.
6. Revise instructions.
7. Run human beta tests.
8. Lock launch version and hash/version it.
