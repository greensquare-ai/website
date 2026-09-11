/**
 * Excerpts from the one published Decision Brief, the Kelbrane demonstration run in
 * src/data/demonstrations/demo-1.md. Every string here is copied from that file and
 * must stay verbatim; the line references point at the source so a reader can check.
 *
 * The run is a demonstration, not part of the preregistered study: one run, a fictional
 * case, unscored, produced by the earlier method file that predates Frame. Any surface
 * that shows these excerpts must say so.
 */
export const briefExcerpt = {
  case: 'Kelbrane Group',
  situation: 'A national warehouse and ordering system cutover across 42 branches, one weekend, with the readiness call due at a steering committee in three days.',
  provenance: {
    kind: 'Demonstration run, not part of the preregistered study',
    runOn: '30 August 2026',
    model: 'Claude Opus',
    file: 'decision-brief-v2.0.md, the method file that predates Frame',
    caseNote: 'Fictional case. One run, unscored, unedited.',
    sourcePath: 'src/data/demonstrations/demo-1.md',
  },
  fields: {
    decision: {
      label: 'The decision',
      text: "The decision is not whether the programme is ready. On the only written standard that exists, the steering committee's own zero open sev-1 and zero open sev-2 gate, it is not, and 19 open defects of 47 with six at sev-1 (given) is not a position you can attest to on Thursday. The live decision is what you ask the committee for on 12 November: a waiver of their own gate so February can be confirmed, a change of date, or a structured gate in January that decides it on evidence you do not have yet.",
      source: 'demo-1.md, section 1',
    },
    recommendation: {
      label: 'Recommendation',
      text: 'Take option B. On Thursday, do not ask the committee to accept a readiness call; ask them to set a formal go/no-go gate for 15 January, to state in writing whether the zero-zero criteria stand or are being relaxed and by whom, and to commission the rollback rehearsal, the costed failure case and the phased re-cut now so the January gate has something to decide on.',
      source: 'demo-1.md, section 3',
    },
    confidence: {
      label: 'Confidence',
      value: 'Medium',
      text: 'Confidence: medium on what to ask for on Thursday, which rests on two confirmed inputs (the gate criteria and the defect position). Confidence in the February-versus-June call underneath is low, and that is precisely why Thursday should not settle it.',
      source: 'demo-1.md, section 5',
    },
    risk: {
      label: 'Critical assumption',
      text: 'That the six sev-1 defects are on a closure and regression path that can complete before mid-January (unknown, and the single thing most likely to break the recommendation).',
      source: 'demo-1.md, section 3',
    },
    condition: {
      label: 'What would change this call',
      text: 'If extended support comes back unavailable or priced beyond reach, 31 March is a real wall, February becomes the only supported window, and the case for the committee accepting a documented relaxation of its own gate gets considerably stronger.',
      source: 'demo-1.md, section 5',
    },
    nextReview: {
      label: 'Next review',
      text: 'A formal go/no-go gate for 15 January, with the rollback rehearsal and costed failure case reporting by 12 December.',
      source: 'demo-1.md, sections 3 and 4',
      paraphrased: true,
    },
    validateFirst: {
      label: 'Validate first',
      text: "Validate first: the test manager's written position, and the extended support price.",
      source: 'demo-1.md, section 5',
    },
  },
  /* The evidence marks the brief itself carries, quoted with the brief's own tags in place. */
  evidence: [
    { tag: 'given', text: '19 open defects of 47 with six at sev-1 (given) is not a position you can attest to on Thursday.' },
    { tag: 'derived', text: 'Nine November to six February is 89 days, near enough to 13 weeks (derived)' },
    { tag: 'inferred', text: 'the Christmas and New Year trading period sits inside it, so the usable remediation and regression window is materially shorter than 13 weeks (inferred)' },
    { tag: 'unknown', text: "that 31 March is a purchasable date rather than a wall (unknown, because the only question ever put to the vendor was about the global end-of-life date, not about extended support on Kelbrane's instance)." },
  ],
  /* One turn of interrogation, quoted, and what changed because of the answer. */
  interrogation: {
    question: 'The 31 March date. What does the contract or the vendor notice actually say, and has anyone asked in writing what extended support or a paid extension would cost? I am asking whether that date has been tested or assumed.',
    answer: 'In March 2026 the programme director asked the vendor account manager whether the end-of-support date could move, and was told no. But the question asked was whether the vendor would move the product’s global end-of-life date, not whether Kelbrane could buy extended support on our own instance. Nobody has asked that question or requested a price.',
    consequence: 'Until someone does, 31 March is an assumption you are treating as a fact, and it is the assumption doing the most work in your recommendation.',
    reframe: 'You have framed this as: how do I defend the readiness call for February. That is a question about how to support a conclusion you have already reached, not a question about whether the conclusion holds.',
  },
} as const;
