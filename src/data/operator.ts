/**
 * The accountable operator and the people behind the method, in one place.
 *
 * Every page that names who runs the site reads from here, so the legal pages, the
 * About page and the footer cannot drift apart.
 */
export const operator = {
  /** Registered business name and ABN, supplied by the operator on 10 September 2026. */
  businessName: 'GreenSquare AI',
  abn: '23 683 689 565',
  tradingName: 'GreenSquare AI',
  location: 'Sydney, Australia',
  jurisdiction: 'New South Wales, Australia',
  email: 'hello@greensquare.ai',

  get legalLine() {
    return `${this.businessName} is a registered Australian business, ABN ${this.abn}, based in ${this.location}.`;
  },
  get footerLine() {
    return `${this.businessName}, ABN ${this.abn}.`;
  },
} as const;

/**
 * Who built Frame and what a buyer may hold them to. Written as a profile of the
 * practice rather than a named individual, at the operator's instruction. Every line
 * is a statement the operator stands behind; nothing here is a testimonial.
 */
export const people = {
  heading: 'Built and maintained by management consultants.',
  lines: [
    'Frame was written by management consultants who spent their careers producing decision papers for boards, executive committees and transaction teams, and who now run operating businesses of their own.',
    'The lead author trained at EY in strategy and transactions, holds an MBA from UNSW and the FMVA financial modelling credential, and has led acquisition work at the hundreds-of-millions scale. The method is the discipline that work required, written down so a model will follow it.',
    'The same people run the benchmark, score it, publish its deviations and maintain the method file. There is no research team behind a separate marketing team; the person who wrote the claim is the person who has to defend it.',
  ],
  verify: [
    { label: 'The method', text: 'Request the Frame Free beta and run a real decision through it. The file is the work.' },
    { label: 'The research', text: 'The preregistration commit, the frozen inputs, all 18 protocol deviations and the eight limitations are public. Read them before the result.' },
    { label: 'The people', text: 'Write to hello@greensquare.ai. A reply comes from the person who maintains the method, not a support desk.' },
  ],
} as const;
