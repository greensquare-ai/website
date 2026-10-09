/**
 * What is actually on offer today, stated once so the homepage, the product page and
 * the Frame Free page cannot describe three different products.
 *
 * Model names are permitted here and on the pages that read from this file. The
 * launch-era rule that kept model brands off the product surfaces was narrowed on
 * 10 September 2026 (docs/decisions.md) so that compatibility can be stated plainly.
 *
 * Corrected 19 September 2026. This file previously described Frame Free as a
 * plain-text method file that produces a Decision Brief. The artefact that is
 * actually delivered is a six-page PDF field guide that stops before evaluation.
 * The Decision Brief belongs to Frame Pro, which is in development.
 */
export const offer = {
  free: {
    name: 'Frame Free',
    status: 'Beta, available now',
    oneLine: 'The Frame Free field guide, a six-page PDF you load into ChatGPT, Claude or Gemini. Download it on the page as soon as you enter your email.',
    offerLine: 'Free six-page PDF. Use it in ChatGPT, Claude or Gemini.',
    delivery: {
      object: 'A six-page PDF field guide.',
      how: 'You upload it to a new chat and describe one live decision. The model then asks the six questions in order, one at a time.',
      after: 'Enter your email and the PDF is ready to download on the same page. There is no inbox wait. Confirm your address from the email we send to receive future Frame product emails.',
      setup: 'Under five minutes from download to the first question.',
    },
    /** Shown beside every form, before submission. */
    emailExchange: 'Enter your email for Frame Free and occasional Frame product emails, including Frame Pro launch updates. Confirm your address in the email we send to activate updates. Unsubscribe at any time.',
    /** Shown once the email provider accepts the request. Acceptance is not confirmation. */
    ready: {
      heading: 'Your PDF is ready.',
      body: 'Download it now, then attach it to a new chat. Check your inbox to confirm future Frame product emails.',
    },
    starter: 'Use Frame Free in this PDF. Ask me one question at a time.',
    starterTemplate: [
      'The decision I am considering is:',
      'It became relevant because:',
      'The facts and constraints I know are:',
      'The owner and due date, if known, are:',
      'What I do not know is:',
    ],
    inputs: [
      'The decision as you currently see it, in a paragraph.',
      'Who owns the decision and when it is due.',
      'The facts, figures and constraints you already hold. Where you do not know something, say so; the guide treats a stated unknown as evidence.',
    ],
    session: 'One decision runs to a completed frame in about ten minutes. Frame Free stops there, by design: it does not rank options, score criteria or recommend a course of action.',
    output: 'A seven-part framing handoff: the presented decision and its trigger, the decision underneath, the missing third option, the load-bearing assumption, each constraint marked verified or assumed, an evidence map tagging every material claim given, derived, inferred or unknown, and the single evidence gap to test next.',
    boundary: 'Frame Free clarifies and tests the decision before evaluation. It does not compare options, recommend a course of action or produce a Decision Brief.',
    /** The short scope line set beside the opening offer. */
    scope: 'Frame Free clarifies and tests a decision. It stops before ranking options or recommending a course of action.',
    /** What the email address is for, in one place for the pages that explain it. */
    emailMeaning: 'Your email unlocks the PDF on the page straight away. It also asks to add you to the Frame email list for occasional product emails, including Frame Pro launch updates. Those start only once you confirm your address from the email we send, and every one carries an unsubscribe link. Our email provider, Kit, holds the address; we delete it on request.',
    /** The three steps from download to the first question. /start/ expands them. */
    setup: [
      { title: 'Get the PDF', text: 'Enter your email. The PDF is ready to download on the same page, with no inbox wait.' },
      { title: 'Attach it to a new chat', text: 'Open a new chat in ChatGPT, Claude or Gemini, in an account you are permitted to use for the decision, and attach the PDF.' },
      { title: 'Paste the starter and describe one decision', text: 'The model asks six questions, one at a time, then returns a seven-part framing handoff and stops.' },
    ],
    /** The guide's four evidence labels (page 4), in sentence case as the site sets labels. */
    evidenceLabels: [
      { tag: 'given', label: 'Given', meaning: 'Directly supplied or verified.', sounds: '‘The contract says ...’' },
      { tag: 'derived', label: 'Derived', meaning: 'Calculated from given information.', sounds: '‘That works out to ...’' },
      { tag: 'inferred', label: 'Inferred', meaning: 'Reasoned from what is known.', sounds: '‘If churn holds, then ...’' },
      { tag: 'unknown', label: 'Unknown', meaning: 'Material but not established.', sounds: 'Competitor intent; an untested belief.' },
    ],
    compatibility: {
      tested: 'Frame Free has not been benchmarked. The preregistered study tested an earlier method file that predates Frame, and the research pages say so.',
      boundary: 'The guide is written for use in ChatGPT, Claude or Gemini, and is not tied to one provider. It asks the model to hold a long instruction, ask one question at a time and keep the four evidence labels straight. That is an instruction to the model, not a guarantee: if a session drifts, the start page gives recovery text. Whether you can attach a PDF, and which models you can choose, depend on your account and plan.',
    },
    dataFlow: [
      { what: 'Your email address', where: 'Reaches GreenSquare AI, held by our email provider, Kit. Unsubscribing stops the emails; we delete your record on request.' },
      { what: 'Your decision, facts and answers', where: 'Go to the model provider you chose (OpenAI, Anthropic, Google or another), under that provider’s terms and data settings. None of it reaches GreenSquare AI.' },
      { what: 'Retention and training use', where: 'Depend on the provider and the account tier you use. Check the data controls on your own account before a confidential decision.' },
      { what: 'What not to submit', where: 'Anything you are not permitted to place with that provider: client names under NDA, personal information, price-sensitive or privileged material, unless your account and the provider’s terms allow it.' },
    ],
    rights: 'A personal, non-transferable licence for your own decisions. The framing you produce is yours to use, share and act on. The guide itself is not for republishing or resale.',
  },
  pro: {
    name: 'Frame Pro',
    status: 'In development',
    note: 'The paid plan for professional and team use. It continues where Frame Free stops: deeper interrogation, credible options, explicit criteria, comparison, a recommendation and a five-part Decision Brief. Scope, price and support terms are not yet fixed and will be published together, with terms of sale, before anything is offered for purchase.',
  },
} as const;

/**
 * Five recognisable decision situations. Each links to its worked example on /examples/,
 * by the anchor that page publishes; the ids double as the opaque analytics category.
 */
export const situations = [
  { id: 'vendor-renewal', title: 'Vendor renewal', situation: 'Choosing between platforms before a contract deadline.', issue: 'Whether the software is the root cause, and whether the deadline is verified.' },
  { id: 'capacity-hiring', title: 'Capacity and hiring', situation: 'Hiring to relieve repeated delays.', issue: 'Whether capacity, workflow or scope is the bottleneck.' },
  { id: 'capital-purchase', title: 'Capital purchase', situation: 'Buying equipment for expected demand.', issue: 'Which demand or utilisation assumption carries the decision.' },
  { id: 'project-continuation', title: 'Project continuation', situation: 'Continuing or pausing a struggling programme.', issue: 'Whether the objective has changed, or sunk cost is driving the framing.' },
  { id: 'pricing-change', title: 'Pricing or service change', situation: 'Responding to margin pressure.', issue: 'Which customer-response and cost assumptions need checking.' },
] as const;

/** The six questions Frame Free puts to the decision, in order, as the guide holds them. */
export const freeQuestions = [
  ['The decision and trigger', 'What exactly are you deciding, and what made it live now?'],
  ['The decision underneath', 'If the immediate choice disappeared, what larger question would remain?'],
  ['The missing option', 'Which genuine third path have you not treated as real, including doing nothing?'],
  ['The load-bearing assumption', 'Which single belief would change the decision if it proved wrong?'],
  ['Untested constraints', 'Which deadlines, budgets or stakeholder positions are verified, and which are assumed?'],
  ['The evidence map', 'What is given, derived, inferred or unknown? Keep approximations visible.'],
] as const;

/**
 * The full method, stated once. Frame Free covers the first three moves and stops.
 * Compare, Decide and Execute are Frame Pro, which is in development.
 */
export const method = [
  ['Clarify', 'Turn the topic into the decision that is actually live, name its owner and its due date.', 'free'],
  ['Inspect', 'Separate what is given from what is derived, inferred or unknown, and say which unknowns matter.', 'free'],
  ['Test', 'Challenge the framing and the logic before confidence hardens, including the framing you arrived with.', 'free'],
  ['Compare', 'Put real options, including doing nothing, against the same criteria.', 'pro'],
  ['Decide', 'Recommend with a stated confidence and the assumptions the call rests on.', 'pro'],
  ['Execute', 'Name the next steps, the conditions that would change the call, and the review date.', 'pro'],
] as const;

/**
 * What a Decision Brief contains, section by section. The Decision Brief is the output
 * of the full method. Frame Free does not produce one; the published demonstration was
 * run on the earlier method file that predates Frame.
 */
export const briefStructure = [
  { section: 'The decision, and why now', carries: 'The live decision, distinguished from the topic, with the reason it is live today.' },
  { section: 'The options, compared', carries: 'Each credible option including the current plan, with the evidence behind it and the exposure if it goes wrong.' },
  { section: 'The recommendation', carries: 'One recommendation, the assumptions it rests on, and which of them is most likely to break it.' },
  { section: 'Next steps', carries: 'Dated actions with owners, including the assessments to commission before the next gate.' },
  { section: 'What would change this call', carries: 'The findings that would reverse the recommendation, what remains unresolved, a confidence statement and what to validate first.' },
] as const;
