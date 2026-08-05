import { useId, type ReactNode } from "react";

function Chart({
  title,
  relevance,
  description,
  children,
}: {
  title: string;
  relevance: string;
  description: string;
  children: ReactNode;
}) {
  const titleId = useId();
  const descId = useId();
  return (
    <figure className="v3-chart">
      <h3 id={titleId}>{title}</h3>
      <p className="v3-chart-relevance">{relevance}</p>
      <svg viewBox="0 0 500 250" role="img" aria-labelledby={`${titleId} ${descId}`}>
        <desc id={descId}>{description}</desc>
        {children}
      </svg>
    </figure>
  );
}

export function Visualisations() {
  return (
    <div className="v3-viz-grid">
      <Chart
        title="Option comparison"
        relevance="Two partners leads on economics; control is the accepted trade-off."
        description="Direct comparison of economics, control and speed for the three operating-model options."
      >
        <text x="8" y="32">
          Retain team
        </text>
        <text x="8" y="92">
          Two partners
        </text>
        <text x="8" y="152">
          Hybrid transfer
        </text>
        {[32, 92, 152].map((y) => (
          <line key={y} x1="116" y1={y - 4} x2="462" y2={y - 4} stroke="var(--v3-rule)" />
        ))}
        <line x1="116" y1="28" x2="262" y2="28" stroke="var(--v3-mid)" strokeWidth="7" />
        <line x1="116" y1="88" x2="414" y2="88" stroke="var(--v3-ink)" strokeWidth="7" />
        <line x1="116" y1="148" x2="354" y2="148" stroke="var(--v3-mid)" strokeWidth="7" />
        <text x="270" y="32" className="chart-note">
          Economics 42
        </text>
        <text x="422" y="92" className="chart-note">
          Economics 86
        </text>
        <text x="362" y="152" className="chart-note">
          Economics 69
        </text>
        <text x="116" y="205" className="chart-note">
          Control: retain 92 · partner 58 · hybrid 76
        </text>
        <text x="116" y="224" className="chart-note">
          Speed: retain 82 · partner 68 · hybrid 61
        </text>
      </Chart>

      <Chart
        title="Evidence strength"
        relevance="The recommendation rests on 63% confirmed evidence and one material assumption."
        description="Confidence composition showing confirmed evidence, derived analysis, assumption and unknown."
      >
        <text x="8" y="34">
          Confirmed
        </text>
        <rect x="120" y="20" width="272" height="20" fill="var(--v3-evidence)" />
        <text x="402" y="34">
          63%
        </text>
        <text x="8" y="79">
          Derived
        </text>
        <rect x="120" y="65" width="108" height="20" fill="var(--v3-mid)" />
        <text x="238" y="79">
          25%
        </text>
        <text x="8" y="124">
          Assumption
        </text>
        <rect
          x="120"
          y="110"
          width="39"
          height="20"
          fill="none"
          stroke="var(--v3-assumption)"
          strokeDasharray="4 3"
        />
        <text x="169" y="124">
          9%
        </text>
        <text x="8" y="169">
          Unknown
        </text>
        <rect x="120" y="155" width="13" height="20" fill="none" stroke="var(--v3-ink)" />
        <text x="143" y="169">
          3%
        </text>
        <text x="120" y="218" className="chart-note">
          Assumption A-03: transferred-account churn below 8%
        </text>
      </Chart>

      <Chart
        title="Decision sensitivity"
        relevance="Churn and partner ramp can reverse the recommendation."
        description="Sensitivity bars rank the variables that have the greatest effect on recommendation confidence."
      >
        <line x1="250" y1="18" x2="250" y2="206" stroke="var(--v3-ink)" />
        <text x="8" y="42">
          Transferred churn
        </text>
        <rect x="160" y="28" width="90" height="19" fill="var(--v3-risk)" />
        <rect x="250" y="28" width="156" height="19" fill="var(--v3-risk)" />
        <text x="414" y="42">
          −18 pts
        </text>
        <text x="8" y="92">
          Partner ramp
        </text>
        <rect x="184" y="78" width="66" height="19" fill="var(--v3-assumption)" />
        <rect x="250" y="78" width="124" height="19" fill="var(--v3-assumption)" />
        <text x="382" y="92">
          −14 pts
        </text>
        <text x="8" y="142">
          Unit cost
        </text>
        <rect x="216" y="128" width="34" height="19" fill="var(--v3-mid)" />
        <rect x="250" y="128" width="64" height="19" fill="var(--v3-mid)" />
        <text x="322" y="142">
          −7 pts
        </text>
        <text x="250" y="231" textAnchor="middle" className="chart-note">
          Base recommendation confidence 72%
        </text>
      </Chart>

      <Chart
        title="Scenario range"
        relevance="Only the downside partner case misses the FY27 break-even objective."
        description="Scenario ranges show annualised operating contribution under downside, base and upside cases."
      >
        <line x1="95" y1="188" x2="468" y2="188" stroke="var(--v3-ink)" />
        <line x1="274" y1="20" x2="274" y2="202" stroke="var(--v3-risk)" strokeDasharray="4 4" />
        <text x="274" y="218" textAnchor="middle" className="chart-note">
          break-even
        </text>
        <text x="8" y="51">
          Downside
        </text>
        <line x1="188" y1="47" x2="309" y2="47" stroke="var(--v3-mid)" strokeWidth="4" />
        <circle cx="245" cy="47" r="6" fill="var(--v3-risk)" />
        <text x="8" y="106">
          Base
        </text>
        <line x1="246" y1="102" x2="383" y2="102" stroke="var(--v3-mid)" strokeWidth="4" />
        <circle cx="333" cy="102" r="6" fill="var(--v3-ink)" />
        <text x="8" y="161">
          Upside
        </text>
        <line x1="304" y1="157" x2="443" y2="157" stroke="var(--v3-mid)" strokeWidth="4" />
        <circle cx="394" cy="157" r="6" fill="var(--v3-evidence)" />
        <text x="95" y="218" className="chart-note">
          −€1.2m
        </text>
        <text x="444" y="218" className="chart-note">
          +€1.2m
        </text>
        <text x="95" y="238" className="chart-note">
          Ranges include ±3 pts churn and 8–20 week ramp.
        </text>
      </Chart>

      <Chart
        title="Confidence composition"
        relevance="Evidence quality is adequate; implementation readiness is the weak layer."
        description="Four aligned measures show confidence in evidence, logic, option coverage and implementation readiness."
      >
        {[
          ["Evidence quality", 84, 38],
          ["Logic coherence", 78, 83],
          ["Option coverage", 72, 128],
          ["Implementation", 54, 173],
        ].map(([label, score, y]) => (
          <g key={String(label)}>
            <text x="8" y={Number(y) + 5}>
              {label}
            </text>
            <line
              x1="132"
              y1={Number(y)}
              x2="454"
              y2={Number(y)}
              stroke="var(--v3-rule)"
              strokeWidth="10"
            />
            <line
              x1="132"
              y1={Number(y)}
              x2={132 + (Number(score) / 100) * 322}
              y2={Number(y)}
              stroke="var(--v3-ink)"
              strokeWidth="10"
            />
            <text x="462" y={Number(y) + 5}>
              {score}
            </text>
          </g>
        ))}
        <text x="132" y="225" className="chart-note">
          Composite 72% · no arithmetic precision implied
        </text>
      </Chart>

      <Chart
        title="What would change the recommendation"
        relevance="Either threshold reopens the call; both are being tested."
        description="Threshold gauges show transferred-account churn and partner ramp against the point that changes the recommendation."
      >
        <text x="8" y="42">
          Transferred churn
        </text>
        <line x1="145" y1="38" x2="455" y2="38" stroke="var(--v3-rule)" strokeWidth="8" />
        <line x1="145" y1="38" x2="331" y2="38" stroke="var(--v3-ink)" strokeWidth="8" />
        <line x1="393" y1="22" x2="393" y2="56" stroke="var(--v3-risk)" strokeWidth="2" />
        <text x="331" y="68" className="chart-note">
          6% current assumption
        </text>
        <text x="393" y="17" textAnchor="middle" className="chart-note">
          8% threshold
        </text>
        <text x="8" y="129">
          Partner ramp
        </text>
        <line x1="145" y1="125" x2="455" y2="125" stroke="var(--v3-rule)" strokeWidth="8" />
        <line x1="145" y1="125" x2="300" y2="125" stroke="var(--v3-assumption)" strokeWidth="8" />
        <line x1="393" y1="109" x2="393" y2="143" stroke="var(--v3-risk)" strokeWidth="2" />
        <text x="300" y="155" className="chart-note">
          12 weeks assumed
        </text>
        <text x="393" y="104" textAnchor="middle" className="chart-note">
          16 week threshold
        </text>
        <text x="145" y="210" className="chart-note">
          Owner: Maya Chen · evidence due 18 August
        </text>
      </Chart>

      <Chart
        title="Decision progression over time"
        relevance="Confidence rose with account evidence, then reopened when ramp risk emerged."
        description="A directly labelled timeline traces decision confidence as evidence and challenge events occur."
      >
        <polyline
          points="30,183 118,159 206,92 294,72 382,122 470,84"
          fill="none"
          stroke="var(--v3-ink)"
          strokeWidth="2"
        />
        {(
          [
            [30, 183],
            [118, 159],
            [206, 92],
            [294, 72],
            [382, 122],
            [470, 84],
          ] as const
        ).map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x - 4} y={y - 4} width="8" height="8" fill="var(--v3-ink)" />
        ))}
        <text x="30" y="210" textAnchor="middle" className="chart-note">
          Frame
        </text>
        <text x="118" y="210" textAnchor="middle" className="chart-note">
          Criteria
        </text>
        <text x="206" y="75" textAnchor="middle" className="chart-note">
          Account evidence
        </text>
        <text x="294" y="55" textAnchor="middle" className="chart-note">
          Partner diligence
        </text>
        <text x="382" y="145" textAnchor="middle" className="chart-note">
          Ramp challenge
        </text>
        <text x="470" y="67" textAnchor="middle" className="chart-note">
          Test planned
        </text>
        <text x="30" y="232" className="chart-note">
          02 Jul
        </text>
        <text x="440" y="232" className="chart-note">
          05 Aug
        </text>
      </Chart>
    </div>
  );
}

