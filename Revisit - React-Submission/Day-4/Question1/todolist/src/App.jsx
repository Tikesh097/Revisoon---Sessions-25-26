import { useState } from "react";
import "./App.css"

const initialTodos = [
  { id: '1', text: 'Complete React project', priority: 'High', completed: false },
  { id: '2', text: 'Review PRs', priority: 'Medium', completed: true },
  { id: '3', text: 'Update documentation', priority: 'Low', completed: false }
]

export default function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('Low');


  const addTodo = () => {
    if (!text.trim()) return;


    setTodos([
      ...todos,
      { id: Date.now().toString(), text, priority, completed: false }
    ]);


    setText('');
  };


  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };


  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };


  const getPriorityColor = (priority) => {
    if (priority === 'High') return 'red';
    if (priority === 'Medium') return 'orange';
    return 'green';
  };


  return (
   <div className="todo-container">
  <h2 className="todo-title">📝 Todo List</h2>

  <div className="todo-inputs">
    <input
      className="todo-input"
      value={text}
      onChange={e => setText(e.target.value)}
      placeholder="Enter todo..."
    />

    <select
      className="todo-select"
      value={priority}
      onChange={e => setPriority(e.target.value)}
    >
      <option>Low</option>
      <option>Medium</option>
      <option>High</option>
    </select>

    <button className="add-btn" onClick={addTodo}>
      Add
    </button>
  </div>

  <ul className="todo-list">
    {todos.map(todo => (
      <li className="todo-item" key={todo.id}>
        <span
          className={`todo-text ${todo.completed ? "completed" : ""}`}
          onClick={() => toggleTodo(todo.id)}
        >
          {todo.text}
        </span>

        <span className={`priority ${todo.priority.toLowerCase()}`}>
          {todo.priority}
        </span>

        <button
          className="delete-btn"
          onClick={() => deleteTodo(todo.id)}
        >
          ❌
        </button>
      </li>
    ))}
  </ul>
</div>
); }