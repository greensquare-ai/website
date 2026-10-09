/**
 * Five agent-run demonstrations of the Frame Free guide, recorded on 9 October 2026.
 *
 * These are public records. The fact sheets (`examples/*.facts.md`) were written and
 * frozen by SHA-256 before any run began. The transcripts (`examples/*.transcript.md`)
 * are reproduced exactly as recorded, including the method agent's shortfalls. Do not
 * edit either to improve them; a correction belongs in `shortfall` or `note` here.
 *
 * How each run worked: every turn was a fresh agent. The method agent read only the
 * text extracted from public/frame-free.pdf and the transcript so far. The operator
 * agent read only the frozen fact sheet and the transcript so far, and answered as the
 * decision owner. A separate reviewer agent then checked each record against its fact
 * sheet. These are agent responses to fictional inputs, not customer results.
 *
 * The situation and framing issue for each id live in `situations` in offer.ts.
 *
 * `changed` and `shortfall` are our descriptions of the record. Each must stay
 * traceable to the transcript and the review; neither may claim a benefit.
 */

export type Example = {
  id: string;
  title: string;
  /** What the record shows moved in the question or the evidence state. */
  changed: string;
  /** Where the run fell short of the guide, as found on review. Null if none was found. */
  shortfall: string | null;
};

export const examplesLabel =
  'Illustrative agent-run example using the Frame Free guide. Fictional inputs; not a customer result or performance benchmark.';

export const examplesProvenance = {
  date: '9 October 2026',
  inputMode: 'Text extracted from the Frame Free PDF and read from a file by the method agent. Not a PDF uploaded to a ChatGPT, Claude or Gemini account.',
  environment: 'Claude Code subagents launched from a session running Claude Opus 5.5. The model identifier of each subagent was not independently confirmed.',
  method: 'Each turn was taken by a fresh agent that read only its own source (the guide, or the frozen fact sheet) and the transcript so far. A separate reviewer agent checked every record afterwards.',
  notTested: 'These runs do not test how Frame Free behaves in a consumer chat account, on other models, or with a real decision. No human took part.',
} as const;

export const examples: Example[] = [
  {
    id: 'vendor-renewal',
    title: 'Replacing a warehouse system under a deadline',
    changed: 'The question moved from which of two platforms to sign by 31 October to what is driving picking errors that rose on the same software. The 30 November contract end was marked assumed, and an unopened upgrade quote became a third option.',
    shortfall: 'No departure from the guide was found on review. Two smaller points were noted: the operator agent added "No one else set it" (turn 11), which is not on its fact sheet, and the method agent turned the owner\'s "I haven\'t opened it" into "nobody has" (turns 10 and 14).',
  },
  {
    id: 'capacity-hiring',
    title: 'Hiring to fix late delivery',
    changed: 'The question moved from whether to hire a senior engineer to why 41 of 63 projects were late. The single principal sign-off was marked as an assumed constraint, and the evidence map showed the hire would not shorten the review wait as the work is currently organised.',
    shortfall: 'The handoff names no third option; the guide asks for one. On review, several statements by the operator agent were not on its fact sheet: that no target was set and that taking on more work is not the driver (turn 5), that no analysis of the late projects had been done (turn 11), and that the owner set the 30 October date and the $145,000 figure personally (turn 15). The first three reached the handoff. The method agent also turned the owner\'s "I don\'t know that anyone counted it project by project" (turn 17) into "nobody counted it project by project" (turn 18).',
  },
  {
    id: 'capital-purchase',
    title: 'Buying a production line for expected demand',
    changed: 'The question moved from whether to buy before a supplier price hold ends to whether one prospective customer will commit in writing, which the handoff identifies as the assumption the case mostly rests on.',
    shortfall: 'The handoff names no third option. The reviewer also noted that it tagged the case without that customer as unknown, although figures already in the conversation allowed an estimate.',
  },
  {
    id: 'project-continuation',
    title: 'Finishing or pausing an over-budget programme',
    changed: 'The question moved from finish or pause to how to reduce the client calls that remain, after the conversation surfaced that calls had already fallen by about a third for reasons nobody had established. A certificate-only path became the third option.',
    shortfall: 'On review, the operator agent said cutting calls is still the outcome that matters (turn 5), which its fact sheet does not state, and the decision underneath and the reframed decision rest on that line. The method agent twice turned "I don\'t know" into "nobody has" (turns 16 and 18) and gave the fall in calls as 37% in one place and about a third in another.',
  },
  {
    id: 'pricing-change',
    title: 'Responding to margin pressure',
    changed: 'The question moved from a price rise or fewer deliveries to recovering a fall in gross margin, about a third of which has no identified cause, with a large share of revenue on contracts that a 1 December rise may not reach.',
    shortfall: 'The handoff names no third option; the guide asks for one. On review, the evidence map tags the owner\'s unchecked belief that dropping a delivery day saves running costs as INFERRED (turns 18 and 20). The guide treats an untested belief as UNKNOWN, and the matching belief about price was tagged UNKNOWN.',
  },
];
