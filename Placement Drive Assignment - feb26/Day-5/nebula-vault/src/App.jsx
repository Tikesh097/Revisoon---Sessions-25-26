import { useState } from "react";
import Tabs from "./components/Tabs";
import UniverseList from "./components/UniverseList";
import { useUniverse } from "./hooks/useUniverse";

export default function App() {
  const [activeTab, setActiveTab] = useState("artifacts");

  const universes = {
    artifacts: useUniverse("artifacts"),
    creatures: useUniverse("creatures"),
    logs: useUniverse("logs"),
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">NebulaVault 🌌</h1>

      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pulses={{
          artifacts: universes.artifacts.pulse,
          creatures: universes.creatures.pulse,
          logs: universes.logs.pulse,
        }}
      />

      <UniverseList universeHook={universes[activeTab]} />
    </div>
  );
}
