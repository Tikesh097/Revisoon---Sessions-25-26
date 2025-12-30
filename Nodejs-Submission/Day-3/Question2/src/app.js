const express = require("express");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/users", userRoutes);

module.exports = app;
