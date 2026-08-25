import { useState } from 'react';
import './product-demo.css';
import { useDemoPlayback } from './useDemoPlayback';

type Scenario = 'current' | 'confirmed';

const criteria = [
  { label: 'Strategic control', weight: '30%', current: ['High', 'High', 'Low'], confirmed: ['High', 'High', 'Low'] },
  { label: 'Downside protection', weight: '30%', current: ['Low', 'High', 'High'], confirmed: ['Medium', 'High', 'High'] },
  { label: 'Evidence dependency', weight: '25%', current: ['High', 'Medium', 'Low'], confirmed: ['Low', 'Low', 'Low'] },
  { label: 'Reversibility', weight: '15%', current: ['Low', 'Medium', 'High'], confirmed: ['Low', 'Medium', 'High'] },
];

const options = ['Acquire now', 'Structured offer', 'Do not proceed'];

const outcomes = {
  current: {
    preferred: 1,
    label: 'Structured offer',
    reason: 'Preserves strategic access while allocating the unresolved retention risk to the consideration structure.',
  },
  confirmed: {
    preferred: 0,
    label: 'Acquire now',
    reason: 'Direct retention evidence removes the load-bearing uncertainty that previously justified contingent consideration.',
  },
};

export default function OptionScorecardDemo() {
  const [scenario, setScenario] = useState<Scenario>('current');
  const { rootRef, recordInteraction } = useDemoPlayback({ demoId: 'option-scorecard', lastStep: 0, autoplay: false });
  const outcome = outcomes[scenario];

  function changeScenario(next: Scenario) {
    setScenario(next);
    recordInteraction('evidence_scenario', { scenario: next });
  }

  return (
    <div className="pd" data-product-demo="option-scorecard" ref={rootRef}>
      <div className="pd__bar">
        <div className="pd__bar-group"><span className="pd__signal" aria-hidden="true" /><span>Decision scorecard</span></div>
        <span className="pd__muted">Criteria set before the preferred answer</span>
      </div>
      <div className="pd-score__intro">
        <div>
          <h3>The recommendation should move when the evidence moves.</h3>
        </div>
        <div>
          <p>Change one load-bearing fact. The same options and criteria remain in place; only the evidence state changes.</p>
          <div className="pd-switches" style={{ marginTop: '1rem' }} aria-label="Evidence scenario">
            <button type="button" className={`pd__switch${scenario === 'current' ? ' is-active' : ''}`} onClick={() => changeScenario('current')} aria-pressed={scenario === 'current'}>Current evidence</button>
            <button type="button" className={`pd__switch${scenario === 'confirmed' ? ' is-active' : ''}`} onClick={() => changeScenario('confirmed')} aria-pressed={scenario === 'confirmed'}>Retention confirmed</button>
          </div>
        </div>
      </div>
      <div className="pd-score" aria-live="polite">
        <div className="pd-score__grid">
          <div className="pd-score__cell is-head is-label">Criterion / weight</div>
          {options.map((option, index) => <div className={`pd-score__cell is-head${index === outcome.preferred ? ' is-preferred' : ''}`} key={option}>{option}</div>)}
          {criteria.flatMap((criterion) => {
            const values = scenario === 'current' ? criterion.current : criterion.confirmed;
            return [
              <div className="pd-score__cell is-label" key={`${criterion.label}-label`}><span className="pd-score__value">{criterion.label}</span><span className="pd-score__reason">Weight {criterion.weight}</span></div>,
              ...values.map((value, index) => (
                <div className={`pd-score__cell${index === outcome.preferred ? ' is-preferred' : ''}`} key={`${criterion.label}-${options[index]}`}>
                  <span className="pd-score__value">{value}</span>
                  <span className="pd-score__reason">{criterion.label === 'Evidence dependency' && scenario === 'current' && index === 0 ? 'Retention assumption remains exposed' : 'Assessed against the same criterion'}</span>
                </div>
              )),
            ];
          })}
        </div>
      </div>
      <div className="pd-recommendation">
        <strong>Preferred: {outcome.label}</strong>
        <p>{outcome.reason}</p>
      </div>
    </div>
  );
}
