import { useState } from "react";

export default function PasswordStrength() {
  const [password, setPassword] = useState("");

  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };

  const passedCount = Object.values(checks).filter(Boolean).length;

  const borderColor =
    passedCount <= 1 ? "red" :
      passedCount <= 3 ? "orange" :
        "green";

  return (
    <div style={{ width: 300 }}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        style={{
          width: "100%",
          padding: "8px",
          border: `2px solid ${borderColor}`
        }}
      />

      <ul>
        <li>{checks.length ? "✓" : "✗"} Minimum 8 characters</li>
        <li>{checks.uppercase ? "✓" : "✗"} Uppercase letter</li>
        <li>{checks.number ? "✓" : "✗"} Number</li>
        <li>{checks.special ? "✓" : "✗"} Special character</li>
      </ul>
    </div>
  );
}
