import { useMemo, useState } from "react";
import api from "../services/api";

export default function Molarity() {
  const [moles, setMoles] = useState("");
  const [volume, setVolume] = useState("");
  const [message, setMessage] = useState("");

  const result = useMemo(() => {
    const m = parseFloat(moles);
    const v = parseFloat(volume);
    if (!isFinite(m) || !isFinite(v) || v <= 0) return null;
    return m / v;
  }, [moles, volume]);

  const clear = () => {
    setMoles("");
    setVolume("");
    setMessage("");
  };

  const saveToHistory = async () => {
    if (result === null) {
      setMessage("Please enter valid values first");
      return;
    }

    try {
      await api.post("/history", {
        calculatorType: "Molarity",
        inputs: { moles, volume },
        result: `${result.toFixed(6)} M`,
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
          <h1>Molarity Calculator</h1>
          <p>Calculate molarity using M = moles / volume(L)</p>
        </div>

        <div className="calc-card">
          <div className="calc-grid">
            <div className="calc-field">
              <label>Moles (mol)</label>
              <input
                value={moles}
                onChange={(e) => setMoles(e.target.value)}
                type="number"
                step="any"
                placeholder="e.g. 0.5"
              />
            </div>

            <div className="calc-field">
              <label>Volume (L)</label>
              <input
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                type="number"
                step="any"
                placeholder="e.g. 2"
              />
            </div>
          </div>

          <div className="calc-actions">
            <button className="btn btn-primary" type="button" onClick={saveToHistory}>
              Save Result
            </button>
            <button className="btn btn-ghost" type="button" onClick={clear}>
              Clear
            </button>
          </div>

          {result !== null && (
            <div className="result-box">
              <h3>Result</h3>
              <p>{result.toFixed(6)} M</p>
            </div>
          )}

          {message && <p className="note">{message}</p>}
        </div>
      </div>
    </div>
  );
}