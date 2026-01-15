const express = require("express");
const mongoose = require("mongoose");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();
app.use(express.json());

//Connect MongoDB
async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/analyticsDB");
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

connectDB();

app.use("/api/analytics", analyticsRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ status: "error", message: err.message });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
