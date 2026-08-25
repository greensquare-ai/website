import './product-demo.css';
import { useDemoPlayback } from './useDemoPlayback';

const nodes = [
  { label: 'Call', title: 'Pursue a structured offer', body: 'Do not pay the full value case before retention is evidenced.' },
  { label: 'Action', title: 'Secure customer evidence', body: 'Obtain direct retention evidence from the three accounts carrying the value case.' },
  { label: 'Owner', title: 'Deal lead + commercial lead', body: 'One owner for the transaction structure, one for the evidence-producing action.' },
  { label: 'Threshold', title: '≥85% retained revenue', body: 'Commit only when year-one retention is contractually supported at or above the threshold.' },
  { label: 'Review', title: 'Reopen before signing', body: 'If the threshold fails, reprice, restructure or stop rather than carrying the gap forward.' },
];

export default function ExecutionPathDemo() {
  const { rootRef, step, replay, goToStep } = useDemoPlayback({
    demoId: 'execution-path',
    lastStep: nodes.length - 1,
    intervalMs: 1050,
  });

  return (
    <div className="pd" data-product-demo="execution-path" ref={rootRef}>
      <div className="pd__bar">
        <div className="pd__bar-group"><span className="pd__signal" aria-hidden="true" /><span>Decision → execution</span></div>
        <span className="pd__muted">A decision is not finished at the recommendation</span>
      </div>
      <div className="pd-execution__intro">
        <h3>Uncertainty becomes a managed decision condition.</h3>
        <p>When the final commitment depends on evidence that does not yet exist, GreenSquare specifies how that evidence will be produced, what threshold is sufficient and when the call must be reopened.</p>
      </div>
      <div className="pd-execution__path" aria-live="polite">
        {nodes.map((node, index) => (
          <div className={`pd-execution__node${index > step ? ' is-pending' : ''}${index === step ? ' is-current' : ''}`} key={node.label}>
            <span className="pd-execution__node-index">0{index + 1} / {node.label}</span>
            <h4>{node.title}</h4>
            <p>{node.body}</p>
          </div>
        ))}
      </div>
      <div className="pd-execution__condition">
        <strong>Reversal condition:</strong> if retained top-three revenue is below 85%, the current recommendation expires and the deal is reconsidered before signing.
      </div>
      <div className="pd__footer-note">
        <p>Execution remains proportionate to the decision. No vague “gather more information” endpoint.</p>
        <div className="pd__steps" aria-label="Execution sequence">
          {nodes.map((_, index) => (
            <button type="button" className={`pd__step${index === step ? ' is-active' : ''}`} onClick={() => goToStep(index)} aria-label={`Show execution state ${index + 1}`} aria-pressed={index === step} key={index}>{String(index + 1).padStart(2, '0')}</button>
          ))}
          <button type="button" className="pd__control" onClick={replay}>Replay</button>
        </div>
      </div>
    </div>
  );
}
