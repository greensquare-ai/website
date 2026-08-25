import './product-demo.css';
import { useDemoPlayback } from './useDemoPlayback';

const stages = ['Frame', 'Inspect', 'Test', 'Compare', 'Decide', 'Execute'];

const states = [
  {
    stage: 0,
    question: 'What must be true for this acquisition to be worth doing?',
    answer: 'The deal must add $12m EBITDA by FY29 without pushing leverage above 3.0x.',
    finding: 'The mandate is now bounded by value, timing and balance-sheet tolerance.',
    facts: [['Decision owner', 'Group CEO'], ['Value target', '$12m EBITDA'], ['Leverage ceiling', '3.0x']],
  },
  {
    stage: 1,
    question: 'Which part of that outcome is least supported by evidence today?',
    answer: 'Roughly 80% of the value case depends on retaining the target’s three largest customers.',
    finding: 'Customer retention, not headline valuation, is carrying most of the investment case.',
    facts: [['Decision owner', 'Group CEO'], ['Value dependency', '80% retention-led'], ['Evidence state', 'Incomplete']],
  },
  {
    stage: 2,
    question: 'What evidence do you have that those customers stay through a change of control?',
    answer: 'Two customers have renewal protections. The third can terminate on 90 days’ notice.',
    finding: 'One material customer remains an unverified, load-bearing assumption.',
    facts: [['Protected revenue', '2 of 3 accounts'], ['At-risk account', '90-day exit'], ['Load-bearing claim', 'INFERRED']],
  },
  {
    stage: 3,
    question: 'Which option reduces that exposure without giving up strategic access?',
    answer: 'Use contingent consideration tied to retained revenue rather than paying the full value on completion.',
    finding: 'The option set has changed. The live choice is now deal structure, not simply buy versus do not buy.',
    facts: [['Option A', 'Acquire now'], ['Option B', 'Structured offer'], ['Option C', 'Do not proceed']],
  },
  {
    stage: 4,
    question: 'What result would be strong enough to commit, and what would reopen the call?',
    answer: 'Proceed with a structured offer if ≥85% of top-three revenue is contractually retained through year one.',
    finding: 'The recommendation is conditional, with the evidence threshold and reversal condition carried forward.',
    facts: [['Working call', 'Structured offer'], ['Commit threshold', '≥85% retained'], ['Reopen if', 'Threshold fails']],
  },
];

export default function AdaptiveDecisionDemo() {
  const { rootRef, step, isPlaying, replay, goToStep } = useDemoPlayback({
    demoId: 'adaptive-decision',
    lastStep: states.length - 1,
    intervalMs: 1850,
  });
  const state = states[step];

  return (
    <div className="pd" data-product-demo="adaptive-decision" ref={rootRef}>
      <div className="pd__bar">
        <div className="pd__bar-group">
          <span className="pd__signal" aria-hidden="true" />
          <span>Decision Frame V2</span>
          <span className="pd__muted">Illustrative product study</span>
        </div>
        <span className="pd__muted">Strategic acquisition / synthetic scenario</span>
      </div>

      <div className="pd__grid">
        <aside className="pd__context">
          <p className="pd__eyebrow">The problem supplied to the model</p>
          <h3>Should we acquire Northstar Services?</h3>
          <p className="pd__context-copy">
            A plausible AI answer is easy. GreenSquare first determines whether the decision is sufficiently framed to answer.
          </p>
          <ul className="pd__facts" aria-label="Current decision state">
            {state.facts.map(([label, value]) => (
              <li className="pd__fact" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </li>
            ))}
          </ul>
        </aside>

        <div className="pd__work">
          <div className="pd__stage-rail" aria-label="GreenSquare decision states">
            {stages.map((stage, index) => (
              <div
                className={`pd__stage${index === state.stage ? ' is-active' : ''}${index < state.stage ? ' is-complete' : ''}`}
                key={stage}
              >
                <span className="pd__stage-index">0{index + 1}</span>
                <span className="pd__stage-name">{stage}</span>
              </div>
            ))}
          </div>

          <div className="pd__conversation">
            <p className="pd__label">State 0{state.stage + 1} / {stages[state.stage]} · GreenSquare asks next</p>
            <p className="pd__question" aria-live="polite">{state.question}</p>
            <p className="pd__answer"><strong>Operator:</strong> {state.answer}</p>
            <div className="pd__finding">
              <p className="pd__label">What changed</p>
              <p>{state.finding}</p>
            </div>
            <div className="pd__controls">
              <div className="pd__steps" aria-label="Demo sequence">
                {states.map((_, index) => (
                  <button
                    type="button"
                    className={`pd__step${index === step ? ' is-active' : ''}`}
                    aria-label={`Show decision state ${index + 1}`}
                    aria-pressed={index === step}
                    onClick={() => goToStep(index)}
                    key={index}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </button>
                ))}
              </div>
              <button type="button" className="pd__control" onClick={replay} data-demo-replay>
                {isPlaying ? 'Playing once' : 'Replay sequence'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
