import { useEffect, useState } from "react";
import api from "../services/api";

export default function History() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const fetchHistory = async () => {
    try {
      const res = await api.get("/history");
      setHistory(res.data);
    } catch (err) {
      setError("Failed to load history");
    }
  };

  const deleteItem = async (id) => {
    try {
      await api.delete(`/history/${id}`);
      fetchHistory();
    } catch (err) {
      setError("Failed to delete history");
    }
  };

  const clearAll = async () => {
    try {
      await api.delete("/history");
      fetchHistory();
    } catch (err) {
      setError("Failed to clear history");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="calc-page">
      <div className="calc-container">
        <div className="calc-head">
          <h1>Calculation History</h1>
          <p>Your saved results from MongoDB</p>
        </div>

        <div className="calc-card">
          <div className="calc-actions">
            <button className="btn btn-ghost" onClick={clearAll}>
              Clear All
            </button>
          </div>

          {error && <p className="error-text">{error}</p>}

          {history.length === 0 ? (
            <p className="note">No history found</p>
          ) : (
            history.map((item) => (
              <div key={item._id} className="result-box" style={{ marginBottom: "12px" }}>
                <h3>{item.calculatorType}</h3>
                <p>{item.result}</p>
                <small>{new Date(item.createdAt).toLocaleString()}</small>

                <div style={{ marginTop: "10px" }}>
                  <button className="btn btn-ghost" onClick={() => deleteItem(item._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}