/**
 * What is actually on offer today, stated once so the homepage, the product page and
 * the Frame Free page cannot describe three different products.
 *
 * Model names are permitted here and on the pages that read from this file. The
 * launch-era rule that kept model brands off the product surfaces was narrowed on
 * 10 September 2026 (docs/decisions.md) so that compatibility can be stated plainly.
 */
export const offer = {
  free: {
    name: 'Frame Free',
    status: 'Beta, available now',
    oneLine: 'Email delivery of the Frame method file for use with ChatGPT, Claude or another capable model.',
    delivery: {
      object: 'A single method file in plain text (Markdown).',
      how: 'You paste it as the first message of a new chat, or attach it as a project or custom instruction where your model allows one.',
      after: 'Enter your email. Confirm the address from the message we send. The file arrives in the reply.',
      setup: 'Under five minutes from confirmation to the first question.',
    },
    inputs: [
      'The decision as you currently see it, in a paragraph.',
      'Who owns the decision and when it is due.',
      'The facts, figures and constraints you already hold. Where you do not know something, say so; the method treats a stated unknown as evidence.',
    ],
    session: 'A single decision runs to a completed Decision Brief in one sitting, typically 30 to 60 minutes of interrogation and drafting depending on how much you can answer.',
    compatibility: {
      tested: 'The method file was benchmarked on Claude Opus 4.8 and ChatGPT GPT-5.5 and demonstrated on Claude Opus. It is written for models of that class.',
      boundary: 'It depends on a model that can hold a long instruction, ask questions before answering and keep the four evidence classes straight across a long session. Smaller or older models drop the discipline part way through. It is not tied to one provider.',
    },
    dataFlow: [
      { what: 'Your email address', where: 'Reaches GreenSquare AI, held by our email provider (Kit) until you unsubscribe.' },
      { what: 'Your decision, facts and answers', where: 'Go to the model provider you chose (OpenAI, Anthropic or another), under that provider’s terms and data settings. None of it reaches GreenSquare AI.' },
      { what: 'Retention and training use', where: 'Depend on the provider and the account tier you use. Check the data controls on your own account before a confidential decision.' },
      { what: 'What not to submit', where: 'Anything you are not permitted to place with that provider: client names under NDA, personal information, price-sensitive or privileged material, unless your account and the provider’s terms allow it.' },
    ],
    rights: 'A personal, non-transferable licence for your own decisions. The Decision Briefs you produce are yours to use, share and act on. The method file itself is not for republishing or resale.',
  },
  pro: {
    name: 'Frame Pro',
    status: 'In development',
    note: 'The paid plan for professional and team use. Scope, price and support terms are not yet fixed and will be published together, with terms of sale, before anything is offered for purchase.',
  },
} as const;

/** The six-step method, stated once. */
export const method = [
  ['Clarify', 'Turn the topic into the decision that is actually live, name its owner and its due date.'],
  ['Inspect', 'Separate what is given from what is derived, inferred or unknown, and say which unknowns matter.'],
  ['Test', 'Challenge the framing and the logic before confidence hardens, including the framing you arrived with.'],
  ['Compare', 'Put real options, including doing nothing, against the same criteria.'],
  ['Decide', 'Recommend with a stated confidence and the assumptions the call rests on.'],
  ['Execute', 'Name the next steps, the conditions that would change the call, and the review date.'],
] as const;

/** What a Decision Brief contains, section by section, as the method file produces it. */
export const briefStructure = [
  { section: 'The decision, and why now', carries: 'The live decision, distinguished from the topic, with the reason it is live today.' },
  { section: 'The options, compared', carries: 'Each credible option including the current plan, with the evidence behind it and the exposure if it goes wrong.' },
  { section: 'The recommendation', carries: 'One recommendation, the assumptions it rests on, and which of them is most likely to break it.' },
  { section: 'Next steps', carries: 'Dated actions with owners, including the assessments to commission before the next gate.' },
  { section: 'What would change this call', carries: 'The findings that would reverse the recommendation, what remains unresolved, a confidence statement and what to validate first.' },
] as const;
