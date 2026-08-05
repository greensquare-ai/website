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
      <figure className="v3-field" data-phase={compact ? "deciding" : phase} tabIndex={0}>
        <svg
          viewBox="0 0 1120 620"
          role="img"
          aria-labelledby={`${titleId} ${descriptionId}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <title id={titleId}>EU operating-model Decision Field</title>
          <desc id={descriptionId}>
            A governing decision branches into hypotheses and options. Evidence attaches to claims,
            assumptions weaken connections, trade-offs create tension, and supported paths converge
            into a recommendation and next action.
          </desc>

          <g className="v3-field-stage v3-field-stage-base">
            <text x="72" y="50" className="field-code">
              OBJECTIVE / BREAK-EVEN BY Q4 · PROTECT 25 STRATEGIC ACCOUNTS
            </text>
            <path className="v3-field-line v3-field-line-muted" d="M72 68 H1048" />

            <rect className="v3-field-node" x="72" y="244" width="26" height="26" />
            <path className="v3-field-line" d="M98 257 H226" />
            <text x="72" y="217" className="field-code">
              GOVERNING DECISION
            </text>
            <text x="120" y="249" className="field-label">
              <tspan x="120" dy="0">
                Which EU operating model
              </tspan>
              <tspan x="120" dy="17">
                should we commit to for FY27?
              </tspan>
            </text>
          </g>

          <g className="v3-field-stage v3-field-stage-structure">
            <path className="v3-field-line" d="M226 257 L318 143 H472" />
            <path className="v3-field-line" d="M226 257 H472" />
            <path className="v3-field-line" d="M226 257 L318 383 H472" />

            <rect className="v3-field-node" x="472" y="131" width="24" height="24" />
            <rect className="v3-field-node" x="472" y="245" width="24" height="24" />
            <rect className="v3-field-node" x="472" y="371" width="24" height="24" />
            <text x="318" y="126" className="field-code">
              H1 / CONTINUITY
            </text>
            <text x="318" y="246" className="field-code">
              H2 / ECONOMICS
            </text>
            <text x="318" y="419" className="field-code">
              H3 / CONTROL
            </text>
            <text x="508" y="139" className="field-label">
              Retain the team
            </text>
            <text x="508" y="253" className="field-label">
              Two specialist partners
            </text>
            <text x="508" y="379" className="field-label">
              Hybrid transfer
            </text>

            <path className="v3-field-line v3-field-line-muted" d="M484 155 V202 H612" />
            <circle className="v3-field-pin" cx="484" cy="176" r="4" />
            <text x="506" y="181" className="field-note">
              E-04 · revenue concentration confirmed
            </text>

            <path className="v3-field-line v3-field-line-assumption" d="M484 269 V316 H612" />
            <rect className="v3-field-node" x="480" y="292" width="8" height="8" />
            <text x="506" y="300" className="field-note">
              A-03 · churn remains below 8%
            </text>

            <path className="v3-field-line v3-field-line-muted" d="M484 395 V452 H612" />
            <circle className="v3-field-node" cx="484" cy="426" r="5" />
            <text x="506" y="431" className="field-note">
              U-02 · regulated-account ramp
            </text>

            <path className="v3-field-line" d="M622 105 V421" />
            <path className="v3-field-line" d="M606 198 H638 M606 317 H638" />
            <text x="645" y="202" className="field-code">
              COST / CONTROL TENSION
            </text>
            <text x="645" y="217" className="field-note">
              €1.4m saving accepted for lower direct control
            </text>
          </g>

          <g className="v3-field-stage v3-field-stage-decision">
            <path className="v3-field-line v3-field-line-muted" d="M496 143 H744 L818 257" />
            <path className="v3-field-line" d="M496 257 H818" />
            <path className="v3-field-line v3-field-line-muted" d="M496 383 H744 L818 257" />
            <path className="v3-field-line v3-field-line-risk" d="M704 228 L736 260" />
            <path className="v3-field-line v3-field-line-risk" d="M704 260 L736 228" />
            <text x="690" y="215" className="field-code">
              RISK / RAMP DELAY
            </text>

            <rect
              className="v3-field-node v3-field-node-solid"
              x="818"
              y="239"
              width="36"
              height="36"
            />
            <text x="876" y="235" className="field-code">
              EMERGING RECOMMENDATION / 72%
            </text>
            <text x="876" y="258" className="field-label">
              <tspan x="876" dy="0">
                Two partners.
              </tspan>
              <tspan x="876" dy="17">
                Strategic accounts in-house.
              </tspan>
            </text>

            <path className="v3-field-line" d="M836 275 V514 H1016" />
            <rect
              className="v3-field-node v3-field-node-solid"
              x="1004"
              y="502"
              width="24"
              height="24"
            />
            <text x="836" y="548" className="field-code">
              NEXT ACTION / OWNER: MAYA / 18 AUG
            </text>
            <text x="836" y="570" className="field-label">
              Validate transferred-account churn
            </text>

            <path
              className="v3-field-line v3-field-line-risk"
              d="M1004 502 C1012 432 982 350 854 275"
            />
            <text x="935" y="415" className="field-code" transform="rotate(-70 935 415)">
              TEST RETURNS TO A-03
            </text>
          </g>

          <g className="v3-field-stage v3-field-stage-base">
            <text x="72" y="594" className="field-code">
              CONTEXT / FY27 PLANNING CLOSES 30 SEPTEMBER
            </text>
            <path className="v3-field-line v3-field-line-muted" d="M72 576 H418" />
          </g>
        </svg>
      </figure>
    </div>
  );
}
