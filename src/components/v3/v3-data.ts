export type DecisionNodeKind =
  | "decision"
  | "objective"
  | "context"
  | "hypothesis"
  | "option"
  | "criterion"
  | "evidence"
  | "assumption"
  | "unknown"
  | "trade-off"
  | "recommendation"
  | "risk"
  | "test"
  | "action";

export const DECISION = {
  question: "Which EU operating model should we commit to for FY27?",
  objective:
    "Reach break-even by Q4 while protecting the 25 accounts that drive 61% of EU revenue.",
  belief: "Use two specialist partners and retain strategic accounts in-house.",
  confidence: 72,
  nextAction: "Validate transferred-account churn with both partners by 18 August.",
  changesCall: "Transferred-account churn above 8% or partner ramp beyond 16 weeks.",
} as const;

export const OPTIONS = [
  {
    id: "retain",
    name: "Retain the team",
    cost: 42,
    control: 92,
    speed: 82,
    confidence: 84,
    outcome: "Best continuity, misses the break-even objective by €1.4m.",
  },
  {
    id: "partner",
    name: "Two partners",
    cost: 86,
    control: 58,
    speed: 68,
    confidence: 72,
    outcome: "Meets the objective if churn stays below 8%.",
  },
  {
    id: "hybrid",
    name: "Hybrid transfer",
    cost: 69,
    control: 76,
    speed: 61,
    confidence: 66,
    outcome: "Protects control but adds six months of operating overlap.",
  },
] as const;
export const EVIDENCE = [
  {
    id: "E-04",
    kind: "confirmed",
    claim: "61% of EU revenue sits in 25 accounts.",
    source: "FY26 account ledger",
  },
  {
    id: "E-07",
    kind: "confirmed",
    claim: "Both partners can cover the priority languages.",
    source: "Capability diligence",
  },
  {
    id: "A-03",
    kind: "assumption",
    claim: "Transferred-account churn remains below 8%.",
    source: "Planning assumption",
  },
  {
    id: "U-02",
    kind: "unknown",
    claim: "Partner ramp time for regulated accounts.",
    source: "Evidence due 18 Aug",
  },
] as const;
export const PRINCIPLES = [
  {
    title: "Structure creates capability",
    belief:
      "Good decisions begin with a clear objective, a properly framed question, explicit hypotheses and disciplined validation.",
    consequences: [
      "Put objective and decision context before detail.",
      "Keep the governing question visible.",
      "Use hierarchy, alignment and sequence before containers.",
    ],
    test: "Does the design make the work easier to understand and perform?",
    worked:
      "The decision field keeps the FY27 question fixed while evidence attaches to the claim it supports.",
    rejected: "A dashboard of activity metrics with no visible relationship to the decision.",
  },
  {
    title: "Move from reactive to deliberate",
    belief: "Every experience should reduce uncertainty and reveal a path forward.",
    consequences: [
      "Represent progress as improved decision quality.",
      "Show what changed and what happens next.",
      "Do not trap people in open-ended exploration.",
    ],
    test: "Does the user feel more capable after interacting with this?",
    worked:
      "A stress test names the threshold that reopens the recommendation and assigns the evidence action.",
    rejected: "An empty prompt field asking the user what they want to explore next.",
  },
  {
    title: "Make judgement defensible",
    belief:
      "Criteria, evidence, assumptions and trade-offs must be inspectable beside the recommendation.",
    consequences: [
      "Separate fact, assumption, interpretation and unknown.",
      "Show criteria before recommendations.",
      "Name what would change the call.",
    ],
    test: "Could another informed person inspect, challenge and understand the recommendation?",
    worked:
      "The option comparison shows that lower cost is being accepted in exchange for less direct control.",
    rejected: "A confident recommendation with evidence hidden in a later appendix.",
  },
  {
    title: "Hold the practitioner's standard",
    belief:
      "The system should withstand a consequential working session, not merely look complete.",
    consequences: [
      "Use realistic artefacts, constraints and trade-offs.",
      "Prefer specific language to broad claims.",
      "Never look more confident than the evidence allows.",
    ],
    test: "Would an experienced operator trust this in a consequential working session?",
    worked:
      "The recommendation remains conditional until partner ramp and churn evidence are validated.",
    rejected: "A polished maturity score based on invented data.",
  },
  {
    title: "Remove what does not improve judgement",
    belief: "Every sentence and visual element must reduce decision time or improve the call.",
    consequences: [
      "One governing idea per view.",
      "Use containers only for state, relationship, ownership or boundary.",
      "Disclose supporting detail progressively.",
    ],
    test: "Would removing this element reduce the user's ability to decide?",
    worked:
      "Evidence IDs appear only where provenance matters; the source detail opens on request.",
    rejected: "A subtitle beneath every heading that repeats the visible label.",
  },
] as const;

export const GRAMMAR = [
  [
    "Governing decision",
    "Fixed datum",
    "Largest open square; every branch can be traced back to it.",
  ],
  [
    "Objective",
    "North constraint",
    "Single line above the datum; never competes with the question.",
  ],
  [
    "Context",
    "Field edge",
    "Cropped annotation at the perimeter; available without entering the core.",
  ],
  [
    "Hypothesis",
    "Branch",
    "An angled claim line leaving the decision; weight reflects current support.",
  ],
  [
    "Option",
    "Parallel path",
    "Comparable paths share a baseline but may diverge in length and pressure.",
  ],
  ["Criterion", "Measure cut", "A short perpendicular mark crossing every option it evaluates."],
  ["Evidence", "Attachment", "A solid pin joins a source to one precise claim."],
  ["Assumption", "Interrupted join", "A visible gap weakens the connection it qualifies."],
  ["Unknown", "Open end", "A branch stops before resolution and carries a due point when owned."],
  ["Trade-off", "Opposing pressure", "Two inward cuts show the tension accepted between criteria."],
  ["Recommendation", "Convergence", "Supported paths narrow into a solid terminal block."],
  ["Risk", "Cross-pressure", "A diagonal cut challenges the path without replacing it."],
  ["Test", "Return loop", "A line returns from the recommendation to the claim being tested."],
  ["Next action", "Exit vector", "An owned line leaves the field with a verb and date."],
] as const;
