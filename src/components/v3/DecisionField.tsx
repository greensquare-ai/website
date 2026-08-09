import { useId, useState } from "react";
import { TextButton } from "./V3Primitives";

type Phase = "messy" | "structured" | "deciding";

const PHASES: { id: Phase; label: string }[] = [
  { id: "messy", label: "Unframed" },
  { id: "structured", label: "Structured" },
  { id: "deciding", label: "Deciding" },
];

export function DecisionField({ compact = false }: { compact?: boolean }) {
  const [phase, setPhase] = useState<Phase>("deciding");
  const titleId = useId();
  const descriptionId = useId();
  const activePhase = compact ? "deciding" : phase;

  return (
    <div>
      {!compact ? (
        <div className="v3-model-toolbar">
          <div className="v3-button-row" aria-label="Decision organisation state">
            {PHASES.map((item) => (
              <TextButton
                key={item.id}
                type="button"
                active={phase === item.id}
                onClick={() => setPhase(item.id)}
              >
                {item.label}
              </TextButton>
            ))}
          </div>
          <span className="v3-model-confidence" aria-live="polite">
            {phase === "messy"
              ? "12% structured"
              : phase === "structured"
                ? "58% structured"
                : "72% confidence"}
          </span>
        </div>
      ) : null}

      <figure
        className="v3-field"
        data-phase={activePhase}
        tabIndex={0}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <div className="field-meta v3-field-stage v3-field-stage-base">
          <span>Objective / break even by Q4 while protecting 25 strategic accounts</span>
          <span>Context / FY27 planning closes 30 September</span>
        </div>

        <figcaption className="field-intro v3-field-stage v3-field-stage-base">
          <div>
            <h3 id={titleId}>EU operating-model decision field</h3>
            <p id={descriptionId}>
              Read left to right. The governing decision opens into three options. Their evidence
              state controls which path can continue to a recommendation and action.
            </p>
          </div>
          <div className="field-legend" aria-label="Outline and colour key">
            <strong>Outline grammar</strong>
            <span><i className="field-key field-key--solid" /> Solid / confirmed structure</span>
            <span><i className="field-key field-key--dashed" /> Dashed / assumption under test</span>
            <span><i className="field-key field-key--open" /> Open / unresolved uncertainty</span>
          </div>
        </figcaption>

        <div className="field-board">
          <section className="field-column field-column--decision v3-field-stage v3-field-stage-base">
            <span className="field-step">01 / Governing decision</span>
            <div className="field-box field-box--governing">
              <h4>Which EU operating model should we commit to for FY27?</h4>
              <p>One decision. Three credible operating choices.</p>
            </div>
          </section>

          <div className="field-bridge field-bridge--solid v3-field-stage v3-field-stage-structure" aria-hidden="true" />

          <section className="field-column field-column--options v3-field-stage v3-field-stage-structure">
            <span className="field-step">02 / Options and evidence</span>
            <div className="field-option-stack">
              <article className="field-box field-box--evidence">
                <div className="field-box-head"><span>H1 / Continuity</span><em>Confirmed</em></div>
                <h4>Retain the team</h4>
                <p><strong>E-04</strong> Revenue concentration confirmed.</p>
              </article>

              <article className="field-box field-box--assumption" aria-current="true">
                <div className="field-box-head"><span>H2 / Economics</span><em>Under test</em></div>
                <h4>Two specialist partners</h4>
                <p><strong>A-03</strong> Transferred-account churn remains below 8%.</p>
              </article>

              <article className="field-box field-box--uncertainty">
                <div className="field-box-head"><span>H3 / Control</span><em>Unresolved</em></div>
                <h4>Hybrid transfer</h4>
                <p><strong>U-02</strong> Regulated-account ramp time is unknown.</p>
              </article>
            </div>
          </section>

          <div className="field-bridge field-bridge--selected v3-field-stage v3-field-stage-decision" aria-hidden="true" />

          <section className="field-column field-column--tension v3-field-stage v3-field-stage-decision">
            <span className="field-step">03 / Material trade-off</span>
            <div className="field-box field-box--tension">
              <dl>
                <div><dt>Economics</dt><dd>€1.4m annualised saving</dd></div>
                <div><dt>Control</dt><dd>Lower direct oversight</dd></div>
              </dl>
              <p>The saving is material only if A-03 holds.</p>
            </div>
          </section>

          <div className="field-bridge field-bridge--selected v3-field-stage v3-field-stage-decision" aria-hidden="true" />

          <section className="field-column field-column--outcome v3-field-stage v3-field-stage-decision">
            <span className="field-step">04 / Recommendation and action</span>
            <div className="field-outcome-stack">
              <article className="field-box field-box--recommendation">
                <div className="field-recommendation-meta"><span>Emerging recommendation</span><strong>72%</strong></div>
                <h4>Use two specialist partners. Keep strategic accounts in-house.</h4>
              </article>
              <article className="field-box field-box--action">
                <div className="field-box-head"><span>Next action</span><em>Owner / Maya</em></div>
                <h4>Validate transferred-account churn</h4>
                <p>Due 18 August.</p>
              </article>
              <article className="field-box field-box--feedback">
                <div className="field-box-head"><span>Feedback test</span><em>Returns to A-03</em></div>
                <p>If churn reaches 8%, reopen the recommendation.</p>
              </article>
            </div>
          </section>
        </div>

        <div className="field-footer v3-field-stage v3-field-stage-base">
          <span>GreenSquare AI / Decision field</span>
          <span>Open item / A-03</span>
        </div>
      </figure>
    </div>
  );
}
