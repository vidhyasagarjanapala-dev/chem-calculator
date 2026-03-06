import { useMemo, useState } from "react";
import api from "../services/api";

const AW = {
  H: 1.008, C: 12.011, N: 14.007, O: 15.999,
  Na: 22.99, Mg: 24.305, Al: 26.982, Si: 28.085,
  P: 30.974, S: 32.06, Cl: 35.45, K: 39.098, Ca: 40.078,
  Fe: 55.845, Cu: 63.546, Zn: 65.38
};

function molarMass(formula) {
  const cleaned = formula.trim();
  if (!cleaned) return null;

  const regex = /([A-Z][a-z]?)(\d*)/g;
  let match;
  let total = 0;
  let found = false;

  while ((match = regex.exec(cleaned)) !== null) {
    found = true;
    const el = match[1];
    const count = match[2] ? parseInt(match[2], 10) : 1;

    if (!AW[el]) return NaN;
    total += AW[el] * count;
  }

  return found ? total : null;
}

export default function MolarMass() {
  const [formula, setFormula] = useState("");
  const [message, setMessage] = useState("");

  const mass = useMemo(() => {
    return molarMass(formula);
  }, [formula]);

  const clear = () => {
    setFormula("");
    setMessage("");
  };

  const saveHistory = async () => {
    if (mass === null || Number.isNaN(mass)) {
      setMessage("Enter a valid formula first");
      return;
    }

    try {
      await api.post("/history", {
        calculatorType: "Molar Mass",
        inputs: { formula },
        result: `${mass.toFixed(4)} g/mol`,
      });

      setMessage("Saved to history successfully");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to save history");
    }
  };

  return (
    <div className="calc-page">
      <div className="calc-container">
        <div className="calc-head">
          <h1>Molar Mass Calculator</h1>
          <p>Enter a formula like H2O, NaCl, C6H12O6</p>
        </div>

        <div className="calc-card">
          <div className="calc-grid">
            <div className="calc-field">
              <label>Chemical Formula</label>
              <input
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
                type="text"
                placeholder="e.g. H2SO4"
              />
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

          {mass === null ? null : Number.isNaN(mass) ? (
            <div className="result-box">
              <h3>Result</h3>
              <p>Unknown element in formula</p>
            </div>
          ) : (
            <div className="result-box">
              <h3>Result</h3>
              <p>{mass.toFixed(4)} g/mol</p>
            </div>
          )}

          {message && <p className="note">{message}</p>}
        </div>
      </div>
    </div>
  );
}