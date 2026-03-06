import { useMemo, useState } from "react";
import api from "../services/api";

export default function Ph() {
  const [h, setH] = useState("");
  const [message, setMessage] = useState("");

  const ph = useMemo(() => {
    const H = parseFloat(h);
    if (!isFinite(H) || H <= 0) return null;
    return -Math.log10(H);
  }, [h]);

  const clear = () => {
    setH("");
    setMessage("");
  };

  const saveHistory = async () => {
    if (ph === null) {
      setMessage("Enter a valid hydrogen ion concentration first");
      return;
    }

    try {
      await api.post("/history", {
        calculatorType: "pH",
        inputs: {
          hydrogenIonConcentration: h,
        },
        result: `pH = ${ph.toFixed(4)}`,
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
          <h1>pH Calculator</h1>
          <p>Calculate pH using pH = -log10[H+]</p>
        </div>

        <div className="calc-card">
          <div className="calc-grid">
            <div className="calc-field">
              <label>[H+] Concentration (mol/L)</label>
              <input
                value={h}
                onChange={(e) => setH(e.target.value)}
                type="number"
                step="any"
                placeholder="e.g. 0.0000001"
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

          {ph !== null && (
            <div className="result-box">
              <h3>Result</h3>
              <p>pH = {ph.toFixed(4)}</p>
            </div>
          )}

          {message && <p className="note">{message}</p>}

          <p className="note">
            Example: [H+] = 1 × 10⁻⁷ mol/L gives pH = 7
          </p>
        </div>
      </div>
    </div>
  );
}