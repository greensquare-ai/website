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
    oneLine: 'A free six-page PDF guide for ChatGPT, Claude or Gemini. Enter your email and download it straight away.',
    offerLine: 'Free six-page PDF. Use it in ChatGPT, Claude or Gemini.',
    delivery: {
      object: 'A six-page PDF guide.',
      how: 'Attach it to a new chat and describe one decision. The AI asks six questions, one at a time.',
      after: 'The PDF downloads on the page as soon as you enter your email. There is no inbox wait.',
      setup: 'Under five minutes to set up.',
    },
    /** Shown beside every form, before submission. */
    emailExchange: 'You get the PDF straight away. Occasional Frame emails, including Frame Pro launch news, start only once you confirm your address from the email we send. Unsubscribe at any time.',
    /** Shown once the email provider accepts the request. Acceptance is not confirmation. */
    ready: {
      heading: 'Your PDF is ready.',
      body: 'Download it, then attach it to a new chat. To get Frame emails, confirm your address from the email we send.',
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
    session: 'One decision takes about ten minutes. Frame Free stops once the question is clear: it does not rank options or recommend what to do.',
    output: 'A seven-part summary: the decision as you brought it, the real question, the option nobody had considered, the assumption everything rests on, the limits nobody had checked, what is known and what is guessed, and the one thing to check first.',
    /** The canonical boundary. scripts/check-copy.mjs requires its second sentence on /free/. */
    boundary: 'Frame Free works on the question before anyone weighs the options. It does not compare options, recommend a course of action or produce a Decision Brief.',
    /** The short scope line set beside the opening offer. */
    scope: 'It does not make the decision for you. It helps you check that you are answering the right question.',
    /** What the email address is for, in one place for the pages that explain it. */
    emailMeaning: 'Your email unlocks the PDF on the page straight away. Frame product emails, including Frame Pro launch news, start only after you confirm your address from the email we send, and each one has an unsubscribe link. Our email provider, Kit, holds your address; we delete it on request.',
    /** The three steps from download to the first question. /start/ expands them. */
    setup: [
      { title: 'Get the PDF', text: 'Enter your email. The PDF downloads on the page straight away.' },
      { title: 'Attach it to a new chat', text: 'Open ChatGPT, Claude or Gemini and attach the PDF to a new chat. Use an account you are allowed to use for this decision.' },
      { title: 'Describe one decision', text: 'Paste the starter line and describe your decision. The AI asks six questions, one at a time, then gives you a seven-part summary.' },
    ],
    /** The guide's four evidence labels (page 4). The meanings are the site's plain reading. */
    evidenceLabels: [
      { tag: 'given', label: 'Given', meaning: 'You supplied it, or it has been checked.', sounds: '‘The contract says ...’' },
      { tag: 'derived', label: 'Derived', meaning: 'Calculated from given facts.', sounds: '‘That works out to ...’' },
      { tag: 'inferred', label: 'Inferred', meaning: 'Reasoned from what is known, but not checked.', sounds: '‘If churn holds, then ...’' },
      { tag: 'unknown', label: 'Unknown', meaning: 'It matters, and nobody knows it yet.', sounds: 'Competitor intent; an untested belief.' },
    ],
    compatibility: {
      tested: 'Frame Free itself has not been tested in a study. An earlier version of the method was, and the research pages report the result in full.',
      boundary: 'The guide is written for ChatGPT, Claude or Gemini and is not tied to one provider. It is an instruction to the AI, not a guarantee: if a session drifts, the start page has replies that bring it back. Whether you can attach a PDF depends on your account and plan.',
    },
    dataFlow: [
      { what: 'Your email address', where: 'Held by our email provider, Kit. Unsubscribing stops the emails; we delete your record on request.' },
      { what: 'Your decision', where: 'Goes only to the AI provider you choose (OpenAI, Anthropic, Google or another), under its terms. GreenSquare AI never sees it.' },
      { what: 'Retention and training', where: 'Set by your AI provider and your account. Check your data settings before a confidential decision.' },
      { what: 'What not to share', where: 'Anything you may not share with that provider, such as client names under NDA, personal information, or price-sensitive or privileged material, unless your account and the provider’s terms allow it.' },
    ],
    rights: 'A personal licence to use the guide for your own decisions. What you produce with it is yours to use and share. The guide itself is not for republishing or resale.',
  },
  pro: {
    name: 'Frame Pro',
    status: 'In development',
    note: 'The paid plan, in development. It is planned to continue where Frame Free stops: comparing options, recommending a course of action and writing a Decision Brief. Scope, price and support are not fixed yet. They will be published together, with terms of sale, before anything is offered for purchase.',
  },
} as const;

/**
 * Questions a reader asks before signing up, answered once. The homepage shows those
 * marked `home`; /free/ shows all of them.
 */
export const faq = [
  { id: 'cost', home: true, q: 'What does it cost?', a: 'Nothing. No payment details are asked for, and nothing is sold through this site.' },
  { id: 'need', home: true, q: 'What do I need?', a: 'A ChatGPT, Claude or Gemini account that lets you attach a file to a chat, and one decision you are facing.' },
  { id: 'time', home: true, q: 'How long does it take?', a: 'Under five minutes to set up, then about ten minutes for one decision.' },
  { id: 'decide', home: true, q: 'Does it make the decision for me?', a: `No. ${offer.free.boundary} You decide what happens next.` },
  { id: 'private', home: true, q: 'Who sees my decision?', a: 'Only the AI provider you choose, under its terms. GreenSquare AI never sees it. Before a confidential decision, check the data settings on your account.' },
  { id: 'tested', home: true, q: 'Has it been tested?', a: 'Frame Free itself has not been tested in a study, so judge it on your own decision. An earlier version of the method was tested in a published study: it changed how the AI worked through a decision, asking before answering and marking its evidence, but it did not make the AI a better judge than one given all the facts.', link: { href: '/research/', label: 'Read the research' } },
  { id: 'email', home: true, q: 'Why do you need my email?', a: 'Your email unlocks the PDF on the page straight away. Occasional Frame emails, including Frame Pro launch news, start only once you confirm your address. Unsubscribe at any time.' },
  { id: 'questionnaire', home: false, q: 'Is it just a questionnaire?', a: 'No. The PDF gives the AI rules to follow. It asks the six questions in order, one at a time, and adapts each one to what you have already said.' },
  { id: 'which-ai', home: false, q: 'Which AI should I use?', a: offer.free.compatibility.boundary },
  { id: 'pro', home: true, q: 'What is Frame Pro?', a: offer.pro.note },
] as const;

/**
 * Five recognisable decision situations. Each links to its worked example on /examples/,
 * by the anchor that page publishes; the ids double as the opaque analytics category.
 */
export const situations = [
  { id: 'vendor-renewal', title: 'Vendor renewal', situation: 'Choosing between platforms before a contract deadline.', issue: 'Is the software really the problem, and is the deadline real?' },
  { id: 'capacity-hiring', title: 'Capacity and hiring', situation: 'Hiring to relieve repeated delays.', issue: 'Is the bottleneck people, the workflow or the scope?' },
  { id: 'capital-purchase', title: 'Capital purchase', situation: 'Buying equipment for expected demand.', issue: 'Which demand or usage assumption is the case resting on?' },
  { id: 'project-continuation', title: 'Project continuation', situation: 'Continuing or pausing a struggling programme.', issue: 'Has the goal changed, or is money already spent driving the choice?' },
  { id: 'pricing-change', title: 'Pricing or service change', situation: 'Responding to margin pressure.', issue: 'How will customers respond, and which cost assumptions need checking?' },
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
  ['Clarify', 'Pin down the decision that is actually live, who owns it and when it is due.', 'free'],
  ['Inspect', 'Sort what is known from what is calculated, assumed or unknown, and say which unknowns matter.', 'free'],
  ['Test', 'Challenge the logic and the starting assumptions, including your own, before confidence sets in.', 'free'],
  ['Compare', 'Weigh the real options, including doing nothing, against the same criteria.', 'pro'],
  ['Decide', 'Recommend a course of action, with a stated confidence and the assumptions behind it.', 'pro'],
  ['Execute', 'Name the next steps, what would change the call, and when to review it.', 'pro'],
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
