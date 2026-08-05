import { ApplicationSpecimens } from "../ApplicationSpecimens";
import { Visualisations } from "../Visualisations";

export function ApplicationsContent() {
  return (
    <>
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
