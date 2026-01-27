import { useState } from "react";

export default function UndoRedoEditor() {
  const [history, setHistory] = useState([""]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentText = history[currentIndex];

  const handleChange = (e) => {
    const newText = e.target.value;

    const newHistory = history.slice(0, currentIndex + 1);

    setHistory([...newHistory, newText]);
    setCurrentIndex(newHistory.length);
  };

  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "20px auto" }}>
      <h3>Undo / Redo Text Editor</h3>

      <textarea
        rows={5}
        value={currentText}
        onChange={handleChange}
        style={{ width: "100%" }}
      />

      <div style={{ marginTop: 10 }}>
        <button onClick={undo} disabled={currentIndex === 0}>
          Undo
        </button>
        <button
          onClick={redo}
          disabled={currentIndex === history.length - 1}
          style={{ marginLeft: 10 }}
        >
          Redo
        </button>
      </div>

      <p style={{ marginTop: 10 }}>
        History: {currentIndex + 1}/{history.length}
      </p>
    </div>
  );
}
