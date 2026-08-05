import { useState, type KeyboardEvent } from "react";
import { DECISION, EVIDENCE, OPTIONS } from "./v3-data";
import { StateMark, TextButton } from "./V3Primitives";

type Lens = "summary" | "working" | "review";

const LENSES: { id: Lens; label: string }[] = [
  { id: "summary", label: "Executive summary" },
  { id: "working", label: "Working analysis" },
  { id: "review", label: "Review / challenge" },
];

export function DecisionModel() {
  const [lens, setLens] = useState<Lens>("summary");

  const moveLens = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % LENSES.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + LENSES.length) % LENSES.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = LENSES.length - 1;
    else return;

    event.preventDefault();
    const nextLens = LENSES[nextIndex];
    if (!nextLens) return;
    setLens(nextLens.id);
    document.getElementById(`model-tab-${nextLens.id}`)?.focus();
  };

  return (
    <section className="v3-model-shell" aria-label="Interactive Decision Model">
      <div className="v3-model-toolbar">
        <div className="v3-button-row" role="tablist" aria-label="Decision model lens">
          {LENSES.map((item, index) => (
            <TextButton
              key={item.id}
              id={`model-tab-${item.id}`}
              type="button"
              role="tab"
              active={lens === item.id}
              aria-selected={lens === item.id}
              aria-controls={`model-panel-${item.id}`}
              tabIndex={lens === item.id ? 0 : -1}
              onClick={() => setLens(item.id)}
              onKeyDown={(event) => moveLens(event, index)}
            >
              {item.label}
            </TextButton>
          ))}
        </div>
        <span className="v3-model-confidence">MODEL / EU-OM-27.4</span>
      </div>

      {lens === "summary" ? (
        <div
          id="model-panel-summary"
          className="v3-model-view v3-model-summary"
          role="tabpanel"
          aria-labelledby="model-tab-summary"
        >
          <div>
            <StateMark kind="recommendation" label="Emerging recommendation · 72%" />
            <h2 className="v3-model-call">{DECISION.belief}</h2>
          </div>
          <dl className="v3-model-side">
            <div>
              <dt>Trade-off accepted</dt>
              <dd>Lower direct control in exchange for €1.4m annualised savings.</dd>
            </div>
            <div>
              <dt>Material uncertainty</dt>
              <dd>{DECISION.changesCall}</dd>
            </div>
            <div>
              <dt>Next action</dt>
              <dd>{DECISION.nextAction}</dd>
            </div>
          </dl>
        </div>
      ) : null}

      {lens === "working" ? (
        <div
          id="model-panel-working"
          className="v3-model-view v3-working-grid"
          role="tabpanel"
          aria-labelledby="model-tab-working"
        >
          <div>
            <h2 className="v3-section-title-sm">Options under the same criteria</h2>
            <div className="v3-table-wrap" style={{ marginTop: "1.5rem" }}>
              <table className="v3-table">
                <thead>
                  <tr>
                    <th scope="col">Option</th>
                    <th scope="col">Economics</th>
                    <th scope="col">Control</th>
                    <th scope="col">Speed</th>
                    <th scope="col">Current reading</th>
                  </tr>
                </thead>
                <tbody>
                  {OPTIONS.map((option) => (
                    <tr key={option.id}>
                      <td>{option.name}</td>
                      <td className="v3-score">{option.cost}</td>
                      <td className="v3-score">{option.control}</td>
                      <td className="v3-score">{option.speed}</td>
                      <td>{option.outcome}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h2 className="v3-section-title-sm">Claim attachments</h2>
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
          </div>
        </div>
      ) : null}

      {lens === "review" ? (
        <div
          id="model-panel-review"
          className="v3-model-view"
          role="tabpanel"
          aria-labelledby="model-tab-review"
        >
          <div className="v3-review-band">
            <StateMark kind="risk" label="Challenge 02 · material" />
            <h2>What if regulated accounts take 20 weeks to transfer?</h2>
          </div>
          <div className="v3-split" style={{ paddingTop: "2.5rem" }}>
            <div>
              <StateMark kind="assumption" label="A-03 weakens" />
            </div>
            <div className="v3-index-list">
              <div className="v3-index-row">
                <h3>Recommendation effect</h3>
                <p>
                  Confidence falls from 72% to 54%. The hybrid transfer becomes the leading option.
                </p>
              </div>
              <div className="v3-index-row">
                <h3>Evidence required</h3>
                <p>Partner cohort ramp by regulatory segment, not the blended average.</p>
              </div>
              <div className="v3-index-row">
                <h3>Decision threshold</h3>
                <p>Above 16 weeks, retain a six-person transition team for two quarters.</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
