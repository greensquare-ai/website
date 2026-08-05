import { DecisionField } from "../DecisionField";
import { PRINCIPLES } from "../v3-data";
import { withBase } from "../../../lib/paths";

export function HomeContent() {
  return (
    <>
      <section className="v3-section v3-split">
        <h2 className="v3-section-title-sm">From uncertainty to deliberate action</h2>
        <p className="v3-lede">
          GreenSquare keeps the question, evidence, tension and next move in one connected field.
          Detail remains available without dominating the first reading.
        </p>
      </section>

      <section className="v3-section">
        <DecisionField compact />
      </section>

      <section className="v3-section v3-split">
        <h2 className="v3-section-title-sm">The Constitution</h2>
        <ol className="v3-index-list">
          {PRINCIPLES.map((principle) => (
            <li key={principle.title}>
              <h3>{principle.title}</h3>
              <p>{principle.test}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="v3-section v3-split">
        <h2 className="v3-section-title-sm">Inspect the system</h2>
        <div className="v3-index-list">
          {[
            ["Constitution", "/v3/constitution", "The tests governing every design choice."],
            [
              "Decision grammar",
              "/v3/grammar",
              "The spatial rules connecting a decision to its working.",
            ],
            [
              "Decision model",
              "/v3/decision-model",
              "One model viewed for executives, practitioners and challengers.",
            ],
            [
              "Project-room interface",
              "/v3/interface",
              "A live decision workspace without chat or dashboard posture.",
            ],
            [
              "Applications",
              "/v3/applications",
              "The same grammar across briefs, decks, sheets and publications.",
            ],
          ].map(([title, to, description]) => (
            <a
              key={to}
              href={withBase(to)}
              className="v3-index-row"
              style={{ textDecoration: "none" }}
            >
              <h3>{title}</h3>
              <p>{description}</p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
