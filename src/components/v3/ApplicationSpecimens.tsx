import { StateMark } from "./V3Primitives";

export function ApplicationSpecimens() {
  return (
    <div className="v3-app-stack">
      <figure className="v3-app-specimen">
        <figcaption>
          <span>Homepage</span>
          <span>Responsive digital</span>
        </figcaption>
        <div className="v3-mini-home">
          <div>
            <span className="v3-focus">GreenSquare AI decision capability</span>
            <h3>Make the next move defensible.</h3>
          </div>
          <div>
            <StateMark kind="unknown" label="Start with the open question" />
            <blockquote>Which decision is currently consuming more time than it should?</blockquote>
          </div>
        </div>
      </figure>

      <figure className="v3-app-specimen">
        <figcaption>
          <span>Executive Decision Brief</span>
          <span>Digital and print</span>
        </figcaption>
        <div className="v3-brief-sheet">
          <span className="v3-focus">Decision brief · EU-OM-27.4 · 5 August 2026</span>
          <h3>Use two partners and retain strategic accounts in-house.</h3>
          <div className="v3-index-list">
            <div className="v3-index-row">
              <h3>Why this option</h3>
              <p>
                Meets the Q4 break-even objective while containing continuity risk around the 25
                accounts that drive 61% of revenue.
              </p>
            </div>
            <div className="v3-index-row">
              <h3>Trade-off accepted</h3>
              <p>Lower direct control in exchange for €1.4m annualised savings.</p>
            </div>
            <div className="v3-index-row">
              <h3>What remains open</h3>
              <p>Transferred-account churn and regulated-account ramp.</p>
            </div>
            <div className="v3-index-row">
              <h3>Action</h3>
              <p>Validate both thresholds with partners by 18 August.</p>
            </div>
          </div>
        </div>
      </figure>

      <figure className="v3-app-specimen">
        <figcaption>
          <span>Strategy slide</span>
          <span>16:9</span>
        </figcaption>
        <div className="v3-slide">
          <div>
            <span className="v3-focus" style={{ color: "rgba(255,255,255,.72)" }}>
              Conditional recommendation
            </span>
            <h3 style={{ marginTop: "2rem" }}>
              Partner-led delivery meets the economic objective.
            </h3>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          >
            <p style={{ margin: 0, maxWidth: "28ch", lineHeight: 1.45 }}>
              Retain the 25 strategic accounts. Transfer the remaining portfolio across two
              specialist partners.
            </p>
            <p style={{ margin: 0, fontSize: ".78rem" }}>
              Call changes above 8% churn or 16-week ramp.
            </p>
          </div>
        </div>
      </figure>

      <figure className="v3-app-specimen">
        <figcaption>
          <span>Working sheet</span>
          <span>A4</span>
        </figcaption>
        <div className="v3-a4">
          <span className="v3-focus">Decision working sheet · EU operating model</span>
          <h3 className="v3-section-title-sm" style={{ marginTop: "1.5rem" }}>
            What must be true for the partner option to work?
          </h3>
          <div className="v3-a4-grid">
            <div>
              <strong>Objective</strong>
            </div>
            <div>
              <strong>Decision criteria</strong>
            </div>
            <div>
              <strong>Evidence</strong>
            </div>
            <div>
              <strong>Assumptions</strong>
            </div>
            <div>
              <strong>Trade-off</strong>
            </div>
            <div>
              <strong>Test and owner</strong>
            </div>
          </div>
        </div>
      </figure>

      <figure className="v3-app-specimen">
        <figcaption>
          <span>Decision review</span>
          <span>Challenge mode</span>
        </figcaption>
        <div className="v3-review-band" style={{ padding: "3rem 0" }}>
          <StateMark kind="risk" label="Material challenge" />
          <h2>Would the recommendation survive a 20-week regulated-account ramp?</h2>
          <div className="v3-split" style={{ marginTop: "2rem" }}>
            <p className="v3-note">
              No. Confidence falls to 54% and the hybrid transfer becomes the leading option.
            </p>
            <p className="v3-note">
              Required evidence: ramp cohorts by regulatory segment. Owner: Maya Chen. Due: 18
              August.
            </p>
          </div>
        </div>
      </figure>

      <figure className="v3-app-specimen">
        <figcaption>
          <span>Data visualisation</span>
          <span>Decision sensitivity</span>
        </figcaption>
        <div className="v3-chart" style={{ maxWidth: "58rem" }}>
          <h3>Churn and ramp can reverse the recommendation</h3>
          <svg
            viewBox="0 0 700 250"
            role="img"
            aria-label="Sensitivity of recommendation confidence to churn, partner ramp and unit cost"
          >
            <line x1="350" y1="18" x2="350" y2="206" stroke="var(--v3-ink)" />
            <text x="8" y="45">
              Transferred churn
            </text>
            <rect x="210" y="30" width="140" height="20" fill="var(--v3-risk)" />
            <rect x="350" y="30" width="218" height="20" fill="var(--v3-risk)" />
            <text x="580" y="45">
              −18 pts
            </text>
            <text x="8" y="105">
              Partner ramp
            </text>
            <rect x="248" y="90" width="102" height="20" fill="var(--v3-assumption)" />
            <rect x="350" y="90" width="174" height="20" fill="var(--v3-assumption)" />
            <text x="536" y="105">
              −14 pts
            </text>
            <text x="8" y="165">
              Unit cost
            </text>
            <rect x="300" y="150" width="50" height="20" fill="var(--v3-mid)" />
            <rect x="350" y="150" width="90" height="20" fill="var(--v3-mid)" />
            <text x="452" y="165">
              −7 pts
            </text>
            <text x="350" y="230" textAnchor="middle" className="chart-note">
              Base confidence 72% · ranges include stated scenario assumptions
            </text>
          </svg>
        </div>
      </figure>

      <figure className="v3-app-specimen">
        <figcaption>
          <span>Publication cover</span>
          <span>Decision Review · Issue 4</span>
        </figcaption>
        <div className="v3-cover">
          <div className="v3-cover-masthead">
            <strong>GreenSquare AI</strong>
            <span>Decision Review</span>
          </div>
          <h3>
            <span>The assumption</span>
            <span>that changes</span>
            <span>the call.</span>
          </h3>
          <div className="v3-cover-signature" aria-hidden="true">
            <span></span>
            <img src="/assets/logo.svg" alt="" />
          </div>
          <div className="v3-cover-meta">
            <span>Issue 4</span>
            <span>Decision quality</span>
          </div>
        </div>
      </figure>
    </div>
  );
}
