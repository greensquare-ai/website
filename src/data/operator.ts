/**
 * The accountable operator and the people behind the method, in one place.
 *
 * Every page that names who runs the site reads from here, so the legal pages, the
 * About page and the footer cannot drift apart.
 */
export const operator = {
  /** Registered business name, supplied by the operator on 10 September 2026. */
  businessName: 'GreenSquare AI',
  tradingName: 'GreenSquare AI',
  location: 'Sydney, Australia',
  jurisdiction: 'New South Wales, Australia',
  email: 'hello@greensquare.ai',

  get legalLine() {
    return `${this.businessName} is a registered Australian business based in ${this.location}.`;
  },
  get footerLine() {
    return `${this.businessName}, ${this.location}.`;
  },
} as const;

/**
 * Who built Frame and what a buyer may hold them to. Written as a profile of the
 * practice rather than a named individual, at the operator's instruction. Every line
 * is a statement the operator stands behind; nothing here is a testimonial.
 */
export const people = {
  heading: 'Built from strategy, transformation and transaction work.',
  lines: [
    'Frame comes from professional work where recommendations had to survive scrutiny from boards, executives, investors and the teams responsible for delivery.',
    'The experience behind it spans corporate strategy, capital allocation, operating-model design, transactions, restructuring and enterprise transformation. It combines financial analysis with responsibility for execution, rather than advice in isolation.',
    'The same small practice maintains the product, runs the benchmark and publishes its limitations and deviations. There is no separate research claim that a marketing team can distance itself from.',
  ],
  verify: [
    { label: 'The method', text: 'Request the Frame Free beta and run a real decision through it, then judge it on what comes out.' },
    { label: 'The research', text: 'The preregistration commit, the frozen inputs, all 18 protocol deviations and the eight limitations are public. Read them before the result.' },
    { label: 'The people', text: 'Write to hello@greensquare.ai. A reply comes from the person who maintains the method.' },
  ],
} as const;
