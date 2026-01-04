import { useState } from "react";

function Alert({ type, onClose, children }) {
  const config = {
    success: { icon: "✅", color: "green" },
    error: { icon: "❌", color: "red" },
    warning: { icon: "⚠️", color: "orange" },
    info: { icon: "ℹ️", color: "blue" }
  };

  const { icon, color } = config[type];

  return (
    <div
      style={{
        border: `1px solid ${color}`,
        padding: "10px",
        marginBottom: "8px",
        borderRadius: "4px"
      }}
    >
      <span>{icon}</span>
      <span style={{ marginLeft: "8px" }}>{children}</span>

      <button
        onClick={onClose}
        style={{ float: "right", cursor: "pointer" }}
      >
        ✖
      </button>
    </div>
  );
}

export default function App() {
  const [alerts, setAlerts] = useState([]);

  const showSampleAlerts = () => {
    setAlerts([
      { id: 1, type: "success", message: "Operation successful" },
      { id: 2, type: "error", message: "Something went wrong" },
      { id: 3, type: "warning", message: "Please check your input" },
      { id: 4, type: "info", message: "New update available" }
    ]);
  };

  const removeAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Alert System</h2>

      <button onClick={showSampleAlerts}>
        Show Sample Alerts
      </button>

      <div style={{ marginTop: "16px" }}>
        {alerts.map(alert => (
          <Alert
            key={alert.id}
            type={alert.type}
            onClose={() => removeAlert(alert.id)}
          >
            {alert.message}
          </Alert>
        ))}
      </div>
    </div>
  );
}
