import { useState } from "react";

export default function UniverseList({ universeHook }) {
  const { items, addItem, freeze, toggleFreeze } = universeHook;
  const [input, setInput] = useState("");

  return (
    <div>
      <div className="flex gap-3 mb-4">
        <input
          className="px-3 py-2 text-black rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add item"
        />

        <button
          onClick={() => {
            if (!input.trim()) return;
            addItem(input);
            setInput("");
          }}
          className="bg-purple-600 px-4 py-2 rounded"
        >
          Add
        </button>

        <button
          onClick={toggleFreeze}
          className={`px-4 py-2 rounded ${
            freeze ? "bg-blue-600" : "bg-gray-700"
          }`}
        >
          {freeze ? "Unfreeze Time" : "Freeze Time"}
        </button>
      </div>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="bg-gray-800 p-3 rounded">
            {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
