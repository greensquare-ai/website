import { DecisionField } from "../DecisionField";
import { PRINCIPLES } from "../v3-data";
import { withBase } from "../../../lib/paths";

export function HomeContent({ basePath = "/v3" }: { basePath?: string }) {
  const designLanguageOnly = basePath === "";
  const inspectItems = [
    ["Constitution", `${basePath}/constitution`, "The tests governing every design choice."],
    ...(designLanguageOnly
      ? [
          ["Identity", `${basePath}/identity`, "The single-leaf signature, palette and placement rules."],
          ["Language and judgement", `${basePath}/language`, "Principle, test, correct example, incorrect example and explanation."],
        ]
      : []),
    ["Decision grammar", `${basePath}/grammar`, "The spatial rules connecting a decision to its working."],
    ["Decision model", `${basePath}/decision-model`, "One model viewed for executives, practitioners and challengers."],
    ...(designLanguageOnly
      ? [["Data graphics", `${basePath}/data-graphics`, "Traditional business charts with direct labels and decision annotations."]]
      : []),
    ["Project-room interface", `${basePath}/interface`, "A live decision workspace without chat or dashboard posture."],
    ["Applications", `${basePath}/applications`, "The same grammar across briefs, decks, sheets and publications."],
    ...(designLanguageOnly
      ? [["Governance", `${basePath}/governance`, "Ownership, release gates, exceptions and version control."]]
      : []),
  ];

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
          {inspectItems.map(([title, to, description]) => (
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
