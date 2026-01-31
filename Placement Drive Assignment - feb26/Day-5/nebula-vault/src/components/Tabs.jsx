import ActivityPulse from "./ActivityPulse";

const TABS = ["artifacts", "creatures", "logs"];

export default function Tabs({ activeTab, setActiveTab, pulses }) {
    return (
        <div className="flex gap-4 border-b border-gray-700 mb-4">
            {TABS.map(tab => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="flex items-center px-4 py-2 capitalize text-gray-300"
                >
                    {tab}
                    <ActivityPulse active={pulses[tab]} />
                </button>
            ))}
        </div>
    );
}

