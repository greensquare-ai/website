/**
 * The accountable operator and the practice behind Frame, in one place.
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
 * The practice behind Frame, described at business level only. No names, portraits,
 * biographies or qualifications are published (docs/decisions.md, 22 September 2026),
 * and the site does not draw attention to that absence: it shows instead what a reader
 * can inspect for themselves. Nothing here is a testimonial.
 */
export const practice = {
  heading: 'A practice that makes decision work inspectable.',
  summary: 'GreenSquare AI is a small Australian practice. It writes and maintains Frame, publishes worked examples and the full record of an earlier study, and answers for all of it as a business.',
} as const;
