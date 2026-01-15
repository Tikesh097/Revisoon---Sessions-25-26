import { useState, useEffect } from "react";
import "./index.css"; 

const defaultSettings = {
  theme: "light",
  language: "en",
  notifications: true
};

function App() {
  const [theme, setTheme] = useState(defaultSettings.theme);
  const [language, setLanguage] = useState(defaultSettings.language);
  const [notifications, setNotifications] = useState(defaultSettings.notifications);

  //Load from localStorage on mount
  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem("settings"));

    if (savedSettings) {
      setTheme(savedSettings.theme);
      setLanguage(savedSettings.language);
      setNotifications(savedSettings.notifications);
    }
  }, []);

  //Save to localStorage on change
  useEffect(() => {
    const settings = { theme, language, notifications };
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [theme, language, notifications]);

  //Reset handler
  function resetSettings() {
    setTheme(defaultSettings.theme);
    setLanguage(defaultSettings.language);
    setNotifications(defaultSettings.notifications);
    localStorage.removeItem("settings");
  }

return (
  <div className="settings">
    <h2>Settings Panel</h2>

    <div className="setting-row">
      <label>Theme</label>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>

    <div className="setting-row">
      <label>Language</label>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
      </select>
    </div>

    <div className="setting-row">
      <label>
        <input
          type="checkbox"
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
        />
        &nbsp;Notifications
      </label>
    </div>

    <button onClick={resetSettings}>Reset to Defaults</button>

    <pre>{JSON.stringify({ theme, language, notifications }, null, 2)}</pre>
  </div>
);
}

export default App;
