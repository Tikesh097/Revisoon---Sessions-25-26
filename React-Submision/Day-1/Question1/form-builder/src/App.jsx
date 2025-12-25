import { useState } from "react";

export default function DynamicFormBuilder() {
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        text: "",
        type: "text",
      },
    ]);
  };

  const updateText = (id, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, text: value } : q
      )
    );
  };

  const updateType = (id, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, type: value } : q
      )
    );
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "16px" }}>
      <h2>Dynamic Form Builder</h2>

      <button onClick={addQuestion}>Add Question</button>

      {questions.map((q) => (
        <div key={q.id} style={{ marginTop: "10px" }}>
          <input
            type="text"
            placeholder="Enter question"
            value={q.text}
            onChange={(e) => updateText(q.id, e.target.value)}
          />

          <select
            value={q.type}
            onChange={(e) => updateType(q.id, e.target.value)}
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="email">Email</option>
          </select>

          <button onClick={() => removeQuestion(q.id)}>Remove</button>
        </div>
      ))}

      <h3>Live Preview</h3>
      {questions.map((q) => (
        <p key={q.id}>
          {q.text || "No question"} ({q.type})
        </p>
      ))}
    </div>
  );
}

