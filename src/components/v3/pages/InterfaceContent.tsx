import { DecisionWorkspace } from "../DecisionWorkspace";

export function InterfaceContent() {
  return (
    <>
      <section className="v3-section v3-split">
        <h2 className="v3-section-title-sm">The work stays attached to the decision.</h2>
        <p className="v3-lede">
          Select an option, inspect its sources, then stress-test the assumption that can reverse
          the call.
        </p>
      </section>
      <DecisionWorkspace />
      <section className="v3-section v3-split">
        <h2 className="v3-section-title-sm">Progressive depth</h2>
        <div className="v3-index-list">
          <div className="v3-index-row">
            <h3>First reading</h3>
            <p>Decision, active hypothesis, leading option, recommendation and next action.</p>
          </div>
          <div className="v3-index-row">
            <h3>On inspection</h3>
            <p>Evidence source, assumption owner, option criteria and decision thresholds.</p>
          </div>
          <div className="v3-index-row">
            <h3>Under challenge</h3>
            <p>Confidence change, reopened option and the evidence required to close the issue.</p>
          </div>
        </div>
      </section>
    </>
  );
}
