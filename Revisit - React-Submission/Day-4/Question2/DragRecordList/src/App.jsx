import { useState } from "react";

function ReorderList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Practice DSA" },
    { id: 3, text: "Build Projects" },
    { id: 4, text: "Prepare Interview" }
  ]);

  const moveUp = (index) => {
    if (index === 0) return;

    setTasks(prev => {
      const newTasks = [...prev];
      [newTasks[index - 1], newTasks[index]] =
        [newTasks[index], newTasks[index - 1]];
      return newTasks;
    });
  };

  const moveDown = (index) => {
    if (index === tasks.length - 1) return;

    setTasks(prev => {
      const newTasks = [...prev];
      [newTasks[index], newTasks[index + 1]] =
        [newTasks[index + 1], newTasks[index]];
      return newTasks;
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>🔁 Reorder Tasks</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task, index) => (
          <li
            key={task.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 10,
              padding: 10,
              border: "1px solid #ccc",
              borderRadius: 6
            }}
          >
            <span style={{ width: 30 }}>{index + 1}.</span>
            <span style={{ flex: 1 }}>{task.text}</span>

            <button
              onClick={() => moveUp(index)}
              disabled={index === 0}
            >
              ⬆️
            </button>

            <button
              onClick={() => moveDown(index)}
              disabled={index === tasks.length - 1}
              style={{ marginLeft: 5 }}
            >
              ⬇️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReorderList;
