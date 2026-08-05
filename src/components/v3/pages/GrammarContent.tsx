import { DecisionField } from "../DecisionField";
import { GRAMMAR } from "../v3-data";

export function GrammarContent() {
  return (
    <>
      <section className="v3-section">
        <DecisionField />
      </section>

      <section className="v3-section v3-split">
        <h2 className="v3-section-title-sm">Spatial contract</h2>
        <div className="v3-table-wrap">
          <table className="v3-table">
            <thead>
              <tr>
                <th scope="col">Concept</th>
                <th scope="col">Role</th>
                <th scope="col">Expression</th>
              </tr>
            </thead>
            <tbody>
              {GRAMMAR.map(([concept, role, expression]) => (
                <tr key={concept}>
                  <td>{concept}</td>
                  <td>{role}</td>
                  <td>{expression}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="v3-section v3-split">
        <div>
          <h2 className="v3-section-title-sm">Primary type test</h2>
          <p className="v3-note" style={{ marginTop: "1rem" }}>
            Source Sans 3 is selected for executive reading, numerical clarity and useful density
            across product, decks and publications.
          </p>
        </div>
        <div className="v3-type-test">
          <div className="v3-type-row">
            <strong>Source Sans 3 / selected</strong>
            <p>Transferred-account churn changes the call above 8%.</p>
          </div>
          <div className="v3-type-row v3-type-literata">
            <strong>Literata / rejected</strong>
            <p>Transferred-account churn changes the call above 8%.</p>
          </div>
          <div className="v3-type-row v3-type-manrope">
            <strong>Manrope / rejected</strong>
            <p>Transferred-account churn changes the call above 8%.</p>
          </div>
        </div>
      </section>

      <section className="v3-section v3-split">
        <h2 className="v3-section-title-sm">Colour is corroboration</h2>
        <div className="v3-index-list">
          <div className="v3-index-row">
            <h3>Active reasoning</h3>
            <p>
              Cobalt sharpens the current question; position and weight carry the same meaning in
              greyscale.
            </p>
          </div>
          <div className="v3-index-row">
            <h3>Confirmed evidence</h3>
            <p>
              Teal uses a solid attachment. Assumptions use ochre and a broken join. Risk uses red
              and a crossing cut.
            </p>
          </div>
          <div className="v3-index-row">
            <h3>Recommendation</h3>
            <p>Ink, convergence and a filled terminal block. No accent colour is required.</p>
          </div>
        </div>
      </section>
    </>
  );
}
