import { ApplicationSpecimens } from "../ApplicationSpecimens";
import { Visualisations } from "../Visualisations";

export function ApplicationsContent({ expanded = false }: { expanded?: boolean }) {
  return (
    <>
      {expanded && <section className="v3-section application-standards">
        <div className="v3-split">
          <div>
            <span className="identity-kicker">Approved templates</span>
            <h2 className="v3-section-title-sm">The medium changes. The decision anatomy does not.</h2>
          </div>
          <p className="v3-lede">
            Every application preserves the governing question, recommendation, evidence state,
            material uncertainty and owned next action. Format changes density—not meaning.
          </p>
        </div>
        <div className="application-template-table" role="table" aria-label="Application template requirements">
          <div className="application-template-row application-template-row--head" role="row"><span>Template</span><span>Required anatomy</span><span>Default use</span></div>
          <div className="application-template-row" role="row"><strong>Executive brief</strong><span>Decision sentence · rationale · trade-off · open point · owner/date</span><span>Approval and circulation</span></div>
          <div className="application-template-row" role="row"><strong>Strategy slide</strong><span>Answer-first title · one visual proof · implication · source</span><span>Executive discussion</span></div>
          <div className="application-template-row" role="row"><strong>Working sheet</strong><span>Question · criteria · evidence · assumptions · test</span><span>Team analysis</span></div>
          <div className="application-template-row" role="row"><strong>Decision room</strong><span>Status · competing options · challenge · activity · next gate</span><span>Live collaboration</span></div>
          <div className="application-template-row" role="row"><strong>Publication</strong><span>Claim · evidence trail · method · limitations · action</span><span>External point of view</span></div>
        </div>
      </section>}
      <section className="v3-section">
        <ApplicationSpecimens />
      </section>
      <section className="v3-section">
        <div className="v3-split" style={{ marginBottom: "3rem" }}>
          <h2 className="v3-section-title-sm">Decision visualisations</h2>
          <p className="v3-lede">
            Direct labels, material uncertainty and the threshold that changes the recommendation.
          </p>
        </div>
        <Visualisations />
      </section>
    </>
  );
}
