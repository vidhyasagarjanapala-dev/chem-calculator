import { useMemo, useState } from "react";
import api from "../services/api";

export default function Dilution() {

  const [c1, setC1] = useState("");
  const [c2, setC2] = useState("");
  const [v2, setV2] = useState("");
  const [unit, setUnit] = useState("mL");
  const [message, setMessage] = useState("");

  const v1 = useMemo(() => {
    const C1 = parseFloat(c1);
    const C2 = parseFloat(c2);
    const V2 = parseFloat(v2);

    if (!isFinite(C1) || !isFinite(C2) || !isFinite(V2) || C1 <= 0) return null;

    return (C2 * V2) / C1;
  }, [c1, c2, v2]);

  const clear = () => {
    setC1("");
    setC2("");
    setV2("");
    setUnit("mL");
    setMessage("");
  };

  const saveHistory = async () => {

    if (v1 === null) {
      setMessage("Enter valid values first");
      return;
    }

    try {

      await api.post("/history", {
        calculatorType: "Dilution",
        inputs: {
          C1: c1,
          C2: c2,
          V2: v2,
          unit
        },
        result: `${v1.toFixed(4)} ${unit}`
      });

      setMessage("Saved to history successfully");

    } catch (error) {

      setMessage("Failed to save history");

    }

  };

  return (
    <div className="calc-page">
      <div className="calc-container">

        <div className="calc-head">
          <h1>Dilution Calculator</h1>
          <p>Calculate required stock solution volume</p>
        </div>

        <div className="calc-card">

          <div className="calc-grid">

            <div className="calc-field">
              <label>C1 (Stock Concentration)</label>
              <input
                value={c1}
                onChange={(e) => setC1(e.target.value)}
                type="number"
                step="any"
                placeholder="e.g. 2"
              />
            </div>

            <div className="calc-field">
              <label>C2 (Final Concentration)</label>
              <input
                value={c2}
                onChange={(e) => setC2(e.target.value)}
                type="number"
                step="any"
                placeholder="e.g. 0.5"
              />
            </div>

            <div className="calc-field">
              <label>V2 (Final Volume)</label>
              <input
                value={v2}
                onChange={(e) => setV2(e.target.value)}
                type="number"
                step="any"
                placeholder="e.g. 100"
              />
            </div>

            <div className="calc-field">
              <label>Volume Unit</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                <option>mL</option>
                <option>L</option>
              </select>
            </div>

          </div>

          <div className="calc-actions">

            <button
              className="btn btn-primary"
              type="button"
              onClick={saveHistory}
            >
              Save Result
            </button>

            <button
              className="btn btn-ghost"
              type="button"
              onClick={clear}
            >
              Clear
            </button>

          </div>

          {v1 !== null && (
            <div className="result-box">
              <h3>Required Stock Volume (V1)</h3>
              <p>{v1.toFixed(4)} {unit}</p>
            </div>
          )}

          {message && (
            <p className="note">{message}</p>
          )}

        </div>

      </div>
    </div>
  );
}