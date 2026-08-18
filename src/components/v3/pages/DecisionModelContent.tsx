import { DecisionModel } from "../DecisionModel";
import { DECISION } from "../v3-data";

export function DecisionModelContent() {
  return (
    <>
      <section className="v3-section v3-split">
        <h2 className="v3-section-title-sm">One model. Three lenses.</h2>
        <p className="v3-lede">
          The recommendation, working and challenge views share the same evidence state. Changing
          the lens does not create another document.
        </p>
      </section>
      <section className="v3-section">
        <DecisionModel />
      </section>
    </>
  );
}
