import { useState } from "react";

function App() {
  const [showUserStats, setShowUserStats] = useState(true);
  const [showRecentActivity, setShowRecentActivity] = useState(true);
  const [showQuickActions, setShowQuickActions] = useState(true);

  const noWidgetSelected =
    !showUserStats && !showRecentActivity && !showQuickActions;

  return (
    <div>
      <h2>Dashboard</h2>

      {/* Toggles */}
      <button onClick={() => setShowUserStats(!showUserStats)}>
        Toggle User Stats
      </button>

      <button onClick={() => setShowRecentActivity(!showRecentActivity)}>
        Toggle Recent Activity
      </button>

      <button onClick={() => setShowQuickActions(!showQuickActions)}>
        Toggle Quick Actions
      </button>

      <hr />

      {noWidgetSelected ? (
        <p>No widgets selected</p>
      ) : (
        <>

          {showUserStats && <UserStats />}
          {showRecentActivity && <RecentActivity />}
          {showQuickActions && <QuickActions />}
        </>
      )}
    </div>
  );
}

/* Widgets */
function UserStats() {
  return <div>📊 User Stats Widget</div>;
}

function RecentActivity() {
  return <div>🕒 Recent Activity Widget</div>;
}

function QuickActions() {
  return <div>⚡ Quick Actions Widget</div>;
}

export default App;
