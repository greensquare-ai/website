import { useMemo, useState, type CSSProperties } from "react";
import { DECISION, EVIDENCE, OPTIONS } from "./v3-data";
import { StateMark, TextButton } from "./V3Primitives";

export function DecisionWorkspace() {
  const [selectedId, setSelectedId] = useState<(typeof OPTIONS)[number]["id"]>("partner");
  const [challenge, setChallenge] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const selected = useMemo(
    () => OPTIONS.find((option) => option.id === selectedId) ?? OPTIONS[1],
    [selectedId],
  );
  const confidence = challenge ? Math.max(selected.confidence - 18, 30) : selected.confidence;

  return (
    <section className="v3-workspace" data-challenge={challenge ? "true" : undefined}>
      <header className="v3-workspace-head">
        <div>
          <p className="v3-workspace-stage">
            {challenge
              ? "Test / recommendation reopened"
              : "Compare / partner option under pressure"}
          </p>
          <h2>{DECISION.question}</h2>
        </div>
        <div className="v3-workspace-controls">
          <TextButton
            type="button"
            active={showSources}
            onClick={() => setShowSources((value) => !value)}
          >
            {showSources ? "Hide sources" : "Inspect sources"}
          </TextButton>
          <TextButton
            type="button"
            active={challenge}
            onClick={() => setChallenge((value) => !value)}
          >
            {challenge ? "Close challenge" : "Stress-test"}
          </TextButton>
        </div>
      </header>

      <div className="v3-workspace-body">
        <div className="v3-room">
          <div className="v3-room-question">
            <p>{challenge ? "Question that could reverse the call" : "Active hypothesis"}</p>
            <h3>
              {challenge
                ? "Can either partner transfer regulated accounts inside 16 weeks?"
                : "Two partners can meet the cost objective without material strategic-account churn."}
            </h3>
          </div>

          <div className="v3-option-field" aria-label="Options compared on decision fit">
            {OPTIONS.map((option) => {
              const score = challenge && option.id === "partner" ? 54 : option.confidence;
              const barStyle = { "--score": `${score}%` } as CSSProperties;
              return (
                <button
                  key={option.id}
                  type="button"
                  className="v3-option-row"
                  data-leading={selectedId === option.id ? "true" : undefined}
                  onClick={() => setSelectedId(option.id)}
                  aria-pressed={selectedId === option.id}
                >
                  <span className="v3-option-name">{option.name}</span>
                  <span className="v3-option-bar" aria-hidden>
                    <span style={barStyle} />
                  </span>
                  <span className="v3-option-score">{score}</span>
                </button>
              );
            })}
          </div>

          <div className="v3-room-evidence">
            <StateMark kind="evidence" label="2 confirmed" />
            <StateMark kind="assumption" label="1 material assumption" />
            <StateMark kind="unknown" label="1 owned unknown" />
            {challenge ? <StateMark kind="risk" label="Ramp threshold breached" /> : null}
          </div>

          {showSources ? (
            <ul className="v3-claim-list" style={{ marginTop: "1.5rem" }}>
              {EVIDENCE.map((item) => (
                <li key={item.id}>
                  <span className="v3-claim-id">{item.id}</span>
                  <span>
                    <strong>{item.claim}</strong>
                    <p>{item.source}</p>
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <aside className="v3-room-dock" aria-label="Emerging recommendation">
          <StateMark
            kind={challenge ? "risk" : "recommendation"}
            label={`${challenge ? "Reopened" : "Emerging recommendation"} · ${confidence}%`}
          />
          <h3 className="v3-dock-call" style={{ marginTop: "1rem" }}>
            {challenge
              ? "Use a hybrid transfer until partner ramp is evidenced."
              : selected.id === "partner"
                ? DECISION.belief
                : selected.outcome}
          </h3>

          <dl className="v3-dock-meta">
            <div>
              <dt>Supporting belief</dt>
              <dd>{selected.outcome}</dd>
            </div>
            <div>
              <dt>Trade-off accepted</dt>
              <dd>
                {selected.id === "partner"
                  ? "Less direct control for €1.4m annualised savings."
                  : "Economics traded for continuity and control."}
              </dd>
            </div>
            <div>
              <dt>What would change the call</dt>
              <dd>{DECISION.changesCall}</dd>
            </div>
          </dl>

          <div className="v3-dock-action">
            <span className="v3-focus">Next action / Maya Chen / 18 Aug</span>
            <strong>
              {challenge
                ? "Request regulated-account ramp cohorts from both partners."
                : DECISION.nextAction}
            </strong>
          </div>
        </aside>
      </div>
    </section>
  );
}
