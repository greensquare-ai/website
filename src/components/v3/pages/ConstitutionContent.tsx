import { PRINCIPLES } from "../v3-data";

export function ConstitutionContent() {
  return (
    <>
      {PRINCIPLES.map((principle) => (
        <section className="v3-section v3-split" key={principle.title}>
          <div>
            <h2 className="v3-section-title-sm">{principle.title}</h2>
            <p className="v3-lede" style={{ marginTop: "1.5rem" }}>
              {principle.belief}
            </p>
          </div>
          <div className="v3-index-list">
            <div className="v3-index-row">
              <h3>Design consequences</h3>
              <ul className="v3-note" style={{ margin: 0, paddingLeft: "1.15rem" }}>
                {principle.consequences.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="v3-index-row">
              <h3>Pass / fail test</h3>
              <p>{principle.test}</p>
            </div>
            <div className="v3-index-row">
              <h3>Worked</h3>
              <p>{principle.worked}</p>
            </div>
            <div className="v3-index-row">
              <h3>Rejected</h3>
              <p>{principle.rejected}</p>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
