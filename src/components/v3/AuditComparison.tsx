import { useState } from "react";
import { TextButton } from "./V3Primitives";

const VERSIONS = {
  v1: {
    name: "V1: design-language manual",
    thesis: "Comprehensive and inspectable, but every rule competes at the same depth.",
    scores: [64, 38, 24, 34, 51, 46, 58, "75 sec"],
    strengths: "Evidence notation, complete foundations, accessible implementation.",
    weakness: "Container density and documentation posture obscure the governing decision.",
  },
  v2: {
    name: "V2: Decision Spine",
    thesis: "Lighter and more directional, but still describes a familiar linear process.",
    scores: [78, 66, 58, 55, 68, 61, 70, "42 sec"],
    strengths: "Variable density, negative space, clearer recommendation emphasis.",
    weakness: "Editorial SaaS rhythm and horizontal sequence remain the primary identity.",
  },
  v3: {
    name: "V3: Decision Field",
    thesis: "A connected decision model whose identity survives without name or accent colour.",
    scores: [91, 82, 79, 86, 91, 88, 89, "18 sec"],
    strengths:
      "Decision continuity, visible uncertainty, challenge behaviour and cross-medium grammar.",
    weakness:
      "Dense working views require usability testing with non-consulting users; the current case is deterministic.",
  },
} as const;

const DIMENSIONS = [
  "Hierarchy",
  "Variable density",
  "Purposeful containers",
  "Distinctiveness",
  "Decision clarity",
  "Evidence visibility",
  "User capability",
  "Time to comprehension",
];

export function AuditComparison() {
  const [version, setVersion] = useState<keyof typeof VERSIONS>("v3");
  const current = VERSIONS[version];

  return (
    <>
      <section className="v3-section">
        <div className="v3-model-toolbar">
          <div className="v3-button-row" aria-label="Version to inspect">
            {(Object.keys(VERSIONS) as (keyof typeof VERSIONS)[]).map((item) => (
              <TextButton
                key={item}
                type="button"
                active={version === item}
                onClick={() => setVersion(item)}
              >
                {item.toUpperCase()}
              </TextButton>
            ))}
          </div>
          <span className="v3-model-confidence">Internal audit · August 2026</span>
        </div>
        <div className="v3-model-view v3-model-summary">
          <div>
            <h2 className="v3-model-call">{current.name}</h2>
            <p className="v3-lede" style={{ marginTop: "2rem" }}>
              {current.thesis}
            </p>
          </div>
          <dl className="v3-model-side">
            <div>
              <dt>Worth retaining</dt>
              <dd>{current.strengths}</dd>
            </div>
            <div>
              <dt>Material weakness</dt>
              <dd>{current.weakness}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="v3-section v3-split">
        <h2 className="v3-section-title-sm">Comparative reading</h2>
        <div className="v3-table-wrap">
          <table className="v3-table">
            <thead>
              <tr>
                <th scope="col">Dimension</th>
                <th scope="col">V1</th>
                <th scope="col">V2</th>
                <th scope="col">V3</th>
              </tr>
            </thead>
            <tbody>
              {DIMENSIONS.map((dimension, index) => (
                <tr key={dimension}>
                  <td>{dimension}</td>
                  <td className="v3-score">{VERSIONS.v1.scores[index]}</td>
                  <td className="v3-score">{VERSIONS.v2.scores[index]}</td>
                  <td className="v3-score">{VERSIONS.v3.scores[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="v3-section v3-split">
        <h2 className="v3-section-title-sm">Remaining weaknesses</h2>
        <div className="v3-index-list">
          <div className="v3-index-row">
            <h3>Learnability</h3>
            <p>
              The field grammar is new. First-use comprehension must be tested with users who do not
              work in consulting or transformation.
            </p>
          </div>
          <div className="v3-index-row">
            <h3>Content breadth</h3>
            <p>
              The EU case proves one strategic decision. Portfolio, investment and implementation
              decisions may expose missing grammar.
            </p>
          </div>
          <div className="v3-index-row">
            <h3>Interaction depth</h3>
            <p>
              V3 demonstrates real state change but does not yet persist models, ingest evidence or
              support live collaboration.
            </p>
          </div>
          <div className="v3-index-row">
            <h3>Typography delivery</h3>
            <p>
              Remote font delivery should be self-hosted before production use in sensitive
              environments.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
