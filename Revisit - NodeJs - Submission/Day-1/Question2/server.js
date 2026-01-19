const express = require("express");
const app = express();

app.use(express.json());

//memory data
let tasks = [];
let idCounter = 1;

app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json(task);
});

app.post("/tasks", (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !status) {
    return res.status(400).json({ message: "Title and status required" });
  }

  const newTask = {
    id: idCounter++,
    title,
    description: description || "",
    status,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const { title, description, status } = req.body;

  task.title = title;
  task.description = description;
  task.status = status;

  res.status(200).json(task);
});

app.patch("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  Object.assign(task, req.body);
  res.status(200).json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(index, 1);
  res.status(204).send();
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
