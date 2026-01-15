import { useEffect, useState } from "react";

function App() {
  // 1️⃣ State to track online/offline
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // 2️⃣ Side effect: add/remove event listeners
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // 3️⃣ Cleanup (VERY IMPORTANT)
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <>
      {/* Offline Banner */}
      <div className={`offline-banner ${!isOnline ? "show" : ""}`}>
        ⚠️ You are offline. Please check your internet connection.
      </div>

      {/* Page Content */}
      <div className="content">
        <h2>Online / Offline Detector</h2>
        <p>
          Current Status:{" "}
          <strong>{isOnline ? "Online ✅" : "Offline ❌"}</strong>
        </p>
        <p>
          Open DevTools → Network → Toggle <b>Offline</b> to test.
        </p>
      </div>
    </>
  );
}

export default App;
