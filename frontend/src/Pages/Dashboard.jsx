import { Link } from "react-router-dom";

export default function Dashboard() {
  const tools = [
    { title: "Molarity Calculator", desc: "M = moles / volume", path: "/molarity", icon: "🧪" },
    { title: "Molar Mass", desc: "Formula → g/mol", path: "/molarmass", icon: "⚛️" },
    { title: "Dilution Calculator", desc: "C1V1 = C2V2", path: "/dilution", icon: "💧" },
    { title: "pH Calculator", desc: "pH = -log10[H+]", path: "/ph", icon: "🧫" },
  ];

  return (
    <div className="dashboard-page">
      <div className="dash-wrap">
        <div className="dash-container">
          <div className="dash-header">
            <h1>Dashboard</h1>
            <p>Choose a calculator to start</p>
          </div>

          <div className="dash-grid">
            {tools.map((t) => (
              <Link key={t.title} to={t.path} className="dash-card">
                <div className="dash-card-top">
                  <div className="dash-icon">{t.icon}</div>
                  <div>
                    <h3>{t.title}</h3>
                    <p>{t.desc}</p>
                  </div>
                </div>

                <div className="dash-open">
                  <span>Open</span>
                  <span className="arrow">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}