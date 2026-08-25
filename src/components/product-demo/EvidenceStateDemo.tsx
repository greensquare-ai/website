import './product-demo.css';
import { useDemoPlayback } from './useDemoPlayback';

const rows = [
  { claim: 'Top three customers represent 41% of target revenue.', state: 'GIVEN', source: 'Customer concentration schedule', implication: 'Material concentration is evidenced.' },
  { claim: 'FY29 synergy case contributes $6.2m EBITDA.', state: 'DERIVED', source: 'Management case + arithmetic', implication: 'Value is modelled, not observed.' },
  { claim: 'Key customers will remain after change of control.', state: 'INFERRED', source: 'Management interviews', implication: 'Retention confidence exceeds the evidence.' },
  { claim: 'Customer 3 intends to remain through year one.', state: 'UNKNOWN', source: 'No direct evidence', implication: 'Load-bearing gap before commitment.' },
];

export default function EvidenceStateDemo() {
  const { rootRef, step, replay, goToStep } = useDemoPlayback({
    demoId: 'evidence-state',
    lastStep: rows.length - 1,
    intervalMs: 1150,
  });

  return (
    <div className="pd pd-evidence" data-product-demo="evidence-state" ref={rootRef}>
      <div className="pd__bar">
        <div className="pd__bar-group"><span className="pd__signal" aria-hidden="true" /><span>Evidence state</span></div>
        <span className="pd__muted">Meaning remains explicit without colour</span>
      </div>
      <div className="pd-evidence__intro">
        <h3>A polished claim is not the same thing as a known fact.</h3>
        <p>GreenSquare keeps the provenance of material claims visible so an operator can inspect what the recommendation actually rests on.</p>
      </div>
      <table className="pd-table pd-evidence__table">
        <thead>
          <tr>
            <th style={{ width: '32%' }}>Material claim</th>
            <th style={{ width: '14%' }}>State</th>
            <th style={{ width: '22%' }}>Basis</th>
            <th>Decision implication</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr className={`${index > step ? 'is-pending ' : ''}${index === rows.length - 1 && step === rows.length - 1 ? 'is-load-bearing' : ''}`} key={row.claim}>
              <td>{row.claim}</td>
              <td><span className="pd-state">{index <= step ? row.state : '—'}</span></td>
              <td>{index <= step ? row.source : 'Awaiting classification'}</td>
              <td>{index <= step ? row.implication : 'Not yet assessed'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pd-evidence-mobile" aria-live="polite">
        {rows.map((row, index) => (
          <article className={`pd-evidence-mobile__record${index > step ? ' is-pending' : ''}${index === rows.length - 1 && step === rows.length - 1 ? ' is-load-bearing' : ''}`} key={row.claim}>
            <div className="pd-evidence-mobile__head">
              <span>Claim 0{index + 1}</span>
              <strong>{index <= step ? row.state : 'Awaiting'}</strong>
            </div>
            <p className="pd-evidence-mobile__claim">{row.claim}</p>
            <dl className="pd-evidence-mobile__detail">
              <div><dt>Basis</dt><dd>{index <= step ? row.source : 'Awaiting classification'}</dd></div>
              <div><dt>Implication</dt><dd>{index <= step ? row.implication : 'Not yet assessed'}</dd></div>
            </dl>
          </article>
        ))}
      </div>
      <div className="pd__footer-note">
        <p><strong>Decision condition:</strong> validate Customer 3 before an unconditional commitment.</p>
        <div className="pd__steps" aria-label="Evidence sequence">
          {rows.map((_, index) => (
            <button type="button" className={`pd__step${index === step ? ' is-active' : ''}`} onClick={() => goToStep(index)} aria-label={`Reveal evidence state ${index + 1}`} aria-pressed={index === step} key={index}>{String(index + 1).padStart(2, '0')}</button>
          ))}
          <button type="button" className="pd__control" onClick={replay}>Replay</button>
        </div>
      </div>
    </div>
  );
}
